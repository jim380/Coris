import { Injectable } from '@angular/core';
import { appApi } from '../../config.js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  fetchValidators$() {
    return this.httpClient.get("http://149.28.228.142:3000/api/validators");
    // return this.httpClient.get(`${appApi}/validators`);
  }
}
