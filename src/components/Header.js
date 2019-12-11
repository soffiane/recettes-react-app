import React, { Component } from 'react';
//on va utiliser le contexte dans le rendu
import { ColorContext } from './Color'
//ce compoenent permet d'afficher le header de la page
class Header extends Component {
    render() {
        const { pseudo } = this.props
        //ecrire une fonction javascript qui permet de formatter correctement le header
        //exemple : boite a recette d'Alex ou de Soffiane
        const formatPseudo = pseudo => /[aeiouy]/.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo} `
        return (
            <ColorContext.Consumer>
            {/* on passe une fonction entre les balise ColorContext qui va englober le jsx */}
                {context => (
                    <header style={{backgroundColor: context.state.color}}>
                        <h1>La boite à recettes {formatPseudo(pseudo)}</h1>
                    </header>
                )}
            </ColorContext.Consumer>

        );
    }
}

export default Header;