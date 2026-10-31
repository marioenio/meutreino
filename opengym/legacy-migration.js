/* Original Meu Treino -> openGym adapter. The original data is never deleted. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.MeuTreinoMigration=api;})(typeof window==='object'?window:this,function(){
 'use strict';
 function convert(raw,profileId,meta){
  const old=typeof raw==='string'?JSON.parse(raw):raw;
  if(!old||![1,2,3].includes(old.schemaVersion)||!Array.isArray(old.profiles)||!Array.isArray(old.sessions))throw Error('Backup antigo inválido.');
  const profile=old.profiles.find(p=>p.id===profileId);if(!profile)throw Error('Perfil não encontrado.');
  const customEx=[],byKey=new Map(),exWeights={};
  const muscles={peito:'chest',costas:'upper back',ombros:'shoulders',biceps:'biceps',triceps:'triceps',quadriceps:'quads',gluteos:'glutes',posteriores:'hamstrings',panturrilhas:'calves',abdomen:'abs'};
  const body={press:'chest',row:'back',shoulder:'shoulders',curl:'upper arms',squat:'upper legs',hinge:'upper legs',legcurl:'upper legs',calf:'lower legs',core:'waist'};
  function exercise(record){
   const key=record.exerciseId+':'+record.variantId;if(byKey.has(key))return byKey.get(key);
   const e=meta.exercises[record.exerciseId],v=e?.variants.find(v=>v[0]===record.variantId),m=meta.demos[key];
   const id='cmt_'+record.exerciseId+'_'+record.variantId;
   const image=m?.local&&!/^https?:/i.test(m.local)?'../../legacy/'+m.local:'../../legacy/icon.svg';
   const prim=(e?.main||[]).map(x=>muscles[x]).filter(Boolean),sm=(e?.aux||[]).map(x=>muscles[x]).filter(Boolean);
   customEx.push({id,n:record.exerciseName||v?.[1]||record.exerciseId,bp:body[record.exerciseId]||'waist',tg:prim[0]||'',sm,primaries:prim,secondaries:sm,muscleGroups:[...prim,...sm],eq:record.variantId==='machine'?'leverage machine':record.kg>0?'dumbbell':'body weight',custom:true,img:image,gif:image,desc:[v?.[2]||'', 'Importado do Meu Treino. Carga e repetições mantidas na unidade originalmente registrada.'].join(' ')});
   byKey.set(key,id);return id;
  }
  const workouts=old.sessions.filter(s=>s.profileId===profileId).map(session=>{
   if(!Number.isFinite(Date.parse(session.startedAt))||!Number.isFinite(Date.parse(session.finishedAt))||!Array.isArray(session.sets))throw Error('Sessão antiga inválida.');
   const groups=new Map();
   for(const r of session.sets){if(!Number.isFinite(r.kg)||r.kg<0||!Number.isInteger(r.reps)||r.reps<1)throw Error('Série antiga inválida.');const id=exercise(r);if(!groups.has(id))groups.set(id,[]);groups.get(id).push(r);}
   const entries=[...groups].map(([id,rows])=>({id,sets:rows.slice().sort((a,b)=>a.index-b.index).map(r=>({w:r.kg,r:r.reps,rir:r.rir,done:true,legacyIndex:r.index})),topW:Math.max(...rows.map(r=>r.kg))}));
   const start=Date.parse(session.startedAt),end=Date.parse(session.finishedAt),d=new Date(start),iso=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
   for(const e of entries)exWeights[e.id]={w:e.topW,d:iso};
   const notes=[session.notes||'',session.feeling?'Sensação: '+session.feeling:'',session.cardio?'Cardio: '+session.cardio+' min':'',session.circuit?'Circuito leve (registro antigo)':''].filter(Boolean).join('\n');
   return {id:'mt_'+session.id,d:iso,start,end,name:session.title||'Treino importado',entries,notes,prs:[],vol:entries.reduce((n,e)=>n+e.sets.reduce((a,s)=>a+s.w*s.r,0),0),legacyCardioMinutes:session.cardio||0};
  });
  return {lang:'pt-BR',langAuto:false,unit:'kg',effort:'rir',theme:'dark',routines:[],week:{},workouts,bodyweight:[],customEx,exWeights,active:null,legacyProfile:{...profile},legacyDrafts:(old.drafts||[]).filter(d=>d.profileId===profileId),legacyImportedAt:new Date().toISOString()};
 }
 function install(storage,raw,profileId,meta){
  const current=storage.getItem('gym_state_v1');if(current){const s=JSON.parse(current);if((s.workouts||[]).length||(s.routines||[]).length||s.active||(s.bodyweight||[]).length||(s.customEx||[]).length)throw Error('Já existem dados no novo app. Exporte-os antes de importar outro perfil.');}
  const next=convert(raw,profileId,meta);
  storage.setItem('meutreino.before-opengym',raw); // write backup first; a quota error aborts here
  if(current)storage.setItem('opengym.before-meutreino-import',current);
  storage.setItem('gym_state_v1',JSON.stringify(next));
  storage.setItem('meutreino.opengym-migration','imported');return next;
 }
 return {convert,install};
});
