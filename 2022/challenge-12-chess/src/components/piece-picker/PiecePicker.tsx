import { useRef, useState } from 'react';
import { Piece } from './PieceStyle';
import { AllPiecesMetadata } from './types/all-pieces-metadata';
import PieceType from '../../enums/piece';

const PiecePicker = () => {
  const selectedPiece = useRef<PieceType>(PieceType.Null);
  const [allPiecesMetadata, setAllPiecesMetadata] = useState<AllPiecesMetadata>(
    {
      [PieceType.Pawn]: {
        src: '/assets/pawn-white.png',
        alt: PieceType.Pawn,
        highlight: '',
      },
      [PieceType.Rook]: {
        src: '/assets/rook-white.png',
        alt: PieceType.Rook,
        highlight: '',
      },
      [PieceType.Knight]: {
        src: '/assets/knight-white.png',
        alt: PieceType.Knight,
        highlight: '',
      },
      [PieceType.Bishop]: {
        src: '/assets/bishop-white.png',
        alt: PieceType.Bishop,
        highlight: '',
      },
      [PieceType.Queen]: {
        src: '/assets/queen-white.png',
        alt: PieceType.Queen,
        highlight: '',
      },
      [PieceType.King]: {
        src: '/assets/king-white.png',
        alt: PieceType.King,
        highlight: '',
      },
    }
  );

  const highlightSelected = (currentPieceKey: string) => {
    const paleGreyRgb = 'rgb(192, 192, 192)';
    setAllPiecesMetadata((prevMetadata) => ({
      [PieceType.Pawn]: { ...prevMetadata.pawn, highlight: '' },
      [PieceType.Rook]: { ...prevMetadata.rook, highlight: '' },
      [PieceType.Knight]: { ...prevMetadata.knight, highlight: '' },
      [PieceType.Bishop]: { ...prevMetadata.bishop, highlight: '' },
      [PieceType.Queen]: { ...prevMetadata.queen, highlight: '' },
      [PieceType.King]: { ...prevMetadata.king, highlight: '' },
      [currentPieceKey]: {
        //@ts-ignore
        ...prevMetadata[currentPieceKey],
        highlight: paleGreyRgb,
      },
    }));
  };

  const handlePieceClick = (
    e: React.MouseEvent<HTMLElement>,
    currentPieceKey: string
  ) => {
    e.preventDefault();
    highlightSelected(currentPieceKey);
    selectedPiece.current = currentPieceKey as PieceType;
  };

  return (
    <>
      {Object.entries(allPiecesMetadata).map(([key, value]) => (
        <div>
          <Piece
            src={value.src}
            alt={value.alt}
            highlight={value.highlight}
            onClick={(e) => handlePieceClick(e, key)}
          />
        </div>
      ))}
    </>
  );
};

export default PiecePicker;
