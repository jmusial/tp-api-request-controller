import { REQUEST_TIME_MULTIPLIER } from "./constants";
import makeConcurrentRequests from "./makeConcurrentRequests";

// simulating requests with random failures and random execution timess
jest.mock("./api.ts", () => ({
  makeRequest: (requestParam: number) => {
    return new Promise<void>((resolve, reject) => {
      const rand = Math.random();
      setTimeout(() => {
        if (rand > 0.8) {
          reject(new Error(`Rand: ${rand}`));
        }
        resolve();
      }, rand * REQUEST_TIME_MULTIPLIER);
    });
  },
}));
describe("swmScreen tests", () => {
  it("simulates 1  request", async () => {
    const params = [1];
    await makeConcurrentRequests(params);
  });
  it("simulates 10 concurrent requests", async () => {
    const params = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    await makeConcurrentRequests(params);
  });
  it("simulates 100 concurrent requests ", async () => {
    const longParams = Array(100)
      .fill(0)
      .map((_, index) => index + 1);
    await makeConcurrentRequests(longParams);
  });
});
