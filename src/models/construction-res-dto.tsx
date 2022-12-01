import { ImageToUpload } from './project-res-dto';

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
    construction: ConstructionResDTO;
    progress: {
        id?: string;
        projectId: string;
        title: string;
        fileStorages: ImageToUpload[];
        startDate: string;
        endDate: string;
        status: string;
        report: string;
        note: string;
    };
}

export interface ContructionProgressDTO {
    id?: string;
    constructionId: string;
    title: string;
    fileStorages: ImageToUpload[];
    startDate: string;
    endDate: string;
    status: string;
    report: string;
    note: string;
}

export interface ContructionProgressResDTO {
    id?: string;
    title: string;
    fileStorages: ImageToUpload[];
    startDate: string;
    endDate: string;
    status: string;
    report: string;
    note: string;
}