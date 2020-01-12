import React,{ Component } from 'react';
import { keyChange, inputService, resetStream, suggestionService } from './event';
interface Props{
    suggestionsListComponent?:any,
    searchValue?:string
}; 
class Autocomplete extends Component<Props, any>{
render(){
    return(
        <div className="center">
            <div className="box-container">
            <input type="text" name="autocomplete" value={this.props.searchValue} placeholder="Enter to search" onChange= {e => {console.log(e.target);inputService(e.target.value);suggestionService(e.target.value)}} onKeyUp={e=> keyChange.next(e)} />
            <div className="box" onClick={e=> resetStream.next(e)}></div>
            </div>
            {this.props.suggestionsListComponent}
        </div>
    )
}
}   

export default Autocomplete;