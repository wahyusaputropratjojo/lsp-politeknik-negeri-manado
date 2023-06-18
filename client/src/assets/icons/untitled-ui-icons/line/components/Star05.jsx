const SvgStar05 = ({ title, titleId, ...props }) => (
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
      d="m12 2-1.302 5.206c-.254 1.016-.38 1.524-.645 1.937a3 3 0 0 1-.91.91c-.413.265-.921.391-1.937.645L2 12l5.206 1.302c1.016.254 1.524.38 1.937.645a3 3 0 0 1 .91.91c.265.413.391.921.645 1.937L12 22l1.302-5.206c.254-1.016.38-1.524.645-1.937.234-.366.544-.676.91-.91.413-.265.921-.391 1.937-.645L22 12l-5.206-1.302c-1.016-.254-1.524-.38-1.937-.645a3 3 0 0 1-.91-.91c-.265-.413-.391-.921-.645-1.937L12 2Z"
    />
  </svg>
);
export default SvgStar05;
