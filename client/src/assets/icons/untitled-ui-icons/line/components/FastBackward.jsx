const SvgFastBackward = ({ title, titleId, ...props }) => (
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
      d="M22 16.437c0 1.13 0 1.695-.229 1.972a1 1 0 0 1-.809.363c-.358-.013-.78-.389-1.625-1.14l-4.992-4.436c-.465-.414-.698-.62-.784-.865a1 1 0 0 1 0-.663c.086-.244.319-.45.784-.864l4.992-4.437c.844-.75 1.267-1.126 1.625-1.14a1 1 0 0 1 .81.364c.228.277.228.842.228 1.972v8.874ZM11 16.437c0 1.13 0 1.695-.229 1.972a1 1 0 0 1-.809.363c-.358-.013-.78-.389-1.625-1.14l-4.992-4.436c-.465-.414-.698-.62-.784-.865a1 1 0 0 1 0-.663c.086-.244.319-.45.784-.864l4.992-4.437c.844-.75 1.267-1.126 1.625-1.14a1 1 0 0 1 .81.364c.228.277.228.842.228 1.972v8.874Z"
    />
  </svg>
);
export default SvgFastBackward;
