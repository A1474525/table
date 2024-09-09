import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'test-table-container',
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet],
  templateUrl: './table-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableContainerComponent<T> {
  @Input() rows: ReadonlyArray<T> = [];
  @ContentChild('templateBody', { static: true }) templateBody?: TemplateRef<unknown> | null;
}
