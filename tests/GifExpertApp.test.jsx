import { fireEvent, getAllByText, render, screen } from "@testing-library/react";
import { GifExpertApp } from "../src/GifExpertApp";

describe('Pruebas en GifExpertApp', () => { 
    
    test('debe de hacer match con el snapshot', () => { 
        
        const {container} = render(<GifExpertApp />);
        expect(container).toMatchSnapshot();
     });

     test('debe de agregar una nueva categoria cuando se envia el formulario', () => { 
        
        render(<GifExpertApp />);

        const input = screen.getByRole('textbox');
        const inputValue = 'Saitama';

        fireEvent.input(input, {target:{value: inputValue}});

        fireEvent.submit(input);

        expect(screen.getByText(inputValue)).toBeTruthy();

      });

      test('debe de no agregar una categoria si esta ya existe', () => { 
        
        render(<GifExpertApp/>);

        const category = 'One Punch';
        const input = screen.getByRole('textbox');

        fireEvent.input(input, {target: {value: category}});
        fireEvent.submit(input);

        const items = screen.getAllByText(category);

        expect(items.length).toBe(1);



       });

        test('debe de renderizar las categorias que se agregen con el tiempo correctamente', () => { 

            render(<GifExpertApp/>);

            const form = screen.getByRole('form');
            const input = screen.getByRole('textbox');

            fireEvent.input(input, {target:{value:'Naruto'}});
            fireEvent.submit(form);
            fireEvent.input(input, {target:{value:'Dragon Ball'}});
            fireEvent.submit(form);

            const items = screen.getAllByRole('heading', {level: 3});

            expect(items.length).toBe(3);
            expect(screen.getByText('One Punch')).toBeTruthy();
            expect(screen.getByText('Naruto')).toBeTruthy();
            expect(screen.getByText('Dragon Ball')).toBeTruthy();

        });

 });