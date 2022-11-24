import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileStorages {
    fileId: number;
    content: string;
    createDate: string;
    data: string;
    isChoosen: false;
    name: string;
    progressId: number;
    type: string;
}

interface CommercialInvoice {
    invoiceId: number;
    comment: string;
    createBy: string;
    createDate: string;
    description: string;
    fileStorages: Array<FileStorages>;
    postType: string;
    updateBy: string;
    updateDate: string;
}

interface PackingList {
    packageId: number;
    createBy: string;
    createDate: string;
    description: string;
    fileStorages: Array<FileStorages>;
    postType: string;
    updateBy: string;
    updateDate: string;
}

interface InvoiceDoc {
    content: string;
    fileId: number;
    name: string;
    postInvoiceId: number;
    postType: string;
    type: string;
}

interface PackagesDoc {
    content: string;
    fileId: number;
    name: string;
    postPackageId: number;
    postType: string;
    type: string;
}

interface CustomsClearanceDocument {
    invoiceDoc: Array<InvoiceDoc>;
    packagesDoc: Array<PackagesDoc>;
}

interface AirWayBill {
    id: number;
    code: string;
    createBy: string;
    note: string;
    status: string;
    updateBy: string;
    updateDate: string;
}

interface ImageBefore {
    evidenceBeforeId: number;
    comment: string;
    createBy: string;
    createDate: string;
    description: string;
    fileStorages: Array<FileStorages>;
    updateBy: string;
    updateDate: string;
}

interface ImageAfter {
    evidenceAfterId: number;
    comment: string;
    createBy: string;
    createDate: string;
    description: string;
    fileStorages: Array<FileStorages>;
    updateBy: string;
    updateDate: string;
}

interface CustomsClearance {
    airWayBillList: Array<AirWayBill>;
    commercialInvoice: Array<CommercialInvoice>;
    packingList: Array<PackingList>;
    imageBefore: Array<ImageBefore>;
    imageAfter: Array<ImageAfter>;
    customsClearanceDocument: CustomsClearanceDocument;
}

const initialState: CustomsClearance = {
    airWayBillList: [
        {
            id: -1,
            code: '',
            createBy: '',
            note: '',
            status: '',
            updateBy: '',
            updateDate: '',
        },
    ],
    commercialInvoice: [
        {
            invoiceId: -1,
            comment: '',
            createBy: '',
            createDate: '',
            description: '',
            fileStorages: [
                {
                    fileId: -1,
                    content: '',
                    createDate: '',
                    data: '',
                    isChoosen: false,
                    name: '',
                    progressId: -1,
                    type: '',
                },
            ],
            postType: '',
            updateBy: '',
            updateDate: '',
        },
    ],
    packingList: [
        {
            packageId: -1,
            createBy: '',
            createDate: '',
            description: '',
            fileStorages: [
                {
                    fileId: -1,
                    content: '',
                    createDate: '',
                    data: '',
                    isChoosen: false,
                    name: '',
                    progressId: -1,
                    type: '',
                },
            ],
            postType: '',
            updateBy: '',
            updateDate: '',
        },
    ],
    imageBefore: [
        {
            evidenceBeforeId: -1,
            comment: '',
            createBy: '',
            createDate: '',
            description: '',
            fileStorages: [
                {
                    fileId: -1,
                    content: '',
                    createDate: '',
                    data: '',
                    isChoosen: false,
                    name: '',
                    progressId: -1,
                    type: '',
                },
            ],
            updateBy: '',
            updateDate: '',
        },
    ],
    imageAfter: [
        {
            evidenceAfterId: -1,
            comment: '',
            createBy: '',
            createDate: '',
            description: '',
            fileStorages: [
                {
                    fileId: -1,
                    content: '',
                    createDate: '',
                    data: '',
                    isChoosen: false,
                    name: '',
                    progressId: -1,
                    type: '',
                },
            ],
            updateBy: '',
            updateDate: '',
        },
    ],
    customsClearanceDocument: {
        invoiceDoc: [
            {
                content: '',
                fileId: -1,
                name: '',
                postInvoiceId: -1,
                postType: '',
                type: '',
            },
        ],
        packagesDoc: [
            {
                content: '',
                fileId: -1,
                name: '',
                postPackageId: -1,
                postType: '',
                type: '',
            },
        ],
    },
};

export const customsClearanceSlice = createSlice({
    name: 'customsClearance',
    initialState,
    reducers: {
        setAirWayBillList(state, action: PayloadAction<Array<AirWayBill>>) {
            state.airWayBillList = action.payload;
        },
        setCommercialInvoice(state, action: PayloadAction<Array<CommercialInvoice>>) {
            state.commercialInvoice = action.payload;
        },
        setPackingList(state, action: PayloadAction<Array<PackingList>>) {
            state.packingList = action.payload;
        },
        setImageBefore(state, action: PayloadAction<Array<ImageBefore>>) {
            state.imageBefore = action.payload;
        },
        setImageAfter(state, action: PayloadAction<Array<ImageAfter>>) {
            state.imageAfter = action.payload;
        },
        setCustomsClearanceDocument(state, action: PayloadAction<CustomsClearanceDocument>) {
            state.customsClearanceDocument = action.payload;
        },
    },
});

export const customsClearanceActions = customsClearanceSlice.actions;

export const getAirWayBillList = (state: any) => state.customsClearance.airWayBillList;

export const getCommercialInvoice = (state: any) => state.customsClearance.commercialInvoice;

export const getPackingList = (state: any) => state.customsClearance.packingList;

export const getImageBefore = (state: any) => state.customsClearance.imageBefore;

export const getImageAfter = (state: any) => state.customsClearance.imageAfter;

export const getCustomsClearanceDocument = (state: any) => state.customsClearance.customsClearanceDocument;

export default customsClearanceSlice.reducer;
