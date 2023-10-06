import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DEPARTMENT_SELECT_OPTIONS } from '../constants';

const CustomSelect = ({ wrapperValue, onChangeVisitorData, ...rest }) => {
  const { value, onChangeValue } = wrapperValue ?? {};

  const handleChangeSelect = (e) => {
    onChangeValue(e.target.value);
    onChangeVisitorData(e.target.value, e.target.name);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Department</InputLabel>
      <Select {...rest} value={value} onChange={handleChangeSelect}>
        {DEPARTMENT_SELECT_OPTIONS.map(({ option, id }) => {
          return (
            <MenuItem key={id} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
