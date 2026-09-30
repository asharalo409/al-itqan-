const fT=d=>{const x=new Date(d),n=new Date(),b=L=='bn',tt=x.toLocaleTimeString(b?'bn-BD':'en-US',{hour:'numeric',minute:'2-digit'});return x.toDateString()==n.toDateString()?tt:x.toLocaleDateString(b?'bn-BD':'en-GB',{day:'numeric',month:'short',year:'numeric'})+', '+tt};
const isImg=f=>/\.(jpe?g|png|gif|webp|bmp)$/i.test(f.path||'');
const isPdf=f=>/\.pdf$/i.test(f.path||'');
const dlUrl=f=>f.path?f.url+'?download='+encodeURIComponent(f.name+'.'+f.path.split('.').pop()):null;
X6.files=async function(){const{data}=await sb.from('files').select('*').order('created_at',{ascending:false});
 const form=isA()?`<div class="card"><input id="f1" placeholder="${t('fname')}"><input id="ff" type="file" accept=".pdf,image/*"><button class="btn" onclick="up()">${t('add')}</button></div>`+lkForm():'';
 return form+(data||[]).map(f=>`<div class="card"><div class="bar"><div style="flex:1;min-width:0"><b>${isPdf(f)?'📕':isImg(f)?'🖼':'🔗'} ${esc(f.name)}</b><div class="meta">🕒 ${fT(f.created_at)}</div></div>${dB('files',f.id,f.path)}</div>${isImg(f)?`<a href="${esc(f.url)}" target="_blank" rel="noopener"><img src="${esc(f.url)}" loading="lazy" style="width:100%;max-height:260px;object-fit:cover;border-radius:8px;margin-top:6px" alt=""></a>`:''}<div class="row" style="margin-top:6px"><a class="btn ghost" style="text-decoration:none;text-align:center" href="${esc(f.url)}" target="_blank" rel="noopener">👁 খুলুন</a>${dlUrl(f)?`<a class="btn" style="text-decoration:none;text-align:center" href="${esc(dlUrl(f))}" download>⬇ ডাউনলোড</a>`:''}</div></div>`).join('')};
if(me)render();
