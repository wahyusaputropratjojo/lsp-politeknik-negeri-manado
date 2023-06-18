const SvgClockFastForward = ({ title, titleId, ...props }) => (
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
      d="m22.7 11.5-2 2-2-2m2.245 1.5A9 9 0 1 0 19 17.657M12 7v5l3 2"
    />
  </svg>
);
export default SvgClockFastForward;
