import { MenuBarDropdownItem, MenuBarItem } from '.';

export interface App {
  name: string;
  title: string;
  icon: string;
  mainComponent: string;
  mainDropdownItems?: MenuBarDropdownItem[][];
  menuBarItems?: MenuBarItem[];
  showInDock?: boolean;
}

export interface LaunchedAppInstance {
  id: string;
  launchedAppName: string; // map to App.name
  component: string;
  layout: {
    zIndex: number;
  };
  minimized: boolean;
  fullScreenId?: number;
}

export interface LaunchedApp {
  appName: string; // map to App.name
  instances: LaunchedAppInstance[];
}
