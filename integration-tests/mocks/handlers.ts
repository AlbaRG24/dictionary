import { http, HttpResponse } from "msw";
import dotenv from "dotenv";

dotenv.config();

const idiomsUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;

const allIdioms = new Array();
allIdioms.push({
  id: "1",
  idiom: "hit the sack",
  meaning: "go to sleep",
  examples: ["I'll hit the sack early today"],
  synonyms: ["Hit the hay"],
  origin: "something",
  source: "Oxford dictionary",
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
        synonyms: ["Hit the hay"],
        origin: "something",
        source: "Oxford dictionary",
        author: null,
      },
    ]);
  }),
  http.get(`${idiomsUrl}/idioms/:id`, ({ params }) => {
    const { id } = params;
    const idiom = allIdioms[0];
    console.log({ idiom });
    return HttpResponse.json(idiom);
  }),
];
