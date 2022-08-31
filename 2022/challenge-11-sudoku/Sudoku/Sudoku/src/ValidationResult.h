#pragma once
#include <string>

#include "SourceResult.h"


class ValidationResult
{
private: 
	SourceResult rowResult;
	SourceResult columnResult;
	SourceResult boxResult;

public:
	ValidationResult();
	ValidationResult(
		SourceResult rowResult,
		SourceResult columnResult,
		SourceResult boxResult
	);

	bool isValid();
	std::string description();
};

