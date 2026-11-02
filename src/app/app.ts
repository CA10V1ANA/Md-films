import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { siteConfig } from './data/site.config';
import { whatsappUrl } from './services/whatsapp';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  closeMenu() {
    this.menuOpen.set(false);
    document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus();
  }
  readonly config = siteConfig;
  readonly contactUrl = whatsappUrl(
    'Olá, Madu! Vim pelo seu portfólio e gostaria de saber mais sobre seus serviços.',
  );
  readonly menuOpen = signal(false);
  readonly homeHeader = signal(false);
  readonly links = [
    { url: '/', label: 'Início' },
    { url: '/portfolio', label: 'Portfólio' },
    { url: '/pacotes', label: 'Pacotes' },
    { url: '/orcamento', label: 'Orçamento' },
  ];
  private router = inject(Router);
  constructor() {
    this.homeHeader.set(this.router.url.split(/[?#]/)[0] === '/');
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.homeHeader.set(event.urlAfterRedirects.split(/[?#]/)[0] === '/');
        this.menuOpen.set(false);
        setTimeout(() =>
          document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true }),
        );
      });
  }
}
