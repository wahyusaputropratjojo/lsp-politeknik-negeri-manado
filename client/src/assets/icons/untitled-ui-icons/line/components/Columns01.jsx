const SvgColumns01 = ({ title, titleId, ...props }) => (
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
      d="M6.8 3h-.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 4.52 3 5.08 3 6.2v11.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 21 5.08 21 6.2 21h.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C10 19.48 10 18.92 10 17.8V6.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C8.48 3 7.92 3 6.8 3ZM17.8 3h-.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C14 4.52 14 5.08 14 6.2v11.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C15.52 21 16.08 21 17.2 21h.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 19.48 21 18.92 21 17.8V6.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 3 18.92 3 17.8 3Z"
    />
  </svg>
);
export default SvgColumns01;