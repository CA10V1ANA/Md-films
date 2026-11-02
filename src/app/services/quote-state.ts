import { Injectable } from '@angular/core';
import { QuoteDraft } from '../models/content';
@Injectable({ providedIn: 'root' })
export class QuoteState {
  // Preserva o formulário na navegação. Nenhum dado pessoal é salvo em disco.
  draft: QuoteDraft = {
    name: '',
    service: '',
    date: '',
    dateUnknown: false,
    location: '',
    locationUnknown: false,
    idea: '',
  };
}
