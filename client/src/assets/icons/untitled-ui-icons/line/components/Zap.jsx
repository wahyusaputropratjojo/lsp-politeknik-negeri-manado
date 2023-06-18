const SvgZap = ({ title, titleId, ...props }) => (
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
      d="M13 2 4.094 12.688c-.35.418-.524.628-.526.804a.5.5 0 0 0 .185.397c.138.111.41.111.955.111H12l-1 8 8.907-10.688c.349-.418.523-.628.526-.804a.5.5 0 0 0-.186-.397c-.138-.111-.41-.111-.955-.111H12l1-8Z"
    />
  </svg>
);
export default SvgZap;
