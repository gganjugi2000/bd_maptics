import qs from 'qs';
import axios from 'axios';

// basic config for axios
const APP_URL = 'http://localhost:3000/';

const commonHeaders = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
};

// instance & interceptor
function createAxios(url) {
	const instance = axios.create(Object.assign({ baseURL: url }, options));
	return instance;
}

// export const baseAxios = ()