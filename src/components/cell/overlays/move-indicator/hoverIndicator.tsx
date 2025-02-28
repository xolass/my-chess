interface HoverIndicatorProps {
  isPreMove?: boolean;
}

export function HoverIndicator(props: HoverIndicatorProps) {
  const { isPreMove } = props;

  const color = isPreMove ? "var(--pre-move-gray)" : "var(--legal-move-green)";

  return (
    <div
      className={"absolute size-full"}
      style={{
        backgroundColor: color,
      }}
    />
  );
}
