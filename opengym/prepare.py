"""Reproducible adaptation of the pinned openGym source; original licence retained."""
from pathlib import Path
import re,json,shutil,sys
root=Path(sys.argv[1]).resolve();cfg=Path(__file__).resolve().parent

def edit(rel,old,new,count=1):
 p=root/rel;s=p.read_text()
 if old not in s:raise SystemExit('Expected upstream code missing: '+rel+' / '+old[:70])
 p.write_text(s.replace(old,new,count))

# Only two language choices, and only their dictionaries/instructions in the web bundle.
p=root/'frontend/src/lib/i18n-core.js';s=p.read_text();s=re.sub(r'export const LANGS = \{.*?\n\}',"export const LANGS = { 'pt-BR': 'Português (Brasil)', en: 'English' }",s,count=1,flags=re.S);p.write_text(s)
for group in ['locales','instr','exercise-names','exercise-desc']:
 edit('frontend/src/lib/i18n.js',f"import.meta.glob('../{group}/*.js')",f"import.meta.glob(['../{group}/en.js', '../{group}/pt-BR.js'])")
edit('frontend/src/store/useStore.js',"keepAwake: true, lang: 'en',","keepAwake: true, lang: 'pt-BR',")
p=root/'frontend/src/store/useStore.js';s=p.read_text();a=s.index('const detectedLang = () => {');b=s.index('\n}',a)+2;s=s[:a]+"const detectedLang = () => 'pt-BR'"+s[b:];s=s.replace('s.langAuto = true','s.langAuto = false',1)
a=s.index('      // Demo build (GitHub Pages):');b=s.index('      // Opened from a device-link QR code',a)
s=s[:a]+'''      // This fork is a real browser-local app, not seeded demo data.
      if (DEMO) {
        get().setGuest(true)
        finishBoot()
        return
      }
'''+s[b:]
# Never recreate fake weights, even if an old link reaches resetDemo.
a=s.index('    async resetDemo() {');b=s.index('\n    // Boot:',a)
s=s[:a]+'''    async resetDemo() { return false },
'''+s[b:];p.write_text(s)
edit('frontend/src/lib/demo.js',"export const REPO = 'https://gitlab.com/DuarteSantos8/opengym'","export const REPO = 'https://github.com/marioenio/meutreino'")
# Remove demo reset/self-host UI; keep the original account layout and native app untouched.
p=root/'frontend/src/views/Settings.jsx';s=p.read_text();a=s.index('        </> : DEMO ? <>');b=s.index('        </> : user ? <>',a)
s=s[:a]+'''        </> : DEMO ? <>
          <Row icon="lock" iconTint="var(--acc)" title={t('Browser-local data')} subtitle={t('No account, no cloud. Back it up anytime in Data & backup.')} />
          <Row icon="folder" title={t('Previous Meu Treino version')} accessory="chevron" onClick={() => { window.location.href = './legacy/' }} />
          <Row icon="info" title="openGym" subtitle={t('Source code and licences')} accessory="chevron" onClick={() => window.open(REPO, '_blank', 'noopener')} />
'''+s[b:]
s=s.replace("DEMO ? t('Demo')", "DEMO ? t('Local data')")
s=s.replace("const acct = DEMO ? { title: t('Demo'), sub: t('Example data, only in this browser.') }", "const acct = DEMO ? { title: t('Local data'), sub: t('Your data stays in this browser.') }")
p.write_text(s)
# Portuguese wording for the small number of fork-specific labels.
p=root/'frontend/src/locales/pt-BR.js';s=p.read_text();s=s.replace('export const PT_BR_OVERRIDES = {', '''export const PT_BR_OVERRIDES = {
  'Browser-local data': 'Dados locais do navegador',
  'Previous Meu Treino version': 'Versão anterior do Meu Treino',
  'Source code and licences': 'Código-fonte e licenças',
  'Local data': 'Dados locais',
  'Your data stays in this browser.': 'Seus dados ficam neste navegador.',
''',1);p.write_text(s)
# Starter routines are actual user data, so give new routine names the chosen UI language.
p=root/'frontend/src/lib/starter.js';s=p.read_text();s="import { getLang } from './i18n-core.js'\n"+s
s=s.replace('id: uid(), name, emoji, ex:',"id: uid(), name: getLang()==='pt-BR' ? ({'Push Day':'Empurrar','Pull Day':'Puxar','Leg Day':'Pernas','Upper A':'Superiores A','Upper B':'Superiores B','Lower A':'Inferiores A','Lower B':'Inferiores B','Full Body A':'Corpo inteiro A','Full Body B':'Corpo inteiro B','Full Body C':'Corpo inteiro C'})[name]||name : name, emoji, ex:",1);p.write_text(s)
# Version identity; openGym attribution remains in the interface and NOTICE.
p=root/'frontend/package.json';pkg=json.loads(p.read_text());pkg['version']='2.0.0';p.write_text(json.dumps(pkg,indent=2)+'\n')
p=root/'frontend/package-lock.json';lock=json.loads(p.read_text());lock['version']='2.0.0';lock.get('packages',{}).get('',{})['version']='2.0.0';p.write_text(json.dumps(lock,indent=2)+'\n')
p=root/'frontend/index.html';s=p.read_text().replace('<html lang="en">','<html lang="pt-BR">').replace('<title>openGym</title>','<title>Meu Treino · openGym</title>');s=s.replace('<meta charset="UTF-8">','<meta charset="UTF-8">\n<script src="./legacy-migration.js"></script>\n<script src="./migration-ui.js"></script>');p.write_text(s)
for filename in ['legacy-migration.js','migration-ui.js','migration-meta.json']:
 shutil.copy2(cfg/filename,root/'frontend/public'/filename)
(root/'frontend/public/.nojekyll').write_text('')
print('Prepared openGym 2.0.0 fork: pt-BR/en only, local data, no demo seed, optional legacy import')
edit('frontend/public/sw.js',"k => k !== CACHE && k !== MEDIA && k !== DEVICE_CACHE", "k => (k.startsWith('opengym-rt-') || k.startsWith('meutreino-shell-')) && k !== CACHE && k !== MEDIA && k !== DEVICE_CACHE")
