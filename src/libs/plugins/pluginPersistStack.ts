// pluginPersistStack.ts
import type { StackflowPlugin } from '@stackflow/react';

export const pluginPersistStack: StackflowPlugin = () => ({
  key: 'pluginPersistStack',

  onLoaded({ actions }) {
    const saved = localStorage.getItem('STACKFLOW_STATE');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        actions.replace(parsed); // 스택 복원
      } catch {}
    }
  },

  onEvent({ actions }) {
    const stack = actions.getStack();
    localStorage.setItem('STACKFLOW_STATE', JSON.stringify(stack));
  },
});
