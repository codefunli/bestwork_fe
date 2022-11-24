import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.scss';
import {
    arrayBufferToBase64,
    CUSTOMS_CLEARANCE,
    downloadZIP,
    prefixZip,
    renderChipAwbStatus,
    StatusCode,
    UrlFeApp,
} from '../../core/constants/common';
import { useAppDispatch } from '../../core/hook/redux';
import {
    customsClearanceActions,
    getAirWayBillList,
    getCommercialInvoice,
    getCustomsClearanceDocument,
    getImageAfter,
    getImageBefore,
    getPackingList,
} from '../../core/redux/customs-clearance-slice';
import { formatDateTimeResList } from '../../core/utils/get-current-datetime';
import {
    addFileToCustomsClearance,
    addImageAfterComment,
    addImageBeforeComment,
    addInvoicePostComment,
    addPackingPostComment,
    changeAwbStatus,
    downloadCCD,
    getAirWayBillByProjectId,
    getAllCommercialInvoice,
    getAllCustomsClearanceDocument,
    getAllImageAfter,
    getAllImageBefore,
    getAllPackingList,
    getAwbStatus,
    uploadCommercialInvoice,
    uploadImageAfter,
    uploadImageBefore,
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
export const ImageBeforeContext = createContext([]);
export const ImageAfterContext = createContext([]);

export default function AirWayBillList() {
    const { t } = useTranslation();
    const [awbListData, setAwbListState] = useState<any>([]);
    const [commercialInvoiceState, setCommercialInvoiceState] = useState<any>([]);
    const [packingListState, setPackingListState] = useState<any>([]);
    const [imageBeforeState, setImageBeforeState] = useState<any>([]);
    const [imageAfterState, setImageAfterState] = useState<any>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [customsDeclarationDocumentState, setCustomsDeclarationDocumentState] = useState<any>({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const toggleCreateModal = (value: boolean) => setIsOpenCreateModal(value);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();
    const [statusListState, setStatusListState] = useState<any>([]);
    const airWayBillListRedux = useSelector(getAirWayBillList);
    const invoiceRedux = useSelector(getCommercialInvoice);
    const packingListRedux = useSelector(getPackingList);
    const imageBeforeRedux = useSelector(getImageBefore);
    const imageAfterRedux = useSelector(getImageAfter);
    const customsClearanceDocumentRedux = useSelector(getCustomsClearanceDocument);
    const [projectId, setProjectId] = useState('');
    const params = useParams();
    const dispatch = useAppDispatch();
    const [customsClearanceTab, setCustomsClearanceTab] = useState(0);
    const [awbTab, setAwbTab] = useState(0);
    const [currentAwbCode, setCurrentAwbCode] = useState('');
    const navigate = useNavigate();

    const callInitAPI = async (projectId: string) => {
        const awbList = await fetchAirWayBillAPI(projectId);
        dispatch(customsClearanceActions.setAirWayBillList(awbList.data));
        setCurrentAwbCode(awbList.data[0].code);
        const res = await Promise.all([
            fetchCommercialInvoiceAPI(awbList.data[0].code),
            fetchPackingListApi(awbList.data[0].code),
            fetchCustomsClearanceDocument(awbList.data[0].code),
            fetchImageBefore(awbList.data[0].code),
            fetchImageAfter(awbList.data[0].code),
        ]);
        dispatch(customsClearanceActions.setCommercialInvoice(res[0].data));
        dispatch(customsClearanceActions.setPackingList(res[1].data));
        dispatch(customsClearanceActions.setCustomsClearanceDocument(res[2].data));
        dispatch(customsClearanceActions.setImageBefore(res[3].data));
        dispatch(customsClearanceActions.setImageAfter(res[4].data));
    };

    useEffect(() => {
        dispatch(customsClearanceActions.setAirWayBillList([]));
        dispatch(customsClearanceActions.setCommercialInvoice([]));
        dispatch(customsClearanceActions.setPackingList([]));
        dispatch(customsClearanceActions.setImageBefore([]));
        dispatch(customsClearanceActions.setImageAfter([]));
        dispatch(
            customsClearanceActions.setCustomsClearanceDocument({
                invoiceDoc: [],
                packagesDoc: [],
            }),
        );
    }, []);

    useEffect(() => {
        if (params.id) callInitAPI(params.id);
    }, [params.id]);

    useEffect(() => {
        setAwbListState(airWayBillListRedux ? airWayBillListRedux : []);
    }, [airWayBillListRedux]);

    useEffect(() => {
        setCommercialInvoiceState(invoiceRedux ? invoiceRedux : []);
    }, [invoiceRedux]);

    useEffect(() => {
        setPackingListState(packingListRedux ? packingListRedux : []);
    }, [packingListRedux]);

    useEffect(() => {
        setImageBeforeState(imageBeforeRedux ? imageBeforeRedux : []);
    }, [imageBeforeRedux]);

    useEffect(() => {
        setImageAfterState(imageAfterRedux ? imageAfterRedux : []);
    }, [imageAfterRedux]);

    useEffect(() => {
        setCustomsDeclarationDocumentState(customsClearanceDocumentRedux ? customsClearanceDocumentRedux : []);
    }, [customsClearanceDocumentRedux]);

    const fetchAirWayBillAPI = async (projectId: string) => {
        return await getAirWayBillByProjectId(projectId);
    };

    const fetchCommercialInvoiceAPI = async (awbCode: string) => {
        return await getAllCommercialInvoice(awbCode);
    };

    const fetchPackingListApi = async (awbCode: string) => {
        return await getAllPackingList(awbCode);
    };

    const fetchImageBefore = async (awbCode: string) => {
        return await getAllImageBefore(awbCode);
    };

    const fetchImageAfter = async (awbCode: string) => {
        return await getAllImageAfter(awbCode);
    };

    const fetchCustomsClearanceDocument = async (awbCode: string) => {
        return await getAllCustomsClearanceDocument(awbCode);
    };

    const filterByAirWayBillCode = async (awbCode: string) => {
        const res = await Promise.all([
            fetchCommercialInvoiceAPI(awbCode),
            fetchPackingListApi(awbCode),
            fetchCustomsClearanceDocument(awbCode),
            fetchImageBefore(awbCode),
            fetchImageAfter(awbCode),
        ]);
        dispatch(customsClearanceActions.setCommercialInvoice(res[0].data));
        dispatch(customsClearanceActions.setPackingList(res[1].data));
        dispatch(customsClearanceActions.setCustomsClearanceDocument(res[2].data));
        dispatch(customsClearanceActions.setImageBefore(res[3].data));
        dispatch(customsClearanceActions.setImageAfter(res[4].data));
    };

    useEffect(() => {
        if (params.id) setProjectId(params.id);
    }, [params.id]);

    const fetchDownloadFile = (awbCode: string) => {
        downloadCCD(awbCode).then((response: any) => {
            downloadZIP(arrayBufferToBase64(response), awbCode, prefixZip);
        });
    };

    const handleChangeAwbTab = (newValue: number, awbCode: string) => {
        setAwbTab(newValue);
        setCurrentAwbCode(awbCode);
        filterByAirWayBillCode(awbCode);
    };

    const handleSearch = () => {
        let filterItems = awbListData;
        if (searchKeyword) {
            filterItems = awbListData.filter((data: any) => {
                if (data.code.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1) {
                    return data;
                }
            });
        }
        setAwbListState(filterItems);
    };

    const handleChangeCustomsClearanceTab = (newValue: number) => {
        setCustomsClearanceTab(newValue);
    };

    const handleDownload = () => {
        fetchDownloadFile(currentAwbCode);
    };

    const handleDeleteAwb = () => {};

    const handleCreateAwb = () => {
        fetchAirWayBillAPI(projectId).then((res: any) => {
            dispatch(customsClearanceActions.setAirWayBillList(res.data));
        });
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
                    fetchCommercialInvoiceAPI(currentAwbCode).then((res: any) => {
                        dispatch(customsClearanceActions.setCommercialInvoice(res.data));
                    });
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
                    fetchPackingListApi(currentAwbCode).then((res: any) => {
                        dispatch(customsClearanceActions.setPackingList(res.data));
                    });
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
    };

    const handleUploadImageBefore = (imageData: any) => {
        let formData = new FormData();

        if (imageData && imageData.file && imageData.file.length > 0)
            imageData.file.forEach((data: any) => {
                formData.append('mFiles', data);
            });
        formData.append(
            'evidenceBefore',
            new Blob([JSON.stringify({ airWayBillCode: currentAwbCode, description: imageData.description })], {
                type: 'application/json',
            }),
        );

        uploadImageBefore(formData)
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    fetchImageBefore(currentAwbCode).then((res: any) => {
                        dispatch(customsClearanceActions.setImageBefore(res.data));
                    });
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
    };

    const handleUploadImageAfter = (imageData: any) => {
        let formData = new FormData();

        if (imageData && imageData.file && imageData.file.length > 0)
            imageData.file.forEach((data: any) => {
                formData.append('mFiles', data);
            });
        formData.append(
            'evidenceAfter',
            new Blob([JSON.stringify({ airWayBillCode: currentAwbCode, description: imageData.description })], {
                type: 'application/json',
            }),
        );

        uploadImageAfter(formData)
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    fetchImageAfter(currentAwbCode).then((res: any) => {
                        dispatch(customsClearanceActions.setImageAfter(res.data));
                    });
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
                    fetchCustomsClearanceDocument(currentAwbCode).then((res: any) => {
                        dispatch(customsClearanceActions.setCustomsClearanceDocument(res.data));
                    });
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
            if (value && value.status === 'OK' && value.data) setStatusListState(value.data);
        });
    }, []);

    const handleStatusChange = (statusChange: string, awbCode: string) => {
        const status = statusListState.filter((s: any) => {
            return s.status === statusChange;
        });

        const convertData = {
            destinationStatus: status[0].id,
        };

        let handleAirWayBillListRedux = airWayBillListRedux.map((currentAwb: any) => {
            if (currentAwb.code === awbCode) {
                return {
                    ...currentAwb,
                    status: statusChange,
                };
            }
            return currentAwb;
        });
        dispatch(customsClearanceActions.setAirWayBillList(handleAirWayBillListRedux));
        changeAwbStatus(convertData, awbCode)
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                } else {
                    fetchAirWayBillAPI(projectId).then((res: any) => {
                        dispatch(customsClearanceActions.setAirWayBillList(res.data));
                    });
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
                fetchAirWayBillAPI(projectId).then((res: any) => {
                    dispatch(customsClearanceActions.setAirWayBillList(res.data));
                });
            });
    };

    const handleAddFileComment = (data: any) => {
        const convertData = {
            airWayBillCode: currentAwbCode,
            comment: data.comment,
        };
        switch (data.postType) {
            case CUSTOMS_CLEARANCE.INVOICE:
                addInvoicePostComment(convertData, data.postId)
                    .then((res) => {
                        setResForHandleMsg({
                            status: res.status,
                            message: res.message,
                        });

                        if (res.status !== StatusCode.OK) {
                            fetchCommercialInvoiceAPI(currentAwbCode).then((res: any) => {
                                dispatch(customsClearanceActions.setCommercialInvoice(res.data));
                            });
                        }
                    })
                    .catch(() => {
                        fetchCommercialInvoiceAPI(currentAwbCode).then((res: any) => {
                            dispatch(customsClearanceActions.setCommercialInvoice(res.data));
                        });
                        setResForHandleMsg({
                            status: StatusCode.ERROR,
                            message: t('message.error'),
                        });
                    });
                break;
            case CUSTOMS_CLEARANCE.PACKAGE:
                addPackingPostComment(convertData, data.postId)
                    .then((res) => {
                        setResForHandleMsg({
                            status: res.status,
                            message: res.message,
                        });

                        if (res.status !== StatusCode.OK) {
                            fetchPackingListApi(currentAwbCode).then((res: any) => {
                                dispatch(customsClearanceActions.setPackingList(res.data));
                            });
                        }
                    })
                    .catch(() => {
                        fetchPackingListApi(currentAwbCode).then((res: any) => {
                            dispatch(customsClearanceActions.setPackingList(res.data));
                        });
                        setResForHandleMsg({
                            status: StatusCode.ERROR,
                            message: t('message.error'),
                        });
                    });
                break;
            default:
                break;
        }
    };

    const handleAddImageComment = (data: any) => {
        const convertData = {
            airWayBillCode: currentAwbCode,
            comment: data.comment,
        };

        switch (data.postType) {
            case CUSTOMS_CLEARANCE.IMAGE_BEFORE:
                addImageBeforeComment(convertData, data.postId)
                    .then((res) => {
                        setResForHandleMsg({
                            status: res.status,
                            message: res.message,
                        });

                        if (res.status !== StatusCode.OK) {
                            fetchImageBefore(currentAwbCode).then((res: any) => {
                                dispatch(customsClearanceActions.setImageBefore(res.data));
                            });
                        }
                    })
                    .catch(() => {
                        fetchImageBefore(currentAwbCode).then((res: any) => {
                            dispatch(customsClearanceActions.setImageBefore(res.data));
                        });
                        setResForHandleMsg({
                            status: StatusCode.ERROR,
                            message: t('message.error'),
                        });
                    });
                break;
            case CUSTOMS_CLEARANCE.IMAGE_AFTER:
                addImageAfterComment(convertData, data.postId)
                    .then((res) => {
                        setResForHandleMsg({
                            status: res.status,
                            message: res.message,
                        });

                        if (res.status !== StatusCode.OK) {
                            fetchImageAfter(currentAwbCode).then((res: any) => {
                                dispatch(customsClearanceActions.setImageAfter(res.data));
                            });
                        }
                    })
                    .catch(() => {
                        fetchImageAfter(currentAwbCode).then((res: any) => {
                            dispatch(customsClearanceActions.setImageBefore(res.data));
                        });
                        setResForHandleMsg({
                            status: StatusCode.ERROR,
                            message: t('message.error'),
                        });
                    });
                break;
            default:
                break;
        }
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
                                        sx={{ textTransform: 'uppercase', textAlign: 'center', mt: 1 }}
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
                                                    value={awbTab}
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
                                                                        awbTab === index ? '#1976d22a' : ''
                                                                    }`,
                                                                    minWidth: '450px',
                                                                }}
                                                                className="btn"
                                                                onClick={() => handleChangeAwbTab(index, awb.code)}
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
                                                                                '& legend': { display: 'none' },
                                                                                '& fieldset': { top: 0 },
                                                                            }}
                                                                        >
                                                                            {statusListState &&
                                                                                statusListState.map((s: any) => {
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
                                        sx={{ textTransform: 'uppercase', textAlign: 'center', mt: 1 }}
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
                                            customsDeclaration={customsDeclarationDocumentState}
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
                                            customsDeclaration={customsDeclarationDocumentState}
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
                            <Tabs value={customsClearanceTab} aria-label="">
                                <Tab
                                    label={t('awb.commercialInvoice')}
                                    tabIndex={0}
                                    onFocus={() => handleChangeCustomsClearanceTab(0)}
                                />
                                <Tab
                                    label={t('awb.packingList')}
                                    tabIndex={1}
                                    onFocus={() => handleChangeCustomsClearanceTab(1)}
                                />
                                <Tab
                                    label={t('awb.imageBefore')}
                                    tabIndex={2}
                                    onFocus={() => handleChangeCustomsClearanceTab(2)}
                                />
                                <Tab
                                    label={t('awb.imageAfter')}
                                    tabIndex={3}
                                    onFocus={() => handleChangeCustomsClearanceTab(3)}
                                />
                            </Tabs>
                            <Grid xs={12} className="position-relative">
                                <div>
                                    <Card w-full="true" className="">
                                        <TabPanel value={customsClearanceTab} index={0}>
                                            <CardContent>
                                                <Box>
                                                    {
                                                        <CommercialInvoiceContext.Provider
                                                            value={commercialInvoiceState}
                                                        >
                                                            <FileManagement
                                                                callBackFn={handleUploadInvoice}
                                                                callBackAddFile={handleAddFile}
                                                                callBackAddComment={handleAddFileComment}
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
                                        <TabPanel value={customsClearanceTab} index={1}>
                                            <CardContent>
                                                <Box>
                                                    {
                                                        <PackingListContext.Provider value={packingListState}>
                                                            <FileManagement
                                                                callBackAddFile={handleAddFile}
                                                                callBackFn={handleUploadPackingList}
                                                                callBackAddComment={handleAddFileComment}
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
                                        <TabPanel value={customsClearanceTab} index={2}>
                                            <CardContent>
                                                <Box>
                                                    {
                                                        <ImageBeforeContext.Provider value={imageBeforeState}>
                                                            <ImageManagement
                                                                callBackFn={handleUploadImageBefore}
                                                                callBackAddComment={handleAddImageComment}
                                                            />
                                                        </ImageBeforeContext.Provider>
                                                    }
                                                </Box>
                                            </CardContent>
                                        </TabPanel>
                                    </Card>
                                </div>
                                <div>
                                    <Card w-full="true" className="content-item">
                                        <TabPanel value={customsClearanceTab} index={3}>
                                            <CardContent>
                                                <Box>
                                                    {
                                                        <ImageAfterContext.Provider value={imageAfterState}>
                                                            <ImageManagement
                                                                callBackFn={handleUploadImageAfter}
                                                                callBackAddComment={handleAddImageComment}
                                                            />
                                                        </ImageAfterContext.Provider>
                                                    }
                                                </Box>
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
