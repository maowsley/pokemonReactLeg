import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',

      pokemonTimer: 10
    }
  }


  componentDidMount = () => {
    
    
    this.fetchPokemon();
    
    this.clockTimer.bind();
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,


          pokemonTimer: 10
        })
      })
      .catch((err) => console.log(err))
  }


  clockTimer = () => {

    let clockCountdown = setInterval(()  => {
      if (this.state.pokemonTimer > 0) {
        this.setState({


          pokemonTimer: this.state.pokemonTimer -1});
        } else if (this.state.time  === 0) {
          clearInterval(clockCountdown)}




      }, 1000)
  }
  

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.fetchPokemon(); this.clockTimer()}}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
              {this.state.pokemonTimer}
        <div className={'pokeWrap'}>
          <img className={'pokeImg'}  style={this.state.pokemonTimer === 0 ? {filter: 'brightness(80%)' } : {filter: 'brightness(0%)'}} 
          
          
          src={this.state.pokeSprite} />
          <h1 className={'pokeName'} style={this.state.pokemonTimer === 0 ? {opacity: 2} : {opacity: 0}}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;