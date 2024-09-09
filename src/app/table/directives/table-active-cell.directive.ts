import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { fromEvent, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[testTableActiveCell]',
  standalone: true,
})
export class TableActiveCellDirective<T extends HTMLTableCellElement>  {
  private readonly td = inject<ElementRef<T>>(ElementRef).nativeElement;
  private readonly renderer = inject(Renderer2);
  private readonly className = 'table-active'

  private readonly blurHandler$ = fromEvent(this.td, 'focusout').pipe(
    tap(() => this.removeTableActiveClass())
  )
  private readonly focusHandler$ =  fromEvent(this.td, 'focusin').pipe(
    tap(() => this.setTableActiveClass())
  )

  constructor() {
    this.blurHandler$.pipe(takeUntilDestroyed()).subscribe();
    this.focusHandler$.pipe(takeUntilDestroyed()).subscribe();
  }

  private setTableActiveClass(): void {
    this.renderer.addClass(this.td, this.className)
  }

  private removeTableActiveClass(): void {
    this.renderer.removeClass(this.td, this.className)
  }
}
