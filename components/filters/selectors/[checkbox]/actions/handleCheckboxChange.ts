/**
 * Handles updating checkbox state and filters when a checkbox is clicked.
 *
 * @param value - The value of the checkbox clicked
 * @param isChecked - Whether the checkbox is checked
 * @param selectedOptions - Current selected options
 * @param setSelectedOptions - State setter for selected options
 * @param filtersOptions - Current filters object
 * @param setFiltersOptions - State setter for filtersOptions
 * @param propertyPath - The property key or dot-notation path
 * @param filtersHandler - Callback to update filters
 */
export function handleCheckboxChange(
  value: string,
  isChecked: boolean,
  selectedOptions: string[],
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>,
  filtersOptions: Record<string, string[]>,
  setFiltersOptions: React.Dispatch<React.SetStateAction<Record<string, string[]>>>, 
  propertyPath: string,
  filtersHandler: (selectedOptions: string[], propertyPath: string) => void
) {
  // Update selected options
  const updatedOptions = isChecked
    ? [...selectedOptions, value]
    : selectedOptions.filter((option) => option !== value);

  // Update local state
  setSelectedOptions(updatedOptions);

  // Update global filters state
  setFiltersOptions({
    ...filtersOptions,
    [propertyPath]: updatedOptions,
  });

  // Trigger filtersHandler
  filtersHandler(updatedOptions, propertyPath);
}
