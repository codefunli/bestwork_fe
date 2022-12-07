import { FileStorages } from '../core/redux/customs-clearance-slice';

export interface AWBCode {
    id: number;
    code: string;
    note: string;
    status: number;
}
export interface ConstructionResDTO {
    id: number;
    constructionName: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    status: string;
    awbCodes: AWBCode[];
}

export interface ProgressByConstrucionDTO {
    progress: Array<ContructionProgressResDTO>;
}

export interface ContructionProgressDTO {
    id?: number;
    constructionId: string;
    title: string;
    fileStorages: FileStorages[];
    startDate: string;
    endDate: string;
    status: string;
    report: string;
    note: string;
}

export interface ContructionProgressResDTO {
    id?: number;
    title: string;
    fileStorages: FileStorages[];
    startDate: string;
    endDate: string;
    status: string;
    report: string;
    note: string;
}
