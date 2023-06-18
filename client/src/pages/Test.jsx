import { Button } from '../components/Button';

import { CheckCircle } from '../assets/icons/untitled-ui-icons/line/components';

export const Test = () => {
	return (
		<>
			<div className="mx-[auto] flex h-[100vh] max-w-[16rem] items-center justify-center">
				<Button
					label="Daftar"
					icon={<CheckCircle />}
				/>
			</div>
		</>
	);
};
