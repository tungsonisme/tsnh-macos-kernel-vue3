import { Component } from "vue";

export interface MenuBarDropdownItem {
  title: string;
  disabled?: boolean;
  children?: MenuBarDropdownItem[][];
  onClick?: () => void;
}

export interface MenuBarItem {
  title: string;
  icon?: string;
  // when component is NOT null, icon and title will be ignored
  component?: Component;
  dropdownItems: MenuBarDropdownItem[][];
}
