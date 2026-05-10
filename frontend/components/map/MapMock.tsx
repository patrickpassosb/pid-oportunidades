import Link from "next/link";

import { regions } from "@/data/regions";
import { cn } from "@/lib/cn";

type MapMockProps = {
  mode?: "opportunities" | "restrictions" | "compact";
  interactive?: boolean;
};

export function MapMock({ mode = "opportunities", interactive = true }: MapMockProps) {
  return (
    <div className={cn("map-mock", `map-mock--${mode}`)}>
      <div className="map-mock__toolbar">
        <span>Roraima</span>
        <small>Solar fotovoltaica • 5 MW</small>
      </div>
      <div className="map-mock__canvas">
        <svg
          aria-hidden="true"
          className="map-mock__svg"
          viewBox="0 0 420 540"
        >
          <defs>
            <clipPath id={`rr-clip-${mode}`}>
              <path d="M195 18L284 54L329 116L311 183L355 248L318 323L334 412L257 498L175 472L118 522L86 430L103 344L58 272L93 204L76 126L132 62Z" />
            </clipPath>
            <pattern height="28" id={`grid-${mode}`} patternUnits="userSpaceOnUse" width="28">
              <path d="M28 0H0V28" fill="none" stroke="#BECCCC" strokeOpacity="0.35" />
            </pattern>
          </defs>
          <rect fill={`url(#grid-${mode})`} height="540" width="420" />
          <path
            className="map-mock__state"
            d="M195 18L284 54L329 116L311 183L355 248L318 323L334 412L257 498L175 472L118 522L86 430L103 344L58 272L93 204L76 126L132 62Z"
          />
          <g clipPath={`url(#rr-clip-${mode})`}>
            <path className="map-zone map-zone--good" d="M89 76H305V222H72V126Z" />
            <path className="map-zone map-zone--attention" d="M75 210H348V362H98L58 274Z" />
            <path className="map-zone map-zone--good" d="M104 347H330V520H118L84 428Z" />
            <path className="map-zone map-zone--critical" d="M222 20L331 108L302 184L184 151Z" />
            {mode === "restrictions" ? (
              <>
                <path className="map-restriction map-restriction--wine" d="M235 40L319 105L293 170L209 138Z" />
                <path className="map-restriction map-restriction--wine" d="M80 244L169 218L191 304L113 346Z" />
                <path className="map-restriction map-restriction--yellow" d="M215 312L323 340L330 420L232 406Z" />
              </>
            ) : null}
            <path
              className="map-mock__line"
              d="M141 80C166 141 185 207 197 278C210 357 220 424 252 491"
            />
            <path
              className="map-mock__road"
              d="M70 278C124 281 170 271 214 295C252 315 289 312 338 285"
            />
          </g>
          <path
            className="map-mock__border"
            d="M195 18L284 54L329 116L311 183L355 248L318 323L334 412L257 498L175 472L118 522L86 430L103 344L58 272L93 204L76 126L132 62Z"
          />
        </svg>
        {regions.map((region) => {
          const marker = (
            <span className={cn("map-marker", `map-marker--${region.status}`)}>
              <span className="map-marker__pin" />
              <span className="map-marker__label">{region.shortName}</span>
            </span>
          );

          return (
            <span
              className="map-marker-wrap"
              key={region.slug}
              style={{ left: `${region.coordinates.x}%`, top: `${region.coordinates.y}%` }}
            >
              {interactive && region.slug === "boa-vista-mucajai" ? (
                <Link aria-label={`Ver análise de ${region.name}`} href="/regiao/boa-vista-mucajai">
                  {marker}
                </Link>
              ) : (
                marker
              )}
            </span>
          );
        })}
      </div>
      <div className="map-legend" aria-label="Legenda do mapa">
        <span><i className="legend-dot legend-dot--good" />Oportunidade preliminar</span>
        <span><i className="legend-dot legend-dot--attention" />Requer due diligence</span>
        <span><i className="legend-dot legend-dot--critical" />Restrição crítica</span>
      </div>
    </div>
  );
}
