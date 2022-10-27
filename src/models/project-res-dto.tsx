export interface ProjectResDTO {
    id: number;
    prjName: string;
    title: string;
    description: string;
    prjType: string;
    isImportant: string;
    isConsider: string;
    notiFlag: string;
    isPay: string;
    status: string;
    rating: string;
    comment: string;
}

export interface ProjectProgressDTO {
    id: string;
    projectId: string;
    title: string;
    images: string[];
    startDate: string;
    endDate: string;
    status: string;
    report: string;
    note: string;
}

export interface ProjectTypeDTO {
    id: number;
    name: string;
    description: string;
}
