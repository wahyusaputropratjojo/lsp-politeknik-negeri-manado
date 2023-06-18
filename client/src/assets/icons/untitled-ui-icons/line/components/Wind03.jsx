const SvgWind03 = ({ title, titleId, ...props }) => (
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
      d="M16.764 6.5a3 3 0 1 1 2.236 5h-6M6.764 4A3 3 0 1 1 9 9H2m8.764 11A3 3 0 1 0 13 15H2"
    />
  </svg>
);
export default SvgWind03;
