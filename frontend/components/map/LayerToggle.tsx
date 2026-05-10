"use client";

export function LayerToggle({
  label,
  description,
  active = true,
  onChange,
}: {
  label: string;
  description?: string;
  active?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label className="layer-toggle">
      <input
        checked={active}
        onChange={(e) => onChange?.(e.target.checked)}
        type="checkbox"
      />
      <span>
        <strong>{label}</strong>
        {description ? <small>{description}</small> : null}
      </span>
    </label>
  );
}
