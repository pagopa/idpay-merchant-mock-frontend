import { Box, Button, Paper, Typography } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/hooks/useErrorDispatcher';
import useLoading from '@pagopa/selfcare-common-frontend/hooks/useLoading';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { StatusEnum } from '../../api/generated/payment-qr-code/SyncTrxStatus';
import { TransactionCreationRequest } from '../../api/generated/payment-qr-code/TransactionCreationRequest';
import { TransactionResponse } from '../../api/generated/payment-qr-code/TransactionResponse';
import {
  confirmPaymentQRCode,
  createTransaction,
  getStatusTransaction,
} from '../../services/PaymentQrCodeApiService';
import { ENV } from '../../utils/env';
import MerchantDataForm from './components/MerchantDataForm';
import TransactionDataForm from './components/TransactionDataForm';

const initialState = {
  amountCents: 0,
  idTrxIssuer: new Date().getTime().toString(),
  initiativeId: ENV.PAYMENTS.QRCODE.DEFAULT_INITIATIVE_ID,
  mcc: '6012',
  merchantFiscalCode: 'MERCHANT_FISCAL_CODE',
  trxDate: new Date(),
  vat: 'VAT',
};
const QrCode = () => {
  const [formData, setFormData] = useState<TransactionCreationRequest>(initialState);
  const [idMerchant, setIdMerchant] = useState<string>('MERCHANTID');
  const [createTrxResponse, setCreateTrxResponse] = useState<TransactionResponse>();
  const [statusTrx, setStatusTrx] = useState<StatusEnum>();
  const [intervalPolling, setIntervalPolling] = useState<NodeJS.Timer>();
  const [trxTimeStamp, setTrxTimestamp] = useState<Date | undefined>();
  const addError = useErrorDispatcher();
  const setLoading = useLoading('POST_CREATE_TRANSACTION');

  useEffect(() => {
    if (createTrxResponse && createTrxResponse.id) {
      clearInterval(intervalPolling);

      setIntervalPolling(
        setInterval(() => {
          getStatusTransaction(idMerchant, createTrxResponse.id)
            .then((res) => {
              setStatusTrx(res.status);

              setTrxTimestamp(new Date());
            })
            .catch((error) => {
              addError({
                id: 'GET_STATUS_TRANSACTION_ERROR',
                blocking: false,
                error,
                techDescription: 'An error occurred geting the transaction status',
                displayableTitle: 'Si è verificato un errore',
                displayableDescription:
                  'Qualcosa e andato male durante il recupero dello stato della transazione',
                toNotify: true,
                component: 'Toast',
                showCloseIcon: true,
              });
            });
        }, 1000)
      );
    }
  }, [createTrxResponse]);

  useEffect(() => {
    if (
      statusTrx === StatusEnum.AUTHORIZED ||
      statusTrx === StatusEnum.REWARDED ||
      statusTrx === StatusEnum.REJECTED
    ) {
      clearInterval(intervalPolling);
    }
  }, [statusTrx]);

  const handleFormChange = (e: any) => {
    const name = e.target.name;

    const value = e.target.value;

    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (_event?: any) => {
    postCreateTransaction();
  };

  const handleReset = () => {
    setFormData(initialState);

    setIdMerchant('MERCHANTID');

    setCreateTrxResponse(undefined);

    setStatusTrx(undefined);

    setTrxTimestamp(undefined);

    clearInterval(intervalPolling);
  };

  const postCreateTransaction = () => {
    setStatusTrx(undefined);

    setCreateTrxResponse(undefined);

    setLoading(true);

    createTransaction(idMerchant, {
      ...formData,
      trxDate: new Date(formData.trxDate),
    })
      .then((res) => setCreateTrxResponse(res))
      .catch((error) => {
        addError({
          id: 'POST_CREATE_TRANSACTION_ERROR',
          blocking: false,
          error,
          techDescription: 'An error occurred creating the transaction',
          displayableTitle: 'Si è verificato un errore',
          displayableDescription: 'Qualcosa e andato storto durante la creazione della transazione',
          toNotify: true,
          component: 'Toast',
          showCloseIcon: true,
        });
      })
      .finally(() => setLoading(false));
  };

  const putConfirmPaymentQRCode = () => {
    setLoading(true);

    if (createTrxResponse && createTrxResponse.id) {
      confirmPaymentQRCode(idMerchant, createTrxResponse.id)
        .then((res) => {
          setStatusTrx(res.status);
          setTrxTimestamp(new Date());
        })
        .catch((error) => {
          addError({
            id: 'PUT_CONFIRM_TRANSACTION_ERROR',
            blocking: false,
            error,
            techDescription: 'An error occurred confirming the transaction',
            displayableTitle: 'Si è verificato un errore',
            displayableDescription: 'Qualcosa e andato storto durante la conferma del pagamento',
            toNotify: true,
            component: 'Toast',
            showCloseIcon: true,
          });
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gap: 1,
          px: 2,
          maxWidth: '1280px',
          mt: 0,
          ml: 'auto',
          mr: 'auto',
        }}
      >
        <TitleBox
          title="Mock portale esercente"
          subTitle="Pagamento mediante QRCode"
          mbTitle={2}
          mtTitle={2}
          mbSubTitle={5}
          variantTitle="h4"
          variantSubTitle="body1"
          data-testid="title"
        />
        <MerchantDataForm
          formData={formData}
          handlechange={handleFormChange}
          idMerchant={idMerchant}
          setIdMerchant={setIdMerchant}
        />
        <TransactionDataForm formData={formData} handleChange={handleFormChange} />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 2,
          maxWidth: '1280px',
          mt: 1,
          mr: 'auto',
          ml: 'auto',
        }}
      >
        <Box sx={{ gridColumn: 'span 8' }} />
        <Button sx={{ gridColumn: 'span 2' }} onClick={handleReset}>
          Ripristina
        </Button>
        <Button
          sx={{ gridColumn: 'span 2', width: 'max-content' }}
          disabled={
            !idMerchant ||
            !formData.merchantFiscalCode ||
            !formData.vat ||
            !formData.initiativeId ||
            !formData.idTrxIssuer ||
            !formData.mcc ||
            !formData.trxDate ||
            !formData.amountCents ||
            formData.amountCents <= 0
          }
          type="submit"
          variant="contained"
          onClick={handleSubmit}
        >
          Crea transazione
        </Button>
      </Box>

      {createTrxResponse && createTrxResponse.trxCode ? (
        <Paper
          sx={{
            display: 'grid',
            padding: '16px',
            my: 2,
            gridTemplateColumns: 'repeat(12, 1fr)',
            maxWidth: '1280px',
            ml: 'auto',
            mr: 'auto',
          }}
        >
          <Box
            sx={{ gridColumn: 'span 6', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}
          >
            <Box sx={{ gridColumn: ' span 6' }}>
              <QRCodeSVG value={createTrxResponse?.trxCode} size={150} />
            </Box>
            <Box>
              <Typography variant="h6">{'Codice transazione'}</Typography>
              <Typography variant="body1">{createTrxResponse?.trxCode}</Typography>
            </Box>
          </Box>
          {statusTrx ? (
            <Box
              sx={{ gridColumn: 'span 6', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}
            >
              <Typography variant="h6" sx={{ gridColumn: 'span 12', mb: 2 }}>
                {'Stato transazione'}
              </Typography>
              <Box sx={{ gridColumn: 'span 5' }}>
                <Typography variant="body1">{'Timestamp'}</Typography>
                {trxTimeStamp?.toLocaleString()}
              </Box>
              <Box sx={{ gridColumn: 'span 4' }}>
                <Typography variant="body1">{'Stato'}</Typography>
                {statusTrx}
              </Box>
              <Box
                sx={{
                  gridColumn: 'span 3',
                }}
              >
                <Button
                  disabled={statusTrx !== StatusEnum.AUTHORIZED}
                  type="submit"
                  variant="contained"
                  onClick={putConfirmPaymentQRCode}
                >
                  Conferma
                </Button>
              </Box>
            </Box>
          ) : null}
        </Paper>
      ) : null}
    </>
  );
};

export default QrCode;
