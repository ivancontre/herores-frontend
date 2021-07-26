import { mount } from "enzyme";
import React from 'react';
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/heroes/HeroScreen";

// MemoryRouter: Se utiliza en las pruebas cuando queremos usar un useParams o useHistory para acceder a los datos de los parametros
// Si el componente a probar no tiene history en sus props entonces se debe falsear su history
describe('Pruebas en <HeroScreen />', () => { 
    

    test('debe de mostrarse Redirect si no hay argumentos en el URL', () => {

        const historyMock = {
            length: 10,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={ historyMock } />
            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find('Redirect').exists()).toBe(true)
    })

    test('debe de mostrar un hero si el parámetro existe y se encuentra', () => {

        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={ HeroScreen } />
            </MemoryRouter>
        )

        expect(wrapper.find('.row').exists()).toBe(true)

    })

    test('debe de regresar a la pantalla anterior con PUSH', () => {

        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={ (props) => <HeroScreen history={ historyMock } /> } />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(historyMock.push).toHaveBeenCalled();

        expect(historyMock.goBack).not.toHaveBeenCalled();
        
    })
    
    test('debe de regresar a la pantalla anterior con goBack', () => {

        const historyMock = {
            length: 10,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={ (props) => <HeroScreen history={ historyMock } /> } />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(historyMock.push).not.toHaveBeenCalled();

        expect(historyMock.goBack).toHaveBeenCalled();
        
    })
    

    test('debe de llamar el redirect si el hero no existe', () => {
        
        const historyMock = {
            length: 10,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider1212']}>
                <Route path="/hero/:heroId" component={ (props) => <HeroScreen history={ historyMock } /> } />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('')
    })
    
})
