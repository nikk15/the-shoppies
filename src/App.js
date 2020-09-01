import React from 'react';
import './App.scss';
import Search from './components/Search';
import Banner from './components/Banner';
import Results from './components/Results';
import Nominations from './components/Nominations';
import axios from 'axios';

require('dotenv').config();

class App extends React.Component {
  state = {
    search: '',
    results: [],
    nominations: [],
    searching: false
  }

  handleSearch = (input) => {
    this.setState({search: input, searching: true})
  }

  addNomination = (movie) => {
    this.setState({nominations: [...this.state.nominations, movie]})
  }

  removeNomination = (movie) => {

  }


  // need to handle if there is not a poster
  componentDidUpdate(prevState){
    if((prevState.search !== this.state.search) && this.state.searching===true){
      axios.get(`${process.env.REACT_APP_API_URL}?s=${this.state.search}&apikey=${process.env.REACT_APP_API_KEY}`)
      .then(movies => {
        if(movies.data.Search){
          this.setState({results: movies.data.Search, searching: false}, ()=>console.log(this.state.results))
        }
      })
    }
  }
  
  render(){
    return (
      <div className="App">
        {this.state.nominations.length !== 5 
          ? <Search searchHandler={this.handleSearch}/>
          : <Banner />
        }
        <main className="main">
          {/* include a loading spinner here */}
          <Results 
            results={this.state.results}
            nominationHandler={this.addNomination} 
            hideButton={this.state.nominations.length === 5 ? true : false}
          />
          {/* Placeholder trophy image here when no noms */}
          <Nominations nominationHandler={this.removeNomination}/>
        </main>
      </div>
    );
  }
}

export default App;
