import { useEffect, useState } from "react"
import {getPokedexNumber, getFullPokedexNumber} from "../utils";
import TypeCard from "./TypeCard";
import Modal from "./Modal";

const PokeCard = ({selectedPokemon}) => {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [skill, setSkill] = useState(null)
  const [loadingSkill, setLoadingSkill] = useState(false)

  const { name, stats, types, moves, sprites } = data || {}

  const imgList = Object.keys(sprites || {}).filter((val)=>{
    if(!sprites[val]) return false
    if(['versions', 'other'].includes(val)) return false
    return true
  })

  async function fetchMoveData(move, moveUrl){
    if(loading || !localStorage || !moveUrl) return

    let cache = {}

    if(localStorage.getItem('pokemon-moves')){
      cache = JSON.parse(localStorage.getItem('pokemon-moves'))
    }

    if(move in cache){
      setSkill(cache[move])
      console.log("skill found in cache")
      return
    }

    try{
      setLoadingSkill(true)
      const res = await fetch(moveUrl)
      const moveData = await res.json()
      console.log("skill fetched successfully through API", moveData)
      

      const entries = moveData?.flavor_text_entries || [];
      const match = entries.find(entry => 
        entry.version_group.name === 'firered-leafgreen' && entry.language.name === 'en'
      );
      const description = match?.flavor_text;

      const skillData = {
        name: move, description
      }

      setSkill(skillData)
      cache[move] = skillData
      localStorage.setItem('pokemon-moves', JSON.stringify(cache))

    }catch(error){
      console.log(error.message)

    }finally{
      setLoadingSkill(false)
    }
  }

  useEffect(()=>{

    if(loading || !localStorage) return
    
    let cache = {}

    const cachedData = localStorage.getItem('pokedex')
    if (cachedData) {
      cache = JSON.parse(cachedData)
    }

    if (selectedPokemon in cache) {
      setData(cache[selectedPokemon])
      return
    }

    async function fetchPokemonData() {
      setLoading(true)
      try {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + getPokedexNumber(selectedPokemon)
        const response = await fetch(url)
        const pokemonData = await response.json()
        setData(pokemonData)

        cache[selectedPokemon] = pokemonData
        localStorage.setItem('pokedex', JSON.stringify(cache))
      } catch (error) {
        console.error("Error fetching Pokémon:", error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonData()
  }, [selectedPokemon])

  if (loading || !data) {
    return <div>Loading...</div>
  }
    
  return (
    <div className="pokecard">
      {skill &&
        <Modal handleCloseModal={()=>{setSkill(null)}}>
          <div className="modal-section">
            <h6>Name</h6>
            <h2>{skill.name.replaceAll('-', ' ')}</h2>
          </div>
          <div>
            <h6 className="modal-section">Description</h6>
            <p>{skill.description}</p>
          </div>
        </Modal>
      }

      <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
      <h2>{name}</h2>
      <div className="pokecard-type-list">
        {types.map((typeObj, typeIndex)=>{
          return (
            <TypeCard key={typeIndex} type={typeObj?.type?.name}/>
          )
        })}
      </div>
      <img className="pokecard-large-img" src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) +'.png' } alt={`${name} - Large Image`} />
      <div className="pokecard-sprites">
        {imgList.map((spriteUrl, spriteIndex)=>{
          const imgUrl = sprites[spriteUrl]
          return(
                <img key={spriteIndex} src={imgUrl} alt={`${name}-img-${spriteUrl}`} />
          )
        })}
      </div>
      <h3>Stats</h3>
      <div className="pokecard-stats">
        {stats.map((statObj, statIndex)=>{
          const {base_stat, stat} = statObj
          return(
            <div key={statIndex}>
              <h4>{stat?.name?.replaceAll('-', ' ')}</h4>
              <p>{base_stat}</p>
            </div>
          )
        })}
      </div>
      <h3>Moves</h3>
      <div className="pokecard-moves">
        {moves.map((moveObj, moveIndex)=>{
          return(
            <button key={moveIndex} onClick={()=>{
              fetchMoveData(moveObj?.move?.name, moveObj?.move?.url)
            }}>
              <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PokeCard