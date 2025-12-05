var zw=Object.defineProperty;var $w=(n,t,e)=>t in n?zw(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var U=(n,t,e)=>$w(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const jw=()=>{};var Gd={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cm=function(n){const t=[];let e=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Hw=function(n){const t=[];let e=0,i=0;for(;e<n.length;){const s=n[e++];if(s<128)t[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[e++];t[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[e++],o=n[e++],a=n[e++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;t[i++]=String.fromCharCode(55296+(c>>10)),t[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[e++],o=n[e++];t[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return t.join("")},lm={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,h=r>>2,d=(r&3)<<4|a>>4;let f=(a&15)<<2|l>>6,m=l&63;c||(m=64,o||(f=64)),i.push(e[h],e[d],e[f],e[m])}return i.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(cm(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Hw(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=e[n.charAt(s++)],a=s<n.length?e[n.charAt(s)]:0;++s;const l=s<n.length?e[n.charAt(s)]:64;++s;const d=s<n.length?e[n.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new Ww;const f=r<<2|a>>4;if(i.push(f),l!==64){const m=a<<4&240|l>>2;if(i.push(m),d!==64){const _=l<<6&192|d;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ww extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qw=function(n){const t=cm(n);return lm.encodeByteArray(t,!0)},da=function(n){return qw(n).replace(/\./g,"")},um=function(n){try{return lm.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kw=()=>Gw().__FIREBASE_DEFAULTS__,Yw=()=>{if(typeof process>"u"||typeof Gd>"u")return;const n=Gd.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Qw=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&um(n[1]);return t&&JSON.parse(t)},Ya=()=>{try{return jw()||Kw()||Yw()||Qw()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},hm=n=>{var t,e;return(e=(t=Ya())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},dm=n=>{const t=hm(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const i=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),i]:[t.substring(0,e),i]},fm=()=>{var n;return(n=Ya())==null?void 0:n.config},pm=n=>{var t;return(t=Ya())==null?void 0:t[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,i)=>{e?this.reject(e):this.resolve(i),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,i))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ii(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function wu(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jw(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},i=t||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[da(JSON.stringify(e)),da(JSON.stringify(o)),""].join(".")}const pr={};function Zw(){const n={prod:[],emulator:[]};for(const t of Object.keys(pr))pr[t]?n.emulator.push(t):n.prod.push(t);return n}function tv(n){let t=document.getElementById(n),e=!1;return t||(t=document.createElement("div"),t.setAttribute("id",n),e=!0),{created:e,element:t}}let Kd=!1;function vu(n,t){if(typeof window>"u"||typeof document>"u"||!ii(window.location.host)||pr[n]===t||pr[n]||Kd)return;pr[n]=t;function e(f){return`__firebase__banner__${f}`}const i="__firebase__banner",r=Zw().prod.length>0;function o(){const f=document.getElementById(i);f&&f.remove()}function a(f){f.style.display="flex",f.style.background="#7faaf0",f.style.position="fixed",f.style.bottom="5px",f.style.left="5px",f.style.padding=".5em",f.style.borderRadius="5px",f.style.alignItems="center"}function c(f,m){f.setAttribute("width","24"),f.setAttribute("id",m),f.setAttribute("height","24"),f.setAttribute("viewBox","0 0 24 24"),f.setAttribute("fill","none"),f.style.marginLeft="-6px"}function l(){const f=document.createElement("span");return f.style.cursor="pointer",f.style.marginLeft="16px",f.style.fontSize="24px",f.innerHTML=" &times;",f.onclick=()=>{Kd=!0,o()},f}function h(f,m){f.setAttribute("id",m),f.innerText="Learn more",f.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",f.setAttribute("target","__blank"),f.style.paddingLeft="5px",f.style.textDecoration="underline"}function d(){const f=tv(i),m=e("text"),_=document.getElementById(m)||document.createElement("span"),b=e("learnmore"),v=document.getElementById(b)||document.createElement("a"),S=e("preprendIcon"),R=document.getElementById(S)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(f.created){const D=f.element;a(D),h(v,b);const N=l();c(R,S),D.append(R,_,v,N),document.body.appendChild(D)}r?(_.innerText="Preview backend disconnected.",R.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(R.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,_.innerText="Preview backend running in this workspace."),_.setAttribute("id",m)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d):d()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ev(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Yt())}function nv(){var t;const n=(t=Ya())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function iv(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function gm(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function sv(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function rv(){const n=Yt();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ov(){return!nv()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function mm(){try{return typeof indexedDB=="object"}catch{return!1}}function _m(){return new Promise((n,t)=>{try{let e=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var r;t(((r=s.error)==null?void 0:r.message)||"")}}catch(e){t(e)}})}function av(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cv="FirebaseError";class be extends Error{constructor(t,e,i){super(e),this.code=t,this.customData=i,this.name=cv,Object.setPrototypeOf(this,be.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ui.prototype.create)}}class Ui{constructor(t,e,i){this.service=t,this.serviceName=e,this.errors=i}create(t,...e){const i=e[0]||{},s=`${this.service}/${t}`,r=this.errors[t],o=r?lv(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new be(s,a,i)}}function lv(n,t){return n.replace(uv,(e,i)=>{const s=t[i];return s!=null?String(s):`<${i}?>`})}const uv=/\{\$([^}]+)}/g;function hv(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}function Hn(n,t){if(n===t)return!0;const e=Object.keys(n),i=Object.keys(t);for(const s of e){if(!i.includes(s))return!1;const r=n[s],o=t[s];if(Yd(r)&&Yd(o)){if(!Hn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!e.includes(s))return!1;return!0}function Yd(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gr(n){const t=[];for(const[e,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{t.push(encodeURIComponent(e)+"="+encodeURIComponent(s))}):t.push(encodeURIComponent(e)+"="+encodeURIComponent(i));return t.length?"&"+t.join("&"):""}function nr(n){const t={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,r]=i.split("=");t[decodeURIComponent(s)]=decodeURIComponent(r)}}),t}function ir(n){const t=n.indexOf("?");if(!t)return"";const e=n.indexOf("#",t);return n.substring(t,e>0?e:void 0)}function dv(n,t){const e=new fv(n,t);return e.subscribe.bind(e)}class fv{constructor(t,e){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(()=>{t(this)}).catch(i=>{this.error(i)})}next(t){this.forEachObserver(e=>{e.next(t)})}error(t){this.forEachObserver(e=>{e.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,e,i){let s;if(t===void 0&&e===void 0&&i===void 0)throw new Error("Missing Observer.");pv(t,["next","error","complete"])?s=t:s={next:t,error:e,complete:i},s.next===void 0&&(s.next=tl),s.error===void 0&&(s.error=tl),s.complete===void 0&&(s.complete=tl);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let e=0;e<this.observers.length;e++)this.sendOne(e,t)}sendOne(t,e){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{e(this.observers[t])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function pv(n,t){if(typeof n!="object"||n===null)return!1;for(const e of t)if(e in n&&typeof n[e]=="function")return!0;return!1}function tl(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gv=1e3,mv=2,_v=4*60*60*1e3,yv=.5;function Qd(n,t=gv,e=mv){const i=t*Math.pow(e,n),s=Math.round(yv*i*(Math.random()-.5)*2);return Math.min(_v,i+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(n){return n&&n._delegate?n._delegate:n}class ye{constructor(t,e,i){this.name=t,this.instanceFactory=e,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wi="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bv{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const i=new Xw;if(this.instancesDeferred.set(e,i),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),i=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(vv(t))try{this.getOrInitializeService({instanceIdentifier:wi})}catch{}for(const[e,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(t=wi){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=wi){return this.instances.has(t)}getOptions(t=wi){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,i=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:e});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(t,e){const i=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(i)??new Set;s.add(t),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&t(r,i),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const i=this.onInitCallbacks.get(e);if(i)for(const s of i)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let i=this.instances.get(t);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:wv(t),options:e}),this.instances.set(t,i),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(i,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,i)}catch{}return i||null}normalizeInstanceIdentifier(t=wi){return this.component?this.component.multipleInstances?t:wi:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function wv(n){return n===wi?void 0:n}function vv(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tv{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new bv(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Z||(Z={}));const Ev={debug:Z.DEBUG,verbose:Z.VERBOSE,info:Z.INFO,warn:Z.WARN,error:Z.ERROR,silent:Z.SILENT},Iv=Z.INFO,Av={[Z.DEBUG]:"log",[Z.VERBOSE]:"log",[Z.INFO]:"info",[Z.WARN]:"warn",[Z.ERROR]:"error"},xv=(n,t,...e)=>{if(t<n.logLevel)return;const i=new Date().toISOString(),s=Av[t];if(s)console[s](`[${i}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Qa{constructor(t){this.name=t,this._logLevel=Iv,this._logHandler=xv,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in Z))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Ev[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,Z.DEBUG,...t),this._logHandler(this,Z.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,Z.VERBOSE,...t),this._logHandler(this,Z.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,Z.INFO,...t),this._logHandler(this,Z.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,Z.WARN,...t),this._logHandler(this,Z.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,Z.ERROR,...t),this._logHandler(this,Z.ERROR,...t)}}const Sv=(n,t)=>t.some(e=>n instanceof e);let Xd,Jd;function Pv(){return Xd||(Xd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Rv(){return Jd||(Jd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ym=new WeakMap,Cl=new WeakMap,bm=new WeakMap,el=new WeakMap,Tu=new WeakMap;function Cv(n){const t=new Promise((e,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{e(Fn(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return t.then(e=>{e instanceof IDBCursor&&ym.set(e,n)}).catch(()=>{}),Tu.set(t,n),t}function kv(n){if(Cl.has(n))return;const t=new Promise((e,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{e(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Cl.set(n,t)}let kl={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Cl.get(n);if(t==="objectStoreNames")return n.objectStoreNames||bm.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Fn(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function Dv(n){kl=n(kl)}function Mv(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const i=n.call(nl(this),t,...e);return bm.set(i,t.sort?t.sort():[t]),Fn(i)}:Rv().includes(n)?function(...t){return n.apply(nl(this),t),Fn(ym.get(this))}:function(...t){return Fn(n.apply(nl(this),t))}}function Ov(n){return typeof n=="function"?Mv(n):(n instanceof IDBTransaction&&kv(n),Sv(n,Pv())?new Proxy(n,kl):n)}function Fn(n){if(n instanceof IDBRequest)return Cv(n);if(el.has(n))return el.get(n);const t=Ov(n);return t!==n&&(el.set(n,t),Tu.set(t,n)),t}const nl=n=>Tu.get(n);function wm(n,t,{blocked:e,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,t),a=Fn(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Fn(o.result),c.oldVersion,c.newVersion,Fn(o.transaction),c)}),e&&o.addEventListener("blocked",c=>e(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Nv=["get","getKey","getAll","getAllKeys","count"],Vv=["put","add","delete","clear"],il=new Map;function Zd(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(il.get(t))return il.get(t);const e=t.replace(/FromIndex$/,""),i=t!==e,s=Vv.includes(e);if(!(e in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Nv.includes(e)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[e](...a),s&&c.done]))[0]};return il.set(t,r),r}Dv(n=>({...n,get:(t,e,i)=>Zd(t,e)||n.get(t,e,i),has:(t,e)=>!!Zd(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lv{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Fv(e)){const i=e.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(e=>e).join(" ")}}function Fv(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Dl="@firebase/app",tf="0.14.6";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cn=new Qa("@firebase/app"),Uv="@firebase/app-compat",Bv="@firebase/analytics-compat",zv="@firebase/analytics",$v="@firebase/app-check-compat",jv="@firebase/app-check",Hv="@firebase/auth",Wv="@firebase/auth-compat",qv="@firebase/database",Gv="@firebase/data-connect",Kv="@firebase/database-compat",Yv="@firebase/functions",Qv="@firebase/functions-compat",Xv="@firebase/installations",Jv="@firebase/installations-compat",Zv="@firebase/messaging",t0="@firebase/messaging-compat",e0="@firebase/performance",n0="@firebase/performance-compat",i0="@firebase/remote-config",s0="@firebase/remote-config-compat",r0="@firebase/storage",o0="@firebase/storage-compat",a0="@firebase/firestore",c0="@firebase/ai",l0="@firebase/firestore-compat",u0="firebase",h0="12.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ml="[DEFAULT]",d0={[Dl]:"fire-core",[Uv]:"fire-core-compat",[zv]:"fire-analytics",[Bv]:"fire-analytics-compat",[jv]:"fire-app-check",[$v]:"fire-app-check-compat",[Hv]:"fire-auth",[Wv]:"fire-auth-compat",[qv]:"fire-rtdb",[Gv]:"fire-data-connect",[Kv]:"fire-rtdb-compat",[Yv]:"fire-fn",[Qv]:"fire-fn-compat",[Xv]:"fire-iid",[Jv]:"fire-iid-compat",[Zv]:"fire-fcm",[t0]:"fire-fcm-compat",[e0]:"fire-perf",[n0]:"fire-perf-compat",[i0]:"fire-rc",[s0]:"fire-rc-compat",[r0]:"fire-gcs",[o0]:"fire-gcs-compat",[a0]:"fire-fst",[l0]:"fire-fst-compat",[c0]:"fire-vertex","fire-js":"fire-js",[u0]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fa=new Map,f0=new Map,Ol=new Map;function ef(n,t){try{n.container.addComponent(t)}catch(e){cn.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function xe(n){const t=n.name;if(Ol.has(t))return cn.debug(`There were multiple attempts to register component ${t}.`),!1;Ol.set(t,n);for(const e of fa.values())ef(e,n);for(const e of f0.values())ef(e,n);return!0}function si(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function ue(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Un=new Ui("app","Firebase",p0);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g0{constructor(t,e,i){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new ye("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Un.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As=h0;function vm(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const i={name:Ml,automaticDataCollectionEnabled:!0,...t},s=i.name;if(typeof s!="string"||!s)throw Un.create("bad-app-name",{appName:String(s)});if(e||(e=fm()),!e)throw Un.create("no-options");const r=fa.get(s);if(r){if(Hn(e,r.options)&&Hn(i,r.config))return r;throw Un.create("duplicate-app",{appName:s})}const o=new Tv(s);for(const c of Ol.values())o.addComponent(c);const a=new g0(e,i,o);return fa.set(s,a),a}function Xa(n=Ml){const t=fa.get(n);if(!t&&n===Ml&&fm())return vm();if(!t)throw Un.create("no-app",{appName:n});return t}function oe(n,t,e){let i=d0[n]??n;e&&(i+=`-${e}`);const s=i.match(/\s|\//),r=t.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${t}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),cn.warn(o.join(" "));return}xe(new ye(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m0="firebase-heartbeat-database",_0=1,Sr="firebase-heartbeat-store";let sl=null;function Tm(){return sl||(sl=wm(m0,_0,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Sr)}catch(e){console.warn(e)}}}}).catch(n=>{throw Un.create("idb-open",{originalErrorMessage:n.message})})),sl}async function y0(n){try{const e=(await Tm()).transaction(Sr),i=await e.objectStore(Sr).get(Em(n));return await e.done,i}catch(t){if(t instanceof be)cn.warn(t.message);else{const e=Un.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});cn.warn(e.message)}}}async function nf(n,t){try{const i=(await Tm()).transaction(Sr,"readwrite");await i.objectStore(Sr).put(t,Em(n)),await i.done}catch(e){if(e instanceof be)cn.warn(e.message);else{const i=Un.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});cn.warn(i.message)}}}function Em(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b0=1024,w0=30;class v0{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new E0(e),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=sf();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats.length>w0){const o=I0(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){cn.warn(i)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=sf(),{heartbeatsToSend:i,unsentEntries:s}=T0(this._heartbeatsCache.heartbeats),r=da(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return cn.warn(e),""}}}function sf(){return new Date().toISOString().substring(0,10)}function T0(n,t=b0){const e=[];let i=n.slice();for(const s of n){const r=e.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),rf(e)>t){r.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),rf(e)>t){e.pop();break}i=i.slice(1)}return{heartbeatsToSend:e,unsentEntries:i}}class E0{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return mm()?_m().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await y0(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const i=await this.read();return nf(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const i=await this.read();return nf(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}}function rf(n){return da(JSON.stringify({version:2,heartbeats:n})).length}function I0(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let i=1;i<n.length;i++)n[i].date<e&&(e=n[i].date,t=i);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A0(n){xe(new ye("platform-logger",t=>new Lv(t),"PRIVATE")),xe(new ye("heartbeat",t=>new v0(t),"PRIVATE")),oe(Dl,tf,n),oe(Dl,tf,"esm2020"),oe("fire-js","")}A0("");function Im(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const x0=Im,Am=new Ui("auth","Firebase",Im());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa=new Qa("@firebase/auth");function S0(n,...t){pa.logLevel<=Z.WARN&&pa.warn(`Auth (${As}): ${n}`,...t)}function qo(n,...t){pa.logLevel<=Z.ERROR&&pa.error(`Auth (${As}): ${n}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(n,...t){throw Eu(n,...t)}function Fe(n,...t){return Eu(n,...t)}function xm(n,t,e){const i={...x0(),[t]:e};return new Ui("auth","Firebase",i).create(t,{appName:n.name})}function on(n){return xm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Eu(n,...t){if(typeof n!="string"){const e=t[0],i=[...t.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(e,...i)}return Am.create(n,...t)}function W(n,t,...e){if(!n)throw Eu(t,...e)}function tn(n){const t="INTERNAL ASSERTION FAILED: "+n;throw qo(t),new Error(t)}function ln(n,t){n||tn(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nl(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function P0(){return of()==="http:"||of()==="https:"}function of(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R0(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(P0()||gm()||"connection"in navigator)?navigator.onLine:!0}function C0(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(t,e){this.shortDelay=t,this.longDelay=e,ln(e>t,"Short delay should be less than long delay!"),this.isMobile=ev()||sv()}get(){return R0()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iu(n,t){ln(n.emulator,"Emulator should always be set here");const{url:e}=n.emulator;return t?`${e}${t.startsWith("/")?t.slice(1):t}`:e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{static initialize(t,e,i){this.fetchImpl=t,e&&(this.headersImpl=e),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;tn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;tn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;tn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k0={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const D0=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],M0=new Kr(3e4,6e4);function ri(n,t){return n.tenantId&&!t.tenantId?{...t,tenantId:n.tenantId}:t}async function oi(n,t,e,i,s={}){return Pm(n,s,async()=>{let r={},o={};i&&(t==="GET"?o=i:r={body:JSON.stringify(i)});const a=Gr({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l={method:t,headers:c,...r};return iv()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&ii(n.emulatorConfig.host)&&(l.credentials="include"),Sm.fetch()(await Rm(n,n.config.apiHost,e,a),l)})}async function Pm(n,t,e){n._canInitEmulator=!1;const i={...k0,...t};try{const s=new N0(n),r=await Promise.race([e(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw So(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw So(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw So(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw So(n,"user-disabled",o);const h=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw xm(n,h,l);Se(n,h)}}catch(s){if(s instanceof be)throw s;Se(n,"network-request-failed",{message:String(s)})}}async function Yr(n,t,e,i,s={}){const r=await oi(n,t,e,i,s);return"mfaPendingCredential"in r&&Se(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function Rm(n,t,e,i){const s=`${t}${e}?${i}`,r=n,o=r.config.emulator?Iu(n.config,s):`${n.config.apiScheme}://${s}`;return D0.includes(e)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}function O0(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class N0{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((e,i)=>{this.timer=setTimeout(()=>i(Fe(this.auth,"network-request-failed")),M0.get())})}}function So(n,t,e){const i={appName:n.name};e.email&&(i.email=e.email),e.phoneNumber&&(i.phoneNumber=e.phoneNumber);const s=Fe(n,t,i);return s.customData._tokenResponse=e,s}function af(n){return n!==void 0&&n.enterprise!==void 0}class V0{constructor(t){if(this.siteKey="",this.recaptchaEnforcementState=[],t.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=t.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=t.recaptchaEnforcementState}getProviderEnforcementState(t){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const e of this.recaptchaEnforcementState)if(e.provider&&e.provider===t)return O0(e.enforcementState);return null}isProviderEnabled(t){return this.getProviderEnforcementState(t)==="ENFORCE"||this.getProviderEnforcementState(t)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function L0(n,t){return oi(n,"GET","/v2/recaptchaConfig",ri(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function F0(n,t){return oi(n,"POST","/v1/accounts:delete",t)}async function ga(n,t){return oi(n,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gr(n){if(n)try{const t=new Date(Number(n));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function U0(n,t=!1){const e=ht(n),i=await e.getIdToken(t),s=Au(i);W(s&&s.exp&&s.auth_time&&s.iat,e.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:gr(rl(s.auth_time)),issuedAtTime:gr(rl(s.iat)),expirationTime:gr(rl(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function rl(n){return Number(n)*1e3}function Au(n){const[t,e,i]=n.split(".");if(t===void 0||e===void 0||i===void 0)return qo("JWT malformed, contained fewer than 3 sections"),null;try{const s=um(e);return s?JSON.parse(s):(qo("Failed to decode base64 JWT payload"),null)}catch(s){return qo("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function cf(n){const t=Au(n);return W(t,"internal-error"),W(typeof t.exp<"u","internal-error"),W(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pr(n,t,e=!1){if(e)return t;try{return await t}catch(i){throw i instanceof be&&B0(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function B0({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z0{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(t=!1){if(!this.isRunning)return;const e=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},e)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(t,e){this.createdAt=t,this.lastLoginAt=e,this._initializeTime()}_initializeTime(){this.lastSignInTime=gr(this.lastLoginAt),this.creationTime=gr(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ma(n){var d;const t=n.auth,e=await n.getIdToken(),i=await Pr(n,ga(t,{idToken:e}));W(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const r=(d=s.providerUserInfo)!=null&&d.length?Cm(s.providerUserInfo):[],o=j0(n.providerData,r),a=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),l=a?c:!1,h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Vl(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,h)}async function $0(n){const t=ht(n);await ma(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function j0(n,t){return[...n.filter(i=>!t.some(s=>s.providerId===i.providerId)),...t]}function Cm(n){return n.map(({providerId:t,...e})=>({providerId:t,uid:e.rawId||"",displayName:e.displayName||null,email:e.email||null,phoneNumber:e.phoneNumber||null,photoURL:e.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function H0(n,t){const e=await Pm(n,{},async()=>{const i=Gr({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await Rm(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return n.emulatorConfig&&ii(n.emulatorConfig.host)&&(c.credentials="include"),Sm.fetch()(o,c)});return{accessToken:e.access_token,expiresIn:e.expires_in,refreshToken:e.refresh_token}}async function W0(n,t){return oi(n,"POST","/v2/accounts:revokeToken",ri(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){W(t.idToken,"internal-error"),W(typeof t.idToken<"u","internal-error"),W(typeof t.refreshToken<"u","internal-error");const e="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):cf(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,e)}updateFromIdToken(t){W(t.length!==0,"internal-error");const e=cf(t);this.updateTokensAndExpiration(t,null,e)}async getToken(t,e=!1){return!e&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,e){const{accessToken:i,refreshToken:s,expiresIn:r}=await H0(t,e);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(t,e,i){this.refreshToken=e||null,this.accessToken=t||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(t,e){const{refreshToken:i,accessToken:s,expirationTime:r}=e,o=new ss;return i&&(W(typeof i=="string","internal-error",{appName:t}),o.refreshToken=i),s&&(W(typeof s=="string","internal-error",{appName:t}),o.accessToken=s),r&&(W(typeof r=="number","internal-error",{appName:t}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new ss,this.toJSON())}_performRefresh(){return tn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function In(n,t){W(typeof n=="string"||typeof n>"u","internal-error",{appName:t})}class Te{constructor({uid:t,auth:e,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new z0(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=e,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Vl(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(t){const e=await Pr(this,this.stsTokenManager.getToken(this.auth,t));return W(e,this.auth,"internal-error"),this.accessToken!==e&&(this.accessToken=e,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),e}getIdTokenResult(t){return U0(this,t)}reload(){return $0(this)}_assign(t){this!==t&&(W(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(e=>({...e})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const e=new Te({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return e.metadata._copy(this.metadata),e}_onReload(t){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,e=!1){let i=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),i=!0),e&&await ma(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ue(this.auth.app))return Promise.reject(on(this.auth));const t=await this.getIdToken();return await Pr(this,F0(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,e){const i=e.displayName??void 0,s=e.email??void 0,r=e.phoneNumber??void 0,o=e.photoURL??void 0,a=e.tenantId??void 0,c=e._redirectEventId??void 0,l=e.createdAt??void 0,h=e.lastLoginAt??void 0,{uid:d,emailVerified:f,isAnonymous:m,providerData:_,stsTokenManager:b}=e;W(d&&b,t,"internal-error");const v=ss.fromJSON(this.name,b);W(typeof d=="string",t,"internal-error"),In(i,t.name),In(s,t.name),W(typeof f=="boolean",t,"internal-error"),W(typeof m=="boolean",t,"internal-error"),In(r,t.name),In(o,t.name),In(a,t.name),In(c,t.name),In(l,t.name),In(h,t.name);const S=new Te({uid:d,auth:t,email:s,emailVerified:f,displayName:i,isAnonymous:m,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:v,createdAt:l,lastLoginAt:h});return _&&Array.isArray(_)&&(S.providerData=_.map(R=>({...R}))),c&&(S._redirectEventId=c),S}static async _fromIdTokenResponse(t,e,i=!1){const s=new ss;s.updateFromServerResponse(e);const r=new Te({uid:e.localId,auth:t,stsTokenManager:s,isAnonymous:i});return await ma(r),r}static async _fromGetAccountInfoResponse(t,e,i){const s=e.users[0];W(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Cm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new ss;a.updateFromIdToken(i);const c=new Te({uid:s.localId,auth:t,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Vl(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf=new Map;function en(n){ln(n instanceof Function,"Expected a class definition");let t=lf.get(n);return t?(ln(t instanceof n,"Instance stored in cache mismatched with class"),t):(t=new n,lf.set(n,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class km{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,e){this.storage[t]=e}async _get(t){const e=this.storage[t];return e===void 0?null:e}async _remove(t){delete this.storage[t]}_addListener(t,e){}_removeListener(t,e){}}km.type="NONE";const uf=km;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(n,t,e){return`firebase:${n}:${t}:${e}`}class rs{constructor(t,e,i){this.persistence=t,this.auth=e,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Go(this.userKey,s.apiKey,r),this.fullPersistenceKey=Go("persistence",s.apiKey,r),this.boundEventHandler=e._onStorageEvent.bind(e),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const e=await ga(this.auth,{idToken:t}).catch(()=>{});return e?Te._fromGetAccountInfoResponse(this.auth,e,t):null}return Te._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const e=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,e)return this.setCurrentUser(e)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,e,i="authUser"){if(!e.length)return new rs(en(uf),t,i);const s=(await Promise.all(e.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||en(uf);const o=Go(i,t.config.apiKey,t.name);let a=null;for(const l of e)try{const h=await l._get(o);if(h){let d;if(typeof h=="string"){const f=await ga(t,{idToken:h}).catch(()=>{});if(!f)break;d=await Te._fromGetAccountInfoResponse(t,f,h)}else d=Te._fromJSON(t,h);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new rs(r,t,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(e.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new rs(r,t,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hf(n){const t=n.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Nm(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Dm(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Lm(t))return"Blackberry";if(Fm(t))return"Webos";if(Mm(t))return"Safari";if((t.includes("chrome/")||Om(t))&&!t.includes("edge/"))return"Chrome";if(Vm(t))return"Android";{const e=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(e);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function Dm(n=Yt()){return/firefox\//i.test(n)}function Mm(n=Yt()){const t=n.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Om(n=Yt()){return/crios\//i.test(n)}function Nm(n=Yt()){return/iemobile/i.test(n)}function Vm(n=Yt()){return/android/i.test(n)}function Lm(n=Yt()){return/blackberry/i.test(n)}function Fm(n=Yt()){return/webos/i.test(n)}function xu(n=Yt()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function q0(n=Yt()){var t;return xu(n)&&!!((t=window.navigator)!=null&&t.standalone)}function G0(){return rv()&&document.documentMode===10}function Um(n=Yt()){return xu(n)||Vm(n)||Fm(n)||Lm(n)||/windows phone/i.test(n)||Nm(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bm(n,t=[]){let e;switch(n){case"Browser":e=hf(Yt());break;case"Worker":e=`${hf(Yt())}-${n}`;break;default:e=n}const i=t.length?t.join(","):"FirebaseCore-web";return`${e}/JsCore/${As}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K0{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,e){const i=r=>new Promise((o,a)=>{try{const c=t(r);o(c)}catch(c){a(c)}});i.onAbort=e,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const e=[];try{for(const i of this.queue)await i(t),i.onAbort&&e.push(i.onAbort)}catch(i){e.reverse();for(const s of e)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Y0(n,t={}){return oi(n,"GET","/v2/passwordPolicy",ri(n,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q0=6;class X0{constructor(t){var i;const e=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=e.minPasswordLength??Q0,e.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=e.maxPasswordLength),e.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=e.containsLowercaseCharacter),e.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=e.containsUppercaseCharacter),e.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=e.containsNumericCharacter),e.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=e.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((i=t.allowedNonAlphanumericCharacters)==null?void 0:i.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const e={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,e),this.validatePasswordCharacterOptions(t,e),e.isValid&&(e.isValid=e.meetsMinPasswordLength??!0),e.isValid&&(e.isValid=e.meetsMaxPasswordLength??!0),e.isValid&&(e.isValid=e.containsLowercaseLetter??!0),e.isValid&&(e.isValid=e.containsUppercaseLetter??!0),e.isValid&&(e.isValid=e.containsNumericCharacter??!0),e.isValid&&(e.isValid=e.containsNonAlphanumericCharacter??!0),e}validatePasswordLengthOptions(t,e){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(e.meetsMinPasswordLength=t.length>=i),s&&(e.meetsMaxPasswordLength=t.length<=s)}validatePasswordCharacterOptions(t,e){this.updatePasswordCharacterOptionsStatuses(e,!1,!1,!1,!1);let i;for(let s=0;s<t.length;s++)i=t.charAt(s),this.updatePasswordCharacterOptionsStatuses(e,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(t,e,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=e)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J0{constructor(t,e,i,s){this.app=t,this.heartbeatServiceProvider=e,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new df(this),this.idTokenSubscription=new df(this),this.beforeStateQueue=new K0(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Am,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(t,e){return e&&(this._popupRedirectResolver=en(e)),this._initializationPromise=this.queue(async()=>{var i,s,r;if(!this._deleted&&(this.persistenceManager=await rs.create(this,t),(i=this._resolvePersistenceManagerAvailable)==null||i.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(e),this.lastNotifiedUid=((r=this.currentUser)==null?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const e=await ga(this,{idToken:t}),i=await Te._fromGetAccountInfoResponse(this,e,t);await this.directlySetCurrentUser(i)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var r;if(ue(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const e=await this.assertedPersistence.getCurrentUser();let i=e,s=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(r=this.redirectUser)==null?void 0:r._redirectEventId,a=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(t);(!o||o===a)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=e,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(t){let e=null;try{e=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return e}async reloadAndSetCurrentUserOrClear(t){try{await ma(t)}catch(e){if((e==null?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=C0()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(ue(this.app))return Promise.reject(on(this));const e=t?ht(t):null;return e&&W(e.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(e&&e._clone(this))}async _updateCurrentUser(t,e=!1){if(!this._deleted)return t&&W(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),e||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return ue(this.app)?Promise.reject(on(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return ue(this.app)?Promise.reject(on(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(en(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const e=this._getPasswordPolicyInternal();return e.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):e.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await Y0(this),e=new X0(t);this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new Ui("auth","Firebase",t())}onAuthStateChanged(t,e,i){return this.registerStateListener(this.authStateSubscription,t,e,i)}beforeAuthStateChanged(t,e){return this.beforeStateQueue.pushCallback(t,e)}onIdTokenChanged(t,e,i){return this.registerStateListener(this.idTokenSubscription,t,e,i)}authStateReady(){return new Promise((t,e)=>{if(this.currentUser)t();else{const i=this.onAuthStateChanged(()=>{i(),t()},e)}})}async revokeAccessToken(t){if(this.currentUser){const e=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:e};this.tenantId!=null&&(i.tenantId=this.tenantId),await W0(this,i)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,e){const i=await this.getOrInitRedirectPersistenceManager(e);return t===null?i.removeCurrentUser():i.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const e=t&&en(t)||this._popupRedirectResolver;W(e,this,"argument-error"),this.redirectPersistenceManager=await rs.create(this,[en(e._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var e,i;return this._isInitialized&&await this.queue(async()=>{}),((e=this._currentUser)==null?void 0:e._redirectEventId)===t?this._currentUser:((i=this.redirectUser)==null?void 0:i._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((e=this.currentUser)==null?void 0:e.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,e,i,s){if(this._deleted)return()=>{};const r=typeof e=="function"?e:e.next.bind(e);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof e=="function"){const c=t.addObserver(e,i,s);return()=>{o=!0,c()}}else{const c=t.addObserver(e);return()=>{o=!0,c()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Bm(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const e=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());e&&(t["X-Firebase-Client"]=e);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(ue(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:e.getToken());return t!=null&&t.error&&S0(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Bi(n){return ht(n)}class df{constructor(t){this.auth=t,this.observer=null,this.addObserver=dv(e=>this.observer=e)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ja={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Z0(n){Ja=n}function zm(n){return Ja.loadJS(n)}function tT(){return Ja.recaptchaEnterpriseScript}function eT(){return Ja.gapiScript}function nT(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class iT{constructor(){this.enterprise=new sT}ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}class sT{ready(t){t()}execute(t,e){return Promise.resolve("token")}render(t,e){return""}}const rT="recaptcha-enterprise",$m="NO_RECAPTCHA";class oT{constructor(t){this.type=rT,this.auth=Bi(t)}async verify(t="verify",e=!1){async function i(r){if(!e){if(r.tenantId==null&&r._agentRecaptchaConfig!=null)return r._agentRecaptchaConfig.siteKey;if(r.tenantId!=null&&r._tenantRecaptchaConfigs[r.tenantId]!==void 0)return r._tenantRecaptchaConfigs[r.tenantId].siteKey}return new Promise(async(o,a)=>{L0(r,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const l=new V0(c);return r.tenantId==null?r._agentRecaptchaConfig=l:r._tenantRecaptchaConfigs[r.tenantId]=l,o(l.siteKey)}}).catch(c=>{a(c)})})}function s(r,o,a){const c=window.grecaptcha;af(c)?c.enterprise.ready(()=>{c.enterprise.execute(r,{action:t}).then(l=>{o(l)}).catch(()=>{o($m)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new iT().execute("siteKey",{action:"verify"}):new Promise((r,o)=>{i(this.auth).then(a=>{if(!e&&af(window.grecaptcha))s(a,r,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=tT();c.length!==0&&(c+=a),zm(c).then(()=>{s(a,r,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function ff(n,t,e,i=!1,s=!1){const r=new oT(n);let o;if(s)o=$m;else try{o=await r.verify(e)}catch{o=await r.verify(e,!0)}const a={...t};if(e==="mfaSmsEnrollment"||e==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const c=a.phoneEnrollmentInfo.phoneNumber,l=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return i?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Ll(n,t,e,i,s){var r;if((r=n._getRecaptchaConfig())!=null&&r.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await ff(n,t,e,e==="getOobCode");return i(n,o)}else return i(n,t).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${e} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await ff(n,t,e,e==="getOobCode");return i(n,a)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aT(n,t){const e=si(n,"auth");if(e.isInitialized()){const s=e.getImmediate(),r=e.getOptions();if(Hn(r,t??{}))return s;Se(s,"already-initialized")}return e.initialize({options:t})}function cT(n,t){const e=(t==null?void 0:t.persistence)||[],i=(Array.isArray(e)?e:[e]).map(en);t!=null&&t.errorMap&&n._updateErrorMap(t.errorMap),n._initializeWithPersistence(i,t==null?void 0:t.popupRedirectResolver)}function lT(n,t,e){const i=Bi(n);W(/^https?:\/\//.test(t),i,"invalid-emulator-scheme");const s=!1,r=jm(t),{host:o,port:a}=uT(t),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},h=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){W(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),W(Hn(l,i.config.emulator)&&Hn(h,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=h,i.settings.appVerificationDisabledForTesting=!0,ii(o)?(wu(`${r}//${o}${c}`),vu("Auth",!0)):hT()}function jm(n){const t=n.indexOf(":");return t<0?"":n.substr(0,t+1)}function uT(n){const t=jm(n),e=/(\/\/)?([^?#/]+)/.exec(n.substr(t.length));if(!e)return{host:"",port:null};const i=e[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:pf(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:pf(o)}}}function pf(n){if(!n)return null;const t=Number(n);return isNaN(t)?null:t}function hT(){function n(){const t=document.createElement("p"),e=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",e.position="fixed",e.width="100%",e.backgroundColor="#ffffff",e.border=".1em solid #000000",e.color="#b50000",e.bottom="0px",e.left="0px",e.margin="0px",e.zIndex="10000",e.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(t,e){this.providerId=t,this.signInMethod=e}toJSON(){return tn("not implemented")}_getIdTokenResponse(t){return tn("not implemented")}_linkToIdToken(t,e){return tn("not implemented")}_getReauthenticationResolver(t){return tn("not implemented")}}async function dT(n,t){return oi(n,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fT(n,t){return Yr(n,"POST","/v1/accounts:signInWithPassword",ri(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pT(n,t){return Yr(n,"POST","/v1/accounts:signInWithEmailLink",ri(n,t))}async function gT(n,t){return Yr(n,"POST","/v1/accounts:signInWithEmailLink",ri(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr extends Su{constructor(t,e,i,s=null){super("password",i),this._email=t,this._password=e,this._tenantId=s}static _fromEmailAndPassword(t,e){return new Rr(t,e,"password")}static _fromEmailAndCode(t,e,i=null){return new Rr(t,e,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t;if(e!=null&&e.email&&(e!=null&&e.password)){if(e.signInMethod==="password")return this._fromEmailAndPassword(e.email,e.password);if(e.signInMethod==="emailLink")return this._fromEmailAndCode(e.email,e.password,e.tenantId)}return null}async _getIdTokenResponse(t){switch(this.signInMethod){case"password":const e={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ll(t,e,"signInWithPassword",fT);case"emailLink":return pT(t,{email:this._email,oobCode:this._password});default:Se(t,"internal-error")}}async _linkToIdToken(t,e){switch(this.signInMethod){case"password":const i={idToken:e,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ll(t,i,"signUpPassword",dT);case"emailLink":return gT(t,{idToken:e,email:this._email,oobCode:this._password});default:Se(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function os(n,t){return Yr(n,"POST","/v1/accounts:signInWithIdp",ri(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mT="http://localhost";class ki extends Su{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const e=new ki(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(e.idToken=t.idToken),t.accessToken&&(e.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(e.nonce=t.nonce),t.pendingToken&&(e.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(e.accessToken=t.oauthToken,e.secret=t.oauthTokenSecret):Se("argument-error"),e}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const e=typeof t=="string"?JSON.parse(t):t,{providerId:i,signInMethod:s,...r}=e;if(!i||!s)return null;const o=new ki(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(t){const e=this.buildRequest();return os(t,e)}_linkToIdToken(t,e){const i=this.buildRequest();return i.idToken=e,os(t,i)}_getReauthenticationResolver(t){const e=this.buildRequest();return e.autoCreate=!1,os(t,e)}buildRequest(){const t={requestUri:mT,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const e={};this.idToken&&(e.id_token=this.idToken),this.accessToken&&(e.access_token=this.accessToken),this.secret&&(e.oauth_token_secret=this.secret),e.providerId=this.providerId,this.nonce&&!this.pendingToken&&(e.nonce=this.nonce),t.postBody=Gr(e)}return t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _T(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function yT(n){const t=nr(ir(n)).link,e=t?nr(ir(t)).deep_link_id:null,i=nr(ir(n)).deep_link_id;return(i?nr(ir(i)).link:null)||i||e||t||n}class Pu{constructor(t){const e=nr(ir(t)),i=e.apiKey??null,s=e.oobCode??null,r=_T(e.mode??null);W(i&&s&&r,"argument-error"),this.apiKey=i,this.operation=r,this.code=s,this.continueUrl=e.continueUrl??null,this.languageCode=e.lang??null,this.tenantId=e.tenantId??null}static parseLink(t){const e=yT(t);try{return new Pu(e)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(){this.providerId=xs.PROVIDER_ID}static credential(t,e){return Rr._fromEmailAndPassword(t,e)}static credentialWithLink(t,e){const i=Pu.parseLink(e);return W(i,"argument-error"),Rr._fromEmailAndCode(t,i.code,i.tenantId)}}xs.PROVIDER_ID="password";xs.EMAIL_PASSWORD_SIGN_IN_METHOD="password";xs.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr extends Hm{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An extends Qr{constructor(){super("facebook.com")}static credential(t){return ki._fromParams({providerId:An.PROVIDER_ID,signInMethod:An.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return An.credentialFromTaggedObject(t)}static credentialFromError(t){return An.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return An.credential(t.oauthAccessToken)}catch{return null}}}An.FACEBOOK_SIGN_IN_METHOD="facebook.com";An.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn extends Qr{constructor(){super("google.com"),this.addScope("profile")}static credential(t,e){return ki._fromParams({providerId:xn.PROVIDER_ID,signInMethod:xn.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:e})}static credentialFromResult(t){return xn.credentialFromTaggedObject(t)}static credentialFromError(t){return xn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:e,oauthAccessToken:i}=t;if(!e&&!i)return null;try{return xn.credential(e,i)}catch{return null}}}xn.GOOGLE_SIGN_IN_METHOD="google.com";xn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn extends Qr{constructor(){super("github.com")}static credential(t){return ki._fromParams({providerId:Sn.PROVIDER_ID,signInMethod:Sn.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Sn.credentialFromTaggedObject(t)}static credentialFromError(t){return Sn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Sn.credential(t.oauthAccessToken)}catch{return null}}}Sn.GITHUB_SIGN_IN_METHOD="github.com";Sn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pn extends Qr{constructor(){super("twitter.com")}static credential(t,e){return ki._fromParams({providerId:Pn.PROVIDER_ID,signInMethod:Pn.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:e})}static credentialFromResult(t){return Pn.credentialFromTaggedObject(t)}static credentialFromError(t){return Pn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:e,oauthTokenSecret:i}=t;if(!e||!i)return null;try{return Pn.credential(e,i)}catch{return null}}}Pn.TWITTER_SIGN_IN_METHOD="twitter.com";Pn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bT(n,t){return Yr(n,"POST","/v1/accounts:signUp",ri(n,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,e,i,s=!1){const r=await Te._fromIdTokenResponse(t,i,s),o=gf(i);return new Di({user:r,providerId:o,_tokenResponse:i,operationType:e})}static async _forOperation(t,e,i){await t._updateTokensIfNecessary(i,!0);const s=gf(i);return new Di({user:t,providerId:s,_tokenResponse:i,operationType:e})}}function gf(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _a extends be{constructor(t,e,i,s){super(e.code,e.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,_a.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:e.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(t,e,i,s){return new _a(t,e,i,s)}}function Wm(n,t,e,i){return(t==="reauthenticate"?e._getReauthenticationResolver(n):e._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?_a._fromErrorAndOperation(n,r,t,i):r})}async function wT(n,t,e=!1){const i=await Pr(n,t._linkToIdToken(n.auth,await n.getIdToken()),e);return Di._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vT(n,t,e=!1){const{auth:i}=n;if(ue(i.app))return Promise.reject(on(i));const s="reauthenticate";try{const r=await Pr(n,Wm(i,s,t,n),e);W(r.idToken,i,"internal-error");const o=Au(r.idToken);W(o,i,"internal-error");const{sub:a}=o;return W(n.uid===a,i,"user-mismatch"),Di._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Se(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qm(n,t,e=!1){if(ue(n.app))return Promise.reject(on(n));const i="signIn",s=await Wm(n,i,t),r=await Di._fromIdTokenResponse(n,i,s);return e||await n._updateCurrentUser(r.user),r}async function TT(n,t){return qm(Bi(n),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gm(n){const t=Bi(n);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function Km(n,t,e){if(ue(n.app))return Promise.reject(on(n));const i=Bi(n),o=await Ll(i,{returnSecureToken:!0,email:t,password:e,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",bT).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Gm(n),c}),a=await Di._fromIdTokenResponse(i,"signIn",o);return await i._updateCurrentUser(a.user),a}function ol(n,t,e){return ue(n.app)?Promise.reject(on(n)):TT(ht(n),xs.credential(t,e)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&Gm(n),i})}function ET(n,t,e,i){return ht(n).onIdTokenChanged(t,e,i)}function IT(n,t,e){return ht(n).beforeAuthStateChanged(t,e)}function AT(n,t,e,i){return ht(n).onAuthStateChanged(t,e,i)}function xT(n){return ht(n).signOut()}const ya="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ym{constructor(t,e){this.storageRetriever=t,this.type=e}_isAvailable(){try{return this.storage?(this.storage.setItem(ya,"1"),this.storage.removeItem(ya),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,e){return this.storage.setItem(t,JSON.stringify(e)),Promise.resolve()}_get(t){const e=this.storage.getItem(t);return Promise.resolve(e?JSON.parse(e):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ST=1e3,PT=10;class Qm extends Ym{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,e)=>this.onStorageEvent(t,e),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Um(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const e of Object.keys(this.listeners)){const i=this.storage.getItem(e),s=this.localCache[e];i!==s&&t(e,s,i)}}onStorageEvent(t,e=!1){if(!t.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=t.key;e?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!e&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);G0()&&r!==t.newValue&&t.newValue!==t.oldValue?setTimeout(s,PT):s()}notifyListeners(t,e){this.localCache[t]=e;const i=this.listeners[t];if(i)for(const s of Array.from(i))s(e&&JSON.parse(e))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,e,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:e,newValue:i}),!0)})},ST)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,e){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,e){await super._set(t,e),this.localCache[t]=JSON.stringify(e)}async _get(t){const e=await super._get(t);return this.localCache[t]=JSON.stringify(e),e}async _remove(t){await super._remove(t),delete this.localCache[t]}}Qm.type="LOCAL";const RT=Qm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm extends Ym{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,e){}_removeListener(t,e){}}Xm.type="SESSION";const Jm=Xm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CT(n){return Promise.all(n.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(e){return{fulfilled:!1,reason:e}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const e=this.receivers.find(s=>s.isListeningto(t));if(e)return e;const i=new Za(t);return this.receivers.push(i),i}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const e=t,{eventId:i,eventType:s,data:r}=e.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;e.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(e.origin,r)),c=await CT(a);e.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(t,e){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(e)}_unsubscribe(t,e){this.handlersMap[t]&&e&&this.handlersMap[t].delete(e),(!e||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Za.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ru(n="",t=10){let e="";for(let i=0;i<t;i++)e+=Math.floor(Math.random()*10);return n+e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kT{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,e,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=Ru("",20);s.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const f=d;if(f.data.eventId===l)switch(f.data.status){case"ack":clearTimeout(h),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(f.data.response);break;default:clearTimeout(h),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:l,data:e},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(){return window}function DT(n){Ue().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zm(){return typeof Ue().WorkerGlobalScope<"u"&&typeof Ue().importScripts=="function"}async function MT(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function OT(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function NT(){return Zm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t_="firebaseLocalStorageDb",VT=1,ba="firebaseLocalStorage",e_="fbase_key";class Xr{constructor(t){this.request=t}toPromise(){return new Promise((t,e)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{e(this.request.error)})})}}function tc(n,t){return n.transaction([ba],t?"readwrite":"readonly").objectStore(ba)}function LT(){const n=indexedDB.deleteDatabase(t_);return new Xr(n).toPromise()}function Fl(){const n=indexedDB.open(t_,VT);return new Promise((t,e)=>{n.addEventListener("error",()=>{e(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(ba,{keyPath:e_})}catch(s){e(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(ba)?t(i):(i.close(),await LT(),t(await Fl()))})})}async function mf(n,t,e){const i=tc(n,!0).put({[e_]:t,value:e});return new Xr(i).toPromise()}async function FT(n,t){const e=tc(n,!1).get(t),i=await new Xr(e).toPromise();return i===void 0?null:i.value}function _f(n,t){const e=tc(n,!0).delete(t);return new Xr(e).toPromise()}const UT=800,BT=3;class n_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Fl(),this.db)}async _withRetries(t){let e=0;for(;;)try{const i=await this._openDb();return await t(i)}catch(i){if(e++>BT)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Zm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Za._getInstance(NT()),this.receiver._subscribe("keyChanged",async(t,e)=>({keyProcessed:(await this._poll()).includes(e.key)})),this.receiver._subscribe("ping",async(t,e)=>["keyChanged"])}async initializeSender(){var e,i;if(this.activeServiceWorker=await MT(),!this.activeServiceWorker)return;this.sender=new kT(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(e=t[0])!=null&&e.fulfilled&&(i=t[0])!=null&&i.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||OT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await Fl();return await mf(t,ya,"1"),await _f(t,ya),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,e){return this._withPendingWrite(async()=>(await this._withRetries(i=>mf(i,t,e)),this.localCache[t]=e,this.notifyServiceWorker(t)))}async _get(t){const e=await this._withRetries(i=>FT(i,t));return this.localCache[t]=e,e}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(e=>_f(e,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(s=>{const r=tc(s,!1).getAll();return new Xr(r).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const e=[],i=new Set;if(t.length!==0)for(const{fbase_key:s,value:r}of t)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),e.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),e.push(s));return e}notifyListeners(t,e){this.localCache[t]=e;const i=this.listeners[t];if(i)for(const s of Array.from(i))s(e)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),UT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,e){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(e)}_removeListener(t,e){this.listeners[t]&&(this.listeners[t].delete(e),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}n_.type="LOCAL";const zT=n_;new Kr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $T(n,t){return t?en(t):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu extends Su{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return os(t,this._buildIdpRequest())}_linkToIdToken(t,e){return os(t,this._buildIdpRequest(e))}_getReauthenticationResolver(t){return os(t,this._buildIdpRequest())}_buildIdpRequest(t){const e={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(e.idToken=t),e}}function jT(n){return qm(n.auth,new Cu(n),n.bypassAuthState)}function HT(n){const{auth:t,user:e}=n;return W(e,t,"internal-error"),vT(e,new Cu(n),n.bypassAuthState)}async function WT(n){const{auth:t,user:e}=n;return W(e,t,"internal-error"),wT(e,new Cu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(t,e,i,s,r=!1){this.auth=t,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(e)?e:[e]}execute(){return new Promise(async(t,e)=>{this.pendingPromise={resolve:t,reject:e};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(t){const{urlResponse:e,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=t;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:e,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return jT;case"linkViaPopup":case"linkViaRedirect":return WT;case"reauthViaPopup":case"reauthViaRedirect":return HT;default:Se(this.auth,"internal-error")}}resolve(t){ln(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){ln(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qT=new Kr(2e3,1e4);class ns extends i_{constructor(t,e,i,s,r){super(t,e,s,r),this.provider=i,this.authWindow=null,this.pollId=null,ns.currentPopupAction&&ns.currentPopupAction.cancel(),ns.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return W(t,this.auth,"internal-error"),t}async onExecution(){ln(this.filter.length===1,"Popup operations only handle one event");const t=Ru();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(Fe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(Fe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ns.currentPopupAction=null}pollUserCancellation(){const t=()=>{var e,i;if((i=(e=this.authWindow)==null?void 0:e.window)!=null&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Fe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,qT.get())};t()}}ns.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GT="pendingRedirect",Ko=new Map;class KT extends i_{constructor(t,e,i=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],e,void 0,i),this.eventId=null}async execute(){let t=Ko.get(this.auth._key());if(!t){try{const i=await YT(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(i)}catch(e){t=()=>Promise.reject(e)}Ko.set(this.auth._key(),t)}return this.bypassAuthState||Ko.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const e=await this.auth._redirectUserForId(t.eventId);if(e)return this.user=e,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function YT(n,t){const e=JT(t),i=XT(n);if(!await i._isAvailable())return!1;const s=await i._get(e)==="true";return await i._remove(e),s}function QT(n,t){Ko.set(n._key(),t)}function XT(n){return en(n._redirectPersistence)}function JT(n){return Go(GT,n.config.apiKey,n.name)}async function ZT(n,t,e=!1){if(ue(n.app))return Promise.reject(on(n));const i=Bi(n),s=$T(i,t),o=await new KT(i,s,e).execute();return o&&!e&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,t)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tE=10*60*1e3;class eE{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let e=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(t,i)&&(e=!0,this.sendToConsumer(t,i),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!nE(t)||(this.hasHandledPotentialRedirect=!0,e||(this.queuedRedirectEvent=t,e=!0)),e}sendToConsumer(t,e){var i;if(t.error&&!s_(t)){const s=((i=t.error.code)==null?void 0:i.split("auth/")[1])||"internal-error";e.onError(Fe(this.auth,s))}else e.onAuthEvent(t)}isEventForConsumer(t,e){const i=e.eventId===null||!!t.eventId&&t.eventId===e.eventId;return e.filter.includes(t.type)&&i}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=tE&&this.cachedEventUids.clear(),this.cachedEventUids.has(yf(t))}saveEventToCache(t){this.cachedEventUids.add(yf(t)),this.lastProcessedEventTime=Date.now()}}function yf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(t=>t).join("-")}function s_({type:n,error:t}){return n==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function nE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return s_(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function iE(n,t={}){return oi(n,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,rE=/^https?/;async function oE(n){if(n.config.emulator)return;const{authorizedDomains:t}=await iE(n);for(const e of t)try{if(aE(e))return}catch{}Se(n,"unauthorized-domain")}function aE(n){const t=Nl(),{protocol:e,hostname:i}=new URL(t);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?e==="chrome-extension:"&&n.replace("chrome-extension://","")===t.replace("chrome-extension://",""):e==="chrome-extension:"&&o.hostname===i}if(!rE.test(e))return!1;if(sE.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cE=new Kr(3e4,6e4);function bf(){const n=Ue().___jsl;if(n!=null&&n.H){for(const t of Object.keys(n.H))if(n.H[t].r=n.H[t].r||[],n.H[t].L=n.H[t].L||[],n.H[t].r=[...n.H[t].L],n.CP)for(let e=0;e<n.CP.length;e++)n.CP[e]=null}}function lE(n){return new Promise((t,e)=>{var s,r,o;function i(){bf(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{bf(),e(Fe(n,"network-request-failed"))},timeout:cE.get()})}if((r=(s=Ue().gapi)==null?void 0:s.iframes)!=null&&r.Iframe)t(gapi.iframes.getContext());else if((o=Ue().gapi)!=null&&o.load)i();else{const a=nT("iframefcb");return Ue()[a]=()=>{gapi.load?i():e(Fe(n,"network-request-failed"))},zm(`${eT()}?onload=${a}`).catch(c=>e(c))}}).catch(t=>{throw Yo=null,t})}let Yo=null;function uE(n){return Yo=Yo||lE(n),Yo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hE=new Kr(5e3,15e3),dE="__/auth/iframe",fE="emulator/auth/iframe",pE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},gE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function mE(n){const t=n.config;W(t.authDomain,n,"auth-domain-config-required");const e=t.emulator?Iu(t,fE):`https://${n.config.authDomain}/${dE}`,i={apiKey:t.apiKey,appName:n.name,v:As},s=gE.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${e}?${Gr(i).slice(1)}`}async function _E(n){const t=await uE(n),e=Ue().gapi;return W(e,n,"internal-error"),t.open({where:document.body,url:mE(n),messageHandlersFilter:e.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:pE,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=Fe(n,"network-request-failed"),a=Ue().setTimeout(()=>{r(o)},hE.get());function c(){Ue().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},bE=500,wE=600,vE="_blank",TE="http://localhost";class wf{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function EE(n,t,e,i=bE,s=wE){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...yE,width:i.toString(),height:s.toString(),top:r,left:o},l=Yt().toLowerCase();e&&(a=Om(l)?vE:e),Dm(l)&&(t=t||TE,c.scrollbars="yes");const h=Object.entries(c).reduce((f,[m,_])=>`${f}${m}=${_},`,"");if(q0(l)&&a!=="_self")return IE(t||"",a),new wf(null);const d=window.open(t||"",a,h);W(d,n,"popup-blocked");try{d.focus()}catch{}return new wf(d)}function IE(n,t){const e=document.createElement("a");e.href=n,e.target=t;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),e.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AE="__/auth/handler",xE="emulator/auth/handler",SE=encodeURIComponent("fac");async function vf(n,t,e,i,s,r){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:e,redirectUrl:i,v:As,eventId:s};if(t instanceof Hm){t.setDefaultLanguage(n.languageCode),o.providerId=t.providerId||"",hv(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(t instanceof Qr){const h=t.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const c=await n._getAppCheckToken(),l=c?`#${SE}=${encodeURIComponent(c)}`:"";return`${PE(n)}?${Gr(a).slice(1)}${l}`}function PE({config:n}){return n.emulator?Iu(n,xE):`https://${n.authDomain}/${AE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al="webStorageSupport";class RE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Jm,this._completeRedirectFn=ZT,this._overrideRedirectResult=QT}async _openPopup(t,e,i,s){var o;ln((o=this.eventManagers[t._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const r=await vf(t,e,i,Nl(),s);return EE(t,r,Ru())}async _openRedirect(t,e,i,s){await this._originValidation(t);const r=await vf(t,e,i,Nl(),s);return DT(r),new Promise(()=>{})}_initialize(t){const e=t._key();if(this.eventManagers[e]){const{manager:s,promise:r}=this.eventManagers[e];return s?Promise.resolve(s):(ln(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(t);return this.eventManagers[e]={promise:i},i.catch(()=>{delete this.eventManagers[e]}),i}async initAndGetManager(t){const e=await _E(t),i=new eE(t);return e.register("authEvent",s=>(W(s==null?void 0:s.authEvent,t,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:i},this.iframes[t._key()]=e,i}_isIframeWebStorageSupported(t,e){this.iframes[t._key()].send(al,{type:al},s=>{var o;const r=(o=s==null?void 0:s[0])==null?void 0:o[al];r!==void 0&&e(!!r),Se(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const e=t._key();return this.originValidationPromises[e]||(this.originValidationPromises[e]=oE(t)),this.originValidationPromises[e]}get _shouldInitProactively(){return Um()||Mm()||xu()}}const CE=RE;var Tf="@firebase/auth",Ef="1.11.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const e=this.auth.onIdTokenChanged(i=>{t((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,e),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const e=this.internalListeners.get(t);e&&(this.internalListeners.delete(t),e(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ME(n){xe(new ye("auth",(t,{options:e})=>{const i=t.getProvider("app").getImmediate(),s=t.getProvider("heartbeat"),r=t.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Bm(n)},l=new J0(i,s,r,c);return cT(l,e),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,i)=>{t.getProvider("auth-internal").initialize()})),xe(new ye("auth-internal",t=>{const e=Bi(t.getProvider("auth").getImmediate());return(i=>new kE(i))(e)},"PRIVATE").setInstantiationMode("EXPLICIT")),oe(Tf,Ef,DE(n)),oe(Tf,Ef,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OE=5*60,NE=pm("authIdTokenMaxAge")||OE;let If=null;const VE=n=>async t=>{const e=t&&await t.getIdTokenResult(),i=e&&(new Date().getTime()-Date.parse(e.issuedAtTime))/1e3;if(i&&i>NE)return;const s=e==null?void 0:e.token;If!==s&&(If=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function LE(n=Xa()){const t=si(n,"auth");if(t.isInitialized())return t.getImmediate();const e=aT(n,{popupRedirectResolver:CE,persistence:[zT,RT,Jm]}),i=pm("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=VE(r.toString());IT(e,o,()=>o(e.currentUser)),ET(e,a=>o(a))}}const s=hm("auth");return s&&lT(e,`http://${s}`),e}function FE(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Z0({loadJS(n){return new Promise((t,e)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=t,i.onerror=s=>{const r=Fe("internal-error");r.customData=s,e(r)},i.type="text/javascript",i.charset="UTF-8",FE().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ME("Browser");var Af=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bn,r_;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,w){function T(){}T.prototype=w.prototype,E.F=w.prototype,E.prototype=new T,E.prototype.constructor=E,E.D=function(x,A,P){for(var I=Array(arguments.length-2),ct=2;ct<arguments.length;ct++)I[ct-2]=arguments[ct];return w.prototype[A].apply(x,I)}}function e(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(i,e),i.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,w,T){T||(T=0);const x=Array(16);if(typeof w=="string")for(var A=0;A<16;++A)x[A]=w.charCodeAt(T++)|w.charCodeAt(T++)<<8|w.charCodeAt(T++)<<16|w.charCodeAt(T++)<<24;else for(A=0;A<16;++A)x[A]=w[T++]|w[T++]<<8|w[T++]<<16|w[T++]<<24;w=E.g[0],T=E.g[1],A=E.g[2];let P=E.g[3],I;I=w+(P^T&(A^P))+x[0]+3614090360&4294967295,w=T+(I<<7&4294967295|I>>>25),I=P+(A^w&(T^A))+x[1]+3905402710&4294967295,P=w+(I<<12&4294967295|I>>>20),I=A+(T^P&(w^T))+x[2]+606105819&4294967295,A=P+(I<<17&4294967295|I>>>15),I=T+(w^A&(P^w))+x[3]+3250441966&4294967295,T=A+(I<<22&4294967295|I>>>10),I=w+(P^T&(A^P))+x[4]+4118548399&4294967295,w=T+(I<<7&4294967295|I>>>25),I=P+(A^w&(T^A))+x[5]+1200080426&4294967295,P=w+(I<<12&4294967295|I>>>20),I=A+(T^P&(w^T))+x[6]+2821735955&4294967295,A=P+(I<<17&4294967295|I>>>15),I=T+(w^A&(P^w))+x[7]+4249261313&4294967295,T=A+(I<<22&4294967295|I>>>10),I=w+(P^T&(A^P))+x[8]+1770035416&4294967295,w=T+(I<<7&4294967295|I>>>25),I=P+(A^w&(T^A))+x[9]+2336552879&4294967295,P=w+(I<<12&4294967295|I>>>20),I=A+(T^P&(w^T))+x[10]+4294925233&4294967295,A=P+(I<<17&4294967295|I>>>15),I=T+(w^A&(P^w))+x[11]+2304563134&4294967295,T=A+(I<<22&4294967295|I>>>10),I=w+(P^T&(A^P))+x[12]+1804603682&4294967295,w=T+(I<<7&4294967295|I>>>25),I=P+(A^w&(T^A))+x[13]+4254626195&4294967295,P=w+(I<<12&4294967295|I>>>20),I=A+(T^P&(w^T))+x[14]+2792965006&4294967295,A=P+(I<<17&4294967295|I>>>15),I=T+(w^A&(P^w))+x[15]+1236535329&4294967295,T=A+(I<<22&4294967295|I>>>10),I=w+(A^P&(T^A))+x[1]+4129170786&4294967295,w=T+(I<<5&4294967295|I>>>27),I=P+(T^A&(w^T))+x[6]+3225465664&4294967295,P=w+(I<<9&4294967295|I>>>23),I=A+(w^T&(P^w))+x[11]+643717713&4294967295,A=P+(I<<14&4294967295|I>>>18),I=T+(P^w&(A^P))+x[0]+3921069994&4294967295,T=A+(I<<20&4294967295|I>>>12),I=w+(A^P&(T^A))+x[5]+3593408605&4294967295,w=T+(I<<5&4294967295|I>>>27),I=P+(T^A&(w^T))+x[10]+38016083&4294967295,P=w+(I<<9&4294967295|I>>>23),I=A+(w^T&(P^w))+x[15]+3634488961&4294967295,A=P+(I<<14&4294967295|I>>>18),I=T+(P^w&(A^P))+x[4]+3889429448&4294967295,T=A+(I<<20&4294967295|I>>>12),I=w+(A^P&(T^A))+x[9]+568446438&4294967295,w=T+(I<<5&4294967295|I>>>27),I=P+(T^A&(w^T))+x[14]+3275163606&4294967295,P=w+(I<<9&4294967295|I>>>23),I=A+(w^T&(P^w))+x[3]+4107603335&4294967295,A=P+(I<<14&4294967295|I>>>18),I=T+(P^w&(A^P))+x[8]+1163531501&4294967295,T=A+(I<<20&4294967295|I>>>12),I=w+(A^P&(T^A))+x[13]+2850285829&4294967295,w=T+(I<<5&4294967295|I>>>27),I=P+(T^A&(w^T))+x[2]+4243563512&4294967295,P=w+(I<<9&4294967295|I>>>23),I=A+(w^T&(P^w))+x[7]+1735328473&4294967295,A=P+(I<<14&4294967295|I>>>18),I=T+(P^w&(A^P))+x[12]+2368359562&4294967295,T=A+(I<<20&4294967295|I>>>12),I=w+(T^A^P)+x[5]+4294588738&4294967295,w=T+(I<<4&4294967295|I>>>28),I=P+(w^T^A)+x[8]+2272392833&4294967295,P=w+(I<<11&4294967295|I>>>21),I=A+(P^w^T)+x[11]+1839030562&4294967295,A=P+(I<<16&4294967295|I>>>16),I=T+(A^P^w)+x[14]+4259657740&4294967295,T=A+(I<<23&4294967295|I>>>9),I=w+(T^A^P)+x[1]+2763975236&4294967295,w=T+(I<<4&4294967295|I>>>28),I=P+(w^T^A)+x[4]+1272893353&4294967295,P=w+(I<<11&4294967295|I>>>21),I=A+(P^w^T)+x[7]+4139469664&4294967295,A=P+(I<<16&4294967295|I>>>16),I=T+(A^P^w)+x[10]+3200236656&4294967295,T=A+(I<<23&4294967295|I>>>9),I=w+(T^A^P)+x[13]+681279174&4294967295,w=T+(I<<4&4294967295|I>>>28),I=P+(w^T^A)+x[0]+3936430074&4294967295,P=w+(I<<11&4294967295|I>>>21),I=A+(P^w^T)+x[3]+3572445317&4294967295,A=P+(I<<16&4294967295|I>>>16),I=T+(A^P^w)+x[6]+76029189&4294967295,T=A+(I<<23&4294967295|I>>>9),I=w+(T^A^P)+x[9]+3654602809&4294967295,w=T+(I<<4&4294967295|I>>>28),I=P+(w^T^A)+x[12]+3873151461&4294967295,P=w+(I<<11&4294967295|I>>>21),I=A+(P^w^T)+x[15]+530742520&4294967295,A=P+(I<<16&4294967295|I>>>16),I=T+(A^P^w)+x[2]+3299628645&4294967295,T=A+(I<<23&4294967295|I>>>9),I=w+(A^(T|~P))+x[0]+4096336452&4294967295,w=T+(I<<6&4294967295|I>>>26),I=P+(T^(w|~A))+x[7]+1126891415&4294967295,P=w+(I<<10&4294967295|I>>>22),I=A+(w^(P|~T))+x[14]+2878612391&4294967295,A=P+(I<<15&4294967295|I>>>17),I=T+(P^(A|~w))+x[5]+4237533241&4294967295,T=A+(I<<21&4294967295|I>>>11),I=w+(A^(T|~P))+x[12]+1700485571&4294967295,w=T+(I<<6&4294967295|I>>>26),I=P+(T^(w|~A))+x[3]+2399980690&4294967295,P=w+(I<<10&4294967295|I>>>22),I=A+(w^(P|~T))+x[10]+4293915773&4294967295,A=P+(I<<15&4294967295|I>>>17),I=T+(P^(A|~w))+x[1]+2240044497&4294967295,T=A+(I<<21&4294967295|I>>>11),I=w+(A^(T|~P))+x[8]+1873313359&4294967295,w=T+(I<<6&4294967295|I>>>26),I=P+(T^(w|~A))+x[15]+4264355552&4294967295,P=w+(I<<10&4294967295|I>>>22),I=A+(w^(P|~T))+x[6]+2734768916&4294967295,A=P+(I<<15&4294967295|I>>>17),I=T+(P^(A|~w))+x[13]+1309151649&4294967295,T=A+(I<<21&4294967295|I>>>11),I=w+(A^(T|~P))+x[4]+4149444226&4294967295,w=T+(I<<6&4294967295|I>>>26),I=P+(T^(w|~A))+x[11]+3174756917&4294967295,P=w+(I<<10&4294967295|I>>>22),I=A+(w^(P|~T))+x[2]+718787259&4294967295,A=P+(I<<15&4294967295|I>>>17),I=T+(P^(A|~w))+x[9]+3951481745&4294967295,E.g[0]=E.g[0]+w&4294967295,E.g[1]=E.g[1]+(A+(I<<21&4294967295|I>>>11))&4294967295,E.g[2]=E.g[2]+A&4294967295,E.g[3]=E.g[3]+P&4294967295}i.prototype.v=function(E,w){w===void 0&&(w=E.length);const T=w-this.blockSize,x=this.C;let A=this.h,P=0;for(;P<w;){if(A==0)for(;P<=T;)s(this,E,P),P+=this.blockSize;if(typeof E=="string"){for(;P<w;)if(x[A++]=E.charCodeAt(P++),A==this.blockSize){s(this,x),A=0;break}}else for(;P<w;)if(x[A++]=E[P++],A==this.blockSize){s(this,x),A=0;break}}this.h=A,this.o+=w},i.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var w=1;w<E.length-8;++w)E[w]=0;w=this.o*8;for(var T=E.length-8;T<E.length;++T)E[T]=w&255,w/=256;for(this.v(E),E=Array(16),w=0,T=0;T<4;++T)for(let x=0;x<32;x+=8)E[w++]=this.g[T]>>>x&255;return E};function r(E,w){var T=a;return Object.prototype.hasOwnProperty.call(T,E)?T[E]:T[E]=w(E)}function o(E,w){this.h=w;const T=[];let x=!0;for(let A=E.length-1;A>=0;A--){const P=E[A]|0;x&&P==w||(T[A]=P,x=!1)}this.g=T}var a={};function c(E){return-128<=E&&E<128?r(E,function(w){return new o([w|0],w<0?-1:0)}):new o([E|0],E<0?-1:0)}function l(E){if(isNaN(E)||!isFinite(E))return d;if(E<0)return v(l(-E));const w=[];let T=1;for(let x=0;E>=T;x++)w[x]=E/T|0,T*=4294967296;return new o(w,0)}function h(E,w){if(E.length==0)throw Error("number format error: empty string");if(w=w||10,w<2||36<w)throw Error("radix out of range: "+w);if(E.charAt(0)=="-")return v(h(E.substring(1),w));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const T=l(Math.pow(w,8));let x=d;for(let P=0;P<E.length;P+=8){var A=Math.min(8,E.length-P);const I=parseInt(E.substring(P,P+A),w);A<8?(A=l(Math.pow(w,A)),x=x.j(A).add(l(I))):(x=x.j(T),x=x.add(l(I)))}return x}var d=c(0),f=c(1),m=c(16777216);n=o.prototype,n.m=function(){if(b(this))return-v(this).m();let E=0,w=1;for(let T=0;T<this.g.length;T++){const x=this.i(T);E+=(x>=0?x:4294967296+x)*w,w*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(_(this))return"0";if(b(this))return"-"+v(this).toString(E);const w=l(Math.pow(E,6));var T=this;let x="";for(;;){const A=N(T,w).g;T=S(T,A.j(w));let P=((T.g.length>0?T.g[0]:T.h)>>>0).toString(E);if(T=A,_(T))return P+x;for(;P.length<6;)P="0"+P;x=P+x}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function _(E){if(E.h!=0)return!1;for(let w=0;w<E.g.length;w++)if(E.g[w]!=0)return!1;return!0}function b(E){return E.h==-1}n.l=function(E){return E=S(this,E),b(E)?-1:_(E)?0:1};function v(E){const w=E.g.length,T=[];for(let x=0;x<w;x++)T[x]=~E.g[x];return new o(T,~E.h).add(f)}n.abs=function(){return b(this)?v(this):this},n.add=function(E){const w=Math.max(this.g.length,E.g.length),T=[];let x=0;for(let A=0;A<=w;A++){let P=x+(this.i(A)&65535)+(E.i(A)&65535),I=(P>>>16)+(this.i(A)>>>16)+(E.i(A)>>>16);x=I>>>16,P&=65535,I&=65535,T[A]=I<<16|P}return new o(T,T[T.length-1]&-2147483648?-1:0)};function S(E,w){return E.add(v(w))}n.j=function(E){if(_(this)||_(E))return d;if(b(this))return b(E)?v(this).j(v(E)):v(v(this).j(E));if(b(E))return v(this.j(v(E)));if(this.l(m)<0&&E.l(m)<0)return l(this.m()*E.m());const w=this.g.length+E.g.length,T=[];for(var x=0;x<2*w;x++)T[x]=0;for(x=0;x<this.g.length;x++)for(let A=0;A<E.g.length;A++){const P=this.i(x)>>>16,I=this.i(x)&65535,ct=E.i(A)>>>16,J=E.i(A)&65535;T[2*x+2*A]+=I*J,R(T,2*x+2*A),T[2*x+2*A+1]+=P*J,R(T,2*x+2*A+1),T[2*x+2*A+1]+=I*ct,R(T,2*x+2*A+1),T[2*x+2*A+2]+=P*ct,R(T,2*x+2*A+2)}for(E=0;E<w;E++)T[E]=T[2*E+1]<<16|T[2*E];for(E=w;E<2*w;E++)T[E]=0;return new o(T,0)};function R(E,w){for(;(E[w]&65535)!=E[w];)E[w+1]+=E[w]>>>16,E[w]&=65535,w++}function D(E,w){this.g=E,this.h=w}function N(E,w){if(_(w))throw Error("division by zero");if(_(E))return new D(d,d);if(b(E))return w=N(v(E),w),new D(v(w.g),v(w.h));if(b(w))return w=N(E,v(w)),new D(v(w.g),w.h);if(E.g.length>30){if(b(E)||b(w))throw Error("slowDivide_ only works with positive integers.");for(var T=f,x=w;x.l(E)<=0;)T=M(T),x=M(x);var A=L(T,1),P=L(x,1);for(x=L(x,2),T=L(T,2);!_(x);){var I=P.add(x);I.l(E)<=0&&(A=A.add(T),P=I),x=L(x,1),T=L(T,1)}return w=S(E,A.j(w)),new D(A,w)}for(A=d;E.l(w)>=0;){for(T=Math.max(1,Math.floor(E.m()/w.m())),x=Math.ceil(Math.log(T)/Math.LN2),x=x<=48?1:Math.pow(2,x-48),P=l(T),I=P.j(w);b(I)||I.l(E)>0;)T-=x,P=l(T),I=P.j(w);_(P)&&(P=f),A=A.add(P),E=S(E,I)}return new D(A,E)}n.B=function(E){return N(this,E).h},n.and=function(E){const w=Math.max(this.g.length,E.g.length),T=[];for(let x=0;x<w;x++)T[x]=this.i(x)&E.i(x);return new o(T,this.h&E.h)},n.or=function(E){const w=Math.max(this.g.length,E.g.length),T=[];for(let x=0;x<w;x++)T[x]=this.i(x)|E.i(x);return new o(T,this.h|E.h)},n.xor=function(E){const w=Math.max(this.g.length,E.g.length),T=[];for(let x=0;x<w;x++)T[x]=this.i(x)^E.i(x);return new o(T,this.h^E.h)};function M(E){const w=E.g.length+1,T=[];for(let x=0;x<w;x++)T[x]=E.i(x)<<1|E.i(x-1)>>>31;return new o(T,E.h)}function L(E,w){const T=w>>5;w%=32;const x=E.g.length-T,A=[];for(let P=0;P<x;P++)A[P]=w>0?E.i(P+T)>>>w|E.i(P+T+1)<<32-w:E.i(P+T);return new o(A,E.h)}i.prototype.digest=i.prototype.A,i.prototype.reset=i.prototype.u,i.prototype.update=i.prototype.v,r_=i,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=h,Bn=o}).apply(typeof Af<"u"?Af:typeof self<"u"?self:typeof window<"u"?window:{});var Po=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var o_,sr,a_,Qo,Ul,c_,l_,u_;(function(){var n,t=Object.defineProperty;function e(u){u=[typeof globalThis=="object"&&globalThis,u,typeof window=="object"&&window,typeof self=="object"&&self,typeof Po=="object"&&Po];for(var p=0;p<u.length;++p){var g=u[p];if(g&&g.Math==Math)return g}throw Error("Cannot find global object")}var i=e(this);function s(u,p){if(p)t:{var g=i;u=u.split(".");for(var y=0;y<u.length-1;y++){var C=u[y];if(!(C in g))break t;g=g[C]}u=u[u.length-1],y=g[u],p=p(y),p!=y&&p!=null&&t(g,u,{configurable:!0,writable:!0,value:p})}}s("Symbol.dispose",function(u){return u||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(u){return u||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(u){return u||function(p){var g=[],y;for(y in p)Object.prototype.hasOwnProperty.call(p,y)&&g.push([y,p[y]]);return g}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var r=r||{},o=this||self;function a(u){var p=typeof u;return p=="object"&&u!=null||p=="function"}function c(u,p,g){return u.call.apply(u.bind,arguments)}function l(u,p,g){return l=c,l.apply(null,arguments)}function h(u,p){var g=Array.prototype.slice.call(arguments,1);return function(){var y=g.slice();return y.push.apply(y,arguments),u.apply(this,y)}}function d(u,p){function g(){}g.prototype=p.prototype,u.Z=p.prototype,u.prototype=new g,u.prototype.constructor=u,u.Ob=function(y,C,k){for(var F=Array(arguments.length-2),K=2;K<arguments.length;K++)F[K-2]=arguments[K];return p.prototype[C].apply(y,F)}}var f=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?u=>u&&AsyncContext.Snapshot.wrap(u):u=>u;function m(u){const p=u.length;if(p>0){const g=Array(p);for(let y=0;y<p;y++)g[y]=u[y];return g}return[]}function _(u,p){for(let y=1;y<arguments.length;y++){const C=arguments[y];var g=typeof C;if(g=g!="object"?g:C?Array.isArray(C)?"array":g:"null",g=="array"||g=="object"&&typeof C.length=="number"){g=u.length||0;const k=C.length||0;u.length=g+k;for(let F=0;F<k;F++)u[g+F]=C[F]}else u.push(C)}}class b{constructor(p,g){this.i=p,this.j=g,this.h=0,this.g=null}get(){let p;return this.h>0?(this.h--,p=this.g,this.g=p.next,p.next=null):p=this.i(),p}}function v(u){o.setTimeout(()=>{throw u},0)}function S(){var u=E;let p=null;return u.g&&(p=u.g,u.g=u.g.next,u.g||(u.h=null),p.next=null),p}class R{constructor(){this.h=this.g=null}add(p,g){const y=D.get();y.set(p,g),this.h?this.h.next=y:this.g=y,this.h=y}}var D=new b(()=>new N,u=>u.reset());class N{constructor(){this.next=this.g=this.h=null}set(p,g){this.h=p,this.g=g,this.next=null}reset(){this.next=this.g=this.h=null}}let M,L=!1,E=new R,w=()=>{const u=Promise.resolve(void 0);M=()=>{u.then(T)}};function T(){for(var u;u=S();){try{u.h.call(u.g)}catch(g){v(g)}var p=D;p.j(u),p.h<100&&(p.h++,u.next=p.g,p.g=u)}L=!1}function x(){this.u=this.u,this.C=this.C}x.prototype.u=!1,x.prototype.dispose=function(){this.u||(this.u=!0,this.N())},x.prototype[Symbol.dispose]=function(){this.dispose()},x.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function A(u,p){this.type=u,this.g=this.target=p,this.defaultPrevented=!1}A.prototype.h=function(){this.defaultPrevented=!0};var P=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var u=!1,p=Object.defineProperty({},"passive",{get:function(){u=!0}});try{const g=()=>{};o.addEventListener("test",g,p),o.removeEventListener("test",g,p)}catch{}return u}();function I(u){return/^[\s\xa0]*$/.test(u)}function ct(u,p){A.call(this,u?u.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,u&&this.init(u,p)}d(ct,A),ct.prototype.init=function(u,p){const g=this.type=u.type,y=u.changedTouches&&u.changedTouches.length?u.changedTouches[0]:null;this.target=u.target||u.srcElement,this.g=p,p=u.relatedTarget,p||(g=="mouseover"?p=u.fromElement:g=="mouseout"&&(p=u.toElement)),this.relatedTarget=p,y?(this.clientX=y.clientX!==void 0?y.clientX:y.pageX,this.clientY=y.clientY!==void 0?y.clientY:y.pageY,this.screenX=y.screenX||0,this.screenY=y.screenY||0):(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0),this.button=u.button,this.key=u.key||"",this.ctrlKey=u.ctrlKey,this.altKey=u.altKey,this.shiftKey=u.shiftKey,this.metaKey=u.metaKey,this.pointerId=u.pointerId||0,this.pointerType=u.pointerType,this.state=u.state,this.i=u,u.defaultPrevented&&ct.Z.h.call(this)},ct.prototype.h=function(){ct.Z.h.call(this);const u=this.i;u.preventDefault?u.preventDefault():u.returnValue=!1};var J="closure_listenable_"+(Math.random()*1e6|0),dt=0;function bt(u,p,g,y,C){this.listener=u,this.proxy=null,this.src=p,this.type=g,this.capture=!!y,this.ha=C,this.key=++dt,this.da=this.fa=!1}function $t(u){u.da=!0,u.listener=null,u.proxy=null,u.src=null,u.ha=null}function It(u,p,g){for(const y in u)p.call(g,u[y],y,u)}function mn(u,p){for(const g in u)p.call(void 0,u[g],g,u)}function ui(u){const p={};for(const g in u)p[g]=u[g];return p}const Ke="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _n(u,p){let g,y;for(let C=1;C<arguments.length;C++){y=arguments[C];for(g in y)u[g]=y[g];for(let k=0;k<Ke.length;k++)g=Ke[k],Object.prototype.hasOwnProperty.call(y,g)&&(u[g]=y[g])}}function me(u){this.src=u,this.g={},this.h=0}me.prototype.add=function(u,p,g,y,C){const k=u.toString();u=this.g[k],u||(u=this.g[k]=[],this.h++);const F=ve(u,p,y,C);return F>-1?(p=u[F],g||(p.fa=!1)):(p=new bt(p,this.src,k,!!y,C),p.fa=g,u.push(p)),p};function Ye(u,p){const g=p.type;if(g in u.g){var y=u.g[g],C=Array.prototype.indexOf.call(y,p,void 0),k;(k=C>=0)&&Array.prototype.splice.call(y,C,1),k&&($t(p),u.g[g].length==0&&(delete u.g[g],u.h--))}}function ve(u,p,g,y){for(let C=0;C<u.length;++C){const k=u[C];if(!k.da&&k.listener==p&&k.capture==!!g&&k.ha==y)return C}return-1}var Dc="closure_lm_"+(Math.random()*1e6|0),Mc={};function Yh(u,p,g,y,C){if(Array.isArray(p)){for(let k=0;k<p.length;k++)Yh(u,p[k],g,y,C);return null}return g=Jh(g),u&&u[J]?u.J(p,g,a(y)?!!y.capture:!1,C):dw(u,p,g,!1,y,C)}function dw(u,p,g,y,C,k){if(!p)throw Error("Invalid event type");const F=a(C)?!!C.capture:!!C;let K=Nc(u);if(K||(u[Dc]=K=new me(u)),g=K.add(p,g,y,F,k),g.proxy)return g;if(y=fw(),g.proxy=y,y.src=u,y.listener=g,u.addEventListener)P||(C=F),C===void 0&&(C=!1),u.addEventListener(p.toString(),y,C);else if(u.attachEvent)u.attachEvent(Xh(p.toString()),y);else if(u.addListener&&u.removeListener)u.addListener(y);else throw Error("addEventListener and attachEvent are unavailable.");return g}function fw(){function u(g){return p.call(u.src,u.listener,g)}const p=pw;return u}function Qh(u,p,g,y,C){if(Array.isArray(p))for(var k=0;k<p.length;k++)Qh(u,p[k],g,y,C);else y=a(y)?!!y.capture:!!y,g=Jh(g),u&&u[J]?(u=u.i,k=String(p).toString(),k in u.g&&(p=u.g[k],g=ve(p,g,y,C),g>-1&&($t(p[g]),Array.prototype.splice.call(p,g,1),p.length==0&&(delete u.g[k],u.h--)))):u&&(u=Nc(u))&&(p=u.g[p.toString()],u=-1,p&&(u=ve(p,g,y,C)),(g=u>-1?p[u]:null)&&Oc(g))}function Oc(u){if(typeof u!="number"&&u&&!u.da){var p=u.src;if(p&&p[J])Ye(p.i,u);else{var g=u.type,y=u.proxy;p.removeEventListener?p.removeEventListener(g,y,u.capture):p.detachEvent?p.detachEvent(Xh(g),y):p.addListener&&p.removeListener&&p.removeListener(y),(g=Nc(p))?(Ye(g,u),g.h==0&&(g.src=null,p[Dc]=null)):$t(u)}}}function Xh(u){return u in Mc?Mc[u]:Mc[u]="on"+u}function pw(u,p){if(u.da)u=!0;else{p=new ct(p,this);const g=u.listener,y=u.ha||u.src;u.fa&&Oc(u),u=g.call(y,p)}return u}function Nc(u){return u=u[Dc],u instanceof me?u:null}var Vc="__closure_events_fn_"+(Math.random()*1e9>>>0);function Jh(u){return typeof u=="function"?u:(u[Vc]||(u[Vc]=function(p){return u.handleEvent(p)}),u[Vc])}function jt(){x.call(this),this.i=new me(this),this.M=this,this.G=null}d(jt,x),jt.prototype[J]=!0,jt.prototype.removeEventListener=function(u,p,g,y){Qh(this,u,p,g,y)};function Xt(u,p){var g,y=u.G;if(y)for(g=[];y;y=y.G)g.push(y);if(u=u.M,y=p.type||p,typeof p=="string")p=new A(p,u);else if(p instanceof A)p.target=p.target||u;else{var C=p;p=new A(y,u),_n(p,C)}C=!0;let k,F;if(g)for(F=g.length-1;F>=0;F--)k=p.g=g[F],C=go(k,y,!0,p)&&C;if(k=p.g=u,C=go(k,y,!0,p)&&C,C=go(k,y,!1,p)&&C,g)for(F=0;F<g.length;F++)k=p.g=g[F],C=go(k,y,!1,p)&&C}jt.prototype.N=function(){if(jt.Z.N.call(this),this.i){var u=this.i;for(const p in u.g){const g=u.g[p];for(let y=0;y<g.length;y++)$t(g[y]);delete u.g[p],u.h--}}this.G=null},jt.prototype.J=function(u,p,g,y){return this.i.add(String(u),p,!1,g,y)},jt.prototype.K=function(u,p,g,y){return this.i.add(String(u),p,!0,g,y)};function go(u,p,g,y){if(p=u.i.g[String(p)],!p)return!0;p=p.concat();let C=!0;for(let k=0;k<p.length;++k){const F=p[k];if(F&&!F.da&&F.capture==g){const K=F.listener,Ct=F.ha||F.src;F.fa&&Ye(u.i,F),C=K.call(Ct,y)!==!1&&C}}return C&&!y.defaultPrevented}function gw(u,p){if(typeof u!="function")if(u&&typeof u.handleEvent=="function")u=l(u.handleEvent,u);else throw Error("Invalid listener argument");return Number(p)>2147483647?-1:o.setTimeout(u,p||0)}function Zh(u){u.g=gw(()=>{u.g=null,u.i&&(u.i=!1,Zh(u))},u.l);const p=u.h;u.h=null,u.m.apply(null,p)}class mw extends x{constructor(p,g){super(),this.m=p,this.l=g,this.h=null,this.i=!1,this.g=null}j(p){this.h=arguments,this.g?this.i=!0:Zh(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ns(u){x.call(this),this.h=u,this.g={}}d(Ns,x);var td=[];function ed(u){It(u.g,function(p,g){this.g.hasOwnProperty(g)&&Oc(p)},u),u.g={}}Ns.prototype.N=function(){Ns.Z.N.call(this),ed(this)},Ns.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Lc=o.JSON.stringify,_w=o.JSON.parse,yw=class{stringify(u){return o.JSON.stringify(u,void 0)}parse(u){return o.JSON.parse(u,void 0)}};function nd(){}function id(){}var Vs={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Fc(){A.call(this,"d")}d(Fc,A);function Uc(){A.call(this,"c")}d(Uc,A);var hi={},sd=null;function mo(){return sd=sd||new jt}hi.Ia="serverreachability";function rd(u){A.call(this,hi.Ia,u)}d(rd,A);function Ls(u){const p=mo();Xt(p,new rd(p))}hi.STAT_EVENT="statevent";function od(u,p){A.call(this,hi.STAT_EVENT,u),this.stat=p}d(od,A);function Jt(u){const p=mo();Xt(p,new od(p,u))}hi.Ja="timingevent";function ad(u,p){A.call(this,hi.Ja,u),this.size=p}d(ad,A);function Fs(u,p){if(typeof u!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){u()},p)}function Us(){this.g=!0}Us.prototype.ua=function(){this.g=!1};function bw(u,p,g,y,C,k){u.info(function(){if(u.g)if(k){var F="",K=k.split("&");for(let ut=0;ut<K.length;ut++){var Ct=K[ut].split("=");if(Ct.length>1){const Ot=Ct[0];Ct=Ct[1];const De=Ot.split("_");F=De.length>=2&&De[1]=="type"?F+(Ot+"="+Ct+"&"):F+(Ot+"=redacted&")}}}else F=null;else F=k;return"XMLHTTP REQ ("+y+") [attempt "+C+"]: "+p+`
`+g+`
`+F})}function ww(u,p,g,y,C,k,F){u.info(function(){return"XMLHTTP RESP ("+y+") [ attempt "+C+"]: "+p+`
`+g+`
`+k+" "+F})}function Gi(u,p,g,y){u.info(function(){return"XMLHTTP TEXT ("+p+"): "+Tw(u,g)+(y?" "+y:"")})}function vw(u,p){u.info(function(){return"TIMEOUT: "+p})}Us.prototype.info=function(){};function Tw(u,p){if(!u.g)return p;if(!p)return null;try{const k=JSON.parse(p);if(k){for(u=0;u<k.length;u++)if(Array.isArray(k[u])){var g=k[u];if(!(g.length<2)){var y=g[1];if(Array.isArray(y)&&!(y.length<1)){var C=y[0];if(C!="noop"&&C!="stop"&&C!="close")for(let F=1;F<y.length;F++)y[F]=""}}}}return Lc(k)}catch{return p}}var _o={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},cd={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},ld;function Bc(){}d(Bc,nd),Bc.prototype.g=function(){return new XMLHttpRequest},ld=new Bc;function Bs(u){return encodeURIComponent(String(u))}function Ew(u){var p=1;u=u.split(":");const g=[];for(;p>0&&u.length;)g.push(u.shift()),p--;return u.length&&g.push(u.join(":")),g}function yn(u,p,g,y){this.j=u,this.i=p,this.l=g,this.S=y||1,this.V=new Ns(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ud}function ud(){this.i=null,this.g="",this.h=!1}var hd={},zc={};function $c(u,p,g){u.M=1,u.A=bo(ke(p)),u.u=g,u.R=!0,dd(u,null)}function dd(u,p){u.F=Date.now(),yo(u),u.B=ke(u.A);var g=u.B,y=u.S;Array.isArray(y)||(y=[String(y)]),Ad(g.i,"t",y),u.C=0,g=u.j.L,u.h=new ud,u.g=jd(u.j,g?p:null,!u.u),u.P>0&&(u.O=new mw(l(u.Y,u,u.g),u.P)),p=u.V,g=u.g,y=u.ba;var C="readystatechange";Array.isArray(C)||(C&&(td[0]=C.toString()),C=td);for(let k=0;k<C.length;k++){const F=Yh(g,C[k],y||p.handleEvent,!1,p.h||p);if(!F)break;p.g[F.key]=F}p=u.J?ui(u.J):{},u.u?(u.v||(u.v="POST"),p["Content-Type"]="application/x-www-form-urlencoded",u.g.ea(u.B,u.v,u.u,p)):(u.v="GET",u.g.ea(u.B,u.v,null,p)),Ls(),bw(u.i,u.v,u.B,u.l,u.S,u.u)}yn.prototype.ba=function(u){u=u.target;const p=this.O;p&&vn(u)==3?p.j():this.Y(u)},yn.prototype.Y=function(u){try{if(u==this.g)t:{const K=vn(this.g),Ct=this.g.ya(),ut=this.g.ca();if(!(K<3)&&(K!=3||this.g&&(this.h.h||this.g.la()||Dd(this.g)))){this.K||K!=4||Ct==7||(Ct==8||ut<=0?Ls(3):Ls(2)),jc(this);var p=this.g.ca();this.X=p;var g=Iw(this);if(this.o=p==200,ww(this.i,this.v,this.B,this.l,this.S,K,p),this.o){if(this.U&&!this.L){e:{if(this.g){var y,C=this.g;if((y=C.g?C.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!I(y)){var k=y;break e}}k=null}if(u=k)Gi(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Hc(this,u);else{this.o=!1,this.m=3,Jt(12),di(this),zs(this);break t}}if(this.R){u=!0;let Ot;for(;!this.K&&this.C<g.length;)if(Ot=Aw(this,g),Ot==zc){K==4&&(this.m=4,Jt(14),u=!1),Gi(this.i,this.l,null,"[Incomplete Response]");break}else if(Ot==hd){this.m=4,Jt(15),Gi(this.i,this.l,g,"[Invalid Chunk]"),u=!1;break}else Gi(this.i,this.l,Ot,null),Hc(this,Ot);if(fd(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),K!=4||g.length!=0||this.h.h||(this.m=1,Jt(16),u=!1),this.o=this.o&&u,!u)Gi(this.i,this.l,g,"[Invalid Chunked Response]"),di(this),zs(this);else if(g.length>0&&!this.W){this.W=!0;var F=this.j;F.g==this&&F.aa&&!F.P&&(F.j.info("Great, no buffering proxy detected. Bytes received: "+g.length),Jc(F),F.P=!0,Jt(11))}}else Gi(this.i,this.l,g,null),Hc(this,g);K==4&&di(this),this.o&&!this.K&&(K==4?Ud(this.j,this):(this.o=!1,yo(this)))}else Uw(this.g),p==400&&g.indexOf("Unknown SID")>0?(this.m=3,Jt(12)):(this.m=0,Jt(13)),di(this),zs(this)}}}catch{}finally{}};function Iw(u){if(!fd(u))return u.g.la();const p=Dd(u.g);if(p==="")return"";let g="";const y=p.length,C=vn(u.g)==4;if(!u.h.i){if(typeof TextDecoder>"u")return di(u),zs(u),"";u.h.i=new o.TextDecoder}for(let k=0;k<y;k++)u.h.h=!0,g+=u.h.i.decode(p[k],{stream:!(C&&k==y-1)});return p.length=0,u.h.g+=g,u.C=0,u.h.g}function fd(u){return u.g?u.v=="GET"&&u.M!=2&&u.j.Aa:!1}function Aw(u,p){var g=u.C,y=p.indexOf(`
`,g);return y==-1?zc:(g=Number(p.substring(g,y)),isNaN(g)?hd:(y+=1,y+g>p.length?zc:(p=p.slice(y,y+g),u.C=y+g,p)))}yn.prototype.cancel=function(){this.K=!0,di(this)};function yo(u){u.T=Date.now()+u.H,pd(u,u.H)}function pd(u,p){if(u.D!=null)throw Error("WatchDog timer not null");u.D=Fs(l(u.aa,u),p)}function jc(u){u.D&&(o.clearTimeout(u.D),u.D=null)}yn.prototype.aa=function(){this.D=null;const u=Date.now();u-this.T>=0?(vw(this.i,this.B),this.M!=2&&(Ls(),Jt(17)),di(this),this.m=2,zs(this)):pd(this,this.T-u)};function zs(u){u.j.I==0||u.K||Ud(u.j,u)}function di(u){jc(u);var p=u.O;p&&typeof p.dispose=="function"&&p.dispose(),u.O=null,ed(u.V),u.g&&(p=u.g,u.g=null,p.abort(),p.dispose())}function Hc(u,p){try{var g=u.j;if(g.I!=0&&(g.g==u||Wc(g.h,u))){if(!u.L&&Wc(g.h,u)&&g.I==3){try{var y=g.Ba.g.parse(p)}catch{y=null}if(Array.isArray(y)&&y.length==3){var C=y;if(C[0]==0){t:if(!g.v){if(g.g)if(g.g.F+3e3<u.F)Io(g),To(g);else break t;Xc(g),Jt(18)}}else g.xa=C[1],0<g.xa-g.K&&C[2]<37500&&g.F&&g.A==0&&!g.C&&(g.C=Fs(l(g.Va,g),6e3));_d(g.h)<=1&&g.ta&&(g.ta=void 0)}else pi(g,11)}else if((u.L||g.g==u)&&Io(g),!I(p))for(C=g.Ba.g.parse(p),p=0;p<C.length;p++){let ut=C[p];const Ot=ut[0];if(!(Ot<=g.K))if(g.K=Ot,ut=ut[1],g.I==2)if(ut[0]=="c"){g.M=ut[1],g.ba=ut[2];const De=ut[3];De!=null&&(g.ka=De,g.j.info("VER="+g.ka));const gi=ut[4];gi!=null&&(g.za=gi,g.j.info("SVER="+g.za));const Tn=ut[5];Tn!=null&&typeof Tn=="number"&&Tn>0&&(y=1.5*Tn,g.O=y,g.j.info("backChannelRequestTimeoutMs_="+y)),y=g;const En=u.g;if(En){const xo=En.g?En.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(xo){var k=y.h;k.g||xo.indexOf("spdy")==-1&&xo.indexOf("quic")==-1&&xo.indexOf("h2")==-1||(k.j=k.l,k.g=new Set,k.h&&(qc(k,k.h),k.h=null))}if(y.G){const Zc=En.g?En.g.getResponseHeader("X-HTTP-Session-Id"):null;Zc&&(y.wa=Zc,pt(y.J,y.G,Zc))}}g.I=3,g.l&&g.l.ra(),g.aa&&(g.T=Date.now()-u.F,g.j.info("Handshake RTT: "+g.T+"ms")),y=g;var F=u;if(y.na=$d(y,y.L?y.ba:null,y.W),F.L){yd(y.h,F);var K=F,Ct=y.O;Ct&&(K.H=Ct),K.D&&(jc(K),yo(K)),y.g=F}else Ld(y);g.i.length>0&&Eo(g)}else ut[0]!="stop"&&ut[0]!="close"||pi(g,7);else g.I==3&&(ut[0]=="stop"||ut[0]=="close"?ut[0]=="stop"?pi(g,7):Qc(g):ut[0]!="noop"&&g.l&&g.l.qa(ut),g.A=0)}}Ls(4)}catch{}}var xw=class{constructor(u,p){this.g=u,this.map=p}};function gd(u){this.l=u||10,o.PerformanceNavigationTiming?(u=o.performance.getEntriesByType("navigation"),u=u.length>0&&(u[0].nextHopProtocol=="hq"||u[0].nextHopProtocol=="h2")):u=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=u?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function md(u){return u.h?!0:u.g?u.g.size>=u.j:!1}function _d(u){return u.h?1:u.g?u.g.size:0}function Wc(u,p){return u.h?u.h==p:u.g?u.g.has(p):!1}function qc(u,p){u.g?u.g.add(p):u.h=p}function yd(u,p){u.h&&u.h==p?u.h=null:u.g&&u.g.has(p)&&u.g.delete(p)}gd.prototype.cancel=function(){if(this.i=bd(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const u of this.g.values())u.cancel();this.g.clear()}};function bd(u){if(u.h!=null)return u.i.concat(u.h.G);if(u.g!=null&&u.g.size!==0){let p=u.i;for(const g of u.g.values())p=p.concat(g.G);return p}return m(u.i)}var wd=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Sw(u,p){if(u){u=u.split("&");for(let g=0;g<u.length;g++){const y=u[g].indexOf("=");let C,k=null;y>=0?(C=u[g].substring(0,y),k=u[g].substring(y+1)):C=u[g],p(C,k?decodeURIComponent(k.replace(/\+/g," ")):"")}}}function bn(u){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let p;u instanceof bn?(this.l=u.l,$s(this,u.j),this.o=u.o,this.g=u.g,js(this,u.u),this.h=u.h,Gc(this,xd(u.i)),this.m=u.m):u&&(p=String(u).match(wd))?(this.l=!1,$s(this,p[1]||"",!0),this.o=Hs(p[2]||""),this.g=Hs(p[3]||"",!0),js(this,p[4]),this.h=Hs(p[5]||"",!0),Gc(this,p[6]||"",!0),this.m=Hs(p[7]||"")):(this.l=!1,this.i=new qs(null,this.l))}bn.prototype.toString=function(){const u=[];var p=this.j;p&&u.push(Ws(p,vd,!0),":");var g=this.g;return(g||p=="file")&&(u.push("//"),(p=this.o)&&u.push(Ws(p,vd,!0),"@"),u.push(Bs(g).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),g=this.u,g!=null&&u.push(":",String(g))),(g=this.h)&&(this.g&&g.charAt(0)!="/"&&u.push("/"),u.push(Ws(g,g.charAt(0)=="/"?Cw:Rw,!0))),(g=this.i.toString())&&u.push("?",g),(g=this.m)&&u.push("#",Ws(g,Dw)),u.join("")},bn.prototype.resolve=function(u){const p=ke(this);let g=!!u.j;g?$s(p,u.j):g=!!u.o,g?p.o=u.o:g=!!u.g,g?p.g=u.g:g=u.u!=null;var y=u.h;if(g)js(p,u.u);else if(g=!!u.h){if(y.charAt(0)!="/")if(this.g&&!this.h)y="/"+y;else{var C=p.h.lastIndexOf("/");C!=-1&&(y=p.h.slice(0,C+1)+y)}if(C=y,C==".."||C==".")y="";else if(C.indexOf("./")!=-1||C.indexOf("/.")!=-1){y=C.lastIndexOf("/",0)==0,C=C.split("/");const k=[];for(let F=0;F<C.length;){const K=C[F++];K=="."?y&&F==C.length&&k.push(""):K==".."?((k.length>1||k.length==1&&k[0]!="")&&k.pop(),y&&F==C.length&&k.push("")):(k.push(K),y=!0)}y=k.join("/")}else y=C}return g?p.h=y:g=u.i.toString()!=="",g?Gc(p,xd(u.i)):g=!!u.m,g&&(p.m=u.m),p};function ke(u){return new bn(u)}function $s(u,p,g){u.j=g?Hs(p,!0):p,u.j&&(u.j=u.j.replace(/:$/,""))}function js(u,p){if(p){if(p=Number(p),isNaN(p)||p<0)throw Error("Bad port number "+p);u.u=p}else u.u=null}function Gc(u,p,g){p instanceof qs?(u.i=p,Mw(u.i,u.l)):(g||(p=Ws(p,kw)),u.i=new qs(p,u.l))}function pt(u,p,g){u.i.set(p,g)}function bo(u){return pt(u,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),u}function Hs(u,p){return u?p?decodeURI(u.replace(/%25/g,"%2525")):decodeURIComponent(u):""}function Ws(u,p,g){return typeof u=="string"?(u=encodeURI(u).replace(p,Pw),g&&(u=u.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u):null}function Pw(u){return u=u.charCodeAt(0),"%"+(u>>4&15).toString(16)+(u&15).toString(16)}var vd=/[#\/\?@]/g,Rw=/[#\?:]/g,Cw=/[#\?]/g,kw=/[#\?@]/g,Dw=/#/g;function qs(u,p){this.h=this.g=null,this.i=u||null,this.j=!!p}function fi(u){u.g||(u.g=new Map,u.h=0,u.i&&Sw(u.i,function(p,g){u.add(decodeURIComponent(p.replace(/\+/g," ")),g)}))}n=qs.prototype,n.add=function(u,p){fi(this),this.i=null,u=Ki(this,u);let g=this.g.get(u);return g||this.g.set(u,g=[]),g.push(p),this.h+=1,this};function Td(u,p){fi(u),p=Ki(u,p),u.g.has(p)&&(u.i=null,u.h-=u.g.get(p).length,u.g.delete(p))}function Ed(u,p){return fi(u),p=Ki(u,p),u.g.has(p)}n.forEach=function(u,p){fi(this),this.g.forEach(function(g,y){g.forEach(function(C){u.call(p,C,y,this)},this)},this)};function Id(u,p){fi(u);let g=[];if(typeof p=="string")Ed(u,p)&&(g=g.concat(u.g.get(Ki(u,p))));else for(u=Array.from(u.g.values()),p=0;p<u.length;p++)g=g.concat(u[p]);return g}n.set=function(u,p){return fi(this),this.i=null,u=Ki(this,u),Ed(this,u)&&(this.h-=this.g.get(u).length),this.g.set(u,[p]),this.h+=1,this},n.get=function(u,p){return u?(u=Id(this,u),u.length>0?String(u[0]):p):p};function Ad(u,p,g){Td(u,p),g.length>0&&(u.i=null,u.g.set(Ki(u,p),m(g)),u.h+=g.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const u=[],p=Array.from(this.g.keys());for(let y=0;y<p.length;y++){var g=p[y];const C=Bs(g);g=Id(this,g);for(let k=0;k<g.length;k++){let F=C;g[k]!==""&&(F+="="+Bs(g[k])),u.push(F)}}return this.i=u.join("&")};function xd(u){const p=new qs;return p.i=u.i,u.g&&(p.g=new Map(u.g),p.h=u.h),p}function Ki(u,p){return p=String(p),u.j&&(p=p.toLowerCase()),p}function Mw(u,p){p&&!u.j&&(fi(u),u.i=null,u.g.forEach(function(g,y){const C=y.toLowerCase();y!=C&&(Td(this,y),Ad(this,C,g))},u)),u.j=p}function Ow(u,p){const g=new Us;if(o.Image){const y=new Image;y.onload=h(wn,g,"TestLoadImage: loaded",!0,p,y),y.onerror=h(wn,g,"TestLoadImage: error",!1,p,y),y.onabort=h(wn,g,"TestLoadImage: abort",!1,p,y),y.ontimeout=h(wn,g,"TestLoadImage: timeout",!1,p,y),o.setTimeout(function(){y.ontimeout&&y.ontimeout()},1e4),y.src=u}else p(!1)}function Nw(u,p){const g=new Us,y=new AbortController,C=setTimeout(()=>{y.abort(),wn(g,"TestPingServer: timeout",!1,p)},1e4);fetch(u,{signal:y.signal}).then(k=>{clearTimeout(C),k.ok?wn(g,"TestPingServer: ok",!0,p):wn(g,"TestPingServer: server error",!1,p)}).catch(()=>{clearTimeout(C),wn(g,"TestPingServer: error",!1,p)})}function wn(u,p,g,y,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),y(g)}catch{}}function Vw(){this.g=new yw}function Kc(u){this.i=u.Sb||null,this.h=u.ab||!1}d(Kc,nd),Kc.prototype.g=function(){return new wo(this.i,this.h)};function wo(u,p){jt.call(this),this.H=u,this.o=p,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}d(wo,jt),n=wo.prototype,n.open=function(u,p){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=u,this.D=p,this.readyState=1,Ks(this)},n.send=function(u){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const p={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};u&&(p.body=u),(this.H||o).fetch(new Request(this.D,p)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Gs(this)),this.readyState=0},n.Pa=function(u){if(this.g&&(this.l=u,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=u.headers,this.readyState=2,Ks(this)),this.g&&(this.readyState=3,Ks(this),this.g)))if(this.responseType==="arraybuffer")u.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in u){if(this.j=u.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Sd(this)}else u.text().then(this.Oa.bind(this),this.ga.bind(this))};function Sd(u){u.j.read().then(u.Ma.bind(u)).catch(u.ga.bind(u))}n.Ma=function(u){if(this.g){if(this.o&&u.value)this.response.push(u.value);else if(!this.o){var p=u.value?u.value:new Uint8Array(0);(p=this.B.decode(p,{stream:!u.done}))&&(this.response=this.responseText+=p)}u.done?Gs(this):Ks(this),this.readyState==3&&Sd(this)}},n.Oa=function(u){this.g&&(this.response=this.responseText=u,Gs(this))},n.Na=function(u){this.g&&(this.response=u,Gs(this))},n.ga=function(){this.g&&Gs(this)};function Gs(u){u.readyState=4,u.l=null,u.j=null,u.B=null,Ks(u)}n.setRequestHeader=function(u,p){this.A.append(u,p)},n.getResponseHeader=function(u){return this.h&&this.h.get(u.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const u=[],p=this.h.entries();for(var g=p.next();!g.done;)g=g.value,u.push(g[0]+": "+g[1]),g=p.next();return u.join(`\r
`)};function Ks(u){u.onreadystatechange&&u.onreadystatechange.call(u)}Object.defineProperty(wo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(u){this.m=u?"include":"same-origin"}});function Pd(u){let p="";return It(u,function(g,y){p+=y,p+=":",p+=g,p+=`\r
`}),p}function Yc(u,p,g){t:{for(y in g){var y=!1;break t}y=!0}y||(g=Pd(g),typeof u=="string"?g!=null&&Bs(g):pt(u,p,g))}function vt(u){jt.call(this),this.headers=new Map,this.L=u||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}d(vt,jt);var Lw=/^https?$/i,Fw=["POST","PUT"];n=vt.prototype,n.Fa=function(u){this.H=u},n.ea=function(u,p,g,y){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+u);p=p?p.toUpperCase():"GET",this.D=u,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ld.g(),this.g.onreadystatechange=f(l(this.Ca,this));try{this.B=!0,this.g.open(p,String(u),!0),this.B=!1}catch(k){Rd(this,k);return}if(u=g||"",g=new Map(this.headers),y)if(Object.getPrototypeOf(y)===Object.prototype)for(var C in y)g.set(C,y[C]);else if(typeof y.keys=="function"&&typeof y.get=="function")for(const k of y.keys())g.set(k,y.get(k));else throw Error("Unknown input type for opt_headers: "+String(y));y=Array.from(g.keys()).find(k=>k.toLowerCase()=="content-type"),C=o.FormData&&u instanceof o.FormData,!(Array.prototype.indexOf.call(Fw,p,void 0)>=0)||y||C||g.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[k,F]of g)this.g.setRequestHeader(k,F);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(u),this.v=!1}catch(k){Rd(this,k)}};function Rd(u,p){u.h=!1,u.g&&(u.j=!0,u.g.abort(),u.j=!1),u.l=p,u.o=5,Cd(u),vo(u)}function Cd(u){u.A||(u.A=!0,Xt(u,"complete"),Xt(u,"error"))}n.abort=function(u){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=u||7,Xt(this,"complete"),Xt(this,"abort"),vo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),vo(this,!0)),vt.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?kd(this):this.Xa())},n.Xa=function(){kd(this)};function kd(u){if(u.h&&typeof r<"u"){if(u.v&&vn(u)==4)setTimeout(u.Ca.bind(u),0);else if(Xt(u,"readystatechange"),vn(u)==4){u.h=!1;try{const k=u.ca();t:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var p=!0;break t;default:p=!1}var g;if(!(g=p)){var y;if(y=k===0){let F=String(u.D).match(wd)[1]||null;!F&&o.self&&o.self.location&&(F=o.self.location.protocol.slice(0,-1)),y=!Lw.test(F?F.toLowerCase():"")}g=y}if(g)Xt(u,"complete"),Xt(u,"success");else{u.o=6;try{var C=vn(u)>2?u.g.statusText:""}catch{C=""}u.l=C+" ["+u.ca()+"]",Cd(u)}}finally{vo(u)}}}}function vo(u,p){if(u.g){u.m&&(clearTimeout(u.m),u.m=null);const g=u.g;u.g=null,p||Xt(u,"ready");try{g.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function vn(u){return u.g?u.g.readyState:0}n.ca=function(){try{return vn(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(u){if(this.g){var p=this.g.responseText;return u&&p.indexOf(u)==0&&(p=p.substring(u.length)),_w(p)}};function Dd(u){try{if(!u.g)return null;if("response"in u.g)return u.g.response;switch(u.F){case"":case"text":return u.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in u.g)return u.g.mozResponseArrayBuffer}return null}catch{return null}}function Uw(u){const p={};u=(u.g&&vn(u)>=2&&u.g.getAllResponseHeaders()||"").split(`\r
`);for(let y=0;y<u.length;y++){if(I(u[y]))continue;var g=Ew(u[y]);const C=g[0];if(g=g[1],typeof g!="string")continue;g=g.trim();const k=p[C]||[];p[C]=k,k.push(g)}mn(p,function(y){return y.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ys(u,p,g){return g&&g.internalChannelParams&&g.internalChannelParams[u]||p}function Md(u){this.za=0,this.i=[],this.j=new Us,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Ys("failFast",!1,u),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Ys("baseRetryDelayMs",5e3,u),this.Za=Ys("retryDelaySeedMs",1e4,u),this.Ta=Ys("forwardChannelMaxRetries",2,u),this.va=Ys("forwardChannelRequestTimeoutMs",2e4,u),this.ma=u&&u.xmlHttpFactory||void 0,this.Ua=u&&u.Rb||void 0,this.Aa=u&&u.useFetchStreams||!1,this.O=void 0,this.L=u&&u.supportsCrossDomainXhr||!1,this.M="",this.h=new gd(u&&u.concurrentRequestLimit),this.Ba=new Vw,this.S=u&&u.fastHandshake||!1,this.R=u&&u.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=u&&u.Pb||!1,u&&u.ua&&this.j.ua(),u&&u.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&u&&u.detectBufferingProxy||!1,this.ia=void 0,u&&u.longPollingTimeout&&u.longPollingTimeout>0&&(this.ia=u.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Md.prototype,n.ka=8,n.I=1,n.connect=function(u,p,g,y){Jt(0),this.W=u,this.H=p||{},g&&y!==void 0&&(this.H.OSID=g,this.H.OAID=y),this.F=this.X,this.J=$d(this,null,this.W),Eo(this)};function Qc(u){if(Od(u),u.I==3){var p=u.V++,g=ke(u.J);if(pt(g,"SID",u.M),pt(g,"RID",p),pt(g,"TYPE","terminate"),Qs(u,g),p=new yn(u,u.j,p),p.M=2,p.A=bo(ke(g)),g=!1,o.navigator&&o.navigator.sendBeacon)try{g=o.navigator.sendBeacon(p.A.toString(),"")}catch{}!g&&o.Image&&(new Image().src=p.A,g=!0),g||(p.g=jd(p.j,null),p.g.ea(p.A)),p.F=Date.now(),yo(p)}zd(u)}function To(u){u.g&&(Jc(u),u.g.cancel(),u.g=null)}function Od(u){To(u),u.v&&(o.clearTimeout(u.v),u.v=null),Io(u),u.h.cancel(),u.m&&(typeof u.m=="number"&&o.clearTimeout(u.m),u.m=null)}function Eo(u){if(!md(u.h)&&!u.m){u.m=!0;var p=u.Ea;M||w(),L||(M(),L=!0),E.add(p,u),u.D=0}}function Bw(u,p){return _d(u.h)>=u.h.j-(u.m?1:0)?!1:u.m?(u.i=p.G.concat(u.i),!0):u.I==1||u.I==2||u.D>=(u.Sa?0:u.Ta)?!1:(u.m=Fs(l(u.Ea,u,p),Bd(u,u.D)),u.D++,!0)}n.Ea=function(u){if(this.m)if(this.m=null,this.I==1){if(!u){this.V=Math.floor(Math.random()*1e5),u=this.V++;const C=new yn(this,this.j,u);let k=this.o;if(this.U&&(k?(k=ui(k),_n(k,this.U)):k=this.U),this.u!==null||this.R||(C.J=k,k=null),this.S)t:{for(var p=0,g=0;g<this.i.length;g++){e:{var y=this.i[g];if("__data__"in y.map&&(y=y.map.__data__,typeof y=="string")){y=y.length;break e}y=void 0}if(y===void 0)break;if(p+=y,p>4096){p=g;break t}if(p===4096||g===this.i.length-1){p=g+1;break t}}p=1e3}else p=1e3;p=Vd(this,C,p),g=ke(this.J),pt(g,"RID",u),pt(g,"CVER",22),this.G&&pt(g,"X-HTTP-Session-Id",this.G),Qs(this,g),k&&(this.R?p="headers="+Bs(Pd(k))+"&"+p:this.u&&Yc(g,this.u,k)),qc(this.h,C),this.Ra&&pt(g,"TYPE","init"),this.S?(pt(g,"$req",p),pt(g,"SID","null"),C.U=!0,$c(C,g,null)):$c(C,g,p),this.I=2}}else this.I==3&&(u?Nd(this,u):this.i.length==0||md(this.h)||Nd(this))};function Nd(u,p){var g;p?g=p.l:g=u.V++;const y=ke(u.J);pt(y,"SID",u.M),pt(y,"RID",g),pt(y,"AID",u.K),Qs(u,y),u.u&&u.o&&Yc(y,u.u,u.o),g=new yn(u,u.j,g,u.D+1),u.u===null&&(g.J=u.o),p&&(u.i=p.G.concat(u.i)),p=Vd(u,g,1e3),g.H=Math.round(u.va*.5)+Math.round(u.va*.5*Math.random()),qc(u.h,g),$c(g,y,p)}function Qs(u,p){u.H&&It(u.H,function(g,y){pt(p,y,g)}),u.l&&It({},function(g,y){pt(p,y,g)})}function Vd(u,p,g){g=Math.min(u.i.length,g);const y=u.l?l(u.l.Ka,u.l,u):null;t:{var C=u.i;let K=-1;for(;;){const Ct=["count="+g];K==-1?g>0?(K=C[0].g,Ct.push("ofs="+K)):K=0:Ct.push("ofs="+K);let ut=!0;for(let Ot=0;Ot<g;Ot++){var k=C[Ot].g;const De=C[Ot].map;if(k-=K,k<0)K=Math.max(0,C[Ot].g-100),ut=!1;else try{k="req"+k+"_"||"";try{var F=De instanceof Map?De:Object.entries(De);for(const[gi,Tn]of F){let En=Tn;a(Tn)&&(En=Lc(Tn)),Ct.push(k+gi+"="+encodeURIComponent(En))}}catch(gi){throw Ct.push(k+"type="+encodeURIComponent("_badmap")),gi}}catch{y&&y(De)}}if(ut){F=Ct.join("&");break t}}F=void 0}return u=u.i.splice(0,g),p.G=u,F}function Ld(u){if(!u.g&&!u.v){u.Y=1;var p=u.Da;M||w(),L||(M(),L=!0),E.add(p,u),u.A=0}}function Xc(u){return u.g||u.v||u.A>=3?!1:(u.Y++,u.v=Fs(l(u.Da,u),Bd(u,u.A)),u.A++,!0)}n.Da=function(){if(this.v=null,Fd(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var u=4*this.T;this.j.info("BP detection timer enabled: "+u),this.B=Fs(l(this.Wa,this),u)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Jt(10),To(this),Fd(this))};function Jc(u){u.B!=null&&(o.clearTimeout(u.B),u.B=null)}function Fd(u){u.g=new yn(u,u.j,"rpc",u.Y),u.u===null&&(u.g.J=u.o),u.g.P=0;var p=ke(u.na);pt(p,"RID","rpc"),pt(p,"SID",u.M),pt(p,"AID",u.K),pt(p,"CI",u.F?"0":"1"),!u.F&&u.ia&&pt(p,"TO",u.ia),pt(p,"TYPE","xmlhttp"),Qs(u,p),u.u&&u.o&&Yc(p,u.u,u.o),u.O&&(u.g.H=u.O);var g=u.g;u=u.ba,g.M=1,g.A=bo(ke(p)),g.u=null,g.R=!0,dd(g,u)}n.Va=function(){this.C!=null&&(this.C=null,To(this),Xc(this),Jt(19))};function Io(u){u.C!=null&&(o.clearTimeout(u.C),u.C=null)}function Ud(u,p){var g=null;if(u.g==p){Io(u),Jc(u),u.g=null;var y=2}else if(Wc(u.h,p))g=p.G,yd(u.h,p),y=1;else return;if(u.I!=0){if(p.o)if(y==1){g=p.u?p.u.length:0,p=Date.now()-p.F;var C=u.D;y=mo(),Xt(y,new ad(y,g)),Eo(u)}else Ld(u);else if(C=p.m,C==3||C==0&&p.X>0||!(y==1&&Bw(u,p)||y==2&&Xc(u)))switch(g&&g.length>0&&(p=u.h,p.i=p.i.concat(g)),C){case 1:pi(u,5);break;case 4:pi(u,10);break;case 3:pi(u,6);break;default:pi(u,2)}}}function Bd(u,p){let g=u.Qa+Math.floor(Math.random()*u.Za);return u.isActive()||(g*=2),g*p}function pi(u,p){if(u.j.info("Error code "+p),p==2){var g=l(u.bb,u),y=u.Ua;const C=!y;y=new bn(y||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||$s(y,"https"),bo(y),C?Ow(y.toString(),g):Nw(y.toString(),g)}else Jt(2);u.I=0,u.l&&u.l.pa(p),zd(u),Od(u)}n.bb=function(u){u?(this.j.info("Successfully pinged google.com"),Jt(2)):(this.j.info("Failed to ping google.com"),Jt(1))};function zd(u){if(u.I=0,u.ja=[],u.l){const p=bd(u.h);(p.length!=0||u.i.length!=0)&&(_(u.ja,p),_(u.ja,u.i),u.h.i.length=0,m(u.i),u.i.length=0),u.l.oa()}}function $d(u,p,g){var y=g instanceof bn?ke(g):new bn(g);if(y.g!="")p&&(y.g=p+"."+y.g),js(y,y.u);else{var C=o.location;y=C.protocol,p=p?p+"."+C.hostname:C.hostname,C=+C.port;const k=new bn(null);y&&$s(k,y),p&&(k.g=p),C&&js(k,C),g&&(k.h=g),y=k}return g=u.G,p=u.wa,g&&p&&pt(y,g,p),pt(y,"VER",u.ka),Qs(u,y),y}function jd(u,p,g){if(p&&!u.L)throw Error("Can't create secondary domain capable XhrIo object.");return p=u.Aa&&!u.ma?new vt(new Kc({ab:g})):new vt(u.ma),p.Fa(u.L),p}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Hd(){}n=Hd.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Ao(){}Ao.prototype.g=function(u,p){return new ce(u,p)};function ce(u,p){jt.call(this),this.g=new Md(p),this.l=u,this.h=p&&p.messageUrlParams||null,u=p&&p.messageHeaders||null,p&&p.clientProtocolHeaderRequired&&(u?u["X-Client-Protocol"]="webchannel":u={"X-Client-Protocol":"webchannel"}),this.g.o=u,u=p&&p.initMessageHeaders||null,p&&p.messageContentType&&(u?u["X-WebChannel-Content-Type"]=p.messageContentType:u={"X-WebChannel-Content-Type":p.messageContentType}),p&&p.sa&&(u?u["X-WebChannel-Client-Profile"]=p.sa:u={"X-WebChannel-Client-Profile":p.sa}),this.g.U=u,(u=p&&p.Qb)&&!I(u)&&(this.g.u=u),this.A=p&&p.supportsCrossDomainXhr||!1,this.v=p&&p.sendRawJson||!1,(p=p&&p.httpSessionIdParam)&&!I(p)&&(this.g.G=p,u=this.h,u!==null&&p in u&&(u=this.h,p in u&&delete u[p])),this.j=new Yi(this)}d(ce,jt),ce.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},ce.prototype.close=function(){Qc(this.g)},ce.prototype.o=function(u){var p=this.g;if(typeof u=="string"){var g={};g.__data__=u,u=g}else this.v&&(g={},g.__data__=Lc(u),u=g);p.i.push(new xw(p.Ya++,u)),p.I==3&&Eo(p)},ce.prototype.N=function(){this.g.l=null,delete this.j,Qc(this.g),delete this.g,ce.Z.N.call(this)};function Wd(u){Fc.call(this),u.__headers__&&(this.headers=u.__headers__,this.statusCode=u.__status__,delete u.__headers__,delete u.__status__);var p=u.__sm__;if(p){t:{for(const g in p){u=g;break t}u=void 0}(this.i=u)&&(u=this.i,p=p!==null&&u in p?p[u]:void 0),this.data=p}else this.data=u}d(Wd,Fc);function qd(){Uc.call(this),this.status=1}d(qd,Uc);function Yi(u){this.g=u}d(Yi,Hd),Yi.prototype.ra=function(){Xt(this.g,"a")},Yi.prototype.qa=function(u){Xt(this.g,new Wd(u))},Yi.prototype.pa=function(u){Xt(this.g,new qd)},Yi.prototype.oa=function(){Xt(this.g,"b")},Ao.prototype.createWebChannel=Ao.prototype.g,ce.prototype.send=ce.prototype.o,ce.prototype.open=ce.prototype.m,ce.prototype.close=ce.prototype.close,u_=function(){return new Ao},l_=function(){return mo()},c_=hi,Ul={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},_o.NO_ERROR=0,_o.TIMEOUT=8,_o.HTTP_ERROR=6,Qo=_o,cd.COMPLETE="complete",a_=cd,id.EventType=Vs,Vs.OPEN="a",Vs.CLOSE="b",Vs.ERROR="c",Vs.MESSAGE="d",jt.prototype.listen=jt.prototype.J,sr=id,vt.prototype.listenOnce=vt.prototype.K,vt.prototype.getLastError=vt.prototype.Ha,vt.prototype.getLastErrorCode=vt.prototype.ya,vt.prototype.getStatus=vt.prototype.ca,vt.prototype.getResponseJson=vt.prototype.La,vt.prototype.getResponseText=vt.prototype.la,vt.prototype.send=vt.prototype.ea,vt.prototype.setWithCredentials=vt.prototype.Fa,o_=vt}).apply(typeof Po<"u"?Po:typeof self<"u"?self:typeof window<"u"?window:{});const xf="@firebase/firestore",Sf="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}qt.UNAUTHENTICATED=new qt(null),qt.GOOGLE_CREDENTIALS=new qt("google-credentials-uid"),qt.FIRST_PARTY=new qt("first-party-uid"),qt.MOCK_USER=new qt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ss="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mi=new Qa("@firebase/firestore");function Ji(){return Mi.logLevel}function z(n,...t){if(Mi.logLevel<=Z.DEBUG){const e=t.map(ku);Mi.debug(`Firestore (${Ss}): ${n}`,...e)}}function un(n,...t){if(Mi.logLevel<=Z.ERROR){const e=t.map(ku);Mi.error(`Firestore (${Ss}): ${n}`,...e)}}function fs(n,...t){if(Mi.logLevel<=Z.WARN){const e=t.map(ku);Mi.warn(`Firestore (${Ss}): ${n}`,...e)}}function ku(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(n,t,e){let i="Unexpected state";typeof t=="string"?i=t:e=t,h_(n,i,e)}function h_(n,t,e){let i=`FIRESTORE (${Ss}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{i+=" CONTEXT: "+JSON.stringify(e)}catch{i+=" CONTEXT: "+e}throw un(i),new Error(i)}function st(n,t,e,i){let s="Unexpected state";typeof e=="string"?s=e:i=e,n||h_(t,s,i)}function q(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class B extends be{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class d_{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class UE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(qt.UNAUTHENTICATED))}shutdown(){}}class BE{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class zE{constructor(t){this.t=t,this.currentUser=qt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){st(this.o===void 0,42304);let i=this.i;const s=c=>this.i!==i?(i=this.i,e(c)):Promise.resolve();let r=new Be;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new Be,t.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=r;t.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},a=c=>{z("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>a(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?a(c):(z("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new Be)}},0),o()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(i=>this.i!==t?(z("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(st(typeof i.accessToken=="string",31837,{l:i}),new d_(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return st(t===null||typeof t=="string",2055,{h:t}),new qt(t)}}class $E{constructor(t,e,i){this.P=t,this.T=e,this.I=i,this.type="FirstParty",this.user=qt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class jE{constructor(t,e,i){this.P=t,this.T=e,this.I=i}getToken(){return Promise.resolve(new $E(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(qt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Pf{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class HE{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ue(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){st(this.o===void 0,3512);const i=r=>{r.error!=null&&z("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.m;return this.m=r.token,z("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?e(r.token):Promise.resolve()};this.o=r=>{t.enqueueRetryable(()=>i(r))};const s=r=>{z("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(r=>s(r)),setTimeout(()=>{if(!this.appCheck){const r=this.V.getImmediate({optional:!0});r?s(r):z("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Pf(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(st(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Pf(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WE(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let i=0;i<n;i++)e[i]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Du{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const s=WE(40);for(let r=0;r<s.length;++r)i.length<20&&s[r]<e&&(i+=t.charAt(s[r]%62))}return i}}function tt(n,t){return n<t?-1:n>t?1:0}function Bl(n,t){const e=Math.min(n.length,t.length);for(let i=0;i<e;i++){const s=n.charAt(i),r=t.charAt(i);if(s!==r)return cl(s)===cl(r)?tt(s,r):cl(s)?1:-1}return tt(n.length,t.length)}const qE=55296,GE=57343;function cl(n){const t=n.charCodeAt(0);return t>=qE&&t<=GE}function ps(n,t,e){return n.length===t.length&&n.every((i,s)=>e(i,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="__name__";class Ne{constructor(t,e,i){e===void 0?e=0:e>t.length&&j(637,{offset:e,range:t.length}),i===void 0?i=t.length-e:i>t.length-e&&j(1746,{length:i,range:t.length-e}),this.segments=t,this.offset=e,this.len=i}get length(){return this.len}isEqual(t){return Ne.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Ne?t.forEach(i=>{e.push(i)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,i=this.limit();e<i;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const i=Math.min(t.length,e.length);for(let s=0;s<i;s++){const r=Ne.compareSegments(t.get(s),e.get(s));if(r!==0)return r}return tt(t.length,e.length)}static compareSegments(t,e){const i=Ne.isNumericId(t),s=Ne.isNumericId(e);return i&&!s?-1:!i&&s?1:i&&s?Ne.extractNumericId(t).compare(Ne.extractNumericId(e)):Bl(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return Bn.fromString(t.substring(4,t.length-2))}}class lt extends Ne{construct(t,e,i){return new lt(t,e,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const i of t){if(i.indexOf("//")>=0)throw new B(O.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);e.push(...i.split("/").filter(s=>s.length>0))}return new lt(e)}static emptyPath(){return new lt([])}}const KE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Bt extends Ne{construct(t,e,i){return new Bt(t,e,i)}static isValidIdentifier(t){return KE.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Bt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Rf}static keyField(){return new Bt([Rf])}static fromServerFormat(t){const e=[];let i="",s=0;const r=()=>{if(i.length===0)throw new B(O.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(i),i=""};let o=!1;for(;s<t.length;){const a=t[s];if(a==="\\"){if(s+1===t.length)throw new B(O.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const c=t[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new B(O.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);i+=c,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(i+=a,s++):(r(),s++)}if(r(),o)throw new B(O.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Bt(e)}static emptyPath(){return new Bt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(t){this.path=t}static fromPath(t){return new $(lt.fromString(t))}static fromName(t){return new $(lt.fromString(t).popFirst(5))}static empty(){return new $(lt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&lt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return lt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new $(new lt(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f_(n,t,e){if(!e)throw new B(O.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function YE(n,t,e,i){if(t===!0&&i===!0)throw new B(O.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Cf(n){if(!$.isDocumentKey(n))throw new B(O.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function kf(n){if($.isDocumentKey(n))throw new B(O.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function p_(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ec(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(i){return i.constructor?i.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":j(12329,{type:typeof n})}function ae(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new B(O.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=ec(n);throw new B(O.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(n,t){const e={typeString:n};return t&&(e.value=t),e}function Jr(n,t){if(!p_(n))throw new B(O.INVALID_ARGUMENT,"JSON must be an object");let e;for(const i in t)if(t[i]){const s=t[i].typeString,r="value"in t[i]?{value:t[i].value}:void 0;if(!(i in n)){e=`JSON missing required field: '${i}'`;break}const o=n[i];if(s&&typeof o!==s){e=`JSON field '${i}' must be a ${s}.`;break}if(r!==void 0&&o!==r.value){e=`Expected '${i}' field to equal '${r.value}'`;break}}if(e)throw new B(O.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Df=-62135596800,Mf=1e6;class gt{static now(){return gt.fromMillis(Date.now())}static fromDate(t){return gt.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),i=Math.floor((t-1e3*e)*Mf);return new gt(e,i)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new B(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new B(O.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Df)throw new B(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new B(O.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Mf}_compareTo(t){return this.seconds===t.seconds?tt(this.nanoseconds,t.nanoseconds):tt(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:gt._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Jr(t,gt._jsonSchema))return new gt(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Df;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}gt._jsonSchemaVersion="firestore/timestamp/1.0",gt._jsonSchema={type:Rt("string",gt._jsonSchemaVersion),seconds:Rt("number"),nanoseconds:Rt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{static fromTimestamp(t){return new H(t)}static min(){return new H(new gt(0,0))}static max(){return new H(new gt(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cr=-1;function QE(n,t){const e=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,s=H.fromTimestamp(i===1e9?new gt(e+1,0):new gt(e,i));return new Wn(s,$.empty(),t)}function XE(n){return new Wn(n.readTime,n.key,Cr)}class Wn{constructor(t,e,i){this.readTime=t,this.documentKey=e,this.largestBatchId=i}static min(){return new Wn(H.min(),$.empty(),Cr)}static max(){return new Wn(H.max(),$.empty(),Cr)}}function JE(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=$.comparator(n.documentKey,t.documentKey),e!==0?e:tt(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class tI{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ps(n){if(n.code!==O.FAILED_PRECONDITION||n.message!==ZE)throw n;z("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&j(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new V((i,s)=>{this.nextCallback=r=>{this.wrapSuccess(t,r).next(i,s)},this.catchCallback=r=>{this.wrapFailure(e,r).next(i,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof V?e:V.resolve(e)}catch(e){return V.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):V.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):V.reject(e)}static resolve(t){return new V((e,i)=>{e(t)})}static reject(t){return new V((e,i)=>{i(t)})}static waitFor(t){return new V((e,i)=>{let s=0,r=0,o=!1;t.forEach(a=>{++s,a.next(()=>{++r,o&&r===s&&e()},c=>i(c))}),o=!0,r===s&&e()})}static or(t){let e=V.resolve(!1);for(const i of t)e=e.next(s=>s?V.resolve(s):i());return e}static forEach(t,e){const i=[];return t.forEach((s,r)=>{i.push(e.call(this,s,r))}),this.waitFor(i)}static mapArray(t,e){return new V((i,s)=>{const r=t.length,o=new Array(r);let a=0;for(let c=0;c<r;c++){const l=c;e(t[l]).next(h=>{o[l]=h,++a,a===r&&i(o)},h=>s(h))}})}static doWhile(t,e){return new V((i,s)=>{const r=()=>{t()===!0?e().next(()=>{r()},s):i()};r()})}}function eI(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Rs(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=i=>this.ae(i),this.ue=i=>e.writeSequenceNumber(i))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}nc.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu=-1;function Zr(n){return n==null}function wa(n){return n===0&&1/n==-1/0}function nI(n){return typeof n=="number"&&Number.isInteger(n)&&!wa(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_="";function iI(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=Of(t)),t=sI(n.get(e),t);return Of(t)}function sI(n,t){let e=t;const i=n.length;for(let s=0;s<i;s++){const r=n.charAt(s);switch(r){case"\0":e+="";break;case g_:e+="";break;default:e+=r}}return e}function Of(n){return n+g_+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nf(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function ai(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function m_(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t,e){this.comparator=t,this.root=e||Ut.EMPTY}insert(t,e){return new wt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,Ut.BLACK,null,null))}remove(t){return new wt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,Ut.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const i=this.comparator(t,e.key);if(i===0)return e.value;i<0?e=e.left:i>0&&(e=e.right)}return null}indexOf(t){let e=0,i=this.root;for(;!i.isEmpty();){const s=this.comparator(t,i.key);if(s===0)return e+i.left.size;s<0?i=i.left:(e+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,i)=>(t(e,i),!1))}toString(){const t=[];return this.inorderTraversal((e,i)=>(t.push(`${e}:${i}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Ro(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Ro(this.root,t,this.comparator,!1)}getReverseIterator(){return new Ro(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Ro(this.root,t,this.comparator,!0)}}class Ro{constructor(t,e,i,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!t.isEmpty();)if(r=e?i(t.key,e):1,e&&s&&(r*=-1),r<0)t=this.isReverse?t.left:t.right;else{if(r===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class Ut{constructor(t,e,i,s,r){this.key=t,this.value=e,this.color=i??Ut.RED,this.left=s??Ut.EMPTY,this.right=r??Ut.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,i,s,r){return new Ut(t??this.key,e??this.value,i??this.color,s??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,i){let s=this;const r=i(t,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(t,e,i),null):r===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ut.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let i,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return Ut.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,Ut.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,Ut.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw j(43730,{key:this.key,value:this.value});if(this.right.isRed())throw j(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw j(27949);return t+(this.isRed()?0:1)}}Ut.EMPTY=null,Ut.RED=!0,Ut.BLACK=!1;Ut.EMPTY=new class{constructor(){this.size=0}get key(){throw j(57766)}get value(){throw j(16141)}get color(){throw j(16727)}get left(){throw j(29726)}get right(){throw j(36894)}copy(t,e,i,s,r){return this}insert(t,e,i){return new Ut(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(t){this.comparator=t,this.data=new wt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,i)=>(t(e),!1))}forEachInRange(t,e){const i=this.data.getIteratorFrom(t[0]);for(;i.hasNext();){const s=i.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let i;for(i=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();i.hasNext();)if(!t(i.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Vf(this.data.getIterator())}getIteratorFrom(t){return new Vf(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(i=>{e=e.add(i)}),e}isEqual(t){if(!(t instanceof Mt)||this.size!==t.size)return!1;const e=this.data.getIterator(),i=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,r=i.getNext().key;if(this.comparator(s,r)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new Mt(this.comparator);return e.data=t,e}}class Vf{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(t){this.fields=t,t.sort(Bt.comparator)}static empty(){return new de([])}unionWith(t){let e=new Mt(Bt.comparator);for(const i of this.fields)e=e.add(i);for(const i of t)e=e.add(i);return new de(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return ps(this.fields,t.fields,(e,i)=>e.isEqual(i))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class __ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new __("Invalid base64 string: "+r):r}}(t);return new zt(e)}static fromUint8Array(t){const e=function(s){let r="";for(let o=0;o<s.length;++o)r+=String.fromCharCode(s[o]);return r}(t);return new zt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const i=new Uint8Array(e.length);for(let s=0;s<e.length;s++)i[s]=e.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return tt(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}zt.EMPTY_BYTE_STRING=new zt("");const rI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function qn(n){if(st(!!n,39018),typeof n=="string"){let t=0;const e=rI.exec(n);if(st(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:t}}return{seconds:At(n.seconds),nanos:At(n.nanos)}}function At(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Gn(n){return typeof n=="string"?zt.fromBase64String(n):zt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y_="server_timestamp",b_="__type__",w_="__previous_value__",v_="__local_write_time__";function Ou(n){var e,i;return((i=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[b_])==null?void 0:i.stringValue)===y_}function ic(n){const t=n.mapValue.fields[w_];return Ou(t)?ic(t):t}function kr(n){const t=qn(n.mapValue.fields[v_].timestampValue);return new gt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(t,e,i,s,r,o,a,c,l,h){this.databaseId=t,this.appId=e,this.persistenceKey=i,this.host=s,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=l,this.isUsingEmulator=h}}const va="(default)";class Dr{constructor(t,e){this.projectId=t,this.database=e||va}static empty(){return new Dr("","")}get isDefaultDatabase(){return this.database===va}isEqual(t){return t instanceof Dr&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T_="__type__",aI="__max__",Co={mapValue:{}},E_="__vector__",Ta="value";function Kn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ou(n)?4:lI(n)?9007199254740991:cI(n)?10:11:j(28295,{value:n})}function We(n,t){if(n===t)return!0;const e=Kn(n);if(e!==Kn(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return kr(n).isEqual(kr(t));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const o=qn(s.timestampValue),a=qn(r.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,r){return Gn(s.bytesValue).isEqual(Gn(r.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,r){return At(s.geoPointValue.latitude)===At(r.geoPointValue.latitude)&&At(s.geoPointValue.longitude)===At(r.geoPointValue.longitude)}(n,t);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return At(s.integerValue)===At(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const o=At(s.doubleValue),a=At(r.doubleValue);return o===a?wa(o)===wa(a):isNaN(o)&&isNaN(a)}return!1}(n,t);case 9:return ps(n.arrayValue.values||[],t.arrayValue.values||[],We);case 10:case 11:return function(s,r){const o=s.mapValue.fields||{},a=r.mapValue.fields||{};if(Nf(o)!==Nf(a))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(a[c]===void 0||!We(o[c],a[c])))return!1;return!0}(n,t);default:return j(52216,{left:n})}}function Mr(n,t){return(n.values||[]).find(e=>We(e,t))!==void 0}function gs(n,t){if(n===t)return 0;const e=Kn(n),i=Kn(t);if(e!==i)return tt(e,i);switch(e){case 0:case 9007199254740991:return 0;case 1:return tt(n.booleanValue,t.booleanValue);case 2:return function(r,o){const a=At(r.integerValue||r.doubleValue),c=At(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1}(n,t);case 3:return Lf(n.timestampValue,t.timestampValue);case 4:return Lf(kr(n),kr(t));case 5:return Bl(n.stringValue,t.stringValue);case 6:return function(r,o){const a=Gn(r),c=Gn(o);return a.compareTo(c)}(n.bytesValue,t.bytesValue);case 7:return function(r,o){const a=r.split("/"),c=o.split("/");for(let l=0;l<a.length&&l<c.length;l++){const h=tt(a[l],c[l]);if(h!==0)return h}return tt(a.length,c.length)}(n.referenceValue,t.referenceValue);case 8:return function(r,o){const a=tt(At(r.latitude),At(o.latitude));return a!==0?a:tt(At(r.longitude),At(o.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return Ff(n.arrayValue,t.arrayValue);case 10:return function(r,o){var f,m,_,b;const a=r.fields||{},c=o.fields||{},l=(f=a[Ta])==null?void 0:f.arrayValue,h=(m=c[Ta])==null?void 0:m.arrayValue,d=tt(((_=l==null?void 0:l.values)==null?void 0:_.length)||0,((b=h==null?void 0:h.values)==null?void 0:b.length)||0);return d!==0?d:Ff(l,h)}(n.mapValue,t.mapValue);case 11:return function(r,o){if(r===Co.mapValue&&o===Co.mapValue)return 0;if(r===Co.mapValue)return 1;if(o===Co.mapValue)return-1;const a=r.fields||{},c=Object.keys(a),l=o.fields||{},h=Object.keys(l);c.sort(),h.sort();for(let d=0;d<c.length&&d<h.length;++d){const f=Bl(c[d],h[d]);if(f!==0)return f;const m=gs(a[c[d]],l[h[d]]);if(m!==0)return m}return tt(c.length,h.length)}(n.mapValue,t.mapValue);default:throw j(23264,{he:e})}}function Lf(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return tt(n,t);const e=qn(n),i=qn(t),s=tt(e.seconds,i.seconds);return s!==0?s:tt(e.nanos,i.nanos)}function Ff(n,t){const e=n.values||[],i=t.values||[];for(let s=0;s<e.length&&s<i.length;++s){const r=gs(e[s],i[s]);if(r)return r}return tt(e.length,i.length)}function ms(n){return zl(n)}function zl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const i=qn(e);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return Gn(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return $.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let i="[",s=!0;for(const r of e.values||[])s?s=!1:i+=",",i+=zl(r);return i+"]"}(n.arrayValue):"mapValue"in n?function(e){const i=Object.keys(e.fields||{}).sort();let s="{",r=!0;for(const o of i)r?r=!1:s+=",",s+=`${o}:${zl(e.fields[o])}`;return s+"}"}(n.mapValue):j(61005,{value:n})}function Xo(n){switch(Kn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=ic(n);return t?16+Xo(t):16;case 5:return 2*n.stringValue.length;case 6:return Gn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(i){return(i.values||[]).reduce((s,r)=>s+Xo(r),0)}(n.arrayValue);case 10:case 11:return function(i){let s=0;return ai(i.fields,(r,o)=>{s+=r.length+Xo(o)}),s}(n.mapValue);default:throw j(13486,{value:n})}}function Uf(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function $l(n){return!!n&&"integerValue"in n}function Nu(n){return!!n&&"arrayValue"in n}function Bf(n){return!!n&&"nullValue"in n}function zf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Jo(n){return!!n&&"mapValue"in n}function cI(n){var e,i;return((i=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[T_])==null?void 0:i.stringValue)===E_}function mr(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return ai(n.mapValue.fields,(e,i)=>t.mapValue.fields[e]=mr(i)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=mr(n.arrayValue.values[e]);return t}return{...n}}function lI(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===aI}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(t){this.value=t}static empty(){return new Zt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let i=0;i<t.length-1;++i)if(e=(e.mapValue.fields||{})[t.get(i)],!Jo(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=mr(e)}setAll(t){let e=Bt.emptyPath(),i={},s=[];t.forEach((o,a)=>{if(!e.isImmediateParentOf(a)){const c=this.getFieldsMap(e);this.applyChanges(c,i,s),i={},s=[],e=a.popLast()}o?i[a.lastSegment()]=mr(o):s.push(a.lastSegment())});const r=this.getFieldsMap(e);this.applyChanges(r,i,s)}delete(t){const e=this.field(t.popLast());Jo(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return We(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let i=0;i<t.length;++i){let s=e.mapValue.fields[t.get(i)];Jo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(i)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,i){ai(e,(s,r)=>t[s]=r);for(const s of i)delete t[s]}clone(){return new Zt(mr(this.value))}}function I_(n){const t=[];return ai(n.fields,(e,i)=>{const s=new Bt([e]);if(Jo(i)){const r=I_(i.mapValue).fields;if(r.length===0)t.push(s);else for(const o of r)t.push(s.child(o))}else t.push(s)}),new de(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(t,e,i,s,r,o,a){this.key=t,this.documentType=e,this.version=i,this.readTime=s,this.createTime=r,this.data=o,this.documentState=a}static newInvalidDocument(t){return new Vt(t,0,H.min(),H.min(),H.min(),Zt.empty(),0)}static newFoundDocument(t,e,i,s){return new Vt(t,1,e,H.min(),i,s,0)}static newNoDocument(t,e){return new Vt(t,2,e,H.min(),H.min(),Zt.empty(),0)}static newUnknownDocument(t,e){return new Vt(t,3,e,H.min(),H.min(),Zt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(H.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Zt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Zt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=H.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof Vt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new Vt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(t,e){this.position=t,this.inclusive=e}}function $f(n,t,e){let i=0;for(let s=0;s<n.position.length;s++){const r=t[s],o=n.position[s];if(r.field.isKeyField()?i=$.comparator($.fromName(o.referenceValue),e.key):i=gs(o,e.data.field(r.field)),r.dir==="desc"&&(i*=-1),i!==0)break}return i}function jf(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!We(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(t,e="asc"){this.field=t,this.dir=e}}function uI(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{}class Pt extends A_{constructor(t,e,i){super(),this.field=t,this.op=e,this.value=i}static create(t,e,i){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,i):new dI(t,e,i):e==="array-contains"?new gI(t,i):e==="in"?new mI(t,i):e==="not-in"?new _I(t,i):e==="array-contains-any"?new yI(t,i):new Pt(t,e,i)}static createKeyFieldInFilter(t,e,i){return e==="in"?new fI(t,i):new pI(t,i)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(gs(e,this.value)):e!==null&&Kn(this.value)===Kn(e)&&this.matchesComparison(gs(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return j(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Pe extends A_{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Pe(t,e)}matches(t){return x_(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function x_(n){return n.op==="and"}function S_(n){return hI(n)&&x_(n)}function hI(n){for(const t of n.filters)if(t instanceof Pe)return!1;return!0}function jl(n){if(n instanceof Pt)return n.field.canonicalString()+n.op.toString()+ms(n.value);if(S_(n))return n.filters.map(t=>jl(t)).join(",");{const t=n.filters.map(e=>jl(e)).join(",");return`${n.op}(${t})`}}function P_(n,t){return n instanceof Pt?function(i,s){return s instanceof Pt&&i.op===s.op&&i.field.isEqual(s.field)&&We(i.value,s.value)}(n,t):n instanceof Pe?function(i,s){return s instanceof Pe&&i.op===s.op&&i.filters.length===s.filters.length?i.filters.reduce((r,o,a)=>r&&P_(o,s.filters[a]),!0):!1}(n,t):void j(19439)}function R_(n){return n instanceof Pt?function(e){return`${e.field.canonicalString()} ${e.op} ${ms(e.value)}`}(n):n instanceof Pe?function(e){return e.op.toString()+" {"+e.getFilters().map(R_).join(" ,")+"}"}(n):"Filter"}class dI extends Pt{constructor(t,e,i){super(t,e,i),this.key=$.fromName(i.referenceValue)}matches(t){const e=$.comparator(t.key,this.key);return this.matchesComparison(e)}}class fI extends Pt{constructor(t,e){super(t,"in",e),this.keys=C_("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class pI extends Pt{constructor(t,e){super(t,"not-in",e),this.keys=C_("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function C_(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map(i=>$.fromName(i.referenceValue))}class gI extends Pt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Nu(e)&&Mr(e.arrayValue,this.value)}}class mI extends Pt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Mr(this.value.arrayValue,e)}}class _I extends Pt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Mr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Mr(this.value.arrayValue,e)}}class yI extends Pt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Nu(e)||!e.arrayValue.values)&&e.arrayValue.values.some(i=>Mr(this.value.arrayValue,i))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bI{constructor(t,e=null,i=[],s=[],r=null,o=null,a=null){this.path=t,this.collectionGroup=e,this.orderBy=i,this.filters=s,this.limit=r,this.startAt=o,this.endAt=a,this.Te=null}}function Hf(n,t=null,e=[],i=[],s=null,r=null,o=null){return new bI(n,t,e,i,s,r,o)}function Vu(n){const t=q(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(i=>jl(i)).join(","),e+="|ob:",e+=t.orderBy.map(i=>function(r){return r.field.canonicalString()+r.dir}(i)).join(","),Zr(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(i=>ms(i)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(i=>ms(i)).join(",")),t.Te=e}return t.Te}function Lu(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!uI(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!P_(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!jf(n.startAt,t.startAt)&&jf(n.endAt,t.endAt)}function Hl(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(t,e=null,i=[],s=[],r=null,o="F",a=null,c=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=i,this.filters=s,this.limit=r,this.limitType=o,this.startAt=a,this.endAt=c,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function wI(n,t,e,i,s,r,o,a){return new Cs(n,t,e,i,s,r,o,a)}function sc(n){return new Cs(n)}function Wf(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function k_(n){return n.collectionGroup!==null}function _r(n){const t=q(n);if(t.Ie===null){t.Ie=[];const e=new Set;for(const r of t.explicitOrderBy)t.Ie.push(r),e.add(r.field.canonicalString());const i=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Mt(Bt.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(l=>{l.isInequality()&&(a=a.add(l.field))})}),a})(t).forEach(r=>{e.has(r.canonicalString())||r.isKeyField()||t.Ie.push(new Or(r,i))}),e.has(Bt.keyField().canonicalString())||t.Ie.push(new Or(Bt.keyField(),i))}return t.Ie}function ze(n){const t=q(n);return t.Ee||(t.Ee=vI(t,_r(n))),t.Ee}function vI(n,t){if(n.limitType==="F")return Hf(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const r=s.dir==="desc"?"asc":"desc";return new Or(s.field,r)});const e=n.endAt?new Ea(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new Ea(n.startAt.position,n.startAt.inclusive):null;return Hf(n.path,n.collectionGroup,t,n.filters,n.limit,e,i)}}function Wl(n,t){const e=n.filters.concat([t]);return new Cs(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function Ia(n,t,e){return new Cs(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function rc(n,t){return Lu(ze(n),ze(t))&&n.limitType===t.limitType}function D_(n){return`${Vu(ze(n))}|lt:${n.limitType}`}function Zi(n){return`Query(target=${function(e){let i=e.path.canonicalString();return e.collectionGroup!==null&&(i+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(i+=`, filters: [${e.filters.map(s=>R_(s)).join(", ")}]`),Zr(e.limit)||(i+=", limit: "+e.limit),e.orderBy.length>0&&(i+=`, orderBy: [${e.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),e.startAt&&(i+=", startAt: ",i+=e.startAt.inclusive?"b:":"a:",i+=e.startAt.position.map(s=>ms(s)).join(",")),e.endAt&&(i+=", endAt: ",i+=e.endAt.inclusive?"a:":"b:",i+=e.endAt.position.map(s=>ms(s)).join(",")),`Target(${i})`}(ze(n))}; limitType=${n.limitType})`}function oc(n,t){return t.isFoundDocument()&&function(i,s){const r=s.key.path;return i.collectionGroup!==null?s.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(r):$.isDocumentKey(i.path)?i.path.isEqual(r):i.path.isImmediateParentOf(r)}(n,t)&&function(i,s){for(const r of _r(i))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(n,t)&&function(i,s){for(const r of i.filters)if(!r.matches(s))return!1;return!0}(n,t)&&function(i,s){return!(i.startAt&&!function(o,a,c){const l=$f(o,a,c);return o.inclusive?l<=0:l<0}(i.startAt,_r(i),s)||i.endAt&&!function(o,a,c){const l=$f(o,a,c);return o.inclusive?l>=0:l>0}(i.endAt,_r(i),s))}(n,t)}function TI(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function M_(n){return(t,e)=>{let i=!1;for(const s of _r(n)){const r=EI(s,t,e);if(r!==0)return r;i=i||s.field.isKeyField()}return 0}}function EI(n,t,e){const i=n.field.isKeyField()?$.comparator(t.key,e.key):function(r,o,a){const c=o.data.field(r),l=a.data.field(r);return c!==null&&l!==null?gs(c,l):j(42886)}(n.field,t,e);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return j(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),i=this.inner[e];if(i!==void 0){for(const[s,r]of i)if(this.equalsFn(s,t))return r}}has(t){return this.get(t)!==void 0}set(t,e){const i=this.mapKeyFn(t),s=this.inner[i];if(s===void 0)return this.inner[i]=[[t,e]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],t))return void(s[r]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),i=this.inner[e];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],t))return i.length===1?delete this.inner[e]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(t){ai(this.inner,(e,i)=>{for(const[s,r]of i)t(s,r)})}isEmpty(){return m_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const II=new wt($.comparator);function hn(){return II}const O_=new wt($.comparator);function rr(...n){let t=O_;for(const e of n)t=t.insert(e.key,e);return t}function N_(n){let t=O_;return n.forEach((e,i)=>t=t.insert(e,i.overlayedDocument)),t}function Ii(){return yr()}function V_(){return yr()}function yr(){return new zi(n=>n.toString(),(n,t)=>n.isEqual(t))}const AI=new wt($.comparator),xI=new Mt($.comparator);function et(...n){let t=xI;for(const e of n)t=t.add(e);return t}const SI=new Mt(tt);function PI(){return SI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fu(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:wa(t)?"-0":t}}function L_(n){return{integerValue:""+n}}function RI(n,t){return nI(t)?L_(t):Fu(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(){this._=void 0}}function CI(n,t,e){return n instanceof Nr?function(s,r){const o={fields:{[b_]:{stringValue:y_},[v_]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&Ou(r)&&(r=ic(r)),r&&(o.fields[w_]=r),{mapValue:o}}(e,t):n instanceof Vr?U_(n,t):n instanceof Lr?B_(n,t):function(s,r){const o=F_(s,r),a=qf(o)+qf(s.Ae);return $l(o)&&$l(s.Ae)?L_(a):Fu(s.serializer,a)}(n,t)}function kI(n,t,e){return n instanceof Vr?U_(n,t):n instanceof Lr?B_(n,t):e}function F_(n,t){return n instanceof Aa?function(i){return $l(i)||function(r){return!!r&&"doubleValue"in r}(i)}(t)?t:{integerValue:0}:null}class Nr extends ac{}class Vr extends ac{constructor(t){super(),this.elements=t}}function U_(n,t){const e=z_(t);for(const i of n.elements)e.some(s=>We(s,i))||e.push(i);return{arrayValue:{values:e}}}class Lr extends ac{constructor(t){super(),this.elements=t}}function B_(n,t){let e=z_(t);for(const i of n.elements)e=e.filter(s=>!We(s,i));return{arrayValue:{values:e}}}class Aa extends ac{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function qf(n){return At(n.integerValue||n.doubleValue)}function z_(n){return Nu(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DI{constructor(t,e){this.field=t,this.transform=e}}function MI(n,t){return n.field.isEqual(t.field)&&function(i,s){return i instanceof Vr&&s instanceof Vr||i instanceof Lr&&s instanceof Lr?ps(i.elements,s.elements,We):i instanceof Aa&&s instanceof Aa?We(i.Ae,s.Ae):i instanceof Nr&&s instanceof Nr}(n.transform,t.transform)}class OI{constructor(t,e){this.version=t,this.transformResults=e}}class kt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new kt}static exists(t){return new kt(void 0,t)}static updateTime(t){return new kt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Zo(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class cc{}function $_(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new eo(n.key,kt.none()):new to(n.key,n.data,kt.none());{const e=n.data,i=Zt.empty();let s=new Mt(Bt.comparator);for(let r of t.fields)if(!s.has(r)){let o=e.field(r);o===null&&r.length>1&&(r=r.popLast(),o=e.field(r)),o===null?i.delete(r):i.set(r,o),s=s.add(r)}return new ci(n.key,i,new de(s.toArray()),kt.none())}}function NI(n,t,e){n instanceof to?function(s,r,o){const a=s.value.clone(),c=Kf(s.fieldTransforms,r,o.transformResults);a.setAll(c),r.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(n,t,e):n instanceof ci?function(s,r,o){if(!Zo(s.precondition,r))return void r.convertToUnknownDocument(o.version);const a=Kf(s.fieldTransforms,r,o.transformResults),c=r.data;c.setAll(j_(s)),c.setAll(a),r.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,t,e):function(s,r,o){r.convertToNoDocument(o.version).setHasCommittedMutations()}(0,t,e)}function br(n,t,e,i){return n instanceof to?function(r,o,a,c){if(!Zo(r.precondition,o))return a;const l=r.value.clone(),h=Yf(r.fieldTransforms,c,o);return l.setAll(h),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(n,t,e,i):n instanceof ci?function(r,o,a,c){if(!Zo(r.precondition,o))return a;const l=Yf(r.fieldTransforms,c,o),h=o.data;return h.setAll(j_(r)),h.setAll(l),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(d=>d.field))}(n,t,e,i):function(r,o,a){return Zo(r.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(n,t,e)}function VI(n,t){let e=null;for(const i of n.fieldTransforms){const s=t.data.field(i.field),r=F_(i.transform,s||null);r!=null&&(e===null&&(e=Zt.empty()),e.set(i.field,r))}return e||null}function Gf(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(i,s){return i===void 0&&s===void 0||!(!i||!s)&&ps(i,s,(r,o)=>MI(r,o))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class to extends cc{constructor(t,e,i,s=[]){super(),this.key=t,this.value=e,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ci extends cc{constructor(t,e,i,s,r=[]){super(),this.key=t,this.data=e,this.fieldMask=i,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function j_(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const i=n.data.field(e);t.set(e,i)}}),t}function Kf(n,t,e){const i=new Map;st(n.length===e.length,32656,{Re:e.length,Ve:n.length});for(let s=0;s<e.length;s++){const r=n[s],o=r.transform,a=t.data.field(r.field);i.set(r.field,kI(o,a,e[s]))}return i}function Yf(n,t,e){const i=new Map;for(const s of n){const r=s.transform,o=e.data.field(s.field);i.set(s.field,CI(r,o,t))}return i}class eo extends cc{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class H_ extends cc{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LI{constructor(t,e,i,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(t,e){const i=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const r=this.mutations[s];r.key.isEqual(t.key)&&NI(r,t,i[s])}}applyToLocalView(t,e){for(const i of this.baseMutations)i.key.isEqual(t.key)&&(e=br(i,t,e,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(t.key)&&(e=br(i,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const i=V_();return this.mutations.forEach(s=>{const r=t.get(s.key),o=r.overlayedDocument;let a=this.applyToLocalView(o,r.mutatedFields);a=e.has(s.key)?null:a;const c=$_(o,a);c!==null&&i.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(H.min())}),i}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),et())}isEqual(t){return this.batchId===t.batchId&&ps(this.mutations,t.mutations,(e,i)=>Gf(e,i))&&ps(this.baseMutations,t.baseMutations,(e,i)=>Gf(e,i))}}class Uu{constructor(t,e,i,s){this.batch=t,this.commitVersion=e,this.mutationResults=i,this.docVersions=s}static from(t,e,i){st(t.mutations.length===i.length,58842,{me:t.mutations.length,fe:i.length});let s=function(){return AI}();const r=t.mutations;for(let o=0;o<r.length;o++)s=s.insert(r[o].key,i[o].version);return new Uu(t,e,i,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FI{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UI{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var St,it;function W_(n){switch(n){case O.OK:return j(64938);case O.CANCELLED:case O.UNKNOWN:case O.DEADLINE_EXCEEDED:case O.RESOURCE_EXHAUSTED:case O.INTERNAL:case O.UNAVAILABLE:case O.UNAUTHENTICATED:return!1;case O.INVALID_ARGUMENT:case O.NOT_FOUND:case O.ALREADY_EXISTS:case O.PERMISSION_DENIED:case O.FAILED_PRECONDITION:case O.ABORTED:case O.OUT_OF_RANGE:case O.UNIMPLEMENTED:case O.DATA_LOSS:return!0;default:return j(15467,{code:n})}}function q_(n){if(n===void 0)return un("GRPC error has no .code"),O.UNKNOWN;switch(n){case St.OK:return O.OK;case St.CANCELLED:return O.CANCELLED;case St.UNKNOWN:return O.UNKNOWN;case St.DEADLINE_EXCEEDED:return O.DEADLINE_EXCEEDED;case St.RESOURCE_EXHAUSTED:return O.RESOURCE_EXHAUSTED;case St.INTERNAL:return O.INTERNAL;case St.UNAVAILABLE:return O.UNAVAILABLE;case St.UNAUTHENTICATED:return O.UNAUTHENTICATED;case St.INVALID_ARGUMENT:return O.INVALID_ARGUMENT;case St.NOT_FOUND:return O.NOT_FOUND;case St.ALREADY_EXISTS:return O.ALREADY_EXISTS;case St.PERMISSION_DENIED:return O.PERMISSION_DENIED;case St.FAILED_PRECONDITION:return O.FAILED_PRECONDITION;case St.ABORTED:return O.ABORTED;case St.OUT_OF_RANGE:return O.OUT_OF_RANGE;case St.UNIMPLEMENTED:return O.UNIMPLEMENTED;case St.DATA_LOSS:return O.DATA_LOSS;default:return j(39323,{code:n})}}(it=St||(St={}))[it.OK=0]="OK",it[it.CANCELLED=1]="CANCELLED",it[it.UNKNOWN=2]="UNKNOWN",it[it.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",it[it.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",it[it.NOT_FOUND=5]="NOT_FOUND",it[it.ALREADY_EXISTS=6]="ALREADY_EXISTS",it[it.PERMISSION_DENIED=7]="PERMISSION_DENIED",it[it.UNAUTHENTICATED=16]="UNAUTHENTICATED",it[it.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",it[it.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",it[it.ABORTED=10]="ABORTED",it[it.OUT_OF_RANGE=11]="OUT_OF_RANGE",it[it.UNIMPLEMENTED=12]="UNIMPLEMENTED",it[it.INTERNAL=13]="INTERNAL",it[it.UNAVAILABLE=14]="UNAVAILABLE",it[it.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BI(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zI=new Bn([4294967295,4294967295],0);function Qf(n){const t=BI().encode(n),e=new r_;return e.update(t),new Uint8Array(e.digest())}function Xf(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),i=t.getUint32(4,!0),s=t.getUint32(8,!0),r=t.getUint32(12,!0);return[new Bn([e,i],0),new Bn([s,r],0)]}class Bu{constructor(t,e,i){if(this.bitmap=t,this.padding=e,this.hashCount=i,e<0||e>=8)throw new or(`Invalid padding: ${e}`);if(i<0)throw new or(`Invalid hash count: ${i}`);if(t.length>0&&this.hashCount===0)throw new or(`Invalid hash count: ${i}`);if(t.length===0&&e!==0)throw new or(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=Bn.fromNumber(this.ge)}ye(t,e,i){let s=t.add(e.multiply(Bn.fromNumber(i)));return s.compare(zI)===1&&(s=new Bn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Qf(t),[i,s]=Xf(e);for(let r=0;r<this.hashCount;r++){const o=this.ye(i,s,r);if(!this.we(o))return!1}return!0}static create(t,e,i){const s=t%8==0?0:8-t%8,r=new Uint8Array(Math.ceil(t/8)),o=new Bu(r,s,e);return i.forEach(a=>o.insert(a)),o}insert(t){if(this.ge===0)return;const e=Qf(t),[i,s]=Xf(e);for(let r=0;r<this.hashCount;r++){const o=this.ye(i,s,r);this.Se(o)}}Se(t){const e=Math.floor(t/8),i=t%8;this.bitmap[e]|=1<<i}}class or extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lc{constructor(t,e,i,s,r){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=i,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(t,e,i){const s=new Map;return s.set(t,no.createSynthesizedTargetChangeForCurrentChange(t,e,i)),new lc(H.min(),s,new wt(tt),hn(),et())}}class no{constructor(t,e,i,s,r){this.resumeToken=t,this.current=e,this.addedDocuments=i,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(t,e,i){return new no(i,e,et(),et(),et())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(t,e,i,s){this.be=t,this.removedTargetIds=e,this.key=i,this.De=s}}class G_{constructor(t,e){this.targetId=t,this.Ce=e}}class K_{constructor(t,e,i=zt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=i,this.cause=s}}class Jf{constructor(){this.ve=0,this.Fe=Zf(),this.Me=zt.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=et(),e=et(),i=et();return this.Fe.forEach((s,r)=>{switch(r){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:i=i.add(s);break;default:j(38017,{changeType:r})}}),new no(this.Me,this.xe,t,e,i)}qe(){this.Oe=!1,this.Fe=Zf()}Qe(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}$e(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}Ue(){this.ve+=1}Ke(){this.ve-=1,st(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class $I{constructor(t){this.Ge=t,this.ze=new Map,this.je=hn(),this.Je=ko(),this.He=ko(),this.Ye=new wt(tt)}Ze(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Xe(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,e=>{const i=this.nt(e);switch(t.state){case 0:this.rt(e)&&i.Le(t.resumeToken);break;case 1:i.Ke(),i.Ne||i.qe(),i.Le(t.resumeToken);break;case 2:i.Ke(),i.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(i.We(),i.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),i.Le(t.resumeToken));break;default:j(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach((i,s)=>{this.rt(s)&&e(s)})}st(t){const e=t.targetId,i=t.Ce.count,s=this.ot(e);if(s){const r=s.target;if(Hl(r))if(i===0){const o=new $(r.path);this.et(e,o,Vt.newNoDocument(o,H.min()))}else st(i===1,20013,{expectedCount:i});else{const o=this._t(e);if(o!==i){const a=this.ut(t),c=a?this.ct(a,t,o):1;if(c!==0){this.it(e);const l=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(e,l)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:i="",padding:s=0},hashCount:r=0}=e;let o,a;try{o=Gn(i).toUint8Array()}catch(c){if(c instanceof __)return fs("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new Bu(o,s,r)}catch(c){return fs(c instanceof or?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.ge===0?null:a}ct(t,e,i){return e.Ce.count===i-this.Pt(t,e.targetId)?0:2}Pt(t,e){const i=this.Ge.getRemoteKeysForTarget(e);let s=0;return i.forEach(r=>{const o=this.Ge.ht(),a=`projects/${o.projectId}/databases/${o.database}/documents/${r.path.canonicalString()}`;t.mightContain(a)||(this.et(e,r,null),s++)}),s}Tt(t){const e=new Map;this.ze.forEach((r,o)=>{const a=this.ot(o);if(a){if(r.current&&Hl(a.target)){const c=new $(a.target.path);this.It(c).has(o)||this.Et(o,c)||this.et(o,c,Vt.newNoDocument(c,t))}r.Be&&(e.set(o,r.ke()),r.qe())}});let i=et();this.He.forEach((r,o)=>{let a=!0;o.forEachWhile(c=>{const l=this.ot(c);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(i=i.add(r))}),this.je.forEach((r,o)=>o.setReadTime(t));const s=new lc(t,e,this.Ye,this.je,i);return this.je=hn(),this.Je=ko(),this.He=ko(),this.Ye=new wt(tt),s}Xe(t,e){if(!this.rt(t))return;const i=this.Et(t,e.key)?2:0;this.nt(t).Qe(e.key,i),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.It(e.key).add(t)),this.He=this.He.insert(e.key,this.dt(e.key).add(t))}et(t,e,i){if(!this.rt(t))return;const s=this.nt(t);this.Et(t,e)?s.Qe(e,1):s.$e(e),this.He=this.He.insert(e,this.dt(e).delete(t)),this.He=this.He.insert(e,this.dt(e).add(t)),i&&(this.je=this.je.insert(e,i))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Ue(t){this.nt(t).Ue()}nt(t){let e=this.ze.get(t);return e||(e=new Jf,this.ze.set(t,e)),e}dt(t){let e=this.He.get(t);return e||(e=new Mt(tt),this.He=this.He.insert(t,e)),e}It(t){let e=this.Je.get(t);return e||(e=new Mt(tt),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||z("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Jf),this.Ge.getRemoteKeysForTarget(t).forEach(e=>{this.et(t,e,null)})}Et(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function ko(){return new wt($.comparator)}function Zf(){return new wt($.comparator)}const jI={asc:"ASCENDING",desc:"DESCENDING"},HI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},WI={and:"AND",or:"OR"};class qI{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function ql(n,t){return n.useProto3Json||Zr(t)?t:{value:t}}function xa(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Y_(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function GI(n,t){return xa(n,t.toTimestamp())}function pe(n){return st(!!n,49232),H.fromTimestamp(function(e){const i=qn(e);return new gt(i.seconds,i.nanos)}(n))}function zu(n,t){return Gl(n,t).canonicalString()}function Gl(n,t){const e=function(s){return new lt(["projects",s.projectId,"databases",s.database])}(n).child("documents");return t===void 0?e:e.child(t)}function Q_(n){const t=lt.fromString(n);return st(ny(t),10190,{key:t.toString()}),t}function Sa(n,t){return zu(n.databaseId,t.path)}function wr(n,t){const e=Q_(t);if(e.get(1)!==n.databaseId.projectId)throw new B(O.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new B(O.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new $(J_(e))}function X_(n,t){return zu(n.databaseId,t)}function KI(n){const t=Q_(n);return t.length===4?lt.emptyPath():J_(t)}function Kl(n){return new lt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function J_(n){return st(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function tp(n,t,e){return{name:Sa(n,t),fields:e.value.mapValue.fields}}function YI(n,t){return"found"in t?function(i,s){st(!!s.found,43571),s.found.name,s.found.updateTime;const r=wr(i,s.found.name),o=pe(s.found.updateTime),a=s.found.createTime?pe(s.found.createTime):H.min(),c=new Zt({mapValue:{fields:s.found.fields}});return Vt.newFoundDocument(r,o,a,c)}(n,t):"missing"in t?function(i,s){st(!!s.missing,3894),st(!!s.readTime,22933);const r=wr(i,s.missing),o=pe(s.readTime);return Vt.newNoDocument(r,o)}(n,t):j(7234,{result:t})}function QI(n,t){let e;if("targetChange"in t){t.targetChange;const i=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:j(39313,{state:l})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],r=function(l,h){return l.useProto3Json?(st(h===void 0||typeof h=="string",58123),zt.fromBase64String(h||"")):(st(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),zt.fromUint8Array(h||new Uint8Array))}(n,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(l){const h=l.code===void 0?O.UNKNOWN:q_(l.code);return new B(h,l.message||"")}(o);e=new K_(i,s,r,a||null)}else if("documentChange"in t){t.documentChange;const i=t.documentChange;i.document,i.document.name,i.document.updateTime;const s=wr(n,i.document.name),r=pe(i.document.updateTime),o=i.document.createTime?pe(i.document.createTime):H.min(),a=new Zt({mapValue:{fields:i.document.fields}}),c=Vt.newFoundDocument(s,r,o,a),l=i.targetIds||[],h=i.removedTargetIds||[];e=new ta(l,h,c.key,c)}else if("documentDelete"in t){t.documentDelete;const i=t.documentDelete;i.document;const s=wr(n,i.document),r=i.readTime?pe(i.readTime):H.min(),o=Vt.newNoDocument(s,r),a=i.removedTargetIds||[];e=new ta([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const i=t.documentRemove;i.document;const s=wr(n,i.document),r=i.removedTargetIds||[];e=new ta([],r,s,null)}else{if(!("filter"in t))return j(11601,{Rt:t});{t.filter;const i=t.filter;i.targetId;const{count:s=0,unchangedNames:r}=i,o=new UI(s,r),a=i.targetId;e=new G_(a,o)}}return e}function Z_(n,t){let e;if(t instanceof to)e={update:tp(n,t.key,t.value)};else if(t instanceof eo)e={delete:Sa(n,t.key)};else if(t instanceof ci)e={update:tp(n,t.key,t.data),updateMask:rA(t.fieldMask)};else{if(!(t instanceof H_))return j(16599,{Vt:t.type});e={verify:Sa(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(i=>function(r,o){const a=o.transform;if(a instanceof Nr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Vr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof Lr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Aa)return{fieldPath:o.field.canonicalString(),increment:a.Ae};throw j(20930,{transform:o.transform})}(0,i))),t.precondition.isNone||(e.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:GI(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:j(27497)}(n,t.precondition)),e}function XI(n,t){return n&&n.length>0?(st(t!==void 0,14353),n.map(e=>function(s,r){let o=s.updateTime?pe(s.updateTime):pe(r);return o.isEqual(H.min())&&(o=pe(r)),new OI(o,s.transformResults||[])}(e,t))):[]}function JI(n,t){return{documents:[X_(n,t.path)]}}function ZI(n,t){const e={structuredQuery:{}},i=t.path;let s;t.collectionGroup!==null?(s=i,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=i.popLast(),e.structuredQuery.from=[{collectionId:i.lastSegment()}]),e.parent=X_(n,s);const r=function(l){if(l.length!==0)return ey(Pe.create(l,"and"))}(t.filters);r&&(e.structuredQuery.where=r);const o=function(l){if(l.length!==0)return l.map(h=>function(f){return{field:ts(f.field),direction:nA(f.dir)}}(h))}(t.orderBy);o&&(e.structuredQuery.orderBy=o);const a=ql(n,t.limit);return a!==null&&(e.structuredQuery.limit=a),t.startAt&&(e.structuredQuery.startAt=function(l){return{before:l.inclusive,values:l.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(t.endAt)),{ft:e,parent:s}}function tA(n){let t=KI(n.parent);const e=n.structuredQuery,i=e.from?e.from.length:0;let s=null;if(i>0){st(i===1,65062);const h=e.from[0];h.allDescendants?s=h.collectionId:t=t.child(h.collectionId)}let r=[];e.where&&(r=function(d){const f=ty(d);return f instanceof Pe&&S_(f)?f.getFilters():[f]}(e.where));let o=[];e.orderBy&&(o=function(d){return d.map(f=>function(_){return new Or(es(_.field),function(v){switch(v){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(_.direction))}(f))}(e.orderBy));let a=null;e.limit&&(a=function(d){let f;return f=typeof d=="object"?d.value:d,Zr(f)?null:f}(e.limit));let c=null;e.startAt&&(c=function(d){const f=!!d.before,m=d.values||[];return new Ea(m,f)}(e.startAt));let l=null;return e.endAt&&(l=function(d){const f=!d.before,m=d.values||[];return new Ea(m,f)}(e.endAt)),wI(t,s,o,r,a,"F",c,l)}function eA(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return j(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function ty(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const i=es(e.unaryFilter.field);return Pt.create(i,"==",{doubleValue:NaN});case"IS_NULL":const s=es(e.unaryFilter.field);return Pt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=es(e.unaryFilter.field);return Pt.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=es(e.unaryFilter.field);return Pt.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return j(61313);default:return j(60726)}}(n):n.fieldFilter!==void 0?function(e){return Pt.create(es(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return j(58110);default:return j(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Pe.create(e.compositeFilter.filters.map(i=>ty(i)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return j(1026)}}(e.compositeFilter.op))}(n):j(30097,{filter:n})}function nA(n){return jI[n]}function iA(n){return HI[n]}function sA(n){return WI[n]}function ts(n){return{fieldPath:n.canonicalString()}}function es(n){return Bt.fromServerFormat(n.fieldPath)}function ey(n){return n instanceof Pt?function(e){if(e.op==="=="){if(zf(e.value))return{unaryFilter:{field:ts(e.field),op:"IS_NAN"}};if(Bf(e.value))return{unaryFilter:{field:ts(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(zf(e.value))return{unaryFilter:{field:ts(e.field),op:"IS_NOT_NAN"}};if(Bf(e.value))return{unaryFilter:{field:ts(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ts(e.field),op:iA(e.op),value:e.value}}}(n):n instanceof Pe?function(e){const i=e.getFilters().map(s=>ey(s));return i.length===1?i[0]:{compositeFilter:{op:sA(e.op),filters:i}}}(n):j(54877,{filter:n})}function rA(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function ny(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(t,e,i,s,r=H.min(),o=H.min(),a=zt.EMPTY_BYTE_STRING,c=null){this.target=t,this.targetId=e,this.purpose=i,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(t){return new Cn(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Cn(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Cn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Cn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oA{constructor(t){this.yt=t}}function aA(n){const t=tA({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ia(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cA{constructor(){this.Cn=new lA}addToCollectionParentIndex(t,e){return this.Cn.add(e),V.resolve()}getCollectionParents(t,e){return V.resolve(this.Cn.getEntries(e))}addFieldIndex(t,e){return V.resolve()}deleteFieldIndex(t,e){return V.resolve()}deleteAllFieldIndexes(t){return V.resolve()}createTargetIndexes(t,e){return V.resolve()}getDocumentsMatchingTarget(t,e){return V.resolve(null)}getIndexType(t,e){return V.resolve(0)}getFieldIndexes(t,e){return V.resolve([])}getNextCollectionGroupToUpdate(t){return V.resolve(null)}getMinOffset(t,e){return V.resolve(Wn.min())}getMinOffsetFromCollectionGroup(t,e){return V.resolve(Wn.min())}updateCollectionGroup(t,e,i){return V.resolve()}updateIndexEntries(t,e){return V.resolve()}}class lA{constructor(){this.index={}}add(t){const e=t.lastSegment(),i=t.popLast(),s=this.index[e]||new Mt(lt.comparator),r=!s.has(i);return this.index[e]=s.add(i),r}has(t){const e=t.lastSegment(),i=t.popLast(),s=this.index[e];return s&&s.has(i)}getEntries(t){return(this.index[t]||new Mt(lt.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ep={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},iy=41943040;class ne{static withCacheSize(t){return new ne(t,ne.DEFAULT_COLLECTION_PERCENTILE,ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,i){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ne.DEFAULT_COLLECTION_PERCENTILE=10,ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ne.DEFAULT=new ne(iy,ne.DEFAULT_COLLECTION_PERCENTILE,ne.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ne.DISABLED=new ne(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(t){this.ar=t}next(){return this.ar+=2,this.ar}static ur(){return new _s(0)}static cr(){return new _s(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const np="LruGarbageCollector",uA=1048576;function ip([n,t],[e,i]){const s=tt(n,e);return s===0?tt(t,i):s}class hA{constructor(t){this.Ir=t,this.buffer=new Mt(ip),this.Er=0}dr(){return++this.Er}Ar(t){const e=[t,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(e);else{const i=this.buffer.last();ip(e,i)<0&&(this.buffer=this.buffer.delete(i).add(e))}}get maxValue(){return this.buffer.last()[0]}}class dA{constructor(t,e,i){this.garbageCollector=t,this.asyncQueue=e,this.localStore=i,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(t){z(np,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Rs(e)?z(np,"Ignoring IndexedDB error during garbage collection: ",e):await Ps(e)}await this.Vr(3e5)})}}class fA{constructor(t,e){this.mr=t,this.params=e}calculateTargetCount(t,e){return this.mr.gr(t).next(i=>Math.floor(e/100*i))}nthSequenceNumber(t,e){if(e===0)return V.resolve(nc.ce);const i=new hA(e);return this.mr.forEachTarget(t,s=>i.Ar(s.sequenceNumber)).next(()=>this.mr.pr(t,s=>i.Ar(s))).next(()=>i.maxValue)}removeTargets(t,e,i){return this.mr.removeTargets(t,e,i)}removeOrphanedDocuments(t,e){return this.mr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(z("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(ep)):this.getCacheSize(t).next(i=>i<this.params.cacheSizeCollectionThreshold?(z("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ep):this.yr(t,e))}getCacheSize(t){return this.mr.getCacheSize(t)}yr(t,e){let i,s,r,o,a,c,l;const h=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(d=>(d>this.params.maximumSequenceNumbersToCollect?(z("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${d}`),s=this.params.maximumSequenceNumbersToCollect):s=d,o=Date.now(),this.nthSequenceNumber(t,s))).next(d=>(i=d,a=Date.now(),this.removeTargets(t,i,e))).next(d=>(r=d,c=Date.now(),this.removeOrphanedDocuments(t,i))).next(d=>(l=Date.now(),Ji()<=Z.DEBUG&&z("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${s} in `+(a-o)+`ms
	Removed ${r} targets in `+(c-a)+`ms
	Removed ${d} documents in `+(l-c)+`ms
Total Duration: ${l-h}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:r,documentsRemoved:d})))}}function pA(n,t){return new fA(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gA{constructor(){this.changes=new zi(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,Vt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const i=this.changes.get(e);return i!==void 0?V.resolve(i):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mA{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _A{constructor(t,e,i,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=i,this.indexManager=s}getDocument(t,e){let i=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(i=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(i!==null&&br(i.mutation,s,de.empty(),gt.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(i=>this.getLocalViewOfDocuments(t,i,et()).next(()=>i))}getLocalViewOfDocuments(t,e,i=et()){const s=Ii();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,i).next(r=>{let o=rr();return r.forEach((a,c)=>{o=o.insert(a,c.overlayedDocument)}),o}))}getOverlayedDocuments(t,e){const i=Ii();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,et()))}populateOverlays(t,e,i){const s=[];return i.forEach(r=>{e.has(r)||s.push(r)}),this.documentOverlayCache.getOverlays(t,s).next(r=>{r.forEach((o,a)=>{e.set(o,a)})})}computeViews(t,e,i,s){let r=hn();const o=yr(),a=function(){return yr()}();return e.forEach((c,l)=>{const h=i.get(l.key);s.has(l.key)&&(h===void 0||h.mutation instanceof ci)?r=r.insert(l.key,l):h!==void 0?(o.set(l.key,h.mutation.getFieldMask()),br(h.mutation,l,h.mutation.getFieldMask(),gt.now())):o.set(l.key,de.empty())}),this.recalculateAndSaveOverlays(t,r).next(c=>(c.forEach((l,h)=>o.set(l,h)),e.forEach((l,h)=>a.set(l,new mA(h,o.get(l)??null))),a))}recalculateAndSaveOverlays(t,e){const i=yr();let s=new wt((o,a)=>o-a),r=et();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(o=>{for(const a of o)a.keys().forEach(c=>{const l=e.get(c);if(l===null)return;let h=i.get(c)||de.empty();h=a.applyToLocalView(l,h),i.set(c,h);const d=(s.get(a.batchId)||et()).add(c);s=s.insert(a.batchId,d)})}).next(()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),l=c.key,h=c.value,d=V_();h.forEach(f=>{if(!r.has(f)){const m=$_(e.get(f),i.get(f));m!==null&&d.set(f,m),r=r.add(f)}}),o.push(this.documentOverlayCache.saveOverlays(t,l,d))}return V.waitFor(o)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(i=>this.recalculateAndSaveOverlays(t,i))}getDocumentsMatchingQuery(t,e,i,s){return function(o){return $.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):k_(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,i,s):this.getDocumentsMatchingCollectionQuery(t,e,i,s)}getNextDocuments(t,e,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,i,s).next(r=>{const o=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,i.largestBatchId,s-r.size):V.resolve(Ii());let a=Cr,c=r;return o.next(l=>V.forEach(l,(h,d)=>(a<d.largestBatchId&&(a=d.largestBatchId),r.get(h)?V.resolve():this.remoteDocumentCache.getEntry(t,h).next(f=>{c=c.insert(h,f)}))).next(()=>this.populateOverlays(t,l,r)).next(()=>this.computeViews(t,c,l,et())).next(h=>({batchId:a,changes:N_(h)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new $(e)).next(i=>{let s=rr();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,i,s){const r=e.collectionGroup;let o=rr();return this.indexManager.getCollectionParents(t,r).next(a=>V.forEach(a,c=>{const l=function(d,f){return new Cs(f,null,d.explicitOrderBy.slice(),d.filters.slice(),d.limit,d.limitType,d.startAt,d.endAt)}(e,c.child(r));return this.getDocumentsMatchingCollectionQuery(t,l,i,s).next(h=>{h.forEach((d,f)=>{o=o.insert(d,f)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(t,e,i,s){let r;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,i.largestBatchId).next(o=>(r=o,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,i,r,s))).next(o=>{r.forEach((c,l)=>{const h=l.getKey();o.get(h)===null&&(o=o.insert(h,Vt.newInvalidDocument(h)))});let a=rr();return o.forEach((c,l)=>{const h=r.get(c);h!==void 0&&br(h.mutation,l,de.empty(),gt.now()),oc(e,l)&&(a=a.insert(c,l))}),a})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yA{constructor(t){this.serializer=t,this.Lr=new Map,this.kr=new Map}getBundleMetadata(t,e){return V.resolve(this.Lr.get(e))}saveBundleMetadata(t,e){return this.Lr.set(e.id,function(s){return{id:s.id,version:s.version,createTime:pe(s.createTime)}}(e)),V.resolve()}getNamedQuery(t,e){return V.resolve(this.kr.get(e))}saveNamedQuery(t,e){return this.kr.set(e.name,function(s){return{name:s.name,query:aA(s.bundledQuery),readTime:pe(s.readTime)}}(e)),V.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bA{constructor(){this.overlays=new wt($.comparator),this.qr=new Map}getOverlay(t,e){return V.resolve(this.overlays.get(e))}getOverlays(t,e){const i=Ii();return V.forEach(e,s=>this.getOverlay(t,s).next(r=>{r!==null&&i.set(s,r)})).next(()=>i)}saveOverlays(t,e,i){return i.forEach((s,r)=>{this.St(t,e,r)}),V.resolve()}removeOverlaysForBatchId(t,e,i){const s=this.qr.get(i);return s!==void 0&&(s.forEach(r=>this.overlays=this.overlays.remove(r)),this.qr.delete(i)),V.resolve()}getOverlaysForCollection(t,e,i){const s=Ii(),r=e.length+1,o=new $(e.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,l=c.getKey();if(!e.isPrefixOf(l.path))break;l.path.length===r&&c.largestBatchId>i&&s.set(c.getKey(),c)}return V.resolve(s)}getOverlaysForCollectionGroup(t,e,i,s){let r=new wt((l,h)=>l-h);const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===e&&l.largestBatchId>i){let h=r.get(l.largestBatchId);h===null&&(h=Ii(),r=r.insert(l.largestBatchId,h)),h.set(l.getKey(),l)}}const a=Ii(),c=r.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((l,h)=>a.set(l,h)),!(a.size()>=s)););return V.resolve(a)}St(t,e,i){const s=this.overlays.get(i.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(i.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(i.key,new FI(e,i));let r=this.qr.get(e);r===void 0&&(r=et(),this.qr.set(e,r)),this.qr.set(e,r.add(i.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wA{constructor(){this.sessionToken=zt.EMPTY_BYTE_STRING}getSessionToken(t){return V.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(){this.Qr=new Mt(Nt.$r),this.Ur=new Mt(Nt.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(t,e){const i=new Nt(t,e);this.Qr=this.Qr.add(i),this.Ur=this.Ur.add(i)}Wr(t,e){t.forEach(i=>this.addReference(i,e))}removeReference(t,e){this.Gr(new Nt(t,e))}zr(t,e){t.forEach(i=>this.removeReference(i,e))}jr(t){const e=new $(new lt([])),i=new Nt(e,t),s=new Nt(e,t+1),r=[];return this.Ur.forEachInRange([i,s],o=>{this.Gr(o),r.push(o.key)}),r}Jr(){this.Qr.forEach(t=>this.Gr(t))}Gr(t){this.Qr=this.Qr.delete(t),this.Ur=this.Ur.delete(t)}Hr(t){const e=new $(new lt([])),i=new Nt(e,t),s=new Nt(e,t+1);let r=et();return this.Ur.forEachInRange([i,s],o=>{r=r.add(o.key)}),r}containsKey(t){const e=new Nt(t,0),i=this.Qr.firstAfterOrEqual(e);return i!==null&&t.isEqual(i.key)}}class Nt{constructor(t,e){this.key=t,this.Yr=e}static $r(t,e){return $.comparator(t.key,e.key)||tt(t.Yr,e.Yr)}static Kr(t,e){return tt(t.Yr,e.Yr)||$.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vA{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.tr=1,this.Zr=new Mt(Nt.$r)}checkEmpty(t){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,i,s){const r=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new LI(r,e,i,s);this.mutationQueue.push(o);for(const a of s)this.Zr=this.Zr.add(new Nt(a.key,r)),this.indexManager.addToCollectionParentIndex(t,a.key.path.popLast());return V.resolve(o)}lookupMutationBatch(t,e){return V.resolve(this.Xr(e))}getNextMutationBatchAfterBatchId(t,e){const i=e+1,s=this.ei(i),r=s<0?0:s;return V.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?Mu:this.tr-1)}getAllMutationBatches(t){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const i=new Nt(e,0),s=new Nt(e,Number.POSITIVE_INFINITY),r=[];return this.Zr.forEachInRange([i,s],o=>{const a=this.Xr(o.Yr);r.push(a)}),V.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(t,e){let i=new Mt(tt);return e.forEach(s=>{const r=new Nt(s,0),o=new Nt(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([r,o],a=>{i=i.add(a.Yr)})}),V.resolve(this.ti(i))}getAllMutationBatchesAffectingQuery(t,e){const i=e.path,s=i.length+1;let r=i;$.isDocumentKey(r)||(r=r.child(""));const o=new Nt(new $(r),0);let a=new Mt(tt);return this.Zr.forEachWhile(c=>{const l=c.key.path;return!!i.isPrefixOf(l)&&(l.length===s&&(a=a.add(c.Yr)),!0)},o),V.resolve(this.ti(a))}ti(t){const e=[];return t.forEach(i=>{const s=this.Xr(i);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){st(this.ni(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let i=this.Zr;return V.forEach(e.mutations,s=>{const r=new Nt(s.key,e.batchId);return i=i.delete(r),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Zr=i})}ir(t){}containsKey(t,e){const i=new Nt(e,0),s=this.Zr.firstAfterOrEqual(i);return V.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,V.resolve()}ni(t,e){return this.ei(t)}ei(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Xr(t){const e=this.ei(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TA{constructor(t){this.ri=t,this.docs=function(){return new wt($.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const i=e.key,s=this.docs.get(i),r=s?s.size:0,o=this.ri(e);return this.docs=this.docs.insert(i,{document:e.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(t,i.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const i=this.docs.get(e);return V.resolve(i?i.document.mutableCopy():Vt.newInvalidDocument(e))}getEntries(t,e){let i=hn();return e.forEach(s=>{const r=this.docs.get(s);i=i.insert(s,r?r.document.mutableCopy():Vt.newInvalidDocument(s))}),V.resolve(i)}getDocumentsMatchingQuery(t,e,i,s){let r=hn();const o=e.path,a=new $(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(a);for(;c.hasNext();){const{key:l,value:{document:h}}=c.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||JE(XE(h),i)<=0||(s.has(h.key)||oc(e,h))&&(r=r.insert(h.key,h.mutableCopy()))}return V.resolve(r)}getAllFromCollectionGroup(t,e,i,s){j(9500)}ii(t,e){return V.forEach(this.docs,i=>e(i))}newChangeBuffer(t){return new EA(this)}getSize(t){return V.resolve(this.size)}}class EA extends gA{constructor(t){super(),this.Nr=t}applyChanges(t){const e=[];return this.changes.forEach((i,s)=>{s.isValidDocument()?e.push(this.Nr.addEntry(t,s)):this.Nr.removeEntry(i)}),V.waitFor(e)}getFromCache(t,e){return this.Nr.getEntry(t,e)}getAllFromCache(t,e){return this.Nr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IA{constructor(t){this.persistence=t,this.si=new zi(e=>Vu(e),Lu),this.lastRemoteSnapshotVersion=H.min(),this.highestTargetId=0,this.oi=0,this._i=new $u,this.targetCount=0,this.ai=_s.ur()}forEachTarget(t,e){return this.si.forEach((i,s)=>e(s)),V.resolve()}getLastRemoteSnapshotVersion(t){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return V.resolve(this.oi)}allocateTargetId(t){return this.highestTargetId=this.ai.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(t,e,i){return i&&(this.lastRemoteSnapshotVersion=i),e>this.oi&&(this.oi=e),V.resolve()}Pr(t){this.si.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.ai=new _s(e),this.highestTargetId=e),t.sequenceNumber>this.oi&&(this.oi=t.sequenceNumber)}addTargetData(t,e){return this.Pr(e),this.targetCount+=1,V.resolve()}updateTargetData(t,e){return this.Pr(e),V.resolve()}removeTargetData(t,e){return this.si.delete(e.target),this._i.jr(e.targetId),this.targetCount-=1,V.resolve()}removeTargets(t,e,i){let s=0;const r=[];return this.si.forEach((o,a)=>{a.sequenceNumber<=e&&i.get(a.targetId)===null&&(this.si.delete(o),r.push(this.removeMatchingKeysForTargetId(t,a.targetId)),s++)}),V.waitFor(r).next(()=>s)}getTargetCount(t){return V.resolve(this.targetCount)}getTargetData(t,e){const i=this.si.get(e)||null;return V.resolve(i)}addMatchingKeys(t,e,i){return this._i.Wr(e,i),V.resolve()}removeMatchingKeys(t,e,i){this._i.zr(e,i);const s=this.persistence.referenceDelegate,r=[];return s&&e.forEach(o=>{r.push(s.markPotentiallyOrphaned(t,o))}),V.waitFor(r)}removeMatchingKeysForTargetId(t,e){return this._i.jr(e),V.resolve()}getMatchingKeysForTargetId(t,e){const i=this._i.Hr(e);return V.resolve(i)}containsKey(t,e){return V.resolve(this._i.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(t,e){this.ui={},this.overlays={},this.ci=new nc(0),this.li=!1,this.li=!0,this.hi=new wA,this.referenceDelegate=t(this),this.Pi=new IA(this),this.indexManager=new cA,this.remoteDocumentCache=function(s){return new TA(s)}(i=>this.referenceDelegate.Ti(i)),this.serializer=new oA(e),this.Ii=new yA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new bA,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let i=this.ui[t.toKey()];return i||(i=new vA(e,this.referenceDelegate),this.ui[t.toKey()]=i),i}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(t,e,i){z("MemoryPersistence","Starting transaction:",t);const s=new AA(this.ci.next());return this.referenceDelegate.Ei(),i(s).next(r=>this.referenceDelegate.di(s).next(()=>r)).toPromise().then(r=>(s.raiseOnCommittedEvent(),r))}Ai(t,e){return V.or(Object.values(this.ui).map(i=>()=>i.containsKey(t,e)))}}class AA extends tI{constructor(t){super(),this.currentSequenceNumber=t}}class ju{constructor(t){this.persistence=t,this.Ri=new $u,this.Vi=null}static mi(t){return new ju(t)}get fi(){if(this.Vi)return this.Vi;throw j(60996)}addReference(t,e,i){return this.Ri.addReference(i,e),this.fi.delete(i.toString()),V.resolve()}removeReference(t,e,i){return this.Ri.removeReference(i,e),this.fi.add(i.toString()),V.resolve()}markPotentiallyOrphaned(t,e){return this.fi.add(e.toString()),V.resolve()}removeTarget(t,e){this.Ri.jr(e.targetId).forEach(s=>this.fi.add(s.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(r=>this.fi.add(r.toString()))}).next(()=>i.removeTargetData(t,e))}Ei(){this.Vi=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.fi,i=>{const s=$.fromPath(i);return this.gi(t,s).next(r=>{r||e.removeEntry(s,H.min())})}).next(()=>(this.Vi=null,e.apply(t)))}updateLimboDocument(t,e){return this.gi(t,e).next(i=>{i?this.fi.delete(e.toString()):this.fi.add(e.toString())})}Ti(t){return 0}gi(t,e){return V.or([()=>V.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ai(t,e)])}}class Pa{constructor(t,e){this.persistence=t,this.pi=new zi(i=>iI(i.path),(i,s)=>i.isEqual(s)),this.garbageCollector=pA(this,e)}static mi(t,e){return new Pa(t,e)}Ei(){}di(t){return V.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}gr(t){const e=this.wr(t);return this.persistence.getTargetCache().getTargetCount(t).next(i=>e.next(s=>i+s))}wr(t){let e=0;return this.pr(t,i=>{e++}).next(()=>e)}pr(t,e){return V.forEach(this.pi,(i,s)=>this.br(t,i,s).next(r=>r?V.resolve():e(s)))}removeTargets(t,e,i){return this.persistence.getTargetCache().removeTargets(t,e,i)}removeOrphanedDocuments(t,e){let i=0;const s=this.persistence.getRemoteDocumentCache(),r=s.newChangeBuffer();return s.ii(t,o=>this.br(t,o,e).next(a=>{a||(i++,r.removeEntry(o,H.min()))})).next(()=>r.apply(t)).next(()=>i)}markPotentiallyOrphaned(t,e){return this.pi.set(e,t.currentSequenceNumber),V.resolve()}removeTarget(t,e){const i=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,i)}addReference(t,e,i){return this.pi.set(i,t.currentSequenceNumber),V.resolve()}removeReference(t,e,i){return this.pi.set(i,t.currentSequenceNumber),V.resolve()}updateLimboDocument(t,e){return this.pi.set(e,t.currentSequenceNumber),V.resolve()}Ti(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Xo(t.data.value)),e}br(t,e,i){return V.or([()=>this.persistence.Ai(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.pi.get(e);return V.resolve(s!==void 0&&s>i)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(t,e,i,s){this.targetId=t,this.fromCache=e,this.Es=i,this.ds=s}static As(t,e){let i=et(),s=et();for(const r of e.docChanges)switch(r.type){case 0:i=i.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new Hu(t,e.fromCache,i,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SA{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return ov()?8:eI(Yt())>0?6:4}()}initialize(t,e){this.ps=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,i,s){const r={result:null};return this.ys(t,e).next(o=>{r.result=o}).next(()=>{if(!r.result)return this.ws(t,e,s,i).next(o=>{r.result=o})}).next(()=>{if(r.result)return;const o=new xA;return this.Ss(t,e,o).next(a=>{if(r.result=a,this.Vs)return this.bs(t,e,o,a.size)})}).next(()=>r.result)}bs(t,e,i,s){return i.documentReadCount<this.fs?(Ji()<=Z.DEBUG&&z("QueryEngine","SDK will not create cache indexes for query:",Zi(e),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),V.resolve()):(Ji()<=Z.DEBUG&&z("QueryEngine","Query:",Zi(e),"scans",i.documentReadCount,"local documents and returns",s,"documents as results."),i.documentReadCount>this.gs*s?(Ji()<=Z.DEBUG&&z("QueryEngine","The SDK decides to create cache indexes for query:",Zi(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,ze(e))):V.resolve())}ys(t,e){if(Wf(e))return V.resolve(null);let i=ze(e);return this.indexManager.getIndexType(t,i).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=Ia(e,null,"F"),i=ze(e)),this.indexManager.getDocumentsMatchingTarget(t,i).next(r=>{const o=et(...r);return this.ps.getDocuments(t,o).next(a=>this.indexManager.getMinOffset(t,i).next(c=>{const l=this.Ds(e,a);return this.Cs(e,l,o,c.readTime)?this.ys(t,Ia(e,null,"F")):this.vs(t,l,e,c)}))})))}ws(t,e,i,s){return Wf(e)||s.isEqual(H.min())?V.resolve(null):this.ps.getDocuments(t,i).next(r=>{const o=this.Ds(e,r);return this.Cs(e,o,i,s)?V.resolve(null):(Ji()<=Z.DEBUG&&z("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Zi(e)),this.vs(t,o,e,QE(s,Cr)).next(a=>a))})}Ds(t,e){let i=new Mt(M_(t));return e.forEach((s,r)=>{oc(t,r)&&(i=i.add(r))}),i}Cs(t,e,i,s){if(t.limit===null)return!1;if(i.size!==e.size)return!0;const r=t.limitType==="F"?e.last():e.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}Ss(t,e,i){return Ji()<=Z.DEBUG&&z("QueryEngine","Using full collection scan to execute query:",Zi(e)),this.ps.getDocumentsMatchingQuery(t,e,Wn.min(),i)}vs(t,e,i,s){return this.ps.getDocumentsMatchingQuery(t,i,s).next(r=>(e.forEach(o=>{r=r.insert(o.key,o)}),r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu="LocalStore",PA=3e8;class RA{constructor(t,e,i,s){this.persistence=t,this.Fs=e,this.serializer=s,this.Ms=new wt(tt),this.xs=new zi(r=>Vu(r),Lu),this.Os=new Map,this.Ns=t.getRemoteDocumentCache(),this.Pi=t.getTargetCache(),this.Ii=t.getBundleCache(),this.Bs(i)}Bs(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new _A(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Ms))}}function CA(n,t,e,i){return new RA(n,t,e,i)}async function ry(n,t){const e=q(n);return await e.persistence.runTransaction("Handle user change","readonly",i=>{let s;return e.mutationQueue.getAllMutationBatches(i).next(r=>(s=r,e.Bs(t),e.mutationQueue.getAllMutationBatches(i))).next(r=>{const o=[],a=[];let c=et();for(const l of s){o.push(l.batchId);for(const h of l.mutations)c=c.add(h.key)}for(const l of r){a.push(l.batchId);for(const h of l.mutations)c=c.add(h.key)}return e.localDocuments.getDocuments(i,c).next(l=>({Ls:l,removedBatchIds:o,addedBatchIds:a}))})})}function kA(n,t){const e=q(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const s=t.batch.keys(),r=e.Ns.newChangeBuffer({trackRemovals:!0});return function(a,c,l,h){const d=l.batch,f=d.keys();let m=V.resolve();return f.forEach(_=>{m=m.next(()=>h.getEntry(c,_)).next(b=>{const v=l.docVersions.get(_);st(v!==null,48541),b.version.compareTo(v)<0&&(d.applyToRemoteDocument(b,l),b.isValidDocument()&&(b.setReadTime(l.commitVersion),h.addEntry(b)))})}),m.next(()=>a.mutationQueue.removeMutationBatch(c,d))}(e,i,t,r).next(()=>r.apply(i)).next(()=>e.mutationQueue.performConsistencyCheck(i)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(i,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(a){let c=et();for(let l=0;l<a.mutationResults.length;++l)a.mutationResults[l].transformResults.length>0&&(c=c.add(a.batch.mutations[l].key));return c}(t))).next(()=>e.localDocuments.getDocuments(i,s))})}function oy(n){const t=q(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Pi.getLastRemoteSnapshotVersion(e))}function DA(n,t){const e=q(n),i=t.snapshotVersion;let s=e.Ms;return e.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const o=e.Ns.newChangeBuffer({trackRemovals:!0});s=e.Ms;const a=[];t.targetChanges.forEach((h,d)=>{const f=s.get(d);if(!f)return;a.push(e.Pi.removeMatchingKeys(r,h.removedDocuments,d).next(()=>e.Pi.addMatchingKeys(r,h.addedDocuments,d)));let m=f.withSequenceNumber(r.currentSequenceNumber);t.targetMismatches.get(d)!==null?m=m.withResumeToken(zt.EMPTY_BYTE_STRING,H.min()).withLastLimboFreeSnapshotVersion(H.min()):h.resumeToken.approximateByteSize()>0&&(m=m.withResumeToken(h.resumeToken,i)),s=s.insert(d,m),function(b,v,S){return b.resumeToken.approximateByteSize()===0||v.snapshotVersion.toMicroseconds()-b.snapshotVersion.toMicroseconds()>=PA?!0:S.addedDocuments.size+S.modifiedDocuments.size+S.removedDocuments.size>0}(f,m,h)&&a.push(e.Pi.updateTargetData(r,m))});let c=hn(),l=et();if(t.documentUpdates.forEach(h=>{t.resolvedLimboDocuments.has(h)&&a.push(e.persistence.referenceDelegate.updateLimboDocument(r,h))}),a.push(MA(r,o,t.documentUpdates).next(h=>{c=h.ks,l=h.qs})),!i.isEqual(H.min())){const h=e.Pi.getLastRemoteSnapshotVersion(r).next(d=>e.Pi.setTargetsMetadata(r,r.currentSequenceNumber,i));a.push(h)}return V.waitFor(a).next(()=>o.apply(r)).next(()=>e.localDocuments.getLocalViewOfDocuments(r,c,l)).next(()=>c)}).then(r=>(e.Ms=s,r))}function MA(n,t,e){let i=et(),s=et();return e.forEach(r=>i=i.add(r)),t.getEntries(n,i).next(r=>{let o=hn();return e.forEach((a,c)=>{const l=r.get(a);c.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(a)),c.isNoDocument()&&c.version.isEqual(H.min())?(t.removeEntry(a,c.readTime),o=o.insert(a,c)):!l.isValidDocument()||c.version.compareTo(l.version)>0||c.version.compareTo(l.version)===0&&l.hasPendingWrites?(t.addEntry(c),o=o.insert(a,c)):z(Wu,"Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",c.version)}),{ks:o,qs:s}})}function OA(n,t){const e=q(n);return e.persistence.runTransaction("Get next mutation batch","readonly",i=>(t===void 0&&(t=Mu),e.mutationQueue.getNextMutationBatchAfterBatchId(i,t)))}function NA(n,t){const e=q(n);return e.persistence.runTransaction("Allocate target","readwrite",i=>{let s;return e.Pi.getTargetData(i,t).next(r=>r?(s=r,V.resolve(s)):e.Pi.allocateTargetId(i).next(o=>(s=new Cn(t,o,"TargetPurposeListen",i.currentSequenceNumber),e.Pi.addTargetData(i,s).next(()=>s))))}).then(i=>{const s=e.Ms.get(i.targetId);return(s===null||i.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Ms=e.Ms.insert(i.targetId,i),e.xs.set(t,i.targetId)),i})}async function Yl(n,t,e){const i=q(n),s=i.Ms.get(t),r=e?"readwrite":"readwrite-primary";try{e||await i.persistence.runTransaction("Release target",r,o=>i.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Rs(o))throw o;z(Wu,`Failed to update sequence numbers for target ${t}: ${o}`)}i.Ms=i.Ms.remove(t),i.xs.delete(s.target)}function sp(n,t,e){const i=q(n);let s=H.min(),r=et();return i.persistence.runTransaction("Execute query","readwrite",o=>function(c,l,h){const d=q(c),f=d.xs.get(h);return f!==void 0?V.resolve(d.Ms.get(f)):d.Pi.getTargetData(l,h)}(i,o,ze(t)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,i.Pi.getMatchingKeysForTargetId(o,a.targetId).next(c=>{r=c})}).next(()=>i.Fs.getDocumentsMatchingQuery(o,t,e?s:H.min(),e?r:et())).next(a=>(VA(i,TI(t),a),{documents:a,Qs:r})))}function VA(n,t,e){let i=n.Os.get(t)||H.min();e.forEach((s,r)=>{r.readTime.compareTo(i)>0&&(i=r.readTime)}),n.Os.set(t,i)}class rp{constructor(){this.activeTargetIds=PI()}zs(t){this.activeTargetIds=this.activeTargetIds.add(t)}js(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Gs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class LA{constructor(){this.Mo=new rp,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,i){}addLocalQueryTarget(t,e=!0){return e&&this.Mo.zs(t),this.xo[t]||"not-current"}updateQueryState(t,e,i){this.xo[t]=e}removeLocalQueryTarget(t){this.Mo.js(t)}isLocalQueryTarget(t){return this.Mo.activeTargetIds.has(t)}clearQueryState(t){delete this.xo[t]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(t){return this.Mo.activeTargetIds.has(t)}start(){return this.Mo=new rp,Promise.resolve()}handleUserChange(t,e,i){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FA{Oo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const op="ConnectivityMonitor";class ap{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(t){this.qo.push(t)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){z(op,"Network connectivity changed: AVAILABLE");for(const t of this.qo)t(0)}ko(){z(op,"Network connectivity changed: UNAVAILABLE");for(const t of this.qo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Do=null;function Ql(){return Do===null?Do=function(){return 268435456+Math.round(2147483648*Math.random())}():Do++,"0x"+Do.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll="RestConnection",UA={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class BA{get $o(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=e+"://"+t.host,this.Ko=`projects/${i}/databases/${s}`,this.Wo=this.databaseId.database===va?`project_id=${i}`:`project_id=${i}&database_id=${s}`}Go(t,e,i,s,r){const o=Ql(),a=this.zo(t,e.toUriEncodedString());z(ll,`Sending RPC '${t}' ${o}:`,a,i);const c={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(c,s,r);const{host:l}=new URL(a),h=ii(l);return this.Jo(t,a,c,i,h).then(d=>(z(ll,`Received RPC '${t}' ${o}: `,d),d),d=>{throw fs(ll,`RPC '${t}' ${o} failed with error: `,d,"url: ",a,"request:",i),d})}Ho(t,e,i,s,r,o){return this.Go(t,e,i,s,r)}jo(t,e,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ss}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,r)=>t[r]=s),i&&i.headers.forEach((s,r)=>t[r]=s)}zo(t,e){const i=UA[t];return`${this.Uo}/v1/${e}:${i}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zA{constructor(t){this.Yo=t.Yo,this.Zo=t.Zo}Xo(t){this.e_=t}t_(t){this.n_=t}r_(t){this.i_=t}onMessage(t){this.s_=t}close(){this.Zo()}send(t){this.Yo(t)}o_(){this.e_()}__(){this.n_()}a_(t){this.i_(t)}u_(t){this.s_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht="WebChannelConnection";class $A extends BA{constructor(t){super(t),this.c_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Jo(t,e,i,s,r){const o=Ql();return new Promise((a,c)=>{const l=new o_;l.setWithCredentials(!0),l.listenOnce(a_.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Qo.NO_ERROR:const d=l.getResponseJson();z(Ht,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(d)),a(d);break;case Qo.TIMEOUT:z(Ht,`RPC '${t}' ${o} timed out`),c(new B(O.DEADLINE_EXCEEDED,"Request time out"));break;case Qo.HTTP_ERROR:const f=l.getStatus();if(z(Ht,`RPC '${t}' ${o} failed with status:`,f,"response text:",l.getResponseText()),f>0){let m=l.getResponseJson();Array.isArray(m)&&(m=m[0]);const _=m==null?void 0:m.error;if(_&&_.status&&_.message){const b=function(S){const R=S.toLowerCase().replace(/_/g,"-");return Object.values(O).indexOf(R)>=0?R:O.UNKNOWN}(_.status);c(new B(b,_.message))}else c(new B(O.UNKNOWN,"Server responded with status "+l.getStatus()))}else c(new B(O.UNAVAILABLE,"Connection failed."));break;default:j(9055,{l_:t,streamId:o,h_:l.getLastErrorCode(),P_:l.getLastError()})}}finally{z(Ht,`RPC '${t}' ${o} completed.`)}});const h=JSON.stringify(s);z(Ht,`RPC '${t}' ${o} sending request:`,s),l.send(e,"POST",h,i,15)})}T_(t,e,i){const s=Ql(),r=[this.Uo,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=u_(),a=l_(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(c.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(c.useFetchStreams=!0),this.jo(c.initMessageHeaders,e,i),c.encodeInitMessageHeaders=!0;const h=r.join("");z(Ht,`Creating RPC '${t}' stream ${s}: ${h}`,c);const d=o.createWebChannel(h,c);this.I_(d);let f=!1,m=!1;const _=new zA({Yo:v=>{m?z(Ht,`Not sending because RPC '${t}' stream ${s} is closed:`,v):(f||(z(Ht,`Opening RPC '${t}' stream ${s} transport.`),d.open(),f=!0),z(Ht,`RPC '${t}' stream ${s} sending:`,v),d.send(v))},Zo:()=>d.close()}),b=(v,S,R)=>{v.listen(S,D=>{try{R(D)}catch(N){setTimeout(()=>{throw N},0)}})};return b(d,sr.EventType.OPEN,()=>{m||(z(Ht,`RPC '${t}' stream ${s} transport opened.`),_.o_())}),b(d,sr.EventType.CLOSE,()=>{m||(m=!0,z(Ht,`RPC '${t}' stream ${s} transport closed`),_.a_(),this.E_(d))}),b(d,sr.EventType.ERROR,v=>{m||(m=!0,fs(Ht,`RPC '${t}' stream ${s} transport errored. Name:`,v.name,"Message:",v.message),_.a_(new B(O.UNAVAILABLE,"The operation could not be completed")))}),b(d,sr.EventType.MESSAGE,v=>{var S;if(!m){const R=v.data[0];st(!!R,16349);const D=R,N=(D==null?void 0:D.error)||((S=D[0])==null?void 0:S.error);if(N){z(Ht,`RPC '${t}' stream ${s} received error:`,N);const M=N.status;let L=function(T){const x=St[T];if(x!==void 0)return q_(x)}(M),E=N.message;L===void 0&&(L=O.INTERNAL,E="Unknown error status: "+M+" with message "+N.message),m=!0,_.a_(new B(L,E)),d.close()}else z(Ht,`RPC '${t}' stream ${s} received:`,R),_.u_(R)}}),b(a,c_.STAT_EVENT,v=>{v.stat===Ul.PROXY?z(Ht,`RPC '${t}' stream ${s} detected buffering proxy`):v.stat===Ul.NOPROXY&&z(Ht,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{_.__()},0),_}terminate(){this.c_.forEach(t=>t.close()),this.c_=[]}I_(t){this.c_.push(t)}E_(t){this.c_=this.c_.filter(e=>e===t)}}function ul(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uc(n){return new qI(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(t,e,i=1e3,s=1.5,r=6e4){this.Mi=t,this.timerId=e,this.d_=i,this.A_=s,this.R_=r,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(t){this.cancel();const e=Math.floor(this.V_+this.y_()),i=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-i);s>0&&z("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${e} ms, last attempt: ${i} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),t())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp="PersistentStream";class ay{constructor(t,e,i,s,r,o,a,c){this.Mi=t,this.S_=i,this.b_=s,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new qu(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(t){this.Q_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===O.RESOURCE_EXHAUSTED?(un(e.toString()),un("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===O.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.r_(e)}K_(){}auth(){this.state=1;const t=this.W_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,s])=>{this.D_===e&&this.G_(i,s)},i=>{t(()=>{const s=new B(O.UNKNOWN,"Fetching auth token failed: "+i.message);return this.z_(s)})})}G_(t,e){const i=this.W_(this.D_);this.stream=this.j_(t,e),this.stream.Xo(()=>{i(()=>this.listener.Xo())}),this.stream.t_(()=>{i(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{i(()=>this.z_(s))}),this.stream.onMessage(s=>{i(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(t){return z(cp,`close with error: ${t}`),this.stream=null,this.close(4,t)}W_(t){return e=>{this.Mi.enqueueAndForget(()=>this.D_===t?e():(z(cp,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class jA extends ay{constructor(t,e,i,s,r,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,i,s,o),this.serializer=r}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=QI(this.serializer,t),i=function(r){if(!("targetChange"in r))return H.min();const o=r.targetChange;return o.targetIds&&o.targetIds.length?H.min():o.readTime?pe(o.readTime):H.min()}(t);return this.listener.H_(e,i)}Y_(t){const e={};e.database=Kl(this.serializer),e.addTarget=function(r,o){let a;const c=o.target;if(a=Hl(c)?{documents:JI(r,c)}:{query:ZI(r,c).ft},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=Y_(r,o.resumeToken);const l=ql(r,o.expectedCount);l!==null&&(a.expectedCount=l)}else if(o.snapshotVersion.compareTo(H.min())>0){a.readTime=xa(r,o.snapshotVersion.toTimestamp());const l=ql(r,o.expectedCount);l!==null&&(a.expectedCount=l)}return a}(this.serializer,t);const i=eA(this.serializer,t);i&&(e.labels=i),this.q_(e)}Z_(t){const e={};e.database=Kl(this.serializer),e.removeTarget=t,this.q_(e)}}class HA extends ay{constructor(t,e,i,s,r,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,i,s,o),this.serializer=r}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return st(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,st(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){st(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=XI(t.writeResults,t.commitTime),i=pe(t.commitTime);return this.listener.na(i,e)}ra(){const t={};t.database=Kl(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map(i=>Z_(this.serializer,i))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WA{}class qA extends WA{constructor(t,e,i,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=i,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new B(O.FAILED_PRECONDITION,"The client has already been terminated.")}Go(t,e,i,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.Go(t,Gl(e,i),s,r,o)).catch(r=>{throw r.name==="FirebaseError"?(r.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new B(O.UNKNOWN,r.toString())})}Ho(t,e,i,s,r){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Ho(t,Gl(e,i),s,o,a,r)).catch(o=>{throw o.name==="FirebaseError"?(o.code===O.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new B(O.UNKNOWN,o.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class GA{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(un(e),this.aa=!1):z("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oi="RemoteStore";class KA{constructor(t,e,i,s,r){this.localStore=t,this.datastore=e,this.asyncQueue=i,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=r,this.Aa.Oo(o=>{i.enqueueAndForget(async()=>{$i(this)&&(z(Oi,"Restarting streams for network reachability change."),await async function(c){const l=q(c);l.Ea.add(4),await io(l),l.Ra.set("Unknown"),l.Ea.delete(4),await hc(l)}(this))})}),this.Ra=new GA(i,s)}}async function hc(n){if($i(n))for(const t of n.da)await t(!0)}async function io(n){for(const t of n.da)await t(!1)}function cy(n,t){const e=q(n);e.Ia.has(t.targetId)||(e.Ia.set(t.targetId,t),Qu(e)?Yu(e):ks(e).O_()&&Ku(e,t))}function Gu(n,t){const e=q(n),i=ks(e);e.Ia.delete(t),i.O_()&&ly(e,t),e.Ia.size===0&&(i.O_()?i.L_():$i(e)&&e.Ra.set("Unknown"))}function Ku(n,t){if(n.Va.Ue(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(H.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}ks(n).Y_(t)}function ly(n,t){n.Va.Ue(t),ks(n).Z_(t)}function Yu(n){n.Va=new $I({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ia.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),ks(n).start(),n.Ra.ua()}function Qu(n){return $i(n)&&!ks(n).x_()&&n.Ia.size>0}function $i(n){return q(n).Ea.size===0}function uy(n){n.Va=void 0}async function YA(n){n.Ra.set("Online")}async function QA(n){n.Ia.forEach((t,e)=>{Ku(n,t)})}async function XA(n,t){uy(n),Qu(n)?(n.Ra.ha(t),Yu(n)):n.Ra.set("Unknown")}async function JA(n,t,e){if(n.Ra.set("Online"),t instanceof K_&&t.state===2&&t.cause)try{await async function(s,r){const o=r.cause;for(const a of r.targetIds)s.Ia.has(a)&&(await s.remoteSyncer.rejectListen(a,o),s.Ia.delete(a),s.Va.removeTarget(a))}(n,t)}catch(i){z(Oi,"Failed to remove targets %s: %s ",t.targetIds.join(","),i),await Ra(n,i)}else if(t instanceof ta?n.Va.Ze(t):t instanceof G_?n.Va.st(t):n.Va.tt(t),!e.isEqual(H.min()))try{const i=await oy(n.localStore);e.compareTo(i)>=0&&await function(r,o){const a=r.Va.Tt(o);return a.targetChanges.forEach((c,l)=>{if(c.resumeToken.approximateByteSize()>0){const h=r.Ia.get(l);h&&r.Ia.set(l,h.withResumeToken(c.resumeToken,o))}}),a.targetMismatches.forEach((c,l)=>{const h=r.Ia.get(c);if(!h)return;r.Ia.set(c,h.withResumeToken(zt.EMPTY_BYTE_STRING,h.snapshotVersion)),ly(r,c);const d=new Cn(h.target,c,l,h.sequenceNumber);Ku(r,d)}),r.remoteSyncer.applyRemoteEvent(a)}(n,e)}catch(i){z(Oi,"Failed to raise snapshot:",i),await Ra(n,i)}}async function Ra(n,t,e){if(!Rs(t))throw t;n.Ea.add(1),await io(n),n.Ra.set("Offline"),e||(e=()=>oy(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{z(Oi,"Retrying IndexedDB access"),await e(),n.Ea.delete(1),await hc(n)})}function hy(n,t){return t().catch(e=>Ra(n,e,t))}async function dc(n){const t=q(n),e=Yn(t);let i=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:Mu;for(;ZA(t);)try{const s=await OA(t.localStore,i);if(s===null){t.Ta.length===0&&e.L_();break}i=s.batchId,tx(t,s)}catch(s){await Ra(t,s)}dy(t)&&fy(t)}function ZA(n){return $i(n)&&n.Ta.length<10}function tx(n,t){n.Ta.push(t);const e=Yn(n);e.O_()&&e.X_&&e.ea(t.mutations)}function dy(n){return $i(n)&&!Yn(n).x_()&&n.Ta.length>0}function fy(n){Yn(n).start()}async function ex(n){Yn(n).ra()}async function nx(n){const t=Yn(n);for(const e of n.Ta)t.ea(e.mutations)}async function ix(n,t,e){const i=n.Ta.shift(),s=Uu.from(i,t,e);await hy(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await dc(n)}async function sx(n,t){t&&Yn(n).X_&&await async function(i,s){if(function(o){return W_(o)&&o!==O.ABORTED}(s.code)){const r=i.Ta.shift();Yn(i).B_(),await hy(i,()=>i.remoteSyncer.rejectFailedWrite(r.batchId,s)),await dc(i)}}(n,t),dy(n)&&fy(n)}async function lp(n,t){const e=q(n);e.asyncQueue.verifyOperationInProgress(),z(Oi,"RemoteStore received new credentials");const i=$i(e);e.Ea.add(3),await io(e),i&&e.Ra.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ea.delete(3),await hc(e)}async function rx(n,t){const e=q(n);t?(e.Ea.delete(2),await hc(e)):t||(e.Ea.add(2),await io(e),e.Ra.set("Unknown"))}function ks(n){return n.ma||(n.ma=function(e,i,s){const r=q(e);return r.sa(),new jA(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{Xo:YA.bind(null,n),t_:QA.bind(null,n),r_:XA.bind(null,n),H_:JA.bind(null,n)}),n.da.push(async t=>{t?(n.ma.B_(),Qu(n)?Yu(n):n.Ra.set("Unknown")):(await n.ma.stop(),uy(n))})),n.ma}function Yn(n){return n.fa||(n.fa=function(e,i,s){const r=q(e);return r.sa(),new HA(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:ex.bind(null,n),r_:sx.bind(null,n),ta:nx.bind(null,n),na:ix.bind(null,n)}),n.da.push(async t=>{t?(n.fa.B_(),await dc(n)):(await n.fa.stop(),n.Ta.length>0&&(z(Oi,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(t,e,i,s,r){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=i,this.op=s,this.removalCallback=r,this.deferred=new Be,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,i,s,r){const o=Date.now()+i,a=new Xu(t,e,o,s,r);return a.start(i),a}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new B(O.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ju(n,t){if(un("AsyncQueue",`${t}: ${n}`),Rs(n))return new B(O.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{static emptySet(t){return new as(t.comparator)}constructor(t){this.comparator=t?(e,i)=>t(e,i)||$.comparator(e.key,i.key):(e,i)=>$.comparator(e.key,i.key),this.keyedMap=rr(),this.sortedSet=new wt(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,i)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof as)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),i=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,r=i.getNext().key;if(!s.isEqual(r))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const i=new as;return i.comparator=this.comparator,i.keyedMap=t,i.sortedSet=e,i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(){this.ga=new wt($.comparator)}track(t){const e=t.doc.key,i=this.ga.get(e);i?t.type!==0&&i.type===3?this.ga=this.ga.insert(e,t):t.type===3&&i.type!==1?this.ga=this.ga.insert(e,{type:i.type,doc:t.doc}):t.type===2&&i.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&i.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&i.type===0?this.ga=this.ga.remove(e):t.type===1&&i.type===2?this.ga=this.ga.insert(e,{type:1,doc:i.doc}):t.type===0&&i.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):j(63341,{Rt:t,pa:i}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal((e,i)=>{t.push(i)}),t}}class ys{constructor(t,e,i,s,r,o,a,c,l){this.query=t,this.docs=e,this.oldDocs=i,this.docChanges=s,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=l}static fromInitialDocuments(t,e,i,s,r){const o=[];return e.forEach(a=>{o.push({type:0,doc:a})}),new ys(t,e,as.emptySet(e),o,i,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&rc(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,i=t.docChanges;if(e.length!==i.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==i[s].type||!e[s].doc.isEqual(i[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ox{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(t=>t.Da())}}class ax{constructor(){this.queries=hp(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,i){const s=q(e),r=s.queries;s.queries=hp(),r.forEach((o,a)=>{for(const c of a.Sa)c.onError(i)})})(this,new B(O.ABORTED,"Firestore shutting down"))}}function hp(){return new zi(n=>D_(n),rc)}async function Zu(n,t){const e=q(n);let i=3;const s=t.query;let r=e.queries.get(s);r?!r.ba()&&t.Da()&&(i=2):(r=new ox,i=t.Da()?0:1);try{switch(i){case 0:r.wa=await e.onListen(s,!0);break;case 1:r.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(o){const a=Ju(o,`Initialization of query '${Zi(t.query)}' failed`);return void t.onError(a)}e.queries.set(s,r),r.Sa.push(t),t.va(e.onlineState),r.wa&&t.Fa(r.wa)&&eh(e)}async function th(n,t){const e=q(n),i=t.query;let s=3;const r=e.queries.get(i);if(r){const o=r.Sa.indexOf(t);o>=0&&(r.Sa.splice(o,1),r.Sa.length===0?s=t.Da()?0:1:!r.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(i),e.onUnlisten(i,!0);case 1:return e.queries.delete(i),e.onUnlisten(i,!1);case 2:return e.onLastRemoteStoreUnlisten(i);default:return}}function cx(n,t){const e=q(n);let i=!1;for(const s of t){const r=s.query,o=e.queries.get(r);if(o){for(const a of o.Sa)a.Fa(s)&&(i=!0);o.wa=s}}i&&eh(e)}function lx(n,t,e){const i=q(n),s=i.queries.get(t);if(s)for(const r of s.Sa)r.onError(e);i.queries.delete(t)}function eh(n){n.Ca.forEach(t=>{t.next()})}var Xl,dp;(dp=Xl||(Xl={})).Ma="default",dp.Cache="cache";class nh{constructor(t,e,i){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=i||{}}Fa(t){if(!this.options.includeMetadataChanges){const i=[];for(const s of t.docChanges)s.type!==3&&i.push(s);t=new ys(t.query,t.docs,t.oldDocs,i,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const i=e!=="Offline";return(!this.options.qa||!i)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=ys.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Xl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class py{constructor(t){this.key=t}}class gy{constructor(t){this.key=t}}class ux{constructor(t,e){this.query=t,this.Ya=e,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=et(),this.mutatedKeys=et(),this.eu=M_(t),this.tu=new as(this.eu)}get nu(){return this.Ya}ru(t,e){const i=e?e.iu:new up,s=e?e.tu:this.tu;let r=e?e.mutatedKeys:this.mutatedKeys,o=s,a=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((h,d)=>{const f=s.get(h),m=oc(this.query,d)?d:null,_=!!f&&this.mutatedKeys.has(f.key),b=!!m&&(m.hasLocalMutations||this.mutatedKeys.has(m.key)&&m.hasCommittedMutations);let v=!1;f&&m?f.data.isEqual(m.data)?_!==b&&(i.track({type:3,doc:m}),v=!0):this.su(f,m)||(i.track({type:2,doc:m}),v=!0,(c&&this.eu(m,c)>0||l&&this.eu(m,l)<0)&&(a=!0)):!f&&m?(i.track({type:0,doc:m}),v=!0):f&&!m&&(i.track({type:1,doc:f}),v=!0,(c||l)&&(a=!0)),v&&(m?(o=o.add(m),r=b?r.add(h):r.delete(h)):(o=o.delete(h),r=r.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),r=r.delete(h.key),i.track({type:1,doc:h})}return{tu:o,iu:i,Cs:a,mutatedKeys:r}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,i,s){const r=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const o=t.iu.ya();o.sort((h,d)=>function(m,_){const b=v=>{switch(v){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return j(20277,{Rt:v})}};return b(m)-b(_)}(h.type,d.type)||this.eu(h.doc,d.doc)),this.ou(i),s=s??!1;const a=e&&!s?this._u():[],c=this.Xa.size===0&&this.current&&!s?1:0,l=c!==this.Za;return this.Za=c,o.length!==0||l?{snapshot:new ys(this.query,t.tu,r,o,t.mutatedKeys,c===0,l,!1,!!i&&i.resumeToken.approximateByteSize()>0),au:a}:{au:a}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new up,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(t){return!this.Ya.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach(e=>this.Ya=this.Ya.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ya=this.Ya.delete(e)),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Xa;this.Xa=et(),this.tu.forEach(i=>{this.uu(i.key)&&(this.Xa=this.Xa.add(i.key))});const e=[];return t.forEach(i=>{this.Xa.has(i)||e.push(new gy(i))}),this.Xa.forEach(i=>{t.has(i)||e.push(new py(i))}),e}cu(t){this.Ya=t.Qs,this.Xa=et();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return ys.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const ih="SyncEngine";class hx{constructor(t,e,i){this.query=t,this.targetId=e,this.view=i}}class dx{constructor(t){this.key=t,this.hu=!1}}class fx{constructor(t,e,i,s,r,o){this.localStore=t,this.remoteStore=e,this.eventManager=i,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new zi(a=>D_(a),rc),this.Iu=new Map,this.Eu=new Set,this.du=new wt($.comparator),this.Au=new Map,this.Ru=new $u,this.Vu={},this.mu=new Map,this.fu=_s.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function px(n,t,e=!0){const i=vy(n);let s;const r=i.Tu.get(t);return r?(i.sharedClientState.addLocalQueryTarget(r.targetId),s=r.view.lu()):s=await my(i,t,e,!0),s}async function gx(n,t){const e=vy(n);await my(e,t,!0,!1)}async function my(n,t,e,i){const s=await NA(n.localStore,ze(t)),r=s.targetId,o=n.sharedClientState.addLocalQueryTarget(r,e);let a;return i&&(a=await mx(n,t,r,o==="current",s.resumeToken)),n.isPrimaryClient&&e&&cy(n.remoteStore,s),a}async function mx(n,t,e,i,s){n.pu=(d,f,m)=>async function(b,v,S,R){let D=v.view.ru(S);D.Cs&&(D=await sp(b.localStore,v.query,!1).then(({documents:E})=>v.view.ru(E,D)));const N=R&&R.targetChanges.get(v.targetId),M=R&&R.targetMismatches.get(v.targetId)!=null,L=v.view.applyChanges(D,b.isPrimaryClient,N,M);return pp(b,v.targetId,L.au),L.snapshot}(n,d,f,m);const r=await sp(n.localStore,t,!0),o=new ux(t,r.Qs),a=o.ru(r.documents),c=no.createSynthesizedTargetChangeForCurrentChange(e,i&&n.onlineState!=="Offline",s),l=o.applyChanges(a,n.isPrimaryClient,c);pp(n,e,l.au);const h=new hx(t,e,o);return n.Tu.set(t,h),n.Iu.has(e)?n.Iu.get(e).push(t):n.Iu.set(e,[t]),l.snapshot}async function _x(n,t,e){const i=q(n),s=i.Tu.get(t),r=i.Iu.get(s.targetId);if(r.length>1)return i.Iu.set(s.targetId,r.filter(o=>!rc(o,t))),void i.Tu.delete(t);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await Yl(i.localStore,s.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(s.targetId),e&&Gu(i.remoteStore,s.targetId),Jl(i,s.targetId)}).catch(Ps)):(Jl(i,s.targetId),await Yl(i.localStore,s.targetId,!0))}async function yx(n,t){const e=q(n),i=e.Tu.get(t),s=e.Iu.get(i.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(i.targetId),Gu(e.remoteStore,i.targetId))}async function bx(n,t,e){const i=xx(n);try{const s=await function(o,a){const c=q(o),l=gt.now(),h=a.reduce((m,_)=>m.add(_.key),et());let d,f;return c.persistence.runTransaction("Locally write mutations","readwrite",m=>{let _=hn(),b=et();return c.Ns.getEntries(m,h).next(v=>{_=v,_.forEach((S,R)=>{R.isValidDocument()||(b=b.add(S))})}).next(()=>c.localDocuments.getOverlayedDocuments(m,_)).next(v=>{d=v;const S=[];for(const R of a){const D=VI(R,d.get(R.key).overlayedDocument);D!=null&&S.push(new ci(R.key,D,I_(D.value.mapValue),kt.exists(!0)))}return c.mutationQueue.addMutationBatch(m,l,S,a)}).next(v=>{f=v;const S=v.applyToLocalDocumentSet(d,b);return c.documentOverlayCache.saveOverlays(m,v.batchId,S)})}).then(()=>({batchId:f.batchId,changes:N_(d)}))}(i.localStore,t);i.sharedClientState.addPendingMutation(s.batchId),function(o,a,c){let l=o.Vu[o.currentUser.toKey()];l||(l=new wt(tt)),l=l.insert(a,c),o.Vu[o.currentUser.toKey()]=l}(i,s.batchId,e),await so(i,s.changes),await dc(i.remoteStore)}catch(s){const r=Ju(s,"Failed to persist write");e.reject(r)}}async function _y(n,t){const e=q(n);try{const i=await DA(e.localStore,t);t.targetChanges.forEach((s,r)=>{const o=e.Au.get(r);o&&(st(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?st(o.hu,14607):s.removedDocuments.size>0&&(st(o.hu,42227),o.hu=!1))}),await so(e,i,t)}catch(i){await Ps(i)}}function fp(n,t,e){const i=q(n);if(i.isPrimaryClient&&e===0||!i.isPrimaryClient&&e===1){const s=[];i.Tu.forEach((r,o)=>{const a=o.view.va(t);a.snapshot&&s.push(a.snapshot)}),function(o,a){const c=q(o);c.onlineState=a;let l=!1;c.queries.forEach((h,d)=>{for(const f of d.Sa)f.va(a)&&(l=!0)}),l&&eh(c)}(i.eventManager,t),s.length&&i.Pu.H_(s),i.onlineState=t,i.isPrimaryClient&&i.sharedClientState.setOnlineState(t)}}async function wx(n,t,e){const i=q(n);i.sharedClientState.updateQueryState(t,"rejected",e);const s=i.Au.get(t),r=s&&s.key;if(r){let o=new wt($.comparator);o=o.insert(r,Vt.newNoDocument(r,H.min()));const a=et().add(r),c=new lc(H.min(),new Map,new wt(tt),o,a);await _y(i,c),i.du=i.du.remove(r),i.Au.delete(t),sh(i)}else await Yl(i.localStore,t,!1).then(()=>Jl(i,t,e)).catch(Ps)}async function vx(n,t){const e=q(n),i=t.batch.batchId;try{const s=await kA(e.localStore,t);by(e,i,null),yy(e,i),e.sharedClientState.updateMutationState(i,"acknowledged"),await so(e,s)}catch(s){await Ps(s)}}async function Tx(n,t,e){const i=q(n);try{const s=await function(o,a){const c=q(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let h;return c.mutationQueue.lookupMutationBatch(l,a).next(d=>(st(d!==null,37113),h=d.keys(),c.mutationQueue.removeMutationBatch(l,d))).next(()=>c.mutationQueue.performConsistencyCheck(l)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(l,h,a)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,h)).next(()=>c.localDocuments.getDocuments(l,h))})}(i.localStore,t);by(i,t,e),yy(i,t),i.sharedClientState.updateMutationState(t,"rejected",e),await so(i,s)}catch(s){await Ps(s)}}function yy(n,t){(n.mu.get(t)||[]).forEach(e=>{e.resolve()}),n.mu.delete(t)}function by(n,t,e){const i=q(n);let s=i.Vu[i.currentUser.toKey()];if(s){const r=s.get(t);r&&(e?r.reject(e):r.resolve(),s=s.remove(t)),i.Vu[i.currentUser.toKey()]=s}}function Jl(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const i of n.Iu.get(t))n.Tu.delete(i),e&&n.Pu.yu(i,e);n.Iu.delete(t),n.isPrimaryClient&&n.Ru.jr(t).forEach(i=>{n.Ru.containsKey(i)||wy(n,i)})}function wy(n,t){n.Eu.delete(t.path.canonicalString());const e=n.du.get(t);e!==null&&(Gu(n.remoteStore,e),n.du=n.du.remove(t),n.Au.delete(e),sh(n))}function pp(n,t,e){for(const i of e)i instanceof py?(n.Ru.addReference(i.key,t),Ex(n,i)):i instanceof gy?(z(ih,"Document no longer in limbo: "+i.key),n.Ru.removeReference(i.key,t),n.Ru.containsKey(i.key)||wy(n,i.key)):j(19791,{wu:i})}function Ex(n,t){const e=t.key,i=e.path.canonicalString();n.du.get(e)||n.Eu.has(i)||(z(ih,"New document in limbo: "+e),n.Eu.add(i),sh(n))}function sh(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const t=n.Eu.values().next().value;n.Eu.delete(t);const e=new $(lt.fromString(t)),i=n.fu.next();n.Au.set(i,new dx(e)),n.du=n.du.insert(e,i),cy(n.remoteStore,new Cn(ze(sc(e.path)),i,"TargetPurposeLimboResolution",nc.ce))}}async function so(n,t,e){const i=q(n),s=[],r=[],o=[];i.Tu.isEmpty()||(i.Tu.forEach((a,c)=>{o.push(i.pu(c,t,e).then(l=>{var h;if((l||e)&&i.isPrimaryClient){const d=l?!l.fromCache:(h=e==null?void 0:e.targetChanges.get(c.targetId))==null?void 0:h.current;i.sharedClientState.updateQueryState(c.targetId,d?"current":"not-current")}if(l){s.push(l);const d=Hu.As(c.targetId,l);r.push(d)}}))}),await Promise.all(o),i.Pu.H_(s),await async function(c,l){const h=q(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",d=>V.forEach(l,f=>V.forEach(f.Es,m=>h.persistence.referenceDelegate.addReference(d,f.targetId,m)).next(()=>V.forEach(f.ds,m=>h.persistence.referenceDelegate.removeReference(d,f.targetId,m)))))}catch(d){if(!Rs(d))throw d;z(Wu,"Failed to update sequence numbers: "+d)}for(const d of l){const f=d.targetId;if(!d.fromCache){const m=h.Ms.get(f),_=m.snapshotVersion,b=m.withLastLimboFreeSnapshotVersion(_);h.Ms=h.Ms.insert(f,b)}}}(i.localStore,r))}async function Ix(n,t){const e=q(n);if(!e.currentUser.isEqual(t)){z(ih,"User change. New user:",t.toKey());const i=await ry(e.localStore,t);e.currentUser=t,function(r,o){r.mu.forEach(a=>{a.forEach(c=>{c.reject(new B(O.CANCELLED,o))})}),r.mu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,i.removedBatchIds,i.addedBatchIds),await so(e,i.Ls)}}function Ax(n,t){const e=q(n),i=e.Au.get(t);if(i&&i.hu)return et().add(i.key);{let s=et();const r=e.Iu.get(t);if(!r)return s;for(const o of r){const a=e.Tu.get(o);s=s.unionWith(a.view.nu)}return s}}function vy(n){const t=q(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=_y.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ax.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=wx.bind(null,t),t.Pu.H_=cx.bind(null,t.eventManager),t.Pu.yu=lx.bind(null,t.eventManager),t}function xx(n){const t=q(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=vx.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Tx.bind(null,t),t}class Ca{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=uc(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return CA(this.persistence,new SA,t.initialUser,this.serializer)}Cu(t){return new sy(ju.mi,this.serializer)}Du(t){return new LA}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ca.provider={build:()=>new Ca};class Sx extends Ca{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){st(this.persistence.referenceDelegate instanceof Pa,46915);const i=this.persistence.referenceDelegate.garbageCollector;return new dA(i,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?ne.withCacheSize(this.cacheSizeBytes):ne.DEFAULT;return new sy(i=>Pa.mi(i,e),this.serializer)}}class Zl{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>fp(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=Ix.bind(null,this.syncEngine),await rx(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new ax}()}createDatastore(t){const e=uc(t.databaseInfo.databaseId),i=function(r){return new $A(r)}(t.databaseInfo);return function(r,o,a,c){return new qA(r,o,a,c)}(t.authCredentials,t.appCheckCredentials,i,e)}createRemoteStore(t){return function(i,s,r,o,a){return new KA(i,s,r,o,a)}(this.localStore,this.datastore,t.asyncQueue,e=>fp(this.syncEngine,e,0),function(){return ap.v()?new ap:new FA}())}createSyncEngine(t,e){return function(s,r,o,a,c,l,h){const d=new fx(s,r,o,a,c,l);return h&&(d.gu=!0),d}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const r=q(s);z(Oi,"RemoteStore shutting down."),r.Ea.add(5),await io(r),r.Aa.shutdown(),r.Ra.set("Unknown")}(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}Zl.provider={build:()=>new Zl};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):un("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Px{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new B(O.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const e=await async function(s,r){const o=q(s),a={documents:r.map(d=>Sa(o.serializer,d))},c=await o.Ho("BatchGetDocuments",o.serializer.databaseId,lt.emptyPath(),a,r.length),l=new Map;c.forEach(d=>{const f=YI(o.serializer,d);l.set(f.key.toString(),f)});const h=[];return r.forEach(d=>{const f=l.get(d.toString());st(!!f,55234,{key:d}),h.push(f)}),h}(this.datastore,t);return e.forEach(i=>this.recordVersion(i)),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(i){this.lastTransactionError=i}this.writtenDocs.add(t.toString())}delete(t){this.write(new eo(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const t=this.readVersions;this.mutations.forEach(e=>{t.delete(e.key.toString())}),t.forEach((e,i)=>{const s=$.fromPath(i);this.mutations.push(new H_(s,this.precondition(s)))}),await async function(i,s){const r=q(i),o={writes:s.map(a=>Z_(r.serializer,a))};await r.Go("Commit",r.serializer.databaseId,lt.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw j(50498,{Gu:t.constructor.name});e=H.min()}const i=this.readVersions.get(t.key.toString());if(i){if(!e.isEqual(i))throw new B(O.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(H.min())?kt.exists(!1):kt.updateTime(e):kt.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(H.min()))throw new B(O.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return kt.updateTime(e)}return kt.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rx{constructor(t,e,i,s,r){this.asyncQueue=t,this.datastore=e,this.options=i,this.updateFunction=s,this.deferred=r,this.zu=i.maxAttempts,this.M_=new qu(this.asyncQueue,"transaction_retry")}ju(){this.zu-=1,this.Ju()}Ju(){this.M_.p_(async()=>{const t=new Px(this.datastore),e=this.Hu(t);e&&e.then(i=>{this.asyncQueue.enqueueAndForget(()=>t.commit().then(()=>{this.deferred.resolve(i)}).catch(s=>{this.Yu(s)}))}).catch(i=>{this.Yu(i)})})}Hu(t){try{const e=this.updateFunction(t);return!Zr(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}Yu(t){this.zu>0&&this.Zu(t)?(this.zu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ju(),Promise.resolve()))):this.deferred.reject(t)}Zu(t){if((t==null?void 0:t.name)==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!W_(e)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn="FirestoreClient";class Cx{constructor(t,e,i,s,r){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=i,this.databaseInfo=s,this.user=qt.UNAUTHENTICATED,this.clientId=Du.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(i,async o=>{z(Qn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(i,o=>(z(Qn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Be;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const i=Ju(e,"Failed to shutdown persistence");t.reject(i)}}),t.promise}}async function hl(n,t){n.asyncQueue.verifyOperationInProgress(),z(Qn,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let i=e.initialUser;n.setCredentialChangeListener(async s=>{i.isEqual(s)||(await ry(t.localStore,s),i=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function gp(n,t){n.asyncQueue.verifyOperationInProgress();const e=await kx(n);z(Qn,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(i=>lp(t.remoteStore,i)),n.setAppCheckTokenChangeListener((i,s)=>lp(t.remoteStore,s)),n._onlineComponents=t}async function kx(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){z(Qn,"Using user provided OfflineComponentProvider");try{await hl(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===O.FAILED_PRECONDITION||s.code===O.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;fs("Error using user provided cache. Falling back to memory cache: "+e),await hl(n,new Ca)}}else z(Qn,"Using default OfflineComponentProvider"),await hl(n,new Sx(void 0));return n._offlineComponents}async function oh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(z(Qn,"Using user provided OnlineComponentProvider"),await gp(n,n._uninitializedComponentsProvider._online)):(z(Qn,"Using default OnlineComponentProvider"),await gp(n,new Zl))),n._onlineComponents}function Dx(n){return oh(n).then(t=>t.syncEngine)}function Mx(n){return oh(n).then(t=>t.datastore)}async function ka(n){const t=await oh(n),e=t.eventManager;return e.onListen=px.bind(null,t.syncEngine),e.onUnlisten=_x.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=gx.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=yx.bind(null,t.syncEngine),e}function Ox(n,t,e={}){const i=new Be;return n.asyncQueue.enqueueAndForget(async()=>function(r,o,a,c,l){const h=new rh({next:f=>{h.Nu(),o.enqueueAndForget(()=>th(r,d));const m=f.docs.has(a);!m&&f.fromCache?l.reject(new B(O.UNAVAILABLE,"Failed to get document because the client is offline.")):m&&f.fromCache&&c&&c.source==="server"?l.reject(new B(O.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(f)},error:f=>l.reject(f)}),d=new nh(sc(a.path),h,{includeMetadataChanges:!0,qa:!0});return Zu(r,d)}(await ka(n),n.asyncQueue,t,e,i)),i.promise}function Nx(n,t,e={}){const i=new Be;return n.asyncQueue.enqueueAndForget(async()=>function(r,o,a,c,l){const h=new rh({next:f=>{h.Nu(),o.enqueueAndForget(()=>th(r,d)),f.fromCache&&c.source==="server"?l.reject(new B(O.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(f)},error:f=>l.reject(f)}),d=new nh(a,h,{includeMetadataChanges:!0,qa:!0});return Zu(r,d)}(await ka(n),n.asyncQueue,t,e,i)),i.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ty(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mp=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey="firestore.googleapis.com",_p=!0;class yp{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new B(O.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Ey,this.ssl=_p}else this.host=t.host,this.ssl=t.ssl??_p;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=iy;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<uA)throw new B(O.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}YE("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ty(t.experimentalLongPollingOptions??{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new B(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new B(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new B(O.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class fc{constructor(t,e,i,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new yp({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new B(O.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new B(O.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new yp(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new UE;switch(i.type){case"firstParty":return new jE(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new B(O.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const i=mp.get(e);i&&(z("ComponentProvider","Removing Datastore"),mp.delete(e),i.terminate())}(this),Promise.resolve()}}function Vx(n,t,e,i={}){var l;n=ae(n,fc);const s=ii(t),r=n._getSettings(),o={...r,emulatorOptions:n._getEmulatorOptions()},a=`${t}:${e}`;s&&(wu(`https://${a}`),vu("Firestore",!0)),r.host!==Ey&&r.host!==a&&fs("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...r,host:a,ssl:s,emulatorOptions:i};if(!Hn(c,o)&&(n._setSettings(c),i.mockUserToken)){let h,d;if(typeof i.mockUserToken=="string")h=i.mockUserToken,d=qt.MOCK_USER;else{h=Jw(i.mockUserToken,(l=n._app)==null?void 0:l.options.projectId);const f=i.mockUserToken.sub||i.mockUserToken.user_id;if(!f)throw new B(O.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new qt(f)}n._authCredentials=new BE(new d_(h,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(t,e,i){this.converter=e,this._query=i,this.type="query",this.firestore=t}withConverter(t){return new fn(this.firestore,t,this._query)}}class Tt{constructor(t,e,i){this.converter=e,this._key=i,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new zn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Tt(this.firestore,t,this._key)}toJSON(){return{type:Tt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,i){if(Jr(e,Tt._jsonSchema))return new Tt(t,i||null,new $(lt.fromString(e.referencePath)))}}Tt._jsonSchemaVersion="firestore/documentReference/1.0",Tt._jsonSchema={type:Rt("string",Tt._jsonSchemaVersion),referencePath:Rt("string")};class zn extends fn{constructor(t,e,i){super(t,e,sc(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Tt(this.firestore,null,new $(t))}withConverter(t){return new zn(this.firestore,t,this._path)}}function Ds(n,t,...e){if(n=ht(n),f_("collection","path",t),n instanceof fc){const i=lt.fromString(t,...e);return kf(i),new zn(n,null,i)}{if(!(n instanceof Tt||n instanceof zn))throw new B(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(lt.fromString(t,...e));return kf(i),new zn(n.firestore,null,i)}}function ah(n,t,...e){if(n=ht(n),arguments.length===1&&(t=Du.newId()),f_("doc","path",t),n instanceof fc){const i=lt.fromString(t,...e);return Cf(i),new Tt(n,null,new $(i))}{if(!(n instanceof Tt||n instanceof zn))throw new B(O.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(lt.fromString(t,...e));return Cf(i),new Tt(n.firestore,n instanceof zn?n.converter:null,new $(i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bp="AsyncQueue";class wp{constructor(t=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new qu(this,"async_queue_retry"),this._c=()=>{const i=ul();i&&z(bp,"Visibility state changed to "+i.visibilityState),this.M_.w_()},this.ac=t;const e=ul();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=ul();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise(()=>{});const e=new Be;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Xu.push(t),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(t){if(!Rs(t))throw t;z(bp,"Operation failed with retryable error: "+t)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(t){const e=this.ac.then(()=>(this.rc=!0,t().catch(i=>{throw this.nc=i,this.rc=!1,un("INTERNAL UNHANDLED ERROR: ",vp(i)),i}).then(i=>(this.rc=!1,i))));return this.ac=e,e}enqueueAfterDelay(t,e,i){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=Xu.createAndSchedule(this,t,e,i,r=>this.hc(r));return this.tc.push(s),s}uc(){this.nc&&j(47125,{Pc:vp(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ic(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ec(t){return this.Tc().then(()=>{this.tc.sort((e,i)=>e.targetTimeMs-i.targetTimeMs);for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()})}dc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function vp(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tp(n){return function(e,i){if(typeof e!="object"||e===null)return!1;const s=e;for(const r of i)if(r in s&&typeof s[r]=="function")return!0;return!1}(n,["next","error","complete"])}class qe extends fc{constructor(t,e,i,s){super(t,e,i,s),this.type="firestore",this._queue=new wp,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new wp(t),this._firestoreClient=void 0,await t}}}function Lx(n,t){const e=typeof n=="object"?n:Xa(),i=typeof n=="string"?n:va,s=si(e,"firestore").getImmediate({identifier:i});if(!s._initialized){const r=dm("firestore");r&&Vx(s,...r)}return s}function Ms(n){if(n._terminated)throw new B(O.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Fx(n),n._firestoreClient}function Fx(n){var i,s,r;const t=n._freezeSettings(),e=function(a,c,l,h){return new oI(a,c,l,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,Ty(h.experimentalLongPollingOptions),h.useFetchStreams,h.isUsingEmulator)}(n._databaseId,((i=n._app)==null?void 0:i.options.appId)||"",n._persistenceKey,t);n._componentsProvider||(s=t.localCache)!=null&&s._offlineComponentProvider&&((r=t.localCache)!=null&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new Cx(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&function(a){const c=a==null?void 0:a._online.build();return{_offline:a==null?void 0:a._offline.build(c),_online:c}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(t){this._byteString=t}static fromBase64String(t){try{return new he(zt.fromBase64String(t))}catch(e){throw new B(O.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new he(zt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:he._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Jr(t,he._jsonSchema))return he.fromBase64String(t.bytes)}}he._jsonSchemaVersion="firestore/bytes/1.0",he._jsonSchema={type:Rt("string",he._jsonSchemaVersion),bytes:Rt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new B(O.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Bt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new B(O.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new B(O.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return tt(this._lat,t._lat)||tt(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:$e._jsonSchemaVersion}}static fromJSON(t){if(Jr(t,$e._jsonSchema))return new $e(t.latitude,t.longitude)}}$e._jsonSchemaVersion="firestore/geoPoint/1.0",$e._jsonSchema={type:Rt("string",$e._jsonSchemaVersion),latitude:Rt("number"),longitude:Rt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(i,s){if(i.length!==s.length)return!1;for(let r=0;r<i.length;++r)if(i[r]!==s[r])return!1;return!0}(this._values,t._values)}toJSON(){return{type:je._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Jr(t,je._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new je(t.vectorValues);throw new B(O.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}je._jsonSchemaVersion="firestore/vectorValue/1.0",je._jsonSchema={type:Rt("string",je._jsonSchemaVersion),vectorValues:Rt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ux=/^__.*__$/;class Bx{constructor(t,e,i){this.data=t,this.fieldMask=e,this.fieldTransforms=i}toMutation(t,e){return this.fieldMask!==null?new ci(t,this.data,this.fieldMask,e,this.fieldTransforms):new to(t,this.data,e,this.fieldTransforms)}}class Iy{constructor(t,e,i){this.data=t,this.fieldMask=e,this.fieldTransforms=i}toMutation(t,e){return new ci(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Ay(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw j(40011,{Ac:n})}}class ch{constructor(t,e,i,s,r,o){this.settings=t,this.databaseId=e,this.serializer=i,this.ignoreUndefinedProperties=s,r===void 0&&this.Rc(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(t){return new ch({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),i=this.Vc({path:e,fc:!1});return i.gc(t),i}yc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),i=this.Vc({path:e,fc:!1});return i.Rc(),i}wc(t){return this.Vc({path:void 0,fc:!0})}Sc(t){return Da(t,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Rc(){if(this.path)for(let t=0;t<this.path.length;t++)this.gc(this.path.get(t))}gc(t){if(t.length===0)throw this.Sc("Document fields must not be empty");if(Ay(this.Ac)&&Ux.test(t))throw this.Sc('Document fields cannot begin and end with "__"')}}class zx{constructor(t,e,i){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=i||uc(t)}Cc(t,e,i,s=!1){return new ch({Ac:t,methodName:e,Dc:i,path:Bt.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function oo(n){const t=n._freezeSettings(),e=uc(n._databaseId);return new zx(n._databaseId,!!t.ignoreUndefinedProperties,e)}function gc(n,t,e,i,s,r={}){const o=n.Cc(r.merge||r.mergeFields?2:0,t,e,s);uh("Data must be an object, but it was:",o,i);const a=Py(i,o);let c,l;if(r.merge)c=new de(o.fieldMask),l=o.fieldTransforms;else if(r.mergeFields){const h=[];for(const d of r.mergeFields){const f=tu(t,d,e);if(!o.contains(f))throw new B(O.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);Cy(h,f)||h.push(f)}c=new de(h),l=o.fieldTransforms.filter(d=>c.covers(d.field))}else c=null,l=o.fieldTransforms;return new Bx(new Zt(a),c,l)}class mc extends pc{_toFieldTransform(t){if(t.Ac!==2)throw t.Ac===1?t.Sc(`${this._methodName}() can only appear at the top level of your update data`):t.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof mc}}class lh extends pc{_toFieldTransform(t){return new DI(t.path,new Nr)}isEqual(t){return t instanceof lh}}function xy(n,t,e,i){const s=n.Cc(1,t,e);uh("Data must be an object, but it was:",s,i);const r=[],o=Zt.empty();ai(i,(c,l)=>{const h=hh(t,c,e);l=ht(l);const d=s.yc(h);if(l instanceof mc)r.push(h);else{const f=ao(l,d);f!=null&&(r.push(h),o.set(h,f))}});const a=new de(r);return new Iy(o,a,s.fieldTransforms)}function Sy(n,t,e,i,s,r){const o=n.Cc(1,t,e),a=[tu(t,i,e)],c=[s];if(r.length%2!=0)throw new B(O.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let f=0;f<r.length;f+=2)a.push(tu(t,r[f])),c.push(r[f+1]);const l=[],h=Zt.empty();for(let f=a.length-1;f>=0;--f)if(!Cy(l,a[f])){const m=a[f];let _=c[f];_=ht(_);const b=o.yc(m);if(_ instanceof mc)l.push(m);else{const v=ao(_,b);v!=null&&(l.push(m),h.set(m,v))}}const d=new de(l);return new Iy(h,d,o.fieldTransforms)}function $x(n,t,e,i=!1){return ao(e,n.Cc(i?4:3,t))}function ao(n,t){if(Ry(n=ht(n)))return uh("Unsupported field value:",t,n),Py(n,t);if(n instanceof pc)return function(i,s){if(!Ay(s.Ac))throw s.Sc(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${i._methodName}() is not currently supported inside arrays`);const r=i._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.fc&&t.Ac!==4)throw t.Sc("Nested arrays are not supported");return function(i,s){const r=[];let o=0;for(const a of i){let c=ao(a,s.wc(o));c==null&&(c={nullValue:"NULL_VALUE"}),r.push(c),o++}return{arrayValue:{values:r}}}(n,t)}return function(i,s){if((i=ht(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return RI(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const r=gt.fromDate(i);return{timestampValue:xa(s.serializer,r)}}if(i instanceof gt){const r=new gt(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:xa(s.serializer,r)}}if(i instanceof $e)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof he)return{bytesValue:Y_(s.serializer,i._byteString)};if(i instanceof Tt){const r=s.databaseId,o=i.firestore._databaseId;if(!o.isEqual(r))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:zu(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof je)return function(o,a){return{mapValue:{fields:{[T_]:{stringValue:E_},[Ta]:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw a.Sc("VectorValues must only contain numeric values.");return Fu(a.serializer,l)})}}}}}}(i,s);throw s.Sc(`Unsupported field value: ${ec(i)}`)}(n,t)}function Py(n,t){const e={};return m_(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):ai(n,(i,s)=>{const r=ao(s,t.mc(i));r!=null&&(e[i]=r)}),{mapValue:{fields:e}}}function Ry(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof gt||n instanceof $e||n instanceof he||n instanceof Tt||n instanceof pc||n instanceof je)}function uh(n,t,e){if(!Ry(e)||!p_(e)){const i=ec(e);throw i==="an object"?t.Sc(n+" a custom object"):t.Sc(n+" "+i)}}function tu(n,t,e){if((t=ht(t))instanceof ro)return t._internalPath;if(typeof t=="string")return hh(n,t);throw Da("Field path arguments must be of type string or ",n,!1,void 0,e)}const jx=new RegExp("[~\\*/\\[\\]]");function hh(n,t,e){if(t.search(jx)>=0)throw Da(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new ro(...t.split("."))._internalPath}catch{throw Da(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Da(n,t,e,i,s){const r=i&&!i.isEmpty(),o=s!==void 0;let a=`Function ${t}() called with invalid data`;e&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(r||o)&&(c+=" (found",r&&(c+=` in field ${i}`),o&&(c+=` in document ${s}`),c+=")"),new B(O.INVALID_ARGUMENT,a+n+c)}function Cy(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(t,e,i,s,r){this._firestore=t,this._userDataWriter=e,this._key=i,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Tt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new Hx(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(dh("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class Hx extends Ma{data(){return super.data()}}function dh(n,t){return typeof t=="string"?hh(n,t):t instanceof ro?t._internalPath:t._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ky(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new B(O.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class fh{}class ph extends fh{}function gh(n,t,...e){let i=[];t instanceof fh&&i.push(t),i=i.concat(e),function(r){const o=r.filter(c=>c instanceof _h).length,a=r.filter(c=>c instanceof mh).length;if(o>1||o>0&&a>0)throw new B(O.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(i);for(const s of i)n=s._apply(n);return n}class mh extends ph{constructor(t,e,i){super(),this._field=t,this._op=e,this._value=i,this.type="where"}static _create(t,e,i){return new mh(t,e,i)}_apply(t){const e=this._parse(t);return Dy(t._query,e),new fn(t.firestore,t.converter,Wl(t._query,e))}_parse(t){const e=oo(t.firestore);return function(r,o,a,c,l,h,d){let f;if(l.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new B(O.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){Ip(d,h);const _=[];for(const b of d)_.push(Ep(c,r,b));f={arrayValue:{values:_}}}else f=Ep(c,r,d)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||Ip(d,h),f=$x(a,o,d,h==="in"||h==="not-in");return Pt.create(l,h,f)}(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}class _h extends fh{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new _h(t,e)}_parse(t){const e=this._queryConstraints.map(i=>i._parse(t)).filter(i=>i.getFilters().length>0);return e.length===1?e[0]:Pe.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:(function(s,r){let o=s;const a=r.getFlattenedFilters();for(const c of a)Dy(o,c),o=Wl(o,c)}(t._query,e),new fn(t.firestore,t.converter,Wl(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class yh extends ph{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new yh(t,e)}_apply(t){const e=function(s,r,o){if(s.startAt!==null)throw new B(O.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new B(O.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Or(r,o)}(t._query,this._field,this._direction);return new fn(t.firestore,t.converter,function(s,r){const o=s.explicitOrderBy.concat([r]);return new Cs(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(t._query,e))}}function bh(n,t="asc"){const e=t,i=dh("orderBy",n);return yh._create(i,e)}class wh extends ph{constructor(t,e,i){super(),this.type=t,this._limit=e,this._limitType=i}static _create(t,e,i){return new wh(t,e,i)}_apply(t){return new fn(t.firestore,t.converter,Ia(t._query,this._limit,this._limitType))}}function Wx(n){return wh._create("limit",n,"F")}function Ep(n,t,e){if(typeof(e=ht(e))=="string"){if(e==="")throw new B(O.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!k_(t)&&e.indexOf("/")!==-1)throw new B(O.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const i=t.path.child(lt.fromString(e));if(!$.isDocumentKey(i))throw new B(O.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return Uf(n,new $(i))}if(e instanceof Tt)return Uf(n,e._key);throw new B(O.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ec(e)}.`)}function Ip(n,t){if(!Array.isArray(n)||n.length===0)throw new B(O.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function Dy(n,t){const e=function(s,r){for(const o of s)for(const a of o.getFlattenedFilters())if(r.indexOf(a.op)>=0)return a.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(t.op));if(e!==null)throw e===t.op?new B(O.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new B(O.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}class My{convertValue(t,e="none"){switch(Kn(t)){case 0:return null;case 1:return t.booleanValue;case 2:return At(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Gn(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw j(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const i={};return ai(t,(s,r)=>{i[s]=this.convertValue(r,e)}),i}convertVectorValue(t){var i,s,r;const e=(r=(s=(i=t.fields)==null?void 0:i[Ta].arrayValue)==null?void 0:s.values)==null?void 0:r.map(o=>At(o.doubleValue));return new je(e)}convertGeoPoint(t){return new $e(At(t.latitude),At(t.longitude))}convertArray(t,e){return(t.values||[]).map(i=>this.convertValue(i,e))}convertServerTimestamp(t,e){switch(e){case"previous":const i=ic(t);return i==null?null:this.convertValue(i,e);case"estimate":return this.convertTimestamp(kr(t));default:return null}}convertTimestamp(t){const e=qn(t);return new gt(e.seconds,e.nanos)}convertDocumentKey(t,e){const i=lt.fromString(t);st(ny(i),9688,{name:t});const s=new Dr(i.get(1),i.get(3)),r=new $(i.popFirst(5));return s.isEqual(e)||un(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _c(n,t,e){let i;return i=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,i}class qx extends My{constructor(t){super(),this.firestore=t}convertBytes(t){return new he(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Tt(this.firestore,null,e)}}class is{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class $n extends Ma{constructor(t,e,i,s,r,o){super(t,e,i,s,o),this._firestore=t,this._firestoreImpl=t,this.metadata=r}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new ea(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const i=this._document.data.field(dh("DocumentSnapshot.get",t));if(i!==null)return this._userDataWriter.convertValue(i,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new B(O.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=$n._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}$n._jsonSchemaVersion="firestore/documentSnapshot/1.0",$n._jsonSchema={type:Rt("string",$n._jsonSchemaVersion),bundleSource:Rt("string","DocumentSnapshot"),bundleName:Rt("string"),bundle:Rt("string")};class ea extends $n{data(t={}){return super.data(t)}}class Pi{constructor(t,e,i,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new is(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(i=>{t.call(e,new ea(this._firestore,this._userDataWriter,i.key,i,new is(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new B(O.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,r){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(a=>{const c=new ea(s._firestore,s._userDataWriter,a.doc.key,a.doc,new is(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(a=>r||a.type!==3).map(a=>{const c=new ea(s._firestore,s._userDataWriter,a.doc.key,a.doc,new is(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,h=-1;return a.type!==0&&(l=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:Gx(a.type),doc:c,oldIndex:l,newIndex:h}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new B(O.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Pi._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=Du.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],i=[],s=[];return this.docs.forEach(r=>{r._document!==null&&(e.push(r._document),i.push(this._userDataWriter.convertObjectMap(r._document.data.value.mapValue.fields,"previous")),s.push(r.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function Gx(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return j(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oy(n){n=ae(n,Tt);const t=ae(n.firestore,qe);return Ox(Ms(t),n._key).then(e=>Ny(t,n,e))}Pi._jsonSchemaVersion="firestore/querySnapshot/1.0",Pi._jsonSchema={type:Rt("string",Pi._jsonSchemaVersion),bundleSource:Rt("string","QuerySnapshot"),bundleName:Rt("string"),bundle:Rt("string")};class yc extends My{constructor(t){super(),this.firestore=t}convertBytes(t){return new he(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new Tt(this.firestore,null,e)}}function Re(n){n=ae(n,fn);const t=ae(n.firestore,qe),e=Ms(t),i=new yc(t);return ky(n._query),Nx(e,n._query).then(s=>new Pi(t,i,n,s))}function Kx(n,t,e){n=ae(n,Tt);const i=ae(n.firestore,qe),s=_c(n.converter,t,e);return bc(i,[gc(oo(i),"setDoc",n._key,s,n.converter!==null,e).toMutation(n._key,kt.none())])}function Yx(n){return bc(ae(n.firestore,qe),[new eo(n._key,kt.none())])}function Qx(n,t){const e=ae(n.firestore,qe),i=ah(n),s=_c(n.converter,t);return bc(e,[gc(oo(n.firestore),"addDoc",i._key,s,n.converter!==null,{}).toMutation(i._key,kt.exists(!1))]).then(()=>i)}function Xx(n,...t){var c,l,h;n=ht(n);let e={includeMetadataChanges:!1,source:"default"},i=0;typeof t[i]!="object"||Tp(t[i])||(e=t[i++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(Tp(t[i])){const d=t[i];t[i]=(c=d.next)==null?void 0:c.bind(d),t[i+1]=(l=d.error)==null?void 0:l.bind(d),t[i+2]=(h=d.complete)==null?void 0:h.bind(d)}let r,o,a;if(n instanceof Tt)o=ae(n.firestore,qe),a=sc(n._key.path),r={next:d=>{t[i]&&t[i](Ny(o,n,d))},error:t[i+1],complete:t[i+2]};else{const d=ae(n,fn);o=ae(d.firestore,qe),a=d._query;const f=new yc(o);r={next:m=>{t[i]&&t[i](new Pi(o,f,d,m))},error:t[i+1],complete:t[i+2]},ky(n._query)}return function(f,m,_,b){const v=new rh(b),S=new nh(m,v,_);return f.asyncQueue.enqueueAndForget(async()=>Zu(await ka(f),S)),()=>{v.Nu(),f.asyncQueue.enqueueAndForget(async()=>th(await ka(f),S))}}(Ms(o),a,s,r)}function bc(n,t){return function(i,s){const r=new Be;return i.asyncQueue.enqueueAndForget(async()=>bx(await Dx(i),s,r)),r.promise}(Ms(n),t)}function Ny(n,t,e){const i=e.docs.get(t._key),s=new yc(n);return new $n(n,s,t._key,i,new is(e.hasPendingWrites,e.fromCache),t.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jx={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zx{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=oo(t)}set(t,e,i){this._verifyNotCommitted();const s=kn(t,this._firestore),r=_c(s.converter,e,i),o=gc(this._dataReader,"WriteBatch.set",s._key,r,s.converter!==null,i);return this._mutations.push(o.toMutation(s._key,kt.none())),this}update(t,e,i,...s){this._verifyNotCommitted();const r=kn(t,this._firestore);let o;return o=typeof(e=ht(e))=="string"||e instanceof ro?Sy(this._dataReader,"WriteBatch.update",r._key,e,i,s):xy(this._dataReader,"WriteBatch.update",r._key,e),this._mutations.push(o.toMutation(r._key,kt.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=kn(t,this._firestore);return this._mutations=this._mutations.concat(new eo(e._key,kt.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new B(O.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function kn(n,t){if((n=ht(n)).firestore!==t)throw new B(O.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(t,e){this._firestore=t,this._transaction=e,this._dataReader=oo(t)}get(t){const e=kn(t,this._firestore),i=new qx(this._firestore);return this._transaction.lookup([e._key]).then(s=>{if(!s||s.length!==1)return j(24041);const r=s[0];if(r.isFoundDocument())return new Ma(this._firestore,i,r.key,r,e.converter);if(r.isNoDocument())return new Ma(this._firestore,i,e._key,null,e.converter);throw j(18433,{doc:r})})}set(t,e,i){const s=kn(t,this._firestore),r=_c(s.converter,e,i),o=gc(this._dataReader,"Transaction.set",s._key,r,s.converter!==null,i);return this._transaction.set(s._key,o),this}update(t,e,i,...s){const r=kn(t,this._firestore);let o;return o=typeof(e=ht(e))=="string"||e instanceof ro?Sy(this._dataReader,"Transaction.update",r._key,e,i,s):xy(this._dataReader,"Transaction.update",r._key,e),this._transaction.update(r._key,o),this}delete(t){const e=kn(t,this._firestore);return this._transaction.delete(e._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eS extends tS{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=kn(t,this._firestore),i=new yc(this._firestore);return super.get(t).then(s=>new $n(this._firestore,i,e._key,s._document,new is(!1,!1),e.converter))}}function co(n,t,e){n=ae(n,qe);const i={...Jx,...e};return function(r){if(r.maxAttempts<1)throw new B(O.INVALID_ARGUMENT,"Max attempts must be at least 1")}(i),function(r,o,a){const c=new Be;return r.asyncQueue.enqueueAndForget(async()=>{const l=await Mx(r);new Rx(r.asyncQueue,l,a,o,c).ju()}),c.promise}(Ms(n),s=>t(new eS(n,s)),i)}function Ie(){return new lh("serverTimestamp")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lo(n){return Ms(n=ae(n,qe)),new Zx(n,t=>bc(n,t))}(function(t,e=!0){(function(s){Ss=s})(As),xe(new ye("firestore",(i,{instanceIdentifier:s,options:r})=>{const o=i.getProvider("app").getImmediate(),a=new qe(new zE(i.getProvider("auth-internal")),new HE(o,i.getProvider("app-check-internal")),function(l,h){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new B(O.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Dr(l.options.projectId,h)}(o,s),o);return r={useFetchStreams:e,...r},a._setSettings(r),a},"PUBLIC").setMultipleInstances(!0)),oe(xf,Sf,t),oe(xf,Sf,"esm2020")})();var nS="firebase",iS="12.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */oe(nS,iS,"app");const Vy="@firebase/installations",vh="0.6.19";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ly=1e4,Fy=`w:${vh}`,Uy="FIS_v2",sS="https://firebaseinstallations.googleapis.com/v1",rS=60*60*1e3,oS="installations",aS="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cS={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Ni=new Ui(oS,aS,cS);function By(n){return n instanceof be&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zy({projectId:n}){return`${sS}/projects/${n}/installations`}function $y(n){return{token:n.token,requestStatus:2,expiresIn:uS(n.expiresIn),creationTime:Date.now()}}async function jy(n,t){const i=(await t.json()).error;return Ni.create("request-failed",{requestName:n,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function Hy({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function lS(n,{refreshToken:t}){const e=Hy(n);return e.append("Authorization",hS(t)),e}async function Wy(n){const t=await n();return t.status>=500&&t.status<600?n():t}function uS(n){return Number(n.replace("s","000"))}function hS(n){return`${Uy} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dS({appConfig:n,heartbeatServiceProvider:t},{fid:e}){const i=zy(n),s=Hy(n),r=t.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:e,authVersion:Uy,appId:n.appId,sdkVersion:Fy},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Wy(()=>fetch(i,a));if(c.ok){const l=await c.json();return{fid:l.fid||e,registrationStatus:2,refreshToken:l.refreshToken,authToken:$y(l.authToken)}}else throw await jy("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qy(n){return new Promise(t=>{setTimeout(t,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fS(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pS=/^[cdef][\w-]{21}$/,eu="";function gS(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const e=mS(n);return pS.test(e)?e:eu}catch{return eu}}function mS(n){return fS(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wc(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gy=new Map;function Ky(n,t){const e=wc(n);Yy(e,t),_S(e,t)}function Yy(n,t){const e=Gy.get(n);if(e)for(const i of e)i(t)}function _S(n,t){const e=yS();e&&e.postMessage({key:n,fid:t}),bS()}let Ai=null;function yS(){return!Ai&&"BroadcastChannel"in self&&(Ai=new BroadcastChannel("[Firebase] FID Change"),Ai.onmessage=n=>{Yy(n.data.key,n.data.fid)}),Ai}function bS(){Gy.size===0&&Ai&&(Ai.close(),Ai=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wS="firebase-installations-database",vS=1,Vi="firebase-installations-store";let dl=null;function Th(){return dl||(dl=wm(wS,vS,{upgrade:(n,t)=>{switch(t){case 0:n.createObjectStore(Vi)}}})),dl}async function Oa(n,t){const e=wc(n),s=(await Th()).transaction(Vi,"readwrite"),r=s.objectStore(Vi),o=await r.get(e);return await r.put(t,e),await s.done,(!o||o.fid!==t.fid)&&Ky(n,t.fid),t}async function Qy(n){const t=wc(n),i=(await Th()).transaction(Vi,"readwrite");await i.objectStore(Vi).delete(t),await i.done}async function vc(n,t){const e=wc(n),s=(await Th()).transaction(Vi,"readwrite"),r=s.objectStore(Vi),o=await r.get(e),a=t(o);return a===void 0?await r.delete(e):await r.put(a,e),await s.done,a&&(!o||o.fid!==a.fid)&&Ky(n,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Eh(n){let t;const e=await vc(n.appConfig,i=>{const s=TS(i),r=ES(n,s);return t=r.registrationPromise,r.installationEntry});return e.fid===eu?{installationEntry:await t}:{installationEntry:e,registrationPromise:t}}function TS(n){const t=n||{fid:gS(),registrationStatus:0};return Xy(t)}function ES(n,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Ni.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const e={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=IS(n,e);return{installationEntry:e,registrationPromise:i}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:AS(n)}:{installationEntry:t}}async function IS(n,t){try{const e=await dS(n,t);return Oa(n.appConfig,e)}catch(e){throw By(e)&&e.customData.serverCode===409?await Qy(n.appConfig):await Oa(n.appConfig,{fid:t.fid,registrationStatus:0}),e}}async function AS(n){let t=await Ap(n.appConfig);for(;t.registrationStatus===1;)await qy(100),t=await Ap(n.appConfig);if(t.registrationStatus===0){const{installationEntry:e,registrationPromise:i}=await Eh(n);return i||e}return t}function Ap(n){return vc(n,t=>{if(!t)throw Ni.create("installation-not-found");return Xy(t)})}function Xy(n){return xS(n)?{fid:n.fid,registrationStatus:0}:n}function xS(n){return n.registrationStatus===1&&n.registrationTime+Ly<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function SS({appConfig:n,heartbeatServiceProvider:t},e){const i=PS(n,e),s=lS(n,e),r=t.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:Fy,appId:n.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Wy(()=>fetch(i,a));if(c.ok){const l=await c.json();return $y(l)}else throw await jy("Generate Auth Token",c)}function PS(n,{fid:t}){return`${zy(n)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ih(n,t=!1){let e;const i=await vc(n.appConfig,r=>{if(!Jy(r))throw Ni.create("not-registered");const o=r.authToken;if(!t&&kS(o))return r;if(o.requestStatus===1)return e=RS(n,t),r;{if(!navigator.onLine)throw Ni.create("app-offline");const a=MS(r);return e=CS(n,a),a}});return e?await e:i.authToken}async function RS(n,t){let e=await xp(n.appConfig);for(;e.authToken.requestStatus===1;)await qy(100),e=await xp(n.appConfig);const i=e.authToken;return i.requestStatus===0?Ih(n,t):i}function xp(n){return vc(n,t=>{if(!Jy(t))throw Ni.create("not-registered");const e=t.authToken;return OS(e)?{...t,authToken:{requestStatus:0}}:t})}async function CS(n,t){try{const e=await SS(n,t),i={...t,authToken:e};return await Oa(n.appConfig,i),e}catch(e){if(By(e)&&(e.customData.serverCode===401||e.customData.serverCode===404))await Qy(n.appConfig);else{const i={...t,authToken:{requestStatus:0}};await Oa(n.appConfig,i)}throw e}}function Jy(n){return n!==void 0&&n.registrationStatus===2}function kS(n){return n.requestStatus===2&&!DS(n)}function DS(n){const t=Date.now();return t<n.creationTime||n.creationTime+n.expiresIn<t+rS}function MS(n){const t={requestStatus:1,requestTime:Date.now()};return{...n,authToken:t}}function OS(n){return n.requestStatus===1&&n.requestTime+Ly<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NS(n){const t=n,{installationEntry:e,registrationPromise:i}=await Eh(t);return i?i.catch(console.error):Ih(t).catch(console.error),e.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VS(n,t=!1){const e=n;return await LS(e),(await Ih(e,t)).token}async function LS(n){const{registrationPromise:t}=await Eh(n);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FS(n){if(!n||!n.options)throw fl("App Configuration");if(!n.name)throw fl("App Name");const t=["projectId","apiKey","appId"];for(const e of t)if(!n.options[e])throw fl(e);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function fl(n){return Ni.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zy="installations",US="installations-internal",BS=n=>{const t=n.getProvider("app").getImmediate(),e=FS(t),i=si(t,"heartbeat");return{app:t,appConfig:e,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},zS=n=>{const t=n.getProvider("app").getImmediate(),e=si(t,Zy).getImmediate();return{getId:()=>NS(e),getToken:s=>VS(e,s)}};function $S(){xe(new ye(Zy,BS,"PUBLIC")),xe(new ye(US,zS,"PRIVATE"))}$S();oe(Vy,vh);oe(Vy,vh,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Na="analytics",jS="firebase_id",HS="origin",WS=60*1e3,qS="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Ah="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const te=new Qa("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GS={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},ge=new Ui("analytics","Analytics",GS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KS(n){if(!n.startsWith(Ah)){const t=ge.create("invalid-gtag-resource",{gtagURL:n});return te.warn(t.message),""}return n}function tb(n){return Promise.all(n.map(t=>t.catch(e=>e)))}function YS(n,t){let e;return window.trustedTypes&&(e=window.trustedTypes.createPolicy(n,t)),e}function QS(n,t){const e=YS("firebase-js-sdk-policy",{createScriptURL:KS}),i=document.createElement("script"),s=`${Ah}?l=${n}&id=${t}`;i.src=e?e==null?void 0:e.createScriptURL(s):s,i.async=!0,document.head.appendChild(i)}function XS(n){let t=[];return Array.isArray(window[n])?t=window[n]:window[n]=t,t}async function JS(n,t,e,i,s,r){const o=i[s];try{if(o)await t[o];else{const c=(await tb(e)).find(l=>l.measurementId===s);c&&await t[c.appId]}}catch(a){te.error(a)}n("config",s,r)}async function ZS(n,t,e,i,s){try{let r=[];if(s&&s.send_to){let o=s.send_to;Array.isArray(o)||(o=[o]);const a=await tb(e);for(const c of o){const l=a.find(d=>d.measurementId===c),h=l&&t[l.appId];if(h)r.push(h);else{r=[];break}}}r.length===0&&(r=Object.values(t)),await Promise.all(r),n("event",i,s||{})}catch(r){te.error(r)}}function tP(n,t,e,i){async function s(r,...o){try{if(r==="event"){const[a,c]=o;await ZS(n,t,e,a,c)}else if(r==="config"){const[a,c]=o;await JS(n,t,e,i,a,c)}else if(r==="consent"){const[a,c]=o;n("consent",a,c)}else if(r==="get"){const[a,c,l]=o;n("get",a,c,l)}else if(r==="set"){const[a]=o;n("set",a)}else n(r,...o)}catch(a){te.error(a)}}return s}function eP(n,t,e,i,s){let r=function(...o){window[i].push(arguments)};return window[s]&&typeof window[s]=="function"&&(r=window[s]),window[s]=tP(r,n,t,e),{gtagCore:r,wrappedGtag:window[s]}}function nP(n){const t=window.document.getElementsByTagName("script");for(const e of Object.values(t))if(e.src&&e.src.includes(Ah)&&e.src.includes(n))return e;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iP=30,sP=1e3;class rP{constructor(t={},e=sP){this.throttleMetadata=t,this.intervalMillis=e}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,e){this.throttleMetadata[t]=e}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const eb=new rP;function oP(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function aP(n){var o;const{appId:t,apiKey:e}=n,i={method:"GET",headers:oP(e)},s=qS.replace("{app-id}",t),r=await fetch(s,i);if(r.status!==200&&r.status!==304){let a="";try{const c=await r.json();(o=c.error)!=null&&o.message&&(a=c.error.message)}catch{}throw ge.create("config-fetch-failed",{httpStatus:r.status,responseMessage:a})}return r.json()}async function cP(n,t=eb,e){const{appId:i,apiKey:s,measurementId:r}=n.options;if(!i)throw ge.create("no-app-id");if(!s){if(r)return{measurementId:r,appId:i};throw ge.create("no-api-key")}const o=t.getThrottleMetadata(i)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new hP;return setTimeout(async()=>{a.abort()},WS),nb({appId:i,apiKey:s,measurementId:r},o,a,t)}async function nb(n,{throttleEndTimeMillis:t,backoffCount:e},i,s=eb){var a;const{appId:r,measurementId:o}=n;try{await lP(i,t)}catch(c){if(o)return te.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:r,measurementId:o};throw c}try{const c=await aP(n);return s.deleteThrottleMetadata(r),c}catch(c){const l=c;if(!uP(l)){if(s.deleteThrottleMetadata(r),o)return te.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${l==null?void 0:l.message}]`),{appId:r,measurementId:o};throw c}const h=Number((a=l==null?void 0:l.customData)==null?void 0:a.httpStatus)===503?Qd(e,s.intervalMillis,iP):Qd(e,s.intervalMillis),d={throttleEndTimeMillis:Date.now()+h,backoffCount:e+1};return s.setThrottleMetadata(r,d),te.debug(`Calling attemptFetch again in ${h} millis`),nb(n,d,i,s)}}function lP(n,t){return new Promise((e,i)=>{const s=Math.max(t-Date.now(),0),r=setTimeout(e,s);n.addEventListener(()=>{clearTimeout(r),i(ge.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function uP(n){if(!(n instanceof be)||!n.customData)return!1;const t=Number(n.customData.httpStatus);return t===429||t===500||t===503||t===504}class hP{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function dP(n,t,e,i,s){if(s&&s.global){n("event",e,i);return}else{const r=await t,o={...i,send_to:r};n("event",e,o)}}async function fP(n,t,e,i){if(i&&i.global){const s={};for(const r of Object.keys(e))s[`user_properties.${r}`]=e[r];return n("set",s),Promise.resolve()}else{const s=await t;n("config",s,{update:!0,user_properties:e})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pP(){if(mm())try{await _m()}catch(n){return te.warn(ge.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return te.warn(ge.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function gP(n,t,e,i,s,r,o){const a=cP(n);a.then(f=>{e[f.measurementId]=f.appId,n.options.measurementId&&f.measurementId!==n.options.measurementId&&te.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${f.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(f=>te.error(f)),t.push(a);const c=pP().then(f=>{if(f)return i.getId()}),[l,h]=await Promise.all([a,c]);nP(r)||QS(r,l.measurementId),s("js",new Date);const d=(o==null?void 0:o.config)??{};return d[HS]="firebase",d.update=!0,h!=null&&(d[jS]=h),s("config",l.measurementId,d),l.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mP{constructor(t){this.app=t}_delete(){return delete cs[this.app.options.appId],Promise.resolve()}}let cs={},Sp=[];const Pp={};let pl="dataLayer",_P="gtag",Rp,xh,Cp=!1;function yP(){const n=[];if(gm()&&n.push("This is a browser extension environment."),av()||n.push("Cookies are not available."),n.length>0){const t=n.map((i,s)=>`(${s+1}) ${i}`).join(" "),e=ge.create("invalid-analytics-context",{errorInfo:t});te.warn(e.message)}}function bP(n,t,e){yP();const i=n.options.appId;if(!i)throw ge.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)te.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw ge.create("no-api-key");if(cs[i]!=null)throw ge.create("already-exists",{id:i});if(!Cp){XS(pl);const{wrappedGtag:r,gtagCore:o}=eP(cs,Sp,Pp,pl,_P);xh=r,Rp=o,Cp=!0}return cs[i]=gP(n,Sp,Pp,t,Rp,pl,e),new mP(n)}function wP(n=Xa()){n=ht(n);const t=si(n,Na);return t.isInitialized()?t.getImmediate():vP(n)}function vP(n,t={}){const e=si(n,Na);if(e.isInitialized()){const s=e.getImmediate();if(Hn(t,e.getOptions()))return s;throw ge.create("already-initialized")}return e.initialize({options:t})}function TP(n,t,e){n=ht(n),fP(xh,cs[n.app.options.appId],t,e).catch(i=>te.error(i))}function EP(n,t,e,i){n=ht(n),dP(xh,cs[n.app.options.appId],t,e,i).catch(s=>te.error(s))}const kp="@firebase/analytics",Dp="0.10.19";function IP(){xe(new ye(Na,(t,{options:e})=>{const i=t.getProvider("app").getImmediate(),s=t.getProvider("installations-internal").getImmediate();return bP(i,s,e)},"PUBLIC")),xe(new ye("analytics-internal",n,"PRIVATE")),oe(kp,Dp),oe(kp,Dp,"esm2020");function n(t){try{const e=t.getProvider(Na).getImmediate();return{logEvent:(i,s,r)=>EP(e,i,s,r),setUserProperties:(i,s)=>TP(e,i,s)}}catch(e){throw ge.create("interop-component-reg-failed",{reason:e})}}}IP();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AP="type.googleapis.com/google.protobuf.Int64Value",xP="type.googleapis.com/google.protobuf.UInt64Value";function ib(n,t){const e={};for(const i in n)n.hasOwnProperty(i)&&(e[i]=t(n[i]));return e}function Va(n){if(n==null)return null;if(n instanceof Number&&(n=n.valueOf()),typeof n=="number"&&isFinite(n)||n===!0||n===!1||Object.prototype.toString.call(n)==="[object String]")return n;if(n instanceof Date)return n.toISOString();if(Array.isArray(n))return n.map(t=>Va(t));if(typeof n=="function"||typeof n=="object")return ib(n,t=>Va(t));throw new Error("Data cannot be encoded in JSON: "+n)}function bs(n){if(n==null)return n;if(n["@type"])switch(n["@type"]){case AP:case xP:{const t=Number(n.value);if(isNaN(t))throw new Error("Data cannot be decoded from JSON: "+n);return t}default:throw new Error("Data cannot be decoded from JSON: "+n)}return Array.isArray(n)?n.map(t=>bs(t)):typeof n=="function"||typeof n=="object"?ib(n,t=>bs(t)):n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class re extends be{constructor(t,e,i){super(`${Sh}/${t}`,e||""),this.details=i,Object.setPrototypeOf(this,re.prototype)}}function SP(n){if(n>=200&&n<300)return"ok";switch(n){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function La(n,t){let e=SP(n),i=e,s;try{const r=t&&t.error;if(r){const o=r.status;if(typeof o=="string"){if(!Mp[o])return new re("internal","internal");e=Mp[o],i=o}const a=r.message;typeof a=="string"&&(i=a),s=r.details,s!==void 0&&(s=bs(s))}}catch{}return e==="ok"?null:new re(e,i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PP{constructor(t,e,i,s){this.app=t,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,ue(t)&&t.settings.appCheckToken&&(this.serverAppAppCheckToken=t.settings.appCheckToken),this.auth=e.getImmediate({optional:!0}),this.messaging=i.getImmediate({optional:!0}),this.auth||e.get().then(r=>this.auth=r,()=>{}),this.messaging||i.get().then(r=>this.messaging=r,()=>{}),this.appCheck||s==null||s.get().then(r=>this.appCheck=r,()=>{})}async getAuthToken(){if(this.auth)try{const t=await this.auth.getToken();return t==null?void 0:t.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(t){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const e=t?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return e.error?null:e.token}return null}async getContext(t){const e=await this.getAuthToken(),i=await this.getMessagingToken(),s=await this.getAppCheckToken(t);return{authToken:e,messagingToken:i,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nu="us-central1",RP=/^data: (.*?)(?:\n|$)/;function CP(n){let t=null;return{promise:new Promise((e,i)=>{t=setTimeout(()=>{i(new re("deadline-exceeded","deadline-exceeded"))},n)}),cancel:()=>{t&&clearTimeout(t)}}}class kP{constructor(t,e,i,s,r=nu,o=(...a)=>fetch(...a)){this.app=t,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new PP(t,e,i,s),this.cancelAllRequests=new Promise(a=>{this.deleteService=()=>Promise.resolve(a())});try{const a=new URL(r);this.customDomain=a.origin+(a.pathname==="/"?"":a.pathname),this.region=nu}catch{this.customDomain=null,this.region=r}}_delete(){return this.deleteService()}_url(t){const e=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${e}/${this.region}/${t}`:this.customDomain!==null?`${this.customDomain}/${t}`:`https://${this.region}-${e}.cloudfunctions.net/${t}`}}function DP(n,t,e){const i=ii(t);n.emulatorOrigin=`http${i?"s":""}://${t}:${e}`,i&&(wu(n.emulatorOrigin+"/backends"),vu("Functions",!0))}function MP(n,t,e){const i=s=>NP(n,t,s,{});return i.stream=(s,r)=>LP(n,t,s,r),i}function sb(n){return n.emulatorOrigin&&ii(n.emulatorOrigin)?"include":void 0}async function OP(n,t,e,i,s){e["Content-Type"]="application/json";let r;try{r=await i(n,{method:"POST",body:JSON.stringify(t),headers:e,credentials:sb(s)})}catch{return{status:0,json:null}}let o=null;try{o=await r.json()}catch{}return{status:r.status,json:o}}async function rb(n,t){const e={},i=await n.contextProvider.getContext(t.limitedUseAppCheckTokens);return i.authToken&&(e.Authorization="Bearer "+i.authToken),i.messagingToken&&(e["Firebase-Instance-ID-Token"]=i.messagingToken),i.appCheckToken!==null&&(e["X-Firebase-AppCheck"]=i.appCheckToken),e}function NP(n,t,e,i){const s=n._url(t);return VP(n,s,e,i)}async function VP(n,t,e,i){e=Va(e);const s={data:e},r=await rb(n,i),o=i.timeout||7e4,a=CP(o),c=await Promise.race([OP(t,s,r,n.fetchImpl,n),a.promise,n.cancelAllRequests]);if(a.cancel(),!c)throw new re("cancelled","Firebase Functions instance was deleted.");const l=La(c.status,c.json);if(l)throw l;if(!c.json)throw new re("internal","Response is not valid JSON object.");let h=c.json.data;if(typeof h>"u"&&(h=c.json.result),typeof h>"u")throw new re("internal","Response is missing data field.");return{data:bs(h)}}function LP(n,t,e,i){const s=n._url(t);return FP(n,s,e,i||{})}async function FP(n,t,e,i){var f;e=Va(e);const s={data:e},r=await rb(n,i);r["Content-Type"]="application/json",r.Accept="text/event-stream";let o;try{o=await n.fetchImpl(t,{method:"POST",body:JSON.stringify(s),headers:r,signal:i==null?void 0:i.signal,credentials:sb(n)})}catch(m){if(m instanceof Error&&m.name==="AbortError"){const b=new re("cancelled","Request was cancelled.");return{data:Promise.reject(b),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(b)}}}}}}const _=La(0,null);return{data:Promise.reject(_),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(_)}}}}}}let a,c;const l=new Promise((m,_)=>{a=m,c=_});(f=i==null?void 0:i.signal)==null||f.addEventListener("abort",()=>{const m=new re("cancelled","Request was cancelled.");c(m)});const h=o.body.getReader(),d=UP(h,a,c,i==null?void 0:i.signal);return{stream:{[Symbol.asyncIterator](){const m=d.getReader();return{async next(){const{value:_,done:b}=await m.read();return{value:_,done:b}},async return(){return await m.cancel(),{done:!0,value:void 0}}}}},data:l}}function UP(n,t,e,i){const s=(o,a)=>{const c=o.match(RP);if(!c)return;const l=c[1];try{const h=JSON.parse(l);if("result"in h){t(bs(h.result));return}if("message"in h){a.enqueue(bs(h.message));return}if("error"in h){const d=La(0,h);a.error(d),e(d);return}}catch(h){if(h instanceof re){a.error(h),e(h);return}}},r=new TextDecoder;return new ReadableStream({start(o){let a="";return c();async function c(){if(i!=null&&i.aborted){const l=new re("cancelled","Request was cancelled");return o.error(l),e(l),Promise.resolve()}try{const{value:l,done:h}=await n.read();if(h){a.trim()&&s(a.trim(),o),o.close();return}if(i!=null&&i.aborted){const f=new re("cancelled","Request was cancelled");o.error(f),e(f),await n.cancel();return}a+=r.decode(l,{stream:!0});const d=a.split(`
`);a=d.pop()||"";for(const f of d)f.trim()&&s(f.trim(),o);return c()}catch(l){const h=l instanceof re?l:La(0,null);o.error(h),e(h)}}},cancel(){return n.cancel()}})}const Op="@firebase/functions",Np="0.13.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BP="auth-internal",zP="app-check-internal",$P="messaging-internal";function jP(n){const t=(e,{instanceIdentifier:i})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider(BP),o=e.getProvider($P),a=e.getProvider(zP);return new kP(s,r,o,a,i)};xe(new ye(Sh,t,"PUBLIC").setMultipleInstances(!0)),oe(Op,Np,n),oe(Op,Np,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HP(n=Xa(),t=nu){const i=si(ht(n),Sh).getImmediate({identifier:t}),s=dm("functions");return s&&WP(i,...s),i}function WP(n,t,e){DP(ht(n),t,e)}function qP(n,t,e){return MP(ht(n),t)}jP();const GP={apiKey:"AIzaSyBKRNx5MFaczdxMrH8pKfLiXISsCRw2Gro",authDomain:"stock-simulation-24b9b.firebaseapp.com",projectId:"stock-simulation-24b9b",storageBucket:"stock-simulation-24b9b.firebasestorage.app",messagingSenderId:"824547600994",appId:"1:824547600994:web:0a29d79221b8b613a8ff3b",measurementId:"G-9YQ52P6XVV"},Tc=vm(GP),Dn=LE(Tc),Ft=Lx(Tc),KP=HP(Tc,"us-central1");typeof window<"u"&&window.location.protocol==="https:"&&wP(Tc);const pn=1e7,we=6,ob={0:{"A 식품":377500,"B IT":152e3,"C 바이오":63281,"D 엔터":2940,"E 라이프":105e4,"F 전자":31e3},1:{"A 식품":377500,"B IT":152e3,"C 바이오":63281,"D 엔터":2940,"E 라이프":105e4,"F 전자":31e3},2:{"A 식품":347715,"B IT":100280,"C 바이오":85296,"D 엔터":1875,"E 라이프":741e3,"F 전자":46190},3:{"A 식품":301643,"B IT":67050,"C 바이오":80246,"D 엔터":2520,"E 라이프":921730,"F 전자":29560},4:{"A 식품":489265,"B IT":144150,"C 바이오":165724,"D 엔터":15220,"E 라이프":1149766,"F 전자":30650},5:{"A 식품":440045,"B IT":136466,"C 바이오":96584,"D 엔터":7445,"E 라이프":521533,"F 전자":16860},6:{"A 식품":530342,"B IT":170773,"C 바이오":102659,"D 엔터":6145,"E 라이프":688997,"F 전자":56810}},ab=Math.max(...Object.keys(ob).map(Number));function dn(n,t=we){const e=ob[n];if(!e)throw new Error(`Day ${n} price data is not available.`);return Object.fromEntries(Object.entries(e).slice(0,t))}async function YP(n){var s;if(typeof window>"u"||!((s=window.crypto)!=null&&s.subtle))throw new Error("Web Crypto API is not available in this environment.");const e=new TextEncoder().encode(n),i=await window.crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(i)).map(r=>r.toString(16).padStart(2,"0")).join("")}const Fr="057ba03d6c44104863dc7361fe4578965d1887360f90a0895882e58a6248fc86",Vp=30,QP="top081800!",uo=()=>ah(Ft,"meta","state"),ho=n=>ah(Ft,"users",n),ji=n=>Ds(Ft,"users",n,"investments"),gn=n=>(n==null?void 0:n.trim().toUpperCase())??"",ar=n=>`${n}@stocksimgame.local`;function XP(n,t){t.forEach(e=>{if(!n[e.ticker])throw new Error(`알 수 없는 종목입니다: ${e.ticker}`);if(e.shares===0)throw new Error("거래 수량은 0일 수 없습니다.")})}function cb(n,t){const e=n.holdings||{};let i=n.cash??pn;return Object.entries(e).forEach(([s,r])=>{t[s]&&(i+=r*t[s])}),Math.round(i*100)/100}async function Hi(){const n=uo(),t=await Oy(n);if(t.exists())return t.data();const e={currentDay:0,visibleTickers:we,initialCash:pn,adminTokenHash:Fr,updatedAt:Ie()};return await Kx(n,e),e}async function Ec(n,t,e=we){const i=ho(n);await co(Ft,async s=>{const r=await s.get(i),o=dn(t,e),a=Object.keys(o);if(!r.exists()){const d=Object.fromEntries(a.map(f=>[f,0]));s.set(i,{cash:pn,holdings:d,createdAt:Ie(),updatedAt:Ie()});return}const l={...r.data().holdings||{}};let h=!1;a.forEach(d=>{typeof l[d]!="number"&&(l[d]=0,h=!0)}),h&&s.update(i,{holdings:l,updatedAt:Ie()})})}async function JP(n){const t=gh(ji(n),bh("savedAt","desc"),Wx(1)),e=await Re(t);if(e.empty)return null;const i=e.docs[0];return{id:i.id,...i.data()}}async function ZP(n){const t=gn(n),e=gh(ji(t),bh("savedAt","asc"));return(await Re(e)).docs.map(s=>({id:s.id,...s.data()}))}async function tR(n){const t=gh(ji(n),bh("savedAt","desc")),e=await Re(t);if(e.size<=Vp)return;const s=e.docs.slice(Vp);await Promise.all(s.map(r=>Yx(r.ref)))}async function eR(n,t){const e=gn(n);if(!e)throw new Error("아이디를 입력해주세요.");if(e==="ADMIN")throw new Error("관리자 계정은 회원가입할 수 없습니다.");await Km(Dn,ar(e),t);const i=await Hi();return await Ec(e,i.currentDay,i.visibleTickers),e}async function nR(n,t){const e=gn(n);if(!e)throw new Error("아이디를 입력해주세요.");if(e==="ADMIN"){if(t!==QP)throw new Error("관리자 비밀번호가 올바르지 않습니다.");try{await ol(Dn,ar(e),t)}catch(s){const r=(s==null?void 0:s.code)||"";if(r==="auth/user-not-found"||r==="auth/invalid-credential"||r==="auth/wrong-password")try{await Km(Dn,ar(e),t)}catch(o){if((o==null?void 0:o.code)==="auth/email-already-in-use")await ol(Dn,ar(e),t);else throw o}else throw s}}else await ol(Dn,ar(e),t);const i=await Hi();return e!=="ADMIN"&&await Ec(e,i.currentDay,i.visibleTickers),e}async function iR(){await xT(Dn)}async function lb(n){const t=gn(n),e=await Hi(),{currentDay:i,visibleTickers:s=we}=e;await Ec(t,i,s);const r=await Oy(ho(t));if(!r.exists())throw new Error("사용자 정보를 찾을 수 없습니다.");const o=r.data(),a=dn(i,s),c=await JP(t);return{currentDay:i,prices:a,visibleTickers:s,user:{cash:o.cash??pn,holdings:o.holdings||{},portfolioValue:cb(o,a)},lastInvestment:c}}async function Ph(n,t){const e=gn(n),i=await Hi(),{currentDay:s,visibleTickers:r=we}=i;if(s===0)throw new Error("Day 0에서는 거래할 수 없습니다. 주식 종목과 가격만 확인할 수 있습니다.");const o=dn(s,r);return await Ec(e,s,r),XP(o,t),await co(Ft,async a=>{const c=ho(e),l=await a.get(c);if(!l.exists())throw new Error("사용자 정보가 없습니다.");const h=l.data(),d={...h.holdings||{}};let f=h.cash??pn;t.forEach(({ticker:m,shares:_})=>{const b=o[m],v=_*b;if(_>0){if(f+1e-9<v)throw new Error(`${m} 매수 금액(${v.toLocaleString()}원)이 보유 현금을 초과합니다.`);d[m]=(d[m]||0)+_,f-=v}else{const S=Math.abs(_);if((d[m]||0)+1e-9<S)throw new Error(`${m} 매도 수량(${S.toFixed(0)}주)이 보유량을 초과합니다.`);d[m]-=S,f+=v}}),a.update(c,{cash:Math.round(f*100)/100,holdings:d,updatedAt:Ie()})}),await Qx(ji(e),{day:i.currentDay,orders:t,savedAt:Ie()}),await tR(e),lb(e)}async function sR(n){if(!n)throw new Error("관리자 토큰을 입력하세요.");const t=await YP(n.trim());return await co(Ft,async i=>{const s=uo(),r=await i.get(s),o=r.exists()?r.data():{currentDay:0,visibleTickers:we,adminTokenHash:Fr},a=o.adminTokenHash||Fr;if(t!==a)throw new Error("관리자 토큰이 올바르지 않습니다.");const c=(o.currentDay??0)+1;if(c>ab)throw new Error("더 이상 정의된 Day가 없습니다.");return i.set(s,{...o,currentDay:c,updatedAt:Ie()},{merge:!0}),c})}function ub(n){return gn(n)==="ADMIN"}async function rR(n){if(gn(n)!=="ADMIN")throw new Error("관리자 계정만 Day를 넘길 수 있습니다.");return await co(Ft,async i=>{const s=uo(),r=await i.get(s),o=r.exists()?r.data():{currentDay:0,visibleTickers:we,adminTokenHash:Fr},a=(o.currentDay??0)+1;if(a>ab)throw new Error("더 이상 정의된 Day가 없습니다.");return i.set(s,{...o,currentDay:a,updatedAt:Ie()},{merge:!0}),a})}async function oR(){const n=lo(Ft),t=await Re(Ds(Ft,"users"));for(const i of t.docs){const s=i.id;if(s==="ADMIN")continue;(await Re(ji(s))).docs.forEach(o=>{n.delete(o.ref)}),n.delete(i.ref)}const e=uo();n.set(e,{currentDay:0,visibleTickers:we,initialCash:pn,adminTokenHash:Fr,updatedAt:Ie()},{merge:!1}),await n.commit();try{const i=Dn.currentUser;if(!i)throw new Error("인증된 사용자가 없습니다. 다시 로그인해주세요.");console.log("현재 로그인한 사용자:",i.email);const r=await qP(KP,"deleteAllUsers")({});return console.log("Auth 계정 삭제 결과:",r.data),r.data}catch(i){throw console.error("Auth 계정 삭제 실패:",i),console.error("에러 상세:",{code:i.code,message:i.message,details:i.details}),new Error(`Firestore 데이터는 삭제되었지만, Auth 계정 삭제 중 오류가 발생했습니다: ${i.message}`)}}async function aR(){const n=lo(Ft),t=await Re(Ds(Ft,"users"));for(const e of t.docs)e.id!=="ADMIN"&&n.delete(e.ref);await n.commit()}async function cR(){const n=lo(Ft),t=await Re(Ds(Ft,"users"));for(const e of t.docs){const i=e.id;if(i==="ADMIN")continue;(await Re(ji(i))).docs.forEach(r=>{n.delete(r.ref)})}await n.commit()}async function lR(){const n=await Hi(),{currentDay:t,visibleTickers:e=we}=n,i=dn(t,e),s=Object.keys(i),r=await Re(Ds(Ft,"users")),o=lo(Ft);for(const a of r.docs){if(a.id==="ADMIN")continue;const l=Object.fromEntries(s.map(h=>[h,0]));o.update(a.ref,{cash:pn,holdings:l,updatedAt:Ie()})}await o.commit()}async function hb(){var o,a,c,l;const n=await Hi(),{currentDay:t,visibleTickers:e=we}=n,i=dn(t,e),s=await Re(Ds(Ft,"users")),r=[];for(const h of s.docs){const d=h.id;if(d==="ADMIN")continue;const f=h.data(),m=cb(f,i);r.push({userId:d,cash:f.cash??pn,holdings:f.holdings||{},portfolioValue:m,createdAt:((a=(o=f.createdAt)==null?void 0:o.toDate)==null?void 0:a.call(o))||null,updatedAt:((l=(c=f.updatedAt)==null?void 0:c.toDate)==null?void 0:l.call(c))||null})}return r.sort((h,d)=>d.portfolioValue-h.portfolioValue),r}async function uR(n){const t=gn(n);if(t==="ADMIN")throw new Error("관리자 계정은 삭제할 수 없습니다.");const e=lo(Ft);(await Re(ji(t))).docs.forEach(r=>{e.delete(r.ref)});const s=ho(t);e.delete(s),await e.commit()}async function hR(n,t,e){const i=gn(n);if(i==="ADMIN")throw new Error("관리자 계정의 자산은 조정할 수 없습니다.");const s=ho(i);await co(Ft,async r=>{const o=await r.get(s);if(!o.exists())throw new Error("사용자를 찾을 수 없습니다.");const a=o.data(),c=a.cash??pn,l={...a.holdings||{}},h=t!==void 0?Math.max(0,c+t):c,d={...l};e&&Object.entries(e).forEach(([f,m])=>{const _=d[f]||0;d[f]=Math.max(0,_+m)}),r.update(s,{cash:Math.round(h*100)/100,holdings:d,updatedAt:Ie()})})}async function dR(){return(await hb()).map((t,e)=>({rank:e+1,userId:t.userId,portfolioValue:t.portfolioValue,cash:t.cash,holdings:t.holdings}))}function fR(n){const t=uo();let e=null,i=!0;return Xx(t,s=>{if(!s.exists())return;const o=s.data().currentDay??0;if(i){e=o,i=!1;return}e!==null&&e!==o&&n(o,e),e=o},s=>{console.error("상태 감시 오류:",s)})}/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function fo(n){return n+.5|0}const Mn=(n,t,e)=>Math.max(Math.min(n,e),t);function cr(n){return Mn(fo(n*2.55),0,255)}function jn(n){return Mn(fo(n*255),0,255)}function Ze(n){return Mn(fo(n/2.55)/100,0,1)}function Lp(n){return Mn(fo(n*100),0,100)}const _e={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},iu=[..."0123456789ABCDEF"],pR=n=>iu[n&15],gR=n=>iu[(n&240)>>4]+iu[n&15],Mo=n=>(n&240)>>4===(n&15),mR=n=>Mo(n.r)&&Mo(n.g)&&Mo(n.b)&&Mo(n.a);function _R(n){var t=n.length,e;return n[0]==="#"&&(t===4||t===5?e={r:255&_e[n[1]]*17,g:255&_e[n[2]]*17,b:255&_e[n[3]]*17,a:t===5?_e[n[4]]*17:255}:(t===7||t===9)&&(e={r:_e[n[1]]<<4|_e[n[2]],g:_e[n[3]]<<4|_e[n[4]],b:_e[n[5]]<<4|_e[n[6]],a:t===9?_e[n[7]]<<4|_e[n[8]]:255})),e}const yR=(n,t)=>n<255?t(n):"";function bR(n){var t=mR(n)?pR:gR;return n?"#"+t(n.r)+t(n.g)+t(n.b)+yR(n.a,t):void 0}const wR=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function db(n,t,e){const i=t*Math.min(e,1-e),s=(r,o=(r+n/30)%12)=>e-i*Math.max(Math.min(o-3,9-o,1),-1);return[s(0),s(8),s(4)]}function vR(n,t,e){const i=(s,r=(s+n/60)%6)=>e-e*t*Math.max(Math.min(r,4-r,1),0);return[i(5),i(3),i(1)]}function TR(n,t,e){const i=db(n,1,.5);let s;for(t+e>1&&(s=1/(t+e),t*=s,e*=s),s=0;s<3;s++)i[s]*=1-t-e,i[s]+=t;return i}function ER(n,t,e,i,s){return n===s?(t-e)/i+(t<e?6:0):t===s?(e-n)/i+2:(n-t)/i+4}function Rh(n){const e=n.r/255,i=n.g/255,s=n.b/255,r=Math.max(e,i,s),o=Math.min(e,i,s),a=(r+o)/2;let c,l,h;return r!==o&&(h=r-o,l=a>.5?h/(2-r-o):h/(r+o),c=ER(e,i,s,h,r),c=c*60+.5),[c|0,l||0,a]}function Ch(n,t,e,i){return(Array.isArray(t)?n(t[0],t[1],t[2]):n(t,e,i)).map(jn)}function kh(n,t,e){return Ch(db,n,t,e)}function IR(n,t,e){return Ch(TR,n,t,e)}function AR(n,t,e){return Ch(vR,n,t,e)}function fb(n){return(n%360+360)%360}function xR(n){const t=wR.exec(n);let e=255,i;if(!t)return;t[5]!==i&&(e=t[6]?cr(+t[5]):jn(+t[5]));const s=fb(+t[2]),r=+t[3]/100,o=+t[4]/100;return t[1]==="hwb"?i=IR(s,r,o):t[1]==="hsv"?i=AR(s,r,o):i=kh(s,r,o),{r:i[0],g:i[1],b:i[2],a:e}}function SR(n,t){var e=Rh(n);e[0]=fb(e[0]+t),e=kh(e),n.r=e[0],n.g=e[1],n.b=e[2]}function PR(n){if(!n)return;const t=Rh(n),e=t[0],i=Lp(t[1]),s=Lp(t[2]);return n.a<255?`hsla(${e}, ${i}%, ${s}%, ${Ze(n.a)})`:`hsl(${e}, ${i}%, ${s}%)`}const Fp={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Up={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function RR(){const n={},t=Object.keys(Up),e=Object.keys(Fp);let i,s,r,o,a;for(i=0;i<t.length;i++){for(o=a=t[i],s=0;s<e.length;s++)r=e[s],a=a.replace(r,Fp[r]);r=parseInt(Up[o],16),n[a]=[r>>16&255,r>>8&255,r&255]}return n}let Oo;function CR(n){Oo||(Oo=RR(),Oo.transparent=[0,0,0,0]);const t=Oo[n.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const kR=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function DR(n){const t=kR.exec(n);let e=255,i,s,r;if(t){if(t[7]!==i){const o=+t[7];e=t[8]?cr(o):Mn(o*255,0,255)}return i=+t[1],s=+t[3],r=+t[5],i=255&(t[2]?cr(i):Mn(i,0,255)),s=255&(t[4]?cr(s):Mn(s,0,255)),r=255&(t[6]?cr(r):Mn(r,0,255)),{r:i,g:s,b:r,a:e}}}function MR(n){return n&&(n.a<255?`rgba(${n.r}, ${n.g}, ${n.b}, ${Ze(n.a)})`:`rgb(${n.r}, ${n.g}, ${n.b})`)}const gl=n=>n<=.0031308?n*12.92:Math.pow(n,1/2.4)*1.055-.055,Qi=n=>n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4);function OR(n,t,e){const i=Qi(Ze(n.r)),s=Qi(Ze(n.g)),r=Qi(Ze(n.b));return{r:jn(gl(i+e*(Qi(Ze(t.r))-i))),g:jn(gl(s+e*(Qi(Ze(t.g))-s))),b:jn(gl(r+e*(Qi(Ze(t.b))-r))),a:n.a+e*(t.a-n.a)}}function No(n,t,e){if(n){let i=Rh(n);i[t]=Math.max(0,Math.min(i[t]+i[t]*e,t===0?360:1)),i=kh(i),n.r=i[0],n.g=i[1],n.b=i[2]}}function pb(n,t){return n&&Object.assign(t||{},n)}function Bp(n){var t={r:0,g:0,b:0,a:255};return Array.isArray(n)?n.length>=3&&(t={r:n[0],g:n[1],b:n[2],a:255},n.length>3&&(t.a=jn(n[3]))):(t=pb(n,{r:0,g:0,b:0,a:1}),t.a=jn(t.a)),t}function NR(n){return n.charAt(0)==="r"?DR(n):xR(n)}class Ur{constructor(t){if(t instanceof Ur)return t;const e=typeof t;let i;e==="object"?i=Bp(t):e==="string"&&(i=_R(t)||CR(t)||NR(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=pb(this._rgb);return t&&(t.a=Ze(t.a)),t}set rgb(t){this._rgb=Bp(t)}rgbString(){return this._valid?MR(this._rgb):void 0}hexString(){return this._valid?bR(this._rgb):void 0}hslString(){return this._valid?PR(this._rgb):void 0}mix(t,e){if(t){const i=this.rgb,s=t.rgb;let r;const o=e===r?.5:e,a=2*o-1,c=i.a-s.a,l=((a*c===-1?a:(a+c)/(1+a*c))+1)/2;r=1-l,i.r=255&l*i.r+r*s.r+.5,i.g=255&l*i.g+r*s.g+.5,i.b=255&l*i.b+r*s.b+.5,i.a=o*i.a+(1-o)*s.a,this.rgb=i}return this}interpolate(t,e){return t&&(this._rgb=OR(this._rgb,t._rgb,e)),this}clone(){return new Ur(this.rgb)}alpha(t){return this._rgb.a=jn(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=fo(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return No(this._rgb,2,t),this}darken(t){return No(this._rgb,2,-t),this}saturate(t){return No(this._rgb,1,t),this}desaturate(t){return No(this._rgb,1,-t),this}rotate(t){return SR(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Qe(){}const VR=(()=>{let n=0;return()=>n++})();function X(n){return n==null}function _t(n){if(Array.isArray&&Array.isArray(n))return!0;const t=Object.prototype.toString.call(n);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function nt(n){return n!==null&&Object.prototype.toString.call(n)==="[object Object]"}function Et(n){return(typeof n=="number"||n instanceof Number)&&isFinite(+n)}function le(n,t){return Et(n)?n:t}function G(n,t){return typeof n>"u"?t:n}const LR=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100:+n/t,gb=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100*t:+n;function ft(n,t,e){if(n&&typeof n.call=="function")return n.apply(e,t)}function at(n,t,e,i){let s,r,o;if(_t(n))for(r=n.length,s=0;s<r;s++)t.call(e,n[s],s);else if(nt(n))for(o=Object.keys(n),r=o.length,s=0;s<r;s++)t.call(e,n[o[s]],o[s])}function Fa(n,t){let e,i,s,r;if(!n||!t||n.length!==t.length)return!1;for(e=0,i=n.length;e<i;++e)if(s=n[e],r=t[e],s.datasetIndex!==r.datasetIndex||s.index!==r.index)return!1;return!0}function Ua(n){if(_t(n))return n.map(Ua);if(nt(n)){const t=Object.create(null),e=Object.keys(n),i=e.length;let s=0;for(;s<i;++s)t[e[s]]=Ua(n[e[s]]);return t}return n}function mb(n){return["__proto__","prototype","constructor"].indexOf(n)===-1}function FR(n,t,e,i){if(!mb(n))return;const s=t[n],r=e[n];nt(s)&&nt(r)?Br(s,r,i):t[n]=Ua(r)}function Br(n,t,e){const i=_t(t)?t:[t],s=i.length;if(!nt(n))return n;e=e||{};const r=e.merger||FR;let o;for(let a=0;a<s;++a){if(o=i[a],!nt(o))continue;const c=Object.keys(o);for(let l=0,h=c.length;l<h;++l)r(c[l],n,o,e)}return n}function vr(n,t){return Br(n,t,{merger:UR})}function UR(n,t,e){if(!mb(n))return;const i=t[n],s=e[n];nt(i)&&nt(s)?vr(i,s):Object.prototype.hasOwnProperty.call(t,n)||(t[n]=Ua(s))}const zp={"":n=>n,x:n=>n.x,y:n=>n.y};function BR(n){const t=n.split("."),e=[];let i="";for(const s of t)i+=s,i.endsWith("\\")?i=i.slice(0,-1)+".":(e.push(i),i="");return e}function zR(n){const t=BR(n);return e=>{for(const i of t){if(i==="")break;e=e&&e[i]}return e}}function Xn(n,t){return(zp[t]||(zp[t]=zR(t)))(n)}function Dh(n){return n.charAt(0).toUpperCase()+n.slice(1)}const zr=n=>typeof n<"u",Jn=n=>typeof n=="function",$p=(n,t)=>{if(n.size!==t.size)return!1;for(const e of n)if(!t.has(e))return!1;return!0};function $R(n){return n.type==="mouseup"||n.type==="click"||n.type==="contextmenu"}const rt=Math.PI,mt=2*rt,jR=mt+rt,Ba=Number.POSITIVE_INFINITY,HR=rt/180,xt=rt/2,mi=rt/4,jp=rt*2/3,On=Math.log10,He=Math.sign;function Tr(n,t,e){return Math.abs(n-t)<e}function Hp(n){const t=Math.round(n);n=Tr(n,t,n/1e3)?t:n;const e=Math.pow(10,Math.floor(On(n))),i=n/e;return(i<=1?1:i<=2?2:i<=5?5:10)*e}function WR(n){const t=[],e=Math.sqrt(n);let i;for(i=1;i<e;i++)n%i===0&&(t.push(i),t.push(n/i));return e===(e|0)&&t.push(e),t.sort((s,r)=>s-r).pop(),t}function qR(n){return typeof n=="symbol"||typeof n=="object"&&n!==null&&!(Symbol.toPrimitive in n||"toString"in n||"valueOf"in n)}function ws(n){return!qR(n)&&!isNaN(parseFloat(n))&&isFinite(n)}function GR(n,t){const e=Math.round(n);return e-t<=n&&e+t>=n}function _b(n,t,e){let i,s,r;for(i=0,s=n.length;i<s;i++)r=n[i][e],isNaN(r)||(t.min=Math.min(t.min,r),t.max=Math.max(t.max,r))}function Ee(n){return n*(rt/180)}function Mh(n){return n*(180/rt)}function Wp(n){if(!Et(n))return;let t=1,e=0;for(;Math.round(n*t)/t!==n;)t*=10,e++;return e}function yb(n,t){const e=t.x-n.x,i=t.y-n.y,s=Math.sqrt(e*e+i*i);let r=Math.atan2(i,e);return r<-.5*rt&&(r+=mt),{angle:r,distance:s}}function su(n,t){return Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2))}function KR(n,t){return(n-t+jR)%mt-rt}function Gt(n){return(n%mt+mt)%mt}function $r(n,t,e,i){const s=Gt(n),r=Gt(t),o=Gt(e),a=Gt(r-s),c=Gt(o-s),l=Gt(s-r),h=Gt(s-o);return s===r||s===o||i&&r===o||a>c&&l<h}function Lt(n,t,e){return Math.max(t,Math.min(e,n))}function YR(n){return Lt(n,-32768,32767)}function nn(n,t,e,i=1e-6){return n>=Math.min(t,e)-i&&n<=Math.max(t,e)+i}function Oh(n,t,e){e=e||(o=>n[o]<t);let i=n.length-1,s=0,r;for(;i-s>1;)r=s+i>>1,e(r)?s=r:i=r;return{lo:s,hi:i}}const sn=(n,t,e,i)=>Oh(n,e,i?s=>{const r=n[s][t];return r<e||r===e&&n[s+1][t]===e}:s=>n[s][t]<e),QR=(n,t,e)=>Oh(n,e,i=>n[i][t]>=e);function XR(n,t,e){let i=0,s=n.length;for(;i<s&&n[i]<t;)i++;for(;s>i&&n[s-1]>e;)s--;return i>0||s<n.length?n.slice(i,s):n}const bb=["push","pop","shift","splice","unshift"];function JR(n,t){if(n._chartjs){n._chartjs.listeners.push(t);return}Object.defineProperty(n,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),bb.forEach(e=>{const i="_onData"+Dh(e),s=n[e];Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value(...r){const o=s.apply(this,r);return n._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...r)}),o}})})}function qp(n,t){const e=n._chartjs;if(!e)return;const i=e.listeners,s=i.indexOf(t);s!==-1&&i.splice(s,1),!(i.length>0)&&(bb.forEach(r=>{delete n[r]}),delete n._chartjs)}function wb(n){const t=new Set(n);return t.size===n.length?n:Array.from(t)}const vb=function(){return typeof window>"u"?function(n){return n()}:window.requestAnimationFrame}();function Tb(n,t){let e=[],i=!1;return function(...s){e=s,i||(i=!0,vb.call(window,()=>{i=!1,n.apply(t,e)}))}}function ZR(n,t){let e;return function(...i){return t?(clearTimeout(e),e=setTimeout(n,t,i)):n.apply(this,i),t}}const Nh=n=>n==="start"?"left":n==="end"?"right":"center",Wt=(n,t,e)=>n==="start"?t:n==="end"?e:(t+e)/2,tC=(n,t,e,i)=>n===(i?"left":"right")?e:n==="center"?(t+e)/2:t;function Eb(n,t,e){const i=t.length;let s=0,r=i;if(n._sorted){const{iScale:o,vScale:a,_parsed:c}=n,l=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null,h=o.axis,{min:d,max:f,minDefined:m,maxDefined:_}=o.getUserBounds();if(m){if(s=Math.min(sn(c,h,d).lo,e?i:sn(t,h,o.getPixelForValue(d)).lo),l){const b=c.slice(0,s+1).reverse().findIndex(v=>!X(v[a.axis]));s-=Math.max(0,b)}s=Lt(s,0,i-1)}if(_){let b=Math.max(sn(c,o.axis,f,!0).hi+1,e?0:sn(t,h,o.getPixelForValue(f),!0).hi+1);if(l){const v=c.slice(b-1).findIndex(S=>!X(S[a.axis]));b+=Math.max(0,v)}r=Lt(b,s,i)-s}else r=i-s}return{start:s,count:r}}function Ib(n){const{xScale:t,yScale:e,_scaleRanges:i}=n,s={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!i)return n._scaleRanges=s,!0;const r=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==e.min||i.ymax!==e.max;return Object.assign(i,s),r}const Vo=n=>n===0||n===1,Gp=(n,t,e)=>-(Math.pow(2,10*(n-=1))*Math.sin((n-t)*mt/e)),Kp=(n,t,e)=>Math.pow(2,-10*n)*Math.sin((n-t)*mt/e)+1,Er={linear:n=>n,easeInQuad:n=>n*n,easeOutQuad:n=>-n*(n-2),easeInOutQuad:n=>(n/=.5)<1?.5*n*n:-.5*(--n*(n-2)-1),easeInCubic:n=>n*n*n,easeOutCubic:n=>(n-=1)*n*n+1,easeInOutCubic:n=>(n/=.5)<1?.5*n*n*n:.5*((n-=2)*n*n+2),easeInQuart:n=>n*n*n*n,easeOutQuart:n=>-((n-=1)*n*n*n-1),easeInOutQuart:n=>(n/=.5)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2),easeInQuint:n=>n*n*n*n*n,easeOutQuint:n=>(n-=1)*n*n*n*n+1,easeInOutQuint:n=>(n/=.5)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2),easeInSine:n=>-Math.cos(n*xt)+1,easeOutSine:n=>Math.sin(n*xt),easeInOutSine:n=>-.5*(Math.cos(rt*n)-1),easeInExpo:n=>n===0?0:Math.pow(2,10*(n-1)),easeOutExpo:n=>n===1?1:-Math.pow(2,-10*n)+1,easeInOutExpo:n=>Vo(n)?n:n<.5?.5*Math.pow(2,10*(n*2-1)):.5*(-Math.pow(2,-10*(n*2-1))+2),easeInCirc:n=>n>=1?n:-(Math.sqrt(1-n*n)-1),easeOutCirc:n=>Math.sqrt(1-(n-=1)*n),easeInOutCirc:n=>(n/=.5)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1),easeInElastic:n=>Vo(n)?n:Gp(n,.075,.3),easeOutElastic:n=>Vo(n)?n:Kp(n,.075,.3),easeInOutElastic(n){return Vo(n)?n:n<.5?.5*Gp(n*2,.1125,.45):.5+.5*Kp(n*2-1,.1125,.45)},easeInBack(n){return n*n*((1.70158+1)*n-1.70158)},easeOutBack(n){return(n-=1)*n*((1.70158+1)*n+1.70158)+1},easeInOutBack(n){let t=1.70158;return(n/=.5)<1?.5*(n*n*(((t*=1.525)+1)*n-t)):.5*((n-=2)*n*(((t*=1.525)+1)*n+t)+2)},easeInBounce:n=>1-Er.easeOutBounce(1-n),easeOutBounce(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},easeInOutBounce:n=>n<.5?Er.easeInBounce(n*2)*.5:Er.easeOutBounce(n*2-1)*.5+.5};function Vh(n){if(n&&typeof n=="object"){const t=n.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Yp(n){return Vh(n)?n:new Ur(n)}function ml(n){return Vh(n)?n:new Ur(n).saturate(.5).darken(.1).hexString()}const eC=["x","y","borderWidth","radius","tension"],nC=["color","borderColor","backgroundColor"];function iC(n){n.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),n.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),n.set("animations",{colors:{type:"color",properties:nC},numbers:{type:"number",properties:eC}}),n.describe("animations",{_fallback:"animation"}),n.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function sC(n){n.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Qp=new Map;function rC(n,t){t=t||{};const e=n+JSON.stringify(t);let i=Qp.get(e);return i||(i=new Intl.NumberFormat(n,t),Qp.set(e,i)),i}function po(n,t,e){return rC(t,e).format(n)}const Ab={values(n){return _t(n)?n:""+n},numeric(n,t,e){if(n===0)return"0";const i=this.chart.options.locale;let s,r=n;if(e.length>1){const l=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(l<1e-4||l>1e15)&&(s="scientific"),r=oC(n,e)}const o=On(Math.abs(r)),a=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),c={notation:s,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(c,this.options.ticks.format),po(n,i,c)},logarithmic(n,t,e){if(n===0)return"0";const i=e[t].significand||n/Math.pow(10,Math.floor(On(n)));return[1,2,3,5,10,15].includes(i)||t>.8*e.length?Ab.numeric.call(this,n,t,e):""}};function oC(n,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&n!==Math.floor(n)&&(e=n-Math.floor(n)),e}var Ic={formatters:Ab};function aC(n){n.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Ic.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),n.route("scale.ticks","color","","color"),n.route("scale.grid","color","","borderColor"),n.route("scale.border","color","","borderColor"),n.route("scale.title","color","","color"),n.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),n.describe("scales",{_fallback:"scale"}),n.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Li=Object.create(null),ru=Object.create(null);function Ir(n,t){if(!t)return n;const e=t.split(".");for(let i=0,s=e.length;i<s;++i){const r=e[i];n=n[r]||(n[r]=Object.create(null))}return n}function _l(n,t,e){return typeof t=="string"?Br(Ir(n,t),e):Br(Ir(n,""),t)}class cC{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>ml(s.backgroundColor),this.hoverBorderColor=(i,s)=>ml(s.borderColor),this.hoverColor=(i,s)=>ml(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return _l(this,t,e)}get(t){return Ir(this,t)}describe(t,e){return _l(ru,t,e)}override(t,e){return _l(Li,t,e)}route(t,e,i,s){const r=Ir(this,t),o=Ir(this,i),a="_"+e;Object.defineProperties(r,{[a]:{value:r[e],writable:!0},[e]:{enumerable:!0,get(){const c=this[a],l=o[s];return nt(c)?Object.assign({},l,c):G(c,l)},set(c){this[a]=c}}})}apply(t){t.forEach(e=>e(this))}}var yt=new cC({_scriptable:n=>!n.startsWith("on"),_indexable:n=>n!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[iC,sC,aC]);function lC(n){return!n||X(n.size)||X(n.family)?null:(n.style?n.style+" ":"")+(n.weight?n.weight+" ":"")+n.size+"px "+n.family}function za(n,t,e,i,s){let r=t[s];return r||(r=t[s]=n.measureText(s).width,e.push(s)),r>i&&(i=r),i}function uC(n,t,e,i){i=i||{};let s=i.data=i.data||{},r=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(s=i.data={},r=i.garbageCollect=[],i.font=t),n.save(),n.font=t;let o=0;const a=e.length;let c,l,h,d,f;for(c=0;c<a;c++)if(d=e[c],d!=null&&!_t(d))o=za(n,s,r,o,d);else if(_t(d))for(l=0,h=d.length;l<h;l++)f=d[l],f!=null&&!_t(f)&&(o=za(n,s,r,o,f));n.restore();const m=r.length/2;if(m>e.length){for(c=0;c<m;c++)delete s[r[c]];r.splice(0,m)}return o}function _i(n,t,e){const i=n.currentDevicePixelRatio,s=e!==0?Math.max(e/2,.5):0;return Math.round((t-s)*i)/i+s}function Xp(n,t){!t&&!n||(t=t||n.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,n.width,n.height),t.restore())}function ou(n,t,e,i){xb(n,t,e,i,null)}function xb(n,t,e,i,s){let r,o,a,c,l,h,d,f;const m=t.pointStyle,_=t.rotation,b=t.radius;let v=(_||0)*HR;if(m&&typeof m=="object"&&(r=m.toString(),r==="[object HTMLImageElement]"||r==="[object HTMLCanvasElement]")){n.save(),n.translate(e,i),n.rotate(v),n.drawImage(m,-m.width/2,-m.height/2,m.width,m.height),n.restore();return}if(!(isNaN(b)||b<=0)){switch(n.beginPath(),m){default:s?n.ellipse(e,i,s/2,b,0,0,mt):n.arc(e,i,b,0,mt),n.closePath();break;case"triangle":h=s?s/2:b,n.moveTo(e+Math.sin(v)*h,i-Math.cos(v)*b),v+=jp,n.lineTo(e+Math.sin(v)*h,i-Math.cos(v)*b),v+=jp,n.lineTo(e+Math.sin(v)*h,i-Math.cos(v)*b),n.closePath();break;case"rectRounded":l=b*.516,c=b-l,o=Math.cos(v+mi)*c,d=Math.cos(v+mi)*(s?s/2-l:c),a=Math.sin(v+mi)*c,f=Math.sin(v+mi)*(s?s/2-l:c),n.arc(e-d,i-a,l,v-rt,v-xt),n.arc(e+f,i-o,l,v-xt,v),n.arc(e+d,i+a,l,v,v+xt),n.arc(e-f,i+o,l,v+xt,v+rt),n.closePath();break;case"rect":if(!_){c=Math.SQRT1_2*b,h=s?s/2:c,n.rect(e-h,i-c,2*h,2*c);break}v+=mi;case"rectRot":d=Math.cos(v)*(s?s/2:b),o=Math.cos(v)*b,a=Math.sin(v)*b,f=Math.sin(v)*(s?s/2:b),n.moveTo(e-d,i-a),n.lineTo(e+f,i-o),n.lineTo(e+d,i+a),n.lineTo(e-f,i+o),n.closePath();break;case"crossRot":v+=mi;case"cross":d=Math.cos(v)*(s?s/2:b),o=Math.cos(v)*b,a=Math.sin(v)*b,f=Math.sin(v)*(s?s/2:b),n.moveTo(e-d,i-a),n.lineTo(e+d,i+a),n.moveTo(e+f,i-o),n.lineTo(e-f,i+o);break;case"star":d=Math.cos(v)*(s?s/2:b),o=Math.cos(v)*b,a=Math.sin(v)*b,f=Math.sin(v)*(s?s/2:b),n.moveTo(e-d,i-a),n.lineTo(e+d,i+a),n.moveTo(e+f,i-o),n.lineTo(e-f,i+o),v+=mi,d=Math.cos(v)*(s?s/2:b),o=Math.cos(v)*b,a=Math.sin(v)*b,f=Math.sin(v)*(s?s/2:b),n.moveTo(e-d,i-a),n.lineTo(e+d,i+a),n.moveTo(e+f,i-o),n.lineTo(e-f,i+o);break;case"line":o=s?s/2:Math.cos(v)*b,a=Math.sin(v)*b,n.moveTo(e-o,i-a),n.lineTo(e+o,i+a);break;case"dash":n.moveTo(e,i),n.lineTo(e+Math.cos(v)*(s?s/2:b),i+Math.sin(v)*b);break;case!1:n.closePath();break}n.fill(),t.borderWidth>0&&n.stroke()}}function rn(n,t,e){return e=e||.5,!t||n&&n.x>t.left-e&&n.x<t.right+e&&n.y>t.top-e&&n.y<t.bottom+e}function Ac(n,t){n.save(),n.beginPath(),n.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),n.clip()}function xc(n){n.restore()}function hC(n,t,e,i,s){if(!t)return n.lineTo(e.x,e.y);if(s==="middle"){const r=(t.x+e.x)/2;n.lineTo(r,t.y),n.lineTo(r,e.y)}else s==="after"!=!!i?n.lineTo(t.x,e.y):n.lineTo(e.x,t.y);n.lineTo(e.x,e.y)}function dC(n,t,e,i){if(!t)return n.lineTo(e.x,e.y);n.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?e.cp2x:e.cp1x,i?e.cp2y:e.cp1y,e.x,e.y)}function fC(n,t){t.translation&&n.translate(t.translation[0],t.translation[1]),X(t.rotation)||n.rotate(t.rotation),t.color&&(n.fillStyle=t.color),t.textAlign&&(n.textAlign=t.textAlign),t.textBaseline&&(n.textBaseline=t.textBaseline)}function pC(n,t,e,i,s){if(s.strikethrough||s.underline){const r=n.measureText(i),o=t-r.actualBoundingBoxLeft,a=t+r.actualBoundingBoxRight,c=e-r.actualBoundingBoxAscent,l=e+r.actualBoundingBoxDescent,h=s.strikethrough?(c+l)/2:l;n.strokeStyle=n.fillStyle,n.beginPath(),n.lineWidth=s.decorationWidth||2,n.moveTo(o,h),n.lineTo(a,h),n.stroke()}}function gC(n,t){const e=n.fillStyle;n.fillStyle=t.color,n.fillRect(t.left,t.top,t.width,t.height),n.fillStyle=e}function Fi(n,t,e,i,s,r={}){const o=_t(t)?t:[t],a=r.strokeWidth>0&&r.strokeColor!=="";let c,l;for(n.save(),n.font=s.string,fC(n,r),c=0;c<o.length;++c)l=o[c],r.backdrop&&gC(n,r.backdrop),a&&(r.strokeColor&&(n.strokeStyle=r.strokeColor),X(r.strokeWidth)||(n.lineWidth=r.strokeWidth),n.strokeText(l,e,i,r.maxWidth)),n.fillText(l,e,i,r.maxWidth),pC(n,e,i,l,r),i+=Number(s.lineHeight);n.restore()}function jr(n,t){const{x:e,y:i,w:s,h:r,radius:o}=t;n.arc(e+o.topLeft,i+o.topLeft,o.topLeft,1.5*rt,rt,!0),n.lineTo(e,i+r-o.bottomLeft),n.arc(e+o.bottomLeft,i+r-o.bottomLeft,o.bottomLeft,rt,xt,!0),n.lineTo(e+s-o.bottomRight,i+r),n.arc(e+s-o.bottomRight,i+r-o.bottomRight,o.bottomRight,xt,0,!0),n.lineTo(e+s,i+o.topRight),n.arc(e+s-o.topRight,i+o.topRight,o.topRight,0,-xt,!0),n.lineTo(e+o.topLeft,i)}const mC=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,_C=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function yC(n,t){const e=(""+n).match(mC);if(!e||e[1]==="normal")return t*1.2;switch(n=+e[2],e[3]){case"px":return n;case"%":n/=100;break}return t*n}const bC=n=>+n||0;function Lh(n,t){const e={},i=nt(t),s=i?Object.keys(t):t,r=nt(n)?i?o=>G(n[o],n[t[o]]):o=>n[o]:()=>n;for(const o of s)e[o]=bC(r(o));return e}function Sb(n){return Lh(n,{top:"y",right:"x",bottom:"y",left:"x"})}function Ri(n){return Lh(n,["topLeft","topRight","bottomLeft","bottomRight"])}function Qt(n){const t=Sb(n);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Dt(n,t){n=n||{},t=t||yt.font;let e=G(n.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let i=G(n.style,t.style);i&&!(""+i).match(_C)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const s={family:G(n.family,t.family),lineHeight:yC(G(n.lineHeight,t.lineHeight),e),size:e,style:i,weight:G(n.weight,t.weight),string:""};return s.string=lC(s),s}function lr(n,t,e,i){let s,r,o;for(s=0,r=n.length;s<r;++s)if(o=n[s],o!==void 0&&o!==void 0)return o}function wC(n,t,e){const{min:i,max:s}=n,r=gb(t,(s-i)/2),o=(a,c)=>e&&a===0?0:a+c;return{min:o(i,-Math.abs(r)),max:o(s,r)}}function li(n,t){return Object.assign(Object.create(n),t)}function Fh(n,t=[""],e,i,s=()=>n[0]){const r=e||n;typeof i>"u"&&(i=kb("_fallback",n));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:n,_rootScopes:r,_fallback:i,_getTarget:s,override:a=>Fh([a,...n],t,r,i)};return new Proxy(o,{deleteProperty(a,c){return delete a[c],delete a._keys,delete n[0][c],!0},get(a,c){return Rb(a,c,()=>PC(c,t,n,a))},getOwnPropertyDescriptor(a,c){return Reflect.getOwnPropertyDescriptor(a._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(n[0])},has(a,c){return Zp(a).includes(c)},ownKeys(a){return Zp(a)},set(a,c,l){const h=a._storage||(a._storage=s());return a[c]=h[c]=l,delete a._keys,!0}})}function vs(n,t,e,i){const s={_cacheable:!1,_proxy:n,_context:t,_subProxy:e,_stack:new Set,_descriptors:Pb(n,i),setContext:r=>vs(n,r,e,i),override:r=>vs(n.override(r),t,e,i)};return new Proxy(s,{deleteProperty(r,o){return delete r[o],delete n[o],!0},get(r,o,a){return Rb(r,o,()=>TC(r,o,a))},getOwnPropertyDescriptor(r,o){return r._descriptors.allKeys?Reflect.has(n,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(n,o)},getPrototypeOf(){return Reflect.getPrototypeOf(n)},has(r,o){return Reflect.has(n,o)},ownKeys(){return Reflect.ownKeys(n)},set(r,o,a){return n[o]=a,delete r[o],!0}})}function Pb(n,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:i=t.indexable,_allKeys:s=t.allKeys}=n;return{allKeys:s,scriptable:e,indexable:i,isScriptable:Jn(e)?e:()=>e,isIndexable:Jn(i)?i:()=>i}}const vC=(n,t)=>n?n+Dh(t):t,Uh=(n,t)=>nt(t)&&n!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Rb(n,t,e){if(Object.prototype.hasOwnProperty.call(n,t)||t==="constructor")return n[t];const i=e();return n[t]=i,i}function TC(n,t,e){const{_proxy:i,_context:s,_subProxy:r,_descriptors:o}=n;let a=i[t];return Jn(a)&&o.isScriptable(t)&&(a=EC(t,a,n,e)),_t(a)&&a.length&&(a=IC(t,a,n,o.isIndexable)),Uh(t,a)&&(a=vs(a,s,r&&r[t],o)),a}function EC(n,t,e,i){const{_proxy:s,_context:r,_subProxy:o,_stack:a}=e;if(a.has(n))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+n);a.add(n);let c=t(r,o||i);return a.delete(n),Uh(n,c)&&(c=Bh(s._scopes,s,n,c)),c}function IC(n,t,e,i){const{_proxy:s,_context:r,_subProxy:o,_descriptors:a}=e;if(typeof r.index<"u"&&i(n))return t[r.index%t.length];if(nt(t[0])){const c=t,l=s._scopes.filter(h=>h!==c);t=[];for(const h of c){const d=Bh(l,s,n,h);t.push(vs(d,r,o&&o[n],a))}}return t}function Cb(n,t,e){return Jn(n)?n(t,e):n}const AC=(n,t)=>n===!0?t:typeof n=="string"?Xn(t,n):void 0;function xC(n,t,e,i,s){for(const r of t){const o=AC(e,r);if(o){n.add(o);const a=Cb(o._fallback,e,s);if(typeof a<"u"&&a!==e&&a!==i)return a}else if(o===!1&&typeof i<"u"&&e!==i)return null}return!1}function Bh(n,t,e,i){const s=t._rootScopes,r=Cb(t._fallback,e,i),o=[...n,...s],a=new Set;a.add(i);let c=Jp(a,o,e,r||e,i);return c===null||typeof r<"u"&&r!==e&&(c=Jp(a,o,r,c,i),c===null)?!1:Fh(Array.from(a),[""],s,r,()=>SC(t,e,i))}function Jp(n,t,e,i,s){for(;e;)e=xC(n,t,e,i,s);return e}function SC(n,t,e){const i=n._getTarget();t in i||(i[t]={});const s=i[t];return _t(s)&&nt(e)?e:s||{}}function PC(n,t,e,i){let s;for(const r of t)if(s=kb(vC(r,n),e),typeof s<"u")return Uh(n,s)?Bh(e,i,n,s):s}function kb(n,t){for(const e of t){if(!e)continue;const i=e[n];if(typeof i<"u")return i}}function Zp(n){let t=n._keys;return t||(t=n._keys=RC(n._scopes)),t}function RC(n){const t=new Set;for(const e of n)for(const i of Object.keys(e).filter(s=>!s.startsWith("_")))t.add(i);return Array.from(t)}function Db(n,t,e,i){const{iScale:s}=n,{key:r="r"}=this._parsing,o=new Array(i);let a,c,l,h;for(a=0,c=i;a<c;++a)l=a+e,h=t[l],o[a]={r:s.parse(Xn(h,r),l)};return o}const CC=Number.EPSILON||1e-14,Ts=(n,t)=>t<n.length&&!n[t].skip&&n[t],Mb=n=>n==="x"?"y":"x";function kC(n,t,e,i){const s=n.skip?t:n,r=t,o=e.skip?t:e,a=su(r,s),c=su(o,r);let l=a/(a+c),h=c/(a+c);l=isNaN(l)?0:l,h=isNaN(h)?0:h;const d=i*l,f=i*h;return{previous:{x:r.x-d*(o.x-s.x),y:r.y-d*(o.y-s.y)},next:{x:r.x+f*(o.x-s.x),y:r.y+f*(o.y-s.y)}}}function DC(n,t,e){const i=n.length;let s,r,o,a,c,l=Ts(n,0);for(let h=0;h<i-1;++h)if(c=l,l=Ts(n,h+1),!(!c||!l)){if(Tr(t[h],0,CC)){e[h]=e[h+1]=0;continue}s=e[h]/t[h],r=e[h+1]/t[h],a=Math.pow(s,2)+Math.pow(r,2),!(a<=9)&&(o=3/Math.sqrt(a),e[h]=s*o*t[h],e[h+1]=r*o*t[h])}}function MC(n,t,e="x"){const i=Mb(e),s=n.length;let r,o,a,c=Ts(n,0);for(let l=0;l<s;++l){if(o=a,a=c,c=Ts(n,l+1),!a)continue;const h=a[e],d=a[i];o&&(r=(h-o[e])/3,a[`cp1${e}`]=h-r,a[`cp1${i}`]=d-r*t[l]),c&&(r=(c[e]-h)/3,a[`cp2${e}`]=h+r,a[`cp2${i}`]=d+r*t[l])}}function OC(n,t="x"){const e=Mb(t),i=n.length,s=Array(i).fill(0),r=Array(i);let o,a,c,l=Ts(n,0);for(o=0;o<i;++o)if(a=c,c=l,l=Ts(n,o+1),!!c){if(l){const h=l[t]-c[t];s[o]=h!==0?(l[e]-c[e])/h:0}r[o]=a?l?He(s[o-1])!==He(s[o])?0:(s[o-1]+s[o])/2:s[o-1]:s[o]}DC(n,s,r),MC(n,r,t)}function Lo(n,t,e){return Math.max(Math.min(n,e),t)}function NC(n,t){let e,i,s,r,o,a=rn(n[0],t);for(e=0,i=n.length;e<i;++e)o=r,r=a,a=e<i-1&&rn(n[e+1],t),r&&(s=n[e],o&&(s.cp1x=Lo(s.cp1x,t.left,t.right),s.cp1y=Lo(s.cp1y,t.top,t.bottom)),a&&(s.cp2x=Lo(s.cp2x,t.left,t.right),s.cp2y=Lo(s.cp2y,t.top,t.bottom)))}function VC(n,t,e,i,s){let r,o,a,c;if(t.spanGaps&&(n=n.filter(l=>!l.skip)),t.cubicInterpolationMode==="monotone")OC(n,s);else{let l=i?n[n.length-1]:n[0];for(r=0,o=n.length;r<o;++r)a=n[r],c=kC(l,a,n[Math.min(r+1,o-(i?0:1))%o],t.tension),a.cp1x=c.previous.x,a.cp1y=c.previous.y,a.cp2x=c.next.x,a.cp2y=c.next.y,l=a}t.capBezierPoints&&NC(n,e)}function zh(){return typeof window<"u"&&typeof document<"u"}function $h(n){let t=n.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function $a(n,t,e){let i;return typeof n=="string"?(i=parseInt(n,10),n.indexOf("%")!==-1&&(i=i/100*t.parentNode[e])):i=n,i}const Sc=n=>n.ownerDocument.defaultView.getComputedStyle(n,null);function LC(n,t){return Sc(n).getPropertyValue(t)}const FC=["top","right","bottom","left"];function Ci(n,t,e){const i={};e=e?"-"+e:"";for(let s=0;s<4;s++){const r=FC[s];i[r]=parseFloat(n[t+"-"+r+e])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const UC=(n,t,e)=>(n>0||t>0)&&(!e||!e.shadowRoot);function BC(n,t){const e=n.touches,i=e&&e.length?e[0]:n,{offsetX:s,offsetY:r}=i;let o=!1,a,c;if(UC(s,r,n.target))a=s,c=r;else{const l=t.getBoundingClientRect();a=i.clientX-l.left,c=i.clientY-l.top,o=!0}return{x:a,y:c,box:o}}function vi(n,t){if("native"in n)return n;const{canvas:e,currentDevicePixelRatio:i}=t,s=Sc(e),r=s.boxSizing==="border-box",o=Ci(s,"padding"),a=Ci(s,"border","width"),{x:c,y:l,box:h}=BC(n,e),d=o.left+(h&&a.left),f=o.top+(h&&a.top);let{width:m,height:_}=t;return r&&(m-=o.width+a.width,_-=o.height+a.height),{x:Math.round((c-d)/m*e.width/i),y:Math.round((l-f)/_*e.height/i)}}function zC(n,t,e){let i,s;if(t===void 0||e===void 0){const r=n&&$h(n);if(!r)t=n.clientWidth,e=n.clientHeight;else{const o=r.getBoundingClientRect(),a=Sc(r),c=Ci(a,"border","width"),l=Ci(a,"padding");t=o.width-l.width-c.width,e=o.height-l.height-c.height,i=$a(a.maxWidth,r,"clientWidth"),s=$a(a.maxHeight,r,"clientHeight")}}return{width:t,height:e,maxWidth:i||Ba,maxHeight:s||Ba}}const Nn=n=>Math.round(n*10)/10;function $C(n,t,e,i){const s=Sc(n),r=Ci(s,"margin"),o=$a(s.maxWidth,n,"clientWidth")||Ba,a=$a(s.maxHeight,n,"clientHeight")||Ba,c=zC(n,t,e);let{width:l,height:h}=c;if(s.boxSizing==="content-box"){const f=Ci(s,"border","width"),m=Ci(s,"padding");l-=m.width+f.width,h-=m.height+f.height}return l=Math.max(0,l-r.width),h=Math.max(0,i?l/i:h-r.height),l=Nn(Math.min(l,o,c.maxWidth)),h=Nn(Math.min(h,a,c.maxHeight)),l&&!h&&(h=Nn(l/2)),(t!==void 0||e!==void 0)&&i&&c.height&&h>c.height&&(h=c.height,l=Nn(Math.floor(h*i))),{width:l,height:h}}function tg(n,t,e){const i=t||1,s=Nn(n.height*i),r=Nn(n.width*i);n.height=Nn(n.height),n.width=Nn(n.width);const o=n.canvas;return o.style&&(e||!o.style.height&&!o.style.width)&&(o.style.height=`${n.height}px`,o.style.width=`${n.width}px`),n.currentDevicePixelRatio!==i||o.height!==s||o.width!==r?(n.currentDevicePixelRatio=i,o.height=s,o.width=r,n.ctx.setTransform(i,0,0,i,0,0),!0):!1}const jC=function(){let n=!1;try{const t={get passive(){return n=!0,!1}};zh()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return n}();function eg(n,t){const e=LC(n,t),i=e&&e.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function Ti(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:n.y+e*(t.y-n.y)}}function HC(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:i==="middle"?e<.5?n.y:t.y:i==="after"?e<1?n.y:t.y:e>0?t.y:n.y}}function WC(n,t,e,i){const s={x:n.cp2x,y:n.cp2y},r={x:t.cp1x,y:t.cp1y},o=Ti(n,s,e),a=Ti(s,r,e),c=Ti(r,t,e),l=Ti(o,a,e),h=Ti(a,c,e);return Ti(l,h,e)}const qC=function(n,t){return{x(e){return n+n+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,i){return e-i},leftForLtr(e,i){return e-i}}},GC=function(){return{x(n){return n},setWidth(n){},textAlign(n){return n},xPlus(n,t){return n+t},leftForLtr(n,t){return n}}};function ls(n,t,e){return n?qC(t,e):GC()}function Ob(n,t){let e,i;(t==="ltr"||t==="rtl")&&(e=n.canvas.style,i=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),n.prevTextDirection=i)}function Nb(n,t){t!==void 0&&(delete n.prevTextDirection,n.canvas.style.setProperty("direction",t[0],t[1]))}function Vb(n){return n==="angle"?{between:$r,compare:KR,normalize:Gt}:{between:nn,compare:(t,e)=>t-e,normalize:t=>t}}function ng({start:n,end:t,count:e,loop:i,style:s}){return{start:n%e,end:t%e,loop:i&&(t-n+1)%e===0,style:s}}function KC(n,t,e){const{property:i,start:s,end:r}=e,{between:o,normalize:a}=Vb(i),c=t.length;let{start:l,end:h,loop:d}=n,f,m;if(d){for(l+=c,h+=c,f=0,m=c;f<m&&o(a(t[l%c][i]),s,r);++f)l--,h--;l%=c,h%=c}return h<l&&(h+=c),{start:l,end:h,loop:d,style:n.style}}function Lb(n,t,e){if(!e)return[n];const{property:i,start:s,end:r}=e,o=t.length,{compare:a,between:c,normalize:l}=Vb(i),{start:h,end:d,loop:f,style:m}=KC(n,t,e),_=[];let b=!1,v=null,S,R,D;const N=()=>c(s,D,S)&&a(s,D)!==0,M=()=>a(r,S)===0||c(r,D,S),L=()=>b||N(),E=()=>!b||M();for(let w=h,T=h;w<=d;++w)R=t[w%o],!R.skip&&(S=l(R[i]),S!==D&&(b=c(S,s,r),v===null&&L()&&(v=a(S,s)===0?w:T),v!==null&&E()&&(_.push(ng({start:v,end:w,loop:f,count:o,style:m})),v=null),T=w,D=S));return v!==null&&_.push(ng({start:v,end:d,loop:f,count:o,style:m})),_}function Fb(n,t){const e=[],i=n.segments;for(let s=0;s<i.length;s++){const r=Lb(i[s],n.points,t);r.length&&e.push(...r)}return e}function YC(n,t,e,i){let s=0,r=t-1;if(e&&!i)for(;s<t&&!n[s].skip;)s++;for(;s<t&&n[s].skip;)s++;for(s%=t,e&&(r+=s);r>s&&n[r%t].skip;)r--;return r%=t,{start:s,end:r}}function QC(n,t,e,i){const s=n.length,r=[];let o=t,a=n[t],c;for(c=t+1;c<=e;++c){const l=n[c%s];l.skip||l.stop?a.skip||(i=!1,r.push({start:t%s,end:(c-1)%s,loop:i}),t=o=l.stop?c:null):(o=c,a.skip&&(t=c)),a=l}return o!==null&&r.push({start:t%s,end:o%s,loop:i}),r}function XC(n,t){const e=n.points,i=n.options.spanGaps,s=e.length;if(!s)return[];const r=!!n._loop,{start:o,end:a}=YC(e,s,r,i);if(i===!0)return ig(n,[{start:o,end:a,loop:r}],e,t);const c=a<o?a+s:a,l=!!n._fullLoop&&o===0&&a===s-1;return ig(n,QC(e,o,c,l),e,t)}function ig(n,t,e,i){return!i||!i.setContext||!e?t:JC(n,t,e,i)}function JC(n,t,e,i){const s=n._chart.getContext(),r=sg(n.options),{_datasetIndex:o,options:{spanGaps:a}}=n,c=e.length,l=[];let h=r,d=t[0].start,f=d;function m(_,b,v,S){const R=a?-1:1;if(_!==b){for(_+=c;e[_%c].skip;)_-=R;for(;e[b%c].skip;)b+=R;_%c!==b%c&&(l.push({start:_%c,end:b%c,loop:v,style:S}),h=S,d=b%c)}}for(const _ of t){d=a?d:_.start;let b=e[d%c],v;for(f=d+1;f<=_.end;f++){const S=e[f%c];v=sg(i.setContext(li(s,{type:"segment",p0:b,p1:S,p0DataIndex:(f-1)%c,p1DataIndex:f%c,datasetIndex:o}))),ZC(v,h)&&m(d,f-1,_.loop,h),b=S,h=v}d<f-1&&m(d,f-1,_.loop,h)}return l}function sg(n){return{backgroundColor:n.backgroundColor,borderCapStyle:n.borderCapStyle,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderJoinStyle:n.borderJoinStyle,borderWidth:n.borderWidth,borderColor:n.borderColor}}function ZC(n,t){if(!t)return!1;const e=[],i=function(s,r){return Vh(r)?(e.includes(r)||e.push(r),e.indexOf(r)):r};return JSON.stringify(n,i)!==JSON.stringify(t,i)}function Fo(n,t,e){return n.options.clip?n[e]:t[e]}function tk(n,t){const{xScale:e,yScale:i}=n;return e&&i?{left:Fo(e,t,"left"),right:Fo(e,t,"right"),top:Fo(i,t,"top"),bottom:Fo(i,t,"bottom")}:t}function Ub(n,t){const e=t._clip;if(e.disabled)return!1;const i=tk(t,n.chartArea);return{left:e.left===!1?0:i.left-(e.left===!0?0:e.left),right:e.right===!1?n.width:i.right+(e.right===!0?0:e.right),top:e.top===!1?0:i.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?n.height:i.bottom+(e.bottom===!0?0:e.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class ek{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,i,s){const r=e.listeners[s],o=e.duration;r.forEach(a=>a({chart:t,initial:e.initial,numSteps:o,currentStep:Math.min(i-e.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=vb.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;const r=i.items;let o=r.length-1,a=!1,c;for(;o>=0;--o)c=r[o],c._active?(c._total>i.duration&&(i.duration=c._total),c.tick(t),a=!0):(r[o]=r[r.length-1],r.pop());a&&(s.draw(),this._notify(s,i,t,"progress")),r.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),e+=r.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let i=e.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,i)),i}listen(t,e,i){this._getAnims(t).listeners[e].push(i)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const i=e.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Xe=new ek;const rg="transparent",nk={boolean(n,t,e){return e>.5?t:n},color(n,t,e){const i=Yp(n||rg),s=i.valid&&Yp(t||rg);return s&&s.valid?s.mix(i,e).hexString():t},number(n,t,e){return n+(t-n)*e}};class ik{constructor(t,e,i,s){const r=e[i];s=lr([t.to,s,r,t.from]);const o=lr([t.from,r,s]);this._active=!0,this._fn=t.fn||nk[t.type||typeof o],this._easing=Er[t.easing]||Er.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=i,this._from=o,this._to=s,this._promises=void 0}active(){return this._active}update(t,e,i){if(this._active){this._notify(!1);const s=this._target[this._prop],r=i-this._start,o=this._duration-r;this._start=i,this._duration=Math.floor(Math.max(o,t.duration)),this._total+=r,this._loop=!!t.loop,this._to=lr([t.to,e,s,t.from]),this._from=lr([t.from,s,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,i=this._duration,s=this._prop,r=this._from,o=this._loop,a=this._to;let c;if(this._active=r!==a&&(o||e<i),!this._active){this._target[s]=a,this._notify(!0);return}if(e<0){this._target[s]=r;return}c=e/i%2,c=o&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[s]=this._fn(r,a,c)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,i)=>{t.push({res:e,rej:i})})}_notify(t){const e=t?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][e]()}}class Bb{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!nt(t))return;const e=Object.keys(yt.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{const r=t[s];if(!nt(r))return;const o={};for(const a of e)o[a]=r[a];(_t(r.properties)&&r.properties||[s]).forEach(a=>{(a===s||!i.has(a))&&i.set(a,o)})})}_animateOptions(t,e){const i=e.options,s=rk(t,i);if(!s)return[];const r=this._createAnimations(s,i);return i.$shared&&sk(t.options.$animations,i).then(()=>{t.options=i},()=>{}),r}_createAnimations(t,e){const i=this._properties,s=[],r=t.$animations||(t.$animations={}),o=Object.keys(e),a=Date.now();let c;for(c=o.length-1;c>=0;--c){const l=o[c];if(l.charAt(0)==="$")continue;if(l==="options"){s.push(...this._animateOptions(t,e));continue}const h=e[l];let d=r[l];const f=i.get(l);if(d)if(f&&d.active()){d.update(f,h,a);continue}else d.cancel();if(!f||!f.duration){t[l]=h;continue}r[l]=d=new ik(f,t,l,h),s.push(d)}return s}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const i=this._createAnimations(t,e);if(i.length)return Xe.add(this._chart,i),!0}}function sk(n,t){const e=[],i=Object.keys(t);for(let s=0;s<i.length;s++){const r=n[i[s]];r&&r.active()&&e.push(r.wait())}return Promise.all(e)}function rk(n,t){if(!t)return;let e=n.options;if(!e){n.options=t;return}return e.$shared&&(n.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function og(n,t){const e=n&&n.options||{},i=e.reverse,s=e.min===void 0?t:0,r=e.max===void 0?t:0;return{start:i?r:s,end:i?s:r}}function ok(n,t,e){if(e===!1)return!1;const i=og(n,e),s=og(t,e);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function ak(n){let t,e,i,s;return nt(n)?(t=n.top,e=n.right,i=n.bottom,s=n.left):t=e=i=s=n,{top:t,right:e,bottom:i,left:s,disabled:n===!1}}function zb(n,t){const e=[],i=n._getSortedDatasetMetas(t);let s,r;for(s=0,r=i.length;s<r;++s)e.push(i[s].index);return e}function ag(n,t,e,i={}){const s=n.keys,r=i.mode==="single";let o,a,c,l;if(t===null)return;let h=!1;for(o=0,a=s.length;o<a;++o){if(c=+s[o],c===e){if(h=!0,i.all)continue;break}l=n.values[c],Et(l)&&(r||t===0||He(t)===He(l))&&(t+=l)}return!h&&!i.all?0:t}function ck(n,t){const{iScale:e,vScale:i}=t,s=e.axis==="x"?"x":"y",r=i.axis==="x"?"x":"y",o=Object.keys(n),a=new Array(o.length);let c,l,h;for(c=0,l=o.length;c<l;++c)h=o[c],a[c]={[s]:h,[r]:n[h]};return a}function yl(n,t){const e=n&&n.options.stacked;return e||e===void 0&&t.stack!==void 0}function lk(n,t,e){return`${n.id}.${t.id}.${e.stack||e.type}`}function uk(n){const{min:t,max:e,minDefined:i,maxDefined:s}=n.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:s?e:Number.POSITIVE_INFINITY}}function hk(n,t,e){const i=n[t]||(n[t]={});return i[e]||(i[e]={})}function cg(n,t,e,i){for(const s of t.getMatchingVisibleMetas(i).reverse()){const r=n[s.index];if(e&&r>0||!e&&r<0)return s.index}return null}function lg(n,t){const{chart:e,_cachedMeta:i}=n,s=e._stacks||(e._stacks={}),{iScale:r,vScale:o,index:a}=i,c=r.axis,l=o.axis,h=lk(r,o,i),d=t.length;let f;for(let m=0;m<d;++m){const _=t[m],{[c]:b,[l]:v}=_,S=_._stacks||(_._stacks={});f=S[l]=hk(s,h,b),f[a]=v,f._top=cg(f,o,!0,i.type),f._bottom=cg(f,o,!1,i.type);const R=f._visualValues||(f._visualValues={});R[a]=v}}function bl(n,t){const e=n.scales;return Object.keys(e).filter(i=>e[i].axis===t).shift()}function dk(n,t){return li(n,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function fk(n,t,e){return li(n,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function Xs(n,t){const e=n.controller.index,i=n.vScale&&n.vScale.axis;if(i){t=t||n._parsed;for(const s of t){const r=s._stacks;if(!r||r[i]===void 0||r[i][e]===void 0)return;delete r[i][e],r[i]._visualValues!==void 0&&r[i]._visualValues[e]!==void 0&&delete r[i]._visualValues[e]}}}const wl=n=>n==="reset"||n==="none",ug=(n,t)=>t?n:Object.assign({},n),pk=(n,t,e)=>n&&!t.hidden&&t._stacked&&{keys:zb(e,!0),values:null};class Ae{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=yl(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Xs(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,i=this.getDataset(),s=(d,f,m,_)=>d==="x"?f:d==="r"?_:m,r=e.xAxisID=G(i.xAxisID,bl(t,"x")),o=e.yAxisID=G(i.yAxisID,bl(t,"y")),a=e.rAxisID=G(i.rAxisID,bl(t,"r")),c=e.indexAxis,l=e.iAxisID=s(c,r,o,a),h=e.vAxisID=s(c,o,r,a);e.xScale=this.getScaleForId(r),e.yScale=this.getScaleForId(o),e.rScale=this.getScaleForId(a),e.iScale=this.getScaleForId(l),e.vScale=this.getScaleForId(h)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&qp(this._data,this),t._stacked&&Xs(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),i=this._data;if(nt(e)){const s=this._cachedMeta;this._data=ck(e,s)}else if(i!==e){if(i){qp(i,this);const s=this._cachedMeta;Xs(s),s._parsed=[]}e&&Object.isExtensible(e)&&JR(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const r=e._stacked;e._stacked=yl(e.vScale,e),e.stack!==i.stack&&(s=!0,Xs(e),e.stack=i.stack),this._resyncElements(t),(s||r!==e._stacked)&&(lg(this,e._parsed),e._stacked=yl(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:i,_data:s}=this,{iScale:r,_stacked:o}=i,a=r.axis;let c=t===0&&e===s.length?!0:i._sorted,l=t>0&&i._parsed[t-1],h,d,f;if(this._parsing===!1)i._parsed=s,i._sorted=!0,f=s;else{_t(s[t])?f=this.parseArrayData(i,s,t,e):nt(s[t])?f=this.parseObjectData(i,s,t,e):f=this.parsePrimitiveData(i,s,t,e);const m=()=>d[a]===null||l&&d[a]<l[a];for(h=0;h<e;++h)i._parsed[h+t]=d=f[h],c&&(m()&&(c=!1),l=d);i._sorted=c}o&&lg(this,f)}parsePrimitiveData(t,e,i,s){const{iScale:r,vScale:o}=t,a=r.axis,c=o.axis,l=r.getLabels(),h=r===o,d=new Array(s);let f,m,_;for(f=0,m=s;f<m;++f)_=f+i,d[f]={[a]:h||r.parse(l[_],_),[c]:o.parse(e[_],_)};return d}parseArrayData(t,e,i,s){const{xScale:r,yScale:o}=t,a=new Array(s);let c,l,h,d;for(c=0,l=s;c<l;++c)h=c+i,d=e[h],a[c]={x:r.parse(d[0],h),y:o.parse(d[1],h)};return a}parseObjectData(t,e,i,s){const{xScale:r,yScale:o}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=new Array(s);let h,d,f,m;for(h=0,d=s;h<d;++h)f=h+i,m=e[f],l[h]={x:r.parse(Xn(m,a),f),y:o.parse(Xn(m,c),f)};return l}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,i){const s=this.chart,r=this._cachedMeta,o=e[t.axis],a={keys:zb(s,!0),values:e._stacks[t.axis]._visualValues};return ag(a,o,r.index,{mode:i})}updateRangeFromParsed(t,e,i,s){const r=i[e.axis];let o=r===null?NaN:r;const a=s&&i._stacks[e.axis];s&&a&&(s.values=a,o=ag(s,r,this._cachedMeta.index)),t.min=Math.min(t.min,o),t.max=Math.max(t.max,o)}getMinMax(t,e){const i=this._cachedMeta,s=i._parsed,r=i._sorted&&t===i.iScale,o=s.length,a=this._getOtherScale(t),c=pk(e,i,this.chart),l={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:h,max:d}=uk(a);let f,m;function _(){m=s[f];const b=m[a.axis];return!Et(m[t.axis])||h>b||d<b}for(f=0;f<o&&!(!_()&&(this.updateRangeFromParsed(l,t,m,c),r));++f);if(r){for(f=o-1;f>=0;--f)if(!_()){this.updateRangeFromParsed(l,t,m,c);break}}return l}getAllParsedValues(t){const e=this._cachedMeta._parsed,i=[];let s,r,o;for(s=0,r=e.length;s<r;++s)o=e[s][t.axis],Et(o)&&i.push(o);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,i=e.iScale,s=e.vScale,r=this.getParsed(t);return{label:i?""+i.getLabelForValue(r[i.axis]):"",value:s?""+s.getLabelForValue(r[s.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=ak(G(this.options.clip,ok(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,i=this._cachedMeta,s=i.data||[],r=e.chartArea,o=[],a=this._drawStart||0,c=this._drawCount||s.length-a,l=this.options.drawActiveElementsOnTop;let h;for(i.dataset&&i.dataset.draw(t,r,a,c),h=a;h<a+c;++h){const d=s[h];d.hidden||(d.active&&l?o.push(d):d.draw(t,r))}for(h=0;h<o.length;++h)o[h].draw(t,r)}getStyle(t,e){const i=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,e,i){const s=this.getDataset();let r;if(t>=0&&t<this._cachedMeta.data.length){const o=this._cachedMeta.data[t];r=o.$context||(o.$context=fk(this.getContext(),t,o)),r.parsed=this.getParsed(t),r.raw=s.data[t],r.index=r.dataIndex=t}else r=this.$context||(this.$context=dk(this.chart.getContext(),this.index)),r.dataset=s,r.index=r.datasetIndex=this.index;return r.active=!!e,r.mode=i,r}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",i){const s=e==="active",r=this._cachedDataOpts,o=t+"-"+e,a=r[o],c=this.enableOptionSharing&&zr(i);if(a)return ug(a,c);const l=this.chart.config,h=l.datasetElementScopeKeys(this._type,t),d=s?[`${t}Hover`,"hover",t,""]:[t,""],f=l.getOptionScopes(this.getDataset(),h),m=Object.keys(yt.elements[t]),_=()=>this.getContext(i,s,e),b=l.resolveNamedOptions(f,m,_,d);return b.$shared&&(b.$shared=c,r[o]=Object.freeze(ug(b,c))),b}_resolveAnimations(t,e,i){const s=this.chart,r=this._cachedDataOpts,o=`animation-${e}`,a=r[o];if(a)return a;let c;if(s.options.animation!==!1){const h=this.chart.config,d=h.datasetAnimationScopeKeys(this._type,e),f=h.getOptionScopes(this.getDataset(),d);c=h.createResolver(f,this.getContext(t,i,e))}const l=new Bb(s,c&&c.animations);return c&&c._cacheable&&(r[o]=Object.freeze(l)),l}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||wl(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const i=this.resolveDataElementOptions(t,e),s=this._sharedOptions,r=this.getSharedOptions(i),o=this.includeOptions(e,r)||r!==s;return this.updateSharedOptions(r,e,i),{sharedOptions:r,includeOptions:o}}updateElement(t,e,i,s){wl(s)?Object.assign(t,i):this._resolveAnimations(e,s).update(t,i)}updateSharedOptions(t,e,i){t&&!wl(e)&&this._resolveAnimations(void 0,e).update(t,i)}_setStyle(t,e,i,s){t.active=s;const r=this.getStyle(e,s);this._resolveAnimations(e,i,s).update(t,{options:!s&&this.getSharedOptions(r)||r})}removeHoverStyle(t,e,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,e,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,i=this._cachedMeta.data;for(const[a,c,l]of this._syncList)this[a](c,l);this._syncList=[];const s=i.length,r=e.length,o=Math.min(r,s);o&&this.parse(0,o),r>s?this._insertElements(s,r-s,t):r<s&&this._removeElements(r,s-r)}_insertElements(t,e,i=!0){const s=this._cachedMeta,r=s.data,o=t+e;let a;const c=l=>{for(l.length+=e,a=l.length-1;a>=o;a--)l[a]=l[a-e]};for(c(r),a=t;a<o;++a)r[a]=new this.dataElementType;this._parsing&&c(s._parsed),this.parse(t,e),i&&this.updateElements(r,t,e,"reset")}updateElements(t,e,i,s){}_removeElements(t,e){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,e);i._stacked&&Xs(i,s)}i.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,i,s]=t;this[e](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}U(Ae,"defaults",{}),U(Ae,"datasetElementType",null),U(Ae,"dataElementType",null);function gk(n,t){if(!n._cache.$bar){const e=n.getMatchingVisibleMetas(t);let i=[];for(let s=0,r=e.length;s<r;s++)i=i.concat(e[s].controller.getAllParsedValues(n));n._cache.$bar=wb(i.sort((s,r)=>s-r))}return n._cache.$bar}function mk(n){const t=n.iScale,e=gk(t,n.type);let i=t._length,s,r,o,a;const c=()=>{o===32767||o===-32768||(zr(a)&&(i=Math.min(i,Math.abs(o-a)||i)),a=o)};for(s=0,r=e.length;s<r;++s)o=t.getPixelForValue(e[s]),c();for(a=void 0,s=0,r=t.ticks.length;s<r;++s)o=t.getPixelForTick(s),c();return i}function _k(n,t,e,i){const s=e.barThickness;let r,o;return X(s)?(r=t.min*e.categoryPercentage,o=e.barPercentage):(r=s*i,o=1),{chunk:r/i,ratio:o,start:t.pixels[n]-r/2}}function yk(n,t,e,i){const s=t.pixels,r=s[n];let o=n>0?s[n-1]:null,a=n<s.length-1?s[n+1]:null;const c=e.categoryPercentage;o===null&&(o=r-(a===null?t.end-t.start:a-r)),a===null&&(a=r+r-o);const l=r-(r-Math.min(o,a))/2*c;return{chunk:Math.abs(a-o)/2*c/i,ratio:e.barPercentage,start:l}}function bk(n,t,e,i){const s=e.parse(n[0],i),r=e.parse(n[1],i),o=Math.min(s,r),a=Math.max(s,r);let c=o,l=a;Math.abs(o)>Math.abs(a)&&(c=a,l=o),t[e.axis]=l,t._custom={barStart:c,barEnd:l,start:s,end:r,min:o,max:a}}function $b(n,t,e,i){return _t(n)?bk(n,t,e,i):t[e.axis]=e.parse(n,i),t}function hg(n,t,e,i){const s=n.iScale,r=n.vScale,o=s.getLabels(),a=s===r,c=[];let l,h,d,f;for(l=e,h=e+i;l<h;++l)f=t[l],d={},d[s.axis]=a||s.parse(o[l],l),c.push($b(f,d,r,l));return c}function vl(n){return n&&n.barStart!==void 0&&n.barEnd!==void 0}function wk(n,t,e){return n!==0?He(n):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function vk(n){let t,e,i,s,r;return n.horizontal?(t=n.base>n.x,e="left",i="right"):(t=n.base<n.y,e="bottom",i="top"),t?(s="end",r="start"):(s="start",r="end"),{start:e,end:i,reverse:t,top:s,bottom:r}}function Tk(n,t,e,i){let s=t.borderSkipped;const r={};if(!s){n.borderSkipped=r;return}if(s===!0){n.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:o,end:a,reverse:c,top:l,bottom:h}=vk(n);s==="middle"&&e&&(n.enableBorderRadius=!0,(e._top||0)===i?s=l:(e._bottom||0)===i?s=h:(r[dg(h,o,a,c)]=!0,s=l)),r[dg(s,o,a,c)]=!0,n.borderSkipped=r}function dg(n,t,e,i){return i?(n=Ek(n,t,e),n=fg(n,e,t)):n=fg(n,t,e),n}function Ek(n,t,e){return n===t?e:n===e?t:n}function fg(n,t,e){return n==="start"?t:n==="end"?e:n}function Ik(n,{inflateAmount:t},e){n.inflateAmount=t==="auto"?e===1?.33:0:t}class na extends Ae{parsePrimitiveData(t,e,i,s){return hg(t,e,i,s)}parseArrayData(t,e,i,s){return hg(t,e,i,s)}parseObjectData(t,e,i,s){const{iScale:r,vScale:o}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=r.axis==="x"?a:c,h=o.axis==="x"?a:c,d=[];let f,m,_,b;for(f=i,m=i+s;f<m;++f)b=e[f],_={},_[r.axis]=r.parse(Xn(b,l),f),d.push($b(Xn(b,h),_,o,f));return d}updateRangeFromParsed(t,e,i,s){super.updateRangeFromParsed(t,e,i,s);const r=i._custom;r&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,r.min),t.max=Math.max(t.max,r.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:i,vScale:s}=e,r=this.getParsed(t),o=r._custom,a=vl(o)?"["+o.start+", "+o.end+"]":""+s.getLabelForValue(r[s.axis]);return{label:""+i.getLabelForValue(r[i.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,i,s){const r=s==="reset",{index:o,_cachedMeta:{vScale:a}}=this,c=a.getBasePixel(),l=a.isHorizontal(),h=this._getRuler(),{sharedOptions:d,includeOptions:f}=this._getSharedOptions(e,s);for(let m=e;m<e+i;m++){const _=this.getParsed(m),b=r||X(_[a.axis])?{base:c,head:c}:this._calculateBarValuePixels(m),v=this._calculateBarIndexPixels(m,h),S=(_._stacks||{})[a.axis],R={horizontal:l,base:b.base,enableBorderRadius:!S||vl(_._custom)||o===S._top||o===S._bottom,x:l?b.head:v.center,y:l?v.center:b.head,height:l?v.size:Math.abs(b.size),width:l?Math.abs(b.size):v.size};f&&(R.options=d||this.resolveDataElementOptions(m,t[m].active?"active":s));const D=R.options||t[m].options;Tk(R,D,S,o),Ik(R,D,h.ratio),this.updateElement(t[m],m,R,s)}}_getStacks(t,e){const{iScale:i}=this._cachedMeta,s=i.getMatchingVisibleMetas(this._type).filter(h=>h.controller.options.grouped),r=i.options.stacked,o=[],a=this._cachedMeta.controller.getParsed(e),c=a&&a[i.axis],l=h=>{const d=h._parsed.find(m=>m[i.axis]===c),f=d&&d[h.vScale.axis];if(X(f)||isNaN(f))return!0};for(const h of s)if(!(e!==void 0&&l(h))&&((r===!1||o.indexOf(h.stack)===-1||r===void 0&&h.stack===void 0)&&o.push(h.stack),h.index===t))break;return o.length||o.push(void 0),o}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===e).shift()}_getAxis(){const t={},e=this.getFirstScaleIdForIndexAxis();for(const i of this.chart.data.datasets)t[G(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,i){const s=this._getStacks(t,i),r=e!==void 0?s.indexOf(e):-1;return r===-1?s.length-1:r}_getRuler(){const t=this.options,e=this._cachedMeta,i=e.iScale,s=[];let r,o;for(r=0,o=e.data.length;r<o;++r)s.push(i.getPixelForValue(this.getParsed(r)[i.axis],r));const a=t.barThickness;return{min:a||mk(e),pixels:s,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:i,index:s},options:{base:r,minBarLength:o}}=this,a=r||0,c=this.getParsed(t),l=c._custom,h=vl(l);let d=c[e.axis],f=0,m=i?this.applyStack(e,c,i):d,_,b;m!==d&&(f=m-d,m=d),h&&(d=l.barStart,m=l.barEnd-l.barStart,d!==0&&He(d)!==He(l.barEnd)&&(f=0),f+=d);const v=!X(r)&&!h?r:f;let S=e.getPixelForValue(v);if(this.chart.getDataVisibility(t)?_=e.getPixelForValue(f+m):_=S,b=_-S,Math.abs(b)<o){b=wk(b,e,a)*o,d===a&&(S-=b/2);const R=e.getPixelForDecimal(0),D=e.getPixelForDecimal(1),N=Math.min(R,D),M=Math.max(R,D);S=Math.max(Math.min(S,M),N),_=S+b,i&&!h&&(c._stacks[e.axis]._visualValues[s]=e.getValueForPixel(_)-e.getValueForPixel(S))}if(S===e.getPixelForValue(a)){const R=He(b)*e.getLineWidthForValue(a)/2;S+=R,b-=R}return{size:b,base:S,head:_,center:_+b/2}}_calculateBarIndexPixels(t,e){const i=e.scale,s=this.options,r=s.skipNull,o=G(s.maxBarThickness,1/0);let a,c;const l=this._getAxisCount();if(e.grouped){const h=r?this._getStackCount(t):e.stackCount,d=s.barThickness==="flex"?yk(t,e,s,h*l):_k(t,e,s,h*l),f=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,m=this._getAxis().indexOf(G(f,this.getFirstScaleIdForIndexAxis())),_=this._getStackIndex(this.index,this._cachedMeta.stack,r?t:void 0)+m;a=d.start+d.chunk*_+d.chunk/2,c=Math.min(o,d.chunk*d.ratio)}else a=i.getPixelForValue(this.getParsed(t)[i.axis],t),c=Math.min(o,e.min*e.ratio);return{base:a-c/2,head:a+c/2,center:a,size:c}}draw(){const t=this._cachedMeta,e=t.vScale,i=t.data,s=i.length;let r=0;for(;r<s;++r)this.getParsed(r)[e.axis]!==null&&!i[r].hidden&&i[r].draw(this._ctx)}}U(na,"id","bar"),U(na,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),U(na,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class ia extends Ae{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,i,s){const r=super.parsePrimitiveData(t,e,i,s);for(let o=0;o<r.length;o++)r[o]._custom=this.resolveDataElementOptions(o+i).radius;return r}parseArrayData(t,e,i,s){const r=super.parseArrayData(t,e,i,s);for(let o=0;o<r.length;o++){const a=e[i+o];r[o]._custom=G(a[2],this.resolveDataElementOptions(o+i).radius)}return r}parseObjectData(t,e,i,s){const r=super.parseObjectData(t,e,i,s);for(let o=0;o<r.length;o++){const a=e[i+o];r[o]._custom=G(a&&a.r&&+a.r,this.resolveDataElementOptions(o+i).radius)}return r}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let i=t.length-1;i>=0;--i)e=Math.max(e,t[i].size(this.resolveDataElementOptions(i))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:r}=e,o=this.getParsed(t),a=s.getLabelForValue(o.x),c=r.getLabelForValue(o.y),l=o._custom;return{label:i[t]||"",value:"("+a+", "+c+(l?", "+l:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,i,s){const r=s==="reset",{iScale:o,vScale:a}=this._cachedMeta,{sharedOptions:c,includeOptions:l}=this._getSharedOptions(e,s),h=o.axis,d=a.axis;for(let f=e;f<e+i;f++){const m=t[f],_=!r&&this.getParsed(f),b={},v=b[h]=r?o.getPixelForDecimal(.5):o.getPixelForValue(_[h]),S=b[d]=r?a.getBasePixel():a.getPixelForValue(_[d]);b.skip=isNaN(v)||isNaN(S),l&&(b.options=c||this.resolveDataElementOptions(f,m.active?"active":s),r&&(b.options.radius=0)),this.updateElement(m,f,b,s)}}resolveDataElementOptions(t,e){const i=this.getParsed(t);let s=super.resolveDataElementOptions(t,e);s.$shared&&(s=Object.assign({},s,{$shared:!1}));const r=s.radius;return e!=="active"&&(s.radius=0),s.radius+=G(i&&i._custom,r),s}}U(ia,"id","bubble"),U(ia,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),U(ia,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function Ak(n,t,e){let i=1,s=1,r=0,o=0;if(t<mt){const a=n,c=a+t,l=Math.cos(a),h=Math.sin(a),d=Math.cos(c),f=Math.sin(c),m=(D,N,M)=>$r(D,a,c,!0)?1:Math.max(N,N*e,M,M*e),_=(D,N,M)=>$r(D,a,c,!0)?-1:Math.min(N,N*e,M,M*e),b=m(0,l,d),v=m(xt,h,f),S=_(rt,l,d),R=_(rt+xt,h,f);i=(b-S)/2,s=(v-R)/2,r=-(b+S)/2,o=-(v+R)/2}return{ratioX:i,ratioY:s,offsetX:r,offsetY:o}}class xi extends Ae{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const i=this.getDataset().data,s=this._cachedMeta;if(this._parsing===!1)s._parsed=i;else{let r=c=>+i[c];if(nt(i[t])){const{key:c="value"}=this._parsing;r=l=>+Xn(i[l],c)}let o,a;for(o=t,a=t+e;o<a;++o)s._parsed[o]=r(o)}}_getRotation(){return Ee(this.options.rotation-90)}_getCircumference(){return Ee(this.options.circumference)}_getRotationExtents(){let t=mt,e=-mt;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const s=this.chart.getDatasetMeta(i).controller,r=s._getRotation(),o=s._getCircumference();t=Math.min(t,r),e=Math.max(e,r+o)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:i}=e,s=this._cachedMeta,r=s.data,o=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,a=Math.max((Math.min(i.width,i.height)-o)/2,0),c=Math.min(LR(this.options.cutout,a),1),l=this._getRingWeight(this.index),{circumference:h,rotation:d}=this._getRotationExtents(),{ratioX:f,ratioY:m,offsetX:_,offsetY:b}=Ak(d,h,c),v=(i.width-o)/f,S=(i.height-o)/m,R=Math.max(Math.min(v,S)/2,0),D=gb(this.options.radius,R),N=Math.max(D*c,0),M=(D-N)/this._getVisibleDatasetWeightTotal();this.offsetX=_*D,this.offsetY=b*D,s.total=this.calculateTotal(),this.outerRadius=D-M*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-M*l,0),this.updateElements(r,0,r.length,t)}_circumference(t,e){const i=this.options,s=this._cachedMeta,r=this._getCircumference();return e&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||s._parsed[t]===null||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*r/mt)}updateElements(t,e,i,s){const r=s==="reset",o=this.chart,a=o.chartArea,l=o.options.animation,h=(a.left+a.right)/2,d=(a.top+a.bottom)/2,f=r&&l.animateScale,m=f?0:this.innerRadius,_=f?0:this.outerRadius,{sharedOptions:b,includeOptions:v}=this._getSharedOptions(e,s);let S=this._getRotation(),R;for(R=0;R<e;++R)S+=this._circumference(R,r);for(R=e;R<e+i;++R){const D=this._circumference(R,r),N=t[R],M={x:h+this.offsetX,y:d+this.offsetY,startAngle:S,endAngle:S+D,circumference:D,outerRadius:_,innerRadius:m};v&&(M.options=b||this.resolveDataElementOptions(R,N.active?"active":s)),S+=D,this.updateElement(N,R,M,s)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let i=0,s;for(s=0;s<e.length;s++){const r=t._parsed[s];r!==null&&!isNaN(r)&&this.chart.getDataVisibility(s)&&!e[s].hidden&&(i+=Math.abs(r))}return i}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?mt*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],r=po(e._parsed[t],i.options.locale);return{label:s[t]||"",value:r}}getMaxBorderWidth(t){let e=0;const i=this.chart;let s,r,o,a,c;if(!t){for(s=0,r=i.data.datasets.length;s<r;++s)if(i.isDatasetVisible(s)){o=i.getDatasetMeta(s),t=o.data,a=o.controller;break}}if(!t)return 0;for(s=0,r=t.length;s<r;++s)c=a.resolveDataElementOptions(s),c.borderAlign!=="inner"&&(e=Math.max(e,c.borderWidth||0,c.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let i=0,s=t.length;i<s;++i){const r=this.resolveDataElementOptions(i);e=Math.max(e,r.offset||0,r.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(e+=this._getRingWeight(i));return e}_getRingWeight(t){return Math.max(G(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}U(xi,"id","doughnut"),U(xi,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),U(xi,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),U(xi,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data,{labels:{pointStyle:i,textAlign:s,color:r,useBorderRadius:o,borderRadius:a}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((c,l)=>{const d=t.getDatasetMeta(0).controller.getStyle(l);return{text:c,fillStyle:d.backgroundColor,fontColor:r,hidden:!t.getDataVisibility(l),lineDash:d.borderDash,lineDashOffset:d.borderDashOffset,lineJoin:d.borderJoinStyle,lineWidth:d.borderWidth,strokeStyle:d.borderColor,textAlign:s,pointStyle:i,borderRadius:o&&(a||d.borderRadius),index:l}}):[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}}});class sa extends Ae{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:i,data:s=[],_dataset:r}=e,o=this.chart._animationsDisabled;let{start:a,count:c}=Eb(e,s,o);this._drawStart=a,this._drawCount=c,Ib(e)&&(a=0,c=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!r._decimated,i.points=s;const l=this.resolveDatasetElementOptions(t);this.options.showLine||(l.borderWidth=0),l.segment=this.options.segment,this.updateElement(i,void 0,{animated:!o,options:l},t),this.updateElements(s,a,c,t)}updateElements(t,e,i,s){const r=s==="reset",{iScale:o,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,{sharedOptions:h,includeOptions:d}=this._getSharedOptions(e,s),f=o.axis,m=a.axis,{spanGaps:_,segment:b}=this.options,v=ws(_)?_:Number.POSITIVE_INFINITY,S=this.chart._animationsDisabled||r||s==="none",R=e+i,D=t.length;let N=e>0&&this.getParsed(e-1);for(let M=0;M<D;++M){const L=t[M],E=S?L:{};if(M<e||M>=R){E.skip=!0;continue}const w=this.getParsed(M),T=X(w[m]),x=E[f]=o.getPixelForValue(w[f],M),A=E[m]=r||T?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,w,c):w[m],M);E.skip=isNaN(x)||isNaN(A)||T,E.stop=M>0&&Math.abs(w[f]-N[f])>v,b&&(E.parsed=w,E.raw=l.data[M]),d&&(E.options=h||this.resolveDataElementOptions(M,L.active?"active":s)),S||this.updateElement(L,M,E,s),N=w}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,i=e.options&&e.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const r=s[0].size(this.resolveDataElementOptions(0)),o=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,r,o)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}U(sa,"id","line"),U(sa,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),U(sa,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class Ar extends Ae{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],r=po(e._parsed[t].r,i.options.locale);return{label:s[t]||"",value:r}}parseObjectData(t,e,i,s){return Db.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,s)=>{const r=this.getParsed(s).r;!isNaN(r)&&this.chart.getDataVisibility(s)&&(r<e.min&&(e.min=r),r>e.max&&(e.max=r))}),e}_updateRadius(){const t=this.chart,e=t.chartArea,i=t.options,s=Math.min(e.right-e.left,e.bottom-e.top),r=Math.max(s/2,0),o=Math.max(i.cutoutPercentage?r/100*i.cutoutPercentage:1,0),a=(r-o)/t.getVisibleDatasetCount();this.outerRadius=r-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(t,e,i,s){const r=s==="reset",o=this.chart,c=o.options.animation,l=this._cachedMeta.rScale,h=l.xCenter,d=l.yCenter,f=l.getIndexAngle(0)-.5*rt;let m=f,_;const b=360/this.countVisibleElements();for(_=0;_<e;++_)m+=this._computeAngle(_,s,b);for(_=e;_<e+i;_++){const v=t[_];let S=m,R=m+this._computeAngle(_,s,b),D=o.getDataVisibility(_)?l.getDistanceFromCenterForValue(this.getParsed(_).r):0;m=R,r&&(c.animateScale&&(D=0),c.animateRotate&&(S=R=f));const N={x:h,y:d,innerRadius:0,outerRadius:D,startAngle:S,endAngle:R,options:this.resolveDataElementOptions(_,v.active?"active":s)};this.updateElement(v,_,N,s)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach((i,s)=>{!isNaN(this.getParsed(s).r)&&this.chart.getDataVisibility(s)&&e++}),e}_computeAngle(t,e,i){return this.chart.getDataVisibility(t)?Ee(this.resolveDataElementOptions(t,e).angle||i):0}}U(Ar,"id","polarArea"),U(Ar,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),U(Ar,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i,color:s}}=t.legend.options;return e.labels.map((r,o)=>{const c=t.getDatasetMeta(0).controller.getStyle(o);return{text:r,fillStyle:c.backgroundColor,strokeStyle:c.borderColor,fontColor:s,lineWidth:c.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(o),index:o}})}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class au extends xi{}U(au,"id","pie"),U(au,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class ra extends Ae{getLabelAndValue(t){const e=this._cachedMeta.vScale,i=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(i[e.axis])}}parseObjectData(t,e,i,s){return Db.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta,i=e.dataset,s=e.data||[],r=e.iScale.getLabels();if(i.points=s,t!=="resize"){const o=this.resolveDatasetElementOptions(t);this.options.showLine||(o.borderWidth=0);const a={_loop:!0,_fullLoop:r.length===s.length,options:o};this.updateElement(i,void 0,a,t)}this.updateElements(s,0,s.length,t)}updateElements(t,e,i,s){const r=this._cachedMeta.rScale,o=s==="reset";for(let a=e;a<e+i;a++){const c=t[a],l=this.resolveDataElementOptions(a,c.active?"active":s),h=r.getPointPositionForValue(a,this.getParsed(a).r),d=o?r.xCenter:h.x,f=o?r.yCenter:h.y,m={x:d,y:f,angle:h.angle,skip:isNaN(d)||isNaN(f),options:l};this.updateElement(c,a,m,s)}}}U(ra,"id","radar"),U(ra,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),U(ra,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class oa extends Ae{getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:r}=e,o=this.getParsed(t),a=s.getLabelForValue(o.x),c=r.getLabelForValue(o.y);return{label:i[t]||"",value:"("+a+", "+c+")"}}update(t){const e=this._cachedMeta,{data:i=[]}=e,s=this.chart._animationsDisabled;let{start:r,count:o}=Eb(e,i,s);if(this._drawStart=r,this._drawCount=o,Ib(e)&&(r=0,o=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:a,_dataset:c}=e;a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!c._decimated,a.points=i;const l=this.resolveDatasetElementOptions(t);l.segment=this.options.segment,this.updateElement(a,void 0,{animated:!s,options:l},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(i,r,o,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,i,s){const r=s==="reset",{iScale:o,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,h=this.resolveDataElementOptions(e,s),d=this.getSharedOptions(h),f=this.includeOptions(s,d),m=o.axis,_=a.axis,{spanGaps:b,segment:v}=this.options,S=ws(b)?b:Number.POSITIVE_INFINITY,R=this.chart._animationsDisabled||r||s==="none";let D=e>0&&this.getParsed(e-1);for(let N=e;N<e+i;++N){const M=t[N],L=this.getParsed(N),E=R?M:{},w=X(L[_]),T=E[m]=o.getPixelForValue(L[m],N),x=E[_]=r||w?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,L,c):L[_],N);E.skip=isNaN(T)||isNaN(x)||w,E.stop=N>0&&Math.abs(L[m]-D[m])>S,v&&(E.parsed=L,E.raw=l.data[N]),f&&(E.options=d||this.resolveDataElementOptions(N,M.active?"active":s)),R||this.updateElement(M,N,E,s),D=L}this.updateSharedOptions(d,s,h)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let a=0;for(let c=e.length-1;c>=0;--c)a=Math.max(a,e[c].size(this.resolveDataElementOptions(c))/2);return a>0&&a}const i=t.dataset,s=i.options&&i.options.borderWidth||0;if(!e.length)return s;const r=e[0].size(this.resolveDataElementOptions(0)),o=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(s,r,o)/2}}U(oa,"id","scatter"),U(oa,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),U(oa,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var xk=Object.freeze({__proto__:null,BarController:na,BubbleController:ia,DoughnutController:xi,LineController:sa,PieController:au,PolarAreaController:Ar,RadarController:ra,ScatterController:oa});function yi(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class jh{constructor(t){U(this,"options");this.options=t||{}}static override(t){Object.assign(jh.prototype,t)}init(){}formats(){return yi()}parse(){return yi()}format(){return yi()}add(){return yi()}diff(){return yi()}startOf(){return yi()}endOf(){return yi()}}var Sk={_date:jh};function Pk(n,t,e,i){const{controller:s,data:r,_sorted:o}=n,a=s._cachedMeta.iScale,c=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&o&&r.length){const l=a._reversePixels?QR:sn;if(i){if(s._sharedOptions){const h=r[0],d=typeof h.getRange=="function"&&h.getRange(t);if(d){const f=l(r,t,e-d),m=l(r,t,e+d);return{lo:f.lo,hi:m.hi}}}}else{const h=l(r,t,e);if(c){const{vScale:d}=s._cachedMeta,{_parsed:f}=n,m=f.slice(0,h.lo+1).reverse().findIndex(b=>!X(b[d.axis]));h.lo-=Math.max(0,m);const _=f.slice(h.hi).findIndex(b=>!X(b[d.axis]));h.hi+=Math.max(0,_)}return h}}return{lo:0,hi:r.length-1}}function Pc(n,t,e,i,s){const r=n.getSortedVisibleDatasetMetas(),o=e[t];for(let a=0,c=r.length;a<c;++a){const{index:l,data:h}=r[a],{lo:d,hi:f}=Pk(r[a],t,o,s);for(let m=d;m<=f;++m){const _=h[m];_.skip||i(_,l,m)}}}function Rk(n){const t=n.indexOf("x")!==-1,e=n.indexOf("y")!==-1;return function(i,s){const r=t?Math.abs(i.x-s.x):0,o=e?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(r,2)+Math.pow(o,2))}}function Tl(n,t,e,i,s){const r=[];return!s&&!n.isPointInArea(t)||Pc(n,e,t,function(a,c,l){!s&&!rn(a,n.chartArea,0)||a.inRange(t.x,t.y,i)&&r.push({element:a,datasetIndex:c,index:l})},!0),r}function Ck(n,t,e,i){let s=[];function r(o,a,c){const{startAngle:l,endAngle:h}=o.getProps(["startAngle","endAngle"],i),{angle:d}=yb(o,{x:t.x,y:t.y});$r(d,l,h)&&s.push({element:o,datasetIndex:a,index:c})}return Pc(n,e,t,r),s}function kk(n,t,e,i,s,r){let o=[];const a=Rk(e);let c=Number.POSITIVE_INFINITY;function l(h,d,f){const m=h.inRange(t.x,t.y,s);if(i&&!m)return;const _=h.getCenterPoint(s);if(!(!!r||n.isPointInArea(_))&&!m)return;const v=a(t,_);v<c?(o=[{element:h,datasetIndex:d,index:f}],c=v):v===c&&o.push({element:h,datasetIndex:d,index:f})}return Pc(n,e,t,l),o}function El(n,t,e,i,s,r){return!r&&!n.isPointInArea(t)?[]:e==="r"&&!i?Ck(n,t,e,s):kk(n,t,e,i,s,r)}function pg(n,t,e,i,s){const r=[],o=e==="x"?"inXRange":"inYRange";let a=!1;return Pc(n,e,t,(c,l,h)=>{c[o]&&c[o](t[e],s)&&(r.push({element:c,datasetIndex:l,index:h}),a=a||c.inRange(t.x,t.y,s))}),i&&!a?[]:r}var Dk={modes:{index(n,t,e,i){const s=vi(t,n),r=e.axis||"x",o=e.includeInvisible||!1,a=e.intersect?Tl(n,s,r,i,o):El(n,s,r,!1,i,o),c=[];return a.length?(n.getSortedVisibleDatasetMetas().forEach(l=>{const h=a[0].index,d=l.data[h];d&&!d.skip&&c.push({element:d,datasetIndex:l.index,index:h})}),c):[]},dataset(n,t,e,i){const s=vi(t,n),r=e.axis||"xy",o=e.includeInvisible||!1;let a=e.intersect?Tl(n,s,r,i,o):El(n,s,r,!1,i,o);if(a.length>0){const c=a[0].datasetIndex,l=n.getDatasetMeta(c).data;a=[];for(let h=0;h<l.length;++h)a.push({element:l[h],datasetIndex:c,index:h})}return a},point(n,t,e,i){const s=vi(t,n),r=e.axis||"xy",o=e.includeInvisible||!1;return Tl(n,s,r,i,o)},nearest(n,t,e,i){const s=vi(t,n),r=e.axis||"xy",o=e.includeInvisible||!1;return El(n,s,r,e.intersect,i,o)},x(n,t,e,i){const s=vi(t,n);return pg(n,s,"x",e.intersect,i)},y(n,t,e,i){const s=vi(t,n);return pg(n,s,"y",e.intersect,i)}}};const jb=["left","top","right","bottom"];function Js(n,t){return n.filter(e=>e.pos===t)}function gg(n,t){return n.filter(e=>jb.indexOf(e.pos)===-1&&e.box.axis===t)}function Zs(n,t){return n.sort((e,i)=>{const s=t?i:e,r=t?e:i;return s.weight===r.weight?s.index-r.index:s.weight-r.weight})}function Mk(n){const t=[];let e,i,s,r,o,a;for(e=0,i=(n||[]).length;e<i;++e)s=n[e],{position:r,options:{stack:o,stackWeight:a=1}}=s,t.push({index:e,box:s,pos:r,horizontal:s.isHorizontal(),weight:s.weight,stack:o&&r+o,stackWeight:a});return t}function Ok(n){const t={};for(const e of n){const{stack:i,pos:s,stackWeight:r}=e;if(!i||!jb.includes(s))continue;const o=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=r}return t}function Nk(n,t){const e=Ok(n),{vBoxMaxWidth:i,hBoxMaxHeight:s}=t;let r,o,a;for(r=0,o=n.length;r<o;++r){a=n[r];const{fullSize:c}=a.box,l=e[a.stack],h=l&&a.stackWeight/l.weight;a.horizontal?(a.width=h?h*i:c&&t.availableWidth,a.height=s):(a.width=i,a.height=h?h*s:c&&t.availableHeight)}return e}function Vk(n){const t=Mk(n),e=Zs(t.filter(l=>l.box.fullSize),!0),i=Zs(Js(t,"left"),!0),s=Zs(Js(t,"right")),r=Zs(Js(t,"top"),!0),o=Zs(Js(t,"bottom")),a=gg(t,"x"),c=gg(t,"y");return{fullSize:e,leftAndTop:i.concat(r),rightAndBottom:s.concat(c).concat(o).concat(a),chartArea:Js(t,"chartArea"),vertical:i.concat(s).concat(c),horizontal:r.concat(o).concat(a)}}function mg(n,t,e,i){return Math.max(n[e],t[e])+Math.max(n[i],t[i])}function Hb(n,t){n.top=Math.max(n.top,t.top),n.left=Math.max(n.left,t.left),n.bottom=Math.max(n.bottom,t.bottom),n.right=Math.max(n.right,t.right)}function Lk(n,t,e,i){const{pos:s,box:r}=e,o=n.maxPadding;if(!nt(s)){e.size&&(n[s]-=e.size);const d=i[e.stack]||{size:0,count:1};d.size=Math.max(d.size,e.horizontal?r.height:r.width),e.size=d.size/d.count,n[s]+=e.size}r.getPadding&&Hb(o,r.getPadding());const a=Math.max(0,t.outerWidth-mg(o,n,"left","right")),c=Math.max(0,t.outerHeight-mg(o,n,"top","bottom")),l=a!==n.w,h=c!==n.h;return n.w=a,n.h=c,e.horizontal?{same:l,other:h}:{same:h,other:l}}function Fk(n){const t=n.maxPadding;function e(i){const s=Math.max(t[i]-n[i],0);return n[i]+=s,s}n.y+=e("top"),n.x+=e("left"),e("right"),e("bottom")}function Uk(n,t){const e=t.maxPadding;function i(s){const r={left:0,top:0,right:0,bottom:0};return s.forEach(o=>{r[o]=Math.max(t[o],e[o])}),r}return i(n?["left","right"]:["top","bottom"])}function ur(n,t,e,i){const s=[];let r,o,a,c,l,h;for(r=0,o=n.length,l=0;r<o;++r){a=n[r],c=a.box,c.update(a.width||t.w,a.height||t.h,Uk(a.horizontal,t));const{same:d,other:f}=Lk(t,e,a,i);l|=d&&s.length,h=h||f,c.fullSize||s.push(a)}return l&&ur(s,t,e,i)||h}function Uo(n,t,e,i,s){n.top=e,n.left=t,n.right=t+i,n.bottom=e+s,n.width=i,n.height=s}function _g(n,t,e,i){const s=e.padding;let{x:r,y:o}=t;for(const a of n){const c=a.box,l=i[a.stack]||{placed:0,weight:1},h=a.stackWeight/l.weight||1;if(a.horizontal){const d=t.w*h,f=l.size||c.height;zr(l.start)&&(o=l.start),c.fullSize?Uo(c,s.left,o,e.outerWidth-s.right-s.left,f):Uo(c,t.left+l.placed,o,d,f),l.start=o,l.placed+=d,o=c.bottom}else{const d=t.h*h,f=l.size||c.width;zr(l.start)&&(r=l.start),c.fullSize?Uo(c,r,s.top,f,e.outerHeight-s.bottom-s.top):Uo(c,r,t.top+l.placed,f,d),l.start=r,l.placed+=d,r=c.right}}t.x=r,t.y=o}var Kt={addBox(n,t){n.boxes||(n.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},n.boxes.push(t)},removeBox(n,t){const e=n.boxes?n.boxes.indexOf(t):-1;e!==-1&&n.boxes.splice(e,1)},configure(n,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(n,t,e,i){if(!n)return;const s=Qt(n.options.layout.padding),r=Math.max(t-s.width,0),o=Math.max(e-s.height,0),a=Vk(n.boxes),c=a.vertical,l=a.horizontal;at(n.boxes,b=>{typeof b.beforeLayout=="function"&&b.beforeLayout()});const h=c.reduce((b,v)=>v.box.options&&v.box.options.display===!1?b:b+1,0)||1,d=Object.freeze({outerWidth:t,outerHeight:e,padding:s,availableWidth:r,availableHeight:o,vBoxMaxWidth:r/2/h,hBoxMaxHeight:o/2}),f=Object.assign({},s);Hb(f,Qt(i));const m=Object.assign({maxPadding:f,w:r,h:o,x:s.left,y:s.top},s),_=Nk(c.concat(l),d);ur(a.fullSize,m,d,_),ur(c,m,d,_),ur(l,m,d,_)&&ur(c,m,d,_),Fk(m),_g(a.leftAndTop,m,d,_),m.x+=m.w,m.y+=m.h,_g(a.rightAndBottom,m,d,_),n.chartArea={left:m.left,top:m.top,right:m.left+m.w,bottom:m.top+m.h,height:m.h,width:m.w},at(a.chartArea,b=>{const v=b.box;Object.assign(v,n.chartArea),v.update(m.w,m.h,{left:0,top:0,right:0,bottom:0})})}};class Wb{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,i){}removeEventListener(t,e,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,i,s){return e=Math.max(0,e||t.width),i=i||t.height,{width:e,height:Math.max(0,s?Math.floor(e/s):i)}}isAttached(t){return!0}updateConfig(t){}}class Bk extends Wb{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const aa="$chartjs",zk={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},yg=n=>n===null||n==="";function $k(n,t){const e=n.style,i=n.getAttribute("height"),s=n.getAttribute("width");if(n[aa]={initial:{height:i,width:s,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",yg(s)){const r=eg(n,"width");r!==void 0&&(n.width=r)}if(yg(i))if(n.style.height==="")n.height=n.width/(t||2);else{const r=eg(n,"height");r!==void 0&&(n.height=r)}return n}const qb=jC?{passive:!0}:!1;function jk(n,t,e){n&&n.addEventListener(t,e,qb)}function Hk(n,t,e){n&&n.canvas&&n.canvas.removeEventListener(t,e,qb)}function Wk(n,t){const e=zk[n.type]||n.type,{x:i,y:s}=vi(n,t);return{type:e,chart:t,native:n,x:i!==void 0?i:null,y:s!==void 0?s:null}}function ja(n,t){for(const e of n)if(e===t||e.contains(t))return!0}function qk(n,t,e){const i=n.canvas,s=new MutationObserver(r=>{let o=!1;for(const a of r)o=o||ja(a.addedNodes,i),o=o&&!ja(a.removedNodes,i);o&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}function Gk(n,t,e){const i=n.canvas,s=new MutationObserver(r=>{let o=!1;for(const a of r)o=o||ja(a.removedNodes,i),o=o&&!ja(a.addedNodes,i);o&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}const Hr=new Map;let bg=0;function Gb(){const n=window.devicePixelRatio;n!==bg&&(bg=n,Hr.forEach((t,e)=>{e.currentDevicePixelRatio!==n&&t()}))}function Kk(n,t){Hr.size||window.addEventListener("resize",Gb),Hr.set(n,t)}function Yk(n){Hr.delete(n),Hr.size||window.removeEventListener("resize",Gb)}function Qk(n,t,e){const i=n.canvas,s=i&&$h(i);if(!s)return;const r=Tb((a,c)=>{const l=s.clientWidth;e(a,c),l<s.clientWidth&&e()},window),o=new ResizeObserver(a=>{const c=a[0],l=c.contentRect.width,h=c.contentRect.height;l===0&&h===0||r(l,h)});return o.observe(s),Kk(n,r),o}function Il(n,t,e){e&&e.disconnect(),t==="resize"&&Yk(n)}function Xk(n,t,e){const i=n.canvas,s=Tb(r=>{n.ctx!==null&&e(Wk(r,n))},n);return jk(i,t,s),s}class Jk extends Wb{acquireContext(t,e){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?($k(t,e),i):null}releaseContext(t){const e=t.canvas;if(!e[aa])return!1;const i=e[aa].initial;["height","width"].forEach(r=>{const o=i[r];X(o)?e.removeAttribute(r):e.setAttribute(r,o)});const s=i.style||{};return Object.keys(s).forEach(r=>{e.style[r]=s[r]}),e.width=e.width,delete e[aa],!0}addEventListener(t,e,i){this.removeEventListener(t,e);const s=t.$proxies||(t.$proxies={}),o={attach:qk,detach:Gk,resize:Qk}[e]||Xk;s[e]=o(t,e,i)}removeEventListener(t,e){const i=t.$proxies||(t.$proxies={}),s=i[e];if(!s)return;({attach:Il,detach:Il,resize:Il}[e]||Hk)(t,e,s),i[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,i,s){return $C(t,e,i,s)}isAttached(t){const e=t&&$h(t);return!!(e&&e.isConnected)}}function Zk(n){return!zh()||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas?Bk:Jk}class Ce{constructor(){U(this,"x");U(this,"y");U(this,"active",!1);U(this,"options");U(this,"$animations")}tooltipPosition(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}hasValue(){return ws(this.x)&&ws(this.y)}getProps(t,e){const i=this.$animations;if(!e||!i)return this;const s={};return t.forEach(r=>{s[r]=i[r]&&i[r].active()?i[r]._to:this[r]}),s}}U(Ce,"defaults",{}),U(Ce,"defaultRoutes");function t1(n,t){const e=n.options.ticks,i=e1(n),s=Math.min(e.maxTicksLimit||i,i),r=e.major.enabled?i1(t):[],o=r.length,a=r[0],c=r[o-1],l=[];if(o>s)return s1(t,l,r,o/s),l;const h=n1(r,t,s);if(o>0){let d,f;const m=o>1?Math.round((c-a)/(o-1)):null;for(Bo(t,l,h,X(m)?0:a-m,a),d=0,f=o-1;d<f;d++)Bo(t,l,h,r[d],r[d+1]);return Bo(t,l,h,c,X(m)?t.length:c+m),l}return Bo(t,l,h),l}function e1(n){const t=n.options.offset,e=n._tickSize(),i=n._length/e+(t?0:1),s=n._maxLength/e;return Math.floor(Math.min(i,s))}function n1(n,t,e){const i=r1(n),s=t.length/e;if(!i)return Math.max(s,1);const r=WR(i);for(let o=0,a=r.length-1;o<a;o++){const c=r[o];if(c>s)return c}return Math.max(s,1)}function i1(n){const t=[];let e,i;for(e=0,i=n.length;e<i;e++)n[e].major&&t.push(e);return t}function s1(n,t,e,i){let s=0,r=e[0],o;for(i=Math.ceil(i),o=0;o<n.length;o++)o===r&&(t.push(n[o]),s++,r=e[s*i])}function Bo(n,t,e,i,s){const r=G(i,0),o=Math.min(G(s,n.length),n.length);let a=0,c,l,h;for(e=Math.ceil(e),s&&(c=s-i,e=c/Math.floor(c/e)),h=r;h<0;)a++,h=Math.round(r+a*e);for(l=Math.max(r,0);l<o;l++)l===h&&(t.push(n[l]),a++,h=Math.round(r+a*e))}function r1(n){const t=n.length;let e,i;if(t<2)return!1;for(i=n[0],e=1;e<t;++e)if(n[e]-n[e-1]!==i)return!1;return i}const o1=n=>n==="left"?"right":n==="right"?"left":n,wg=(n,t,e)=>t==="top"||t==="left"?n[t]+e:n[t]-e,vg=(n,t)=>Math.min(t||n,n);function Tg(n,t){const e=[],i=n.length/t,s=n.length;let r=0;for(;r<s;r+=i)e.push(n[Math.floor(r)]);return e}function a1(n,t,e){const i=n.ticks.length,s=Math.min(t,i-1),r=n._startPixel,o=n._endPixel,a=1e-6;let c=n.getPixelForTick(s),l;if(!(e&&(i===1?l=Math.max(c-r,o-c):t===0?l=(n.getPixelForTick(1)-c)/2:l=(c-n.getPixelForTick(s-1))/2,c+=s<t?l:-l,c<r-a||c>o+a)))return c}function c1(n,t){at(n,e=>{const i=e.gc,s=i.length/2;let r;if(s>t){for(r=0;r<s;++r)delete e.data[i[r]];i.splice(0,s)}})}function tr(n){return n.drawTicks?n.tickLength:0}function Eg(n,t){if(!n.display)return 0;const e=Dt(n.font,t),i=Qt(n.padding);return(_t(n.text)?n.text.length:1)*e.lineHeight+i.height}function l1(n,t){return li(n,{scale:t,type:"scale"})}function u1(n,t,e){return li(n,{tick:e,index:t,type:"tick"})}function h1(n,t,e){let i=Nh(n);return(e&&t!=="right"||!e&&t==="right")&&(i=o1(i)),i}function d1(n,t,e,i){const{top:s,left:r,bottom:o,right:a,chart:c}=n,{chartArea:l,scales:h}=c;let d=0,f,m,_;const b=o-s,v=a-r;if(n.isHorizontal()){if(m=Wt(i,r,a),nt(e)){const S=Object.keys(e)[0],R=e[S];_=h[S].getPixelForValue(R)+b-t}else e==="center"?_=(l.bottom+l.top)/2+b-t:_=wg(n,e,t);f=a-r}else{if(nt(e)){const S=Object.keys(e)[0],R=e[S];m=h[S].getPixelForValue(R)-v+t}else e==="center"?m=(l.left+l.right)/2-v+t:m=wg(n,e,t);_=Wt(i,o,s),d=e==="left"?-xt:xt}return{titleX:m,titleY:_,maxWidth:f,rotation:d}}class Wi extends Ce{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:i,_suggestedMax:s}=this;return t=le(t,Number.POSITIVE_INFINITY),e=le(e,Number.NEGATIVE_INFINITY),i=le(i,Number.POSITIVE_INFINITY),s=le(s,Number.NEGATIVE_INFINITY),{min:le(t,i),max:le(e,s),minDefined:Et(t),maxDefined:Et(e)}}getMinMax(t){let{min:e,max:i,minDefined:s,maxDefined:r}=this.getUserBounds(),o;if(s&&r)return{min:e,max:i};const a=this.getMatchingVisibleMetas();for(let c=0,l=a.length;c<l;++c)o=a[c].controller.getMinMax(this,t),s||(e=Math.min(e,o.min)),r||(i=Math.max(i,o.max));return e=r&&e>i?i:e,i=s&&e>i?e:i,{min:le(e,le(i,e)),max:le(i,le(e,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){ft(this.options.beforeUpdate,[this])}update(t,e,i){const{beginAtZero:s,grace:r,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=wC(this,r,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const c=a<this.ticks.length;this._convertTicksToLabels(c?Tg(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=t1(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,i;this.isHorizontal()?(e=this.left,i=this.right):(e=this.top,i=this.bottom,t=!t),this._startPixel=e,this._endPixel=i,this._reversePixels=t,this._length=i-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){ft(this.options.afterUpdate,[this])}beforeSetDimensions(){ft(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){ft(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),ft(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){ft(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let i,s,r;for(i=0,s=t.length;i<s;i++)r=t[i],r.label=ft(e.callback,[r.value,i,t],this)}afterTickToLabelConversion(){ft(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){ft(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,i=vg(this.ticks.length,t.ticks.maxTicksLimit),s=e.minRotation||0,r=e.maxRotation;let o=s,a,c,l;if(!this._isVisible()||!e.display||s>=r||i<=1||!this.isHorizontal()){this.labelRotation=s;return}const h=this._getLabelSizes(),d=h.widest.width,f=h.highest.height,m=Lt(this.chart.width-d,0,this.maxWidth);a=t.offset?this.maxWidth/i:m/(i-1),d+6>a&&(a=m/(i-(t.offset?.5:1)),c=this.maxHeight-tr(t.grid)-e.padding-Eg(t.title,this.chart.options.font),l=Math.sqrt(d*d+f*f),o=Mh(Math.min(Math.asin(Lt((h.highest.height+6)/a,-1,1)),Math.asin(Lt(c/l,-1,1))-Math.asin(Lt(f/l,-1,1)))),o=Math.max(s,Math.min(r,o))),this.labelRotation=o}afterCalculateLabelRotation(){ft(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){ft(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:i,title:s,grid:r}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const c=Eg(s,e.options.font);if(a?(t.width=this.maxWidth,t.height=tr(r)+c):(t.height=this.maxHeight,t.width=tr(r)+c),i.display&&this.ticks.length){const{first:l,last:h,widest:d,highest:f}=this._getLabelSizes(),m=i.padding*2,_=Ee(this.labelRotation),b=Math.cos(_),v=Math.sin(_);if(a){const S=i.mirror?0:v*d.width+b*f.height;t.height=Math.min(this.maxHeight,t.height+S+m)}else{const S=i.mirror?0:b*d.width+v*f.height;t.width=Math.min(this.maxWidth,t.width+S+m)}this._calculatePadding(l,h,v,b)}}this._handleMargins(),a?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,i,s){const{ticks:{align:r,padding:o},position:a}=this.options,c=this.labelRotation!==0,l=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const h=this.getPixelForTick(0)-this.left,d=this.right-this.getPixelForTick(this.ticks.length-1);let f=0,m=0;c?l?(f=s*t.width,m=i*e.height):(f=i*t.height,m=s*e.width):r==="start"?m=e.width:r==="end"?f=t.width:r!=="inner"&&(f=t.width/2,m=e.width/2),this.paddingLeft=Math.max((f-h+o)*this.width/(this.width-h),0),this.paddingRight=Math.max((m-d+o)*this.width/(this.width-d),0)}else{let h=e.height/2,d=t.height/2;r==="start"?(h=0,d=t.height):r==="end"&&(h=e.height,d=0),this.paddingTop=h+o,this.paddingBottom=d+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){ft(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,i;for(e=0,i=t.length;e<i;e++)X(t[e].label)&&(t.splice(e,1),i--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let i=this.ticks;e<i.length&&(i=Tg(i,e)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,i){const{ctx:s,_longestTextCache:r}=this,o=[],a=[],c=Math.floor(e/vg(e,i));let l=0,h=0,d,f,m,_,b,v,S,R,D,N,M;for(d=0;d<e;d+=c){if(_=t[d].label,b=this._resolveTickFontOptions(d),s.font=v=b.string,S=r[v]=r[v]||{data:{},gc:[]},R=b.lineHeight,D=N=0,!X(_)&&!_t(_))D=za(s,S.data,S.gc,D,_),N=R;else if(_t(_))for(f=0,m=_.length;f<m;++f)M=_[f],!X(M)&&!_t(M)&&(D=za(s,S.data,S.gc,D,M),N+=R);o.push(D),a.push(N),l=Math.max(D,l),h=Math.max(N,h)}c1(r,e);const L=o.indexOf(l),E=a.indexOf(h),w=T=>({width:o[T]||0,height:a[T]||0});return{first:w(0),last:w(e-1),widest:w(L),highest:w(E),widths:o,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return YR(this._alignToPixels?_i(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const i=e[t];return i.$context||(i.$context=u1(this.getContext(),t,i))}return this.$context||(this.$context=l1(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=Ee(this.labelRotation),i=Math.abs(Math.cos(e)),s=Math.abs(Math.sin(e)),r=this._getLabelSizes(),o=t.autoSkipPadding||0,a=r?r.widest.width+o:0,c=r?r.highest.height+o:0;return this.isHorizontal()?c*i>a*s?a/i:c/s:c*s<a*i?c/i:a/s}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,i=this.chart,s=this.options,{grid:r,position:o,border:a}=s,c=r.offset,l=this.isHorizontal(),d=this.ticks.length+(c?1:0),f=tr(r),m=[],_=a.setContext(this.getContext()),b=_.display?_.width:0,v=b/2,S=function(dt){return _i(i,dt,b)};let R,D,N,M,L,E,w,T,x,A,P,I;if(o==="top")R=S(this.bottom),E=this.bottom-f,T=R-v,A=S(t.top)+v,I=t.bottom;else if(o==="bottom")R=S(this.top),A=t.top,I=S(t.bottom)-v,E=R+v,T=this.top+f;else if(o==="left")R=S(this.right),L=this.right-f,w=R-v,x=S(t.left)+v,P=t.right;else if(o==="right")R=S(this.left),x=t.left,P=S(t.right)-v,L=R+v,w=this.left+f;else if(e==="x"){if(o==="center")R=S((t.top+t.bottom)/2+.5);else if(nt(o)){const dt=Object.keys(o)[0],bt=o[dt];R=S(this.chart.scales[dt].getPixelForValue(bt))}A=t.top,I=t.bottom,E=R+v,T=E+f}else if(e==="y"){if(o==="center")R=S((t.left+t.right)/2);else if(nt(o)){const dt=Object.keys(o)[0],bt=o[dt];R=S(this.chart.scales[dt].getPixelForValue(bt))}L=R-v,w=L-f,x=t.left,P=t.right}const ct=G(s.ticks.maxTicksLimit,d),J=Math.max(1,Math.ceil(d/ct));for(D=0;D<d;D+=J){const dt=this.getContext(D),bt=r.setContext(dt),$t=a.setContext(dt),It=bt.lineWidth,mn=bt.color,ui=$t.dash||[],Ke=$t.dashOffset,_n=bt.tickWidth,me=bt.tickColor,Ye=bt.tickBorderDash||[],ve=bt.tickBorderDashOffset;N=a1(this,D,c),N!==void 0&&(M=_i(i,N,It),l?L=w=x=P=M:E=T=A=I=M,m.push({tx1:L,ty1:E,tx2:w,ty2:T,x1:x,y1:A,x2:P,y2:I,width:It,color:mn,borderDash:ui,borderDashOffset:Ke,tickWidth:_n,tickColor:me,tickBorderDash:Ye,tickBorderDashOffset:ve}))}return this._ticksLength=d,this._borderValue=R,m}_computeLabelItems(t){const e=this.axis,i=this.options,{position:s,ticks:r}=i,o=this.isHorizontal(),a=this.ticks,{align:c,crossAlign:l,padding:h,mirror:d}=r,f=tr(i.grid),m=f+h,_=d?-h:m,b=-Ee(this.labelRotation),v=[];let S,R,D,N,M,L,E,w,T,x,A,P,I="middle";if(s==="top")L=this.bottom-_,E=this._getXAxisLabelAlignment();else if(s==="bottom")L=this.top+_,E=this._getXAxisLabelAlignment();else if(s==="left"){const J=this._getYAxisLabelAlignment(f);E=J.textAlign,M=J.x}else if(s==="right"){const J=this._getYAxisLabelAlignment(f);E=J.textAlign,M=J.x}else if(e==="x"){if(s==="center")L=(t.top+t.bottom)/2+m;else if(nt(s)){const J=Object.keys(s)[0],dt=s[J];L=this.chart.scales[J].getPixelForValue(dt)+m}E=this._getXAxisLabelAlignment()}else if(e==="y"){if(s==="center")M=(t.left+t.right)/2-m;else if(nt(s)){const J=Object.keys(s)[0],dt=s[J];M=this.chart.scales[J].getPixelForValue(dt)}E=this._getYAxisLabelAlignment(f).textAlign}e==="y"&&(c==="start"?I="top":c==="end"&&(I="bottom"));const ct=this._getLabelSizes();for(S=0,R=a.length;S<R;++S){D=a[S],N=D.label;const J=r.setContext(this.getContext(S));w=this.getPixelForTick(S)+r.labelOffset,T=this._resolveTickFontOptions(S),x=T.lineHeight,A=_t(N)?N.length:1;const dt=A/2,bt=J.color,$t=J.textStrokeColor,It=J.textStrokeWidth;let mn=E;o?(M=w,E==="inner"&&(S===R-1?mn=this.options.reverse?"left":"right":S===0?mn=this.options.reverse?"right":"left":mn="center"),s==="top"?l==="near"||b!==0?P=-A*x+x/2:l==="center"?P=-ct.highest.height/2-dt*x+x:P=-ct.highest.height+x/2:l==="near"||b!==0?P=x/2:l==="center"?P=ct.highest.height/2-dt*x:P=ct.highest.height-A*x,d&&(P*=-1),b!==0&&!J.showLabelBackdrop&&(M+=x/2*Math.sin(b))):(L=w,P=(1-A)*x/2);let ui;if(J.showLabelBackdrop){const Ke=Qt(J.backdropPadding),_n=ct.heights[S],me=ct.widths[S];let Ye=P-Ke.top,ve=0-Ke.left;switch(I){case"middle":Ye-=_n/2;break;case"bottom":Ye-=_n;break}switch(E){case"center":ve-=me/2;break;case"right":ve-=me;break;case"inner":S===R-1?ve-=me:S>0&&(ve-=me/2);break}ui={left:ve,top:Ye,width:me+Ke.width,height:_n+Ke.height,color:J.backdropColor}}v.push({label:N,font:T,textOffset:P,options:{rotation:b,color:bt,strokeColor:$t,strokeWidth:It,textAlign:mn,textBaseline:I,translation:[M,L],backdrop:ui}})}return v}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-Ee(this.labelRotation))return t==="top"?"left":"right";let s="center";return e.align==="start"?s="left":e.align==="end"?s="right":e.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:i,mirror:s,padding:r}}=this.options,o=this._getLabelSizes(),a=t+r,c=o.widest.width;let l,h;return e==="left"?s?(h=this.right+r,i==="near"?l="left":i==="center"?(l="center",h+=c/2):(l="right",h+=c)):(h=this.right-a,i==="near"?l="right":i==="center"?(l="center",h-=c/2):(l="left",h=this.left)):e==="right"?s?(h=this.left+r,i==="near"?l="right":i==="center"?(l="center",h-=c/2):(l="left",h-=c)):(h=this.left+a,i==="near"?l="left":i==="center"?(l="center",h+=c/2):(l="right",h=this.right)):l="right",{textAlign:l,x:h}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:i,top:s,width:r,height:o}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(i,s,r,o),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const s=this.ticks.findIndex(r=>r.value===t);return s>=0?e.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const e=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let r,o;const a=(c,l,h)=>{!h.width||!h.color||(i.save(),i.lineWidth=h.width,i.strokeStyle=h.color,i.setLineDash(h.borderDash||[]),i.lineDashOffset=h.borderDashOffset,i.beginPath(),i.moveTo(c.x,c.y),i.lineTo(l.x,l.y),i.stroke(),i.restore())};if(e.display)for(r=0,o=s.length;r<o;++r){const c=s[r];e.drawOnChartArea&&a({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),e.drawTicks&&a({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:i,grid:s}}=this,r=i.setContext(this.getContext()),o=i.display?r.width:0;if(!o)return;const a=s.setContext(this.getContext(0)).lineWidth,c=this._borderValue;let l,h,d,f;this.isHorizontal()?(l=_i(t,this.left,o)-o/2,h=_i(t,this.right,a)+a/2,d=f=c):(d=_i(t,this.top,o)-o/2,f=_i(t,this.bottom,a)+a/2,l=h=c),e.save(),e.lineWidth=r.width,e.strokeStyle=r.color,e.beginPath(),e.moveTo(l,d),e.lineTo(h,f),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,s=this._computeLabelArea();s&&Ac(i,s);const r=this.getLabelItems(t);for(const o of r){const a=o.options,c=o.font,l=o.label,h=o.textOffset;Fi(i,l,0,h,c,a)}s&&xc(i)}drawTitle(){const{ctx:t,options:{position:e,title:i,reverse:s}}=this;if(!i.display)return;const r=Dt(i.font),o=Qt(i.padding),a=i.align;let c=r.lineHeight/2;e==="bottom"||e==="center"||nt(e)?(c+=o.bottom,_t(i.text)&&(c+=r.lineHeight*(i.text.length-1))):c+=o.top;const{titleX:l,titleY:h,maxWidth:d,rotation:f}=d1(this,c,e,a);Fi(t,i.text,0,0,r,{color:i.color,maxWidth:d,rotation:f,textAlign:h1(a,e,s),textBaseline:"middle",translation:[l,h]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,i=G(t.grid&&t.grid.z,-1),s=G(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==Wi.prototype.draw?[{z:e,draw:r=>{this.draw(r)}}]:[{z:i,draw:r=>{this.drawBackground(),this.drawGrid(r),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:e,draw:r=>{this.drawLabels(r)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let r,o;for(r=0,o=e.length;r<o;++r){const a=e[r];a[i]===this.id&&(!t||a.type===t)&&s.push(a)}return s}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return Dt(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class zo{constructor(t,e,i){this.type=t,this.scope=e,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let i;g1(e)&&(i=this.register(e));const s=this.items,r=t.id,o=this.scope+"."+r;if(!r)throw new Error("class does not have id: "+t);return r in s||(s[r]=t,f1(t,o,i),this.override&&yt.override(t.id,t.overrides)),o}get(t){return this.items[t]}unregister(t){const e=this.items,i=t.id,s=this.scope;i in e&&delete e[i],s&&i in yt[s]&&(delete yt[s][i],this.override&&delete Li[i])}}function f1(n,t,e){const i=Br(Object.create(null),[e?yt.get(e):{},yt.get(t),n.defaults]);yt.set(t,i),n.defaultRoutes&&p1(t,n.defaultRoutes),n.descriptors&&yt.describe(t,n.descriptors)}function p1(n,t){Object.keys(t).forEach(e=>{const i=e.split("."),s=i.pop(),r=[n].concat(i).join("."),o=t[e].split("."),a=o.pop(),c=o.join(".");yt.route(r,s,c,a)})}function g1(n){return"id"in n&&"defaults"in n}class m1{constructor(){this.controllers=new zo(Ae,"datasets",!0),this.elements=new zo(Ce,"elements"),this.plugins=new zo(Object,"plugins"),this.scales=new zo(Wi,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,i){[...e].forEach(s=>{const r=i||this._getRegistryForType(s);i||r.isForType(s)||r===this.plugins&&s.id?this._exec(t,r,s):at(s,o=>{const a=i||this._getRegistryForType(o);this._exec(t,a,o)})})}_exec(t,e,i){const s=Dh(t);ft(i["before"+s],[],i),e[t](i),ft(i["after"+s],[],i)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const i=this._typedRegistries[e];if(i.isForType(t))return i}return this.plugins}_get(t,e,i){const s=e.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return s}}var Oe=new m1;class _1{constructor(){this._init=void 0}notify(t,e,i,s){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const r=s?this._descriptors(t).filter(s):this._descriptors(t),o=this._notify(r,t,e,i);return e==="afterDestroy"&&(this._notify(r,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),o}_notify(t,e,i,s){s=s||{};for(const r of t){const o=r.plugin,a=o[i],c=[e,s,r.options];if(ft(a,c,o)===!1&&s.cancelable)return!1}return!0}invalidate(){X(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const i=t&&t.config,s=G(i.options&&i.options.plugins,{}),r=y1(i);return s===!1&&!e?[]:w1(t,r,s,e)}_notifyStateChanges(t){const e=this._oldCache||[],i=this._cache,s=(r,o)=>r.filter(a=>!o.some(c=>a.plugin.id===c.plugin.id));this._notify(s(e,i),t,"stop"),this._notify(s(i,e),t,"start")}}function y1(n){const t={},e=[],i=Object.keys(Oe.plugins.items);for(let r=0;r<i.length;r++)e.push(Oe.getPlugin(i[r]));const s=n.plugins||[];for(let r=0;r<s.length;r++){const o=s[r];e.indexOf(o)===-1&&(e.push(o),t[o.id]=!0)}return{plugins:e,localIds:t}}function b1(n,t){return!t&&n===!1?null:n===!0?{}:n}function w1(n,{plugins:t,localIds:e},i,s){const r=[],o=n.getContext();for(const a of t){const c=a.id,l=b1(i[c],s);l!==null&&r.push({plugin:a,options:v1(n.config,{plugin:a,local:e[c]},l,o)})}return r}function v1(n,{plugin:t,local:e},i,s){const r=n.pluginScopeKeys(t),o=n.getOptionScopes(i,r);return e&&t.defaults&&o.push(t.defaults),n.createResolver(o,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function cu(n,t){const e=yt.datasets[n]||{};return((t.datasets||{})[n]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function T1(n,t){let e=n;return n==="_index_"?e=t:n==="_value_"&&(e=t==="x"?"y":"x"),e}function E1(n,t){return n===t?"_index_":"_value_"}function Ig(n){if(n==="x"||n==="y"||n==="r")return n}function I1(n){if(n==="top"||n==="bottom")return"x";if(n==="left"||n==="right")return"y"}function lu(n,...t){if(Ig(n))return n;for(const e of t){const i=e.axis||I1(e.position)||n.length>1&&Ig(n[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`)}function Ag(n,t,e){if(e[t+"AxisID"]===n)return{axis:t}}function A1(n,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(i=>i.xAxisID===n||i.yAxisID===n);if(e.length)return Ag(n,"x",e[0])||Ag(n,"y",e[0])}return{}}function x1(n,t){const e=Li[n.type]||{scales:{}},i=t.scales||{},s=cu(n.type,t),r=Object.create(null);return Object.keys(i).forEach(o=>{const a=i[o];if(!nt(a))return console.error(`Invalid scale configuration for scale: ${o}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);const c=lu(o,a,A1(o,n),yt.scales[a.type]),l=E1(c,s),h=e.scales||{};r[o]=vr(Object.create(null),[{axis:c},a,h[c],h[l]])}),n.data.datasets.forEach(o=>{const a=o.type||n.type,c=o.indexAxis||cu(a,t),h=(Li[a]||{}).scales||{};Object.keys(h).forEach(d=>{const f=T1(d,c),m=o[f+"AxisID"]||f;r[m]=r[m]||Object.create(null),vr(r[m],[{axis:f},i[m],h[d]])})}),Object.keys(r).forEach(o=>{const a=r[o];vr(a,[yt.scales[a.type],yt.scale])}),r}function Kb(n){const t=n.options||(n.options={});t.plugins=G(t.plugins,{}),t.scales=x1(n,t)}function Yb(n){return n=n||{},n.datasets=n.datasets||[],n.labels=n.labels||[],n}function S1(n){return n=n||{},n.data=Yb(n.data),Kb(n),n}const xg=new Map,Qb=new Set;function $o(n,t){let e=xg.get(n);return e||(e=t(),xg.set(n,e),Qb.add(e)),e}const er=(n,t,e)=>{const i=Xn(t,e);i!==void 0&&n.add(i)};class P1{constructor(t){this._config=S1(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=Yb(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),Kb(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return $o(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return $o(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return $o(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,i=this.type;return $o(`${i}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const i=this._scopeCache;let s=i.get(t);return(!s||e)&&(s=new Map,i.set(t,s)),s}getOptionScopes(t,e,i){const{options:s,type:r}=this,o=this._cachedScopes(t,i),a=o.get(e);if(a)return a;const c=new Set;e.forEach(h=>{t&&(c.add(t),h.forEach(d=>er(c,t,d))),h.forEach(d=>er(c,s,d)),h.forEach(d=>er(c,Li[r]||{},d)),h.forEach(d=>er(c,yt,d)),h.forEach(d=>er(c,ru,d))});const l=Array.from(c);return l.length===0&&l.push(Object.create(null)),Qb.has(e)&&o.set(e,l),l}chartOptionScopes(){const{options:t,type:e}=this;return[t,Li[e]||{},yt.datasets[e]||{},{type:e},yt,ru]}resolveNamedOptions(t,e,i,s=[""]){const r={$shared:!0},{resolver:o,subPrefixes:a}=Sg(this._resolverCache,t,s);let c=o;if(C1(o,e)){r.$shared=!1,i=Jn(i)?i():i;const l=this.createResolver(t,i,a);c=vs(o,i,l)}for(const l of e)r[l]=c[l];return r}createResolver(t,e,i=[""],s){const{resolver:r}=Sg(this._resolverCache,t,i);return nt(e)?vs(r,e,void 0,s):r}}function Sg(n,t,e){let i=n.get(t);i||(i=new Map,n.set(t,i));const s=e.join();let r=i.get(s);return r||(r={resolver:Fh(t,e),subPrefixes:e.filter(a=>!a.toLowerCase().includes("hover"))},i.set(s,r)),r}const R1=n=>nt(n)&&Object.getOwnPropertyNames(n).some(t=>Jn(n[t]));function C1(n,t){const{isScriptable:e,isIndexable:i}=Pb(n);for(const s of t){const r=e(s),o=i(s),a=(o||r)&&n[s];if(r&&(Jn(a)||R1(a))||o&&_t(a))return!0}return!1}var k1="4.5.1";const D1=["top","bottom","left","right","chartArea"];function Pg(n,t){return n==="top"||n==="bottom"||D1.indexOf(n)===-1&&t==="x"}function Rg(n,t){return function(e,i){return e[n]===i[n]?e[t]-i[t]:e[n]-i[n]}}function Cg(n){const t=n.chart,e=t.options.animation;t.notifyPlugins("afterRender"),ft(e&&e.onComplete,[n],t)}function M1(n){const t=n.chart,e=t.options.animation;ft(e&&e.onProgress,[n],t)}function Xb(n){return zh()&&typeof n=="string"?n=document.getElementById(n):n&&n.length&&(n=n[0]),n&&n.canvas&&(n=n.canvas),n}const ca={},kg=n=>{const t=Xb(n);return Object.values(ca).filter(e=>e.canvas===t).pop()};function O1(n,t,e){const i=Object.keys(n);for(const s of i){const r=+s;if(r>=t){const o=n[s];delete n[s],(e>0||r>t)&&(n[r+e]=o)}}}function N1(n,t,e,i){return!e||n.type==="mouseout"?null:i?t:n}class Le{static register(...t){Oe.add(...t),Dg()}static unregister(...t){Oe.remove(...t),Dg()}constructor(t,e){const i=this.config=new P1(e),s=Xb(t),r=kg(s);if(r)throw new Error("Canvas is already in use. Chart with ID '"+r.id+"' must be destroyed before the canvas with ID '"+r.canvas.id+"' can be reused.");const o=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||Zk(s)),this.platform.updateConfig(i);const a=this.platform.acquireContext(s,o.aspectRatio),c=a&&a.canvas,l=c&&c.height,h=c&&c.width;if(this.id=VR(),this.ctx=a,this.canvas=c,this.width=h,this.height=l,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new _1,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=ZR(d=>this.update(d),o.resizeDelay||0),this._dataChanges=[],ca[this.id]=this,!a||!c){console.error("Failed to create chart: can't acquire context from the given item");return}Xe.listen(this,"complete",Cg),Xe.listen(this,"progress",M1),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:i,height:s,_aspectRatio:r}=this;return X(t)?e&&r?r:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return Oe}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():tg(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Xp(this.canvas,this.ctx),this}stop(){return Xe.stop(this),this}resize(t,e){Xe.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const i=this.options,s=this.canvas,r=i.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(s,t,e,r),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),c=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,tg(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),ft(i.onResize,[this,o],this),this.attached&&this._doResize(c)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};at(e,(i,s)=>{i.id=s})}buildOrUpdateScales(){const t=this.options,e=t.scales,i=this.scales,s=Object.keys(i).reduce((o,a)=>(o[a]=!1,o),{});let r=[];e&&(r=r.concat(Object.keys(e).map(o=>{const a=e[o],c=lu(o,a),l=c==="r",h=c==="x";return{options:a,dposition:l?"chartArea":h?"bottom":"left",dtype:l?"radialLinear":h?"category":"linear"}}))),at(r,o=>{const a=o.options,c=a.id,l=lu(c,a),h=G(a.type,o.dtype);(a.position===void 0||Pg(a.position,l)!==Pg(o.dposition))&&(a.position=o.dposition),s[c]=!0;let d=null;if(c in i&&i[c].type===h)d=i[c];else{const f=Oe.getScale(h);d=new f({id:c,type:h,ctx:this.ctx,chart:this}),i[d.id]=d}d.init(a,t)}),at(s,(o,a)=>{o||delete i[a]}),at(i,o=>{Kt.configure(this,o,o.options),Kt.addBox(this,o)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,i=t.length;if(t.sort((s,r)=>s.index-r.index),i>e){for(let s=e;s<i;++s)this._destroyDatasetMeta(s);t.splice(e,i-e)}this._sortedMetasets=t.slice(0).sort(Rg("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((i,s)=>{e.filter(r=>r===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=e.length;i<s;i++){const r=e[i];let o=this.getDatasetMeta(i);const a=r.type||this.config.type;if(o.type&&o.type!==a&&(this._destroyDatasetMeta(i),o=this.getDatasetMeta(i)),o.type=a,o.indexAxis=r.indexAxis||cu(a,this.options),o.order=r.order||0,o.index=i,o.label=""+r.label,o.visible=this.isDatasetVisible(i),o.controller)o.controller.updateIndex(i),o.controller.linkScales();else{const c=Oe.getController(a),{datasetElementType:l,dataElementType:h}=yt.datasets[a];Object.assign(c,{dataElementType:Oe.getElement(h),datasetElementType:l&&Oe.getElement(l)}),o.controller=new c(this,i),t.push(o.controller)}}return this._updateMetasets(),t}_resetElements(){at(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const i=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const r=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let l=0,h=this.data.datasets.length;l<h;l++){const{controller:d}=this.getDatasetMeta(l),f=!s&&r.indexOf(d)===-1;d.buildOrUpdateElements(f),o=Math.max(+d.getMaxOverflow(),o)}o=this._minPadding=i.layout.autoPadding?o:0,this._updateLayout(o),s||at(r,l=>{l.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(Rg("z","_idx"));const{_active:a,_lastEvent:c}=this;c?this._eventHandler(c,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){at(this.scales,t=>{Kt.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!$p(e,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:r}of e){const o=i==="_removeElements"?-r:r;O1(t,s,o)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,i=r=>new Set(t.filter(o=>o[0]===r).map((o,a)=>a+","+o.splice(1).join(","))),s=i(0);for(let r=1;r<e;r++)if(!$p(s,i(r)))return;return Array.from(s).map(r=>r.split(",")).map(r=>({method:r[1],start:+r[2],count:+r[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Kt.update(this,this.width,this.height,t);const e=this.chartArea,i=e.width<=0||e.height<=0;this._layers=[],at(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,r)=>{s._idx=r}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,i=this.data.datasets.length;e<i;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,i=this.data.datasets.length;e<i;++e)this._updateDataset(e,Jn(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(e),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Xe.has(this)?this.attached&&!Xe.running(this)&&Xe.start(this):(this.draw(),Cg({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,i=[];let s,r;for(s=0,r=e.length;s<r;++s){const o=e[s];(!t||o.visible)&&i.push(o)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,i={meta:t,index:t.index,cancelable:!0},s=Ub(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&Ac(e,s),t.controller.draw(),s&&xc(e),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return rn(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,i,s){const r=Dk.modes[e];return typeof r=="function"?r(this,t,i,s):[]}getDatasetMeta(t){const e=this.data.datasets[t],i=this._metasets;let s=i.filter(r=>r&&r._dataset===e).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=li(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!e.hidden}setDatasetVisibility(t,e){const i=this.getDatasetMeta(t);i.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,i){const s=i?"show":"hide",r=this.getDatasetMeta(t),o=r.controller._resolveAnimations(void 0,s);zr(e)?(r.data[e].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),o.update(r,{visible:i}),this.update(a=>a.datasetIndex===t?s:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),Xe.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Xp(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete ca[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,i=(r,o)=>{e.addEventListener(this,r,o),t[r]=o},s=(r,o,a)=>{r.offsetX=o,r.offsetY=a,this._eventHandler(r)};at(this.options.events,r=>i(r,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,i=(c,l)=>{e.addEventListener(this,c,l),t[c]=l},s=(c,l)=>{t[c]&&(e.removeEventListener(this,c,l),delete t[c])},r=(c,l)=>{this.canvas&&this.resize(c,l)};let o;const a=()=>{s("attach",a),this.attached=!0,this.resize(),i("resize",r),i("detach",o)};o=()=>{this.attached=!1,s("resize",r),this._stop(),this._resize(0,0),i("attach",a)},e.isAttached(this.canvas)?a():o()}unbindEvents(){at(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},at(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,i){const s=i?"set":"remove";let r,o,a,c;for(e==="dataset"&&(r=this.getDatasetMeta(t[0].datasetIndex),r.controller["_"+s+"DatasetHoverStyle"]()),a=0,c=t.length;a<c;++a){o=t[a];const l=o&&this.getDatasetMeta(o.datasetIndex).controller;l&&l[s+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],i=t.map(({datasetIndex:r,index:o})=>{const a=this.getDatasetMeta(r);if(!a)throw new Error("No dataset found at index "+r);return{datasetIndex:r,element:a.data[o],index:o}});!Fa(i,e)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,e))}notifyPlugins(t,e,i){return this._plugins.notify(this,t,e,i)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,i){const s=this.options.hover,r=(c,l)=>c.filter(h=>!l.some(d=>h.datasetIndex===d.datasetIndex&&h.index===d.index)),o=r(e,t),a=i?t:r(t,e);o.length&&this.updateHoverStyle(o,s.mode,!1),a.length&&s.mode&&this.updateHoverStyle(a,s.mode,!0)}_eventHandler(t,e){const i={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},s=o=>(o.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;const r=this._handleEvent(t,e,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(r||i.changed)&&this.render(),this}_handleEvent(t,e,i){const{_active:s=[],options:r}=this,o=e,a=this._getActiveElements(t,s,i,o),c=$R(t),l=N1(t,this._lastEvent,i,c);i&&(this._lastEvent=null,ft(r.onHover,[t,a,this],this),c&&ft(r.onClick,[t,a,this],this));const h=!Fa(a,s);return(h||e)&&(this._active=a,this._updateHoverStyles(a,s,e)),this._lastEvent=l,h}_getActiveElements(t,e,i,s){if(t.type==="mouseout")return[];if(!i)return e;const r=this.options.hover;return this.getElementsAtEventForMode(t,r.mode,r,s)}}U(Le,"defaults",yt),U(Le,"instances",ca),U(Le,"overrides",Li),U(Le,"registry",Oe),U(Le,"version",k1),U(Le,"getChart",kg);function Dg(){return at(Le.instances,n=>n._plugins.invalidate())}function V1(n,t,e){const{startAngle:i,x:s,y:r,outerRadius:o,innerRadius:a,options:c}=t,{borderWidth:l,borderJoinStyle:h}=c,d=Math.min(l/o,Gt(i-e));if(n.beginPath(),n.arc(s,r,o-l/2,i+d/2,e-d/2),a>0){const f=Math.min(l/a,Gt(i-e));n.arc(s,r,a+l/2,e-f/2,i+f/2,!0)}else{const f=Math.min(l/2,o*Gt(i-e));if(h==="round")n.arc(s,r,f,e-rt/2,i+rt/2,!0);else if(h==="bevel"){const m=2*f*f,_=-m*Math.cos(e+rt/2)+s,b=-m*Math.sin(e+rt/2)+r,v=m*Math.cos(i+rt/2)+s,S=m*Math.sin(i+rt/2)+r;n.lineTo(_,b),n.lineTo(v,S)}}n.closePath(),n.moveTo(0,0),n.rect(0,0,n.canvas.width,n.canvas.height),n.clip("evenodd")}function L1(n,t,e){const{startAngle:i,pixelMargin:s,x:r,y:o,outerRadius:a,innerRadius:c}=t;let l=s/a;n.beginPath(),n.arc(r,o,a,i-l,e+l),c>s?(l=s/c,n.arc(r,o,c,e+l,i-l,!0)):n.arc(r,o,s,e+xt,i-xt),n.closePath(),n.clip()}function F1(n){return Lh(n,["outerStart","outerEnd","innerStart","innerEnd"])}function U1(n,t,e,i){const s=F1(n.options.borderRadius),r=(e-t)/2,o=Math.min(r,i*t/2),a=c=>{const l=(e-Math.min(r,c))*i/2;return Lt(c,0,Math.min(r,l))};return{outerStart:a(s.outerStart),outerEnd:a(s.outerEnd),innerStart:Lt(s.innerStart,0,o),innerEnd:Lt(s.innerEnd,0,o)}}function Xi(n,t,e,i){return{x:e+n*Math.cos(t),y:i+n*Math.sin(t)}}function Ha(n,t,e,i,s,r){const{x:o,y:a,startAngle:c,pixelMargin:l,innerRadius:h}=t,d=Math.max(t.outerRadius+i+e-l,0),f=h>0?h+i+e+l:0;let m=0;const _=s-c;if(i){const J=h>0?h-i:0,dt=d>0?d-i:0,bt=(J+dt)/2,$t=bt!==0?_*bt/(bt+i):_;m=(_-$t)/2}const b=Math.max(.001,_*d-e/rt)/d,v=(_-b)/2,S=c+v+m,R=s-v-m,{outerStart:D,outerEnd:N,innerStart:M,innerEnd:L}=U1(t,f,d,R-S),E=d-D,w=d-N,T=S+D/E,x=R-N/w,A=f+M,P=f+L,I=S+M/A,ct=R-L/P;if(n.beginPath(),r){const J=(T+x)/2;if(n.arc(o,a,d,T,J),n.arc(o,a,d,J,x),N>0){const It=Xi(w,x,o,a);n.arc(It.x,It.y,N,x,R+xt)}const dt=Xi(P,R,o,a);if(n.lineTo(dt.x,dt.y),L>0){const It=Xi(P,ct,o,a);n.arc(It.x,It.y,L,R+xt,ct+Math.PI)}const bt=(R-L/f+(S+M/f))/2;if(n.arc(o,a,f,R-L/f,bt,!0),n.arc(o,a,f,bt,S+M/f,!0),M>0){const It=Xi(A,I,o,a);n.arc(It.x,It.y,M,I+Math.PI,S-xt)}const $t=Xi(E,S,o,a);if(n.lineTo($t.x,$t.y),D>0){const It=Xi(E,T,o,a);n.arc(It.x,It.y,D,S-xt,T)}}else{n.moveTo(o,a);const J=Math.cos(T)*d+o,dt=Math.sin(T)*d+a;n.lineTo(J,dt);const bt=Math.cos(x)*d+o,$t=Math.sin(x)*d+a;n.lineTo(bt,$t)}n.closePath()}function B1(n,t,e,i,s){const{fullCircles:r,startAngle:o,circumference:a}=t;let c=t.endAngle;if(r){Ha(n,t,e,i,c,s);for(let l=0;l<r;++l)n.fill();isNaN(a)||(c=o+(a%mt||mt))}return Ha(n,t,e,i,c,s),n.fill(),c}function z1(n,t,e,i,s){const{fullCircles:r,startAngle:o,circumference:a,options:c}=t,{borderWidth:l,borderJoinStyle:h,borderDash:d,borderDashOffset:f,borderRadius:m}=c,_=c.borderAlign==="inner";if(!l)return;n.setLineDash(d||[]),n.lineDashOffset=f,_?(n.lineWidth=l*2,n.lineJoin=h||"round"):(n.lineWidth=l,n.lineJoin=h||"bevel");let b=t.endAngle;if(r){Ha(n,t,e,i,b,s);for(let v=0;v<r;++v)n.stroke();isNaN(a)||(b=o+(a%mt||mt))}_&&L1(n,t,b),c.selfJoin&&b-o>=rt&&m===0&&h!=="miter"&&V1(n,t,b),r||(Ha(n,t,e,i,b,s),n.stroke())}class hr extends Ce{constructor(e){super();U(this,"circumference");U(this,"endAngle");U(this,"fullCircles");U(this,"innerRadius");U(this,"outerRadius");U(this,"pixelMargin");U(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,i,s){const r=this.getProps(["x","y"],s),{angle:o,distance:a}=yb(r,{x:e,y:i}),{startAngle:c,endAngle:l,innerRadius:h,outerRadius:d,circumference:f}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],s),m=(this.options.spacing+this.options.borderWidth)/2,_=G(f,l-c),b=$r(o,c,l)&&c!==l,v=_>=mt||b,S=nn(a,h+m,d+m);return v&&S}getCenterPoint(e){const{x:i,y:s,startAngle:r,endAngle:o,innerRadius:a,outerRadius:c}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:l,spacing:h}=this.options,d=(r+o)/2,f=(a+c+h+l)/2;return{x:i+Math.cos(d)*f,y:s+Math.sin(d)*f}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:i,circumference:s}=this,r=(i.offset||0)/4,o=(i.spacing||0)/2,a=i.circular;if(this.pixelMargin=i.borderAlign==="inner"?.33:0,this.fullCircles=s>mt?Math.floor(s/mt):0,s===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const c=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(c)*r,Math.sin(c)*r);const l=1-Math.sin(Math.min(rt,s||0)),h=r*l;e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,B1(e,this,h,o,a),z1(e,this,h,o,a),e.restore()}}U(hr,"id","arc"),U(hr,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),U(hr,"defaultRoutes",{backgroundColor:"backgroundColor"}),U(hr,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function Jb(n,t,e=t){n.lineCap=G(e.borderCapStyle,t.borderCapStyle),n.setLineDash(G(e.borderDash,t.borderDash)),n.lineDashOffset=G(e.borderDashOffset,t.borderDashOffset),n.lineJoin=G(e.borderJoinStyle,t.borderJoinStyle),n.lineWidth=G(e.borderWidth,t.borderWidth),n.strokeStyle=G(e.borderColor,t.borderColor)}function $1(n,t,e){n.lineTo(e.x,e.y)}function j1(n){return n.stepped?hC:n.tension||n.cubicInterpolationMode==="monotone"?dC:$1}function Zb(n,t,e={}){const i=n.length,{start:s=0,end:r=i-1}=e,{start:o,end:a}=t,c=Math.max(s,o),l=Math.min(r,a),h=s<o&&r<o||s>a&&r>a;return{count:i,start:c,loop:t.loop,ilen:l<c&&!h?i+l-c:l-c}}function H1(n,t,e,i){const{points:s,options:r}=t,{count:o,start:a,loop:c,ilen:l}=Zb(s,e,i),h=j1(r);let{move:d=!0,reverse:f}=i||{},m,_,b;for(m=0;m<=l;++m)_=s[(a+(f?l-m:m))%o],!_.skip&&(d?(n.moveTo(_.x,_.y),d=!1):h(n,b,_,f,r.stepped),b=_);return c&&(_=s[(a+(f?l:0))%o],h(n,b,_,f,r.stepped)),!!c}function W1(n,t,e,i){const s=t.points,{count:r,start:o,ilen:a}=Zb(s,e,i),{move:c=!0,reverse:l}=i||{};let h=0,d=0,f,m,_,b,v,S;const R=N=>(o+(l?a-N:N))%r,D=()=>{b!==v&&(n.lineTo(h,v),n.lineTo(h,b),n.lineTo(h,S))};for(c&&(m=s[R(0)],n.moveTo(m.x,m.y)),f=0;f<=a;++f){if(m=s[R(f)],m.skip)continue;const N=m.x,M=m.y,L=N|0;L===_?(M<b?b=M:M>v&&(v=M),h=(d*h+N)/++d):(D(),n.lineTo(N,M),_=L,d=0,b=v=M),S=M}D()}function uu(n){const t=n.options,e=t.borderDash&&t.borderDash.length;return!n._decimated&&!n._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?W1:H1}function q1(n){return n.stepped?HC:n.tension||n.cubicInterpolationMode==="monotone"?WC:Ti}function G1(n,t,e,i){let s=t._path;s||(s=t._path=new Path2D,t.path(s,e,i)&&s.closePath()),Jb(n,t.options),n.stroke(s)}function K1(n,t,e,i){const{segments:s,options:r}=t,o=uu(t);for(const a of s)Jb(n,r,a.style),n.beginPath(),o(n,t,a,{start:e,end:e+i-1})&&n.closePath(),n.stroke()}const Y1=typeof Path2D=="function";function Q1(n,t,e,i){Y1&&!t.options.segment?G1(n,t,e,i):K1(n,t,e,i)}class Vn extends Ce{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;VC(this._points,i,t,s,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=XC(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,i=t.length;return i&&e[t[i-1].end]}interpolate(t,e){const i=this.options,s=t[e],r=this.points,o=Fb(this,{property:e,start:s,end:s});if(!o.length)return;const a=[],c=q1(i);let l,h;for(l=0,h=o.length;l<h;++l){const{start:d,end:f}=o[l],m=r[d],_=r[f];if(m===_){a.push(m);continue}const b=Math.abs((s-m[e])/(_[e]-m[e])),v=c(m,_,b,i.stepped);v[e]=t[e],a.push(v)}return a.length===1?a[0]:a}pathSegment(t,e,i){return uu(this)(t,this,e,i)}path(t,e,i){const s=this.segments,r=uu(this);let o=this._loop;e=e||0,i=i||this.points.length-e;for(const a of s)o&=r(t,this,a,{start:e,end:e+i-1});return!!o}draw(t,e,i,s){const r=this.options||{};(this.points||[]).length&&r.borderWidth&&(t.save(),Q1(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}U(Vn,"id","line"),U(Vn,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),U(Vn,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),U(Vn,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function Mg(n,t,e,i){const s=n.options,{[e]:r}=n.getProps([e],i);return Math.abs(t-r)<s.radius+s.hitRadius}class la extends Ce{constructor(e){super();U(this,"parsed");U(this,"skip");U(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,i,s){const r=this.options,{x:o,y:a}=this.getProps(["x","y"],s);return Math.pow(e-o,2)+Math.pow(i-a,2)<Math.pow(r.hitRadius+r.radius,2)}inXRange(e,i){return Mg(this,e,"x",i)}inYRange(e,i){return Mg(this,e,"y",i)}getCenterPoint(e){const{x:i,y:s}=this.getProps(["x","y"],e);return{x:i,y:s}}size(e){e=e||this.options||{};let i=e.radius||0;i=Math.max(i,i&&e.hoverRadius||0);const s=i&&e.borderWidth||0;return(i+s)*2}draw(e,i){const s=this.options;this.skip||s.radius<.1||!rn(this,i,this.size(s)/2)||(e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.fillStyle=s.backgroundColor,ou(e,s,this.x,this.y))}getRange(){const e=this.options||{};return e.radius+e.hitRadius}}U(la,"id","point"),U(la,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),U(la,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function tw(n,t){const{x:e,y:i,base:s,width:r,height:o}=n.getProps(["x","y","base","width","height"],t);let a,c,l,h,d;return n.horizontal?(d=o/2,a=Math.min(e,s),c=Math.max(e,s),l=i-d,h=i+d):(d=r/2,a=e-d,c=e+d,l=Math.min(i,s),h=Math.max(i,s)),{left:a,top:l,right:c,bottom:h}}function Ln(n,t,e,i){return n?0:Lt(t,e,i)}function X1(n,t,e){const i=n.options.borderWidth,s=n.borderSkipped,r=Sb(i);return{t:Ln(s.top,r.top,0,e),r:Ln(s.right,r.right,0,t),b:Ln(s.bottom,r.bottom,0,e),l:Ln(s.left,r.left,0,t)}}function J1(n,t,e){const{enableBorderRadius:i}=n.getProps(["enableBorderRadius"]),s=n.options.borderRadius,r=Ri(s),o=Math.min(t,e),a=n.borderSkipped,c=i||nt(s);return{topLeft:Ln(!c||a.top||a.left,r.topLeft,0,o),topRight:Ln(!c||a.top||a.right,r.topRight,0,o),bottomLeft:Ln(!c||a.bottom||a.left,r.bottomLeft,0,o),bottomRight:Ln(!c||a.bottom||a.right,r.bottomRight,0,o)}}function Z1(n){const t=tw(n),e=t.right-t.left,i=t.bottom-t.top,s=X1(n,e/2,i/2),r=J1(n,e/2,i/2);return{outer:{x:t.left,y:t.top,w:e,h:i,radius:r},inner:{x:t.left+s.l,y:t.top+s.t,w:e-s.l-s.r,h:i-s.t-s.b,radius:{topLeft:Math.max(0,r.topLeft-Math.max(s.t,s.l)),topRight:Math.max(0,r.topRight-Math.max(s.t,s.r)),bottomLeft:Math.max(0,r.bottomLeft-Math.max(s.b,s.l)),bottomRight:Math.max(0,r.bottomRight-Math.max(s.b,s.r))}}}}function Al(n,t,e,i){const s=t===null,r=e===null,a=n&&!(s&&r)&&tw(n,i);return a&&(s||nn(t,a.left,a.right))&&(r||nn(e,a.top,a.bottom))}function tD(n){return n.topLeft||n.topRight||n.bottomLeft||n.bottomRight}function eD(n,t){n.rect(t.x,t.y,t.w,t.h)}function xl(n,t,e={}){const i=n.x!==e.x?-t:0,s=n.y!==e.y?-t:0,r=(n.x+n.w!==e.x+e.w?t:0)-i,o=(n.y+n.h!==e.y+e.h?t:0)-s;return{x:n.x+i,y:n.y+s,w:n.w+r,h:n.h+o,radius:n.radius}}class ua extends Ce{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:i,backgroundColor:s}}=this,{inner:r,outer:o}=Z1(this),a=tD(o.radius)?jr:eD;t.save(),(o.w!==r.w||o.h!==r.h)&&(t.beginPath(),a(t,xl(o,e,r)),t.clip(),a(t,xl(r,-e,o)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),a(t,xl(r,e)),t.fillStyle=s,t.fill(),t.restore()}inRange(t,e,i){return Al(this,t,e,i)}inXRange(t,e){return Al(this,t,null,e)}inYRange(t,e){return Al(this,null,t,e)}getCenterPoint(t){const{x:e,y:i,base:s,horizontal:r}=this.getProps(["x","y","base","horizontal"],t);return{x:r?(e+s)/2:e,y:r?i:(i+s)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}U(ua,"id","bar"),U(ua,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),U(ua,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var nD=Object.freeze({__proto__:null,ArcElement:hr,BarElement:ua,LineElement:Vn,PointElement:la});const hu=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Og=hu.map(n=>n.replace("rgb(","rgba(").replace(")",", 0.5)"));function ew(n){return hu[n%hu.length]}function nw(n){return Og[n%Og.length]}function iD(n,t){return n.borderColor=ew(t),n.backgroundColor=nw(t),++t}function sD(n,t){return n.backgroundColor=n.data.map(()=>ew(t++)),t}function rD(n,t){return n.backgroundColor=n.data.map(()=>nw(t++)),t}function oD(n){let t=0;return(e,i)=>{const s=n.getDatasetMeta(i).controller;s instanceof xi?t=sD(e,t):s instanceof Ar?t=rD(e,t):s&&(t=iD(e,t))}}function Ng(n){let t;for(t in n)if(n[t].borderColor||n[t].backgroundColor)return!0;return!1}function aD(n){return n&&(n.borderColor||n.backgroundColor)}function cD(){return yt.borderColor!=="rgba(0,0,0,0.1)"||yt.backgroundColor!=="rgba(0,0,0,0.1)"}var lD={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(n,t,e){if(!e.enabled)return;const{data:{datasets:i},options:s}=n.config,{elements:r}=s,o=Ng(i)||aD(s)||r&&Ng(r)||cD();if(!e.forceOverride&&o)return;const a=oD(n);i.forEach(a)}};function uD(n,t,e,i,s){const r=s.samples||i;if(r>=e)return n.slice(t,t+e);const o=[],a=(e-2)/(r-2);let c=0;const l=t+e-1;let h=t,d,f,m,_,b;for(o[c++]=n[h],d=0;d<r-2;d++){let v=0,S=0,R;const D=Math.floor((d+1)*a)+1+t,N=Math.min(Math.floor((d+2)*a)+1,e)+t,M=N-D;for(R=D;R<N;R++)v+=n[R].x,S+=n[R].y;v/=M,S/=M;const L=Math.floor(d*a)+1+t,E=Math.min(Math.floor((d+1)*a)+1,e)+t,{x:w,y:T}=n[h];for(m=_=-1,R=L;R<E;R++)_=.5*Math.abs((w-v)*(n[R].y-T)-(w-n[R].x)*(S-T)),_>m&&(m=_,f=n[R],b=R);o[c++]=f,h=b}return o[c++]=n[l],o}function hD(n,t,e,i){let s=0,r=0,o,a,c,l,h,d,f,m,_,b;const v=[],S=t+e-1,R=n[t].x,N=n[S].x-R;for(o=t;o<t+e;++o){a=n[o],c=(a.x-R)/N*i,l=a.y;const M=c|0;if(M===h)l<_?(_=l,d=o):l>b&&(b=l,f=o),s=(r*s+a.x)/++r;else{const L=o-1;if(!X(d)&&!X(f)){const E=Math.min(d,f),w=Math.max(d,f);E!==m&&E!==L&&v.push({...n[E],x:s}),w!==m&&w!==L&&v.push({...n[w],x:s})}o>0&&L!==m&&v.push(n[L]),v.push(a),h=M,r=0,_=b=l,d=f=m=o}}return v}function iw(n){if(n._decimated){const t=n._data;delete n._decimated,delete n._data,Object.defineProperty(n,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Vg(n){n.data.datasets.forEach(t=>{iw(t)})}function dD(n,t){const e=t.length;let i=0,s;const{iScale:r}=n,{min:o,max:a,minDefined:c,maxDefined:l}=r.getUserBounds();return c&&(i=Lt(sn(t,r.axis,o).lo,0,e-1)),l?s=Lt(sn(t,r.axis,a).hi+1,i,e)-i:s=e-i,{start:i,count:s}}var fD={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(n,t,e)=>{if(!e.enabled){Vg(n);return}const i=n.width;n.data.datasets.forEach((s,r)=>{const{_data:o,indexAxis:a}=s,c=n.getDatasetMeta(r),l=o||s.data;if(lr([a,n.options.indexAxis])==="y"||!c.controller.supportsDecimation)return;const h=n.scales[c.xAxisID];if(h.type!=="linear"&&h.type!=="time"||n.options.parsing)return;let{start:d,count:f}=dD(c,l);const m=e.threshold||4*i;if(f<=m){iw(s);return}X(o)&&(s._data=l,delete s.data,Object.defineProperty(s,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(b){this._data=b}}));let _;switch(e.algorithm){case"lttb":_=uD(l,d,f,i,e);break;case"min-max":_=hD(l,d,f,i);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}s._decimated=_})},destroy(n){Vg(n)}};function pD(n,t,e){const i=n.segments,s=n.points,r=t.points,o=[];for(const a of i){let{start:c,end:l}=a;l=Rc(c,l,s);const h=du(e,s[c],s[l],a.loop);if(!t.segments){o.push({source:a,target:h,start:s[c],end:s[l]});continue}const d=Fb(t,h);for(const f of d){const m=du(e,r[f.start],r[f.end],f.loop),_=Lb(a,s,m);for(const b of _)o.push({source:b,target:f,start:{[e]:Lg(h,m,"start",Math.max)},end:{[e]:Lg(h,m,"end",Math.min)}})}}return o}function du(n,t,e,i){if(i)return;let s=t[n],r=e[n];return n==="angle"&&(s=Gt(s),r=Gt(r)),{property:n,start:s,end:r}}function gD(n,t){const{x:e=null,y:i=null}=n||{},s=t.points,r=[];return t.segments.forEach(({start:o,end:a})=>{a=Rc(o,a,s);const c=s[o],l=s[a];i!==null?(r.push({x:c.x,y:i}),r.push({x:l.x,y:i})):e!==null&&(r.push({x:e,y:c.y}),r.push({x:e,y:l.y}))}),r}function Rc(n,t,e){for(;t>n;t--){const i=e[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function Lg(n,t,e,i){return n&&t?i(n[e],t[e]):n?n[e]:t?t[e]:0}function sw(n,t){let e=[],i=!1;return _t(n)?(i=!0,e=n):e=gD(n,t),e.length?new Vn({points:e,options:{tension:0},_loop:i,_fullLoop:i}):null}function Fg(n){return n&&n.fill!==!1}function mD(n,t,e){let s=n[t].fill;const r=[t];let o;if(!e)return s;for(;s!==!1&&r.indexOf(s)===-1;){if(!Et(s))return s;if(o=n[s],!o)return!1;if(o.visible)return s;r.push(s),s=o.fill}return!1}function _D(n,t,e){const i=vD(n);if(nt(i))return isNaN(i.value)?!1:i;let s=parseFloat(i);return Et(s)&&Math.floor(s)===s?yD(i[0],t,s,e):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function yD(n,t,e,i){return(n==="-"||n==="+")&&(e=t+e),e===t||e<0||e>=i?!1:e}function bD(n,t){let e=null;return n==="start"?e=t.bottom:n==="end"?e=t.top:nt(n)?e=t.getPixelForValue(n.value):t.getBasePixel&&(e=t.getBasePixel()),e}function wD(n,t,e){let i;return n==="start"?i=e:n==="end"?i=t.options.reverse?t.min:t.max:nt(n)?i=n.value:i=t.getBaseValue(),i}function vD(n){const t=n.options,e=t.fill;let i=G(e&&e.target,e);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function TD(n){const{scale:t,index:e,line:i}=n,s=[],r=i.segments,o=i.points,a=ED(t,e);a.push(sw({x:null,y:t.bottom},i));for(let c=0;c<r.length;c++){const l=r[c];for(let h=l.start;h<=l.end;h++)ID(s,o[h],a)}return new Vn({points:s,options:{}})}function ED(n,t){const e=[],i=n.getMatchingVisibleMetas("line");for(let s=0;s<i.length;s++){const r=i[s];if(r.index===t)break;r.hidden||e.unshift(r.dataset)}return e}function ID(n,t,e){const i=[];for(let s=0;s<e.length;s++){const r=e[s],{first:o,last:a,point:c}=AD(r,t,"x");if(!(!c||o&&a)){if(o)i.unshift(c);else if(n.push(c),!a)break}}n.push(...i)}function AD(n,t,e){const i=n.interpolate(t,e);if(!i)return{};const s=i[e],r=n.segments,o=n.points;let a=!1,c=!1;for(let l=0;l<r.length;l++){const h=r[l],d=o[h.start][e],f=o[h.end][e];if(nn(s,d,f)){a=s===d,c=s===f;break}}return{first:a,last:c,point:i}}class rw{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,i){const{x:s,y:r,radius:o}=this;return e=e||{start:0,end:mt},t.arc(s,r,o,e.end,e.start,!0),!i.bounds}interpolate(t){const{x:e,y:i,radius:s}=this,r=t.angle;return{x:e+Math.cos(r)*s,y:i+Math.sin(r)*s,angle:r}}}function xD(n){const{chart:t,fill:e,line:i}=n;if(Et(e))return SD(t,e);if(e==="stack")return TD(n);if(e==="shape")return!0;const s=PD(n);return s instanceof rw?s:sw(s,i)}function SD(n,t){const e=n.getDatasetMeta(t);return e&&n.isDatasetVisible(t)?e.dataset:null}function PD(n){return(n.scale||{}).getPointPositionForValue?CD(n):RD(n)}function RD(n){const{scale:t={},fill:e}=n,i=bD(e,t);if(Et(i)){const s=t.isHorizontal();return{x:s?i:null,y:s?null:i}}return null}function CD(n){const{scale:t,fill:e}=n,i=t.options,s=t.getLabels().length,r=i.reverse?t.max:t.min,o=wD(e,t,r),a=[];if(i.grid.circular){const c=t.getPointPositionForValue(0,r);return new rw({x:c.x,y:c.y,radius:t.getDistanceFromCenterForValue(o)})}for(let c=0;c<s;++c)a.push(t.getPointPositionForValue(c,o));return a}function Sl(n,t,e){const i=xD(t),{chart:s,index:r,line:o,scale:a,axis:c}=t,l=o.options,h=l.fill,d=l.backgroundColor,{above:f=d,below:m=d}=h||{},_=s.getDatasetMeta(r),b=Ub(s,_);i&&o.points.length&&(Ac(n,e),kD(n,{line:o,target:i,above:f,below:m,area:e,scale:a,axis:c,clip:b}),xc(n))}function kD(n,t){const{line:e,target:i,above:s,below:r,area:o,scale:a,clip:c}=t,l=e._loop?"angle":t.axis;n.save();let h=r;r!==s&&(l==="x"?(Ug(n,i,o.top),Pl(n,{line:e,target:i,color:s,scale:a,property:l,clip:c}),n.restore(),n.save(),Ug(n,i,o.bottom)):l==="y"&&(Bg(n,i,o.left),Pl(n,{line:e,target:i,color:r,scale:a,property:l,clip:c}),n.restore(),n.save(),Bg(n,i,o.right),h=s)),Pl(n,{line:e,target:i,color:h,scale:a,property:l,clip:c}),n.restore()}function Ug(n,t,e){const{segments:i,points:s}=t;let r=!0,o=!1;n.beginPath();for(const a of i){const{start:c,end:l}=a,h=s[c],d=s[Rc(c,l,s)];r?(n.moveTo(h.x,h.y),r=!1):(n.lineTo(h.x,e),n.lineTo(h.x,h.y)),o=!!t.pathSegment(n,a,{move:o}),o?n.closePath():n.lineTo(d.x,e)}n.lineTo(t.first().x,e),n.closePath(),n.clip()}function Bg(n,t,e){const{segments:i,points:s}=t;let r=!0,o=!1;n.beginPath();for(const a of i){const{start:c,end:l}=a,h=s[c],d=s[Rc(c,l,s)];r?(n.moveTo(h.x,h.y),r=!1):(n.lineTo(e,h.y),n.lineTo(h.x,h.y)),o=!!t.pathSegment(n,a,{move:o}),o?n.closePath():n.lineTo(e,d.y)}n.lineTo(e,t.first().y),n.closePath(),n.clip()}function Pl(n,t){const{line:e,target:i,property:s,color:r,scale:o,clip:a}=t,c=pD(e,i,s);for(const{source:l,target:h,start:d,end:f}of c){const{style:{backgroundColor:m=r}={}}=l,_=i!==!0;n.save(),n.fillStyle=m,DD(n,o,a,_&&du(s,d,f)),n.beginPath();const b=!!e.pathSegment(n,l);let v;if(_){b?n.closePath():zg(n,i,f,s);const S=!!i.pathSegment(n,h,{move:b,reverse:!0});v=b&&S,v||zg(n,i,d,s)}n.closePath(),n.fill(v?"evenodd":"nonzero"),n.restore()}}function DD(n,t,e,i){const s=t.chart.chartArea,{property:r,start:o,end:a}=i||{};if(r==="x"||r==="y"){let c,l,h,d;r==="x"?(c=o,l=s.top,h=a,d=s.bottom):(c=s.left,l=o,h=s.right,d=a),n.beginPath(),e&&(c=Math.max(c,e.left),h=Math.min(h,e.right),l=Math.max(l,e.top),d=Math.min(d,e.bottom)),n.rect(c,l,h-c,d-l),n.clip()}}function zg(n,t,e,i){const s=t.interpolate(e,i);s&&n.lineTo(s.x,s.y)}var MD={id:"filler",afterDatasetsUpdate(n,t,e){const i=(n.data.datasets||[]).length,s=[];let r,o,a,c;for(o=0;o<i;++o)r=n.getDatasetMeta(o),a=r.dataset,c=null,a&&a.options&&a instanceof Vn&&(c={visible:n.isDatasetVisible(o),index:o,fill:_D(a,o,i),chart:n,axis:r.controller.options.indexAxis,scale:r.vScale,line:a}),r.$filler=c,s.push(c);for(o=0;o<i;++o)c=s[o],!(!c||c.fill===!1)&&(c.fill=mD(s,o,e.propagate))},beforeDraw(n,t,e){const i=e.drawTime==="beforeDraw",s=n.getSortedVisibleDatasetMetas(),r=n.chartArea;for(let o=s.length-1;o>=0;--o){const a=s[o].$filler;a&&(a.line.updateControlPoints(r,a.axis),i&&a.fill&&Sl(n.ctx,a,r))}},beforeDatasetsDraw(n,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const i=n.getSortedVisibleDatasetMetas();for(let s=i.length-1;s>=0;--s){const r=i[s].$filler;Fg(r)&&Sl(n.ctx,r,n.chartArea)}},beforeDatasetDraw(n,t,e){const i=t.meta.$filler;!Fg(i)||e.drawTime!=="beforeDatasetDraw"||Sl(n.ctx,i,n.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const $g=(n,t)=>{let{boxHeight:e=t,boxWidth:i=t}=n;return n.usePointStyle&&(e=Math.min(e,t),i=n.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:e,itemHeight:Math.max(t,e)}},OD=(n,t)=>n!==null&&t!==null&&n.datasetIndex===t.datasetIndex&&n.index===t.index;class jg extends Ce{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,i){this.maxWidth=t,this.maxHeight=e,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=ft(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(i=>t.filter(i,this.chart.data))),t.sort&&(e=e.sort((i,s)=>t.sort(i,s,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,s=Dt(i.font),r=s.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:c}=$g(i,r);let l,h;e.font=s.string,this.isHorizontal()?(l=this.maxWidth,h=this._fitRows(o,r,a,c)+10):(h=this.maxHeight,l=this._fitCols(o,s,a,c)+10),this.width=Math.min(l,t.maxWidth||this.maxWidth),this.height=Math.min(h,t.maxHeight||this.maxHeight)}_fitRows(t,e,i,s){const{ctx:r,maxWidth:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.lineWidths=[0],h=s+a;let d=t;r.textAlign="left",r.textBaseline="middle";let f=-1,m=-h;return this.legendItems.forEach((_,b)=>{const v=i+e/2+r.measureText(_.text).width;(b===0||l[l.length-1]+v+2*a>o)&&(d+=h,l[l.length-(b>0?0:1)]=0,m+=h,f++),c[b]={left:0,top:m,row:f,width:v,height:s},l[l.length-1]+=v+a}),d}_fitCols(t,e,i,s){const{ctx:r,maxHeight:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.columnSizes=[],h=o-t;let d=a,f=0,m=0,_=0,b=0;return this.legendItems.forEach((v,S)=>{const{itemWidth:R,itemHeight:D}=ND(i,e,r,v,s);S>0&&m+D+2*a>h&&(d+=f+a,l.push({width:f,height:m}),_+=f+a,b++,f=m=0),c[S]={left:_,top:m,col:b,width:R,height:D},f=Math.max(f,R),m+=D+a}),d+=f,l.push({width:f,height:m}),d}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:i,labels:{padding:s},rtl:r}}=this,o=ls(r,this.left,this.width);if(this.isHorizontal()){let a=0,c=Wt(i,this.left+s,this.right-this.lineWidths[a]);for(const l of e)a!==l.row&&(a=l.row,c=Wt(i,this.left+s,this.right-this.lineWidths[a])),l.top+=this.top+t+s,l.left=o.leftForLtr(o.x(c),l.width),c+=l.width+s}else{let a=0,c=Wt(i,this.top+t+s,this.bottom-this.columnSizes[a].height);for(const l of e)l.col!==a&&(a=l.col,c=Wt(i,this.top+t+s,this.bottom-this.columnSizes[a].height)),l.top=c,l.left+=this.left+s,l.left=o.leftForLtr(o.x(l.left),l.width),c+=l.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Ac(t,this),this._draw(),xc(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:i,ctx:s}=this,{align:r,labels:o}=t,a=yt.color,c=ls(t.rtl,this.left,this.width),l=Dt(o.font),{padding:h}=o,d=l.size,f=d/2;let m;this.drawTitle(),s.textAlign=c.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=l.string;const{boxWidth:_,boxHeight:b,itemHeight:v}=$g(o,d),S=function(L,E,w){if(isNaN(_)||_<=0||isNaN(b)||b<0)return;s.save();const T=G(w.lineWidth,1);if(s.fillStyle=G(w.fillStyle,a),s.lineCap=G(w.lineCap,"butt"),s.lineDashOffset=G(w.lineDashOffset,0),s.lineJoin=G(w.lineJoin,"miter"),s.lineWidth=T,s.strokeStyle=G(w.strokeStyle,a),s.setLineDash(G(w.lineDash,[])),o.usePointStyle){const x={radius:b*Math.SQRT2/2,pointStyle:w.pointStyle,rotation:w.rotation,borderWidth:T},A=c.xPlus(L,_/2),P=E+f;xb(s,x,A,P,o.pointStyleWidth&&_)}else{const x=E+Math.max((d-b)/2,0),A=c.leftForLtr(L,_),P=Ri(w.borderRadius);s.beginPath(),Object.values(P).some(I=>I!==0)?jr(s,{x:A,y:x,w:_,h:b,radius:P}):s.rect(A,x,_,b),s.fill(),T!==0&&s.stroke()}s.restore()},R=function(L,E,w){Fi(s,w.text,L,E+v/2,l,{strikethrough:w.hidden,textAlign:c.textAlign(w.textAlign)})},D=this.isHorizontal(),N=this._computeTitleHeight();D?m={x:Wt(r,this.left+h,this.right-i[0]),y:this.top+h+N,line:0}:m={x:this.left+h,y:Wt(r,this.top+N+h,this.bottom-e[0].height),line:0},Ob(this.ctx,t.textDirection);const M=v+h;this.legendItems.forEach((L,E)=>{s.strokeStyle=L.fontColor,s.fillStyle=L.fontColor;const w=s.measureText(L.text).width,T=c.textAlign(L.textAlign||(L.textAlign=o.textAlign)),x=_+f+w;let A=m.x,P=m.y;c.setWidth(this.width),D?E>0&&A+x+h>this.right&&(P=m.y+=M,m.line++,A=m.x=Wt(r,this.left+h,this.right-i[m.line])):E>0&&P+M>this.bottom&&(A=m.x=A+e[m.line].width+h,m.line++,P=m.y=Wt(r,this.top+N+h,this.bottom-e[m.line].height));const I=c.x(A);if(S(I,P,L),A=tC(T,A+_+f,D?A+x:this.right,t.rtl),R(c.x(A),P,L),D)m.x+=x+h;else if(typeof L.text!="string"){const ct=l.lineHeight;m.y+=ow(L,ct)+h}else m.y+=M}),Nb(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,i=Dt(e.font),s=Qt(e.padding);if(!e.display)return;const r=ls(t.rtl,this.left,this.width),o=this.ctx,a=e.position,c=i.size/2,l=s.top+c;let h,d=this.left,f=this.width;if(this.isHorizontal())f=Math.max(...this.lineWidths),h=this.top+l,d=Wt(t.align,d,this.right-f);else{const _=this.columnSizes.reduce((b,v)=>Math.max(b,v.height),0);h=l+Wt(t.align,this.top,this.bottom-_-t.labels.padding-this._computeTitleHeight())}const m=Wt(a,d,d+f);o.textAlign=r.textAlign(Nh(a)),o.textBaseline="middle",o.strokeStyle=e.color,o.fillStyle=e.color,o.font=i.string,Fi(o,e.text,m,h,i)}_computeTitleHeight(){const t=this.options.title,e=Dt(t.font),i=Qt(t.padding);return t.display?e.lineHeight+i.height:0}_getLegendItemAt(t,e){let i,s,r;if(nn(t,this.left,this.right)&&nn(e,this.top,this.bottom)){for(r=this.legendHitBoxes,i=0;i<r.length;++i)if(s=r[i],nn(t,s.left,s.left+s.width)&&nn(e,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(t){const e=this.options;if(!FD(t.type,e))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const s=this._hoveredItem,r=OD(s,i);s&&!r&&ft(e.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!r&&ft(e.onHover,[t,i,this],this)}else i&&ft(e.onClick,[t,i,this],this)}}function ND(n,t,e,i,s){const r=VD(i,n,t,e),o=LD(s,i,t.lineHeight);return{itemWidth:r,itemHeight:o}}function VD(n,t,e,i){let s=n.text;return s&&typeof s!="string"&&(s=s.reduce((r,o)=>r.length>o.length?r:o)),t+e.size/2+i.measureText(s).width}function LD(n,t,e){let i=n;return typeof t.text!="string"&&(i=ow(t,e)),i}function ow(n,t){const e=n.text?n.text.length:0;return t*e}function FD(n,t){return!!((n==="mousemove"||n==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(n==="click"||n==="mouseup"))}var UD={id:"legend",_element:jg,start(n,t,e){const i=n.legend=new jg({ctx:n.ctx,options:e,chart:n});Kt.configure(n,i,e),Kt.addBox(n,i)},stop(n){Kt.removeBox(n,n.legend),delete n.legend},beforeUpdate(n,t,e){const i=n.legend;Kt.configure(n,i,e),i.options=e},afterUpdate(n){const t=n.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(n,t){t.replay||n.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(n,t,e){const i=t.datasetIndex,s=e.chart;s.isDatasetVisible(i)?(s.hide(i),t.hidden=!0):(s.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:n=>n.chart.options.color,boxWidth:40,padding:10,generateLabels(n){const t=n.data.datasets,{labels:{usePointStyle:e,pointStyle:i,textAlign:s,color:r,useBorderRadius:o,borderRadius:a}}=n.legend.options;return n._getSortedDatasetMetas().map(c=>{const l=c.controller.getStyle(e?0:void 0),h=Qt(l.borderWidth);return{text:t[c.index].label,fillStyle:l.backgroundColor,fontColor:r,hidden:!c.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(h.width+h.height)/4,strokeStyle:l.borderColor,pointStyle:i||l.pointStyle,rotation:l.rotation,textAlign:s||l.textAlign,borderRadius:o&&(a||l.borderRadius),datasetIndex:c.index}},this)}},title:{color:n=>n.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:n=>!n.startsWith("on"),labels:{_scriptable:n=>!["generateLabels","filter","sort"].includes(n)}}};class Hh extends Ce{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;const s=_t(i.text)?i.text.length:1;this._padding=Qt(i.padding);const r=s*Dt(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=r:this.width=r}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:e,left:i,bottom:s,right:r,options:o}=this,a=o.align;let c=0,l,h,d;return this.isHorizontal()?(h=Wt(a,i,r),d=e+t,l=r-i):(o.position==="left"?(h=i+t,d=Wt(a,s,e),c=rt*-.5):(h=r-t,d=Wt(a,e,s),c=rt*.5),l=s-e),{titleX:h,titleY:d,maxWidth:l,rotation:c}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const i=Dt(e.font),r=i.lineHeight/2+this._padding.top,{titleX:o,titleY:a,maxWidth:c,rotation:l}=this._drawArgs(r);Fi(t,e.text,0,0,i,{color:e.color,maxWidth:c,rotation:l,textAlign:Nh(e.align),textBaseline:"middle",translation:[o,a]})}}function BD(n,t){const e=new Hh({ctx:n.ctx,options:t,chart:n});Kt.configure(n,e,t),Kt.addBox(n,e),n.titleBlock=e}var zD={id:"title",_element:Hh,start(n,t,e){BD(n,e)},stop(n){const t=n.titleBlock;Kt.removeBox(n,t),delete n.titleBlock},beforeUpdate(n,t,e){const i=n.titleBlock;Kt.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const jo=new WeakMap;var $D={id:"subtitle",start(n,t,e){const i=new Hh({ctx:n.ctx,options:e,chart:n});Kt.configure(n,i,e),Kt.addBox(n,i),jo.set(n,i)},stop(n){Kt.removeBox(n,jo.get(n)),jo.delete(n)},beforeUpdate(n,t,e){const i=jo.get(n);Kt.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const dr={average(n){if(!n.length)return!1;let t,e,i=new Set,s=0,r=0;for(t=0,e=n.length;t<e;++t){const a=n[t].element;if(a&&a.hasValue()){const c=a.tooltipPosition();i.add(c.x),s+=c.y,++r}}return r===0||i.size===0?!1:{x:[...i].reduce((a,c)=>a+c)/i.size,y:s/r}},nearest(n,t){if(!n.length)return!1;let e=t.x,i=t.y,s=Number.POSITIVE_INFINITY,r,o,a;for(r=0,o=n.length;r<o;++r){const c=n[r].element;if(c&&c.hasValue()){const l=c.getCenterPoint(),h=su(t,l);h<s&&(s=h,a=c)}}if(a){const c=a.tooltipPosition();e=c.x,i=c.y}return{x:e,y:i}}};function Me(n,t){return t&&(_t(t)?Array.prototype.push.apply(n,t):n.push(t)),n}function Je(n){return(typeof n=="string"||n instanceof String)&&n.indexOf(`
`)>-1?n.split(`
`):n}function jD(n,t){const{element:e,datasetIndex:i,index:s}=t,r=n.getDatasetMeta(i).controller,{label:o,value:a}=r.getLabelAndValue(s);return{chart:n,label:o,parsed:r.getParsed(s),raw:n.data.datasets[i].data[s],formattedValue:a,dataset:r.getDataset(),dataIndex:s,datasetIndex:i,element:e}}function Hg(n,t){const e=n.chart.ctx,{body:i,footer:s,title:r}=n,{boxWidth:o,boxHeight:a}=t,c=Dt(t.bodyFont),l=Dt(t.titleFont),h=Dt(t.footerFont),d=r.length,f=s.length,m=i.length,_=Qt(t.padding);let b=_.height,v=0,S=i.reduce((N,M)=>N+M.before.length+M.lines.length+M.after.length,0);if(S+=n.beforeBody.length+n.afterBody.length,d&&(b+=d*l.lineHeight+(d-1)*t.titleSpacing+t.titleMarginBottom),S){const N=t.displayColors?Math.max(a,c.lineHeight):c.lineHeight;b+=m*N+(S-m)*c.lineHeight+(S-1)*t.bodySpacing}f&&(b+=t.footerMarginTop+f*h.lineHeight+(f-1)*t.footerSpacing);let R=0;const D=function(N){v=Math.max(v,e.measureText(N).width+R)};return e.save(),e.font=l.string,at(n.title,D),e.font=c.string,at(n.beforeBody.concat(n.afterBody),D),R=t.displayColors?o+2+t.boxPadding:0,at(i,N=>{at(N.before,D),at(N.lines,D),at(N.after,D)}),R=0,e.font=h.string,at(n.footer,D),e.restore(),v+=_.width,{width:v,height:b}}function HD(n,t){const{y:e,height:i}=t;return e<i/2?"top":e>n.height-i/2?"bottom":"center"}function WD(n,t,e,i){const{x:s,width:r}=i,o=e.caretSize+e.caretPadding;if(n==="left"&&s+r+o>t.width||n==="right"&&s-r-o<0)return!0}function qD(n,t,e,i){const{x:s,width:r}=e,{width:o,chartArea:{left:a,right:c}}=n;let l="center";return i==="center"?l=s<=(a+c)/2?"left":"right":s<=r/2?l="left":s>=o-r/2&&(l="right"),WD(l,n,t,e)&&(l="center"),l}function Wg(n,t,e){const i=e.yAlign||t.yAlign||HD(n,e);return{xAlign:e.xAlign||t.xAlign||qD(n,t,e,i),yAlign:i}}function GD(n,t){let{x:e,width:i}=n;return t==="right"?e-=i:t==="center"&&(e-=i/2),e}function KD(n,t,e){let{y:i,height:s}=n;return t==="top"?i+=e:t==="bottom"?i-=s+e:i-=s/2,i}function qg(n,t,e,i){const{caretSize:s,caretPadding:r,cornerRadius:o}=n,{xAlign:a,yAlign:c}=e,l=s+r,{topLeft:h,topRight:d,bottomLeft:f,bottomRight:m}=Ri(o);let _=GD(t,a);const b=KD(t,c,l);return c==="center"?a==="left"?_+=l:a==="right"&&(_-=l):a==="left"?_-=Math.max(h,f)+s:a==="right"&&(_+=Math.max(d,m)+s),{x:Lt(_,0,i.width-t.width),y:Lt(b,0,i.height-t.height)}}function Ho(n,t,e){const i=Qt(e.padding);return t==="center"?n.x+n.width/2:t==="right"?n.x+n.width-i.right:n.x+i.left}function Gg(n){return Me([],Je(n))}function YD(n,t,e){return li(n,{tooltip:t,tooltipItems:e,type:"tooltip"})}function Kg(n,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?n.override(e):n}const aw={beforeTitle:Qe,title(n){if(n.length>0){const t=n[0],e=t.chart.data.labels,i=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return e[t.dataIndex]}return""},afterTitle:Qe,beforeBody:Qe,beforeLabel:Qe,label(n){if(this&&this.options&&this.options.mode==="dataset")return n.label+": "+n.formattedValue||n.formattedValue;let t=n.dataset.label||"";t&&(t+=": ");const e=n.formattedValue;return X(e)||(t+=e),t},labelColor(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:Qe,afterBody:Qe,beforeFooter:Qe,footer:Qe,afterFooter:Qe};function ee(n,t,e,i){const s=n[t].call(e,i);return typeof s>"u"?aw[t].call(e,i):s}class fu extends Ce{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&e.options.animation&&i.animations,r=new Bb(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(r)),r}getContext(){return this.$context||(this.$context=YD(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:i}=e,s=ee(i,"beforeTitle",this,t),r=ee(i,"title",this,t),o=ee(i,"afterTitle",this,t);let a=[];return a=Me(a,Je(s)),a=Me(a,Je(r)),a=Me(a,Je(o)),a}getBeforeBody(t,e){return Gg(ee(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:i}=e,s=[];return at(t,r=>{const o={before:[],lines:[],after:[]},a=Kg(i,r);Me(o.before,Je(ee(a,"beforeLabel",this,r))),Me(o.lines,ee(a,"label",this,r)),Me(o.after,Je(ee(a,"afterLabel",this,r))),s.push(o)}),s}getAfterBody(t,e){return Gg(ee(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:i}=e,s=ee(i,"beforeFooter",this,t),r=ee(i,"footer",this,t),o=ee(i,"afterFooter",this,t);let a=[];return a=Me(a,Je(s)),a=Me(a,Je(r)),a=Me(a,Je(o)),a}_createItems(t){const e=this._active,i=this.chart.data,s=[],r=[],o=[];let a=[],c,l;for(c=0,l=e.length;c<l;++c)a.push(jD(this.chart,e[c]));return t.filter&&(a=a.filter((h,d,f)=>t.filter(h,d,f,i))),t.itemSort&&(a=a.sort((h,d)=>t.itemSort(h,d,i))),at(a,h=>{const d=Kg(t.callbacks,h);s.push(ee(d,"labelColor",this,h)),r.push(ee(d,"labelPointStyle",this,h)),o.push(ee(d,"labelTextColor",this,h))}),this.labelColors=s,this.labelPointStyles=r,this.labelTextColors=o,this.dataPoints=a,a}update(t,e){const i=this.options.setContext(this.getContext()),s=this._active;let r,o=[];if(!s.length)this.opacity!==0&&(r={opacity:0});else{const a=dr[i.position].call(this,s,this._eventPosition);o=this._createItems(i),this.title=this.getTitle(o,i),this.beforeBody=this.getBeforeBody(o,i),this.body=this.getBody(o,i),this.afterBody=this.getAfterBody(o,i),this.footer=this.getFooter(o,i);const c=this._size=Hg(this,i),l=Object.assign({},a,c),h=Wg(this.chart,i,l),d=qg(i,l,h,this.chart);this.xAlign=h.xAlign,this.yAlign=h.yAlign,r={opacity:1,x:d.x,y:d.y,width:c.width,height:c.height,caretX:a.x,caretY:a.y}}this._tooltipItems=o,this.$context=void 0,r&&this._resolveAnimations().update(this,r),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,i,s){const r=this.getCaretPosition(t,i,s);e.lineTo(r.x1,r.y1),e.lineTo(r.x2,r.y2),e.lineTo(r.x3,r.y3)}getCaretPosition(t,e,i){const{xAlign:s,yAlign:r}=this,{caretSize:o,cornerRadius:a}=i,{topLeft:c,topRight:l,bottomLeft:h,bottomRight:d}=Ri(a),{x:f,y:m}=t,{width:_,height:b}=e;let v,S,R,D,N,M;return r==="center"?(N=m+b/2,s==="left"?(v=f,S=v-o,D=N+o,M=N-o):(v=f+_,S=v+o,D=N-o,M=N+o),R=v):(s==="left"?S=f+Math.max(c,h)+o:s==="right"?S=f+_-Math.max(l,d)-o:S=this.caretX,r==="top"?(D=m,N=D-o,v=S-o,R=S+o):(D=m+b,N=D+o,v=S+o,R=S-o),M=D),{x1:v,x2:S,x3:R,y1:D,y2:N,y3:M}}drawTitle(t,e,i){const s=this.title,r=s.length;let o,a,c;if(r){const l=ls(i.rtl,this.x,this.width);for(t.x=Ho(this,i.titleAlign,i),e.textAlign=l.textAlign(i.titleAlign),e.textBaseline="middle",o=Dt(i.titleFont),a=i.titleSpacing,e.fillStyle=i.titleColor,e.font=o.string,c=0;c<r;++c)e.fillText(s[c],l.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+a,c+1===r&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,e,i,s,r){const o=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:c,boxWidth:l}=r,h=Dt(r.bodyFont),d=Ho(this,"left",r),f=s.x(d),m=c<h.lineHeight?(h.lineHeight-c)/2:0,_=e.y+m;if(r.usePointStyle){const b={radius:Math.min(l,c)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},v=s.leftForLtr(f,l)+l/2,S=_+c/2;t.strokeStyle=r.multiKeyBackground,t.fillStyle=r.multiKeyBackground,ou(t,b,v,S),t.strokeStyle=o.borderColor,t.fillStyle=o.backgroundColor,ou(t,b,v,S)}else{t.lineWidth=nt(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,t.strokeStyle=o.borderColor,t.setLineDash(o.borderDash||[]),t.lineDashOffset=o.borderDashOffset||0;const b=s.leftForLtr(f,l),v=s.leftForLtr(s.xPlus(f,1),l-2),S=Ri(o.borderRadius);Object.values(S).some(R=>R!==0)?(t.beginPath(),t.fillStyle=r.multiKeyBackground,jr(t,{x:b,y:_,w:l,h:c,radius:S}),t.fill(),t.stroke(),t.fillStyle=o.backgroundColor,t.beginPath(),jr(t,{x:v,y:_+1,w:l-2,h:c-2,radius:S}),t.fill()):(t.fillStyle=r.multiKeyBackground,t.fillRect(b,_,l,c),t.strokeRect(b,_,l,c),t.fillStyle=o.backgroundColor,t.fillRect(v,_+1,l-2,c-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,e,i){const{body:s}=this,{bodySpacing:r,bodyAlign:o,displayColors:a,boxHeight:c,boxWidth:l,boxPadding:h}=i,d=Dt(i.bodyFont);let f=d.lineHeight,m=0;const _=ls(i.rtl,this.x,this.width),b=function(w){e.fillText(w,_.x(t.x+m),t.y+f/2),t.y+=f+r},v=_.textAlign(o);let S,R,D,N,M,L,E;for(e.textAlign=o,e.textBaseline="middle",e.font=d.string,t.x=Ho(this,v,i),e.fillStyle=i.bodyColor,at(this.beforeBody,b),m=a&&v!=="right"?o==="center"?l/2+h:l+2+h:0,N=0,L=s.length;N<L;++N){for(S=s[N],R=this.labelTextColors[N],e.fillStyle=R,at(S.before,b),D=S.lines,a&&D.length&&(this._drawColorBox(e,t,N,_,i),f=Math.max(d.lineHeight,c)),M=0,E=D.length;M<E;++M)b(D[M]),f=d.lineHeight;at(S.after,b)}m=0,f=d.lineHeight,at(this.afterBody,b),t.y-=r}drawFooter(t,e,i){const s=this.footer,r=s.length;let o,a;if(r){const c=ls(i.rtl,this.x,this.width);for(t.x=Ho(this,i.footerAlign,i),t.y+=i.footerMarginTop,e.textAlign=c.textAlign(i.footerAlign),e.textBaseline="middle",o=Dt(i.footerFont),e.fillStyle=i.footerColor,e.font=o.string,a=0;a<r;++a)e.fillText(s[a],c.x(t.x),t.y+o.lineHeight/2),t.y+=o.lineHeight+i.footerSpacing}}drawBackground(t,e,i,s){const{xAlign:r,yAlign:o}=this,{x:a,y:c}=t,{width:l,height:h}=i,{topLeft:d,topRight:f,bottomLeft:m,bottomRight:_}=Ri(s.cornerRadius);e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.beginPath(),e.moveTo(a+d,c),o==="top"&&this.drawCaret(t,e,i,s),e.lineTo(a+l-f,c),e.quadraticCurveTo(a+l,c,a+l,c+f),o==="center"&&r==="right"&&this.drawCaret(t,e,i,s),e.lineTo(a+l,c+h-_),e.quadraticCurveTo(a+l,c+h,a+l-_,c+h),o==="bottom"&&this.drawCaret(t,e,i,s),e.lineTo(a+m,c+h),e.quadraticCurveTo(a,c+h,a,c+h-m),o==="center"&&r==="left"&&this.drawCaret(t,e,i,s),e.lineTo(a,c+d),e.quadraticCurveTo(a,c,a+d,c),e.closePath(),e.fill(),s.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,i=this.$animations,s=i&&i.x,r=i&&i.y;if(s||r){const o=dr[t.position].call(this,this._active,this._eventPosition);if(!o)return;const a=this._size=Hg(this,t),c=Object.assign({},o,this._size),l=Wg(e,t,c),h=qg(t,c,l,e);(s._to!==h.x||r._to!==h.y)&&(this.xAlign=l.xAlign,this.yAlign=l.yAlign,this.width=a.width,this.height=a.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,h))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(e);const s={width:this.width,height:this.height},r={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const o=Qt(e.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(r,t,s,e),Ob(t,e.textDirection),r.y+=o.top,this.drawTitle(r,t,e),this.drawBody(r,t,e),this.drawFooter(r,t,e),Nb(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const i=this._active,s=t.map(({datasetIndex:a,index:c})=>{const l=this.chart.getDatasetMeta(a);if(!l)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:l.data[c],index:c}}),r=!Fa(i,s),o=this._positionChanged(s,e);(r||o)&&(this._active=s,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,i=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,r=this._active||[],o=this._getActiveElements(t,r,e,i),a=this._positionChanged(o,t),c=e||!Fa(o,r)||a;return c&&(this._active=o,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),c}_getActiveElements(t,e,i,s){const r=this.options;if(t.type==="mouseout")return[];if(!s)return e.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const o=this.chart.getElementsAtEventForMode(t,r.mode,r,i);return r.reverse&&o.reverse(),o}_positionChanged(t,e){const{caretX:i,caretY:s,options:r}=this,o=dr[r.position].call(this,t,e);return o!==!1&&(i!==o.x||s!==o.y)}}U(fu,"positioners",dr);var QD={id:"tooltip",_element:fu,positioners:dr,afterInit(n,t,e){e&&(n.tooltip=new fu({chart:n,options:e}))},beforeUpdate(n,t,e){n.tooltip&&n.tooltip.initialize(e)},reset(n,t,e){n.tooltip&&n.tooltip.initialize(e)},afterDraw(n){const t=n.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(n.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(n.ctx),n.notifyPlugins("afterTooltipDraw",e)}},afterEvent(n,t){if(n.tooltip){const e=t.replay;n.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(n,t)=>t.bodyFont.size,boxWidth:(n,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:aw},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:n=>n!=="filter"&&n!=="itemSort"&&n!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},XD=Object.freeze({__proto__:null,Colors:lD,Decimation:fD,Filler:MD,Legend:UD,SubTitle:$D,Title:zD,Tooltip:QD});const JD=(n,t,e,i)=>(typeof t=="string"?(e=n.push(t)-1,i.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function ZD(n,t,e,i){const s=n.indexOf(t);if(s===-1)return JD(n,t,e,i);const r=n.lastIndexOf(t);return s!==r?e:s}const tM=(n,t)=>n===null?null:Lt(Math.round(n),0,t);function Yg(n){const t=this.getLabels();return n>=0&&n<t.length?t[n]:n}class pu extends Wi{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const i=this.getLabels();for(const{index:s,label:r}of e)i[s]===r&&i.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(X(t))return null;const i=this.getLabels();return e=isFinite(e)&&i[e]===t?e:ZD(i,t,G(e,t),this._addedLabels),tM(e,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),e||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,e=this.max,i=this.options.offset,s=[];let r=this.getLabels();r=t===0&&e===r.length-1?r:r.slice(t,e+1),this._valueRange=Math.max(r.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let o=t;o<=e;o++)s.push({value:o});return s}getLabelForValue(t){return Yg.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}U(pu,"id","category"),U(pu,"defaults",{ticks:{callback:Yg}});function eM(n,t){const e=[],{bounds:s,step:r,min:o,max:a,precision:c,count:l,maxTicks:h,maxDigits:d,includeBounds:f}=n,m=r||1,_=h-1,{min:b,max:v}=t,S=!X(o),R=!X(a),D=!X(l),N=(v-b)/(d+1);let M=Hp((v-b)/_/m)*m,L,E,w,T;if(M<1e-14&&!S&&!R)return[{value:b},{value:v}];T=Math.ceil(v/M)-Math.floor(b/M),T>_&&(M=Hp(T*M/_/m)*m),X(c)||(L=Math.pow(10,c),M=Math.ceil(M*L)/L),s==="ticks"?(E=Math.floor(b/M)*M,w=Math.ceil(v/M)*M):(E=b,w=v),S&&R&&r&&GR((a-o)/r,M/1e3)?(T=Math.round(Math.min((a-o)/M,h)),M=(a-o)/T,E=o,w=a):D?(E=S?o:E,w=R?a:w,T=l-1,M=(w-E)/T):(T=(w-E)/M,Tr(T,Math.round(T),M/1e3)?T=Math.round(T):T=Math.ceil(T));const x=Math.max(Wp(M),Wp(E));L=Math.pow(10,X(c)?x:c),E=Math.round(E*L)/L,w=Math.round(w*L)/L;let A=0;for(S&&(f&&E!==o?(e.push({value:o}),E<o&&A++,Tr(Math.round((E+A*M)*L)/L,o,Qg(o,N,n))&&A++):E<o&&A++);A<T;++A){const P=Math.round((E+A*M)*L)/L;if(R&&P>a)break;e.push({value:P})}return R&&f&&w!==a?e.length&&Tr(e[e.length-1].value,a,Qg(a,N,n))?e[e.length-1].value=a:e.push({value:a}):(!R||w===a)&&e.push({value:w}),e}function Qg(n,t,{horizontal:e,minRotation:i}){const s=Ee(i),r=(e?Math.sin(s):Math.cos(s))||.001,o=.75*t*(""+n).length;return Math.min(t/r,o)}class Wa extends Wi{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return X(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:i}=this.getUserBounds();let{min:s,max:r}=this;const o=c=>s=e?s:c,a=c=>r=i?r:c;if(t){const c=He(s),l=He(r);c<0&&l<0?a(0):c>0&&l>0&&o(0)}if(s===r){let c=r===0?1:Math.abs(r*.05);a(r+c),t||o(s-c)}this.min=s,this.max=r}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:i}=t,s;return i?(s=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,s>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`),s=1e3)):(s=this.computeTickLimit(),e=e||11),e&&(s=Math.min(e,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const s={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},r=this._range||this,o=eM(s,r);return t.bounds==="ticks"&&_b(o,this,"value"),t.reverse?(o.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),o}configure(){const t=this.ticks;let e=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-e)/Math.max(t.length-1,1)/2;e-=s,i+=s}this._startValue=e,this._endValue=i,this._valueRange=i-e}getLabelForValue(t){return po(t,this.chart.options.locale,this.options.ticks.format)}}class gu extends Wa{determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=Et(t)?t:0,this.max=Et(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,i=Ee(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,r=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,r.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}U(gu,"id","linear"),U(gu,"defaults",{ticks:{callback:Ic.formatters.numeric}});const Wr=n=>Math.floor(On(n)),bi=(n,t)=>Math.pow(10,Wr(n)+t);function Xg(n){return n/Math.pow(10,Wr(n))===1}function Jg(n,t,e){const i=Math.pow(10,e),s=Math.floor(n/i);return Math.ceil(t/i)-s}function nM(n,t){const e=t-n;let i=Wr(e);for(;Jg(n,t,i)>10;)i++;for(;Jg(n,t,i)<10;)i--;return Math.min(i,Wr(n))}function iM(n,{min:t,max:e}){t=le(n.min,t);const i=[],s=Wr(t);let r=nM(t,e),o=r<0?Math.pow(10,Math.abs(r)):1;const a=Math.pow(10,r),c=s>r?Math.pow(10,s):0,l=Math.round((t-c)*o)/o,h=Math.floor((t-c)/a/10)*a*10;let d=Math.floor((l-h)/Math.pow(10,r)),f=le(n.min,Math.round((c+h+d*Math.pow(10,r))*o)/o);for(;f<e;)i.push({value:f,major:Xg(f),significand:d}),d>=10?d=d<15?15:20:d++,d>=20&&(r++,d=2,o=r>=0?1:o),f=Math.round((c+h+d*Math.pow(10,r))*o)/o;const m=le(n.max,f);return i.push({value:m,major:Xg(m),significand:d}),i}class mu extends Wi{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const i=Wa.prototype.parse.apply(this,[t,e]);if(i===0){this._zero=!0;return}return Et(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=Et(t)?Math.max(0,t):null,this.max=Et(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!Et(this._userMin)&&(this.min=t===bi(this.min,0)?bi(this.min,-1):bi(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let i=this.min,s=this.max;const r=a=>i=t?i:a,o=a=>s=e?s:a;i===s&&(i<=0?(r(1),o(10)):(r(bi(i,-1)),o(bi(s,1)))),i<=0&&r(bi(s,-1)),s<=0&&o(bi(i,1)),this.min=i,this.max=s}buildTicks(){const t=this.options,e={min:this._userMin,max:this._userMax},i=iM(e,this);return t.bounds==="ticks"&&_b(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":po(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=On(t),this._valueRange=On(this.max)-On(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(On(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}U(mu,"id","logarithmic"),U(mu,"defaults",{ticks:{callback:Ic.formatters.logarithmic,major:{enabled:!0}}});function _u(n){const t=n.ticks;if(t.display&&n.display){const e=Qt(t.backdropPadding);return G(t.font&&t.font.size,yt.font.size)+e.height}return 0}function sM(n,t,e){return e=_t(e)?e:[e],{w:uC(n,t.string,e),h:e.length*t.lineHeight}}function Zg(n,t,e,i,s){return n===i||n===s?{start:t-e/2,end:t+e/2}:n<i||n>s?{start:t-e,end:t}:{start:t,end:t+e}}function rM(n){const t={l:n.left+n._padding.left,r:n.right-n._padding.right,t:n.top+n._padding.top,b:n.bottom-n._padding.bottom},e=Object.assign({},t),i=[],s=[],r=n._pointLabels.length,o=n.options.pointLabels,a=o.centerPointLabels?rt/r:0;for(let c=0;c<r;c++){const l=o.setContext(n.getPointLabelContext(c));s[c]=l.padding;const h=n.getPointPosition(c,n.drawingArea+s[c],a),d=Dt(l.font),f=sM(n.ctx,d,n._pointLabels[c]);i[c]=f;const m=Gt(n.getIndexAngle(c)+a),_=Math.round(Mh(m)),b=Zg(_,h.x,f.w,0,180),v=Zg(_,h.y,f.h,90,270);oM(e,t,m,b,v)}n.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),n._pointLabelItems=lM(n,i,s)}function oM(n,t,e,i,s){const r=Math.abs(Math.sin(e)),o=Math.abs(Math.cos(e));let a=0,c=0;i.start<t.l?(a=(t.l-i.start)/r,n.l=Math.min(n.l,t.l-a)):i.end>t.r&&(a=(i.end-t.r)/r,n.r=Math.max(n.r,t.r+a)),s.start<t.t?(c=(t.t-s.start)/o,n.t=Math.min(n.t,t.t-c)):s.end>t.b&&(c=(s.end-t.b)/o,n.b=Math.max(n.b,t.b+c))}function aM(n,t,e){const i=n.drawingArea,{extra:s,additionalAngle:r,padding:o,size:a}=e,c=n.getPointPosition(t,i+s+o,r),l=Math.round(Mh(Gt(c.angle+xt))),h=dM(c.y,a.h,l),d=uM(l),f=hM(c.x,a.w,d);return{visible:!0,x:c.x,y:h,textAlign:d,left:f,top:h,right:f+a.w,bottom:h+a.h}}function cM(n,t){if(!t)return!0;const{left:e,top:i,right:s,bottom:r}=n;return!(rn({x:e,y:i},t)||rn({x:e,y:r},t)||rn({x:s,y:i},t)||rn({x:s,y:r},t))}function lM(n,t,e){const i=[],s=n._pointLabels.length,r=n.options,{centerPointLabels:o,display:a}=r.pointLabels,c={extra:_u(r)/2,additionalAngle:o?rt/s:0};let l;for(let h=0;h<s;h++){c.padding=e[h],c.size=t[h];const d=aM(n,h,c);i.push(d),a==="auto"&&(d.visible=cM(d,l),d.visible&&(l=d))}return i}function uM(n){return n===0||n===180?"center":n<180?"left":"right"}function hM(n,t,e){return e==="right"?n-=t:e==="center"&&(n-=t/2),n}function dM(n,t,e){return e===90||e===270?n-=t/2:(e>270||e<90)&&(n-=t),n}function fM(n,t,e){const{left:i,top:s,right:r,bottom:o}=e,{backdropColor:a}=t;if(!X(a)){const c=Ri(t.borderRadius),l=Qt(t.backdropPadding);n.fillStyle=a;const h=i-l.left,d=s-l.top,f=r-i+l.width,m=o-s+l.height;Object.values(c).some(_=>_!==0)?(n.beginPath(),jr(n,{x:h,y:d,w:f,h:m,radius:c}),n.fill()):n.fillRect(h,d,f,m)}}function pM(n,t){const{ctx:e,options:{pointLabels:i}}=n;for(let s=t-1;s>=0;s--){const r=n._pointLabelItems[s];if(!r.visible)continue;const o=i.setContext(n.getPointLabelContext(s));fM(e,o,r);const a=Dt(o.font),{x:c,y:l,textAlign:h}=r;Fi(e,n._pointLabels[s],c,l+a.lineHeight/2,a,{color:o.color,textAlign:h,textBaseline:"middle"})}}function cw(n,t,e,i){const{ctx:s}=n;if(e)s.arc(n.xCenter,n.yCenter,t,0,mt);else{let r=n.getPointPosition(0,t);s.moveTo(r.x,r.y);for(let o=1;o<i;o++)r=n.getPointPosition(o,t),s.lineTo(r.x,r.y)}}function gM(n,t,e,i,s){const r=n.ctx,o=t.circular,{color:a,lineWidth:c}=t;!o&&!i||!a||!c||e<0||(r.save(),r.strokeStyle=a,r.lineWidth=c,r.setLineDash(s.dash||[]),r.lineDashOffset=s.dashOffset,r.beginPath(),cw(n,e,o,i),r.closePath(),r.stroke(),r.restore())}function mM(n,t,e){return li(n,{label:e,index:t,type:"pointLabel"})}class fr extends Wa{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=Qt(_u(this.options)/2),e=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(e,i)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=Et(t)&&!isNaN(t)?t:0,this.max=Et(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/_u(this.options))}generateTickLabels(t){Wa.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,i)=>{const s=ft(this.options.pointLabels.callback,[e,i],this);return s||s===0?s:""}).filter((e,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?rM(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,i,s){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((i-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,i,s))}getIndexAngle(t){const e=mt/(this._pointLabels.length||1),i=this.options.startAngle||0;return Gt(t*e+Ee(i))}getDistanceFromCenterForValue(t){if(X(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(X(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const i=e[t];return mM(this.getContext(),t,i)}}getPointPosition(t,e,i=0){const s=this.getIndexAngle(t)-xt+i;return{x:Math.cos(s)*e+this.xCenter,y:Math.sin(s)*e+this.yCenter,angle:s}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:i,right:s,bottom:r}=this._pointLabelItems[t];return{left:e,top:i,right:s,bottom:r}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),cw(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:i,grid:s,border:r}=e,o=this._pointLabels.length;let a,c,l;if(e.pointLabels.display&&pM(this,o),s.display&&this.ticks.forEach((h,d)=>{if(d!==0||d===0&&this.min<0){c=this.getDistanceFromCenterForValue(h.value);const f=this.getContext(d),m=s.setContext(f),_=r.setContext(f);gM(this,m,c,o,_)}}),i.display){for(t.save(),a=o-1;a>=0;a--){const h=i.setContext(this.getPointLabelContext(a)),{color:d,lineWidth:f}=h;!f||!d||(t.lineWidth=f,t.strokeStyle=d,t.setLineDash(h.borderDash),t.lineDashOffset=h.borderDashOffset,c=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),l=this.getPointPosition(a,c),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(l.x,l.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,i=e.ticks;if(!i.display)return;const s=this.getIndexAngle(0);let r,o;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,c)=>{if(c===0&&this.min>=0&&!e.reverse)return;const l=i.setContext(this.getContext(c)),h=Dt(l.font);if(r=this.getDistanceFromCenterForValue(this.ticks[c].value),l.showLabelBackdrop){t.font=h.string,o=t.measureText(a.label).width,t.fillStyle=l.backdropColor;const d=Qt(l.backdropPadding);t.fillRect(-o/2-d.left,-r-h.size/2-d.top,o+d.width,h.size+d.height)}Fi(t,a.label,0,-r,h,{color:l.color,strokeColor:l.textStrokeColor,strokeWidth:l.textStrokeWidth})}),t.restore()}drawTitle(){}}U(fr,"id","radialLinear"),U(fr,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Ic.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),U(fr,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),U(fr,"descriptors",{angleLines:{_fallback:"grid"}});const Cc={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},se=Object.keys(Cc);function tm(n,t){return n-t}function em(n,t){if(X(t))return null;const e=n._adapter,{parser:i,round:s,isoWeekday:r}=n._parseOpts;let o=t;return typeof i=="function"&&(o=i(o)),Et(o)||(o=typeof i=="string"?e.parse(o,i):e.parse(o)),o===null?null:(s&&(o=s==="week"&&(ws(r)||r===!0)?e.startOf(o,"isoWeek",r):e.startOf(o,s)),+o)}function nm(n,t,e,i){const s=se.length;for(let r=se.indexOf(n);r<s-1;++r){const o=Cc[se[r]],a=o.steps?o.steps:Number.MAX_SAFE_INTEGER;if(o.common&&Math.ceil((e-t)/(a*o.size))<=i)return se[r]}return se[s-1]}function _M(n,t,e,i,s){for(let r=se.length-1;r>=se.indexOf(e);r--){const o=se[r];if(Cc[o].common&&n._adapter.diff(s,i,o)>=t-1)return o}return se[e?se.indexOf(e):0]}function yM(n){for(let t=se.indexOf(n)+1,e=se.length;t<e;++t)if(Cc[se[t]].common)return se[t]}function im(n,t,e){if(!e)n[t]=!0;else if(e.length){const{lo:i,hi:s}=Oh(e,t),r=e[i]>=t?e[i]:e[s];n[r]=!0}}function bM(n,t,e,i){const s=n._adapter,r=+s.startOf(t[0].value,i),o=t[t.length-1].value;let a,c;for(a=r;a<=o;a=+s.add(a,1,i))c=e[a],c>=0&&(t[c].major=!0);return t}function sm(n,t,e){const i=[],s={},r=t.length;let o,a;for(o=0;o<r;++o)a=t[o],s[a]=o,i.push({value:a,major:!1});return r===0||!e?i:bM(n,i,s,e)}class qr extends Wi{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const i=t.time||(t.time={}),s=this._adapter=new Sk._date(t.adapters.date);s.init(e),vr(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:em(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,i=t.time.unit||"day";let{min:s,max:r,minDefined:o,maxDefined:a}=this.getUserBounds();function c(l){!o&&!isNaN(l.min)&&(s=Math.min(s,l.min)),!a&&!isNaN(l.max)&&(r=Math.max(r,l.max))}(!o||!a)&&(c(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&c(this.getMinMax(!1))),s=Et(s)&&!isNaN(s)?s:+e.startOf(Date.now(),i),r=Et(r)&&!isNaN(r)?r:+e.endOf(Date.now(),i)+1,this.min=Math.min(s,r-1),this.max=Math.max(s+1,r)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],i=t[t.length-1]),{min:e,max:i}}buildTicks(){const t=this.options,e=t.time,i=t.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const r=this.min,o=this.max,a=XR(s,r,o);return this._unit=e.unit||(i.autoSkip?nm(e.minUnit,this.min,this.max,this._getLabelCapacity(r)):_M(this,a.length,e.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:yM(this._unit),this.initOffsets(s),t.reverse&&a.reverse(),sm(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,i=0,s,r;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?e=1-s:e=(this.getDecimalForValue(t[1])-s)/2,r=this.getDecimalForValue(t[t.length-1]),t.length===1?i=r:i=(r-this.getDecimalForValue(t[t.length-2]))/2);const o=t.length<3?.5:.25;e=Lt(e,0,o),i=Lt(i,0,o),this._offsets={start:e,end:i,factor:1/(e+1+i)}}_generate(){const t=this._adapter,e=this.min,i=this.max,s=this.options,r=s.time,o=r.unit||nm(r.minUnit,e,i,this._getLabelCapacity(e)),a=G(s.ticks.stepSize,1),c=o==="week"?r.isoWeekday:!1,l=ws(c)||c===!0,h={};let d=e,f,m;if(l&&(d=+t.startOf(d,"isoWeek",c)),d=+t.startOf(d,l?"day":o),t.diff(i,e,o)>1e5*a)throw new Error(e+" and "+i+" are too far apart with stepSize of "+a+" "+o);const _=s.ticks.source==="data"&&this.getDataTimestamps();for(f=d,m=0;f<i;f=+t.add(f,a,o),m++)im(h,f,_);return(f===i||s.bounds==="ticks"||m===1)&&im(h,f,_),Object.keys(h).sort(tm).map(b=>+b)}getLabelForValue(t){const e=this._adapter,i=this.options.time;return i.tooltipFormat?e.format(t,i.tooltipFormat):e.format(t,i.displayFormats.datetime)}format(t,e){const s=this.options.time.displayFormats,r=this._unit,o=e||s[r];return this._adapter.format(t,o)}_tickFormatFunction(t,e,i,s){const r=this.options,o=r.ticks.callback;if(o)return ft(o,[t,e,i],this);const a=r.time.displayFormats,c=this._unit,l=this._majorUnit,h=c&&a[c],d=l&&a[l],f=i[e],m=l&&d&&f&&f.major;return this._adapter.format(t,s||(m?d:h))}generateTickLabels(t){let e,i,s;for(e=0,i=t.length;e<i;++e)s=t[e],s.label=this._tickFormatFunction(s.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+i)*e.factor)}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,i=this.ctx.measureText(t).width,s=Ee(this.isHorizontal()?e.maxRotation:e.minRotation),r=Math.cos(s),o=Math.sin(s),a=this._resolveTickFontOptions(0).size;return{w:i*r+a*o,h:i*o+a*r}}_getLabelCapacity(t){const e=this.options.time,i=e.displayFormats,s=i[e.unit]||i.millisecond,r=this._tickFormatFunction(t,0,sm(this,[t],this._majorUnit),s),o=this._getLabelSize(r),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],e,i;if(t.length)return t;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(e=0,i=s.length;e<i;++e)t=t.concat(s[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,i;if(t.length)return t;const s=this.getLabels();for(e=0,i=s.length;e<i;++e)t.push(em(this,s[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return wb(t.sort(tm))}}U(qr,"id","time"),U(qr,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Wo(n,t,e){let i=0,s=n.length-1,r,o,a,c;e?(t>=n[i].pos&&t<=n[s].pos&&({lo:i,hi:s}=sn(n,"pos",t)),{pos:r,time:a}=n[i],{pos:o,time:c}=n[s]):(t>=n[i].time&&t<=n[s].time&&({lo:i,hi:s}=sn(n,"time",t)),{time:r,pos:a}=n[i],{time:o,pos:c}=n[s]);const l=o-r;return l?a+(c-a)*(t-r)/l:a}class yu extends qr{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=Wo(e,this.min),this._tableRange=Wo(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:i}=this,s=[],r=[];let o,a,c,l,h;for(o=0,a=t.length;o<a;++o)l=t[o],l>=e&&l<=i&&s.push(l);if(s.length<2)return[{time:e,pos:0},{time:i,pos:1}];for(o=0,a=s.length;o<a;++o)h=s[o+1],c=s[o-1],l=s[o],Math.round((h+c)/2)!==l&&r.push({time:l,pos:o/(a-1)});return r}_generate(){const t=this.min,e=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(e)||i.length===1)&&i.push(e),i.sort((s,r)=>s-r)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),i=this.getLabelTimestamps();return e.length&&i.length?t=this.normalize(e.concat(i)):t=e.length?e:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Wo(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return Wo(this._table,i*this._tableRange+this._minPos,!0)}}U(yu,"id","timeseries"),U(yu,"defaults",qr.defaults);var wM=Object.freeze({__proto__:null,CategoryScale:pu,LinearScale:gu,LogarithmicScale:mu,RadialLinearScale:fr,TimeScale:qr,TimeSeriesScale:yu});const vM=[xk,nD,XD,wM];Le.register(...vM);const ot=n=>document.getElementById(n),qa=ot("authLoadingScreen"),Es=ot("loginCard"),Zn=ot("status"),Is=ot("trade"),ti=ot("adminCard"),ei=ot("adminDashboard"),ni=ot("btnLogout");Es&&(Es.style.display="none");Zn&&(Zn.style.display="none");Is&&(Is.style.display="none");ti&&(ti.style.display="none");ei&&(ei.style.display="none");ni&&(ni.style.display="none");const Wh=ot("userId"),Ga=ot("password"),TM=ot("btnSignup"),EM=ot("btnLogin"),rm=ot("loadHint"),Rl=ot("loginMessage"),om=ot("prices"),IM=ot("btnReset");let Ge=null,lw=null,xr=null,qi={},an=!1,fe=null,us=null,hs=null;function AM(n){if(!n)return null;const t=n.match(/^(.+)@stocksimgame\.local$/);return t?t[1].toUpperCase():null}function Q(n){rm&&(rm.textContent=n??"")}function Rn(n){if(n==null||isNaN(n))return"0 ₩";const e=Math.round(n).toString();let i="";for(let s=e.length-1,r=0;s>=0;s--,r++)r>0&&r%3===0&&(i=","+i),i=e[s]+i;return i+" ₩"}let ie=null;function qh(n="처리 중..."){ie&&kc(),ie=document.createElement("div"),ie.className="loading-overlay",ie.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    z-index: 20000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease-out;
  `;const t=document.createElement("div");t.style.cssText=`
    width: 48px;
    height: 48px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 20px;
  `;const e=document.createElement("div");e.textContent=n,e.style.cssText=`
    color: white;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  `,ie.appendChild(t),ie.appendChild(e),document.body.appendChild(ie)}function kc(){ie&&(ie.style.animation="fadeOut 0.2s ease-out forwards",setTimeout(()=>{ie&&ie.parentNode&&ie.parentNode.removeChild(ie),ie=null},200))}function Si(n,t="info"){Rl&&(Rl.textContent=n||"",Rl.className=n?t:"")}function Ka(){Si("")}function Y(n,t="info",e=3e3){const i=document.getElementById("toastContainer");if(!i)return;const s=document.createElement("div");s.className=`toast ${t}`;const r=t==="success"?"✅":t==="error"?"❌":t==="warning"?"⚠️":"ℹ️";s.innerHTML=`
    <span style="font-size: 20px;">${r}</span>
    <span style="flex: 1; font-size: 14px; line-height: 1.5;">${n}</span>
  `,i.appendChild(s),setTimeout(()=>{s.classList.add("slide-out"),setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},300)},e)}function Ei(n,t="확인"){return new Promise(e=>{const i=document.createElement("div");i.className="modal-overlay",i.innerHTML=`
      <div class="modal">
        <h3>${t}</h3>
        <p>${n.replace(/\n/g,"<br>")}</p>
        <div class="modal-actions">
          <button class="btn-muted" id="modalCancel">취소</button>
          <button class="btn-primary" id="modalConfirm">확인</button>
        </div>
      </div>
    `,document.body.appendChild(i);const s=()=>{i.style.animation="fadeIn 0.2s ease-out reverse",setTimeout(()=>{i.parentNode&&i.parentNode.removeChild(i)},200)};i.querySelector("#modalConfirm").onclick=()=>{s(),e(!0)},i.querySelector("#modalCancel").onclick=()=>{s(),e(!1)},i.onclick=r=>{r.target===i&&(s(),e(!1))}})}function am(n,t="입력",e=""){return new Promise(i=>{const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
      <div class="modal">
        <h3>${t}</h3>
        <p style="margin-bottom: 16px;">${n.replace(/\n/g,"<br>")}</p>
        <label>
          <input type="text" id="modalInput" value="${e}" style="width: 100%;" />
        </label>
        <div class="modal-actions">
          <button class="btn-muted" id="modalCancel">취소</button>
          <button class="btn-primary" id="modalConfirm">확인</button>
        </div>
      </div>
    `,document.body.appendChild(s);const r=s.querySelector("#modalInput");r.focus(),r.select();const o=()=>{s.style.animation="fadeIn 0.2s ease-out reverse",setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},200)},a=()=>{const c=r.value.trim();o(),i(c)};s.querySelector("#modalConfirm").onclick=a,s.querySelector("#modalCancel").onclick=()=>{o(),i(null)},r.onkeydown=c=>{c.key==="Enter"?(c.preventDefault(),a()):c.key==="Escape"&&(c.preventDefault(),o(),i(null))},s.onclick=c=>{c.target===s&&(o(),i(null))}})}function uw(n){const t=ot("statusContent");t?t.innerHTML=n:Zn&&(Zn.innerHTML=n)}TM.onclick=async()=>{try{Ka(),Q("회원가입 중입니다...");const n=Wh.value.trim(),t=Ga.value;if(!n||!t){Si("아이디와 비밀번호를 입력하세요.","error"),Q("");return}if(t.length<4){Si("비밀번호는 4자 이상이어야 합니다.","error"),Q("");return}await eR(n,t),Si("회원가입 완료! 로그인해주세요.","success"),Ga.value=""}catch(n){console.error(n),Si("회원가입 실패: "+n.message,"error")}finally{Q("")}};EM.onclick=async()=>{try{Ka(),Q("로그인 중입니다...");const n=Wh.value.trim(),t=Ga.value;if(!n||!t){Si("아이디와 비밀번호를 입력하세요.","error"),Q("");return}const e=await nR(n,t);Ge=e,lw=t,an=ub(e),Ka(),an?await hw():(await Os(),!an&&!fe&&Kh())}catch(n){console.error(n),Si("로그인 실패: "+n.message,"error")}finally{Q("")}};async function Gh(){try{await iR()}catch(n){console.error("로그아웃 오류:",n)}fe&&(fe(),fe=null),us&&(us.destroy(),us=null),hs&&(hs.destroy(),hs=null),Ge=null,lw=null,xr=null,qi={},an=!1,ha(),Wh.value="",Ga.value="",uw("사용자 정보를 불러오면 현황이 나타납니다.")}ni&&(ni.onclick=Gh);async function Os(){try{Q("정보를 불러오는 중...");const n=await lb(Ge);xr=n,qi=n.prices,document.body.classList.remove("login-screen"),Es.style.display="none",Zn.style.display="block",Is.style.display="block",ni&&(ni.style.display="inline-block"),ti&&(ti.style.display=an?"block":"none"),ei&&(ei.style.display="none"),await RM(n),kM(n),MM(n),!an&&!fe&&Kh(),Q("")}catch(n){console.error(n),Y("정보를 불러오는데 실패했습니다: "+n.message,"error"),Q("")}}function xM(n,t,e){const i=document.getElementById("portfolioLegend");if(!i)return;const s=t.reduce((o,a)=>o+a,0),r=n.map((o,a)=>{const c=t[a],l=(c/s*100).toFixed(0),h=c.toLocaleString("ko-KR")+" ₩";return`
      <div style="
        display: flex; 
        align-items: center; 
        margin-bottom: 12px; 
        padding: 8px; 
        border-radius: 6px; 
        transition: background-color 0.2s ease;
        cursor: pointer;
      " onmouseover="this.style.backgroundColor='rgba(59, 130, 246, 0.1)'" 
         onmouseout="this.style.backgroundColor='transparent'">
        <div style="
          width: 16px; 
          height: 16px; 
          background-color: ${e[a]}; 
          border-radius: 3px; 
          margin-right: 10px; 
          border: 2px solid #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        "></div>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: var(--text); margin-bottom: 2px;">${o}</div>
          <div style="font-size: 12px; color: var(--text-muted);">
            ${h} (${l}%)
          </div>
        </div>
      </div>
    `}).join("");i.innerHTML=r}function SM(n){const t=document.getElementById("portfolioChart");if(!t)return;const e=t.getContext("2d");us&&us.destroy();const i=n.user,s=i.holdings||{},r=n.prices,o=[],a=[],c=["#3b82f6","#f97316","#10b981","#8b5cf6","#ef4444","#f59e0b","#06b6d4","#ec4899","#84cc16","#6366f1"];if(Object.entries(s).forEach(([l,h])=>{if(h>0&&r[l]){const d=h*r[l];d>0&&(a.push(l),o.push(d))}}),i.cash>0&&(a.push("현금"),o.push(i.cash)),o.length===0){t.parentElement.innerHTML='<p style="text-align: center; color: var(--text-muted); padding: 40px;">보유 자산이 없습니다.</p>';const l=document.getElementById("portfolioLegend");l&&(l.innerHTML="");return}xM(a,o,c),us=new Le(e,{type:"doughnut",data:{labels:a,datasets:[{data:o,backgroundColor:c.slice(0,o.length),borderWidth:2,borderColor:"#ffffff"}]},options:{responsive:!0,maintainAspectRatio:!0,plugins:{legend:{display:!1},tooltip:{callbacks:{label:function(l){const h=l.label||"",d=l.parsed||0,f=l.dataset.data.reduce((_,b)=>_+b,0),m=(d/f*100).toFixed(0);return`${h}: ${d.toLocaleString("ko-KR")} ₩ (${m}%)`}}}}}})}function PM(n){const t=document.getElementById("valueChart");if(!t)return;const e=t.getContext("2d");hs&&hs.destroy();try{const i=n.currentDay,s=n.visibleTickers||we,r=[],o=[],a=["#3b82f6","#f97316","#10b981","#8b5cf6","#ef4444","#f59e0b","#06b6d4","#ec4899","#84cc16","#6366f1"];for(let h=0;h<=i;h++)r.push(`Day ${h}`);const c=dn(0,s);if(Object.keys(c).forEach((h,d)=>{const f=[];for(let m=0;m<=i;m++){const _=dn(m,s);f.push(_[h]||0)}o.push({label:h,data:f,borderColor:a[d%a.length],backgroundColor:a[d%a.length]+"20",borderWidth:2,fill:!1,tension:.1,pointRadius:3,pointHoverRadius:5})}),o.length===0){t.parentElement.innerHTML='<p style="text-align: center; color: var(--text-muted); padding: 40px;">표시할 종목이 없습니다.</p>';return}hs=new Le(e,{type:"line",data:{labels:r,datasets:o},options:{responsive:!0,maintainAspectRatio:!0,plugins:{legend:{display:!0,position:"top",labels:{padding:12,font:{size:13},usePointStyle:!0}},tooltip:{mode:"index",intersect:!1,callbacks:{label:function(h){return`${h.dataset.label}: ${h.parsed.y.toLocaleString()} ₩`}}}},scales:{y:{beginAtZero:!1,ticks:{callback:function(h){return h.toLocaleString()+" ₩"}},grid:{color:"rgba(15, 23, 42, 0.05)"},title:{display:!0,text:"가격 (₩)",font:{size:12}}},x:{grid:{display:!1},title:{display:!0,text:"Day",font:{size:12}}}},interaction:{mode:"nearest",axis:"x",intersect:!1}}})}catch(i){console.error("종목별 가격 변화 그래프 렌더링 실패:",i),t.parentElement.innerHTML='<p style="text-align: center; color: var(--text-muted); padding: 40px;">그래프를 불러올 수 없습니다.</p>'}}async function RM(n){const t=n.user,e=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h3 style="margin: 0;">현재 계좌 현황</h3>
      <button id="btnLogout" type="button" class="btn-muted">로그아웃</button>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px;">
      <div class="account-stat">
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">사용자 ID</div>
        <div style="font-size: 18px; font-weight: 600;">${Ge}</div>
      </div>
      <div class="account-stat">
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">보유 현금</div>
        <div style="font-size: 18px; font-weight: 600; color: var(--primary);">${Rn(t.cash)}</div>
      </div>
      <div class="account-stat">
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">포트폴리오 가치</div>
        <div style="font-size: 18px; font-weight: 600; color: var(--accent);">${Rn(t.portfolioValue)}</div>
      </div>
      <div class="account-stat">
        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">현재 Day</div>
        <div style="font-size: 18px; font-weight: 600;">Day ${n.currentDay}</div>
      </div>
    </div>
    
    <!-- 포트폴리오 및 그래프 섹션 -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; margin-top: 24px;">
      <div class="card" style="padding: 20px;">
        <h4 style="margin: 0 0 16px; font-size: 16px; color: var(--text);">포트폴리오 구성</h4>
        <div style="display: flex; gap: 10px; align-items: center;">
          <div style="flex: 1; position: relative; height: 200px;">
            <canvas id="portfolioChart"></canvas>
          </div>
          <div id="portfolioLegend" style="min-width: 180px; font-size: 13px;">
            <!-- 커스텀 legend가 여기에 렌더링됩니다 -->
          </div>
        </div>
      </div>
      <div class="card" style="padding: 20px;">
        <h4 style="margin: 0 0 16px; font-size: 16px; color: var(--text);">종목별 가격 변화</h4>
        <div style="position: relative; height: 200px;">
          <canvas id="valueChart"></canvas>
        </div>
      </div>
    </div>
  `;uw(e);const i=ot("btnLogout");i&&(i.onclick=Gh),SM(n),PM(n)}async function CM(n,t,e,i){try{const s=await ZP(n);let r=0,o=0;for(const a of s)if(a.orders){for(const c of a.orders)if(c.ticker===t&&c.shares>0){const h=dn(a.day,i)[t];h&&(r+=c.shares,o+=c.shares*h)}}return r===0?0:o/r}catch(s){return console.error("평균 매수단가 계산 실패:",s),0}}async function kM(n){const t=n.user,e=t.holdings||{},i=Object.entries(e).filter(([c,l])=>l>0),s=n.currentDay===0;if(!(i.length>0||t.cash>0))return;const o=await Promise.all(i.map(async([c,l])=>{const h=qi[c]||0,d=await CM(Ge,c,n.currentDay,n.visibleTickers),f=d>0?(h-d)/d*100:0;return{ticker:c,qty:l,currentPrice:h,avgBuyPrice:d,returnRate:f,value:l*h}}));o.sort((c,l)=>l.value-c.value);const a=`
    <div class="card" style="margin-top: 20px;">
      <h3>보유 종목</h3>
      <div class="table-container">
        <table>
        <thead>
          <tr>
            <th>종목</th>
            <th>보유 수량</th>
            <th>현재 가격</th>
            <th>평균 매수단가</th>
            <th>수익률</th>
            <th>평가 금액</th>
            <th>매도 주 수량</th>
            <th>매도</th>
          </tr>
        </thead>
        <tbody>
          ${o.map(({ticker:c,qty:l,currentPrice:h,avgBuyPrice:d,returnRate:f,value:m})=>{const _=l,b=f>0,v=f<0,S=b?"#ef4444":v?"#3b82f6":"inherit",R=b?"+":"";return`
              <tr>
                <td><strong>${c}</strong></td>
                <td>${l.toFixed(0)} 주</td>
                <td>${Rn(h)}</td>
                <td>${Rn(d)}</td>
                <td style="color: ${S}; font-weight: 600;">
                  ${R}${f.toFixed(2)}%
                </td>
                <td>${Rn(m)}</td>
                <td>
                  <input 
                    type="number" 
                    id="sell_${c}" 
                    placeholder="주 수량" 
                    min="0" 
                    step="0.0001"
                    max="${_}"
                    style="width: 120px;"
                    ${s?"disabled":""}
                  />
                </td>
                <td>
                  <div style="display: flex; gap: 8px;">
                    <button 
                      class="btn-primary" 
                      onclick="handleSell('${c}')"
                      style="padding: 8px 16px; font-size: 14px; flex: 1;"
                      ${s?"disabled":""}
                    >
                      매도
                    </button>
                    <button 
                      class="btn-muted" 
                      onclick="handleSellAll('${c}')"
                      style="padding: 8px 12px; font-size: 13px;"
                      ${s?"disabled":""}
                    >
                      전량 매도
                    </button>
                  </div>
                </td>
              </tr>
            `}).join("")}
          ${t.cash>0?`
            <tr style="background-color: rgba(59, 130, 246, 0.1);">
              <td><strong style="color: #3b82f6;">현금</strong></td>
              <td>-</td>
              <td>${Rn(t.cash)}</td>
              <td>-</td>
              <td>-</td>
              <td>${Rn(t.cash)}</td>
              <td>-</td>
              <td>
                <span style="color: var(--text-muted); font-size: 14px;">매도 불가</span>
              </td>
            </tr>
          `:""}
        </tbody>
        </table>
      </div>
    </div>
  `;statusContent&&statusContent.insertAdjacentHTML("beforeend",a)}function DM(n,t,e,i){if(n===0)return null;const s=n-1,o=dn(s,i)[t];return!o||o===0?null:(e-o)/o*100}function MM(n){const t=n.prices,e=n.currentDay,i=n.visibleTickers||we,s=e===0,o=n.user.cash||0,a=`
    <div style="margin-top: 16px;">
      ${s?'<p style="color: var(--text-muted); font-size: 14px; margin-bottom: 12px;">⚠️ Day 0에서는 거래할 수 없습니다. 주식 종목과 가격만 확인할 수 있습니다.</p>':""}
      <div class="table-container">
        <table>
        <thead>
          <tr>
            <th>종목</th>
            <th>현재 가격</th>
            ${e>0?"<th>전날 대비</th>":""}
            <th>매수 주 수량</th>
            <th>매수</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(t).map(([c,l])=>{const h=DM(e,c,l,i);let d="";if(h!==null){const m=h>0;d=`
                <td style="color: ${m?"#ef4444":"#3b82f6"}; font-weight: 600;">
                  ${m?"↑":"↓"} ${m?"+":""}${h.toFixed(2)}%
                </td>
              `}else e>0&&(d="<td>-</td>");const f=Math.floor(o/l);return`
            <tr>
              <td><strong>${c}</strong></td>
              <td>${Rn(l)}</td>
              ${d}
              <td>
                <input 
                  type="number" 
                  id="buy_${c}" 
                  placeholder="주 수량" 
                  min="0" 
                  step="1"
                  max="${f}"
                  style="width: 120px;"
                  ${s?"disabled":""}
                />
                ${s?"":`<div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">최대 ${f.toLocaleString()}주</div>`}
              </td>
              <td>
                <button 
                  class="btn-primary" 
                  onclick="handleBuy('${c}')"
                  style="padding: 8px 16px; font-size: 14px;"
                  ${s?"disabled":""}
                >
                  매수
                </button>
              </td>
            </tr>
          `}).join("")}
        </tbody>
        </table>
      </div>
    </div>
  `;om&&(om.innerHTML=a)}window.handleBuy=async function(n){const t=document.getElementById(`buy_${n}`),e=parseFloat(t.value);if(!e||e<=0){Y("매수할 주 수량을 입력해주세요.","warning");return}if(!qi[n]){Y("종목 가격 정보를 찾을 수 없습니다.","error");return}try{qh("매수 주문 처리 중..."),await Ph(Ge,[{ticker:n,shares:e}]),t.value="",await Os(),Y(`${e.toFixed(0)}주 매수가 완료되었습니다.`,"success")}catch(i){console.error(i),Y("매수 실패: "+i.message,"error")}finally{kc()}};window.handleSell=async function(n){const t=document.getElementById(`sell_${n}`),e=parseFloat(t.value);if(!e||e<=0){Y("매도할 주 수량을 입력해주세요.","warning");return}if(!qi[n]){Y("종목 가격 정보를 찾을 수 없습니다.","error");return}try{qh("매도 주문 처리 중..."),await Ph(Ge,[{ticker:n,shares:-e}]),t.value="",await Os(),Y(`${e.toFixed(0)}주 매도가 완료되었습니다.`,"success")}catch(i){console.error(i),Y("매도 실패: "+i.message,"error")}finally{kc()}};window.handleSellAll=async function(n){if(!xr||!xr.user){Y("사용자 정보를 불러올 수 없습니다.","error");return}const e=(xr.user.holdings||{})[n];if(!e||e<=0){Y("매도할 주식이 없습니다.","warning");return}if(!qi[n]){Y("종목 가격 정보를 찾을 수 없습니다.","error");return}try{qh("전량 매도 주문 처리 중..."),await Ph(Ge,[{ticker:n,shares:-e}]),await Os(),Y(`${e.toFixed(0)}주 전량 매도가 완료되었습니다.`,"success")}catch(i){console.error(i),Y("매도 실패: "+i.message,"error")}finally{kc()}};IM.onclick=()=>{Object.keys(qi).forEach(n=>{const t=document.getElementById(`buy_${n}`),e=document.getElementById(`sell_${n}`);t&&(t.value=""),e&&(e.value="")})};async function hw(){try{Q("관리자 대시보드를 불러오는 중..."),document.body.classList.remove("login-screen"),Es.style.display="none",Zn.style.display="none",Is.style.display="none",ti&&(ti.style.display="none"),ei&&(ei.style.display="block"),await bu(),await Ve(),await ds(),Q("")}catch(n){console.error(n),Y("관리자 대시보드를 불러오는데 실패했습니다: "+n.message,"error"),Q("")}}async function bu(){try{const t=(await Hi()).currentDay??0,e=ot("currentDayDisplay");e&&(e.textContent=`Day ${t}`)}catch(n){console.error("Day 정보 불러오기 실패:",n)}}function OM(){const n=ot("btnAdminLogout"),t=ot("btnResetAll"),e=ot("btnResetAccounts"),i=ot("btnResetInvestments"),s=ot("btnResetAssets"),r=ot("btnRefreshUsers"),o=ot("btnViewRankings"),a=ot("adminToken"),c=ot("btnNext");n&&(n.onclick=Gh),t&&(t.onclick=async()=>{if(!(!await Ei(`⚠️ 경고: 모든 데이터를 삭제하시겠습니까?

삭제되는 항목:
• 모든 사용자의 Firestore 데이터 (계정, 자산, 투자 내역)
• 모든 사용자의 Firebase Auth 계정 (ADMIN 제외)
• 게임 상태 정보 (Day가 1로 초기화됨)

⚠️ 주의: 이 작업은 되돌릴 수 없습니다.
삭제된 계정으로는 재가입이 가능합니다.`,"전체 초기화 경고")||!await Ei("정말로 모든 데이터를 삭제하고 Day를 1로 초기화하시겠습니까?","최종 확인")))try{Q("전체 초기화 중... (Firestore 데이터 삭제 중)");const f=await oR();f&&f.deletedCount!==void 0?Y(`전체 초기화가 완료되었습니다. Day가 1로 초기화되었고, ${f.deletedCount}개의 Auth 계정이 삭제되었습니다.`,"success",6e3):Y("전체 초기화가 완료되었습니다. Day가 1로 초기화되었습니다.","success",5e3),await bu(),await Ve()}catch(f){console.error(f),Y("초기화 실패: "+f.message,"error",6e3)}finally{Q("")}}),e&&(e.onclick=async()=>{if(await Ei(`⚠️ 경고: 모든 계정을 삭제하시겠습니까?
이 작업은 되돌릴 수 없습니다.`,"계정 삭제 경고"))try{Q("계정 삭제 중..."),await aR(),Y("계정 삭제가 완료되었습니다.","success"),await Ve()}catch(d){console.error(d),Y("삭제 실패: "+d.message,"error")}finally{Q("")}}),i&&(i.onclick=async()=>{if(await Ei(`⚠️ 경고: 모든 구매 내역을 삭제하시겠습니까?
이 작업은 되돌릴 수 없습니다.`,"구매 내역 삭제 경고"))try{Q("구매 내역 삭제 중..."),await cR(),Y("구매 내역 삭제가 완료되었습니다.","success"),await Ve()}catch(d){console.error(d),Y("삭제 실패: "+d.message,"error")}finally{Q("")}}),s&&(s.onclick=async()=>{if(await Ei(`⚠️ 경고: 모든 자산 정보를 초기화하시겠습니까?
현금과 보유 종목이 초기값으로 돌아갑니다.
이 작업은 되돌릴 수 없습니다.`,"자산 초기화 경고"))try{Q("자산 초기화 중..."),await lR(),Y("자산 초기화가 완료되었습니다.","success"),await Ve()}catch(d){console.error(d),Y("초기화 실패: "+d.message,"error")}finally{Q("")}}),r&&(r.onclick=async()=>{await Ve()}),o&&(o.onclick=async()=>{await ds()});const l=ot("btnAdvanceDay");l&&(l.onclick=async()=>{if(await Ei(`⚠️ 다음 Day로 이동하시겠습니까?
모든 사용자 화면이 자동으로 새로고침됩니다.`,"Day 진행 확인"))try{Q("Day를 진행하는 중...");const d=await rR(Ge);Y(`Day ${d}로 이동했습니다! 모든 사용자 화면이 자동으로 새로고침됩니다.`,"success",5e3),await bu(),await Ve(),await ds()}catch(d){console.error(d),Y("Day 진행 실패: "+d.message,"error")}finally{Q("")}}),c&&(c.onclick=async()=>{const h=a==null?void 0:a.value.trim();if(!h){Y("관리자 토큰을 입력하세요.","warning");return}try{Q("Day를 진행하는 중..."),await sR(h),Y("다음 Day로 이동했습니다.","success"),a&&(a.value=""),await Ve(),await ds()}catch(d){console.error(d),Y("Day 진행 실패: "+d.message,"error")}finally{Q("")}})}async function Ve(){try{Q("사용자 목록을 불러오는 중...");const n=await hb(),t=ot("usersList");if(!t)return;if(n.length===0){t.innerHTML='<p style="color: rgba(255,255,255,0.6);">등록된 사용자가 없습니다.</p>',Q("");return}const e=`
      <div style="overflow-x: auto;">
        <table style="width: 100%; background: rgba(255,255,255,0.05); border-radius: 8px;">
          <thead>
            <tr>
              <th style="color: white;">사용자 ID</th>
              <th style="color: white;">보유 현금</th>
              <th style="color: white;">평가 금액</th>
              <th style="color: white;">보유 종목</th>
              <th style="color: white;">작업</th>
            </tr>
          </thead>
          <tbody>
            ${n.map(i=>{const s=Object.entries(i.holdings).filter(([r,o])=>o>0).map(([r,o])=>`${r}: ${o.toFixed(0)}`).join(", ")||"없음";return`
                <tr>
                  <td style="color: white;"><strong>${i.userId}</strong></td>
                  <td style="color: white;">${i.cash.toLocaleString()} ₩</td>
                  <td style="color: #4ade80; font-weight: 600;">${i.portfolioValue.toLocaleString()} ₩</td>
                  <td style="color: rgba(255,255,255,0.8); font-size: 13px;">${s}</td>
                  <td>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                      <button 
                        class="btn-primary" 
                        onclick="handleAdjustAssets('${i.userId}')"
                        style="padding: 6px 12px; font-size: 13px; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3);"
                      >
                        자산 조정
                      </button>
                      <button 
                        class="btn-danger" 
                        onclick="handleDeleteUser('${i.userId}')"
                        style="padding: 6px 12px; font-size: 13px; background: #ff6b6b; color: white;"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    `;t.innerHTML=e,Q("")}catch(n){console.error(n),Y("사용자 목록을 불러오는데 실패했습니다: "+n.message,"error"),Q("")}}async function ds(){try{Q("순위를 불러오는 중...");const n=await dR(),t=ot("rankingsList");if(!t)return;if(n.length===0){t.innerHTML='<p style="color: rgba(255,255,255,0.6);">등록된 사용자가 없습니다.</p>',Q("");return}const e=`
      <div style="overflow-x: auto;">
        <table style="width: 100%; background: rgba(255,255,255,0.05); border-radius: 8px;">
          <thead>
            <tr>
              <th style="color: white;">순위</th>
              <th style="color: white;">사용자 ID</th>
              <th style="color: white;">평가 금액</th>
              <th style="color: white;">보유 현금</th>
            </tr>
          </thead>
          <tbody>
            ${n.map((i,s)=>{const r=s===0?"🥇":s===1?"🥈":s===2?"🥉":"";return`
                <tr style="${s<3?"background: rgba(255,215,0,0.1);":""}">
                  <td style="color: white; font-weight: 600;">
                    ${r} ${i.rank}위
                  </td>
                  <td style="color: white;"><strong>${i.userId}</strong></td>
                  <td style="color: #4ade80; font-weight: 600; font-size: 16px;">${i.portfolioValue.toLocaleString()} ₩</td>
                  <td style="color: rgba(255,255,255,0.8);">${i.cash.toLocaleString()} ₩</td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    `;t.innerHTML=e,Q("")}catch(n){console.error(n),Y("순위를 불러오는데 실패했습니다: "+n.message,"error"),Q("")}}window.handleDeleteUser=async function(n){if(await Ei(`사용자 "${n}"를 정말 삭제하시겠습니까?
계정과 모든 투자 내역이 삭제됩니다.`,"사용자 삭제 확인"))try{Q("사용자 삭제 중..."),await uR(n),Y("사용자가 삭제되었습니다.","success"),await Ve(),await ds()}catch(e){console.error(e),Y("삭제 실패: "+e.message,"error")}finally{Q("")}};window.handleAdjustAssets=async function(n){const t=await am(`${n}의 현금을 조정하세요.
양수: 추가, 음수: 차감
예: 1000000 또는 -500000`,"현금 조정","");if(t===null||t==="")return;const e=parseFloat(t);if(isNaN(e)){Y("올바른 숫자를 입력하세요.","error");return}const i=await am(`${n}의 보유 종목을 조정하세요.
형식: TICKER:수량,TICKER:수량
예: AAA:10,BBB:-5
(양수: 추가, 음수: 차감)`,"보유 종목 조정","");let s=null;if(i&&i.trim())try{s={},i.split(",").forEach(o=>{const[a,c]=o.trim().split(":");a&&c&&(s[a.trim().toUpperCase()]=parseFloat(c.trim()))})}catch{Y("보유 종목 형식이 올바르지 않습니다.","error");return}try{Q("자산 조정 중..."),await hR(n,e,s),Y("자산이 조정되었습니다.","success"),await Ve(),await ds()}catch(r){console.error(r),Y("자산 조정 실패: "+r.message,"error")}finally{Q("")}};function Kh(){fe&&(fe(),fe=null),fe=fR((n,t)=>{console.log(`Day 변경 감지: Day ${t} → Day ${n}`);const e=document.createElement("div");e.style.cssText=`
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4ade80;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-weight: 600;
      animation: slideIn 0.3s ease-out;
    `,e.textContent=`새로운 Day ${n}로 이동했습니다! 화면을 새로고침합니다...`,document.body.appendChild(e),setTimeout(()=>{e.remove(),Os()},1500)})}async function NM(){return new Promise(n=>{AT(Dn,async t=>{if(qa&&qa.classList.add("hidden"),t&&t.email){const e=AM(t.email);if(e){Ge=e,an=ub(e);try{an?await hw():(await Os(),!an&&!fe&&Kh())}catch(i){console.error("인증 상태 복원 실패:",i),ha()}}else ha()}else ha();n()})})}function ha(){fe&&(fe(),fe=null),qa&&qa.classList.add("hidden"),document.body.classList.add("login-screen"),Es&&(Es.style.display="block"),Zn&&(Zn.style.display="none"),Is&&(Is.style.display="none"),ti&&(ti.style.display="none"),ei&&(ei.style.display="none"),ni&&(ni.style.display="none"),Ka()}OM();NM();
