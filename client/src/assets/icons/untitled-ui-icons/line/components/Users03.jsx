const SvgUsers03 = ({ title, titleId, ...props }) => (
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
      d="M18 15.837c1.456.731 2.704 1.905 3.615 3.373.18.29.271.436.302.637.063.409-.216.912-.597 1.073-.187.08-.398.08-.82.08M16 11.532a4.5 4.5 0 0 0 0-8.064M14 7.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM2.56 18.938C4.153 16.545 6.67 15 9.5 15s5.347 1.545 6.94 3.938c.35.525.525.787.505 1.122-.016.26-.187.58-.395.738-.268.202-.636.202-1.372.202H3.822c-.736 0-1.104 0-1.371-.202a1.109 1.109 0 0 1-.395-.738c-.02-.335.154-.597.503-1.122Z"
    />
  </svg>
);
export default SvgUsers03;
