interface CaptureIndicatorProps {
  isPreMove?: boolean;
}

export function CaptureIndicator(props: CaptureIndicatorProps) {
  const { isPreMove } = props;

  const color = isPreMove ? "var(--pre-move-gray)" : "var(--legal-move-green)";

  return (
    <div
      className="size-full absolute"
      style={{
        background: `radial-gradient(circle, transparent 0%, transparent 79%, ${color} 80%)`,
      }}
    />
  );
}
