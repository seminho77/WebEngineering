// api.js

const BASE_URL = "https://en.wikipedia.org/w/api.php";

export const fetchBearData = async (title, section = 3) => {
    const params = {
        action: "parse",
        page: title,
        prop: "wikitext",
        section,
        format: "json",
        origin: "*"
    };

    try {
        const url = `${BASE_URL}?${new URLSearchParams(params).toString()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch bear data");
        const data = await response.json();
        return data.parse.wikitext['*'];
    } catch (error) {
        console.error("Error fetching bear data:", error);
        throw error;
    }
};

export const fetchImageUrl = async (fileName) => {
    const imageParams = {
        action: "query",
        titles: `File:${fileName}`,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*"
    };

    try {
        const url = `${BASE_URL}?${new URLSearchParams(imageParams).toString()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch image data");
        const data = await response.json();
        const pages = data.query.pages;
        return Object.values(pages)[0]?.imageinfo[0]?.url;
    } catch (error) {
        console.error("Error fetching image URL:", error);
        throw error;
    }
};
