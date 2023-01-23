type StringResult = {
  value: string;
  clipboard: string;
};

enum Command {
  CtrlC = '[CTRL+C]',
  CtrlV = '[CTRL+V]',
  CtrlX = '[CTRL+X]',
}

export default class StringProcessor {
  public static process(rawString: string) {
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
      this.getCommand(nextCommand, { value, clipboard })
    );
  }

  private static getCommand(
    command: string,
    { value, clipboard }: StringResult
  ) {
    return (
      {
        [Command.CtrlC]: this.applyCopy(value),
        [Command.CtrlX]: this.applyCut(value),
        [Command.CtrlV]: this.applyPaste({ value, clipboard }),
      }[command] ?? this.invalidCommandError(command)
    );
  }

  private static applyCopy(value: string): StringResult {
    return {
      value: value.replace(Command.CtrlC, ''),
      clipboard: value.slice(0, value.indexOf(Command.CtrlC)),
    };
  }

  private static applyCut(value: string): StringResult {
    return {
      value: value.slice(value.indexOf(Command.CtrlX) + Command.CtrlX.length),
      clipboard: value.slice(0, value.indexOf(Command.CtrlX)),
    };
  }

  private static applyPaste({ value, clipboard }: StringResult): StringResult {
    return {
      value: value.replace(Command.CtrlV, clipboard),
      clipboard,
    };
  }

  private static invalidCommandError(command: string): StringResult {
    throw new Error(`Invalid command ${command}`);
  }
}
