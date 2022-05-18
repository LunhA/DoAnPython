import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `http://localhost:5000`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // handle the error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // handle the response error
    return Promise.reject(error);
  }
);

export function loginApi({ username, password }) {
  return axiosInstance.post('/login', { username, password });
}

export function registerApi({ username, password}) {
  return axiosInstance.post('/register', { username, password });
}

export function getPaginatedProductsApi(params) {
  return axiosInstance.post('/items', params);
}

export function getProductByIdApi(id) {
  return axiosInstance.get('/item/' + id);
}

