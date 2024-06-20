import React, {} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.$show ? 'block' : 'none')};
  z-index: 999;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #005377;
  color: #fff;
  width: 400px;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 1.2em;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.2em;

  &:hover {
    filter: brightness(0.7); 
  }

  &:active {
    filter: brightness(0.5);
  }
`;

const ReasonButton = styled.button`
  background: #ff4d4f;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 1em;
  margin-top: 10px;

  &:hover {
    background-color: #FF4F41;
  }
`;

const reasons = [
  'Оплата счета',
  'Вопрос по меню',
  'Прочее'
];

const WaiterCallModal = ({ show, onClose, onSubmit }) => {
  const handleReasonClick = (reason) => {
    onSubmit(reason);
    onClose();
  };

  return (
    <ModalOverlay $show={show} onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <span>Вызвать официанта</span>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
        </ModalHeader>
        {reasons.map(reason => (
          <ReasonButton
            key={reason}
            onClick={() => handleReasonClick(reason)}
          >
            {reason}
          </ReasonButton>
        ))}
      </ModalContent>
    </ModalOverlay>
  );
};

export default WaiterCallModal;
