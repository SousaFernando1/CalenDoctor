import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EmptyListMessage } from 'src/components/EmptyListMessage';
import { ModalForm } from 'src/components/ModalForm';
import { Show } from 'src/components/Show';
import { isCollaborator } from 'src/hooks/isCollaborator';
import { IScheduling } from 'src/interfaces';
import { extractTimeFromDate } from 'src/utils';

type Props = {
  onClose: () => void;
  open: boolean;
  schedulings: IScheduling[];
  title: string;
};

export function DayModal({
  title,
  onClose,
  open,
  schedulings,
}: Readonly<Props>) {
  const navigate = useNavigate();

  const canUpdate = isCollaborator();

  const modalHeader = (
    <Stack direction="row" justifyContent="space-between" flex={1}>
      <Typography variant="h4">{title}</Typography>
      {canUpdate && (
        <Button
          variant="contained"
          onClick={() => navigate(`/view/scheduling`)}
        >
          Novo
        </Button>
      )}
    </Stack>
  );

  return (
    <ModalForm
      title={modalHeader}
      handleClose={onClose}
      open={open}
      setMaxWidth="50rem"
      width="100%"
      handleConfirm={onClose}
    >
      <Show>
        <Show.When isTrue={!!schedulings.length}>
          {schedulings.map((scheduling) => {
            return (
              <Card key={scheduling.id}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6">
                      {scheduling.description}
                    </Typography>
                    <Typography>
                      {`${extractTimeFromDate(scheduling.startDate)} - ${extractTimeFromDate(scheduling.endDate)}`}
                    </Typography>
                    <Typography>
                      {`${scheduling.collaborator.name} | ${scheduling.patient.name}`}
                    </Typography>
                  </Box>

                  {canUpdate && (
                    <Button
                      onClick={() =>
                        navigate(`/view/scheduling/edit/${scheduling.id}`)
                      }
                    >
                      Editar
                    </Button>
                  )}
                </Stack>
              </Card>
            );
          })}
        </Show.When>
        <Show.Else>
          <EmptyListMessage
            title="Sem agendamentos"
            description="Não há agendamentos para o dia selecionado."
          />
        </Show.Else>
      </Show>
    </ModalForm>
  );
}
