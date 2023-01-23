type StringResult = {
  value: string;
  clipboard: string;
};

enum Command {
  CtrlC = '[CTRL+C]',
  CtrlV = '[CTRL+V]',
}

export default class StringProcessor {
  public static process(rawString: string) {
    // if (!rawString.includes(commands.copy)) return '';

    // return rawString.slice(0, rawString.indexOf(commands.copy));

    return this.recursivelyApplyCommands({ value: rawString, clipboard: '' });
  }

  private static recursivelyApplyCommands({
    value,
    clipboard,
  }: StringResult): StringResult {
    const nextCommandStart = value.indexOf('[');
    const nextCommandEnd = value.indexOf(']');

    if (nextCommandStart === -1) {
      return { value, clipboard };
    }

    const nextCommand = value.slice(nextCommandStart, nextCommandEnd + 1);

    return this.recursivelyApplyCommands(
      {
        [Command.CtrlC]: this.applyCopy(value),
        [Command.CtrlV]: this.applyPaste({ value, clipboard }),
      }[nextCommand] ?? this.invalidCommandError(nextCommand)
    );
  }

  private static applyCopy(value: string): StringResult {
    return {
      value: value.replace(Command.CtrlC, ''),
      clipboard: value.slice(0, value.indexOf(Command.CtrlC)),
    };
  }

  private static applyPaste({ value, clipboard }: StringResult): StringResult {
    return {
      value: value.replace(Command.CtrlV, clipboard),
      clipboard,
    };
  }

  private static invalidCommandError(error: string): StringResult {
    throw new Error(`Invalid command ${error}`);
  }
}
