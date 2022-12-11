import { yupResolver } from '@hookform/resolvers/yup';
import {
    AlertColor,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusCode, UrlFeApp } from '../../core/constants/common';
import { validateProjectRegisterForm } from '../../core/constants/validate';
import { isArrayEmpty, isObjectEmpty } from '../../core/utils/object-utils';
import { Company } from '../../models/project-req-dto';
import { ProjectTypeDTO } from '../../models/project-res-dto';
import { getAllCompanies } from '../../services/company-service';
import {
    getProject,
    getProjectStatus,
    getProjectTypes,
    updateProject,
    getUsersAssignListUpdate,
} from '../../services/project-service';
import {
    formatDateTimeRes,
    formatDateTimeReq,
    formatDateTimeResNoneSuffixes,
} from '../../core/utils/get-current-datetime';
import ApiAlert from '../../shared-components/alert/api-alert';
import TabPanel from '../../shared-components/tab-manager/tab-panel';
import Role from './project-role';

const initialValues: any = {
    project: {
        projectName: '',
        projectType: '',
        description: '',
        comment: '',
        startDate: '',
        notificationFlag: true,
        isPaid: false,
        status: '',
    },
};

export default function ProjectRegister() {
    const { t } = useTranslation();
    const params = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        project: {
            ...initialValues.project,
            startDate: formatDateTimeRes(new Date()),
        },
    });
    const [value, setValue] = useState(0);
    const [roleData, setRoleData] = useState<Company[]>([]);
    const [projectStatus, setProjectStatus] = useState<any>([]);
    const [projectType, setProjectType] = useState<ProjectTypeDTO[]>([]);
    const [companyList, setCompanyList] = useState<any>([]);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();

    useEffect(() => {
        if (params.id) {
            getProject(params.id).then((value: any) => {
                if (value && value.data) {
                    setFormValues({
                        project: {
                            ...value.data,
                            projectType: value.data.projectType.id,
                            startDate: value.data.startDate
                                ? formatDateTimeResNoneSuffixes(value.data.startDate)
                                : formatDateTimeRes(new Date()),
                        },
                    });
                    reset();
                }
            });

            getUsersAssignListUpdate({
                companyId: '',
                projectId: params.id,
            }).then((res) => {
                const companyIdRoleDataList: any = Object.keys(res.data);
                const companyValueRoleDataList: any = Object.values(res.data);

                let tmpRoleData: any = [];

                companyIdRoleDataList.map((companyId: any, index: number) => {
                    if (companyValueRoleDataList[index][0].companyId.toString() === companyId.toString()) {
                        tmpRoleData.push({
                            companyId: companyId,
                            userList: companyValueRoleDataList[index],
                        });
                    }
                });

                setRoleData(tmpRoleData);
            });
        }
    }, [params.id]);

    useEffect(() => {
        getProjectStatus().then((status) => {
            if (status && status.data) setProjectStatus(status.data);
        });

        getProjectTypes().then((type: any) => {
            if (type) setProjectType(type);
        });

        getAllCompanies().then((companies) => {
            if (companies && companies.data) setCompanyList(companies?.data);
        });
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateProjectRegisterForm),
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            project: {
                ...formValues.project,
                [name]: value,
            },
        });
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setValue(0);
        }
    }, [errors]);

    const handleIsPaidChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            project: {
                ...formValues.project,
                [name]: value,
            },
        });
    };

    const handleNotificationFlagChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            project: {
                ...formValues.project,
                [name]: value,
            },
        });
    };

    const handleBack = () => {
        navigate(UrlFeApp.PROJECT.SEARCH);
    };

    const handleSubmitForm = async (event: any) => {
        let req: any = {
            ...formValues,
            project: {
                ...formValues.project,
                startDate: formatDateTimeReq(formValues.project.startDate),
            },
        };

        if (!isObjectEmpty(roleData) && !isArrayEmpty(roleData)) {
            const reFormatRoleData = await roleData.map((role: any) => {
                const reFormatUserList = role.userList.map((user: any) => {
                    return {
                        userId: user.userId,
                        canView: user.canView,
                        canEdit: user.canEdit,
                    };
                });

                return {
                    companyId: role.companyId,
                    userList: reFormatUserList,
                };
            });

            req.roleData = reFormatRoleData;
        }

        await updateProject(req, params.id)
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    setTimeout(() => {
                        navigate(UrlFeApp.PROJECT.SEARCH);
                    }, 1000);
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="project">
            <div className="p-label-header">
                <Typography
                    variant="h5"
                    className="btn disabled text-white bg-light opacity-100 border-customTheme"
                    color="textSecondary"
                    gutterBottom
                    sx={{ textTransform: 'uppercase' }}
                >
                    <div className="particletext">{t('project.editTitle')}</div>
                    <Divider />
                </Typography>
            </div>
            <Grid container direction="row" spacing={3} className="project-register">
                <Grid item xs={12}>
                    <form onSubmit={handleSubmitForm}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={12}>
                                <Tabs value={value} onChange={handleChange} aria-label="" className="custom-tab">
                                    <Tab label={t('project.tab.register')} tabIndex={0} onFocus={() => setValue(0)} />
                                    <Tab label={t('project.tab.assign')} tabIndex={1} onFocus={() => setValue(0)} />
                                </Tabs>

                                <div className="custom-tab">
                                    <Card w-full="true">
                                        <TabPanel value={value} index={0}>
                                            <CardContent>
                                                <Box
                                                    // component="form"
                                                    sx={{
                                                        '& > :not(style)': { m: 1 },
                                                    }}
                                                    // noValidate
                                                    // autoComplete="off"
                                                >
                                                    <div className="row justify-center m-1">
                                                        <div className="col-12 col-sm-6 d-block p-1">
                                                            <InputLabel
                                                                htmlFor="projectName"
                                                                error={Boolean(errors.projectName)}
                                                            >
                                                                {t('project.register.name')}{' '}
                                                                <span className="input-required">*</span>
                                                            </InputLabel>
                                                            <TextField
                                                                size="small"
                                                                value={formValues.project.projectName}
                                                                fullWidth={true}
                                                                required
                                                                sx={{
                                                                    mt: 1,
                                                                    mb: 1,
                                                                    '& legend': { display: 'none' },
                                                                    '& fieldset': { top: 0 },
                                                                }}
                                                                label=""
                                                                id="projectName"
                                                                placeholder={t('common.placeholder')}
                                                                error={Boolean(errors.projectName)}
                                                                helperText={t(
                                                                    errors.projectName?.message?.toString() as string,
                                                                )}
                                                                {...register('projectName', {
                                                                    onChange: (e) => handleInputChange(e),
                                                                })}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                        <div className="col-12 col-sm-6 d-block p-1">
                                                            <InputLabel
                                                                htmlFor="description"
                                                                error={Boolean(errors.description)}
                                                            >
                                                                {t('project.register.description')}
                                                            </InputLabel>
                                                            <TextField
                                                                size="small"
                                                                value={formValues.project.description}
                                                                fullWidth={true}
                                                                required
                                                                sx={{
                                                                    mt: 1,
                                                                    mb: 1,
                                                                    '& legend': { display: 'none' },
                                                                    '& fieldset': { top: 0 },
                                                                }}
                                                                label=""
                                                                id="description"
                                                                placeholder={t('common.placeholder')}
                                                                error={Boolean(errors.description)}
                                                                helperText={t(
                                                                    errors.description?.message?.toString() as string,
                                                                )}
                                                                {...register('description', {
                                                                    onChange: (e) => handleInputChange(e),
                                                                })}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row justify-center m-1">
                                                        <div className="col-12 col-sm-6 d-block p-1">
                                                            <InputLabel
                                                                htmlFor="startDate"
                                                                error={Boolean(errors.startDate)}
                                                            >
                                                                {t('project.register.startDate')}{' '}
                                                                <span className="input-required">*</span>
                                                            </InputLabel>
                                                            <TextField
                                                                fullWidth={true}
                                                                sx={{
                                                                    mt: 1,
                                                                    mb: 1,
                                                                    '& legend': { display: 'none' },
                                                                    '& fieldset': { top: 0 },
                                                                    '& input': { padding: '8.5px 14px' },
                                                                }}
                                                                value={formValues.project.startDate}
                                                                id="startDate"
                                                                type="datetime-local"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                error={Boolean(errors.startDate)}
                                                                helperText={t(
                                                                    errors.startDate?.message?.toString() as string,
                                                                )}
                                                                {...register('startDate', {
                                                                    onChange: (e) => handleInputChange(e),
                                                                })}
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                        <div className="col-12 col-sm-6 p-1">
                                                            <InputLabel id="demo-simple-select-outlined-label">
                                                                {t('project.register.status')}{' '}
                                                                <span className="input-required">*</span>
                                                            </InputLabel>
                                                            <FormControl
                                                                size="small"
                                                                fullWidth={true}
                                                                sx={{
                                                                    mt: 1,
                                                                    mb: 1,
                                                                    '& legend': { display: 'none' },
                                                                    '& fieldset': { top: 0 },
                                                                }}
                                                                variant="outlined"
                                                            >
                                                                <Select
                                                                    labelId="demo-simple-select-outlined-label"
                                                                    id="status"
                                                                    displayEmpty
                                                                    value={formValues.project.status}
                                                                    {...register('status', {
                                                                        onChange: (e) => handleInputChange(e),
                                                                    })}
                                                                >
                                                                    <MenuItem value="" selected={true} disabled>
                                                                        <em>{t('message.statusLabel')}</em>
                                                                    </MenuItem>
                                                                    {projectStatus &&
                                                                        projectStatus.length > 0 &&
                                                                        projectStatus.map((item: any) => (
                                                                            <MenuItem key={item.id} value={item.id}>
                                                                                {item.status}
                                                                            </MenuItem>
                                                                        ))}
                                                                </Select>
                                                                {Boolean(errors.status) && (
                                                                    <FormHelperText id="component-error-text">
                                                                        {errors?.status?.message as string}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className="row justify-center m-1">
                                                        <div className="col-12 col-sm-6 d-block p-1">
                                                            <InputLabel id="demo-simple-select-outlined-label">
                                                                {t('project.register.type')}{' '}
                                                                <span className="input-required">*</span>
                                                            </InputLabel>
                                                            <FormControl
                                                                size="small"
                                                                fullWidth={true}
                                                                sx={{
                                                                    mt: 1,
                                                                    mb: 1,
                                                                    '& legend': { display: 'none' },
                                                                    '& fieldset': { top: 0 },
                                                                }}
                                                                variant="outlined"
                                                            >
                                                                <Select
                                                                    labelId="demo-simple-select-outlined-label"
                                                                    id="type"
                                                                    displayEmpty
                                                                    value={formValues.project.projectType}
                                                                    {...register('projectType', {
                                                                        onChange: (e) => handleInputChange(e),
                                                                    })}
                                                                >
                                                                    <MenuItem value="" selected={true} disabled>
                                                                        <em>{t('message.typeLabel')}</em>
                                                                    </MenuItem>
                                                                    {projectType &&
                                                                        projectType.length > 0 &&
                                                                        projectType.map((type: ProjectTypeDTO) => (
                                                                            <MenuItem key={type.id} value={type.id}>
                                                                                {type.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                </Select>
                                                                {Boolean(errors.projectType) && (
                                                                    <FormHelperText id="component-error-text">
                                                                        {errors?.projectType?.message as string}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </div>
                                                        <div className="col-12 col-sm-6 d-block p-1">
                                                            <div className="row justify-center m-1">
                                                                <div className="col-12 col-md-6 d-block">
                                                                    <FormControl component="fieldset">
                                                                        <FormLabel component="legend">
                                                                            {t('project.register.notificationFlag')}
                                                                        </FormLabel>
                                                                        <RadioGroup
                                                                            row
                                                                            aria-label="notificationFlag"
                                                                            name="notificationFlag"
                                                                            value={formValues.project.notificationFlag}
                                                                            onChange={handleNotificationFlagChange}
                                                                            defaultValue={true}
                                                                        >
                                                                            <FormControlLabel
                                                                                value={true}
                                                                                control={<Radio color="primary" />}
                                                                                label={t('radio.accept')}
                                                                            />
                                                                            <FormControlLabel
                                                                                value={false}
                                                                                control={<Radio color="primary" />}
                                                                                label={t('radio.deny')}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </div>
                                                                <div className="col-12 col-md-6 d-block">
                                                                    <FormControl component="fieldset">
                                                                        <FormLabel component="legend">
                                                                            {t('project.register.isPaid')}
                                                                        </FormLabel>
                                                                        <RadioGroup
                                                                            row
                                                                            aria-label="isPaid"
                                                                            name="isPaid"
                                                                            value={formValues.project.isPaid}
                                                                            onChange={handleIsPaidChange}
                                                                            defaultValue={true}
                                                                        >
                                                                            <FormControlLabel
                                                                                value={true}
                                                                                control={<Radio color="primary" />}
                                                                                label={t('radio.paid')}
                                                                            />
                                                                            <FormControlLabel
                                                                                value={false}
                                                                                control={<Radio color="primary" />}
                                                                                label={t('radio.unPaid')}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center justify-center mt-4">
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
                                                                {t('button.btnUpdate')}
                                                            </Button>
                                                            <Button variant="outlined" onClick={handleBack}>
                                                                {t('button.btnBack')}
                                                            </Button>
                                                        </ButtonGroup>
                                                    </div>
                                                </Box>
                                            </CardContent>
                                        </TabPanel>
                                    </Card>
                                </div>

                                <div className="assign-user-tab">
                                    <Card w-full="true">
                                        <TabPanel value={value} index={1}>
                                            <CardContent>
                                                <Role
                                                    defaultCompanyList={companyList}
                                                    defaultRoleData={roleData}
                                                    setRoleData={setRoleData}
                                                />
                                            </CardContent>
                                        </TabPanel>
                                    </Card>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

                <ApiAlert response={resForHandleMsg} />
            </Grid>
        </div>
    );
}
