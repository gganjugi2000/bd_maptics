import axios from 'axios';

// basic config for axios
const APP_URL = 'http://localhost:3000/';

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
  console.log("createAxiosInstance instance ==============")
  console.log(instance);
  console.log("createAxiosInstance instance end ----------")
	return instance;
}

function createAxiosInstanceWithAuth() {
  const instance = axios.create(options);

  instance.interceptors.request.use(config => {
    console.log("createAxiosInstanceWithAuth interceptors request ==============")
    console.log(config);
    console.log("createAxiosInstanceWithAuth interceptors request end ----------")
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
    console.log("createAxiosInstanceWithAuth interceptors response ==============")
    console.log(response);
    console.log("createAxiosInstanceWithAuth interceptors response end ----------")
		return response;
	}, error => {
		return Promise.reject(error.response);
  });
  
  console.log("createAxiosInstanceWithAuth instance ==============")
  console.log(instance);
  console.log("createAxiosInstanceWithAuth instance end ----------")
	return instance;
}

export const baseAxios = createAxiosInstance();
export const authAxios = createAxiosInstanceWithAuth();
