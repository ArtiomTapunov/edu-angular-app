import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class PaginationService {
    getPager(totalPages: number, users: number[], currentPage: number = 1, pageSize: number = 10) {

        let startPage: number, endPage: number;
        
        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage+2;
            }
        }

        // create an array of pages to ng-repeat in the pager control
        let pages = users;

        // return object with all pager properties required by the view
        return {
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            pages: pages
        };
    }
}