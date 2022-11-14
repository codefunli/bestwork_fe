import { yupResolver } from '@hookform/resolvers/yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Timeline from '@mui/lab/Timeline';
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import {
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Item, UrlFeApp } from '../../core/constants/common';
import { validateConstruction } from '../../core/constants/validate';
import { formatDateTimeRes } from '../../core/utils/get-current-datetime';
import { ProjectProgressDTO } from '../../models/project-res-dto';
import { getProjectStatus } from '../../services/project-service';
import MultipleFileUpload from '../../shared-components/file-upload/multiple-file-upload';
import HandleProjectStatus from '../../shared-components/status-handle/project-status-handle';
import './construction.scss';

const initialValues = {
    fileStorages: [],
    constructionName: '',
    constructionCode: '',
    status: '',
    location: '',
    awb: '',
    startDate: formatDateTimeRes(new Date()),
    endDate: formatDateTimeRes(new Date()),
};

export default function ConstructionRegister() {
    const { t } = useTranslation();
    const [projectStatus, setProjectStatus] = useState([]);
    const [formValues, setFormValues] = useState(initialValues);
    const [isClearPreview, setIsClearPreview] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateConstruction),
    });

    useEffect(() => {
        getProjectStatus().then((status: any) => {
            if (status && status.data) setProjectStatus(status.data);
        });
    }, []);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleBack = () => {
        navigate(`${UrlFeApp.CONSTRUCTION.SEARCH}`);
    };

    const handleAttConstructionDrawing = () => {
        alert('upload file');
    };

    const handleSubmitForm = async (event: any) => {
        console.log({ formValues });
    };

    const handleImageChange = (data: any) => {
        const convertedImages = data.map((image: any) => {
            return { data: image };
        });

        setFormValues({
            ...formValues,
            fileStorages: convertedImages,
        });
    };

    const handleClearConstruction = () => {
        setFormValues(initialValues);
        reset();
    };

    return (
        <div className="construction-register">
            <form onSubmit={handleSubmitForm}>
                <div className="p-label-header">
                    <Typography
                        variant="h5"
                        className="btn disabled text-white bg-light opacity-100 border-customTheme"
                        color="textSecondary"
                        gutterBottom
                        sx={{ textTransform: 'uppercase' }}
                    >
                        <div className="particletext">{t('construction.register.title')}</div>
                        <Divider />
                    </Typography>
                </div>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item md={12} lg={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image="https://thumbs.dreamstime.com/b/house-under-construction-blueprints-building-project-53360048.jpg"
                                    alt="green iguana"
                                />
                            </CardActionArea>
                            <div className="construction-info">
                                <CardContent>
                                    <div className="d-flex justify-content-start flex-column p-2 info-item">
                                        <InputLabel htmlFor="outlined-adornment-amount">
                                            {t(Item.LABEL_BTN.UPLOAD_CONSTRUCTION)}
                                        </InputLabel>
                                        <div className="content">
                                            <MultipleFileUpload
                                                clearPreview={isClearPreview}
                                                callbackFunc={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start flex-column p-2 info-item">
                                        <InputLabel
                                            htmlFor="outlined-adornment-amount"
                                            error={Boolean(errors.constructionCode)}
                                        >
                                            {t(Item.CONSTRUCTION.RU_CODE)}
                                            <span className="input-required p-1">*</span>
                                        </InputLabel>
                                        <TextField
                                            size="small"
                                            value={formValues.constructionCode}
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            label=""
                                            placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                            error={Boolean(errors.constructionCode)}
                                            helperText={errors.constructionCode?.message?.toString()}
                                            {...register('constructionCode', {
                                                onChange: (e) => handleInputChange(e),
                                            })}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-start flex-column p-2 info-item">
                                        <InputLabel
                                            htmlFor="outlined-adornment-amount"
                                            error={Boolean(errors.constructionName)}
                                        >
                                            {t(Item.CONSTRUCTION.RU_NAME)}
                                            <span className="input-required p-1">*</span>
                                        </InputLabel>
                                        <TextField
                                            size="small"
                                            value={formValues.constructionName}
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            label=""
                                            placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                            error={Boolean(errors.constructionName)}
                                            helperText={errors.constructionName?.message?.toString()}
                                            {...register('constructionName', {
                                                onChange: (e) => handleInputChange(e),
                                            })}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-start flex-column p-2 info-item">
                                        <InputLabel
                                            htmlFor="outlined-adornment-amount"
                                            error={Boolean(errors.startDate)}
                                        >
                                            {t(Item.CONSTRUCTION.RU_START_DATE)}
                                            <span className="input-required p-1">*</span>
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            value={formValues.startDate}
                                            id="dateStart"
                                            type="datetime-local"
                                            defaultValue="2017-05-23T10:30"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={Boolean(errors.startDate)}
                                            helperText={errors.startDate?.message?.toString()}
                                            {...register('startDate', {
                                                onChange: (e) => handleInputChange(e),
                                            })}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-start flex-column p-2 info-item">
                                        <InputLabel htmlFor="outlined-adornment-amount" error={Boolean(errors.endDate)}>
                                            {t(Item.CONSTRUCTION.RU_END_DATE)}
                                            <span className="input-required p-1">*</span>
                                        </InputLabel>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            value={formValues.endDate}
                                            id="dateEnd"
                                            type="datetime-local"
                                            defaultValue="2017-05-24T10:30"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={Boolean(errors.endDate)}
                                            helperText={errors.endDate?.message?.toString()}
                                            {...register('endDate', {
                                                onChange: (e) => handleInputChange(e),
                                            })}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-start flex-column p-2 info-item">
                                        <InputLabel htmlFor="outlined-adornment-amount">
                                            {t(Item.CONSTRUCTION.RU_LOCATION)}
                                        </InputLabel>
                                        <TextField
                                            size="small"
                                            value={formValues.location}
                                            fullWidth
                                            required
                                            id="outlined-required"
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            label=""
                                            placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                            error={Boolean(errors.location)}
                                            helperText={errors.location?.message?.toString()}
                                            {...register('location', {
                                                onChange: (e) => handleInputChange(e),
                                            })}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-start flex-column p-2 info-item">
                                        <InputLabel htmlFor="outlined-adornment-amount" error={Boolean(errors.status)}>
                                            {t(Item.CONSTRUCTION.RU_STATUS)}
                                            <span className="input-required p-1">*</span>
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            displayEmpty
                                            sx={{
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            value={formValues.status}
                                            {...register('status', {
                                                onChange: (e) => handleInputChange(e),
                                            })}
                                        >
                                            <MenuItem value="" selected={true} disabled>
                                                <em className="m-auto color-label-select-box">
                                                    {t('message.statusLabel')}
                                                </em>
                                            </MenuItem>
                                            {projectStatus &&
                                                projectStatus.length > 0 &&
                                                projectStatus.map((data: any, index: any) => {
                                                    return (
                                                        <MenuItem key={data.id} value={index} className="text-center">
                                                            <HandleProjectStatus
                                                                isSearch={true}
                                                                statusList={projectStatus}
                                                                statusId={data.id.toString()}
                                                            />
                                                        </MenuItem>
                                                    );
                                                })}
                                        </Select>
                                        {Boolean(errors.status) && (
                                            <FormHelperText id="component-error-text">
                                                {errors?.status?.message as string}
                                            </FormHelperText>
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-start flex-column p-2 info-item">
                                        <InputLabel htmlFor="outlined-adornment-amount" error={Boolean(errors.awb)}>
                                            {t(Item.CONSTRUCTION.RU_AWB)}
                                            <span className="input-required p-1">*</span>
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            displayEmpty
                                            sx={{
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            value={formValues.awb}
                                            {...register('awb', {
                                                onChange: (e) => handleInputChange(e),
                                            })}
                                        >
                                            <MenuItem value="" selected={true} disabled>
                                                <em className="m-auto color-label-select-box">
                                                    {t('message.statusLabel')}
                                                </em>
                                            </MenuItem>
                                            {projectStatus &&
                                                projectStatus.length > 0 &&
                                                projectStatus.map((data: any, index: any) => {
                                                    return (
                                                        <MenuItem key={data.id} value={index} className="text-center">
                                                            <HandleProjectStatus
                                                                isSearch={true}
                                                                statusList={projectStatus}
                                                                statusId={data.id.toString()}
                                                            />
                                                        </MenuItem>
                                                    );
                                                })}
                                        </Select>
                                        {Boolean(errors.status) && (
                                            <FormHelperText id="component-error-text">
                                                {errors?.awb?.message as string}
                                            </FormHelperText>
                                        )}
                                    </div>
                                </CardContent>
                            </div>
                            <Grid item xs={12} sm={12} className="text-center pb-4 pt-0">
                                <ButtonGroup
                                    disableElevation
                                    variant="contained"
                                    aria-label="Disabled elevation buttons"
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ mr: 1 }}
                                        disabled={isSubmitting}
                                        onClick={handleSubmit(handleSubmitForm)}
                                    >
                                        {t(Item.LABEL_BTN.CREATE)}
                                    </Button>
                                </ButtonGroup>
                                <Button variant="outlined" type="button" onClick={handleClearConstruction}>
                                    {t(Item.LABEL_BTN.CLEAR)}
                                </Button>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item md={12} lg={8}>
                        <Card style={{ width: '100%' }}>
                            <CardHeader
                                avatar={<Avatar aria-label="recipe">PR</Avatar>}
                                title="Progress daily"
                                subheader={new Date().toLocaleDateString()}
                                action={
                                    <IconButton disabled color="primary" size="large">
                                        <AddCircleIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            />
                            <Divider />
                            <Timeline
                                sx={{
                                    [`& .${timelineOppositeContentClasses.root}`]: {
                                        flex: 0.2,
                                    },
                                }}
                            ></Timeline>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
