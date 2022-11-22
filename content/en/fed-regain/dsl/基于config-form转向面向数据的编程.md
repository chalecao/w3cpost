---
title: 基于config-form转向面向数据的编程


date: 2019-12-27T01:53:48+00:00
url: /javascriptnodejs/5503.html
featured_image: https://haomou.oss-cn-beijing.aliyuncs.com/upload/;https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/12/img_5e05cf08ebb5f.png
xzh_tui_back:
  - 成功
views:
  - 923
fifu_image_url:
  - https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/12/img_5e05cf08ebb5f.png
fifu_image_alt:
  - 基于config-form转向面向数据的编程
like:
  - 1


---
本文接上篇：[基于config-component转向面向数据的编程][1] 继续分析如何转向面向数据的编程

<p id="MXBKKlE">
  <img loading="lazy" class="alignnone  wp-image-5505 shadow" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/12/img_5e05cf08ebb5f.png?x-oss-process=image/quality,q_10/resize,m_lfit,w_200" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/12/img_5e05cf08ebb5f.png?x-oss-process=image/format,webp" alt="" width="394" height="328" srcset="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/12/img_5e05cf08ebb5f.png?x-oss-process=image/format,webp 798w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/12/img_5e05cf08ebb5f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_300,h_250/format,webp 300w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/12/img_5e05cf08ebb5f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_768,h_639/format,webp 768w, https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/12/img_5e05cf08ebb5f.png?x-oss-process=image/quality,q_50/resize,m_fill,w_721,h_600/format,webp 721w" sizes="(max-width: 394px) 100vw, 394px" />
</p>

# 面向数据

前面我提出了样式行为数据分离的想法：

> **样式 mix 行为 = 样式 + 数据 + 行为**

之前我们都知道做样式行为分离，从jQuery之后也出现了像Angular，Backbone，Avalon，React，Vue等等很多前端框架，从MVC设计理念到MVVM到响应式设计。这些前端框架的基本出发点其实都是样式和行为分离，JS框架主要解决的是行为的问题。

> 程序（行为） = 算法 + 数据

大学的计算机课程中我们都学过：程序主要包含两部分，算法和数据。

对于前端领域，其实多了一部分就是样式。当然样式主要包括：HTML结构+CSS样式，这些都是基础知识，就不用做多介绍，从HTML5+CSS3标准之后，也没有多大的变化。但是在MVVM框架中使用方式发生了变化，对于React框架，引入了jsx类型文件，支持编写HTML片段，通过DSL分析，基于AST转化成包装函数，最后编译成我们的代码。

# config-component

config-component其实将JSX中html代码片段做了进一步的抽象，转化成JSON-Schema的数据形式来驱动。用户只需要专注于如何构造处理JSON数据，具体的展现是通过JSON数据来驱动view展示。将我们的程序转化成：样式+数据+算法

> **程序= 样式 + 数据 + 算法**

从前端目前codeless的发展方向来看，这其实只是其中一部分，更进一步基于config-component我们可以做

  1. DDV（数据驱动view），对于一些比较固定的场景，比如导购展示页面，完全可以通过数据驱动页面的展示，包括驱动某个UI展示，驱动整个框架展示。这时候后端接口返回数据就需要包含两个层次，UI层数据和业务数据。如果同时将两个数据混在一起，其实就类似我们说的SSR（服务端渲染）了，但是是从另一个方式来实现的，可以说是轻量级的服务端渲染
  2. 可视化搭建，这个场景和第一个场景结合起来更能发挥价值。后端同学可能并不擅长写UI，即使抽象成JSON Schema，也需要了解简单的一些前端知识。而这个UI层的JSON Schema我们可以通过可视化搭建来完成，搭建之后生成一份JSON Schema，作为页面的UI，在搭建的时候处理好后端数据的映射关系其实就ok了。需要我们处理的其实是一些算法逻辑。

config-component中提供了config-form组件，主要用于解决中后台的form表单的处理，包含了以下功能：

  1. JSON Schema驱动表单展示，支持自定义组件，支持函数组件，支持原生组件
  2. 提供数据统一校验机制，将数据模型层统一抽出来处理，UI中通过schemaKey关联即可，处理起来更加灵活。提供数据校验高亮和自定义提示
  3. 支持灵活的自定义事件处理

比较一下传统的写法：

<pre class="EnlighterJSRAW" data-enlighter-language="null">&lt;div className={`step-1 ${step}`}&gt;
        &lt;div&gt;
          任务类型： &lt;Select
            className="select-type"
            onChange={id =&gt; setTaskSelected(() =&gt; {
              const task = taskList.find(item =&gt; item.id == id)
              task.taskIndex = JSON.parse(task.taskIndex)
              return task
            })}
            dataSource={taskList.map(it =&gt; ({ label: it.taskName, value: it.id }))}
          /&gt;
          &lt;ul className="step-1-tips"&gt;
            &lt;li&gt;每日任务：活动周期内，每日完成任务指标即可获得奖励，例如：每日收银笔数达到5笔，获得3元红包。&lt;/li&gt;
            &lt;li&gt;周期任务：活动周期内，累计完成任务指标即可获得奖励，例如：一个月内累计活跃超过24天，获得100元红包。&lt;/li&gt;
            &lt;li&gt;每日&amp;周期任务：活动周期内，在每日完成任务指标基础上，还要达到周期任务指标，才能领取任务奖励，例如：每日任务完成收银5笔，完成任务天数达到24天及以上，获得100元红包&lt;/li&gt;
            &lt;li&gt;签到任务：以签到形式的激励任务，可以实现连续参与权益递增&lt;/li&gt;
          &lt;/ul&gt;
        &lt;/div&gt;
        &lt;br /&gt;&lt;br /&gt;
        &lt;Button type="primary" disabled={!Object.keys(taskSelected.taskIndex).length} onClick={() =&gt; {
          setStep('step2')
          // 如果是周期任务
          if (isPeriod()) {
            awardGetWayList.splice(1)
          }
        }}&gt;创建任务&lt;/Button&gt;
      &lt;/div&gt;</pre>

下面是基于config-form写法

<pre class="EnlighterJSRAW" data-enlighter-language="null">const schema = yup.object().shape({
    outerTaskId: yup.string().required(),
    activityName: yup.string().required('请填写任务名称').max(12, '活动名称最长12个字符'),
    taskTime: yup.array().required('请填写任务时间').test(
      'check-time',
      '任务时间 &gt;= 1天',
      value =&gt; {
        return value && value[1].hour(23).minute(59).second(59).milliseconds(0)
          .valueOf() - value[0].milliseconds(0).valueOf() &gt;= (24 * 60 * 60 * 1000 - 1000)
      },
    ),
    activityDes: yup.string().required('请填写任务概要').max(24, '最长24个字符'),
    activityRemark: yup.string().required('请填写任务细则').max(200, '最长200个字符'),
    minAmount: yup.string().test('check-number', '请输入正确的单个红包最小金额(2位小数)', value =&gt; {
      if (!value) return true
      return checkNumber2Decimal(value)
    }),
...
const formConfig = {
    initialValues: {
      outerTaskId: taskSelected.id,
      taskLabel: taskSelected.taskName,
      joinWay: joinTypeList[0].value,
      sendingStrategy: Object.keys(sendingStrategyMap)[0],
      awardGetWay: awardGetWayList[0].value,
      collectPeriodContent: Object.keys(collectPeriodContentMap)[0],
      splitPeriodContent: Object.keys(splitPeriodContentMap)[0],
      filtFlag: filtFlagList[0].value,
      ...(detail ? {
        ...detail,
        joinWay: ('' + detail.joinWay),
        awardGetWay: ('' + detail.awardGetWay),
        taskTime: [moment(detail.activityStart), moment(detail.activityEnd)],
        ...detailMap,
      } : {})
    },
    schema,
    onSave: (schemaForm) =&gt; {
      actionType = SAVING
      // console.log(actionType)
    },
    onAudit: (schemaForm) =&gt; {
      actionType = SUBMIT
      // console.log(actionType)
      schemaForm.submit()
    },
    onSubmit: (formData) =&gt; {
....
return &lt;ConfigForm
{...formConfig}
uiConfig={{
  layout,
  items: [
    {
      layout,
      label: '任务类型: ',
      comp: 'Input',
      schemaKey: 'taskLabel',
      props: {
        disabled: true,
      },
    },
    {
      layout,
      label: '任务时间: ',
      comp: 'DatePicker.RangePicker',
      schemaKey: 'taskTime',
      props: {
        disabledDate,
        disabled,
        onOk: onKeyUp
      },
    },
    {
      layout,
      label: '任务名称: ',
      comp: [
        {
          comp: 'Input',
          schemaKey: 'activityName',
          props: {
            trim: true,
            disabled,
            onKeyUp
          },
        }, {
          comp: 'span',
          children: '最多12个字符',
          props: {
            className: 'f-tips',
          },
        }],
      props: {},
    },
    {
      layout,
      label: '任务概要: ',
      comp: [
        {
          comp: 'Input',
          schemaKey: 'activityDes',
          props: {
            trim: true,
            disabled,
            onKeyUp
          },
        }, {
          comp: 'span',
          children: '最多24个字符',
          props: {
            className: 'f-tips',
          },
        }],
      props: {},
    },</pre>

上面我们只是截取了片段。

 [1]: https://www.f2e123.com/javascriptnodejs/5000.html