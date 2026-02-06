import { useState } from "react";
import { calculateROI } from "./utils/calculateROI";
import "./App.css";

export default function App() {

  const [caseType, setCaseType] = useState("income");
  const [segment, setSegment] = useState("C");
  const [cibil, setCibil] = useState(750);
  const [tenure, setTenure] = useState(60);
  const [isDeepGeo, setIsDeepGeo] = useState(true);

  const [result, setResult] = useState(null);
  const [showPayout, setShowPayout] = useState(false);

  const handleCalculate = () => {
    try {
      const res = calculateROI({
        caseType,
        segment,
        cibil,
        tenure,
        isDeepGeo
      });
      setResult(res);
      setShowPayout(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePayout = () => {
    const pwd = prompt("Enter password");
    if (pwd === "3322") {
      setShowPayout(true);
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="card">
      <h2>Axis New Car Loan – ROI Calculator</h2>

      {/* Case Type */}
      <label>Type of Case</label>
      <div className="row">
        <label>
          <input
            type="radio"
            checked={caseType === "income"}
            onChange={() => setCaseType("income")}
          />
          Income Based
        </label>

        <label>
          <input
            type="radio"
            checked={caseType === "surrogate"}
            onChange={() => setCaseType("surrogate")}
          />
          Banking Surrogate
        </label>

        <label>
          <input
            type="radio"
            checked={caseType === "preapproved"}
            onChange={() => setCaseType("preapproved")}
          />
          Preapproved / Prequalified
        </label>
      </div>

      {/* Segment */}
      <label>Vehicle Segment</label>
      <select value={segment} onChange={(e) => setSegment(e.target.value)}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="C+">C+</option>
        <option value="D">D</option>
      </select>

      {/* CIBIL */}
      <label>CIBIL Score</label>
      <select
        value={cibil}
        disabled={caseType !== "income"}
        onChange={(e) => setCibil(Number(e.target.value))}
      >
        <option value={750}>&gt;= 750</option>
        <option value={740}>730 – 749</option>
        <option value={710}>700 – 729</option>
        <option value={680}>&lt; 700</option>
      </select>

      {/* Tenure */}
      <label>Tenure (Months)</label>
      <select value={tenure} onChange={(e) => setTenure(Number(e.target.value))}>
        <option value={24}>24</option>
        <option value={36}>36</option>
        <option value={48}>48</option>
        <option value={60}>60</option>
        <option value={72}>72</option>
        <option value={84}>84</option>
      </select>

      {/* Geo */}
      <label>Location</label>
      <div className="row">
        <label>
          <input
            type="radio"
            checked={isDeepGeo}
            onChange={() => setIsDeepGeo(true)}
          />
          Deep Geo / Tier-2
        </label>

        <label>
          <input
            type="radio"
            checked={!isDeepGeo}
            onChange={() => setIsDeepGeo(false)}
          />
          Non Deep Geo
        </label>
      </div>

      <button onClick={handleCalculate}>Calculate Rate</button>

      {result && (
        <div className="result">
          <div className="big">Final ROI: {result.finalRoi}%</div>

          <div className="small">
            {result.notes.map((note, idx) => (
              <div key={idx}>{note}</div>
            ))}
          </div>

          <div className="more" onClick={handlePayout}>
            More Info
          </div>

          {showPayout && (
            <div className="payout">
              <div className="big">Payout: {result.payout}%</div>
              <div className="small">
                Payout calculated based on incremental ROI rules
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
