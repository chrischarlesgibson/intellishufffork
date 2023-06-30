import { Injectable } from "@nestjs/common";

@Injectable()
export class HelperService {
/**
 *
 */
    constructor() {
   
    }

    checkEmptyParams(params: any): boolean {
        for (const prop in params) {
          if (params.hasOwnProperty(prop) && params[prop] === '') {
            return true; // If any parameter is empty, return true
          }
        }
        return false; // If all parameters have non-empty values, return false
    } 
}