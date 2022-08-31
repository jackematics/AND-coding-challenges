#include "pch.h"
#include "Cell.h";

Cell::Cell(int row, int col)
	: row(row), col(col) {}

int Cell::getRow() {
	return row;
}

int Cell::getColumn() {
	return col;
}