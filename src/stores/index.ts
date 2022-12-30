import { createPinia } from 'pinia';
import useAppStore from './app';

const macOsKernelPinia = createPinia();

export { macOsKernelPinia, useAppStore };
