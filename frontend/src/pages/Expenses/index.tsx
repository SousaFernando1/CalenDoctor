import { Button, Card, Grid, Stack } from '@mui/material';
import { ListTable } from 'src/components/ListTable';
import { ListTableHeaderTabs } from 'src/components/ListTableHeaderTabs';
import { useState } from 'react';
import { FormDateTimePickerField } from 'src/components/FormDateTimePickerField';
import { useExpensesListTable } from './hooks';
import { CreateExpenseModal } from './CreateExpenseModal';

export function Expenses() {
  const [openModal, setOpenModal] = useState(false);

  const {
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
    headCells,
    rows,
    totalElements,
    tabsConfig,
    currentTab,
    handleChangeTab,
    getData,
    control,
    loading,
  } = useExpensesListTable();

  const handleCloseModal = () => {
    setOpenModal(false);
    getData();
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: '50rem',
          width: '100%',
        }}
      >
        <Stack>
          <ListTable
            header={
              <>
                <Stack direction="row" p={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={5}>
                      <FormDateTimePickerField
                        label="Data inicial"
                        name="startDate"
                        control={control}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <FormDateTimePickerField
                        label="Data final"
                        name="endDate"
                        control={control}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Stack justifyContent="center" alignItems="center">
                    <Button
                      onClick={() => setOpenModal(true)}
                      variant="contained"
                    >
                      ADD
                    </Button>
                  </Stack>
                </Stack>

                <ListTableHeaderTabs
                  onChange={handleChangeTab || (() => {})}
                  currentTab={currentTab}
                  tabsConfig={tabsConfig}
                />
              </>
            }
            loading={loading}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 20, 30]}
            totalElements={totalElements}
            headCells={headCells}
            rows={rows}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Stack>
      </Card>

      <CreateExpenseModal handleClose={handleCloseModal} open={openModal} />
    </>
  );
}
