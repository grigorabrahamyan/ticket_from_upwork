import { useRef, useState } from 'react';
import { Typography, Grid, Button } from '@mui/material';
import CustomInput from '../CustomInput';
import InputWrapper from '../InputWrapper';
import CustomSelect from '../CustomSelect';
import CustomCheckBox from '../CustomCheckBox';
import { validateEmail } from '../../helpers/validation';
import { useCustomStore } from '../../Store';

function LeftMenu() {
  const visitorData = useRef({});
  const { data, onChangeData, errors, onChangeError } = useCustomStore();
  const [isRestored, setIsRestore] = useState(true);

  console.log('aaaaaaaa');

  const handleChangeVisitorData = (value, name) => {
    visitorData.current[name] = value;
  };

  const handleAddVisitor = () => {
    const { visitor, email, department, checked } = visitorData.current;
    if (!checked) return alert('You have to add checkbox');

    if (validateEmail(email)) {
      onChangeData([
        {
          name: 'tableRows',
          value: {
            visitor,
            department,
            email,
            id: data.tableRows.length + 1,
          },
        },
      ]);

      visitorData.current = {};
      handleRestore();
    } else {
      onChangeError(true, 'email');
    }
  };

  const handleRestore = () => {
    setIsRestore((state) => !state);
    onChangeError(false, 'email');
  };

  return (
    <Grid container flexDirection={'column'} spacing={3}>
      <Grid item>
        <Typography variant="h6" component={'p'}>
          Add new visitor
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={3} flexDirection={'column'}>
          <Grid item>
            <InputWrapper isRestored={isRestored}>
              <CustomInput
                onChangeVisitorData={handleChangeVisitorData}
                id="outlined-basic"
                label="Full name"
                variant="outlined"
                name="visitor"
                error={false}
                fullWidth
              />
            </InputWrapper>
          </Grid>
          <Grid item>
            <InputWrapper isRestored={isRestored}>
              <CustomInput
                onChangeVisitorData={handleChangeVisitorData}
                id="outlined-basic"
                label="Email address"
                variant="outlined"
                name="email"
                error={errors.email}
                required
                fullWidth
              />
            </InputWrapper>
          </Grid>
          <Grid item>
            <InputWrapper isRestored={isRestored}>
              <CustomSelect
                onChangeVisitorData={handleChangeVisitorData}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Department"
                name="department"
                error={false}
                fullWidth
              />
            </InputWrapper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <CustomCheckBox
          isRestored={isRestored}
          onChangeVisitorData={handleChangeVisitorData}
          name={'checked'}
        />
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item sx={2} xl={4}>
            <Button variant="outlined" fullWidth onClick={handleRestore}>
              <Typography variant="subtitle2">RESET FROM</Typography>
            </Button>
          </Grid>
          <Grid item sx={10} xl={8}>
            <Button variant="contained" fullWidth onClick={handleAddVisitor}>
              <Typography variant="subtitle2">ADD NEW VISITOR</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LeftMenu;
