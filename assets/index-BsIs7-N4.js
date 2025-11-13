(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const a=e=>document.querySelector(e),v=a("#backendUrl"),L=a("#userId"),I=a("#btnLoad"),k=a("#loadHint"),O=a("#status"),x=a("#trade"),D=a("#prices"),T=a("#lastUpdated"),h=a("#btnSubmit"),C=a("#btnReset"),P=a("#adminToken"),u=a("#btnNext");let s=v.value.trim(),i="",y=1,$={},b=null,g=!1;const f={backend:"stocksim.backendUrl.v1",user:"stocksim.userId.v1"};function d(e,t=!1){k.textContent=e,k.style.color=t?"#b91c1c":"#64748b"}function w(e){return Number(e||0).toLocaleString("ko-KR",{maximumFractionDigits:0})}function U(){window.localStorage.setItem(f.backend,s),window.localStorage.setItem(f.user,i)}function E(){const e=window.localStorage.getItem(f.backend),t=window.localStorage.getItem(f.user);e&&(s=e,v.value=e),t&&(i=t,L.value=t),(e||t)&&d("저장된 정보를 불러왔습니다. 접속하기를 눌러 최신 상태를 확인하세요.")}async function m(e,t={}){const r=await fetch(e,{...t,headers:{"Content-Type":"application/json",...t.headers||{}}});if(!r.ok){const c=await r.text();throw new Error(c||r.statusText)}return r.json()}function N(e){const t=e.holdings;return`
    <table>
      <thead>
        <tr>
          <th>종목</th>
          <th>보유 수량</th>
          <th>현재가</th>
          <th>평가 금액</th>
        </tr>
      </thead>
      <tbody>${Object.entries(t).map(([c,n])=>{const o=$[c],l=o?n*o:0;return`
        <tr>
          <td>${c}</td>
          <td>${n.toFixed(4)}</td>
          <td>${o?o.toLocaleString():"-"}</td>
          <td>${w(l)}</td>
        </tr>`}).join("")}</tbody>
    </table>`}function _(){const e=Object.entries($).map(([t,r])=>`
        <tr>
          <td>${t}</td>
          <td>${r.toLocaleString()}</td>
          <td>
            <input
              type="number"
              step="10000"
              value="0"
              data-ticker="${t}"
              placeholder="+매수 / -매도"
            />
          </td>
        </tr>`).join("");D.innerHTML=`
    <table>
      <thead>
        <tr>
          <th>종목</th>
          <th>가격(₩)</th>
          <th>주문 금액(₩)</th>
        </tr>
      </thead>
      <tbody>${e}</tbody>
    </table>`}function S(){document.querySelectorAll("input[data-ticker]").forEach(e=>{e.value="0"})}async function p({silent:e=!1}={}){if(!(!s||!i))try{const t=await m(`${s}/state?user_id=${encodeURIComponent(i)}`);y=t.current_day,$=(await m(`${s}/prices?day=${y}`)).prices||{},O.innerHTML=`
      <h3 style="margin-top:0;">${i} 님 현황</h3>
      <p>현재 Day: <strong>${y}</strong></p>
      <p>현금: <strong>${w(t.user.cash)}₩</strong></p>
      <p>총 자산: <strong>${w(t.user.portfolio_value)}₩</strong></p>
      <div style="margin-top:12px;">
        <h4 style="margin:0 0 8px;">보유 종목</h4>
        ${N(t.user)}
      </div>
    `,_(),x.style.display="block",T.textContent=`마지막 업데이트: ${new Date().toLocaleTimeString("ko-KR")}`,e||d("상태를 성공적으로 불러왔습니다.")}catch(t){e||d(`불러오기 실패: ${t.message}`,!0),console.error(t)}}function j(){b&&clearInterval(b),b=window.setInterval(()=>{p({silent:!0})},1e4)}I.addEventListener("click",async()=>{if(s=v.value.trim().replace(/\/+$/,""),i=L.value.trim().toUpperCase(),!s){d("백엔드 URL을 입력해주세요.",!0);return}if(!i){d("사용자 ID를 입력해주세요.",!0);return}d("상태를 불러오는 중입니다..."),U(),await p(),j()});h.addEventListener("click",async()=>{if(g)return;const t=Array.from(document.querySelectorAll("input[data-ticker]")).map(r=>({ticker:r.dataset.ticker,amount_krw:Number(r.value||0)})).filter(r=>Number.isFinite(r.amount_krw)&&r.amount_krw!==0);if(t.length===0){alert("주문 금액을 한 개 이상 입력하세요.");return}g=!0,h.disabled=!0;try{await m(`${s}/order`,{method:"POST",body:JSON.stringify({user_id:i,orders:t})}),S(),await p({silent:!0}),alert("주문이 체결되었습니다.")}catch(r){alert(`주문 실패: ${r.message}`)}finally{g=!1,h.disabled=!1}});C.addEventListener("click",()=>{S()});u.addEventListener("click",async()=>{const e=P.value.trim();if(!e){alert("admin token을 입력하세요.");return}u.disabled=!0,u.textContent="다음 Day로 이동 중...";try{await m(`${s}/admin/advance`,{method:"POST",headers:{"X-Admin-Token":e}}),await p({silent:!0}),alert("다음 Day로 이동했습니다.")}catch(t){alert(`Day 이동 실패: ${t.message}`)}finally{u.disabled=!1,u.textContent="다음 Day로 이동"}});window.addEventListener("load",()=>{E()});
