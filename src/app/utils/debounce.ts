export function debounce(callBack: Function, delay = 1000) {
  let timeout: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callBack(...args);
    }, delay);
  };
}
