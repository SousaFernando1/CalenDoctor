import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { signOut } from 'src/redux/slices';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { MouseEvent, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import { isCollaborator } from 'src/hooks/isCollaborator';
import {
  ArrowDownIcon,
  Container,
  HeaderContainer,
  NewUserIcon,
  PaymentsIcon,
  SchedulingIcon,
} from './styles';
import { LogoIFSC } from '../LogoIFSC';

export function Layout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const { user } = useAppSelector((state) => state.session);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => dispatch(signOut());

  const handleMyProfile = () => {
    handlePopoverClose();
    navigate('/view/profile/edit');
  };

  const drawerItems = [
    {
      description: 'Agendamento',
      icon: <SchedulingIcon />,
      path: '/view',
    },
    ...(isCollaborator()
      ? [
          {
            description: 'Despesas',
            icon: <PaymentsIcon />,
            path: '/view/expenses',
          },
          {
            description: 'Novo usuário',
            icon: <NewUserIcon />,
            path: '/view/profile',
          },
        ]
      : []),
  ];

  const redirectTo = (path: string) => () => {
    navigate(path);
  };

  const isPath = (pathToTest: string) => {
    if (pathToTest === '/view') {
      return pathname === '/view';
    }
    return pathname.startsWith(pathToTest);
  };

  return (
    <Container>
      <Drawer
        sx={{
          width: '15rem',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '15rem',
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box p={1} mx="auto">
          <LogoIFSC customWidth="10rem" />
        </Box>
        <Divider />
        <List>
          {drawerItems.map(({ description, icon, path }, index) => {
            return (
              <>
                <ListItem key={description} disablePadding>
                  <ListItemButton
                    onClick={redirectTo(path)}
                    selected={isPath(path)}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          fontWeight={isPath(path) ? 'bold' : 'normal'}
                        >
                          {description}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                {index === drawerItems.length - 1 ? null : <Divider />}
              </>
            );
          })}
        </List>
      </Drawer>
      <HeaderContainer>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          ml="16.5rem"
        >
          <Stack>
            <Button
              onClick={handlePopoverOpen}
              variant="text"
              color="inherit"
              endIcon={<ArrowDownIcon />}
            >
              <PersonIcon />

              {user?.name}
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              onClose={handlePopoverClose}
            >
              <Stack>
                <Button onClick={handleMyProfile} variant="text" size="small">
                  Meu perfil
                </Button>

                <Button
                  onClick={handleSignOut}
                  variant="text"
                  color="error"
                  size="small"
                >
                  Sair
                </Button>
              </Stack>
            </Popover>
          </Stack>
        </Stack>
        <Divider />
      </HeaderContainer>
      <Stack flex={1} alignItems="center" p={3} width="100%" pl="16.5rem">
        <Outlet />
      </Stack>
    </Container>
  );
}
