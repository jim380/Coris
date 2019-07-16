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
    // return this.httpClient.get(`${appApi}/validators`);
    return this.httpClient.get(`https://libration.xyz/api/validators`);
  }
}
