import { CheckBox } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import { Button, ButtonGroup, Card, CardContent, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FileManagement from '../../shared-components/awb-management/file-management';
import ImageManagement from '../../shared-components/awb-management/image-management';
import QuiltedImage from '../../shared-components/images-manager/quilted-image';
import TabPanel from '../../shared-components/tab-manager/tab-panel';
import Chip from '@mui/material/Chip';
import './awb.scss';
import { getAirWayBillList, getAwbStatus } from '../../services/awb-service';
import CreateAwb from './awb-create';
import { formatDateTimeRes, formatDateTimeResList } from '../../core/utils/get-current-datetime';
import '../../App.scss';
import { useParams } from 'react-router-dom';

const initAwb = {
    projectId: 0,
    awbList: [
        {
            awbId: 0,
            name: 'Air ALM LM 119',
            description: 'Description',
            createDate: new Date().toISOString(),
            createBy: 'admin',
            status: {
                id: 0,
                status: 'In progress',
            },
            commercialInvoice: [
                {
                    postId: 0,
                    description: 'commercialInvoice',
                    files: [
                        {
                            id: 55,
                            name: 'vat-tu.pdf',
                            file: 'data:application/pdf;base64',
                            isActive: false,
                        },
                        {
                            id: 66,
                            name: 'du-an.xls',
                            file: 'data:application/vnd.ms-excel;base64',
                            isActive: true,
                        },
                    ],
                    isOpenComment: false,
                    comment: [
                        {
                            id: '',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: '',
                            },
                            comment: '',
                            dateTime: '',
                            isLastSub: false,
                            subComment: {},
                        },
                    ],
                    postUser: {
                        id: '0',
                        name: 'Đông Tà',
                    },
                },
                {
                    postId: 1,
                    description: 'commercialInvoice',
                    files: [
                        {
                            id: 55,
                            name: 'vat-tu.pdf',
                            file: 'data:application/pdf;base64',
                            isActive: false,
                        },
                        {
                            id: 66,
                            name: 'du-an.xls',
                            file: 'data:application/vnd.ms-excel;base64',
                            isActive: true,
                        },
                    ],
                    isOpenComment: false,
                    comment: [
                        {
                            id: '',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: '',
                            },
                            comment: '',
                            dateTime: '',
                            isLastSub: false,
                            subComment: {},
                        },
                    ],
                    postUser: {
                        id: '0',
                        name: 'Đông Tà',
                    },
                },
                {
                    postId: 2,
                    description: 'commercialInvoice',
                    files: [
                        {
                            id: 55,
                            name: 'vat-tu.pdf',
                            file: 'data:application/pdf;base64',
                            isActive: false,
                        },
                        {
                            id: 66,
                            name: 'du-an.xls',
                            file: 'data:application/vnd.ms-excel;base64',
                            isActive: true,
                        },
                    ],
                    isOpenComment: false,
                    comment: [
                        {
                            id: '',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: '',
                            },
                            comment: '',
                            dateTime: '',
                            isLastSub: false,
                            subComment: {},
                        },
                    ],
                    postUser: {
                        id: '0',
                        name: 'Đông Tà',
                    },
                },
            ],
            packingList: [
                {
                    postId: 1,
                    description: 'packingList',
                    files: [],
                    isOpenComment: false,
                    comment: [
                        {
                            id: '',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: '',
                            },
                            comment: '',
                            dateTime: '',
                            isLastSub: false,
                            subComment: {},
                        },
                    ],
                    postUser: {
                        id: '0',
                        name: 'Đông Tà',
                    },
                },
            ],
            imageBefore: [
                {
                    postId: 2,
                    description: 'imageBefore',
                    images: [],
                    isOpenComment: false,
                    comment: [
                        {
                            id: '',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: '',
                            },
                            comment: '',
                            dateTime: '',
                            isLastSub: false,
                            subComment: {},
                        },
                    ],
                    postUser: {
                        id: '0',
                        name: 'Đông Tà',
                    },
                },
            ],
            imageAfter: [
                {
                    postId: 3,
                    description: 'imageAfter',
                    images: [],
                    isOpenComment: false,
                    comment: [
                        {
                            id: '',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: '',
                            },
                            comment: '',
                            dateTime: '',
                            isLastSub: false,
                            subComment: {},
                        },
                    ],
                    postUser: {
                        id: '0',
                        name: 'Đông Tà',
                    },
                },
            ],
        },
        {
            awbId: 1,
            name: 'Air ALM LM 205',
            description: 'Description',
            createDate: new Date().toISOString(),
            createBy: 'admin',
            status: {
                id: 0,
                status: 'In progress',
            },
            commercialInvoice: [
                {
                    postId: 4,
                    description: 'commercialInvoice1',
                    files: [],
                    isOpenComment: false,
                    comment: [
                        {
                            id: '',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: '',
                            },
                            comment: '',
                            dateTime: '',
                            isLastSub: false,
                            subComment: {},
                        },
                    ],
                    postUser: {
                        id: '0',
                        name: 'Đông Tà',
                    },
                },
            ],
            packingList: [
                {
                    postId: 5,
                    description: 'packingList1',
                    files: [],
                    isOpenComment: false,
                    comment: [
                        {
                            id: '',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: '',
                            },
                            comment: '',
                            dateTime: '',
                            isLastSub: false,
                            subComment: {},
                        },
                    ],
                    postUser: {
                        id: '0',
                        name: 'Đông Tà',
                    },
                },
            ],
            imageBefore: [
                {
                    postId: 6,
                    description: 'imageBefore1',
                    images: [],
                    isOpenComment: false,
                    comment: [
                        {
                            id: '',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: '',
                            },
                            comment: '',
                            dateTime: '',
                            isLastSub: false,
                            subComment: {},
                        },
                    ],
                    postUser: {
                        id: '0',
                        name: 'Đông Tà',
                    },
                },
            ],
            imageAfter: [
                {
                    postId: 7,
                    description: 'imageAfter1',
                    images: [],
                    isOpenComment: false,
                    comment: [
                        {
                            id: '',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: '',
                            },
                            comment: '',
                            dateTime: '',
                            isLastSub: false,
                            subComment: {},
                        },
                    ],
                    postUser: {
                        id: '0',
                        name: 'Đông Tà',
                    },
                },
            ],
        },
    ],
};

const initialCustomsDeclaration = {
    awbId: 'Air ALM LM 119',
    commercialInvoice: [
        {
            id: 66,
            name: 'du-an.xls',
            file: 'data:application/vnd.ms-excel;base64',
            isActive: true,
        },
        {
            id: 66,
            name: 'du-an.xls',
            file: 'data:application/vnd.ms-excel;base64',
            isActive: true,
        },
        {
            id: 66,
            name: 'du-an.xls',
            file: 'data:application/vnd.ms-excel;base64',
            isActive: true,
        },
        {
            id: 66,
            name: 'du-an.xls',
            file: 'data:application/vnd.ms-excel;base64',
            isActive: true,
        },
    ],
    packingList: [],
    status: {
        id: 0,
        status: 'In progress',
    },
};

export default function AirWayBillList() {
    const { t } = useTranslation();
    const [awbListData, setEwbListData] = useState<any>([]);
    const [pdfState, setPdfState] = useState<any>(initAwb.awbList[0].commercialInvoice);
    const [imageState, setImageState] = useState<any>(initAwb.awbList[0].imageBefore);
    const [currentAwb, setCurrentAwb] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [value, setValue] = useState(0);
    const [customsDeclaration, setCustomsDeclaration] = useState(initialCustomsDeclaration);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const toggleCreateModal = (value: boolean) => setIsOpenCreateModal(value);
    const [projectId, setProjectId] = useState('');
    const params = useParams();

    useEffect(() => {
        if (params.id) setProjectId(params.id);
    }, [params.id]);

    const fetchData = () => {
        if (params.id)
            getAirWayBillList(params.id).then((value: any) => {
                if (value && value.data && value.data.length > 0) setEwbListData(value.data);
            });
    };

    useEffect(() => {
        fetchData();
    }, [params.id]);

    const handleChangeAwb = (newValue: number) => {
        setCurrentAwb(newValue);
        if (value === 0) setPdfState(awbListData.awbList[newValue].commercialInvoice);
        if (value === 1) setPdfState(awbListData.awbList[newValue].packingList);
        if (value === 2) setImageState(awbListData.awbList[newValue].imageBefore);
        if (value === 3) setImageState(awbListData.awbList[newValue].imageAfter);
    };

    const handleSearch = () => {
        const filterItems = initAwb.awbList.filter((data: any) => {
            if (data.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1) {
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
        if (newValue === 0) setPdfState(awbListData.awbList[currentAwb].commercialInvoice);
        if (newValue === 1) setPdfState(awbListData.awbList[currentAwb].packingList);
        if (newValue === 2) setImageState(awbListData.awbList[currentAwb].imageBefore);
        if (newValue === 3) setImageState(awbListData.awbList[currentAwb].imageAfter);
    };

    const handleDownload = () => {};

    const handleDeleteAwb = () => {};

    const handleCreateAwb = () => {
        fetchData();
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
                                    alert('Do something...');
                                }}
                            >
                                {t('awb.createConstruction')}
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={12} lg={6} xl={6} sx={{ mt: 1, mb: 1 }} className="search-awb">
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
                                        Air Way Bill
                                    </Typography>
                                </Grid>
                                <CardContent className="m-auto">
                                    <Box
                                        // component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1 },
                                        }}
                                        // noValidate
                                        // autoComplete="off"
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
                                                        height: 200,
                                                        '& .css-jpln7h-MuiTabs-scroller': {
                                                            overflow: 'auto !important',
                                                        },
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
                                                                onClick={() => handleChangeAwb(index)}
                                                            >
                                                                <Tab
                                                                    key={index}
                                                                    label={awb.code}
                                                                    className="awb-tab"
                                                                    onFocus={() => handleChangeAwb(index)}
                                                                    style={{ width: '25%' }}
                                                                />
                                                                <div
                                                                    className="float-end pt-2 m-auto"
                                                                    style={{ width: '20%' }}
                                                                    onClick={() => handleChangeAwb(index)}
                                                                >
                                                                    <Chip
                                                                        label={awb.status}
                                                                        color="secondary"
                                                                        size="small"
                                                                        className="btn"
                                                                    />
                                                                </div>
                                                                <div className="float-end" style={{ width: '35%' }}>
                                                                    <Tab
                                                                        key={index}
                                                                        label={formatDateTimeResList(awb.createDate)}
                                                                        className="awb-tab"
                                                                        onFocus={() => handleChangeAwb(index)}
                                                                    />
                                                                </div>
                                                                <div className="float-end" style={{ width: '20%' }}>
                                                                    <Tab
                                                                        key={index}
                                                                        label={awb.createBy}
                                                                        className="awb-tab"
                                                                        onFocus={() => handleChangeAwb(index)}
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
                        <Card sx={{ width: '100%' }} className="progress-drawer" style={{ maxHeight: 600 }}>
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
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('awb.AWBNo')}</div>
                                    <div className="content text-center">
                                        {customsDeclaration.awbId} - {customsDeclaration.status.status}
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('awb.commercialInvoice')}</div>
                                    <div
                                        className="content"
                                        style={{
                                            height: 180,
                                            overflowX: 'auto',
                                            display: 'inline-block',
                                            width: '100%',
                                        }}
                                    >
                                        <QuiltedImage
                                            images={customsDeclaration.commercialInvoice}
                                            callBackFn={(index: number) => {
                                                console.log(index);
                                            }}
                                            isOpenModal={false}
                                            isFile={true}
                                            isFilePreview={true}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('awb.packingList')}</div>
                                </Grid>
                                <Grid item xs={12} sm={12} className="text-center" sx={{ mt: 3, mb: 3 }}>
                                    <ButtonGroup
                                        disableElevation
                                        variant="contained"
                                        aria-label="Disabled elevation buttons"
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
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12} lg={6} xl={6} sx={{ mt: 1, mb: 1 }} className="content-awb">
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
                                <div className="w-100">
                                    <Card w-full="true" className="w-100">
                                        <TabPanel value={value} index={0}>
                                            <CardContent>
                                                <Box>
                                                    <FileManagement data={pdfState} />
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
                                                    <FileManagement data={pdfState} />
                                                </Box>
                                            </CardContent>
                                        </TabPanel>
                                    </Card>
                                </div>
                                <div>
                                    <Card w-full="true" className="content-item ">
                                        <TabPanel value={value} index={2}>
                                            <CardContent>
                                                <Box>
                                                    <ImageManagement data={imageState} />
                                                </Box>
                                            </CardContent>
                                        </TabPanel>
                                    </Card>
                                </div>
                                <div>
                                    <Card w-full="true" className="content-item">
                                        <TabPanel value={value} index={3}>
                                            <CardContent>
                                                <Box>
                                                    <ImageManagement data={imageState} />
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
        </div>
    );
}
