const SvgArrowCircleBrokenUpRight = ({ title, titleId, ...props }) => (
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
      d="M2.34 14.59a9.996 9.996 0 0 1 2.589-9.661c3.905-3.905 10.237-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142a9.996 9.996 0 0 1-9.66 2.59M15 15V9m0 0H9m6 0L5 19"
    />
  </svg>
);
export default SvgArrowCircleBrokenUpRight;
