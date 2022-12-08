---
title: 基于config-component转向面向数据的编程




xzh_tui_back:
  - 成功
is_original:
  - 1

---
## 面向数据编程 {#articleHeader0}

### 面向数据编程是什么样的体验？ {#articleHeader1}

其实是数据驱动式编程更向前走一步，[我们](https://www.w3cdoc.com)知道现在MVVM框架，像React、vue、Angular这些给[前端](https://www.w3cdoc.com)带来了很大的进步，更优雅的工程化体系结构，更健壮的代码体系结构。同样给开发者带来了数据驱动式开发的体验，但是业务代码还是经常会出现业务逻辑与UI表达形式的穿插混合的情况，很难统一。

github： <a href="https://github.com/chalecao/config-component" target="_blank" rel="nofollow noopener noreferrer">https://github.com/chalecao/c&#8230;</a>  
感谢star！！！

### 样式行为分离 {#articleHeader2}

面向数据的编程其实核心思想还是做样式行为分离，中间的解耦利器便是数据。

> **样式 mix 行为 = 样式 + 数据 + 行为**

于是[我们](https://www.w3cdoc.com)抽象出来的**config-component**组件，作为驱动样式行为分离的通用组件，驱动面向数据编程。

例如实现下面的表单：


  <img loading="lazy" width="342" height="296" class="alignnone size-full wp-image-5002 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/09/img_5d7277e93dee3.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/09/img_5d7277e93dee3.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/09/img_5d7277e93dee3.png?x-oss-process=image/format,webp 342w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/09/img_5d7277e93dee3.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_260/format,webp 300w" sizes="(max-width: 342px) 100vw, 342px" />

基于antd组件库，比较下不同的代码结构：


  <img loading="lazy" width="1187" height="725" class="alignnone size-full wp-image-5003 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/09/img_5d727800b8252.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/09/img_5d727800b8252.png?x-oss-process=image/format,webp" alt="" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/09/img_5d727800b8252.png?x-oss-process=image/format,webp 1187w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/09/img_5d727800b8252.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_183/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/09/img_5d727800b8252.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_469/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/09/img_5d727800b8252.png?x-oss-process=image/quality,q_50/resize,m_fill,w_800,h_489/format,webp 800w" sizes="(max-width: 1187px) 100vw, 1187px" />

左边的图是基于ANTD正常的写法，[我们](https://www.w3cdoc.com)要写Form，要写检验规则，要写子组件等等，关键是这些逻辑是糅合在一起的。右边是基于config-component提供的ConfigForm组件做了封装，只需要提供JSON schema配置数据即可驱动你的页面，分离数据校验和UI逻辑，UI逻辑基于UIconfig，数据校验基于schema做校验。

### creative feature创新特性 {#articleHeader3}

> &#x2705; change your code style to face data, use JSON schema config to driven you page.数据驱动式开发更进一步转向面向数据编程，结合React Hooks开发更高效，专注于数据和业务逻辑.基于JSON配置数据驱动你的页面或者表单。

> &#x2705; add schema mechanism to ensure you data correct and force you to care you data and handle the abnormal situation.开发中引入schema机制验证核心数据的正确性，无论是表单还是前台组件均可适用。

> &#x2705; support get data async, verify data when it changes.基于schema动态校验数据，支持异步数据更新，响应式做校验。

## usage用法 {#articleHeader4}

安装：

<pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> config-component <span class="hljs-comment">--save</span></code></pre>

config-component默认提供了2中类型组件，

* ConfigComponent, 通用类型组件，配置页面逻辑，用于前台页面
* ConfigForm， 专用于配置化表单，可以用中后台页面

For common component:

<pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {ConfigComponent} <span class="hljs-keyword">from</span> <span class="hljs-string">'config-component'</span>
...
<ConfigComponent
      initialValues={...}
      schema={...}
      uiConfig={...}
      /></code></pre>

For form component:

<pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {ConfigForm} <span class="hljs-keyword">from</span> <span class="hljs-string">'config-component'</span>
...
<ConfigComponent
      initialValues={...}
      schema={...}
      uiConfig={...}
      onSubmit={()=>{...}}
      componentSet={...}
      /></code></pre>

params:

> &#x2139;&#xfe0f;schema: the core data you care, ConfigComponent will verify you core data with schema，you can specify alt props in item, when error occurs, will show alt as default value&#x2139;&#xfe0f;initialValues: init value in you comp
>
> &#x2139;&#xfe0f;uiConfig: define your ui interface with json config, support event hooks, see example in playground file.
>
> &#x2139;&#xfe0f;onSubmit: used only in form when submit data.
>
> &#x2139;&#xfe0f;componentSet: support <a href="https://ant.design/" target="_blank" rel="nofollow noopener noreferrer">Ant Design</a> or <a href="https://fusion.design/" target="_blank" rel="nofollow noopener noreferrer">Fusion</a> or you selfdefine Components.

* * *

代码示例：

<pre class="EnlighterJSRAW" data-enlighter-language="null">import React, { useContext } from 'react'
import *as yup from 'yup'
import* as AntdComponents from 'antd'
import moment from 'moment'
import {ConfigForm} from 'config-component'
import 'antd/dist/antd.css'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  startTime: yup.array().required(),
  useTime: yup.array().required().when('startTime', (startTime, schem) => {
    return schem.test(
      'check-start',
      'useTime required',
      value => {
        return !!value
      },
    ).test(
      'check-start',
      'useTime start >= startTime start',
      value => {
        return value && startTime[0].milliseconds(0).valueOf() <= value[0].milliseconds(0).valueOf()
      },
    ).test(
      'check-end',
      'useTime end >= startTime end',
      value => {
        return value && startTime[1].milliseconds(0).valueOf() <= value[1].milliseconds(0).valueOf()
      },
    ).required()
  }),
  agree: yup.boolean().required().test(
    'check-agree',
    'agree must checked',
    value => {
      return !!value
    },
  ).required(),
})

const initialValues = {
  firstName: 'Tony',
  lastName: 'Stark',
  startTime: [moment('2019-09-01'), moment('2019-09-03')],
}

export default function App() {

  const formConfig = {
    initialValues,
    schema,
    onSubmit: values => console.log('Your values are:', values),
    componentSet: AntdComponents,
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  }

  const onChangeWrapper = schemaKey => (form, e) => {
    const { onChange, value } = form.getFieldProps(schemaKey)
    console.log('prevalue', value)
    onChange(e)
  }

  return (
    <ConfigForm
      {...formConfig}
      uiConfig={{
        layout: formItemLayout,
        items: [
          {
            label: 'First Name: ',
            comp: 'Input',
            schemaKey: 'firstName',
            props: {},
          },
          {
            label: 'Last Name: ',
            comp: 'Input',
            schemaKey: 'lastName',
            props: {
              onChange: onChangeWrapper('lastName'),
            },
          },
          {
            label: 'Start Time: ',
            comp: 'DatePicker.RangePicker',
            schemaKey: 'startTime',
            props: {},
          },
          {
            label: 'Use Time: ',
            comp: 'DatePicker.RangePicker',
            schemaKey: 'useTime',
            props: {},
          },
          {
            layout: tailFormItemLayout,
            comp: [
              {
                comp: 'Checkbox',
                schemaKey: 'agree',
                props: {
                  color: '#999',
                },
              },
              {
                comp: 'span',
                children: '同意协议',
                props: {
                  style: {
                    marginLeft: '10px',
                    color: '#999',
                  },
                },
              },
            ],
            props: {},
          },
          {
            type: 'submit',
            layout: tailFormItemLayout,
            comp: [
              {
                type: 'submit',
                comp: 'Button',
                children: '提交',
                props: {
                  type: 'primary',
                  htmlType: 'submit',
                  key: 'submit',
                },
              },
              {
                type: 'reset',
                comp: 'Button',
                children: '重置',
                props: {
                  type: 'primary',
                  key: 'reset',
                  style: { marginLeft: '10px' },
                },
              },
            ],
            props: {},
          },
        ],

      }}
    />
  )
}</pre>

## online example在线案例

playground：<a href="https://chalecao.github.io/config-component/playground/form/storybook-static/index.html" target="_blank" rel="nofollow noopener noreferrer">https://chalecao.github.io/co&#8230;</a>

### example &#8211; configForm {#articleHeader6}

online example: <a href="https://codesandbox.io/s/config-component-form-5hnvt" target="_blank" rel="nofollow noopener noreferrer">https://codesandbox.io/s/conf&#8230;</a>

### example &#8211; configComponent {#articleHeader7}

online example: <a href="https://codesandbox.io/s/config-component-z7u9x" target="_blank" rel="nofollow noopener noreferrer">https://codesandbox.io/s/conf&#8230;</a>

## 总结 {#articleHeader8}

面向数据的编程，核心关注数据
