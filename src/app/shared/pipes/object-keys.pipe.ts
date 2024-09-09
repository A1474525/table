import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys',
  standalone: true
})
export class ObjectKeysPipe implements PipeTransform {
  transform(object: Record<string, any>): string[] {
    return Object.keys(object);
  }
}
