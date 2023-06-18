const SvgLogOut03 = ({ title, titleId, ...props }) => (
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
      d="m16 17 5-5m0 0-5-5m5 5H9m3 5c0 .295 0 .443-.011.571a3 3 0 0 1-2.404 2.686 7.313 7.313 0 0 1-.567.074l-1.021.114c-1.535.17-2.302.255-2.911.06a3 3 0 0 1-1.825-1.633C3 18.288 3 17.516 3 15.972V8.028c0-1.544 0-2.316.261-2.9a3 3 0 0 1 1.825-1.634c.61-.195 1.376-.11 2.91.061l1.022.114c.294.032.441.048.567.074a3 3 0 0 1 2.404 2.685C12 6.556 12 6.704 12 7"
    />
  </svg>
);
export default SvgLogOut03;
