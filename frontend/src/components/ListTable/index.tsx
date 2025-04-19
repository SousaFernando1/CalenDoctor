import { ChangeEvent, MouseEvent, ReactNode } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { Stack, TablePagination } from '@mui/material';
import { ListTableHead } from './ListTableHead';
import { Loading } from '../Loading';
import { EmptyListMessage } from '../EmptyListMessage';
import { IPageSort } from '../../interfaces';
import { Container, StyledTableContainer, StyledTableHeader } from './styles';

function defaultLabelDisplayedRows({ from, to }: any) {
  return `${from}–${to}`;
}

export type ListTableRow = {
  id: string | number;
  content: {
    [key: string]: string | ReactNode;
  };
};

export type ListTableHeadCell = {
  id: string;
  label: string | ReactNode;
  align?: 'start' | 'end';
  noOrder?: boolean;
};

type Props = {
  disableShadow?: boolean;
  header?: ReactNode;
  loading?: boolean;
  headCells: ListTableHeadCell[];
  rows: ListTableRow[];
  page: number;
  totalElements: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  showList?: boolean;
  onChangePage: (newPage: number) => void;
  onChangeRowsPerPage: (rowsPerPage: number) => void;
};

export function ListTable({
  header,
  headCells,
  rows,
  page,
  rowsPerPage,
  totalElements,
  rowsPerPageOptions,
  loading,
  onChangePage,
  onChangeRowsPerPage,
  disableShadow,
  showList,
}: Readonly<Props>) {
  const handleChangePage = (_: unknown, newPage: number) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    onChangeRowsPerPage(value);
    onChangePage(0);
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <Stack alignItems="center" justifyContent="center" py="2rem">
          <Loading />
        </Stack>
      );
    }

    if (rows.length <= 0) {
      return (
        <EmptyListMessage
          title="Não há nenhum resultado"
          description={
            <>
              Não foi encontrado nenhum item para lista.
              <br />
            </>
          }
        />
      );
    }

    return (
      <Table aria-labelledby="tableTitle" size="medium">
        <ListTableHead headCells={headCells} />
        <TableBody>
          {rows.map((row) => {
            const keys = Object.keys(row.content);
            const values = Object.values(row.content);

            return (
              <TableRow tabIndex={-1} key={row.id}>
                {values.map((value, index) => (
                  <TableCell key={`${keys[index]}`}>{value}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  return (
    <Container disableShadow={disableShadow}>
      <StyledTableHeader>{header}</StyledTableHeader>

      <StyledTableContainer>
        {showList && renderTableBody()}
      </StyledTableContainer>

      <TablePagination
        component="div"
        labelRowsPerPage="Resultados por página:"
        count={totalElements}
        page={page}
        rowsPerPageOptions={rowsPerPageOptions}
        rowsPerPage={rowsPerPage}
        labelDisplayedRows={defaultLabelDisplayedRows}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

ListTable.defaultProps = {
  header: <></>,
  loading: false,
  disableShadow: false,
  showList: true,
};
