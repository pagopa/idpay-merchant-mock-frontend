import { SyncTrxStatus } from '../api/generated/payment-qr-code/SyncTrxStatus';
import { TransactionCreationRequest } from '../api/generated/payment-qr-code/TransactionCreationRequest';
import { TransactionResponse } from '../api/generated/payment-qr-code/TransactionResponse';
import { PaymentQrCodeApi } from '../api/PaymentQrCodeApiClient';

export const createTransaction = (
  merchantId: string,
  trx: TransactionCreationRequest
): Promise<TransactionResponse> => PaymentQrCodeApi.createTransaction(merchantId, trx);

export const getTransaction = (merchantId: string, transactionId: string): Promise<SyncTrxStatus> =>
  PaymentQrCodeApi.getTransaction(merchantId, transactionId);

export const confirmPaymentQRCode = (
  merchantId: string,
  transactionId: string
): Promise<TransactionResponse> => PaymentQrCodeApi.confirmPaymentQRCode(merchantId, transactionId);
