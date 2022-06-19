import PinCalculator from "./pin-calculator";
import PossibilityFormatter from "./utils/possibility-formatter";

const challengePin = "97516";

const unsortedFormattedPossibilities = PossibilityFormatter.formatPossibilities(
  PinCalculator.calculatePossibilities(challengePin)
);
console.log("Unsorted solution: ", unsortedFormattedPossibilities);

const sortedFormattedPossibilities = PossibilityFormatter.formatPossibilities(
  PinCalculator.calculatePossibilitiesByLikelihood(challengePin)
);
console.log("Sorted solution: ", sortedFormattedPossibilities);
console.log(`The most likely pin is ${sortedFormattedPossibilities[0]}`);
