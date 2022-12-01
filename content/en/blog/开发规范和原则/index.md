---
title: 开发规范和原则
weight: 50
images: ["R-C.jpeg"]
categories: ["工作"]
tags: []
contributors: ["万维刀客"]
pinned: false
homepage: false
---
<h1 id="VofzX" data-lake-id="ba27442ea36c9b4d8519734df1da57b7_h1_0" data-wording="true">
  编码规范
</h1>

<p data-lake-id="3a842bea5dfe7d70d5c06863db7a66e0_p_0" data-wording="true">
  参考业界编码规范：
</p>

<ol start="1" data-lake-id="5c2c46997faa22de2fff4bdabca3edbe_ol_0">
  <li data-lake-id="6d323c327d9fd04af4d282dfe0a2d459_li_0" data-wording="true">
    <a href="https://codeguide.co/#html" target="_blank" rel="noopener noreferrer">HTML规范</a>
  </li>
  <li data-lake-id="56ed110748ad0f1f7d6bfe313cc9a81d_li_1" data-wording="true">
    <a href="https://f2e.alibaba-inc.com/markdown?spm=a2o8t.11089562.0.0.3e7e66543AXvOr&lark=fliggy%2Ffespec%2F6002" target="_blank" rel="noopener noreferrer">Airbnb JS规范</a>
  </li>
  <li data-lake-id="b5eea8733c7de4c1ebcb85852e2063ad_li_2" data-wording="true">
    <a href="https://codeguide.co/#css" target="_blank" rel="noopener noreferrer">CSS规范</a>
  </li>
  <li>
    <a href="https://github.com/airbnb/javascript/master/react">Airbnb React规范</a>
  </li>
</ol>

<p data-lake-id="df020152aee8a05a0fc7c7b685e06251_p_2" data-wording="true">
  目前[前端](https://www.w3cdoc.com)项目ESLINT配置：
</p>

<div id="wJRum" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22json%22%2C%22code%22%3A%22%7B%5Cn%20%20%5C%22root%5C%22%3A%20true%2C%5Cn%20%20%5C%22parser%5C%22%3A%20%5C%22babel-eslint%5C%22%2C%5Cn%20%20%5C%22extends%5C%22%3A%20%5C%22eslint-config-airbnb%5C%22%2C%5Cn%20%20%5C%22parserOptions%5C%22%3A%20%7B%5Cn%20%20%20%20%5C%22ecmaVersion%5C%22%3A%206%2C%5Cn%20%20%20%20%5C%22ecmaFeatures%5C%22%3A%20%7B%5Cn%20%20%20%20%20%20%5C%22jsx%5C%22%3A%20true%2C%5Cn%20%20%20%20%20%20%5C%22experimentalObjectRestSpread%5C%22%3A%20true%5Cn%20%20%20%20%7D%5Cn%20%20%7D%2C%5Cn%20%20%5C%22env%5C%22%3A%20%7B%5Cn%20%20%20%20%5C%22browser%5C%22%3A%20true%2C%5Cn%20%20%20%20%5C%22mocha%5C%22%3A%20true%5Cn%20%20%7D%2C%5Cn%20%20%5C%22plugins%5C%22%3A%20%5B%5Cn%20%20%20%20%5C%22react%5C%22%2C%5Cn%20%20%20%20%5C%22babel%5C%22%5Cn%20%20%5D%2C%5Cn%20%20%5C%22rules%5C%22%3A%20%7B%5Cn%20%20%20%20%5C%22react%2Fprefer-stateless-function%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-console%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-use-before-define%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22jsx-a11y%2Flabel-has-for%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22jsx-a11y%2Fno-static-element-interactions%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22jsx-a11y%2Fanchor-has-content%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22jsx-a11y%2Fclick-events-have-key-events%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22jsx-a11y%2Fanchor-is-valid%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fno-array-index-key%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22func-names%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22arrow-body-style%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fsort-comp%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fprop-types%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fjsx-first-prop-new-line%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fjsx-filename-extension%5C%22%3A%20%5B%5Cn%20%20%20%20%20%201%2C%5Cn%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20%5C%22extensions%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%20%20%20%20%5C%22.js%5C%22%2C%5Cn%20%20%20%20%20%20%20%20%20%20%5C%22.jsx%5C%22%5Cn%20%20%20%20%20%20%20%20%5D%5Cn%20%20%20%20%20%20%7D%5Cn%20%20%20%20%5D%2C%5Cn%20%20%20%20%5C%22import%2Fextensions%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22import%2Fno-unresolved%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22import%2Fno-extraneous-dependencies%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22prefer-destructuring%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-param-reassign%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-return-assign%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22max-len%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22consistent-return%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-redeclare%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Frequire-extension%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22react%2Fno-danger%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22comma-dangle%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%5C%22error%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22always-multiline%5C%22%5Cn%20%20%20%20%5D%2C%5Cn%20%20%20%20%5C%22function-paren-newline%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22object-curly-newline%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22no-restricted-globals%5C%22%3A%200%2C%5Cn%20%20%20%20%5C%22linebreak-style%5C%22%3A%20%5B%5Cn%20%20%20%20%20%20%5C%22error%5C%22%2C%5Cn%20%20%20%20%20%20%5C%22unix%5C%22%5Cn%20%20%20%20%5D%2C%5Cn%20%20%20%20%5C%22no-restricted-syntax%5C%22%3A%200%5Cn%20%20%7D%5Cn%7D%22%2C%22id%22%3A%22wJRum%22%2C%22height%22%3A298.764%7D" data-language="json">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content">{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-string cm-property">"root"</span>: <span class="cm-atom">true</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-string cm-property">"parser"</span>: <span class="cm-string">"babel-eslint"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-string cm-property">"extends"</span>: <span class="cm-string">"eslint-config-airbnb"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-string cm-property">"parserOptions"</span>: {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"ecmaVersion"</span>: <span class="cm-number">6</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"ecmaFeatures"</span>: {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-string cm-property">"jsx"</span>: <span class="cm-atom">true</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-string cm-property">"experimentalObjectRestSpread"</span>: <span class="cm-atom">true</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    }
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  },
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-string cm-property">"env"</span>: {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"browser"</span>: <span class="cm-atom">true</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"mocha"</span>: <span class="cm-atom">true</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  },
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-string cm-property">"plugins"</span>: [
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string">"react"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string">"babel"</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  ],
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-string cm-property">"rules"</span>: {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"react/prefer-stateless-function"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"no-console"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"no-use-before-define"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"jsx-a11y/label-has-for"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"jsx-a11y/no-static-element-interactions"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"jsx-a11y/anchor-has-content"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"jsx-a11y/click-events-have-key-events"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"jsx-a11y/anchor-is-valid"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"react/no-array-index-key"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"func-names"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"arrow-body-style"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"react/sort-comp"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"react/prop-types"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"react/jsx-first-prop-new-line"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"react/jsx-filename-extension"</span>: [
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-number">1</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">        <span class="cm-string cm-property">"extensions"</span>: [
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">          <span class="cm-string">".js"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">          <span class="cm-string">".jsx"</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">        ]
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      }
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    ],
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"import/extensions"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"import/no-unresolved"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"import/no-extraneous-dependencies"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"prefer-destructuring"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"no-param-reassign"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"no-return-assign"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"max-len"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"consistent-return"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"no-redeclare"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"react/require-extension"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"react/no-danger"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"comma-dangle"</span>: [
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-string">"error"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-string">"always-multiline"</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    ],
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"function-paren-newline"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"object-curly-newline"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"no-restricted-globals"</span>: <span class="cm-number"></span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"linebreak-style"</span>: [
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-string">"error"</span>,
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-string">"unix"</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    ],
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-string cm-property">"no-restricted-syntax"</span>: <span class="cm-number"></span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  }
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}</span></span></pre>
    </div>
  </div>
</div>

<h1 id="U8iwq" data-lake-id="c141ff99e17ac1e59520e8ea891bda12_h1_1" data-wording="true">
  编码原则
</h1>

<p data-lake-id="2e1d2be5c1d8b1e8d1759eb4c1e334f1_p_4" data-wording="true">
  <strong>对于B类业务，写代码第一目标是稳定性，第二目标是可读性，第三目标是性能。</strong>
</p>

<p data-lake-id="504c3aef9748a283fae1e200fbc59ec0_p_5" data-wording="true">
  C类业务，性能可以排在第二，但B类业务应该排在第三。主要考虑是，B类业务逻辑复杂，代码体量大，代码的可读性是保证开发效率和后续持续维护过程中系统稳定性的生命线。所以，在没有性能问题时，不要为了优化性能而牺牲代码可读性。
</p>

<p data-lake-id="f80b0b4f3d2304988cbb435c926f5ffc_p_6" data-wording="true">
  以下所有模式和原则目标都是提高代码的可读性、可维护性。
</p>

<h2 id="zmCaP" data-lake-id="3e9b8402949a9e9caa3eeca696313fec_h2_0" data-wording="true">
  开发原则
</h2>

<p data-lake-id="a6c74fcfc33a0c619f6a88e87468db4b_p_8" data-wording="true">
  以下是面向对象设计的原则，react hooks更多的是函数式编程，参考下面函数式编程实践
</p>

<p data-lake-id="e1ae29934df7312c907c55ba6c6bd381_p_9" data-wording="true">
  1. 单一职责（SRP）
</p>

<p data-lake-id="3fc91de90796adbc6db5deff68de9892_p_10" data-wording="true">
  2. 开放—封闭原则（OCP）
</p>

<p data-lake-id="7fc7c48514727e59b44f2aa1ad9136a5_p_11" data-wording="true">
  3. Liskov替换原则（LSP）
</p>

<p data-lake-id="b2d13d99fe7c3c18aa961a3cee236f3b_p_12" data-wording="true">
  4. 依赖倒置原则（DIP）
</p>

<p data-lake-id="e1d6e78c5c842fd5db3ccb8238755c1d_p_13" data-wording="true">
  5. 接口隔离原则（ISP）
</p>

<p data-lake-id="e1d6e78c5c842fd5db3ccb8238755c1d_p_13">
  6. 合成复用原则
</p>

<p data-lake-id="e1d6e78c5c842fd5db3ccb8238755c1d_p_13">
  7. 迪米特最少知识原则
</p>

<h1 id="6yXhB" data-lake-id="94f669e4f907c7e307a7b8f5b72591fd_h1_2" data-wording="true">
  函数式编程最佳实践
</h1>

<p data-lake-id="170ec9dc3a3d47c43fc1da398cb5b437_p_15" data-wording="true">
  业务开发推荐使用React Hooks编写组件，补充函数式编程最佳实践
</p>

<h2 id="Lcq0z" data-lake-id="68f501de2bf9b304d9d75c44c3e6d574_h2_1" data-wording="true">
  原则
</h2>

<ul data-lake-id="75fda4abbacd90fd54d8d616acb66c56_ul_0">
  <li data-lake-id="2d0517b3ff033bf70eb212de587e7e92_li_4" data-wording="true">
    数据出入原则
  </li>
</ul>

<p data-lake-id="757f11a1f02e4de61a19185e8e70c4d0_p_17" data-wording="true">
  一个函数，只要拥有入参，必然要有返回
</p>

<ul data-lake-id="0425839751f0b3c037a91a129ecd91dc_ul_1">
  <li data-lake-id="c4cf1d01f96ba3dd854ff88b855e9c94_li_5" data-wording="true">
    无状态原则
  </li>
</ul>

<p data-lake-id="f9a07755283d3a7eda6f87440ce1f102_p_19" data-wording="true">
  一个函数，对外依赖，只能通过参数的形式依赖，不能直接依赖全局变量，同时，参数一定是immutable数据，函数体内不能对参数做引用操作
</p>

<ul data-lake-id="9637b0be456ea6c712adaeeaaacad4ba_ul_2">
  <li data-lake-id="19f733a658d812c2b18572b32c974ded_li_6" data-wording="true">
    不可变原则
  </li>
</ul>

<p data-lake-id="98498bee5f8a7c6d23686af098f68671_p_21" data-wording="true">
  一个函数，不管是参数，还是其返回的数据类型，都不应该是可变数据，因为在js中是不存在原生的immutable的数据结构的，所以，[我们](https://www.w3cdoc.com)只要保证模块函数返回的数据每次都是一个新引用，而不是持续操作同一个数据引用。比如：
</p>

<div id="6781d28a" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%226781d28a%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22const%20func%20%3D%20(obj)%3D%3E%7B%5Cn%20%20%20return%20%7B...obj%7D%5Cn%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">func</span> <span class="cm-operator">=</span> (<span class="cm-def">obj</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">return</span> {<span class="cm-meta">...</span><span class="cm-variable-2">obj</span>}
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}</span></span></pre>
    </div>
  </div>
</div>

<ul data-lake-id="e11f5f018f7b5a39006aa9336d58d09c_ul_3">
  <li data-lake-id="a1d68f6cd04df218edc3834660740d99_li_7" data-wording="true">
    最小粒度原则
  </li>
</ul>

<p data-lake-id="8e33e5779392f743716463fd2ee28d3e_p_23" data-wording="true">
  函数与功能的对应关系是完全一对一关系，禁止一个函数存在多个功能(以数学思路来说，就是写一系列的小型公式集合)
</p>

<ul data-lake-id="367ec5e14e520e3e62ee509deefea06e_ul_4">
  <li data-lake-id="636b444b9f984362bbf8d70b3851eaa2_li_8" data-wording="true">
    函数组合原则
  </li>
</ul>

<p data-lake-id="03b8a78411985552bf48c235c90c2eb1_p_25" data-wording="true">
  在最小粒度原则的前提下，需要借助函数组合原则构建出一个最终大函数(或者说是一个大公式)
</p>

<h2 id="kkc4e" data-lake-id="aed10e42caab95c8cea1ceda90f0f592_h2_2" data-wording="true">
  最佳实践
</h2>

<ul data-lake-id="4cafa82c022ff423e39895c773865ef7_ul_5">
  <li data-lake-id="3d5b73110e3a4a19b6ce4e0bc3d81ac4_li_9" data-wording="true">
    避免使用javascript中的命令式语法(if/for/switch)
  </li>
</ul>

<p data-lake-id="c0428c65bbf7ae6ced1ceba9964c914d_p_28" data-wording="true">
  尽量使用封装好的函数库或者ES6/7原生可用函数API，比如map/reduce/some/every等等，但是，如果是遍历操作，推荐用reduce，因为借助reduce，可以在一次循环里做很多事情，性能可以提升很大，比如：
</p>

<div id="e03169ec" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%22e03169ec%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20bad%5Cnconst%20result%20%3D%20arr.map((item)%3D%3E%7B%5Cn%20%20return%20item.age%5Cn%7D).filter(item%3D%3Eitem%20%3E%2018)%5Cn%5Cn%2F%2F%20good%5Cnconst%20result%20%3D%20arr.reduce((buf%2Citem)%3D%3E%7B%5Cn%20%20%20return%20item.age%20%3E%2018%20%3F%20buf.concat(item.age)%20%3A%20buf%5Cn%7D%2C%5B%5D)%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// bad</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">result</span> <span class="cm-operator">=</span> <span class="cm-variable">arr</span>.<span class="cm-property">map</span>((<span class="cm-def">item</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-keyword">return</span> <span class="cm-variable-2">item</span>.<span class="cm-property">age</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}).<span class="cm-property">filter</span>(<span class="cm-def">item</span><span class="cm-operator">=&gt;</span><span class="cm-variable-2">item</span> <span class="cm-operator">&gt;</span> <span class="cm-number">18</span>)
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// good</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">result</span> <span class="cm-operator">=</span> <span class="cm-variable">arr</span>.<span class="cm-property">reduce</span>((<span class="cm-def">buf</span>,<span class="cm-def">item</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">return</span> <span class="cm-variable-2">item</span>.<span class="cm-property">age</span> <span class="cm-operator">&gt;</span> <span class="cm-number">18</span> <span class="cm-operator">?</span> <span class="cm-variable-2">buf</span>.<span class="cm-property">concat</span>(<span class="cm-variable-2">item</span>.<span class="cm-property">age</span>) : <span class="cm-variable-2">buf</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">},[])</span></span></pre>
    </div>
  </div>
</div>

<ul data-lake-id="36bb69af098ddf66ba915187b0e9b71e_ul_6">
  <li data-lake-id="c192fd394f55714ae9f7019d9f4438c2_li_10" data-wording="true">
    借助Promise链降低异步操作副作用
  </li>
</ul>

<p data-lake-id="e77af12e0b62a4d0a9b9a5714167debb_p_31" data-wording="true">
  如果一个数据处理流有可能存在异步操作(与异步请求相关，或者与异步交互相关)，那这个函数的返回值推荐返回Promise对象
</p>

<ul data-lake-id="79afe9471c2bd6b0f70a6c2dc4d7c283_ul_7">
  <li data-lake-id="b87fddd01f7b93e755de091b15206a03_li_11" data-wording="true">
    参数函数化
  </li>
</ul>

<p data-lake-id="b275f07d8627c66e34fa8e8479c012f9_p_33" data-wording="true">
  基于最小粒度原则与函数组合原则，如果要增强函数的能力，[我们](https://www.w3cdoc.com)是不可能在一个函数内部直接扩展它的功能，那样会造成函数越来越臃肿，所以，借助参数函数化，[我们](https://www.w3cdoc.com)可以轻松的把功能扩展解耦出去
</p>

<div id="7e320a07" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%227e320a07%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20bad%5Cnconst%20handler%20%3D%20(data%2Coptions)%3D%3E%7B%5Cn%20%20%20....default%20handler%5Cn%20%20%20if(options.ext1)%7B%5Cn%20%20%20%20%20%20....%20extension%201%20handler%5Cn%20%20%20%7D%5Cn%20%20%20%5Cn%20%20%20if(options.ext2)%7B%5Cn%20%20%20%20%20%20....%20extension%202%20handler%5Cn%20%20%20%7D%5Cn%7D%5Cn%5Cn%2F%2F%20good%5Cnconst%20handler%20%3D%20(data%2Cfunc)%3D%3E%7B%5Cn%20%20%20....default%20handler%5Cn%20%20%20if(isFn(func))%7B%5Cn%20%20%20%20%20%20....%20func(data)%5Cn%20%20%20%7D%5Cn%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// bad</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">handler</span> <span class="cm-operator">=</span> (<span class="cm-def">data</span>,<span class="cm-def">options</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-meta">...</span>.<span class="cm-variable">default</span> <span class="cm-variable">handler</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">if</span>(<span class="cm-variable-2">options</span>.<span class="cm-property">ext1</span>){
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-meta">...</span>. <span class="cm-variable">extension</span> <span class="cm-number">1</span> <span class="cm-variable">handler</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   }
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">if</span>(<span class="cm-variable-2">options</span>.<span class="cm-property">ext2</span>){
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-meta">...</span>. <span class="cm-variable">extension</span> <span class="cm-number">2</span> <span class="cm-variable">handler</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   }
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// good</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">handler</span> <span class="cm-operator">=</span> (<span class="cm-def">data</span>,<span class="cm-def">func</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-meta">...</span>.<span class="cm-variable">default</span> <span class="cm-variable">handler</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">if</span>(<span class="cm-variable">isFn</span>(<span class="cm-variable-2">func</span>)){
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-meta">...</span>. <span class="cm-variable-2">func</span>(<span class="cm-variable-2">data</span>)
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   }
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}</span></span></pre>
    </div>
  </div>
</div>

<ul data-lake-id="15addfea00eed94d5b0da18c8c058a5a_ul_8">
  <li data-lake-id="47137a0885d38da09670b407e6faf4e8_li_12" data-wording="true">
    返回函数化(科里化)
  </li>
</ul>

<p data-lake-id="0376d67556d034e4b2fa4d4871689b7c_p_36" data-wording="true">
  之前常说的科里化，其实就是函数返回值也是一个函数，这样所带来的好处是一个函数生产出一系列更加富有语义性，调用更加方便的函数集合，同时，它还可以用于减少参数数量。比如类型判断：
</p>

<div id="a4a06213" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%22a4a06213%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%E8%BF%87%E5%8E%BB%5Cnconst%20isType%20%3D%20(value%2Ctype)%3D%3E%7B%5Cn%20%20%20return%20value%20!%3D%20null%20%26%26%20Object.prototype.toString.call(value)%20%3D%3D%3D%20%60%5Bobject%20%24%7Btype%7D%5D%60%5Cn%7D%5Cn%2F%2F%E4%BD%BF%E7%94%A8%E7%9A%84%E6%97%B6%E5%80%99%E5%BE%88%E9%BA%BB%E7%83%A6%EF%BC%8C%E6%AF%8F%E6%AC%A1%E9%83%BD%E9%9C%80%E8%A6%81%E4%BC%A0%E4%B8%A4%E4%B8%AA%E5%8F%82%E6%95%B0%5Cnif(isType(%7B%7D%2C%5C%22Array%5C%22))%7B....%7D%5Cn%5Cn%2F%2F%E7%8E%B0%E5%9C%A8%5Cnconst%20isType%20%3D%20type%20%3D%3E%20obj%20%3D%3E%5Cn%20%20%20%20obj%20!%3D%20null%20%26%26%20Object.prototype.toString.call(obj)%20%3D%3D%3D%20%60%5Bobject%20%24%7Btype%7D%5D%60%5Cnconst%20isFn%20%3D%20isType(%5C%22Function%5C%22)%5Cnconst%20isArr%20%3D%20isType('Array')%5Cn%5Cnif(isFn(%7B%7D))%7B...%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">//过去</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">isType</span> <span class="cm-operator">=</span> (<span class="cm-def">value</span>,<span class="cm-def">type</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">return</span> <span class="cm-variable-2">value</span> <span class="cm-operator">!=</span> <span class="cm-atom">null</span> <span class="cm-operator">&</span><span class="cm-operator">&</span> <span class="cm-variable">Object</span>.<span class="cm-property">prototype</span>.<span class="cm-property">toString</span>.<span class="cm-property">call</span>(<span class="cm-variable-2">value</span>) <span class="cm-operator">===</span> <span class="cm-string-2">`[object ${</span><span class="cm-variable-2">type</span><span class="cm-string-2">}</span><span class="cm-string-2">]`</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">//使用的时候很麻烦，每次都需要传两个参数</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">if</span>(<span class="cm-variable">isType</span>({},<span class="cm-string">"Array"</span>)){<span class="cm-meta">...</span>.}
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">//现在</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">isType</span> <span class="cm-operator">=</span> <span class="cm-def">type</span> <span class="cm-operator">=&gt;</span> <span class="cm-def">obj</span> <span class="cm-operator">=&gt;</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-variable-2">obj</span> <span class="cm-operator">!=</span> <span class="cm-atom">null</span> <span class="cm-operator">&</span><span class="cm-operator">&</span> <span class="cm-variable">Object</span>.<span class="cm-property">prototype</span>.<span class="cm-property">toString</span>.<span class="cm-property">call</span>(<span class="cm-variable-2">obj</span>) <span class="cm-operator">===</span> <span class="cm-string-2">`[object ${</span><span class="cm-variable-2">type</span><span class="cm-string-2">}</span><span class="cm-string-2">]`</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">isFn</span> <span class="cm-operator">=</span> <span class="cm-variable">isType</span>(<span class="cm-string">"Function"</span>)
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">isArr</span> <span class="cm-operator">=</span> <span class="cm-variable">isType</span>(<span class="cm-string">'Array'</span>)
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">if</span>(<span class="cm-variable">isFn</span>({})){<span class="cm-meta">...</span>}</span></span></pre>
    </div>
  </div>
</div>

<h2 id="XaGbk" data-lake-id="b9de6612e91ccd02347ab4bd13ff80ba_h2_3" data-wording="true">
  Style规范
</h2>

<p data-lake-id="826571d9c6aaf4ffc3973cdd2587953f_p_39" data-wording="true">
  命名小写字母加连字符，嵌套选择器的深度不超过 3 层
</p>

<div id="YS8w1" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22mode%22%3A%22css%22%2C%22code%22%3A%22%2F*%20bad%20*%2F%5Cn.mod_example%20%7B%5Cn%20%20padding-left%3A%2015px%3B%5Cn%7D%5Cn.modExample%20%7B%5Cn%20%20padding-left%3A%2015px%3B%5Cn%7D%5Cn%5Cn%2F*%20good%20*%2F%5Cn.mod-example%20%7B%5Cn%20%20padding-left%3A%2015px%3B%5Cn%7D%22%2C%22id%22%3A%22YS8w1%22%7D" data-language="css">
  <div class="lake-codeblock-content">
    <div class="CodeMirror-sizer">
      <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">/*bad*/</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-qualifier">.mod_example</span> {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-property">padding-left</span>: <span class="cm-number">15px</span>;
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-qualifier">.modExample</span> {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-property">padding-left</span>: <span class="cm-number">15px</span>;
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">/*good*/</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-qualifier">.mod-example</span> {
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-property">padding-left</span>: <span class="cm-number">15px</span>;
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}</span></span></pre>
    </div>
  </div>
</div>

<h2 id="zmCaP" data-lake-id="3e9b8402949a9e9caa3eeca696313fec_h2_0">
  开发原则
</h2>

<p data-lake-id="a6c74fcfc33a0c619f6a88e87468db4b_p_8">
  在软件开发中，为了提高软件系统的可维护性和可复用性，增加软件的可扩展性和灵活性，程序员要尽量根据 7 条原则来开发程序，从而提高软件开发效率、节约软件开发成本和维护成本。<br /> 以下是面向对象设计的原则，react hooks更多的是函数式编程，参考下面函数式编程实践
</p>

<p data-lake-id="e1ae29934df7312c907c55ba6c6bd381_p_9">
  1. 单一职责（SRP）
</p>

<p data-lake-id="3fc91de90796adbc6db5deff68de9892_p_10">
  2. 开放—封闭原则（OCP）
</p>

<p data-lake-id="7fc7c48514727e59b44f2aa1ad9136a5_p_11">
  3. Liskov替换原则（LSP）
</p>

<p data-lake-id="b2d13d99fe7c3c18aa961a3cee236f3b_p_12">
  4. 依赖倒置原则（DIP）
</p>

<p data-lake-id="e1d6e78c5c842fd5db3ccb8238755c1d_p_13">
  5. 接口隔离原则（ISP）
</p>

<p data-lake-id="e1d6e78c5c842fd5db3ccb8238755c1d_p_13">
  6. 合成复用原则
</p>

<p data-lake-id="e1d6e78c5c842fd5db3ccb8238755c1d_p_13">
  7. 迪米特最少知识原则
</p>

<h1 id="6yXhB" data-lake-id="94f669e4f907c7e307a7b8f5b72591fd_h1_2">
  函数式编程最佳实践
</h1>

<p data-lake-id="170ec9dc3a3d47c43fc1da398cb5b437_p_15">
  业务开发推荐使用React Hooks编写组件，补充函数式编程最佳实践
</p>

<h2 id="Lcq0z" data-lake-id="68f501de2bf9b304d9d75c44c3e6d574_h2_1">
  原则
</h2>

<li data-lake-id="2d0517b3ff033bf70eb212de587e7e92_li_4">
  数据出入原则
</li>

<p data-lake-id="757f11a1f02e4de61a19185e8e70c4d0_p_17">
  一个函数，只要拥有入参，必然要有返回
</p>

<li data-lake-id="c4cf1d01f96ba3dd854ff88b855e9c94_li_5">
  无状态原则
</li>

<p data-lake-id="f9a07755283d3a7eda6f87440ce1f102_p_19">
  一个函数，对外依赖，只能通过参数的形式依赖，不能直接依赖全局变量，同时，参数一定是immutable数据，函数体内不能对参数做引用操作
</p>

<li data-lake-id="19f733a658d812c2b18572b32c974ded_li_6">
  不可变原则
</li>

<p data-lake-id="98498bee5f8a7c6d23686af098f68671_p_21">
  一个函数，不管是参数，还是其返回的数据类型，都不应该是可变数据，因为在js中是不存在原生的immutable的数据结构的，所以，[我们](https://www.w3cdoc.com)只要保证模块函数返回的数据每次都是一个新引用，而不是持续操作同一个数据引用。比如：
</p>

<div id="6781d28a" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%226781d28a%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22const%20func%20%3D%20(obj)%3D%3E%7B%5Cn%20%20%20return%20%7B...obj%7D%5Cn%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="">
      <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">func</span> <span class="cm-operator">=</span> (<span class="cm-def">obj</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">return</span> {<span class="cm-meta">...</span><span class="cm-variable-2">obj</span>}
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}</span></span></pre>
    </div>
  </div>
</div>

<li data-lake-id="a1d68f6cd04df218edc3834660740d99_li_7">
  最小粒度原则
</li>

<p data-lake-id="8e33e5779392f743716463fd2ee28d3e_p_23">
  函数与功能的对应关系是完全一对一关系，禁止一个函数存在多个功能(以数学思路来说，就是写一系列的小型公式集合)
</p>

<li data-lake-id="636b444b9f984362bbf8d70b3851eaa2_li_8">
  函数组合原则
</li>

<p data-lake-id="03b8a78411985552bf48c235c90c2eb1_p_25">
  在最小粒度原则的前提下，需要借助函数组合原则构建出一个最终大函数(或者说是一个大公式)
</p>

<h2 id="kkc4e" data-lake-id="aed10e42caab95c8cea1ceda90f0f592_h2_2">
  最佳实践
</h2>

<li data-lake-id="3d5b73110e3a4a19b6ce4e0bc3d81ac4_li_9">
  避免使用javascript中的命令式语法(if/for/switch)
</li>

<p data-lake-id="c0428c65bbf7ae6ced1ceba9964c914d_p_28">
  尽量使用封装好的函数库或者ES6/7原生可用函数API，比如map/reduce/some/every等等，但是，如果是遍历操作，推荐用reduce，因为借助reduce，可以在一次循环里做很多事情，性能可以提升很大，比如：
</p>

<div id="e03169ec" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%22e03169ec%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20bad%5Cnconst%20result%20%3D%20arr.map((item)%3D%3E%7B%5Cn%20%20return%20item.age%5Cn%7D).filter(item%3D%3Eitem%20%3E%2018)%5Cn%5Cn%2F%2F%20good%5Cnconst%20result%20%3D%20arr.reduce((buf%2Citem)%3D%3E%7B%5Cn%20%20%20return%20item.age%20%3E%2018%20%3F%20buf.concat(item.age)%20%3A%20buf%5Cn%7D%2C%5B%5D)%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="">
      <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// bad</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">result</span> <span class="cm-operator">=</span> <span class="cm-variable">arr</span>.<span class="cm-property">map</span>((<span class="cm-def">item</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">  <span class="cm-keyword">return</span> <span class="cm-variable-2">item</span>.<span class="cm-property">age</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}).<span class="cm-property">filter</span>(<span class="cm-def">item</span><span class="cm-operator">=&gt;</span><span class="cm-variable-2">item</span> <span class="cm-operator">&gt;</span> <span class="cm-number">18</span>)
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// good</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">result</span> <span class="cm-operator">=</span> <span class="cm-variable">arr</span>.<span class="cm-property">reduce</span>((<span class="cm-def">buf</span>,<span class="cm-def">item</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">return</span> <span class="cm-variable-2">item</span>.<span class="cm-property">age</span> <span class="cm-operator">&gt;</span> <span class="cm-number">18</span> <span class="cm-operator">?</span> <span class="cm-variable-2">buf</span>.<span class="cm-property">concat</span>(<span class="cm-variable-2">item</span>.<span class="cm-property">age</span>) : <span class="cm-variable-2">buf</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">},[])</span></span></pre>
    </div>
  </div>
</div>

<li data-lake-id="c192fd394f55714ae9f7019d9f4438c2_li_10">
  借助Promise链降低异步操作副作用
</li>

<p data-lake-id="e77af12e0b62a4d0a9b9a5714167debb_p_31">
  如果一个数据处理流有可能存在异步操作(与异步请求相关，或者与异步交互相关)，那这个函数的返回值推荐返回Promise对象
</p>

<li data-lake-id="b87fddd01f7b93e755de091b15206a03_li_11">
  参数函数化
</li>

<p data-lake-id="b275f07d8627c66e34fa8e8479c012f9_p_33">
  基于最小粒度原则与函数组合原则，如果要增强函数的能力，[我们](https://www.w3cdoc.com)是不可能在一个函数内部直接扩展它的功能，那样会造成函数越来越臃肿，所以，借助参数函数化，[我们](https://www.w3cdoc.com)可以轻松的把功能扩展解耦出去
</p>

<div id="7e320a07" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%227e320a07%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%20bad%5Cnconst%20handler%20%3D%20(data%2Coptions)%3D%3E%7B%5Cn%20%20%20....default%20handler%5Cn%20%20%20if(options.ext1)%7B%5Cn%20%20%20%20%20%20....%20extension%201%20handler%5Cn%20%20%20%7D%5Cn%20%20%20%5Cn%20%20%20if(options.ext2)%7B%5Cn%20%20%20%20%20%20....%20extension%202%20handler%5Cn%20%20%20%7D%5Cn%7D%5Cn%5Cn%2F%2F%20good%5Cnconst%20handler%20%3D%20(data%2Cfunc)%3D%3E%7B%5Cn%20%20%20....default%20handler%5Cn%20%20%20if(isFn(func))%7B%5Cn%20%20%20%20%20%20....%20func(data)%5Cn%20%20%20%7D%5Cn%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="">
      <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// bad</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">handler</span> <span class="cm-operator">=</span> (<span class="cm-def">data</span>,<span class="cm-def">options</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-meta">...</span>.<span class="cm-variable">default</span> <span class="cm-variable">handler</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">if</span>(<span class="cm-variable-2">options</span>.<span class="cm-property">ext1</span>){
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-meta">...</span>. <span class="cm-variable">extension</span> <span class="cm-number">1</span> <span class="cm-variable">handler</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   }
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">if</span>(<span class="cm-variable-2">options</span>.<span class="cm-property">ext2</span>){
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-meta">...</span>. <span class="cm-variable">extension</span> <span class="cm-number">2</span> <span class="cm-variable">handler</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   }
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">// good</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">handler</span> <span class="cm-operator">=</span> (<span class="cm-def">data</span>,<span class="cm-def">func</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-meta">...</span>.<span class="cm-variable">default</span> <span class="cm-variable">handler</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">if</span>(<span class="cm-variable">isFn</span>(<span class="cm-variable-2">func</span>)){
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">      <span class="cm-meta">...</span>. <span class="cm-variable-2">func</span>(<span class="cm-variable-2">data</span>)
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   }
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}</span></span></pre>
    </div>
  </div>
</div>

<li data-lake-id="47137a0885d38da09670b407e6faf4e8_li_12">
  返回函数化(科里化)
</li>

<p data-lake-id="0376d67556d034e4b2fa4d4871689b7c_p_36">
  之前常说的科里化，其实就是函数返回值也是一个函数，这样所带来的好处是一个函数生产出一系列更加富有语义性，调用更加方便的函数集合，同时，它还可以用于减少参数数量。比如类型判断：
</p>

<div id="a4a06213" contenteditable="false" data-card-type="block" data-lake-card="codeblock" data-card-value="data:%7B%22id%22%3A%22a4a06213%22%2C%22mode%22%3A%22javascript%22%2C%22code%22%3A%22%2F%2F%E8%BF%87%E5%8E%BB%5Cnconst%20isType%20%3D%20(value%2Ctype)%3D%3E%7B%5Cn%20%20%20return%20value%20!%3D%20null%20%26%26%20Object.prototype.toString.call(value)%20%3D%3D%3D%20%60%5Bobject%20%24%7Btype%7D%5D%60%5Cn%7D%5Cn%2F%2F%E4%BD%BF%E7%94%A8%E7%9A%84%E6%97%B6%E5%80%99%E5%BE%88%E9%BA%BB%E7%83%A6%EF%BC%8C%E6%AF%8F%E6%AC%A1%E9%83%BD%E9%9C%80%E8%A6%81%E4%BC%A0%E4%B8%A4%E4%B8%AA%E5%8F%82%E6%95%B0%5Cnif(isType(%7B%7D%2C%5C%22Array%5C%22))%7B....%7D%5Cn%5Cn%2F%2F%E7%8E%B0%E5%9C%A8%5Cnconst%20isType%20%3D%20type%20%3D%3E%20obj%20%3D%3E%5Cn%20%20%20%20obj%20!%3D%20null%20%26%26%20Object.prototype.toString.call(obj)%20%3D%3D%3D%20%60%5Bobject%20%24%7Btype%7D%5D%60%5Cnconst%20isFn%20%3D%20isType(%5C%22Function%5C%22)%5Cnconst%20isArr%20%3D%20isType('Array')%5Cn%5Cnif(isFn(%7B%7D))%7B...%7D%22%7D" data-language="javascript">
  <div class="lake-codeblock-content">
    <div class="">
      <pre class="cm-s-default"><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">//过去</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">isType</span> <span class="cm-operator">=</span> (<span class="cm-def">value</span>,<span class="cm-def">type</span>)<span class="cm-operator">=&gt;</span>{
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">   <span class="cm-keyword">return</span> <span class="cm-variable-2">value</span> <span class="cm-operator">!=</span> <span class="cm-atom">null</span> <span class="cm-operator">&</span><span class="cm-operator">&</span> <span class="cm-variable">Object</span>.<span class="cm-property">prototype</span>.<span class="cm-property">toString</span>.<span class="cm-property">call</span>(<span class="cm-variable-2">value</span>) <span class="cm-operator">===</span> <span class="cm-string-2">`[object ${</span><span class="cm-variable-2">type</span><span class="cm-string-2">}</span><span class="cm-string-2">]`</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">}
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">//使用的时候很麻烦，每次都需要传两个参数</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">if</span>(<span class="cm-variable">isType</span>({},<span class="cm-string">"Array"</span>)){<span class="cm-meta">...</span>.}
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-comment">//现在</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">isType</span> <span class="cm-operator">=</span> <span class="cm-def">type</span> <span class="cm-operator">=&gt;</span> <span class="cm-def">obj</span> <span class="cm-operator">=&gt;</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content">    <span class="cm-variable-2">obj</span> <span class="cm-operator">!=</span> <span class="cm-atom">null</span> <span class="cm-operator">&</span><span class="cm-operator">&</span> <span class="cm-variable">Object</span>.<span class="cm-property">prototype</span>.<span class="cm-property">toString</span>.<span class="cm-property">call</span>(<span class="cm-variable-2">obj</span>) <span class="cm-operator">===</span> <span class="cm-string-2">`[object ${</span><span class="cm-variable-2">type</span><span class="cm-string-2">}</span><span class="cm-string-2">]`</span>
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">isFn</span> <span class="cm-operator">=</span> <span class="cm-variable">isType</span>(<span class="cm-string">"Function"</span>)
</span></span><span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">const</span> <span class="cm-def">isArr</span> <span class="cm-operator">=</span> <span class="cm-variable">isType</span>(<span class="cm-string">'Array'</span>)
</span></span>
<span class="lake-preview-line"><span class="lake-preview-codeblock-content"><span class="cm-keyword">if</span>(<span class="cm-variable">isFn</span>({})){<span class="cm-meta">...</span>}</span></span></pre>
    </div>
  </div>
</div>


## 参考资料 {#3a6e0aba}

* [Airbnb JavaScript Style Guide][2]

* [Google JavaScript Style Guide][3]

* [SonarJS rules][4]

<li data-spm-anchor-id="a2o8t.11089562.0.i0.37a766548wxvc9">
  <a href="https://eslint.org/docs/rules/">ESLint rules</a>
</li>
<li data-spm-anchor-id="a2o8t.11089562.0.i0.37a766548wxvc9">
  <a href="https://github.com/mdo/code-guide">mdo/code guide</a>
</li>
<li data-spm-anchor-id="a2o8t.11089562.0.i0.7f6c6654hQOFRR">
  <a href="https://github.com/airbnb/javascript/master/react">Airbnb JavaScript Style Guide &#8211; React</a>
</li>
