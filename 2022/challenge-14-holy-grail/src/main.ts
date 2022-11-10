import TreasureTroveAnalyser, {
  AnalysisResults,
} from './treasure-trove-analyser.js';

const analyser = await TreasureTroveAnalyser.initialiseWithChests(
  'https://e0f5e8673c64491d8cce34f5.z35.web.core.windows.net/treasure.json',
);

const formatResults = (analysisResults: AnalysisResults): void => {
  console.log('Analysis results: ', {
    'Holy Grail location: ': analysisResults.holyGrailCoordinates,
    'Total chest value: ': analysisResults.totalChestValue + ' doubloons',
    'Dead spiders: ': analysisResults.deadSpiders,
    'Most common boot size: ': analysisResults.mostCommonBootSize,
  });
};

formatResults(analyser.getAnalysisResults());
