#include <stdexcept>
#include <string>

#include "pch.h"
#include "ValidationResult.h"
#include "SourceResult.h"

ValidationResult::ValidationResult(
	SourceResult rowResult, 
	SourceResult columnResult, 
	SourceResult boxResult
) : rowResult(rowResult), columnResult(columnResult), boxResult(boxResult) {
	if (
		rowResult.getSource() != SourceResult::Row ||
		columnResult.getSource() != SourceResult::Column ||
		boxResult.getSource() != SourceResult::Box
		) {
		throw std::invalid_argument("Source results must match source type");
	}
}

bool ValidationResult::isValid() {
	return (rowResult.isValid() 
		&& columnResult.isValid() 
		&& boxResult.isValid());
}

std::string ValidationResult::description() {
	return isValid()
		? "Valid Sudoku."
		: "Invalid Sudoku. " +
		rowResult.description() + " " +
		columnResult.description() + " " +
		boxResult.description();
}
