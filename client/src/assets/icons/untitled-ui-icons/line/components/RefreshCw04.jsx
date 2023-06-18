const SvgRefreshCw04 = ({ title, titleId, ...props }) => (
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
      d="M17 5.125A8.5 8.5 0 0 1 12 20.5h-.5M7 18.875A8.5 8.5 0 0 1 12 3.5h.5m.5 18.9-2-2 2-2M11 5.6l2-2-2-2"
    />
  </svg>
);
export default SvgRefreshCw04;
