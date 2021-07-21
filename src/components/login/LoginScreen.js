import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';



export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext(AuthContext);

    const handleLogin = () => {
        //console.log(user);
        //history.push('/');
        

        const lastPath = localStorage.getItem('lastPath') || '/'

        dispatch({
            type: types.login,
            payload: {
                name: 'Iván'
            }
        })

        // Evita que una vez loegueado si se quiere hacer un "atrás" en el navegador vaya hacia el login nuevamente
        history.replace(lastPath);


    }


    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Ingresar
            </button>
        </div>
    )
}