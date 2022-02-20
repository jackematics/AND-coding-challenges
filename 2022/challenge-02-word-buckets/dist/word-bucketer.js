export class WordBucketer {
    static bucketify(input, bucketSizeLimit) {
        const buckets = [];
        if (input === "") {
            return buckets;
        }
        const splitWords = input.split(' ');
        let currentIndex = 0;
        while (currentIndex < splitWords.length) {
            let currentWord = splitWords[currentIndex];
            if (currentWord.length > bucketSizeLimit) {
                currentIndex++;
                continue;
            }
            if (currentIndex === splitWords.length - 1) {
                buckets.push(currentWord.trim());
                break;
            }
            const nextWord = splitWords[currentIndex + 1];
            const merged = currentWord + ' ' + nextWord;
            if (merged.length <= bucketSizeLimit) {
                this.mergeAdjacentElements(currentIndex, splitWords);
                continue;
            }
            buckets.push(currentWord.trim());
            currentIndex++;
        }
        return buckets;
    }
    static mergeAdjacentElements(index, array) {
        array[index] = array[index] + ' ' + array[index + 1];
        array.splice(index + 1, 1);
    }
}
//# sourceMappingURL=word-bucketer.js.map