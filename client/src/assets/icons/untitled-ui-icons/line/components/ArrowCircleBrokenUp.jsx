const SvgArrowCircleBrokenUp = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 20.662A9.996 9.996 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.996 9.996 0 0 1-5 8.662M16 12l-4-4m0 0-4 4m4-4v14"
    />
  </svg>
);
export default SvgArrowCircleBrokenUp;
