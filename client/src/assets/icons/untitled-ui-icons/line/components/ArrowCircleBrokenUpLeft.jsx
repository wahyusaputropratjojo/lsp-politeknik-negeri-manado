const SvgArrowCircleBrokenUpLeft = ({ title, titleId, ...props }) => (
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
      d="M14.59 21.66a9.996 9.996 0 0 1-9.661-2.589c-3.905-3.905-3.905-10.237 0-14.142 3.905-3.905 10.237-3.905 14.142 0a9.996 9.996 0 0 1 2.59 9.66M9 15V9m0 0h6M9 9 19 19"
    />
  </svg>
);
export default SvgArrowCircleBrokenUpLeft;
