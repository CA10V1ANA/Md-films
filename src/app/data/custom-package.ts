import { CustomPackage } from '../models/content';

// Preferências de orçamento baseadas no PDF. Não representam tabela de preços ou disponibilidade.
// Adicione/remova flags aqui; rótulos, grupos e quantidades são usados no modal e no WhatsApp.
export const customStages = [
  { id: 'pre-wedding', label: 'Ensaio pré-wedding' },
  { id: 'civil', label: 'Casamento civil' },
  { id: 'making-of', label: 'Making of' },
  { id: 'cerimonia', label: 'Cerimônia' },
  { id: 'recepcao', label: 'Recepção / festa' },
  { id: 'outro', label: 'Outro evento' },
];
export const customItemGroups = [
  {
    id: 'entregas',
    label: 'O que você quer receber',
    description: 'Selecione as entregas e ajuste as quantidades desejadas.',
  },
  {
    id: 'equipe',
    label: 'Equipe para o seu dia',
    description: 'Se tiver uma preferência, indique a equipe. A Madu ajuda a definir o ideal.',
  },
  {
    id: 'extras',
    label: 'Durante o evento',
    description: 'Uma possibilidade para compartilhar enquanto tudo acontece.',
  },
];
export const customItems: {
  id: string;
  group: string;
  label: string;
  quantityLabel?: string;
  initialQuantity: number;
  detail?: string;
}[] = [
  {
    id: 'fotos',
    group: 'entregas',
    label: 'Fotos tratadas em alta resolução',
    quantityLabel: 'Quantidade de fotos',
    initialQuantity: 30,
  },
  {
    id: 'reels',
    group: 'entregas',
    label: 'Reels editados',
    quantityLabel: 'Quantidade de reels',
    initialQuantity: 1,
  },
  {
    id: 'videos',
    group: 'entregas',
    label: 'Vídeos completos',
    quantityLabel: 'Quantidade de vídeos completos',
    initialQuantity: 1,
  },
  {
    id: 'wedding-messages',
    group: 'entregas',
    label: 'Wedding Messages',
    initialQuantity: 1,
    detail: 'Registro de mensagens para o casal; formato a combinar.',
  },
  {
    id: 'fotografos',
    group: 'equipe',
    label: 'Fotógrafos',
    quantityLabel: 'Quantidade de fotógrafos',
    initialQuantity: 1,
  },
  {
    id: 'filmmakers',
    group: 'equipe',
    label: 'Filmmakers',
    quantityLabel: 'Quantidade de filmmakers',
    initialQuantity: 1,
  },
  {
    id: 'storymakers',
    group: 'equipe',
    label: 'Storymakers',
    quantityLabel: 'Quantidade de storymakers',
    initialQuantity: 1,
  },
  {
    id: 'tempo-real',
    group: 'extras',
    label: 'Postagens em tempo real',
    initialQuantity: 1,
    detail: 'Canais e condições combinados com a Madu.',
  },
];
export const customFormats = [
  { id: 'a-definir', label: 'Quero orientação da Madu' },
  { id: 'vertical', label: 'Vertical' },
  { id: 'horizontal', label: 'Horizontal' },
  { id: 'ambos', label: 'Horizontal e vertical' },
] as const;
export function createCustomPackage(): CustomPackage {
  return {
    stages: [],
    hoursUnknown: true,
    hours: 2,
    items: Object.fromEntries(
      customItems.map((item) => [item.id, { enabled: false, quantity: item.initialQuantity }]),
    ),
    videoMinutes: null,
    reelsSeconds: 60,
    videoFormat: 'a-definir',
    reelsFormat: 'a-definir',
    notes: '',
  };
}
