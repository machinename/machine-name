import { Button, IconButton, styled } from "@mui/material";

const defaultBorderRadius = '0px';
const defaultFontWeight = 'regular';

export const StyledIconButton = styled(IconButton)({
    color: 'gray',
    '@media (prefers-color-scheme: dark)': {
        color: '#ededed',
        '&.Mui-disabled': {
            color: 'gray'
        }
    }
});

export const StyledButton = styled(Button)({
    backgroundColor: 'black',
    borderRadius: defaultBorderRadius,
    color: 'white',
    fontFamily: 'inherit',
    fontWeight: defaultFontWeight,
    width: '100%',
    '&:disabled': {
        backgroundColor: '#f0f0f0',
        color: 'gray',
        border: 'none',
        cursor: 'not-allowed'
    },
    '@media (prefers-color-scheme: dark)': {
        color: 'black',
        backgroundColor: '#ededed',
    },
});

export const StyledTextButton = styled(Button)({
    backgroundColor: 'transparent',
    borderRadius: defaultBorderRadius,
    fontFamily: 'inherit',
    fontWeight: defaultFontWeight,
    padding: '0',
    '@media (prefers-color-scheme: dark)': {
        color: '#ededed',
    }
});