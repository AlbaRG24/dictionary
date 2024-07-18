import { http, HttpResponse } from "msw";
import dotenv from "dotenv";

dotenv.config();

const idiomsUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const allIdioms = new Array();
allIdioms.push({
  id: "1",
  idiom: "hit the sack",
  meaning: "go to sleep",
  examples: ["I'll hit the sack early today"],
  synonyms: [{ word: "Hit the hay", url: "www.something.com" }],
  origin: "origin",
  source: { name: "Oxford dictionary", url: "www.something.com" },
  author: null,
});

export const handlers = [
  http.get(`${idiomsUrl}/idioms`, () => {
    return HttpResponse.json([
      {
        id: "1",
        idiom: "hit the sack",
        meaning: "go to sleep",
        examples: ["I'll hit the sack early today"],
        synonyms: [{ word: "Hit the hay", url: "www.something.com" }],
        origin: "origin",
        source: { name: "Oxford dictionary", url: "www.something.com" },
        author: null,
      },
    ]);
  }),
  http.get(`${idiomsUrl}/idioms`, () => {
    return HttpResponse.error();
  }),
  http.get(`${idiomsUrl}/idioms/:id`, () => {
    const idiom = allIdioms[0];
    return HttpResponse.json(idiom);
  }),
  http.get(`${idiomsUrl}/idioms:id`, () => {
    return HttpResponse.error();
  }),
];
