const $ = (sel) => document.querySelector(sel);


let BACKEND = "http://localhost:8000";
let USER = null;
let CURRENT_DAY = 1;
let CURRENT_PRICES = {};


$("#btnLoad").addEventListener("click", async () => {
BACKEND = $("#backendUrl").value.trim();
USER = $("#userId").value.trim();
if (!USER) { alert("사용자 ID를 입력하세요."); return; }
await refresh();
});


async function refresh(){
const s = await fetch(`${BACKEND}/state?user_id=${encodeURIComponent(USER)}`).then(r=>r.json());
CURRENT_DAY = s.current_day;
$("#status").innerHTML = `
<div>현재 Day: <b>${s.current_day}</b></div>
<div>현금: <b>${s.user.cash.toLocaleString()}</b></div>
<div>총 자산: <b>${s.user.portfolio_value.toLocaleString()}</b></div>
<div>보유: <pre>${JSON.stringify(s.user.holdings, null, 2)}</pre></div>
`;


const p = await fetch(`${BACKEND}/prices`).then(r=>r.json());
CURRENT_PRICES = p.prices;


const rows = Object.entries(CURRENT_PRICES).map(([ticker, price]) => `
<tr>
<td>${ticker}</td>
<td>${price}</td>
<td><input type="number" step="100" value="0" data-ticker="${ticker}" placeholder="+매수/-매도 금액" /></td>
</tr>`).join("");


$("#prices").innerHTML = `
<table>
<thead><tr><th>종목</th><th>가격</th><th>투자금액(₩)</th></tr></thead>
<tbody>${rows}</tbody>
</table>`;


$("#trade").style.display = "block";
}


$("#btnSubmit").addEventListener("click", async () => {
const inputs = Array.from(document.querySelectorAll("input[data-ticker]"));
const orders = inputs.map(inp => ({ ticker: inp.dataset.ticker, amount_krw: Number(inp.value || 0) }))
.filter(o => o.amount_krw !== 0);
if (orders.length === 0) { alert("주문 금액을 입력하세요."); return; }


const res = await fetch(`${BACKEND}/order`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ user_id: USER, orders })
});
if (!res.ok){
const err = await res.json();
alert("오류: " + (err.detail || res.statusText));
return;
}
await refresh();
});


$("#btnNext").addEventListener("click", async () => {
const token = $("#adminToken").value;
});