#pragma once

#include <string>
#include <format>

class ValidationResult {
public:
	enum Source { 
		Row,
		Column,
		Box
	};

private:
	bool valid;
	Source source;
	int index;
	int missingValue;

public:
	ValidationResult(bool valid);
	ValidationResult(
		bool valid,
		Source source,
		int index,
		int missingValue
	);

	bool isValid();
	std::string errorDescription();

private:
	std::string sourceToString();
};




