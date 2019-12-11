import React, { Component } from 'react';

import base from '../base'
import recettes from '../recettes'
//ce composant englobe les methodes firebase appelées dans App.js 
//il pourra resservir dans d'autres component
const withFirebase = WrappedComponent => {
    return class withFirebase extends Component {
        state = {
            pseudo: this.props.match.params.pseudo,
            recettes : {}
          }
        // le / dans le sync state correspon au "chemin" dans la BDD
        //icion va enregistrer dans le sous dossier formé par le pseudo/recettes 
        //ex soffiane/recettes
        //deuxieme paremetre est options : 1er param le context et deuxieme est le state a synchroniser
        //gerer la synchronisation d'un compte à l'autre avec this.ref
        componentDidMount() {
            this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
                context: this,
                state: 'recettes'
            })
        }

        //on evite de mettre a jour le state ici -> possible boucle infinie (ou alors avec une condition)
        componentDidUpdate() {
            console.log('component update')
        }

        //quand on change de pseudo, la connexion est terminée avec firebase
        componentWillUnmount() {
            base.removeBinding(this.ref)
        }

        ajouterRecette = recette => {
            const recettes = { ...this.state.recettes }
            recettes[`recette-${Date.now()}`] = recette
            this.setState({ recettes })
        }

        modifierRecette = (key, nouvelleRecette) => {
            const recettes = { ...this.state.recettes }
            recettes[key] = nouvelleRecette
            this.setState({ recettes })
        }

        supprimerRecette = key => {
            const recettes = { ...this.state.recettes }
            recettes[key] = null
            this.setState({ recettes })
        }

        chargerExemple = () => {
            this.setState({ recettes })
        }
        render() {
            return (
                //this.props pour etre sur de recuperer tous les props
                <WrappedComponent 
                    recettes={this.state.recettes}
                    ajouterRecette={this.ajouterRecette}
                    modifierRecette={this.modifierRecette}
                    supprimerRecette={this.supprimerRecette}
                    chargerExemple={this.chargerExemple}
                    //on passe tous les attributs ci dessous dans les props
                    {...this.props} />
            );
        }
    }
}


export default withFirebase;