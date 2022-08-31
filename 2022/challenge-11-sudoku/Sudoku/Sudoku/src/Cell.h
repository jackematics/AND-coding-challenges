#pragma once

struct Cell {
private:
	int row;
	int col;

public:
	Cell(int row, int col);


	int getRow();
	int getColumn();
};