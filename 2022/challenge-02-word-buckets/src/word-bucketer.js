"use strict";
exports.__esModule = true;
exports.WordBucketer = void 0;
var WordBucketer = /** @class */ (function () {
    function WordBucketer() {
    }
    WordBucketer.bucketify = function (input, bucketSizeLimit) {
        var buckets = [];
        if (input === "") {
            return buckets;
        }
        var splitWords = input.split(' ');
        var currentIndex = 0;
        while (currentIndex < splitWords.length) {
            var currentWord = splitWords[currentIndex];
            if (currentWord.length > bucketSizeLimit) {
                currentIndex++;
                continue;
            }
            if (currentIndex === splitWords.length - 1) {
                buckets.push(currentWord.trim());
                break;
            }
            var nextWord = splitWords[currentIndex + 1];
            var merged = currentWord + ' ' + nextWord;
            if (merged.length <= bucketSizeLimit) {
                this.mergeAdjacentElements(currentIndex, splitWords);
                continue;
            }
            buckets.push(currentWord.trim());
            currentIndex++;
        }
        return buckets;
    };
    WordBucketer.mergeAdjacentElements = function (index, array) {
        array[index] = array[index] + ' ' + array[index + 1];
        array.splice(index + 1, 1);
    };
    return WordBucketer;
}());
exports.WordBucketer = WordBucketer;
