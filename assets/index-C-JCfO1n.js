(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&c(f)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();const o=e=>document.querySelector(e),k=o("#backendUrl"),O=o("#userId"),T=o("#password"),N=o("#btnSignup"),j=o("#btnLogin"),B=o("#btnLogout"),I=o("#loadHint"),x=o("#status"),_=o("#trade"),E=o("#prices"),P=o("#lastUpdated"),b=o("#btnSubmit"),H=o("#btnReset"),R=o("#adminToken"),p=o("#btnNext");let a=k.value.trim(),d="",l="",v=1,L={},m=null,$=!1,y=!1;const F="사용자 정보를 불러오면 현황이 나타납니다.",h={backend:"stocksim.backendUrl.v1",user:"stocksim.userId.v1"};function i(e,t=!1){I.textContent=e,I.style.color=t?"#b91c1c":"#64748b"}function D(){x.textContent=F,_.style.display="none",E.innerHTML="",P.textContent=""}function g(e){return Number(e||0).toLocaleString("ko-KR",{maximumFractionDigits:0})}function J(){window.localStorage.setItem(h.backend,a),window.localStorage.setItem(h.user,d)}function K(){const e=window.localStorage.getItem(h.backend),t=window.localStorage.getItem(h.user);e&&(a=e,k.value=e),t&&(d=t,O.value=t),(e||t)&&i("저장된 정보를 불러왔습니다. 로그인 후 상태를 확인하세요.")}async function u(e,t={}){const r=await fetch(e,{...t,headers:{"Content-Type":"application/json",...t.headers||{}}});if(!r.ok){let c="";try{const n=await r.json();c=n.detail||n.message||""}catch{c=await r.text()}throw new Error(c||r.statusText)}return r.json()}function M(e){const t=e.holdings;return`
    <table>
      <thead>
        <tr>
          <th>종목</th>
          <th>보유 수량</th>
          <th>현재가</th>
          <th>평가 금액</th>
        </tr>
      </thead>
      <tbody>${Object.entries(t).map(([c,n])=>{const s=L[c],f=s?n*s:0;return`
        <tr>
          <td>${c}</td>
          <td>${n.toFixed(4)}</td>
          <td>${s?s.toLocaleString():"-"}</td>
          <td>${g(f)}</td>
        </tr>`}).join("")}</tbody>
    </table>`}function q(){const e=Object.entries(L).map(([t,r])=>`
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
        </tr>`).join("");E.innerHTML=`
    <table>
      <thead>
        <tr>
          <th>종목</th>
          <th>가격(₩)</th>
          <th>주문 금액(₩)</th>
        </tr>
      </thead>
      <tbody>${e}</tbody>
    </table>`}function S(){document.querySelectorAll("input[data-ticker]").forEach(e=>{e.value="0"})}function X(e=[]){return e.length?e.map(t=>`${t.ticker} ${g(t.amount_krw)}₩`).join(", "):"-"}function C(){m&&(clearInterval(m),m=null)}function z(){C(),m=window.setInterval(()=>{w({silent:!0})},1e4)}function A(){const e=k.value.trim().replace(/\/+$/,""),t=O.value.trim().toUpperCase(),r=T.value.trim();if(!e)throw new Error("백엔드 URL을 입력해주세요.");if(!t)throw new Error("아이디를 입력해주세요.");if(r.length<4)throw new Error("비밀번호를 4자 이상 입력해주세요.");return{backend:e,userId:t,password:r}}function U(e="로그인이 필요합니다."){y=!1,d="",l="",C(),S(),D(),i(e)}function Y(){return!y||!a||!d||!l?(i("먼저 로그인해주세요.",!0),!1):!0}async function w({silent:e=!1}={}){if(!a||!d||!l){e||i("로그인 상태가 아니어서 데이터를 불러올 수 없습니다.",!0);return}try{const t=await u(`${a}/state?user_id=${encodeURIComponent(d)}`,{headers:{"X-Auth-Password":l}});v=t.current_day,L=(await u(`${a}/prices?day=${v}`)).prices||{};const c=t.last_investment?`<p style="font-size:13px; color:#475569; margin-top:8px;">최근 저장 (Day ${t.last_investment.day}): ${X(t.last_investment.orders)}</p>`:"";x.innerHTML=`
      <h3 style="margin-top:0;">${d} 님 현황</h3>
      <p>현재 Day: <strong>${v}</strong></p>
      <p>현금: <strong>${g(t.user.cash)}₩</strong></p>
      <p>총 자산: <strong>${g(t.user.portfolio_value)}₩</strong></p>
      ${c}
      <div style="margin-top:12px;">
        <h4 style="margin:0 0 8px;">보유 종목</h4>
        ${M(t.user)}
      </div>
    `,q(),_.style.display="block",P.textContent=`마지막 업데이트: ${new Date().toLocaleTimeString("ko-KR")}`,e||i("상태를 성공적으로 불러왔습니다.")}catch(t){e||i(`불러오기 실패: ${t.message}`,!0),console.error(t)}}N.addEventListener("click",async()=>{try{const{backend:e,userId:t,password:r}=A();a=e,i("가입을 진행하는 중입니다..."),await u(`${a}/signup`,{method:"POST",body:JSON.stringify({user_id:t,password:r})}),i("가입이 완료되었습니다. 동일한 정보로 로그인하세요.")}catch(e){i(e.message,!0)}});j.addEventListener("click",async()=>{try{const{backend:e,userId:t,password:r}=A();a=e,i("로그인 중입니다..."),await u(`${a}/login`,{method:"POST",body:JSON.stringify({user_id:t,password:r})}),d=t,l=r,y=!0,J(),await w({silent:!0}),z(),i("로그인에 성공했습니다. 최신 상태로 갱신했습니다.")}catch(e){U(e.message),i(e.message,!0)}});B.addEventListener("click",()=>{T.value="",U("로그아웃되었습니다.")});b.addEventListener("click",async()=>{if(!Y()||$)return;const t=Array.from(document.querySelectorAll("input[data-ticker]")).map(r=>({ticker:r.dataset.ticker,amount_krw:Number(r.value||0)})).filter(r=>Number.isFinite(r.amount_krw)&&r.amount_krw!==0);if(t.length===0){alert("저장할 투자 금액을 한 개 이상 입력하세요.");return}$=!0,b.disabled=!0;try{await u(`${a}/order`,{method:"POST",headers:{"X-Auth-Password":l},body:JSON.stringify({user_id:d,orders:t})}),S(),await w({silent:!0}),alert("투자 내역을 저장했습니다.")}catch(r){alert(`저장 실패: ${r.message}`)}finally{$=!1,b.disabled=!1}});H.addEventListener("click",()=>{S()});p.addEventListener("click",async()=>{const e=R.value.trim();if(!e){alert("admin token을 입력하세요.");return}p.disabled=!0,p.textContent="다음 Day로 이동 중...";try{await u(`${a}/admin/advance`,{method:"POST",headers:{"X-Admin-Token":e}}),y&&await w({silent:!0}),alert("다음 Day로 이동했습니다.")}catch(t){alert(`Day 이동 실패: ${t.message}`)}finally{p.disabled=!1,p.textContent="다음 Day로 이동"}});window.addEventListener("load",()=>{D(),K()});
