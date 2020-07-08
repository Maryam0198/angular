import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  URL: string = "api/Data";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<Data[]> {
    // return of(List);
    return this.httpClient.get<Data[]>(this.URL)
      .pipe(
        catchError(this.errorMessage<Data[]>([])
        )
      );
  }

  public addUser(data: Data[]): Observable<Data[]> {
    return this.httpClient.post<Data[]>(`${this.URL}`, data, this.httpOptions)
      .pipe(
        catchError(this.errorMessage<Data[]>([])
        )
      );
  }

  public updateUser(data: Data): Observable<any> {
    return this.httpClient.put(this.URL, data, this.httpOptions).pipe(
      catchError(this.errorMessage<any>('updateUser'))
    );
  }

  public deleteUser(data: Data| number): Observable<Data> {
    const id = typeof data === 'number' ? data : data.id;
    const url = `${this.URL}/${id}`;
  
    return this.httpClient.delete<Data>(url, this.httpOptions).pipe(
      catchError(this.errorMessage<any>('deleteUser'))
    );
  }

  private errorMessage<T>(result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
