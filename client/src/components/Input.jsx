import { cn } from '../utils/cn';

export const Input = (props) => {
	let isError = false;

	if (props.state === 'true') {
		isError = true;
	}

	return (
		<>
			<div className="flex flex-col gap-1">
				<label
					htmlFor={props.id}
					className="font-aileron text-sm text-secondary-300">
					{props.label}
				</label>
				<input
					className={cn(
						'w-full rounded-lg border-2 border-secondary-300 bg-transparent px-4 py-4 font-aileron text-sm text-secondary-300 transition-colors ease-in-out  hover:border-secondary-400 hover:text-secondary-400 focus:border-secondary-500 focus:text-secondary-500 focus:outline-none',
						{
							'border-error-500 hover:border-error-500 focus:border-error-500':
								isError,
						},
					)}
					{...props}
					{...props.register}
				/>
				{props.message && (
					<div className="flex items-center gap-1 rounded-lg bg-error-50 px-4 py-3">
						{props.messageicon && (
							<div className=" text-sm text-error-500">{props.messageicon}</div>
						)}
						<p className="font-aileron text-sm text-error-500">
							{props.message}
						</p>
					</div>
				)}
			</div>
		</>
	);
};
