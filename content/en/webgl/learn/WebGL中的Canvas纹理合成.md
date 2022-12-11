---
title: WebGL中的Canvas纹理合成
weight: 7
---
### 纹理合成

从本质上来说，纹理只是图片而已，它是由像素点组成。无论在内存还是显存中，它都是由4个分量组成，这四个分量是R、G、B和A。唯一的不同的，在显存中，会比内存中更快的渲染到显示器上。这是毋庸置疑的，因为显存中的帧缓冲本来就是和显示器上 的像素一一对应的。

从上面的概念中，[我们](https://www.w3cdoc.com)就能够引申出一些重要的理解了，就是只要是图像数据，准确的说是内存或者显存中的图像数据，都可以作为纹理，显示在屏幕中。

上面的课程，[我们](https://www.w3cdoc.com)讲了通过loadtexture函数在服务器上加载一张图片作为纹理，这一节课，[我们](https://www.w3cdoc.com)来讲通过html中的canvas来作为纹理。它非常重要，以后的课程中[我们](https://www.w3cdoc.com)会经常使用这个技巧。

它们两者之间有很多差别，这个差别就是图片和canvas的差别，图片是通过图像处理软件，如photoshop来处理的。而canvas是通过[浏览器](https://www.w3cdoc.com)的绘图API来绘制的。显示canvas能够给程序员更多的想象空间，从而做出更有意思的效果出来。  
本节的效果，是一个可以旋转的三维时钟。如下图所示，

![](/images/posts/2022-12-11-19-41-00.png)

发现了它与普通时钟的区别了吗？首页它在正方体的6个面都有时钟的效果，而且时钟是每秒钟都更新一次的，能够准确的反应当前的时间。下面[我们](https://www.w3cdoc.com)来介绍一下，这一关于canvas作为纹理的知识。

### 时钟纹理生成过程

实现这个效果的步骤可以用下面的框图来表示：  

![](/images/posts/2022-12-11-19-41-44.png)

1、在canvas上画时钟

由于时钟的秒针会每秒滴答一次，那么canvas中的内容，其本身就会被更新一次。

![](/images/posts/2022-12-11-19-43-15.png)

2、将canvas传递给THREE.Texture纹理

Canvas可以作为纹理传递给THREE.Texture函数，纹理的构造函数是：

```
THREE.Texture = function ( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )
```

这个函数的第一个参数image，接收一个image类型的图像，或者canvas，后面的参数可以暂时不理会，它会以默认值去填充texture后面的参数。

这里[我们](https://www.w3cdoc.com)只需要将canvas传递给Texture就ok了，代码如下：

```
texture = new THREE.Texture( canvas);
```

那么纹理怎么知道其每一个像素怎么映射到形状状的表面呢，默认情况下，纹理被均匀分配到四边形的各个顶点上。

3、将纹理传递给THREE.MeshBasicMaterial材质

将texture传递给材质就更简单了，材质本身可以接受一个属性名为map的参数，代码如下：

```
var material = new THREE.MeshBasicMaterial({map:texture});
```

这样就将纹理赋给了材质。

4、构造THREE.Mesh

在[我们](https://www.w3cdoc.com)的中级教程中，详细的讲解过Mesh，从它的概念，组成，怎么将几何体和材质融合一体，又怎么知道几何体和材质是否发生变化，怎么更新Mesh动画，几乎都讲了一遍，可以说是目前最为完整的3DMesh教程。不过这里篇幅有限，而Mesh又确实需要太多的笔墨去讲解，所以，这里就一笔带过了。

Mesh就是一个网格表面，它代表着[我们](https://www.w3cdoc.com)渲染到3D世界中的各种模型。其构造函数如下：

```
THREE.Mesh = function ( geometry, material )
```

它接受2个参数，一个是几何体，一个是材质。

Mesh就是一个网格表面，它代表着[我们](https://www.w3cdoc.com)渲染到3D世界中的各种模型。其构造函数如下：

```
THREE.Mesh = function ( geometry, material )
```

它接受2个参数，一个是几何体，一个是材质。

这里[我们](https://www.w3cdoc.com)这样来构造它：

```
mesh = new THREE.Mesh( geometry,material );
```

其中geometry是一个THREE.CubeGeometry表示的正方体。

ok，经过这4步，[我们](https://www.w3cdoc.com)的代码就可以运行了。  
好了，最后，[我们](https://www.w3cdoc.com)来看看，[我们](https://www.w3cdoc.com)的所有代码。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <meta charset="utf-8" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js"></script>
    <style>
        body {
            margin: 0px;
            background-color: #000000;
            overflow: hidden;
        }
    </style>
</head>
<body onload="start();">
<script src="./clock.js"></script>

<script>

    var camera, scene, renderer;
    var mesh;
    var texture;
    
    function start()
    {
        clock();
        init();
        animate();
    }

    function init() {

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        //
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.z = 400;
        scene = new THREE.Scene();
        
        var geometry = new THREE.CubeGeometry(150, 150, 150);
        texture = new THREE.Texture( canvas);
        var material = new THREE.MeshBasicMaterial({map:texture});
        texture.needsUpdate = true;
        mesh = new THREE.Mesh( geometry,material );
        scene.add( mesh );

        //
        window.addEventListener( 'resize', onWindowResize, false );
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate() {
        texture.needsUpdate = true;
        mesh.rotation.y -= 0.01;
        mesh.rotation.x -= 0.01;
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }

</script>

</body>
</html>
```

代码中clock.js就是绘制时钟的代码，里面有一个全局变量canvas，表示canvas本身。另外，需要注意的是在定义了纹理之后，[我们](https://www.w3cdoc.com)将texture.needsUpdate设置为了true，如果不设置为true，那么纹理就不会更新，很可能你看到的是一个黑色的正方体，原因是纹理没有被载入之前，就开始渲染了，而渲染使用了默认的材质颜色。

这是什么原因呢？是这样的，纹理的绘制是需要一段时间的，javascript是可以异步运行的，在canvas绘制出时钟之前，可能three.js就开始根据纹理渲染图形了。如果纹理不更新，那么正方体一直会是以前没有绘制完成的纹理，很可能是材质本身的颜色。

另一个方面，canvas由于绘制的是时钟，其每一秒都会重新绘制一次，所以为了让正方体上的纹理可以及时反映canvas上的时钟，也需要不断的更新纹理，所以需要将needUpdate设置为true，不过缺点是其效率会低一些，不过这种效率的降低，是完全可以接受的。

好了，那么这一节，[我们](https://www.w3cdoc.com)就讲到这里，WebGL中文网的全体同仁都将为您服务。[我们](https://www.w3cdoc.com)不仅提供优秀的教程，而且提供专业的在线答疑。希望[大家](https://www.w3cdoc.com)支持，您的付出，将绝对不会后悔。

[我们](https://www.w3cdoc.com)有信心，在您学完WebGL中文网的课程后，做一个漂亮的3D游戏或者3D网站，一点没有问题。

