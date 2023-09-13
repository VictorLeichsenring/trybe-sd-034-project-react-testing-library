import { screen, render } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe(' Teste o componente <NotFound.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const element = screen.getByText('Page requested not found');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('H2');
  });
  test('Teste se a página mostra a imagem com o texto alternativo ', () => {
    const { container } = render(<NotFound />);
    const image = container.querySelector('img');
    expect(image?.alt).toBe("Clefairy pushing buttons randomly with text I have no idea what i'm doing");
  });
});
