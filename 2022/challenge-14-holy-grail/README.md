# Holy Grail

My solution to the Holy Grail coding challenge completed in Typescript with all stretch goals completed. This might be the most cursed, unreadable piece of code I've submitted recently, but my brain is melting recursively so I'm giving myself a pat on the back. It was also super dumb of me to use Typescript because of how awkward the json inputs are so I basically ignored it and used it like js (cba changing to vanilla js).

I've written tests but since I didn't know what the output was supposed to be (I could have tried creating my own example json and using that but I didn't want to spend the time) I basically cheated and used my output as the expected result. The only ones I know for sure are correct are the dead spiders and holy grail coordinates (because I manually looked through the jsons and found/counted).

## How to run

`npm run start` and the solutions to the challenge input and stretch goal input will be printed to the console \
`npm run test` to run the tests

## The Challenge

Your task this week is to find the location of the Holy Grail. Given this collection of treasure chests in JSON format, you'll need to traverse and explore the contents of each JSON treasure chest to find clues. The chests and their various items may have attached notes, engravings, messages and other cryptic clues on/in them - you should explore these properties for any external links which could lead you to additional lists of treasure. If you locate such links, your code should download the list and search those chests as well. You've located the Holy Grail when you locate a chest item with the name holy-grail.

### Rewards:

:five: Points are awarded for a working algorithm which returns the location of the chest containing the Holy Grail. \
:three: Further points are awarded for returning the total value\*\* of all chest contents across all lists. \
:one: Further points are awarded for returning the total number of dead spiders across all lists. \
:one: Further points are awarded for returning the most common size of boots across all lists.

\*\* Values are all measured in doubloons. Any Sapphires found are worth 200 doubloons, Rubies are worth 250 doubloons, and Diamonds are worth 400 doubloons.

### Example:

Example:
Your solution might return: \
Holy Grail location: 20.19 -19.83 \
Total chest value: 25600 doubloons \
Dead spiders: 27 \
Most common boot size: 8
