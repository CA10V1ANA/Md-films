import { QuoteDraft, FilmPackage, Project } from '../models/content';
import { siteConfig } from '../data/site.config';
import { customPackageLines } from './custom-package';
export function buildQuoteMessage(
  draft: QuoteDraft,
  selected?: FilmPackage,
  project?: Project,
): string {
  const date = draft.date ? draft.date.split('-').reverse().join('/') : '';
  return [
    'Olá, Madu! Gostaria de pedir um orçamento.',
    `Nome: ${draft.name.trim()}`,
    `Serviço: ${draft.service}`,
    `Data: ${draft.dateUnknown ? 'Ainda não defini' : date}`,
    `Cidade e local: ${draft.locationUnknown ? 'Ainda não defini' : draft.location.trim()}`,
    draft.customPackage
      ? [
          'Pacote personalizado — preferências solicitadas:',
          ...customPackageLines(draft.customPackage),
          'Valor do pacote personalizado: sob consulta.',
        ].join('\n')
      : selected
        ? `Pacote: ${selected.name} — referência: ${selected.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
        : 'Orçamento personalizado, sem pacote escolhido.',
    project
      ? `Projeto de referência: ${project.title}${project.example ? ' (conteúdo de exemplo)' : ''}`
      : '',
    draft.idea.trim() ? `Minha ideia: ${draft.idea.trim()}` : '',
    'Entendo que disponibilidade, reserva e valor final serão confirmados pela Madu.',
  ]
    .filter(Boolean)
    .join('\n');
}
export function whatsappUrl(message: string): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
