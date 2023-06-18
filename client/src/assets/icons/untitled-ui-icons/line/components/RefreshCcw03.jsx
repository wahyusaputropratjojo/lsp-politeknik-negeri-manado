const SvgRefreshCcw03 = ({ title, titleId, ...props }) => (
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
      d="M14 2s.85.121 4.364 3.636A9 9 0 0 1 14 20.776M14 2h6m-6 0v6m-4 14s-.85-.122-4.364-3.636A9 9 0 0 1 10 3.224M10 22H4m6 0v-6"
    />
  </svg>
);
export default SvgRefreshCcw03;
