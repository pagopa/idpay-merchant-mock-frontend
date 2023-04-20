import { Box, Button, Paper, Typography } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { TransactionCreationRequest } from '../../api/generated/payment-qr-code/TransactionCreationRequest';
import MerchantDataForm from '../../components/MerchantDataForm';
import TransactionDataForm from '../../components/TransactionDataForm';
import { createTransaction } from '../../services/PaymentQrCodeApiService';
import { TransactionResponse } from '../../api/generated/payment-qr-code/TransactionResponse';

const initiatlState = {
  amountCents: 0,
  idTrxIssuer: new Date().getTime().toString(),
  initiativeId: '63d26bbc0e71e44bb08de293',
  mcc: '6012',
  merchantFiscalCode: 'MERCHANT_FISCAL_CODE',
  trxDate: new Date(),
  vat: 'VAT',
};
const Home = () => {
  const [formData, setFormData] = useState<TransactionCreationRequest>(initiatlState);
  const [idMerchant, setIdMerchant] = useState<string>('MERCHANTID');
  const [createTrxResponse, setCreateTrxResponse] = useState<TransactionResponse>();


  const handleFormChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (_event?: any) => {
    console.log('formData handleSUbmit', formData);
    postCreateTransaction();
  };

  const handleReset = () => {
    setFormData(initiatlState);
  };

  const postCreateTransaction = () => {
    createTransaction(idMerchant, {
      ...formData,
      trxDate: new Date(formData.trxDate),
    })
      .then((res: any) => setCreateTrxResponse(res))
      .catch((err) => console.log('err', err));
  };

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          rowGap: 2,
          pb: 2,
          px: 2,
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
        <TransactionDataForm formData={formData} handleChange={(e) => handleFormChange(e)} />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12)',
          justifyContent: 'end',
          gap: 1,
          pb: 2,
          px: 2,
        }}
      >
        <Box sx={{ gridColumn: '8' }} />
        <Button sx={{ mr: '2' }} onClick={handleReset}>
          Ripristina
        </Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Crea transazione
        </Button>
      </Box>
      <Box
        sx={{
          display: 'grid',
          rowGap: 2,
          pb: 2,
          px: 2,
        }}
      >
        {createTrxResponse && createTrxResponse.trxCode ? (
          <Paper sx={{ padding: '16px', my: 2, display: 'grid' }} data-testid="content">
            <Typography variant="h6" sx={{ gridColumn: 'span 12', mb: 2, justifySelf: 'center' }}>
              {'Codice transazione'}
            </Typography>
            <Box sx={{ gridColumn: 'span 6', mb: 2, justifySelf: 'center' }}>
              <QRCodeSVG value={createTrxResponse?.trxCode} size={150} />
            </Box>
            <Typography variant="h6" sx={{ gridColumn: 'span 6', mb: 2, justifySelf: 'center' }}>
              {createTrxResponse?.trxCode}
            </Typography>
          </Paper>
        ) : null}
        <Paper sx={{ padding: '16px', my: 2 }} data-testid="content">
          TODO
        </Paper>
      </Box>
    </>
  );
};

export default Home;
