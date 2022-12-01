---
title: WebGL中的图片纹理合成
weight: 6
---
### 纹理合成

纹理对于[我们](https://www.w3cdoc.com)来说是多么的重要，以至于[大家](https://www.w3cdoc.com)已经忘记了它的重要性。闭上眼睛想一想，如果你心爱的女人，没有穿衣服，该是多么的令你心动啊。哦，说错了，是她不仅没有穿衣服，而且没有皮肤，就像画皮中的没有皮的周迅一样，你就不会喜欢它了，因为她奇丑无比。

纹理之于3D世界，就像皮肤之于动物世界一样。如果没有皮肤，那么人就会非常的丑陋，没有纹理，那么3D世界也就不会那么吸引人了。

![WebGL中的图片纹理合成][1]

### 图片纹理

[我们](https://www.w3cdoc.com)来想一想，3D世界的纹理，由什么组成呢？3D世界的纹理由图片组成。

是的，就这么简单，如果下次谁问你什么是纹理，那么你告诉它是图片，或者贴图就完了。将纹理以一定的规则映射到几何体上，一般是三角形上，那么这个几何体就有纹理皮肤了。

那么在threejs中，或者任何3D引擎中，纹理应该怎么来实现呢？首先应该有一个纹理类，其次是有一个加载图片的方法，将这张图片和这个纹理类捆绑起来。

在threejs中，纹理类由THREE.Texture表示，其构造函数如下所示：<figure>

<table>
  <tr>
    <td>
        1
    </td>

    <td>
        THREE.Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )
    </td>
  </tr>
</table></figure>

各个参数的意义是：

Image：这是一个图片类型，基本上它有ImageUtils来加载，如下代码<figure>

<table>
  <tr>
    <td>
        1
    </td>

    <td>
        var image = THREE.ImageUtils.loadTexture(url); // url 是一个https://xxxx/aaa.jpg 的类似地址，javascript没有从本地加载数据的能力，所以没有办法从您电脑的C盘加载数据。
    </td>
  </tr>
</table></figure>

Mapping：是一个THREE.UVMapping()类型，它表示的是纹理坐标。下一节，[我们](https://www.w3cdoc.com)将说说纹理坐标。

wrapS：表示x轴的纹理的回环方式，就是当纹理的宽度小于需要贴图的平面的宽度的时候，平面剩下的部分应该p以何种方式贴图的问题。

wrapT：表示y轴的纹理回环方式。 magFilter和minFilter表示过滤的方式，这是OpenGL的基本概念，我将在下面讲一下，目前你不用担心它的使用。当您不设置的时候，它会取默认值，所以，[我们](https://www.w3cdoc.com)这里暂时不理睬他。

format：表示加载的图片的格式，这个参数可以取值THREE.RGBAFormat，RGBFormat等。THREE.RGBAFormat表示每个像素点要使用四个分量表示，分别是红、绿、蓝、透明来表示。RGBFormat则不使用透明，也就是说纹理不会有透明的效果。

type：表示存储纹理的内存的每一个字节的格式，是有符号，还是没有符号，是整形，还是浮点型。不过这里默认是无符号型（THREE.UnsignedByteType）。暂时就解释到这里，有需要时，[我们](https://www.w3cdoc.com)在仔细分析，或者给作者留言询问。

anisotropy：各向异性过滤。使用各向异性过滤能够使纹理的效果更好，但是会消耗更多的内存、CPU、GPU时间，暂时就了解到这里吧。

ok，各个参数介绍完了。[我们](https://www.w3cdoc.com)接下来看纹理坐标。

### 纹理坐标

在正常的情况下，你在0.0到1.0的范围内指定纹理坐标。[我们](https://www.w3cdoc.com)来简单看一下纹理坐标如下图：  
![WebGL中的图片纹理合成][2]  
当[我们](https://www.w3cdoc.com)用一幅图来做纹理的时候，那么这幅图就隐示的被赋予了如图一样的纹理坐标，这个纹理坐标将被对应到一个形状上。  
ok，[我们](https://www.w3cdoc.com)来看一下例子，这个例子很简单，就是在平面上贴上一张美女的图片。<figure>

<table>
  <tr>
    <td>
        1

        2
      
        3
      
        4
      
        5
      
        6
      
        7
      
        8
      
        9
      
        10
      
        11
      
        12
      
        13
      
        14
      
        15
      
        16
      
        17
      
        18
      
        19
      
        20
      
        21
      
        22
      
        23
      
        24
      
        25
      
        26
      
        27
      
        28
      
        29
      
        30
      
        31
      
        32
      
        33
      
        34
      
        35
      
        36
      
        37
      
        38
      
        39
      
        40
      
        41
      
        42
      
        43
      
        44
      
        45
      
        46
      
        47
      
        48
    </td>
    
    <td>

      
        var camera, scene, renderer;
      
        var mesh;
      

      
        init();
      
        animate();
      

      
        function init() {
      

      
        renderer = new THREE.WebGLRenderer();
      
        renderer.setSize( window.innerWidth, window.innerHeight );
      
        document.body.appendChild( renderer.domElement );
      
        //
      
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
      
        camera.position.z = 400;
      
        scene = new THREE.Scene();
      

      
        // A begin
      
        var geometry = new THREE.PlaneGeometry( 500, 300, 1, 1 );
      
        geometry.vertices[0].uv = new THREE.Vector2(0,0);
      
        geometry.vertices[1].uv = new THREE.Vector2(2,0);
      
        geometry.vertices[2].uv = new THREE.Vector2(2,2);
      
        geometry.vertices[3].uv = new THREE.Vector2(0,2);
      
        // A end
      
        // B begin
      
        // 纹理坐标怎么弄
      
        var texture = THREE.ImageUtils.loadTexture(&#8220;textures/a.jpg&#8221;,null,function(t)
      
        {
      
        });
      
        var material = new THREE.MeshBasicMaterial({map:texture});
      
        var mesh = new THREE.Mesh( geometry,material );
      
        scene.add( mesh );
      
        // B end
      

      
        window.addEventListener( &#8216;resize&#8217;, onWindowResize, false );
      

      
        }
      

      
        function onWindowResize() {
      
        camera.aspect = window.innerWidth / window.innerHeight;
      
        camera.updateProjectionMatrix();
      
        renderer.setSize( window.innerWidth, window.innerHeight );
      
        }
      

      
        function animate() {
      
        requestAnimationFrame( animate );
      
        renderer.render( scene, camera );
      
        }
    </td>
  </tr>
</table></figure>

仔细阅读上面的代码，一共完成了4件事情：

a：画一个平面

b：为平面赋予纹理坐标

c：加载纹理

d：将纹理应用于材质

做了这四件事，[我们](https://www.w3cdoc.com)的工作就可以大功告成了。还是让[我们](https://www.w3cdoc.com)来详细解释一下吧。

#### 画一个平面

通过PlaneGemotry可以画一个平面，代码如下：<figure>

<table>
  <tr>
    <td>
        1
    </td>

    <td>
        var geometry = new THREE.PlaneGeometry( 500, 300, 1, 1 );
    </td>
  </tr>
</table></figure>

这个平面的宽度是500，高度是300.

#### 为平面赋予纹理坐标

平面有4个顶点，所以[我们](https://www.w3cdoc.com)只需要指定4个纹理坐标就行了。纹理坐标由顶点的uv成员来表示，uv被定义为一个二维向量THREE.Vector2()，[我们](https://www.w3cdoc.com)可以通过如下代码来为平面定义纹理：<figure>

<table>
  <tr>
    <td>
        1

        2
      
        3
      
        4
      
        5
      
        6
      
        7
    </td>
    
    <td>
        geometry.vertices[0].uv = new THREE.Vector2(0,0);
      

      
        geometry.vertices[1].uv = new THREE.Vector2(1,0);
      

      
        geometry.vertices[2].uv = new THREE.Vector2(1,1);
      

      
        geometry.vertices[3].uv = new THREE.Vector2(0,1);
    </td>
  </tr>
</table></figure>

注意，4个顶点分别对应了纹理的4个顶点。还要注意（0,0），（1,0），（1,1），（0,1）他们之间的顺序是逆时针方向。[大家](https://www.w3cdoc.com)在给平面赋纹理坐标的时候也要注意方向，不然three.js是分不清楚的。

### 加载纹理

纹理作为一张图片，可以来源于互联网，或者本地服务器，但是就是不能来源于类似C:/pic/a.jpg这样的本地路径。这是因为javascript没有加载本地路径文件的权限。如果你尝试这么做，会报如下的错误：  
![WebGL中的图片纹理合成][3]

所以务必在你的电脑上搭建一个tomcat，apache，iis等服务器中的一种，并把图片资源放到服务器中，并通过<a href="https://localhost:8080/img/a.jpg这样的方式去访问它。这样就能解决上面的交叉域问题。[我们](https://www.w3cdoc.com)接着往下讲。" target="_blank" rel="external noopener">https://localhost:8080/img/a.jpg这样的方式去访问它。这样就能解决上面的交叉域问题。[我们](https://www.w3cdoc.com)接着往下讲。</a>

这里加载纹理使用了上面介绍的loadTexture函数，代码如下：<figure>

<table>
  <tr>
    <td>
        1

        2
      
        3
      
        4
      
        5
    </td>
    
    <td>
        var texture = THREE.ImageUtils.loadTexture(&#8220;textures/a.jpg&#8221;,null,function(t)
      

      
        {
      

      
        });
    </td>
  </tr>
</table></figure>

这个函数的第一个参数是一个相对路径，表示与您的网页之间的相对路径。相对路径对应了一个纹理图片textures/a.jpg。

第二个参数为null，表示时候要传入一个纹理坐标参数，来覆盖前面在geometry中的参数。

第三个表示一个回调函数，表示成功加载纹理后需要执行的函数，参数t是传入的texture。

最后，这个函数的返回值是加载的纹理。

### 将纹理应用于材质

加载好纹理，万事俱备了，只需要将纹理映射到材质就可以了。[我们](https://www.w3cdoc.com)这里使用了一个普通的材质THREE.MeshBasicMaterial，材质中有一个map属性，可以直接接受纹理，[我们](https://www.w3cdoc.com)可以这样定义一个带纹理的材质：<figure>

<table>
  <tr>
    <td>
        1
    </td>

    <td>
        var material = new THREE.MeshBasicMaterial({map:texture});
    </td>
  </tr>
</table></figure>

ok，接下来的事情就简单了，直接将纹理甩给Mesh，同时也别忘了Mesh也需要geometry，他们暧昧的关系如下：<figure>

<table>
  <tr>
    <td>
        1
    </td>

    <td>
        var mesh = new THREE.Mesh( geometry,material );
    </td>
  </tr>
</table></figure>

最后的最后，将这个mesh加入场景中：<figure>

<table>
  <tr>
    <td>
        1
    </td>

    <td>
        scene.add( mesh );
    </td>
  </tr>
</table></figure>

行了，打开你的[浏览器](https://www.w3cdoc.com)，输入你服务器的网址吧，结果就在你眼前。  
这只是纹理的一个简单入门，也许你还想知道怎么加载立体纹理、为非光滑的平面贴纹理、甚至为人脸贴纹理，那么就关注后面的课程吧。[我们](https://www.w3cdoc.com)无法在一课把这些知识讲完，但后面的课程会陆续告诉你这些知识的，敬请期待，非常感谢您的阅读。

### 谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2016/05/27/2016_threejs6/" target="_blank" rel="external noopener">//fed123.oss-ap-southeast-2.aliyuncs.com/2016/05/27/2016_threejs6/</a>  
部分内容转载于网络，若侵犯版权，请告知！谢谢。T\_T 皓眸大[前端](https://www.w3cdoc.com)开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/threejs62.png
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/threejs62-1.png
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/threejs63.jpg
