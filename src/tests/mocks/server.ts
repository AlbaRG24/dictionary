import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
  server.events.on('request:start', ({ request }) => {
    console.log('Request started:', request.url);
  });
  
  server.events.on('request:match', ({ request }) => {
    console.log('Request matched:', request.url);
  });
  
  server.events.on('request:unhandled', ({ request }) => {
    console.error('Found an unhandled %s request to %s', request.url);
  });


