import TextScroller from './components/text-scroller/TextScroller';

function App() {
  const trainText =
    'Welcome on board this service to [B]London[/B]. Please have [U]all[/U] tickets and passes ready for inspection. This service is expected to depart [C:#00FF00]on time[/C]';
  const nestedColourText =
    '[C:#FF0000]All of this text is Red, but [C:#0000FF][B][U]THIS[/U][/B] text is Blue.[/C][/C]';

  return (
    <>
      <h1 className="mb-10 text-center font-sans text-6xl font-bold">
        Text in Transit
      </h1>
      <div className="m-auto w-1/2">
        <div className="border-2 border-black">
          <TextScroller text={trainText} screenWidth={25} tickInterval={225} />
        </div>
        <div className="border-2 border-black">
          <TextScroller
            text={nestedColourText}
            screenWidth={35}
            tickInterval={150}
          />
        </div>
      </div>
    </>
  );
}

export default App;
