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
    name: string;
    images: string[];
    startDate: string;
    endDate: string;
    status: number;
    report: string;
    note: string;
}
