---
title: Node.js 代码规范约定
---
# Node.js 代码规范 {.typo-title}

这里只是简单约定，并不是强制。

<div id="J-doc" class="typo-content clearfix">
  <h3 id="2空格缩进">
    空格缩进
  </h3>
 使用2个空格而不是 tab 来进行代码缩进，同时绝对不要混用空格和 tab 。
  
 Sublime Text 2 设置(Preferences > Settings &#8211; User)：
  
  <pre><code>&lt;code>  "tab_size": 2,
  "translate_tabs_to_spaces": true
</code>&lt;/code></pre>
  <h3 id="换行">
    换行
  </h3>
 使用 UNIX 风格的换行符 (<code>\n</code>)，同时在每个文件的结尾添加一个换行符。 Windows 风格的换行符 (<code>\r\n</code>) 是绝对禁止出现在任何项目中的。
  
 Sublime Text 2 设置(Preferences > Settings &#8211; User)：
  
  <pre><code>&lt;code>  "default_line_ending": "unix"
</code>&lt;/code></pre>
  <h3 id="去除行末尾的多余空格">
    去除行末尾的多余空格
  </h3>
 就像吃完饭要刷牙一样，在提交 (commit) 代码之前你需要清理掉所有的不必要的空格。
  
 Sublime Text2 设置(Preferences > Settings &#8211; User)：
  
  <pre><code>&lt;code>  "trim_trailing_white_space_on_save": true
</code>&lt;/code></pre>
  <h3 id="使用分号">
    使用分号
  </h3>
 是否使用分号，在社区争论已久. isaac 也写过一篇讨论的<a href="https://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding" target="_blank" rel="noopener">文章</a>, 但是，当可以用廉价的语法来消除一些可能引入的错误的时候，请当一个保守派。
  
  <h3 id="每行80个字符">
    每行80个字符
  </h3>
 限制你每行代码不超过80个字符。尽管现在的显示器越来越大，但是你的大脑并没有变大，并且你还可以把你的大显示器切分成多屏来显示。
  
 Sublime Text 2 设置(Preferences > Settings &#8211; User)：
  
  <pre><code>&lt;code>  "rulers": [80]
</code>&lt;/code></pre>
 多屏：<code>view &gt; Layout &gt; Columns 2</code>
  
  <h3 id="使用单引号">
    使用单引号
  </h3>
 除非编写.json文件，其他时候都请用单引号包裹字符串。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> foo = &lt;span class="hljs-string">'bar'&lt;/span>;
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> foo = &lt;span class="hljs-string">"bar"&lt;/span>;
</code>&lt;/code></pre>
  <h3 id="大括号位置">
    大括号位置
  </h3>
 请把你的所有的左大括号都放在语句开始的这一行。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">if&lt;/span> (&lt;span class="hljs-literal">true&lt;/span>) {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'winning'&lt;/span>);
}
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">if&lt;/span> (&lt;span class="hljs-literal">true&lt;/span>)
{
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'losing'&lt;/span>);
}
</code>&lt;/code></pre>
 同时，请注意在条件判断前后都添加一个空格。
  
  <h3 id="每个变量声明都带一个-var">
    每个变量声明都带一个 var
  </h3>
 每个变量声明都带一个 var , 这样删除或者调整变量声明的顺序会更加容易。 不要把变量都声明在最前面，而是声明在它最有意义的地方。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> keys = [&lt;span class="hljs-string">'foo'&lt;/span>, &lt;span class="hljs-string">'bar'&lt;/span>];
&lt;span class="hljs-keyword">var&lt;/span> values = [&lt;span class="hljs-number">23&lt;/span>, &lt;span class="hljs-number">42&lt;/span>];

&lt;span class="hljs-keyword">var&lt;/span> object = {};
&lt;span class="hljs-keyword">while&lt;/span> (items.length) {
  &lt;span class="hljs-keyword">var&lt;/span> key = keys.pop();
  object[key] = values.pop();
}
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> keys = [&lt;span class="hljs-string">'foo'&lt;/span>, &lt;span class="hljs-string">'bar'&lt;/span>],
    values = [&lt;span class="hljs-number">23&lt;/span>, &lt;span class="hljs-number">42&lt;/span>],
    object = {},
    key;

&lt;span class="hljs-keyword">while&lt;/span> (items.length) {
  key = keys.pop();
  object[key] = values.pop();
}
</code>&lt;/code></pre>
  <h3 id="变量、属性和函数名都采用小驼峰">
    变量、属性和函数名都采用小驼峰
  </h3>
 变量、属性和函数的命名风格都需要遵循小驼峰风格. 同时所有的命名都是有意义的。尽量避免用单字符变量和少见单词来命名。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> adminUser = db.query(&lt;span class="hljs-string">'SELECT * FROM users ...'&lt;/span>);
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> admin_user = db.query(&lt;span class="hljs-string">'SELECT *FROM users ...'&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> a = db.query(&lt;span class="hljs-string">'SELECT* FROM users ...'&lt;/span>);
</code>&lt;/code></pre>
  <h3 id="类名采用大驼峰">
    类名采用大驼峰
  </h3>
 类名都采用大驼峰风格来命名。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">BankAccount&lt;/span>() &lt;/span>{
}
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">bank_Account&lt;/span>() &lt;/span>{
}
</code>&lt;/code></pre>
  <h3 id="用大写来标识常量">
    用大写来标识常量
  </h3>
 常量变量和对象的静态常量属性都需要特殊表明，通过全部大写的方式来表明。
  
 尽管 Node.js / V8 支持 mozilla的 <a href="https://developer.mozilla.org/en/JavaScript/Reference/Statements/const" target="_blank" rel="noopener">const</a> 关键字, 但是不幸的是，对象的属性并不支持这个关键字, 而且 const 没有包含于任何一个 ECMA 规范中。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> SECOND = &lt;span class="hljs-number">1&lt;/span> * &lt;span class="hljs-number">1000&lt;/span>;

&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">File&lt;/span>() &lt;/span>{
}
File.FULL_PERMISSIONS = &lt;span class="hljs-number">0777&lt;/span>;
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">const&lt;/span> SECOND = &lt;span class="hljs-number">1&lt;/span> * &lt;span class="hljs-number">1000&lt;/span>;

&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">File&lt;/span>() &lt;/span>{
}
File.fullPermissions = &lt;span class="hljs-number">0777&lt;/span>;
</code>&lt;/code></pre>
  <h3 id="对象、数组的创建">
    对象、数组的创建
  </h3>
 使用尾随逗号，尽量用一行来声明，只有在编译器不接受的情况下才把对象的 key 用单引号包裹。使用字面表达式，用 <code>{}, []</code> 代替 <code>new Array, new Object</code>。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> a = [&lt;span class="hljs-string">'hello'&lt;/span>, &lt;span class="hljs-string">'world'&lt;/span>];
&lt;span class="hljs-keyword">var&lt;/span> b = {
  &lt;span class="hljs-attr">good&lt;/span>: &lt;span class="hljs-string">'code'&lt;/span>,
  &lt;span class="hljs-string">'is generally'&lt;/span>: &lt;span class="hljs-string">'pretty'&lt;/span>,
};
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> a = [
  &lt;span class="hljs-string">'hello'&lt;/span>, &lt;span class="hljs-string">'world'&lt;/span>
];
&lt;span class="hljs-keyword">var&lt;/span> b = {&lt;span class="hljs-string">"good"&lt;/span>: &lt;span class="hljs-string">'code'&lt;/span>
        , is generally: &lt;span class="hljs-string">'pretty'&lt;/span>
        };
</code>&lt;/code></pre>
  <h3 id="使用--比较符">
    使用 === 比较符
  </h3>
 写代码并不是在背这些 <a href="https://developer.mozilla.org/en/JavaScript/Reference/Operators/Comparison_Operators" target="_blank" rel="noopener">stupid rules</a>. 使用 <code>===</code> 操作符来进行比较操作，它会完全按照你的期望来执行。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> a = &lt;span class="hljs-number">0&lt;/span>;
&lt;span class="hljs-keyword">if&lt;/span> (a === &lt;span class="hljs-string">''&lt;/span>) {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'winning'&lt;/span>);
}

</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> a = &lt;span class="hljs-number">0&lt;/span>;
&lt;span class="hljs-keyword">if&lt;/span> (a == &lt;span class="hljs-string">''&lt;/span>) {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'losing'&lt;/span>);
}
</code>&lt;/code></pre>
  <h3 id="三元操作符分多行">
    三元操作符分多行
  </h3>
 三元操作符不应该写在一行，将它分割到多行。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> foo = (a === b)
  ? &lt;span class="hljs-number">1&lt;/span>
  : &lt;span class="hljs-number">2&lt;/span>;
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> foo = (a === b) ? &lt;span class="hljs-number">1&lt;/span> : &lt;span class="hljs-number">2&lt;/span>;
</code>&lt;/code></pre>
  <h3 id="不要扩展内建类型">
    不要扩展内建类型
  </h3>
 不要扩展 javascript 内建对象的方法。将来的你会感谢你这个做法的。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> a = [];
&lt;span class="hljs-keyword">if&lt;/span> (!a.length) {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'winning'&lt;/span>);
}
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-built_in">Array&lt;/span>.prototype.empty = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> !&lt;span class="hljs-keyword">this&lt;/span>.length;
}

&lt;span class="hljs-keyword">var&lt;/span> a = [];
&lt;span class="hljs-keyword">if&lt;/span> (a.empty()) {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'losing'&lt;/span>);
}
</code>&lt;/code></pre>
  <h3 id="使用有意义的判断条件">
    使用有意义的判断条件
  </h3>
 所有复杂的条件判断都需要赋予一个有意义的名字或者方法。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> isValidPassword = password.length &gt;= &lt;span class="hljs-number">4&lt;/span> && &lt;span class="hljs-regexp">/^(?=.*\d).{4,}$/&lt;/span>.test(password);

&lt;span class="hljs-keyword">if&lt;/span> (isValidPassword) {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'winning'&lt;/span>);
}
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">if&lt;/span> (password.length &gt;= &lt;span class="hljs-number">4&lt;/span> && &lt;span class="hljs-regexp">/^(?=.*\d).{4,}$/&lt;/span>.test(password)) {
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'losing'&lt;/span>);
}
</code>&lt;/code></pre>
  <h3 id="写精简的函数">
    写精简的函数
  </h3>
 保持你的函数尽可能的精简。一个好的函数应该能够在幻灯片上一屏显示，并且让坐在教室最后一排的人看清楚。别再去数你的每一个函数并控制在15行以内了。
  
  <h3 id="尽早的从函数中返回">
    尽早的从函数中返回
  </h3>
 为了避免深入嵌套的 if 语句，请尽早的从函数中返回。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">isPercentage&lt;/span>(&lt;span class="hljs-params">val&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">if&lt;/span> (val &lt; &lt;span class="hljs-number">0&lt;/span>) {
    &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">false&lt;/span>;
  }

  &lt;span class="hljs-keyword">if&lt;/span> (val &gt; &lt;span class="hljs-number">100&lt;/span>) {
    &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">false&lt;/span>;
  }

  &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">true&lt;/span>;
}
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">isPercentage&lt;/span>(&lt;span class="hljs-params">val&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">if&lt;/span> (val &gt;= &lt;span class="hljs-number">0&lt;/span>) {
    &lt;span class="hljs-keyword">if&lt;/span> (val &lt; &lt;span class="hljs-number">100&lt;/span>) {
      &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">true&lt;/span>;
    } &lt;span class="hljs-keyword">else&lt;/span> {
      &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">false&lt;/span>;
    }
  } &lt;span class="hljs-keyword">else&lt;/span> {
    &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-literal">false&lt;/span>;
  }
}
</code>&lt;/code></pre>
 针对这个示例，甚至可以进一步精简优化：
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">isPercentage&lt;/span>(&lt;span class="hljs-params">val&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">var&lt;/span> isInRange = (val &gt;= &lt;span class="hljs-number">0&lt;/span> && val &lt;= &lt;span class="hljs-number">100&lt;/span>);
  &lt;span class="hljs-keyword">return&lt;/span> isInRange;
}
</code>&lt;/code></pre>
  <h3 id="给你的闭包命名">
    给你的闭包命名
  </h3>
 请尽量给你的闭包、匿名函数命名。这让人知道你在意这个函数, 更重要的是，这将会产生可读性更好的堆栈跟踪和CPU调用信息等。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">req.on(&lt;span class="hljs-string">'end'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">onEnd&lt;/span>() &lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'winning'&lt;/span>);
});
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">req.on(&lt;span class="hljs-string">'end'&lt;/span>, &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'losing'&lt;/span>);
});
</code>&lt;/code></pre>
  <h3 id="不要嵌套闭包">
    不要嵌套闭包
  </h3>
 使用闭包，但是不要嵌套他们，否则你的代码将会一团糟。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
  client.connect(afterConnect);
}, &lt;span class="hljs-number">1000&lt;/span>);

&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">afterConnect&lt;/span>() &lt;/span>{
  &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'winning'&lt;/span>);
}
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">setTimeout(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
  client.connect(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'losing'&lt;/span>);
  });
}, &lt;span class="hljs-number">1000&lt;/span>);
</code>&lt;/code></pre>
  <h3 id="使用单行注释风格">
    使用单行注释风格
  </h3>
 不管是单行注释还是多行注释，都使用 <code>//</code> 。同时请尝试在更高层次来编写注释（解释函数整体的思路），只在解释一些难以理解代码的时候添加注释，而不是给一些琐碎的东西加上注释。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-comment">// 'ID_SOMETHING=VALUE' -&gt; ['ID_SOMETHING=VALUE'', 'SOMETHING', 'VALUE']&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> matches = item.match(&lt;span class="hljs-regexp">/ID_([^\n]+)=([^\n]+)/&lt;/span>));

&lt;span class="hljs-comment">// This function has a nasty side effect where a failure to increment a&lt;/span>
&lt;span class="hljs-comment">// redis counter used for statistics will cause an exception. This needs&lt;/span>
&lt;span class="hljs-comment">// to be fixed in a later iteration.&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">loadUser&lt;/span>(&lt;span class="hljs-params">id, cb&lt;/span>) &lt;/span>{
  &lt;span class="hljs-comment">// ...&lt;/span>
}

&lt;span class="hljs-keyword">var&lt;/span> isSessionValid = (session.expires &lt; &lt;span class="hljs-built_in">Date&lt;/span>.now());
&lt;span class="hljs-keyword">if&lt;/span> (isSessionValid) {
  &lt;span class="hljs-comment">// ...&lt;/span>
}
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-comment">// Execute a regex&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> matches = item.match(&lt;span class="hljs-regexp">/ID_([^\n]+)=([^\n]+)/&lt;/span>));

&lt;span class="hljs-comment">// Usage: loadUser(5, function () { ... })&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">loadUser&lt;/span>(&lt;span class="hljs-params">id, cb&lt;/span>) &lt;/span>{
  &lt;span class="hljs-comment">// ...&lt;/span>
}

&lt;span class="hljs-comment">// Check if the session is valid&lt;/span>
&lt;span class="hljs-keyword">var&lt;/span> isSessionValid = (session.expires &lt; &lt;span class="hljs-built_in">Date&lt;/span>.now());
&lt;span class="hljs-comment">// If the session is valid&lt;/span>
&lt;span class="hljs-keyword">if&lt;/span> (isSessionValid) {
  &lt;span class="hljs-comment">// ...&lt;/span>
}
</code>&lt;/code></pre>
  <h3 id="objectfreeze-objectpreventextensions-objectseal-with-eval">
    Object.freeze, Object.preventExtensions, Object.seal, with, eval
  </h3>
 这一堆屎一样的东西，你永远都不会需要他们。
  
  <h3 id="getters-和-setters">
    Getters 和 setters
  </h3>
 不要使用 setters ，他们会引发一些使用你的代码的人无法解决的问题。 当没有<a href="https://en.wikipedia.org/wiki/Side_effect_(computer_science)" target="_blank" rel="noopener">副作用</a>的时候，可以使用 getters，例如提供一个集合类的长度属性的时候。
  
  <h3 id="异步回调函数">
    异步回调函数
  </h3>
 Node 的异步回调函数的第一个参数应该是错误指示，只有这样才能够享受许多流程控制模块的福利。
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-json hljs raw">function cb(err, data, ...) {...}
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-javascript hljs raw">&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">cb&lt;/span>(&lt;span class="hljs-params">data, ...&lt;/span>) &lt;/span>{...}
</code>&lt;/code></pre>
  <h3 id="继承">
    继承
  </h3>
 尽管有许多的方法来实现继承，但是最为推荐的是 ES6 的标准写法：
  
  <pre><code>&lt;code class="lang-javascript hljs raw">&lt;span class="hljs-class">&lt;span class="hljs-keyword">class&lt;/span> &lt;span class="hljs-title">Socket&lt;/span> &lt;span class="hljs-keyword">extends&lt;/span> &lt;span class="hljs-title">Stream&lt;/span> &lt;/span>{
  &lt;span class="hljs-keyword">constructor&lt;/span>(options) {
    supper(options);
  }
}
</code>&lt;/code></pre>
  <h3 id="文件命名">
    文件命名
  </h3>
 单词之间使用 <code>_</code> underscore 来分割，如果你不想暴露某个文件给用户 ， 你也可以用 <code>_</code> 来开头
  
 <em>Right :</em>
  
  <pre><code>&lt;code>child_process.js
string_decoder.js
_linklist.js
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code>childProcess.js
stringDecoder.js
</code>&lt;/code></pre>
  <h3 id="空格">
    空格
  </h3>
 在所有的操作符前后都添加空格，<code>function</code> 关键字后面添加空格
  
 <em>Right:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> add = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">a, b&lt;/span>) &lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> a + b;
};
</code>&lt;/code></pre>
 <em>Wrong:</em>
  
  <pre><code>&lt;code class="lang-js hljs raw">&lt;span class="hljs-keyword">var&lt;/span> add=&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">a,b&lt;/span>)&lt;/span>{
  &lt;span class="hljs-keyword">return&lt;/span> a+b;
}
</code>&lt;/code></pre>
  <h3 id="尽量参照-nodejs-源码的编码风格">
    尽量参照 Node.js 源码的编码风格
  </h3>
  <ul>
    
      <a href="https://github.com/nodejs/node" target="_blank" rel="noopener">node 源码</a>
    
    
      <a href="https://google.github.io/styleguide/javascriptguide.xml" target="_blank" rel="noopener">Google’s JavaScript style guide</a>
    
</div>
