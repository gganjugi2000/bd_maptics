import axios from 'axios';

// basic config for axios
// const APP_URL = 'http://localhost:3000/';
const APP_URL = '/';

const commonHeaders = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

const options = {
  baseURL: APP_URL,
  headers: { 
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  timeout: 5000,
};


function createAxiosInstance() {
  const instance = axios.create(options);
  
	return instance;
}

function createAxiosInstanceWithAuth() {
  const instance = axios.create(options);

  instance.interceptors.request.use(config => {
		// get Authorization info
		const auth = localStorage.getItem('Auth');
		if(auth) {
			config.headers.Authorization = "Bearer " + localStorage.getItem('Auth');
    }

		return config;
	}, error => {
		return Promise.reject(error.response);
  });
  
	instance.interceptors.response.use(response => {
		return response;
	}, error => {
		return Promise.reject(error.response);
  });
  
	return instance;
}

export const baseAxios = createAxiosInstance();
export const authAxios = createAxiosInstanceWithAuth();
