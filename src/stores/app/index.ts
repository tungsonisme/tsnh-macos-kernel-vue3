import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import {
  App,
  LaunchedApp,
  MenuBarDropdownItem,
  MenuBarItem,
} from '../../types';
import { ERR_APP_NOT_EXIST, ERR_APP_NOT_LAUNCHED } from '../../constants';

const useAppStore = defineStore('app', () => {
  let maxZIndex = 0;
  let maxFullScreenId = 0;

  const apps = ref<App[]>([]);
  const launchedApps = ref<LaunchedApp[]>([]);
  const activeLaunchedAppInstanceId = ref<string>();

  const activeAppInfo = computed(() => {
    const activeLaunchedApp = launchedApps.value.find((item) =>
      item.instances.find(
        (instance) => instance.id === activeLaunchedAppInstanceId.value
      )
    );

    if (!activeLaunchedApp) {
      return {
        app: null,
        launchedApp: null,
      };
    }

    return {
      app:
        apps.value.find((app) => app.name === activeLaunchedApp.appName) ??
        null,
      launchedApp: activeLaunchedApp,
    };
  });

  function getLaunchedApp(appName: string) {
    const launchedApp = launchedApps.value.find(
      (item) => item.appName === appName
    );

    if (!launchedApp) {
      throw new Error(ERR_APP_NOT_LAUNCHED);
    }

    return launchedApp;
  }

  function installApps(newApps: App[]) {
    apps.value = newApps;
  }

  function installMenuBar(
    appName: string,
    {
      mainDropdownItems,
      menuBarItems,
    }: {
      mainDropdownItems?: MenuBarDropdownItem[][];
      menuBarItems?: MenuBarItem[];
    }
  ) {
    const app = apps.value.find((item) => item.name === appName);

    if (!app) {
      throw new Error(ERR_APP_NOT_EXIST);
    }

    app.mainDropdownItems = mainDropdownItems;
    app.menuBarItems = menuBarItems;
  }

  function open(appName: string) {
    const app = apps.value.find((item) => item.name === appName);

    if (!app) {
      throw new Error(ERR_APP_NOT_EXIST);
    }

    const launchedApp = launchedApps.value.find(
      (item) => item.appName === appName
    );

    if (launchedApp) {
      focus(appName);
    } else {
      launchedApps.value.push({
        appName: appName,
        instances: [
          {
            id: uuidv4(),
            launchedAppName: appName,
            component: app.mainComponent,
            layout: {
              zIndex: ++maxZIndex,
            },
            minimized: false,
          },
        ],
      });
    }
  }

  function close(appName: string) {
    const appIndex = launchedApps.value.findIndex(
      (item) => item.appName !== appName
    );
    launchedApps.value.splice(appIndex, 1);
  }

  function focus(appName: string) {
    const launchedApp = getLaunchedApp(appName);
    activeLaunchedAppInstanceId.value = launchedApp?.instances[0].id;
    launchedApp.instances[0].layout.zIndex = ++maxZIndex;
    launchedApp.instances[0].minimized = false;
  }

  function minimize(appName: string) {
    const launchedApp = getLaunchedApp(appName);
    launchedApp.instances[0].minimized = true;
  }

  function enterFullScreen(appName: string) {
    const launchedApp = getLaunchedApp(appName);
    launchedApp.instances[0].fullScreenId = ++maxFullScreenId;
  }

  function exitFullScreen(appName: string) {
    const launchedApp = getLaunchedApp(appName);
    launchedApp.instances[0].fullScreenId = undefined;
  }

  return {
    // state
    apps,
    launchedApps,
    activeLaunchedAppInstanceId,
    // getters
    activeAppInfo,
    // actions
    installApps,
    installMenuBar,
    open,
    close,
    focus,
    minimize,
    enterFullScreen,
    exitFullScreen,
  };
});

export default useAppStore;
