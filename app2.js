async function start(){
 const{data:{session}}=await sb.auth.getSession();
 if(!session){$('#login').style.display='flex';if(/error/.test(location.hash+location.search))$('#err').textContent=t('denied');chrome();return}
 const{data:p}=await sb.from('profiles').select('*').eq('id',session.user.id).single();
 if(!p){await sb.auth.signOut();location.reload();return}
 if(p.status!='approved'){me=p;return gate()}
 me=p;
 sb.channel('rt').on('postgres_changes',{event:'INSERT',schema:'public',table:'messages'},x=>{if(tab=='chat')addMsg(x.new)})
  .on('postgres_changes',{event:'INSERT',schema:'public',table:'notifications'},x=>{toast('🔔 '+x.new.text);if(['notice','routine','files','notif'].includes(tab))render();bell()})
  .on('postgres_changes',{event:'DELETE',schema:'public',table:'messages'},x=>{const e=$('#m'+x.old.id);e&&e.remove()}).subscribe();
 render();
}
function gate(){const s=me.status,l=$('#login');l.style.display='flex';
 l.innerHTML=`<h2>${t('title')}</h2><p class="sub">${esc(me.email)}</p>`+(s=='new'?`<p>${t('codeAsk')}</p><input id="gn" placeholder="${t('gname')}" style="max-width:280px"><input id="gr" placeholder="${t('groll')}" style="max-width:280px"><input id="bc" style="max-width:280px;text-align:center"><button class="btn" onclick="claim()">${t('submit')}</button>`:`<p>${t(s=='rejected'?'rejected':'waiting')}</p><button class="btn" onclick="location.reload()">${t('again')}</button>`)+`<p id="err"></p><button class="btn ghost" onclick="sb.auth.signOut().then(()=>location.reload())">${t('out')}</button>`}
async function claim(){const{data}=await sb.rpc('claim_code',{c:$('#bc').value.trim(),n:$('#gn').value.trim(),r:$('#gr').value.trim()});if(data){me.status='pending';gate()}else $('#err').textContent=t('wrong')}
async function setS(id,s){await sb.rpc('set_status',{uid:id,s});render()}
async function setR(id,r){await sb.rpc('set_role',{uid:id,r});render()}
async function saveCode(){const{error}=await sb.from('settings').update({value:$('#bcode').value.trim()}).eq('key','batch_code');toast(error?error.message:t('saved'))}
async function bell(){const{count}=await sb.from('notifications').select('*',{count:'exact',head:true}).gt('created_at',localStorage.seen||'1970-01-01');$('#bell').textContent='🔔'+(count&&tab!='notif'?' '+count:'')}
function chrome(){document.documentElement.lang=L;$('#lang').textContent=L=='bn'?'EN':'বাংলা';document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t(e.dataset.t));
 if(me){$('#role').textContent=isA()?t('admin'):t('member');$('#nav').innerHTML=['notice','routine','files','chat','members'].map(k=>`<button class="${tab==k?'on':''}" onclick="go('${k}')">${t(k)}</button>`).join('')}}
async function add(tbl,row,txt){const{error}=await sb.from(tbl).insert(row);if(error)return toast(error.message);await sb.from('notifications').insert({kind:tbl,text:txt});render()}
async function del(tbl,id,path){if(!confirm('?'))return;if(path)await sb.storage.from('files').remove([path]);await sb.from(tbl).delete().eq('id',id);render()}
const dB=(tbl,id,p)=>isA()?`<button class="btn ghost" onclick="del('${tbl}',${id},${p?`'${p}'`:'null'})">${t('del')}</button>`:'';
const av=m=>m.photo?`<img class="av" src="${m.photo}" alt="">`:`<div class="av">${esc((m.name||'?')[0])}</div>`;
