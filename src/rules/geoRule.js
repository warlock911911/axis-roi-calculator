export function applyGeoRule(roi, isDeepGeo, notes) {
  if (isDeepGeo) {
    roi += 0.10;
    notes.push("Tier-2 / Deep Geo: +0.10%");
  }
  return roi;
}
