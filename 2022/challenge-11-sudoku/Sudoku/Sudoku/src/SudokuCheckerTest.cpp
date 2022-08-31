#include "pch.h"
#include "SudokuChecker.h"
#include "ValidationResult.h"
#include <array>

struct SudokuCheckerTest : testing::Test {
	SudokuChecker* checker;

	SudokuCheckerTest() {
		checker = new SudokuChecker;
	}

	~SudokuCheckerTest() {
		delete checker;
	}
};

TEST_F(SudokuCheckerTest, extractColumn) {
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

	std::array<int, 9> col0 = { 1, 7, 4, 3, 5, 2, 9, 6, 8 };
	std::array<int, 9> col2 = { 2, 9, 8, 7, 1, 6, 4, 5, 3 };
	std::array<int, 9> col7 = { 7, 4, 9, 5, 2, 1, 8, 3, 6 };

	EXPECT_EQ(checker->extractColumn(sudoku, 0), col0);
	EXPECT_EQ(checker->extractColumn(sudoku, 2), col2);
	EXPECT_EQ(checker->extractColumn(sudoku, 7), col7);
}

TEST_F(SudokuCheckerTest, extractBox) {
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

	std::array<std::array<int, 3>, 3> box03 = { {
		{ 4, 8, 9 },
		{ 2, 5, 6 },
		{ 3, 7, 1 },
	} };

	std::array<std::array<int, 3>, 3> box30 = { {
		{ 3, 8, 7 },
		{ 5, 9, 1 },
		{ 2, 4, 6 },
	} };

	std::array<std::array<int, 3>, 3> box66 = { {
		{ 5, 8, 2 },
		{ 1, 3, 7 },
		{ 9, 6, 4 },
	} };

	EXPECT_EQ(checker->extractBox(sudoku, 0, 3), box03);
	EXPECT_EQ(checker->extractBox(sudoku, 3, 0), box30);
	EXPECT_EQ(checker->extractBox(sudoku, 6, 6), box66);
}

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

	ValidationResult result = checker->rowsValid(sudoku);

	EXPECT_TRUE(result.isValid());
	EXPECT_EQ(result.errorDescription(), "");
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

	ValidationResult result = checker->rowsValid(sudoku);

	EXPECT_FALSE(result.isValid());
	EXPECT_EQ(result.errorDescription(), "Invalid Sudoku: missing value 2 in row 3");
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

	ValidationResult result = checker->colsValid(sudoku);

	EXPECT_TRUE(result.isValid());
	EXPECT_EQ(result.errorDescription(), "");
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

	ValidationResult result = checker->colsValid(sudoku);

	EXPECT_FALSE(result.isValid());
	EXPECT_EQ(result.errorDescription(), "Invalid Sudoku: missing value 8 in column 7");
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

	ValidationResult result = checker->boxesValid(sudoku);

	EXPECT_TRUE(result.isValid());
	EXPECT_EQ(result.errorDescription(), "");
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

	ValidationResult result = checker->boxesValid(sudoku);

	EXPECT_FALSE(result.isValid());
	EXPECT_EQ(result.errorDescription(), "Invalid Sudoku: missing value 3 in box 4");
}

// Add test for (in)valid whole sudoku

int main(int argc, char* argv[]) {
	testing::InitGoogleTest(&argc, argv);
	return RUN_ALL_TESTS();
}