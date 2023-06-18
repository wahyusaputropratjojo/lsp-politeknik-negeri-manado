const SvgSpacingHeight01 = ({ title, titleId, ...props }) => (
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
      d="M12 18V6m0 12-3-2m3 2 3-2M12 6 9 8m3-2 3 2m6-5H3m18 18H3"
    />
  </svg>
);
export default SvgSpacingHeight01;
