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
    if (!/html/.test(tempHtmlContent)) {
      tempHtmlContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>Code Edit</title>
</head>
<body>
<script>
 ${tempHtmlContent}
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
