---
title: '转: vue中8种组件通信方式'



---
<div>
  <p>
    vue是数据驱动视图更新的框架, 所以对于vue来说组件间的数据通信非常重要，那么组件之间如何进行数据通信的呢？ 首先我们需要知道在vue中组件之间存在什么样的关系, 才更容易理解他们的通信方式, 就好像过年回家，坐着一屋子的陌生人，相互之间怎么称呼，这时就需要先知道自己和他们之间是什么样的关系。 vue组件中关系说明:
  </p><figure>
  
  <p id="fGchZMH">
    <img loading="lazy" width="462" height="402" class="alignnone size-full wp-image-4954 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d54205637882.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d54205637882.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d54205637882.png?x-oss-process=image/format,webp 462w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d54205637882.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_261/format,webp 300w" sizes="(max-width: 462px) 100vw, 462px" />
  </p><figcaption></figcaption></figure>
  
  <p>
    如上图所示, A与B、A与C、B与D、C与E组件之间是父子关系； B与C之间是兄弟关系；A与D、A与E之间是隔代关系； D与E是堂兄关系（非直系亲属） 针对以上关系我们归类为：
  </p>
  
  <ul>
    <li>
      父子组件之间通信
    </li>
    <li>
      非父子组件之间通信(兄弟组件、隔代关系组件等)
    </li>
  </ul>
  
  <p>
    本文会介绍组件间通信的8种方式如下图目录所示:并介绍在不同的场景下如何选择有效方式实现的组件间通信方式，希望可以帮助小伙伴们更好理解组件间的通信。
  </p>
  
  <p id="MwhBPNr">
    <img loading="lazy" width="499" height="566" class="alignnone size-full wp-image-4955 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d54205e863c5.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d54205e863c5.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d54205e863c5.png?x-oss-process=image/format,webp 499w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/08/img_5d54205e863c5.png?x-oss-process=image/quality,q_50/resize,m_fill,w_264,h_300/format,webp 264w" sizes="(max-width: 499px) 100vw, 499px" />
  </p>
  
  <p>
    一、<code>props</code> / <code>$emit</code>
  </p>
  
  <p>
    父组件通过<code>props</code>的方式向子组件传递数据，而通过<code>$emit</code> 子组件可以向父组件通信。
  </p>
  
  <h4 class="heading" data-id="heading-1">
    1. 父组件向子组件传值
  </h4>
  
  <p>
    下面通过一个例子说明父组件如何向子组件传递数据：在子组件<code>article.vue</code>中如何获取父组件<code>section.vue</code>中的数据<code>articles:['红楼梦', '西游记','三国演义']</code>
  </p>
  
  <pre><code class="hljs html copyable" lang="html">// section父组件
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"section"&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">com-article&lt;/span> &lt;span class="hljs-attr">:articles&lt;/span>=&lt;span class="hljs-string">"articleList"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">com-article&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">import&lt;/span> comArticle &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./test/article.vue'&lt;/span>
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'HelloWorld'&lt;/span>,
  &lt;span class="hljs-attr">components&lt;/span>: { comArticle },
  data() {
    &lt;span class="hljs-keyword">return&lt;/span> {
      &lt;span class="hljs-attr">articleList&lt;/span>: [&lt;span class="hljs-string">'红楼梦'&lt;/span>, &lt;span class="hljs-string">'西游记'&lt;/span>, &lt;span class="hljs-string">'三国演义'&lt;/span>]
    }
  }
}
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>

&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <pre><code class="hljs html copyable" lang="html">// 子组件 article.vue
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">span&lt;/span> &lt;span class="hljs-attr">v-for&lt;/span>=&lt;span class="hljs-string">"(item, index) in articles"&lt;/span> &lt;span class="hljs-attr">:key&lt;/span>=&lt;span class="hljs-string">"index"&lt;/span>&gt;&lt;/span>{{item}}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">span&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  &lt;span class="hljs-attr">props&lt;/span>: [&lt;span class="hljs-string">'articles'&lt;/span>]
}
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <blockquote>
    <p>
      总结: prop 只可以从上一级组件传递到下一级组件（父子组件），即所谓的单向数据流。而且 prop 只读，不可被修改，所有修改都会失效并警告。
    </p>
  </blockquote>
  
  <h4 class="heading" data-id="heading-2">
    2. 子组件向父组件传值
  </h4>
  
  <p>
    对于<code>$emit</code> 我自己的理解是这样的: <code>$emit</code>绑定一个自定义事件, 当这个语句被执行时, 就会将参数arg传递给父组件,父组件通过v-on监听并接收参数。 通过一个例子，说明子组件如何向父组件传递数据。 在上个例子的基础上, 点击页面渲染出来的<code>ariticle</code>的<code>item</code>, 父组件中显示在数组中的下标
  </p>
  
  <pre><code class="hljs html copyable" lang="html">// 父组件中
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"section"&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">com-article&lt;/span> &lt;span class="hljs-attr">:articles&lt;/span>=&lt;span class="hljs-string">"articleList"&lt;/span> @&lt;span class="hljs-attr">onEmitIndex&lt;/span>=&lt;span class="hljs-string">"onEmitIndex"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">com-article&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>{{currentIndex}}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">import&lt;/span> comArticle &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./test/article.vue'&lt;/span>
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'HelloWorld'&lt;/span>,
  &lt;span class="hljs-attr">components&lt;/span>: { comArticle },
  data() {
    &lt;span class="hljs-keyword">return&lt;/span> {
      &lt;span class="hljs-attr">currentIndex&lt;/span>: &lt;span class="hljs-number">-1&lt;/span>,
      &lt;span class="hljs-attr">articleList&lt;/span>: [&lt;span class="hljs-string">'红楼梦'&lt;/span>, &lt;span class="hljs-string">'西游记'&lt;/span>, &lt;span class="hljs-string">'三国演义'&lt;/span>]
    }
  },
  &lt;span class="hljs-attr">methods&lt;/span>: {
    onEmitIndex(idx) {
      &lt;span class="hljs-keyword">this&lt;/span>.currentIndex = idx
    }
  }
}
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <pre><code class="hljs html copyable" lang="html">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">v-for&lt;/span>=&lt;span class="hljs-string">"(item, index) in articles"&lt;/span> &lt;span class="hljs-attr">:key&lt;/span>=&lt;span class="hljs-string">"index"&lt;/span> @&lt;span class="hljs-attr">click&lt;/span>=&lt;span class="hljs-string">"emitIndex(index)"&lt;/span>&gt;&lt;/span>{{item}}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  &lt;span class="hljs-attr">props&lt;/span>: [&lt;span class="hljs-string">'articles'&lt;/span>],
  &lt;span class="hljs-attr">methods&lt;/span>: {
    emitIndex(index) {
      &lt;span class="hljs-keyword">this&lt;/span>.$emit(&lt;span class="hljs-string">'onEmitIndex'&lt;/span>, index)
    }
  }
}
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-3">
    二、 <code>$children</code> / <code>$parent</code>
  </h3><figure><figcaption></figcaption></figure>
  
  <p>
    上面这张图片是<code>vue</code>官方的解释，通过<code>$parent</code>和<code>$children</code>就可以访问组件的实例，拿到实例代表什么？代表可以访问此组件的所有方法和<code>data</code>。接下来就是怎么实现拿到指定组件的实例。
  </p>
  
  <h4 class="heading" data-id="heading-4">
    使用方法
  </h4>
  
  <pre><code class="hljs html copyable" lang="html">// 父组件中
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"hello_world"&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>{{msg}}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">com-a&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">com-a&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> @&lt;span class="hljs-attr">click&lt;/span>=&lt;span class="hljs-string">"changeA"&lt;/span>&gt;&lt;/span>点击改变子组件值&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">import&lt;/span> ComA &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./test/comA.vue'&lt;/span>
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'HelloWorld'&lt;/span>,
  &lt;span class="hljs-attr">components&lt;/span>: { ComA },
  data() {
    &lt;span class="hljs-keyword">return&lt;/span> {
      &lt;span class="hljs-attr">msg&lt;/span>: &lt;span class="hljs-string">'Welcome'&lt;/span>
    }
  },

  &lt;span class="hljs-attr">methods&lt;/span>: {
    changeA() {
      &lt;span class="hljs-comment">// 获取到子组件A&lt;/span>
      &lt;span class="hljs-keyword">this&lt;/span>.$children[&lt;span class="hljs-number">0&lt;/span>].messageA = &lt;span class="hljs-string">'this is new value'&lt;/span>
    }
  }
}
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <pre><code class="hljs html copyable" lang="html">// 子组件中
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"com_a"&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">span&lt;/span>&gt;&lt;/span>{{messageA}}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">span&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>获取父组件的值为:  {{parentVal}}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  data() {
    &lt;span class="hljs-keyword">return&lt;/span> {
      &lt;span class="hljs-attr">messageA&lt;/span>: &lt;span class="hljs-string">'this is old'&lt;/span>
    }
  },
  &lt;span class="hljs-attr">computed&lt;/span>:{
    parentVal(){
      &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-keyword">this&lt;/span>.$parent.msg;
    }
  }
}
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <blockquote>
    <p>
      要注意边界情况，如在<code>#app</code>上拿<code>$parent</code>得到的是<code>new Vue()</code>的实例，在这实例上再拿<code>$parent</code>得到的是<code>undefined</code>，而在最底层的子组件拿<code>$children</code>是个空数组。也要注意得到<code>$parent</code>和<code>$children</code>的值不一样，<code>$children</code> 的值是数组，而<code>$parent</code>是个对象
    </p>
  </blockquote>
  
  <h4 class="heading" data-id="heading-5">
    总结
  </h4>
  
  <p>
    上面两种方式用于父子组件之间的通信， 而使用props进行父子组件通信更加普遍; 二者皆不能用于非父子组件之间的通信。
  </p>
  
  <h3 class="heading" data-id="heading-6">
    三、<code>provide</code>/ <code>inject</code>
  </h3>
  
  <h4 class="heading" data-id="heading-7">
    概念:
  </h4>
  
  <p>
    <code>provide</code>/ <code>inject</code> 是<code>vue2.2.0</code>新增的api, 简单来说就是父组件中通过<code>provide</code>来提供变量, 然后再子组件中通过<code>inject</code>来注入变量。
  </p>
  
  <blockquote>
    <p>
      注意: 这里不论子组件嵌套有多深, 只要调用了<code>inject</code> 那么就可以注入<code>provide</code>中的数据，而不局限于只能从当前父组件的props属性中回去数据
    </p>
  </blockquote>
  
  <h4 class="heading" data-id="heading-8">
    举例验证
  </h4>
  
  <p>
    接下来就用一个例子来验证上面的描述: 假设有三个组件: A.vue、B.vue、C.vue 其中 C是B的子组件，B是A的子组件
  </p>
  
  <pre><code class="hljs html copyable" lang="html">// A.vue

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
 &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">comB&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">comB&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">import&lt;/span> comB &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'../components/test/comB.vue'&lt;/span>
  &lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
    &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">"A"&lt;/span>,
    &lt;span class="hljs-attr">provide&lt;/span>: {
      &lt;span class="hljs-attr">for&lt;/span>: &lt;span class="hljs-string">"demo"&lt;/span>
    },
    &lt;span class="hljs-attr">components&lt;/span>:{
      comB
    }
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <pre><code class="hljs html copyable" lang="html">// B.vue

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    {{demo}}
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">comC&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">comC&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">import&lt;/span> comC &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'../components/test/comC.vue'&lt;/span>
  &lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
    &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">"B"&lt;/span>,
    &lt;span class="hljs-attr">inject&lt;/span>: [&lt;span class="hljs-string">'for'&lt;/span>],
    data() {
      &lt;span class="hljs-keyword">return&lt;/span> {
        &lt;span class="hljs-attr">demo&lt;/span>: &lt;span class="hljs-keyword">this&lt;/span>.for
      }
    },
    &lt;span class="hljs-attr">components&lt;/span>: {
      comC
    }
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <pre><code class="hljs html copyable" lang="html">// C.vue
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    {{demo}}
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
    &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">"C"&lt;/span>,
    &lt;span class="hljs-attr">inject&lt;/span>: [&lt;span class="hljs-string">'for'&lt;/span>],
    data() {
      &lt;span class="hljs-keyword">return&lt;/span> {
        &lt;span class="hljs-attr">demo&lt;/span>: &lt;span class="hljs-keyword">this&lt;/span>.for
      }
    }
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-9">
    四、<code>ref</code> / <code>refs</code>
  </h3>
  
  <p>
    <code>ref</code>：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据， 我们看一个<code>ref</code> 来访问组件的例子:
  </p>
  
  <pre><code class="hljs javascript copyable" lang="javascript">&lt;span class="hljs-comment">// 子组件 A.vue&lt;/span>

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  data () {
    &lt;span class="hljs-keyword">return&lt;/span> {
      &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'Vue.js'&lt;/span>
    }
  },
  &lt;span class="hljs-attr">methods&lt;/span>: {
    sayHello () {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'hello'&lt;/span>)
    }
  }
}
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <pre><code class="hljs javascript copyable" lang="javascript">// 父组件 app.vue

&lt;template&gt;
  &lt;component-a ref="comA"&gt;&lt;/component-a&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    mounted () {
      const comA = this.$refs.comA;
      console.log(comA.name);  // Vue.js
      comA.sayHello();  // hello
    }
  }
&lt;/script&gt;
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-10">
    五、eventBus
  </h3>
  
  <p>
    <code>eventBus</code> 又称为事件总线，在vue中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件， 所以组件都可以通知其他组件。
  </p>
  
  <blockquote>
    <p>
      eventBus也有不方便之处, 当项目较大,就容易造成难以维护的灾难
    </p>
  </blockquote>
  
  <p>
    在Vue的项目中怎么使用<code>eventBus</code>来实现组件之间的数据通信呢?具体通过下面几个步骤
  </p>
  
  <h4 class="heading" data-id="heading-11">
    1. 初始化
  </h4>
  
  <p>
    首先需要创建一个事件总线并将其导出, 以便其他模块可以使用或者监听它.
  </p>
  
  <pre><code class="hljs javascript copyable" lang="javascript">&lt;span class="hljs-comment">// event-bus.js&lt;/span>

&lt;span class="hljs-keyword">import&lt;/span> Vue &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'vue'&lt;/span>
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">const&lt;/span> EventBus = &lt;span class="hljs-keyword">new&lt;/span> Vue()
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h4 class="heading" data-id="heading-12">
    2. 发送事件
  </h4>
  
  <p>
    假设你有两个组件: <code>additionNum</code> 和 <code>showNum</code>, 这两个组件可以是兄弟组件也可以是父子组件；这里我们以兄弟组件为例:
  </p>
  
  <pre><code class="hljs html copyable" lang="html">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">show-num-com&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">show-num-com&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">addition-num-com&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">addition-num-com&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">import&lt;/span> showNumCom &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./showNum.vue'&lt;/span>
&lt;span class="hljs-keyword">import&lt;/span> additionNumCom &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./additionNum.vue'&lt;/span>
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  &lt;span class="hljs-attr">components&lt;/span>: { showNumCom, additionNumCom }
}
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>

&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <pre><code class="hljs html copyable" lang="html">// addtionNum.vue 中发送事件

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> @&lt;span class="hljs-attr">click&lt;/span>=&lt;span class="hljs-string">"additionHandle"&lt;/span>&gt;&lt;/span>+加法器&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">import&lt;/span> {EventBus} &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./event-bus.js'&lt;/span>
&lt;span class="hljs-built_in">console&lt;/span>.log(EventBus)
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  data(){
    &lt;span class="hljs-keyword">return&lt;/span>{
      &lt;span class="hljs-attr">num&lt;/span>:&lt;span class="hljs-number">1&lt;/span>
    }
  },

  &lt;span class="hljs-attr">methods&lt;/span>:{
    additionHandle(){
      EventBus.$emit(&lt;span class="hljs-string">'addition'&lt;/span>, {
        &lt;span class="hljs-attr">num&lt;/span>:&lt;span class="hljs-keyword">this&lt;/span>.num++
      })
    }
  }
}
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h4 class="heading" data-id="heading-13">
    3. 接收事件
  </h4>
  
  <pre><code class="hljs html copyable" lang="html">// showNum.vue 中接收事件

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>计算和: {{count}}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">import&lt;/span> { EventBus } &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./event-bus.js'&lt;/span>
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  data() {
    &lt;span class="hljs-keyword">return&lt;/span> {
      &lt;span class="hljs-attr">count&lt;/span>: &lt;span class="hljs-number">0&lt;/span>
    }
  },

  mounted() {
    EventBus.$on(&lt;span class="hljs-string">'addition'&lt;/span>, param =&gt; {
      &lt;span class="hljs-keyword">this&lt;/span>.count = &lt;span class="hljs-keyword">this&lt;/span>.count + param.num;
    })
  }
}
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    这样就实现了在组件<code>addtionNum.vue</code>中点击相加按钮, 在<code>showNum.vue</code>中利用传递来的 <code>num</code> 展示求和的结果.
  </p>
  
  <h4 class="heading" data-id="heading-14">
    4. 移除事件监听者
  </h4>
  
  <p>
    如果想移除事件的监听, 可以像下面这样操作:
  </p>
  
  <pre><code class="hljs javascript copyable" lang="javascript">&lt;span class="hljs-keyword">import&lt;/span> { eventBus } &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'event-bus.js'&lt;/span>
EventBus.$off(&lt;span class="hljs-string">'addition'&lt;/span>, {})
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-15">
    六、Vuex
  </h3>
  
  <h4 class="heading" data-id="heading-16">
    1. Vuex介绍
  </h4>
  
  <p>
    Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化. Vuex 解决了<code>多个视图依赖于同一状态</code>和<code>来自不同视图的行为需要变更同一状态</code>的问题，将开发者的精力聚焦于数据的更新而不是数据在组件之间的传递上
  </p>
  
  <h4 class="heading" data-id="heading-17">
    2. Vuex各个模块
  </h4>
  
  <ol>
    <li>
      <code>state</code>：用于数据的存储，是store中的唯一数据源
    </li>
    <li>
      <code>getters</code>：如vue中的计算属性一样，基于state数据的二次包装，常用于数据的筛选和多个数据的相关性计算
    </li>
    <li>
      <code>mutations</code>：类似函数，改变state数据的唯一途径，且不能用于处理异步事件
    </li>
    <li>
      <code>actions</code>：类似于<code>mutation</code>，用于提交<code>mutation</code>来改变状态，而不直接变更状态，可以包含任意异步操作
    </li>
    <li>
      <code>modules</code>：类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护
    </li>
  </ol>
  
  <h4 class="heading" data-id="heading-18">
    3. Vuex实例应用
  </h4>
  
  <pre><code class="hljs html copyable" lang="html">// 父组件

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"app"&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">ChildA&lt;/span>/&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">ChildB&lt;/span>/&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">import&lt;/span> ChildA &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./components/ChildA'&lt;/span> &lt;span class="hljs-comment">// 导入A组件&lt;/span>
  &lt;span class="hljs-keyword">import&lt;/span> ChildB &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./components/ChildB'&lt;/span> &lt;span class="hljs-comment">// 导入B组件&lt;/span>

  &lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
    &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">'App'&lt;/span>,
    &lt;span class="hljs-attr">components&lt;/span>: {ChildA, ChildB} &lt;span class="hljs-comment">// 注册A、B组件&lt;/span>
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <pre><code class="hljs html copyable" lang="html">// 子组件childA

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"childA"&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">h1&lt;/span>&gt;&lt;/span>我是A组件&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">h1&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> @&lt;span class="hljs-attr">click&lt;/span>=&lt;span class="hljs-string">"transform"&lt;/span>&gt;&lt;/span>点我让B组件接收到数据&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>因为你点了B，所以我的信息发生了变化：{{BMessage}}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
    data() {
      &lt;span class="hljs-keyword">return&lt;/span> {
        &lt;span class="hljs-attr">AMessage&lt;/span>: &lt;span class="hljs-string">'Hello，B组件，我是A组件'&lt;/span>
      }
    },
    &lt;span class="hljs-attr">computed&lt;/span>: {
      BMessage() {
        &lt;span class="hljs-comment">// 这里存储从store里获取的B组件的数据&lt;/span>
        &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-keyword">this&lt;/span>.$store.state.BMsg
      }
    },
    &lt;span class="hljs-attr">methods&lt;/span>: {
      transform() {
        &lt;span class="hljs-comment">// 触发receiveAMsg，将A组件的数据存放到store里去&lt;/span>
        &lt;span class="hljs-keyword">this&lt;/span>.$store.commit(&lt;span class="hljs-string">'receiveAMsg'&lt;/span>, {
          &lt;span class="hljs-attr">AMsg&lt;/span>: &lt;span class="hljs-keyword">this&lt;/span>.AMessage
        })
      }
    }
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <pre><code class="hljs html copyable" lang="html">// 子组件 childB

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"childB"&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">h1&lt;/span>&gt;&lt;/span>我是B组件&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">h1&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">button&lt;/span> @&lt;span class="hljs-attr">click&lt;/span>=&lt;span class="hljs-string">"transform"&lt;/span>&gt;&lt;/span>点我让A组件接收到数据&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">button&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>因为你点了A，所以我的信息发生了变化：{{AMessage}}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
  &lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
    data() {
      &lt;span class="hljs-keyword">return&lt;/span> {
        &lt;span class="hljs-attr">BMessage&lt;/span>: &lt;span class="hljs-string">'Hello，A组件，我是B组件'&lt;/span>
      }
    },
    &lt;span class="hljs-attr">computed&lt;/span>: {
      AMessage() {
        &lt;span class="hljs-comment">// 这里存储从store里获取的A组件的数据&lt;/span>
        &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-keyword">this&lt;/span>.$store.state.AMsg
      }
    },
    &lt;span class="hljs-attr">methods&lt;/span>: {
      transform() {
        &lt;span class="hljs-comment">// 触发receiveBMsg，将B组件的数据存放到store里去&lt;/span>
        &lt;span class="hljs-keyword">this&lt;/span>.$store.commit(&lt;span class="hljs-string">'receiveBMsg'&lt;/span>, {
          &lt;span class="hljs-attr">BMsg&lt;/span>: &lt;span class="hljs-keyword">this&lt;/span>.BMessage
        })
      }
    }
  }
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <p>
    vuex的<code>store,js</code>
  </p>
  
  <pre><code class="hljs javascript copyable" lang="javascript">&lt;span class="hljs-keyword">import&lt;/span> Vue &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'vue'&lt;/span>
&lt;span class="hljs-keyword">import&lt;/span> Vuex &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'vuex'&lt;/span>
Vue.use(Vuex)
&lt;span class="hljs-keyword">const&lt;/span> state = {
  &lt;span class="hljs-comment">// 初始化A和B组件的数据，等待获取&lt;/span>
  AMsg: &lt;span class="hljs-string">''&lt;/span>,
  &lt;span class="hljs-attr">BMsg&lt;/span>: &lt;span class="hljs-string">''&lt;/span>
}

&lt;span class="hljs-keyword">const&lt;/span> mutations = {
  receiveAMsg(state, payload) {
    &lt;span class="hljs-comment">// 将A组件的数据存放于state&lt;/span>
    state.AMsg = payload.AMsg
  },
  receiveBMsg(state, payload) {
    &lt;span class="hljs-comment">// 将B组件的数据存放于state&lt;/span>
    state.BMsg = payload.BMsg
  }
}

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> Vuex.Store({
  state,
  mutations
})
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-19">
    七、<code>localStorage</code> / <code>sessionStorage</code>
  </h3>
  
  <p>
    这种通信比较简单,缺点是数据和状态比较混乱,不太容易维护。 通过<code>window.localStorage.getItem(key)</code>获取数据 通过<code>window.localStorage.setItem(key,value)</code>存储数据
  </p>
  
  <blockquote>
    <p>
      注意用<code>JSON.parse()</code> / <code>JSON.stringify()</code> 做数据格式转换 <code>localStorage</code> / <code>sessionStorage</code>可以结合<code>vuex</code>, 实现数据的持久保存,同时使用vuex解决数据和状态混乱问题.
    </p>
  </blockquote>
  
  <h3 class="heading" data-id="heading-20">
    八 <code>$attrs</code>与 <code>$listeners</code>
  </h3>
  
  <p>
    现在我们来讨论一种情况， 我们一开始给出的组件关系图中A组件与D组件是隔代关系， 那它们之前进行通信有哪些方式呢？
  </p>
  
  <ol>
    <li>
      使用<code>props</code>绑定来进行一级一级的信息传递, 如果D组件中状态改变需要传递数据给A, 使用事件系统一级级往上传递
    </li>
    <li>
      使用<code>eventBus</code>,这种情况下还是比较适合使用, 但是碰到多人合作开发时, 代码维护性较低, 可读性也低
    </li>
    <li>
      使用Vuex来进行数据管理, 但是如果仅仅是传递数据, 而不做中间处理,使用Vuex处理感觉有点大材小用了.
    </li>
  </ol>
  
  <p>
    在<code>vue2.4</code>中，为了解决该需求，引入了<code>$attrs</code> 和<code>$listeners</code> ， 新增了<code>inheritAttrs</code> 选项。 在版本2.4以前，默认情况下,父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)，将会“回退”且作为普通的HTML特性应用在子组件的根元素上。接下来看一个跨级通信的例子:
  </p>
  
  <pre><code class="hljs html copyable" lang="html">// app.vue
// index.vue

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">child-com1&lt;/span>
      &lt;span class="hljs-attr">:name&lt;/span>=&lt;span class="hljs-string">"name"&lt;/span>
      &lt;span class="hljs-attr">:age&lt;/span>=&lt;span class="hljs-string">"age"&lt;/span>
      &lt;span class="hljs-attr">:gender&lt;/span>=&lt;span class="hljs-string">"gender"&lt;/span>
      &lt;span class="hljs-attr">:height&lt;/span>=&lt;span class="hljs-string">"height"&lt;/span>
      &lt;span class="hljs-attr">title&lt;/span>=&lt;span class="hljs-string">"程序员成长指北"&lt;/span>
    &gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">child-com1&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">const&lt;/span> childCom1 = &lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> &lt;span class="hljs-keyword">import&lt;/span>(&lt;span class="hljs-string">"./childCom1.vue"&lt;/span>);
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  &lt;span class="hljs-attr">components&lt;/span>: { childCom1 },
  data() {
    &lt;span class="hljs-keyword">return&lt;/span> {
      &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-string">"zhang"&lt;/span>,
      &lt;span class="hljs-attr">age&lt;/span>: &lt;span class="hljs-string">"18"&lt;/span>,
      &lt;span class="hljs-attr">gender&lt;/span>: &lt;span class="hljs-string">"女"&lt;/span>,
      &lt;span class="hljs-attr">height&lt;/span>: &lt;span class="hljs-string">"158"&lt;/span>
    };
  }
};
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <pre><code class="hljs html copyable" lang="html">// childCom1.vue

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"border"&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>name: {{ name}}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>childCom1的$attrs: {{ $attrs }}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">child-com2&lt;/span> &lt;span class="hljs-attr">v-bind&lt;/span>=&lt;span class="hljs-string">"$attrs"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">child-com2&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">
&lt;span class="hljs-keyword">const&lt;/span> childCom2 = &lt;span class="hljs-function">&lt;span class="hljs-params">()&lt;/span> =&gt;&lt;/span> &lt;span class="hljs-keyword">import&lt;/span>(&lt;span class="hljs-string">"./childCom2.vue"&lt;/span>);
&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  &lt;span class="hljs-attr">components&lt;/span>: {
    childCom2
  },
  &lt;span class="hljs-attr">inheritAttrs&lt;/span>: &lt;span class="hljs-literal">false&lt;/span>, &lt;span class="hljs-comment">// 可以关闭自动挂载到组件根元素上的没有在props声明的属性&lt;/span>
  props: {
    &lt;span class="hljs-attr">name&lt;/span>: &lt;span class="hljs-built_in">String&lt;/span> &lt;span class="hljs-comment">// name作为props属性绑定&lt;/span>
  },
  created() {
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-keyword">this&lt;/span>.$attrs);
     &lt;span class="hljs-comment">// { "age": "18", "gender": "女", "height": "158", "title": "程序员成长指北" }&lt;/span>
  }
};
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <pre><code class="hljs html copyable" lang="html">// childCom2.vue

&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">class&lt;/span>=&lt;span class="hljs-string">"border"&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>age: {{ age}}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>
    &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>childCom2: {{ $attrs }}&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">p&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">template&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>&lt;span class="javascript">

&lt;span class="hljs-keyword">export&lt;/span> &lt;span class="hljs-keyword">default&lt;/span> {
  &lt;span class="hljs-attr">inheritAttrs&lt;/span>: &lt;span class="hljs-literal">false&lt;/span>,
  &lt;span class="hljs-attr">props&lt;/span>: {
    &lt;span class="hljs-attr">age&lt;/span>: &lt;span class="hljs-built_in">String&lt;/span>
  },
  created() {
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-keyword">this&lt;/span>.$attrs);
    &lt;span class="hljs-comment">// { "gender": "女", "height": "158", "title": "程序员成长指北" }&lt;/span>
  }
};
&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="copy-code-btn">复制代码&lt;/span></code></pre>
  
  <h3 class="heading" data-id="heading-21">
    总结
  </h3>
  
  <p>
    常见使用场景可以分为三类:
  </p>
  
  <ul>
    <li>
      父子组件通信: <code>props</code>; <code>$parent</code> / <code>$children</code>; <code>provide</code> / <code>inject</code> ; <code>ref</code> ; <code>$attrs</code> / <code>$listeners</code>
    </li>
    <li>
      兄弟组件通信: <code>eventBus</code> ; vuex
    </li>
    <li>
      跨级通信: <code>eventBus</code>；Vuex；<code>provide</code> / <code>inject</code> 、<code>$attrs</code> / <code>$listeners</code>
    </li>
  </ul>
</div>

原文链接：https://juejin.im/post/5d267dcdf265da1b957081a3
