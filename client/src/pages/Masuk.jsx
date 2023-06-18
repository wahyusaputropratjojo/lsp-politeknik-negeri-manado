// Packages
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DevTool } from '@hookform/devtools';

// Context
import { AuthContext } from '../context/AuthContext';

// Hooks
import { useLogin, useRefreshToken } from '../hooks/useAuthentication';

// Components
import { Input } from '../components/Input';
import { Button } from '../components/Button';

// Assets
import { BNSP, LSP } from '../assets/logo/components';
import { InfoCircle } from '../assets/icons/untitled-ui-icons/line/components';

export const Masuk = () => {
	const navigate = useNavigate();
	const { setAuth } = useContext(AuthContext);

	const schema = yup.object().shape({
		email: yup
			.string()
			.required('Email tidak boleh kosong!')
			.email('Format Email tidak valid!'),
		password: yup.string().required('Password tidak boleh kosong!'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onSubmit',
	});

	const onSuccess = (data) => {
		const { id, email, role, accessToken } = data.data;
		setAuth({ id, email, role, accessToken });
		navigate('/');
	};

	const { data, mutate } = useLogin(onSuccess);

	const onSubmit = (user) => {
		const { email, password } = user;
		const userLogin = {
			email,
			password,
		};

		mutate(userLogin);
	};
	return (
		<>
			<div className="flex h-full justify-center gap-16">
				<div className="flex h-full w-[28rem] min-w-max flex-col justify-between rounded-2xl bg-shades-white p-12">
					<div>
						<LSP className="h-12" />
					</div>
					<div className="flex flex-col gap-2">
						<p className="font-anek-latin text-[2.5rem] font-semibold text-secondary-500">
							Raih Kesuksesan.
						</p>
						<p className="w-80 font-aileron text-base text-secondary-500">
							Maju Bersama Politeknik Negeri Manado dan Raih Sertifikasi Profesi
							untuk Sukseskan Karier Anda!
						</p>
					</div>
					<div>
						<BNSP className="h-8" />
					</div>
				</div>
				<form
					className="flex w-[28rem] flex-col justify-between gap-12 py-8"
					onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col">
						<p className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
							Masuk
						</p>
						<p className="font-aileron text-base text-secondary-500">
							Belum punya Akun?{' '}
							<Link
								to="/daftar"
								className="underline">
								Daftar Sekarang
							</Link>
						</p>
					</div>
					<div className="flex max-h-[35rem] flex-col gap-4">
						<Input
							label="Email"
							type="email"
							state={errors.email ? 'true' : 'false'}
							message={errors.email?.message}
							messageicon={<InfoCircle />}
							register={{ ...register('email') }}
						/>
						<Input
							label="Password"
							type="password"
							state={errors.password ? 'true' : 'false'}
							message={errors.password?.message}
							messageicon={<InfoCircle />}
							register={{ ...register('password') }}
						/>
					</div>
					<div>
						<Button
							label="Masuk"
							fillcontainer="true"
						/>
					</div>
				</form>
				<DevTool control={control} />
			</div>
		</>
	);
};
