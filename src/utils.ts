export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const log = (
  requestNo: number,
  currentConcurrent: number,
  type: "error" | "success" | "start"
) => console.log(`Request: ${requestNo} - ${type} - concurrent processing: ${currentConcurrent}`);
