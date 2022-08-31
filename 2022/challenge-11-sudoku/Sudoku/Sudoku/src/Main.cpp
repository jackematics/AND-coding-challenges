#include <iostream>

#include "pch.h"
#include "SudokuChecker.h"
#include "ValidationResult.h"

void printResults(char id, ValidationResult result) {
    std::cout << "Result " << id << std::endl;
    std::cout << "Sudoku valid?: " << result.isValid() << std::endl;
    std::cout << "Description: " << result.description() << std::endl;
    std::cout << std::endl;
}

int main(int argc, char* argv[]) {
	std::array<std::array<int, 9>, 9> sampleSudoku0 = { {
		{8,2,9,3,6,5,1,4,7},
        {6,4,3,7,1,8,5,1,9},
        {7,5,1,4,9,2,6,3,8},
        {3,1,8,5,2,7,4,9,6},
        {5,9,6,1,4,1,7,8,2},
        {4,7,2,9,8,6,3,1,5},
        {9,8,4,6,5,1,2,7,3},
        {2,6,7,8,3,4,9,5,1},
        {9,3,5,2,7,9,8,6,4}
	} };

    std::array<std::array<int, 9>, 9> sampleSudoku1 = { {
        {5,8,6,4,3,7,1,9,2},
        {1,9,4,5,8,2,3,6,7},
        {7,2,3,9,6,1,4,5,8},
        {2,4,7,1,9,8,6,3,5},
        {8,3,9,6,2,4,7,2,1},
        {6,5,1,7,2,3,8,4,9},
        {9,7,5,3,1,6,7,8,4},
        {3,1,8,2,4,5,9,7,6},
        {4,6,2,8,7,9,5,1,3}
    } };

    std::array<std::array<int, 9>, 9> sampleSudoku2 = { {
        {1,8,3,2,7,4,6,5,9},
        {9,7,4,5,8,6,3,2,1},
        {2,6,5,1,9,3,7,4,8},
        {5,9,2,8,3,1,4,6,7},
        {8,4,6,7,2,5,9,1,3},
        {7,3,1,4,6,9,2,8,5},
        {3,5,9,6,4,8,1,7,2},
        {6,1,7,3,5,2,8,9,4},
        {4,2,8,9,1,7,5,3,6}
    } };

	SudokuChecker checker;

    ValidationResult result0 = checker.sudokuValid(sampleSudoku0);
    ValidationResult result1 = checker.sudokuValid(sampleSudoku1);
    ValidationResult result2 = checker.sudokuValid(sampleSudoku2);

    printResults('0', result0);
    printResults('1', result1);
    printResults('2', result2);
    std::cin.get();
	
	testing::InitGoogleTest(&argc, argv);
	return RUN_ALL_TESTS();
}