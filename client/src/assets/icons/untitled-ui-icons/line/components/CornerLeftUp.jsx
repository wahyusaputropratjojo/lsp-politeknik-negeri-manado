const SvgCornerLeftUp = ({ title, titleId, ...props }) => (
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
      d="M21 20h-3.4c-3.36 0-5.04 0-6.324-.654a6 6 0 0 1-2.622-2.622C8 15.44 8 13.76 8 10.4V4m0 0 5 5M8 4 3 9"
    />
  </svg>
);
export default SvgCornerLeftUp;
