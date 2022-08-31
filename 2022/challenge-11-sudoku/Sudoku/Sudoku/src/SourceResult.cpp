#include "pch.h"
#include "SourceResult.h"

SourceResult::SourceResult(Source source, bool valid)
	: source(source), valid(valid), index(-1), missingValue(-1) {}

SourceResult::SourceResult(
	Source source,
	bool valid, 
	int index,
	int missingValue
) : source(source), valid(valid), index(index), missingValue(missingValue) {}

bool SourceResult::isValid() {
	return valid;
}

std::string SourceResult::sourceToString() {
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

std::string SourceResult::description() {
	return valid 
		? std::format("Valid {0}s", sourceToString())
		: std::format("Invalid {1}: missing value {0} in {1} {2}.", missingValue, sourceToString(), index);
}

SourceResult::Source SourceResult::getSource() {
	return source;
}



