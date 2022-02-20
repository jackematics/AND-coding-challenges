export class WordBucketer {
    public static bucketify(input: string, bucketSizeLimit: number): string[] {
        const buckets: string[] = [];
        if (input === "") {
            return buckets;
        }

        const splitWords: string[] = input.split(' ');
        let currentIndex = 0;
        while (currentIndex < splitWords.length) {
            let currentWord: string = splitWords[currentIndex];
            if (currentWord.length > bucketSizeLimit) {
                currentIndex++;
                continue;
            }

            if (currentIndex === splitWords.length - 1) {
                buckets.push(currentWord.trim());
                break;
            }

            const nextWord: string = splitWords[currentIndex + 1];
            const merged: string = currentWord + ' ' + nextWord;

            if (merged.length <= bucketSizeLimit) {
                this.mergeAdjacentElements(currentIndex, splitWords);

                continue;
            }

            buckets.push(currentWord.trim());
            currentIndex++;
        }

        return buckets;
    }

    private static mergeAdjacentElements(index: number, array: string[]): void {
        array[index] = array[index] + ' ' + array[index + 1];
        array.splice(index + 1, 1);
    }
}