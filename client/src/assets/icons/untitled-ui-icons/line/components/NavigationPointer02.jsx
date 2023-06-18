const SvgNavigationPointer02 = ({ title, titleId, ...props }) => (
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
      d="M5.037 21.325c-.585.257-.877.386-1.057.33a.5.5 0 0 1-.326-.327c-.057-.18.071-.472.328-1.057L11.263 3.67c.232-.528.348-.792.51-.873a.5.5 0 0 1 .446 0c.162.08.278.345.51.873L20.01 20.27c.257.585.385.878.328 1.057a.5.5 0 0 1-.326.326c-.18.057-.472-.072-1.057-.33l-6.637-2.92c-.118-.052-.178-.078-.24-.088a.497.497 0 0 0-.164 0c-.062.01-.121.036-.24.088l-6.637 2.92Z"
    />
  </svg>
);
export default SvgNavigationPointer02;
