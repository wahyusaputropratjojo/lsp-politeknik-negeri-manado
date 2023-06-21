import * as yup from 'yup';

export const registerSchema = yup.object().shape({
	nama: yup.string().required('Nama tidak boleh kosong!'),
	email: yup
		.string()
		.email('Format Email tidak valid!')
		.required('Email tidak boleh kosong!'),
	password: yup
		.string()
		.min(6, 'Password minimal 6 karakter!')
		.required('Password tidak boleh kosong!'),
	konfirmasiPassword: yup
		.string()
		.required('Konfirmasi Password tidak boleh kosong!')
		.oneOf(
			[yup.ref('password'), null],
			'Konfirmasi Password tidak sama dengan Password!',
		),
});

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.required('Email tidak boleh kosong!')
		.email('Format Email tidak valid!'),
	password: yup.string().required('Password tidak boleh kosong!'),
});
