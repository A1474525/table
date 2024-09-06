import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'test-table-container',
  standalone: true,
  imports: [NgIf, NgFor, NgTemplateOutlet],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableContainerComponent<T> {
  @Input() dataArray: ReadonlyArray<T> = [];
  @ContentChild('target', { static: true }) templateVariable!: TemplateRef<unknown> | null;
}
