const SvgCurrencyRuble = ({ title, titleId, ...props }) => (
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
      d="M8.5 11.5h6a4 4 0 0 0 0-8h-6v8Zm0 0h-2m7 4h-7M8.5 4v16.5"
    />
  </svg>
);
export default SvgCurrencyRuble;
