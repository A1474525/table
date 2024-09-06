import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { DOCUMENT, JsonPipe, KeyValuePipe, NgFor } from '@angular/common';
import { TableContainerComponent } from "../shared/components/table-container/table-container.component";
import { TableService } from "./services/table.service";
import { KeyboardInputDirective } from "../shared/directives/keyboard-input.directive";
import { KeyboardNavigationDirective } from "../shared/directives/keyboard-navigation.directive";

@Component({
  selector: 'test-table',
  standalone: true,
  imports: [
    TableContainerComponent,
    KeyboardInputDirective,
    KeyboardNavigationDirective,
    NgFor,
    KeyValuePipe,
    JsonPipe
  ],
  providers: [TableService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  public readonly tableService = inject(TableService);
  public readonly document = inject(DOCUMENT);
  public readonly cdr = inject(ChangeDetectorRef);

  get itemKeysInArray(): string[] | null {
    const data = this.tableService.tableMockData;
    return data.length > 0
        ? Object.keys(data[0])
        : null;
  }
}
