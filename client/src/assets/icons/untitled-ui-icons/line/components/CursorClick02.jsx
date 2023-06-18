const SvgCursorClick02 = ({ title, titleId, ...props }) => (
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
      d="M9 3.5V2M5.06 5.06 4 4m1.06 9L4 14.06m9-9L14.06 4M3.5 9H2m6.5-.5 4.111 12.778 2.889-2.89L19.111 22 22 19.111 18.389 15.5l2.889-2.889L8.5 8.5Z"
    />
  </svg>
);
export default SvgCursorClick02;
