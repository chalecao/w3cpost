---
title: HTTP协商缓存VS强缓存原理



---
<div class="clear">
  之前一直对[浏览器](https://www.w3cdoc.com)缓存只能描述一个大概，深层次的原理不能描述上来；终于在[前端](https://www.w3cdoc.com)的两次面试过程中被问倒下，为了泄恨，查阅一些资料最终对其有了一个更深入的理解，废话不多说，赶紧来看看[浏览器](https://www.w3cdoc.com)缓存的那些事吧，有不对的地方，请各位不吝赐教啊。
</div>

<div class="postBody">
  <div id="cnblogs_post_body" class="blogpost-body">
    
       本文主要讲解[浏览器](https://www.w3cdoc.com)端的缓存，缓存的作用是不言而喻的，能够极大的改善网页性能，提高用户体验。
    

    ##     1、[浏览器](https://www.w3cdoc.com)缓存
    

    
    
      缓存这东西，第一次必须获取到资源后，然后根据返回的信息来告诉如何缓存资源，可能采用的是强缓存，也可能告诉客户端[浏览器](https://www.w3cdoc.com)是协商缓存，这都需要根据响应的header内容来决定的。下面用两幅图来描述[浏览器](https://www.w3cdoc.com)的缓存是怎么玩的，让[大家](https://www.w3cdoc.com)有个大概的认知。
    
    
    
      [浏览器](https://www.w3cdoc.com)第一次请求时：
    
    
    
      <img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/408483-20160525182843100-1556227104.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/408483-20160525182843100-1556227104.png?x-oss-process=image/format,webp" alt="" />
    
    
    
      [浏览器](https://www.w3cdoc.com)后续在进行请求时：
    
    
    
      <img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/408483-20160525182943272-204994049.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/408483-20160525182943272-204994049.png?x-oss-process=image/format,webp" alt="" />
    
    
    
      
    
    
    
      从上图可以知道，[浏览器](https://www.w3cdoc.com)缓存包含两种类型，即强缓存（也叫本地缓存）和协商缓存，[浏览器](https://www.w3cdoc.com)在第一次请求发生后，再次请求时：
    
    
    <ul>
      
        [浏览器](https://www.w3cdoc.com)在请求某一资源时，会先获取该资源缓存的header信息，判断是否命中强缓存（cache-control和expires信息），若命中直接从缓存中获取资源信息，包括缓存header信息；本次请求根本就不会与服务器进行通信；在firebug下可以查看某个具有强缓存资源返回的信息，例如本地firebug查看的一个强缓存js文件<img loading="lazy" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/408483-20160525185916397-1208157783.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/408483-20160525185916397-1208157783.jpg?x-oss-process=image/format,webp" alt="" width="517" height="297" />
      
      
        如果没有命中强缓存，[浏览器](https://www.w3cdoc.com)会发送请求到服务器，请求会携带第一次请求返回的有关缓存的header字段信息（Last-Modified/If-Modified-Since和Etag/If-None-Match），由服务器根据请求中的相关header信息来比对结果是否协商缓存命中；若命中，则服务器返回新的响应header信息更新缓存中的对应header信息，但是并不返回资源内容，它会告知[浏览器](https://www.w3cdoc.com)可以直接从缓存获取；否则返回最新的资源内容
      
    
    
    
      强缓存与协商缓存的区别，可以用下表来进行描述：
    
    
    <table id="t" border="0">
      <tr>
        <td>
        </td>
        
        <td>
         获取资源形式
        </td>
        
        <td>
         状态码
        </td>
        
        <td>
         发送请求到服务器
        </td>
      </tr>
      
      <tr>
        <td>
         强缓存
        </td>
        
        <td>
           从缓存取
        </td>
        
        <td>
           200（from cache）
        </td>
        
        <td>
          否，直接从缓存取
        </td>
      </tr>
      
      <tr>
        <td>
         协商缓存
        </td>
        
        <td>
           从缓存取
        </td>
        
        <td>
           304（not modified）
        </td>
        
        <td>
          是，正如其名，通过服务器来告知缓存是否可用
        </td>
      </tr>
    </table>
    
    
      
    
    
    ##     2、强缓存相关的header字段
    

    
    
      强缓存上面已经介绍了，直接从缓存中获取资源而不经过服务器；与强缓存相关的header字段有两个：
    
    
    <ol>
      
       expires，这是http1.0时的规范；它的值为一个绝对时间的GMT格式的时间字符串，如Mon, 10 Jun 2015 21:31:12 GMT，如果发送请求的时间在expires之前，那么本地缓存始终有效，否则就会发送请求到服务器来获取资源
      
      
       cache-control：max-age=number，这是http1.1时出现的header信息，主要是利用该字段的max-age值来进行判断，它是一个相对值；资源第一次的请求时间和Cache-Control设定的有效期，计算出一个资源过期时间，再拿这个过期时间跟当前的请求时间比较，如果请求时间在过期时间之前，就能命中缓存，否则就不行；cache-control除了该字段外，还有下面几个比较常用的设置值： <ul>
          
            no-cache：不使用本地缓存。需要使用缓存协商，先与服务器确认返回的响应是否被更改，如果之前的响应中存在ETag，那么请求的时候会与服务端验证，如果资源未被更改，则可以避免重新下载。首次加载一定会从服务器获取，首次加载会慢。
          
          
            no-store：直接禁止游览器缓存数据，每次用户请求该资源，都会向服务器发送一个请求，每次都会下载完整的资源。
          
          
            public：可以被所有的用户缓存，包括终端用户和CDN等中间代理服务器。
          
          
            private：只能被终端用户的[浏览器](https://www.w3cdoc.com)缓存，不允许CDN等中继缓存服务器对其缓存。
          
        
      
    </ol>
    
    
      注意：如果cache-control与expires同时存在的话，cache-control的优先级高于expires
    
    
    ##     3、协商缓存相关的header字段
    

    
    
      协商缓存都是由服务器来确定缓存资源是否可用的，所以客户端与服务器端要通过某种标识来进行通信，从而让服务器判断请求资源是否可以缓存访问，这主要涉及到下面两组header字段，这两组搭档都是成对出现的，即第一次请求的响应头带上某个字段（Last-Modified或者Etag），则后续请求则会带上对应的请求字段（If-Modified-Since或者If-None-Match），若响应头没有Last-Modified或者Etag字段，则请求头也不会有对应的字段。
    
    
    <ol>
      
       Last-Modified/If-Modified-Since<br /> 二者的值都是GMT格式的时间字符串，具体过程： <ul>
          
            <ul>
              
                [浏览器](https://www.w3cdoc.com)第一次跟服务器请求一个资源，服务器在返回这个资源的同时，在respone的header加上Last-Modified的header，这个header表示这个资源在服务器上的最后修改时间
              
              
                [浏览器](https://www.w3cdoc.com)再次跟服务器请求这个资源时，在request的header上加上If-Modified-Since的header，这个header的值就是上一次请求时返回的Last-Modified的值
              
              
                服务器再次收到资源请求时，根据[浏览器](https://www.w3cdoc.com)传过来If-Modified-Since和资源在服务器上的最后修改时间判断资源是否有变化，如果没有变化则返回304 Not Modified，但是不会返回资源内容；如果有变化，就正常返回资源内容。当服务器返回304 Not Modified的响应时，response header中不会再添加Last-Modified的header，因为既然资源没有变化，那么Last-Modified也就不会改变，这是服务器返回304时的response header
              
              
                [浏览器](https://www.w3cdoc.com)收到304的响应后，就会从缓存中加载资源
              
              
                如果协商缓存没有命中，[浏览器](https://www.w3cdoc.com)直接从服务器加载资源时，Last-Modified的Header在重新加载的时候会被更新，下次请求时，If-Modified-Since会启用上次返回的Last-Modified值
              
            
          
        
      
      
      
       Etag/If-None-Match<br /> 这两个值是由服务器生成的每个资源的唯一标识字符串，只要资源有变化就这个值就会改变；其判断过程与Last-Modified/If-Modified-Since类似，与Last-Modified不一样的是，当服务器返回304 Not Modified的响应时，由于ETag重新生成过，response header中还会把这个ETag返回，即使这个ETag跟之前的没有变化。
      
    </ol>
    
    ##     　4、既生Last-Modified何生Etag
    

    
    <blockquote>
      
        　　你可能会觉得使用Last-Modified已经足以让[浏览器](https://www.w3cdoc.com)知道本地的缓存副本是否足够新，为什么还需要Etag呢？HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题：
      
    </blockquote>
    
    <ul>
      
        一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候[我们](https://www.w3cdoc.com)并不希望客户端认为这个文件被修改了，而重新GET；
      
      
        某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
      
      
        某些服务器不能精确的得到文件的最后修改时间。
      
    
    
    
      这时，利用Etag能够更加准确的控制缓存，因为Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符。
    
    
    
     Last-Modified与ETag是可以一起使用的，服务器会优先验证ETag，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304。
    
    
    ##     5、用户的行为对缓存的影响
    

    
    
      盗用网上的一张图，基本能描述用户行为对缓存的影响
    
    
    
      <img src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/408483-20160525202949975-1541314356.png" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/408483-20160525202949975-1541314356.png?x-oss-process=image/format,webp" alt="" />
    
    
    ##     6、强缓存如何重新加载缓存缓存过的资源
    

    
    
      上面说到，使用强缓存时，[浏览器](https://www.w3cdoc.com)不会发送请求到服务端，根据设置的缓存时间[浏览器](https://www.w3cdoc.com)一直从缓存中获取资源，在这期间若资源产生了变化，[浏览器](https://www.w3cdoc.com)就在缓存期内就一直得不到最新的资源，那么如何防止这种事情发生呢？
    
    
    
     通过更新页面中引用的资源路径，让[浏览器](https://www.w3cdoc.com)主动放弃缓存，加载新资源。
    
    
    
      类似下图所示：
    
    
    
      <img loading="lazy" src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/8a8676e933478d1a73777d84a5de55f5_b.jpg" data-src="https://haomou.oss-cn-beijing.aliyuncs.com/upload/2019/03/8a8676e933478d1a73777d84a5de55f5_b.jpg?x-oss-process=image/format,webp" alt="" width="304" height="110" />
    
    
    
      这样每次文件改变后就会生成新的query值，这样query值不同，也就是页面引用的资源路径不同了，之前缓存过的资源就被[浏览器](https://www.w3cdoc.com)忽略了，因为资源请求的路径变了。
    
  </div>
</div>
