export type TCurrencyLogo = {
  withBackground: string;
  white: string;
  simple: string;
};

export type TCurrency = {
  ids: number[];
  name: string;
  logo: TCurrencyLogo;
  currency: string[];
  filter: string[];
  keywords: string[];
};


export type TCurrencyPairLeg = {
  notify: string | null
  min: number
  max: number
  round: number
  currency: string
  currencyCode: string
  decimalPrecision: number
  monitoringCode: string
}

export type TCurrencyOption = {
  id: number
  code: string
  isActive: boolean
}

export type TInputSendConfig = {
  header: string
  placeholder: string
  errorMessage: string
  isVisible: boolean
}

export type TInputConfig = {
  type: string
  name: string
  send: TInputSendConfig
  receive: TInputSendConfig
  validationRegex: string
}

export type TCurrencyPairStructure = {
  currencies: TCurrencyOption[]
  input: TInputConfig[]
}

export type TCurrencyPair = {
  exchangeRate: number
  course: number
  from: TCurrencyPairLeg
  to: TCurrencyPairLeg
  structure: {
    from: TCurrencyPairStructure
    to: TCurrencyPairStructure
  }
}
