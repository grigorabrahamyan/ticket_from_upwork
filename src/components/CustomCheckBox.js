import { FormControlLabel, Checkbox } from '@mui/material';
import { useEffect, useState } from 'react';

const CustomCheckBox = ({ onChangeVisitorData, name, isRestored }) => {
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    setIsCheck(false);
  }, [isRestored]);

  return (
    <FormControlLabel
      control={
        <Checkbox
          defaultChecked
          onChange={(e) => {
            setIsCheck(e.target.checked);
            onChangeVisitorData(e.target.checked, name);
          }}
          checked={isCheck}
        />
      }
      label="I agree to be added to the table"
    />
  );
};

export default CustomCheckBox;
