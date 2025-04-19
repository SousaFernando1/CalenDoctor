import { Route, Routes } from 'react-router-dom';
import { Layout, SchedulingCalendar } from 'src/components';
import { Expenses } from 'src/pages/Expenses';
import { FirstAccess } from 'src/pages/FirstAccess';
import { Profile } from 'src/pages/Profile';
import { Scheduling } from 'src/pages/Scheduling';

export function PrivateViewRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route index element={<SchedulingCalendar />} />
        <Route path="expenses/*" element={<Expenses />} />
        <Route path="scheduling/" element={<Scheduling />} />
        <Route path="scheduling/edit/:id" element={<Scheduling />} />
        <Route path="profile/*" element={<Profile />} />
        <Route path="profile/edit" element={<Profile />} />
        <Route path="first-access/*" element={<FirstAccess />} />
      </Route>
    </Routes>
  );
}
