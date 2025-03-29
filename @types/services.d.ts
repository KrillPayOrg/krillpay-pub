interface NGNBankList {
  banks: [
    {
      bankCode: string;
      bankName: string;
    },
  ];
}

interface GetAccount {
  bank_code: string;
  account_number: string;
}

interface NgnExternalTransfer {
  bankCode: string;
  beneficiaryAccountTitle: string;
  beneficiaryAccountNumber: string;
  narration: string;
  amount: number;
}
interface NgnInternalTransfer {
  beneficiaryWalletId: string;
  sourceWalletId: string;
  narration: string;
  amount: string;
}

interface NgnCharge {
  amount: string;
  nubanNumber: string;
}

interface BookTransferCharge {
  asset: string;
  beneficiaryWalletId: string;
  sourceWalletId: string;
  amount: string;
}

interface ExchangeMoney {
  side: string;
  amount: string;
  accountType: string;
}

interface USBookTransfer {
  asset: string;
  beneficiaryWalletId: string;
  sourceWalletId: string;
  amount: string;
}
