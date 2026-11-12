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
    <div className="flex flex-wrap gap-2 justify-center">
      {options.map((c) => (
        <button
          key={c}
          className={`btn btn-sm ${activeFilter === c ? "btn-primary" : "btn-outline"}`}
          onClick={() => onFilterChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
