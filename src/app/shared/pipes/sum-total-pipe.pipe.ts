import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumTotal'
})
export class SumTotalPipe implements PipeTransform {

  transform(elementos: any[], property: string): number {
    return elementos.reduce((acc, elemento) => acc + elemento[property], 0);
  }
}