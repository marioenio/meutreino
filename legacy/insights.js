
'use strict';
// Original helpers for Meu Treino. No openGym source or restricted media copied.
const Insights=(()=>{
 function weekly(sessions,profileId,now=new Date()){
  const start=new Date(now);start.setHours(0,0,0,0);start.setDate(start.getDate()-((start.getDay()+6)%7));
  const end=new Date(start);end.setDate(end.getDate()+7);
  const week=sessions.filter(s=>s.profileId===profileId&&new Date(s.finishedAt)>=start&&new Date(s.finishedAt)<end);
  const direct={};let sets=0;
  for(const session of week){if(session.circuit)continue;for(const set of session.sets){sets++;direct[set.exerciseId]=(direct[set.exerciseId]||0)+1;}}
  return {sessions:week.length,sets,direct};
 }
 function completedSlots(plan,sets){return plan.items.reduce((n,id)=>n+Number(['machine','free'].some(v=>new Set(sets.filter(s=>s.exerciseId===id&&s.variantId===v).map(s=>s.index)).size>=3)),0);}
 function search(exercises,query='',equipment='all',muscle='all'){
  const normalize=x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const q=normalize(query);
  return Object.entries(exercises).flatMap(([id,e])=>e.variants.filter(v=>(equipment==='all'||v[0]===equipment)&&(muscle==='all'||e.main.includes(muscle))&&normalize([e.name,e.muscle,e.helpers,...v.slice(1)].join(' ')).includes(q)).map(v=>({id,e,v})));
 }
 return {weekly,completedSlots,search};
})();
if(typeof module!=='undefined')module.exports=Insights;
