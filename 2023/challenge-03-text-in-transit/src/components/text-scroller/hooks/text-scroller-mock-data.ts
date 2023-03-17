export default class TextScrollerMockData {
  public static readonly plainText =
    'The quick brown fox jumps over the lazy dog';

  public static readonly someBoldText =
    'The [B]quick[/B] brown fox jumps over the lazy dog';

  public static readonly tickInterval = 250;
  public static readonly screenWidth = 20;

  public static readonly emptyScroller = Array(this.screenWidth)
    .fill(' ')
    .join('');

  public static readonly scrollOnce = '                   T';
  public static readonly scrollTenTimes = '          The quick ';
  public static readonly scrollTwentyOneTimes = 'he quick brown fox j';
}
