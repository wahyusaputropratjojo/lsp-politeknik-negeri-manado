import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true,
});

// export const axiosPrivate = axios.create({
// 	baseURL: 'http://localhost:3000/api',
// 	headers: { 'Content-Type': 'application/json' },
// 	withCredentials: true,
// });

// export const setAccessToken = (accessToken) => {
// 	instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
// };
