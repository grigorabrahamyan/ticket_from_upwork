import { AppBar, Container, Typography, Stack, Grid } from '@mui/material';
import Table from './components/Table';
import LeftMenu from './components/left_menu/LeftMenu';

import { styled } from '@mui/material/styles';

const SContainer = styled(Container)({
  minWidth: '100%',
});

const SHeaderStack = styled(Stack)({
  height: '64px',
  backgroundColor: 'error',
});

function Layout() {
  return (
    <Stack spacing={3}>
      <AppBar position="static" color="primary">
        <SContainer>
          <SHeaderStack justifyContent={'center'}>
            <Typography variant="h6" component={'h1'}>
              Application
            </Typography>
          </SHeaderStack>
        </SContainer>
      </AppBar>
      <SContainer>
        <Grid container spacing={3}>
          <Grid item flex={1} style={{ height: '200px' }}>
            <LeftMenu />
          </Grid>
          <Grid item flex={3} style={{ height: '200px' }}>
            <Grid container flexDirection={'column'} spacing={3}>
              <Grid item>
                <Typography variant="h4">Visitor managment</Typography>
              </Grid>
              <Grid item>
                <Table />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SContainer>
    </Stack>
  );
}

export default Layout;
