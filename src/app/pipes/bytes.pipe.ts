import { Pipe, PipeTransform } from '@angular/core';

const units: string[] = ['B', 'KB', 'MB', 'GB', 'TB'];

@Pipe({
    name: 'bytes',
})
export class BytesPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        // const index = Math.floor(Math.log10(value) / 3);// this will give base 10 calculation.
        const index = Math.floor(Math.log2(value) / 10);
        const bytesToTheUnit = value / Math.pow(1024, index);
        return bytesToTheUnit.toFixed(2) + ' ' + units[index];
    }
}
