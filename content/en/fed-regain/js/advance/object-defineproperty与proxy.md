---
title: Object.defineProperty与Proxy

---
[Object.observe()][1]方法用于异步地监视一个对象的修改。当对象属性被修改时，方法的回调函数会提供一个有序的修改流。然而，这个接口已经被废弃并从各浏览器中移除。你可以使用更通用的 [`Proxy`][2] 对象替代。

<div>
  <div>
    <p>
      写了两个版本，分别是使用 js 里的 Proxy （代理）和 Object.defineProperty 实现
    </p>

    <p>
      两个版本都有各自的缺陷，大家可以按需自己选择自己需要的
    </p>
    
    <ul>
      <li>
        Proxy 不能监听源对象，只能监控代理对象。代理对象属性值是个对象时，也可以进听到变化。
      </li>
      <li>
        Object.defineProperty 有新增属性的时候，无法做到自动监听。属性值是个对象时，监听不到变化。每个属性都要处理一遍，费事。
      </li>
    </ul>
  </div>
  
  <h2>
    基于Proxy
  </h2>
  
  <div>
    <pre class="EnlighterJSRAW" data-enlighter-language="null">/**
 * 使用 Proxy 来说实现被废弃的 Object.observe()
 *
 * @param {any} target
 * @param {any} fnBind
 * @returns
 */
var bind = function ( target, fnBind ) {

  return new Proxy( target, {
    set: function ( target, prop, value ) {
            target[prop] = value
            fnBind.call( target )
    }
  } )
}

var person = {
  name: '12'
  ,age: '23'
}
var child = bind( person, function () {
  console.log( 'bind: ', this.name )
} )
person.name = 333
child.name = 444
console.log( person )
console.log( child )

child.name = {aa:11}

child.name = {aa:22} //可以监听到</pre>

    <p>
      &nbsp;
    </p>
  </div>
</div>

## 使用Obeject.defineProperty

<div>
  <pre class="EnlighterJSRAW" data-enlighter-language="null">/**
 * 使用 es5 的 Object.defineProperty 特性 来实现 Object.observe()
 *
 * @param {any} target
 * @param {any} fnBind
 * @returns
 */
var bind = function ( target, fnBind ) {
    bind.targets = bind.targets || []
    bind.cloneTargets = bind.cloneTargets || []
    var targets = bind.targets
    , closeTargets = bind.cloneTargets
    ,   index = targets.indexOf( target )

    bind.fnBinds = bind.fnBinds || []
    var fnBinds = bind.fnBinds
    if( index == -1 ) {
        index = targets.length
        targets.push( target )
        closeTargets.push( Object.assign( {}, target ) )
        fnBinds.push( [] )
    }
    var targetFnBinds = fnBinds[index]
    targetFnBinds.push( fnBind )

    for( var prop in target ) {
        Object.defineProperty( target, prop, {
            set: function ( val ) {
                closeTargets[index][prop] = val
                for( var i = 0; i &lt; targetFnBinds.length; i ++ ) {
                    targetFnBinds[i].call( target )
                }
            },
            get: function () {
                return closeTargets[index][prop]
            }
        } )
    }

  return target
}

var person = {
  name: '12'
  ,age: '23'
}
var child = bind( person, function () {
  console.log( 'bind: ', this.name )
} )
person.name = 333
child.name = 444
child.name = 555
console.log( person )
console.log( child )

person.name = {aa:11}

person.name = {aa:22} //注意这里的修改监听不到</pre>
  
  <p>
    上面已经提到了如果对象的属性还是个对象，就无法监听到变化。同样，如果属性是个数组，也无法监听到数组的变化。Vue2中是自己hack实现了Array的一些方法，让其可以被监听，后面Vue3会切换使用Proxy
  </p>
</div>

&nbsp;

扩展阅读：[实现双向绑定Proxy比defineproperty优劣如何?][3]

 [1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
 [2]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy "Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。"
 [3]: https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf
