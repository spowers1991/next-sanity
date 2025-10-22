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
 * @param setShowAnimation
 */
export function handleCheckboxChange(
  value: string,
  isChecked: boolean,
  selectedOptions: string[],
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>,
  propertyPath: string,
  STATE_filtersOptions: Record<string, string[]>,
  STATE_setFiltersOptions: React.Dispatch<React.SetStateAction<Record<string, string[]>>>, 
  STATE_filtersOptionsHandler: (propertyPath: string, selectedOptions: string[]) => void,
  STATE_setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>
) {
  STATE_setShowAnimation(true)
  // Update selected options
  const updatedOptions = isChecked
    ? [...selectedOptions, value]
    : selectedOptions.filter((option) => option !== value);

  // Update local state
  setSelectedOptions(updatedOptions);

  // Update global filters state
  STATE_setFiltersOptions({
    ...STATE_filtersOptions,
    [propertyPath]: updatedOptions,
  });
  // Trigger filtersOptionsHandler
  STATE_filtersOptionsHandler(propertyPath, updatedOptions);
}