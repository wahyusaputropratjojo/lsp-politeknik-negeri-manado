const SvgImage05 = ({ title, titleId, ...props }) => (
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
      d="M19 21h1.01c.971 0 1.457 0 1.725-.203a1 1 0 0 0 .395-.737c.02-.335-.25-.74-.788-1.547l-3.01-4.516c-.446-.668-.669-1.002-.949-1.118a1 1 0 0 0-.766 0c-.28.116-.503.45-.948 1.118l-.745 1.116M19 21 11.315 9.9c-.441-.638-.662-.957-.938-1.07a1 1 0 0 0-.754 0c-.276.113-.497.432-.939 1.07l-5.946 8.59c-.563.813-.844 1.22-.828 1.557a1 1 0 0 0 .391.747C2.57 21 3.064 21 4.054 21H19Zm2-15a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);
export default SvgImage05;
