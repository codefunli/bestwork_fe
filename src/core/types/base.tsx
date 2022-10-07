export interface DataResSuccess<T> {
    code: string;
    message: string;
    data: T | null | undefined;
    status: 'ERROR' | 'OK';
}
export interface PageableDataRes<T> {
    content: T | null | undefined;
    metaData?: {
        pageable: {
            sort: {
                empty: boolean;
                sorted: boolean;
                unsorted: boolean;
            };
            offset: number;
            pageSize: number;
            pageNumber: number;
            unpaged: boolean;
            paged: boolean;
        };
        totalPages: number;
        totalElements: number;
        last: boolean;
        size: number;
        number: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        numberOfElements: number;
        first: boolean;
        empty: boolean;
    };
}
export type PageableDataResSuccess<T> = DataResSuccess<PageableDataRes<T>>;

export type sortParamsType = 'ASC' | 'DESC';
export interface SearchPagingSortParams {
    page?: number;
    size?: number;
    sortDirection?: sortParamsType | null;
    sortBy?: string | null;
    search?: string | null;
}
export interface PageableParamsReq {
    [key: string]: string | number | boolean | undefined | null;
}

export type HeadColumn = {
    id: string;
    disablePadding: boolean;
    label: string;
    numeric: boolean;
};
