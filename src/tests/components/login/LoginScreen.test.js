import React from 'react';
import { mount } from "enzyme"
import { LoginScreen } from "../../../components/login/LoginScreen"
import { AuthContext } from '../../../auth/AuthContext';

describe('Pruebas en <LoginScreen />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const historyMock = {
        replace: jest.fn()
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ historyMock } />
        </AuthContext.Provider>
    
    );
    
    test('debe de mostrarse correctamente ', () => {
        
        expect(wrapper).toMatchSnapshot()
        
    })

    test('debe de realizar el dispatch y la navegación', () => {

        const handle = wrapper.find('button').prop('onClick');

        handle();

        expect(contextValue.dispatch).toHaveBeenCalled();
        expect(historyMock.replace).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');

        handle();

        expect(historyMock.replace).toHaveBeenCalledWith('/dc');

        
    })
    
    
    
})
