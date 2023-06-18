const SvgBold02 = ({ title, titleId, ...props }) => (
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
      d="M6 4v16M9.5 4h6a4 4 0 0 1 0 8h-6 7a4 4 0 0 1 0 8h-7m0-16v16m0-16H4m5.5 16H4"
    />
  </svg>
);
export default SvgBold02;
