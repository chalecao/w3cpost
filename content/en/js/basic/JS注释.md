---
title: JS注释
weight: 4
---
## JavaScript comments

We usually use JavaScript comments for explaining JavaScript code and making it more readable. They also can be used to prevent execution during testing alternative code.

There are exists two types of comments: single line comments and multi-line comments. The example which you see here uses a single-line comment before each code line:
```
<!DOCTYPE HTML>
<html>
  <body>
    <p>Javascript comments: //</p>
    <script>
      // console.log('Welcome to w3Docs!');
    </script>
  </body>
</html>
```

We use single line comments for writing small notes. You just need to add // before your code or text. Note that any kind of text between // and the end of the line will be ignored by JavaScript.

As concerns multi-line comments, there are long segments of code that we used to disable. You need to add /* before your code and */ after it. Start with /* and end with */. Remember, that any text between /* and */ will be ignored by JavaScript.

```
<!DOCTYPE HTML>
<html>
  <body>
    <p>Javascript comments: /* */</p>
    <script>
      /*  console.log('Welcome to w3Docs!');
            alert("Welcome to W3Docs");    */
    </script>
  </body>
</html>
```
