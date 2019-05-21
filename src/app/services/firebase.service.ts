import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private http: Http) {}
  storeData(data: any[]) {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://coris-12cef.firebaseio.com/data.json',
      data,
      {headers: headers});
  }

  getData() {
    return this.http.get('https://coris-12cef.firebaseio.com/data.json')
      .pipe (
        map(
          (response: Response) => {
            const data = response.json();
            for (const el of data) {
              el.name = '[FETCHED] - ' + el.name;
            }
            return data;
          }
        ),
        catchError(
          (error: Response) => {
            return Observable.throw('An error has occurred');
          }
        )
      );
  }

  // getAppName() {
  //   return this.http.get('https://coris-12cef.firebaseio.com/appName.json')
  //     .pipe (
  //       map(
  //         (response: Response) => {
  //           return response.json();
  //         }
  //       )
  //     );
  // }

}
