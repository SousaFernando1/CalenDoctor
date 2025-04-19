import { Stack, TableCell, Typography } from '@mui/material';
import { ListTableHeadCell } from '../..';

type Props = {
  headCell: ListTableHeadCell;
};

export function HeadCell({ headCell }: Readonly<Props>) {
  const { label, noOrder, align, id } = headCell;

  const renderLabel = () => {
    if (typeof label === 'string') {
      return (
        <Typography variant="body2" fontWeight="bold" color="grey.600">
          {label}
        </Typography>
      );
    }

    return label;
  };

  if (noOrder) {
    return (
      <TableCell>
        <Stack alignItems={`flex-${align ?? 'end'}`}>{renderLabel()}</Stack>
      </TableCell>
    );
  }

  return <TableCell key={id}>{renderLabel()}</TableCell>;
}
