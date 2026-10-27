const assert=require('node:assert/strict');
let mem=new Map();global.localStorage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)};
const S=require('./storage.js');let s=S.fresh();assert.equal(s.sessions.length,0);
s.profiles=[{id:'p',name:'Teste',age:38}];s.activeProfile='p';
s.sessions=[{id:'s',profileId:'p',day:0,title:'Superiores',cardio:15,startedAt:'2026-10-27T10:00:00Z',finishedAt:'2026-10-27T11:00:00Z',sets:[{exerciseId:'press',variantId:'machine',index:0,kg:20,reps:12,rir:2}]}];
S.save(s);assert.deepEqual(S.load(),s);
let old={...s,schemaVersion:1};delete old.drafts;localStorage.setItem(S.KEY,JSON.stringify(old));assert.deepEqual(S.load().sessions,s.sessions);assert.equal(JSON.parse(localStorage.getItem(S.KEY+'.before-migration')).schemaVersion,1);
S.restore(JSON.stringify(s));assert.deepEqual(JSON.parse(localStorage.getItem(S.KEY+'.before-import')).sessions,s.sessions);
const before=localStorage.getItem(S.KEY);assert.throws(()=>S.restore('{bad'));assert.equal(localStorage.getItem(S.KEY),before);
for(const mutation of [s=>s.schemaVersion=999,s=>s.sessions[0].sets[0].kg=-1,s=>s.sessions[0].cardio='<script>',s=>s.profiles[0].age='bad',s=>s.sessions[0].profileId='unknown']){let bad=structuredClone(s);mutation(bad);assert.throws(()=>S.restore(JSON.stringify(bad)));assert.equal(localStorage.getItem(S.KEY),before)}
localStorage.setItem=()=>{throw Error('QuotaExceeded')};assert.throws(()=>S.save(s));
console.log('PASS: persistence, migration, recovery copies, backup restore, validation and write failure');
