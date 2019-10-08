/*
@license

dhtmlxGantt v.6.2.6 Professional Evaluation
This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) XB Software Ltd.

*/
Gantt.plugin(function(e){!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var a=t();for(var r in a)("object"==typeof exports?exports:e)[r]=a[r]}}(window,function(){return function(e){var t={};function a(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,a),o.l=!0,o.exports}return a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(r,o,function(t){return e[t]}.bind(null,o));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/codebase/",a(a.s=248)}({248:function(t,a){e.date.date_to_str=function(t,a){return function(r){return t.replace(/%[a-zA-Z]/g,function(t){switch(t){case"%d":return a?e.date.to_fixed(r.getUTCDate()):e.date.to_fixed(r.getDate());case"%m":return a?e.date.to_fixed(r.getUTCMonth()+1):e.date.to_fixed(r.getMonth()+1);case"%j":return a?r.getUTCDate():r.getDate();case"%n":return a?r.getUTCMonth()+1:r.getMonth()+1;case"%y":return a?e.date.to_fixed(r.getUTCFullYear()%100):e.date.to_fixed(r.getFullYear()%100);case"%Y":return a?r.getUTCFullYear():r.getFullYear();case"%D":return a?e.locale.date.day_short[r.getUTCDay()]:e.locale.date.day_short[r.getDay()];case"%l":return a?e.locale.date.day_full[r.getUTCDay()]:e.locale.date.day_full[r.getDay()];case"%M":return a?e.locale.date.month_short[r.getUTCMonth()]:e.locale.date.month_short[r.getMonth()];case"%F":return a?e.locale.date.month_full[r.getUTCMonth()]:e.locale.date.month_full[r.getMonth()];case"%h":return a?e.date.to_fixed((r.getUTCHours()+11)%12+1):e.date.to_fixed((r.getHours()+11)%12+1);case"%g":return a?(r.getUTCHours()+11)%12+1:(r.getHours()+11)%12+1;case"%G":return a?r.getUTCHours():r.getHours();case"%H":return a?e.date.to_fixed(r.getUTCHours()):e.date.to_fixed(r.getHours());case"%i":return a?e.date.to_fixed(r.getUTCMinutes()):e.date.to_fixed(r.getMinutes());case"%a":return a?r.getUTCHours()>11?"pm":"am":r.getHours()>11?"pm":"am";case"%A":return a?r.getUTCHours()>11?"PM":"AM":r.getHours()>11?"PM":"AM";case"%s":return a?e.date.to_fixed(r.getUTCSeconds()):e.date.to_fixed(r.getSeconds());case"%W":return a?e.date.to_fixed(e.date.getUTCISOWeek(r)):e.date.to_fixed(e.date.getISOWeek(r));default:return t}})}},e.date.str_to_date=function(t,a){return function(r){for(var o=[0,0,1,0,0,0],n=r.match(/[a-zA-Z]+|[0-9]+/g),u=t.match(/%[a-zA-Z]/g),c=0;c<u.length;c++)switch(u[c]){case"%j":case"%d":o[2]=n[c]||1;break;case"%n":case"%m":o[1]=(n[c]||1)-1;break;case"%y":o[0]=1*n[c]+(n[c]>50?1900:2e3);break;case"%g":case"%G":case"%h":case"%H":o[3]=n[c]||0;break;case"%i":o[4]=n[c]||0;break;case"%Y":o[0]=n[c]||0;break;case"%a":case"%A":o[3]=o[3]%12+("am"==(n[c]||"").toLowerCase()?0:12);break;case"%s":o[5]=n[c]||0;break;case"%M":o[1]=e.locale.date.month_short_hash[n[c]]||0;break;case"%F":o[1]=e.locale.date.month_full_hash[n[c]]||0}return a?new Date(Date.UTC(o[0],o[1],o[2],o[3],o[4],o[5])):new Date(o[0],o[1],o[2],o[3],o[4],o[5])}},e.config.task_attribute="data-task-id",e.config.link_attribute="data-link-id",e.config.grid_resizer_column_attribute="data-column-index",e.config.grid_resizer_attribute="data-grid-resizer"}})})});