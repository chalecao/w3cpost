---
title: NodeJS的buffer使用总结


---
  


### [][1]buffer拼接数据

写网页爬虫，或者读取文件流，接收网络数据流的时候，我们经常使用buffer来拼接接受的数据块。关于这个字符串拼接，在java中的字符流或者字节流是可以指定编码的，或者接收后转换编码，而在NodeJS中的处理就有些不同了。  
<a></a>  
![NodeJS的buffer使用总结][2]

转载请注明出处：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/" target="_blank" rel="external">//fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/</a>

### [][3]字符串长度

看看PHP对字符串长度的判断结果：

以上三行判断分别返回10、30、10。对于中国人而言，strlen这个方法对于Unicode的判断结果是非常让人疑惑。而看看JavaScript中对字符串长度的判断，就知道这个length属性对调用者而言是多么友好。

尽管在计算机内部，一个中文字和一个英文字占用的字节位数是不同的，但对于用户而言，它们拥有相同的长度。我认为这是JavaScript中 String处理得精彩的一个点。正是由于这个原因，所有的数据从后端传输到前端被调用时，都是这般友好的字符串。所以对于前端工程师而言，他们是没有字符串Buffer的概念的。如果你是一名前端工程师，那么从此在与Node.js打交道的过程中，一定要小心Buffer啦，因为它比传统的String 要调皮一点。

### [][4]Buffer使用

像许多计算机的技术一样，都是从国外传播过来的。那些以英文作为母语的传道者们应该没有考虑过英文以外的使用者，所以你有可能看到如下这样一段代码在向你描述如何在data事件中连接字符串。

如果这个文件读取流读取的是一个纯英文的文件，这段代码是能够正常输出的。但是如果我们再改变一下条件，将每次读取的buffer大小变成一个奇数，以模拟一个字符被分配在两个trunk中的场景。

我们将会得到以下这样的乱码输出：

造成这个问题的根源在于data += trunk语句里隐藏的错误，在默认的情况下，trunk是一个Buffer对象。这句话的实质是隐藏了toString的变换的：

由于汉字不是用一个字节来存储的，导致有被截破的汉字的存在，于是出现乱码。解决这个问题有一个简单的方案，是设置编码集：

这将得到一个正常的字符串响应：

遗憾的是目前Node.js仅支持hex、utf8、ascii、binary、base64、ucs2几种编码的转换。对于那些因为历史遗留问题依旧还生存着的GBK，GB2312等编码，该方法是无能为力的

### [][5]string_decoder

在这个例子中，如果仔细观察，会发现一件有趣的事情发生在设置编码集之后。我们提到data += trunk等价于data = data.toString() + trunk.toString()。通过以下的代码可以测试到一个汉字占用三个字节，而我们按11个字节来截取trunk的话，依旧会存在一个汉字被分割在两个trunk中的情景。

按照猜想的toString()方式，应该返回的是事件循xxx和请求xxx象才对，其中“环”字应该变成乱码才对，但是在设置了encoding（默认的utf8）之后，结果却正常显示了，这个结果十分有趣。  
![NodeJS的buffer使用总结][6]  
在好奇心的驱使下可以探查到data事件调用了string\_decoder来进行编码补足的行为。通过string\_decoder对象输出第一个截取Buffer(事件循xx)时，只返回事件循这个字符串，保留xx。第二次通过string_decoder对象输出时检测到上次保留的xx，将上次剩余内容和本次的Buffer进行重新拼接输出。于是达到正常输出的目的。

string\_decoder，目前在文件流读取和网络流读取中都有应用到，一定程度上避免了粗鲁拼接trunk导致的乱码错误。但是，遗憾在于string\_decoder目前只支持utf8编码。它的思路其实还可以扩展到其他编码上，只是最终是否会支持目前尚不可得知。

### [][7]buffer正确使用

那么万能的适应各种编码而且正确的拼接Buffer对象的方法是什么呢？我们从Node.js在github上的源码中找出这样一段正确读取文件，并连接buffer对象的方法：

在end事件中通过细腻的连接方式，最后拿到理想的Buffer对象。这时候无论是在支持的编码之间转换，还是在不支持的编码之间转换（利用iconv模块转换），都不会导致乱码。  
上述一大段代码仅只完成了一件事情，就是连接多个Buffer对象，而这种场景需求将会在多个地方发生，所以，采用一种更优雅的方式来完成该过程是必要的。笔者基于以上的代码封装出一个bufferhelper模块，用于更简洁地处理Buffer对象。可以通过NPM进行安装：

下面的例子演示了如何调用这个模块。与传统data += trunk之间只是bufferHelper.concat(chunk)的差别，既避免了错误的出现，又使得代码可以得到简化而有效地编写。

所以关于Buffer对象的操作的最佳实践是：

保持编码不变，以利于后续编码转换  
使用封装方法达到简洁代码的目的

### [][8]NodeJS提供的buffer

参考buffer API: <a href="https://nodejs.org/api/buffer.html" target="_blank" rel="external">https://nodejs.org/api/buffer.html</a>  
最后我们看一下buffer的读取是如何进行的，buffer的读取主要包括以下几个api:  
1、buf = new Buffer()，然后就可以直接读取buf  
2、buf.toString([encoding], [start], [end])  
3、buf.toJSON()  
4、buf[index]  
5、buf.slice([start], [end])  
6、buf.readUInt8(offset, [noAssert])等其他read操作

#### [][9]buf = new Buffer() 和 buf[index]

创建一个buf实例，会返回一个buf数组给这个实例，就像我们直接打印buf会出现以下内容：

通过 Buffer::MakeFastBuffer 这个方法来关联起来的，我们看主要代码：

这样我们的buf实例看起来就像是一个数组了

#### [][10]buf.toString([encoding], [start], [end])

这个是我们读取buf最常用的方法，我们可以将一些字符串存入buf，然后使用toString方法将他们取出来。

#### [][11]buf.slice([start], [end])

这个是对buf进行剪切的功能，我们看下代码：

然后可以参考buffer的构造函数来追踪slice的创建

### [][12]总结

我们大致了解了buffer的工作机制之后，我们的日常工作有了一些注意，什么时候该用buffer，什么时候不该用，使用buffer应该注意哪些问题？

#### [][13]写入速度的测试

读取速度都不需要测试了，肯定string更快，buffer还需要toString()的操作。  
所以我们在保存字符串的时候，该用string还是要用string，就算大字符串拼接string的速度也不会比buffer慢。  
那什么时候我们又需要用buffer呢？没办法的时候，当我们保存非utf-8字符串，2进制等等其他格式的时候，我们就必须得使用了。

#### [][14]buffer不得不提的8KB

buffer著名的8KB载体，举个例子好比，node把一幢大房子分成很多小房间，每个房间能容纳8个人，为了保证房间的充分使用，只有当一个房间塞满8个人后才会去开新的房间，但是当一次性有多个人来入住，node会保证要把这些人放到一个房间中，比如当前房间A有4个人住，但是一下子来了5个人，所以node不得不新开一间房间B，把这5个人安顿下来，此时又来了4个人，发现5个人的B房间也容纳不下了，只能再开一间房间C了，这样所有人都安顿下来了。但是之前的两间房A和B都各自浪费了4个和3个位置，而房间C就成为了当前的房间。

具体点说就是当我们实例化一个新的Buffer类，会根据实例化时的大小去申请内存空间，如果需要的空间小于8KB，则会多一次判定，判定当前的8KB载体剩余容量是否够新的buffer实例，如果够用，则将新的buffer实例保存在当前的8KB载体中，并且更新剩余的空间。

buffer会存在内存泄露情况，所以一定要注意，就算只有1byte的buffer空间没释放掉，整个8KB的内存都不会被V8释放。

#### [][15]buffer字符串的连接

在我们接受post数据时，node是以流的形式发送上来的，会触发ondata事件，所以我们见到很多代码是这样写的：

下面我们比较一下两者的性能区别：

在1000次拼接过程中，两者的性能几乎相差一倍，而且当客户上传的是非UTF8的字符串时，直接+=还容易出现错误。

#### [][16]独享的空间

如果你想创建一个独享的空间，独立的对这块内存空间进行读写，有两种办法，1是实例化一个超过8KB长度的buffer，另外一个就是使用slowbuffer类。

#### [][17]buffer的释放

很遗憾，我们无法手动对buffer实例进行GC，只能依靠V8来进行，我们唯一能做的就是解除对buffer实例的引用。

#### [][18]快速刷掉buffer

最快的方法就是buffer.fill

### [][19]谢谢！

欢迎关注皓眸学问公众号（扫描左侧二维码），每天好文、新技术！任何学习疑问或者工作问题都可以给我留言、互动。T\_T 皓眸大前端开发学习 T\_T

 [1]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#buffer拼接数据 "buffer拼接数据"
 [2]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/buffer1.png
 [3]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#字符串长度 "字符串长度"
 [4]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#Buffer使用 "Buffer使用"
 [5]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#string-decoder "string_decoder"
 [6]: //fed123.oss-ap-southeast-2.aliyuncs.com/wp-content/uploads/2017/08/buffer1-1.png
 [7]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#buffer正确使用 "buffer正确使用"
 [8]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#NodeJS提供的buffer "NodeJS提供的buffer"
 [9]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#buf-new-Buffer-和-buf-index "buf = new Buffer() 和 buf[index]"
 [10]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#buf-toString-encoding-start-end "buf.toString([encoding], [start], [end])"
 [11]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#buf-slice-start-end "buf.slice([start], [end])"
 [12]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#总结 "总结"
 [13]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#写入速度的测试 "写入速度的测试"
 [14]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#buffer不得不提的8KB "buffer不得不提的8KB"
 [15]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#buffer字符串的连接 "buffer字符串的连接"
 [16]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#独享的空间 "独享的空间"
 [17]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#buffer的释放 "buffer的释放"
 [18]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#快速刷掉buffer "快速刷掉buffer"
 [19]: //fed123.oss-ap-southeast-2.aliyuncs.com/2014/09/09/2014_nodejs_buffer/#谢谢！ "谢谢！"
