const SvgExpand05 = ({ title, titleId, ...props }) => (
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
      d="m15 9 6-6m0 0h-6m6 0v6M9 9 3 3m0 0v6m0-6h6m0 12-6 6m0 0h6m-6 0v-6m12 0 6 6m0 0v-6m0 6h-6"
    />
  </svg>
);
export default SvgExpand05;
