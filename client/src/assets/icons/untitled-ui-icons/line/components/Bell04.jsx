const SvgBell04 = ({ title, titleId, ...props }) => (
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
      d="M14.39 18.015a3 3 0 0 1-5.795 1.553m2.296-13.827a2.5 2.5 0 1 0-3.47.93m8.815 2.775c-.357-1.332-1.31-2.446-2.65-3.097-1.339-.65-2.955-.785-4.492-.373-1.537.412-2.869 1.336-3.704 2.57-.834 1.232-1.102 2.674-.745 4.006.59 2.204.476 3.962.103 5.298-.425 1.523-.638 2.284-.58 2.437.065.175.113.223.287.29.152.06.792-.112 2.071-.455l11.866-3.179c1.28-.343 1.919-.514 2.021-.641.117-.146.134-.211.104-.396-.027-.16-.591-.714-1.721-1.82-.991-.97-1.97-2.436-2.56-4.64Z"
    />
  </svg>
);
export default SvgBell04;
