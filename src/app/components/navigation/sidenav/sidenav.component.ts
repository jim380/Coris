import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  // appName = this.serverService.getAppName();
  entries = [
    {
      name: 'Amy',
      gender: 'female',
      id: this.generateId()
    },
    {
      name: 'Bob',
      gender: 'male',
      id: this.generateId()
    }
  ];

  constructor(private firbaseService: FirebaseService) { }

  ngOnInit() {
  }

  onAddServer(name: string) {
    this.entries.push({
      name: name,
      gender: 'male',
      id: this.generateId()
    });
  }

  onSave() {
    this.firbaseService.storeData(this.entries)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  onGet() {
    this.firbaseService.getData()
      .subscribe(
        (entries: any[]) => this.entries = entries,
        (error) => console.log(error)
      );
  }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
  
}
