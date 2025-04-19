import { useAppDispatch } from 'src/redux/store';
import { start } from 'src/redux/slices';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Start() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(start());
    navigate('/auth');
  }, []);

  return <></>;
}
