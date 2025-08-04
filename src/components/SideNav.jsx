import { useState } from "react";
import {first151Pokemon, getFullPokedexNumber} from "../utils";

const SideNav = ({selectedPokemon, setSelectedPokemon, showSideMenu, handleCloseMenu}) => {

  const [searchValue, setSearchValue] = useState('')

  const filteredPokemon = first151Pokemon.filter((ele, eleIndex)=>{
    if(getFullPokedexNumber(eleIndex).includes(searchValue)) return true
    if(ele.includes(searchValue)) return true
    return false
  })

  return (
    <nav className={`side-nav ${showSideMenu ? "open" : ""}`}>
      <div className="side-nav-header">
        <button onClick={handleCloseMenu} className="close-button">
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <h1 className="title">Pokédex</h1>
      </div>
      <input className="search-input" placeholder="E.g. 001 bulbasaur" value={searchValue} onChange={(event)=>{
        setSearchValue(event.target.value)
      }}/>
      <div className="pokemon-list">
        {filteredPokemon.map((pokemon, pokeIndex)=>{
          const orgPokemonIndex = first151Pokemon.indexOf(pokemon)
          return (
          <button 
            onClick={()=> {
              setSelectedPokemon(orgPokemonIndex)
              handleCloseMenu()
            }} 
            key={pokeIndex} 
            className={`pokemon-button ${selectedPokemon === orgPokemonIndex ? "active" : ""}`}
          >
            <p>{getFullPokedexNumber(orgPokemonIndex)}</p>
            <p>{pokemon}</p>
          </button>
          )
        })}
      </div>
    </nav>
  )
}

export default SideNav





