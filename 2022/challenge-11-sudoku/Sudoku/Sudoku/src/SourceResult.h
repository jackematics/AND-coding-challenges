#pragma once

#include <string>
#include <format>

class SourceResult {
public:
	enum Source { 
		Row,
		Column,
		Box
	};

private:
	Source source;
	bool valid;
	int index;
	int missingValue;

public:
	SourceResult(Source source, bool valid);
	SourceResult(
		Source source,
		bool valid,
		int index,
		int missingValue
	);

	bool isValid();
	std::string description();
	Source getSource();

private:
	std::string sourceToString();
};




