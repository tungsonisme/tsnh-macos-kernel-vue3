export interface MenuBarDropdownItem {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  children?: MenuBarDropdownItem[][];
}

export interface MenuBarItem {
  title?: string;
  icon?: string;
  type: 'click' | 'dropdown';
  onClick?: () => void;
  dropdownItems?: MenuBarDropdownItem[][];
}
