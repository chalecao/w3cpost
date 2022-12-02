---
title: JS操作DOM
weight: 5
---

## What is DOM

The Document Object Model (DOM) is a way to represent a programming interface for HTML and XML documents. With the help of DOM we can gain and manipulate tags, classes using commands of Documents object. It gives an opportunity to connect programming languages to the page.

## DOM Document

Web page is a document, which we can display in the browser window or as the HTML source. In the both cases Document Object Model shows the same document, which can be manipulated. DOM is a representation of the web page, which we can modify with some scripting language like JavaScript.

DOM Document has the important part in your webpage, as it is an owner of all other objects. So when you want to access any object on your webpage you should start with the document. Except that it contains a lot of major properties and methods that enable us to access and fix our website. With the help of DOM we can create new elements and change the existing ones, even remove old elements and attributes. JavaScript can react to existing events and create new ones in the page as well.

## The standard

JavaScript usually doesn’t use cryptic numeric codes for representing node types. Many other parts of the DOM interface also feel complicated and alien. The reason is that the DOM wasn’t designed only for JavaScript. Quite, it tries to be a language-neutral interface, which can be used in other systems as well—not just for HTML but also for XML - a generic data format with an HTML-like syntax.

### Trees

Each node has an ability to refer other nodes, children, they also can have their own children. This model is typical of nested structures where elements can contain subelements which are similar to themselves.

We call that kind of data structure a tree with a branching structure, which has just one, well-defined root and doesn’t have any cycle. In case of the DOM, document.documentElement serves as the root.

There are a lot of trees in computer science. Except representing periodic structures such as HTML documents or programs, they are often used to support sorted sets of data. The reason it in the elements, which can usually be found or inserted more completely in a tree than in a flat array.

A typical tree has a lot of nodes. The syntax tree had identifiers, values, and also application nodes. The last one may have children, whereas identifiers and values are leaves, or nodes without children.

![](/images/posts/dde682cb019bdecbd98a2ab85f20f319de041576.png)

The same is for the DOM. Here nodes are for elements, which represent HTML tags and determine the structure of the document. They can have child nodes, the example for this kind of node is document.body. Some of these children can also be leaf nodes: pieces of text or comment nodes.

Each DOM node object has a nodeType property. It contains a code which identifies the type of node.

Let’s imagine that HTML document is just nested set of boxes . Tags like <body> and </body> insert another tags, which contain other tags or text. Here is the example of the document:
```
<!DOCTYPE html>
<html>
  <head>
    <title>Title of the document</title>
  </head>
  <body>
    <h1>W3Docs Page</h1>
    <h2>Welcome to W3Docs page

    
      <a href="https://www.w3docs.com/">Link to w3docs</a>
    
  </body>
</html>
```
![](/images/posts/8ffe03491e33f6738fcdc142b5d1bdf681c718c1.png)

## Navigating Between Nodes

We can easily navigate between nodes using the next properties:
- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling

In this example you can see how you need to get the parent element of an h1.
```
<!DOCTYPE HTML>
<html>
  <head>
    <title>Title of the document</title>
  </head>
  <body>
    let parent = document.getElementById(“head”).parentNode
    Javascript lets you work with css usinggetElementById(...) function . 
    <ul>
      Create styles
      Change styles
      Delete styles
      Add css classes
      Remove css classes
       etc... 
    
   Here is a simple example
  </body>
</html>
```
## Moving through the tree

DOM nodes have a lot of links to other nearby nodes. This diagram illustrates it:

![](/images/posts/f0289c3e1ecf25d782a5666075d63e252f3efa7a.png)

There is only only one link of each type in the diagram, where every node has a parentNode feature which points to the node it is part of. Similarly, every element node has a childNodes feature that points to an array-like object holding its children.

You could move anywhere in the tree using only these parent and child links. But JavaScript also gives you an opportunity to access to a number of additional acceptable links. The firstChild and lastChild properties have the value null for nodes without children. Similarly, previousSibling and nextSibling point to neighboring nodes - nodes with the same parent that appear immediately before or after the node itself. PreviousSibling will be null for a first child, for a last child, nextSibling also will be null. For a first child, previousSibling will be null, and for the last child, nextSibling will be null as well.

## Finding HTML Elements

Now you know what DOM document is, so we can start getting our first HTML elements. There are a lot of ways to do so using the Javascript DOM here are the most common:

- Get element by ID
We use getElementById() method to get a single element by its id. Take a look an example:
```
let title = document.getElementById(‘title-id’);
```
As you see we get the element with the id of title-id and save it into a variable.

- Get elements by class name
Using the getElementsByClassName() method we can also get more than one object. The method returns an array of elements.
```
let elements = document.getElementsByClassName(‘list-elements’);
```
We get all the items with the class list-elements then save them into a variable.

- Get element by tag name
We get our elements by tag name using the getElementsByTagName() method.

All element nodes include a getElementsByTagName() method, it collects all elements with the given tag name which we call descendants (direct or indirect children) of that node and returns them as an array-like object.
```
let paragraphsEl = document.getElementsByTagName(‘p’);
```
As so see we get all p elements of our HTML document and save them into a variable.

- Get element by CSS Selectors
If you want to find all HTML elements that match a specified CSS selector, use the querySelectorAll() method.
```
let elements = document.querySelectorAll("h1");
```
When we want to find some specific node in the document, we can’t just reach it by begining at document.bodydocument.body and following a fixed path of properties.

One of the reasons is that text nodes are created for the whitespace between nodes. The example document’s body tag doesn’t have just 3 children (h1, h2 and p elements) but has 7: those 3, plus the spaces before, after, and between them.

For finding a specific single node, you can give it an id attribute and use document.getElementById instead.
```
<!DOCTYPE html>
<html>
  <head>
    <title>Title of the document</title>
  </head>
  <body>
    <h1>W3Docs Page</h1>
    <h2>Welcome to W3Docs page

     Click in link
      <a id='title' href="https://www.w3docs.com/">Link to w3docs</a>
    
    <script>
      let element = document.getElementById(`title`);
      alert(element.href);
    </script>
  </body>
</html>
```
## Changing HTML Elements

With HTML DOM we can change the content and style of an HTML element by changing its attribute. We use innerHTML attribute for changing the content of an HTML element.
```
document.getElementById(“#title”).innerHTML = “Welcome to W3Docs!!”;
```
In the example we get the element with an id of the header, then set the inner content to “Welcome to W3Docs!!”.

We can also use innerHTML to put tags in another tag.
```
document.getElementsByTagName("div").innerHTML = "<h1>Welcome to W3Docs!!</h1>"
```

## Adding and deleting elements

We can change almost everything about the DOM data structure. By changing parent-child relationships the shape of the document tree can be modified. Nodes have a remove method for removing them from their current parent node. If we want to add a child node to an element node, we can use appendChild, which puts it at the end of the list of children, or insertBefore.

Let’s take a look at how we can add new elements and delete existing ones.

For adding elements we need to create a div element using the createElement() method which gets a tagname and saves it into a variable. After we just need to give it some content and insert it into our DOM document.
```
let p = document.createElement(‘p’);
```
By using the createTextNode() method we create content which takes a string as a variable and then we insert our new div element before already existed in our document div.
```
let newContent = document.createTextNode("Welcome to W3Docs!"); 
p.appendChild(newContent);
document.body.insertBefore(p, currentP);
```
In the next example we get an element and delete it using the removeChild() method.
```
let element = document.querySelector('#title');
element.parentNode.removeChild(element);
```

## Event Handlers

The HTML DOM allows Javascript to react to HTML events as well. Here is the list of some the most important ones:
- mouse click
- page load
- mouse move
- input field change

## Attributes

Some element attributes can be gained through a property of the same name on the element’s DOM object. It’s the case for standard attributes which often used.

But HTML also allows to set any attribute you want on nodes. It’s useful, because it allows you to store extra information in a document. If you want to have your own attribute names such attributes will not be present as properties on the element’s node. So you have to use the getAttribute and setAttribute methods to work with them.

Example of the setAttribute() method:
```
<!DOCTYPE html>
<html>
  <head>
    <title>Title of the document</title>
    <style>
      .text-class {
        color: green;
        font-size: 40px;
      }
    </style>
  </head>
  <body>
    <button id="w3Button" type="button" onclick="clickFunction()">Click on button</button>
    Welcome to W3Docs!
    <script>
      function clickFunction() {
        // Select element and set attribute
        document.getElementById("w3Text").setAttribute("class", "text-class");
      }
    </script>
  </body>
</html>
```

Example of the getAttribute() method:
```
<!DOCTYPE html>
<html>
  <head>
    <title>Title of the document</title>
    <style>
      .text-class {
        color: blue;
      }
    </style>
  </head>
  <body>
    <h2 class="text-class">Welcome to W3Docs!

    <h2 id="text">

    <button id="w3Button" type="button" onclick="clickFunction()">Click on button</button>
    <script>
      function clickFunction() {
        // Select element and get attribute       
        let button = document.getElementsByTagName("h2")[0].getAttribute("class");
        document.getElementById("text").innerHTML = button;
      }
    </script>
  </body>
</html>
```

It is recommended to add the names of such made-up attributes with data- to be sure that they don’t conflict with any other attributes.

## Summary

JavaScript programs review and interfere with the document which the browser is displaying through a data structure called the DOM. It represents the browser’s model of the document, and a JavaScript program can modify it to change the visible document.

The structure of DOM looks like a tree, where elements are organized hierarchically according to the structure of the document. The objects which representing elements have properties such as parentNode and childNodes. They can be used to course through this tree.

The way a document is displayed can be effected by styling and explaining rules that match certain nodes. There are a lot of different style properties, such as color or display. JavaScript code can manipulate the style of elements directly through its style property.
