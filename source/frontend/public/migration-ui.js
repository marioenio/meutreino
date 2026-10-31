/* Migration opt-in: only local browser data; no network writes. */
document.addEventListener('DOMContentLoaded',async()=>{
 const raw=localStorage.getItem('meutreino.data');
 if(!raw||localStorage.getItem('meutreino.opengym-migration'))return;
 let old;try{old=JSON.parse(raw)}catch{return}if(!old.profiles?.length)return;
 const overlay=document.createElement('section');overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Seu histórico do Meu Treino');
 overlay.style.cssText='position:fixed;inset:0;z-index:99999;background:#0c0e12;overflow:auto;padding:30px 22px;color:#eee;font:16px/1.5 system-ui';
 const box=document.createElement('div');box.style.cssText='max-width:560px;margin:auto';overlay.append(box);
 const add=(tag,text)=>{const e=document.createElement(tag);e.textContent=text;box.append(e);return e};
 add('h1','Seu histórico continua aqui.');add('p','Você está entrando na nova versão com base no openGym. Escolha o perfil antigo que deseja importar. Os dados originais de todos os perfis continuam preservados.');
 add('p','Máquinas e pesos livres mantêm históricos separados. Os registros antigos aparecem como exercícios importados; você poderá escolher os novos exercícios animados na biblioteca. Cardio antigo fica registrado nas notas.');
 const select=add('select','');select.style.cssText='width:100%;padding:12px;font:inherit;margin:12px 0';old.profiles.forEach(p=>{const option=document.createElement('option');option.value=p.id;option.textContent=p.name;option.selected=p.id===old.activeProfile;select.append(option)});
 const status=add('p','');status.setAttribute('role','status');
 const button=(text,fn)=>{const b=add('button',text);b.style.cssText='display:block;width:100%;padding:14px;margin:12px 0;border:0;border-radius:10px;background:#a3e635;color:#10200c;font:inherit;font-weight:600';b.onclick=fn;return b};
 button('Importar perfil selecionado',async()=>{try{const res=await fetch('./migration-meta.json');if(!res.ok)throw Error('Sem conexão para preparar a importação.');const meta=await res.json();window.MeuTreinoMigration.install(localStorage,raw,select.value,meta);location.reload()}catch(e){status.textContent=e.message+' Nada foi apagado.'}});
 button('Baixar backup completo do app antigo',()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([raw],{type:'application/json'}));a.download='meutreino-antes-opengym.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)});
 button('Começar novo, mantendo o histórico antigo',()=>{localStorage.setItem('meutreino.opengym-migration','skipped');overlay.remove()});
 const link=add('a','Abrir a versão anterior / concluir um treino em andamento');link.href='./legacy/';link.style.color='#a3e635';
 add('p','Treinos em andamento ficam na versão anterior. Nenhuma carga é sugerida a partir dos dados fictícios de demonstração.');
 document.body.append(overlay);
});
