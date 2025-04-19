import {
  differenceInDays,
  isAfter,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import { IVacancy } from 'src/interfaces';

export const vacancyStatus = (vacancy: IVacancy) => {
  if (
    (isBefore(new Date(vacancy.openingData), new Date()) &&
      isAfter(new Date(vacancy.closingData), new Date())) ||
    isEqual(parseISO(vacancy.openingData), parseISO(vacancy.closingData))
  ) {
    return 'Ativo';
  }

  return 'Inativo';
};

export const daysToCloseVacancy = (vacancy: IVacancy): string => {
  const closingDate = parseISO(vacancy.closingData);
  const currentDate = new Date();

  if (isBefore(closingDate, currentDate)) {
    return 'Fechada';
  }

  const daysRemaining = differenceInDays(closingDate, currentDate);

  if (!daysRemaining) return 'Encerra hoje';

  return `Faltam ${daysRemaining} dia${daysRemaining === 1 ? '' : 's'}`;
};

export const formatDurationMonth = (months: number): string => {
  if (months >= 12) {
    const years = Math.floor(months / 12);
    return `${years} ano${years > 1 ? 's' : ''}`;
  }
  return `${months} ${months > 1 ? 'meses' : 'mês'}`;
};

export const formatNumberWithDots = (value: string): string => {
  const numericValue = value.replace(/\D/g, '');

  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
