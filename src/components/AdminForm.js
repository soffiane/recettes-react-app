import React from 'react';

const AdminForm = ({id: key, recettes, modifierRecette, supprimerRecette}) => {

        const recette = recettes[key]
        //on recupere la recette qu'on modifie
        const handleChange = (event, key) => {
            //on destructure l'objet event pour recuperer le champ concerné et la valeur
            const { name, value } = event.target
            const recette = recettes[key]
            recette[name] = value
            modifierRecette(key, recette)

        }
        return (
            <div className="card">
                <form className="admin-form">
                    <input value={recette.nom} onChange={event => handleChange(event, key)} type="text" name='nom' placeholder='Nom de la recette' />
                    <input value={recette.image} onChange={event => handleChange(event, key)} type="text" name='image' placeholder="Adresse de l'image" />
                    <textarea value={recette.ingredients} onChange={event => handleChange(event, key)} name="ingredients" rows="3"></textarea>
                    <textarea value={recette.instructions} onChange={event => handleChange(event, key)} name="instructions" rows="15"></textarea>
                </form>
                {/* on met le lambda ici pour eviter que la fonction ne se lance au chargement de la page, uniquement au clic */}
                <button onClick={() => supprimerRecette(key)}>Supprimer</button>
            </div>
        );
};

export default AdminForm;