export function BlackRookAsset() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      imageRendering="optimizeQuality"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 50 50"
    >
      <linearGradient id="a" x1={21.192} x2={77.736} y1={37.552} y2={37.429} gradientUnits="userSpaceOnUse">
        <stop offset={0} stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <path
        fill="#1f1a17"
        d="M28.408 9.22h4.216V5.825h6.799v9.296l-5.503 4.242v11.862l4.216 4.216v5.08h3.793v5.927H8.071V40.52h3.793v-5.08l4.242-4.216V19.363l-5.504-4.242V5.825h6.774V9.22h4.242V5.825h6.79z"
      />
      <path
        fill="url(#a)"
        d="M25.013 35.043h-10.27L13.6 36.11v1.44h22.826v-1.44l-1.143-1.067zM13.6 40.123v2.532h22.826v-2.532zM25.013 13.04h-12.7v1.142l1.812 1.364h21.801l1.761-1.364V13.04zm0 4.19h-8.679l1.482 1.169v1.414h14.393v-1.414l1.482-1.168zm0 13.547h-7.197v1.143l-1.482 1.44h17.357l-1.482-1.44v-1.143z"
      />
    </svg>
  );
}
