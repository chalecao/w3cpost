---
title: webpack编译代码原理介绍

---
<div class="article fmt article__content" data-id="1190000017890529" data-license="cc">
  <h2 id="articleHeader1">
    0 配置文件
  </h2>
  
  <p>
    首先简单看一下webpack配置文件(webpack.config.js):
  </p>
  
  <pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">var&lt;/span> path = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'path'&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> node_modules = path.resolve(__dirname, &lt;span class="hljs-string">'node_modules'&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> pathToReact = path.resolve(node_modules, &lt;span class="hljs-string">'react/dist/react.min.js'&lt;/span>);

&lt;span class="hljs-built_in">module&lt;/span>.exports = {
  &lt;span class="hljs-comment">// 入口文件，是模块构建的起点，同时每一个入口文件对应最后生成的一个 chunk。&lt;/span>
  entry: {
    &lt;span class="hljs-attr">bundle&lt;/span>: [
      &lt;span class="hljs-string">'webpack/hot/dev-server'&lt;/span>,
      &lt;span class="hljs-string">'webpack-dev-server/client?http://localhost:8080'&lt;/span>,
      path.resolve(__dirname, &lt;span class="hljs-string">'app/app.js'&lt;/span>)
    ]
  },
  &lt;span class="hljs-comment">// 文件路径指向(可加快打包过程)。&lt;/span>
  resolve: {
    &lt;span class="hljs-attr">alias&lt;/span>: {
      &lt;span class="hljs-string">'react'&lt;/span>: pathToReact
    }
  },
  &lt;span class="hljs-comment">// 生成文件，是模块构建的终点，包括输出文件与输出路径。&lt;/span>
  output: {
    &lt;span class="hljs-attr">path&lt;/span>: path.resolve(__dirname, &lt;span class="hljs-string">'build'&lt;/span>),
    &lt;span class="hljs-attr">filename&lt;/span>: &lt;span class="hljs-string">'[name].js'&lt;/span>
  },
  &lt;span class="hljs-comment">// 这里配置了处理各模块的 loader ，包括 css 预处理 loader ，es6 编译 loader，图片处理 loader。&lt;/span>
  &lt;span class="hljs-built_in">module&lt;/span>: {
    &lt;span class="hljs-attr">loaders&lt;/span>: [
      {
        &lt;span class="hljs-attr">test&lt;/span>: &lt;span class="hljs-regexp">/\.js$/&lt;/span>,
        &lt;span class="hljs-attr">loader&lt;/span>: &lt;span class="hljs-string">'babel'&lt;/span>,
        &lt;span class="hljs-attr">query&lt;/span>: {
          &lt;span class="hljs-attr">presets&lt;/span>: [&lt;span class="hljs-string">'es2015'&lt;/span>, &lt;span class="hljs-string">'react'&lt;/span>]
        }
      }
    ],
    &lt;span class="hljs-attr">noParse&lt;/span>: [pathToReact]
  },
  &lt;span class="hljs-comment">// webpack 各插件对象，在 webpack 的事件流中执行对应的方法。&lt;/span>
  plugins: [
    &lt;span class="hljs-keyword">new&lt;/span> webpack.HotModuleReplacementPlugin()
  ]
};</code></pre>
  
  <h2 id="articleHeader2">
    1. 工作原理概述
  </h2>
  
  <h3 id="articleHeader3">
    1.1 基本概念
  </h3>
  
  <p>
    在了解webpack原理之前，需要掌握以下几个核心概念
  </p>
  
  <ul>
    <li>
      Entry: 入口，webpack构建第一步从entry开始
    </li>
    <li>
      module:模块，在webpack中一个模块对应一个文件。webpack会从entry开始，递归找出所有依赖的模块
    </li>
    <li>
      Chunk：代码块，一个chunk由多个模块组合而成，用于代码合并与分割
    </li>
    <li>
      Loader: 模块转换器，用于将模块的原内容按照需求转换成新内容
    </li>
    <li>
      Plugin:拓展插件，在webpack构建流程中的特定时机会广播对应的事件，插件可以监听这些事件的发生，在特定的时机做对应的事情
    </li>
  </ul>
  
  <h3 id="articleHeader4">
    1.2 流程概述
  </h3>
  
  <p>
    webpack从启动到结束依次执行以下操作：
  </p>
  
  <pre class="hljs sql"><code class="mermaid">初始化参数 &lt;span class="hljs-comment">--&gt; 开始编译 &lt;/span>
开始编译 &lt;span class="hljs-comment">--&gt;确定入口 &lt;/span>
确定入口 &lt;span class="hljs-comment">--&gt; 编译模块&lt;/span>
编译模块 &lt;span class="hljs-comment">--&gt; 完成编译模块&lt;/span>
完成编译模块 &lt;span class="hljs-comment">--&gt; 输出资源&lt;/span>
输出资源 &lt;span class="hljs-comment">--&gt; 输出完成&lt;/span>
</code></pre>
  
  <p>
    各个阶段执行的操作如下：
  </p>
  
  <ol>
    <li>
      初始化参数：从配置文件(默认webpack.config.js)和shell语句中读取与合并参数，得出最终的参数
    </li>
    <li>
      开始编译(compile)：用上一步得到的参数初始化Comiler对象，加载所有配置的插件，通过执行对象的run方法开始执行编译
    </li>
    <li>
      确定入口：根据配置中的entry找出所有的入口文件
    </li>
    <li>
      编译模块：从入口文件出发，调用所有配置的Loader对模块进行翻译,再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过处理
    </li>
    <li>
      完成编译模块：经过第四步之后，得到了每个模块被翻译之后的最终内容以及他们之间的依赖关系
    </li>
    <li>
      输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的chunk，再将每个chunk转换成一个单独的文件加入输出列表中，这是可以修改输出内容的最后机会
    </li>
    <li>
      输出完成：在确定好输出内容后，根据配置(webpack.config.js && shell)确定输出的路径和文件名，将文件的内容写入文件系统中(fs)
    </li>
  </ol>
  
  <p>
    在以上过程中，webpack会在特定的时间点广播特定的事件，插件监听事件并执行相应的逻辑，并且插件可以调用webpack提供的api改变webpack的运行结果
  </p>
  
  <h3 id="articleHeader5">
    1.3 流程细节
  </h3>
  
  <p>
    webpack构建流程可分为以下三大阶段。
  </p>
  
  <ol>
    <li>
      初始化：启动构建，读取与合并配置参数，加载plugin,实例化Compiler
    </li>
    <li>
      编译：从Entry出发，针对每个Module串行调用对应的Loader去翻译文件中的内容，再找到该Module依赖的Module，递归的进行编译处理
    </li>
    <li>
      输出：将编译后的Module组合成Chunk,将Chunk转换成文件，输出到文件系统中
    </li>
  </ol>
  
  <p>
    如果只执行一次，流程如上，但在开启监听模式下，流程如下图
  </p>
  
  <pre class="hljs sql"><code class="mermaid">graph TD

  初始化&lt;span class="hljs-comment">--&gt;编译;&lt;/span>
  编译&lt;span class="hljs-comment">--&gt;输出;&lt;/span>
  输出&lt;span class="hljs-comment">--&gt;文本发生变化&lt;/span>
  文本发生变化&lt;span class="hljs-comment">--&gt;编译&lt;/span>
</code></pre>
  
  <h4>
    1.3.1初始化阶段
  </h4>
  
  <p>
    在初始化阶段会发生的事件如下
  </p>
  
  <table>
    <tr>
      <th>
        事件
      </th>

      <th>
        描述
      </th>
    </tr>
    
    <tr>
      <td>
        初始化参数
      </td>
      
      <td>
        从配置文件和shell语句中读取与合并参数，得出最终的参数，这个过程还会执行配置文件中的插件实例化语句 new Plugin()
      </td>
    </tr>
    
    <tr>
      <td>
        实例化Compiler
      </td>
      
      <td>
        实例化Compiler,传入上一步得到的参数，Compiler负责文件监听和启动编译。在Compiler实例中包含了完整的webpack配置，全局只有一个Compiler实例。
      </td>
    </tr>
    
    <tr>
      <td>
        加载插件
      </td>
      
      <td>
        依次调用插件的apply方法，让插件可以监听后续的所有事件节点。同时向插件中传入compiler实例的引用，以方便插件通过compiler调用webpack的api
      </td>
    </tr>
    
    <tr>
      <td>
        environment
      </td>
      
      <td>
        开始应用Node.js风格的文件系统到compiler对象，以方便后续的文件寻找和读取
      </td>
    </tr>
    
    <tr>
      <td>
        Entry-option
      </td>
      
      <td>
        读取配置的Entrys,为每个Entry实例化一个对应的EntryPlugin,为后面该Entry的递归解析工作做准备
      </td>
    </tr>
    
    <tr>
      <td>
        After-plugins
      </td>
      
      <td>
        调用完所有内置的和配置的插件的apply方法
      </td>
    </tr>
    
    <tr>
      <td>
        After-resolvers
      </td>
      
      <td>
        根据配置初始化resolver,resolver负责在文件系统中寻找指定路径的文件
      </td>
    </tr>
  </table>
  
  <p>
    #### 1.3.2 编译阶段 (事件名全为小写)
  </p>
  
  <table>
    <tr>
      <th>
        事件
      </th>

      <th>
        解释
      </th>
    </tr>
    
    <tr>
      <td>
        run
      </td>
      
      <td>
        启动一次编译
      </td>
    </tr>
    
    <tr>
      <td>
        Watch-run
      </td>
      
      <td>
        在监听模式下启动编译，文件发生变化会重新编译
      </td>
    </tr>
    
    <tr>
      <td>
        compile
      </td>
      
      <td>
        告诉插件一次新的编译将要启动，同时会给插件带上compiler对象
      </td>
    </tr>
    
    <tr>
      <td>
        compilation
      </td>
      
      <td>
        当webpack以开发模式运行时，每当检测到文件的变化，便有一次新的compilation被创建。一个Compilation对象包含了当前的模块资源、编译生成资源、变化的文件等。compilation对象也提供了很多事件回调给插件进行拓展
      </td>
    </tr>
    
    <tr>
      <td>
        make
      </td>
      
      <td>
        一个新的compilation对象创建完毕,即将从entry开始读取文件,根据文件类型和编译的loader对文件进行==编译==,编译完后再找出该文件依赖的文件,递归地编译和解析
      </td>
    </tr>
    
    <tr>
      <td>
        after-compile
      </td>
      
      <td>
        一次compilation执行完成
      </td>
    </tr>
    
    <tr>
      <td>
        invalid
      </td>
      
      <td>
        当遇到错误会触发改事件,该事件不会导致webpack退出
      </td>
    </tr>
    
    <tr>
      <td>
      </td>
      
      <td>
      </td>
    </tr>
  </table>
  
  <p>
    在编译阶段最重要的事件是compilation,因为在compilation阶段调用了Loader,完成了每个模块的==转换==操作。在compilation阶段又会发生很多小事件，如下表
  </p>
  
  <table>
    <tr>
      <th>
        事件
      </th>

      <th>
        解释
      </th>
    </tr>
    
    <tr>
      <td>
        build-module
      </td>
      
      <td>
        使用相应的Loader去转换一个模块
      </td>
    </tr>
    
    <tr>
      <td>
        Normal-module-loader
      </td>
      
      <td>
        在使用loader转换完一个模块后，使用<a href="https://github.com/acornjs/acorn" target="_blank" rel="nofollow noopener noreferrer">acorn</a>解析转换后的内容，输出对应的抽象语法树（AST），以方便webpack对代码进行分析
      </td>
    </tr>
    
    <tr>
      <td>
        program
      </td>
      
      <td>
        从配置的入口模块开始，分析其AST,当遇到require等导入其他模块的语句时，便将其加入依赖的模块列表中，同时对于新找出来的模块递归分析，最终弄清楚所有模块的依赖关系
      </td>
    </tr>
    
    <tr>
      <td>
        seal
      </td>
      
      <td>
        所有模块及依赖的模块都通过Loader转换完成，根据依赖关系生成Chunk
      </td>
    </tr>
    
    <tr>
      <td>
      </td>
      
      <td>
      </td>
    </tr>
  </table>
  
  <h4>
    2.3 输出阶段
  </h4>
  
  <p>
    输出阶段会发生的事件及解释:
  </p>
  
  <table>
    <tr>
      <th>
        事件
      </th>

      <th>
        解释
      </th>
    </tr>
    
    <tr>
      <td>
        should-emit
      </td>
      
      <td>
        所有需要输出的文件已经生成,询问插件有哪些文件需要输出,有哪些不需要输出
      </td>
    </tr>
    
    <tr>
      <td>
        emit
      </td>
      
      <td>
        确定好要输出哪些文件后,执行文件输出,==可以在这里获取和修改输出的内容==
      </td>
    </tr>
    
    <tr>
      <td>
        after-mit
      </td>
      
      <td>
        文件输出完毕
      </td>
    </tr>
    
    <tr>
      <td>
        done
      </td>
      
      <td>
        成功完成一次完整的编译和输出流程
      </td>
    </tr>
    
    <tr>
      <td>
        failed
      </td>
      
      <td>
        如果在编译和输出中出现错误,导致webpack退出,就会直接跳转到本步骤,插件可以在本事件中获取具体的错误原因
      </td>
    </tr>
  </table>
  
  <p>
    在输出阶段已经得到了各个模块经过转化后的结果和其依赖关系,并且将相应的模块组合在一起形成一个个chunk.在输出阶段根据chunk的类型,使用对应的模板生成最终要输出的文件内容. |
  </p>
  
  <pre class="javascript hljs"><code class="js">&lt;span class="hljs-comment">//以下代码用来包含webpack运行过程中的每个阶段&lt;/span>
&lt;span class="hljs-comment">//file:webpack.config.js&lt;/span>

&lt;span class="hljs-keyword">const&lt;/span> path = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'path'&lt;/span>);
&lt;span class="hljs-comment">//插件监听事件并执行相应的逻辑&lt;/span>
&lt;span class="hljs-class">&lt;span class="hljs-keyword">class&lt;/span> &lt;span class="hljs-title">TestPlugin&lt;/span> &lt;/span>{
  &lt;span class="hljs-keyword">constructor&lt;/span>() {
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@plugin constructor'&lt;/span>);
  }

  apply(compiler) {
    &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@plugin apply'&lt;/span>);

    compiler.plugin(&lt;span class="hljs-string">'environment'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@environment'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'after-environment'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@after-environment'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'entry-option'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@entry-option'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'after-plugins'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@after-plugins'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'after-resolvers'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@after-resolvers'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'before-run'&lt;/span>, (options, callback) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@before-run'&lt;/span>);
      callback();
    });

    compiler.plugin(&lt;span class="hljs-string">'run'&lt;/span>, (options, callback) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@run'&lt;/span>);
      callback();
    });

    compiler.plugin(&lt;span class="hljs-string">'watch-run'&lt;/span>, (options, callback) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@watch-run'&lt;/span>);
      callback();
    });

    compiler.plugin(&lt;span class="hljs-string">'normal-module-factory'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@normal-module-factory'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'context-module-factory'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@context-module-factory'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'before-compile'&lt;/span>, (options, callback) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@before-compile'&lt;/span>);
      callback();
    });

    compiler.plugin(&lt;span class="hljs-string">'compile'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@compile'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'this-compilation'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@this-compilation'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'compilation'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@compilation'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'make'&lt;/span>, (options, callback) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@make'&lt;/span>);
      callback();
    });

    compiler.plugin(&lt;span class="hljs-string">'compilation'&lt;/span>, (compilation) =&gt; {

      compilation.plugin(&lt;span class="hljs-string">'build-module'&lt;/span>, (options) =&gt; {
        &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@build-module'&lt;/span>);
      });

      compilation.plugin(&lt;span class="hljs-string">'normal-module-loader'&lt;/span>, (options) =&gt; {
        &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@normal-module-loader'&lt;/span>);
      });

      compilation.plugin(&lt;span class="hljs-string">'program'&lt;/span>, (options, callback) =&gt; {
        &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@program'&lt;/span>);
        callback();
      });

      compilation.plugin(&lt;span class="hljs-string">'seal'&lt;/span>, (options) =&gt; {
        &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@seal'&lt;/span>);
      });
    });

    compiler.plugin(&lt;span class="hljs-string">'after-compile'&lt;/span>, (options, callback) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@after-compile'&lt;/span>);
      callback();
    });

    compiler.plugin(&lt;span class="hljs-string">'should-emit'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@should-emit'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'emit'&lt;/span>, (options, callback) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@emit'&lt;/span>);
      callback();
    });

    compiler.plugin(&lt;span class="hljs-string">'after-emit'&lt;/span>, (options, callback) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@after-emit'&lt;/span>);
      callback();
    });

    compiler.plugin(&lt;span class="hljs-string">'done'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@done'&lt;/span>);
    });

    compiler.plugin(&lt;span class="hljs-string">'failed'&lt;/span>, (options, callback) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@failed'&lt;/span>);
      callback();
    });

    compiler.plugin(&lt;span class="hljs-string">'invalid'&lt;/span>, (options) =&gt; {
      &lt;span class="hljs-built_in">console&lt;/span>.log(&lt;span class="hljs-string">'@invalid'&lt;/span>);
    });

  }
}</code></pre>
  
  <pre class="shell hljs"><code class="shell">&lt;span class="hljs-meta">#&lt;/span>&lt;span class="bash">在目录下执行&lt;/span>
webpack
&lt;span class="hljs-meta">#&lt;/span>&lt;span class="bash">输出以下内容&lt;/span>
@plugin constructor
@plugin apply
@environment
@after-environment
@entry-option
@after-plugins
@after-resolvers
@before-run
@run
@normal-module-factory
@context-module-factory
@before-compile
@compile
@this-compilation
@compilation
@make
@build-module
@normal-module-loader
@build-module
@normal-module-loader
@seal
@after-compile
@should-emit
@emit
@after-emit
@done
Hash: 19ef3b418517e78b5286
Version: webpack 3.11.0
Time: 95ms
    Asset     Size  Chunks             Chunk Names
bundle.js  3.03 kB       0  [emitted]  main
   [0] ./main.js 44 bytes {0} [built]
   [1] ./show.js 114 bytes {0} [built]</code></pre>
  
  <h2 id="articleHeader6">
    2 输出文件分析
  </h2>
  
  <h3 id="articleHeader7">
    2.1 举个栗子
  </h3>
  
  <p>
    下面通过 Webpack 构建一个采用 CommonJS 模块化编写的项目，该项目有个网页会通过 JavaScript 在网页中显示 <code>Hello,Webpack</code>。
  </p>
  
  <p>
    运行构建前，先把要完成该功能的最基础的 JavaScript 文件和 HTML 建立好，需要如下文件：
  </p>
  
  <p>
    页面入口文件 <code>index.html</code>
  </p>
  
  <pre class="xml hljs"><code class="html">&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">html&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">head&lt;/span>&gt;&lt;/span>
  &lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">meta&lt;/span> &lt;span class="hljs-attr">charset&lt;/span>=&lt;span class="hljs-string">"UTF-8"&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">head&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">body&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">div&lt;/span> &lt;span class="hljs-attr">id&lt;/span>=&lt;span class="hljs-string">"app"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">div&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-comment">&lt;!--导入 Webpack 输出的 JavaScript 文件--&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;&lt;span class="hljs-name">script&lt;/span> &lt;span class="hljs-attr">src&lt;/span>=&lt;span class="hljs-string">"./dist/bundle.js"&lt;/span>&gt;&lt;/span>&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">script&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">body&lt;/span>&gt;&lt;/span>
&lt;span class="hljs-tag">&lt;/&lt;span class="hljs-name">html&lt;/span>&gt;&lt;/span></code></pre>
  
  <p>
    JS 工具函数文件 <code>show.js</code>
  </p>
  
  <pre class="javascript hljs"><code class="js">&lt;span class="hljs-comment">// 操作 DOM 元素，把 content 显示到网页上&lt;/span>
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">show&lt;/span>(&lt;span class="hljs-params">content&lt;/span>) &lt;/span>{
  &lt;span class="hljs-built_in">window&lt;/span>.document.getElementById(&lt;span class="hljs-string">'app'&lt;/span>).innerText = &lt;span class="hljs-string">'Hello,'&lt;/span> + content;
}

&lt;span class="hljs-comment">// 通过 CommonJS 规范导出 show 函数&lt;/span>
&lt;span class="hljs-built_in">module&lt;/span>.exports = show;</code></pre>
  
  <p>
    JS 执行入口文件 <code>main.js</code>
  </p>
  
  <pre class="javascript hljs"><code class="js">&lt;span class="hljs-comment">// 通过 CommonJS 规范导入 show 函数&lt;/span>
&lt;span class="hljs-keyword">const&lt;/span> show = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'./show.js'&lt;/span>);
&lt;span class="hljs-comment">// 执行 show 函数&lt;/span>
show(&lt;span class="hljs-string">'Webpack'&lt;/span>);</code></pre>
  
  <p>
    Webpack 在执行构建时默认会从项目根目录下的 <code>webpack.config.js</code> 文件读取配置，所以你还需要新建它，其内容如下：
  </p>
  
  <pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">const&lt;/span> path = &lt;span class="hljs-built_in">require&lt;/span>(&lt;span class="hljs-string">'path'&lt;/span>);

&lt;span class="hljs-built_in">module&lt;/span>.exports = {
  &lt;span class="hljs-comment">// JavaScript 执行入口文件&lt;/span>
  entry: &lt;span class="hljs-string">'./main.js'&lt;/span>,
  &lt;span class="hljs-attr">output&lt;/span>: {
    &lt;span class="hljs-comment">// 把所有依赖的模块合并输出到一个 bundle.js 文件&lt;/span>
    filename: &lt;span class="hljs-string">'bundle.js'&lt;/span>,
    &lt;span class="hljs-comment">// 输出文件都放到 dist 目录下&lt;/span>
    path: path.resolve(__dirname, &lt;span class="hljs-string">'./dist'&lt;/span>),
  }
};</code></pre>
  
  <p>
    由于 Webpack 构建运行在 Node.js 环境下，所以该文件最后需要通过 CommonJS 规范导出一个描述如何构建的 <code>Object</code> 对象。
  </p>
  
  <pre class="hljs sql"><code>|&lt;span class="hljs-comment">-- index.html&lt;/span>
|&lt;span class="hljs-comment">-- main.js&lt;/span>
|&lt;span class="hljs-comment">-- show.js&lt;/span>
|&lt;span class="hljs-comment">-- webpack.config.js&lt;/span></code></pre>
  
  <p>
    一切文件就绪，在项目根目录下执行 <code>webpack</code> 命令运行 Webpack 构建，你会发现目录下多出一个 <code>dist</code>目录，里面有个 <code>bundle.js</code> 文件， <code>bundle.js</code> 文件是一个可执行的 JavaScript 文件，它包含页面所依赖的两个模块 <code>main.js</code> 和 <code>show.js</code>及内置的 <code>webpackBootstrap</code> 启动函数。 这时你用浏览器打开 <code>index.html</code> 网页将会看到 <code>Hello,Webpack</code>。
  </p>
  
  <h3 id="articleHeader8">
    2.2 bundle.js文件做了什么
  </h3>
  
  <p>
    看之前记住：一个模块就是一个文件，
  </p>
  
  <p>
    首先看下bundle.js长什么样子，具体代码如下：（建议把以下代码放入编辑器中查看，最好让index.html执行下，弄清楚执行的顺序）
  </p>
  
  <pre class="javascript hljs"><code class="js">(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">modules&lt;/span>) &lt;/span>{ &lt;span class="hljs-comment">// webpackBootstrap&lt;/span>
  &lt;span class="hljs-comment">// 1. 缓存模块&lt;/span>
  &lt;span class="hljs-keyword">var&lt;/span> installedModules = {};
  &lt;span class="hljs-comment">// 2. 定义可以在浏览器使用的require函数&lt;/span>
  &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">__webpack_require__&lt;/span>(&lt;span class="hljs-params">moduleId&lt;/span>) &lt;/span>{

    &lt;span class="hljs-comment">// 2.1检查模块是否在缓存里，在的话直接返回&lt;/span>
    &lt;span class="hljs-keyword">if&lt;/span>(installedModules[moduleId]) {
      &lt;span class="hljs-keyword">return&lt;/span> installedModules[moduleId].exports;
    }
    &lt;span class="hljs-comment">// 2.2 模块不在缓存里，新建一个对象module=installModules[moduleId] {i:moduleId,l:模块是否加载,exports:模块返回值}&lt;/span>
    &lt;span class="hljs-keyword">var&lt;/span> &lt;span class="hljs-built_in">module&lt;/span> = installedModules[moduleId] = {
      &lt;span class="hljs-attr">i&lt;/span>: moduleId,&lt;span class="hljs-comment">//第一次执行为0&lt;/span>
      l: &lt;span class="hljs-literal">false&lt;/span>,
      &lt;span class="hljs-attr">exports&lt;/span>: {}
    };&lt;span class="hljs-comment">//第一次执行module:{i:0,l:false,exports:{}}&lt;/span>
    &lt;span class="hljs-comment">// 2.3 执行传入的参数中对应id的模块 第一次执行数组中传入的第一个参数&lt;/span>
          &lt;span class="hljs-comment">//modules[0].call({},{i:0,l:false,exports:{}},{},__webpack_require__函数)&lt;/span>
    modules[moduleId].call(&lt;span class="hljs-built_in">module&lt;/span>.exports, &lt;span class="hljs-built_in">module&lt;/span>, &lt;span class="hljs-built_in">module&lt;/span>.exports, __webpack_require__);
    &lt;span class="hljs-comment">// 2.4 将这个模块标记为已加载&lt;/span>
    &lt;span class="hljs-built_in">module&lt;/span>.l = &lt;span class="hljs-literal">true&lt;/span>;
    &lt;span class="hljs-comment">// 2.5 返回这个模块的导出值&lt;/span>
    &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-built_in">module&lt;/span>.exports;
  }
  &lt;span class="hljs-comment">// 3. webpack暴露属性 m c d n o p&lt;/span>
  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;
  __webpack_require__.d = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">exports, name, getter&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">if&lt;/span>(!__webpack_require__.o(exports, name)) {
      &lt;span class="hljs-built_in">Object&lt;/span>.defineProperty(exports, name, {
        &lt;span class="hljs-attr">configurable&lt;/span>: &lt;span class="hljs-literal">false&lt;/span>,
        &lt;span class="hljs-attr">enumerable&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,
        &lt;span class="hljs-attr">get&lt;/span>: getter
      });
    }
  };
  __webpack_require__.n = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">module&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">var&lt;/span> getter = &lt;span class="hljs-built_in">module&lt;/span> && &lt;span class="hljs-built_in">module&lt;/span>.__esModule ?
      &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getDefault&lt;/span>() &lt;/span>{ &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-built_in">module&lt;/span>[&lt;span class="hljs-string">'default'&lt;/span>]; } :
      &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getModuleExports&lt;/span>() &lt;/span>{ &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-built_in">module&lt;/span>; };
    __webpack_require__.d(getter, &lt;span class="hljs-string">'a'&lt;/span>, getter);
    &lt;span class="hljs-keyword">return&lt;/span> getter;
  };
  __webpack_require__.o = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">object, property&lt;/span>) &lt;/span>{ &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-built_in">Object&lt;/span>.prototype.hasOwnProperty.call(object, property); };
  __webpack_require__.p = &lt;span class="hljs-string">""&lt;/span>;
  &lt;span class="hljs-comment">// 4. 执行reruire函数引入第一个模块(main.js对应的模块)&lt;/span>
&lt;span class="hljs-keyword">return&lt;/span>__webpack_require__(__webpack_require__.s = &lt;span class="hljs-number">0&lt;/span>);
})
([ &lt;span class="hljs-comment">// 0. 传入参数，参数是个数组&lt;/span>

  &lt;span class="hljs-comment">/*第0个参数 main.js对应的文件*/&lt;/span>
  (&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">module, exports, __webpack_require__&lt;/span>) &lt;/span>{

    &lt;span class="hljs-comment">// 通过 CommonJS 规范导入 show 函数&lt;/span>
    &lt;span class="hljs-keyword">const&lt;/span> show = __webpack_require__(&lt;span class="hljs-number">1&lt;/span>);&lt;span class="hljs-comment">//__webpack_require__(1)返回show&lt;/span>
    &lt;span class="hljs-comment">// 执行 show 函数&lt;/span>
    show(&lt;span class="hljs-string">'Webpack'&lt;/span>);

  }),
  &lt;span class="hljs-comment">/*第1个参数 show.js对应的文件*/&lt;/span>
  (&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">module, exports&lt;/span>) &lt;/span>{

    &lt;span class="hljs-comment">// 操作 DOM 元素，把 content 显示到网页上&lt;/span>
    &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">show&lt;/span>(&lt;span class="hljs-params">content&lt;/span>) &lt;/span>{
      &lt;span class="hljs-built_in">window&lt;/span>.document.getElementById(&lt;span class="hljs-string">'app'&lt;/span>).innerText = &lt;span class="hljs-string">'Hello,'&lt;/span> + content;
    }
    &lt;span class="hljs-comment">// 通过 CommonJS 规范导出 show 函数&lt;/span>
    &lt;span class="hljs-built_in">module&lt;/span>.exports = show;

  })
]);</code></pre>
  
  <p>
    以上看上去复杂的代码其实是一个自执行函数(文件作为自执行函数的参数)，可以简写如下：
  </p>
  
  <pre class="javascript hljs"><code class="js">(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">modules&lt;/span>)&lt;/span>{
    &lt;span class="hljs-comment">//模拟require语句&lt;/span>
    &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">__webpack_require__&lt;/span>()&lt;/span>{}
    &lt;span class="hljs-comment">//执行存放所有模块数组中的第0个模块(main.js)&lt;/span>
    __webpack_require_[&lt;span class="hljs-number">0&lt;/span>]
})([&lt;span class="hljs-comment">/*存放所有模块的数组*/&lt;/span>])</code></pre>
  
  <p>
    bundles.js能直接在浏览器中运行的原因是，在输出的文件中通过<code>__webpack_require__</code>函数,定义了一个可以在浏览器中执行的加载函数(加载文件使用ajax实现),来模拟Node.js中的require语句。
  </p>
  
  <p>
    原来一个个独立的模块文件被合并到了一个单独的 bundle.js 的原因在于浏览器不能像 Node.js 那样快速地去本地加载一个个模块文件，而必须通过网络请求去加载还未得到的文件。 如果模块数量很多，加载时间会很长，因此把所有模块都存放在了数组中，执行一次网络加载。
  </p>
  
  <p>
    修改main.js,改成import引入模块
  </p>
  
  <pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">import&lt;/span> show &lt;span class="hljs-keyword">from&lt;/span> &lt;span class="hljs-string">'./show'&lt;/span>;
show(&lt;span class="hljs-string">'Webpack'&lt;/span>);</code></pre>
  
  <p>
    在目录下执行<code>webpack</code>，会发现：
  </p>
  
  <ol>
    <li>
      生成的代码会有所不同，但是主要的区别是自执行函数的参数不同，也就是2.2代码的第二部分不同
    </li>
  </ol>
  
  <pre class="javascript hljs"><code class="js">([&lt;span class="hljs-comment">//自执行函数和上面相同，参数不同&lt;/span>
&lt;span class="hljs-comment">/*0*/&lt;/span>
(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">module, __webpack_exports__, __webpack_require__&lt;/span>) &lt;/span>{
&lt;span class="hljs-meta">
"use strict"&lt;/span>;
&lt;span class="hljs-built_in">Object&lt;/span>.defineProperty(__webpack_exports__, &lt;span class="hljs-string">"__esModule"&lt;/span>, { &lt;span class="hljs-attr">value&lt;/span>: &lt;span class="hljs-literal">true&lt;/span> });
&lt;span class="hljs-comment">/* harmony import */&lt;/span> &lt;span class="hljs-keyword">var&lt;/span>__WEBPACK_IMPORTED_MODULE_0__show__ = __webpack_require__(&lt;span class="hljs-number">1&lt;/span>);

&lt;span class="hljs-built_in">Object&lt;/span>(__WEBPACK_IMPORTED_MODULE_0__show__[&lt;span class="hljs-string">"a"&lt;/span> &lt;span class="hljs-comment">/* default */&lt;/span>])(&lt;span class="hljs-string">'Webpack'&lt;/span>);

}),
&lt;span class="hljs-comment">/*1*/&lt;/span>
(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">module, __webpack_exports__, __webpack_require__&lt;/span>) &lt;/span>{
&lt;span class="hljs-meta">
"use strict"&lt;/span>;
&lt;span class="hljs-comment">/*harmony export (immutable)*/&lt;/span> __webpack_exports__[&lt;span class="hljs-string">"a"&lt;/span>] = show;
&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">show&lt;/span>(&lt;span class="hljs-params">content&lt;/span>) &lt;/span>{
  &lt;span class="hljs-built_in">window&lt;/span>.document.getElementById(&lt;span class="hljs-string">'app'&lt;/span>).innerText = &lt;span class="hljs-string">'Hello,'&lt;/span> + content;
}

})
]);</code></pre>
  
  <p>
    参数不同的原因是es6的import和export模块被webpack编译处理过了,其实作用是一样的，接下来看一下在main.js中异步加载模块时，bundle.js是怎样的
  </p>
  
  <h3 id="articleHeader9">
    2.3异步加载时，bundle.js代码分析
  </h3>
  
  <p>
    <code>main.js</code>修改如下
  </p>
  
  <pre class="javascript hljs"><code class="js">&lt;span class="hljs-keyword">import&lt;/span>(&lt;span class="hljs-string">'./show'&lt;/span>).then(&lt;span class="hljs-function">&lt;span class="hljs-params">show&lt;/span>=&gt;&lt;/span>{
    show(&lt;span class="hljs-string">'Webpack'&lt;/span>)
})</code></pre>
  
  <p>
    构建成功后会生成两个文件
  </p>
  
  <ol>
    <li>
      bundle.js 执行入口文件
    </li>
    <li>
      0.bundle.js 异步加载文件
    </li>
  </ol>
  
  <p>
    其中0.bundle.js文件的内容如下：
  </p>
  
  <pre class="javascript hljs"><code class="js">webpackJsonp(&lt;span class="hljs-comment">/*在其他文件中存放的模块的ID*/&lt;/span>[&lt;span class="hljs-number">0&lt;/span>],[&lt;span class="hljs-comment">//本文件所包含的模块&lt;/span>
&lt;span class="hljs-comment">/*0*/&lt;/span>,
&lt;span class="hljs-comment">/*1 show.js对应的模块*/&lt;/span>
(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">module, __webpack_exports__, __webpack_require__&lt;/span>) &lt;/span>{
&lt;span class="hljs-meta">
  "use strict"&lt;/span>;
  &lt;span class="hljs-built_in">Object&lt;/span>.defineProperty(__webpack_exports__, &lt;span class="hljs-string">"__esModule"&lt;/span>, { &lt;span class="hljs-attr">value&lt;/span>: &lt;span class="hljs-literal">true&lt;/span> });
  &lt;span class="hljs-comment">/* harmony export (immutable) */&lt;/span>
  __webpack_exports__[&lt;span class="hljs-string">"default"&lt;/span>] = show;

  &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">show&lt;/span>(&lt;span class="hljs-params">content&lt;/span>) &lt;/span>{
    &lt;span class="hljs-built_in">window&lt;/span>.document.getElementById(&lt;span class="hljs-string">'app'&lt;/span>).innerText = &lt;span class="hljs-string">'Hello,'&lt;/span> + content;
  }

})
]);</code></pre>
  
  <p>
    bundle.js文件的内容如下：
  </p>
  
  <p>
    注意：bundle.js比上面的bundle.js的区别在于：
  </p>
  
  <ol>
    <li>
      多了一个<code>__webpack_require__.e</code>,用于加载被分割出去的需要异步加载的chunk对应的文件
    </li>
    <li>
      多了一个webpackJsonp函数，用于从异步加载的文件中安装模块
    </li>
  </ol>
  
  <pre class="javascript hljs"><code class="js">(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">modules&lt;/span>) &lt;/span>{ &lt;span class="hljs-comment">// webpackBootstrap&lt;/span>
    &lt;span class="hljs-comment">// install a JSONP callback for chunk loading&lt;/span>
  &lt;span class="hljs-keyword">var&lt;/span> parentJsonpFunction = &lt;span class="hljs-built_in">window&lt;/span>[&lt;span class="hljs-string">"webpackJsonp"&lt;/span>];
  &lt;span class="hljs-comment">// webpackJsonp用于从异步加载的文件中安装模块&lt;/span>
  &lt;span class="hljs-comment">// 将webpackJsonp挂载到全局是为了方便在其他文件中调用&lt;/span>
  &lt;span class="hljs-comment">/**
   * @param chunkIds 异步加载的模块中需要安装的模块对应的id
   * @param moreModules 异步加载的模块中需要安装模块列表
   * @param executeModules 异步加载的模块安装成功后需要执行的模块对应的index
   */&lt;/span>
    &lt;span class="hljs-built_in">window&lt;/span>[&lt;span class="hljs-string">"webpackJsonp"&lt;/span>] = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">webpackJsonpCallback&lt;/span>(&lt;span class="hljs-params">chunkIds, moreModules, executeModules&lt;/span>) &lt;/span>{
        &lt;span class="hljs-comment">// add "moreModules" to the modules object,&lt;/span>
        &lt;span class="hljs-comment">// then flag all "chunkIds" as loaded and fire callback&lt;/span>
        &lt;span class="hljs-keyword">var&lt;/span> moduleId, chunkId, i = &lt;span class="hljs-number">0&lt;/span>, resolves = [], result;
        &lt;span class="hljs-keyword">for&lt;/span>(;i &lt; chunkIds.length; i++) {
            chunkId = chunkIds[i];
            &lt;span class="hljs-keyword">if&lt;/span>(installedChunks[chunkId]) {
                resolves.push(installedChunks[chunkId][&lt;span class="hljs-number">0&lt;/span>]);
            }
            installedChunks[chunkId] = &lt;span class="hljs-number">0&lt;/span>;
        }
        &lt;span class="hljs-keyword">for&lt;/span>(moduleId &lt;span class="hljs-keyword">in&lt;/span> moreModules) {
            &lt;span class="hljs-keyword">if&lt;/span>(&lt;span class="hljs-built_in">Object&lt;/span>.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                modules[moduleId] = moreModules[moduleId];
            }
        }
        &lt;span class="hljs-keyword">if&lt;/span>(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
        &lt;span class="hljs-keyword">while&lt;/span>(resolves.length) {
            resolves.shift()();
        }
    };
    &lt;span class="hljs-comment">// The module cache&lt;/span>
    &lt;span class="hljs-keyword">var&lt;/span> installedModules = {};
    &lt;span class="hljs-comment">// objects to store loaded and loading chunks&lt;/span>
    &lt;span class="hljs-keyword">var&lt;/span> installedChunks = {
        &lt;span class="hljs-number">1&lt;/span>: &lt;span class="hljs-number">0&lt;/span>
    };
    &lt;span class="hljs-comment">// The require function&lt;/span>
    &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">__webpack_require__&lt;/span>(&lt;span class="hljs-params">moduleId&lt;/span>) &lt;/span>{
        &lt;span class="hljs-comment">// Check if module is in cache&lt;/span>
        &lt;span class="hljs-keyword">if&lt;/span>(installedModules[moduleId]) {
            &lt;span class="hljs-keyword">return&lt;/span> installedModules[moduleId].exports;
        }
        &lt;span class="hljs-comment">// Create a new module (and put it into the cache)&lt;/span>
        &lt;span class="hljs-keyword">var&lt;/span> &lt;span class="hljs-built_in">module&lt;/span> = installedModules[moduleId] = {
            &lt;span class="hljs-attr">i&lt;/span>: moduleId,
            &lt;span class="hljs-attr">l&lt;/span>: &lt;span class="hljs-literal">false&lt;/span>,
            &lt;span class="hljs-attr">exports&lt;/span>: {}
        };
        &lt;span class="hljs-comment">// Execute the module function&lt;/span>
        modules[moduleId].call(&lt;span class="hljs-built_in">module&lt;/span>.exports, &lt;span class="hljs-built_in">module&lt;/span>, &lt;span class="hljs-built_in">module&lt;/span>.exports, __webpack_require__);
        &lt;span class="hljs-comment">// Flag the module as loaded&lt;/span>
        &lt;span class="hljs-built_in">module&lt;/span>.l = &lt;span class="hljs-literal">true&lt;/span>;
        &lt;span class="hljs-comment">// Return the exports of the module&lt;/span>
        &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-built_in">module&lt;/span>.exports;
    }
    &lt;span class="hljs-comment">// This file contains only the entry chunk.&lt;/span>
  &lt;span class="hljs-comment">// The chunk loading function for additional chunks&lt;/span>
  &lt;span class="hljs-comment">/**
   *用于加载被分割出去的需要异步加载的chunk对应的文件
   * @param chunkId 需要异步加载的chunk对应的id
   *@returns {Promise}
   */&lt;/span>
    __webpack_require__.e = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">requireEnsure&lt;/span>(&lt;span class="hljs-params">chunkId&lt;/span>) &lt;/span>{
      &lt;span class="hljs-keyword">var&lt;/span> installedChunkData = installedChunks[chunkId];
      &lt;span class="hljs-keyword">if&lt;/span>(installedChunkData === &lt;span class="hljs-number">0&lt;/span>) {
        &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">resolve&lt;/span>) &lt;/span>{ resolve(); });
      }
      &lt;span class="hljs-comment">// a Promise means "currently loading".&lt;/span>
      &lt;span class="hljs-keyword">if&lt;/span>(installedChunkData) {
        &lt;span class="hljs-keyword">return&lt;/span> installedChunkData[&lt;span class="hljs-number">2&lt;/span>];
      }
      &lt;span class="hljs-comment">// setup Promise in chunk cache&lt;/span>
      &lt;span class="hljs-keyword">var&lt;/span> promise = &lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Promise&lt;/span>(&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">resolve, reject&lt;/span>) &lt;/span>{
        installedChunkData = installedChunks[chunkId] = [resolve, reject];
      });
      installedChunkData[&lt;span class="hljs-number">2&lt;/span>] = promise;
      &lt;span class="hljs-comment">// start chunk loading&lt;/span>
      &lt;span class="hljs-keyword">var&lt;/span> head = &lt;span class="hljs-built_in">document&lt;/span>.getElementsByTagName[&lt;span class="hljs-string">'head'&lt;/span>](&lt;span class="hljs-number">0&lt;/span>);
      &lt;span class="hljs-keyword">var&lt;/span> script = &lt;span class="hljs-built_in">document&lt;/span>.createElement(&lt;span class="hljs-string">'script'&lt;/span>);
      script.type = &lt;span class="hljs-string">"text/javascript"&lt;/span>;
      script.charset = &lt;span class="hljs-string">'utf-8'&lt;/span>;
      script.async = &lt;span class="hljs-literal">true&lt;/span>;
      script.timeout = &lt;span class="hljs-number">120000&lt;/span>;
      &lt;span class="hljs-keyword">if&lt;/span> (__webpack_require__.nc) {
        script.setAttribute(&lt;span class="hljs-string">"nonce"&lt;/span>, __webpack_require__.nc);
      }
      script.src = __webpack_require__.p + &lt;span class="hljs-string">""&lt;/span> + chunkId + &lt;span class="hljs-string">".bundle.js"&lt;/span>;
      &lt;span class="hljs-keyword">var&lt;/span> timeout = setTimeout(onScriptComplete, &lt;span class="hljs-number">120000&lt;/span>);
      script.onerror = script.onload = onScriptComplete;
      &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">onScriptComplete&lt;/span>() &lt;/span>{
        &lt;span class="hljs-comment">// avoid mem leaks in IE.&lt;/span>
        script.onerror = script.onload = &lt;span class="hljs-literal">null&lt;/span>;
        clearTimeout(timeout);
        &lt;span class="hljs-keyword">var&lt;/span> chunk = installedChunks[chunkId];
        &lt;span class="hljs-keyword">if&lt;/span>(chunk !== &lt;span class="hljs-number">0&lt;/span>) {
          &lt;span class="hljs-keyword">if&lt;/span>(chunk) {
            chunk[&lt;span class="hljs-number">1&lt;/span>](&lt;span class="hljs-keyword">new&lt;/span> &lt;span class="hljs-built_in">Error&lt;/span>(&lt;span class="hljs-string">'Loading chunk '&lt;/span> + chunkId + &lt;span class="hljs-string">' failed.'&lt;/span>));
          }
          installedChunks[chunkId] = &lt;span class="hljs-literal">undefined&lt;/span>;
        }
      };
      head.appendChild(script);
      &lt;span class="hljs-keyword">return&lt;/span> promise;
    };
    &lt;span class="hljs-comment">// expose the modules object (__webpack_modules__)&lt;/span>
    __webpack_require__.m = modules;
    &lt;span class="hljs-comment">// expose the module cache&lt;/span>
    __webpack_require__.c = installedModules;
    &lt;span class="hljs-comment">// define getter function for harmony exports&lt;/span>
    __webpack_require__.d = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">exports, name, getter&lt;/span>) &lt;/span>{
        &lt;span class="hljs-keyword">if&lt;/span>(!__webpack_require__.o(exports, name)) {
            &lt;span class="hljs-built_in">Object&lt;/span>.defineProperty(exports, name, {
                &lt;span class="hljs-attr">configurable&lt;/span>: &lt;span class="hljs-literal">false&lt;/span>,
                &lt;span class="hljs-attr">enumerable&lt;/span>: &lt;span class="hljs-literal">true&lt;/span>,
                &lt;span class="hljs-attr">get&lt;/span>: getter
            });
        }
    };
    &lt;span class="hljs-comment">// getDefaultExport function for compatibility with non-harmony modules&lt;/span>
    __webpack_require__.n = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">module&lt;/span>) &lt;/span>{
        &lt;span class="hljs-keyword">var&lt;/span> getter = &lt;span class="hljs-built_in">module&lt;/span> && &lt;span class="hljs-built_in">module&lt;/span>.__esModule ?
            &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getDefault&lt;/span>() &lt;/span>{ &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-built_in">module&lt;/span>[&lt;span class="hljs-string">'default'&lt;/span>]; } :
            &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> &lt;span class="hljs-title">getModuleExports&lt;/span>() &lt;/span>{ &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-built_in">module&lt;/span>; };
        __webpack_require__.d(getter, &lt;span class="hljs-string">'a'&lt;/span>, getter);
        &lt;span class="hljs-keyword">return&lt;/span> getter;
    };
    &lt;span class="hljs-comment">// Object.prototype.hasOwnProperty.call&lt;/span>
    __webpack_require__.o = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">object, property&lt;/span>) &lt;/span>{ &lt;span class="hljs-keyword">return&lt;/span> &lt;span class="hljs-built_in">Object&lt;/span>.prototype.hasOwnProperty.call(object, property); };
&lt;span class="hljs-comment">//__webpack_public_path__&lt;/span>
    __webpack_require__.p = &lt;span class="hljs-string">""&lt;/span>;
    &lt;span class="hljs-comment">// on error function for async loading&lt;/span>
    __webpack_require__.oe = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">err&lt;/span>) &lt;/span>{ &lt;span class="hljs-built_in">console&lt;/span>.error(err); &lt;span class="hljs-keyword">throw&lt;/span> err; };
    &lt;span class="hljs-comment">// Load entry module and return exports&lt;/span>
&lt;span class="hljs-keyword">return&lt;/span>__webpack_require__(__webpack_require__.s = &lt;span class="hljs-number">0&lt;/span>);
})
&lt;span class="hljs-comment">/************************************************************************/&lt;/span>
([&lt;span class="hljs-comment">//存放没有经过异步加载的，随着执行入口文件加载的模块&lt;/span>
&lt;span class="hljs-comment">/* 0 */&lt;/span>
&lt;span class="hljs-comment">/***/&lt;/span> (&lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>(&lt;span class="hljs-params">module, exports,__webpack_require__&lt;/span>) &lt;/span>{

__webpack_require__.e&lt;span class="hljs-comment">/*import()*/&lt;/span>(&lt;span class="hljs-number">0&lt;/span>).then(__webpack_require__.bind(&lt;span class="hljs-literal">null&lt;/span>, &lt;span class="hljs-number">1&lt;/span>)).then(&lt;span class="hljs-function">&lt;span class="hljs-params">show&lt;/span>=&gt;&lt;/span>{
    show(&lt;span class="hljs-string">'Webpack'&lt;/span>)
})

&lt;span class="hljs-comment">/***/&lt;/span> })
]);</code></pre>
</div>
