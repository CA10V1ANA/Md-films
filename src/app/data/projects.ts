import { Project } from '../models/content';
// Capas fornecidas para composição. Títulos fictícios. URLs diretas MP4/WebM em videoUrl.
// Só definir example:false ao cadastrar projetos reais aprovados.
export const projects: Project[] = [
  {
    id: 'um-dia-para-sempre',
    title: 'Um dia para sempre',
    category: 'Casamentos',
    cover: '/images/casal-abraco.jpg',
    alt: 'Casal se abraçando em um jardim',
    description:
      'Espaço de exemplo para apresentar um filme de casamento. A foto foi fornecida como referência visual; título e descrição são provisórios.',
    example: true,
  },
  {
    id: 'entre-agora-sempre',
    title: 'Entre o agora e o sempre',
    category: 'Casamentos',
    cover: '/images/casal-jardim.jpg',
    alt: 'Casal em uma ponte vermelha no jardim',
    description:
      'Espaço de exemplo para um ensaio ou uma história de casamento. O projeto e seu vídeo serão cadastrados após a seleção do acervo.',
    example: true,
  },
  {
    id: 'outros-encontros',
    title: 'Histórias em movimento',
    category: 'Outros projetos',
    alt: 'Capa provisória de outros projetos',
    description:
      'Espaço reservado para fotografia, filmagem e cobertura de eventos. O acervo real será incluído após a aprovação da Madu.',
    example: true,
  },
];
