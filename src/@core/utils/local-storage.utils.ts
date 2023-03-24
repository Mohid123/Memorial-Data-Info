export enum StorageItem {
  User = 'App/user',
  LoggedInUser = 'App/loggedInUser',
  JwtToken = 'App/jwtToken',
  Key = 'App/key',
  Theme = 'App/theme',
  GuestSession = 'App/Guest_Session'
}

export const getItem = (itemName: StorageItem): any | null => {
  const item = localStorage.getItem(itemName);
  return item ? JSON.parse(item) : null;
};

export const setItem = (itemName: StorageItem, value: unknown): void => {
  localStorage.setItem(itemName, JSON.stringify(value));
};

export const removeItem = (itemName: StorageItem): void => {
  localStorage.removeItem(itemName);
};

export const setSessionItem = (itemName: StorageItem, value: string): void => {
  sessionStorage.setItem(itemName, value)
}

export const getSessionItem = (itemName: StorageItem): any => {
  return sessionStorage.getItem(itemName);
}

export const removeSessionItem = (itemName: StorageItem): any => {
  return sessionStorage.removeItem(itemName);
}
