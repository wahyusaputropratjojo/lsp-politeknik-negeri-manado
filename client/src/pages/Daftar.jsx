import { Link } from 'react-router-dom';

import { LogoBNSP, LogoLSP } from '../assets/logo/Logo';

// Button
import { ButtonPrimaryBig } from '../components/Buttons';

// Input
import { Input } from '../components/Inputs';

export const Daftar = () => {
	return (
		<>
			<div className="flex h-full justify-center gap-16">
				<div className="flex h-full w-[28rem] min-w-max flex-col justify-between rounded-2xl bg-shades-white px-16 py-16">
					<div>
						<LogoLSP className="h-12" />
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
						<LogoBNSP className="h-8" />
					</div>
				</div>
				<div className="flex w-[28rem] flex-col justify-between py-16">
					<div className="flex flex-col gap-2">
						<p className="font-anek-latin text-5xl font-semibold uppercase text-secondary-500">
							Daftar
						</p>
						<p className="font-aileron text-base text-secondary-500">
							Sudah punya Akun?{' '}
							<Link
								to="/masuk"
								className="underline">
								Masuk Sekarang
							</Link>
						</p>
					</div>
					<div className="flex flex-col gap-4">
						<Input
							label="Nama"
							type="text"
						/>
						<Input
							label="Email"
							type="text"
						/>
						<Input
							label="Kata Sandi"
							type="password"
						/>
					</div>
					<div>
						<ButtonPrimaryBig
							label="Daftar"
							isFillContainer={true}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
