
const Header = ({handleToggleMenu}) => {

  return (
    <header className="header">
        <button onClick={handleToggleMenu}  className="menu-button">
          <i className="fa-solid fa-bars"></i>
        </button>
        <h1 className="title">Pokédex</h1>
    </header>
  )
}

export default Header
















