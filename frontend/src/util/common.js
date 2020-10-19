import axios from 'axios';

// basic config for axios
const APP_URL = 'http://localhost:3000/';

// instance & interceptor
function create(url, options) {
	const instance = axios.create(Object.assign({ baseURL: url }, options));
	return instance;
}

function createWithAuth(url, options) {
	const instance = axios.create(Object.assign({ baseURL: url }, options));
	instance.interceptors.request.use(config => {
		console.log('axios request interceptor');
		// get Authorization info
		const auth = localStorage.getItem('Auth');
		if(auth)
			config.headers.Authorization = "Bearer " + localStorage.getItem('Auth');

		return config;
	}, error => {
		return Promise.reject(error.response);
	});
	instance.interceptors.response.use(config => {
		return config;
	}, error => {
		return Promise.reject(error.response);
	});
	return instance;
}

export const setAuth = (token) => {
	if(token)
		localStorage.setItem('Auth', token);
};

const base = create(APP_URL);
const baseAuth = createWithAuth(APP_URL);

export const login = (data) => {
	try {
		return base.post('user/login', data)
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const getUserInfo = () => {
	try {
		return baseAuth.get('user/info')
	} catch (error) {
		console.log(error);
		return error;
	}
};