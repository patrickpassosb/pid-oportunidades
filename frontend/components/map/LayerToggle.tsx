export function LayerToggle({
  label,
  description,
  active = true,
}: {
  label: string;
  description?: string;
  active?: boolean;
}) {
  return (
    <label className="layer-toggle">
      <input checked={active} readOnly type="checkbox" />
      <span>
        <strong>{label}</strong>
        {description ? <small>{description}</small> : null}
      </span>
    </label>
  );
}
