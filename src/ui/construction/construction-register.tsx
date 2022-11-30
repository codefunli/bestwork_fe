import { yupResolver } from '@hookform/resolvers/yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Timeline from '@mui/lab/Timeline';
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Divider,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Item, StatusCode, UrlFeApp } from '../../core/constants/common';
import { validateConstruction } from '../../core/constants/validate';
import { formatDateTimeRes } from '../../core/utils/get-current-datetime';
import { AWBCode } from '../../models/construction-res-dto';
import { getAirWayBillByProjectId } from '../../services/awb-service';
import { getConstructionStatus, registerConstruction } from '../../services/construction-service';
import ApiAlert from '../../shared-components/alert/api-alert';
import UploadMultipartFile from '../../shared-components/file-management/upload-multipartfile';
import HandleConstructionStatus from '../../shared-components/status-handle/construction-status-handle';
import './construction.scss';

const initialValues = {
    fileStorages: [],
    constructionName: '',
    status: '',
    location: '',
    awbCodes: [] as AWBCode[],
    description: '',
    startDate: formatDateTimeRes(new Date()),
    endDate: formatDateTimeRes(new Date()),
    projectCode: '',
};

const initialDataImg = {
    description: '',
    file: [],
    isOpenComment: false,
};

export default function ConstructionRegister() {
    const { t } = useTranslation();
    const params = useParams();
    const [constructionStatus, setConstructionStatus] = useState([]);
    const [awbCodesList, setAwbCodesList] = useState([]);
    const [formValues, setFormValues] = useState(initialValues);
    const navigate = useNavigate();
    const [isClearPreview, setIsClearPreview] = useState(false);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();
    const [selectValue, setSelectValue] = useState<string[]>([]);
    const [fileData, setFileData] = useState(initialDataImg);
    const [eventImage, setEventImage] = useState<any>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateConstruction),
    });

    const handleChange = (event: SelectChangeEvent<typeof selectValue>) => {
        const {
            target: { value },
        } = event;

        let selectValueTmp = typeof value === 'string' ? value.split(',') : value;
        setSelectValue(selectValueTmp);
        setFormValues({
            ...formValues,
            awbCodes: awbCodesList.filter(awbCodes => selectValueTmp.includes(awbCodes["id"] as string)),
        });
    };
    
    useEffect(() => {
        getConstructionStatus().then((result: any) => {
            if (result && result.data) setConstructionStatus(result.data);
        });
        
        if (params.id) {
            setFormValues({
                ...formValues,
                projectCode: params.id,
            });

            getAirWayBillByProjectId(params.id).then((result: any) => {
                if (result && result.data) setAwbCodesList(result.data);
            });
        }
    }, []);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleClear = () => {
        reset();
        setIsClearPreview(true);
        if (params.id) {
            setFormValues({
                ...formValues,
                projectCode: params.id,
            });
        }
    };

    const getValueFromAwbCode = (id: any) => {
        let result = awbCodesList.map((awbCode: any) => {
            if (awbCode.id === id) {
                return awbCode.code;
            }
        });

        return result;
    };

    const onChangeImage = (data: any) => {
        setFileData({
            ...fileData,
            file: data,
        });
    };

    const handleClearEvent = (event: any) => {
        setEventImage(event);
    };

    const clearEventImage = () => {
        if (eventImage && eventImage.target && eventImage.target.value) eventImage.target.value = '';
    };

    const handleSubmitForm = async (event: any) => {
        let formData = new FormData();

        if (fileData && fileData.file && fileData.file.length > 0) {
            fileData.file.forEach((data: any) => {
                formData.append('drawings', data);
            });
        } else {
            formData.append('drawings', new Blob());
        }

        formData.append(
            'constructionReqDto',
            new Blob([JSON.stringify(formValues)], {
                type: 'application/json',
            }),
        );

        registerConstruction(formData)
            .then((res: any) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    setTimeout(() => {
                        navigate(UrlFeApp.CONSTRUCTION.SEARCH);
                    }, 1000);
                }
            })
            .catch((err) => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });

        handleClear();
        clearEventImage();
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
                                            <UploadMultipartFile
                                                imgData={formValues.fileStorages}
                                                clearPreview={true}
                                                callbackFunc={onChangeImage}
                                                callBackClearEvent={handleClearEvent}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start flex-column p-2 info-item">
                                        <InputLabel htmlFor="constructionName" error={Boolean(errors.constructionName)}>
                                            {t(Item.CONSTRUCTION.RU_NAME)}
                                            <span className="input-required p-1">*</span>
                                        </InputLabel>
                                        <TextField
                                            autoComplete="off"
                                            size="small"
                                            value={formValues.constructionName}
                                            fullWidth
                                            required
                                            id="constructionName"
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
                                        <InputLabel htmlFor="description" error={Boolean(errors.description)}>
                                            {t(Item.CONSTRUCTION.RU_DESCRIPTION)}
                                        </InputLabel>
                                        <TextField
                                            autoComplete="off"
                                            size="small"
                                            value={formValues.description}
                                            fullWidth
                                            required
                                            id="description"
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            label=""
                                            name="description"
                                            placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-start flex-column p-2 info-item">
                                        <InputLabel htmlFor="startDate" error={Boolean(errors.startDate)}>
                                            {t(Item.CONSTRUCTION.RU_START_DATE)}
                                            <span className="input-required p-1">*</span>
                                        </InputLabel>
                                        <TextField
                                            autoComplete="off"
                                            fullWidth
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            value={formValues.startDate}
                                            id="startDate"
                                            type="datetime-local"
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
                                        <InputLabel htmlFor="endDate" error={Boolean(errors.endDate)}>
                                            {t(Item.CONSTRUCTION.RU_END_DATE)}
                                            <span className="input-required p-1">*</span>
                                        </InputLabel>
                                        <TextField
                                            autoComplete="off"
                                            fullWidth
                                            size="small"
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            value={formValues.endDate}
                                            id="endDate"
                                            type="datetime-local"
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
                                        <InputLabel htmlFor="location">{t(Item.CONSTRUCTION.RU_LOCATION)}</InputLabel>
                                        <TextField
                                            autoComplete="off"
                                            size="small"
                                            value={formValues.location}
                                            fullWidth
                                            required
                                            id="location"
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
                                            name="location"
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-start flex-column p-2 info-item">
                                        <InputLabel htmlFor="status" error={Boolean(errors.status)}>
                                            {t(Item.CONSTRUCTION.RU_STATUS)}
                                            <span className="input-required p-1">*</span>
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="status"
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
                                            {constructionStatus &&
                                                constructionStatus.length > 0 &&
                                                constructionStatus.map((data: any, index: any) => {
                                                    return (
                                                        <MenuItem key={data.id} value={index} className="text-center">
                                                            <HandleConstructionStatus
                                                                isSearch={true}
                                                                statusList={constructionStatus}
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
                                        <InputLabel htmlFor="awb" error={Boolean(errors.awb)}>
                                            {t(Item.CONSTRUCTION.RU_AWB)}
                                            <span className="input-required p-1">*</span>
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="awbCodes"
                                            multiple
                                            value={selectValue}
                                            sx={{
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={getValueFromAwbCode(value)} />
                                                    ))}
                                                </Box>
                                            )}
                                            onChange={(e) => handleChange(e)}
                                        >
                                            {awbCodesList.map((awbCode: any) => (
                                                <MenuItem key={awbCode.id} value={awbCode.id}>
                                                    {awbCode.code}
                                                </MenuItem>
                                            ))}
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
                                <Button variant="outlined" type="button" onClick={handleClear}>
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
            <ApiAlert response={resForHandleMsg} />
        </div>
    );
}
