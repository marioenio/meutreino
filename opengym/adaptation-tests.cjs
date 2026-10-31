const fs=require('fs'),assert=require('assert/strict'),path=require('path');const root=path.resolve(process.argv[2]||'../opengym-migration');
const core=fs.readFileSync(root+'/frontend/src/lib/i18n-core.js','utf8');const langs=core.match(/export const LANGS = (\{[^\n]+\})/)[1];assert.deepEqual(Object.keys(Function('return ('+langs+')')()),['pt-BR','en']);
const store=fs.readFileSync(root+'/frontend/src/store/useStore.js','utf8');assert.ok(store.includes("const detectedLang = () => 'pt-BR'"));const boot=store.slice(store.indexOf('    async boot()'));assert.ok(!boot.includes('get().resetDemo()'));assert.ok(store.includes('async resetDemo() { return false }'));
const i18n=fs.readFileSync(root+'/frontend/src/lib/i18n.js','utf8');assert.ok(!i18n.includes("glob('../locales/*.js')"));
const settings=fs.readFileSync(root+'/frontend/src/views/Settings.jsx','utf8');assert.ok(!settings.includes("title={t('Reset demo data')}"));assert.ok(settings.includes("window.location.href = './legacy/'"));
console.log('PASS: pt-BR default, en alternate, restricted packs, no demo seed/reset and legacy access');
