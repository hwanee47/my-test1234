import { createMemoryHistory } from 'history';

let entries: string[] = ['/']; // 기본 경로

try {
  const saved = localStorage.getItem('STACKFLOW_HISTORY');
  if (saved && saved !== 'undefined') {
    entries = JSON.parse(saved);
  }
} catch (e) {
  console.warn('Failed to parse saved history, using default.', e);
}

const history = createMemoryHistory({ initialEntries: entries });

history.listen(() => {
  localStorage.setItem('STACKFLOW_HISTORY', JSON.stringify(history.entries.map((e) => e.pathname)));
});

export default history;
