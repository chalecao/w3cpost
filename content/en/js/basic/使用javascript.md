---
title: 使用javascript
weight: 3

---
## Writing Your First JavaScript Program

HTML can’t do the math, it can’t figure out if someone has correctly filled out a form. HTML just let people read the text, watch videos, look at pictures, and click links. You need JavaScript to add intelligence to your web pages so they can respond to your site’s visitors. So JavaScript lets you make your websites more attractive, effective, and useful.

JavaScript is more complex than HTML or CSS, the main goal of this book is to help you think more like a programmer. JavaScript program has this kind of symbols ({ } [ ] ; , () !=) and many unfamiliar words (var, null, else if). We can say, that learning a programming language is a lot like learning another language. You need to learn new words and understand how to put them together.

## About Computer Program?

Adding JavaScript to a web page means that you're writing a computer program. Many JavaScript programs are much simpler than the programs you use to read email, build web pages. But even though JavaScript programs, which also scripts are simpler and shorter and share many of the same properties of more complicated programs.

If you want to display a welcome message using the web-page visitor’s name: “Welcome, John Doe!”, you need to do several things:

- Ask the name of the visitor;
- Get the visitor’s reply;
- Print the message on the web page.

When you want to create a JavaScript program, you must determine the steps needed to achieve your goal. After knowing the steps, you’ll translate your ideas into programming code - the words and characters that make the web browser behave the way you want it to.

## How to Add JavaScript to a Page

Web browsers can understand HTML and CSS and convert those languages into a visual display on the screen. The web browser expects HTML, so you must clearly instruct the browser when JavaScript is coming by using the script tag.

After opening your preferred console (like Node.js), you just need to attach a script to a webpage. For linking Javascript to HTML page, you need to use the script element, which tag helps us to insert Javascript programs into any part of the HTML document. For example:

```
<!DOCTYPE HTML>
<html>
  <body>
    <p>Before the script...</p>
    <script>
      alert('Hello, world!');
    </script>
    <p>...After the script.</p>
  </body>
</html>
```

Let’s discuss opening and closing script tags. If you want to add a script to your page, you should start by inserting tags, that include the script itself or a link to an external file, which contains scripts. In many cases, you’ll put the script tags in the page’s head for keeping your JavaScript code smartly organized in one part of the web page.

The script element has a few attributes, which we don’t use so often nowadays. But we can still meet them in old code:
```
The type attribute: <script type=…>
```
For having a type the old HTML - HTML4, required a script. Earlier it was type="text/javascript", which is not required nowadays. Except that, the modern HTML standard completely changed the meaning of this attribute. Today we can use it for JavaScript modules. But we will talk about modules later, as it’s an advanced topic.
```
The language attribute: <script language=…>
```
The presented above attribute was meant to show the language of the script. But as JavaScript is the default language, there is no need to use it.

## External JavaScript Files

As we mentioned earlier, using the script tag lets you add JavaScript to a single web page. But you will also need to create scripts that you want to share with all of the pages on your site. But just copying and pasting the same JavaScript code into each page is not so good idea, especially when you have a site with hundreds of pages.

In short, we use external scripts when we have a lot of JavaScript code. That way we get code reusability, as a single JavaScript file can be used in several html pages. The extension for JavaScript file is .js. If we want to use an external script, we should put the name of the script file in the src (source) attribute of a script tag:

```
<script src="w3cdocScript.js"></script>
```
With the help of the src attribute, we can attach script files to HTML.

```
<script src="/path/w3cdocScript.js"></script>
```
In this example /path/w3cdocScript.js is an absolute path for the script, which can also provide some relative path from the same page. For example, src="w3cdocScript.js" means a file "w3cdocScript.js".

We can also give a full URL, which will look like:

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
```
If we want to attach several scripts, we should use multiple tags:

```
<script src="/w3cdocScript1.js"></script>
<script src="/w3cdocScript2.js"></script>
...
```
If src is set, the script content will be ignored. It means that a single script tag can’t have at the same time the src attribute and code inside. It just won’t work:

```
<!DOCTYPE HTML>
<html>
  <body>
    <p>Before the script...</p>
    <script src="w3cdocScript.js">
      alert("Hello, world!"); // the content is ignored, because src is set
    </script>
    <p>...After the script.</p>
  </body>
</html>
```
We need to choose either an external script or a regular script with code. Only after that, we can split this example into two scripts to work:

```
<!DOCTYPE HTML>
<html>
  <body>
    <p>Before the script...</p>
    <script src="w3cdocScript.js"></script>
    <script>
      alert("Hello, world!");
    </script>
    <p>...After the script.</p>
  </body>
</html>
```
## Your First JavaScript Program

Let’s start programming, your first program will be very simple:

Open the file test1.html in your favorite text editor.
Before the closing head tag click empty line and type: script
Press the Return key for creating a new blank line, and type: alert('Welcome to w3cdoc');
Congratulations! You’ve typed your first line of JavaScript code.

Then type script. The code should look like this:

```
<!DOCTYPE HTML>
<html>
  <head>
    <link href="../_css/style.css" rel="stylesheet">
  </head>
  <body>
    <p>Before the script...</p>
    <script>
      alert('Welcome to w3cdoc');
    </script>
  </body>
</html>
```
Activate a web browser and open the test1.html file to preview it. Notice that the page is empty when the alert appears.
By clicking the Alert box’s OK button you will close it. After the Alert box disappears, the web page will appear in the browser window.
Writing Text on a Web Page

The script in the previous section appeared in the middle of your monitor. But if you want to print a message directly onto a web page using JavaScript, you can built-in JavaScript command:

Open the file test2.html in your text editor.
While script tags appear in a web page’s head, you can put them and JavaScript programs straight in the page’s body.

Below Writing to the document window, type this code:

```
<!DOCTYPE HTML>
<html>
  <head>
    <link href="../_css/style.css" rel="stylesheet">
  </head>
  <body>
    <p>Before the script...</p>
    <script>
      document.write('<p>Welcome to w3cdoc!</p>');
    </script>
  </body>
</html>
```
Document.write() is a JavaScript command like the alert() function, it’s writes out whatever you place between the opening and closing parentheses. In this example the HTML <p>Hello world!<p> is added to the page: a paragraph tag and two words.

Now save the page and open it in a web browser.
As you see the page opens and “Welcome to w3cdoc” appears below the headline.

## The Chrome JavaScript Console

Many web developers prefer using Google’s Chrome browser. Its DevTools attribute gives you many ways to correct and balance HTML, CSS, and JavaScript problems. JavaScript console is a great place for tracking down errors and mistakes in your code. It also recognizes the line in your code where each error occurred.

```
<!DOCTYPE HTML>
<html>
  <head>
    <link href="../_css/style.css" rel="stylesheet">
  </head>
  <body>
    <p>Before the script...</p>
    <script>
      alert('Welcome to w3cdoc');
    </script>
  </body>
</html>
```
Click the Customize menu button to open the JavaScript console and choose Tools→JavaScript Console. Or use the keyboard shortcut Ctrl+Shift+J (Windows) or ⌘-Option-J (Mac) etc.