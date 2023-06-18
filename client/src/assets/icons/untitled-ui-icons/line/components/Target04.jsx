const SvgTarget04 = ({ title, titleId, ...props }) => (
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
      d="M16 8V5l3-3 1 2 2 1-3 3h-3Zm0 0-4 4m10 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m5 10a5 5 0 1 1-5-5"
    />
  </svg>
);
export default SvgTarget04;
