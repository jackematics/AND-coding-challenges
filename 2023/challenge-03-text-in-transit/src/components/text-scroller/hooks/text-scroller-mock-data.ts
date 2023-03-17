export default class TextScrollerMockData {
  public static readonly plainText =
    'The quick brown fox jumps over the lazy dog';

  public static readonly tickInterval = 250;
  public static readonly screenWidth = 20;

  public static readonly emptyScroller = Array(20).fill('');

  public static readonly scrollOnce = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'T',
  ];

  public static readonly scrollTenTimes = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'T',
    'h',
    'e',
    ' ',
    'q',
    'u',
    'i',
    'c',
    'k',
    ' ',
  ];

  public static readonly scrollTwentyOneTimes = [
    'h',
    'e',
    ' ',
    'q',
    'u',
    'i',
    'c',
    'k',
    ' ',
    'b',
    'r',
    'o',
    'w',
    'n',
    ' ',
    'f',
    'o',
    'x',
    ' ',
    'j',
  ];
}
