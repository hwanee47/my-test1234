// src/eruda.ts
import eruda from 'eruda';

export const initEruda = () => {
  if (import.meta.env.MODE === 'development' && typeof window !== 'undefined') {
    eruda.init();
    console.log('Eruda initialized');
  }
};
