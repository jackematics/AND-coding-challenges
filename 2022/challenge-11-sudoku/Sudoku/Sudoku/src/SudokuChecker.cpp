
#include <array>

#include "pch.h"
#include "SudokuChecker.h"
#include "SourceResult.h"
#include "Cell.h"


SudokuChecker::SudokuChecker() {
	this->sudokuDimension = 9;
	this->boxDimension = 3;
	this->boxValues = {
		new Cell(0, 0), new Cell(0, 3), new Cell(0, 6),
		new Cell(3, 0), new Cell(3, 3), new Cell(3, 6),
		new Cell(6, 0), new Cell(6, 3), new Cell(6, 6),
	};
}

SudokuChecker::~SudokuChecker() {
	for (Cell* cell : boxValues) {
		delete cell;
	}
}

template<std::size_t SIZE>
bool SudokuChecker::lineContains(std::array<int, SIZE> row, int value) {
	return std::find(row.begin(), row.end(), value) != row.end();
}

int SudokuChecker::lineMissingValue(std::array<int, 9> line) {
	for (int i = 1; i < sudokuDimension + 1; i++) {
		if (!lineContains(line, i))
			return i;
	}

	return -1;
};

bool SudokuChecker::boxContains(std::array<std::array<int, 3>, 3> box, int value) {
	for (std::array<int, 3> row : box) {
		if (lineContains(row, value)) {
			return true;
		}
	}

	return false;
};

int SudokuChecker::boxMissingValue(std::array<std::array<int, 3>, 3> box) {
	for (int i = 1; i < sudokuDimension + 1; i++) {
		if (!boxContains(box, i)) {
			return i;
		}
	}

	return -1;
}

SourceResult SudokuChecker::rowsValid(std::array<std::array<int, 9>, 9> sudoku) {
	for (int i = 0; i < sudokuDimension; i++) {
		int missingValue = lineMissingValue(sudoku[i]);
		if (missingValue != -1) 
			return SourceResult::SourceResult(
				SourceResult::Row,
				false, 
				i, 
				missingValue
			);
	}

	return SourceResult(SourceResult::Row, true);
};

std::array<int, 9> SudokuChecker::extractColumn(
	std::array<std::array<int, 9>, 9> sudoku,
	int columnIndex
) {
	std::array<int, 9> column{};

	for (int i = 0; i < sudokuDimension; i++) {
		column[i] = sudoku[i][columnIndex];
	}

	return column;
};

SourceResult SudokuChecker::colsValid(std::array<std::array<int, 9>, 9> sudoku) {
	for (int i = 0; i < sudokuDimension; i++) {
		std::array<int, 9> col = extractColumn(sudoku, i);

		int missingValue = lineMissingValue(col);
		if (missingValue != -1)
			return SourceResult::SourceResult(
				SourceResult::Column,
				false,
				i,
				missingValue
			);
	}

	return SourceResult(SourceResult::Column, true);
};

std::array<std::array<int, 3>, 3> SudokuChecker::extractBox(
	std::array<std::array<int, 9>, 9> sudoku,
	int rowIndex,
	int colIndex
) {
	std::array<std::array<int, 3>, 3> box{};

	for (int i = rowIndex; i < rowIndex + boxDimension; i++) {
		for (int j = colIndex; j < colIndex + boxDimension; j++) {
			box[i - rowIndex][j - colIndex] = sudoku[i][j];
		}
	}

	return box;
};

SourceResult SudokuChecker::boxesValid(std::array<std::array<int, 9>, 9> sudoku) {
	for (int i = 0; i < boxValues.size(); i++) {
		std::array<std::array<int, 3>, 3> box = extractBox(
			sudoku,
			boxValues[i]->getRow(),
			boxValues[i]->getColumn()
		);

		int missingValue = boxMissingValue(box);
		if (missingValue != -1)
			return SourceResult::SourceResult(
				SourceResult::Box,
				false,
				i,
				missingValue
			);
	}

	return SourceResult(SourceResult::Box, true);
};

ValidationResult SudokuChecker::sudokuValid(std::array<std::array<int, 9>, 9> sudoku) {
	return ValidationResult(
		rowsValid(sudoku), 
		colsValid(sudoku),
		boxesValid(sudoku)
	);
};