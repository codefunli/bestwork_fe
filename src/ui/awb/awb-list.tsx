import { FileDownload } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/system';
import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.scss';
import {
    arrayBufferToBase64,
    downloadZIP,
    prefixZip,
    renderChipAwbStatus,
    StatusCode,
    UrlFeApp,
} from '../../core/constants/common';
import { formatDateTimeResList } from '../../core/utils/get-current-datetime';
import {
    addFileToCustomsClearance,
    changeAwbStatus,
    downloadCCD,
    getAirWayBillByProjectId,
    getAllCommercialInvoice,
    getAllCustomsClearanceDocument,
    getAllPackingList,
    getAwbStatus,
    uploadCommercialInvoice,
    uploadPackingList,
} from '../../services/awb-service';
import ApiAlert from '../../shared-components/alert/api-alert';
import FileManagement from '../../shared-components/awb-management/file-management';
import ImageManagement from '../../shared-components/awb-management/image-management';
import ShowCustomsClearanceInvoice from '../../shared-components/file-management/show-cc-invoice';
import ShowCustomsClearancePackingList from '../../shared-components/file-management/show-cc-packing-list';
import TabPanel from '../../shared-components/tab-manager/tab-panel';
import CreateAwb from './awb-create';
import './awb.scss';

export const CommercialInvoiceContext = createContext([]);
export const PackingListContext = createContext([]);

export default function AirWayBillList() {
    const { t } = useTranslation();
    const [awbListData, setEwbListData] = useState<any>([]);
    const [commercialInvoice, setCommercialInvoice] = useState<any>([]);
    const [packingList, setPackingList] = useState<any>([]);
    const [imageBefore, setImageBefore] = useState<any>([]);
    const [imageAfter, setImageAfter] = useState<any>([]);
    const [currentAwb, setCurrentAwb] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [value, setValue] = useState(0);
    const [customsDeclaration, setCustomsDeclaration] = useState<any>({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const toggleCreateModal = (value: boolean) => setIsOpenCreateModal(value);
    const [projectId, setProjectId] = useState('');
    const params = useParams();
    const [currentAwbCode, setCurrentAwbCode] = useState('');
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();
    const navigate = useNavigate();
    const [statusList, setStatusList] = useState<any>([]);

    const fetchAwbData = (projectId: string) => {
        getAirWayBillByProjectId(projectId).then((value: any) => {
            if (value && value.data) {
                setEwbListData(value.data);
                setCurrentAwbCode(value.data[0].code);
                fetchCommercialInvoice(value.data[0].code);
                fetchCustomsDeclaration(value.data[0].code);
            }
        });
    };

    const fetchCustomsDeclaration = (awbCode: string) => {
        getAllCustomsClearanceDocument(awbCode).then((res: any) => {
            setCustomsDeclaration(res.data ? res.data : {});
        });
    };

    const fetchCommercialInvoice = (awbCode: string) => {
        getAllCommercialInvoice(awbCode).then((value: any) => {
            if (value && value.data && value.data.length > 0) {
                setCommercialInvoice(value.data);
            } else {
                setCommercialInvoice([]);
            }
        });
    };

    const fetchPackingList = (awbCode: string) => {
        getAllPackingList(awbCode).then((value: any) => {
            if (value && value.data && value.data.length > 0) {
                setPackingList(value.data);
            } else {
                setPackingList([]);
            }
        });
    };

    const fetchDownloadFile = (awbCode: string) => {
        downloadCCD(awbCode).then((response: any) => {
            console.log(arrayBufferToBase64(response));
            downloadZIP(arrayBufferToBase64(response), awbCode, prefixZip);
        });
    };

    useEffect(() => {
        if (params.id) setProjectId(params.id);
    }, [params.id]);

    useEffect(() => {
        if (params.id) fetchAwbData(params.id);
    }, [params.id]);

    const handleChangeAwb = (newValue: number, awbCode: string) => {
        setCurrentAwb(newValue);
        setCurrentAwbCode(awbCode);
        fetchCommercialInvoice(awbCode);
        fetchCustomsDeclaration(awbCode);
        fetchPackingList(awbCode);
    };

    const handleSearch = () => {
        const filterItems = awbListData.filter((data: any) => {
            if (data.code.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1) {
                return data;
            }
        });
        setEwbListData({
            ...awbListData,
            awbList: [...filterItems],
        });
    };

    const handleChangeAwbDetail = (newValue: number) => {
        setValue(newValue);
        handleCallApi(newValue);
    };

    const handleCallApi = (tabValue: number) => {
        switch (tabValue) {
            case 1:
                fetchPackingList(currentAwbCode);
                break;
            case 0:
                fetchCommercialInvoice(currentAwbCode);
                break;
            default:
                break;
        }
    };

    const handleDownload = () => {
        fetchDownloadFile(currentAwbCode);
    };

    const handleDeleteAwb = () => {};

    const handleCreateAwb = () => {
        if (params.id) fetchAwbData(params.id);
    };

    const handleUploadInvoice = (fileData: any) => {
        let formData = new FormData();

        if (fileData && fileData.file && fileData.file.length > 0)
            fileData.file.forEach((data: any) => {
                formData.append('file', data);
            });

        uploadCommercialInvoice(formData, fileData.description, currentAwbCode)
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    fetchCommercialInvoice(currentAwbCode);
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
    };

    const handleUploadPackingList = (fileData: any) => {
        let formData = new FormData();

        if (fileData && fileData.file && fileData.file.length > 0)
            fileData.file.forEach((data: any) => {
                formData.append('file', data);
            });
        uploadPackingList(formData, fileData.description, currentAwbCode)
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    fetchPackingList(currentAwbCode);
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
    };

    const handleAddFile = (data: any) => {
        addFileToCustomsClearance({ ...data })
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    if (params.id) fetchAwbData(params.id);
                    handleCallApi(value);
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
    };

    const handleRemoveFile = (item: any) => {
        handleAddFile(item);
    };

    useEffect(() => {
        getAwbStatus().then((value: any) => {
            if (value && value.status === 'OK' && value.data) setStatusList(value.data);
        });
    }, []);

    const handleStatusChange = (v: string, awbCode: string) => {
        const status = statusList.filter((s: any) => {
            return s.status === v;
        });

        const convertData = {
            destinationStatus: status[0].id,
        };

        changeAwbStatus(convertData, awbCode)
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    if (params.id) fetchAwbData(params.id);
                    handleChangeAwb(0, currentAwbCode);
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
    };

    return (
        <div className="awb-list">
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} sx={{ mt: 1, mb: 1 }} className="search-awb">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 text-start d-none d-lg-block">
                            <Typography
                                variant="h5"
                                color="textSecondary"
                                gutterBottom
                                sx={{ textTransform: 'uppercase' }}
                                className="btn disabled text-white bg-light opacity-100 border-customTheme"
                            >
                                <div className="particletext">{t('awb.title')}</div>
                            </Typography>
                        </div>
                        <div className="col-sm-12 col-md-6 text-end d-none d-lg-block">
                            <Button
                                className="btn-create"
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'uppercase' }}
                                onClick={() => {
                                    navigate(`${UrlFeApp.CONSTRUCTION.CREATE}/${params.id}`);
                                }}
                            >
                                {t('awb.createConstruction')}
                            </Button>
                        </div>
                        <div className="col-sm-12 text-start d-block d-lg-none">
                            <Button
                                className="btn-create"
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'uppercase' }}
                                onClick={() => {
                                    navigate(`${UrlFeApp.CONSTRUCTION.CREATE}/${params.id}`);
                                }}
                            >
                                {t('awb.createConstruction')}
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={6} sx={{ mt: 1, mb: 1 }} className="search-awb">
                    <Grid item xs={12} md={12} lg={12} sx={{ mb: 3 }} className="search-awb">
                        <Card w-full="true" style={{ maxHeight: 600 }}>
                            <Grid container direction="row" spacing={0}>
                                <Grid item xs={12} className="bg-customTheme">
                                    <Typography
                                        color="white"
                                        variant="h6"
                                        gutterBottom
                                        sx={{ textTransform: 'uppercase', textAlign: 'center', mt: 2 }}
                                    >
                                        {t('awb.awbTitle')}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className="item">
                                <CardContent>
                                    <Box
                                        sx={{
                                            '& > :not(style)': { m: 1 },
                                        }}
                                    >
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <div className="search-area mb-3">
                                                    <TextField
                                                        size="small"
                                                        fullWidth
                                                        sx={{
                                                            mt: 1,
                                                            mb: 1,
                                                            '& legend': { display: 'none' },
                                                            '& fieldset': { top: 0 },
                                                        }}
                                                        name="keyword"
                                                        label=""
                                                        placeholder={t('common.placeholder')}
                                                        value={searchKeyword}
                                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                                    />
                                                    <Button variant="contained" onClick={handleSearch} color="primary">
                                                        <SearchIcon />
                                                    </Button>
                                                </div>
                                                <Tabs
                                                    orientation="vertical"
                                                    value={currentAwb}
                                                    aria-label=""
                                                    sx={{
                                                        borderRight: 1,
                                                        borderColor: 'divider',
                                                        maxHeight: 320,
                                                        '& .MuiTabs-scroller': { overflow: 'auto !important' },
                                                    }}
                                                >
                                                    {awbListData &&
                                                        awbListData.map((awb: any, index: any) => (
                                                            <span
                                                                style={{
                                                                    backgroundColor: `${
                                                                        currentAwb === index ? '#1976d22a' : ''
                                                                    }`,
                                                                    minWidth: '450px',
                                                                }}
                                                                className="btn"
                                                                onClick={() => handleChangeAwb(index, awb.code)}
                                                            >
                                                                <div
                                                                    className="float-end"
                                                                    style={{ width: '25%', paddingTop: '0.3rem' }}
                                                                >
                                                                    <FormControl sx={{ width: '100%' }}>
                                                                        <Select
                                                                            labelId="demo-simple-select-autowidth-label"
                                                                            id="demo-simple-select-autowidth"
                                                                            value={awb.status}
                                                                            onChange={(e) =>
                                                                                handleStatusChange(
                                                                                    e.target.value,
                                                                                    awb.code,
                                                                                )
                                                                            }
                                                                            label="status"
                                                                            sx={{
                                                                                '& .MuiSelect-select': {
                                                                                    padding: 1,
                                                                                },
                                                                            }}
                                                                        >
                                                                            {statusList &&
                                                                                statusList.map((s: any) => {
                                                                                    return (
                                                                                        <MenuItem value={s.status}>
                                                                                            {renderChipAwbStatus(
                                                                                                s.status,
                                                                                            )}
                                                                                        </MenuItem>
                                                                                    );
                                                                                })}
                                                                        </Select>
                                                                    </FormControl>
                                                                </div>
                                                                <div className="float-end" style={{ width: '25%' }}>
                                                                    <Tab
                                                                        key={index}
                                                                        label={formatDateTimeResList(awb.createDate)}
                                                                        className="awb-tab"
                                                                    />
                                                                </div>
                                                                <div className="float-end" style={{ width: '25%' }}>
                                                                    <Tab
                                                                        key={index}
                                                                        label={awb.createBy}
                                                                        className="awb-tab"
                                                                    />
                                                                </div>
                                                                <div className="float-end" style={{ width: '25%' }}>
                                                                    <Tab
                                                                        key={index}
                                                                        label={awb.code}
                                                                        className="awb-tab"
                                                                    />
                                                                </div>
                                                            </span>
                                                        ))}
                                                </Tabs>
                                            </div>
                                            <div className="text-center justify-center mt-4">
                                                <ButtonGroup
                                                    disableElevation
                                                    variant="contained"
                                                    aria-label="Disabled elevation buttons"
                                                >
                                                    <Button
                                                        sx={{ mr: 1 }}
                                                        variant="contained"
                                                        onClick={() => toggleCreateModal(true)}
                                                    >
                                                        {t('button.btnCreate')}
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDeleteAwb()}
                                                        variant="outlined"
                                                        color="error"
                                                    >
                                                        {t('button.btnDelete')}
                                                    </Button>
                                                </ButtonGroup>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} sx={{ mt: 1, mb: 1 }} className="content-awb">
                        <Card sx={{ width: '100%' }} className="progress-drawer" style={{ maxHeight: 900 }}>
                            <Grid container direction="row" spacing={0}>
                                <Grid item xs={12} className="bg-customTheme">
                                    <Typography
                                        color="white"
                                        variant="h6"
                                        gutterBottom
                                        sx={{ textTransform: 'uppercase', textAlign: 'center', mt: 2 }}
                                    >
                                        {t('awb.customsClearanceDocuments')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className="text-center item">
                                    <div className="item-header">{t('awb.AWBNo')}</div>
                                    <div className="content text-center">{currentAwbCode}</div>
                                </Grid>
                                <Grid item xs={12} className="text-center item">
                                    <div className="item-header">{t('awb.commercialInvoice')}</div>
                                    <div
                                        className="content pt-3"
                                        style={{
                                            height: 230,
                                            overflowX: 'auto',
                                            display: 'inline-block',
                                            width: '100%',
                                        }}
                                    >
                                        <ShowCustomsClearanceInvoice
                                            customsDeclaration={customsDeclaration}
                                            callBackFn={handleRemoveFile}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="text-center item">
                                    <div className="item-header">{t('awb.packingList')}</div>
                                    <div
                                        className="content pt-3"
                                        style={{
                                            height: 230,
                                            overflowX: 'auto',
                                            display: 'inline-block',
                                            width: '100%',
                                        }}
                                    >
                                        <ShowCustomsClearancePackingList
                                            customsDeclaration={customsDeclaration}
                                            callBackFn={handleRemoveFile}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} className="text-center item">
                                    <div className="item-header">Action</div>
                                    <div
                                        className="content pt-3"
                                        style={{
                                            overflowX: 'auto',
                                            display: 'inline-block',
                                            width: '100%',
                                        }}
                                    >
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                            className="mt-2"
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{ ml: 1 }}
                                                onClick={handleDownload}
                                                startIcon={<DownloadIcon />}
                                            >
                                                {t('button.btnDownload')}
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={6} sx={{ mt: 1, mb: 1 }} className="content-awb">
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12}>
                            <Tabs value={value} aria-label="">
                                <Tab
                                    label={t('awb.commercialInvoice')}
                                    tabIndex={0}
                                    onFocus={() => handleChangeAwbDetail(0)}
                                />
                                <Tab
                                    label={t('awb.packingList')}
                                    tabIndex={1}
                                    onFocus={() => handleChangeAwbDetail(1)}
                                />
                                <Tab
                                    label={t('awb.imageBefore')}
                                    tabIndex={2}
                                    onFocus={() => handleChangeAwbDetail(2)}
                                />
                                <Tab
                                    label={t('awb.imageAfter')}
                                    tabIndex={3}
                                    onFocus={() => handleChangeAwbDetail(3)}
                                />
                            </Tabs>
                            <Grid xs={12} className="position-relative">
                                <div>
                                    <Card w-full="true" className="">
                                        <TabPanel value={value} index={0}>
                                            <CardContent>
                                                <Box>
                                                    {
                                                        <CommercialInvoiceContext.Provider value={commercialInvoice}>
                                                            <FileManagement
                                                                callBackFn={handleUploadInvoice}
                                                                callBackAddFile={handleAddFile}
                                                            />
                                                        </CommercialInvoiceContext.Provider>
                                                    }
                                                </Box>
                                            </CardContent>
                                        </TabPanel>
                                    </Card>
                                </div>
                                <div>
                                    <Card w-full="true" className="content-item">
                                        <TabPanel value={value} index={1}>
                                            <CardContent>
                                                <Box>
                                                    {
                                                        <PackingListContext.Provider value={packingList}>
                                                            <FileManagement
                                                                data={packingList}
                                                                callBackAddFile={handleAddFile}
                                                                callBackFn={handleUploadPackingList}
                                                            />
                                                        </PackingListContext.Provider>
                                                    }
                                                </Box>
                                            </CardContent>
                                        </TabPanel>
                                    </Card>
                                </div>
                                <div>
                                    <Card w-full="true" className="content-item ">
                                        <TabPanel value={value} index={2}>
                                            <CardContent>
                                                <Box>{imageBefore && <ImageManagement data={imageBefore} />}</Box>
                                            </CardContent>
                                        </TabPanel>
                                    </Card>
                                </div>
                                <div>
                                    <Card w-full="true" className="content-item">
                                        <TabPanel value={value} index={3}>
                                            <CardContent>
                                                <Box>{imageAfter && <ImageManagement data={imageAfter} />}</Box>
                                            </CardContent>
                                        </TabPanel>
                                    </Card>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <CreateAwb
                isOpen={isOpenCreateModal}
                toggleOpen={toggleCreateModal}
                handleCreateNewAwb={handleCreateAwb}
                projectId={projectId}
            />
            <ApiAlert response={resForHandleMsg} />
        </div>
    );
}
