const SvgCloud01 = ({ title, titleId, ...props }) => (
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
      d="M6.5 19a4.5 4.5 0 0 1-.42-8.98 6.002 6.002 0 0 1 11.84 0A4.5 4.5 0 0 1 17.5 19h-11Z"
    />
  </svg>
);
export default SvgCloud01;
