export interface PageInfo {
    NextButton: boolean;
    PreviousButton: boolean;
    Pages: number[];
    CurrentPage: number;
    TotalPages: number;
}

export class ExtendedPageInfo {
    ApiPageInfo: PageInfo;
    PageSize: number = 8;
    ApiPageSize: number = 30;
    ApiLastPageSize: number;

    public constructor(init?:Partial<ExtendedPageInfo>) {
        Object.assign(this, init);
    }
}

export interface ListViewModel<T> {
    Data: T[];
    PageInfo: PageInfo;
}