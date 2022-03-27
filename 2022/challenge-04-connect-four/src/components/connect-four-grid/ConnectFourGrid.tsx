import { useEffect, useReducer, useRef, useState } from "react";
import { Turn } from "../../constants/turn";
import ConnectFour from "../../game-engine/connect-four";
import ConnectFourAi from "../../game-engine/connect-four-ai";
import Disk from "../../game-engine/disk";
import { loseContent, winContent } from "../../helpers/modal-text-content";
import {
  GridWrapper,
  Grid,
  Row,
  GridSquare,
  PlaceholderCell,
  Cell,
  Menu,
  Button,
} from "./ConnectFourGridStyle";
import NewGameModal from "../new-game-modal/NewGameModal";

const ConnectFourGrid = (props: { game: ConnectFour }) => {
  const [playerDisk, setPlayerDisk] = useState<Disk>(Disk.RED);
  const [diskChangeDisabled, setDiskChangeDisabled] = useState<boolean>(false);
  const [turn, setTurn] = useState<Turn>(Turn.PLAYER);
  const ai = useRef<ConnectFourAi>(new ConnectFourAi(props.game, Disk.YELLOW));
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [modalTextContent, setModalTextContent] = useState(winContent);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (turn === Turn.OPPONENT) {
      ai.current.dropDiskInOptimalColumn();
      if (props.game.isConnectFour(ai.current.getDisk())) {
        setModalTextContent(loseContent);
        setShowModal(true);
      } else {
        setTurn(Turn.PLAYER);
      }
    }
  }, [turn]);

  const handleNewGame = (): void => {
    props.game.reset();
    setDiskChangeDisabled(false);
    setShowModal(false);
    setTurn(Turn.PLAYER);
    forceUpdate();
  };

  const handleDiskChange = (disk: Disk) => {
    ai.current.setDisk(disk === Disk.RED ? Disk.YELLOW : Disk.RED);
    setPlayerDisk(disk);
  };

  const colorOptions = {
    [Disk.EMPTY]: "#FFF",
    [Disk.RED]: "#e61010",
    [Disk.YELLOW]: "#FFFF00",
  };

  const handlePlayerDiskDrop = (column: number) => {
    if (turn === Turn.PLAYER) {
      props.game.dropDiskInColumn(column, playerDisk);
      if (props.game.isConnectFour(playerDisk)) {
        setModalTextContent(winContent);
        setShowModal(true);
      } else {
        setTurn(Turn.OPPONENT);
      }
      setDiskChangeDisabled(true);
    }
  };

  const placeholderCells = () => {
    let cells = [];
    for (
      let column: number = 0;
      column < props.game.getGrid()[0].length;
      column++
    ) {
      cells.push(
        <PlaceholderCell
          color={colorOptions[playerDisk]}
          hoverColor={playerDisk === Disk.RED ? "#a81818" : "#d1d117"}
          activeColor={playerDisk === Disk.RED ? "#7d1414" : "#9c9c1e"}
          onClick={() => handlePlayerDiskDrop(column)}
        />
      );
    }

    return cells;
  };

  return (
    <>
      <Menu>
        <Button onClick={handleNewGame}>New Game</Button>
        <div>
          <input
            type="radio"
            value={Disk.RED}
            name="disk"
            defaultChecked={true}
            disabled={diskChangeDisabled}
            onChange={() => handleDiskChange(Disk.RED)}
          />
          Red
          <input
            type="radio"
            value={Disk.YELLOW}
            name="disk"
            disabled={diskChangeDisabled}
            onChange={() => handleDiskChange(Disk.YELLOW)}
          />
          Yellow
        </div>
      </Menu>
      <GridWrapper>
        <Row>{placeholderCells()}</Row>
        <Grid>
          {props.game.getGrid().map((row, rowIndex) => (
            <Row>
              {props.game.getGrid()[rowIndex].map((disk: Disk) => (
                <GridSquare>
                  <Cell color={colorOptions[disk]} />
                </GridSquare>
              ))}
            </Row>
          ))}
        </Grid>
      </GridWrapper>
      <NewGameModal
        show={showModal}
        modalTextContent={modalTextContent}
        newGameCallback={() => handleNewGame()}
      />
    </>
  );
};
export default ConnectFourGrid;
