interface SummaryBarProps {
  total: number;
  favorites: number;
}

export default function SummaryBar({ total, favorites }: SummaryBarProps) {
  return <p className="recipe-counts">{total} recipes · {favorites} favorites</p>;
}
