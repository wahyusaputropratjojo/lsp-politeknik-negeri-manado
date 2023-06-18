const SvgCryptocurrency02 = ({ title, titleId, ...props }) => (
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
      d="M17.878 20.09a10 10 0 0 1-11.756 0M16.384 3.012a10 10 0 0 1 5.519 10.38m-19.806 0a10 10 0 0 1 5.52-10.38m3.817 3.553-4.868 4.87c-.198.197-.297.296-.335.41a.5.5 0 0 0 0 .31c.038.113.137.212.335.41l4.868 4.87c.198.197.297.296.411.333a.5.5 0 0 0 .31 0c.114-.037.213-.136.41-.334l4.87-4.869c.197-.198.296-.297.333-.41a.5.5 0 0 0 0-.31c-.037-.114-.136-.213-.334-.41l-4.868-4.87c-.198-.198-.297-.297-.412-.334a.5.5 0 0 0-.309 0c-.114.037-.213.136-.41.334Z"
    />
  </svg>
);
export default SvgCryptocurrency02;
