import { Box, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import sesiSenaiLogo from 'src/assets/ifsc-horizontal.png';
import { muiResponsiveValues } from 'src/utils';
import { CustomImage } from './styles';

type Props = {
  customWidth?: string;
};

export function LogoIFSC({ customWidth = '20rem' }: Readonly<Props>) {
  const navigate = useNavigate();

  const handleClickLogo = () => navigate('/');

  return (
    <Box display={muiResponsiveValues('none', 'block')}>
      <ButtonBase onClick={handleClickLogo}>
        <CustomImage src={sesiSenaiLogo} alt="logo" customWidth={customWidth} />
      </ButtonBase>
    </Box>
  );
}
