import { Box, Paper, TextField, Typography } from '@mui/material';
import { TransactionCreationRequest } from '../../../api/generated/payment-qr-code/TransactionCreationRequest';

interface MerchantProps {
  formData: TransactionCreationRequest;
  handlechange: (e: any) => void;
  idMerchant: string;
  setIdMerchant: (id: string) => void;
}

const MerchantDataForm = ({ formData, handlechange, idMerchant, setIdMerchant }: MerchantProps) => (
  <Paper sx={{ padding: '16px', my: 2, maxWidth: '1280px' }}>
    <Box component="form" autoComplete="off">
      <Typography variant="h6" sx={{ gridColumn: 'span 12', mb: 2 }}>
        {'Dati Esercente'}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, pb: 2 }}>
        <TextField
          sx={{ gridColumn: 'span 4' }}
          id="idMerchant"
          name="idMerchant"
          placeholder="id Esercente"
          label="id Esercente"
          value={idMerchant}
          required
          error={!idMerchant}
          onChange={(e) => {
            setIdMerchant(e.target.value);
          }}
        ></TextField>

        <TextField
          sx={{ gridColumn: 'span 4' }}
          id="merchantFiscalCode"
          name="merchantFiscalCode"
          placeholder="Codice fiscale esercente"
          label="Codice fiscale esercente"
          value={formData.merchantFiscalCode}
          required
          error={!formData.merchantFiscalCode}
          onChange={handlechange}
        ></TextField>

        <TextField
          sx={{ gridColumn: 'span 4' }}
          name="vat"
          placeholder="Partita IVA"
          label="Partita IVA"
          value={formData.vat}
          required
          error={!formData.vat}
          onChange={handlechange}
        ></TextField>

        <TextField
          sx={{ gridColumn: 'span 4' }}
          name="initiativeId"
          placeholder="Id iniziativa"
          label="Id iniziativa"
          value={formData.initiativeId}
          required
          error={!formData.initiativeId}
          onChange={handlechange}
        ></TextField>
      </Box>
    </Box>
  </Paper>
);
export default MerchantDataForm;
