import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { projects } from '../data/projects';
@Component({
  selector: 'app-project',
  imports: [RouterLink],
  template: `<section class="container project-detail">
    @if (project(); as p) {
      <a class="back-link" routerLink="/portfolio"
        ><i class="bi bi-arrow-left" aria-hidden="true"></i> Voltar ao portfólio</a
      >
      <div class="detail-grid">
        <div class="media">
          @if (p.videoUrl) {
            <video
              controls
              preload="metadata"
              playsinline
              [poster]="p.cover || ''"
              [attr.aria-label]="p.title"
            >
              <source [src]="p.videoUrl" />
              Seu navegador não suporta este vídeo.</video
            ><a [href]="p.videoUrl" target="_blank" rel="noopener noreferrer">Abrir vídeo</a>
          } @else {
            @if (p.cover) {
              <img [src]="p.cover" [alt]="p.alt" />
            }
            <div class="video-pending">
              <i class="bi bi-camera-reels" aria-hidden="true"></i>
              <p>O vídeo deste projeto ainda não está disponível.</p>
            </div>
          }
        </div>
        <div class="detail-copy">
          <p class="eyebrow">{{ p.category }}</p>
          <h1>{{ p.title }}</h1>
          @if (p.example) {
            <span class="example-chip">Conteúdo de exemplo</span>
          }
          <p>{{ p.description }}</p>
          <a class="button gold" routerLink="/orcamento" [queryParams]="{ projeto: p.id }"
            >Quero um registro assim <i class="bi bi-arrow-right" aria-hidden="true"></i
          ></a>
        </div>
      </div>
    } @else {
      <h1>Projeto não encontrado</h1>
      <p>Explore as histórias disponíveis no portfólio.</p>
      <a class="button dark" routerLink="/portfolio">Voltar ao portfólio</a>
    }
  </section>`,
  styleUrl: './project.scss',
})
export class ProjectPage {
  private route = inject(ActivatedRoute);
  project = toSignal(
    this.route.paramMap.pipe(map((params) => projects.find((p) => p.id === params.get('id')))),
  );
}
