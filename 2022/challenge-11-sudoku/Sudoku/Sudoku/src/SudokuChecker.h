#pragma once
#include <array>

class SudokuChecker {
private:
	const int sudokuDimension;
	const int boxDimension;

public:
	SudokuChecker();
	std::array<int, 9> extractColumn(
		std::array<std::array<int, 9>, 9> sudoku, 
		int columnIndex
	);
	std::array<std::array<int, 3>, 3> extractBox(
		std::array<std::array<int, 9>, 9> sudoku,
		int rowIndex,
		int colIndex
	);
	bool lineValid(std::array<int, 9> line);
	bool boxValid(std::array<std::array<int, 3>, 3> box);

private:
	template<std::size_t SIZE>
	bool lineContains(std::array<int, SIZE> row, int value);
	bool boxContains(std::array<std::array<int, 3>, 3> box, int value);
};


