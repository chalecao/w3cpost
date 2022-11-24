!function(){"use strict";function t(){return(t=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function e(t,e){if("boolean"==typeof t.success)return t.success;if("boolean"==typeof t.status)return t.status;if("number"==typeof e&&200!==e)return!1;if("number"==typeof t.code)return 2e3===t.code||200===t.code;if("number"==typeof t.status)return 200===t.status;if("string"==typeof t.message)return"success"===t.message;if(void 0!==t.ret){var n=t.ret;return n instanceof Array&&(n=n.join(",")),n.match("SUCCESS")}return!0}var n={parseResponse:function(t,n){var o=t;if("string"==typeof o&&t)try{o=JSON.parse(t)}catch(t){console.log(t)}if("object"!=typeof o)return{};var r=o.code||"",i=o.message||o.msg||"";if(o.ret){var a=o.ret;a instanceof Array&&(a=a.join(",")),r=a.split("::")[0],i=a}return{msg:i,code:r,success:e(o,n),body:o}},isSuccess:e,getResponseBody:function(t,e){if(e.originResponse)return t;if("jsonp"===e.method)return t.json();var n=e.headers&&e.headers.accept||"text",o=t.headers&&t.headers.get?t.headers.get("content-type"):null;return o||(o=n),-1!==o.toLowerCase().indexOf("application/json")?t.json():-1!==o.toLowerCase().indexOf("text")?t.text():t.blob()}},o={},r=function(t){return(""+(t||0)).split(".")[0]},i=r;function a(t,e){if(void 0===e&&(e=1e3),!t&&"number"!=typeof t&&"boolean"!=typeof t)return"";var n=String(t);return n.length<e?n:n.substr(0,e)+"..."}function s(t){return!window.performance||!performance[t]}function d(t){var e=location.search;return e.startsWith("?")&&(e=e.slice(1)),u(e)[t]||""}function c(t){var e="";if("object"==typeof t&&t){var n=[t.t2,t.t3].includes("custom"),o=Object.keys(t);o.forEach((function(r,i){var a=t[r]||"";a&&"string"!=typeof a&&(a=JSON.stringify(t[r])),"url"===r&&(a=encodeURIComponent(encodeURIComponent(a))),["d4","d5"].includes(r)&&(a=encodeURIComponent(encodeURIComponent(a))),n&&["d1","d2","d3"].includes(r)&&(a=encodeURIComponent(encodeURIComponent(a))),e+=r+"="+a,o.length-1!==i&&(e+="&")}))}return e}function u(t){var e=t.split("&"),n={};return e.forEach((function(t){var e=t.split("=");e.length>1&&(n[e[0]]=e[1])})),n}function l(){var t=document.getElementById("render-jklog"),e={};if(t){var n=t.getAttribute("exparams");n&&(e=u(n))}return e.root?decodeURIComponent(e.root):""}function f(t){"complete"===document.readyState?t():window.addEventListener("load",t)}function p(t,e){window.requestIdleCallback?requestIdleCallback(t,{timeout:e||500}):setTimeout(t,0)}var w=function(t){return t.slice(0,3).reverse().filter((function(t){return t!==window&&t!==document})).map((function(t){return t.id?"#"+t.id:t.className&&"string"==typeof t.className?"."+t.className.split(" ").filter((function(t){return!!t})).join("."):t.nodeName})).join(" ")};function v(t){if(!t)return"";if("[object Array]"===Object.prototype.toString.apply(t))return w(t);for(var e=[],n=t;n&&e.length<3;)e.push(n),n=n.parentNode;return w(e)}var g=[],h={touchstart:"click",mousedown:"click",scroll:"scroll"},m=["scroll"];function y(){return g[g.length-1]}"ontouchend"in document?m.push("touchstart"):m.push("mousedown"),m.forEach((function(t){document.addEventListener(t,(function(e){"scroll"!==t?(g.push(e),g.length>15&&g.shift(),window.JKLOG_ENABLE_BHV&&function(t,e){void 0===e&&(e="click");_(t,h[e])}(e,t)):window.JKLOG_ENABLE_BHV&&function(t){if(!L){var e,n=(null==t||null==(e=t.target)?void 0:e.scrollingElement)||(null==t?void 0:t.target)||{};b={scrollLeft:n.scrollLeft,scrollTop:n.scrollTop,time:Date.now()}}clearTimeout(L),L=setTimeout((function(){var e,n=(null==t||null==(e=t.target)?void 0:e.scrollingElement)||(null==t?void 0:t.target)||{},o=n.scrollLeft,r=n.scrollTop,i="",a=0,s=0;r<b.scrollTop?(i="scroll-down",a=b.scrollTop,s=b.scrollTop-r):r>b.scrollTop?(i="scroll-up",a=b.scrollTop,s=r-b.scrollTop):o<b.scrollLeft?(i="scroll-right",a=b.scrollLeft,s=b.scrollLeft-o):o>b.scrollLeft&&(i="scroll-left",a=b.scrollLeft,s=o-b.scrollLeft);var d=Date.now()-b.time;O(t,i,a,s,d,b.time),L=null}),1500)}(e)}),{capture:!0,passive:!0})}));var L=null,b={},O=function(){};var _=function(){};var E={};function T(t){var e,n,o,r="";if(E||(E={}),!E[t]){n=new RegExp(t+"=([^;]+)");try{r=document.cookie}catch(t){}(o=n.exec(r))&&(E[t]=o[1])}return null!=(e=E[t])?e:""}var S=document.getElementById("jk-log"),J="w3cdoc",G="w3cdoc",x="cn-hangzhou.log.aliyuncs.com",k="",K="";S&&(J=S.getAttribute("data-project")||J,G=S.getAttribute("data-logstore")||G,x=S.getAttribute("data-host")||x,k=S.getAttribute("data-cdn")||"",K=S.getAttribute("data-track")||"");var A="",q="",R="",I=function(){function t(){K?A=q=K:q="//"+J+"."+x+(A="/logstores/"+G+"/track?APIVersion=0.6.0"),R=k?A:q,this.params_=[],this.httpRequest_=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):window.XMLHttpRequest?new XMLHttpRequest:void 0,this.httpRequest_.timeout=3e3}var e=t.prototype;return e.switchLogUrl=function(){R=R===q?A:q},e.push=function(t,e){t&&e&&(this.params_.push(t),this.params_.push(e))},e.checkNetWork=function(){this.httpRequest_.onerror=function(){},this.httpRequest_.open("OPTIONS",R,!0),this.httpRequest_.send(null)},e.logger=function(t,e){if(void 0===e&&(e={}),!window.JKLOG_DISABLE_TRACK){for(var n=R,o=0;this.params_.length>0;){var r=this.params_.shift();n+=o%2==0?"&"+encodeURIComponent(r):"="+encodeURIComponent(r),++o}this.sendGoldLog(c(e),"POST",e.t2),this.params_=[];try{this.httpRequest_.open("GET",n,!0),this.httpRequest_.onerror=function(e){t&&t()},this.httpRequest_.ontimeout=function(e){t&&t()},this.httpRequest_.onload=function(){this.status>=200&&this.status<=300||304===this.status||t&&t()},this.httpRequest_.send(null)}catch(t){console.log(t)}}},e.loggerp=function(t,e,n,o){var r;if((void 0===o&&(o=!1),!window.JKLOG_DISABLE_TRACK)&&(t&&!(t.length<1)))try{var i="";if(i=K?JSON.stringify({createDate:(r=new Date,r.getFullYear()+"-"+(r.getMonth()+1)+"-"+r.getDate()+" "+r.getHours()+":"+r.getMinutes()+":"+r.getSeconds()),logType:1,device:"PC",region:"",tag:"",ua:navigator.userAgent,data:JSON.stringify(t)}):JSON.stringify({__logs__:t}),this.sendBatchGoldLog(t),o){if(navigator.sendBeacon)new Blob([i],{type:"application/json",mode:"cors"});window.fetch&&fetch(R.split("?")[0],{method:"POST",body:i,headers:{"x-log-apiversion":"0.6.0","x-log-bodyrawsize":i.length,"Content-Type":"application/json;charset=UTF-8"},keepalive:!0}).catch((function(t){e&&e()}))}else this.httpRequest_.open("POST",R.split("?")[0],!0),this.httpRequest_.setRequestHeader("Content-Type","application/json;charset=UTF-8"),this.httpRequest_.setRequestHeader("x-log-apiversion","0.6.0"),this.httpRequest_.setRequestHeader("x-log-bodyrawsize",i.length),this.httpRequest_.onerror=function(){n&&n()},this.httpRequest_.ontimeout=function(t){n&&n()},this.httpRequest_.onload=function(){this.status>=200&&this.status<=300||304===this.status?e&&e():n&&n()},this.httpRequest_.send(i)}catch(t){console.log(t)}},e.sendBatchGoldLog=function(t){var e=this;void 0===t&&(t=[]),t.forEach((function(t){e.sendGoldLog(c(t),"POST",t.t2)}))},e.sendGoldLog=function(t,e,n){void 0===e&&(e="POST");var o="/goldlog.main";"bhv"===n&&(o="/goldlog.bhv"),"api"===n&&(o="/goldlog.api"),(window.goldlog_queue||(window.goldlog_queue=[])).push({action:"goldlog.record",arguments:[o,"EXP",t,e]})},t}(),N=void 0!==document.hidden?{hidden:"hidden",visibilityChange:"visibilitychange"}:void 0!==document.webkitHidden?{hidden:"webkitHidden",visibilityChange:"webkitvisibilitychange"}:void 0!==document.msHidden?{hidden:"msHidden",visibilityChange:"msvisibilitychange"}:void 0,P=!!N;function j(t,e){var n;P&&document.addEventListener(N.visibilityChange,n=function(o){e&&document.removeEventListener(N.visibilityChange,n),t(!document[N.hidden])})}function M(){var t="";if(window.goldlog&&window.goldlog.spm_ab)return t=window.goldlog.spm_ab.join(".");if((t=document.querySelector('meta[name="spm-id"]')||document.querySelector('meta[name="data-spm"]'))&&(t=t.content)&&-1!==t.indexOf("."))return t;var e;return e=document.body&&document.body.getAttribute("data-spm"),t&&e?t+"."+e:""}function C(t){var e,n,o,r;return null!=t&&null!=(e=t.dataset)&&e.trackId?null==t||null==(o=t.dataset)?void 0:o.trackId:null!=t&&null!=(n=t.targetDataset)&&n.trackId?null==t||null==(r=t.targetDataset)?void 0:r.trackId:t&&t.getAttribute&&t.getAttribute("trackid")?t.getAttribute("trackid"):t?"BODY"===(null==t?void 0:t.nodeName)||document===t?"":t.parentNode?C(t.parentNode):t.getAttribute("class")||"":""}function D(t){var e,n,o,r;return null!=t&&null!=(e=t.dataset)&&e.trackParam?null==t||null==(o=t.dataset)?void 0:o.trackParam:null!=t&&null!=(n=t.targetDataset)&&n.trackParam?null==t||null==(r=t.targetDataset)?void 0:r.trackParam:t?"BODY"===(null==t?void 0:t.nodeName)||document===t?"":t.parentNode?D(t.parentNode):"":""}var B=null,H=window.JKLOG_EXP_CLS||'[data-track-type="jklog-exp"]',W=window.JKLOG_EXP_CLS_FORM_ERR||".ant-form-item-has-error, .mt-form-item-help--error, .error-tips";function X(t,e){if(void 0===t&&(t=.6),window.IntersectionObserver){B||(B=new IntersectionObserver((function(t){t.forEach((function(t){return e(t)}))}),{threshold:[t]}));var n=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;if(n)new n((function(t){t.length>0&&o()})).observe(document.body,{attributes:!0,childList:!0,characterData:!0,subtree:!0});else!function t(){setTimeout((function(){p((function(){o(),t()}))}),1e3)}()}function o(){[].forEach.call(document.querySelectorAll(".jklog-exp, "+H),(function(t){B.observe(t)})),[].forEach.call(document.querySelectorAll(W),(function(t){B.observe(t)}))}}function U(t){if(void 0===t&&(t="common"),document.elementsFromPoint){for(var e,n,o=["root","icestark-child-app","ice-layout-main","ice-layout-section","ice-layout","ice-container","body","html"],r=0,i=0,a=function(t){return t?[].join.call(t.classList,"_")+"_"+t.id+"_"+t.localName:""},s=function(t){if(t){i++;var e=a(t);o.find((function(t){return e.match(t)}))&&r++}},d=1;d<10;d++)e=document.elementsFromPoint(window.innerWidth*d/10,window.innerHeight/2),n=document.elementsFromPoint(window.innerWidth/2,window.innerHeight*d/10),s(e[0]),s(n[0]);var c=document.elementsFromPoint(window.innerWidth/2,window.innerHeight/2);i-r<2&&!window.JKLOG._sendBlank&&c[0]&&c[0].querySelectorAll("div").length<10&&(window.JKLOG.send({t1:"monitor",t2:"blank",t3:"blank",d1:a(c[0]),d2:i+"-"+r,d3:window.screen.width+"x"+window.screen.height+"_"+window.innerWidth+"x"+window.innerHeight,d4:t,d5:Date.now()-window.JKLOG.enterTime}),window.JKLOG._sendBlank=!0),c=null}}function F(){var t=g,e=0;function n(t,e){t>2&&"keydown"!==e.type&&window.JKLOG.send({t1:"bu",t2:"bhv",t3:"repeatClick",d1:v(e.path||e.target),d2:r(e.x)+"x"+r(e.y),d3:window.innerWidth+"x"+window.innerHeight,d4:t,d5:e.type})}t.forEach((function(o,r){r>0&&o.timeStamp-t[r-1].timeStamp<350?e++:(n(e,t[r-1]),e=0)})),n(e,t[t.length-1]),g=g.slice(g.length-1)}function z(t){void 0===t&&(t="leave");var e=y();return{t1:"bu",t2:"bhv",t3:"leave",d1:Date.now()-window.JKLOG.enterTime,d2:e?v(e.path||e.target):"",d3:window.innerWidth+"x"+window.innerHeight,d4:t,d5:window.scrollX+"x"+window.scrollY}}window.JKLOG={queue:[],logger:new I,enterTime:Date.now(),AB:"",config:""};var Y=window.JKLOG,V="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)})),Z="";try{Z=T("jklogsid"),document.cookie="jklogsid="+V+"; expires=Thu, 18 Dec 2099 12:00:00 GMT; path=/"}catch(at){}var $=function(){var e=function(){var t=T("tracknick"),e=T("an"),n=T("emplId")||T("WORK_EMPID");return{nickname:t||""+e+n,cna:T("cna"),unb:T("unb")||T("munb")}}(),n=e.nickname,o=void 0===n?"":n,r=e.cna,i=void 0===r?"":r,a=e.unb,s=void 0===a?"":a;return t({psid:Z,url:location.href,ts:Date.now(),logts:Date.now()-Y.enterTime,user:o||i,cna:i,unb:s,ua:navigator.userAgent.replace(/ /g,""),spm:M(),env:location.hostname,sid:V,ab:Y.AB,assets:l()},function(){var t=document.getElementById("render-jklog");if(t){var e=t.dataset,n=e.ingl,o=void 0===n?"":n,r=e.inmgl;return{ingl:o,inmgl:void 0===r?"":r}}return{ingl:"",inmgl:""}}(),{ext:Y.config})};Y.setAB=function(t){if(t.appCode&&t.expId&&t.bucket)try{var e=JSON.stringify(t);Y.AB=e}catch(t){}},Y.setConfig=function(e,n){void 0===n&&(n=!1);var o={};try{e&&"object"==typeof e&&(o=n?t({},o=Y.config?JSON.parse(Y.config):{},e):t({},e)),Y.config=JSON.stringify(o)}catch(t){}};var Q=function(e){if(e){var n=t({},$(),e);Object.keys(n).forEach((function(t){Y.logger.push(t,String(n[t]))})),Y.logger.logger((function(){ot(e)}),n)}},tt=function(t,e,n){if(Y.queue.length||t&&t(),window.JKLOG_DISABLE_UPLOAD_LOG)Y.queue=[],t&&t();else{var o=Y.queue||[];Y.queue=[],Y.logger.loggerp(o,(function(){t&&t()}),(function(){Y.queue=o.concat(Y.queue),e&&e()}),n)}},et=850,nt=0;f((function(){!function t(){setTimeout((function(){Y.queue.length>0?p((function(){nt=setTimeout((function(){Y.queue.length>0&&t()}),5e3),tt((function(){et=850,clearTimeout(nt),t()}),(function(){et<12e3?et+=4e3:Y.queue=[],clearTimeout(nt),t()}))})):t()}),et)}(),function t(){setTimeout((function(){try{U(),F(),t()}catch(t){}}),3e3)}(),j((function(t){var e;t?(void 0===e&&(e="resume"),window.JKLOG.send({t1:"bu",t2:"bhv",t3:"switch",d1:"",d2:"",d3:"",d4:e,d5:""})):(console.log("leave page send JKLOG"),ot(z("hidden")),tt(null,(function(){console.log("watchPageVisiblityChange not support fetch keepalive")}),!0),U("hidden"))})),window.addEventListener("beforeunload",(function(){ot(z()),tt(null,(function(){console.log("beforeunload not support fetch keepalive"),Q(z())}),!0)}))}));var ot=function(e){Y.queue.length>=100&&Y.queue.shift();var n=t({},$(),e);Object.keys(n).forEach((function(t){n[t]=String(n[t])})),Y.queue.push(n)};function rt(){try{var t=new PerformanceObserver((function(t){t.getEntries().forEach((function(t){if(t.sources&&t.value>.1){var e=t.sources[0]?v(t.sources[0].node):"",n=t.sources[1]?v(t.sources[1].node):"",o=t.sources[2]?v(t.sources[2].node):"";window.JKLOG.send({t1:"exp",t2:"fe",t3:"cls",d1:r(t.startTime),d2:parseFloat(t.value).toFixed(4),d3:e,d4:n,d5:o})}}))}));try{t.observe({type:"layout-shift",buffered:!0})}catch(e){t.observe({entryTypes:["layout-shift"]})}j((function(e){!e&&t?t.disconnect():p((function(){try{t.observe({type:"layout-shift",buffered:!0})}catch(e){t.observe({entryTypes:["layout-shift"]})}}),50)}))}catch(t){}}Y.send=function(t,e){e?Q(t):ot(t)};function it(){if(window.PerformanceEventTiming)try{var t=new PerformanceObserver((function(t){var e=t.getEntries().filter((function(t){return t.processingEnd-t.processingStart>1})).sort((function(t,e){return e.processingEnd-e.processingStart-(t.processingEnd-t.processingStart)}))[0];if(e&&(e.duration>100||e.processingStart-e.startTime>50)){var n=y();p((function(){window.JKLOG.send({t1:"exp",t2:"eventTiming",t3:e.name,d1:r(e.processingStart-e.startTime),d2:r(e.duration),d3:n?v(n.path||n.target):"",d4:r(e.processingEnd-e.processingStart)})}))}}));try{t.observe({type:"event",buffered:!0})}catch(e){t.observe({entryTypes:["event"]})}j((function(e){e?p((function(){try{t.observe({type:"event",buffered:!0})}catch(e){t.observe({entryTypes:["event"]})}}),50):t.disconnect()}))}catch(t){}}var at,st,dt,ct,ut=function(t,e){return{name:t,value:void 0===e?-1:e,delta:0,entries:[],id:"v2-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)}},lt=function(t,e){var n=function n(o){"pagehide"!==o.type&&"hidden"!==document.visibilityState||(t(o),e&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},ft=function(t){addEventListener("pageshow",(function(e){e.persisted&&t(e)}),!0)},pt=function(t,e,n){var o;return function(r){e.value>=0&&(r||n)&&(e.delta=e.value-(o||0),(e.delta||void 0===o)&&(o=e.value,t(e)))}},wt=-1,vt=function(){return"hidden"===document.visibilityState?0:1/0},gt=function(){lt((function(t){var e=t.timeStamp;wt=e}),!0)},ht=function(){return wt<0&&(wt=vt(),gt(),ft((function(){setTimeout((function(){wt=vt(),gt()}),0)}))),{get firstHiddenTime(){return wt}}},mt={passive:!0,capture:!0},yt=new Date,Lt=function(t,e){at||(at=e,st=t,dt=new Date,_t(removeEventListener),bt())},bt=function(){if(st>=0&&st<dt-yt){var t={entryType:"first-input",name:at.type,target:at.target,cancelable:at.cancelable,startTime:at.timeStamp,processingStart:at.timeStamp+st};ct.forEach((function(e){e(t)})),ct=[]}},Ot=function(t){if(t.cancelable){var e=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,e){var n=function(){Lt(t,e),r()},o=function(){r()},r=function(){removeEventListener("pointerup",n,mt),removeEventListener("pointercancel",o,mt)};addEventListener("pointerup",n,mt),addEventListener("pointercancel",o,mt)}(e,t):Lt(e,t)}},_t=function(t){["mousedown","keydown","touchstart","pointerdown"].forEach((function(e){return t(e,Ot,mt)}))},Et=function(t,e){var n,o=ht(),r=ut("FID"),i=function(t){t.startTime<o.firstHiddenTime&&(r.value=t.processingStart-t.startTime,r.entries.push(t),n(!0))},a=function(t,e){try{if(PerformanceObserver.supportedEntryTypes.includes(t)){if("first-input"===t&&!("PerformanceEventTiming"in self))return;var n=new PerformanceObserver((function(t){return t.getEntries().map(e)}));return n.observe({type:t,buffered:!0}),n}}catch(t){}}("first-input",i);n=pt(t,r,e),a&&lt((function(){a.takeRecords().map(i),a.disconnect()}),!0),a&&ft((function(){var o;r=ut("FID"),n=pt(t,r,e),ct=[],st=-1,at=null,_t(addEventListener),o=i,ct.push(o),bt()}))};function Tt(){Et((function(t){var e,n=(null==(e=t.entries[0])?void 0:e.duration)||0,o=parseInt(t.value,10);try{window.JKLOG.send({t1:"exp",t2:"fid",t3:"",d1:o,d2:n})}catch(t){}}))}function St(){if(s("getEntriesByName"))return{fp:0,fcp:0};var t=performance.getEntriesByName("first-paint")[0],e=performance.getEntriesByName("first-contentful-paint")[0];return{fp:r(t&&t.startTime),fcp:r(e&&e.startTime)}}function Jt(){try{var t=new PerformanceObserver((function(e){t&&t.disconnect(),e.getEntries().forEach((function(t){window.JKLOG.send({t1:"exp",t2:"fe",t3:"lcp",d1:r(t.startTime),d2:t.size,d3:v(t.element)})}))}));try{t.observe({type:"largest-contentful-paint",buffered:!0})}catch(e){t.observe({entryTypes:["largest-contentful-paint"]})}j((function(e){!e&&t&&t.disconnect()}))}catch(t){}}var Gt=window.JKLOG_LIMIT_RES_SIZE||3e5,xt=window.JKLOG_LIMIT_RES_TIME||300;function kt(){var t,e,n,o,i,a=0,d=1,c=performance&&performance.timing,u=c&&c.navigationStart,l=!(!u||!MutationObserver),f=!l,p=function(){return Date.now()-u};!function c(){l&&!f&&(n=p(),t||(t=e=n),a=setTimeout((function(){if(o=p(),(i=o-n)-d<10?d<16?d*=2:d<25?d+=1:d=25:i>50&&(d=Math.max(1,d/2)),o-n>50&&(e=o),o-e>1e3||o>1e5){var t=St(),u=t.fp,l=t.fcp;window.JKLOG.send({t1:"exp",t2:"fe",t3:"tti",d1:u,d2:l,d3:e}),function(){if(!s("getEntries")){var t=performance.getEntries();t.length&&t.forEach((function(t){var e=t.entryType,n=t.name,o=t.duration,i=t.transferSize,a=t.decodedBodySize,s=t.requestStart,d=t.connectStart,c=t.responseStart,u=t.responseEnd,l=t.fetchStart;(window.JKLOG_ENTRIES_ALL||i>Gt||o>xt)&&window.JKLOG.send({t1:"exp",t2:"entries",t3:n,d1:e+"-"+i+"-"+a,d2:r(d-l),d3:r(s-d),d4:r(c-s),d5:r(u-c)})}))}}(),clearTimeout(a)}else if(e>1e4){var f=St(),w=f.fp,v=f.fcp;window.JKLOG.send({t1:"exp",t2:"fe",t3:"tti",d1:w,d2:v,d3:10500}),clearTimeout(a)}else c()}),d))}()}var Kt=Number.MAX_VALUE;try{if(EventTarget){var At=EventTarget.prototype.addEventListener;EventTarget.prototype.addEventListener=function(t,e,n){return At.call(this,t,e,n)}}}catch(at){}var qt=function(t,e,n,o){void 0===n&&(n={});try{if(t.match("data:"))return;var r=n,i=r.status,a=void 0===i?"":i,s=r.code,d=void 0===s?"":s,c=r.traceId,u=void 0===c?"":c,l=r.duration,f=void 0===l?"":l,p=r.msg,w=void 0===p?"":p,v=r.body,g=void 0===v?"":v,h=r.params,m=void 0===h?"":h;g&&"object"==typeof g&&Object.keys(g).length>0&&(w=JSON.stringify(g)),g&&"string"==typeof g&&(w=g);var y=f>window.JKLOG_MAX_API_LATENCY||Math.random()<window.JKLOG_SAMPLING_API||m.jklog;if("requestSuccess"===e&&!y)return;if(/(logstores|arms|retcode|alilog)/.test(t))return;"websocket"!==n.type?window.JKLOG.send({t1:"monitor",t2:"api",t3:e,d1:t.replace(/^(https?:)?/,""),d2:f,d3:"traceId["+u+"]-http["+a+"]-code["+d+"]",d4:w||"",d5:JSON.stringify(m)}):window.JKLOG.send({t1:"monitor",t2:"ws",t3:e,d1:t.replace(/^(https?:)?/,""),d2:f,d3:"mid["+u+"]-ws["+a+"]-code["+d+"]",d4:w||"",d5:JSON.stringify(m)})}catch(t){}};function Rt(){return function(){try{return document.referrer}catch(t){}return""}()||d("spm")||d("from")}function It(){var t,e;!function(t){function e(){[].forEach.call(document.querySelectorAll("input, textarea"),(function(e){var n="",o=[];e.onfocus=function(t){n=Date.now()},e.oninput=function(t){var e,n=(null==t||null==(e=t.target)?void 0:e.value)||"";o.push(n)},e.onblur=function(e){var r=Date.now();t&&t(e,n,r,o),n=""}}))}setTimeout((function(){p(e)}),1e3)}((function(t,e,n,o){var r,i,a=null==t?void 0:t.target,s=C(a),d=v(a),c=(null==a?void 0:a.getAttribute("placeholder"))||"",u=""===(null==a?void 0:a.getAttribute("required"))?"true":"false",l=(null==a?void 0:a.getAttribute("type"))||"",f=(null==a||a.value,(null==a?void 0:a.innerText)||""),p=a.nodeName,w=(null==a||null==(r=a.dataset)?void 0:r.trackParam)||"",g=a.offsetHeight,h=a.offsetWidth;window.JKLOG.send({t1:"bu",t2:"bhv",t3:"input",d1:s||c,d2:d,d3:n-e,d4:o,d5:null==a?void 0:a.value}),window.JKLOG.send({t1:"bu",t2:"bhv",t3:"exp",d1:(null==a||null==(i=a.dataset)?void 0:i.trackId)||"",d2:d,d3:p+"_"+g+"x"+h,d4:JSON.stringify({custom:w,placeholder:c,required:u,fieldType:l}),d5:f.substr(0,20)})})),t=function(t,e,n){var o=null==t?void 0:t.target,r=C(o),i=v(o),a=(null==o?void 0:o.getAttribute("placeholder"))||"",s=D(t.target)||"";window.JKLOG.send({t1:"bu",t2:"bhv",t3:"clipboard",d1:r||a,d2:i,d3:n,d4:s,d5:e})},e=Date.now(),document.addEventListener("paste",(function(n){try{var o=Date.now()-e;navigator.clipboard.readText().then((function(e){t&&t(n,e,o)})).catch((function(e){console.warn("getClipboardText fail",e),t&&t(n,"",o)}))}catch(t){return console.warn("paste log fail",t),""}}))}try{var Nt=window.JKLOG;Nt.custom=function(t,e){Object.keys(t).length&&window.JKLOG.send({t1:t.t1||"bu",t2:t.t2||"custom",t3:t.t3,d1:a(t.d1),d2:a(t.d2),d3:a(t.d3),d4:a(t.d4),d5:a(t.d5)},!!e)};var Pt={requestSuccess:function(t,e,n){qt(t,"requestSuccess",e)},requestError:function(t,e,n){qt(t,"requestError",e)}};location.hostname.includes(".wapa");window.JKLOG_ENABLE_BHV=!0;try{window.JKLOG_DISABLE_API_INJECT||(window.JKLOG_ENABLE_APIS=[],window.JKLOG_MAX_API_LATENCY=window.JKLOG_MAX_API_LATENCY||300,window.JKLOG_SAMPLING_API=1,function(t){function e(e){var n=this.options,o=this.params,r=Date.now();return e().then((function(){var e=n.retJson.ret,i=n.retJson;e instanceof Array&&(e=e.join(","));var a,s,d,c=-1===e.indexOf("SUCCESS"),u=n.retJson.code||200,l=n.retJson.responseHeaders;if("string"==typeof l){var f=l.match(/(x-eagleeye-id|eagleeye-traceid):\s*([a-z0-9]+)/);f&&(a=f[2]);var p=l.match(/status:\s*(\d+)/);p&&(u=p[1])}if(e){var w=e.split("::");s=w[0],d=w[1]}t[c?"requestError":"requestSuccess"](o.api,{status:u,code:s,duration:Date.now()-r,msg:d,body:i,params:o.data,traceId:a,type:"mtop"})}))}window.lib=window.lib||{};var n,o=window.lib;o.mtop&&o.mtop.middlewares&&!o.mtop.ERROR?o.mtop.middlewares.push(e):Object.defineProperty(o,"mtop",{set:function(t){var o;(n=t).middlewares?-1===n.middlewares.indexOf(e)&&n.middlewares.push(e):Object.defineProperty(n,"middlewares",{set:function(t){-1===(o=t).indexOf(e)&&o.push(e)},get:function(){return o}})},get:function(){return n}})}(Pt),function(e){if("function"==typeof window.fetch){var o=window.fetch,r=function(n,o,r,i,a){var s=i;n?n.text().then((function(n){if(n)try{s=JSON.parse(n)}catch(t){s=n}e[a](o,t({},r,{params:s}))})).catch((function(){})):e[a](o,t({},r,{params:s}))};window.fetch=function(t,e){var i=1===arguments.length?[arguments[0]]:Array.apply(null,arguments);if(e&&("HEAD"===e.method||"no-cors"===e.mode))return o.apply(window,i);var a=(t&&"string"!=typeof t?t.url:t)||"";if(a.match(/\.(js|css|png|jpg|gif|jpeg|webp)(\?.*)?$/))return o.apply(window,i);if(/(logstores|arms|retcode|alilog|mmstat)/.test(a))return o.apply(window,i);var s=Date.now(),d="";return i[0]instanceof Request&&(d=i[0].clone()),o.apply(window,i).then((function(t){var o=t.clone?t.clone():t;return n.getResponseBody(o,e||{}).then((function(t){var e=Date.now()-s,c={};t&&"object"==typeof t&&(c=t);var u=o.status;c=n.parseResponse(c,u);var l="";try{l=o.headers.get("traceid")||o.headers.get("x-eagleeye-id")||o.headers.get("eagleeye-traceid")}catch(t){console.log(t)}var f={status:u,duration:e,traceId:l,code:c.code,msg:c.msg,body:c,type:"fetch"};r(d,a,f,i,c.success?"requestSuccess":"requestError")})).catch((function(){})),t}),(function(t){var e={status:401,duration:Date.now()-s,msg:t.stack||t.message,type:"fetch"};if(a.match("alihealth-fed-log"))throw new Error(t);return r(d,a,e,i,"requestError"),console.log(t),t}))}}}(Pt),function(t){if("function"==typeof window.XMLHttpRequest&&window.addEventListener){var e=window.XMLHttpRequest;window.XMLHttpRequest=function(t){var r,i,a,s=new e(t),d=s.send,c=s.open;return s.open=function(t,e){var n=1===arguments.length?[arguments[0]]:Array.apply(null,arguments);c.apply(s,n),/(logstores|arms|retcode|alilog|mmstat)/.test(i=e||"")&&(a=!0)},s.send=function(t){r=Date.now(),d.apply(s,arguments)},s.addEventListener("readystatechange",(function(t){if(!a&&i&&4===s.readyState){var e,d=Date.now()-r,c=s.status;try{var u=s.getAllResponseHeaders().match(/(traceid|x-eagleeye-id|eagleeye-traceid):\s*([a-z0-9]+)/);u&&(e=u[2])}catch(t){console.log(t)}if(s.responseType&&"text"!==s.responseType){if("blob"===s.responseType){var l=new FileReader;l.readAsText.apply(l,[s.response]),l.onloadend=function(){o(n.parseResponse(l.result,c),i,d,c,e)}}}else o(n.parseResponse(s.responseText,c),i,d,c,e)}})),s},window.XMLHttpRequest.prototype=e.prototype}function o(e,n,o,r,i){t[e.success?"requestSuccess":"requestError"](n,{status:r,duration:o,traceId:i,code:e.code,msg:e.msg,body:e,type:"xhr"})}}(Pt),window.JKLOG_API_INJECT_WEBSOCKET&&function(e){if("function"==typeof window.WebSocket&&window.addEventListener)try{var r=window.WebSocket;window.WebSocket=function(e){var a=new r(e),s=a.send,d=0;return a.addEventListener("open",(function(t){d=Date.now()})),a.send=function(e){var n=e?JSON.parse(e):{};if(s.apply(a,arguments),n.Header){var r,i=n.Header.mid;if(i)o=t({},o,((r={})[i]=n,r))}},a.addEventListener("message",(function(t){var o=t.data?JSON.parse(t.data):{},r=o.Body||"",a=n.decodeBase64(r);if(a&&(!a||!["OK","null"].includes(a))){var s=Date.now()-d,c=o.Header.mid?o.Header.mid[0]:"",u=o.StatusCode;i(a,e,s,u,c,!0,"success")}})),a.addEventListener("close",(function(t){var n=t.code,o=t.reason,r=(t.wasClean,Date.now()-d);i(o,e,r,n,"",!1,"close")})),a.addEventListener("error",(function(t){var n=(t||{}).message,o=Date.now()-d;i(n,e,o,"","",!1,"error")})),a},window.WebSocket.prototype=r.prototype}catch(t){console.log(t)}function i(t,r,i,a,s,d,c){try{var u=o[s]||{},l=u.URL?""+r+u.URL:r,f=u.Body||"",p=n.decodeBase64(f);e[d?"requestSuccess":"requestError"](l,{status:c,duration:i,traceId:s,code:a,msg:"",body:t,params:p,type:"websocket"})}catch(t){console.log(t)}}}(Pt)),navigator.serviceWorker&&navigator.serviceWorker.addEventListener("message",(function(e){if("track"===e.data.type)try{Nt.send(t({t1:"bu",t2:"sw"},JSON.parse(e.data.msg)))}catch(t){}})),function(t,e){function n(){var t=0,e=0,n=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return n&&(t=n.rtt||0,e=n.effectiveType||""),[e,t]}var o=navigator.userAgent.toLowerCase().match(/(android|iphone os|cpu os|chrome|firefox|opera|version|edge|qqbrowser)(\/| )([\d_.]+)/);window.JKLOG.send({t1:"bu",t2:"pv",t3:"pa",d1:Rt(),d2:(o?o[0]:"")+","+window.devicePixelRatio,d3:location.pathname,d4:window.innerWidth+"x"+window.innerHeight,d5:n()[0]+"-"+n()[1]},!0);var r=window.history.pushState,i=window.history.replaceState,a=function(t){window.JKLOG.send({t1:"bu",t2:"pv",t3:"spa",d1:Rt(),d2:(o?o[0]:"")+","+window.devicePixelRatio,d3:location.pathname,d4:window.innerWidth+"x"+window.innerHeight,d5:n()[0]+"-"+n()[1]},!0)};window.history.pushState=function(t,e,n){a(),r.apply(window.history,arguments)},window.history.replaceState=function(t,e,n){a(),i.apply(window.history,arguments)}}(),_=function(t,e){var n,o,r,a,s,d=t;if(t.touches&&t.touches[0]&&(d=t.touches[0]),t.target){var c=(null==(n=t.target)?void 0:n.innerText)||"",u=C(t.target),l=t.target.nodeName||"",f=v(t.path||t.target),p=D(t.target)||"",w=t.target,g=(w.offsetTop,w.offsetLeft,w.offsetHeight),h=void 0===g?0:g,m=w.offsetWidth,y=void 0===m?0:m,L=w.clientWidth,b=void 0===L?0:L,O=w.clientHeight,_=void 0===O?0:O,E=null==(o=document)||null==(r=o.body)?void 0:r.scrollHeight,T=null==(a=document)||null==(s=a.body)?void 0:s.scrollWidth;window.JKLOG.send({t1:"bu",t2:"bhv",t3:e,d1:u,d2:f,d3:l+"_"+(y||b)+"x"+(h||_)+"_"+i(d.pageX)+"x"+i(d.pageY)+"_"+i(d.clientX)+"x"+i(d.clientY)+"_"+T+"x"+E,d4:p,d5:c.substr(0,20)||t.keyCode||""})}},O=function(t,e,n,o,r,i){window.JKLOG.send({t1:"bu",t2:"bhv",t3:"scroll",d1:t.target===document?"document":v(t.path||t.target),d2:e,d3:n,d4:o,d5:r,ts:i})},function(){function t(t){return t?((t=t.split("\n").slice(1)).length>Kt&&(t=t.slice(0,2).concat(["...",t[t.length-1]])),t.map((function(t){return t.replace(/^\s+at\s+/g,"")})).join("^")):""}window.addEventListener("error",(function(e,n,o,i,s){var d=y();try{if("string"==typeof e)window.JKLOG.send({t1:"monitor",t2:"jserror",d1:e||"",d2:a(n),d3:":"+(o||0)+":"+(i||0),d4:t(s&&s.stack),d5:d?v(d.path||d.target):""});else{var c=e.target&&(e.target.src||e.target.href);c?c.match("mtop")?window.JKLOG.send({t1:"monitor",t2:"api",t3:"requestError",d1:c.split("?")[0],d2:"404",d3:"",d4:"",d5:c}):window.JKLOG.send({t1:"monitor",t2:"res",t3:c,d1:e.target.tagName,d2:r(e.timeStamp),d3:v(e.path||e.target)}):window.JKLOG.send({t1:"monitor",t2:"jserror",d1:e.message||"",d2:a(e.filename),d3:":"+(e.lineno||0)+":"+(e.colno||0),d4:t(e.error&&e.error.stack),d5:d?v(d.path||d.target):""})}}catch(e){}}),!0),window.addEventListener("unhandledrejection",(function(e){if(e){var n=y();try{var o="",r=0,i=0,s="",d="";"string"==typeof e?o=e:"object"==typeof e.reason?o=e.reason.message||JSON.stringify(e.reason):"string"==typeof e.message&&(o=e.message);var c=e.reason;if("object"==typeof c){if("number"==typeof c.column)i=c.column,r=c.line;else if(c.stack){var u=c.stack.match(/at\s+.+:(\d+):(\d+)/);u&&(r=u[1],i=u[2])}if(c.sourceURL)s=c.sourceURL;else if(c.stack){var l=c.stack.match(/at\s+(.+):\d+:\d+/);l&&(s=l[1])}c.stack&&(d=t(c.stack))}window.JKLOG.send({t1:"monitor",t2:"jserror",t3:"promise",d1:o||"未知promsie错误",d2:a(s),d3:":"+r+":"+i,d4:d,d5:n?v(n.path||n.target):""})}catch(e){}}}))}(),function(){var t=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;if(t&&!s("now")){var e,n=0,o=new t((function(t){if(s("now"))o.disconnect();else{var e=t.length;n>0&&e/n>4&&(window.JKLOG_FMP=performance.now(),o.disconnect()),n=e}}));e=function(){var t=document.querySelector("#ice-container")||document.body;o.observe(t,{attributes:!0,childList:!0,characterData:!0,subtree:!0})},"interactive"===document.readyState?e():document.addEventListener("DOMContentLoaded",e),setTimeout((function(){o.disconnect()}),8e3)}}(),function(){if(!s("now")&&window.PerformanceLongTaskTiming&&window.PerformanceObserver){window.JKLOG_SAMPLING_longTask=window.JKLOG_SAMPLING_longTask||.05,window.JKLOG._lastLongtaskSelList=[],window.JKLOG_TBT=0;var t,e=performance.now(),n=new PerformanceObserver((function(o){o.getEntries().forEach((function(n){if(s("now")||(e=performance.now()),clearTimeout(t),t=setTimeout((function(){window.JKLOG_TTI=e,n.duration>50&&(window.JKLOG_TBT+=n.duration-50)}),3e3),n.duration>50&&window.JKLOG._lastLongtaskSelList&&window.JKLOG._lastLongtaskSelList.length<50&&(Math.random()<window.JKLOG_SAMPLING_longTask||n.duration>250)){var o=y();p((function(){var t=o?v(o.path||o.target):"";window.JKLOG._lastLongtaskSelList.indexOf(t)<0&&(window.JKLOG.send({t1:"exp",t2:"longtask",d1:r(n.startTime),d2:r(n.duration),d3:t}),window.JKLOG._lastLongtaskSelList.push(t))}))}})),window.JKLOG._lastLongtaskSelList&&window.JKLOG._lastLongtaskSelList.length>=50&&n.disconnect()}));setTimeout((function(){window.JKLOG_TTI=e}),21e3);try{n.observe({type:"longtask",buffered:!0})}catch(t){n.observe({entryTypes:["longtask"]})}j((function(t){t?p((function(){try{n.observe({type:"longtask",buffered:!0})}catch(t){n.observe({entryTypes:["longtask"]})}}),50):n.disconnect()}))}}()}catch(at){window.JKLOG.send({t1:"monitor",t2:"jklog",t3:"catch",d1:at.message,d2:JSON.stringify(at),d3:"index-top"},!0)}f((function(){!function(){var t=[".ant-form-item-has-error",".mt-form-item-help--error",".error-tips"];function e(e){void 0===e&&(e={});try{var n,o=(null==(n=e)?void 0:n.classList)||[];return t.some((function(t){return void 0===t&&(t=""),0===t.indexOf(".")&&Array.from(o).includes(t.substr(1))}))}catch(t){return console.log(t),!1}}window.JKLOG_EXP_CLS_FORM_ERR&&t.push(window.JKLOG_EXP_CLS_FORM_ERR),X(.6,(function(t){var n=t.target;if(t.intersectionRatio>.5){var o,r,i,a,s,d,c=(null==n||null==(o=n.dataset)?void 0:o.trackId)||"",u=v(n),l=(null==n?void 0:n.innerText)||"",f=(null==n?void 0:n.nodeName)||"",p=(null==n||null==(r=n.dataset)?void 0:r.trackParam)||"",w=(n.offsetTop,n.offsetLeft,n.offsetHeight),g=n.offsetWidth;null==(i=document)||null==(a=i.body)||a.scrollHeight,null==(s=document)||null==(d=s.body)||d.scrollWidth;window.JKLOG.send({t1:"bu",t2:"bhv",t3:"exp",d1:e(n)?c?"jk-form-error_"+c:"jk-form-error":c,d2:u,d3:f+"_"+w+"x"+g,d4:p,d5:l.substr(0,1e3)})}}))}(),It(),function(){if(!s("timing")){var t=performance.timing,e=t.fetchStart,n=t.connectStart,o=t.requestStart,r=t.responseEnd,i=t.responseStart,a=t.loadEventStart,d=t.domLoading,c=t.domContentLoadedEventStart;a&&window.JKLOG.send({t1:"exp",t2:"timing",t3:o-n,d1:i-o,d2:r-i,d3:c-d,d4:a-c,d5:n-e})}}(),function(){if(!s("getEntriesByName"))try{var t=setTimeout((function(){var e=St(),n=e.fp,o=e.fcp,i=r(window.JKLOG_FMP),a=r(window.JKLOG_TTI>o?window.JKLOG_TTI:o)||o,s=r(window.JKLOG_TBT);clearTimeout(t),window.JKLOG.send({t1:"exp",t2:"fp",t3:location.pathname.split("/")[1],d1:n,d2:o,d3:i,d4:a,d5:s})}),2e3)}catch(t){}}(),Jt(),Tt(),kt(),window.JKLOG_MAX_API_LATENCY=window.JKLOG_MAX_API_LATENCY_LOAD||1e4;var t=window.JKLOG_SAMPLING||.01;if("PerformanceObserver"in window){var e={eventTiming:it,lcp:Jt,cls:rt,fid:Tt};["eventTiming","cls"].forEach((function(n){var o=1;void 0!==window["JKLOG_SAMPLING_"+n]?o=window["JKLOG_SAMPLING_"+n]:void 0!==t&&(o=t),Math.random()<o&&e[n]()}))}var n=window.JKLOG_SAMPLING_BHV||t;Math.random()<n&&(window.JKLOG_ENABLE_BHV=!0)}))}catch(at){console.log("jklog catch error: ",at),window.JKLOG.send({t1:"monitor",t2:"jklog",t3:"catch",d1:at.message,d2:JSON.stringify(at),d3:"global"},!0)}}();