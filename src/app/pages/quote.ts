import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QuoteState } from '../services/quote-state';
import { packages } from '../data/packages';
import { projects } from '../data/projects';
import { buildQuoteMessage, whatsappUrl } from '../services/whatsapp';
import { CustomPackageModal } from '../shared/custom-package-modal';
import { customPackageLines } from '../services/custom-package';
@Component({
  selector: 'app-quote',
  imports: [FormsModule, RouterLink, CurrencyPipe, CustomPackageModal],
  templateUrl: './quote.html',
  styleUrl: './quote.scss',
})
export class QuotePage {
  get customLines() {
    return this.draft.customPackage ? customPackageLines(this.draft.customPackage) : [];
  }
  reviewCustomPackage() {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pacote: null, personalizado: '1' },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
  removeCustomPackage() {
    this.draft.customPackage = undefined;
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { personalizado: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
  readonly draft = inject(QuoteState).draft;
  readonly route = inject(ActivatedRoute);
  private router = inject(Router);
  removePackage() {
    this.draft.packageId = undefined;
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pacote: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
  removeProject() {
    this.draft.projectId = undefined;
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { projeto: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
  attempted = false;
  services = [
    'Casamento',
    'Ensaio pré-wedding',
    'Casamento civil',
    'Cerimônia e making of',
    'Fotografia',
    'Filmagem',
    'Cobertura de eventos',
    'Outro',
  ];
  get selectedPackage() {
    return packages.find((p) => p.id === this.draft.packageId);
  }
  get selectedProject() {
    return projects.find((p) => p.id === this.draft.projectId);
  }
  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const selected = packages.find((p) => p.id === params.get('pacote'));
      if (selected) {
        this.draft.customPackage = undefined;
        this.draft.packageId = selected.id;
        this.draft.service =
          selected.category === 'ensaios'
            ? 'Ensaio pré-wedding'
            : selected.category === 'civil'
              ? 'Casamento civil'
              : selected.category === 'cerimonia'
                ? 'Cerimônia e making of'
                : 'Casamento';
      }
      const project = projects.find((p) => p.id === params.get('projeto'));
      if (project) this.draft.projectId = project.id;
      if (params.get('personalizado') === '1') this.draft.packageId = undefined;
    });
  }
  get validLocation() {
    return this.draft.locationUnknown || this.draft.location.trim().length > 0;
  }
  get validName() {
    return this.draft.name.trim().length > 0;
  }
  get validDate() {
    return this.draft.dateUnknown || !!this.draft.date;
  }
  continue(form: NgForm) {
    this.attempted = true;
    if (form.invalid || !this.validName || !this.validLocation || !this.validDate) {
      setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    window.open(
      whatsappUrl(buildQuoteMessage(this.draft, this.selectedPackage, this.selectedProject)),
      '_blank',
      'noopener,noreferrer',
    );
  }
}
