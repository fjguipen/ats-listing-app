export const addItem = (state, payload) => {
  const { item, count } = payload;
  const lines = state.lines.slice();
  const exists = lines && lines.find((l) => l.item.id === item.id);

  if (exists) {
    exists.count += count;
  } else {
    lines.push({
      item,
      count
    });
  }

  return {
    ...state,
    total: state.total + 1,
    lines
  };
};
