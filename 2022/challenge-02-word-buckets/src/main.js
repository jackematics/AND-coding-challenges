"use strict";
exports.__esModule = true;
var word_bucketer_1 = require("./word-bucketer");
function main() {
    console.log('bucketify("the quick brown fox jumps over the lazy dog", 10)', word_bucketer_1.WordBucketer.bucketify('the quick brown fox jumps over the lazy dog', 10));
    console.log('bucketify("the five boxing wizards jump quickly", 7)', word_bucketer_1.WordBucketer.bucketify("the five boxing wizards jump quickly", 7));
    console.log('bucketify("a b c d e f g", 2)', word_bucketer_1.WordBucketer.bucketify("a b c d e f g", 2));
    console.log('bucketify("how vexingly quick daft zebras jump", 12)', word_bucketer_1.WordBucketer.bucketify("how vexingly quick daft zebras jump", 12));
}
main();
