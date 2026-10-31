from pathlib import Path
import shutil,sys,json
repo=Path(__file__).resolve().parent.parent
src=Path(sys.argv[1]).resolve();out=Path(sys.argv[2]).resolve()
if out.exists():shutil.rmtree(out)
shutil.copytree(src/'frontend/dist',out)
# The previous application remains usable against its original localStorage key.
legacy=out/'legacy'
if (repo/'legacy/index.html').exists():
 shutil.copytree(repo/'legacy',legacy)
else:
 legacy.mkdir()
 for f in repo.iterdir():
  if f.is_file() and f.suffix in {'.js','.css','.html','.png','.svg','.webmanifest'}:shutil.copy2(f,legacy/f.name)
 if (repo/'media').is_dir():shutil.copytree(repo/'media',legacy/'media')
 oldapp=legacy/'app.js'
 if oldapp.exists():
  s=oldapp.read_text();s='\n'.join(line for line in s.splitlines() if not line.startswith("if('serviceWorker'in navigator)"));oldapp.write_text(s+'\n')
# Full corresponding web source is included (media is the unmodified package above).
shutil.copytree(src,out/'source',ignore=shutil.ignore_patterns('.git','node_modules','dist','android','ios','media','.DS_Store'))
for name in ['LICENSE','NOTICE.md']:shutil.copy2(src/name,out/name)
shutil.copytree(repo/'opengym',out/'opengym',ignore=shutil.ignore_patterns('__pycache__'))
shutil.copytree(repo/'.github',out/'.github')
(out/'.nojekyll').write_text('')
(out/'version.json').write_text(json.dumps({'version':'2.0.1','upstream':'b6cfe2bbd3f099523ffbf2677438864e9a09a06f','languages':['pt-BR','en'],'data':'browser-local','demoSeed':False},indent=2)+'\n')
(out/'README.md').write_text('''# Meu Treino — fork pessoal de openGym\n\nBase: [openGym 1.4.3](https://github.com/DuarteSantos8/openGym/tree/b6cfe2bbd3f099523ffbf2677438864e9a09a06f). Versão adaptada: 2.0.1.\n\nPortuguês do Brasil como padrão e inglês opcional. Dados somente no navegador, sem histórico fictício, conta ou servidor. Biblioteca e recursos originais de treinos, animações, mapas e evolução. Não é um serviço comercial.\n\n## Dados anteriores\n\nA primeira abertura oferece importar um perfil do Meu Treino. O armazenamento original `meutreino.data` e todos os perfis são mantidos; uma cópia adicional é criada antes da conversão. Exercícios importados mantêm nomes, variantes, cargas e repetições originais, separados dos exercícios do catálogo novo. Cardio anterior consta nas notas. Treinos em andamento continuam em [legacy/](legacy/), que também permite exportar o backup completo. A importação não sobrescreve um perfil novo que já tem registros. Cada aparelho mantém seus próprios dados.\n\n## Código e reprodução\n\n`source/` contém o código web correspondente, incluindo as adaptações. `opengym/prepare.py` aplica as alterações reproduzíveis à origem fixada; `opengym/build-package.py` prepara os arquivos. O fluxo em `.github/workflows/opengym-build.yml` cria uma branch de compilação. A publicação usa o resultado já testado na branch main.\n\nPara reconstruir, copie `exercise-media/` para `source/catalogue/media/`, entre em `source/frontend/`, execute `npm ci` e `VITE_DEMO=1 npm run build`, depois `node ../scripts/catalogue/stage-media.mjs dist`. Node 24 foi usado.\n\n## Licenças\n\nCódigo sob AGPL-3.0-or-later; consulte LICENSE. Código original © Duarte Santos, adaptações neste repositório. Imagens/animações © Aliaksandr Makatserchyk / Gym visual, licença separada. Este fork pessoal não comercial mantém as mídias de 180 px intactas com os avisos de NOTICE.md e exercise-media/NOTICE.md. Não extrair as mídias para outro app nem reutilizar comercialmente sem a licença apropriada.\n''')
print('Package:',out,'files:',sum(1 for f in out.rglob('*') if f.is_file()))
