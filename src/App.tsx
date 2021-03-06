import React from 'react';
import './App.css';
import Autocomplete from './AutoComplete';
import { inputStream, keydowmStream, inputService, resetStream, suggestionStream } from './event';
interface State {
    activeSuggestion:number,
    filteredSuggestions: any,
    showSuggestions: boolean,
    searchKey: string
}

class App extends React.Component<any, State>{
 
  state: State = {
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    searchKey: ''
  }
  
  componentDidMount(){
    this.initializeInputStream();
    this.initializeFocusStream();
    this.initializeResetStream();
  }

  initializeInputStream() {
    inputStream.subscribe((val:any) => {
      this.setState({
        showSuggestions: true,
        searchKey: val.value
      });
    });
    suggestionStream.subscribe((val:any)=>{
        this.setState({
          filteredSuggestions:val.query,
          showSuggestions: true
        })
    })
  }


  initializeResetStream(){
    resetStream.subscribe((e:any)=>{
      this.setState({
        showSuggestions: false,
        searchKey: '',
        filteredSuggestions:[]
      });
    })
  }

  initializeFocusStream() {
    keydowmStream.subscribe((e:any) =>{
      // User pressed the enter key
      const { activeSuggestion, filteredSuggestions } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        searchKey: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  })
}

  componentWillUnmount(){
    inputStream.unsubscribe();
    resetStream.unsubscribe();
    keydowmStream.unsubscribe();
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
                  onKeyDown={(e)=>{keydowmStream.next(e)}}
                  onClick={(e)=> {inputService(e.currentTarget.dataset.value)}}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        ) : 
       (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own! Kindly enter {4-this.state.searchKey.length} character to Search</em>
          </div>
        );


    return (
      <div className="App">
        <div>Search topic from Wiki</div>
        <Autocomplete searchValue={this.state.searchKey} suggestionsListComponent={suggestionsListComponent}/>
        <div>You are Searching "{this.state.searchKey}"</div>
      </div>
    );
  }
}

export default App;
