import React, { useMemo } from 'react';
import { getHeroesByPublisher } from '../../selectors/getHerosByPublisher';
import { HeroCard } from './HeroCard';


export const HeroList = ({ publisher }) => {

    //const heroes = getHeroesByPublisher(publisher);

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [ publisher ]);

    return (
        <div className="card-columns animate__animated animate__fadeIn">
            {
                heroes.map( hero => (
                    // con { ...hero } le paso todos los parametros desestructurados al componente
                    <HeroCard key={ hero.id } { ...hero } />
                ))
            }
        </div>
    )
};