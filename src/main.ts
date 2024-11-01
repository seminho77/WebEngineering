import { fetchBearData, fetchImageUrl } from './api';
import {
  toggleCommentsSection,
  renderBearData,
  handleFormSubmission,
} from './ui';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

const title = 'List_of_ursids';

// Function to parse bear data from wikitext
const extractBearData = async (wikitext: string): Promise<Bear[]> => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=([^|\n]+)/);

      if (nameMatch !== null && binomialMatch !== null && imageMatch !== null) {
        const rawRange =
          rangeMatch !== null && rangeMatch[1]?.trim() !== ''
            ? rangeMatch[1].trim()
            : 'Range information not available';
        const range = rawRange.replace(/\s*\(.*?\)\s*/g, ''); // Removes text in brackets
        const imageUrl = await fetchImageUrl(
          imageMatch[1].trim().replace('File:', '')
        );

        const bear: Bear = {
          name: nameMatch[1],
          binomial: binomialMatch[1],
          image: imageUrl,
          range,
        };
        bears.push(bear);
      }
    }
  }
  return bears;
};

// Initialization function
const init = async (): Promise<void> => {
  toggleCommentsSection();
  handleFormSubmission();

  try {
    const wikitext = await fetchBearData(title);
    const bears = await extractBearData(wikitext);
    await renderBearData(bears);
  } catch (error) {
    console.error('Error initializing application:', error);
    const moreBearsSection = document.querySelector('.more_bears');
    if (moreBearsSection !== null) {
      moreBearsSection.innerHTML =
        '<p>Error loading bear data. Please try again later.</p>';
    }
  }
};

// Start App
init().catch((error) => {
  console.error('Initialization error:', error);
});
