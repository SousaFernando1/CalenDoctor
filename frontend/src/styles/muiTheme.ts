import { createTheme } from '@mui/material';
import formAlertIcon from 'src/assets/form-alert.svg';
import { rgba } from 'polished';
import { fonts } from './fonts';
import { colors } from './colors';
import { shadows } from './shadows';

export const MUITheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '3.125rem',
          fontSize: '0.938rem',
          fontWeight: 700,
          textTransform: 'none',
        },

        sizeSmall: {
          fontSize: '0.813rem',
          lineHeight: '1.375rem',
          height: '1.875rem',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
        },

        sizeMedium: {
          fontSize: '0.875rem',
          lineHeight: '1.5rem',
          height: '2.25rem',
          paddingLeft: '1.25rem',
          paddingRight: '1.25rem',
        },

        sizeLarge: {
          fontSize: '0.938rem',
          lineHeight: '1.625rem',
          height: '3rem',
          paddingLeft: '1.875rem',
          paddingRight: '1.875rem',
        },

        containedInherit: {
          backgroundColor: colors.primary_400,
          color: colors.white,

          ':hover': {
            backgroundColor: colors.grey_600,
          },

          ':disabled': {
            backgroundColor: rgba(colors.grey_500, 0.24),
            color: rgba(colors.grey_500, 0.8),
          },
        },

        outlinedInherit: {
          borderColor: rgba(colors.grey_500, 0.48),
          color: colors.primary_400,

          ':hover': {
            backgroundColor: rgba(colors.grey_500, 0.08),
          },

          ':disabled': {
            borderColor: rgba(colors.grey_500, 0.24),
            color: rgba(colors.grey_500, 0.8),
          },
        },

        textInherit: {
          color: colors.primary_400,

          ':hover': {
            backgroundColor: rgba(colors.grey_500, 0.08),
          },

          ':disabled': {
            color: rgba(colors.grey_500, 0.8),
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: rgba(colors.grey_500, 0.32),
          },

          'input::placeholder': {
            opacity: 1,
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.grey_600,
          },

          '&.Mui-disabled': {
            backgroundColor: colors.grey_200,

            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: rgba(colors.grey_500, 0.24),
            },
          },

          '&.Mui-disabled.Mui-error > .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.error,
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.grey_500,

          '&.Mui-focused': {
            color: colors.grey_800,
          },

          '&.Mui-error': {
            color: colors.error,
          },

          '&.Mui-error.Mui-disabled': {
            color: colors.error,
          },

          '&.Mui-disabled': {
            color: colors.grey_500,
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: '2.75rem',
          backgroundColor: 'transparent',
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontWeight: '400',
        },
        contained: {
          '&.Mui-error': {
            display: 'flex',
            alignItems: 'center',
            fontWeight: '600',
            marginLeft: '1.875rem',
          },

          '&.Mui-error:before': {
            content: '""',
            position: 'absolute',
            display: 'inline-block',
            background: `url(${formAlertIcon})`,
            left: '0.6rem',
            width: '1rem',
            height: '1rem',
          },
        },
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            fontSize: '0.75rem',
            lineHeight: '1.125rem',
          },
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        root: {
          '.MuiPaper-rounded': {
            borderRadius: '0.75rem',
          },
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          margin: '0.125rem 0.5rem',
          borderRadius: '0.375rem',

          '&[aria-selected="true"]': {
            backgroundColor: rgba(colors.grey_500, 0.16),

            ':hover': {
              backgroundColor: rgba(colors.grey_500, 0.16),
            },
          },

          '&.Mui-focused': {
            backgroundColor: rgba(colors.grey_500, 0.08),
          },
          '&.Mui-focused[aria-selected="true"]': {
            backgroundColor: rgba(colors.grey_500, 0.16),
          },

          '&.Mui-selected': {
            backgroundColor: rgba(colors.grey_500, 0.08),
          },
          '&.Mui-selected[aria-selected="true"]': {
            backgroundColor: rgba(colors.grey_500, 0.16),
          },
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          '.MuiAutocomplete-option': {
            '&.Mui-focused': {
              backgroundColor: rgba(colors.grey_500, 0.08),
            },
            '&[aria-selected="true"]': {
              backgroundColor: rgba(colors.grey_500, 0.16),
            },
            '&.Mui-focused[aria-selected="true"]': {
              backgroundColor: rgba(colors.grey_500, 0.16),
            },
          },
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colors.grey_600,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: shadows.cards,
          borderRadius: '1rem',
          padding: '1.5rem',
        },
      },
    },

    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: colors.grey_200,

          borderCollapse: 'separate',
          borderSpacing: '0rem 0.5rem',
          padding: '0 0.5rem',
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-root .MuiInputAdornment-positionEnd .MuiButtonBase-root.Mui-disabled .MuiSvgIcon-root':
            {
              fill: colors.grey_500,
            },
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.grey_200,

          '& .MuiTableRow-root': {
            backgroundColor: colors.grey_200,

            '& .MuiTableCell-root': {
              border: 'none',

              '& p': {
                fontSize: '0.813rem',
              },
            },
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: colors.white,
          overflow: 'hidden',

          '& .MuiTableCell-root': {
            borderBottomWidth: '0.125rem',
            borderBottomColor: rgba(colors.grey_500, 0.24),
            borderBottomStyle: 'solid',
          },

          '& .MuiTableCell-root:first-of-type': {
            borderTopLeftRadius: '0.5rem',
            borderBottomLeftRadius: '0.5rem',
          },

          '& .MuiTableCell-root:last-of-type': {
            borderTopRightRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
          },
        },
      },
    },

    MuiTablePagination: {
      styleOverrides: {
        actions: {
          button: {
            color: colors.grey_600,
          },

          'button.Mui-disabled': {
            svg: {
              color: rgba(colors.grey_500, 0.8),
            },
          },
        },
      },
    },

    MuiStepLabel: {
      styleOverrides: {
        root: {
          '& .MuiStepLabel-label.Mui-active': {
            fontWeight: 700,
          },

          '& .MuiStepLabel-label.Mui-disabled': {
            color: colors.grey_600,
          },
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: shadows.cards,
          borderRadius: '1rem',
        },
      },
    },
  },

  typography: {
    fontFamily: [fonts.montserrat, fonts.sansSerif].join(','),

    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,

    allVariants: {
      color: colors.grey_800,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    h1: {
      fontSize: '4rem',
      lineHeight: '5rem',
      fontWeight: 800,
    },
    h2: {
      fontSize: '3rem',
      lineHeight: '4rem',
      fontWeight: 800,
    },
    h3: {
      fontSize: '2rem',
      lineHeight: '3rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.5rem',
      lineHeight: '2.25rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1.25rem',
      lineHeight: '1.875rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      fontWeight: 700,
    },

    subtitle1: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 600,
    },
    subtitle2: {
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
      fontWeight: 600,
    },

    body1: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
      fontWeight: 400,
    },

    caption: {
      fontSize: '0.75rem',
      lineHeight: '1.125rem',
      fontWeight: 700,
    },
    overline: {
      fontSize: '0.75rem',
      lineHeight: '1.125rem',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
  },

  palette: {
    primary: {
      main: colors.primary,
      '100': colors.primary_100,
      '200': colors.primary_200,
      '300': colors.primary_300,
      '400': colors.primary_400,

      contrastText: colors.white,
    },
    secondary: {
      main: colors.secondary,
      '100': colors.secondary_100,
      '200': colors.secondary_200,
      '300': colors.secondary_300,
      '400': colors.secondary_400,

      contrastText: colors.white,
    },
    grey: {
      '100': colors.grey_100,
      '200': colors.grey_200,
      '300': colors.grey_300,
      '400': colors.grey_400,
      '500': colors.grey_500,
      '600': colors.grey_600,
      '700': colors.grey_700,
      '800': colors.grey_800,
      '900': colors.grey_900,
    },
    info: {
      main: colors.info,
      '100': colors.info_100,
      '200': colors.info_200,
      '300': colors.info_300,
      '400': colors.info_400,

      contrastText: colors.white,
    },
    success: {
      main: colors.success,
      '100': colors.success_100,
      '200': colors.success_200,
      '300': colors.success_300,
      '400': colors.success_400,

      contrastText: colors.white,
    },
    warning: {
      main: colors.warn,
      '100': colors.warn_100,
      '200': colors.warn_200,
      '300': colors.warn_300,
      '400': colors.warn_400,

      contrastText: colors.grey_800,
    },
    error: {
      main: colors.error,
      '100': colors.error_100,
      '200': colors.error_200,
      '300': colors.error_300,
      '400': colors.error_400,

      contrastText: colors.white,
    },
    text: {
      disabled: colors.grey_500,
    },
  },
});
