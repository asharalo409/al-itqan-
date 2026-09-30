const bn=N;
Object.assign(T.bn,{plan:"আমার রুটিন"});Object.assign(T.en,{plan:"My routine"});
const PC={study:['📖','পড়াশোনা'],prayer:['🕌','নামাজ'],meal:['🍽','খাওয়া'],bath:['🚿','গোসল'],sport:['⚽','খেলাধুলা'],class:['📚','ক্লাস'],work:['✍️','অ্যাসাইনমেন্ট/কাজ'],sleep:['😴','ঘুম/বিশ্রাম'],other:['🔹','অন্যান্য']};
const ymd=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
let pd=ymd(new Date());
const shiftD=(s,n)=>{const d=new Date(s+'T00:00');d.setDate(d.getDate()+n);return ymd(d)};
const mins=(a,b)=>{if(!a||!b)return 0;const[h1,m1]=a.split(':'),[h2,m2]=b.split(':');let x=(+h2*60+ +m2)-(+h1*60+ +m1);if(x<0)x+=1440;return x};
const hmn=m=>{const h=Math.floor(m/60),r=m%60;return (h?bn(h)+' ঘণ্টা ':'')+(r||!h?bn(r)+' মিনিট':'')};
const tmin=s=>{const[h,m]=(s||'0:0').split(':');return +h*60+ +m};
X6.plan=async function(){
 const{data,error}=await sb.from('daily').select('*').eq('day',pd).order('start_time');if(error)throw error;const a=data||[];
 const today=ymd(new Date()),isToday=pd==today,nowM=new Date().getHours()*60+new Date().getMinutes();
 const dl=new Date(pd+'T00:00').toLocaleDateString(L=='bn'?'bn-BD':'en-GB',{weekday:'long',day:'numeric',month:'long'});
 const sum=k=>a.filter(x=>x.cat==k).reduce((s,x)=>s+mins(x.start_time,x.end_time),0),sumD=k=>a.filter(x=>x.cat==k&&x.done).reduce((s,x)=>s+mins(x.start_time,x.end_time),0);
 const ad=a.filter(x=>x.done).length,pc=a.length?Math.round(ad/a.length*100):0;
 const nav=`<div class="bar" style="margin-bottom:8px"><button class="btn ghost" onclick="pd=shiftD(pd,-1);render()">← আগের দিন</button><b style="text-align:center">${dl}${isToday?' · আজ':''}</b><button class="btn ghost" onclick="pd=shiftD(pd,1);render()">পরের দিন →</button></div>${isToday?'':`<button class="btn ghost" style="margin-bottom:8px" onclick="pd=ymd(new Date());render()">আজকে ফিরুন</button>`}`;
 const form=`<div class="card"><div class="row"><select id="d1">${Object.keys(PC).map(k=>`<option value="${k}">${PC[k][0]} ${PC[k][1]}</option>`).join('')}</select><input id="d2" placeholder="বিস্তারিত (যেমন: তাফসীর পড়া)"></div><div class="row"><label class="meta">শুরু<input id="d3" type="time"></label><label class="meta">শেষ<input id="d4" type="time"></label></div><button class="btn" onclick="addD()">${t('add')}</button> <button class="btn ghost" onclick="copyPrev()">📋 আগের দিনের রুটিন কপি</button></div>`;
 const stat=a.length?`<div class="card"><div class="meta">সম্পন্ন ${bn(ad)}/${bn(a.length)} · ${bn(pc)}%</div><div style="background:var(--bg);border-radius:6px;height:10px;margin:4px 0"><div style="width:${pc}%;background:var(--gold);height:10px;border-radius:6px"></div></div>${sum('study')?`<div>📖 পড়া: ${hmn(sumD('study'))} / ${hmn(sum('study'))}</div>`:''}${sum('sport')?`<div>⚽ খেলাধুলা: ${hmn(sumD('sport'))} / ${hmn(sum('sport'))}</div>`:''}</div>`:'';
 const rows=a.map(x=>{const s=tmin(x.start_time),e=tmin(x.end_time||x.start_time),cur=isToday&&!x.done&&nowM>=s&&nowM<(e>s?e:s+1),c=PC[x.cat]||PC.other;
  return `<div class="card bar" style="${cur?'border-color:var(--gold)':''}"><label style="flex:1;${x.done?'text-decoration:line-through;opacity:.6':''}"><input type="checkbox" style="width:auto" ${x.done?'checked':''} onchange="togD(${x.id},this.checked)"> ${c[0]} <b>${c[1]}</b>${x.title?' · '+esc(x.title):''}<div class="meta">${TF(x.start_time)}${x.end_time?' – '+TF(x.end_time)+' · '+hmn(mins(x.start_time,x.end_time)):''}${cur?' · ⏱ এখন চলছে':''}</div></label><button class="btn ghost" onclick="delD(${x.id})">${t('del')}</button></div>`}).join('');
 return nav+form+stat+(rows||'<p class="meta">এই দিনে কিছু নেই। উপরে থেকে যোগ করুন, বা আগের দিনের রুটিন কপি করুন।</p>')};
async function addD(){const s=$('#d3').value;if(!s)return toast('শুরুর সময় দিন');const{error}=await sb.from('daily').insert({day:pd,cat:$('#d1').value,title:$('#d2').value.trim(),start_time:s,end_time:$('#d4').value||null});if(error)return toast(error.message);render()}
async function togD(id,c){await sb.from('daily').update({done:c}).eq('id',id);render()}
async function delD(id){await sb.from('daily').delete().eq('id',id);render()}
async function copyPrev(){const{data}=await sb.from('daily').select('*').eq('day',shiftD(pd,-1));if(!data||!data.length)return toast('আগের দিনে কিছু নেই');const{error}=await sb.from('daily').insert(data.map(x=>({day:pd,cat:x.cat,title:x.title,start_time:x.start_time,end_time:x.end_time,done:false})));if(error)return toast(error.message);render()}
if(me)render();
