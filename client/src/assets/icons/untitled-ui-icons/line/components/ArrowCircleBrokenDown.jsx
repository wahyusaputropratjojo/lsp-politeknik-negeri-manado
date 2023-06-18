const SvgArrowCircleBrokenDown = ({ title, titleId, ...props }) => (
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
      d="M17 3.338A9.996 9.996 0 0 1 22 12c0 5.523-4.477 10-10 10S2 17.523 2 12a9.996 9.996 0 0 1 5-8.662M8 12l4 4m0 0 4-4m-4 4V2"
    />
  </svg>
);
export default SvgArrowCircleBrokenDown;
