export default function SummaryBar({ total, favorites }) {
  return <p className="recipe-counts">{total} recipes · {favorites} favorites</p>;
}
