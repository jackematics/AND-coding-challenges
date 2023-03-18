import TextScroller from './components/text-scroller/TextScroller';

function App() {
  const trainText =
    'Welcome on board this service to [B]London[/B]. Please have [U]all[/U] tickets and passes ready for inspection. This service is expected to depart [C:#00FF00]on time[/C]';
  const nestedColourText =
    '[C:#FF0000]All of this text is Red, but [C:#0000FF][B][U]THIS[/U][/B] text is Blue.[/C][/C]';
  const lemonSherbert =
    "Everything seems to be in [B]Order[/B]. I'm going to go across the street, and get you some [C:#FFA500][B][U]orange sherbert[/U][/B][/C]. Here, have a [B]piece[/B] of [B]gum[/B].";

  return (
    <>
      <h1 className="mb-10 text-center font-sans text-6xl font-bold">
        Text in Transit
      </h1>
      <div className="m-auto w-1/4">
        <TextScroller
          text={trainText}
          screenWidth={25}
          tickIntervalMilliseconds={225}
        />
        <TextScroller
          text={nestedColourText}
          screenWidth={35}
          tickIntervalMilliseconds={150}
        />
        <TextScroller
          text={lemonSherbert}
          screenWidth={40}
          tickIntervalMilliseconds={50}
        />
      </div>
    </>
  );
}

export default App;
