parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"AP3g":[function(require,module,exports) {
var e=document.getElementById("menu-bars"),n=document.getElementById("overlay"),t=document.getElementById("nav-1"),c=document.getElementById("nav-2"),a=document.getElementById("nav-3"),l=document.getElementById("nav-4"),o=document.getElementById("nav-5"),s=[t,c,a,l,o];function i(e,n){s.forEach(function(t,c){t.classList.replace("slide-".concat(e,"-").concat(c+1),"slide-".concat(n,"-").concat(c+1))})}function d(){e.classList.toggle("change"),n.classList.toggle("overlay-active"),n.classList.contains("overlay-active")?(n.classList.replace("overlay-slide-off-screen","overlay-slide-on-screen"),i("out","in")):(n.classList.replace("overlay-slide-on-screen","overlay-slide-off-screen"),i("in","out"))}e.addEventListener("click",d),s.forEach(function(e){e.addEventListener("click",d)});
},{}]},{},["AP3g"], null)
//# sourceMappingURL=/super-navigation.b4dacc21.js.map