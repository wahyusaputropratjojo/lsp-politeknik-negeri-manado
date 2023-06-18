const SvgCloudMoon = ({ title, titleId, ...props }) => (
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
      d="M16.5 13a5.502 5.502 0 0 0 5.337-4.163 5.5 5.5 0 0 1-6.673-6.672 5.502 5.502 0 0 0-3.548 7.867M5 7V3M3 5h4M6 22a4 4 0 0 1-.679-7.942 6.003 6.003 0 0 1 10.968-.893A4.5 4.5 0 1 1 17.5 22H6.001Z"
    />
  </svg>
);
export default SvgCloudMoon;
