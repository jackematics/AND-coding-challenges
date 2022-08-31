#pragma once
#include <array>

#include "ValidationResult.h"
#include "Cell.h"

class SudokuChecker {
private:
	int sudokuDimension;
	int boxDimension;
	std::array<Cell*, 9> boxValues;

public:
	SudokuChecker();
	~SudokuChecker();

	std::array<int, 9> extractColumn(
		std::array<std::array<int, 9>, 9> sudoku, 
		int columnIndex
	);
	std::array<std::array<int, 3>, 3> extractBox(
		std::array<std::array<int, 9>, 9> sudoku,
		int rowIndex,
		int colIndex
	);

	ValidationResult rowsValid(std::array<std::array<int, 9>, 9> sudoku);
	ValidationResult colsValid(std::array<std::array<int, 9>, 9> sudoku);
	ValidationResult boxesValid(std::array<std::array<int, 9>, 9> sudoku);

private:
	template<std::size_t SIZE>
	bool lineContains(std::array<int, SIZE> row, int value);
	bool boxContains(std::array<std::array<int, 3>, 3> box, int value);
	int lineMissingValue(std::array<int, 9> line);
	int boxMissingValue(std::array<std::array<int, 3>, 3> box);
};


