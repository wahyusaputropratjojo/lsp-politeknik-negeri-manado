const SvgSunSetting02 = ({ title, titleId, ...props }) => (
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
      d="M22 16.5H2M20 20H4m8-17v2m-8 8H2m4.314-5.686L4.9 5.9m12.786 1.414L19.1 5.9M22 13h-2M7 13a5 5 0 0 1 10 0"
    />
  </svg>
);
export default SvgSunSetting02;
