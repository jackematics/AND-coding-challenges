#include "pch.h"
#include "SudokuChecker.h"
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

TEST_F(SudokuCheckerTest, rowValid) {
	std::array<int, 9> row = { 4, 3, 7, 8, 6, 5, 1, 2, 9 };

	EXPECT_TRUE(checker->lineValid(row));
}

TEST_F(SudokuCheckerTest, incompleteRowInvalid) {
	std::array<int, 9> row = { 4, 5, 7, 8, 6, 0, 1, 2 };

	EXPECT_FALSE(checker->lineValid(row));
}

TEST_F(SudokuCheckerTest, duplicateNumbersInvalid) {
	std::array<int, 9> row = { 4, 5, 7, 8, 6, 4, 1, 2 };

	EXPECT_FALSE(checker->lineValid(row));
}

TEST_F(SudokuCheckerTest, boxValid) {
	std::array<std::array<int, 3>, 3> box = { {
		{ 3, 5, 7 },
		{ 1, 4, 9 },
		{ 2, 8, 6 },
	} };

	EXPECT_TRUE(checker->boxValid(box));
}

TEST_F(SudokuCheckerTest, incompleteBoxInvalid) {
	std::array<std::array<int, 3>, 3> box = { {
		{ 3, 0, 7 },
		{ 1, 4, 9 },
		{ 0, 8, 6 },
	} };

	EXPECT_FALSE(checker->boxValid(box));
}

TEST_F(SudokuCheckerTest, duplicateBoxInvalid) {
	std::array<std::array<int, 3>, 3> box = { {
		{ 3, 5, 7 },
		{ 1, 4, 4 },
		{ 2, 8, 6 },
	} };

	EXPECT_FALSE(checker->boxValid(box));
}

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

int main(int argc, char* argv[]) {
	testing::InitGoogleTest(&argc, argv);
	return RUN_ALL_TESTS();
}