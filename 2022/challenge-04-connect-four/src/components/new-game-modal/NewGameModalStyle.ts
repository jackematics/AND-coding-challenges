import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

export const ModalContent = styled.div`
  width: 500px;
  background-color: #fff;
`;

export const ModalHeader = styled.div`
  padding: 10px;
`;

export const ModalTitle = styled.h4`
  margin: 0;
  font-weight: 900;
`;

export const ModalFooter = styled.div`
  padding: 10px;
`;

export const ModalBody = styled.div`
  padding: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;
