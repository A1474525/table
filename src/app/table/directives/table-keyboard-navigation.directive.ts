import { Directive, ElementRef, HostListener, inject } from '@angular/core';

enum ArrowKey {
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
}

/**
 * Директива для навигации по ячейкам таблицы с помощью стрелок, навешиваем на тег <td>
 * Перемещение осуществляется с помощью фокуса
 */
@Directive({
  selector: '[testTableKeyboardNavigation]',
  standalone: true
})
export class TableKeyboardNavigationDirective<T extends HTMLTableCellElement> {
  private readonly td = inject<ElementRef<T>>(ElementRef).nativeElement;

  private focusElementIntoSell(cell: T): void {
    // ищем необходимый для фокуса элемент
    const focusElement = Array.from(cell.children).find(
      (el) => (el as HTMLElement)?.focus
    ) as HTMLElement | undefined;
    if (!focusElement) return;

    focusElement.focus();
  }

  private findNextCell({ key }: KeyboardEvent): T | undefined {
    const tr = this.td.closest('tr') as HTMLTableRowElement | undefined;
    const table = this.td.closest('table') as HTMLTableElement | undefined;
    if (!table || !tr) return;

    let rowIndex = tr.rowIndex;
    let columnIndex = this.td.cellIndex;

    switch (key) {
      case ArrowKey.ARROW_UP:
        rowIndex--;
        break;
      case ArrowKey.ARROW_DOWN:
        rowIndex++;
        break;
      case ArrowKey.ARROW_LEFT:
        columnIndex--;
        break;
      case ArrowKey.ARROW_RIGHT:
        columnIndex++;
    }

    const nextCells = table.rows[rowIndex]?.cells;
    if (!nextCells) return;

    const nextCell = nextCells[columnIndex];

    return nextCell as T;
  }

  @HostListener(`keyup.${ArrowKey.ARROW_UP}`, ['$event'])
  @HostListener(`keyup.${ArrowKey.ARROW_DOWN}`, ['$event'])
  @HostListener(`keyup.${ArrowKey.ARROW_LEFT}`, ['$event'])
  @HostListener(`keyup.${ArrowKey.ARROW_RIGHT}`, ['$event'])
  onDirectionKeyUp(event: KeyboardEvent) {
    const currentElement = event.target as HTMLElement;
    if (!currentElement.hasAttribute('readonly')) return;

    const nextCell = this.findNextCell(event);
    if (!nextCell) return;

    this.focusElementIntoSell(nextCell);
  }
}
