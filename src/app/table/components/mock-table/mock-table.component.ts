import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { TableContainerComponent } from '../table-container.component';
import { AssetsService } from '../../../shared/services/assets.service';
import { ElementEditableByKeyboardDirective } from '../../../shared/directives/element-editable-by-keyboard.directive';
import { TableKeyboardNavigationDirective } from '../../directives/table-keyboard-navigation.directive';
import { TableActiveCellDirective } from '../../directives/table-active-cell.directive';
import { ObjectKeysPipe } from '../../../shared/pipes/object-keys.pipe';
import { MockData } from './mock-data.interface';
import { map } from 'rxjs';
import { ElementEditableBlurDirective } from '../../../shared/directives/element-editable-blur.directive';

type MockTableData = {
  tableMockData: MockData[]
}

@Component({
  selector: 'test-table',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    KeyValuePipe,
    ObjectKeysPipe,
    TableActiveCellDirective,
    TableKeyboardNavigationDirective,
    ElementEditableBlurDirective,
    ElementEditableByKeyboardDirective,
    TableContainerComponent
  ],
  templateUrl: './mock-table.component.html',
  styleUrl: './mock-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MockTableComponent {
  private readonly assetsService = inject(AssetsService);
  
  readonly tableMockData$ = this.assetsService.getJSON<MockTableData>('table-data').pipe(
    map(({ tableMockData }) => tableMockData)
  );
}
