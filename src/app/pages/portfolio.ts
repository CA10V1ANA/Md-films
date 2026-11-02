import { Component, signal, computed } from '@angular/core';
import { projects } from '../data/projects';
import { ProjectCard } from '../shared/project-card';
import { PageHero } from '../shared/page-hero';
@Component({
  selector: 'app-portfolio',
  imports: [ProjectCard, PageHero],
  template: `<app-page-hero
      eyebrow="HISTÓRIAS EM MOVIMENTO"
      heading="Histórias pelo meu olhar"
      description="Filmes que celebram pessoas, momentos e tudo o que torna cada história única."
    />
    <section class="container gallery">
      <div class="filters" role="group" aria-label="Filtrar projetos por categoria">
        @for (category of categories; track category) {
          <button
            type="button"
            [class.selected]="selected() === category"
            [attr.aria-pressed]="selected() === category"
            (click)="selected.set(category)"
          >
            {{ category }}
          </button>
        }
      </div>
      <p class="sr-only" aria-live="polite">{{ filtered().length }} projetos encontrados</p>
      <div class="project-grid">
        @for (project of filtered(); track project.id) {
          <app-project-card [project]="project" />
        }
      </div>
      <p class="caption">
        Conteúdo de exemplo. Categorias, títulos e capas serão ajustados com o acervo real da Madu.
      </p>
    </section>`,
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  categories = ['Todos', 'Casamentos', 'Outros projetos'];
  selected = signal('Todos');
  filtered = computed(() =>
    projects.filter((p) => this.selected() === 'Todos' || p.category === this.selected()),
  );
}
