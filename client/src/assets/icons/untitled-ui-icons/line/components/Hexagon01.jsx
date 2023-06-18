const SvgHexagon01 = ({ title, titleId, ...props }) => (
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
      d="M11.223 2.431c.284-.157.425-.236.575-.267a1 1 0 0 1 .403 0c.15.03.292.11.576.267l7.4 4.111c.3.167.45.25.558.368a1 1 0 0 1 .215.364c.05.153.05.324.05.667v8.117c0 .343 0 .514-.05.667a1 1 0 0 1-.215.364c-.109.118-.258.201-.558.368l-7.4 4.11c-.284.159-.425.237-.575.268a.998.998 0 0 1-.403 0c-.15-.03-.292-.11-.576-.267l-7.4-4.111c-.3-.167-.45-.25-.558-.368a1 1 0 0 1-.215-.364C3 16.572 3 16.4 3 16.058V7.941c0-.343 0-.514.05-.667a1 1 0 0 1 .215-.364c.109-.118.258-.201.558-.368l7.4-4.11Z"
    />
  </svg>
);
export default SvgHexagon01;
