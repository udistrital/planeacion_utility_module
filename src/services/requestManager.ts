import { BehaviorSubject, catchError, from, map, mergeMap, of} from "rxjs";
import axios, { AxiosResponse } from "axios";

export class RequestManager {
    private headerSubject = new BehaviorSubject({});
    public header$ = this.headerSubject.asObservable();

    constructor() {
        this.updateHeaderToken();
    }

    updateHeaderToken() {
        const access_token = localStorage.getItem('access_token');

        if (access_token) {
            const headers = {
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            };
    
            this.headerSubject.next({ headers });
        }
    }

    /**
    * Perform a GET http request
    *
    * @param path service's path from environment end-point
    * @param endpoint service's end-point
    * @param params (an Key, Value object with que query params for the request)
    * @returns Observable<any>
    */

    get(path, endpoint) {
        return this.header$.pipe(
            mergeMap(header => {
                return from(axios.get<any>(`${path}${endpoint}`, { headers: header.headers })).pipe(
                    map((response: AxiosResponse<any>) => {
                        return response.data
                    }),
                    catchError(error => of({ error: error.message }))
                )
            })
        )
    }

    /**
    * Perform a POST http request
    * 
    * @param path service's path from environment end-point
    * @param endpoint service's end-point
    * @param element data to send as JSON
    * @returns Observable<any>
    */

    post(path, endpoint, element){
        return this.header$.pipe(
            mergeMap(header => {
                return from(axios.post<any>(`${path}${endpoint}`, element, header)).pipe(
                    catchError(error => of({ error: error.message }))
                )
            })
        )
    }

    /**
    * Perform a PUT http request
    *
    * @param path service's path from environment end-point
    * @param endpoint service's end-point
    * @param element data to send as JSON, With the id to UPDATE
    * @returns Observable<any>
    */

    put(path, endpoint, element, id){
        return this.header$.pipe(
            mergeMap(header => {
                return from(axios.put<any>(`${path}${endpoint}/${id}`, element, header)).pipe(
                    catchError(error => of({ error: error.message }))
                )
            })
        )
    }

    /**
    * Perform a DELETE http request
    *
    * @param path service's path from environment end-point
    * @param endpoint service's end-point
    * @param id element's id for remove
    * @returns Observable<any>
    */

    delete(path, endpoint, id){
        return this.header$.pipe(
            mergeMap(header => {
                return from(axios.delete<any>(`${path}${endpoint}/${id}`, header)).pipe(
                    catchError(error => of({ error: error.message })) 
                )
            })
        )
    }
};
