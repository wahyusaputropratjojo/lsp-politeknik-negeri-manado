const SvgSignal02 = ({ title, titleId, ...props }) => (
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
      d="M16.243 5.757a6 6 0 0 1 0 8.485m-8.486 0a6 6 0 0 1 0-8.485M4.93 17.071c-3.906-3.905-3.906-10.237 0-14.142m14.142 0c3.905 3.905 3.905 10.237 0 14.142M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v9"
    />
  </svg>
);
export default SvgSignal02;
