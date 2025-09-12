/**
 * Check if a given option is selected in the filtersOptions for a property
 * @param option - The value to check
 * @param propertyToSearch - Dot-separated property path, e.g., "castMembers.characterName"
 * @param filtersOptions - Record of currently selected filter options
 * @returns boolean indicating if the option is checked
 */
export function isInputOptionChecked(
  option: string,
  propertyToSearch: string,
  filtersOptions: Record<string, string[]>
): boolean {
  // Directly use the full propertyToSearch as the key
  const selectedOptions: string[] = filtersOptions[propertyToSearch] || [];
  return selectedOptions.includes(option);
}
