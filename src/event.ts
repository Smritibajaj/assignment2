import { Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
let inputStream = new Subject();
let keydowmStream = new Subject();
let resetStream = new Subject();


const inputService = {
    next:function(value:string | undefined){
        if(value !== undefined && value.length >= 3){
            const source = ajax(`/w/api.php?origin=*&action=opensearch&search=${value}`);
            const data = source.pipe(debounceTime(250),distinctUntilChanged(),map((res:any)=> res.response[1]));
            data.subscribe((val:any)=>{
            inputStream.next({value:value,query:val}); 
        })
        }
        else{
            inputStream.next({value:value,query:[]})
        }
    }
}

const keyChange ={
    next:function(e:any){
        keydowmStream.next(e);
    }
}

const reset = {
    next:function(e:any){
        resetStream.next(e);
    }
}
export { inputStream, keydowmStream, inputService, keyChange , reset, resetStream }