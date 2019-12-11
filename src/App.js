import React from 'react'
// CSS
import './App.css'
import Header from './components/Header'
import Admin from './components/Admin'
import Card from './components/Card'
import withFirebase from './hoc/withFirebase'

import PropTypes from 'prop-types'

import ColorContext from './components/Color'

//sous la forme d'une fonction et non plus d'une class avec le HOC
//plus besoin de this, on accede directement aux props
//soit on met props en parametre de la fonction flechée et on accede au props avec props.xxxxx
//soit on destructure les props et on acced aux valeurs directement par xxxx
const App = ({ recettes,
  match,
  modifierRecette,
  ajouterRecette,
  chargerExemple,
  supprimerRecette }) => {
  const cards = Object.keys(recettes)
    .map(key => <Card key={key} details={recettes[key]}></Card>)

  //en react, on ne peut rendre qu'un seul element qui va englober les autres : ici la balise div
  //tout le jsx dans le return n'est en fait qu'une fonction qui va faire un createElement
  //on peut utiliser la balise Fragment comme un component pour englober le tout et ne genere pas de code html en plus
  //typiquement on pourrait tout mettre dans une div mais on aura dans le rendu html une div vide
  //on peut aussi utiliser des balises vides <> et </> mais c'est pas clair
  return (
    //App a acces au context ColorCOntext
    <ColorContext>
    <div className='box'>
      <Header pseudo={match.params.pseudo}></Header>
      <div className='cards'>
        {cards}
      </div>
      <Admin
        recettes={recettes}
        modifierRecette={modifierRecette}
        ajouterRecette={ajouterRecette}
        chargerExemple={chargerExemple}
        supprimerRecette={supprimerRecette}
        pseudo={match.params.pseudo} />
    </div>
    </ColorContext>
  )
}
/*
class App extends Component {

  /*constructor(props){
    super(props)
    this.state = {
      pseudo: this.props.match.params.pseudo,
      update: false

    }

  }*/

/*state = {
  pseudo: this.props.match.params.pseudo,
  recettes : {}
}*/



/*render () {
  //on est passé de state a props en utilisant le HOC withFirebase, on accede a recette via props chargé dans le HOC
  const cards = Object.keys(this.props.recettes)
  .map(key => <Card key={key} details={this.props.recettes[key]}></Card>)*/

//en react, on ne peut rendre qu'un seul element qui va englober les autres : ici la balise div
//tout le jsx dans le return n'est en fait qu'une fonction qui va faire un createElement
//on peut utiliser la balise Fragment comme un component pour englober le tout et ne genere pas de code html en plus
//typiquement on pourrait tout mettre dans une div mais on aura dans le rendu html une div vide
//on peut aussi utiliser des balises vides <> et </> mais c'est pas clair
/*return (
  <Fragment>
  <div className='box'>
    <Header pseudo={this.props.match.params.pseudo}></Header>
    <div className='cards'>
      {cards}
    </div>
    <Admin 
    recettes={this.props.recettes} 
    modifierRecette={this.modifierRecette} 
    ajouterRecette={this.props.ajouterRecette} 
    chargerExemple={this.props.chargerExemple}
    supprimerRecette={this.props.supprimerRecette}
    pseudo={this.props.match.params.pseudo}/>
  </div>
  </Fragment>
)
}
}*/
/*PropTypes : validation des props de l'application
App.PropTypes = {
  recettes: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  modifierRecette: PropTypes.func.isRequired,
  ajouterRecette: PropTypes.func.isRequired,
  chargerExemple: PropTypes.func.isRequired,
  supprimerRecette: PropTypes.func.isRequired
}*/
//le component HOC
const WrappedComponent = withFirebase(App)

export default WrappedComponent /*App*/