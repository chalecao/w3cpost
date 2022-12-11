---
title: 基于Chrome devTools远程调试技术方案

---
<div class="bi-unstyle bi-dnd" data-key="2">
  <span data-key="3">移动端页面因为开发采用的方案不同，调试方法也有差别。H5页面调试方案分为两种：基于调试框架支持的调试方案 和 基于原生系统支持的调试方法。本篇文章基于在天猫超市目前做的远程调试研究，介绍anydebugger调试技术方案，理论上支持任意环境下的web页面调试。基础知识参考：<a href="//fed123.oss-ap-southeast-2.aliyuncs.com/chromeyuanchengdiaoshi/">chrome dev远程调试android 和ios</a></span>
</div>

<h2 id="0" class="bi-heading bi-heading-two bi-dnd" data-key="6" data-id="7k0ech">
  <span data-key="7">基于调试框架支持的调试方案</span>



<div class="bi-unstyle bi-dnd" data-key="8">
  <span data-key="9">先比较一下现有的调试框架：</span>
</div>

<div class="bi-unstyle bi-dnd" data-key="8">
</div>

<div class="bi-table">
  <div class="bi-table-content-outer">
    <table class="bi-table-content">
      <colgroup> <col width="98px" /> <col width="123px" /> <col width="153px" /> <col width="122px" /> <col width="128px" /> <col width="148px" /> <col width="146px" /> <col width="153px" /> <col width="156px" /> <col width="164px" /> <col width="164px" /></colgroup> <tr class="bi-table-row" data-key="11">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="12">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="13">
              <span data-key="14">能力\框架</span>
            </div>
          </div>
        </td>

        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="15">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="16">
              <span data-key="17">weinre</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="18">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="19">
              <span data-key="20">anyproxy</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="21">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="22">
              <span data-key="23">spy-debugger</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="24">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="25">
              <span data-key="26">Vorlon</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="27">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="28">
              <span data-key="29">vConsole</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="30">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="31">
              <span data-key="32">jsConsole</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="33">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="34">
              <span data-key="35">whistle</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="36">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="37">
              <span data-key="38">ghostlab</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="39">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="40">
              <span data-key="41">React Native （Hybrid）</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="42">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="43">
              <span data-key="44">Weex （Hybrid）</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="45">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="46">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="47">
              <span data-key="48">介绍</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="49">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="50">
              <span data-key="51">老牌调试框架</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="52">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="53">
              <span data-key="54">阿里系请求代理工具</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="55">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="56">
              <span data-key="57">包装了weinre和anyproxy</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="58">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="59">
              <span data-key="60">微软出品</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="61">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="62">
              <span data-key="63">微信手机端调试工具</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="64">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="65">
              <span data-key="66">远程输出控制台数据</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="67">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="68">
              <span data-key="69">请求代理工具（包装了weinre， log）</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="70">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="71">
              <span data-key="72">基于chrome devtools protocol调试</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="73">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="74">
              <span data-key="75">可基于chrome devtools protocol调试</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="76">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="77">
              <span data-key="78">可基于chrome devtools protocol调试</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="79">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="80">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="81">
              <span data-key="82">调试级别</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="83">
          <div class="bi-table-cell-content">
            <div class="bi-list-task-checkbox">
              console
            </div>
            
            <div class="bi-list-task-checkbox">
              network
            </div>
            
            <div class="bi-list-node-content">
              <div class="bi-unstyle bi-dnd" data-key="92">
              </div>
              
              <div class="bi-unstyle bi-dnd" data-key="92">
                <span data-key="93">element</span>
              </div>
            </div>
            
            <div class="bi-list-node-content bi-list-node-content-checked">
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="100">
          <div class="bi-table-cell-content">
            <div class="bi-table-cell-content">
              <div class="bi-list-task-checkbox">
              </div>
            </div>
          </div>
          
          <div class="bi-table-cell-content">
            <div class="bi-list-task-checkbox">
              <span class="ant-checkbox"><span data-key="110">proxy</span></span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="117">
          <div class="bi-list-task-checkbox">
            onsole
          </div>
          
          <div class="bi-list-task-checkbox">
            network
          </div>
          
          <div class="bi-list-node-content">
            <div class="bi-list-node-content">
              <div class="bi-unstyle bi-dnd" data-key="92">
              </div>
            </div>
          </div>
          
          <div class="bi-list-node-content">
            <div class="bi-unstyle bi-dnd" data-key="92">
              <span class="ant-checkbox"><span data-key="110">proxy</span></span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="92">
              <span data-key="93">element</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="134">
          <div class="bi-table-cell-content">
            <div class="bi-list-task-checkbox">
            </div>
            
            <div class="bi-list-node-content bi-list-node-content-checked">
              <div class="bi-unstyle bi-dnd" data-key="137">
                <span data-key="138">console</span>
              </div>
            </div>
            
            <div class="bi-list-node-content bi-list-node-content-checked">
              <div class="bi-unstyle bi-dnd" data-key="140">
                <span data-key="141">network</span>
              </div>
            </div>
            
            <div class="bi-list-node-content bi-list-node-content-checked">
              <div class="bi-unstyle bi-dnd" data-key="146">
                <span data-key="147">element</span>
              </div>
            </div>
            
            <div class="bi-list-node-content bi-list-node-content-checked">
              <div class="bi-unstyle bi-dnd" data-key="149">
                <span data-key="150">js debug</span>
              </div>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="151">
          <div class="bi-table-cell-content">
            <div class="bi-list-task-checkbox">
            </div>
            
            <div class="bi-list-node-content bi-list-node-content-checked">
              <div class="bi-unstyle bi-dnd" data-key="154">
                <span data-key="155">console</span>
              </div>
            </div>
            
            <div class="bi-list-node-content bi-list-node-content-checked">
              <div class="bi-unstyle bi-dnd" data-key="157">
                <span data-key="158">network</span>
              </div>
            </div>
            
            <div class="bi-list-node-content bi-list-node-content-checked">
              <div class="bi-unstyle bi-dnd" data-key="163">
                <span data-key="164">element</span>
              </div>
            </div>
            
            <div class="bi-list-task-checkbox">
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="168">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="183">
              console
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="185">
          <div class="bi-table-cell-content">
            <div class="bi-table-cell-content">
              
                console
              
              
              
                network
              
            </div>
          </div>
          
          <div class="bi-table-cell-content">
            <div class="bi-list-node-content">
              <div class="bi-unstyle bi-dnd" data-key="200">
                <div class="bi-list-node-content">
                  <div class="bi-unstyle bi-dnd" data-key="92">
                    <span class="ant-checkbox"><span data-key="110">proxy</span></span>
                  </div>
                  
                  <div class="bi-unstyle bi-dnd" data-key="92">
                    <span data-key="93">element</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="202">
          <div class="bi-table-cell-content">
            <div class="bi-table-cell-content">
              <div class="bi-list-task-checkbox">
                <label class="ant-checkbox-wrapper"><span class="ant-checkbox ant-checkbox-checked">c</span></label>onsole
              </div>
            </div>
          </div>
          
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="217">
              <div class="bi-list-task-checkbox">
                network
              </div>
              
              <div class="bi-list-node-content">
                <div class="bi-unstyle bi-dnd" data-key="92">
                  <span class="ant-checkbox"><span data-key="110">proxy</span></span>
                </div>
                
                <div class="bi-unstyle bi-dnd" data-key="92">
                  <span data-key="93">element</span>
                </div>
                
                <div class="bi-unstyle bi-dnd" data-key="92">
                  <span data-key="93">jsdebug</span>
                </div>
              </div>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="219">
          <div class="bi-table-cell-content">
            <div class="bi-table-cell-content">
              <div class="bi-list-task-checkbox">
                <label class="ant-checkbox-wrapper"><span class="ant-checkbox ant-checkbox-checked">c</span></label>onsole
              </div>
            </div>
          </div>
          
          <div class="bi-table-cell-content">
            <div class="bi-list-node-content bi-list-node-content-checked">
              <div class="bi-unstyle bi-dnd" data-key="234">
                <div class="bi-table-cell-content">
                  <div class="bi-unstyle bi-dnd" data-key="217">
                    <div class="bi-list-task-checkbox">
                      network
                    </div>
                    
                    <div class="bi-list-task-checkbox">
                    </div>
                    
                    <div class="bi-list-node-content">
                      <div class="bi-unstyle bi-dnd" data-key="92">
                        <span data-key="93">element</span>
                      </div>
                      
                      <div class="bi-unstyle bi-dnd" data-key="92">
                        <span data-key="93">jsdebug</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="236">
          <div class="bi-table-cell-content">
            <div class="bi-table-cell-content">
              
                <label class="ant-checkbox-wrapper"><span class="ant-checkbox ant-checkbox-checked">c</span></label>onsole
              
            </div>
          </div>
          
          <div class="bi-table-cell-content">
            <div class="bi-list-node-content bi-list-node-content-checked">
              <div class="bi-unstyle bi-dnd" data-key="251">
                <div class="bi-table-cell-content">
                  <div class="bi-list-node-content bi-list-node-content-checked">
                    <div class="bi-unstyle bi-dnd" data-key="234">
                      <div class="bi-table-cell-content">
                        <div class="bi-unstyle bi-dnd" data-key="217">
                          <div class="bi-list-task-checkbox">
                            network
                          </div>
                          
                          <div class="bi-list-task-checkbox">
                          </div>
                          
                          <div class="bi-list-node-content">
                            <div class="bi-unstyle bi-dnd" data-key="92">
                              <span data-key="93">element</span>
                            </div>
                            
                            <div class="bi-unstyle bi-dnd" data-key="92">
                              <span data-key="93">jsdebug</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="253">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="254">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="255">
              <span data-key="256">使用方法</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="257">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="258">
              <span class="bi-link" data-key="260"><span class="bi-link-content"><span data-key="261">链接</span></span></span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="263">
              <span data-key="264">插入js脚本</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="265">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="266">
              <span class="bi-link" data-key="268"><span class="bi-link-content"><span data-key="269">链接</span></span></span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="271">
              <span data-key="272">配置代理</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="273">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="274">
              <span class="bi-link" data-key="276"><span class="bi-link-content"><span data-key="277">链接</span></span></span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="279">
              <span data-key="280">配置代理（代理自动插入脚本）</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="281">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="282">
              <span class="bi-link" data-key="284"><span class="bi-link-content"><span data-key="285">链接</span></span></span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="287">
              <span data-key="288">插入js脚本</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="289">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="290">
              <span class="bi-link" data-key="292"><span class="bi-link-content"><span data-key="293">链接</span></span></span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="295">
              <span data-key="296">插入js脚本</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="297">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="298">
              <span class="bi-link" data-key="300"><span class="bi-link-content"><span data-key="301">链接</span></span></span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="303">
              <span data-key="304">插入js脚本</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="305">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="306">
              <span class="bi-link" data-key="308"><span class="bi-link-content"><span data-key="309">链接</span></span></span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="311">
              <span data-key="312">配置代理（代理自动插入脚本）</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="313">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="314">
              <span class="bi-link" data-key="316"><span class="bi-link-content"><span data-key="317">链接</span></span></span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="319">
              <span data-key="320">托管应用，代理自动插入脚本</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="321">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="322">
              <span class="bi-link" data-key="324"><span class="bi-link-content"><span data-key="325">链接</span></span></span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="327">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="328">
              <span class="bi-link" data-key="330"><span class="bi-link-content"><span data-key="331">链接</span></span></span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="333">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="334">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="335">
              <span data-key="336">开源</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="337">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="338">
              <span data-key="339">开源（不维护）</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="340">
              <span data-key="341">repo</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="342">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="343">
              <span data-key="344">开源</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="345">
              <span class="bi-link" data-key="347"><span class="bi-link-content"><span data-key="348">repo</span></span></span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="350">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="351">
              <span data-key="352">开源</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="353">
              <span class="bi-link" data-key="355"><span class="bi-link-content"><span data-key="356">repo</span></span></span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="358">
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="360">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="361">
              <span data-key="362">开源</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="363">
              <span class="bi-link" data-key="365"><span class="bi-link-content"><span data-key="366">repo</span></span></span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="368">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="369">
              <span data-key="370">开源</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="371">
              <span class="bi-link" data-key="373"><span class="bi-link-content"><span data-key="374">repo</span></span></span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="376">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="377">
              <span data-key="378">开源</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="379">
              <span class="bi-link" data-key="381"><span class="bi-link-content"><span data-key="382">repo</span></span></span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="384">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="385">
              <span data-key="386">开源</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="387">
              <span class="bi-link" data-key="389"><span class="bi-link-content"><span data-key="390">repo</span></span></span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="392">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="393">
              <span data-key="394">收费</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="395">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="396">
              <span data-key="397">开源</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="398">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="399">
              <span data-key="400">开源</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="401">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="402">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="403">
              <span data-key="404">零配置扫码调试</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="405">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="406">
              <span data-key="407">支持</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="408">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="409">
              <span data-key="410">不</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="411">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="412">
              <span data-key="413">不</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="414">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="415">
              <span data-key="416">支持</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="417">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="418">
              <span data-key="419">支持</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="420">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="421">
              <span data-key="422">支持</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="423">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="424">
              <span data-key="425">不</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="426">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="427">
              <span data-key="428">支持（server中转）</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="429">
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="431">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="432">
              <span data-key="433">支持（server中转）</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="434">
              <span data-key="435">ios：debug JS remote基于JavaScriptCore（</span><a href="https://www.devmeng.com/2016/06/23/ReactNative-Dive-into-Debugging/"><span class="bi-link" data-key="436"><span class="bi-link-content"><span data-key="437">参考</span></span></span></a><span data-key="438">）</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="439">
              <span data-key="440">android：基于stetho（</span><a href="https://facebook.github.io/react-native/docs/debugging.html"><span class="bi-link" data-key="441"><span class="bi-link-content"><span data-key="442">参考</span></span></span></a><span data-key="443">）</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="444">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="445">
              <span data-key="446">支持（server中转）</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="447">
              <span data-key="448">ios基于xx</span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="449">
              <span data-key="450">android基于xx</span>
            </div>
          </div>
        </td>
      </tr>
    </table>
    
    <div class="bi-table-shadow bi-table-shadow-right">
    </div>
  </div>
</div>

<div class="bi-unstyle bi-dnd" data-key="451">
  <span data-key="452">开销：</span>
</div>


 <div class="bi-list-node-content">
      <div class="bi-unstyle bi-dnd" data-key="455">
        <span data-key="456">几乎所有的调试框架都需要注入JS代码实现，因为要收集DOM和CSS，需要处理console信息。比较好的方式是通过代理自动注入js代码。</span>
      </div>
    </div>


<div class="bi-unstyle bi-dnd" data-key="457">
</div>

<h3 class="bi-unstyle bi-dnd" data-key="459">
  基于原生系统支持的调试方法
</h3>

<div class="bi-unstyle bi-dnd" data-key="459">
</div>

<div class="bi-unstyle bi-dnd" data-key="463">
  <span data-key="464">原生系统支持的调试方法需要首先确认权限问题，所以需要首次连接USB数据线。</span>
</div>


 <div class="bi-list-node-content">
      <div class="bi-unstyle bi-dnd" data-key="467">
        <span data-key="468">IOS可以在后期保持wifi链接调试。</span>
      </div>
    </div>
  
 <div class="bi-list-node-content">
      <div class="bi-unstyle bi-dnd" data-key="470">
        <span data-key="471">Android手机重启后需要再次链接数据线开启tcp调试端口。</span>
      </div>

      <div class="bi-unstyle bi-dnd" data-key="470">
      </div>
    </div>


<div class="bi-table">
  <div class="bi-table-content-outer">
    <table class="bi-table-content">
      <colgroup> <col width="96px" /> <col width="293px" /> <col width="360px" /></colgroup> <tr class="bi-table-row" data-key="473">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="474">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="475">
              <span data-key="476">能力\机型</span>
            </div>
          </div>
        </td>

        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="477">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="478">
              <span data-key="479">Android （Debug包）</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="480">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="481">
              <span data-key="482">IOS （debug包）</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="483">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="484">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="485">
              <span data-key="486">局限</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="487">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="488">
              <span data-key="489">需要首次链接USB开启wifi调试</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="490">
          <div class="bi-table-cell-content">
            <div class="bi-table-cell-content">
              <div class="bi-unstyle bi-dnd" data-key="491">
                <span data-key="492">需要首次链接USB</span>开启wifi调试
              </div>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="493">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="494">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="495">
              <span data-key="496">使用方法</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="497">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="498">
              <span class="bi-link" data-key="500"><span class="bi-link-content"><span data-key="501">链接</span></span></span>
            </div>
            
            <div class="bi-unstyle bi-dnd" data-key="498">
              <span class="bi-link" data-key="500"><span class="bi-link-content"><span data-key="501">基于数据线连接，然后可以开启adb over wifi</span></span></span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="503">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="504">
              <span class="bi-link" data-key="506"><span class="bi-link-content"><span data-key="507">链接</span></span></span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="509">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="510">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="511">
              <span data-key="512">原理</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="513">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="514">
              <span data-key="515">Android 4.4以上webview可以配置调试模式，会开启调试unix domain socket（基于Chrome Devtools Protocol），</span><span class="bi-link" data-key="516"><span class="bi-link-content"><span data-key="517">链接</span></span></span><span data-key="518">，可以对接Chrome Devtools 调试</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="519">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="520">
              <span data-key="521">开启safari的web inspector 即可，基于ios web调试协议，配合Safari调试，也可以基于remotedebug-ios-webkit-adapter项目把调试协议转成Chrome Devtools Protocol，使用Chrome Devtools调试</span>
            </div>
          </div>
        </td>
      </tr>
    </table>
    
    <div class="bi-table-shadow bi-table-shadow-right">
    </div>
  </div>
</div>

<h2 id="1" class="bi-heading bi-heading-two bi-dnd" data-key="522" data-id="rzbgcx">
  <span data-key="523">AnyDebugger方案</span>



<div class="bi-unstyle bi-dnd" data-key="524">
  <span data-key="525">AnyDebugger方案是支持零配置扫码调试的方案，实现Chrome Devtools Protocol，直接基于Chrome Devtools调试页面。</span>
</div>

<div class="bi-dnd-menu bi-dnd-menu-active" draggable="true">
  <div class="bi-dnd-menu-trigger">
  </div>
</div>

<div class="bi-table">
  <div class="bi-table-content-outer">
    <h3 class="bi-table-shadow bi-table-shadow-right">
      方案介绍
    </h3>

    <div class="bi-table-shadow bi-table-shadow-right">
    </div>
  </div>
</div>

<div class="bi-unstyle bi-dnd" data-key="657">
  <span data-key="658">目前通用的web调试框架是在页面插入inspector脚本，然后基于自有通讯协议，在自有的server调试页面上展示获取的调试信息，扩展和通用性较弱。Hybrid APP的调试是基于Android或者ios的调试协议的客户端实现。</span>
</div>

<div class="bi-unstyle bi-dnd" data-key="659">
</div>

<div class="bi-unstyle bi-dnd" data-key="661">
  <span data-key="662">AnyDebugger的不同之处是用JS实现Chrome Devtools Protocol，通过AnyDebugger服务端桥接到Chrome Devtools 上实现远程调试。</span>
</div>

<div class="bi-unstyle bi-dnd" data-key="663">
  <div class="bi-void" data-key="665" data-id="e4cwou">
    <div class="bi-image-content bi-image-content-isvalid">
      <div class="bi-image-detail">
        <div class="bi-dnd-menu bi-dnd-menu-active" draggable="true">
          <div class="bi-dnd-menu-trigger">
          </div>
        </div>

        <div class="bi-image-meta">
          <img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/blog/1532511610907-1edb5517-3135-43ff-a570-2cf75a5aa506.png" width="796" height="311" />
        </div>
      </div>
    </div>
  </div>
</div>

<div class="bi-unstyle bi-dnd" data-key="669">
  <div class="bi-void" data-key="671" data-id="gn2ekr">
    <div class="bi-image-content bi-image-content-isvalid">
      <div class="bi-image-detail">
        <div class="bi-image-meta">
          <img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/blog/1532675270047-f465e6cd-cb75-496a-8bb7-bef7afababcb.png" width="744" height="1296" />
        </div>
      </div>
    </div>
  </div>
</div>

<div class="bi-dnd-menu bi-dnd-menu-active" draggable="true">
  <div class="bi-dnd-menu-trigger">
  </div>
</div>

<h3 id="3" class="bi-heading bi-heading-three bi-dnd" data-key="675" data-id="61bqes">
  <span data-key="676">功能介绍</span>
</h3>

<div class="bi-unstyle bi-dnd" data-key="677">
  <span data-key="678">主要分为AnyDebugger.js和 AnyDebugger server两部分。 基于Chrom Devtools Protocol (tip of tree): </span><span class="bi-link" data-key="679"><span class="bi-link-content"><span data-key="680">https://chromedevtools.github.io/devtools-protocol/</span></span></span>
</div>

<div class="bi-dnd-menu bi-dnd-menu-active" draggable="true">
  <div class="bi-dnd-menu-trigger">
  </div>
  <div class="bi-dnd-menu-trigger">
    1. anydebugger.js功能设计
  </div>
</div>

<div class="bi-unstyle bi-dnd" data-key="684">
  <span data-key="685">注入到页面上，需要在最先出加载，以便捕捉数据。功能点和流程图如下：</span>
</div>

<div class="bi-table">
  <div class="bi-table-content-outer">
    <table class="bi-table-content">
      <colgroup> <col width="213px" /> <col width="537px" /></colgroup> <tr class="bi-table-row" data-key="687">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="688">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="689">
              <span data-key="690">anydebugger.js功能点</span>
            </div>
          </div>
        </td>

        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="691">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="692">
              <span data-key="693">说明</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="694">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="695">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="696">
              <span data-key="697">向服务端注册页面</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="698">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="699">
              <span data-key="700">注册页面，服务端生成对应的websocket channel</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="701">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="702">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="703">
              <span data-key="704">websocket链接到服务端</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="705">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="706">
              <span data-key="707">将初始化的数据收集，发送到服务端，服务端会先缓存，等chrome devtools连接到这个channel后发出</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="708">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="709">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="710">
              <span data-key="711">处理Page域请求</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="712">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="713">
              <span data-key="714">初始化页面frame， 导航刷新等功能</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="715">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="716">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="717">
              <span data-key="718">处理Runtime域请求</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="719">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="720">
              <span data-key="721">主要是运行时相关，包含console的重写和交互处理</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="722">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="723">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="724">
              <span data-key="725">处理DOM域请求</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="726">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="727">
              <span data-key="728">主要是DOM信息维护，重新编排，DOM节点增删改查</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="729">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="730">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="731">
              <span data-key="732">处理CSS域请求</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="733">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="734">
              <span data-key="735">主要是stylesheet处理，样式解析，匹配，增删改查</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="736">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="737">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="738">
              <span data-key="739">处理Network域请求</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="740">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="741">
              <span data-key="742">主要监听网络请求和相关信息统计，可以增加对mtop请求的特殊处理</span>
            </div>
          </div>
        </td>
      </tr>
    </table>
    
    <div class="bi-table-shadow bi-table-shadow-left">
    </div>
    
    <div class="bi-table-shadow bi-table-shadow-right">
      2. anyDebugger server功能设计
    </div>
  </div>
</div>

<div class="bi-unstyle bi-dnd" data-key="747">
  <span data-key="748">主要负责桥接 websocket， 维护页面信息，维护anydebugger.js的连接 和 Chrome Devtools的连接。功能点和流程图如下：</span>
</div>

<div class="bi-unstyle bi-dnd" data-key="749">
</div>

<div class="bi-table">
  <div class="bi-table-content-outer">
    <table class="bi-table-content">
      <colgroup> <col width="214px" /> <col width="536px" /></colgroup> <tr class="bi-table-row" data-key="752">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="753">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="754">
              <span data-key="755">anydebugger server功能点</span>
            </div>
          </div>
        </td>

        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="756">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="757">
              <span data-key="758">说明（简化功能，page页面保留在内存数据中）</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="759">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="760">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="761">
              <span data-key="762">功能主页</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="763">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="764">
              <span data-key="765">提供调试页面入口，可以搜索已经注册的页面</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="766">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="767">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="768">
              <span data-key="769">调试功能页面</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="770">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="771">
              <span data-key="772">不用开发，基于</span><span class="bi-link" data-key="773"><span class="bi-link-content"><span data-key="774">ChromeDevTools/devtools-frontend</span></span></span><span data-key="775"> 项目</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="776">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="777">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="778">
              <span data-key="779">API - /register</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="780">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="781">
              <span data-key="782">注册页面接口</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="783">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="784">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="785">
              <span data-key="786">API - /json</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="787">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="788">
              <span data-key="789">列出可以inspect的页面信息，兼容Chrome Devtools inspect 协议</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="790">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="791">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="792">
              <span data-key="793">client web socket</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="794">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="795">
              <span data-key="796">链接anydebugger.js 的websocket</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="797">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="798">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="799">
              <span data-key="800">devtools web socket</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="801">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="802">
              <span data-key="803">链接 Chrome Devtools的websocket</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="804">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="805">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="806">
              <span data-key="807">anydebug web page socket</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="808">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="809">
              <span data-key="810">anydebug入口页面获取可调式页面信息，打开调试页面</span>
            </div>
          </div>
        </td>
      </tr>
    </table>
    
    <div class="bi-table-shadow bi-table-shadow-right">
    </div>
    
    <div class="bi-table-shadow bi-table-shadow-right">
      3. MOCK功能设计
    </div>
  </div>
</div>

<div class="bi-unstyle bi-dnd" data-key="815">
  <span data-key="816">mock功能基于重写mtop request请求实现，基于API匹配规则，匹配的请求走到给定的mock数据。</span>
</div>

<div class="bi-unstyle bi-dnd" data-key="817">
</div>

<div class="bi-table">
  <div class="bi-table-content-outer">
    <table class="bi-table-content">
      <colgroup> <col width="292px" /> <col width="458px" /></colgroup> <tr class="bi-table-row" data-key="820">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="821">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="822">
              <span data-key="823">mock功能点</span>
            </div>
          </div>
        </td>

        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="824">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="825">
              <span data-key="826">说明</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="827">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="828">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="829">
              <span data-key="830">重写request请求</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="831">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="832">
              <span data-key="833">增加hook函数，并统计接口相关信息，入参，返回值，cookie等</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="834">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="835">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="836">
              <span data-key="837">提供mock数据钩子函数，用于匹配mock规则，mock数据</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="838">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="839">
              <span data-key="840">根据mock数据配置，匹配的接口直接走mock数据，否则走正常请求。</span>
            </div>
          </div>
        </td>
      </tr>
      
      <tr class="bi-table-row" data-key="841">
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="842">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="843">
              <span data-key="844">请求信息统计，用于连接anyDebugger的network统计请求数据</span>
            </div>
          </div>
        </td>
        
        <td class="bi-table-cell" colspan="1" rowspan="1" data-key="845">
          <div class="bi-table-cell-content">
            <div class="bi-unstyle bi-dnd" data-key="846">
              <span data-key="847">将请求参数，cookie，请求返回值等通过chrome devtools protocol回传，用于接口调试</span>
            </div>
          </div>
        </td>
      </tr>
    </table>
    
    <div class="bi-table-shadow bi-table-shadow-right">
    </div>
    
    <div class="bi-table-shadow bi-table-shadow-right">
      4. 功能结构图
    </div>
    
    <div class="bi-table-shadow bi-table-shadow-right">
    </div>
  </div>
</div>

<div class="bi-unstyle bi-dnd" data-key="852">
  <span data-key="853">anydebugger的功能结构主要包含：webview层面，socketserver+webserver层面，Chrome devtools层面。</span>
</div>

<div class="bi-unstyle bi-dnd" data-key="856">
  <div class="bi-void" data-key="858" data-id="9r0ehv">
    <div class="bi-image-content bi-image-content-isvalid">
      <div class="bi-image-detail">
        <div class="bi-dnd-menu bi-dnd-menu-active" draggable="true">
          <div class="bi-dnd-menu-trigger">
          </div>
        </div>

        <div class="bi-image-meta">
          <img loading="lazy" class="aligncenter" src="https://haomou.oss-cn-beijing.aliyuncs.com/blog/1533990765227-b9500392-2ad2-4dd1-8540-ecdd163ae2a1.jpeg" width="689" height="454" />
        </div>
      </div>
    </div>
  </div>
</div>

<h2 id="4" class="bi-heading bi-heading-four bi-dnd" data-key="864" data-id="cgdbmg">
  <span data-key="865">业务接入</span>



接入参考github：[anydebugger][1]

<div data-key="1018">
  ```
npm install anydebugger -g

anydebugger -v //see version

anydebugger //start debug

anydebugger -p 9000 //start debug
```
</div>

<audio style="display: none;" controls="controls"></audio>

 [1]: https://github.com/chalecao/anydebugger/
