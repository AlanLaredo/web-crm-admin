import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countByProp'
})
export class CountByPropPipe implements PipeTransform {

  private getNestedValue(obj: any, propPath: string): any {
    const props = propPath.split('.');

    let value = obj;

    for (const prop of props) {
      if (!value) {
        return null;
      }
      value = value[prop]
    }
    return value && typeof value === 'string' ? value.trim() : null
  }

  transform(array: any[], propPath: string, value: any): number {

    if (!array || !propPath || (!value && value !== null)) {
      return 0;
    }

    return array.filter(item => {
      return this.getNestedValue(item, propPath) === value
    }).length;
  }
}
