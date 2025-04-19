export function getLocalStorageItem(name: string): any {
  const item = localStorage.getItem(name);

  try {
    return item ? JSON.parse(item) : null;
  } catch (err) {
    return item;
  }
}

export function setLocalStorageItem(name: string, item: any): void {
  const stringItem = JSON.stringify(item);
  localStorage.setItem(name, stringItem);
}
