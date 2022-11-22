---
title: xcrun命令运行模拟器

---
<div>
  <h1>
    一、Xcode允许我们使用xcrun命令运行模拟器
  </h1>
  
  <h2>
    1、列出你安装的所有可用的设备
  </h2>
  
  <p>
    xcrun instruments -s<br /> 终端显示结果：
  </p>
  
  <pre class="hljs css"><code class="css">&lt;span class="hljs-selector-tag">Apple&lt;/span> &lt;span class="hljs-selector-tag">TV&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[E08E425C-ACE2-49EE-9451-2F8DE1606B44]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">Apple&lt;/span> &lt;span class="hljs-selector-tag">TV&lt;/span> 4&lt;span class="hljs-selector-tag">K&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[5F7F618E-755D-4FB5-B1D2-C723BA3B7613]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">Apple&lt;/span> &lt;span class="hljs-selector-tag">TV&lt;/span> 4&lt;span class="hljs-selector-tag">K&lt;/span> (&lt;span class="hljs-selector-tag">at&lt;/span> 1080&lt;span class="hljs-selector-tag">p&lt;/span>) (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[557BB6AF-5F1F-4C62-9414-A21EB4289CF1]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">Apple&lt;/span> &lt;span class="hljs-selector-tag">Watch&lt;/span> &lt;span class="hljs-selector-tag">-&lt;/span> 38&lt;span class="hljs-selector-tag">mm&lt;/span> (4&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[C7815581-8534-4E6C-B107-F1495A4B9068]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">Apple&lt;/span> &lt;span class="hljs-selector-tag">Watch&lt;/span> &lt;span class="hljs-selector-tag">-&lt;/span> 42&lt;span class="hljs-selector-tag">mm&lt;/span> (4&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[9C77DCFB-2D4B-4A51-B426-898BF3AED63D]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPad&lt;/span> (5&lt;span class="hljs-selector-tag">th&lt;/span> &lt;span class="hljs-selector-tag">generation&lt;/span>) (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[2B4B20F7-5399-41EE-ADB6-82441DDA7DD6]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPad&lt;/span> 2 (8&lt;span class="hljs-selector-class">.1&lt;/span>) &lt;span class="hljs-selector-attr">[9CC3E76E-790D-47E2-83B0-08549DEA5B79]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPad&lt;/span> &lt;span class="hljs-selector-tag">Air&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[32324B01-514C-4364-9D14-AA6AA3AA6667]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPad&lt;/span> &lt;span class="hljs-selector-tag">Air&lt;/span> (8&lt;span class="hljs-selector-class">.1&lt;/span>) &lt;span class="hljs-selector-attr">[6A456359-C74D-4AF7-85D0-8BFC06D58DDE]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPad&lt;/span> &lt;span class="hljs-selector-tag">Air&lt;/span> 2 (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[8FB3BFC5-C8F3-4D17-9888-13C3D130672F]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPad&lt;/span> &lt;span class="hljs-selector-tag">Pro&lt;/span> (10&lt;span class="hljs-selector-class">.5-inch&lt;/span>) (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[D966E55E-2E7C-42EA-8DEA-B917EC40558F]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPad&lt;/span> &lt;span class="hljs-selector-tag">Pro&lt;/span> (12&lt;span class="hljs-selector-class">.9-inch&lt;/span>) (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[901BB588-BD07-4937-9653-8756A05E3824]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPad&lt;/span> &lt;span class="hljs-selector-tag">Pro&lt;/span> (12&lt;span class="hljs-selector-class">.9-inch&lt;/span>) (2&lt;span class="hljs-selector-tag">nd&lt;/span> &lt;span class="hljs-selector-tag">generation&lt;/span>) (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[55827A7E-569C-42E8-9492-989C141ED55C]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPad&lt;/span> &lt;span class="hljs-selector-tag">Pro&lt;/span> (9&lt;span class="hljs-selector-class">.7-inch&lt;/span>) (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[A705DB78-8ED8-4137-BEF9-9B5CFF9229BC]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPad&lt;/span> &lt;span class="hljs-selector-tag">Retina&lt;/span> (8&lt;span class="hljs-selector-class">.1&lt;/span>) &lt;span class="hljs-selector-attr">[1A2472B0-B137-4991-9222-990FDB6F9544]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 4&lt;span class="hljs-selector-tag">s&lt;/span> (8&lt;span class="hljs-selector-class">.1&lt;/span>) &lt;span class="hljs-selector-attr">[745200F8-60B8-486B-B3AC-DD59F2DBD997]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 5 (8&lt;span class="hljs-selector-class">.1&lt;/span>) &lt;span class="hljs-selector-attr">[C66205E1-901C-4AB2-A33E-EBE255223A6A]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 5&lt;span class="hljs-selector-tag">s&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[D28C05B3-75D0-4A3D-A638-E57E38118300]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 5&lt;span class="hljs-selector-tag">s&lt;/span> (8&lt;span class="hljs-selector-class">.1&lt;/span>) &lt;span class="hljs-selector-attr">[8E92EC49-AD5E-4DAB-8BDC-447CA0388D01]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 6 (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[0DCE32BE-66AE-482E-A090-D661CB8DD8A9]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 6 (8&lt;span class="hljs-selector-class">.1&lt;/span>) &lt;span class="hljs-selector-attr">[61AA0391-3E92-4FD0-AE44-25F5A5FC5EFD]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 6 &lt;span class="hljs-selector-tag">Plus&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[7CF30729-2936-420C-AC28-3071A803D833]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 6 &lt;span class="hljs-selector-tag">Plus&lt;/span> (8&lt;span class="hljs-selector-class">.1&lt;/span>) &lt;span class="hljs-selector-attr">[001623D8-9BF2-4B6E-9721-35220CF3546C]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 6&lt;span class="hljs-selector-tag">s&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[E78DEBD1-828A-4048-8683-BD5A49AB908B]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 6&lt;span class="hljs-selector-tag">s&lt;/span> &lt;span class="hljs-selector-tag">Plus&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[709F1869-E443-4C4D-9B78-0612FBB72E95]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 7 (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[7AD29C08-152D-4995-9B33-4C13918555C8]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 7 (11&lt;span class="hljs-selector-class">.2&lt;/span>) + &lt;span class="hljs-selector-tag">Apple&lt;/span> &lt;span class="hljs-selector-tag">Watch&lt;/span> &lt;span class="hljs-selector-tag">Series&lt;/span> 2 &lt;span class="hljs-selector-tag">-&lt;/span> 38&lt;span class="hljs-selector-tag">mm&lt;/span> (4&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[56EA998A-D360-4771-B89D-C1FB051713AC]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 7 &lt;span class="hljs-selector-tag">Plus&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[A0BCF261-BEA8-4EBC-A565-3773E5B7733E]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 7 &lt;span class="hljs-selector-tag">Plus&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) + &lt;span class="hljs-selector-tag">Apple&lt;/span> &lt;span class="hljs-selector-tag">Watch&lt;/span> &lt;span class="hljs-selector-tag">Series&lt;/span> 2 &lt;span class="hljs-selector-tag">-&lt;/span> 42&lt;span class="hljs-selector-tag">mm&lt;/span> (4&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[013DEEB7-05FA-4E74-8FFD-069DBC6AB0C4]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 8 (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[39E670F7-F9B0-4A1F-92E7-202EED62E66A]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 8 (11&lt;span class="hljs-selector-class">.2&lt;/span>) + &lt;span class="hljs-selector-tag">Apple&lt;/span> &lt;span class="hljs-selector-tag">Watch&lt;/span> &lt;span class="hljs-selector-tag">Series&lt;/span> 3 &lt;span class="hljs-selector-tag">-&lt;/span> 38&lt;span class="hljs-selector-tag">mm&lt;/span> (4&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[02C9E3B3-9846-4AD0-9890-B2B840811BC9]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 8 &lt;span class="hljs-selector-tag">Plus&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[18B8751C-097C-427C-9DB8-BF59FB3C1D7E]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> 8 &lt;span class="hljs-selector-tag">Plus&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) + &lt;span class="hljs-selector-tag">Apple&lt;/span> &lt;span class="hljs-selector-tag">Watch&lt;/span> &lt;span class="hljs-selector-tag">Series&lt;/span> 3 &lt;span class="hljs-selector-tag">-&lt;/span> 42&lt;span class="hljs-selector-tag">mm&lt;/span> (4&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[E381F8A1-54E9-4428-BE4A-7011902C5D69]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> &lt;span class="hljs-selector-tag">SE&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[D8ACFB1F-6678-4014-8993-72050939481D]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
&lt;span class="hljs-selector-tag">iPhone&lt;/span> &lt;span class="hljs-selector-tag">X&lt;/span> (11&lt;span class="hljs-selector-class">.2&lt;/span>) &lt;span class="hljs-selector-attr">[1346D0CB-C0A7-40F9-BB8B-C095B736C696]&lt;/span> (&lt;span class="hljs-selector-tag">Simulator&lt;/span>)
</code></pre>
  
  <h2>
    2、开启指定模拟器（上面的列表就是可用模拟器名称）
  </h2>
  
  <p>
    xcrun instruments -w &#8220;iPhone 8 (11.2)&#8221;
  </p>
  
  <h1>
    二、使用的Xcode的simctl命令来控制模拟器
  </h1>
  
  <h2>
    1、安装指定的app
  </h2>
  
  <p>
    xcrun simctl install booted <app路径>
  </p>
  
  <p>
    安装ipa
  </p>
  
  <pre class="EnlighterJSRAW" data-enlighter-language="null">1.将xx.ipa  改成xx.zip,解压得到xx.app

2.打开模拟器

3.打开终端，运行xcrun simctl install booted xx.app</pre>
  
  <h2>
    2、运行指定的app （com.example.app）
  </h2>
  
  <p>
    xcrun simctl launch booted <app identifier>
  </p>
  
  <h2>
    3、卸载指定的应用
  </h2>
  
  <p>
    xcrun simctl uninstall booted <app identifier>
  </p>
</div>
