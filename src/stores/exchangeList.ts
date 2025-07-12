import type { TCurrency } from "~/types/exchange";
import { useExchangePair } from "#imports";
type TExchangeList = {
  allCurrencyList: TCurrency[] | null;
  giveAwayList: TCurrency[] | null;
  receiveList: TCurrency[] | null;
};

const initialState: TExchangeList = {
  allCurrencyList: null,
  giveAwayList: null,
  receiveList: null,
};

export const useExchangeList = defineStore("exchange-list", {
  state: () => ({ ...initialState }),
  getters: {
    filteredGiveAwayList(state) {
      const exchangePairStore = useExchangePair();
      const search = exchangePairStore.giveAwaySearch.toLowerCase().trim();
      if (!state.giveAwayList) return [];
      if (!search) return state.giveAwayList;

      return state.giveAwayList.filter((currency) => {

        if (currency.name.toLowerCase().includes(search)) {
          return true;
        }

        if (currency.keywords) {
          return currency.keywords.some((keyword) =>
            keyword.toLowerCase().includes(search)
          );
        }
        return false;
      });
    },
    filteredReceiveList(state) {
      const exchangePairStore = useExchangePair();
      const search = exchangePairStore.receiveSearch.toLowerCase().trim();
      if (!state.receiveList) return [];
      if (!search) return state.receiveList;

      return state.receiveList.filter((currency) => {

        if (currency.name.toLowerCase().includes(search)) {
          return true;
        }

        if (currency.keywords) {
          return currency.keywords.some((keyword) =>
            keyword.toLowerCase().includes(search)
          );
        }
        return false;
      });
    },
  },
  actions: {
    setAllCurrencyList(data: TCurrency[]) {
      this.allCurrencyList = data;
    },
    setgiveAwayList(ids: [string]) {
      if (!this.allCurrencyList) {
        this.giveAwayList = null;
        return;
      }
      const idsNum = ids.map((id) => Number(id));
      this.giveAwayList = this.allCurrencyList.filter((currency) =>
        currency.ids.some((id) => idsNum.includes(id))
      );
    },
    setReceiveList(ids: [string]){
      if (!this.allCurrencyList) {
        this.receiveList = null;
        return;
      }
      const idsNum = ids.map((id) => Number(id));
      this.receiveList = this.allCurrencyList.filter((currency) =>
        currency.ids.some((id) => idsNum.includes(id))
      );
    }
  },
});
