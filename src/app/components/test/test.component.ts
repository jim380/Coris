// Component to test services
// @aakatev 05/13/19 
// TODO delete component
import { Component, OnInit} from '@angular/core';
import { Observable, range, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { BlocksService } from 'src/app/services/blocks.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {

  constructor(
  ) { }
  

  ngOnInit() {
    // this.bs.fetch20Blocks().subscribe((blocks: any) => {
    //   console.log(blocks);
    // })


    // this.store.select('App').subscribe((data: any) => {
    //   console.log(data);
    // });


    // this.store.select('Blocks').subscribe((state: State) => {
    //   console.log(state.blocks);
    // });


  }

  // ngOnDestroy() {
  //   if(this.storeSubscription$) {
  //     this.storeSubscription$.unsubscribe();
  //   }
  // }
  

  // getBlockTimesArray(blocks, array) {
  //   let blocksCounter$ = range( 0, (blocks.length-1) );
    
  //   blocksCounter$.subscribe((count: number) => {
  //     console.log(count);
  //     array[count] = ( 
  //       Date.parse(blocks[count].block.header.time) 
  //       - Date.parse(blocks[count+1].block.header.time) 
  //     );
  //   });
  // }

  // getArrayAverage(array: number[]) {
  //   let total = 0;
  //   array.forEach((element:number) => {
  //     total += element;
  //   });
  //   return total/array.length
  // }
}
