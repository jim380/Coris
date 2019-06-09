import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block } from '../../interfaces/block.interface';
import { nodeRpc2 } from '../../../config.js';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, map, skipWhile } from "rxjs/operators";
import { State, BlocksState } from '../../state/app.interface';
import { rowsAnimation, expandableRow, staggerAnimation} from 'src/app/animations/animation';
import { MatTable, MatTableDataSource, MatPaginator } from '@angular/material';
import { BlocksService } from 'src/app/services/blocks.service';
import { selectAppState } from 'src/app/state/app.reducers';
import { AppState } from 'src/app/state/app.interface';
import { selectBlocksState, selectBlocks } from 'src/app/state/blocks/blocks.reducers';
import { PopupService } from 'src/app/services/popup.service';
import { BlockComponent } from '../popups/block/block.component';
import { ValidatorComponent } from '../popups/validator/validator.component';
// import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
  animations: [rowsAnimation, expandableRow, staggerAnimation]
})
export class BlocksComponent implements OnInit, AfterViewInit, OnDestroy {
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
    'timestamp'
    // 'details'
  ];
  
  // dataSource: MatTableDataSource<Block>;

  appState: Observable<AppState>;
  blocksState: Observable<BlocksState>;
  
  blocks: Block[];
  currentBlock = 0;
  startBlock = 0;
  blocksToDisplay = 20;
  blocks$ = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private appStore: Store <State>,
    private blocksService: BlocksService,
    private popupService: PopupService,
  ) { }

  ngOnInit() {
    this.appState = this.appStore.select(selectAppState);
    this.blocksState = this.appStore.select(selectBlocksState);

    this.blocks$ = this.appStore
      .select(selectBlocksState)
      .pipe( 
        map( (blocksState: BlocksState) => blocksState.blocks ),
        skipWhile( blocks => blocks.length === 0 )
      )
      .subscribe( blocks => { 
        if( this.currentBlock !== blocks[0].header.height) {
          if(!this.blocks) {
            this.startBlock = blocks[0].header.height;
            this.initBlocks();  
          } else if (this.blocks[0].height !== blocks[0].header.height) {
            this.addBlock( blocks[0].header.height );
          }
          // TODO remove debugging
          // console.log(data[0]);
          // console.log(this.currentBlock);
        }
      });
  }
  ngAfterViewInit() {
    this.setDataSourceAttributes();
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

  openBlockDialog(block) {
    this.popupService.openBlockDialog(block);
  }

  openValidatorDialog(addressHEX) {
    this.popupService.openValidatorDialogAddrHEX(addressHEX);
  }

}