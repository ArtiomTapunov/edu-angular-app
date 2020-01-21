export class PageInfo {
    NextButton: boolean;
    PreviousButton: boolean;
    Pages: number[];
    CurrentPage: number;
    TotalPages: number;

    public constructor(init?:Partial<PageInfo>) {
        Object.assign(this, init);
    }
}

export interface ListViewModel<T> {
    Data: T[];
    PageInfo: PageInfo;
}