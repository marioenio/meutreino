'use strict';
// Reuse stable exercise/variant IDs. Rotation changes emphasis, not recorded loads.
const Training=(()=>{
 const rotations=[
  [['press','row','shoulder','curl'],['row','press','shoulder','core']],
  [['squat','hinge','legcurl','calf'],['hinge','squat','legcurl','core']],
  [['squat','row','press','core'],['hinge','press','row','calf']],
  [['row','press','shoulder','core'],['press','row','shoulder','curl']],
  [['hinge','squat','legcurl','core'],['squat','legcurl','hinge','calf']]
 ];
 const goalName=goal=>goal==='strength'?'Fortalecimento do corpo todo':'Emagrecimento + fortalecimento';
 function build(base,day,profile,sessions){
  const done=sessions.filter(s=>s.profileId===profile?.id&&s.day===day).length;
  const rotation=done%2;
  return {...base,title:base.title.replace(/ [AB]$/,''),items:[...rotations[day][rotation]],rotation,sequence:done+1,goal:profile?.goal||'weightloss',cardio:base.circuit?0:profile?.goal==='strength'?10:15,workSets:3,planVersion:2};
 }
 function warmup(day){return [
  {title:'Caminhada ou bicicleta leve',seconds:180,text:'3 minutos em ritmo confortável, sem ficar ofegante. Prolongue se ainda não se sentir preparado.'},
  {title:'Prepare o movimento',seconds:0,text:'Faça 1 série leve de 8–10 repetições antes do primeiro exercício de superiores e do primeiro de inferiores. Use resistência mínima, confira os ajustes e descanse antes das séries de trabalho. Faça mais preparação se precisar.'}
 ];}
 function setCount(plan){return plan.workSets||3;}
 return{build,warmup,setCount,goalName};
})();
if(typeof module!=='undefined')module.exports=Training;
