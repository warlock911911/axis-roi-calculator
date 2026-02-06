import { useState } from "react";
import "./index.css";

const BASE_GRID = {
  A: { roi: 10.0, payout: 1.25 },
  B: { roi: 9.6, payout: 1.4 },
  C: { roi: 9.4, payout: 1.4 },
  "C+": { roi: 9.2, payout: 1.25 },
  D: { roi: 9.0, payout: 0.9 },
};

export default function App() {
  const [caseType, setCaseType] = useState("income");
  const [segment, setSegment] = useState("C");
  const [cibil, setCibil] = useState("750");
  const [tenure, setTenure] = useState(60);
  const [geo, setGeo] = useState(true);
  const [result, setResult] = useState(null);

  const calculate = () => {
    let roi = BASE_GRID[segment].roi;
    let payout = BASE_GRID[segment].payout;
    let notes = [];

    // GEO RULE
    if (geo) {
      roi += 0.1;
      notes.push("Tier-2 / Deep Geo +0.10%");
    }

    // TENURE BASE GRID VALIDITY
    if (caseType === "income") {
      if (tenure >= 24 && tenure <= 38) {
        roi += 0.5;
        notes.push("Tenure 24–38 months +0.50%");
      } else if (tenure >= 61) {
        roi += 0.15;
        notes.push("Tenure 61–84 months +0.15%");
      }
    }

    // INCOME – CIBIL RULES
    if (caseType === "income") {
      const c = Number(cibil);

      if (c >= 750) {
        notes.push("CIBIL ≥750 – No loading");
      } else if (c >= 731 && c <= 749) {
        const map = { A: 0.15, B: 0.2, C: 0.2, "C+": 0.2, D: 0.25 };
        roi += map[segment];
        notes.push(`CIBIL 731–749 +${map[segment]}%`);
      } else if (c >= 700 && c <= 730) {
        const map = { A: 0.4, B: 0.4, C: 0.35, "C+": 0.45, D: 0.4 };
        roi += map[segment];
        notes.push(`CIBIL 700–730 +${map[segment]}%`);
      } else {
        const map = { A: 0.65, B: 0.65, C: 0.6, "C+": 0.7, D: 0.65 };
        roi += map[segment];
        notes.push(`CIBIL <700 +${map[segment]}%`);
      }
    }

    // BANKING SURROGATE
    if (caseType === "surrogate") {
      if (tenure > 60) {
        alert("Banking surrogate max tenure is 60 months");
        return;
      }
      const map = { A: 0.55, B: 0.55, C: 0.5, "C+": 0.6, D: 0.55 };
      roi += map[segment];
      notes.push(`Banking Surrogate +${map[segment]}%`);
    }

    // PREAPPROVED / PREQUALIFIED
    if (caseType === "preapproved") {
      const map = { A: -0.45, B: -0.2, C: -0.1, "C+": 0, D: 0 };
      roi += map[segment];
      notes.push(`Preapproved benefit ${map[segment]}%`);
    }

    // PAYOUT INCREMENT
    const diff = roi - BASE_GRID[segment].roi;
    if (diff > 0) {
      payout = Math.min(1.4, payout + Math.floor(diff / 0.1) * 0.1);
    }

    setResult({ roi: roi.toFixed(2), payout: payout.toFixed(2), notes });
  };

  return (
    <div className="card">
      <h2>Axis ROI Calculator</h2>

      <label>Case Type</label>
      <select value={caseType} onChange={e => setCaseType(e.target.value)}>
        <option value="income">Income Based</option>
        <option value="surrogate">Banking Surrogate</option>
        <option value="preapproved">Preapproved</option>
      </select>

      <label>Vehicle Segment</label>
      <select value={segment} onChange={e => setSegment(e.target.value)}>
        <option>A</option><option>B</option><option>C</option>
        <option>C+</option><option>D</option>
      </select>

      <label>CIBIL Score</label>
      <select
        value={cibil}
        onChange={e => setCibil(e.target.value)}
        disabled={caseType !== "income"}
      >
        <option value="750">≥ 750</option>
        <option value="731">731 – 749</option>
        <option value="700">700 – 730</option>
        <option value="699">&lt; 700</option>
      </select>

      <label>Tenure (Months)</label>
      <select value={tenure} onChange={e => setTenure(Number(e.target.value))}>
        {[24,36,48,60,72,84].map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label>
        <input type="checkbox" checked={geo} onChange={() => setGeo(!geo)} />
        Deep Geo / Tier-2
      </label>

      <button onClick={calculate}>Calculate</button>

      {result && (
        <div className="result">
          <h3>Final ROI: {result.roi}%</h3>
          <p><b>Payout:</b> {result.payout}%</p>
          <small>{result.notes.join(" | ")}</small>
        </div>
      )}
    </div>
  );
}
