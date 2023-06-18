const SvgLetterSpacing02 = ({ title, titleId, ...props }) => (
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
      d="M2 18h20M2 18l3-3m-3 3 3 3m17-3-3-3m3 3-3 3M7 3h10m-5 0v11"
    />
  </svg>
);
export default SvgLetterSpacing02;
