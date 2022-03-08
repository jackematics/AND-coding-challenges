# Word Buckets

My solution for the Word Buckets coding challenge completed in node with typescript. The algorithm works for all the sample problems and I have a full set of unit tests, not really sure how to check if my solution was under 500 bytes of code so I just ignored it; maybe it will be under who knows. I think it took longer to figure out how to set up a typescript project from scratch than it did actually coming up with the solution, pain.

## How to run

Do an npm install in the root of the project. I've added the sample problem solutions into the tests but you can see the results by either doing 

`npm run start`, 

or see the results of the tests by running

`npm run test`

## The Challenge

This week's challenge is to write an algorithm which divides a sentence into 'word buckets', where each bucket contains n or fewer characters. Only complete words can be placed into each bucket. Spaces count as a character, however you should trim leading and trailing spaces from words as they're placed into buckets. If a word is too large to fit into a bucket, it should be discarded.
Example:
For the following sentence:
bucketify("the quick brown fox jumps over the lazy dog", 10)
your algorithm should return:
["the quick", "brown fox", "jumps over", "the lazy", "dog"]

### Rewards:
:six: Points are awarded for a working algorithm using this sample problem set  
:three: Points are awarded for an algorithm in under 500 bytes of code (not including input data)  
:one: Points are awarded for providing a suite of unit tests  