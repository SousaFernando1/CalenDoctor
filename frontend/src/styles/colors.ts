export const colors = {
  primary: '#006BB7',
  primary_100: '#b3dfff',
  primary_200: '#80caff',
  primary_300: '#0068b3',
  primary_400: '#002d4d',
  primary_gradient: 'linear-gradient(135deg, #80caff 0%, #0068b3 100%)',

  secondary: '#8C65E2',
  secondary_100: '#D9C7FF',
  secondary_200: '#B689FF',
  secondary_300: '#6838D2',
  secondary_400: '#26007A',
  secondary_gradient: 'linear-gradient(135deg, #b689ff 0%, #612fcf 100%)',

  info: '#00B8D9',
  info_100: '#CDF2FD',
  info_200: '#92E5FF',
  info_300: '#006C9C',
  info_400: '#003768',

  success: '#36B37E',
  success_100: '#D8FBDE',
  success_200: '#9DEDBB',
  success_300: '#1B806A',
  success_400: '#0A5554',
  success_gradient: 'linear-gradient(135deg, #86e8ab 0%, #36b37e 100%)',

  warn: '#FFAB00',
  warn_100: '#FFF5CC',
  warn_200: '#FFD666',
  warn_300: '#CB7220',
  warn_400: '#7A4100',

  error: '#FF5630',
  error_100: '#FFE9D5',
  error_200: '#FFAC82',
  error_300: '#C21434',
  error_400: '#7A0916',

  white: '#FFF',

  grey_100: '#F9FAFB',
  grey_200: '#F4F6F8',
  grey_300: '#DFE3E8',
  grey_400: '#C4CDD5',
  grey_500: '#919EAB',
  grey_600: '#637381',
  grey_700: '#454F5B',
  grey_800: '#212B36',
  grey_900: '#161C24',
};

export type ColorsType = keyof typeof colors;
