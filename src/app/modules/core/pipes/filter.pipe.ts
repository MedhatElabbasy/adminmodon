import { JsonPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString:string, propName:string): any {
    if(value.lenght===0 ||filterString===''){
      return value;
    }
    const Result=[]
    for(const item of  value){

      if(item[propName]===filterString){
        Result.push(item);
      }
    }
    return  Result;

  }

}
