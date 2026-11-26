# Studio Dronov

Site público e painel administrativo do Studio Dronov.

## Arquivos
- index.html: portfólio e calendário público de solicitações.
- admin.html: painel administrativo autenticado.
- studio-dronov-perfil.jpg: imagem de identidade visual.
- site.webmanifest e admin.webmanifest: instalação do site e do painel como aplicativos.
- sw.js: cache restrito a recursos estáticos locais.
- pwa.js: registro do service worker e botão de instalação quando o navegador oferece suporte.
- icon.svg: ícone vetorial do aplicativo.

## Publicação
O projeto é estático e pode ser publicado em hospedagem HTTPS, como Netlify ou GitHub Pages. Publique todos os arquivos na mesma pasta. O service worker exige HTTPS (ou localhost). O botão de instalação só aparece em navegadores compatíveis quando os critérios de instalação forem atendidos.

## Supabase
O site usa Supabase JS no navegador e uma chave publishable/anon. Essa chave é pública por definição e não substitui políticas de segurança. Nunca coloque service_role, sb_secret, senha do banco ou tokens privados em HTML, JavaScript público ou repositório.

Antes de colocar em produção, confirme no projeto Supabase:
1. RLS ativado em todas as tabelas expostas pela API.
2. Políticas públicas limitadas à leitura estritamente necessária e à criação validada de solicitações.
3. Operações administrativas protegidas por autenticação e autorização no banco, não apenas por esconder telas.
4. RPCs usadas pelo cliente e pelo painel com validação de entrada, checagem de permissões e search_path seguro.
5. Bucket de referências privado, com regras de acesso e URLs assinadas de curta duração.
6. Backups, retenção e limpeza de imagens órfãs definidos.

**Limite desta revisão:** o repositório não contém migrations, schema SQL, policies, triggers ou definições das funções RPC. Portanto, esses itens precisam ser auditados no projeto Supabase antes de declarar a segurança do sistema aprovada.

## Segurança de credenciais
Se uma senha de banco, chave secreta ou token privado foi compartilhado em conversa, commit, arquivo público ou captura de tela, revogue/rotacione imediatamente no provedor. Não reutilize credenciais expostas. A chave publishable/anon pode aparecer no navegador, mas só é segura com RLS e policies corretas.

## Testes recomendados antes da publicação
- Testar login, logout, sessão expirada e recuperação de acesso.
- Testar criar, editar, cancelar, confirmar e concluir agendamentos.
- Testar remarcações e sobreposição de horários em duas sessões simultâneas.
- Testar envio e remoção de fotos de referência.
- Conferir o caixa após excluir um trabalho concluído.
- Testar filtros, exportação CSV, notificações em tempo real e silêncio do som.
- Testar em Android, iPhone, tablet e desktop.

## Resultado da verificação do Supabase (26/11/2026)
- As 7 tabelas encontradas no schema public estão com RLS ativado.
- As permissões anon de leitura direta estão limitadas às tabelas availability, portfolio e studio_settings; bookings, financial_transactions, studio_notifications e portfolio_metrics não têm concessão de leitura direta para anon.
- A função is_studio_admin() consulta app_metadata.studio_role, e não user_metadata, o que evita usar metadados editáveis pelo próprio usuário para autorização.
- O bucket booking-references está privado e limitado a 5 MB; o bucket portfolio é público e limitado a 8 MB.
- As funções públicas create_public_booking, public_busy_slots, public_featured_tattoos e record_portfolio_open usam SECURITY DEFINER com search_path fixado. O advisor as sinaliza porque são executáveis por anon; são endpoints públicos intencionais e precisam continuar com validação estrita e retorno sem dados pessoais.
- O advisor também informa que a proteção contra senhas vazadas está desativada. Ative essa opção em Authentication > Settings > Password Security no painel do Supabase.
- As migrations existem no histórico do projeto Supabase, mas seus arquivos SQL não estão versionados neste repositório. Exporte e mantenha as migrations no Git antes de futuras alterações de banco.

A verificação de segurança é uma fotografia do estado atual, não substitui testes de autorização com contas reais nem revisão contínua das RPCs.
