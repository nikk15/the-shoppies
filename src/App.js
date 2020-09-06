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
    searching: false,
    added: false
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
      nominations: [...this.state.nominations, movie],
      added: true
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

  updateNominatedResults = (movies) => {
    let nominated = {};
    this.state.nominations.forEach(nominee => nominated[nominee.imdbID] = true);
    return movies.map(movie => nominated[movie.imdbID] ? {...movie, nominated: true} : movie)
  }

  componentDidMount(){
    let nominations = localStorage.getItem("nominations");
    if(nominations!==null){
      this.setState({nominations: JSON.parse(nominations)})
    }
  }

  componentDidUpdate(prevState){
    if((prevState.search !== this.state.search) && this.state.searching===true){
      if(this.state.search===''){
        this.setState({results: [], searching: false})
      } else {
        axios.get(`${process.env.REACT_APP_API_URL}?s=${this.state.search}&apikey=${process.env.REACT_APP_API_KEY}`)
        .then(movies => {
          if(movies.data.Search){
            this.setState({results: this.updateNominatedResults(movies.data.Search), searching: false})
          }
        })
        .catch(err => console.log(`Unable to fetch movies: ${err}`))
      }
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
          <Results 
            results={this.state.results}
            nominationHandler={this.addNomination} 
            complete={this.state.nominations.length === 5 ? true : false}
            searchInProgress={this.state.search ? true : false}
          />
          <Nominations 
            nominations={this.state.nominations}
            nominationHandler={this.removeNomination}
            added={this.state.added}
          />
        </main>
        <footer>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></footer>
      </div>
    );
  }
}

export default App;
