const BASE_URL = 'https://en.wikipedia.org/w/api.php';

interface ImageDataResponse {
  query: {
    pages: Record<
      string,
      {
        imageinfo?: Array<{ url: string }>;
      }
    >;
  };
}

interface BearDataResponse {
  parse: {
    wikitext: {
      '*': string;
    };
  };
}

export const fetchBearData = async (
  title: string,
  section = 3
): Promise<string> => {
  const params = {
    action: 'parse',
    page: title,
    prop: 'wikitext',
    section: section.toString(),
    format: 'json',
    origin: '*',
  };

  try {
    const url = `${BASE_URL}?${new URLSearchParams(params).toString()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch bear data');
    const data: BearDataResponse = await response.json();
    return data.parse.wikitext['*'];
  } catch (error) {
    console.error('Error fetching bear data:', error);
    throw error;
  }
};

export const fetchImageUrl = async (fileName: string): Promise<string> => {
  const imageParams = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    format: 'json',
    origin: '*',
  };

  try {
    const url = `${BASE_URL}?${new URLSearchParams(imageParams).toString()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch image data');
    const data: ImageDataResponse = await response.json();
    const pages = data.query.pages;
    return Object.values(pages)[0]?.imageinfo?.[0]?.url ?? '';
  } catch (error) {
    console.error('Error fetching image URL:', error);
    throw error;
  }
};
