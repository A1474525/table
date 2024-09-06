import { Directive, ElementRef, HostListener, inject, Input } from '@angular/core';

/**
 * Директива для навигации по ячейкам таблицы с помощью стрелок, навешиваем на тег <td>
 * @param testKeyboardNavigation - название тега элемента вложенного в ячейку который хотим сфокусировать
 */
@Directive({
  selector: '[testKeyboardNavigation]',
  standalone: true,
})
export class KeyboardNavigationDirective {
  private readonly td: HTMLTableCellElement = inject(ElementRef).nativeElement;

  @Input({ required: true, alias: 'testKeyboardNavigation' }) nameFocusTag!: string;

  @HostListener('keyup.arrowup', ['$event'])
  @HostListener('keyup.arrowdown', ['$event'])
  @HostListener('keyup.arrowleft', ['$event'])
  @HostListener('keyup.arrowright', ['$event'])
  onArrowUpDownLeftRight(event: KeyboardEvent) {
    const currentElement = event.target as HTMLElement;

    if (!this.nameFocusTag || !currentElement.hasAttribute('readonly')) return;

    const tr = this.td.closest('tr') as HTMLTableRowElement;
    const table = this.td.closest('table') as HTMLTableElement;

    let rowIndex = tr.rowIndex;
    let columnIndex = this.td.cellIndex;

    switch (event.key) {
      case 'ArrowUp':
        rowIndex--;
        break;
      case 'ArrowDown':
        rowIndex++;
        break;
      case 'ArrowLeft':
        columnIndex--;
        break;
      case 'ArrowRight':
        columnIndex++;
    }

    // определяем коллекцию ячеек на которую хотим переключится
    const nextCells = table.rows[rowIndex]?.cells;
    if (!nextCells) return;

    // определяем конкретную ячейку на которую хотим переключится
    const nextCell = nextCells[columnIndex];
    if (!nextCell) return;

    // ищем необходимый для фокуса элемент
    const focusElement = nextCell.querySelector(this.nameFocusTag) as HTMLElement;
    focusElement?.focus();
  }
}
