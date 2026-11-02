import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  template: `<section class="container" style="padding-block:90px;min-height:55vh">
    <p class="eyebrow">PÁGINA NÃO ENCONTRADA</p>
    <h1>Vamos encontrar sua história?</h1>
    <p>Este endereço não está disponível.</p>
    <a class="button dark" routerLink="/">Voltar ao início</a>
  </section>`,
})
export class NotFound {}
