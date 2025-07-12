import type { TCurrency, TCurrencyPair } from "~/types/exchange"

type TExchangePair = {
  giveAway: TCurrency | null
  receive: TCurrency | null
  exhangePair: TCurrencyPair | null
  giveAwaySearch: string
  receiveSearch: string
}

const initialState:TExchangePair = {
  giveAway: null,
  receive: null,
  exhangePair: null,
  giveAwaySearch: '',
  receiveSearch: ''
}

export const useExchangePair = defineStore('exchange-pair-store', {
  state: () => ({...initialState}),
  getters:{
    getExhangePair(state){
      return state.exhangePair
    }
  },
  actions:{
    handleGiveAwaySearch(value:string){
      this.giveAwaySearch = value
    },
    handleReceiveSearch(value:string){
      this.receiveSearch = value
    },
    setGiveAway(value: TCurrency | null){
      this.giveAway = value
    },
    setReceive(value: TCurrency | null){
      this.receive = value
    },
    setExhangePair(value: TCurrencyPair | null){
      this.exhangePair = value
    }
  }

})