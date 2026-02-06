export function applyCaseTypeRule(roi, segment, caseType, notes) {

  // Banking surrogate
  if (caseType === "surrogate") {
    const map = { A:0.55, B:0.55, C:0.50, "C+":0.60, D:0.55 };
    roi += map[segment];
    notes.push("Banking surrogate loading");
  }

  // Preapproved / Prequalified
  if (caseType === "preapproved") {
    const map = { A:-0.45, B:-0.20, C:-0.10, "C+":0, D:0 };
    roi += map[segment];
    notes.push("Preapproved adjustment");
  }

  return roi;
}
