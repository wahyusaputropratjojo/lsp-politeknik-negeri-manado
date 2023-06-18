const SvgPuzzlePiece02 = ({ title, titleId, ...props }) => (
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
      d="m12 2 3.6 3.6c2.4-6.3 9.1.4 2.8 2.8L22 12l-3.6 3.6c-2.4-6.3-9.1.4-2.8 2.8L12 22l-3.6-3.6C6 24.7-.7 18 5.6 15.6L2 12l3.6-3.6C8 14.7 14.7 8 8.4 5.6L12 2Z"
    />
  </svg>
);
export default SvgPuzzlePiece02;
