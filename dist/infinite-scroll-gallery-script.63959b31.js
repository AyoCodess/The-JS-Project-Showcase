parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"gnQY":[function(require,module,exports) {
function e(e,t,n,o,r,c,a){try{var i=e[c](a),l=i.value}catch(s){return void n(s)}i.done?t(l):Promise.resolve(l).then(o,r)}function t(t){return function(){var n=this,o=arguments;return new Promise(function(r,c){var a=t.apply(n,o);function i(t){e(a,r,c,i,l,"next",t)}function l(t){e(a,r,c,i,l,"throw",t)}i(void 0)})}}var n=config.MY_API_TOKEN,o=document.getElementById("image-container"),r=document.getElementById("loader3"),c=[],a=!1,i=0,l=0,s="crypto",u="latest",d="30",p="https://api.unsplash.com/search/photos/?client_id=".concat(n,"&query=").concat(s,"&per_page=").concat(d,"&order_by=").concat(u);function f(){i++,console.log(i),i===l&&(a=!0,r.hidden=!0,console.log("ready =",a))}function h(e,t){for(var n in t)e.setAttribute(n,t[n])}function g(){i=0,console.log("in the displayPhots function",i),l=c.length,console.log("total images",l),c.forEach(function(e){var t=document.createElement("a");h(t,{href:e.urls.regular,target:"_blank"});var n=document.createElement("img");h(n,{src:e.urls.regular,alt:e.alt_description,title:e.alt_description}),n.addEventListener("load",f),t.append(n),o.append(t)})}function m(){return v.apply(this,arguments)}function v(){return(v=t(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(p);case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,c=n.results,g(),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),alert("".concat(e.t0));case 14:case"end":return e.stop()}},e,null,[[0,11]])}))).apply(this,arguments)}window.addEventListener("scroll",function(){window.innerHeight+window.scrollY>=document.body.offsetHeight-1e3&&a&&(a=!1,console.log("load more"),m())}),m();
},{}]},{},["gnQY"], null)
//# sourceMappingURL=/infinite-scroll-gallery-script.63959b31.js.map