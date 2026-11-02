import { CustomPackage } from '../models/content';
import { customStages, customItems, customFormats } from '../data/custom-package';

export function customPackageError(value: CustomPackage): string | undefined {
  if (
    !value.stages.some((id) => customStages.some((stage) => stage.id === id)) &&
    !customItems.some((item) => value.items[item.id]?.enabled)
  )
    return 'Selecione pelo menos uma etapa ou um item para montar seu pacote.';
  if (
    !value.hoursUnknown &&
    (!Number.isFinite(value.hours) || Number(value.hours) <= 0 || Number(value.hours) % 0.5 !== 0)
  )
    return 'Informe a cobertura em horas, de meia em meia hora, ou marque “Ainda não sei”.';
  for (const item of customItems) {
    const selected = value.items[item.id];
    if (
      selected?.enabled &&
      item.quantityLabel &&
      (!Number.isInteger(selected.quantity) || Number(selected.quantity) < 1)
    )
      return `Informe uma quantidade inteira maior que zero em: ${item.label}.`;
  }
  if (
    value.items['videos']?.enabled &&
    value.videoMinutes !== null &&
    (!Number.isFinite(value.videoMinutes) ||
      value.videoMinutes <= 0 ||
      value.videoMinutes > 3 ||
      value.videoMinutes % 0.5 !== 0)
  )
    return 'Informe a duração do vídeo entre 0,5 e 3 minutos, de meio em meio minuto, ou deixe em branco.';
  return undefined;
}
export function customPackageLines(value: CustomPackage): string[] {
  const stages = customStages
    .filter((stage) => value.stages.includes(stage.id))
    .map((stage) => stage.label);
  const lines = [
    stages.length ? `Etapas: ${stages.join(', ')}` : '',
    value.hoursUnknown
      ? 'Cobertura: a definir com a Madu'
      : `Cobertura desejada: ${value.hours?.toLocaleString('pt-BR')} ${value.hours === 1 ? 'hora' : 'horas'}`,
  ];
  for (const item of customItems) {
    const selected = value.items[item.id];
    if (selected?.enabled)
      lines.push(item.quantityLabel ? `${item.label}: ${selected.quantity}` : item.label);
  }
  if (value.items['videos']?.enabled && value.videoMinutes !== null)
    lines.push(
      `Duração desejada de cada vídeo completo: ${value.videoMinutes.toLocaleString('pt-BR')} ${value.videoMinutes === 1 ? 'minuto' : 'minutos'}`,
    );
  if (value.items['reels']?.enabled) lines.push('Duração de cada reels: 1 minuto');
  if (value.items['videos']?.enabled)
    lines.push(
      `Formato dos vídeos completos: ${customFormats.find((format) => format.id === value.videoFormat)?.label || 'A definir'}`,
    );
  if (value.items['reels']?.enabled)
    lines.push(
      `Formato dos reels: ${customFormats.find((format) => format.id === value.reelsFormat)?.label || 'A definir'}`,
    );
  if (value.notes.trim()) lines.push(`Outras preferências: ${value.notes.trim()}`);
  return lines.filter(Boolean);
}
