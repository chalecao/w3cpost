---
title: linux配置nginx自己生成https的crt和key证书

---
# 概念

首先，几个概念：

（1）非对称加密：一个公钥、一个私钥，公钥加密的文件可以用私钥解密，反之也可以；RSA就是一种常见的非对称加密算法；

另外，私钥一般自己保存，只有自己知道；公钥则是公开的

（2）openssl：一个开源的组织、一个开源的软件代码库和密码库工具，囊括了主要的密码算法；

公钥是公开分发的，那当你拿到一个公司（个人）的公钥之后，怎么确定这个公钥就是那个公司（个人）的？？？而不是一个别人篡改之后的公钥？？而且公钥上没有任何的附加信息，标记当前公钥的所属的实体，相关信息等

（3）证书：公钥信息 + 额外的其他信息（比如所属的实体，采用的加密解密算法等）= 证书。证书文件的扩展名一般为crt。

（4）CA：证书认证中心；拿到一个证书之后，得先去找CA验证下，拿到的证书是否是一个“真”的证书，而不是一个篡改后的证书。如果确认证书没有问题，那么从证书中拿到公钥之后，就可以与对方进行安全的通信了，基于非对称加密机制。

CA自身的分发及安全保证，一般是通过一些权威的渠道进行的，比如操作系统会内置一些官方的CA、[浏览器](https://www.w3cdoc.com)也会内置一些CA；

参考这里：[证书相关：rsa、crt文件、key文件、csr文件][1]

# 实践

总结了一下linux下openssl生成 签名的步骤：

**x509证书一般会用到三类文，key，csr，crt**

**Key 是私用密钥openssl格，通常是rsa算法。**

**Csr 是证书请求文件，用于申请证书。在制作csr文件的时，必须使用自己的私钥来签署申，还可以设定一个密钥。**

**crt是CA认证后的证书文，（windows下面的，其实是crt），签署人用自己的key给你签署的凭证。**

**1.key的生成**

<div>
  <div>
    <table>
      <tr>
        <td>
          <div>
            1
          </div>
        </td>

        <td>
          <div>
            <div>
              openssl genrsa -des3 -out server.key 2048
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>

这样是生成rsa私钥，des3算法，openssl格式，2048位强度。server.key是密钥文件名。为了生成这样的密钥，需要一个至少四位的密码。可以通过以下方法生成没有密码的key:

<div>
  <div>
    <table>
      <tr>
        <td>
          <div>
            1
          </div>
        </td>

        <td>
          <div>
            <div>
              openssl rsa -in server.key -out server.key
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>

server.key就是没有密码的版本了。

**2. 生成CA的crt**

<div>
  <div>
    <table>
      <tr>
        <td>
          <div>
            1
          </div>
        </td>

        <td>
          <div>
            <div>
              openssl req -new -x509 -key server.key -out ca.crt -days 3650
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>

生成的ca.crt文件是用来签署下面的server.csr文件。

**3. csr的生成方法**

<div>
  <div>
    <table>
      <tr>
        <td>
          <div>
            1
          </div>
        </td>

        <td>
          <div>
            <div>
              openssl req -new -key server.key -out server.csr
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>

需要依次输入国家，地区，组织，email。最重要的是有一个common name，可以写你的名字或者域名。如果为了https申请，这个必须和域名吻合，否则会引发[浏览器](https://www.w3cdoc.com)警报。生成的csr文件交给CA签名后形成服务端自己的证书。

<div class="table-box">
  <table>
    <tr>
      <th>
        字段
      </th>

      <th>
        说明
      </th>
      
      <th>
        示例
      </th>
    </tr>
    
    <tr>
      <td>
        Country
      </td>
      
      <td>
        ISO国家代码(两位字母)
      </td>
      
      <td>
        CN
      </td>
    </tr>
    
    <tr>
      <td>
        State or Provine Name
      </td>
      
      <td>
        所在省份
      </td>
      
      <td>
        LiaoNing
      </td>
    </tr>
    
    <tr>
      <td>
        Locality Name
      </td>
      
      <td>
        所在城市
      </td>
      
      <td>
        ShenYang
      </td>
    </tr>
    
    <tr>
      <td>
        Organization Name
      </td>
      
      <td>
        公司名称
      </td>
      
      <td>
        PuFei
      </td>
    </tr>
    
    <tr>
      <td>
        Organization Unit Name
      </td>
      
      <td>
        部门名称
      </td>
      
      <td>
        IT Dept
      </td>
    </tr>
    
    <tr>
      <td>
        Common Name
      </td>
      
      <td>
        申请证书域名
      </td>
      
      <td>
        <a href="http://www.baidu.com" rel="nofollow">www.baidu.com</a>
      </td>
    </tr>
    
    <tr>
      <td>
        Email Address
      </td>
      
      <td>
        电子邮箱(可以不输入)
      </td>
      
      <td>
        -
      </td>
    </tr>
    
    <tr>
      <td>
        A challenge password
      </td>
      
      <td>
        加密证书请求密码(可以不输入)
      </td>
      
      <td>
        -
      </td>
    </tr>
  </table>
</div>

**4. crt生成方法**

CSR文件必须有CA的签名才可形成证书，可将此文件发送到verisign等地方由它验证，要交一大笔钱，何不自己做CA呢。

<div>
  <div>
    <table>
      <tr>
        <td>
          <div>
            1
          </div>
        </td>

        <td>
          <div>
            <div>
              openssl x509 -req -days 3650 -in server.csr -CA ca.crt -CAkey server.key -CAcreateserial -out server.crt
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>

输入key的密钥后，完成证书生成。-CA选项指明用于被签名的csr证书，-CAkey选项指明用于签名的密钥，-CAserial指明序列号文件，而-CAcreateserial指明文件不存在时自动生成。

最后生成了私用密钥：server.key和自己认证的SSL证书：server.crt

证书合并：

<div>
  <div>
    <table>
      <tr>
        <td>
          <div>
            1
          </div>
        </td>

        <td>
          <div>
            <div>
              cat server.key server.crt > server.pem
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>

 [1]: https://blog.csdn.net/weiyuanke/article/details/87256937
