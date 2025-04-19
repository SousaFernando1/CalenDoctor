import axios from 'axios';
import { format, isValid, subHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { openSnackbar } from 'src/redux/slices';

export function handleRequestError(error: any, dispatch: any) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      const errorMessage =
        error.response?.data.message || 'Erro de autenticação';

      dispatch(
        openSnackbar({
          message: errorMessage,
        }),
      );
    } else if (error.message === 'Network Error') {
      dispatch(
        openSnackbar({
          message: 'Não foi possível acessar o servidor',
        }),
      );

      throw error;
    } else {
      dispatch(
        openSnackbar({
          message: error.message ?? 'Erro',
        }),
      );
    }
  }

  throw error;
}

export function formatDateToRequest(date: string | Date) {
  if (!date || !isValid(new Date(date))) return '';

  const adjustedDate = subHours(new Date(date), 3);

  return adjustedDate;
}

export const formatDateToRequestForPagination = (date: Date): string => {
  if (!date || !isValid(date)) return '';
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
};

export const formatDate = (date: string | Date) => {
  if (!date || !isValid(new Date(date))) return '';

  let dateToFormat = date;

  if (!String(date).includes(':')) {
    dateToFormat = `${date}T03:00:00+0000`;
  }

  return dateToFormat;
};

export function formatDateTimeToShow(date: string | Date) {
  if (!date || !isValid(new Date(date))) return '';

  return format(new Date(formatDate(date)), "dd/MM/yyyy '-' HH:mm", {
    locale: ptBR,
  });
}

export function extractTimeFromDate(date: string | Date) {
  return format(new Date(date), 'HH:mm');
}
