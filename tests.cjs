const assert=require('node:assert/strict');
let mem=new Map();global.localStorage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)};
const S=require('./storage.js');let s=S.fresh();assert.equal(s.sessions.length,0);
s.profiles=[{id:'p',name:'Teste',age:38,goal:'weightloss'}];s.activeProfile='p';
s.sessions=[{id:'s',profileId:'p',day:0,title:'Superiores',cardio:15,startedAt:'2026-10-27T10:00:00Z',finishedAt:'2026-10-27T11:00:00Z',sets:[{exerciseId:'press',variantId:'machine',index:0,kg:20,reps:12,rir:2}]}];
S.save(s);assert.deepEqual(S.load(),s);
let old={...s,schemaVersion:1};delete old.drafts;localStorage.setItem(S.KEY,JSON.stringify(old));assert.deepEqual(S.load().sessions,s.sessions);assert.equal(JSON.parse(localStorage.getItem(S.KEY+'.before-migration')).schemaVersion,1);
S.restore(JSON.stringify(s));assert.deepEqual(JSON.parse(localStorage.getItem(S.KEY+'.before-import')).sessions,s.sessions);
const before=localStorage.getItem(S.KEY);assert.throws(()=>S.restore('{bad'));assert.equal(localStorage.getItem(S.KEY),before);
for(const mutation of [s=>s.schemaVersion=999,s=>s.sessions[0].sets[0].kg=-1,s=>s.sessions[0].cardio='<script>',s=>s.profiles[0].age='bad',s=>s.sessions[0].profileId='unknown']){let bad=structuredClone(s);mutation(bad);assert.throws(()=>S.restore(JSON.stringify(bad)));assert.equal(localStorage.getItem(S.KEY),before)}
localStorage.setItem=()=>{throw Error('QuotaExceeded')};assert.throws(()=>S.save(s));

let v2=structuredClone(s);v2.schemaVersion=2;delete v2.profiles[0].goal;
v2.drafts=[{...structuredClone(v2.sessions[0]),id:'draft',finishedAt:undefined}];
const upgraded=S.migrate(v2);assert.equal(upgraded.schemaVersion,3);assert.equal(upgraded.profiles[0].goal,'weightloss');assert.deepEqual(upgraded.sessions,v2.sessions);assert.deepEqual(upgraded.drafts,v2.drafts);
const Training=require('./plans.js');const base={title:'Teste',items:['press'],cardio:15};
const a=Training.build(base,0,{id:'p',goal:'weightloss'},[]);const b=Training.build(base,0,{id:'p',goal:'weightloss'},s.sessions);assert.equal(a.rotation,0);assert.equal(b.rotation,1);assert.notDeepEqual(a.items,b.items);
assert.deepEqual(Training.build(base,0,{id:'other',goal:'weightloss'},s.sessions).items,a.items);
assert.equal(Training.build(base,0,{id:'p',goal:'strength'},[]).cardio,10);
assert.equal(Training.warmup(0).reduce((n,x)=>n+x.seconds,0),360);
assert.notDeepEqual(Training.warmup(0),Training.warmup(1));
let frozen=structuredClone(a);Training.build(base,0,{id:'p',goal:'strength'},s.sessions);assert.deepEqual(frozen,a);
console.log('PASS: v1/v2 migration, drafts/history preserved, independent A/B rotations, goal presets, 6-minute warmups, backups and write failure');
