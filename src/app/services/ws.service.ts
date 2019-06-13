import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { nodeWs } from '../../config.js';
import { 
  unsubAllMsg, 
  subRoundMsg, 
  subRoundStepMsg } from './ws.messages';
import { 
  UpdateConsensusState, 
  UpdateRoundState 
} from '../state/consensus/consensus.actions.js';
import { State } from '../state/index.js';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  newWebSocket = new WebSocket(nodeWs);

  constructor(
    private appStore: Store<State>
  ) { 
    this.newWebSocket.onopen = (event) => {
      this.subscribe();
    };

    this.newWebSocket.onmessage = (event) => {
      let json = JSON.parse(event.data);
      if (json.result &&  Object.keys(json.result).length !== 0) {
        if (json.result.data.type === 'tendermint/event/NewRound') {
          // TODO remove debugging
          // console.log(json.result.data.value);

          this.appStore.dispatch(new UpdateConsensusState({
            height: json.result.data.value.height,
            round: json.result.data.value.round,
            step: json.result.data.value.step,
            proposer: json.result.data.value.proposer.address
          }));
        } else if (json.result.data.type === 'tendermint/event/RoundState') {
          // TODO remove debugging
          // console.log(json.result.data.value);

          this.appStore.dispatch(new UpdateRoundState({
            height: json.result.data.value.height,
            round: json.result.data.value.round,
            step: json.result.data.value.step,
          }));
        }
      }
    };
  };

  subscribe() {
    this.newWebSocket.send(JSON.stringify(subRoundMsg));
    this.newWebSocket.send(JSON.stringify(subRoundStepMsg));
  };

  unsubscribe() {
    this.newWebSocket.send(JSON.stringify(unsubAllMsg));
  };
}