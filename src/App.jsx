import Header from "./components/Header";
import SideNav from "./components/SideNav";
import PokeCard from "./components/PokeCard";
import { useState } from "react";
import './App.css';

function App() {

  const [selectedPokemon, setSelectedPokemon] = useState(0)
  const [showSideMenu, setshowSideMenu] = useState(false)

  function handleToggleMenu(){
    setshowSideMenu(!showSideMenu)
  }

  function handleCloseMenu(){
    setshowSideMenu(false)
  }

  return (
    <>
      <Header handleToggleMenu={handleToggleMenu}/>
      <SideNav  
        selectedPokemon={selectedPokemon} 
        setSelectedPokemon={setSelectedPokemon} 
        showSideMenu={showSideMenu}
        handleCloseMenu={handleCloseMenu}
      />
      <PokeCard selectedPokemon={selectedPokemon}/>
    </>
  )
}

export default App
