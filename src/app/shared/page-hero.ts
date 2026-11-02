import { Component, input } from '@angular/core';
@Component({
  selector: 'app-page-hero',
  template: `<section class="page-hero">
    <img src="/images/casal-jardim.jpg" alt="" class="backdrop" />
    <div class="shade"></div>
    <div class="container hero-content">
      <p class="eyebrow">{{ eyebrow() }}</p>
      <h1>{{ heading() }}</h1>
      <p class="hero-description">{{ description() }}</p>
    </div>
    <span class="image-caption">Foto de referência · acervo em seleção</span>
  </section>`,
  styleUrl: './page-hero.scss',
})
export class PageHero {
  eyebrow = input('');
  heading = input('');
  description = input('');
}
