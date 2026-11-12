interface CategoryFilterProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeFilter,
  onFilterChange,
}: CategoryFilterProps) {
  const options = ["All", ...categories];

  return (
    <div className="category-buttons flex flex-wrap gap-2">
      {options.map((c) => (
        <button
          key={c}
          className="category-button"
          aria-pressed={activeFilter === c}
          onClick={() => onFilterChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
