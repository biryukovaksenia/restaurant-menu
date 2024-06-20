import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Card = styled.div`
  background: #f4e1c4;
  color: #005377;
  border-radius: 8px;
  overflow: hidden;
  margin: 20px;
  width: 350px;
  box-shadow: 0 4px 8px rgb(226, 202, 167);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgb(255, 111, 97);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5em;
  font-family: 'Open Sans', sans-serif;
`;

const Description = styled.p`
  font-size: 0.9em;
  color: #bbb;
  margin: 10px 0;
  font-family: 'Open Sans', sans-serif;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Price = styled.div`
  font-size: 1.2em;
  font-family: 'Open Sans', sans-serif;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background: #ff6f61;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2em;
  width: 40px;
  height: 40px;

  &:hover {
    background-color: #FF4F41;
  }
`;

const MenuCard = ({ item, onAddToOrder, onRemoveFromOrder }) => (
  <Card>
    <Image src={`/images/${item.image}`} alt={item.name} />
    <Content>
      <div>
        <Title>{item.name}</Title>
        <Description>{item.description}</Description>
      </div>
      <Footer>
        <Price>{item.price} ₽</Price>
        <ButtonGroup>
          <Button onClick={() => onRemoveFromOrder(item)}>
            <FontAwesomeIcon icon={faMinus} />
          </Button>
          <Button onClick={() => onAddToOrder(item)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </ButtonGroup>
      </Footer>
    </Content>
  </Card>
);

export default MenuCard;
