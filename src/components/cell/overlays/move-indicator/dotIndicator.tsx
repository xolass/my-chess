interface DotIndicatorProps {
  isPreMove?: boolean;
}

export function DotIndicator(props: DotIndicatorProps) {
  const { isPreMove } = props;

  const color = isPreMove ? "var(--pre-move-gray)" : "var(--legal-move-green)";

  return (
    <div
      className={"absolute rounded-full size-1/4"}
      style={{
        backgroundColor: color,
      }}
    />
  );
}
