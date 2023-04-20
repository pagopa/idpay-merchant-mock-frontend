import { PaymentQrCodeApi } from '../api/PaymentQrCodeApiClient';
import { SyncTrxStatus } from '../api/generated/payment-qr-code/SyncTrxStatus';
import { TransactionCreationRequest } from '../api/generated/payment-qr-code/TransactionCreationRequest';
import { TransactionResponse } from '../api/generated/payment-qr-code/TransactionResponse';

export const createTransaction = (
  merchantId: string,
  trx: TransactionCreationRequest
): Promise<TransactionResponse> =>
  PaymentQrCodeApi.createTransaction(merchantId, trx).then((res) => res);


  export const getTransaction = (
    merchantId: string,
    transactionId: string
  ): Promise<SyncTrxStatus> =>
    PaymentQrCodeApi.getTransaction(merchantId, transactionId).then((res) => res);
