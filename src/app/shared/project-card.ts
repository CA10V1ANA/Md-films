import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../models/content';
@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  template: `<article>
    <a
      class="project-cover"
      [routerLink]="['/portfolio', project().id]"
      [attr.aria-label]="'Ver projeto: ' + project().title"
    >
      @if (project().cover) {
        <img [src]="project().cover" [alt]="project().alt" loading="lazy" />
      } @else {
        <div class="empty-cover">
          <i class="bi bi-camera-reels" aria-hidden="true"></i><span>Capa em preparação</span>
        </div>
      }
      @if (project().cover) {
        <span class="view-icon"><i class="bi bi-arrow-up-right" aria-hidden="true"></i></span>
      }
      @if (project().example) {
        <span class="example-label">Conteúdo de exemplo</span>
      }
    </a>
    <div class="project-info">
      <div>
        <h3>
          <a [routerLink]="['/portfolio', project().id]">{{ project().title }}</a>
        </h3>
        <p class="eyebrow">{{ project().category }}</p>
      </div>
      <a
        class="project-link"
        [routerLink]="['/portfolio', project().id]"
        [attr.aria-label]="'Ver projeto: ' + project().title"
        >Ver projeto <i class="bi bi-arrow-right" aria-hidden="true"></i
      ></a>
    </div>
  </article>`,
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  project = input.required<Project>();
}
