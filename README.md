# Meu Treino

Aplicativo web progressivo (PWA) em português. HTML, CSS e JavaScript sem dependências externas. Hospedagem prevista: https://marioenio.github.io/meutreino/

## Publicar no GitHub Pages

Em **Settings → Pages → Build and deployment**, selecione **Deploy from a branch**, branch **main**, pasta **/(root)** e salve. O conector GitHub não disponibiliza uma operação para habilitar Pages. Após publicar, abra o endereço no Safari e use **Compartilhar → Adicionar à Tela de Início**. Faça o primeiro registro pelo ícone instalado; o Safari e o app instalado podem usar armazenamentos diferentes.

## Funcionalidades

Semana de 5 dias com superiores/inferiores e circuito leve na quarta; duas alternativas por movimento, mapas musculares esquemáticos, instruções, séries/carga/repetições/RIR, descanso, rascunho retomável, cardio, diário e histórico por alternativa, perfis locais, exportação/importação JSON e shell offline.

O plano é uma sugestão de adaptação, não uma prescrição individual nem um plano validado por um profissional. Fontes gerais e explicação dos limites ficam em Semana. Mapas vetoriais são esquemáticos e não substituem uma demonstração de execução. A versão 1.1 inclui 17 pares de fotos de execução e uma foto externa do Glute Drive com link oficial. A foto externa exige conexão; os pares locais entram no cache offline. Não há vídeo incorporado.

## Dados e atualizações

- A chave estável `meutreino.data` em localStorage contém todos os perfis e registros deste app. Nenhum dado pessoal é pré-preenchido ou enviado para o repositório.
- IDs de perfil, exercício e alternativa são permanentes. Sessões guardam o nome do exercício utilizado na época. Nunca migre cargas de uma alternativa para outra.
- `storage.js` valida o formato antes de gravar. Versão do banco independente da versão do app. Migrações mantêm uma cópia em `meutreino.data.before-migration`. Importação validada mantém `meutreino.data.before-import` antes de substituir o estado inteiro, com confirmação.
- Nunca limpe localStorage na inicialização, deploy, ativação do service worker ou mudança de cache. Nunca use `localStorage.clear()`.
- Em futuras mudanças de schema, adicione uma migração sequencial e teste um backup antigo real. Versões futuras desconhecidas são bloqueadas sem apagar dados. Não altere a chave nem o endereço do app.
- Atualize CACHE em `sw.js` a cada release. O shell novo espera todas as janelas antigas fecharem; não use skipWaiting durante um treino.
- Backup manual é essencial: dados do site podem ser removidos pelo usuário ou sistema. Troca de aparelho, domínio, navegador ou instalação requer exportar/importar. Perfis não sincronizam entre celulares. Use uma janela por vez para registrar treinos.

## Verificação

Execute `node tests.cjs` e `node --check app.js`. Testes cobrem migração com histórico, persistência, backup, rejeição de formatos inválidos e falha de armazenamento. A instalação no iPhone e o modo offline precisam de teste no endereço HTTPS após habilitar Pages.

## Fontes gerais

- https://acsm.org/resistance-training-guidelines-update-2026/
- https://www.cdc.gov/physical-activity-basics/guidelines/adults.html

A divisão semanal e escolha de exercícios são adaptações deste projeto. Alimentação e adesão também influenciam a perda de gordura; não há promessa de resultado ou queima localizada.


## Release 1.2.0

Aquecimento guiado de 6 min (3 min cardio leve, 2 min mobilidade confortável, 1 min ensaio) e preparação específica. Check de conclusão salvo no rascunho. Séries de aquecimento ficam fora das séries de trabalho.

Rotação A/B por dia e perfil: avança somente ao concluir aquela sessão, não pelo calendário. Mantém padrões principais e varia ordem/acessórios. Cada rascunho novo guarda um snapshot do plano para não mudar durante a sessão. O ciclo é simples, não uma prescrição adaptativa ou acompanhamento por IA. O usuário controla a carga; a progressão continua baseada nos registros e RIR.

Objetivos locais: emagrecimento com fortalecimento (cardio sugerido 15 min), ou fortalecimento geral (10 min). Ambos trabalham superiores e inferiores, sem prescrição de carga pelo sexo, peso ou altura. Mesma semana padrão de 5 dias; disponibilidade, experiência e limitações de cada pessoa precisam de confirmação e ajuste com profissional. Dados pessoais são preenchidos no aparelho; não são pré-carregados no código público.

Migração de dados v2 para v3 acrescenta o objetivo ao perfil existente, com padrão emagrecimento + fortalecimento; preserva sessões e rascunhos, e salva cópia antes de migrar. Backups antigos continuam aceitos. Os IDs dos exercícios e alternativas permanecem estáveis.

Fonte do aquecimento: https://www.nhs.uk/live-well/exercise/how-to-warm-up-before-exercising/ (adaptação editorial do app, não reprodução integral).

## Release 1.2.1

Três séries de trabalho por exercício, inclusive no circuito (carga leve, RIR ≥4). Aquecimento recolhido: 3 min de caminhada/bicicleta e uma série leve específica; prolongar conforme necessidade. Ombros e flexora permanecem nas duas variações. Nomes em inglês para reconhecer Life Fitness/Hammer Strength, com catálogo e manuais oficiais. Fotos genéricas não são apresentadas como modelos confirmados. Histórico, IDs e banco local mantidos.

## Release 1.3.0 — fluxos inspirados em openGym

Referência: https://github.com/DuarteSantos8/openGym (consultado em 30/10/2026). Implementação própria para manter o app estático e o formato de dados existente; nenhum código, animação licenciada, logotipo ou mídia de openGym foi copiado. Painel compacto, biblioteca das 18 alternativas com busca e filtros, progresso por exercício e distribuição semanal de séries pelo grupo principal. Sem estimativas de fadiga ou recuperação. Consultar `node tests.cjs` e `node ui-tests.cjs`. A revisão visual em aparelho real e a publicação permanecem pendentes.
