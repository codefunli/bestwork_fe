import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
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
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StatusCode, UrlFeApp } from '../../core/constants/common';
import { validateProjectRegisterForm } from '../../core/constants/validate';
import { isArrayEmpty, isObjectEmpty } from '../../core/utils/object-utils';
import { Company } from '../../models/project-req-dto';
import { ProjectTypeDTO } from '../../models/project-res-dto';
import { getAllCompanies } from '../../services/company-service';
import { createProject, getProjectStatus, getProjectTypes } from '../../services/project-service';
import ApiAlert from '../../shared-components/alert/api-alert';
import TabPanel from '../../shared-components/tab-manager/tab-panel';
import Role from './project-role';

const initialValues: any = {
    project: {
        projectName: '',
        projectType: '',
        description: '',
        comment: '',
        createDate: new Date(),
        notificationFlag: true,
        isPaid: false,
        status: '',
    },
};

export default function ProjectRegister() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(initialValues);
    const [value, setValue] = useState(0);
    const [roleData, setRoleData] = useState<Company[]>([]);
    const [projectStatus, setProjectStatus] = useState<any>([]);
    const [projectType, setProjectType] = useState<ProjectTypeDTO[]>([]);
    const [companyList, setCompanyList] = useState<any>([]);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();

    useEffect(() => {
        getProjectStatus().then(status => {
            if (status && status.data) setProjectStatus(status.data);
        });

        getProjectTypes().then((type: any) => {
            if (type) setProjectType(type);
        });

        getAllCompanies().then(companies => {
            if (companies && companies.data) setCompanyList(companies?.data);
        });
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
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

    const handleClearCompany = () => {
        setFormValues({
            ...formValues,
            project: initialValues.project,
        });
        reset();
    };

    const handleSubmitForm = async (event: any) => {
        let req: any = {
            ...formValues,
            project: {
                ...formValues.project,
                createDate: (new Date(formValues.project.createDate)).toISOString().replaceAll('.', ':')
            },
        };

        if (!isObjectEmpty(roleData) && !isArrayEmpty(roleData)) {
            const reFormatRoleData = await roleData.map((role: any) => {
                const reFormatUserList = role.userList.map((user: any) => {
                    return {
                        userId: user.userId,
                        canView: user.canView,
                        canEdit: user.canEdit
                    };
                });

                return {
                    companyId: role.companyId,
                    userList: reFormatUserList
                };
            });

            req.roleData = reFormatRoleData;
        };

        await createProject(req)
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                navigate(UrlFeApp.PROJECT.SEARCH);
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
            <Grid container direction="row" spacing={3} className="project-register">
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <div className="row">
                        <div className="col-12">
                            <Typography
                                variant="h5"
                                color="textSecondary"
                                gutterBottom
                                sx={{ textTransform: 'uppercase' }}
                            >
                                {t('project.registerTitle')}
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmitForm}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={12}>
                                <Tabs value={value} onChange={handleChange} aria-label="" className="custom-tab">
                                    <Tab
                                        label={t('project.tab.register')}
                                        tabIndex={0}
                                        onFocus={() => setValue(0)}
                                    />
                                    <Tab
                                        label={t('project.tab.assign')}
                                        tabIndex={1}
                                        onFocus={() => setValue(0)}
                                    />
                                </Tabs>

                                <div className="custom-tab">
                                    <Card w-full="true">
                                        <TabPanel value={value} index={0}>
                                            <CardContent>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& > :not(style)': { m: 1 },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <div className="row justify-center m-1">
                                                        <div className="col-12 col-sm-6 d-block p-1">
                                                            <InputLabel
                                                                htmlFor="outlined-adornment-amount"
                                                                error={Boolean(errors.projectName)}
                                                            >
                                                                {t('project.register.name')}{' '}
                                                                <span className="input-required">*</span>
                                                            </InputLabel>
                                                            <TextField
                                                                size="small"
                                                                value={formValues.project.projectName}
                                                                fullWidth
                                                                required
                                                                sx={{
                                                                    mt: 1,
                                                                    mb: 1,
                                                                    '& legend': { display: 'none' },
                                                                    '& fieldset': { top: 0 },
                                                                }}
                                                                label=""
                                                                id="outlined-required"
                                                                placeholder={t('common.placeholder')}
                                                                error={Boolean(errors.projectName)}
                                                                helperText={t(
                                                                    errors.projectName?.message?.toString() as string,
                                                                )}
                                                                {...register('projectName', {
                                                                    onChange: (e) => handleInputChange(e),
                                                                })}
                                                            />
                                                        </div>
                                                        <div className="col-12 col-sm-6 d-block p-1">
                                                            <InputLabel
                                                                htmlFor="outlined-adornment-amount"
                                                                error={Boolean(errors.comment)}
                                                            >
                                                                {t('project.register.comment')}
                                                            </InputLabel>
                                                            <TextField
                                                                size="small"
                                                                value={formValues.project.comment}
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
                                                                placeholder={t('common.placeholder')}
                                                                error={Boolean(errors.comment)}
                                                                helperText={errors.comment?.message?.toString()}
                                                                {...register('comment', {
                                                                    onChange: (e) => handleInputChange(e),
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row justify-center m-1">
                                                        <div className="col-12 col-sm-6 d-block p-1">
                                                            <InputLabel
                                                                htmlFor="outlined-adornment-amount"
                                                                error={Boolean(errors.description)}
                                                            >
                                                                {t('project.register.description')}
                                                            </InputLabel>
                                                            <TextField
                                                                size="small"
                                                                value={formValues.project.description}
                                                                fullWidth
                                                                required
                                                                sx={{
                                                                    mt: 1,
                                                                    mb: 1,
                                                                    '& legend': { display: 'none' },
                                                                    '& fieldset': { top: 0 },
                                                                }}
                                                                label=""
                                                                id="outlined-required"
                                                                placeholder={t('common.placeholder')}
                                                                error={Boolean(errors.description)}
                                                                helperText={t(
                                                                    errors.description?.message?.toString() as string,
                                                                )}
                                                                {...register('description', {
                                                                    onChange: (e) => handleInputChange(e),
                                                                })}
                                                            />
                                                        </div>
                                                        <div className="col-12 col-sm-6 p-1">
                                                            <InputLabel
                                                                htmlFor="outlined-adornment-amount"
                                                                error={Boolean(errors.createDate)}
                                                            >
                                                                {t('project.register.createDate')}{' '}
                                                                <span className="input-required">*</span>
                                                            </InputLabel>
                                                            <TextField
                                                                fullWidth
                                                                sx={{
                                                                    mt: 1,
                                                                    mb: 1,
                                                                    '& legend': { display: 'none' },
                                                                    '& fieldset': { top: 0 },
                                                                    '& input': { padding: '8.5px 14px' },
                                                                }}
                                                                value={formValues.project.createDate}
                                                                id="dateEnd"
                                                                type="datetime-local"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                error={Boolean(errors.createDate)}
                                                                helperText={t(
                                                                    errors.createDate?.message?.toString() as string,
                                                                )}
                                                                {...register('createDate', {
                                                                    onChange: (e) => handleInputChange(e),
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row justify-center m-1">
                                                        <div className="col-12 col-sm-6 d-block p-1">
                                                            <InputLabel id="demo-simple-select-outlined-label">
                                                                {t('project.register.status')}{' '}
                                                                <span className="input-required">*</span>
                                                            </InputLabel>
                                                            <FormControl
                                                                size="small"
                                                                fullWidth
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
                                                                    id="demo-simple-select-outlined"
                                                                    displayEmpty
                                                                    value={formValues.project.status}
                                                                    {...register('status', {
                                                                        onChange: (e) => handleInputChange(e),
                                                                    })}
                                                                >
                                                                    <MenuItem value="" selected={true} disabled>
                                                                        <em>{t('message.statusLabel')}</em>
                                                                    </MenuItem>
                                                                    {(projectStatus && projectStatus.length > 0) && projectStatus.map((item: any) => (
                                                                        <MenuItem value={item.id}>{item.status}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                                {Boolean(errors.status) && (
                                                                    <FormHelperText id="component-error-text">
                                                                        {errors?.status?.message as string}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </div>
                                                        <div className="col-12 col-sm-6 d-block p-1">
                                                            <InputLabel id="demo-simple-select-outlined-label">
                                                                {t('project.register.type')}{' '}
                                                                <span className="input-required">*</span>
                                                            </InputLabel>
                                                            <FormControl
                                                                size="small"
                                                                fullWidth
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
                                                                    id="demo-simple-select-outlined"
                                                                    displayEmpty
                                                                    value={formValues.project.projectType}
                                                                    {...register('projectType', {
                                                                        onChange: (e) => handleInputChange(e),
                                                                    })}
                                                                >
                                                                    <MenuItem value="" selected={true} disabled>
                                                                        <em>{t('message.typeLabel')}</em>
                                                                    </MenuItem>
                                                                    {(projectType && projectType.length > 0) && projectType.map((type: ProjectTypeDTO) => (
                                                                        <MenuItem value={type.id}>{type.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                                {Boolean(errors.projectType) && (
                                                                    <FormHelperText id="component-error-text">
                                                                        {errors?.projectType?.message as string}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                    <div className="row justify-center m-1">
                                                        <div className="col-12 col-sm-6 d-block p-1 mt-3">
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
                                                            <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={handleSubmit(handleSubmitForm)}>
                                                                {t('button.btnCreate')}
                                                            </Button>
                                                            <Button variant="outlined" onClick={handleClearCompany}>
                                                                {t('button.btnClear')}
                                                            </Button>
                                                        </ButtonGroup>
                                                    </div >
                                                </Box >
                                            </CardContent >
                                        </TabPanel >
                                    </Card >
                                </div >

                                <div className="assign-user-tab">
                                    <Card w-full="true">
                                        <TabPanel value={value} index={1}>
                                            <CardContent>
                                                <Role defaultCompanyList={companyList} defaultRoleData={roleData} setRoleData={setRoleData} />
                                            </CardContent >
                                        </TabPanel >
                                    </Card >
                                </div >
                            </Grid >
                        </Grid >
                    </form >
                </Grid >

                <ApiAlert response={resForHandleMsg} />
            </Grid >
        </div >
    );
}
