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
    let updatedResults = this.state.results.map(result => {
      if(movie.imdbID === result.imdbID){
        return {...result, nominated: true}
       } else{ 
         return result;
       }
    })
    this.setState({
      results: updatedResults,
      nominations: [...this.state.nominations, movie]
    }, () => localStorage.setItem("nominations", JSON.stringify(this.state.nominations)))
  }

  removeNomination = (movie) => {
    let updatedResults = this.state.results.map(result => {
      if(movie.imdbID === result.imdbID){
        return {...result, nominated: false}
       } else{ 
         return result;
       }
    })
    let updatedNominations = this.state.nominations.filter(noms => noms.imdbID!==movie.imdbID)
    this.setState({
      results: updatedResults,
      nominations: updatedNominations
    }, () => localStorage.setItem("nominations", JSON.stringify(this.state.nominations)))
  }

  componentDidMount(){
    let nominations = localStorage.getItem("nominations");
    if(nominations!==null){
      this.setState({nominations: JSON.parse(nominations)})
    }
  }

  componentDidUpdate(prevState){
    if((prevState.search !== this.state.search) && this.state.searching===true){
      axios.get(`${process.env.REACT_APP_API_URL}?s=${this.state.search}&apikey=${process.env.REACT_APP_API_KEY}`)
      .then(movies => {
        if(movies.data.Search){
          this.setState({results: movies.data.Search, searching: false})
        }
      })
    }
  }
  
  render(){
    return (
      <div className="App">
        {this.state.nominations.length !== 5 
          ? <Search searchHandler={this.handleSearch}/>
          : <Banner nominees={this.state.nominations}/>
        }
        <main className="main">
          {/* include a loading fill here */}
          <Results 
            results={this.state.results}
            nominationHandler={this.addNomination} 
            complete={this.state.nominations.length === 5 ? true : false}
          />
          {/* Placeholder trophy image or message here when no noms? */}
          <Nominations 
            nominations={this.state.nominations}
            nominationHandler={this.removeNomination}
          />
        </main>
      </div>
    );
  }
}

export default App;


// attribute to add
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
/* <div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */