import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface EnhancedTableToolbarProps {
    numSelected: number;
    deleteRecordBySelected: Function;
}

export const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, deleteRecordBySelected } = props;
    const { t } = useTranslation();
    const deleteRecord = () => {
        deleteRecordBySelected();
    };
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
                    {numSelected} {t('message.selected')}
                </Typography>
            ) : (
                <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
                    {t('message.data')}
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={() => deleteRecord()}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <div></div>
            )}
        </Toolbar>
    );
};
