import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Block } from '../blocks/block';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-last-block',
  templateUrl: './last-block.component.html',
  styleUrls: ['./last-block.component.css']
})
export class LastBlockComponent implements OnInit {
  appState: Observable<{blocks: [], txs: []}>;

  constructor(private store: Store<{App: { blocks: [], txs: []} }>) { }

  ngOnInit() { 
    this.appState = this.store.select('App');
  }
}
