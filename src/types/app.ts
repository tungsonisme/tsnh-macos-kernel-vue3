import { MenuBarDropdownItem, MenuBarItem } from '.';

export interface App {
  // name is unique identifier
  name: string;
  // title: app name shown to users
  title: string;
  // when icon is NOT null, title will be ignored
  icon: string;
  mainComponent: string;
  defaultStyles?: {
    top?: number;
    left?: number;
    // when isVerticallyCenter === true, top will be ignored
    isVerticallyCenter?: boolean;
    // when isHorizontallyCenter === true, left will be ignored
    isHorizontallyCenter?: boolean;
    width?: number;
    height?: number;
    // when isFullScreen === true, width and height will be ignored
    isFullScreen?: boolean;
  };
  // dropdown shown under app name of menu bar
  mainDropdownItems?: MenuBarDropdownItem[][];
  menuBarItems?: MenuBarItem[];
  hiddenInDock?: boolean;
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
