import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FilmPackage } from '../models/content';
@Component({
  selector: 'app-package-card',
  imports: [CurrencyPipe, RouterLink],
  template: `<article>
    <img [src]="item().image" alt="Foto de referência de um casal" loading="lazy" />
    <div class="package-body">
      <h2>{{ item().name }}</h2>
      <p class="price">{{ item().price | currency: 'BRL' : 'symbol' : '1.0-0' : 'pt-BR' }}</p>
      <ul>
        @if (item().duration) {
          <li>
            <i class="bi bi-clock" aria-hidden="true"></i><span>{{ item().duration }}</span>
          </li>
        }
        @for (line of item().includes; track line) {
          <li>
            <i class="bi bi-check2" aria-hidden="true"></i><span>{{ line }}</span>
          </li>
        }
      </ul>
      @if (item().note) {
        <p class="note">{{ item().note }}</p>
      }
    </div>
    <a class="button dark" routerLink="/orcamento" [queryParams]="{ pacote: item().id }"
      >Escolher pacote <i class="bi bi-arrow-right" aria-hidden="true"></i
    ></a>
  </article>`,
  styleUrl: './package-card.scss',
})
export class PackageCard {
  item = input.required<FilmPackage>();
}
