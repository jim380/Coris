import { Injectable } from '@angular/core';
import { appApi } from '../../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  fetchValidators$() {
    return this.httpClient.get(`${appApi}/validators`);
  }
}
