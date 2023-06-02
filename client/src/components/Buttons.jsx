export const ButtonPrimaryBig = (props) => {
	const isFillContainer = props.isFillContainer;
	return (
		<>
			<button
				className={
					isFillContainer
						? 'flex w-full items-center justify-center gap-1 rounded-lg bg-primary-500 px-8 py-4 transition-colors ease-in-out hover:bg-primary-600 focus:bg-primary-700'
						: 'flex items-center justify-center gap-1 rounded-lg bg-primary-500 px-8 py-4 transition-colors ease-in-out ease-out hover:bg-primary-600 focus:bg-primary-700'
				}>
				<div>
					{props.leftIcon && (
						<props.leftIcon className="text-xl text-secondary-500" />
					)}
				</div>
				<p className="font-anek-latin text-2xl font-semibold text-secondary-500">
					{props.label}
				</p>
				<div>
					{props.rightIcon && (
						<props.rightIcon className="text-xl text-secondary-500" />
					)}
				</div>
			</button>
		</>
	);
};
