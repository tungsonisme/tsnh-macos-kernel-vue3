export interface MenuBarDropdownItem {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  children?: MenuBarDropdownItem[][];
}

export interface MenuBarItem {
  title: string;
  dropdownItems: MenuBarDropdownItem[][];
}
