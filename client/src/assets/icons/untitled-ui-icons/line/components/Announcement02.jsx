const SvgAnnouncement02 = ({ title, titleId, ...props }) => (
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
      d="M4 14 5.575 20.3c.044.177.066.266.092.343A2 2 0 0 0 7.4 21.994c.08.006.172.006.355.006.228 0 .343 0 .44-.009a2 2 0 0 0 1.797-1.797c.009-.097.009-.211.009-.44V5.5m8.5 8a3.5 3.5 0 1 0 0-7m-8.25-1H6.5a4.5 4.5 0 0 0 0 9h3.75c1.766 0 3.927.947 5.594 1.856.973.53 1.46.795 1.778.756a.946.946 0 0 0 .691-.41c.187-.262.187-.784.187-1.828V5.127c0-1.045 0-1.567-.187-1.828a.946.946 0 0 0-.691-.41c-.319-.04-.805.226-1.778.756-1.667.909-3.828 1.855-5.594 1.855Z"
    />
  </svg>
);
export default SvgAnnouncement02;
