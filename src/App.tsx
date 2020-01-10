import React from 'react';
import './App.css';
import Autocomplete from './AutoComplete';
import { inputStream, keydowmStream, inputService } from './event';
interface Props { }
interface State {
    activeSuggestion:number,
    filteredSuggestions: any,
    showSuggestions: boolean,
    searchKey: string
}

class App extends React.Component<any, any>{
  constructor(props:Props){
    super(props)
  }
  state: State = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    searchKey: ''
  }
  
  componentDidMount(){
    this.initializeInputStream();
    this.initializeFocusStream();
  }

  componentDidUpdate(){
    this.initializeInputStream();
  }
  initializeInputStream() {
    const suggestions  = [
      "Alligator",
      "Bask",
      "Crocodilian",
      "Death Roll",
      "Eggs",
      "Jaws",
      "Reptile",
      "Solitary",
      "Tail",
      "Wetlands"
    ];
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(this.state.searchKey.toLowerCase()) > -1
    );
    inputStream.subscribe((val:any) => {
      console.log(val);
      this.setState({
        showSuggestions: true,
        searchKey: val.value,
        filteredSuggestions:val.query
      });
    });
  }

  initializeFocusStream() {
    keydowmStream.subscribe((e:any) =>{
      console.log(e);
      const { activeSuggestion , filteredSuggestions } = this.state;
      if (e.keyCode === 13) {
        this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          searchKey: filteredSuggestions[activeSuggestion]
        });
        // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        searchKey: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
      }
      console.log("state is ",this.state);
    })
  }

  render() {
    const {showSuggestions , searchKey , filteredSuggestions, activeSuggestion } = this.state;
    let suggestionsListComponent:any =( showSuggestions && searchKey.length>3) && (filteredSuggestions.length) ? (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion:any, index:any) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                  <li
                  data-value={suggestion}
                  className={className}
                  key={suggestion}
                  onClick={(e)=> {inputService.next(e.currentTarget.dataset.value)}}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        ) : 
       (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );


    return (
      <div className="App">
        <Autocomplete searchValue={this.state.searchKey} suggestionsListComponent={suggestionsListComponent}/>
        <div>You are Searching "{this.state.searchKey}"</div>
      </div>
    );
  }
}

export default App;
