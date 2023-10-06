export const setLocalStorageItem = (value, name) => {
  let tmp = value;

  if (typeof tmp === 'object') {
    tmp = JSON.stringify(tmp);
  }

  localStorage.setItem(name, tmp);
};

export const getLocalStorageItem = (name) => {
  let result = localStorage.getItem(name) || '';

  if (
    result &&
    /^[\],:{}\s]*$/.test(
      result
        .replace(/\\["\\/bfnrtu]/g, '@')
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g,
          ']',
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''),
    )
  ) {
    result = JSON.parse(result);
  }
  return result;
};
