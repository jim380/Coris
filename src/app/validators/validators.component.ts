import { Component, OnInit } from '@angular/core';
import { Validator } from './validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.css']
})
export class ValidatorsComponent implements OnInit {
  validators = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://aakatev.me/iris/status').subscribe(data => {
      // Debugging
      // let currValidators = data['result'].genesis.validators;
      let lastBlock = data['result'].sync_info.latest_block_height;

      this.http.get(`https://aakatev.me/iris/validators?height=${lastBlock}`).subscribe(data => {
        let currValidators = data['result'].validators;

        currValidators.forEach(validator => {
          let newValidator = {
            address: validator.address, 
            moniker: validator.name,
            power: validator.voting_power,
          };
          this.validators.push(newValidator);
        });
      });
    });
  }
}
