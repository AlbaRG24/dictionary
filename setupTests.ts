import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./integration-tests/mocks/node";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
