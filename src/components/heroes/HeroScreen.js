import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = ( { history } ) => {

    const { heroId } = useParams();

    //const hero = getHeroById(heroId);

    const hero = useMemo(() => getHeroById(heroId), [ heroId ]);

    if (!hero) {
        return <Redirect to="/" />
    }

    const {
        id,
        superhero, 
        publisher, 
        alter_ego,
        first_appearance,
        characters
    } = hero;

    const handleReturn = () => {

        if (history.length <= 2) {
            const publisher = id.split('-')[0]; 

            history.push(`/${publisher}`);
        } else {
            history.goBack();
        }
        
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img className="img-thumbnail animate__animated animate__fadeInLeft" src={ `../assets/heroes/${ id }.jpg`} alt={ superhero }/>
            </div>

            <div className="col-8">
                <h3> { superhero } </h3>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <b> Alter ego: </b> { alter_ego }
                    </li>

                    <li className="list-group-item">
                        <b> Publisher: </b> { publisher }
                    </li>

                    <li className="list-group-item">
                        <b> First appearance: </b> { first_appearance }
                    </li>


                </ul>

                <h5> Characters </h5>

                <p> { characters } </p>

                <button
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Return
                </button>
            </div>
        </div>

        
    )
}
