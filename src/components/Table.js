import styled from '@emotion/styled';
import {
  Box,
  Button,
  Paper,
  Toolbar,
  Grid,
  Typography,
  TableContainer,
  TablePagination,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Chip,
} from '@mui/material';
import { useMemo } from 'react';
import { useCustomStore } from '../Store';

const headerCells = [
  {
    id: 1,
    label: 'Visitor',
    isCheckbox: true,
    isEnd: false,
    type: 'text',
  },
  {
    id: 2,
    label: 'Email',
    type: 'email',
    isCheckbox: false,
    isEnd: false,
  },
  {
    id: 3,
    label: 'Department',
    isCheckbox: false,
    isEnd: true,
    type: 'text',
  },
];

const SCustomTableCell = styled(TableCell)({
  width: '33%',
});

const SEmptyTableBox = styled(Box)({
  padding: '24px',
});

function HeaderCell({ cell, children }) {
  const { isEnd, isCheckbox, label } = cell ?? {};
  return (
    <Grid
      container
      alignItems={'center'}
      justifyContent={isEnd ? 'flex-end' : 'flex-start'}
    >
      {isCheckbox && <Grid item>{children}</Grid>}
      <Grid item>{label}</Grid>
    </Grid>
  );
}

function BodyCell({ row }) {
  const { visitor, email, department } = row ?? {};
  return (
    <>
      <SCustomTableCell>
        <Grid container alignItems={'center'}>
          <Grid item>
            <Checkbox />
          </Grid>
          <Grid item>{visitor}</Grid>
        </Grid>
      </SCustomTableCell>
      <TableCell>{email}</TableCell>
      <TableCell sx={{ textAlign: 'right' }}>
        <Chip label={department} />
      </TableCell>
    </>
  );
}

function CustomToolBar({ numSelected }) {
  return (
    <Toolbar>
      <Grid container spacing={3} alignItems={'center'}>
        <Grid item>
          <Typography>Selected {numSelected} items</Typography>
        </Grid>
        <Grid item>
          <Button disabled={!numSelected} variant="contained">
            Remove
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  );
}

function CustomTable() {
  const { data, onChangeData } = useCustomStore();
  const { page, rowsPerPage, tableRows } = data ?? {};

  const visibleRows = useMemo(() => {
    const tmpPage = page * rowsPerPage;
    return tableRows.slice(tmpPage, tmpPage + rowsPerPage);
  }, [page, rowsPerPage, tableRows]);

  const handleChangePage = (_, newPage) => {
    onChangeData([
      {
        value: newPage,
        name: 'page',
      },
    ]);
  };

  const handleChangeRowsPerPage = (e) => {
    onChangeData([
      { value: e.target.value, name: 'rowsPerPage' },
      {
        value: 0,
        name: 'page',
      },
    ]);
  };

  return (
    <Box>
      <Paper>
        {!!visibleRows.length ? (
          <>
            <CustomToolBar numSelected={0} />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {headerCells.map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          sx={{ textAlign: cell.textAlign }}
                        >
                          <HeaderCell cell={cell}>
                            <Checkbox />
                          </HeaderCell>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleRows.map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <BodyCell row={row} />
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {!!visibleRows.length && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tableRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </>
        ) : (
          <SEmptyTableBox>
            <Typography variant="h6" fontWeight={400} textAlign={'center'}>
              There is no Visitor. Please add the new one from the left menu.
            </Typography>
          </SEmptyTableBox>
        )}
      </Paper>
    </Box>
  );
}

export default CustomTable;
