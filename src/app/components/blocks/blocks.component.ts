import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block } from '../../interfaces/block.interface';
import { nodeRpc2 } from '../../../config.js';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, map } from "rxjs/operators";
import { State } from 'src/app/interfaces/state.interface';
import { rowsAnimation, expandableRow, staggerAnimation} from 'src/app/animations/animation';
import { MatTable, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { BlockComponent } from '../block/block.component';
import { BlocksService } from 'src/app/services/blocks.service';
// import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
  animations: [rowsAnimation, expandableRow, staggerAnimation]
})
export class BlocksComponent implements OnInit, OnDestroy {
  private dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  private paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  currentPage = 1;
  lastPage = 1;

  updateDataSource() {
    this.dataSource = new MatTableDataSource<any>([...this.blocks]);
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    let lastPage = 1;
    if(this.blocks) {
      lastPage = Math.ceil(this.blocks[0].height/this.blocksToDisplay);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.nextPage = () => { this.displayOlderBlocks(); }
    this.dataSource.paginator.previousPage = () => { this.displayNewerBlocks(); }
    this.dataSource.paginator.hasNextPage = () => { return true; }
    this.dataSource.paginator.hasPreviousPage = () => { return true; }
    this.dataSource.paginator._intl.getRangeLabel = 
      (page: number, pageSize: number, length: number) => { 
        return `${this.currentPage} of ${lastPage}`;  
      }

    if (this.currentPage === 1) {
      this.dataSource.paginator.hasPreviousPage = () => { return false; }
    } else if(this.currentPage === lastPage ) {
      this.dataSource.paginator.hasNextPage = () => { return false; }
    }
  }

  displayedColumns: string[] = [
    'height', 
    'transactions', 
    'proposer',
    'timestamp',
    'details'
  ];
  
  // dataSource: MatTableDataSource<Block>;

  appState: Observable<State>;
  
  blocks: Block[];
  currentBlock = 0;
  startBlock = 0;
  blocksToDisplay = 20;
  blocks$;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store <State>,
    private dialog: MatDialog,
    private blocksService: BlocksService
  ) { }

  ngOnInit() {
    this.appState = this.store.select('App');
    this.blocks$ = this.appState.
      pipe(
        map(data => data.blocks),
        debounceTime(300)
      )
      .subscribe( data => { 
        if( data.length === 1 && this.currentBlock !== data[0].header.height) {
          if(!this.blocks) {
            this.startBlock = data[0].header.height;
            this.initBlocks();  
          } else if (this.blocks[0].height !== data[0].header.height) {
            this.addBlock(data[0].header.height);
          }
          // TODO remove debugging
          // console.log(data[0]);
          // console.log(this.currentBlock);
        }
      });
  }

  ngOnDestroy() {
    this.blocks$.unsubscribe();
  }

  initBlocks() {
    this.currentBlock = this.startBlock;
    this.fetchBlocks();
  }

  addBlock(height) {
    this.http.get(`${nodeRpc2}/blockchain?minHeight=${height}&maxHeight=${height}`)
      .subscribe(data => {
        // TODO remove debugging
        // console.log(data);
        data['result'].block_metas.forEach(block => {
          const datePipe = new DatePipe('en-US');
          const formattedTime = datePipe.transform(block.header.time, 'h:mm:ss a, MMM d, y');

          this.blocks.unshift({
            hash: block.block_id.hash, 
            height: block.header.height, 
            time: formattedTime,
            txs: block.header.num_txs,
            proposer: block.header.proposer_address
          });

          this.blocks.pop();
          this.updateDataSource();
          this.table.renderRows();
        });
        // TODO remove debugging
        // console.log(this.blocks);
      });
  }

  clearBlocks() {
    this.blocks = [];
  }

  fetchBlocks() {
    this.http.get(`${nodeRpc2}/blockchain?minHeight=${this.currentBlock-this.blocksToDisplay+1}&maxHeight=${this.currentBlock}`)
      .subscribe( (data:any) => {
        this.clearBlocks();
        data.result.block_metas.forEach(block => {
          const datePipe = new DatePipe('en-US');
          const formattedTime = datePipe.transform(block.header.time, 'h:mm:ss a, MMM d, y');
          this.blocks.push({
            hash: block.block_id.hash, 
            height: block.header.height, 
            time: formattedTime,
            txs: block.header.num_txs,
            proposer: block.header.proposer_address
          });
          this.updateDataSource();
        });
      });
  }

  displayOlderBlocks() {
    if(this.blocks$) {
      this.blocks$.unsubscribe();
    }
    if(this.currentBlock - this.blocksToDisplay > 20) {
      this.currentBlock -= this.blocksToDisplay;
    }
    this.fetchBlocks();
    this.currentPage +=1 ;
  }

  displayNewerBlocks() {
    if(this.currentBlock + this.blocksToDisplay == this.startBlock) {
      this.currentBlock += this.blocksToDisplay;
    } else if(this.currentBlock + this.blocksToDisplay < this.startBlock) {
      this.currentBlock += this.blocksToDisplay;
    }
    this.fetchBlocks();
    this.currentPage -=1 ;
  }

  queryBlock(blockHeight) {
    let block: Block;
    this.blocksService.fetchBlockAtAlternative(blockHeight).subscribe((data:any) => {
      // TODO remove debugging
      // console.log(data);
      const datePipe = new DatePipe('en-US');
      const formattedTime = datePipe.transform(data.block_meta.header.time, 'h:mm:ss a, MMM d, y');
      block = {
        hash: data.block_meta.block_id.hash, 
        height: data.block_meta.header.height, 
        time: formattedTime,
        txs: data.block_meta.header.num_txs,
        proposer: data.block_meta.header.proposer_address
      }   
    },
    (error) => {
    },
    () => {
      this.openBlockDialog(block);
    });
  }

  openBlockDialog(block) {
    this.dialog.open( BlockComponent,  {
      data: { 
        block
      },
      height: '80vh'
    });
  }
}