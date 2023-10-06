import { TextField } from '@mui/material';
import { useCustomStore } from '../Store';
import { validation } from '../helpers/validation';

const CustomInput = ({ wrapperValue, onChangeVisitorData, name, ...rest }) => {
  const { onChangeError } = useCustomStore();
  const { value, onChangeValue } = wrapperValue ?? {};

  return (
    <TextField
      {...rest}
      name={name}
      value={value}
      onChange={(e) => onChangeValue(e.target.value)}
      onBlur={(e) => {
        if (e.target.value) {
          onChangeVisitorData(e.target.value, e.target.name);
          onChangeError(!validation[name](e.target.value), e.target.name);
        }
      }}
    />
  );
};

export default CustomInput;
