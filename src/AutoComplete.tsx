import React,{ Component } from 'react';
import { keyChange, inputService } from './event';
interface State {};
interface Props{
    suggestionsListComponent?:any,
    searchValue?:string
}; 
class Autocomplete extends Component<any, any>{
    constructor(props:Props){
        super(props);
    }
render(){
    return(
        <div className="center">
            <input type="text" value={this.props.searchValue} placeholder="Enter to search" onChange= {e => inputService.next(e.target.value)} onKeyUp={e=> keyChange.next(e)} />
            {this.props.suggestionsListComponent}
        </div>
    )
}
}   

export default Autocomplete;