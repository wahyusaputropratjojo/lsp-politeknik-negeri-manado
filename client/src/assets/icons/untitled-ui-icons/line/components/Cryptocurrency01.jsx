const SvgCryptocurrency01 = ({ title, titleId, ...props }) => (
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
      d="M17.878 20.09a10 10 0 0 1-11.756 0M16.384 3.012a10 10 0 0 1 5.519 10.38m-19.806 0a10 10 0 0 1 5.52-10.38M17.5 12a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
    />
  </svg>
);
export default SvgCryptocurrency01;
