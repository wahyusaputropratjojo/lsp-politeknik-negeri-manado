const SvgHeadphones02 = ({ title, titleId, ...props }) => (
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
      d="M22 17v-4c0-5.523-4.477-10-10-10S2 7.477 2 13v4m5.5 4A2.5 2.5 0 0 1 5 18.5v-3a2.5 2.5 0 0 1 5 0v3A2.5 2.5 0 0 1 7.5 21Zm9 0a2.5 2.5 0 0 1-2.5-2.5v-3a2.5 2.5 0 0 1 5 0v3a2.5 2.5 0 0 1-2.5 2.5Z"
    />
  </svg>
);
export default SvgHeadphones02;
