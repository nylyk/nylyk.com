import { Dispatch, SetStateAction, useState } from 'react';

const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  let init = initialValue;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      init = JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  } else {
    localStorage.setItem(key, JSON.stringify(initialValue));
  }

  const [value, setValue] = useState(init);

  const setValueAndSave = (s: SetStateAction<T>) => {
    if (typeof s === 'function') {
      setValue((value) => {
        const newValue = (s as (v: T) => T)(value);
        localStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
    } else {
      localStorage.setItem(key, JSON.stringify(s));
      setValue(s);
    }
  };

  return [value, setValueAndSave];
};

export default useLocalStorage;
