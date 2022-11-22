---
title: 点线面基本作图


date: 2015-08-28T16:52:20+00:00
excerpt: 在计算机世界里，3D世界是由点组成，两个点能够组成一条直线，三个不在一条直线上的点就能够组成一个三角形面，无数三角形面就能够组成各种形状的物体，如下图：
url: /aistack/957.html
views:
  - 3075
  - 3075
ws_info:
  - 'a:4:{s:8:"ws_title";s:0:"";s:7:"ws_desc";s:0:"";s:6:"ws_url";s:0:"";s:6:"ws_img";s:0:"";}'
  - 'a:4:{s:8:"ws_title";s:0:"";s:7:"ws_desc";s:0:"";s:6:"ws_url";s:0:"";s:6:"ws_img";s:0:"";}'
toc_depth:
  - 1
  - 1


---
### WebGL中的点线面

在计算机世界里，3D世界是由点组成，两个点能够组成一条直线，三个不在一条直线上的点就能够组成一个三角形面，无数三角形面就能够组成各种形状的物体，如下图：

![点线面基本作图][1] 

我们通常把这种网格模型叫做Mesh模型。给物体贴上皮肤，或者专业点就叫做纹理，那么这个物体就活灵活现了。最后无数的物体就组成了我们的3D世界。

那么3D世界的组成，是否真的这样简单？是的，从编程的角度，目前为此，你只需要知道这些。下一节，我们从点说起。

### 点的知识

#### 在Threejs中定义一个点

在三维空间中的某一个点可以用一个坐标点来表示。一个坐标点由x,y,z三个分量构成。在three.js中，点可以在右手坐标系中表示：

空间几何中，点可以用一个向量来表示，在Three.js中也是用一个向量来表示的，代码如下所示：<figure> 

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
        THREE.Vector3 = function ( x, y, z ) {
      

      
        this.x = x || 0;
      
        this.y = y || 0;
      
        this.z = z || 0;
      

      
        };
    </td>
  </tr>
</table></figure> 

我们来分析这段代码：前面我们已经知道了THREE是Three.js引擎的一个全局变量。只要你想用它，就可以在任何地方用它。

那么THREE.Vector3呢，就是表示Vector3是定义在THREE下面的一个类。以后要用Vector3，就必须要加THREE前缀。当然Three.js的设计者，也可以不加THREE这个前缀，但是他们预见到，Three.js引擎中会有很多类型，最好给这些类型加一个前缀，以免与开发者的代码产生冲突。

THREE.Vector3被赋值为一个函数。这个函数有3个参数，分别代表x坐标，y坐标和z坐标的分量。函数体内的代码将他们分别赋值给成员变量x，y，z。看看上面的代码，中间使用了一个“||”（或）运算符，就是当x=null或者undefine时，this.x的值应该取0。

#### 点的操作

在3D世界中点可以用THREE.Vector3D来表示。对应源码为/src/math/Vector3.js（注意：源码所在的位置，可能不同版本不一样，请自己搜索Vector3关键词来确定）。在您继续学习之前，你可以打开该文件浏览一下，推荐使用WebStorm，如果没有，你也可以用NotePad++。

现在来看看怎么定义个点，假设有一个点x=4，y=8，z=9。你可以这样定义它：<figure> 

<table>
  <tr>
    <td>
        1
    </td>
    
    <td>
        var point1 = new THREE.Vecotr3(4,8,9);
    </td>
  </tr>
</table></figure> 

另外你也可以使用set方法，代码如下：<figure> 

<table>
  <tr>
    <td>
        1
      
        2
      
        3
    </td>
    
    <td>
        var point1 = new THREE.Vector3();
      

      
        point1.set(4,8,9);
    </td>
  </tr>
</table></figure> 

我们这里使用了set方法，为了以后深入学习的方便，这里将Vector3的常用方法列出如下，为了不影响文章的连贯性，我们专门列出了一个网页来介绍它。

### 线的知识

初中数学中有一个定理：两个不重合的点能够决定一条直线。在three.js中，也可以通过定义两个点，来画一条直线。正好回顾一下上节最后给出的代码中的例子：<figure> 

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
      
        49
      
        50
      
        51
      
        52
      
        53
      
        54
      
        55
      
        56
      
        57
      
        58
      
        59
      
        60
      
        61
      
        62
      
        63
      
        64
      
        65
      
        66
      
        67
      
        68
      
        69
      
        70
      
        71
      
        72
      
        73
      
        74
      
        75
      
        76
      
        77
      
        78
      
        79
      
        80
      
        81
      
        82
      
        83
      
        84
      
        85
      
        86
      
        87
      
        88
      
        89
      
        90
      
        91
      
        92
      
        93
      
        94
      
        95
      
        96
    </td>
    
    <td>
        <!DOCTYPE html>
      
        <html>
      
        <head>
      
        <meta charset=&#8221;UTF-8&#8243;>
      
        <title>Three框架</title>
      
        <script src=&#8221;js/three.min.js&#8221;></script>
      
        <style type=&#8221;text/css&#8221;>
      
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
      
        width = document.getElementById(&#8216;canvas-frame&#8217;).clientWidth;
      
        height = document.getElementById(&#8216;canvas-frame&#8217;).clientHeight;
      
        renderer = new THREE.WebGLRenderer({
      
        antialias : true
      
        });
      
        renderer.setSize(width, height);
      
        document.getElementById(&#8216;canvas-frame&#8217;).appendChild(renderer.domElement);
      
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
      
        function render()
      
        {
      
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
      

      
        <body onload=&#8221;threeStart();&#8221;>
      
        <div id=&#8221;canvas-frame&#8221;></div>
      
        </body>
      
        </html>
    </td>
  </tr>
</table></figure> 

1、首先，我们声明了一个几何体geometry，如下：<figure> 

<table>
  <tr>
    <td>
        1
    </td>
    
    <td>
        var geometry = new THREE.Geometry();
    </td>
  </tr>
</table></figure> 

几何体里面有一个vertices变量，可以用来存放点。

2、定义一种线条的材质，使用THREE.LineBasicMaterial类型来定义，它接受一个集合作为参数，其原型如下：<figure> 

<table>
  <tr>
    <td>
        1
    </td>
    
    <td>
        LineBasicMaterial( parameters )
    </td>
  </tr>
</table></figure> 

Parameters是一个定义材质外观的对象，它包含多个属性来定义材质，这些属性是：

Color：线条的颜色，用16进制来表示，默认的颜色是白色。

Linewidth：线条的宽度，默认时候1个单位宽度。

Linecap：线条两端的外观，默认是圆角端点，当线条较粗的时候才看得出效果，如果线条很细，那么你几乎看不出效果了。

Linejoin：两个线条的连接点处的外观，默认是“round”，表示圆角。

VertexColors：定义线条材质是否使用顶点颜色，这是一个boolean值。意思是，线条各部分的颜色会根据顶点的颜色来进行插值。（如果关于插值不是很明白，可以QQ问我，QQ在前言中你一定能够找到，嘿嘿，虽然没有明确写出）。

Fog：定义材质的颜色是否受全局雾效的影响。

好了，介绍完这些参数，你可以试一试了。我们这里使用了顶点颜色vertexColors: THREE.VertexColors，就是线条的颜色会根据顶点来计算。<figure> 

<table>
  <tr>
    <td>
        1
    </td>
    
    <td>
        var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );
    </td>
  </tr>
</table></figure> 

3、接下来，定义两种颜色，分别表示线条两个端点的颜色，如下所示：<figure> 

<table>
  <tr>
    <td>
        1
      
        2
      
        3
    </td>
    
    <td>
        var color1 = new THREE.Color( 0x444444 ),
      

      
        color2 = new THREE.Color( 0xFF0000 );
    </td>
  </tr>
</table></figure> 

4、定义2个顶点的位置，并放到geometry中，代码如下：<figure> 

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
        var p1 = new THREE.Vector3( -100, 0, 100 );
      

      
        var p2 = new THREE.Vector3( 100, 0, -100 );
      

      
        geometry.vertices.push(p1);
      

      
        geometry.vertices.push(p2);
    </td>
  </tr>
</table></figure> 

5、为4中定义的2个顶点，设置不同的颜色，代码如下所示：<figure> 

<table>
  <tr>
    <td>
        1
    </td>
    
    <td>
        geometry.colors.push( color1, color2 );
    </td>
  </tr>
</table></figure> 

geometry中colors表示顶点的颜色，必须材质中vertexColors等于THREE.VertexColors 时，颜色才有效，如果vertexColors等于THREE.NoColors时，颜色就没有效果了。那么就会去取材质中color的值，这个很重要，大家一定记住。

6、定义一条线

定义线条，使用THREE.Line类，代码如下所示：<figure> 

<table>
  <tr>
    <td>
        1
    </td>
    
    <td>
        var line = new THREE.Line( geometry, material, THREE.LinePieces );
    </td>
  </tr>
</table></figure> 

第一个参数是几何体geometry，里面包含了2个顶点和顶点的颜色。第二个参数是线条的材质，或者是线条的属性，表示线条以哪种方式取色。第三个参数是一组点的连接方式，我们会在后面详细讲解。

然后，将这条线加入到场景中，代码如下：<figure> 

<table>
  <tr>
    <td>
        1
    </td>
    
    <td>
        scene.add(line);
    </td>
  </tr>
</table></figure> 

这样，场景中就会出现刚才的那条线段了。

#### 线条的进一步说明

在Threejs中，一条线由点，材质和颜色组成。

点由THREE.Vector3表示，Threejs中没有提供单独画点的函数，它必须被放到一个THREE.Geometry形状中，这个结构中包含一个数组vertices，这个vertices就是存放无数的点（THREE.Vector3）的数组。这个表示可以如下图所示：three.js向量  
![点线面基本作图][2]  
为了绘制一条直线，首先我们需要定义两个点，如下代码所示：<figure> 

<table>
  <tr>
    <td>
        1
      
        2
      
        3
    </td>
    
    <td>
        var p1 = new THREE.Vector3( -100, 0, 100 );
      

      
        var p2 = new THREE.Vector3( 100, 0, -100 );
    </td>
  </tr>
</table></figure> 

请大家思考一下，这两个点在坐标系的什么位置，然后我们声明一个THREE.Geometry，并把点加进入，代码如下所示：<figure> 

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
        var geometry = new THREE.Geometry();
      

      
        geometry.vertices.push(p1);
      

      
        geometry.vertices.push(p2);
    </td>
  </tr>
</table></figure> 

geometry.vertices的能够使用push方法，是因为geometry.vertices是一个数组。这样geometry 中就有了2个点了。

然后我们需要给线加一种材质，可以使用专为线准备的材质，THREE.LineBasicMaterial。

最终我们通过THREE.Line绘制了一条线，如下代码所示:<figure> 

<table>
  <tr>
    <td>
        1
    </td>
    
    <td>
        var line = new THREE.Line( geometry, material, THREE.LinePieces );
    </td>
  </tr>
</table></figure> 

ok，line就是我们要的线条了。

### 坐标系

#### 右手坐标系

Threejs使用的是右手坐标系，这源于opengl默认情况下，也是右手坐标系。下面是右手坐标系的图例，如果对这个概念不理解，可以百度一下，我保证你伸出手比划的那一瞬间你就明白了，如果不明白请给作者留言，我会尽快补上关于坐标系的知识。  
![点线面基本作图][3] 

图中右边那个手对应的坐标系，就是右手坐标系。在Threejs中，坐标和右边的坐标完全一样。x轴正方向向右，y轴正方向向上，z轴由屏幕从里向外。

#### 坐标平面

下面我们要绘制一个坐标平面网格，先给出代码吧，看充满智慧的你是否可以看懂。<figure> 

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
      
        49
      
        50
      
        51
      
        52
      
        53
      
        54
      
        55
      
        56
      
        57
      
        58
      
        59
      
        60
      
        61
      
        62
      
        63
      
        64
      
        65
      
        66
      
        67
      
        68
      
        69
      
        70
      
        71
      
        72
      
        73
      
        74
      
        75
      
        76
      
        77
      
        78
      
        79
      
        80
      
        81
      
        82
      
        83
      
        84
      
        85
      
        86
      
        87
      
        88
      
        89
      
        90
      
        91
      
        92
      
        93
      
        94
    </td>
    
    <td>
        <!DOCTYPE html>
      
        <html>
      
        <head>
      
        <meta charset=&#8221;UTF-8&#8243;>
      
        <title>Three框架</title>
      
        <script src=&#8221;js/three.min.js&#8221;></script>
      
        <style type=&#8221;text/css&#8221;>
      
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
      
        width = document.getElementById(&#8216;canvas-frame&#8217;).clientWidth;
      
        height = document.getElementById(&#8216;canvas-frame&#8217;).clientHeight;
      
        renderer = new THREE.WebGLRenderer({
      
        antialias : true
      
        });
      
        renderer.setSize(width, height);
      
        document.getElementById(&#8216;canvas-frame&#8217;).appendChild(renderer.domElement);
      
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
      
        // A begin
      
        var cube;
      
        function initObject() {
      
        var geometry = new THREE.Geometry();
      
        geometry.vertices.push( new THREE.Vector3( &#8211; 500, 0, 0 ) );
      
        geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );
      

      
        for ( var i = 0; i <-= 20; i ++ ) {
      

      
        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
      
        line.position.z = ( i * 50 ) &#8211; 500;
      
        scene.add( line );
      

      
        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
      
        line.position.x = ( i * 50 ) &#8211; 500;
      
        line.rotation.y = 90 * Math.PI / 180;
      
        scene.add( line );
      

      
        }
      
        }
      
        // A end
      
        function threeStart() {
      
        initThree();
      
        initCamera();
      
        initScene();
      
        initLight();
      
        initObject();
      
        renderer.clear();
      
        renderer.render(scene, camera);
      
        }
      

      
        </script>
      
        </head>
      

      
        <body onload=&#8221;threeStart();&#8221;>
      
        <div id=&#8221;canvas-frame&#8221;></div>
      
        </body>
      
        </html>
    </td>
  </tr>
</table></figure> 

1、定义2个点

在x轴上定义两个点p1(-500,0,0)，p2(500,0,0)。<figure> 

<table>
  <tr>
    <td>
        1
      
        2
      
        3
    </td>
    
    <td>
        geometry.vertices.push( new THREE.Vector3( &#8211; 500, 0, 0 ) );
      

      
        geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );
    </td>
  </tr>
</table></figure> 

2、算法

这两个点决定了x轴上的一条线段，将这条线段复制20次，分别平行移动到z轴的不同位置，就能够形成一组平行的线段。

同理，将p1p2这条线先围绕y轴旋转90度，然后再复制20份，平行于z轴移动到不同的位置，也能形成一组平行线。

经过上面的步骤，就能够得到坐标网格了。代码如下：<figure> 

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
    </td>
    
    <td>
        for ( var i = 0; i <-= 20; i ++ ) {
      

      
        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
      
        line.position.z = ( i * 50 ) &#8211; 500;
      
        scene.add( line );
      

      
        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
      
        line.position.x = ( i * 50 ) &#8211; 500;
      
        line.rotation.y = 90 * Math.PI / 180; // 旋转90度
      
        scene.add( line );
      

      
        }
    </td>
  </tr>
</table></figure> 

### 谢谢！

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/28/2015_threejs2/" target="_blank" rel="external noopener">//fed123.oss-ap-southeast-2.aliyuncs.com/2015/08/28/2015_threejs2/</a>  
部分内容转载于网络，若侵犯版权，请告知！谢谢。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/threejs21.gif
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/threejs23.png
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/threejs22.jpg