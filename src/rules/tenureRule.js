export function applyTenureRule(roi, tenure, caseType, notes) {

  // Base grid valid for 39–60 months
  if (tenure >= 24 && tenure <= 38) {
    roi += 0.50;
    notes.push("Tenure 24–38 months: +0.50%");
  }

  if (tenure >= 61 && tenure <= 84) {
    roi += 0.15;
    notes.push("Tenure 61–84 months: +0.15%");
  }

  // Banking surrogate restriction
  if (caseType === "surrogate" && tenure > 60) {
    throw new Error("Banking surrogate cases max tenure is 60 months");
  }

  return roi;
}
