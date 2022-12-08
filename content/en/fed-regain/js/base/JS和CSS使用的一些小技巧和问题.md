---
title: JS和CSS使用的一些小技巧和问题
---

<img loading="lazy" class="alignnone wp-image-2092 size-full" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/bf565c2227fc8deb089a0a3eba20cddd.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2018/04/bf565c2227fc8deb089a0a3eba20cddd.png?x-oss-process=image/format,webp" alt="" width="600" height="233" />

## 定制间隔线

<img loading="lazy" class="" src="//fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2018/04/ad4b1849662ef8338664c9fee791477c.png" width="391" height="32" />

需要上面这样一条虚线，怎么搞？

方法一：

```
border-top: 1px dashed #eee;

```

方法二：

```
//基于渐变
.dash {
        height: 1px;
        background-image: linear-gradient(90deg, #eee 0%, #eee 50%, transparent 50%, transparent 100%);
        background-size: 15px 1px;
        margin: 9px 0;
    }

```

PS: 看过一篇文章，一位大牛用css渐变写了超级玛丽：[链接][1]  

## append与appendChild

这里说的append是dom的方法，目前处于草案，虽然有很多[浏览器](https://www.w3cdoc.com)支持，但是在开发h5页面时，偶尔还是会有报错，有些极个别[浏览器](https://www.w3cdoc.com)拿不支持。mdn：<https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append>

append的功能和jquery的append没有多大差别。

appendChild这个api是DOM level2的，现在基本所有[浏览器](https://www.w3cdoc.com)都支持的。注意后面appendChild的参数必须是一个节点node

## 隐藏iframe的src

怎么搞？两种方法：

  1. 可以自己创建一个iframe，然后可以拿到iframe的contentWindow，contentDocument往里面写内容，
  2. 基于form表单的target属性，可以指定一个iframe的name来打开，这样表单提交后的结果会在iframe中展示，而iframe不会回显src的url。

```
postToIframe: function(iframeName, actionUrl, dataKey, data) {
                var _form = document.createElement("form")
,_input = document.createElement("input");
                _form.setAttribute("id", "hideForm"),
                _form.setAttribute("method", "POST"),
                _form.setAttribute("action", actionUrl),
                _form.setAttribute("target", iframeName),
                _input.setAttribute("type", "hidden"),
                _input.setAttribute("name", dataKey),
                _input.value = encodeURIComponent(JSON.stringify(data));
                var o = document.getElementById("hideForm");
                o && document.body.removeChild(o),
                document.body.appendChild(_form),
                _form.appendChild(r),
                _form.submit()
}

```

## js设置important的css

```
function myFunction() {
    var x = document.querySelectorAll("#testDiv p.example");
    x[0].style.setProperty("background-color", "red", "important");
}

```

注意：直接使用document.querySelector("#xxx").style.marginTop="0 !important"是不行的。不能带后面的!important，只能通过setProperty来实现。

## js操作class

```
function addClass(sel, cls) {
        document.querySelector(sel).classList.add(cls)
}
function removeClass(sel, cls) {
        document.querySelector(sel).classList.remove(cls)
}

```

classList这个属性是DOM2支持的，包含了add和remove方法。

## promise执行then之后的reject

```
new Promise(function(resolve, reject){
    resolve(Promise.reject(5))
}).then(function(value){
    console.log('fulfill', value)
}, function(reason){
    console.log('reject', reason)
})
// reject 5

```

上面的[大家](https://www.w3cdoc.com)都知道，那么第二次then会怎样？

```
new Promise(function(resolve, reject){
    resolve(Promise.reject(5))
}).then(function(value){
    console.log('fulfill', value)
    return 1;
}, function(reason){
    console.log('reject', reason)
    return 2;
}).then(res=>{
    console.log(res) //all gos here
},err=>{
    console.log(err)
})

```

你会发现，第一次then中的resolve或者reject的返回值都会走到第二次then的resolve。那么怎么走到第二次then的reject呢？

```
new Promise(function(resolve, reject){
    resolve(Promise.reject(5))
}).then(function(value){
    console.log('fulfill', value)
    return 1;
}, function(reason){
    console.log('reject', reason)
    //1. Promise.reject, goes next then reject
    Promise.reject(1)
    //2. throw Error, go next then reject
    throw new Error("2")
}).then(res=>{
    console.log(res)
},err=>{
    console.log(err)
})

```

两种方法，使用Promise.reject 或者抛出一个异常

## js 正则表达式判断非法字符 常用正则表达式

    
    var pat=new RegExp("[^a-zA-Z0-9\_\u4e00-\u9fa5]","i");    
    var strTest = $("#testId").val();   
    if(pat.test(strTest)==true)    {        
        showMess("项目名称中含有非法字符");        
        return false;    
    }
    

示例其他正则代码：

验证数字的正则表达式集（转载）  
验证数字：^[0-9]*$  
验证n位的数字：^\d{n}$  
验证至少n位数字：^\d{n,}$  
验证m-n位的数字：^\d{m,n}$  
验证零和非零开头的数字：^(0|\[1-9\]\[0-9\]*)$  
验证有两位小数的正实数：^[0-9]+(.[0-9]{2})?$  
验证有1-3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$  
验证非零的正整数：^\+?\[1-9\]\[0-9\]*$  
验证非零的负整数：^\-\[1-9\]\[0-9\]*$  
验证非负整数（正整数 + 0） ^\d+$  
验证非正整数（负整数 + 0） ^((-\d+)|(0+))$  
验证长度为3的字符：^.{3}$  
验证由26个英文字母组成的字符串：^[A-Za-z]+$  
验证由26个大写英文字母组成的字符串：^[A-Z]+$  
验证由26个小写英文字母组成的字符串：^[a-z]+$  
验证由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$  
验证由数字、26个英文字母或者下划线组成的字符串：^\w+$  
验证用户密码:^[a-zA-Z]\w{5,17}$ 正确格式为：以字母开头，长度在6-18之间，只能包含字符、数字和下划线。  
验证是否含有 ^%&&#8217;,;=?$\&#8221; 等字符：[^%&&#8217;,;=?$\x22]+  
验证汉字：^[\u4e00-\u9fa5],{0,}$  
验证Email地址：^\w+[-+.]\w+)\*@\w+([-.]\w+)\*\.\w+([-.]\w+)*$  
验证InternetURL：^https://([\w-]+\.)+[\w-]+(/[\w-./?%&=]\*)?$ ；^[a-zA-z]+://(w+(-w+)\*)(.(w+(-w+)\*))\*(?S*)?$  
验证电话号码：^(\d3,4\d3,4|\d{3,4}-)?\d{7,8}$：&#8211;正确格式为：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。  
验证身份证号（15位或18位数字）：^\d{15}|\d{}18$  
验证一年的12个月：^(0?[1-9]|1[0-2])$ 正确格式为：“01”-“09”和“1”“12”  
验证一个月的31天：^((0?[1-9])|[(1|2](0-9))|30|31)$ 正确格式为：01、09和1、31。  
整数：^-?\d+$  
非负浮点数（正浮点数 + 0）：^\d+(\.\d+)?$  
正浮点数 ^((\[0-9]+\.[0-9]\*[1-9\]\[0-9\]\*)|(\[0-9]\*[1-9\]\[0-9\]\*\.\[0-9]+)|([0-9]\*[1-9\]\[0-9\]\*))$  
非正浮点数（负浮点数 + 0） ^((-\d+(\.\d+)?)|(0+(\.0+)?))$  
负浮点数 ^(-((\[0-9]+\.[0-9]\*[1-9\]\[0-9\]\*)|(\[0-9]\*[1-9\]\[0-9\]\*\.\[0-9]+)|([0-9]\*[1-9\]\[0-9\]\*)))$  
浮点数 ^(-?\d+)(\.\d+)? &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212; 作者：zgcy123456 来源：CSDN 原文：https://blog.csdn.net/zgcy123456/article/details/8912057?utm_source=copy 版权声明：本文为博主原创文章，转载请附上博文链接！

## H5页面在 ios 端滑动不流畅没有惯性的问题

在ios 下,只有body的overflow:auto有滑动惯性效果,

其他地方需要添加

    -webkit-overflow-scrolling : touch;
    

知道吗

## nodeList 你需要知道的

 知识点1： nodeList 在 ie， ios safari 10 之前，chrome 51 之前是不支持forEach方法的。参考: <a href="https://developer.mozilla.org/en-US/docs/Web/API/NodeList">https://developer.mozilla.org/en-US/docs/Web/API/NodeList</a> ， 所以新手经常会犯这个错误。直接

<div>
  ```
document,querySelectorAll("a").forEach(()=>{
    ....
})
</code>
```
</div>

  然后看到监控平台一堆报错。解决办法：

<div>
  ```
var list = document.querySelectorAll('input[type=checkbox]');
Array.prototype.forEach.call(list, function (checkbox) {
  checkbox.checked = true;
});
还有暴力的(不推荐)：
NodeList.prototype.forEach = Array.prototype.forEach;

```
</div>

 知识点2： 

<div>
 In some cases, the NodeList is <em>live</em>, which means that changes in the DOM automatically update the collection. For example, <a title="The Node.childNodes read-only property returns a live NodeList of child nodes of the given element where the first child node is assigned index 0." href="https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes">Node.childNodes</a> 获取到的节点是对真实节点的实时引用（live node）:
  
  ```
var parent = document.getElementById('parent');
var child_nodes = parent.childNodes;
console.log(child_nodes.length); // let's assume "2"
parent.appendChild(document.createElement('div'));
console.log(child_nodes.length); // outputs "3"

```
</div>

   <a title="The Element method querySelectorAll() returns a static (not live) NodeList representing a list of the document's elements that match the specified group of selectors." href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll">document.querySelectorAll()</a> 返回的是执行时获取到的节点信息，是静态引用（节点发生变化，无感知，可以理解成内存中存在的引用），比如节点发生增删，之前返回的节点列表不会变化，所以循环要判空。

## babel 打包 展开写法的JS代码的问题

  [&#8230;document.querySelectorAll(&#8220;a&#8221;)]  经过babel-env 转义后成为 [].concat(document.querySelectorAll(&#8220;a&#8221;)),

  简直是坑爹。 [0] = NodeList， 另外一种用法使用Array.from(document.querySelectorAll(&#8220;a&#8221;)) , 这样是把NodeList数据转化成数组。

  关于preset，参考：https://babeljs.io/docs/en/env

  preset: env 打包后；[].concat(document.querySelectorAll(&#8220;a&#8221;))

  preset: es2015打包后：[].concat(babelHelpers.toConsumableArray(document.querySelectorAll(&#8220;a&#8221;))

<div>
  ```
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

[].concat(_toConsumableArray(smth));
```
</div>

从根本上来说不建议这么写 [&#8230;nodeList] ，最好还是写Array.from( nodeList )。 如果必须这么写，那么配置必须是这样：

    presets: [
        "es2015-rollup"
    ],
    

如果使用env，那么你就完蛋了，可能就引入了nodeList的bug，不能被concat的。貌似env环境后来去掉了babelHelpers.toConsumableArray的转换，有性能问题。

    "presets": [[
                    "env",
                    {
                        "modules": false,
                        loose: true,
                        exclude: ['transform-es2015-typeof-symbol'],
                        targets: {
                            browsers: ["Android >= 4.4", "ios > 7"]
                        },
                        "useBuiltIns": true
                    }
        ]],
    

webpack的配置类似，这里不说了。

## 怎么让比例不同的图片都能居中铺满展示，而且缩放比例不变形

[不同比例图片铺满展示不变形的几种方法][2]

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

<audio style="display: none;" controls="controls"></audio>

 [1]: https://medium.com/@alcidesqueiroz/super-mario-world-in-css-100-css-no-javascript-no-embedded-images-data-uris-no-external-e43dc0c2b1f4
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/butongbilitupianpumanzhanshibubianxingdejizhongfangfa/
