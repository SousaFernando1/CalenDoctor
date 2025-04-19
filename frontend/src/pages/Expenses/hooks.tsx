import { Typography } from '@mui/material';
import { endOfMonth, startOfMonth } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ListTableHeadCell } from 'src/components/ListTable';
import { useListTable } from 'src/hooks/useListTable';
import { ThunkLoadingEnum } from 'src/interfaces';
import { getExpensesPage, getPaymentPage } from 'src/redux/slices';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { colors } from 'src/styles';
import {
  convertNumberToReal,
  formatDateTimeToShow,
  formatDateToRequestForPagination,
} from 'src/utils';

enum TabsEnum {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export function useExpensesListTable() {
  const dispatch = useAppDispatch();

  const today = new Date();

  const { control, watch } = useForm({
    defaultValues: {
      startDate: startOfMonth(today),
      endDate: endOfMonth(today),
    },
  });

  const [currentTab, setCurrentTab] = useState(TabsEnum.DEBIT);

  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } =
    useListTable();

  const { startDate, endDate } = watch();

  const {
    expenses: { expenses, expensesLoading },
    scheduling: { paymentPage, paymentPageLoading },
  } = useAppSelector((state) => ({
    expenses: state.expense,
    scheduling: state.scheduling,
  }));

  const isLoading = [expensesLoading, paymentPageLoading].includes(
    ThunkLoadingEnum.PENDING,
  );

  const headCells: ListTableHeadCell[] = [
    {
      id: 'description',
      label: 'Descrição',
    },
    {
      id: 'value',
      label: 'Valor',
    },
    {
      id: 'date',
      label: 'Data de pagamento',
    },
  ];

  const tabsConfig = [
    {
      id: TabsEnum.DEBIT,
      title: 'Despesas',
      borderColor: colors.error,
    },
    {
      id: TabsEnum.CREDIT,
      title: 'Recebimentos',
      borderColor: colors.primary,
    },
  ];

  const handleChangeTab = (id: string) => {
    setCurrentTab(id as TabsEnum);
    handleChangePage(0);
  };

  const getData = () => {
    if (currentTab === TabsEnum.DEBIT) {
      dispatch(
        getExpensesPage({
          startDate: formatDateToRequestForPagination(startDate),
          endDate: formatDateToRequestForPagination(endDate),
          page,
          size: rowsPerPage,
        }),
      );
    } else {
      dispatch(
        getPaymentPage({
          startDate: formatDateToRequestForPagination(startDate),
          endDate: formatDateToRequestForPagination(endDate),
          page,
          size: rowsPerPage,
        }),
      );
    }
  };

  const rows =
    currentTab === TabsEnum.CREDIT
      ? paymentPage.content.map((payment) => ({
          id: payment.id,
          content: {
            description: (
              <Typography>{payment?.scheduling?.description}</Typography>
            ),
            value: (
              <Typography>
                {convertNumberToReal(payment?.priceValue)}
              </Typography>
            ),
            date: (
              <Typography>
                {formatDateTimeToShow(payment?.paymentDate)}
              </Typography>
            ),
          },
        }))
      : expenses.content.map((expense) => ({
          id: expense.id,
          content: {
            description: <Typography>{expense.description}</Typography>,
            value: (
              <Typography>{convertNumberToReal(expense.value)}</Typography>
            ),
            date: (
              <Typography>
                {formatDateTimeToShow(expense.paymentDate)}
              </Typography>
            ),
          },
        }));

  useEffect(() => {
    getData();
  }, [page, currentTab, rowsPerPage, startDate, endDate]);

  return {
    handleChangePage,
    handleChangeRowsPerPage,
    page,
    rowsPerPage,
    headCells,
    rows,
    totalElements: expenses.totalElements,
    tabsConfig,
    currentTab,
    handleChangeTab,
    getData,
    control,
    loading: isLoading,
  };
}
