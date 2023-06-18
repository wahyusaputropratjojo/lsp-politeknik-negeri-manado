const SvgUnderline02 = ({ title, titleId, ...props }) => (
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
      d="M19 4v6a7 7 0 1 1-14 0V4m3.5 0v6a7.003 7.003 0 0 0 5.14 6.75M4 21h16M3 4h7.5M17 4h4"
    />
  </svg>
);
export default SvgUnderline02;
