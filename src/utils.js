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

export const parsePath = (path, variables) => {
  let parsed = path;
  if (!variables) {
    return parsed;
  }
  Object.keys(variables).forEach((key) => {
    const regexp = new RegExp(`{{${key}}}`, 'g');
    parsed = parsed.replace(regexp, variables[key]);
  });

  return parsed;
};
