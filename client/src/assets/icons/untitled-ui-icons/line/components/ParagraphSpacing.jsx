const SvgParagraphSpacing = ({ title, titleId, ...props }) => (
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
      d="M21 10h-8m8-4h-8m8 8h-8m8 4h-8m-7 2V4m0 16-3-3m3 3 3-3M6 4 3 7m3-3 3 3"
    />
  </svg>
);
export default SvgParagraphSpacing;
