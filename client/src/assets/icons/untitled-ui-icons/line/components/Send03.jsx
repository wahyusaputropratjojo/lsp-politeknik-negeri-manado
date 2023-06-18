const SvgSend03 = ({ title, titleId, ...props }) => (
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
      d="M10.5 12H5m-.084.291L2.58 19.266c-.184.548-.275.822-.21.99a.5.5 0 0 0 .332.3c.174.05.438-.07.965-.306l16.711-7.52c.515-.232.772-.348.851-.509a.5.5 0 0 0 0-.443c-.08-.16-.336-.276-.85-.508L3.661 3.748c-.525-.237-.788-.355-.962-.307a.5.5 0 0 0-.332.3c-.066.168.025.441.206.988l2.342 7.056c.032.094.047.141.053.19a.5.5 0 0 1 0 .127c-.006.049-.022.095-.053.19Z"
    />
  </svg>
);
export default SvgSend03;
