import { createMuiTheme } from '@material-ui/core/styles'
import { grey, pink } from "@material-ui/core/colors";
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const color = {
    main: '#086DB2',
    primaryDark: '#4884EE',
    primaryLight: '#06BCFB',
    textPrimary: '#1F2E3F',
    textSecondary: 'rgba(0,0,0,0.39)',
    textTertiary: '#1694D6',
    backgroundDefault: '#F9FAFF',
    backgroundGrey: '#EEF3F6',
    white: '#FFFFFF',
    greyish: '#cdd1d9',
    red: '#E93939',
    appBar: '#273749'
}

const breakpoints = createBreakpoints({})

export const theme = createMuiTheme({
    overrides: {
        '.Mui-disabled': {
            backgroundColor: 'grey'
        },
        MuiTabs: {
            root: {
                // [breakpoints.down('sm')]: {
                //     width: '100%'
                // },
                width: '25%',
                backgroundColor: color.white,
            },
            indicator: {
                backgroundColor: color.main,
                left: 0,
                width: '8px',
            }
        },
        MuiTab: {
            root: {
                paddingLeft: 25,
                "&:hover": {
                    backgroundColor: grey[100],
                    color: grey[700]
                },
                '&$selected': {
                    backgroundColor: color.backgroundGrey,
                    color: color.main,
                    "&:hover": {
                        backgroundColor: color.backgroundGrey,
                        color: color.main
                    }
                },
            },
            wrapper: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontWeight: 'bold',
                textAlign: 'left',
            }
        },
        MuiDivider: {
            root: {
                border: `1px dashed ${color.greyish}`,
                height: 0,
                background: 'none',
                backgroundColor: 'none'
            },
            vertical: {
                width: 0,
                border: `1px solid ${color.backgroundGrey}`,
                margin: '0 24px'
            }
        },
        MuiCheckbox: {
            root: {
                '&$checked': {
                    '& svg': {
                        display: 'block',
                    },
                },
                border: `1px solid ${color.greyish}`,
                margin: '5px 18px',
                height: '20px',
                width: '18px',
                borderRadius: '2px',
                '& svg': {
                    display: 'none',
                    height: 26,
                    width: 26
                },
            },
        },
        MuiButton: {
            root: {
                backgroundImage: `linear-gradient(to left, ${color.primaryDark} , ${color.primaryLight})`,
                height: '40px',
                textTransform: 'none',
                fontWeight: '700',
                color: color.white,
                padding: '6px 20px',
                boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
                // boxShadow: 'none'
            },
            contained: {
                backgroundImage: `linear-gradient(to right, ${color.primaryDark} , ${color.primaryLight})`,
                color: color.white,
                boxShadow: 'none'
            },
            outlined: {
                borderColor: color.primaryLight,
                color: color.primaryLight,
                backgroundColor: color.white,
                backgroundImage: 'none',
                boxShadow: 'none'
            },
            disabled: {
                color: 'blue',
                backgroundImage: `linear-gradient(to right, ${color.disabled} , ${color.disabled})`,
            },
            text: {
                padding: '6px 16px'
            },
        },
        MuiStepLabel: {
            label: {
                color: color.textSecondary,
                fontWeight: 700,
                fontSize: '13px'
            },
        },
        MuiInputLabel: {
            root: {
                fontSize: '16px',
                fontWeight: 600,
            },  
        },
        MuiInputBase: {
            root: {
                fontWeight: 600,
            },
            '& .MuiOutlinedInput-input': {
                border: `1px solid rgba(8,109,178,0.1)`,
                '&:focus-within': {
                    border: `1px solid ${color.main}`,
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    display: 'none'
                },
            }
        },
        MuiMenuItem: {
            root: {
                fontSize: 14,
                fontWeight: 600
            },
        },
        MuiAutocomplete: {
            listbox: {
                fontWeight: 600,
                fontSize: 14
            }
        },
        MuiTypography: {
            colorTextPrimary: { color: color.textPrimary },
            colorTextSecondary: { color: color.textSecondary },
        },
        MuiFormControlLabel: {
            label: {
                fontSize: '16px',
                fontWeight: 500
            }
        },
        MuiFormHelperText: {
            root: {
                fontSize: 12,
                fontWeight: 600
            }
        }
    },
    typography: {
        fontFamily: '"Nunito sans","Raleway", sans-serif',
        h1: {
            fontSize: '36px',
            fontWeight: 800
        },
        h2: {
            fontSize: '24px',
            fontWeight: 700
        },
        h3: {
            fontSize: '20px',
            fontWeight: 700
        },
        h4: {
            fontSize: '18px',
            fontWeight: 700
        },
        h5: {
            fontSize: '18px',
            fontWeight: 600
        },
        h6: {
            fontSize: '14px',
            fontWeight: 600,
        },
        subtitle1: {
            fontSize: 12,
            fontWeight: 500,
            opacity: '90%'
        },
        subtitle2: {
            fontSize: '14px',
            fontWeight: 600,
            opacity: '80%'
        },
    },
    palette: {
        common: {
            black: "#000",
            white: "#fff",
            red: color.red,
            disabled: color.greyish,
            linearGradientLeft: `linear-gradient(to left, ${color.primaryDark} , ${color.primaryLight})`,
            linearGradientRight: `linear-gradient(to right, ${color.primaryDark} , ${color.primaryLight})`,
            textPrimary: color.textPrimary,
            textSecondary: color.textSecondary,
            textTertiary: color.textTertiary,
            appBar: color.appBar
        },
        background: {
            paper: "#fff",
            default: "#F9FAFF",
            secondary: color.backgroundGrey
        },
        primary: {
            main: color.main,
            dark: color.primaryDark,
            light: color.primaryLight,
            contrastText: "#fff"
        },
        secondary: {
            light: color.greyish,
            main: color.main,
            dark: "#4884EE",
        }
    },
});
export default theme;