import { WordBucketer } from "./word-bucketer.js";
function main() {
    console.log('bucketify("the quick brown fox jumps over the lazy dog", 10): ', WordBucketer.bucketify('the quick brown fox jumps over the lazy dog', 10));
    console.log();
    console.log('bucketify("the five boxing wizards jump quickly", 7): ', WordBucketer.bucketify("the five boxing wizards jump quickly", 7));
    console.log();
    console.log('bucketify("a b c d e f g", 2): ', WordBucketer.bucketify("a b c d e f g", 2));
    console.log();
    console.log('bucketify("how vexingly quick daft zebras jump", 12): ', WordBucketer.bucketify("how vexingly quick daft zebras jump", 12));
}
main();
//# sourceMappingURL=main.js.map