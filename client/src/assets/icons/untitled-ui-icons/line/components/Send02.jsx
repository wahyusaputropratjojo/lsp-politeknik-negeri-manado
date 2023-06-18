const SvgSend02 = ({ title, titleId, ...props }) => (
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
      d="M12 19v-7m.292 7.085 6.978 2.336c.547.183.82.275.99.21a.5.5 0 0 0 .3-.332c.048-.174-.07-.437-.305-.964L12.765 3.623c-.23-.515-.346-.772-.507-.852a.5.5 0 0 0-.443 0c-.16.078-.277.335-.51.85L3.753 20.335c-.237.526-.356.79-.308.964a.5.5 0 0 0 .3.332c.168.066.442-.025.99-.207l7.052-2.34c.094-.032.14-.047.189-.054a.5.5 0 0 1 .128 0c.048.007.095.023.189.054Z"
    />
  </svg>
);
export default SvgSend02;
