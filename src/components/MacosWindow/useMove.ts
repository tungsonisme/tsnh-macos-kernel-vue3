import { onMounted, onUnmounted, ref } from 'vue';
import { useAppStore } from '../../stores';

const useMove = (
  appName: string,
  onPositionUpdate: (data: { top: number; left: number }) => void
) => {
  const { focus } = useAppStore();

  const isMouseDown = ref(false);

  function handleMouseDown() {
    focus(appName);
    isMouseDown.value = true;
  }

  function handleMouseMove(e: MouseEvent) {
    if (isMouseDown.value) {
      onPositionUpdate({ top: e.movementY, left: e.movementX });
    }
  }

  function handleMouseUp() {
    isMouseDown.value = false;
  }

  onMounted(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
  });

  onUnmounted(() => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  });

  return { handleMouseDown };
};

export default useMove;
