const SvgEraser = ({ title, titleId, ...props }) => (
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
      d="m18 13-7-7m10 15H8m2.937-.938 8.668-8.668c1.189-1.188 1.782-1.782 2.005-2.467a3.001 3.001 0 0 0 0-1.854c-.223-.685-.816-1.28-2.005-2.468l-.211-.211c-1.188-1.188-1.782-1.782-2.467-2.005a3 3 0 0 0-1.854 0c-.686.223-1.28.817-2.468 2.005l-8.211 8.211c-1.188 1.188-1.782 1.782-2.005 2.467a3 3 0 0 0 0 1.855c.223.685.817 1.279 2.005 2.467l.668.668c.346.346.52.52.721.643.179.11.374.19.578.24.23.055.475.055.964.055h1.35c.488 0 .733 0 .963-.056.204-.049.4-.13.578-.24.202-.123.375-.296.72-.642Z"
    />
  </svg>
);
export default SvgEraser;
