const SvgShare06 = ({ title, titleId, ...props }) => (
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
      d="M20.791 12.607c.244-.209.366-.314.411-.438a.5.5 0 0 0 0-.338c-.045-.125-.167-.23-.41-.439l-8.471-7.26c-.42-.36-.63-.54-.809-.545a.5.5 0 0 0-.4.184C11 3.909 11 4.186 11 4.739v4.295a9.666 9.666 0 0 0-8 9.517v.612a11.4 11.4 0 0 1 8-4.093v4.19c0 .554 0 .83.112.969a.5.5 0 0 0 .4.184c.178-.005.388-.185.809-.545l8.47-7.26Z"
    />
  </svg>
);
export default SvgShare06;
