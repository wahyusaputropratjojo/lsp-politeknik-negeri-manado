const SvgBellRinging04 = ({ title, titleId, ...props }) => (
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
      d="M15.646 18.015a3 3 0 1 1-5.796 1.553m-7.793-7.954a4.007 4.007 0 0 1 1.052-3.926m9.037-1.947a2.5 2.5 0 1 0-3.47.93m11.643.05a4.007 4.007 0 0 0-2.874-2.875m.046 5.6C17.134 8.114 16.18 7 14.84 6.349c-1.339-.65-2.955-.785-4.492-.373-1.537.412-2.87 1.336-3.704 2.57-.834 1.232-1.102 2.674-.745 4.006.59 2.204.475 3.962.102 5.298-.425 1.523-.637 2.284-.58 2.437.066.175.113.223.288.29.152.06.792-.112 2.071-.455l11.865-3.179c1.28-.343 1.92-.514 2.022-.641.117-.146.134-.211.104-.396-.027-.16-.592-.714-1.721-1.82-.991-.97-1.97-2.436-2.56-4.64Z"
    />
  </svg>
);
export default SvgBellRinging04;
