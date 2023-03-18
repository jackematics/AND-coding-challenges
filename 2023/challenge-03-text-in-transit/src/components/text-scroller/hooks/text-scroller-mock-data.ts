export default class TextScrollerMockData {
  public static readonly tickInterval = 250;
  public static readonly screenWidth = 20;
  public static readonly emptyScroller =
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

  public static readonly plainText =
    'The quick brown fox jumps over the lazy dog';
  public static readonly scrollOncePlain =
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;T';
  public static readonly scrollTenTimesPlain =
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The&nbsp;quick&nbsp;';
  public static readonly scrollTwentyOneTimesPlain =
    'he&nbsp;quick&nbsp;brown&nbsp;fox&nbsp;j';

  public static readonly someBoldText =
    'The [B]quick[/B] brown fox jumps over the lazy dog';
  public static readonly scrollTenTimesBold =
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The&nbsp;<b>q</b><b>u</b><b>i</b><b>c</b><b>k</b>&nbsp;';

  public static readonly someUnderlinedText =
    'The [U]quick[/U] brown fox jumps over the lazy dog';
  public static readonly scrollTenTimesUnderlined =
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The&nbsp;<u>q</u><u>u</u><u>i</u><u>c</u><u>k</u>&nbsp;';

  public static readonly someBoldAndUnderlinedText =
    'The [B][U]quick[/U][/B] brown fox jumps over the lazy dog';
  public static readonly scrollTenTimesBoldAndUnderlined =
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The&nbsp;<u><b>q</b></u><u><b>u</b></u><u><b>i</b></u><u><b>c</b></u><u><b>k</b></u>&nbsp;';

  public static readonly someColouredText =
    'The [C:#ff0000]quick[/C] brown fox jumps over the lazy dog';
  public static readonly scrollTenTimesColoured =
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The&nbsp;<span style="color:#ff0000">q</span><span style="color:#ff0000">u</span><span style="color:#ff0000">i</span><span style="color:#ff0000">c</span><span style="color:#ff0000">k</span>&nbsp;';

  public static readonly someBoldColouredAndUnderlinedText =
    'The [C:#ff0000]quick[/C] brown fox jumps over the lazy dog';
  public static readonly scrollTenTimesBoldUnderlinedAndColoured =
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The&nbsp;<span style="color:#ff0000">q</span><span style="color:#ff0000">u</span><span style="color:#ff0000">i</span><span style="color:#ff0000">c</span><span style="color:#ff0000">k</span>&nbsp;';

  public static readonly someBoldNestedColouredAndUnderlinedText =
    '[C:#0000ff]The [B][U][C:#ff0000]quick[/C][/U][/B] brown[/C] fox jumps over the lazy dog';
  public static readonly scrollTenTimesBoldUnderlinedAndNestedColoured =
    '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0000ff">T</span><span style="color:#0000ff">h</span><span style="color:#0000ff">e</span><span style="color:#0000ff">&nbsp;</span><span style="color:#ff0000"><u><b>q</b></u></span><span style="color:#ff0000"><u><b>u</b></u></span><span style="color:#ff0000"><u><b>i</b></u></span><span style="color:#ff0000"><u><b>c</b></u></span><span style="color:#ff0000"><u><b>k</b></u></span><span style="color:#0000ff">&nbsp;</span>';
}
