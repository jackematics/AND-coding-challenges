#include "pch.h"
#include "ValidationResult.h"

ValidationResult::ValidationResult(bool valid)
	: valid(valid) {}

ValidationResult::ValidationResult(
	bool valid, 
	Source source,
	int index,
	int missingValue
) : valid(valid), source(source), index(index), missingValue(missingValue) {}

bool ValidationResult::isValid() {
	return valid;
}

std::string ValidationResult::sourceToString() {
	switch (source) {
		case Row:
			return "row";
		case Column:
			return "column";
		case Box:
			return "box";
		default:
			return "invalid source";
	}
}

std::string ValidationResult::errorDescription()
{
	if (valid)
		return "";

	return std::format("Invalid Sudoku: missing value {0} in {1} {2}", missingValue, sourceToString(), index);
}

