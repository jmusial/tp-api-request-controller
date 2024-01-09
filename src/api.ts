import axios from "axios";
import { API_URL } from "./constants";

// The API will call https://test.api.url?test=42. But it's quite irrelevant for the scenario.
export const makeRequest = async (requestParam: number): Promise<void> => {
  axios.get(API_URL, { params: { test: requestParam } });
};
