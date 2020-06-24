import request from "../lib/request";
import { getApiUrl } from "../lib/utils";

export const updateGeoJSON = async data => request.post(getApiUrl(), data).then(({ data }) => data);
export const fetchGeoJSON = async () => await request.get(getApiUrl()).then(({ data }) => data);