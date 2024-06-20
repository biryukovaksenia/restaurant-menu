import React, { useState, useEffect } from 'react';
import MenuCard from './MenuCard';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
  gap: 20px;
  justify-content: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Menu = ({ addToOrder, removeFromOrder }) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = [
            { id: 1, name: "Свежие устрицы на льду", description: "Устрицы, Лимон, Зелень. (200гр)", price: 800, image: 'anima-visual-2IXm8N5lC3s-unsplash.jpg' },
            { id: 3, name: "Креветки в чесночном соусе", description: "Креветки, Чесночный соус, Петрушка. (250гр)", price: 700, image: 'maria-labanda-hEKN_m0qGMA-unsplash.jpg' },
            { id: 4, name: "Салат с кальмарами", description: "Кальмары, Микс салатов, Оливки, Помидоры черри, Лимонный соус. (300гр)", price: 600, image: 'melissa-walker-horn-A_Xr_1HWFXo-unsplash.jpg' },
            { id: 5, name: "Лосось с овощами", description: "Лосось, Брокколи, Спаржа, Морковь, Лимон. (350гр)", price: 900, image: 'john-baker-Wu4ZBeitiyM-unsplash.jpg' },
            { id: 6, name: "Паста с морепродуктами", description: "Спагетти, Креветки, Мидии, Кальмары, Чеснок, Белое вино, Томаты. (400гр)", price: 750, image: 'adolfo-felix-l728d7AJnXM-unsplash.jpg' },
            { id: 7, name: "Ризотто с мидиями", description: "Ризотто, Мидии, Лук, Чеснок, Белое вино, Пармезан. (350гр)", price: 650, image: 'stefan-schauberger-fUAuV0btigU-unsplash.jpg' },
        ];
        setMenu(response);
      } catch (error) {
        console.error('There was an error fetching the menu!', error);
      }
    };

    fetchMenu();
  }, []);

    return (
    <MenuContainer>
      {menu.map(item => (
        <MenuCard
          key={item.id}
          item={item}
          onAddToOrder={addToOrder}
          onRemoveFromOrder={removeFromOrder}
        />
      ))}
    </MenuContainer>
  );
};

export default Menu;

