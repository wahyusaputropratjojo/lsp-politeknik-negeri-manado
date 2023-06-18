const SvgClockRefresh = ({ title, titleId, ...props }) => (
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
      d="M20.453 12.892A8.5 8.5 0 0 1 4.638 16.25l-.25-.433m-.842-4.71A8.5 8.5 0 0 1 19.361 7.75l.25.433M3.493 18.065l.732-2.732 2.732.732m10.085-8.132 2.732.733.732-2.733M12 7.5V12l2.5 1.5"
    />
  </svg>
);
export default SvgClockRefresh;
