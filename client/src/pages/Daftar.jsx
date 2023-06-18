// Packages
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DevTool } from '@hookform/devtools';

// Hooks
import { useRegister } from '../hooks/useAuthentication';

//Logo
import { BNSP, LSP } from '../assets/logo/components';

// Button
import { Button } from '../components/Button';

// Input
import { Input } from '../components/Input';

// Assets
import { InfoCircle } from '../assets/icons/untitled-ui-icons/line/components';

export const Daftar = () => {
	const navigate = useNavigate();

	const onSuccess = (data) => {
		console.log(data);
		navigate('/masuk');
	};

	const { mutate } = useRegister(onSuccess);

	const schema = yup.object().shape({
		nama: yup.string().required('Nama tidak boleh kosong!'),
		email: yup
			.string()
			.required('Email tidak boleh kosong!')
			.email('Format Email tidak valid!'),
		password: yup.string().required('Password tidak boleh kosong!'),
		konfirmasiPassword: yup
			.string()
			.required('Konfirmasi Password tidak boleh kosong!')
			.oneOf([yup.ref('password'), null], 'Password tidak sama!'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
		control,
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onSubmit',
	});

	const onSubmit = (data) => {
		const { nama, email, password } = data;

		const userRegister = {
			nama,
			email,
			password,
		};

		mutate(userRegister);

		// console.log(data);
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
						<h1 className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
							Daftar
						</h1>
						<p className="font-aileron text-base text-secondary-500">
							Sudah punya Akun?{' '}
							<Link
								to="/masuk"
								className="underline">
								Masuk Sekarang
							</Link>
						</p>
					</div>
					<div className="flex max-h-[35rem] flex-col gap-4 overflow-y-auto">
						<Input
							id="nama"
							label="Nama"
							type="text"
							state={errors.nama ? 'true' : 'false'}
							message={errors.nama?.message}
							messageicon={<InfoCircle />}
							register={{ ...register('nama') }}
						/>
						<Input
							id="email"
							label="Email"
							type="text"
							state={errors.email ? 'true' : 'false'}
							message={errors.email?.message}
							messageicon={<InfoCircle />}
							register={{ ...register('email') }}
						/>
						<Input
							id="katasandi"
							label="Password"
							type="password"
							state={errors.password ? 'true' : 'false'}
							message={errors.password?.message}
							messageicon={<InfoCircle />}
							register={{ ...register('password') }}
						/>
						<Input
							id="konfirmasikatasandi"
							label="Konfirmasi Password"
							type="password"
							state={errors.konfirmasiPassword ? 'true' : 'false'}
							message={errors.konfirmasiPassword?.message}
							messageicon={<InfoCircle />}
							register={{ ...register('konfirmasiPassword') }}
						/>
					</div>
					<div>
						<Button
							label="Daftar"
							disabled={isSubmitting}
							fillcontainer="true"
						/>
					</div>
				</form>
				<DevTool control={control} />
			</div>
		</>
	);
};
