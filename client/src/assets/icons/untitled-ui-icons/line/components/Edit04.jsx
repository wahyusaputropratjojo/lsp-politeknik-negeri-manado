const SvgEdit04 = ({ title, titleId, ...props }) => (
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
      d="m21 18-1 1.094c-.53.58-1.25.906-2 .906a2.71 2.71 0 0 1-2-.906 2.716 2.716 0 0 0-2-.904c-.75 0-1.469.325-2 .904M3 20h1.675c.489 0 .733 0 .963-.055a2 2 0 0 0 .579-.24c.201-.123.374-.296.72-.642L19.5 6.5a2.121 2.121 0 1 0-3-3L3.937 16.063c-.346.346-.519.519-.642.72-.11.18-.19.375-.24.579-.055.23-.055.475-.055.964V20Z"
    />
  </svg>
);
export default SvgEdit04;
