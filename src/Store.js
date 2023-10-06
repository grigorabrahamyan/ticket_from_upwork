import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from './helpers/localStorageActions';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [data, setData] = useState({
    page: 0,
    rowsPerPage: 5,
    tableRows: [],
  });
  const [errors, setErrors] = useState({
    email: false,
  });

  const handleChangeError = useCallback(
    (value, name) => {
      value !== undefined && setErrors({ ...errors, [name]: value });
    },
    [errors],
  );

  const handleChnageData = useCallback(
    (chnagedList) => {
      const changedObj = chnagedList.reduce((acc, { value, name }) => {
        if (Array.isArray(data[name])) {
          acc[name] = [...data[name], value];
        } else {
          acc[name] = value;
        }
        return acc;
      }, {});

      const changedData = {
        ...data,
        ...changedObj,
      };

      setData(changedData);
      setLocalStorageItem(changedData, 'data');
    },
    [data],
  );

  useEffect(() => {
    const storageData = getLocalStorageItem('data');
    if (storageData) {
      setData(storageData);
    }
  }, []);

  const createdStore = {
    data,
    errors,
    onChangeData: handleChnageData,
    onChangeError: handleChangeError,
  };

  return (
    <StoreContext.Provider value={createdStore}>
      {children}
    </StoreContext.Provider>
  );
};

export const useCustomStore = () => {
  const store = useContext(StoreContext);

  if (!store) throw new Error('You need to wrapp by StoreProvider');

  return store;
};

export default StoreProvider;
