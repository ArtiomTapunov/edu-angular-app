export interface PageInfo {
    NextButton: boolean;
    PreviousButton: boolean;
    Pages: number[];
    CurrentPage: number;
    TotalPages: number;
}

export interface ListViewModel<T> {
    Data: T[];
    PageInfo: PageInfo;
}