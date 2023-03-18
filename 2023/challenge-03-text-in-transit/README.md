# Text in Transit

Challenge completed in React, and TS with all stretch goals completed. The only thing I'm not completely happy with is that all the text characters have different widths so on the screen the scroller can sometimes be a bit inconsistent in size.

## How to run

`npm run dev` to run the application.
`npm run test` to run the tests.

## The Challenge

The challenge is to build a fixed-width, right-to-left text scroller capable of taking a string parameter and screen width as inputs. Seems simple, right?

### Rewards:

:four: Points are awarded for a working text scroller demonstrated in either a console window or web app. \
:two: Further points are awarded for supporting sections of bold and underlined text (see examples) \
:two: Further points are awarded for supporting sections of coloured text (see examples) \
:one: Further point is awarded for supporting some kind of 'speed' input (e.g. characters per second) \
:one: Further point is awarded for supporting nested formatting (e.g. bold, underlined, coloured text (see example)).

### Examples:

Examples:
scroll(text: "Welcome on board this service to [B]London[/B]. Please have [U]all[/U] tickets and passes ready for inspection. This service is expected to depart [C:#00FF00]on time[/C]", screenWidth: 10, speed: 2)
scroll(text: "[C:#FF0000]All of this text is Red, but [C:#0000FF][B][U]THIS[/U][/B] text is Blue.[/C][/C]", screenWidth: 8, speed: 4)
