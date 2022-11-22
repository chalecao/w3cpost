---
title: Huffman树和Huffman编码


date: 2022-04-08T15:23:58+00:00
url: /algorithm/7037.html
classic-editor-remember:
  - classic-editor
views:
  - 147


---
Huffman树是一种特殊结构的二叉树，由Huffman树设计的二进制前缀编码，也称为Huffman编码在通信领域有着广泛的应用。在word2vec模型中，在构建层次Softmax的过程中，也使用到了Huffman树的知识。

在通信中，需要将传输的文字转换成二进制的字符串，假设传输的报文为：“AFTERDATAEARAREARTAREA”，现在需要对该报文进行编码。

# 一、Huffman树的基本概念 {#%E4%B8%80%E3%80%81Huffman%E6%A0%91%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5}

在二叉树中有一些基本的概念，对于如下所示的二叉树：<figure> 

<div class="image-block">
  <p id="qIJEsvO">
    <img loading="lazy" width="268" height="270" class="alignnone size-full wp-image-7038 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625052f4b3807.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625052f4b3807.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625052f4b3807.png?x-oss-process=image/format,webp 268w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625052f4b3807.png?x-oss-process=image/quality,q_50/resize,m_fill,w_150,h_150/format,webp 150w" sizes="(max-width: 268px) 100vw, 268px" />
  </p>
</div></figure> 

<ul class="ul-level-0">
  <li>
    <strong>路径</strong>
  </li>
</ul>

路径是指在一棵树中，从一个节点到另一个节点之间的分支构成的通路，如从节点8到节点1的路径如下图所示：<figure> 

<div class="image-block">
  <p id="BvhUeLa">
    <img loading="lazy" width="294" height="254" class="alignnone size-full wp-image-7039 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625053013b892.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625053013b892.png?x-oss-process=image/format,webp" alt="" />
  </p>
</div></figure> 

<ul class="ul-level-0">
  <li>
    <strong>路径长度</strong>
  </li>
</ul>

路径长度指的是路径上分支的数目，在上图中，路径长度为2。

<ul class="ul-level-0">
  <li>
    <strong>节点的权</strong>
  </li>
</ul>

节点的权指的是为树中的每一个节点赋予的一个非负的值，如上图中每一个节点中的值。

<ul class="ul-level-0">
  <li>
    <strong>节点的带权路径长度</strong>
  </li>
</ul>

节点的带权路径长度指的是从根节点到该节点之间的路径长度与该节点权的乘积：如对于1节点的带权路径长度为：2。

<ul class="ul-level-0">
  <li>
    <strong>树的带权路径长度</strong>
  </li>
</ul>

树的带权路径长度指的是所有叶子节点的带权路径长度之和。

有了如上的概念，对于Huffman树，其定义为：

> 给定nn权值作为nn个叶子节点，构造一棵二叉树，若这棵二叉树的带权路径长度达到最小，则称这样的二叉树为最优二叉树，也称为Huffman树。

由以上的定义可以知道，Huffman树是<span style="color: #ff0000;"><strong>带权路径长度最小的二叉树 ( 考点 ，应用点)</strong></span>，对于上面的二叉树，其构造完成的Huffman树为：<figure> 

<div class="image-block">
  <p id="EsOiftm">
    <img loading="lazy" width="422" height="288" class="alignnone size-full wp-image-7040 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505328ec640.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505328ec640.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505328ec640.png?x-oss-process=image/format,webp 422w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505328ec640.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_205/format,webp 300w" sizes="(max-width: 422px) 100vw, 422px" />
  </p>
</div></figure> 

# 二、Huffman树的构建 {#%E4%BA%8C%E3%80%81Huffman%E6%A0%91%E7%9A%84%E6%9E%84%E5%BB%BA}

由上述的Huffman树可知：节点的权越小，其离树的根节点越远。那么应该如何构建Huffman树呢？以上述报文为例，首先需要统计出每个字符出现的次数作为节点的权:<figure> 

<div class="image-block">
  <img loading="lazy" width="75" height="91" class="alignnone size-full wp-image-7041 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250535503a52.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250535503a52.png?x-oss-process=image/format,webp" alt="" />
</div></figure> 

接下来构建Huffman树：

<ul class="ul-level-0">
  <li>
    重复以下的步骤： <ul class="ul-level-1">
      <li>
        按照权值对每一个节点排序：D-F-T-E-R-A
      </li>
      <li>
        选择权值最小的两个节点，此处为D和F生成新的节点，节点的权重为这两个节点的权重之和，为2
      </li>
    </ul>
  </li>
  
  <li>
    直到只剩最后的根节点
  </li>
</ul>

按照上述的步骤，该报文的Huffman树的生成过程为：<figure> 

<div class="image-block">
  <p id="mKjJFea">
    <img loading="lazy" width="451" height="285" class="alignnone size-full wp-image-7042 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250536016177.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250536016177.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250536016177.png?x-oss-process=image/format,webp 451w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250536016177.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_190/format,webp 300w" sizes="(max-width: 451px) 100vw, 451px" />
  </p>
  
  <p id="jnGfIrO">
    <img loading="lazy" width="478" height="305" class="alignnone size-full wp-image-7043 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505369525c4.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505369525c4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505369525c4.png?x-oss-process=image/format,webp 478w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505369525c4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_191/format,webp 300w" sizes="(max-width: 478px) 100vw, 478px" />
  </p>
</div></figure> 

对于树中节点的结构为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">#define &lt;span class="token constant">LEN&lt;/span> &lt;span class="token number">512&lt;/span>
struct huffman_node&lt;span class="token punctuation">{&lt;/span>
        char c&lt;span class="token punctuation">;&lt;/span>
        int weight&lt;span class="token punctuation">;&lt;/span>
        char huffman_code&lt;span class="token punctuation">[&lt;/span>&lt;span class="token constant">LEN&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        huffman_node &lt;span class="token operator">*&lt;/span> left&lt;span class="token punctuation">;&lt;/span>
        huffman_node &lt;span class="token operator">*&lt;/span> right&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span>&lt;span class="token punctuation">;&lt;/span></code></pre>
  
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

对于Huffman树的构建过程为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">int &lt;span class="token function">huffman_tree_create&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">huffman_node &lt;span class="token operator">*&lt;/span>&lt;span class="token operator">&&lt;/span>root&lt;span class="token punctuation">,&lt;/span> map&lt;span class="token operator">&lt;&lt;/span>char&lt;span class="token punctuation">,&lt;/span> int&lt;span class="token operator">&gt;&lt;/span> &lt;span class="token operator">&&lt;/span>word&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
        char line&lt;span class="token punctuation">[&lt;/span>&lt;span class="token constant">MAX_LINE&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        vector&lt;span class="token operator">&lt;&lt;/span>huffman_node &lt;span class="token operator">*&lt;/span>&lt;span class="token operator">&gt;&lt;/span> huffman_tree_node&lt;span class="token punctuation">;&lt;/span>

        map&lt;span class="token operator">&lt;&lt;/span>char&lt;span class="token punctuation">,&lt;/span> int&lt;span class="token operator">&gt;&lt;/span>&lt;span class="token operator">:&lt;/span>&lt;span class="token operator">:&lt;/span>iterator it_t&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token keyword">for&lt;/span> &lt;span class="token punctuation">(&lt;/span>it_t &lt;span class="token operator">=&lt;/span> word&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">begin&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> it_t &lt;span class="token operator">!=&lt;/span> word&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">end&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span> it_t&lt;span class="token operator">++&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token comment">// 为每一个节点申请空间&lt;/span>
                huffman_node &lt;span class="token operator">*&lt;/span>node &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>huffman_node &lt;span class="token operator">*&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token function">malloc&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token function">sizeof&lt;/span>&lt;span class="token punctuation">(&lt;/span>huffman_node&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>c &lt;span class="token operator">=&lt;/span> it_t&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>first&lt;span class="token punctuation">;&lt;/span>
                node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>weight &lt;span class="token operator">=&lt;/span> it_t&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>second&lt;span class="token punctuation">;&lt;/span>
                node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left &lt;span class="token operator">=&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right &lt;span class="token operator">=&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">push_back&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>


        &lt;span class="token comment">// 开始从叶节点开始构建Huffman树&lt;/span>
        &lt;span class="token keyword">while&lt;/span> &lt;span class="token punctuation">(&lt;/span>huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">size&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">&gt;&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token comment">// 按照weight升序排序&lt;/span>
                &lt;span class="token function">sort&lt;/span>&lt;span class="token punctuation">(&lt;/span>huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">begin&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">,&lt;/span> huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">end&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">,&lt;/span> sort_by_weight&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token comment">// 取出前两个节点&lt;/span>
                &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">size&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">==&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token comment">// 只有一个根结点&lt;/span>
                        root &lt;span class="token operator">=&lt;/span> huffman_tree_node&lt;span class="token punctuation">[&lt;/span>&lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">erase&lt;/span>&lt;span class="token punctuation">(&lt;/span>huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">begin&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>&lt;span class="token keyword">else&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                        &lt;span class="token comment">// 取出前两个&lt;/span>
                        huffman_node &lt;span class="token operator">*&lt;/span>node_1 &lt;span class="token operator">=&lt;/span> huffman_tree_node&lt;span class="token punctuation">[&lt;/span>&lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        huffman_node &lt;span class="token operator">*&lt;/span>node_2 &lt;span class="token operator">=&lt;/span> huffman_tree_node&lt;span class="token punctuation">[&lt;/span>&lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token comment">// 删除&lt;/span>
                        huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">erase&lt;/span>&lt;span class="token punctuation">(&lt;/span>huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">begin&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">erase&lt;/span>&lt;span class="token punctuation">(&lt;/span>huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">begin&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token comment">// 生成新的节点&lt;/span>
                        huffman_node &lt;span class="token operator">*&lt;/span>node &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>huffman_node &lt;span class="token operator">*&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token function">malloc&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token function">sizeof&lt;/span>&lt;span class="token punctuation">(&lt;/span>huffman_node&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>weight &lt;span class="token operator">=&lt;/span> node_1&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>weight &lt;span class="token operator">+&lt;/span> node_2&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>weight&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token punctuation">(&lt;/span>node_1&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>weight &lt;span class="token operator">&lt;&lt;/span> node_2&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>weight&lt;span class="token punctuation">)&lt;/span>&lt;span class="token operator">?&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left&lt;span class="token operator">=&lt;/span>node_1&lt;span class="token punctuation">,&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right&lt;span class="token operator">=&lt;/span>node_2&lt;span class="token punctuation">)&lt;/span>&lt;span class="token operator">:&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left&lt;span class="token operator">=&lt;/span>node_2&lt;span class="token punctuation">,&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right&lt;span class="token operator">=&lt;/span>node_1&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        huffman_tree_node&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">push_back&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>

        &lt;span class="token keyword">return&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span></code></pre>
  
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

其中，map结构的word为每一个字符出现的频率，是从文件中解析出来的，解析的代码为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">int &lt;span class="token function">read_file&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">&lt;span class="token constant">FILE&lt;/span> &lt;span class="token operator">*&lt;/span>fn&lt;span class="token punctuation">,&lt;/span> map&lt;span class="token operator">&lt;&lt;/span>char&lt;span class="token punctuation">,&lt;/span> int&lt;span class="token operator">&gt;&lt;/span> &lt;span class="token operator">&&lt;/span>word&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>fn &lt;span class="token operator">==&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token keyword">return&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        char line&lt;span class="token punctuation">[&lt;/span>&lt;span class="token constant">MAX_LINE&lt;/span>&lt;span class="token punctuation">]&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token keyword">while&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token function">fgets&lt;/span>&lt;span class="token punctuation">(&lt;/span>line&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">1024&lt;/span>&lt;span class="token punctuation">,&lt;/span> fn&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token function">fprintf&lt;/span>&lt;span class="token punctuation">(&lt;/span>stderr&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">"%s\n"&lt;/span>&lt;span class="token punctuation">,&lt;/span> line&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token comment">//解析，统计词频&lt;/span>
                char &lt;span class="token operator">*&lt;/span>p &lt;span class="token operator">=&lt;/span> line&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token keyword">while&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">*&lt;/span>p &lt;span class="token operator">!=&lt;/span> &lt;span class="token string">'\0'&lt;/span> &lt;span class="token operator">&&&lt;/span> &lt;span class="token operator">*&lt;/span>p &lt;span class="token operator">!=&lt;/span> &lt;span class="token string">'\n'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                        map&lt;span class="token operator">&lt;&lt;/span>char&lt;span class="token punctuation">,&lt;/span> int&lt;span class="token operator">&gt;&lt;/span>&lt;span class="token operator">:&lt;/span>&lt;span class="token operator">:&lt;/span>iterator it &lt;span class="token operator">=&lt;/span> word&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">find&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">*&lt;/span>p&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>it &lt;span class="token operator">==&lt;/span> word&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">end&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>&lt;span class="token comment">// 不存在，插入&lt;/span>
                                word&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">insert&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token function">make_pair&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">*&lt;/span>p&lt;span class="token punctuation">,&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token punctuation">}&lt;/span>&lt;span class="token keyword">else&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                                it&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>second &lt;span class="token operator">++&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token punctuation">}&lt;/span>
                        p &lt;span class="token operator">++&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token keyword">return&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span></code></pre>
  
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

当构建好Huffman树后，我们分别利用先序遍历和中序遍历去遍历Huffman树，先序遍历的代码为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">&lt;span class="token keyword">void&lt;/span> &lt;span class="token function">print_huffman_pre&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">huffman_node &lt;span class="token operator">*&lt;/span>node&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>node &lt;span class="token operator">!=&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token function">fprintf&lt;/span>&lt;span class="token punctuation">(&lt;/span>stderr&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">"%c\t%d\n"&lt;/span>&lt;span class="token punctuation">,&lt;/span> node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>c&lt;span class="token punctuation">,&lt;/span> node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>weight&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token function">print_huffman_pre&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token function">print_huffman_pre&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span></code></pre>
  
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

中序遍历的代码为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">&lt;span class="token keyword">void&lt;/span> &lt;span class="token function">print_huffman_in&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">huffman_node &lt;span class="token operator">*&lt;/span>node&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>node &lt;span class="token operator">!=&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token function">print_huffman_in&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token function">fprintf&lt;/span>&lt;span class="token punctuation">(&lt;/span>stderr&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">"%c\t%d\n"&lt;/span>&lt;span class="token punctuation">,&lt;/span> node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>c&lt;span class="token punctuation">,&lt;/span> node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>weight&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token function">print_huffman_in&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span></code></pre>
  
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

得到的结构与上图中的结构一致。

# 三、由Huffman树生成Huffman编码 {#%E4%B8%89%E3%80%81%E7%94%B1Huffman%E6%A0%91%E7%94%9F%E6%88%90Huffman%E7%BC%96%E7%A0%81}

有了上述的Huffman树的结构，现在我们需要利用Huffman树对每一个字符编码，该编码又称为Huffman编码，Huffman编码是一种前缀编码，即一个字符的编码不是另一个字符编码的前缀。在这里约定：

<ul class="ul-level-0">
  <li>
    将权值小的最为左节点，权值大的作为右节点
  </li>
  <li>
    左孩子编码为0，右孩子编码为1
  </li>
</ul>

因此，上述的编码形式如下图所示：<figure> 

<div class="image-block">
  <p id="akwDzXn">
    <img loading="lazy" width="380" height="300" class="alignnone size-full wp-image-7044 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250537bceda4.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250537bceda4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250537bceda4.png?x-oss-process=image/format,webp 380w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250537bceda4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_237/format,webp 300w" sizes="(max-width: 380px) 100vw, 380px" />
  </p>
</div></figure> 

从上图中，E节点的编码为：00，同理，D节点的编码为1001

Huffman编码的实现过程为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">int &lt;span class="token function">get_huffman_code&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">huffman_node &lt;span class="token operator">*&lt;/span>&lt;span class="token operator">&&lt;/span>node&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>node &lt;span class="token operator">==&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token keyword">return&lt;/span> &lt;span class="token number">1&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token comment">// 利用层次遍历，构造每一个节点&lt;/span>
        huffman_node &lt;span class="token operator">*&lt;/span>p &lt;span class="token operator">=&lt;/span> node&lt;span class="token punctuation">;&lt;/span>
        queue&lt;span class="token operator">&lt;&lt;/span>huffman_node &lt;span class="token operator">*&lt;/span>&lt;span class="token operator">&gt;&lt;/span> q&lt;span class="token punctuation">;&lt;/span>
        q&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">push&lt;/span>&lt;span class="token punctuation">(&lt;/span>p&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token keyword">while&lt;/span>&lt;span class="token punctuation">(&lt;/span>q&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">size&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token operator">&gt;&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                p &lt;span class="token operator">=&lt;/span> q&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">front&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                q&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">pop&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>p&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left &lt;span class="token operator">!=&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                        q&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">push&lt;/span>&lt;span class="token punctuation">(&lt;/span>p&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token function">strcpy&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>p&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left&lt;span class="token punctuation">)&lt;/span>&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>huffman_code&lt;span class="token punctuation">,&lt;/span> p&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>huffman_code&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        char &lt;span class="token operator">*&lt;/span>ptr &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>p&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left&lt;span class="token punctuation">)&lt;/span>&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>huffman_code&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token keyword">while&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">*&lt;/span>ptr &lt;span class="token operator">!=&lt;/span> &lt;span class="token string">'\0'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                                ptr &lt;span class="token operator">++&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token punctuation">}&lt;/span>
                        &lt;span class="token operator">*&lt;/span>ptr &lt;span class="token operator">=&lt;/span> &lt;span class="token string">'0'&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>
                &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>p&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right &lt;span class="token operator">!=&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                        q&lt;span class="token punctuation">.&lt;/span>&lt;span class="token function">push&lt;/span>&lt;span class="token punctuation">(&lt;/span>p&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token function">strcpy&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">(&lt;/span>p&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right&lt;span class="token punctuation">)&lt;/span>&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>huffman_code&lt;span class="token punctuation">,&lt;/span> p&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>huffman_code&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        char &lt;span class="token operator">*&lt;/span>ptr &lt;span class="token operator">=&lt;/span> &lt;span class="token punctuation">(&lt;/span>p&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right&lt;span class="token punctuation">)&lt;/span>&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>huffman_code&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token keyword">while&lt;/span> &lt;span class="token punctuation">(&lt;/span>&lt;span class="token operator">*&lt;/span>ptr &lt;span class="token operator">!=&lt;/span> &lt;span class="token string">'\0'&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                                ptr &lt;span class="token operator">++&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                        &lt;span class="token punctuation">}&lt;/span>
                        &lt;span class="token operator">*&lt;/span>ptr &lt;span class="token operator">=&lt;/span> &lt;span class="token string">'1'&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token punctuation">}&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>


        &lt;span class="token keyword">return&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span></code></pre>
  
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

利用上述的代码，测试的主函数为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">int &lt;span class="token function">main&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token comment">// 读文件&lt;/span>
        &lt;span class="token constant">FILE&lt;/span> &lt;span class="token operator">*&lt;/span>fn &lt;span class="token operator">=&lt;/span> &lt;span class="token function">fopen&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token string">"huffman"&lt;/span>&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">"r"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        huffman_node &lt;span class="token operator">*&lt;/span>root &lt;span class="token operator">=&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        map&lt;span class="token operator">&lt;&lt;/span>char&lt;span class="token punctuation">,&lt;/span> int&lt;span class="token operator">&gt;&lt;/span> word&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token function">read_file&lt;/span>&lt;span class="token punctuation">(&lt;/span>fn&lt;span class="token punctuation">,&lt;/span> word&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token function">huffman_tree_create&lt;/span>&lt;span class="token punctuation">(&lt;/span>root&lt;span class="token punctuation">,&lt;/span> word&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token function">fclose&lt;/span>&lt;span class="token punctuation">(&lt;/span>fn&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token function">fprintf&lt;/span>&lt;span class="token punctuation">(&lt;/span>stderr&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">"pre-order:\n"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token function">print_huffman_pre&lt;/span>&lt;span class="token punctuation">(&lt;/span>root&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token function">fprintf&lt;/span>&lt;span class="token punctuation">(&lt;/span>stderr&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">"in-order:\n"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token function">print_huffman_in&lt;/span>&lt;span class="token punctuation">(&lt;/span>root&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>

        &lt;span class="token function">get_huffman_code&lt;/span>&lt;span class="token punctuation">(&lt;/span>root&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token function">fprintf&lt;/span>&lt;span class="token punctuation">(&lt;/span>stderr&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">"the final result:\n"&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token function">print_leaf&lt;/span>&lt;span class="token punctuation">(&lt;/span>root&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token function">destory_huffman_tree&lt;/span>&lt;span class="token punctuation">(&lt;/span>root&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token keyword">return&lt;/span> &lt;span class="token number">0&lt;/span>&lt;span class="token punctuation">;&lt;/span>
&lt;span class="token punctuation">}&lt;/span></code></pre>
  
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

print_leaf函数用于打印出每个叶节点的Huffman编码，其具体实现为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">&lt;span class="token keyword">void&lt;/span> &lt;span class="token function">print_leaf&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">huffman_node &lt;span class="token operator">*&lt;/span>node&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>node &lt;span class="token operator">!=&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token function">print_leaf&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left &lt;span class="token operator">==&lt;/span> &lt;span class="token constant">NULL&lt;/span> &lt;span class="token operator">&&&lt;/span> node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right &lt;span class="token operator">==&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">)&lt;/span> &lt;span class="token function">fprintf&lt;/span>&lt;span class="token punctuation">(&lt;/span>stderr&lt;span class="token punctuation">,&lt;/span> &lt;span class="token string">"%c\t%s\n"&lt;/span>&lt;span class="token punctuation">,&lt;/span> node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>c&lt;span class="token punctuation">,&lt;/span> node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>huffman_code&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token function">print_leaf&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span></code></pre>
  
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

destory\_huffman\_tree函数用于销毁Huffman树，其具体实现为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">&lt;span class="token keyword">void&lt;/span> &lt;span class="token function">destory_huffman_tree&lt;/span>&lt;span class="token punctuation">(&lt;/span>&lt;span class="token parameter">huffman_node &lt;span class="token operator">*&lt;/span>node&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
        &lt;span class="token keyword">if&lt;/span> &lt;span class="token punctuation">(&lt;/span>node &lt;span class="token operator">!=&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">{&lt;/span>
                &lt;span class="token function">destory_huffman_tree&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>left&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token function">destory_huffman_tree&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token operator">-&lt;/span>&lt;span class="token operator">&gt;&lt;/span>right&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                &lt;span class="token function">free&lt;/span>&lt;span class="token punctuation">(&lt;/span>node&lt;span class="token punctuation">)&lt;/span>&lt;span class="token punctuation">;&lt;/span>
                node &lt;span class="token operator">=&lt;/span> &lt;span class="token constant">NULL&lt;/span>&lt;span class="token punctuation">;&lt;/span>
        &lt;span class="token punctuation">}&lt;/span>
&lt;span class="token punctuation">}&lt;/span></code></pre>
  
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

其最终的结果为：

<p id="itlmNws">
  <img loading="lazy" width="130" height="103" class="alignnone size-full wp-image-7045 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505385037d3.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505385037d3.png?x-oss-process=image/format,webp" alt="" />
</p>

# 参考文献 {#%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE}

<ul class="ul-level-0">
  <li>
    《大话数据结构》
  </li>
  <li>
    《数据结构》(C语言版)
  </li>
</ul>