'use strict';
const Store=(()=>{
 const KEY='meutreino.data', VERSION=3;
 const fresh=()=>({schemaVersion:VERSION,profiles:[],activeProfile:null,sessions:[],drafts:[]});
 function valid(s){
  if(!s||s.schemaVersion!==VERSION||!Array.isArray(s.profiles)||!Array.isArray(s.sessions)||!Array.isArray(s.drafts))throw Error('Formato de backup inválido.');
  const ids=new Set();
  for(const p of s.profiles){if(typeof p.id!=='string'||typeof p.name!=='string'||ids.has(p.id))throw Error('Perfil inválido.');for(const k of ['age','weight','height'])if(p[k]!=null&&(!Number.isFinite(p[k])||p[k]<0||p[k]>1000))throw Error('Medida inválida.');if(!['weightloss','strength'].includes(p.goal))throw Error('Objetivo inválido.');ids.add(p.id)}
  if(s.activeProfile!==null&&!ids.has(s.activeProfile))throw Error('Perfil ativo inválido.');
  const seen=new Set();
  for(const x of [...s.sessions,...s.drafts]){
   if(!x||typeof x.id!=='string'||seen.has(x.id)||!ids.has(x.profileId)||!Array.isArray(x.sets)||!Number.isInteger(x.day)||x.day<0||x.day>4||!Number.isFinite(Date.parse(x.startedAt)))throw Error('Treino inválido.');if(typeof x.title!=='string'||!Number.isFinite(x.cardio)||x.cardio<0||x.cardio>300)throw Error('Resumo de treino inválido.');seen.add(x.id);
   if(x.plan){if(!Array.isArray(x.plan.items)||!x.plan.items.every(id=>['press','row','shoulder','curl','squat','hinge','legcurl','calf','core'].includes(id))||typeof x.plan.title!=='string'||typeof x.plan.desc!=='string'||!Number.isFinite(x.plan.cardio)||x.plan.cardio<0||x.plan.cardio>300||![0,1].includes(x.plan.rotation)||!Number.isInteger(x.plan.sequence)||x.plan.sequence<1)throw Error('Plano de sessão inválido.');}
   if(x.finishedAt&&!Number.isFinite(Date.parse(x.finishedAt)))throw Error('Data inválida.');
   for(const r of x.sets){if(!r||typeof r.exerciseId!=='string'||typeof r.variantId!=='string'||!Number.isInteger(r.index)||r.index<0||r.index>9||!Number.isFinite(r.kg)||r.kg<0||r.kg>1000||!Number.isInteger(r.reps)||r.reps<1||r.reps>200||!Number.isInteger(r.rir)||r.rir<0||r.rir>10)throw Error('Série inválida.');}
  }
  return s;
 }
 function migrate(s){if(s.schemaVersion>VERSION)throw Error('Backup de uma versão mais recente. Atualize o app.');if(s.schemaVersion===1){s={...s,schemaVersion:2,drafts:s.drafts||[]}}if(s.schemaVersion===2){s={...s,schemaVersion:3,profiles:s.profiles.map(p=>({...p,goal:p.goal||'weightloss'}))}}return valid(s)}
 function load(){const raw=localStorage.getItem(KEY);if(!raw)return fresh();const data=migrate(JSON.parse(raw));if(JSON.parse(raw).schemaVersion!==VERSION){localStorage.setItem(KEY+'.before-migration',raw);localStorage.setItem(KEY,JSON.stringify(data))}return data}
 function save(data){valid(data);localStorage.setItem(KEY,JSON.stringify(data))}
 function restore(raw){const data=migrate(JSON.parse(raw));const old=localStorage.getItem(KEY);if(old)localStorage.setItem(KEY+'.before-import',old);save(data);return data}
 return{KEY,VERSION,fresh,valid,migrate,load,save,restore};
})();
if(typeof module!=='undefined')module.exports=Store;
