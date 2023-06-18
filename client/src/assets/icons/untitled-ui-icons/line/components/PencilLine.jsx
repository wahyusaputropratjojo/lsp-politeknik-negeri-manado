const SvgPencilLine = ({ title, titleId, ...props }) => (
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
      d="M21 21h-8m-10.5.5 5.55-2.134c.354-.136.532-.205.698-.294.147-.08.288-.17.42-.273.149-.116.283-.25.552-.519L21 7a2.828 2.828 0 1 0-4-4L5.72 14.28c-.269.269-.403.403-.519.552a2.997 2.997 0 0 0-.273.42c-.089.167-.157.344-.294.699L2.5 21.501Zm0 0 2.058-5.35c.147-.384.221-.575.347-.663a.5.5 0 0 1 .38-.08c.15.029.295.174.585.464l2.26 2.259c.29.29.435.435.464.586a.5.5 0 0 1-.08.379c-.089.126-.28.2-.663.347L2.5 21.5Z"
    />
  </svg>
);
export default SvgPencilLine;
