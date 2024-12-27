export interface FiltersStateInterface {
  searchTerm: string
  selectedCategory: string
  priceRange: { min: number; max: number }
  sortType: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | ''
}
