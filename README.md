<div align="center">
  <img src="public/images/logo.jpg" alt="Madu Films" width="112">
  <h1>Madu Films</h1>
  <p>Fotografia, filmes e histórias que merecem ser revividas.</p>
</div>

Portfólio de **Madu Reis**, profissional de audiovisual que atua com fotografia, filmagem e cobertura de eventos. Esta primeira versão apresenta seus serviços, organiza os pacotes de casamento e permite preparar um pedido de orçamento pelo WhatsApp.

O projeto é uma aplicação Angular estática, responsiva e sem backend. Os mockups aprovados orientam a identidade visual; o conteúdo dos pacotes tem como fonte o material fornecido pela profissional.

## Funcionalidades

- **Início:** apresentação, foto de destaque, navbar transparente sobre a imagem, emblema sem fundo e chamadas para trabalhos e orçamento.
- **Portfólio:** galeria com filtros, páginas individuais e referência de projeto levada ao orçamento. Sem reprodução automática de vídeos.
- **Pacotes:** oito opções em quatro categorias — ensaios pré-wedding, casamento civil, cerimônia e making of e pacotes de casamento — com preços, coberturas e adicionais informados no PDF.
- **Pacote personalizado:** modal com etapas, horas, entregas, equipe, formatos e durações desejadas. A seleção pode ser revisada, editada ou removida.
- **Orçamento:** formulário com data e local ainda indefinidos, pacote/projeto de referência e mensagem pronta para revisão e envio manual no WhatsApp.
- **Acessibilidade:** rótulos nos campos, foco visível, link para pular o conteúdo, diálogo nativo com Escape e navegação por teclado, além de suporte a movimento reduzido.

## Tecnologias

| Tecnologia                   | Uso                                                |
| ---------------------------- | -------------------------------------------------- |
| Angular 22                   | Componentes standalone e renderização no navegador |
| TypeScript 6                 | Modelos e lógica tipados                           |
| Angular Router               | Navegação e parâmetros de referência               |
| SCSS                         | Estilos globais e por componente                   |
| Angular Forms                | Formulários e validação                            |
| Cormorant Garamond e DM Sans | Fontes servidas localmente                         |
| Bootstrap Icons              | Ícones servidos localmente                         |
| Node.js Test Runner e tsx    | Testes das regras de orçamento                     |

Não há banco de dados, painel administrativo, login, pagamento, analytics ou integração paga. O site não precisa de variáveis de ambiente para funcionar.

## Executar localmente

Use **Node.js 24.x** e npm. O ambiente local usado na validação tem Node.js 24.18.

```bash
git clone https://github.com/CA10V1ANA/Md-films.git
cd Md-films
npm ci
npm start
```

Abra [localhost:4200](http://localhost:4200). Para escolher outra porta:

```bash
npm start -- --port 4300
```

No PowerShell, caso `npm.ps1` esteja bloqueado, use `npm.cmd` no lugar de `npm`.

## Comandos de desenvolvimento

| Comando                | Resultado                                                |
| ---------------------- | -------------------------------------------------------- |
| `npm start`            | Servidor local com atualização durante o desenvolvimento |
| `npm test`             | Testes de composição de mensagem e personalização        |
| `npm run check`        | Checagem TypeScript, sem emitir arquivos                 |
| `npm run format:check` | Validação da formatação de código, testes e README       |
| `npm run build`        | Build otimizado de produção                              |

A saída estática de produção fica em **`dist/madu-films/browser`**. `node_modules`, `dist`, cache do Angular e configurações locais da Vercel ficam fora do Git.

## Publicar na Vercel pelo GitHub

O arquivo [vercel.json](vercel.json) define a instalação, o build, a saída estática e o fallback das rotas para `index.html`. Assim, abrir ou atualizar diretamente `/portfolio`, `/portfolio/um-dia-para-sempre`, `/pacotes` ou `/orcamento` mantém a navegação do Angular.

1. Acesse [New Project na Vercel](https://vercel.com/new).
2. Importe **`CA10V1ANA/Md-films`**. Se o repositório não aparecer, libere seu acesso na integração com o GitHub.
3. Escolha um nome para o projeto e mantenha a raiz do repositório como diretório principal.
4. Confira as configurações abaixo e clique em **Deploy**.

| Configuração          | Valor                      |
| --------------------- | -------------------------- |
| Framework Preset      | Angular                    |
| Root Directory        | `./` — raiz do repositório |
| Install Command       | `npm ci`                   |
| Build Command         | `npm run build`            |
| Output Directory      | `dist/madu-films/browser`  |
| Node.js Version       | `24.x`                     |
| Environment Variables | Nenhuma necessária         |
| Production Branch     | `main`                     |

Após o deploy, abra as quatro páginas e atualize cada uma pelo navegador. Confira também as imagens, o menu mobile, o modal personalizado e a mensagem do orçamento. O botão do WhatsApp apenas prepara a conversa; o envio final é manual.

Com a integração Git configurada, os próximos pushes na branch de produção geram novos deployments. O sucesso de um push no GitHub, sozinho, não confirma que o build da Vercel terminou ou que o site está disponível.

Referências: [configuração da Vercel](https://vercel.com/docs/project-configuration/vercel-json), [versão do Node.js](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) e [integração Git](https://vercel.com/docs/git).

## Estrutura

```text
public/
  images/                  Logo, emblema, retrato e fotos
src/
  app/
    data/                  Conteúdo e opções editáveis
    models/                Tipos de projetos, pacotes e orçamento
    pages/                 Início, portfólio, projeto, pacotes e orçamento
    services/              Rascunho, validação e mensagem do WhatsApp
    shared/                Cartões, hero e modal personalizado
    app.routes.ts          Rotas
    app.html               Cabeçalho e rodapé
  styles.scss              Paleta, fontes e estilos globais
tests/                     Testes das regras de orçamento
vercel.json                Configuração de publicação
```

## Onde editar o conteúdo

| Conteúdo                                       | Arquivo                                                                    |
| ---------------------------------------------- | -------------------------------------------------------------------------- |
| Trabalhos, títulos, categorias, capas e vídeos | [`src/app/data/projects.ts`](src/app/data/projects.ts)                     |
| Pacotes, preços, coberturas e adicionais       | [`src/app/data/packages.ts`](src/app/data/packages.ts)                     |
| Opções do pacote personalizado                 | [`src/app/data/custom-package.ts`](src/app/data/custom-package.ts)         |
| Instagram, WhatsApp, retrato e apresentação    | [`src/app/data/site.config.ts`](src/app/data/site.config.ts)               |
| Fotos e logos                                  | [`public/images/`](public/images/)                                         |
| Composição da mensagem do WhatsApp             | [`src/app/services/whatsapp.ts`](src/app/services/whatsapp.ts)             |
| Validação e resumo da personalização           | [`src/app/services/custom-package.ts`](src/app/services/custom-package.ts) |
| Cores e tipografia                             | [`src/styles.scss`](src/styles.scss)                                       |

### Adicionar trabalhos e vídeos

Adicione um registro tipado em `projects.ts`. Exemplo de estrutura para substituir o conteúdo provisório:

```typescript
{
  id: 'identificador-do-projeto',
  title: 'Título aprovado do projeto',
  category: 'Casamentos',
  cover: '/images/capa-do-projeto.jpg',
  alt: 'Descrição objetiva da imagem',
  description: 'Apresentação aprovada do trabalho.',
  videoUrl: 'https://seu-host-de-videos.com/filme.mp4',
  example: false,
}
```

`videoUrl` é opcional e recebe uma **URL direta de MP4/WebM**, local ou HTTPS. Links de páginas do YouTube e Instagram não funcionam como fonte desse player. Sem vídeo cadastrado, a página mostra uma mensagem clara. Use `example: false` apenas ao cadastrar um trabalho real aprovado.

Os filtros provisórios ficam em `pages/portfolio.ts`, e o tipo de categoria em `models/content.ts`; atualize ambos caso altere as categorias. Evite colocar vídeos grandes diretamente no Git: mantenha as capas no projeto e cadastre a URL de hospedagem dos vídeos.

### Personalizar as opções do modal

Em `data/custom-package.ts`, altere os rótulos, etapas, grupos, flags, quantidades iniciais e formatos. A configuração é utilizada pelo modal e pelo resumo enviado ao WhatsApp.

A pessoa pode solicitar:

- Pré-wedding, civil, making of, cerimônia, recepção ou outro evento.
- Tempo de cobertura, em incrementos de meia hora, ou ajuda para definir.
- Quantidades de fotos, reels e vídeos completos.
- Wedding Messages e postagens em tempo real.
- Quantidades de fotógrafos, filmmakers e storymakers.
- Formato e duração desejada de reels e vídeos completos, separadamente.
- Preferências adicionais em texto livre.

**Não há cálculo automático do preço personalizado.** As opções representam uma solicitação para avaliação da Madu. A seleção livre substitui o pacote pronto; cancelar uma edição mantém a seleção anteriormente salva.

## WhatsApp e dados do formulário

O telefone está centralizado em `site.config.ts`, no formato internacional sem pontuação. O número confirmado para esta versão é **+55 (85) 98596-9042**. Instagram: [@madufilms._](https://www.instagram.com/madufilms._/).

Os botões de atendimento abrem o WhatsApp desse número. No orçamento, a mensagem inclui nome, serviço, data, local, ideia e pacote/projeto de referência ou composição personalizada.

O rascunho fica somente em memória no navegador: navegar para alterar o pacote preserva os campos; atualizar a página ou fechar a aba limpa os dados. O site não envia dados a um servidor próprio nem confirma automaticamente reserva, disponibilidade ou valor final.

## Estado do conteúdo

Esta é uma **primeira versão com conteúdo parcialmente provisório**:

- Os títulos e as descrições do portfólio são exemplos identificados como “Conteúdo de exemplo”. Não há vídeos reais cadastrados.
- As duas fotos do casal foram fornecidas para compor a versão inicial; a seleção e o uso definitivo precisam de aprovação.
- O retrato veio da apresentação do PDF. O texto foi resumido a partir das informações fornecidas, sem inventar experiência, prêmios ou clientes.
- A logo original foi preservada, com uma versão PNG transparente para o emblema.
- Preços, condições, apresentação e acervo devem ser confirmados com a profissional antes da divulgação definitiva.
- O pacote de R$ 720 não informa duração, equipe e entregas detalhadas; o completo de casamento também não informa número de horas. Esses dados não foram inventados.

## Verificação

Os sete testes atuais cobrem a mensagem e a URL do WhatsApp, a referência dos pacotes, campos ainda indefinidos, a composição personalizada, validação de quantidades/horas/durações e exclusão de opções desmarcadas. O build verifica os templates e os limites de tamanho configurados.

A verificação manual exercitou navegação, filtros, formulário, troca de pacote, edição e cancelamento da personalização, navbar transparente e adaptação para desktop, tablet e celular. A reprodução de vídeos reais e o deploy público devem ser conferidos quando o acervo e a URL publicada estiverem disponíveis.
