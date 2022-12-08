---
title: BSR、SSG、SSR之next.js

---

  Next.js 是一个轻量级的 React 服务端渲染框架


它支持三种渲染方式包括


  客户端渲染 BSR (Broswer Side Render)


  静态页面生成 SSG (Static Site Generation)


  服务端渲染 SSR (Server Side Render)


## 旧瓶装新酒


  上面说的几种渲染方式，其实并非什么新东西，其实可以和这些技术对应起来


  BSR &#8212; 用 JS、Vue、React 创建 HTML


  SSG &#8212; 页面静态化，把 PHP 提前渲染成 HTML


  SSR &#8212; PHP、Python、Ruby、Java 后台的基本功能


## 不同点


  Next.js 的预渲染可以与[前端](https://www.w3cdoc.com) React 无缝对接

* * *


  下面，以一个文章列表页面作为例子，分别解析一下三种渲染方式吧

## 客户端渲染


  客户端渲染，顾名思义就是只在[浏览器](https://www.w3cdoc.com)上执行的渲染，通过Vue 和 React 构建的单页面应用SPA 都是采用这种方式渲染

### **缺点**


  1 .白屏，在 AJAX 得到渲染之前，页面中并没有内容，只能通过 Loading 来过度


  2. SEO 不友好，因为搜索引擎访问页面， 默认不会执行 JS，只能看到 HTML，而不会等待 AJAX 异步请求数据，所以搜索不到页面内容


代码

<div class="highlight">
  ```
&lt;span class="kr">import&lt;/span> &lt;span class="p">{&lt;/span>&lt;span class="nx">NextPage&lt;/span>&lt;span class="p">}&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'next'&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kr">import&lt;/span> &lt;span class="nx">axios&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'axios'&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kr">import&lt;/span> &lt;span class="p">{&lt;/span>&lt;span class="nx">useEffect&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">useState&lt;/span>&lt;span class="p">}&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s2">"react"&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kr">import&lt;/span> &lt;span class="o">*&lt;/span> &lt;span class="nx">as&lt;/span> &lt;span class="nx">React&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s2">"react"&lt;/span>&lt;span class="p">;&lt;/span>

&lt;span class="nx">type&lt;/span> &lt;span class="nx">Post&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="nx">id&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">string&lt;/span>&lt;span class="p">,&lt;/span>
    &lt;span class="nx">id&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">string&lt;/span>&lt;span class="p">,&lt;/span>
    &lt;span class="nx">title&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">string&lt;/span>
&lt;span class="p">}&lt;/span>
&lt;span class="kr">const&lt;/span> &lt;span class="nx">PostsIndex&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">NextPage&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">()&lt;/span> &lt;span class="p">=>&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="c1">// [] 表示只在第一次渲染的时候请求
&lt;/span>    &lt;span class="kr">const&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="nx">posts&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">setPosts&lt;/span>&lt;span class="p">]&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">useState&lt;/span>&lt;span class="o">&lt;&lt;/span>&lt;span class="nx">Post&lt;/span>&lt;span class="p">[]&lt;/span>&lt;span class="o">>&lt;/span>&lt;span class="p">([]);&lt;/span>
    &lt;span class="kr">const&lt;/span> &lt;span class="p">[&lt;/span>&lt;span class="nx">isLoading&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">setIsLoading&lt;/span>&lt;span class="p">]&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">useState&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="kc">false&lt;/span>&lt;span class="p">);&lt;/span>
    &lt;span class="nx">useEffect&lt;/span>&lt;span class="p">(()&lt;/span> &lt;span class="p">=>&lt;/span> &lt;span class="p">{&lt;/span>
        &lt;span class="nx">setIsLoading&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="kc">true&lt;/span>&lt;span class="p">);&lt;/span>
        &lt;span class="c1">// 使用 AJAX 异步请求数据
&lt;/span>        &lt;span class="nx">axios&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">get&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="s1">'/api/posts'&lt;/span>&lt;span class="p">).&lt;/span>&lt;span class="nx">then&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">response&lt;/span> &lt;span class="p">=>&lt;/span> &lt;span class="p">{&lt;/span>
          &lt;span class="nx">setPosts&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">response&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">data&lt;/span>&lt;span class="p">);&lt;/span>
          &lt;span class="nx">setIsLoading&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="kc">false&lt;/span>&lt;span class="p">);&lt;/span>
        &lt;span class="p">},&lt;/span> &lt;span class="p">()&lt;/span> &lt;span class="p">=>&lt;/span> &lt;span class="p">{&lt;/span>
            &lt;span class="nx">setIsLoading&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="kc">true&lt;/span>&lt;span class="p">);&lt;/span>
        &lt;span class="p">})&lt;/span>
    &lt;span class="p">},&lt;/span> &lt;span class="p">[]);&lt;/span>
    &lt;span class="k">return&lt;/span> &lt;span class="p">(&lt;/span>
        &lt;span class="o">&lt;&lt;/span>&lt;span class="nx">div&lt;/span>&lt;span class="o">>&lt;/span>
            &lt;span class="o">&lt;&lt;/span>&lt;span class="nx">h1&lt;/span>&lt;span class="o">>&lt;/span>&lt;span class="nx">文章列表&lt;/span>&lt;span class="o">&lt;&lt;/span>&lt;span class="err">/h1>&lt;/span>
            &lt;span class="p">{&lt;/span>&lt;span class="nx">isLoading&lt;/span> &lt;span class="o">?&lt;/span> &lt;span class="o">&lt;&lt;/span>&lt;span class="nx">div&lt;/span>&lt;span class="o">>&lt;/span>&lt;span class="nx">加载中&lt;/span>&lt;span class="o">&lt;&lt;/span>&lt;span class="err">/div> :&lt;/span>
                &lt;span class="nx">posts&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">p&lt;/span> &lt;span class="p">=>&lt;/span> &lt;span class="o">&lt;&lt;/span>&lt;span class="nx">div&lt;/span> &lt;span class="nx">key&lt;/span>&lt;span class="o">=&lt;/span>&lt;span class="p">{&lt;/span>&lt;span class="nx">p&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">id&lt;/span>&lt;span class="p">}&lt;/span>&lt;span class="o">>&lt;/span>
                &lt;span class="p">{&lt;/span>&lt;span class="nx">p&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">id&lt;/span>&lt;span class="p">}&lt;/span>
            &lt;span class="o">&lt;&lt;/span>&lt;span class="err">/div>)}&lt;/span>
        &lt;span class="o">&lt;&lt;/span>&lt;span class="err">/div>&lt;/span>
    &lt;span class="p">)&lt;/span>
&lt;span class="p">};&lt;/span>

&lt;span class="kr">export&lt;/span> &lt;span class="k">default&lt;/span> &lt;span class="nx">PostsIndex&lt;/span>&lt;span class="p">;&lt;/span>

```
</div>


  当网络不好的时候，loading 的时间很长，页面肯能会出现长时间白屏


  由于初次请求的 HTML 中并没有文章内容，需要通过 AJAX 异步加载数据，而这个加载数据渲染的过程都是在客户端完成的，所以称为客户端渲染

* * *

## **静态页面生成 SSG**


  在文章列表页面里，其实每个用户查到的内容都是一样的


  那为什么还需要在每个人的[浏览器](https://www.w3cdoc.com)上渲染一遍呢？


  为什么不在后端渲染好，然后发给每个人


  这样就可以


  N 次渲染变成了 1 次渲染


  N 次客户端渲染变成了 1 次静态页面生成


  这个过程成为 动态内容静态化


优缺点


  优点：这种方式可以解决白屏问题、SEO 问题


  缺点：所有用户看到的都是同一个页面，无法生成用户相关内容


如何实现


  首先[我们](https://www.w3cdoc.com)来想一个问题


  该如何获取 posts 呢？ 因为加载数据的操作在后端，想通过 AJAX 获取 posts 显然不合适


  答案是： 通过 getStaticProps 获取 posts


  getStaticProps 是 Next.js 提供的一个方法，会在后端执行，返回一个 props，NextPage 在渲染的时候可以使用这个 props


代码

<div class="highlight">
  ```
&lt;span class="kr">import&lt;/span> &lt;span class="p">{&lt;/span>&lt;span class="nx">GetStaticProps&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">NextPage&lt;/span>&lt;span class="p">}&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'next'&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kr">import&lt;/span> &lt;span class="p">{&lt;/span>&lt;span class="nx">getPosts&lt;/span>&lt;span class="p">}&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'../../lib/posts'&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kr">import&lt;/span> &lt;span class="nx">Link&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'next/link'&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kr">import&lt;/span> &lt;span class="o">*&lt;/span> &lt;span class="nx">as&lt;/span> &lt;span class="nx">React&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'react'&lt;/span>&lt;span class="p">;&lt;/span>

&lt;span class="nx">type&lt;/span> &lt;span class="nx">Post&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="nx">id&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">string&lt;/span>&lt;span class="p">,&lt;/span>
  &lt;span class="nx">title&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">string&lt;/span>
&lt;span class="p">}&lt;/span>

&lt;span class="nx">type&lt;/span> &lt;span class="nx">Props&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="nx">posts&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">Post&lt;/span>&lt;span class="p">[];&lt;/span>
&lt;span class="p">}&lt;/span>
&lt;span class="c1">// props 中有下面导出的数据 posts
&lt;/span>&lt;span class="kr">const&lt;/span> &lt;span class="nx">PostsIndex&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">NextPage&lt;/span>&lt;span class="o">&lt;&lt;/span>&lt;span class="nx">Props&lt;/span>&lt;span class="o">>&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">(&lt;/span>&lt;span class="nx">props&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">=>&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="kr">const&lt;/span> &lt;span class="p">{&lt;/span>&lt;span class="nx">posts&lt;/span>&lt;span class="p">}&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">props&lt;/span>&lt;span class="p">;&lt;/span>
 &lt;span class="c1">// 前后端控制台都能打印 -> 同构
&lt;/span>  &lt;span class="nx">console&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">log&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">posts&lt;/span>&lt;span class="p">);&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="p">(&lt;/span>
    &lt;span class="o">&lt;&lt;/span>&lt;span class="nx">div&lt;/span>&lt;span class="o">>&lt;/span>
      &lt;span class="o">&lt;&lt;/span>&lt;span class="nx">h1&lt;/span>&lt;span class="o">>&lt;/span>&lt;span class="nx">文章列表&lt;/span>&lt;span class="o">&lt;&lt;/span>&lt;span class="err">/h1>&lt;/span>
      &lt;span class="p">{&lt;/span>&lt;span class="nx">posts&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">map&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">p&lt;/span> &lt;span class="p">=>&lt;/span> &lt;span class="o">&lt;&lt;/span>&lt;span class="nx">div&lt;/span> &lt;span class="nx">key&lt;/span>&lt;span class="o">=&lt;/span>&lt;span class="p">{&lt;/span>&lt;span class="nx">p&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">id&lt;/span>&lt;span class="p">}&lt;/span>&lt;span class="o">>&lt;/span>
        &lt;span class="o">&lt;&lt;/span>&lt;span class="nx">Link&lt;/span> &lt;span class="nx">href&lt;/span>&lt;span class="o">=&lt;/span>&lt;span class="p">{&lt;/span>&lt;span class="sb">`/posts/&lt;/span>&lt;span class="si">${&lt;/span>&lt;span class="nx">p&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">id&lt;/span>&lt;span class="si">}&lt;/span>&lt;span class="sb">`&lt;/span>&lt;span class="p">}&lt;/span>&lt;span class="o">>&lt;/span>
          &lt;span class="o">&lt;&lt;/span>&lt;span class="nx">a&lt;/span>&lt;span class="o">>&lt;/span>
            &lt;span class="p">{&lt;/span>&lt;span class="nx">p&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">id&lt;/span>&lt;span class="p">}&lt;/span>
          &lt;span class="o">&lt;&lt;/span>&lt;span class="err">/a>&lt;/span>
        &lt;span class="o">&lt;&lt;/span>&lt;span class="err">/Link>&lt;/span>
      &lt;span class="o">&lt;&lt;/span>&lt;span class="err">/div>)}&lt;/span>
    &lt;span class="o">&lt;&lt;/span>&lt;span class="err">/div>&lt;/span>
  &lt;span class="p">);&lt;/span>
&lt;span class="p">};&lt;/span>

&lt;span class="kr">export&lt;/span> &lt;span class="k">default&lt;/span> &lt;span class="nx">PostsIndex&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="c1">// 实现SSG
&lt;/span>&lt;span class="kr">export&lt;/span> &lt;span class="kr">const&lt;/span> &lt;span class="nx">getStaticProps&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">GetStaticProps&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">async&lt;/span> &lt;span class="p">()&lt;/span> &lt;span class="p">=>&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="kr">const&lt;/span> &lt;span class="nx">posts&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">await&lt;/span> &lt;span class="nx">getPosts&lt;/span>&lt;span class="p">();&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="nx">props&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="p">{&lt;/span>
      &lt;span class="nx">posts&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">JSON&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">parse&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">JSON&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">stringify&lt;/span>&lt;span class="p">(&lt;/span>&lt;span class="nx">posts&lt;/span>&lt;span class="p">))&lt;/span>
    &lt;span class="p">}&lt;/span>
  &lt;span class="p">};&lt;/span>
&lt;span class="p">};&lt;/span>

```
</div>

## [前端](https://www.w3cdoc.com)是怎么不通过 AJAX 获取到数据的


  posts 数据[我们](https://www.w3cdoc.com)只在服务器获取了，但又是怎样传递给[前端](https://www.w3cdoc.com)的呢？


  发现玄机
<figure data-size="normal">


  <img loading="lazy" class="alignnone  wp-image-7048 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505510aec0a.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505510aec0a.png?x-oss-process=image/format,webp" alt="" width="486" height="507" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505510aec0a.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505510aec0a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_288,h_300/format,webp 288w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505510aec0a.png?x-oss-process=image/quality,q_50/resize,m_fill,w_575,h_600/format,webp 575w" sizes="(max-width: 486px) 100vw, 486px" />
</figure>


  [我们](https://www.w3cdoc.com)可以看到玄机就藏在 id 为 <i>_NEXT_DATA__</i> 的 script 标签中，里面储存了传给[前端](https://www.w3cdoc.com)的 props 数据


  这就是同构 SSR 的好处，后端可以将数据直接传给[前端](https://www.w3cdoc.com)，而不需要 AJAX 异步获取

## 静态化的时机

### 环境


  在 开发环境 ，每次请求都会运行一次 getStaticProps 这是为了方便你修改代码重新运行


  在 生成环境，getStaticProps 只在 build 是运行一次，这样可以提供一份 HTML 给所有的用户下载



如何体验生成环境

<div class="highlight">
  ```
yarn build
yarn start
```
</div>


  打包后[我们](https://www.w3cdoc.com)可以会看到这样


  <img loading="lazy" class="alignnone  wp-image-7049 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505523cdc90.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505523cdc90.png?x-oss-process=image/format,webp" alt="" width="528" height="236" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505523cdc90.png?x-oss-process=image/format,webp 720w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505523cdc90.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_134/format,webp 300w" sizes="(max-width: 528px) 100vw, 528px" />


解读


  我看看到的页面前的三种图标，分别是 λ ○ ●


  λ (Serve) SSR 不能自动创建 HTML (下面会介绍)


  ○ (Static) 自动创建 HTML (发现你没用到 props)


  ● (SSG) 自动创建 HTML + JSON (等你用到 props)

## 三种文件类型


  build 完成后，[我们](https://www.w3cdoc.com)查看.next 文件里面，发现 posts.html、posts.js、posts.json
<figure data-size="normal">


  <img loading="lazy" class="alignnone  wp-image-7050 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250553123c1d.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250553123c1d.png?x-oss-process=image/format,webp" alt="" width="460" height="450" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250553123c1d.png?x-oss-process=image/format,webp 611w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250553123c1d.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_294/format,webp 300w" sizes="(max-width: 460px) 100vw, 460px" />
</figure>


  posts.html 含有静态内容，用于用户直接访问


  post.js 也含有静态内容，用于快速导航（与 HTML 对应）


  posts.json 含有数据，跟 posts.js 结合得到页面



为什么不直接把数据放入 posts.js 呢？


  显然是为了 posts.js 接受不同的数据，当[我们](https://www.w3cdoc.com)展示每篇博客的时候，他们的样式相同，内容不同，就会用到这个功能


动态内容静态化


  如果动态内容与用户无关，那么可以提前静态化


  通过 getStaticProps 可以获取数据


静态内容+数据(本地获取) 就得到了完整的页面


  代替了之前的 静态内容+动态内容(AJAX 获取)


* * *

## **服务端渲染（SSR）**


  如果页面和用户相关呢？


  这种情况较难提前静态化，需要在 用户请求时，获取用户信息，然后 通过用户信息去数据库拿数据，如果非要做，就要给每个用户创建一个页面，有时候这些数据更新极快，无法提前静态化, 比如微博首页的信息流


  那怎么办？


  要么客户端渲染, 会出现白屏


  要么服务端渲染 SSR，没有白屏


运行时机


  无论时开发环境还是生成环境，都是在请求之后运行 getServerSideProps


代码


  和 SSG 代码基本一致，不过使用了 getSeverSideProps


  这段代码实现的时，服务器响应请求后获取[浏览器](https://www.w3cdoc.com)信息，返回给[前端](https://www.w3cdoc.com)展示

<div class="highlight">
  ```
&lt;span class="kr">import&lt;/span> &lt;span class="p">{&lt;/span>&lt;span class="nx">GetServerSideProps&lt;/span>&lt;span class="p">,&lt;/span> &lt;span class="nx">NextPage&lt;/span>&lt;span class="p">}&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'next'&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kr">import&lt;/span> &lt;span class="o">*&lt;/span> &lt;span class="nx">as&lt;/span> &lt;span class="nx">React&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'react'&lt;/span>&lt;span class="p">;&lt;/span>
&lt;span class="kr">import&lt;/span> &lt;span class="p">{&lt;/span>&lt;span class="nx">IncomingHttpHeaders&lt;/span>&lt;span class="p">}&lt;/span> &lt;span class="nx">from&lt;/span> &lt;span class="s1">'http'&lt;/span>&lt;span class="p">;&lt;/span>

&lt;span class="nx">type&lt;/span> &lt;span class="nx">Props&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="nx">browser&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">string&lt;/span>
&lt;span class="p">}&lt;/span>
&lt;span class="kr">const&lt;/span> &lt;span class="nx">index&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">NextPage&lt;/span>&lt;span class="o">&lt;&lt;/span>&lt;span class="nx">Props&lt;/span>&lt;span class="o">>&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="p">(&lt;/span>&lt;span class="nx">props&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">=>&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="p">(&lt;/span>
    &lt;span class="o">&lt;&lt;/span>&lt;span class="nx">div&lt;/span>&lt;span class="o">>&lt;/span>
      &lt;span class="o">&lt;&lt;/span>&lt;span class="nx">h1&lt;/span>&lt;span class="o">>&lt;/span>&lt;span class="nx">你的[浏览器](https://www.w3cdoc.com)是&lt;/span> &lt;span class="p">{&lt;/span>&lt;span class="nx">props&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">browser&lt;/span>&lt;span class="p">}&lt;/span>&lt;span class="o">&lt;&lt;/span>&lt;span class="err">/h1>&lt;/span>
    &lt;span class="o">&lt;&lt;/span>&lt;span class="err">/div>&lt;/span>
  &lt;span class="p">);&lt;/span>
&lt;span class="p">};&lt;/span>
&lt;span class="kr">export&lt;/span> &lt;span class="k">default&lt;/span> &lt;span class="nx">index&lt;/span>&lt;span class="p">;&lt;/span>

&lt;span class="kr">export&lt;/span> &lt;span class="kr">const&lt;/span> &lt;span class="nx">getServerSideProps&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="nx">GetServerSideProps&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">async&lt;/span> &lt;span class="p">(&lt;/span>&lt;span class="nx">context&lt;/span>&lt;span class="p">)&lt;/span> &lt;span class="p">=>&lt;/span> &lt;span class="p">{&lt;/span>
  &lt;span class="kr">const&lt;/span> &lt;span class="nx">headers&lt;/span>&lt;span class="o">:&lt;/span>&lt;span class="nx">IncomingHttpHeaders&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">context&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">req&lt;/span>&lt;span class="p">.&lt;/span>&lt;span class="nx">headers&lt;/span>&lt;span class="p">;&lt;/span>
  &lt;span class="kr">const&lt;/span> &lt;span class="nx">browser&lt;/span> &lt;span class="o">=&lt;/span> &lt;span class="nx">headers&lt;/span>&lt;span class="p">[&lt;/span>&lt;span class="s1">'user-agent'&lt;/span>&lt;span class="p">];&lt;/span>
  &lt;span class="k">return&lt;/span> &lt;span class="p">{&lt;/span>
    &lt;span class="nx">props&lt;/span>&lt;span class="o">:&lt;/span> &lt;span class="p">{&lt;/span>
      &lt;span class="nx">browser&lt;/span>
    &lt;span class="p">}&lt;/span>
  &lt;span class="p">};&lt;/span>
&lt;span class="p">};&lt;/span>

```
</div>


SSR 原理


  推荐 <a class=" wrap external" href="https://link.zhihu.com/?target=https%3A//reactjs.org/docs/react-dom-server.html%23rendertostring" target="_blank" rel="nofollow noopener noreferrer" data-za-detail-view-id="1043">在后端 renderToString() 在[前端](https://www.w3cdoc.com) hydrate()</a>


  后端将页面渲染，返回 HTML String 格式，传递到[前端](https://www.w3cdoc.com)，[前端](https://www.w3cdoc.com)进行 hydrate() ,会保留 HTML 并附上时间监听，也就是说后端渲染 HTML，[前端](https://www.w3cdoc.com)添加监听。


  [前端](https://www.w3cdoc.com)也会渲染一次，用以确保前后端渲染结果一致

* * *

## 总结

### 客户端渲染 SSR


  只在[浏览器](https://www.w3cdoc.com)上运行，缺点 SEO 不友好，白屏


静态页面生成 SSG


  Static Site Generation，解决白屏问题、SEO 问题


  缺点：无法生成和用户相关的内容 （所有用户请求的结果都一样）


服务端渲染 （SSR）


  解决白屏问题、SEO问题


  可以生成用户相关的内容

## 三种渲染模式如何选择<figure data-size="normal">


  <img loading="lazy" width="1091" height="279" class="alignnone size-full wp-image-7051 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625055475d331.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625055475d331.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625055475d331.png?x-oss-process=image/format,webp 1091w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625055475d331.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_77/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625055475d331.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_205/format,webp 800w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625055475d331.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_196/format,webp 768w" sizes="(max-width: 1091px) 100vw, 1091px" />
</figure>


  有动态内容吗？没有什么也不用做，自动渲染为 HTML


  有动态内容，动态内容和客户端相关吗？相关就只能用客户端渲染 BSR


  有动态内容，动态内容跟请求/用户相关吗？相关就只能用服务端渲染 SSR 或 BSR


  其他情况可以用 SSG 或 SSR 或 BSR

