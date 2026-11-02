# Revisão visual — Madu Films

> Registro histórico da revisão inicial realizada durante o desenvolvimento. As capturas e os anexos citados abaixo eram evidências locais e não estão incluídos nesta versão do repositório. Este registro não comprova um deploy público; consulte o README para os comandos atuais e confira o endereço da Vercel após a publicação.

final result: passed

## Fontes e escopo

Quatro mockups fornecidos pelo usuário:

- Início: `C:/Users/viana/AppData/Local/Temp/codex-clipboard-000a28f7-1307-40ec-992c-7752e84b428b.png` (1312 × 1199).
- Portfólio: `C:/Users/viana/AppData/Local/Temp/codex-clipboard-76e91716-7cc9-4368-a903-d2bc30db0b37.png` (1536 × 1024).
- Pacotes: `C:/Users/viana/AppData/Local/Temp/codex-clipboard-77489560-32dc-4eb4-b330-a19853b7ee50.png` (1536 × 1024).
- Orçamento: `C:/Users/viana/AppData/Local/Temp/codex-clipboard-431986a4-011d-45a4-a78f-d0d1ce051622.png` (1536 × 1024).

As fontes são pranchas com desktop e celular, título e molduras. A comparação considera os conteúdos internos, excluindo molduras e títulos das pranchas. A escala foi avaliada proporcionalmente à largura de cada tela; não se trata de igualdade pixel a pixel. Há diferenças deliberadas: logo e fotos posteriores fornecidas pelo usuário, retrato real do PDF, títulos e projetos de exemplo identificados, quatro categorias de pacotes, ausência de selo de popularidade, ideia opcional e opções de data/local indefinidos. Os requisitos textuais do usuário prevalecem sobre os detalhes fictícios dos mockups.

## Capturas da implementação

Navegador Brave, após falha da captura responsiva no navegador interno. Capturas abertas e inspecionadas, e comparadas aos mockups na mesma entrada visual.

- `docs/verification/home-desktop.jpg`: início, viewport CSS 1280 × 900.
- `docs/verification/home-mobile.jpg`: início, viewport CSS 390 × 844.
- `docs/verification/packages-desktop.jpg`: categoria casamento, viewport CSS 1280 × 900.
- `docs/verification/packages-mobile.jpg`: categoria casamento, viewport CSS 390 × 844.
- `docs/verification/portfolio-desktop.jpg`: filtro de casamentos, viewport CSS 1280 × 900.
- `docs/verification/portfolio-tablet.jpg`: todos os projetos, viewport CSS 768 × 1024.
- `docs/verification/quote-desktop.jpg`: pacote selecionado e dados fictícios, viewport CSS 1280 × 900.
- `docs/verification/quote-mobile.jpg`: orçamento personalizado após remoção, viewport CSS 390 × 844, captura completa da página.

Densidade efetiva do Brave aproximadamente 1.0. As capturas recebidas são JPEG e excluem a barra de rolagem. Dimensões efetivas: desktop 1265 × 889, mobile 375 × 811, tablet 753 × 1004. Não foi aplicada transformação aos arquivos; as comparações consideram essa diferença de enquadramento do navegador. A captura completa de orçamento mede 375 × 1505 pixels. Não houve ampliação de baixa resolução para simular fidelidade. A captura inicial do navegador interno foi descartada por densidade e enquadramento inconsistentes.

## Histórico de ajustes

1. [P2] Foto de destaque desktop cortava parte importante do rosto. Corrigido `object-position` de 48% para 65%; ver `home-desktop.jpg`. A foto fornecida é vertical e demanda recorte distinto do mockup horizontal.
2. [P2] Rodapé em largura intermediária comprimindo marca e texto. Corrigido com quebra flexível até 900px; no celular vira coluna. Ver `quote-mobile.jpg` e `portfolio-tablet.jpg`.
3. [P2] Cartões de pacotes no celular tinham composição vertical extensa. Alterados para imagem lateral, conteúdo à direita e botão na largura inteira, conforme a prancha. Ver `packages-mobile.jpg` após a alteração.
4. [P2] Hero mobile desproporcional à referência. Reduzidos altura e título e conferida a leitura sobre a foto. Ver `home-mobile.jpg` após a alteração.
5. Ícone de abrir projeto removido da capa ainda não cadastrada para evitar sobreposição com a indicação de imagem provisória.

As comparações posteriores confirmaram as correções. Não restam achados P0/P1/P2 observados dentro do escopo desta primeira versão.

## Superfícies verificadas

- Tipografia: Cormorant Garamond para títulos e botões editoriais, DM Sans para corpo e campos, ambas locais. Hierarquia, acentos e quebras legíveis.
- Espaçamento: hero amplo, apresentação em duas colunas no desktop e uma no celular, galeria em três/duas/uma colunas. Pacotes compactos no celular. Orçamento com imagem lateral no desktop e formulário em coluna no celular.
- Cores: marrom, creme, bege e dourado. Dourado dos botões ajustado para melhorar o contraste com texto branco; foco visível.
- Imagens: logo recebida, duas fotos recebidas e retrato extraído do PDF. Sem fotos geradas da referência, sem fingir autoria/acervo real. Indicação de fotos de referência e capa provisória.
- Conteúdo: todos os oito preços e entregas transcritos do PDF. Informações ausentes explicitadas; sem duração inventada para R$ 720 nem para o pacote completo. Conteúdo de exemplo sinalizado.

As capturas de viewport permitem conferir fontes, campos, filtros e cartões legíveis sem depender só de uma miniatura da página inteira. A captura completa mobile de orçamento permite conferir também CTA, aviso e rodapé. Não foi necessário um recorte adicional de detalhe.

## Interações e verificações

- Filtros de portfólio: 1 outro projeto, 2 casamentos, 3 no total.
- Categorias de pacotes: ensaios R$ 290/390/490 e adicionais; civil R$ 540; cerimônia/making of R$ 720; casamento R$ 800/950/1.150.
- Escolher pacote preenche resumo e serviço. Alterar de R$ 800 para R$ 950 preservou nome e opções de data/local. Remover eliminou também o parâmetro da URL, preservando os campos.
- Projeto sem vídeo mostra mensagem. “Quero um registro assim” transporta a referência para o orçamento.
- Formulário vazio mostra erros e foca o primeiro campo inválido. Ideia é opcional.
- Menu mobile abre, fecha e navega; foco visível e tratamento de Escape no menu implementados.
- Ausência de rolagem horizontal observada em pacotes e orçamento com 320px, início e pacotes com 390px, galeria e orçamento com 768px e desktop com 1280px. Medições parciais salvas em `docs/verification/layout-checks.json`.
- Todas as imagens da inicial carregadas; console sem erros/avisos nas leituras finais.
- Build de produção sem erros ou avisos. TypeScript e formatação aprovados. Três testes de mensagem/URL aprovados.

## Limites e próximos refinamentos

- Nenhum vídeo real foi fornecido: reprodução com mídia real ainda precisa ser validada quando o acervo chegar.
- A URL e a mensagem do WhatsApp foram verificadas por testes; não foi enviada mensagem nem validado atendimento/disponibilidade do número.
- Acessibilidade verificada por controles semânticos, foco e interações básicas; sem auditoria completa com leitor de tela ou todos os navegadores/dispositivos físicos.
- P3: selecionar futuramente capas diferentes para cada pacote e um enquadramento horizontal próprio para o hero.
- Publicação depende da confirmação de preços, telefone, textos e autorização/seleção das fotos.
