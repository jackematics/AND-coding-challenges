#include <array>

#include "pch.h"
#include "SudokuChecker.h"
#include "SourceResult.h"

struct SudokuCheckerTest : testing::Test {
	SudokuChecker* checker;

	SudokuCheckerTest() {
		checker = new SudokuChecker;
	}

	~SudokuCheckerTest() {
		delete checker;
	}
};

TEST_F(SudokuCheckerTest, rowsValid) {
	std::array<std::array<int, 9>, 9> sudoku = { {
		{1, 5, 2, 4, 8, 9, 3, 7, 6},
		{7, 3, 9, 2, 5, 6, 8, 4, 1},
		{4, 6, 8, 3, 7, 1, 2, 9, 5},
		{3, 8, 7, 1, 2, 4, 6, 5, 9},
		{5, 9, 1, 7, 6, 3, 4, 2, 8},
		{2, 4, 6, 8, 9, 5, 7, 1, 3},
		{9, 1, 4, 6, 3, 7, 5, 8, 2},
		{6, 2, 5, 9, 4, 8, 1, 3, 7},
		{8, 7, 3, 5, 1, 2, 9, 6, 4},
	} };

	SourceResult result = checker->rowsValid(sudoku);

	EXPECT_TRUE(result.isValid());
	EXPECT_EQ(result.description(), "Valid rows");
}

TEST_F(SudokuCheckerTest, rowsInvalid) {
	std::array<std::array<int, 9>, 9> sudoku = { {
		{1, 5, 2, 4, 8, 9, 3, 7, 6},
		{7, 3, 9, 2, 5, 6, 8, 4, 1},
		{4, 6, 8, 3, 7, 1, 2, 9, 5},
		{3, 8, 7, 1, 7, 4, 6, 5, 9},
		{5, 9, 1, 7, 6, 3, 4, 2, 8},
		{2, 4, 6, 8, 9, 5, 7, 1, 3},
		{9, 1, 4, 6, 3, 7, 5, 8, 2},
		{6, 2, 5, 9, 4, 8, 1, 3, 7},
		{8, 7, 3, 5, 1, 2, 9, 6, 4},
	} };

	SourceResult result = checker->rowsValid(sudoku);

	EXPECT_FALSE(result.isValid());
	EXPECT_EQ(result.description(), "Invalid row: missing value 2 in row 3.");
}

TEST_F(SudokuCheckerTest, colsValid) {
	std::array<std::array<int, 9>, 9> sudoku = { {
		{1, 5, 2, 4, 8, 9, 3, 7, 6},
		{7, 3, 9, 2, 5, 6, 8, 4, 1},
		{4, 6, 8, 3, 7, 1, 2, 9, 5},
		{3, 8, 7, 1, 2, 4, 6, 5, 9},
		{5, 9, 1, 7, 6, 3, 4, 2, 8},
		{2, 4, 6, 8, 9, 5, 7, 1, 3},
		{9, 1, 4, 6, 3, 7, 5, 8, 2},
		{6, 2, 5, 9, 4, 8, 1, 3, 7},
		{8, 7, 3, 5, 1, 2, 9, 6, 4},
	} };

	SourceResult result = checker->colsValid(sudoku);

	EXPECT_TRUE(result.isValid());
	EXPECT_EQ(result.description(), "Valid columns");
}

TEST_F(SudokuCheckerTest, colsInvalid) {
	std::array<std::array<int, 9>, 9> sudoku = { {
		{1, 5, 2, 4, 8, 9, 3, 7, 6},
		{7, 3, 9, 2, 5, 6, 8, 4, 1},
		{4, 6, 8, 3, 7, 1, 2, 9, 5},
		{3, 8, 7, 1, 2, 4, 6, 5, 9},
		{5, 9, 1, 7, 6, 3, 4, 2, 8},
		{2, 4, 6, 8, 9, 5, 7, 1, 3},
		{9, 1, 4, 6, 3, 7, 5, 5, 2},
		{6, 2, 5, 9, 4, 8, 1, 3, 7},
		{8, 7, 3, 5, 1, 2, 9, 6, 4},
	} };

	SourceResult result = checker->colsValid(sudoku);

	EXPECT_FALSE(result.isValid());
	EXPECT_EQ(result.description(), "Invalid column: missing value 8 in column 7.");
}

TEST_F(SudokuCheckerTest, boxesValid) {
	std::array<std::array<int, 9>, 9> sudoku = { {
		{1, 5, 2, 4, 8, 9, 3, 7, 6},
		{7, 3, 9, 2, 5, 6, 8, 4, 1},
		{4, 6, 8, 3, 7, 1, 2, 9, 5},
		{3, 8, 7, 1, 2, 4, 6, 5, 9},
		{5, 9, 1, 7, 6, 3, 4, 2, 8},
		{2, 4, 6, 8, 9, 5, 7, 1, 3},
		{9, 1, 4, 6, 3, 7, 5, 8, 2},
		{6, 2, 5, 9, 4, 8, 1, 3, 7},
		{8, 7, 3, 5, 1, 2, 9, 6, 4},
	} };

	SourceResult result = checker->boxesValid(sudoku);

	EXPECT_TRUE(result.isValid());
	EXPECT_EQ(result.description(), "Valid boxs");
}

TEST_F(SudokuCheckerTest, boxesInvalid) {
	std::array<std::array<int, 9>, 9> sudoku = { {
		{1, 5, 2, 4, 8, 9, 3, 7, 6},
		{7, 3, 9, 2, 5, 6, 8, 4, 1},
		{4, 6, 8, 3, 7, 1, 2, 9, 5},
		{3, 8, 7, 1, 2, 4, 6, 5, 9},
		{5, 9, 1, 7, 6, 7, 4, 2, 8},
		{2, 4, 6, 8, 9, 5, 7, 1, 3},
		{9, 1, 4, 6, 3, 7, 5, 5, 2},
		{6, 2, 5, 9, 4, 8, 1, 3, 7},
		{8, 7, 3, 5, 1, 2, 9, 6, 4},
	} };

	SourceResult result = checker->boxesValid(sudoku);

	EXPECT_FALSE(result.isValid());
	EXPECT_EQ(result.description(), "Invalid box: missing value 3 in box 4.");
}

TEST_F(SudokuCheckerTest, sudokuValid) {
	std::array<std::array<int, 9>, 9> sudoku = { {
	{1, 5, 2, 4, 8, 9, 3, 7, 6},
	{7, 3, 9, 2, 5, 6, 8, 4, 1},
	{4, 6, 8, 3, 7, 1, 2, 9, 5},
	{3, 8, 7, 1, 2, 4, 6, 5, 9},
	{5, 9, 1, 7, 6, 3, 4, 2, 8},
	{2, 4, 6, 8, 9, 5, 7, 1, 3},
	{9, 1, 4, 6, 3, 7, 5, 8, 2},
	{6, 2, 5, 9, 4, 8, 1, 3, 7},
	{8, 7, 3, 5, 1, 2, 9, 6, 4},
} };

	ValidationResult result = checker->sudokuValid(sudoku);

	EXPECT_TRUE(result.isValid());
	EXPECT_EQ(result.description(), "Valid Sudoku.");
}

TEST_F(SudokuCheckerTest, sudokuInvalid) {
	std::array<std::array<int, 9>, 9> sudoku = { {
	{1, 5, 2, 4, 8, 9, 3, 7, 6},
	{7, 3, 9, 2, 5, 6, 8, 4, 1},
	{4, 6, 8, 3, 7, 1, 2, 9, 5},
	{3, 8, 7, 1, 2, 4, 6, 5, 9},
	{5, 9, 1, 7, 6, 3, 4, 2, 8},
	{2, 4, 6, 8, 9, 5, 7, 1, 3},
	{9, 1, 4, 9, 3, 7, 5, 8, 2},
	{6, 2, 5, 9, 4, 8, 1, 3, 7},
	{8, 7, 3, 5, 1, 2, 9, 6, 4},
} };

	ValidationResult result = checker->sudokuValid(sudoku);

	EXPECT_FALSE(result.isValid());
	EXPECT_EQ(result.description(), "Invalid Sudoku. Invalid row: missing value 6 in row 6. Invalid column: missing value 6 in column 3. Invalid box: missing value 6 in box 7.");
}

