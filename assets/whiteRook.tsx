export function WhiteRookAsset() {
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
      <linearGradient id="a" x1={21.376} x2={77.641} y1={37.469} y2={37.469} gradientUnits="userSpaceOnUse">
        <stop offset={0} stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <path
        fill="#1f1a17"
        d="M28.408 9.22h4.216V5.825h6.799v9.296l-5.503 4.242v11.862l4.216 4.216v5.08h3.793v5.927H8.071V40.52h3.793v-5.08l4.242-4.216V19.363l-5.504-4.242V5.825h6.774V9.22h4.242V5.825h6.79z"
      />
      <path
        fill="url(#a)"
        d="m33.073 17.678 3.15-2.557h-22.42l3.175 2.557zm7.197 24.528H9.756v2.557H40.27zm-3.844-5.055H13.6v3.37h22.826zm-4.217-17.788H17.816v11.862h14.393zm5.504-5.927V7.51h-3.395v3.395h-7.646V7.51h-3.344v3.395h-7.62V7.51h-3.395v5.926zm-1.914 22.005-2.548-2.531H16.8l-2.6 2.531z"
      />
    </svg>
  );
}
