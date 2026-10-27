'use strict';
// Reuse stable exercise/variant IDs. Rotation changes emphasis, not recorded loads.
const Training=(()=>{
 const rotations=[
  [['press','row','shoulder','curl'],['row','press','curl','core']],
  [['squat','hinge','legcurl','calf'],['hinge','squat','calf','core']],
  [['squat','row','press','core'],['hinge','press','row','calf']],
  [['row','press','shoulder','core'],['press','row','shoulder','curl']],
  [['hinge','squat','legcurl','core'],['squat','legcurl','hinge','calf']]
 ];
 const goalName=goal=>goal==='strength'?'Fortalecimento do corpo todo':'Emagrecimento + fortalecimento';
 function build(base,day,profile,sessions){
  const done=sessions.filter(s=>s.profileId===profile?.id&&s.day===day).length;
  const rotation=done%2;
  return {...base,title:base.title.replace(/ [AB]$/,''),items:[...rotations[day][rotation]],rotation,sequence:done+1,goal:profile?.goal||'weightloss',cardio:base.circuit?0:profile?.goal==='strength'?10:15,planVersion:1};
 }
 function warmup(day){const upper=day===0||day===3;return [
  {title:'Ative o corpo',seconds:180,text:'Caminhe na esteira ou pedale bem leve por 3 minutos. Comece devagar, sem ficar ofegante.'},
  {title:upper?'Prepare ombros e braços':'Prepare quadris, joelhos e tornozelos',seconds:120,text:upper?'Por 2 minutos, alterne círculos pequenos e confortáveis com os ombros, dobrar e estender cotovelos e elevar os braços sem peso. Sem forçar a amplitude.':'Por 2 minutos, alterne marcha leve no lugar, elevações de calcanhares com apoio e movimentos suaves de sentar e levantar de um banco firme, sem carga.'},
  {title:'Ensaie o primeiro movimento',seconds:60,text:'Durante aproximadamente 1 minuto, pratique lentamente o primeiro exercício sem peso ou com resistência mínima. Peça ajuda para ajustar a máquina. Antes da primeira série de trabalho, faça mais 1 série leve de 8–10 repetições e descanse. Repita a preparação quando mudar para outro movimento exigente.'}
 ];}
 return{build,warmup,goalName};
})();
if(typeof module!=='undefined')module.exports=Training;
