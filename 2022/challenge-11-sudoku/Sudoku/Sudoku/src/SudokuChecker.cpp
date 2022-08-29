
#include <array>

#include "pch.h"
#include "SudokuChecker.h"


SudokuChecker::SudokuChecker()
	: sudokuDimension(9), boxDimension(3) {}

template<std::size_t SIZE>
bool SudokuChecker::lineContains(std::array<int, SIZE> row, int value) {
	return std::find(row.begin(), row.end(), value) != row.end();
}

bool SudokuChecker::lineValid(std::array<int, 9> line) {
	for (int i = 1; i < sudokuDimension + 1; i++) {
		if (!lineContains(line, i))
			return false;
	}

	return true;
};

bool SudokuChecker::boxContains(std::array<std::array<int, 3>, 3> box, int value) {
	for each (std::array<int, 3> row in box)
	{
		if (lineContains(row, value)) {
			return true;
		}
	}

	return false;
};

bool SudokuChecker::boxValid(std::array<std::array<int, 3>, 3> box) {
	for (int i = 1; i < sudokuDimension + 1; i++) {
		if (!boxContains(box, i)) {
			return false;
		}
	}

	return true;
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