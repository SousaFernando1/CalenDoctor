import { useEffect, useState } from 'react';
// @ts-ignore
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import withDragAndDrop, {
  withDragAndDropProps,
  // @ts-ignore
} from 'react-big-calendar/lib/addons/dragAndDrop';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { getByUser, updateScheduling } from 'src/redux/slices';
import { IScheduling } from 'src/interfaces';
import { endOfDay, startOfDay } from 'date-fns';
import { formatDateToRequest } from 'src/utils';
import { useNavigate } from 'react-router-dom';
import { useConfirmModal } from 'src/hooks/confirmModal';
import { DayModal } from './DayModal';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type ModalConfigProps = {
  open: boolean;
  items: IScheduling[];
  title: string;
};

const defaultMessages = {
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Dia Todo',
  week: 'Semana',
  work_week: 'Eventos',
  day: 'Dia',
  month: 'Mês',
  previous: 'Anterior',
  next: 'Próximo',
  yesterday: 'Ontem',
  tomorrow: 'Amanhã',
  today: 'Hoje',
  agenda: 'Agenda',
  noEventsInRange: 'Não há eventos no período.',

  showMore: function showMore(total: number) {
    return +`${total} mais`;
  },
};

// @ts-ignore
const DnDCalendar = withDragAndDrop(Calendar);

export function SchedulingCalendar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { openConfirmModal } = useConfirmModal();

  const [modalConfig, setModalConfig] = useState<ModalConfigProps>({
    open: false,
    items: [],
    title: '',
  });

  const {
    schedulings: { schedulings },
    session: { user },
  } = useAppSelector((state) => ({
    schedulings: state.scheduling,
    session: state.session,
  }));

  const events = schedulings.map((item) => ({
    id: item.id,
    start: new Date(item.startDate),
    end: new Date(item.endDate),
    title: item.description,
  }));

  const onEventDrop: withDragAndDropProps['onEventDrop'] = async (
    data: any,
  ) => {
    const currentScheduling = schedulings.find(
      (scheduling) => scheduling.id === Number(data?.event?.id),
    );

    const formattedData: any = {
      ...currentScheduling,
      startDate: formatDateToRequest(data?.start),
      endDate: formatDateToRequest(data?.end),
    };

    const scheduling = await dispatch(updateScheduling(formattedData)).unwrap();

    if (scheduling && user) {
      dispatch(getByUser(user));
    }
  };

  const confirmEventDrop = (data: any) => {
    openConfirmModal({
      title: 'Atenção',
      description: 'Você tem certeza que deseja mover esse agendamento?',
      action: () => onEventDrop(data),
    });
  };

  const onSelectSlot = (slotInfo: any) => {
    if (slotInfo.action === 'click') {
      const selectedDate = new Date(slotInfo.start);
      const selectedStart = startOfDay(selectedDate);
      const selectedEnd = endOfDay(selectedDate);

      const itemsForDay = schedulings.filter((item) => {
        const start = new Date(item.startDate);
        const end = new Date(item.endDate);

        return start <= selectedEnd && end >= selectedStart;
      });

      const formattedDate = format(selectedDate, 'dd/MM/yyyy', {
        locale: ptBR,
      });

      setModalConfig({ open: true, items: itemsForDay, title: formattedDate });
    } else if (slotInfo.action === 'select') {
      navigate('/view/scheduling', {
        state: {
          startDate: slotInfo.start,
          endDate: slotInfo.end,
        },
      });
    }
  };
  useEffect(() => {
    if (user) {
      dispatch(getByUser(user));
    }
  }, []);

  const onSelectEvent = async (slotInfo: any) => {
    navigate(`/view/scheduling/edit/${slotInfo.id}`);
  };

  return (
    <>
      <DnDCalendar
        culture="pt-BR"
        messages={defaultMessages}
        defaultView="month"
        views={['month', 'week']}
        events={events}
        localizer={localizer}
        onEventDrop={confirmEventDrop}
        // onEventResize={onEventResize}
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        resizable={false}
        selectable
        style={{ height: '85vh', width: '100%' }}
      />
      <DayModal
        onClose={() => setModalConfig({ open: false, items: [], title: '' })}
        open={modalConfig.open}
        schedulings={modalConfig.items}
        title={modalConfig.title}
      />
    </>
  );
}
