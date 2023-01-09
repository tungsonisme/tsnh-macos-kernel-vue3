export interface MenuBarDropdownItem {
  title: string;
  disabled?: boolean;
  children?: MenuBarDropdownItem[][];
  onClick?: () => void;
}

export interface MenuBarItem {
  title: string;
  icon?: string;
  dropdownItems: MenuBarDropdownItem[][];
}
