import test from 'node:test';
import assert from 'node:assert/strict';
import { createCustomPackage } from '../src/app/data/custom-package';
import { customPackageError, customPackageLines } from '../src/app/services/custom-package';
import { buildQuoteMessage, whatsappUrl } from '../src/app/services/whatsapp';
import { packages } from '../src/app/data/packages';

test('montagem aceita meia hora, quantidades e entrega tudo na mensagem sem herdar preço fixo', () => {
  const custom = createCustomPackage();
  custom.stages = ['making-of', 'cerimonia'];
  custom.hoursUnknown = false;
  custom.hours = 1.5;
  custom.items['fotos'] = { enabled: true, quantity: 75 };
  custom.items['reels'] = { enabled: true, quantity: 2 };
  custom.items['fotografos'] = { enabled: true, quantity: 2 };
  custom.items['wedding-messages'].enabled = true;
  custom.reelsSeconds = 45;
  custom.reelsFormat = 'ambos';
  custom.notes = 'Registro leve & espontâneo.';
  assert.equal(customPackageError(custom), undefined);
  const message = buildQuoteMessage(
    {
      name: 'Ana',
      service: 'Casamento',
      date: '',
      dateUnknown: true,
      location: '',
      locationUnknown: true,
      idea: '',
      customPackage: custom,
    },
    packages.find((p) => p.price === 800),
  );
  assert.match(message, /Making of, Cerimônia/);
  assert.match(message, /1,5 hora/);
  assert.match(message, /Fotos tratadas em alta resolução: 75/);
  assert.match(message, /Reels editados: 2/);
  assert.match(message, /Fotógrafos: 2/);
  assert.match(message, /Wedding Messages/);
  assert.match(message, /Duração de cada reels: 1 minuto/);
  assert.match(message, /Horizontal e vertical/);
  assert.match(message, /leve & espontâneo/);
  assert.match(message, /sob consulta/);
  assert.doesNotMatch(message, /800|Filmmakers:|Vídeos completos:/);
  assert.equal(new URL(whatsappUrl(message)).searchParams.get('text'), message);
});
test('impede composição vazia, horas inválidas e contagens negativas, vazias ou fracionárias', () => {
  const custom = createCustomPackage();
  assert.ok(customPackageError(custom));
  custom.stages = ['civil'];
  custom.hoursUnknown = false;
  for (const hours of [null, 0, -1, 1.2, NaN, Infinity]) {
    custom.hours = hours;
    assert.ok(customPackageError(custom));
  }
  custom.hours = 2;
  custom.items['fotos'].enabled = true;
  for (const quantity of [null, 0, -1, 1.5, NaN, Infinity]) {
    custom.items['fotos'].quantity = quantity;
    assert.ok(customPackageError(custom));
  }
  custom.items['fotos'].quantity = 30;
  assert.equal(customPackageError(custom), undefined);
});
test('itens desmarcados não vazam quantidades ou durações antigas e horas indefinidas ignoram valor antigo', () => {
  const custom = createCustomPackage();
  custom.stages = ['recepcao'];
  custom.hours = -1;
  custom.items['reels'].quantity = 0;
  custom.reelsSeconds = -10;
  custom.videoMinutes = -5;
  assert.equal(customPackageError(custom), undefined);
  const summary = customPackageLines(custom).join('\n');
  assert.match(summary, /a definir com a Madu/);
  assert.doesNotMatch(summary, /-1|Reels|Duração|Formato|Vídeos/);
});
test('duração opcional é validada apenas para entregas selecionadas', () => {
  const custom = createCustomPackage();
  custom.items['videos'].enabled = true;
  assert.equal(customPackageError(custom), undefined);
  custom.videoMinutes = 0.1;
  assert.ok(customPackageError(custom));
  custom.videoMinutes = 2.5;
  assert.equal(customPackageError(custom), undefined);
  custom.videoMinutes = 3.5;
  assert.ok(customPackageError(custom));
  custom.videoMinutes = null;
  custom.items['reels'].enabled = true;
  custom.reelsSeconds = 0.5;
  assert.equal(customPackageError(custom), undefined);
  assert.match(customPackageLines(custom).join('\n'), /Duração de cada reels: 1 minuto/);
});
