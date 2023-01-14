import { computed, ref } from 'vue';
import { useAppStore } from '../../stores';

const useStyle = (appName: string) => {
  const { getApp, getLaunchedApp } = useAppStore();
  const app = getApp(appName);
  const launchedApp = getLaunchedApp(appName);
  const defaultWidth = app.defaultStyles?.width || 800;
  const defaultHeight = app.defaultStyles?.height || 600;
  const defaultTop = (() => {
    if (app.defaultStyles?.isVerticallyCenter) {
      return (window.innerHeight - defaultHeight) / 2;
    }

    return app.defaultStyles?.top || 100;
  })();
  const defaultLeft = (() => {
    if (app.defaultStyles?.isHorizontallyCenter) {
      return (window.innerWidth - defaultWidth) / 2;
    }

    return app.defaultStyles?.left || 100;
  })();

  const top = ref(defaultTop);
  const left = ref(defaultLeft);
  const width = ref(defaultWidth);
  const height = ref(defaultHeight);

  const appInstance = computed(() => launchedApp.instances[0]);
  const isFullScreen = computed(() => !!appInstance.value?.fullScreenId);
  const macosWindowStyle = computed(() => ({
    ...(isFullScreen.value
      ? {
          top: 0,
          left: 0,
        }
      : {
          top: `${top.value}px`,
          left: `${left.value}px`,
        }),
    display: appInstance?.value?.minimized ? 'none' : 'flex',
    'z-index': appInstance.value?.layout.zIndex,
    width: `${width.value}px`,
    height: `${height.value}px`,
  }));

  const handlePositionUpdate = (distance: { top: number; left: number }) => {
    top.value = top.value + distance.top;
    left.value = left.value + distance.left;
  };

  return { macosWindowStyle, isFullScreen, handlePositionUpdate };
};

export default useStyle;
