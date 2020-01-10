import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, debounceTime, filter } from 'rxjs/operators';
let inputStream = new Subject();
let keydowmStream = new Subject();



const inputService = {
    next:function(value:any){
        const source = ajax(`/w/api.php?origin=*&action=opensearch&search=${value}`);
        const data = source.pipe(debounceTime(1000),map((res:any)=> res.response[1]));
        data.subscribe((val:any)=>{
            inputStream.next({value:value,query:val}); 
        })
    }
}

const keyChange ={
    next:function(e:any){
        keydowmStream.next(e);
    }
}
export { inputStream, keydowmStream, inputService, keyChange }