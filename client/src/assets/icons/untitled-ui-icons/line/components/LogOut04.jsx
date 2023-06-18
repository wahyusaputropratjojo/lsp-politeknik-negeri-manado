const SvgLogOut04 = ({ title, titleId, ...props }) => (
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
      d="m18 8 4 4m0 0-4 4m4-4H9m6-7.796A8.383 8.383 0 0 0 10.667 3C5.88 3 2 7.03 2 12s3.88 9 8.667 9A8.384 8.384 0 0 0 15 19.796"
    />
  </svg>
);
export default SvgLogOut04;
