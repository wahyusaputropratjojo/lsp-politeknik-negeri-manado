const SvgAnnouncement01 = ({ title, titleId, ...props }) => (
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
      d="M22 8v4M10.25 5.5H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 7.78 2 8.62 2 10.3v1.2c0 .932 0 1.398.152 1.766a2 2 0 0 0 1.083 1.082c.367.152.833.152 1.765.152v4.25c0 .233 0 .349.01.446a2 2 0 0 0 1.794 1.795c.098.01.214.01.446.01s.348 0 .446-.01a2 2 0 0 0 1.794-1.795c.01-.097.01-.213.01-.446V14.5h.75c1.766 0 3.927.947 5.594 1.856.973.53 1.46.795 1.778.756a.946.946 0 0 0 .691-.41c.187-.262.187-.784.187-1.828V5.127c0-1.045 0-1.567-.187-1.828a.946.946 0 0 0-.691-.41c-.319-.04-.805.226-1.778.756-1.667.909-3.828 1.855-5.594 1.855Z"
    />
  </svg>
);
export default SvgAnnouncement01;
