# Bucketify: What's that?

An algorithm which divides a sentence into `word buckets`, where each bucket contains `n` or fewer characters. Only complete words can be placed into each bucket. Spaces count as a character, however you should trim leading and trailing spaces from words as they're placed into buckets. If a word is too large to fit into a bucket, it should be discarded.

#### Example

For the following input:

`bucketify("the quick brown fox jumps over the lazy dog", 10)`

the algorithm returns:

`["the quick", "brown fox", "jumps over", "the lazy", "dog"]`

# How do it run this locally?

You need Node.js to run this project. The following commands are available:

`npm install`: installs the project's dependencies.

`npm run start`: executes algorithm using above example's as inputs.

`npm run test`: executes unit tests suite for `bucketify` function.
