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
    Tooltip,
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
    AWB_LOADING,
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
import { getUserInfo } from '../../core/redux/user-slice';
import { Permission } from '../../core/types/permission';
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
import ShowCustomsClearanceImageBefore from '../../shared-components/file-management/show-cc-image-before';
import ShowCustomsClearanceInvoice from '../../shared-components/file-management/show-cc-invoice';
import ShowCustomsClearancePackingList from '../../shared-components/file-management/show-cc-packing-list';
import TabPanel from '../../shared-components/tab-manager/tab-panel';
import CreateAwb from './awb-create';
import EditAwb from './awb-edit';
import './awb.scss';

export const CommercialInvoiceContext = createContext([]);
export const PackingListContext = createContext([]);
export const ImageBeforeContext = createContext([]);
export const ImageAfterContext = createContext([]);
export const PermissionContext = createContext({});
export const AwbDataContext = createContext({});

export default function AirWayBillList() {
    const { t } = useTranslation();
    const [awbListData, setAwbListData] = useState<any>([]);
    const [commercialInvoiceState, setCommercialInvoiceState] = useState<any>([]);
    const [packingListState, setPackingListState] = useState<any>([]);
    const [imageBeforeState, setImageBeforeState] = useState<any>([]);
    const [imageAfterState, setImageAfterState] = useState<any>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [customsDeclarationDocumentState, setCustomsDeclarationDocumentState] = useState<any>({});
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const toggleCreateModal = (value: boolean) => setIsOpenCreateModal(value);
    const toggleEditModal = (value: boolean) => setIsOpenEditModal(value);
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
    const [currentAwbId, setCurrentAwbId] = useState('');
    const [currentAwbCode, setCurrentAwbCode] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(AWB_LOADING.LOADING);
    const [isLoadingCCD, setIsLoadingCCD] = useState(AWB_LOADING.LOADING);
    const userInfo = useSelector(getUserInfo);
    const [permission, setPermission] = useState<any>();
    const [currentAwbData, setCurrentAwbData] = useState<any>();

    useEffect(() => {
        if (userInfo && userInfo.project && userInfo.project[0]) {
            setPermission(userInfo.project[0]);
        }
    }, [userInfo]);

    // Reset data in redux of customs clearance
    useEffect(() => {
        dispatch(customsClearanceActions.setAirWayBillList([]));
        clearData();
    }, []);

    // Init data
    useEffect(() => {
        if (params.id) {
            setProjectId(params.id);
            callInitAPI(params.id);
        }
    }, [params.id]);

    const callInitAPI = async (projectId: string) => {
        const awbList = await fetchAirWayBillAPI(projectId);
        // Case of the project hasn't not any awb
        if (awbList.data == undefined || awbList.data == null) {
            setTimeout(() => {
                setIsLoadingCCD(AWB_LOADING.NO_DATA);
                setIsLoading(AWB_LOADING.NO_DATA);
            }, 1000);
        } else {
            setCurrentAwbData({
                id: awbList.data[0].id,
                code: awbList.data[0].code,
                note: awbList.data[0].note,
                status: awbList.data[0].status,
            });

            // save AWB data into the redux
            dispatch(customsClearanceActions.setAirWayBillList(awbList.data));
            setCurrentAwbId(awbList.data[0].id);
            setCurrentAwbCode(awbList.data[0].code);
            // Get invoice, packing list, image after, and image before by AWB code
            // save invoice, packing list, image after and image before into the redux
            filterByAirWayBillId(awbList.data[0].id);
        }
    };

    const clearData = () => {
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
    };

    // save awb data into the redux
    useEffect(() => {
        setAwbListData(airWayBillListRedux ? airWayBillListRedux : []);
    }, [airWayBillListRedux]);

    // save invoice data into the redux
    useEffect(() => {
        setCommercialInvoiceState(invoiceRedux ? invoiceRedux : []);
    }, [invoiceRedux]);

    // save packing list data into the redux
    useEffect(() => {
        setPackingListState(packingListRedux ? packingListRedux : []);
    }, [packingListRedux]);

    // save image before data into the redux
    useEffect(() => {
        setImageBeforeState(imageBeforeRedux ? imageBeforeRedux : []);
    }, [imageBeforeRedux]);

    // save image after data into the redux
    useEffect(() => {
        setImageAfterState(imageAfterRedux ? imageAfterRedux : []);
    }, [imageAfterRedux]);

    // save customs clearance data into the redux
    useEffect(() => {
        setCustomsDeclarationDocumentState(customsClearanceDocumentRedux ? customsClearanceDocumentRedux : []);
    }, [customsClearanceDocumentRedux]);

    // fetch air way bill data from the server
    const fetchAirWayBillAPI = async (projectId: string) => {
        return await getAirWayBillByProjectId(projectId);
    };

    // fetch commercial invoice data from the server
    const fetchCommercialInvoiceAPI = async (awbCode: string) => {
        return await getAllCommercialInvoice(awbCode);
    };

    // fetch packing list data from the server
    const fetchPackingListApi = async (awbCode: string) => {
        return await getAllPackingList(awbCode);
    };

    // fetch image before data from the server
    const fetchImageBefore = async (awbCode: string) => {
        return await getAllImageBefore(awbCode);
    };

    // fetch image after data from the server
    const fetchImageAfter = async (awbCode: string) => {
        return await getAllImageAfter(awbCode);
    };

    // fetch customs clearance data from the server
    const fetchCustomsClearanceDocument = async (awbCode: string) => {
        return await getAllCustomsClearanceDocument(awbCode);
    };

    // Get invoice, packing list, image after, and image before by AWB code
    // save invoice, packing list, image after and image before into the redux
    const filterByAirWayBillId = async (awbId: string) => {
        const res = await Promise.all([
            fetchCommercialInvoiceAPI(awbId),
            fetchPackingListApi(awbId),
            fetchCustomsClearanceDocument(awbId),
            fetchImageBefore(awbId),
            fetchImageAfter(awbId),
        ]);
        checkIsLoading(res);
        dispatch(customsClearanceActions.setCommercialInvoice(res[0].data));
        dispatch(customsClearanceActions.setPackingList(res[1].data));
        dispatch(customsClearanceActions.setCustomsClearanceDocument(res[2].data));
        dispatch(customsClearanceActions.setImageBefore(res[3].data));
        dispatch(customsClearanceActions.setImageAfter(res[4].data));
    };

    // check loading in customs clearance document area
    // check loading in invoice, packing list, image before, image after area
    const checkIsLoading = (res: any) => {
        if (res[2].data === undefined || res[2].data === null) {
            setIsLoadingCCD(AWB_LOADING.NO_DATA);
        } else {
            setIsLoadingCCD(AWB_LOADING.HAS_DATA);
        }

        switch (customsClearanceTab) {
            case 0:
                handleSetIsLoading(res[0].data);
                break;
            case 1:
                handleSetIsLoading(res[1].data);
                break;
            case 2:
                handleSetIsLoading(res[3].data);
                break;
            case 3:
                handleSetIsLoading(res[4].data);
                break;
            default:
                break;
        }
    };

    const handleSetIsLoading = (object: any) => {
        if (object === undefined || object === null) {
            setIsLoading(AWB_LOADING.NO_DATA);
        } else {
            setIsLoading(AWB_LOADING.HAS_DATA);
        }
    };

    // dowload file
    const fetchDownloadFile = (awbId: string, awbCode: string) => {
        downloadCCD(awbId).then((response: any) => {
            downloadZIP(arrayBufferToBase64(response), awbCode, prefixZip);
        });
    };

    // fetch data when change AWB code
    const handleChangeAwbTab = (newValue: number, awb: any) => {
        setCurrentAwbCode(awb.code);
        setIsLoading(AWB_LOADING.LOADING);
        setIsLoadingCCD(AWB_LOADING.LOADING);
        clearData();
        setAwbTab(newValue);
        setCurrentAwbId(awb.id);
        filterByAirWayBillId(awb.id);
        setCurrentAwbData({
            id: awb.id,
            code: awb.code,
            note: awb.note,
            status: awb.status,
        });
    };

    // search awb code
    const handleSearch = async () => {
        let awbListSearch = airWayBillListRedux;
        if (searchKeyword) {
            let filterItems = awbListSearch.filter((data: any) => {
                if (data.code.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1) {
                    return data;
                }
            });
            setAwbListData(filterItems);
        } else {
            setAwbListData(airWayBillListRedux);
        }
    };

    const handleChangeCustomsClearanceTab = (newValue: number) => {
        setCustomsClearanceTab(newValue);
        switch (newValue) {
            case 0:
                handleSetIsLoading(invoiceRedux);
                break;
            case 1:
                handleSetIsLoading(packingListRedux);
                break;
            case 2:
                handleSetIsLoading(imageBeforeRedux);
                break;
            case 3:
                handleSetIsLoading(imageAfterRedux);
                break;
            default:
                break;
        }
    };

    const handleDownload = () => {
        fetchDownloadFile(currentAwbId, currentAwbCode);
    };

    const handleDeleteAwb = () => {};

    const handleCreateAwb = () => {
        fetchAirWayBillAPI(projectId).then((res: any) => {
            dispatch(customsClearanceActions.setAirWayBillList(res.data));
            handleChangeAwbTab(airWayBillListRedux.length, res.data[res.data.length - 1]);
        });
    };

    const handleEditAwb = () => {
        fetchAirWayBillAPI(projectId).then((res: any) => {
            dispatch(customsClearanceActions.setAirWayBillList(res.data));
            console.log(res.data[res.data.length - 1]);

            handleChangeAwbTab(awbTab, res.data[res.data.length - 1]);
        });
    };

    const handleUploadInvoice = (fileData: any) => {
        let formData = new FormData();

        if (fileData && fileData.file && fileData.file.length > 0) {
            fileData.file.forEach((data: any) => {
                formData.append('file', data);
            });
        } else {
            formData.append('file', new Blob());
        }

        setIsLoading(AWB_LOADING.LOADING);
        uploadCommercialInvoice(formData, fileData.description, currentAwbId)
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    fetchCommercialInvoiceAPI(currentAwbId).then((res: any) => {
                        dispatch(customsClearanceActions.setCommercialInvoice(res.data));
                        if (res.data === undefined || res.data === null) {
                            setIsLoading(AWB_LOADING.NO_DATA);
                        } else {
                            setIsLoading(AWB_LOADING.HAS_DATA);
                        }
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
        if (fileData && fileData.file && fileData.file.length > 0) {
            fileData.file.forEach((data: any) => {
                formData.append('file', data);
            });
        } else {
            formData.append('file', new Blob());
        }
        setIsLoading(AWB_LOADING.LOADING);
        uploadPackingList(formData, fileData.description, currentAwbId)
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    fetchPackingListApi(currentAwbId).then((res: any) => {
                        dispatch(customsClearanceActions.setPackingList(res.data));
                        if (res.data === undefined || res.data === null) {
                            setIsLoading(AWB_LOADING.NO_DATA);
                        } else {
                            setIsLoading(AWB_LOADING.HAS_DATA);
                        }
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
        setIsLoading(AWB_LOADING.LOADING);
        if (imageData && imageData.file && imageData.file.length > 0) {
            imageData.file.forEach((data: any) => {
                formData.append('mFiles', data);
            });
        } else {
            formData.append('mFiles', new Blob());
        }
        formData.append(
            'evidenceBefore',
            new Blob([JSON.stringify({ awbId: currentAwbId, description: imageData.description })], {
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
                    fetchImageBefore(currentAwbId).then((res: any) => {
                        dispatch(customsClearanceActions.setImageBefore(res.data));
                        if (res.data === undefined || res.data === null) {
                            setIsLoading(AWB_LOADING.NO_DATA);
                        } else {
                            setIsLoading(AWB_LOADING.HAS_DATA);
                        }
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
        setIsLoading(AWB_LOADING.LOADING);
        if (imageData && imageData.file && imageData.file.length > 0) {
            imageData.file.forEach((data: any) => {
                formData.append('mFiles', data);
            });
        } else {
            formData.append('mFiles', new Blob());
        }
        formData.append(
            'evidenceAfter',
            new Blob([JSON.stringify({ airWayBillId: currentAwbId, description: imageData.description })], {
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
                    fetchImageAfter(currentAwbId).then((res: any) => {
                        dispatch(customsClearanceActions.setImageAfter(res.data));
                        if (res.data === undefined || res.data === null) {
                            setIsLoading(AWB_LOADING.NO_DATA);
                        } else {
                            setIsLoading(AWB_LOADING.HAS_DATA);
                        }
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
                    fetchCustomsClearanceDocument(currentAwbId).then((res: any) => {
                        dispatch(customsClearanceActions.setCustomsClearanceDocument(res.data));
                        if (res.data === undefined || res.data === null) {
                            setIsLoadingCCD(AWB_LOADING.NO_DATA);
                        } else {
                            setIsLoadingCCD(AWB_LOADING.HAS_DATA);
                        }
                    });

                    if (data.postType === CUSTOMS_CLEARANCE.INVOICE) {
                        fetchCommercialInvoiceAPI(currentAwbId).then((res: any) => {
                            dispatch(customsClearanceActions.setCommercialInvoice(res.data));
                        });
                    } else if (data.postType === CUSTOMS_CLEARANCE.PACKAGE) {
                        fetchPackingListApi(currentAwbId).then((res: any) => {
                            dispatch(customsClearanceActions.setPackingList(res.data));
                        });
                    } else if (data.postType === CUSTOMS_CLEARANCE.IMAGE_BEFORE) {
                        fetchImageBefore(currentAwbId).then((res: any) => {
                            dispatch(customsClearanceActions.setImageBefore(res.data));
                        });
                    }
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

    const handleStatusChange = (statusChange: string, awbCode: string, event: any) => {
        const convertData = {
            destinationStatus: statusChange,
        };

        let handleAirWayBillListRedux = airWayBillListRedux.map((currentAwb: any) => {
            if (currentAwb.id === awbCode) {
                return {
                    ...currentAwb,
                    status: statusChange,
                };
            }
            return currentAwb;
        });

        setAwbListData(handleAirWayBillListRedux);
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
            awbId: currentAwbId,
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
                            fetchCommercialInvoiceAPI(currentAwbId).then((res: any) => {
                                dispatch(customsClearanceActions.setCommercialInvoice(res.data));
                            });
                        }
                    })
                    .catch(() => {
                        fetchCommercialInvoiceAPI(currentAwbId).then((res: any) => {
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
                            fetchPackingListApi(currentAwbId).then((res: any) => {
                                dispatch(customsClearanceActions.setPackingList(res.data));
                            });
                        }
                    })
                    .catch(() => {
                        fetchPackingListApi(currentAwbId).then((res: any) => {
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
            awbId: currentAwbId,
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
                            fetchImageBefore(currentAwbId).then((res: any) => {
                                dispatch(customsClearanceActions.setImageBefore(res.data));
                            });
                        }
                    })
                    .catch(() => {
                        fetchImageBefore(currentAwbId).then((res: any) => {
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
                            fetchImageAfter(currentAwbId).then((res: any) => {
                                dispatch(customsClearanceActions.setImageAfter(res.data));
                            });
                        }
                    })
                    .catch(() => {
                        fetchImageAfter(currentAwbId).then((res: any) => {
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
                                disabled={
                                    !awbListData.some((awb: any) => awb.status === 2) || userInfo.uRole !== 'contractor'
                                }
                                onClick={
                                    !awbListData.some((awb: any) => awb.status === 2) || userInfo.uRole !== 'contractor'
                                        ? () => {}
                                        : () => {
                                              navigate(`${UrlFeApp.CONSTRUCTION.CREATE}/${params.id}`);
                                          }
                                }
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
                                disabled={
                                    !awbListData.some((awb: any) => awb.status === 2) || userInfo.uRole !== 'contractor'
                                }
                                onClick={
                                    !awbListData.some((awb: any) => awb.status === 2) || userInfo.uRole !== 'contractor'
                                        ? () => {
                                              navigate(`${UrlFeApp.CONSTRUCTION.CREATE}/${params.id}`);
                                          }
                                        : () => {}
                                }
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
                                                        sx={{
                                                            mt: 1,
                                                            mb: 1,
                                                            '& legend': { display: 'none' },
                                                            '& fieldset': { top: 0 },
                                                            width: '100%',
                                                        }}
                                                        name="keyword"
                                                        label=""
                                                        placeholder={t('common.placeholder')}
                                                        value={searchKeyword}
                                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                                        autoComplete="off"
                                                    />
                                                    <Button variant="contained" onClick={handleSearch} color="primary">
                                                        <SearchIcon />
                                                    </Button>
                                                </div>
                                                {awbListData &&
                                                    awbListData.map((awb: any, index: any) => (
                                                        <div
                                                            key={awb.id}
                                                            style={{
                                                                backgroundColor: `${
                                                                    awbTab === index ? '#1976d22a' : ''
                                                                }`,
                                                                minWidth: '450px',
                                                                width: '100%',
                                                            }}
                                                            className="btn"
                                                            onClick={
                                                                isLoading === AWB_LOADING.LOADING ||
                                                                isLoadingCCD === AWB_LOADING.LOADING
                                                                    ? () => {}
                                                                    : () => handleChangeAwbTab(index, awb)
                                                            }
                                                        >
                                                            <div
                                                                className="float-end"
                                                                style={{ width: '25%', paddingTop: '0.3rem' }}
                                                            >
                                                                {statusListState && statusListState.length > 0 && (
                                                                    <FormControl sx={{ width: '100%' }}>
                                                                        <Select
                                                                            labelId="demo-simple-select-autowidth-label"
                                                                            id="demo-simple-select-autowidth"
                                                                            value={awb.status}
                                                                            defaultValue=""
                                                                            onChange={(e) =>
                                                                                handleStatusChange(
                                                                                    e.target.value,
                                                                                    awb.id,
                                                                                    e,
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
                                                                                        <MenuItem
                                                                                            key={s.id}
                                                                                            value={s.id}
                                                                                        >
                                                                                            {renderChipAwbStatus(
                                                                                                s.status,
                                                                                            )}
                                                                                        </MenuItem>
                                                                                    );
                                                                                })}
                                                                        </Select>
                                                                    </FormControl>
                                                                )}
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
                                                            <div
                                                                className="float-end"
                                                                style={{
                                                                    width: '25%',
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                }}
                                                            >
                                                                <Tooltip title={awb.code} placement="top">
                                                                    <Tab
                                                                        key={index}
                                                                        label={awb.code}
                                                                        className="awb-tab"
                                                                    />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    ))}
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
                                                        disabled={!permission?.canEdit}
                                                        onClick={
                                                            permission?.canEdit
                                                                ? () => toggleCreateModal(true)
                                                                : () => {}
                                                        }
                                                    >
                                                        {t('button.btnCreate')}
                                                    </Button>
                                                    <Button
                                                        sx={{ mr: 1 }}
                                                        variant="contained"
                                                        disabled={!permission?.canEdit}
                                                        onClick={
                                                            permission?.canEdit ? () => toggleEditModal(true) : () => {}
                                                        }
                                                    >
                                                        {t('button.btnEdit')}
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
                        <Card sx={{ width: '100%' }} className="progress-drawer" style={{ maxHeight: 1300 }}>
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
                                    <div className="item-header text-uppercase">{t('awb.AWBNo')}</div>
                                    <div className="content text-center text-uppercase particletext">
                                        {currentAwbCode}
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="text-center item">
                                    <div className="item-header text-uppercase">{t('awb.commercialInvoice')}</div>
                                    <div
                                        className="content pt-3"
                                        style={{
                                            height: 230,
                                            overflowX: 'auto',
                                            display: 'inline-block',
                                            width: '100%',
                                        }}
                                    >
                                        <PermissionContext.Provider value={permission ? permission : {}}>
                                            <ShowCustomsClearanceInvoice
                                                isLoading={isLoadingCCD}
                                                customsDeclaration={customsDeclarationDocumentState}
                                                callBackFn={handleRemoveFile}
                                            />
                                        </PermissionContext.Provider>
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="text-center item">
                                    <div className="item-header text-uppercase">{t('awb.packingList')}</div>
                                    <div
                                        className="content pt-3"
                                        style={{
                                            height: 230,
                                            overflowX: 'auto',
                                            display: 'inline-block',
                                            width: '100%',
                                        }}
                                    >
                                        <PermissionContext.Provider value={permission ? permission : {}}>
                                            <ShowCustomsClearancePackingList
                                                isLoading={isLoadingCCD}
                                                customsDeclaration={customsDeclarationDocumentState}
                                                callBackFn={handleRemoveFile}
                                            />
                                        </PermissionContext.Provider>
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="text-center item">
                                    <div className="item-header text-uppercase">{t('awb.imageBefore')}</div>
                                    <div
                                        className="content pt-3"
                                        style={{
                                            height: 230,
                                            overflowX: 'auto',
                                            display: 'inline-block',
                                            width: '100%',
                                        }}
                                    >
                                        <PermissionContext.Provider value={permission ? permission : {}}>
                                            <ShowCustomsClearanceImageBefore
                                                isLoading={isLoadingCCD}
                                                customsDeclaration={customsDeclarationDocumentState}
                                                callBackFn={handleRemoveFile}
                                            />
                                        </PermissionContext.Provider>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} className="text-center item">
                                    <div className="item-header text-uppercase">{t('awb.action')}</div>
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
                                                disabled={
                                                    !customsClearanceDocumentRedux ||
                                                    customsClearanceDocumentRedux.length <= 0
                                                }
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
                            <Grid item xs={12} className="position-relative">
                                <div>
                                    <Card w-full="true" className="">
                                        <TabPanel value={customsClearanceTab} index={0}>
                                            <CardContent>
                                                <Box>
                                                    {
                                                        <PermissionContext.Provider
                                                            value={permission ? permission : {}}
                                                        >
                                                            <CommercialInvoiceContext.Provider
                                                                value={commercialInvoiceState}
                                                            >
                                                                <FileManagement
                                                                    isLoading={isLoading}
                                                                    awbCode={currentAwbId}
                                                                    callBackFn={handleUploadInvoice}
                                                                    callBackAddFile={handleAddFile}
                                                                    callBackAddComment={handleAddFileComment}
                                                                />
                                                            </CommercialInvoiceContext.Provider>
                                                        </PermissionContext.Provider>
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
                                                        <PermissionContext.Provider
                                                            value={permission ? permission : {}}
                                                        >
                                                            <PackingListContext.Provider value={packingListState}>
                                                                <FileManagement
                                                                    isLoading={isLoading}
                                                                    callBackAddFile={handleAddFile}
                                                                    callBackFn={handleUploadPackingList}
                                                                    callBackAddComment={handleAddFileComment}
                                                                />
                                                            </PackingListContext.Provider>
                                                        </PermissionContext.Provider>
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
                                                        <PermissionContext.Provider
                                                            value={permission ? permission : {}}
                                                        >
                                                            <ImageBeforeContext.Provider value={imageBeforeState}>
                                                                <ImageManagement
                                                                    isLoading={isLoading}
                                                                    callBackFn={handleUploadImageBefore}
                                                                    callBackAddComment={handleAddImageComment}
                                                                    isImageBefore={true}
                                                                    callBackAddFile={handleAddFile}
                                                                />
                                                            </ImageBeforeContext.Provider>
                                                        </PermissionContext.Provider>
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
                                                        <PermissionContext.Provider
                                                            value={permission ? permission : {}}
                                                        >
                                                            <ImageAfterContext.Provider value={imageAfterState}>
                                                                <ImageManagement
                                                                    isLoading={isLoading}
                                                                    callBackFn={handleUploadImageAfter}
                                                                    callBackAddComment={handleAddImageComment}
                                                                    isImageBefore={false}
                                                                />
                                                            </ImageAfterContext.Provider>
                                                        </PermissionContext.Provider>
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
            {permission?.canEdit &&
                (isOpenCreateModal ? (
                    <CreateAwb
                        isOpen={isOpenCreateModal}
                        toggleOpen={toggleCreateModal}
                        handleCreateNewAwb={handleCreateAwb}
                        projectId={projectId}
                    />
                ) : (
                    <AwbDataContext.Provider value={currentAwbData}>
                        <EditAwb
                            isOpen={isOpenEditModal}
                            toggleOpen={toggleEditModal}
                            handleCreateNewAwb={handleEditAwb}
                            projectId={projectId}
                        />
                    </AwbDataContext.Provider>
                ))}

            <ApiAlert response={resForHandleMsg} />
        </div>
    );
}
