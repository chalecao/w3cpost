import Clipboard from 'clipboard';

var pre = document.getElementsByTagName('pre');

for (var i = 0; i < pre.length; ++i) {
  var element = pre[i];
  var mermaid = element.getElementsByClassName('language-mermaid')[0];

  if (mermaid == null) {
    element.insertAdjacentHTML('afterbegin', '<button class="btn btn-copy btn-copy-btn"></button>');
    element.insertAdjacentHTML('afterbegin', '<button class="btn btn-copy btn-run"></button>');
  }
}

[].forEach.call(document.querySelectorAll('.btn-run'), function (el) {
  el.addEventListener('click', function (e) {

    const targetEl = e.target.parentNode.lastChild;
    let tempHtmlContent = targetEl.innerText;
    const isReact = /(react|reactdom|useState|useEffect|useCallback|useMemo)/i.test(tempHtmlContent);
    const isConsole = /console/.test(tempHtmlContent);
    if (!/html/.test(tempHtmlContent)) {
      tempHtmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Code Edit</title>
${isConsole?' <link rel="stylesheet" type="text/css" href="/js/playground/lib/console.css" />':''}
${isReact?' <script src="/js/playground/framework/babel.js" ></script>':''}
${isReact?' <script src="//cdn.bootcss.com/react/16.8.6/umd/react.production.min.js" ></script>':''}
${isReact?' <script src="//cdn.bootcss.com/react-dom/16.8.6/umd/react-dom.production.min.js" ></script>':''}
</head>
<body>
${isConsole?' <script src="/js/playground/lib/console.js" ></script>':''}
${isReact?'<div id="root"></div>':''}
${isReact?'<script type="text/babel">':'<script>'}
${isReact?'const useState = React.useState;':''}
${isReact?'const useEffect = React.useEffect;':''}

${tempHtmlContent}
${isReact?`
/**------------修改下组件名称------**/
ReactDOM.render(
  <xxx />,
  document.getElementById('root')
);`:''}
</script>
</body>
</html>`
    }
    localStorage.setItem('playground-html-content', tempHtmlContent);
    window.open("/playground.html");
  });
});

var clipboard = new Clipboard('.btn-copy-btn', {

  target: function (trigger) {
    return trigger.nextElementSibling;
  },

});

clipboard.on('success', function (e) {

  /*
  console.info('Action:', e.action);
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);
  */

  e.clearSelection();
});

clipboard.on('error', function (e) {
  console.error('Action:', e.action);
  console.error('Trigger:', e.trigger);
});
