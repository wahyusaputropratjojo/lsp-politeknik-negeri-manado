const SvgAlarmClockPlus = ({ title, titleId, ...props }) => (
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
      d="M5 3 2 6m20 0-3-3M6 19l-2 2m14-2 2 2m-8-5v-6m-3 3h6m-3 8a8 8 0 1 0 0-16.001A8 8 0 0 0 12 21Z"
    />
  </svg>
);
export default SvgAlarmClockPlus;
