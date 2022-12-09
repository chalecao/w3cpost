---
title: 基于ES6标签模板实现事件绑定与数据监听
weight: 4
---

##  ES6 字符与标签模板

ES6 字符模板 `hello ${name}`  
标签模板: `function hello ${name}`

字符模板是ES6模板功能的增强。字符模板前面的function类似标签声明。举个例子：
```
function tpl(template){
    console.log(template)
    console.log(arguments)
}
let content = tpl`Hello ${1} tpl ${2}`;
```

输出结果：
```
>["Hello ", " tpl ", ""]
>{0: ["Hello ", " tpl ", ""], 1: 1, 2: 2}
```

看出猫腻了吗？标签模板会把字符模板拆分开，把数据和模板片段传到标签函数里。那么[我们](https://www.w3cdoc.com)可以基于这个特性，实现[我们](https://www.w3cdoc.com)想要的功能：事件绑定与数据监听。

## 事件绑定

```
let handleClick = (a) => (e) => {
console.log(a, e)
}
let content = nodeTpl`<div ${{ click: handleClick(123) }} class='ok'>click me</div>`
document.body.appendChild(content)
```

编写上面这段代码，[我们](https://www.w3cdoc.com)用这种格式来定义事件：

```
${{ click: handleClick(123) }}

```

click是事件名，handleClick是高阶函数响应这个点击事件。这里用高阶函数，主要是为了方便传参数。

nodeTpl这个标签模板函数中，[我们](https://www.w3cdoc.com)只需要判断传进来的参数是不是一个对象，然后再绑定对应的事件就可以了。

```
/**
 * if es6 tpl mix an element, append element later
 * @param {*} arg
 */
function handleElement(arg) {
    let id = uuid()
    return {
        mark: {
            type: "element",
            id,
            node: arg
        },
        str: `<div id="${id}" /></div>`
    }
}
/**
 *if es6 tpl mix an event, add event to the element
 * @param {*} arg
 */
function handleEvent(arg) {
    let id = uuid()
    let events = Object.keys(arg).map(key => {
        return {
            evtName: key,
            evtHandler: arg[key]
        }
    })
    return {
        mark: {
            id,
            type: "event",
            events
        },
        str: `id="${id}"`,
    }
}
/**
 *  
 * @param {*} template
 */
export function nodeTpl(template) {
    var s = template[0];
    let rules = []
    for (var i = 1; i < arguments.length; i++) { 
        var arg = arguments[i]; 
        if (!Array.isArray(arg)) { arg = [arg] } 
        let ss = arg.map(argItem => {
            if (argItem instanceof Element) { 
                // 如果参数是一个元素，那么先用元素占位
                let data = handleElement(argItem);
                rules.push(data.mark)
                return data.str
            } else if (typeof argItem == "object") { 
                // 如果参数是一个object，插入一个id标记该元素，然后绑定事件
                let data = handleEvent(argItem);
                rules.push(data.mark)
                return data.str
            } else {
                return argItem
            }
        }).join("");

        s += ss
        s += template[i];
    }
    let docfrag = str2frag(s)
    rules.forEach(rul => {
        let oldNode = docfrag.getElementById(rul.id);
        if (rul.type == "event") { //处理事件绑定
            rul.events.forEach(evt => {
                oldNode.addEventListener(evt.evtName, evt.evtHandler)
            })
        } else if (rul.type == "element") { //处理元素
            oldNode.parentNode.replaceChild(rul.node, oldNode)
        }
    })
    let child = docfrag.childNodes[0]
    return child.childNodes.length > 1 ? child : child.childNodes[0]
}

```

然后点击页面上的click me，控制台打印：
```
>123,MouseEvent
``` 

是不是很神奇。也比较简单哈。

## 数据监听

首先要知道怎么监听数据的变化。给出三种常见的方法：

  1. 脏检查，这也是最早angular采用的监听方式。
  2. 基于es5中的Object.defineProperty方法
  3. 基于es6中的proxy

我这里并不打算展开说，简单介绍下我的理解。

脏检查的机制可以联想下knockout这个框架，它会将你要监听的数据包装成一个KO对象，然后你获取或者修改的都是这个KO对象，所以每次数据修改都可以拿到这个触发点，然后可以把这次的数据和上次的作比较，找到修改的差异部分做依赖更新。

defineProperty是比较官方的做法，在定义对象属性的时候可以对set和get方法做定义，准确的说是做重载，这样在获取或者修改这个属性的时候就能触发预先定义的set和get方法，自然也能做相应处理。注意这里监听的是对象的某个属性，只有通过defineProperty设置过的属性才可以监听到。

```
var data = {name: 'kindeng'};
observe(data);
data.name = 'dmq'; // 哈哈哈，监听到值变化了 kindeng --> dmq

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
};

function defineReactive(data, key, val) {
    observe(val); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            return val;
        },
        set: function(newVal) {
            console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
        }
    });
}
```

proxy其实类似于knockout的做法，为要监听的目标生成一个代理对象，后面的操作都在代理对象上操作就可以。初始化代理对象的时候也可以定义set、和get方法，获取监听的触发点。注意这里proxy监听的是整个目标对象，这也是和defineProperty最大的区别，proxy代理的对象上所有的属性变化都可以监听到。

```
var p = new Proxy(target, {
    get: function(target, property, receiver) { //获取属性
    },
    set: function(target, property, value, receiver) { // 设置属性
    },
    has: function(target, prop) { // for in循环
    }
});


//举个例子
function defineReactive (data) {
    return new Proxy(data, {
    set (target, prop, value) {
        console.log('set=>>', prop, value)
        return Reflect.set(target, prop, value)
    }
    })
}

// [我们](https://www.w3cdoc.com)不需为每个属性进行监听，仅监听这个对象即可
let obj = defineReactive({ a: 1, b: 2 })

obj.a = 2 // set=>> a 2
// c属性的变化依旧被监听到
obj.c = 3 // set=>> c 3
```

有了这些方法，[我们](https://www.w3cdoc.com)就可以拿到数据变化的触发点，然后可以用来更新[我们](https://www.w3cdoc.com)页面需要更新的地方，进行视图渲染。

如果只是监听一处的数据变化还是比较简单的，关键是一个数据可能用在多个地方，所以数据发生变化的时候，多个地方要同时处理。根据上面第一部分事件绑定来说，这里需要对元素的监听做统一处理。合并相同的监听对象的监听，这样在改监听对象发生变化的时候，可以处理所有的事件绑定和内容变更。

```
function render(template, as) {
    let s = template[0]
    let rules = []
    for (let i = 1; i < as.length; i++) { let arg = as[i]; if (!Array.isArray(arg)) { arg = [arg] } let tmpl = template[i]; let ss = arg.map(argItem => {
            // console.log(argItem, argItem instanceof Element)
            if (argItem instanceof Element) {
                let data = handleElement(argItem);
                rules.push(data.mark)
                return data.str
            } else if (typeof argItem == "object") {
                if (argItem.param) {
                    let id = argItem.id || uuid()
                    let inEle = isInElement(tmpl)
                    // 统计所有监听的数据,需要判断是不是在元素内部中
                    rules.push(Object.assign({id: id, type: "bind", inEle: inEle, index: i}, argItem))
                    if (inEle) {
                        let temparr = tmpl.split("")
                        temparr.splice(inEle['index'] + 1, 0, ` id='${id}' `)
                        tmpl = temparr.join("")
                        return `${argItem.fn(argItem.state[argItem.param])}`
                    } else {
                        let aa = argItem.fn(argItem.state[argItem.param])
                        if (aa instanceof Element) {
                            let data = handleElement(aa);
                            rules.push(data.mark)
                            return `<div id='${id}' >${data.str}</div>`
                        } else {
                            return `<div id='${id}' >${aa}</div>`
                        }
                    }
                } else {
                    let data = handleEvent(argItem);
                    rules.push(data.mark)
                    return data.str
                }
            } else {
                return argItem
            }
        }).join("");
...
}
export function nodeTpl(template) {
    ...
    Object.keys(catedRules).forEach(key => {
        let rules = catedRules[key]
        if (key == "event") {
            rules.forEach(rul => {
                let oldNode = docfrag.getElementById(rul.id);
                rul.events.forEach(evt => {
                    oldNode.addEventListener(evt.evtName, evt.evtHandler)
                })
            })
        } else if (key == "element") {
            rules.forEach(rul => {
                let oldNode = docfrag.getElementById(rul.id);
                oldNode.parentNode.replaceChild(rul.node, oldNode)
            })
        } else if (key == "bind") {
            // 找出当前监听的相同的其他地方，方便后面统一变更
            let rulmap = []
            rules.forEach(rul => {
                let sameRu = rulmap.find(ru => (ru.state == rul.state && ru.param == rul.param))
                if (sameRu) {
                    sameRu.sameRules = (sameRu.sameRules || [])
                    sameRu.sameRules.push(rul)
                } else {
                    rulmap.push(rul)
                }
            });
            rulmap.forEach(rul => {
                let oldNode = docfrag.getElementById(rul.id)
                rul.sameRules && rul.sameRules.forEach(srul => {
                    srul.oldNode = docfrag.getElementById(srul.id)
                })
                let originValue = rul.state[rul.param]
                Object.defineProperty(rul.state, rul.param, {
                    get: function () {
                        return originValue;
                    },
                    set: function (newValue) {
                        console.log("set new value", newValue, rul.inEle)
                        originValue = newValue;
                        // 统一处理所有需要变更的点
                        let params = (args)
                        params[rul.index] = Object.assign(args[rul.index])
                        params[rul.index].id = rul.id
                        rul.sameRules && rul.sameRules.forEach(srul => {
                            params[srul.index] = Object.assign(args[srul.index])
                            params[srul.index].id = srul.id
                        })
                        let ele = render(template, params)
                        let newdocfrag = str2frag(ele.s)
                        let newNode = newdocfrag.getElementById(rul.id)
                        console.log(rul)

                        if (rul.inEle) {
                            newNode.innerHTML = '';

                            [].forEach.call(oldNode.childNodes, (nod) => {
                                newNode.appendChild(nod)
                            })
                            oldNode.parentNode.replaceChild(newNode, oldNode)
                            oldNode = newNode
                        } else {
                            let aa = rul.fn(rul.state[rul.param])
                            if (aa instanceof Element) {
                                oldNode.innerHTML = ``
                                oldNode.appendChild(aa)
                            } else {
                                oldNode.innerHTML = `${aa}`
                            }
                        }
                        rul.sameRules && rul.sameRules.forEach(srul => {
                            let newNode = newdocfrag.getElementById(srul.id)
                            if (srul.inEle) {

                                newNode.innerHTML = '';
                                let olist = srul.oldNode.childNodes;
                                // 这里搬移childNodes 里面不能使用顺序使用append方法，childNodes会发生变化，这可能是[浏览器](https://www.w3cdoc.com)bug
                                // 使用倒序没有问题，使用insertBefore模拟prepend方法
                                for (let i = olist.length -1; i >= 0; i--) {
                                        // 模拟prepend
                                        newNode.insertBefore(olist[i],newNode.firstChild);
                                }
                                // console.log("after:", newNode.innerHTML)
                                srul.oldNode.parentNode.replaceChild(newNode, srul.oldNode)
                                srul.oldNode = newNode
                            } else {
                                let aa = srul.fn(srul.state[srul.param])
                                if (aa instanceof Element) {
                                    srul.oldNode.innerHTML = ''
                                    srul.oldNode.appendChild(aa)
                                } else {
                                    srul.oldNode.innerHTML = `${aa}`
                                }
...
}
```

上面这部分是关键代码， 实现起来比较麻烦。github地址：<https://github.com/chalecao/es6tpl>

使用起来比较简单，给一个示例：

```
const state2 = {
    txt: "xxx"
}
var form2 = nodeTpl`<h2>测试数据监听：
        <div><label >姓名：<input placeholder="${state.name}" ${{
        keyup: (e) => {
            state2.txt = e.target.value
        }
    }} /> ${{ fn: (txt) => txt, state: state2, param: 'txt' }}</label></div>
        <div style="color:${{ fn: (txt) => txt, state: state2, param: 'txt' }}">111 ${{
        fn: (txt) => {
            return nodeTpl`<h2>测试表单：${txt}`
        }, state: state2, param: 'txt'
    }}

document.body.appendChild(form2)
```

其实，仔细思考下这个功能是做的有些复杂了。指出几个问题：

1. 为什么es6模板需要转换成virtualDOM？为什么不采用类似JSX的语法编译模式？

答：转换成virtualDOM是为了监听数据变化的时候更新节点。或者更新整个模板。将ES6模板中的部分转换为virtual node的确挺麻烦，如果只是绑定事件还好。但是如果是更新DOM，不如采用JSX这种打包编译时将代码片段转换为函数的方式，使用起来更灵活。所以ES6标签目标真的是只使用与简单的增强，比如增加绑定事件。如果是数据变化，建议更新整个模板片段。

2. 为什么用`fn`，`state`，`param`三个字段来定义，是不是很麻烦？

答：其实上面的实现麻烦的部分在于收集所有数据监听的地方，同时要区分是在元素标签中的属性还是元素标签包裹的内容。如果采用监听者模式采用注册监听和通知更新的方式，可以减少部分代码。但是逻辑复杂性还是有的，正如上面问题所说。这里面绑定属性需要指定对象和属性值，所以需要两个字段，其实可以采用proxy，直接代理整个对象，这样不用指定那个属性了，或者用object.keys 循环对象所有属性执行defineProperty进行监听，这样就是少一个字段。但是由于标签模板中的拿到的值都是变量的值，所以如果想监听还是要写成函数输出的形式。

3. 改进的方法？

答：改进的方法是监听整个state，重新生成整个es6模板，性能开销应该不大，然后直接和页面上的dom作比较，把修改的部分patch到dom上。也就是节点的增加，删除、替换和排序。这一块需要做一个diff dom的算法。这是一个方向可以来做的，当然单独使用绑定事件的增强功能也可以的，还是比较简单的，可以解决大部分场景。

# Polymer-lit-element

建议学习下[Polymer][1]，看下[lit-element][2]如何应用的。lit-element是为了快速创建web component组件提供的一套基础类。可以研究下，这个正是基于ES6标签模板实现的模板渲染和数据监听。和我当初的想法正好是一致的，这种标签模板的渲染方式应该会比virtual dom高效很多。后续文章再精细介绍这个lit-element。

 [1]: https://www.polymer-project.org/
 [2]: https://lit-element.polymer-project.org/
