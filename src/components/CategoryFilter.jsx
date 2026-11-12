const FILTERS = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

export default function CategoryFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="category-buttons flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {FILTERS.map((filter) => (
        <button key={filter} type="button" aria-pressed={activeFilter === filter}
          className="category-button"
          onClick={() => onFilterChange(filter)}>{filter}</button>
      ))}
    </div>
  );
}
