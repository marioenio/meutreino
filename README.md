# Meu Treino

Aplicativo web progressivo (PWA) em português. HTML, CSS e JavaScript sem dependências externas. Hospedagem prevista: https://marioenio.github.io/meutreino/

## Publicar no GitHub Pages

Em **Settings → Pages → Build and deployment**, selecione **Deploy from a branch**, branch **main**, pasta **/(root)** e salve. O conector GitHub não disponibiliza uma operação para habilitar Pages. Após publicar, abra o endereço no Safari e use **Compartilhar → Adicionar à Tela de Início**. Faça o primeiro registro pelo ícone instalado; o Safari e o app instalado podem usar armazenamentos diferentes.

## Funcionalidades

Semana de 5 dias com superiores/inferiores e circuito leve na quarta; duas alternativas por movimento, mapas musculares esquemáticos, instruções, séries/carga/repetições/RIR, descanso, rascunho retomável, cardio, diário e histórico por alternativa, perfis locais, exportação/importação JSON e shell offline.

O plano é uma sugestão de adaptação, não uma prescrição individual nem um plano validado por um profissional. Fontes gerais e explicação dos limites ficam em Semana. Mapas vetoriais são esquemáticos e não substituem uma demonstração de execução. Não há fotos nem vídeos de execução nesta versão.

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
