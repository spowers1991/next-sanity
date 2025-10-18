export interface FilterConfigItem {
  type: "checkbox" | "textSearch";
  label: string;
  propertyToSearch: string;
}
