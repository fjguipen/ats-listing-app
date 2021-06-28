export const matches = (option, term) => {
  if (!term) {
    return true;
  }
  const parts = term.replace(/( )+/g, ' ').split(' ');
  let noMatch = false;
  for (let i = 0; i < parts.length && !noMatch; i++) {
    if (
      option
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .indexOf(
          parts[i]
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        ) === -1
    ) {
      noMatch = true;
    }
  }

  return !noMatch;
};
