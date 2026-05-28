export function saveScore(entry) {
  const scores = JSON.parse(localStorage.getItem("scores") || "[]");
  scores.push(entry);
  localStorage.setItem("scores", JSON.stringify(scores));
}
