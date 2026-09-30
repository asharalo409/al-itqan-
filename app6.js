Object.assign(T.bn,{plan:"পড়ার প্ল্যান",dm:"ব্যক্তিগত চ্যাট",profile:"প্রোফাইল"});
Object.assign(T.en,{plan:"Study plan",dm:"Private chat",profile:"Profile"});
const X6={},TABS=['notice','routine','plan','teachers','files','chat','dm','members','blood','comp','profile'];
let dmSub=0,dmWith=null;
const TH=[{bg:'#1c0710',p:'#2c0d19',l:'#4a1c2b',g:'#e9b44c',g2:'#f6d58a',a:'#5a1a30'},{bg:'#07160f',p:'#0f2a1d',l:'#1d4a33',g:'#5fd08a',g2:'#b6f0cd',a:'#1d5a3a'},{bg:'#08111f',p:'#0f2038',l:'#1d3a63',g:'#5aa9f0',g2:'#bcdcff',a:'#1d4a80'},{bg:'#140a1f',p:'#22123a',l:'#3d2466',g:'#c08cff',g2:'#e6d0ff',a:'#4a2480'},{bg:'#0b0b0b',p:'#181818',l:'#333333',g:'#ffcc33',g2:'#ffe9a0',a:'#3a3a3a'}];
function setTh(i){const x=TH[i]||TH[0],r=document.documentElement.style;[['--bg',x.bg],['--panel',x.p],['--line',x.l],['--gold',x.g],['--gold2',x.g2],['--acc',x.a]].forEach(([k,v])=>r.setProperty(k,v));localStorage.th=i}
function tp(){const p=$('#pal');p.style.display=p.style.display=='flex'?'none':'flex'}
document.head.insertAdjacentHTML('beforeend',`<style>
:root{--acc:#5a1a30}
.msg.me,.tag{background:var(--acc)}
#tick{background:#8a1020;color:#fff;overflow:hidden;white-space:nowrap;padding:3px 0;font-weight:700;display:none}
#tick span{display:inline-block;padding-left:100%;animation:tk 22s linear infinite}
@keyframes tk{to{transform:translateX(-100%)}}
#pal{position:absolute;top:44px;right:10px;z-index:9;display:none;gap:8px;background:var(--panel);border:1px solid var(--gold);border-radius:12px;padding:8px}
#pal i{width:28px;height:28px;border-radius:50%;cursor:pointer;border:2px solid #fff}
#emo{flex-wrap:wrap;gap:2px;margin:6px 0}#emo b{cursor:pointer;font-size:22px;padding:2px 4px;font-weight:400}
</style>`);
document.body.insertAdjacentHTML('afterbegin','<div id="clkbar" style="text-align:center;background:var(--panel);border-bottom:1px solid var(--line);color:var(--gold2);font-size:14px;padding:2px"></div><div id="tick"><span></span></div>');
$('.hero').insertAdjacentHTML('beforeend',`<div id="pal">${TH.map((x,i)=>`<i style="background:${x.g}" onclick="setTh(${i})"></i>`).join('')}</div>`);
$('#lang').insertAdjacentHTML('beforebegin','<span class="pill" onclick="tp()">🎨</span>');
setTh(+localStorage.th||0);
function clk(){const d=new Date(),b=L=='bn';$('#clkbar').textContent='🕒 '+d.toLocaleTimeString(b?'bn-BD':'en-US',{hour:'numeric',minute:'2-digit',second:'2-digit'})+' · '+d.toLocaleDateString(b?'bn-BD':'en-GB',{weekday:'long',day:'numeric',month:'long'})}
clk();setInterval(clk,1000);
const EM=['😀','😊','😂','🥰','😍','🤲','🕌','📖','☪️','🌙','✨','👍','👏','🙏','❤️','💐','🎉','😢','😮','🤔','🔥','💯','✅','📚'];
const emoBar=id=>`<div id="emo" style="display:none">${EM.map(e=>`<b onclick="insE('${id}','${e}')">${e}</b>`).join('')}</div>`;
function insE(id,e){const i=$('#'+id);i.value+=e;i.focus()}
function tE(){const e=$('#emo');e.style.display=e.style.display=='none'?'flex':'none'}
async function loadTick(){const{data}=await sb.from('notices').select('title').eq('category','urgent').gte('created_at',new Date(Date.now()-7*864e5).toISOString()).order('created_at',{ascending:false}).limit(5);const e=$('#tick');if(data&&data.length){e.style.display='block';e.firstElementChild.textContent='🚨 '+data.map(n=>n.title).join('   ◆   ')}else e.style.display='none'}
async function loadSite(){const{data}=await sb.from('site').select('*');(data||[]).forEach(r=>{if(r.key=='logo')document.querySelector('.brand img').src=r.value;if(r.key=='cover')document.querySelector('.hero').style.backgroundImage=`url(${r.value})`})}
function initRt(){sb.channel('dm6').on('postgres_changes',{event:'INSERT',schema:'public',table:'dms'},x=>{const m=x.new;if(m.receiver!=me.id&&m.sender!=me.id)return;if(tab=='dm'&&dmWith&&(m.sender==dmWith||m.receiver==dmWith))addDm(m);else if(m.receiver==me.id)toast('💬 নতুন ব্যক্তিগত মেসেজ')}).subscribe()}
function tickD(){document.querySelectorAll('.du').forEach(x=>{const ms=new Date(x.dataset.due)-Date.now();x.textContent=ms>0?'⏳ '+dur(ms)+' বাকি':'⌛ সময় শেষ'})}
setInterval(tickD,20000);
chrome=function(){document.documentElement.lang=L;$('#lang').textContent=L=='bn'?'EN':'বাংলা';document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t(e.dataset.t));
 if(me){$('#role').textContent=isA()?t('admin'):t('member');$('#nav').innerHTML=TABS.map(k=>`<button class="${tab==k?'on':''}" onclick="go('${k}')">${t(k)}</button>`).join('')}};
function post(){if(tab=='chat'&&$('#cm')&&!$('#emo')){const r=$('#cm').closest('.row');r.insertAdjacentHTML('beforebegin',emoBar('cm'));r.insertAdjacentHTML('afterbegin','<button class="btn ghost" style="flex:none;padding:6px 10px" onclick="tE()">😊</button>')}
 if(tab=='dm'){const c=$('#dch');if(c)c.scrollTop=c.scrollHeight}tickD();loadTick()}
const _r6=render;
render=async function(){
 if(me&&!dmSub){dmSub=1;initRt();loadSite()}
 if(X6[tab]){try{chrome();$('#view').innerHTML=await X6[tab]();bell()}catch(e){toast(String(e.message||e))}}
 else await _r6();
 post()};
