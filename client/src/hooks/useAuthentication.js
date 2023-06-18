import { useMutation } from '@tanstack/react-query';
import { axiosPublic, axiosPrivate } from '../utils/axios';

export const useRegister = (onSuccess) => {
	return useMutation({
		mutationFn: (data) => {
			return axiosPublic.post('/auth/register', data);
		},
		onSuccess,
	});
};

export const useLogin = (onSuccess) => {
	return useMutation({
		mutationFn: (data) => {
			return axiosPublic.post('/auth/login', data);
		},
		onSuccess,
	});
};

export const useRefreshToken = () => {
	return useMutation({
		mutationFn: () => {
			return axiosPrivate.get('/auth/token/access/refresh');
		},
	});
};
