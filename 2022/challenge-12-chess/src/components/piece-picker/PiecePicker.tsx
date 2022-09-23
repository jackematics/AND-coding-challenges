import { useEffect, useState } from 'react';
import { Piece } from './PieceStyle';
import { AllPiecesMetadata, PieceMetadata } from './types/all-pieces-metadata';
import PieceType from '../../engine/pieces/enum/piece';
import { PiecePickerProps } from './types/piece-picker-props';
import './piece-picker.css';

const PiecePicker = ({ pieceMetadataCallback }: PiecePickerProps) => {
  const [allPiecesMetadata, setAllPiecesMetadata] = useState<AllPiecesMetadata>(
    {
      [PieceType.Null]: {
        src: '',
        alt: '',
        type: PieceType.Null,
        highlight: '',
      },
      [PieceType.Pawn]: {
        src: '/assets/pawn-white.png',
        alt: PieceType.Pawn,
        type: PieceType.Pawn,
        highlight: '',
      },
      [PieceType.Rook]: {
        src: '/assets/rook-white.png',
        alt: PieceType.Rook,
        type: PieceType.Rook,
        highlight: '',
      },
      [PieceType.Knight]: {
        src: '/assets/knight-white.png',
        alt: PieceType.Knight,
        type: PieceType.Knight,
        highlight: '',
      },
      [PieceType.Bishop]: {
        src: '/assets/bishop-white.png',
        alt: PieceType.Bishop,
        type: PieceType.Bishop,
        highlight: '',
      },
      [PieceType.Queen]: {
        src: '/assets/queen-white.png',
        alt: PieceType.Queen,
        type: PieceType.Queen,
        highlight: '',
      },
      [PieceType.King]: {
        src: '/assets/king-white.png',
        alt: PieceType.King,
        type: PieceType.King,
        highlight: '',
      },
    }
  );

  const switchColour = (e: any) => {
    const checked = e.currentTarget.checked;

    setAllPiecesMetadata((prevMetadata) => ({
      [PieceType.Null]: { ...prevMetadata[''] },
      [PieceType.Pawn]: {
        ...prevMetadata.pawn,
        src: checked ? '/assets/pawn-black.png' : '/assets/pawn-white.png',
      },
      [PieceType.Rook]: {
        ...prevMetadata.rook,
        src: checked ? '/assets/rook-black.png' : '/assets/rook-white.png',
      },
      [PieceType.Knight]: {
        ...prevMetadata.knight,
        src: checked ? '/assets/knight-black.png' : '/assets/knight-white.png',
      },
      [PieceType.Bishop]: {
        ...prevMetadata.bishop,
        src: checked ? '/assets/bishop-black.png' : '/assets/bishop-white.png',
      },
      [PieceType.Queen]: {
        ...prevMetadata.queen,
        src: checked ? '/assets/queen-black.png' : '/assets/queen-white.png',
      },
      [PieceType.King]: {
        ...prevMetadata.king,
        src: checked ? '/assets/king-black.png' : '/assets/king-white.png',
      },
    }));
  };

  const highlightSelected = (currentPieceKey: string) => {
    const paleGreyRgb = 'rgb(192, 192, 192)';
    setAllPiecesMetadata((prevMetadata) => ({
      [PieceType.Null]: { ...prevMetadata[''], highlight: '' },
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
    // @ts-ignore
    pieceMetadataCallback(allPiecesMetadata[currentPieceKey]);
  };

  const setPiece = (key: string, value: PieceMetadata): JSX.Element => {
    return value.type ? (
      <div>
        <Piece
          src={value.src}
          alt={value.alt}
          highlight={value.highlight}
          onClick={(e) => handlePieceClick(e, key)}
        />
      </div>
    ) : (
      <></>
    );
  };

  return (
    <>
      <label className="switch">
        <input type="checkbox" onClick={switchColour} />
        <span className="slider"></span>
      </label>
      {Object.entries(allPiecesMetadata).map(([key, value]) =>
        setPiece(key, value)
      )}
    </>
  );
};

export default PiecePicker;
