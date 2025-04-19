import { TableHead, TableRow } from '@mui/material';
import { MouseEvent } from 'react';

import { ListTableHeadCell } from '..';
import { IPageSort } from '../../../interfaces';
import { HeadCell } from './HeadCell';

type Props = {
  headCells: ListTableHeadCell[];
};

export function ListTableHead(props: Readonly<Props>) {
  const { headCells } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <HeadCell key={headCell.id} headCell={headCell} />
        ))}
      </TableRow>
    </TableHead>
  );
}
