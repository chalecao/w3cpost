---
title: Huffman树和Huffman编码

---
Huffman树是一种特殊结构的二叉树，由Huffman树设计的二进制前缀编码，也称为Huffman编码在通信领域有着广泛的应用。在word2vec模型中，在构建层次Softmax的过程中，也使用到了Huffman树的知识。

在通信中，需要将传输的文字转换成二进制的字符串，假设传输的报文为：“AFTERDATAEARAREARTAREA”，现在需要对该报文进行编码。

# 一、Huffman树的基本概念 {#%E4%B8%80%E3%80%81Huffman%E6%A0%91%E7%9A%84%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5}

在二叉树中有一些基本的概念，对于如下所示的二叉树：<figure>

<div class="image-block">
 <img loading="lazy" width="268" height="270" class="alignnone size-full wp-image-7038 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625052f4b3807.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625052f4b3807.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625052f4b3807.png?x-oss-process=image/format,webp 268w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625052f4b3807.png?x-oss-process=image/quality,q_50/resize,m_fill,w_150,h_150/format,webp 150w" sizes="(max-width: 268px) 100vw, 268px" />
</div></figure>


路径


路径是指在一棵树中，从一个节点到另一个节点之间的分支构成的通路，如从节点8到节点1的路径如下图所示：<figure>

<div class="image-block">
 <img loading="lazy" width="294" height="254" class="alignnone size-full wp-image-7039 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625053013b892.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_625053013b892.png?x-oss-process=image/format,webp" alt="" />
</div></figure>


路径长度


路径长度指的是路径上分支的数目，在上图中，路径长度为2。


节点的权


节点的权指的是为树中的每一个节点赋予的一个非负的值，如上图中每一个节点中的值。


节点的带权路径长度


节点的带权路径长度指的是从根节点到该节点之间的路径长度与该节点权的乘积：如对于1节点的带权路径长度为：2。


树的带权路径长度


树的带权路径长度指的是所有叶子节点的带权路径长度之和。

有了如上的概念，对于Huffman树，其定义为：

> 给定nn权值作为nn个叶子节点，构造一棵二叉树，若这棵二叉树的带权路径长度达到最小，则称这样的二叉树为最优二叉树，也称为Huffman树。

由以上的定义可以知道，Huffman树是<span style="color: #ff0000;">带权路径长度最小的二叉树 ( 考点 ，应用点)</span>，对于上面的二叉树，其构造完成的Huffman树为：<figure>

<div class="image-block">
 <img loading="lazy" width="422" height="288" class="alignnone size-full wp-image-7040 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505328ec640.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505328ec640.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505328ec640.png?x-oss-process=image/format,webp 422w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505328ec640.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_205/format,webp 300w" sizes="(max-width: 422px) 100vw, 422px" />
</div></figure>

# 二、Huffman树的构建 {#%E4%BA%8C%E3%80%81Huffman%E6%A0%91%E7%9A%84%E6%9E%84%E5%BB%BA}

由上述的Huffman树可知：节点的权越小，其离树的根节点越远。那么应该如何构建Huffman树呢？以上述报文为例，首先需要统计出每个字符出现的次数作为节点的权:<figure>

<div class="image-block">
  <img loading="lazy" width="75" height="91" class="alignnone size-full wp-image-7041 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250535503a52.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250535503a52.png?x-oss-process=image/format,webp" alt="" />
</div></figure>

接下来构建Huffman树：


 重复以下的步骤： 
      
        按照权值对每一个节点排序：D-F-T-E-R-A
      
      
        选择权值最小的两个节点，此处为D和F生成新的节点，节点的权重为这两个节点的权重之和，为2
      
    
  
 直到只剩最后的根节点


按照上述的步骤，该报文的Huffman树的生成过程为：<figure>

<div class="image-block">
 <img loading="lazy" width="451" height="285" class="alignnone size-full wp-image-7042 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250536016177.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250536016177.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250536016177.png?x-oss-process=image/format,webp 451w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250536016177.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_190/format,webp 300w" sizes="(max-width: 451px) 100vw, 451px" />
  
 <img loading="lazy" width="478" height="305" class="alignnone size-full wp-image-7043 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505369525c4.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505369525c4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505369525c4.png?x-oss-process=image/format,webp 478w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505369525c4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_191/format,webp 300w" sizes="(max-width: 478px) 100vw, 478px" />
</div></figure>

对于树中节点的结构为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">#define <span class="token constant">LEN</span> <span class="token number">512</span>
struct huffman_node<span class="token punctuation">{</span>
        char c<span class="token punctuation">;</span>
        int weight<span class="token punctuation">;</span>
        char huffman_code<span class="token punctuation">[</span><span class="token constant">LEN</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        huffman_node <span class="token operator">*</span> left<span class="token punctuation">;</span>
        huffman_node <span class="token operator">*</span> right<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

对于Huffman树的构建过程为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">int <span class="token function">huffman_tree_create</span><span class="token punctuation">(</span><span class="token parameter">huffman_node <span class="token operator">*</span><span class="token operator">&</span>root<span class="token punctuation">,</span> map<span class="token operator"><</span>char<span class="token punctuation">,</span> int<span class="token operator">></span> <span class="token operator">&</span>word</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        char line<span class="token punctuation">[</span><span class="token constant">MAX_LINE</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        vector<span class="token operator"><</span>huffman_node <span class="token operator">*</span><span class="token operator">></span> huffman_tree_node<span class="token punctuation">;</span>

        map<span class="token operator"><</span>char<span class="token punctuation">,</span> int<span class="token operator">></span><span class="token operator">:</span><span class="token operator">:</span>iterator it_t<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>it_t <span class="token operator">=</span> word<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> it_t <span class="token operator">!=</span> word<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> it_t<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">// 为每一个节点申请空间</span>
                huffman_node <span class="token operator">*</span>node <span class="token operator">=</span> <span class="token punctuation">(</span>huffman_node <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token function">sizeof</span><span class="token punctuation">(</span>huffman_node<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                node<span class="token operator">-</span><span class="token operator">></span>c <span class="token operator">=</span> it_t<span class="token operator">-</span><span class="token operator">></span>first<span class="token punctuation">;</span>
                node<span class="token operator">-</span><span class="token operator">></span>weight <span class="token operator">=</span> it_t<span class="token operator">-</span><span class="token operator">></span>second<span class="token punctuation">;</span>
                node<span class="token operator">-</span><span class="token operator">></span>left <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
                node<span class="token operator">-</span><span class="token operator">></span>right <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
                huffman_tree_node<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token comment">// 开始从叶节点开始构建Huffman树</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>huffman_tree_node<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token comment">// 按照weight升序排序</span>
                <span class="token function">sort</span><span class="token punctuation">(</span>huffman_tree_node<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> huffman_tree_node<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> sort_by_weight<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 取出前两个节点</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>huffman_tree_node<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">// 只有一个根结点</span>
                        root <span class="token operator">=</span> huffman_tree_node<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                        huffman_tree_node<span class="token punctuation">.</span><span class="token function">erase</span><span class="token punctuation">(</span>huffman_tree_node<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                        <span class="token comment">// 取出前两个</span>
                        huffman_node <span class="token operator">*</span>node_1 <span class="token operator">=</span> huffman_tree_node<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                        huffman_node <span class="token operator">*</span>node_2 <span class="token operator">=</span> huffman_tree_node<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                        <span class="token comment">// 删除</span>
                        huffman_tree_node<span class="token punctuation">.</span><span class="token function">erase</span><span class="token punctuation">(</span>huffman_tree_node<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        huffman_tree_node<span class="token punctuation">.</span><span class="token function">erase</span><span class="token punctuation">(</span>huffman_tree_node<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">// 生成新的节点</span>
                        huffman_node <span class="token operator">*</span>node <span class="token operator">=</span> <span class="token punctuation">(</span>huffman_node <span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span><span class="token function">sizeof</span><span class="token punctuation">(</span>huffman_node<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        node<span class="token operator">-</span><span class="token operator">></span>weight <span class="token operator">=</span> node_1<span class="token operator">-</span><span class="token operator">></span>weight <span class="token operator">+</span> node_2<span class="token operator">-</span><span class="token operator">></span>weight<span class="token punctuation">;</span>
                        <span class="token punctuation">(</span>node_1<span class="token operator">-</span><span class="token operator">></span>weight <span class="token operator"><</span> node_2<span class="token operator">-</span><span class="token operator">></span>weight<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">(</span>node<span class="token operator">-</span><span class="token operator">></span>left<span class="token operator">=</span>node_1<span class="token punctuation">,</span>node<span class="token operator">-</span><span class="token operator">></span>right<span class="token operator">=</span>node_2<span class="token punctuation">)</span><span class="token operator">:</span><span class="token punctuation">(</span>node<span class="token operator">-</span><span class="token operator">></span>left<span class="token operator">=</span>node_2<span class="token punctuation">,</span>node<span class="token operator">-</span><span class="token operator">></span>right<span class="token operator">=</span>node_1<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        huffman_tree_node<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

其中，map结构的word为每一个字符出现的频率，是从文件中解析出来的，解析的代码为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">int <span class="token function">read_file</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">FILE</span> <span class="token operator">*</span>fn<span class="token punctuation">,</span> map<span class="token operator"><</span>char<span class="token punctuation">,</span> int<span class="token operator">></span> <span class="token operator">&</span>word</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>fn <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        char line<span class="token punctuation">[</span><span class="token constant">MAX_LINE</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">fgets</span><span class="token punctuation">(</span>line<span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token function">fprintf</span><span class="token punctuation">(</span>stderr<span class="token punctuation">,</span> <span class="token string">"%s\n"</span><span class="token punctuation">,</span> line<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">//解析，统计词频</span>
                char <span class="token operator">*</span>p <span class="token operator">=</span> line<span class="token punctuation">;</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">*</span>p <span class="token operator">!=</span> <span class="token string">'\0'</span> <span class="token operator">&&</span> <span class="token operator">*</span>p <span class="token operator">!=</span> <span class="token string">'\n'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        map<span class="token operator"><</span>char<span class="token punctuation">,</span> int<span class="token operator">></span><span class="token operator">:</span><span class="token operator">:</span>iterator it <span class="token operator">=</span> word<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span>it <span class="token operator">==</span> word<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">// 不存在，插入</span>
                                word<span class="token punctuation">.</span><span class="token function">insert</span><span class="token punctuation">(</span><span class="token function">make_pair</span><span class="token punctuation">(</span><span class="token operator">*</span>p<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                                it<span class="token operator">-</span><span class="token operator">></span>second <span class="token operator">++</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        p <span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

当构建好Huffman树后，[我们](https://www.w3cdoc.com)分别利用先序遍历和中序遍历去遍历Huffman树，先序遍历的代码为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript"><span class="token keyword">void</span> <span class="token function">print_huffman_pre</span><span class="token punctuation">(</span><span class="token parameter">huffman_node <span class="token operator">*</span>node</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token function">fprintf</span><span class="token punctuation">(</span>stderr<span class="token punctuation">,</span> <span class="token string">"%c\t%d\n"</span><span class="token punctuation">,</span> node<span class="token operator">-</span><span class="token operator">></span>c<span class="token punctuation">,</span> node<span class="token operator">-</span><span class="token operator">></span>weight<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">print_huffman_pre</span><span class="token punctuation">(</span>node<span class="token operator">-</span><span class="token operator">></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">print_huffman_pre</span><span class="token punctuation">(</span>node<span class="token operator">-</span><span class="token operator">></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

中序遍历的代码为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript"><span class="token keyword">void</span> <span class="token function">print_huffman_in</span><span class="token punctuation">(</span><span class="token parameter">huffman_node <span class="token operator">*</span>node</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token function">print_huffman_in</span><span class="token punctuation">(</span>node<span class="token operator">-</span><span class="token operator">></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">fprintf</span><span class="token punctuation">(</span>stderr<span class="token punctuation">,</span> <span class="token string">"%c\t%d\n"</span><span class="token punctuation">,</span> node<span class="token operator">-</span><span class="token operator">></span>c<span class="token punctuation">,</span> node<span class="token operator">-</span><span class="token operator">></span>weight<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">print_huffman_in</span><span class="token punctuation">(</span>node<span class="token operator">-</span><span class="token operator">></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

得到的结构与上图中的结构一致。

# 三、由Huffman树生成Huffman编码 {#%E4%B8%89%E3%80%81%E7%94%B1Huffman%E6%A0%91%E7%94%9F%E6%88%90Huffman%E7%BC%96%E7%A0%81}

有了上述的Huffman树的结构，现在[我们](https://www.w3cdoc.com)需要利用Huffman树对每一个字符编码，该编码又称为Huffman编码，Huffman编码是一种前缀编码，即一个字符的编码不是另一个字符编码的前缀。在这里约定：


 将权值小的最为左节点，权值大的作为右节点
 左孩子编码为0，右孩子编码为1


因此，上述的编码形式如下图所示：<figure>

<div class="image-block">
 <img loading="lazy" width="380" height="300" class="alignnone size-full wp-image-7044 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250537bceda4.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250537bceda4.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250537bceda4.png?x-oss-process=image/format,webp 380w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_6250537bceda4.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_237/format,webp 300w" sizes="(max-width: 380px) 100vw, 380px" />
</div></figure>

从上图中，E节点的编码为：00，同理，D节点的编码为1001

Huffman编码的实现过程为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">int <span class="token function">get_huffman_code</span><span class="token punctuation">(</span><span class="token parameter">huffman_node <span class="token operator">*</span><span class="token operator">&</span>node</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token comment">// 利用层次遍历，构造每一个节点</span>
        huffman_node <span class="token operator">*</span>p <span class="token operator">=</span> node<span class="token punctuation">;</span>
        queue<span class="token operator"><</span>huffman_node <span class="token operator">*</span><span class="token operator">></span> q<span class="token punctuation">;</span>
        q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>q<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                p <span class="token operator">=</span> q<span class="token punctuation">.</span><span class="token function">front</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                q<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token operator">-</span><span class="token operator">></span>left <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token operator">-</span><span class="token operator">></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token function">strcpy</span><span class="token punctuation">(</span><span class="token punctuation">(</span>p<span class="token operator">-</span><span class="token operator">></span>left<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">></span>huffman_code<span class="token punctuation">,</span> p<span class="token operator">-</span><span class="token operator">></span>huffman_code<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        char <span class="token operator">*</span>ptr <span class="token operator">=</span> <span class="token punctuation">(</span>p<span class="token operator">-</span><span class="token operator">></span>left<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">></span>huffman_code<span class="token punctuation">;</span>
                        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">*</span>ptr <span class="token operator">!=</span> <span class="token string">'\0'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                                ptr <span class="token operator">++</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        <span class="token operator">*</span>ptr <span class="token operator">=</span> <span class="token string">'0'</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>p<span class="token operator">-</span><span class="token operator">></span>right <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token operator">-</span><span class="token operator">></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token function">strcpy</span><span class="token punctuation">(</span><span class="token punctuation">(</span>p<span class="token operator">-</span><span class="token operator">></span>right<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">></span>huffman_code<span class="token punctuation">,</span> p<span class="token operator">-</span><span class="token operator">></span>huffman_code<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        char <span class="token operator">*</span>ptr <span class="token operator">=</span> <span class="token punctuation">(</span>p<span class="token operator">-</span><span class="token operator">></span>right<span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">></span>huffman_code<span class="token punctuation">;</span>
                        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">*</span>ptr <span class="token operator">!=</span> <span class="token string">'\0'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                                ptr <span class="token operator">++</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        <span class="token operator">*</span>ptr <span class="token operator">=</span> <span class="token string">'1'</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

利用上述的代码，测试的主函数为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript">int <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 读文件</span>
        <span class="token constant">FILE</span> <span class="token operator">*</span>fn <span class="token operator">=</span> <span class="token function">fopen</span><span class="token punctuation">(</span><span class="token string">"huffman"</span><span class="token punctuation">,</span> <span class="token string">"r"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        huffman_node <span class="token operator">*</span>root <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
        map<span class="token operator"><</span>char<span class="token punctuation">,</span> int<span class="token operator">></span> word<span class="token punctuation">;</span>
        <span class="token function">read_file</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> word<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">huffman_tree_create</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> word<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">fclose</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">fprintf</span><span class="token punctuation">(</span>stderr<span class="token punctuation">,</span> <span class="token string">"pre-order:\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">print_huffman_pre</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">fprintf</span><span class="token punctuation">(</span>stderr<span class="token punctuation">,</span> <span class="token string">"in-order:\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">print_huffman_in</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">get_huffman_code</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">fprintf</span><span class="token punctuation">(</span>stderr<span class="token punctuation">,</span> <span class="token string">"the final result:\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">print_leaf</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">destory_huffman_tree</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

print_leaf函数用于打印出每个叶节点的Huffman编码，其具体实现为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript"><span class="token keyword">void</span> <span class="token function">print_leaf</span><span class="token punctuation">(</span><span class="token parameter">huffman_node <span class="token operator">*</span>node</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token function">print_leaf</span><span class="token punctuation">(</span>node<span class="token operator">-</span><span class="token operator">></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token operator">-</span><span class="token operator">></span>left <span class="token operator">==</span> <span class="token constant">NULL</span> <span class="token operator">&&</span> node<span class="token operator">-</span><span class="token operator">></span>right <span class="token operator">==</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token function">fprintf</span><span class="token punctuation">(</span>stderr<span class="token punctuation">,</span> <span class="token string">"%c\t%s\n"</span><span class="token punctuation">,</span> node<span class="token operator">-</span><span class="token operator">></span>c<span class="token punctuation">,</span> node<span class="token operator">-</span><span class="token operator">></span>huffman_code<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">print_leaf</span><span class="token punctuation">(</span>node<span class="token operator">-</span><span class="token operator">></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

destory\_huffman\_tree函数用于销毁Huffman树，其具体实现为：

<div class="code-toolbar">
  <pre class="prism-token token language-javascript line-numbers" tabindex="0" data-prismjs-copy="复制" data-prismjs-copy-success="复制成功" data-prismjs-copy-error="复制失败" data-prismjs-copy-timeout="3000"><code class="language-javascript"><span class="token keyword">void</span> <span class="token function">destory_huffman_tree</span><span class="token punctuation">(</span><span class="token parameter">huffman_node <span class="token operator">*</span>node</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token function">destory_huffman_tree</span><span class="token punctuation">(</span>node<span class="token operator">-</span><span class="token operator">></span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">destory_huffman_tree</span><span class="token punctuation">(</span>node<span class="token operator">-</span><span class="token operator">></span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token function">free</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
                node <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span></code></pre>
  <div class="toolbar">
    <div class="toolbar-item">
      <button class="copy-to-clipboard-button" type="button" data-copy-state="copy">复制</button>
    </div>
  </div>
</div>

其最终的结果为：


  <img loading="lazy" width="130" height="103" class="alignnone size-full wp-image-7045 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505385037d3.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2022/04/img_62505385037d3.png?x-oss-process=image/format,webp" alt="" />

# 参考文献 {#%E5%8F%82%E8%80%83%E6%96%87%E7%8C%AE}


 《大话数据结构》
 《数据结构》(C语言版)

