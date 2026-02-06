export function applyCibilRule(roi, segment, cibil, notes) {

  if (cibil >= 750) return roi;

  if (cibil >= 731 && cibil <= 749) {
    const map = { A:0.15, B:0.20, C:0.20, "C+":0.20, D:0.25 };
    roi += map[segment];
    notes.push("CIBIL 731–749 loading");
  }

  else if (cibil >= 700 && cibil <= 730) {
    const map = { A:0.40, B:0.40, C:0.35, "C+":0.45, D:0.40 };
    roi += map[segment];
    notes.push("CIBIL 700–730 loading");
  }

  else {
    const map = { A:0.65, B:0.65, C:0.60, "C+":0.70, D:0.65 };
    roi += map[segment];
    notes.push("CIBIL <700 loading");
  }

  return roi;
}
