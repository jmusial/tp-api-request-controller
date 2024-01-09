/* 
Translation: API Request Controller

1. Set the maximum concurrent number of requests to 5.

2. Simultaneously request 100 APIs.

3. If an API request is successful, immediately request the next API until all 100 requests are completed.

4. After each API returns, output the corresponding API request number (not the request result).

5. If an API request fails, print the failed API's number and proceed to the next API.

Note: API request results may not be returned in order; the first API might receive the result last.
*/

import { makeRequest } from "./api";
import { MAX_CONCURRENT_REQUESTS, POOLING_DELAY } from "./constants";
import { delay, log } from "./utils";


const makeConcurrentRequests = async (params: number[]): Promise<void> => {
  let currentlyProcessingCount = 0;
  let completedRequests = 0;
  const apiPromises: Promise<void>[] = [];

  for (let i = 0; i < params.length; i++) {
    while (currentlyProcessingCount >= MAX_CONCURRENT_REQUESTS) {
      await delay(POOLING_DELAY);
    }
    // log(i, currentlyProcessingCount, 'start')
    currentlyProcessingCount++;
    const pr = makeRequest(params[i])
      .then(() => log(i, currentlyProcessingCount, 'success'))
      .catch(() => log(i, currentlyProcessingCount, 'error'))
      .finally(() => {
        currentlyProcessingCount--;
        completedRequests++;
      });
    apiPromises.push(pr);
  }
  await Promise.allSettled(apiPromises);

};

export default makeConcurrentRequests;
