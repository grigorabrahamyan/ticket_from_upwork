import { createTheme } from '@mui/material/styles';

const customColors = {
  primary: '#EF5742',
};

const customTheme = createTheme({
  palette: {
    primary: {
      main: customColors.primary,
    },
  },
});

export default customTheme;
