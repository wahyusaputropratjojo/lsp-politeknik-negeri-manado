export const Input = (props) => {
	return (
		<>
			<div className="flex flex-col gap-1">
				<p className="font-aileron text-sm text-secondary-300">{props.label}</p>
				<div>
					<input
						type={props.type}
						className="w-full rounded-lg border-2 border-secondary-300 bg-transparent px-4 py-4 font-aileron text-sm text-secondary-300 transition-colors ease-in-out  hover:border-secondary-400 hover:text-secondary-400 focus:border-secondary-500 focus:text-secondary-500 focus:outline-none"
					/>
				</div>
			</div>
		</>
	);
};
