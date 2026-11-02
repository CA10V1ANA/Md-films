import test from 'node:test';
import assert from 'node:assert/strict';
import { buildQuoteMessage, whatsappUrl } from '../src/app/services/whatsapp';
import { packages } from '../src/app/data/packages';
import { projects } from '../src/app/data/projects';
import { QuoteDraft } from '../src/app/models/content';

const draft: QuoteDraft = {
  name: '  Ana & João  ',
  service: 'Casamento',
  date: '2027-05-24',
  dateUnknown: false,
  location: 'Fortaleza — salão',
  locationUnknown: false,
  idea: 'Um filme leve, com emoção & música.',
};
test('mensagem mantém acentos, data brasileira, pacote e referência sem confirmar reserva', () => {
  const message = buildQuoteMessage(
    draft,
    packages.find((p) => p.id === 'cerimonia-recepcao'),
    projects[0],
  );
  assert.match(message, /Nome: Ana & João/);
  assert.match(message, /24\/05\/2027/);
  assert.match(message, /Cerimônia \+ Recepção/);
  assert.match(message, /800,00/);
  assert.match(message, /conteúdo de exemplo/);
  assert.match(message, /valor final serão confirmados/);
  const url = new URL(whatsappUrl(message));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/5585985969042');
  assert.equal(url.searchParams.get('text'), message);
});
test('indefinidos substituem valores antigos sem vazar data e local anteriores', () => {
  const message = buildQuoteMessage({
    ...draft,
    dateUnknown: true,
    locationUnknown: true,
    idea: '',
  });
  assert.match(message, /Data: Ainda não defini/);
  assert.match(message, /Cidade e local: Ainda não defini/);
  assert.match(message, /Orçamento personalizado/);
  assert.doesNotMatch(message, /24\/05\/2027|Fortaleza|Minha ideia:|Projeto de referência:/);
});
test('cada seleção mantém seu nome e preço de referência na mensagem', () => {
  for (const item of packages) {
    const message = buildQuoteMessage(draft, item);
    assert.ok(message.includes(item.name));
    assert.ok(
      message.includes(item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })),
    );
  }
});
