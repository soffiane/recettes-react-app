import React, { Component } from 'react';
import AjouterRecette from './AjouterRecette'
import AdminForm from './AdminForm'

import firebase from 'firebase/app'
import 'firebase/auth'
import base, { firebaseApp } from '../base'
import Login from './Login'

class Admin extends Component {
    state = {
        //UID est l'id unique d'une personne dans firebase
        uid: null,
        chef: null
    }

    //methode lancée au chargement du Component
    //il faut gerer le probleme de la perte de session (uid) quand on change de page
    //tant que l'utilisateur firebase (user) existe en arriere plan, on le recupere a chaque recharge de l'application
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.handleAuth({user})
            }
        })
    }
    //authData contient les info de connection de facebook : async pour faire des await dedans
    handleAuth = async authData => {
        // on trouve recette dans firebase
        const box = await base.fetch(this.props.pseudo, {
            context: this
        })
        //avoir au dessus du nom du chef, le dossier chef
        if (!box.chef) {
            await base.post(`${this.props.pseudo}/chef`, {
                data: authData.user.uid
            })
        }
        //mettre a jour le state : pour chef, si on l'a trouve, on le renvoie, sinon c'est le uid firebase
        this.setState({ uid: authData.user.uid, chef: box.chef || authData.user.uid })
    }
    //se connecter à l'app via firebase avec popup facebook
    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider()
        firebaseApp.auth().signInWithPopup(authProvider).then(this.handleAuth)
    }
    //se deconnecter
    logout = async () => {
        await firebase.auth().signOut()
        this.setState({ uid: null })
    }
    render() {
        const { ajouterRecette, recettes, chargerExemple, nouvelleRecette, modifierRecette, supprimerRecette } = this.props

        //logout
        const logout = <button onClick={this.logout}>Deconnecter</button>
        //Si l'utilisateur n'est pas loggué, on affiche le login facebook
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}></Login>
        }
        //si c'est le chef connecté ou pas
        if (this.state.uid !== this.state.chef) {
            return (
                <div>
                    <p>Tu n'es pas le chef de cette boite</p>
                    {logout}
                </div>
            )
        }

        return (
            <div className="cards">
                <AjouterRecette ajouterRecette={ajouterRecette}></AjouterRecette>
                {
                    Object.keys(recettes)
                        .map(key => <AdminForm
                            key={key}
                            id={key}
                            nouvelleRecette={nouvelleRecette}
                            recettes={recettes}
                            modifierRecette={modifierRecette}
                            supprimerRecette={supprimerRecette} />)
                }
                <footer>
                {logout}
                    <button onClick={chargerExemple}>Remplir</button>
                </footer>
            </div>
        );
    }
}

export default Admin;