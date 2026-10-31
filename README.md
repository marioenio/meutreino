# Meu Treino — fork pessoal de openGym

Base: [openGym 1.4.3](https://github.com/DuarteSantos8/openGym/tree/b6cfe2bbd3f099523ffbf2677438864e9a09a06f). Versão adaptada: 2.0.1.

Português do Brasil como padrão e inglês opcional. Dados somente no navegador, sem histórico fictício, conta ou servidor. Biblioteca e recursos originais de treinos, animações, mapas e evolução. Não é um serviço comercial.

## Dados anteriores

A primeira abertura oferece importar um perfil do Meu Treino. O armazenamento original `meutreino.data` e todos os perfis são mantidos; uma cópia adicional é criada antes da conversão. Exercícios importados mantêm nomes, variantes, cargas e repetições originais, separados dos exercícios do catálogo novo. Cardio anterior consta nas notas. Treinos em andamento continuam em [legacy/](legacy/), que também permite exportar o backup completo. A importação não sobrescreve um perfil novo que já tem registros. Cada aparelho mantém seus próprios dados.

## Código e reprodução

`source/` contém o código web correspondente, incluindo as adaptações. `opengym/prepare.py` aplica as alterações reproduzíveis à origem fixada; `opengym/build-package.py` prepara os arquivos. O fluxo em `.github/workflows/opengym-build.yml` cria uma branch de compilação. A publicação usa o resultado já testado na branch main.

Para reconstruir, copie `exercise-media/` para `source/catalogue/media/`, entre em `source/frontend/`, execute `npm ci` e `VITE_DEMO=1 npm run build`, depois `node ../scripts/catalogue/stage-media.mjs dist`. Node 24 foi usado.

## Licenças

Código sob AGPL-3.0-or-later; consulte LICENSE. Código original © Duarte Santos, adaptações neste repositório. Imagens/animações © Aliaksandr Makatserchyk / Gym visual, licença separada. Este fork pessoal não comercial mantém as mídias de 180 px intactas com os avisos de NOTICE.md e exercise-media/NOTICE.md. Não extrair as mídias para outro app nem reutilizar comercialmente sem a licença apropriada.
