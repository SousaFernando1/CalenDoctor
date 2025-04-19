import { Route, Routes } from 'react-router-dom';
import { SignIn } from 'src/pages/Auth/SignIn';
// import { SignUp } from 'src/pages/Auth/SignUp';
import { Start } from 'src/pages/Auth/Start';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/start" element={<Start />} />
      {/* <Route path="/register" element={<SignUp />} /> */}
    </Routes>
  );
}
