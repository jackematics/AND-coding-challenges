export default class TextScrollerMockData {
  public static readonly tickInterval = 250;
  public static readonly screenWidth = 20;
  public static readonly emptyScroller = Array(this.screenWidth)
    .fill(' ')
    .join('');

  public static readonly plainText =
    'The quick brown fox jumps over the lazy dog';
  public static readonly scrollOncePlain = '                   T';
  public static readonly scrollTenTimesPlain = '          The quick ';
  public static readonly scrollTwentyOneTimesPlain = 'he quick brown fox j';

  public static readonly someBoldText =
    'The [B]quick[/B] brown fox jumps over the lazy dog';
  public static readonly scrollTenTimesBold =
    '          The <b>q</b><b>u</b><b>i</b><b>c</b><b>k</b> ';
}
