import { WordBucketer } from "./word-bucketer"

describe('WordBucketer()', () => {
    it('should create a bucket with an empty string for empty string inputs', () => {
        const emptyBucket = WordBucketer.bucketify("", 1);

        expect(emptyBucket).toStrictEqual([]);
    })

    it('should create one bucket for sums of strings shorter than the size limit', () => {
        const output = WordBucketer.bucketify("hello world", 15);

        expect(output).toStrictEqual(["hello world"]);
    })

    it('should split words when they are within the size limit', () => {
        const split = WordBucketer.bucketify("hello world", 5);

        expect(split).toStrictEqual(["hello", "world"]);
    })

    it('should remove too large words', () => {
        const tooLarge = WordBucketer.bucketify("sdlkjfjhbnasdkjlugvfhbnaedk", 10);

        expect(tooLarge).toStrictEqual([]);
    })

    it('should create multiple shared buckets for combined strings less than the size limit', () => {
        const output = WordBucketer.bucketify("the quick brown fox jumps over the lazy dog", 10);
        expect(output).toStrictEqual(["the quick", "brown fox", "jumps over", "the lazy", "dog"]);
    })

    it('should create multiple individual buckets for individual strings less than the size limit', () => {
        const output = WordBucketer.bucketify("the five boxing wizards jump quickly", 7);

        expect(output).toStrictEqual(["the", "five", "boxing", "wizards", "jump", "quickly"]);
    })

    it('should create multiple individual buckets for individual strings of length one', () => {
        const output = WordBucketer.bucketify("a b c d e f g", 2);

        expect(output).toStrictEqual(["a", "b", "c", "d", "e", "f", "g"]);
    })

    it('should create multiple individual buckets for combined strings of varying length', () => {
        const output = WordBucketer.bucketify("how vexingly quick daft zebras jump", 12);

        expect(output).toStrictEqual(["how vexingly", "quick daft", "zebras jump"]);
    })

    it('should filter out words beyond the size limit at the end of an input', () => {
        const output = WordBucketer.bucketify("good morning thats a nice tnetennba", 8);

        expect(output).toStrictEqual(["good", "morning", "thats a", "nice"]);
    })

    it('should filter out words beyond the size limit in the middle of a string', () => {
        const output = WordBucketer.bucketify("you silly sesquipedalian say what you mean in words people understand", 9);

        expect(output).toStrictEqual(["you silly", "say what", "you mean", "in words", "people"]);
    })
})