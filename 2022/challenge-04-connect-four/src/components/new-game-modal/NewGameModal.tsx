import { ModalTextContent } from "../../types";
import { Button } from "../connect-four-grid/ConnectFourGridStyle";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from "./NewGameModalStyle";

const GameEndModal = (props: {
  show: boolean;
  modalTextContent: ModalTextContent;
  newGameCallback: () => void;
}) => {
  if (!props.show) {
    return null;
  }

  return (
    <Modal>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalHeader>{props.modalTextContent.title}</ModalHeader>
        </ModalHeader>
        <ModalBody>{props.modalTextContent.body}</ModalBody>
        <ModalFooter>
          <Button onClick={props.newGameCallback}>New Game</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameEndModal;
