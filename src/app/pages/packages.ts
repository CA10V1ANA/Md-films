import { Component, computed, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CustomPackageModal } from '../shared/custom-package-modal';
import { packages, packageCategories, rehearsalExtras } from '../data/packages';
import { PackageCategory } from '../models/content';
import { PageHero } from '../shared/page-hero';
import { PackageCard } from '../shared/package-card';
@Component({
  selector: 'app-packages',
  imports: [PageHero, PackageCard, CustomPackageModal],
  templateUrl: './packages.html',
  styleUrl: './packages.scss',
})
export class PackagesPage {
  private router = inject(Router);
  reviewCustomPackage() {
    void this.router.navigate(['/orcamento'], { queryParams: { personalizado: '1' } });
  }
  categories = packageCategories;
  extras = rehearsalExtras;
  selected = signal<PackageCategory>('casamento');
  filtered = computed(() => packages.filter((p) => p.category === this.selected()));
}
