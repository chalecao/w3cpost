---
title: 初始WebGL和ThreeJS
weight: 1

---
### 什么是WebGL

简而言之，WebGL是一种3D绘图标准，这种绘图技术标准允许把JavaScript和OpenGL ES 2.0结合在一起，通过增加OpenGL ES 2.0的一个JavaScript绑定，WebGL可以为HTML5 Canvas提供硬件3D加速渲染，这样Web开发人员就可以借助系统显卡来在[浏览器](https://www.w3cdoc.com)里更流畅地展示3D场景和模型了，还能创建复杂的导航和数据视觉化。显然，WebGL技术标准免去了开发网页专用渲染插件的麻烦，可被用于创建具有复杂3D结构的网站页面，甚至可以用来设计3D网页游戏等等。  
而ThreeJS是一个Javascript类库，用于方便再[浏览器](https://www.w3cdoc.com)中使用js完成WebGL中3d场景的绘制，模型的渲染。

### 如何使用

  1. 官网上下载ThreeJs类库，地址：<a href="https://threejs.org" target="_blank" rel="external noopener">https://threejs.org</a>
  2. 新建文件夹，建立threejs1目录，作为[我们](https://www.w3cdoc.com)的测试1工作目录。建立js目录，将three.min.js拷贝到该目录。
  3. 在threejs1工作目录，新建index.html，键入如下代码：  
```
<html>
  <head>
      <title>My first Three.js app</title>
      <style>
        body { margin: 0; }
        canvas { width: 100%; height: 100% }
      </style>
  </head>
  <body>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js"></script>
      <script>
      // Our Javascript will go here.
      </script>
  </body>
</html>
```
[我们](https://www.w3cdoc.com)接着在上面空出的script标签中完成threejs的初始化等工作。

### 创建场景

上面的步骤[我们](https://www.w3cdoc.com)已经把代码结构搭建好了，接下来就是逻辑实现部分了。有一些基础知识必须先介绍，要使用threejs来完成webgl的工作，[我们](https://www.w3cdoc.com)总是需要3个基本部分：场景，摄像机，渲染器。创建一个场景，然后在场景中排放物体模型，然后设置摄像机的位置和角度，最后基于摄像机的配置，使用渲染器来渲染出整个画面效果。  
给出相应的js代码如下：
```
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
```

在Threejs中场景就只有一种，用THREE.Scene来表示，要构件一个场景也很简单，只要new一个对象就可以了，代码如下：
```
var scene = new THREE.Scene();
```
场景是所有物体的容器，如果要显示一个苹果，就需要将苹果对象加入场景中。

### 相机

另一个组建是相机，相机决定了场景中那个角度的景色会显示出来。相机就像人的眼睛一样，人站在不同位置，抬头或者低头都能够看到不同的景色。

场景只有一种，但是相机却又很多种。和现实中一样，不同的相机确定了呈相的各个方面。比如有的相机适合人像，有的相机适合风景，专业的摄影师根据实际用途不一样，选择不同的相机。对程序员来说，只要设置不同的相机参数，就能够让相机产生不一样的效果。

在Threejs中有多种相机，这里介绍两种，它们是：正投影相机THREE.OrthographicCamera和透视投影相机THREE.PerspectiveCamera.

这里[我们](https://www.w3cdoc.com)使用一个透视相机，透视相机的参数很多，这里先不详细讲解。后面关于相机的那一章，[我们](https://www.w3cdoc.com)会花大力气来讲。定义一个相机的代码如下所示：
```
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
```

### 渲染器

最后一步就是设置渲染器，渲染器决定了渲染的结果应该画在页面的什么元素上面，并且以怎样的方式来绘制。这里[我们](https://www.w3cdoc.com)定义了一个WebRenderer渲染器，代码如下所示：
```
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```
注意，渲染器renderer的domElement元素，表示渲染器中的画布，所有的渲染都是画在domElement上的，所以这里的appendChild表示将这个domElement挂接在body下面，这样渲染的结果就能够在页面中显示了。

### 一个例子

编辑完上面的代码，你会发现运行后的结果依然是空的。是的，这是因为[我们](https://www.w3cdoc.com)还没有向场景中添加对象模型。下面[我们](https://www.w3cdoc.com)就添加一个小立方体，看看效果吧。  
全部代码如下：
```
<!DOCTYPE html>
<html>
<head>
<title></title>
<style>canvas { width: 100%; height: 100% }</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js" ></script>
</head>
<body>
<script>
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material); scene.add(cube);
camera.position.z = 5;

function render() {
        requestAnimationFrame(render);
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        renderer.render(scene, camera);
}
render();
</script>
</body>
</html>
```
代码中出现了THREE.CubeGeometry，THREE.CubeGeometry是什么东东，他是一个几何体，几何体由什么组成，已经不是本课的主要内容了，后面的课程[我们](https://www.w3cdoc.com)会详细的学到。不过这里你只需要知道CubeGeometry是一个正方体或者长方体，究竟是什么，由它的3个参数所决定，cubeGeometry的原型如下代码所示：
```
CubeGeometry(width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides)
```

width：立方体x轴的长度
height：立方体y轴的长度
depth：立方体z轴的深度，也就是长度

想一想[大家](https://www.w3cdoc.com)就明白，以上3个参数就能够确定一个立方体。

剩下的几个参数就要费解和复杂一些了，不过后面[我们](https://www.w3cdoc.com)会自己来写一个立方体，到时候，你会更明白这些参数的意义，这里你可以将这些参数省略。

### 渲染物体模型

上面的代码中，[我们](https://www.w3cdoc.com)创建了渲染器，也添加了物体模型，那么只剩下最后一步了，使用渲染器渲染模型。  
渲染应该使用渲染器，结合相机和场景来得到结果画面。实现这个功能的函数是
```
renderer.render(scene, camera);
```

渲染函数的原型如下：
```
render( scene, camera, renderTarget, forceClear )
```

各个参数的意义是：
scene：前面定义的场景
camera：前面定义的相机
renderTarget：渲染的目标，默认是渲染到前面定义的render变量中
forceClear：每次绘制之前都将画布的内容给清除，即使自动清除标志autoClear为false，也会清除。

#### 渲染循环

渲染有两种方式：实时渲染和离线渲染 。

先看看离线渲染，想想《西游降魔篇》中最后的佛主，他肯定不是真的，是电脑渲染出来的，其画面质量是很高的，它是事先渲染好一帧一帧的图片，然后再把图片拼接成电影的。这就是离线渲染。如果不事先处理好一帧一帧的图片，那么电影播放得会很卡。CPU和GPU根本没有能力在播放的时候渲染出这种高质量的图片。

实时渲染：就是需要不停的对画面进行渲染，即使画面中什么也没有改变，也需要重新渲染。下面就是一个渲染循环：
```
function render() {
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
}
```

其中一个重要的函数是requestAnimationFrame，这个函数就是让[浏览器](https://www.w3cdoc.com)去执行一次参数中的函数，这样通过上面render中调用requestAnimationFrame()函数，requestAnimationFrame()函数又让rander()再执行一次，就形成了[我们](https://www.w3cdoc.com)通常所说的游戏循环了。

### 场景，相机，渲染器之间的关系

Three.js中的场景是一个物体的容器，开发者可以将需要的角色放入场景中，例如苹果，葡萄。同时，角色自身也管理着其在场景中的位置。

相机的作用就是面对场景，在场景中取一个合适的景，把它拍下来。

渲染器的作用就是将相机拍摄下来的图片，放到[浏览器](https://www.w3cdoc.com)中去显示。他们三者的关系如下图所示：  
![初始WebGL和ThreeJS][2]

### 优化你的代码

上面的代码是将所有代码在一段脚本中完成，当逻辑复杂一点后，就比较难读懂。所以，[我们](https://www.w3cdoc.com)将其按照功能分解成函数，代码如下：
```
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Three框架</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js"></script>
<style type="text/css">
div#canvas-frame {
        border: none;
        cursor: pointer;
        width: 100%;
        height: 600px;
        background-color: #EEEEEE;
}
</style>
<script>
var renderer;
function initThree() {
        width = document.getElementById("canvas-frame").clientWidth;
        height = document.getElementById("canvas-frame").clientHeight;
        renderer = new THREE.WebGLRenderer({
        antialias : true
});
renderer.setSize(width, height);
document.getElementById("canvas-frame").appendChild(renderer.domElement);
renderer.setClearColor(0xFFFFFF, 1.0);
}

var camera;
function initCamera() {
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        camera.position.x = 0;
        camera.position.y = 1000;
        camera.position.z = 0;
        camera.up.x = 0;
        camera.up.y = 0;
        camera.up.z = 1;
        camera.lookAt({
                x : 0,
                y : 0,
                z : 0
        });
}

var scene;
function initScene() {
        scene = new THREE.Scene();
}

var light;
function initLight() {
        light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
        light.position.set(100, 100, 200);
        scene.add(light);
}

var cube;
function initObject() {
        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );
        var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );

        // 线的材质可以由2点的颜色决定
        var p1 = new THREE.Vector3( -100, 0, 100 );
        var p2 = new THREE.Vector3( 100, 0, -100 );
        geometry.vertices.push(p1);
        geometry.vertices.push(p2);
        geometry.colors.push( color1, color2 );
        var line = new THREE.Line( geometry, material, THREE.LinePieces );
        scene.add(line);
}

function render(){
        renderer.clear();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
}

function threeStart() { 
        initThree();
        initCamera();
        initScene();
        initLight();
        initObject();
        render();
}
</script>
</head>
<body onload="threeStart();">
        <div id="canvas-frame"></div>
</body>
</html>
```
大概了解一下就可以了，它只是将框架一的代码，放到了不同的函数中，最终通过threeStart()函数调用而已。这段比较规范的代码在以后的例子中可能会用到。

## 在线实验

在线编码地址：[playground](/playground.html)

