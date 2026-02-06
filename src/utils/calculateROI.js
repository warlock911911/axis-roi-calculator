import baseGrid from "../data/baseGrid";
import { applyGeoRule } from "../rules/geoRule";
import { applyTenureRule } from "../rules/tenureRule";
import { applyCibilRule } from "../rules/cibilRule";
import { applyCaseTypeRule } from "../rules/caseTypeRule";

export function calculateROI(inputs) {

  const { segment, tenure, cibil, caseType, isDeepGeo } = inputs;

  let roi = baseGrid[segment].baseRoi;
  let payout = baseGrid[segment].basePayout;
  let notes = [];

  roi = applyTenureRule(roi, tenure, caseType, notes);
  roi = applyGeoRule(roi, isDeepGeo, notes);

  if (caseType === "income") {
    roi = applyCibilRule(roi, segment, cibil, notes);
  }

  roi = applyCaseTypeRule(roi, segment, caseType, notes);

  // payout increment logic
  const diff = roi - baseGrid[segment].baseRoi;
  if (diff > 0) {
    payout = Math.min(1.40, payout + Math.floor(diff / 0.10) * 0.10);
  }

  return {
    finalRoi: roi.toFixed(2),
    payout: payout.toFixed(2),
    notes
  };
}
