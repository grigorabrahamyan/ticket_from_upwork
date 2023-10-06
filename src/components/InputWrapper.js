import {
  useState,
  Children,
  isValidElement,
  cloneElement,
  useEffect,
} from 'react';

function InputWrapper({ children, isRestored }) {
  const [value, setValue] = useState('');

  const handleChangeValue = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue('');
  }, [isRestored]);

  return (
    <>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ...child.props,
            wrapperValue: { value, onChangeValue: handleChangeValue },
          });
        }
      })}
    </>
  );
}

export default InputWrapper;
