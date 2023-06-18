const SvgShieldDollar = ({ title, titleId, ...props }) => (
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
      d="M9.213 14.5c.312.595.936 1 1.654 1H13a2 2 0 1 0 0-4h-2a2 2 0 1 1 0-4h2.133c.718 0 1.342.405 1.654 1M12 6v1.5m0 8V17m8-5c0 4.908-5.354 8.478-7.302 9.615-.221.129-.332.194-.488.227a1.137 1.137 0 0 1-.42 0c-.156-.033-.267-.098-.488-.227C9.354 20.478 4 16.908 4 12V7.218c0-.8 0-1.2.13-1.543a2 2 0 0 1 .548-.79c.276-.243.65-.383 1.398-.664l5.362-2.01c.208-.078.312-.117.419-.133a1 1 0 0 1 .286 0c.107.016.21.055.419.133l5.362 2.01c.748.281 1.123.421 1.398.665a2 2 0 0 1 .547.789c.131.343.131.743.131 1.543V12Z"
    />
  </svg>
);
export default SvgShieldDollar;
