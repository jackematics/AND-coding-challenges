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

  public static readonly someUnderlinedText =
    'The [U]quick[/U] brown fox jumps over the lazy dog';
  public static readonly scrollTenTimesUnderlined =
    '          The <u>q</u><u>u</u><u>i</u><u>c</u><u>k</u> ';

  public static readonly someBoldAndUnderlinedText =
    'The [B][U]quick[/U][/B] brown fox jumps over the lazy dog';
  public static readonly scrollTenTimesBoldAndUnderlined =
    '          The <u><b>q</b></u><u><b>u</b></u><u><b>i</b></u><u><b>c</b></u><u><b>k</b></u> ';

  public static readonly someColouredText =
    'The [C:#ff0000]quick[/C] brown fox jumps over the lazy dog';
  public static readonly scrollTenTimesColoured =
    '          The <span className="text-[#ff0000]">q</span><span className="text-[#ff0000]">u</span><span className="text-[#ff0000]">i</span><span className="text-[#ff0000]">c</span><span className="text-[#ff0000]">k</span> ';

  public static readonly someBoldColouredAndUnderlinedText =
    'The [C:#ff0000]quick[/C] brown fox jumps over the lazy dog';
  public static readonly scrollTenTimesBoldUnderlinedAndColoured =
    '          The <span className="text-[#ff0000]">q</span><span className="text-[#ff0000]">u</span><span className="text-[#ff0000]">i</span><span className="text-[#ff0000]">c</span><span className="text-[#ff0000]">k</span> ';

  public static readonly someBoldNestedColouredAndUnderlinedText =
    '[C:#0000ff]The [B][U][C:#ff0000]quick[/C][/U][/B] brown[/C] fox jumps over the lazy dog';
  public static readonly scrollTenTimesBoldUnderlinedAndNestedColoured =
    '          <span className="text-[#0000ff]">T</span><span className="text-[#0000ff]">h</span><span className="text-[#0000ff]">e</span><span className="text-[#0000ff]"> </span><span className="text-[#ff0000]"><u><b>q</b></u></span><span className="text-[#ff0000]"><u><b>u</b></u></span><span className="text-[#ff0000]"><u><b>i</b></u></span><span className="text-[#ff0000]"><u><b>c</b></u></span><span className="text-[#ff0000]"><u><b>k</b></u></span><span className="text-[#0000ff]"> </span>';
}
