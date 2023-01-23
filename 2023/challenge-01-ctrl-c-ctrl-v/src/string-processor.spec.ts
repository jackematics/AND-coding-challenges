import StringProcessor from './string-processor';

describe('StringProcessor', () => {
  it('should error if an invalid command exists', () => {
    const input = 'Hello I am a big [CTRL+R]';

    const error = () => StringProcessor.process(input);

    expect(error).toThrowError();
  });

  it.each([
    {
      input: 'the big red[CTRL+C] fox jumps over [CTRL+V] lazy dog.',
      expected: 'the big red fox jumps over the big red lazy dog.',
    },
    {
      input: '[CTRL+V]the tall oak tree towers over the lush green meadow.',
      expected: 'the tall oak tree towers over the lush green meadow.',
    },
    {
      input:
        'the sun shines down[CTRL+C] on [CTRL+V][CTRL+C] the busy [CTRL+V].',
      expected:
        'the sun shines down on the sun shines down the busy the sun shines down on the sun shines down.',
    },
    {
      input: 'a majestic lion[CTRL+C] searches for [CTRL+V] in the tall grass.',
      expected:
        'a majestic lion searches for a majestic lion in the tall grass.',
    },
    {
      input:
        'the shimmering star[CTRL+X]Twinkling in the dark, [CTRL+V] shines bright.',
      expected: 'Twinkling in the dark, the shimmering star shines bright.',
    },
  ])('$input -> $expected', ({ input, expected }) => {
    const stringResult = StringProcessor.process(input);

    expect(stringResult.value).toBe(expected);
  });
});
