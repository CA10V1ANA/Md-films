import {
  Component,
  ElementRef,
  ViewChild,
  inject,
  output,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  customStages,
  customItems,
  customItemGroups,
  customFormats,
  createCustomPackage,
} from '../data/custom-package';
import { QuoteState } from '../services/quote-state';
import { customPackageError } from '../services/custom-package';

@Component({
  selector: 'app-custom-package-modal',
  imports: [FormsModule],
  templateUrl: './custom-package-modal.html',
  styleUrl: './custom-package-modal.scss',
})
export class CustomPackageModal implements OnDestroy {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  readonly saved = output<void>();
  readonly stages = customStages;
  readonly groups = customItemGroups;
  readonly formats = customFormats;
  readonly items = customItems;
  readonly state = inject(QuoteState);
  private readonly changeDetector = inject(ChangeDetectorRef);
  selection = createCustomPackage();
  error = '';
  private previousOverflow = '';
  open() {
    this.selection = structuredClone(this.state.draft.customPackage ?? createCustomPackage());
    // Permite acrescentar flags de configuração sem invalidar rascunhos já abertos.
    for (const item of this.items)
      this.selection.items[item.id] ??= { enabled: false, quantity: item.initialQuantity };
    this.error = '';
    this.previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.modal.nativeElement.showModal();
    this.changeDetector.markForCheck();
  }
  close() {
    this.modal.nativeElement.close();
    this.restoreScroll();
  }
  restoreScroll() {
    document.body.style.overflow = this.previousOverflow;
  }
  toggleStage(id: string, checked: boolean) {
    this.selection.stages = checked
      ? [...this.selection.stages, id]
      : this.selection.stages.filter((stage) => stage !== id);
  }
  save() {
    this.error = customPackageError(this.selection) ?? '';
    if (this.error) {
      setTimeout(() =>
        this.modal.nativeElement.querySelector<HTMLElement>('.modal-error')?.focus(),
      );
      return;
    }
    this.state.draft.customPackage = structuredClone(this.selection);
    this.state.draft.packageId = undefined;
    this.close();
    this.saved.emit();
  }
  ngOnDestroy() {
    if (this.modal?.nativeElement.open) this.restoreScroll();
  }
}
