import PinGuesser from "./pin-guesser";
import PossibilityFormatter from "./utils/possibility-formatter";

const challengePin = "97516";

const unsortedFormattedPossibilities = PossibilityFormatter.formatPossibilities(
  PinGuesser.calculatePossibilities(challengePin)
);
console.log("Unsorted solution: ", unsortedFormattedPossibilities);

const sortedFormattedPossibilities = PossibilityFormatter.formatPossibilities(
  PinGuesser.calculatePossibilitiesByLikelihood(challengePin)
);
console.log("Sorted solution: ", sortedFormattedPossibilities);
