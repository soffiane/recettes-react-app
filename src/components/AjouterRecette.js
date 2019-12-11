import React, { Component } from 'react';

class AjouterRecette extends Component {
    //le formulaire a creer pour ajouter une recette
    state = {
        nom: '',
        image: '',
        ingredients: '',
        instructions: ''
    }
    //on va ecrire cette methode pour qu'elle s'adapte au champ modifié
    handleChange = event => {
        //event contient le nom du champ modifié dans name et le nouveau texte/valeur dans value
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    //ensuite on ajoute la recette à la liste de recette
    handleSubmit = event => {
        //on annule submit par defaut du form
        event.preventDefault()
        const recette = { ...this.state }
        this.props.ajouterRecette(recette)
        //Reset du form
        Object.keys(recette).forEach(key => {
            recette[key] = ''
        })
        this.setState({...recette})

    }

    render() {
        return (
            <div>
                <div className="card">
                    <form className="admin-form ajouter-recette" onSubmit={this.handleSubmit}>
                        {/* placeholder est la valeur initiales du champ en gris Ctrl+F2 pour ecrire sur plusieurs lignes */}
                        <input onChange={this.handleChange} value={this.state.nom} name='nom' type="text" placeholder='Nom de la recette' />
                        <input onChange={this.handleChange} value={this.state.image} name='image' type="text" placeholder="Nom de l'image" />
                        <textarea onChange={this.handleChange} value={this.state.ingredients} name="ingredients" rows="3" placeholder="Liste des ingrédients"></textarea>
                        <textarea onChange={this.handleChange} value={this.state.instructions} name="instructions" rows="15" placeholder="Liste des instructions"></textarea>
                        <button type='submit'>Ajouter recette</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AjouterRecette;