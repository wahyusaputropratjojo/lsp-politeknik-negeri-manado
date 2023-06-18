const SvgCloudBlank02 = ({ title, titleId, ...props }) => (
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
      d="M9.5 19a7.5 7.5 0 1 1 6.641-10.988A5.5 5.5 0 1 1 16.5 19h-7Z"
    />
  </svg>
);
export default SvgCloudBlank02;
