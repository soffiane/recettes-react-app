import React from 'react';

const Card = ({details}) => {
    //pour la mise en forme de detail ingredient et instructions : li pour liste
    const ingredients = details.ingredients.split(",").map(item => <li key={item}>{item}</li>)

    const instructions = details.instructions.split("\n").map(item => <li key={item}>{item}</li>)

    //si on ne trouve pas l'image,on charge une image par defaut
    const requireImage = chemin => {
        try {
            return require(`../img/${chemin}`)
        } catch (err) {
            return require(`../img/default.jpeg`)
        }
    }
    return (
            <div className="card">
                <div className="image">
                    {/* chemin de l'image dynamique importé via Webpack */}
                    <img src={requireImage(details.image)} alt="{details.nom}"/>
                </div>
                <div className="recette">
                    <h2>{details.nom}</h2>
                    {/* ul pour liste */}
                    <ul className="liste-ingredients">
                        {ingredients}
                    </ul>
                    {/* ol pour une liste numerotée */}
                    <ol className="liste-instruction">
                    {instructions}
                    </ol>
                </div>
            </div>
    );
};

export default Card;