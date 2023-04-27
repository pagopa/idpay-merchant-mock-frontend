import { Box, Paper, TextField, Typography } from '@mui/material';
import { TransactionCreationRequest } from '../../../api/generated/payment-qr-code/TransactionCreationRequest';
interface MerchantProps {
  formData: TransactionCreationRequest;
  handleChange: (e: any) => void;
}
const TransactionDataForm = ({ formData, handleChange }: MerchantProps) => (
  <Paper sx={{ padding: '16px', my: 2 }}>
    <Box component="form" autoComplete="off">
      <Typography variant="h6" sx={{ gridColumn: 'span 12', mb: 2 }}>
        {'Dati Transazione'}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, pb: 2 }}>
        <TextField
          id="idTrxIssuer"
          name="idTrxIssuer"
          placeholder="Id transazione"
          sx={{ gridColumn: 'span 4' }}
          label="Id transazione"
          value={formData.idTrxIssuer}
          required
          error={!formData.idTrxIssuer}
          onChange={handleChange}
        ></TextField>

        <TextField
          name="amountCents"
          placeholder="Importo (cents)"
          sx={{ gridColumn: 'span 4' }}
          label="Importo (cents)"
          type="number"
          value={formData.amountCents}
          required
          error={!formData.amountCents || formData.amountCents <= 0}
          onChange={handleChange}
        ></TextField>

        <TextField
          name="mcc"
          placeholder="MCC"
          sx={{ gridColumn: 'span 4' }}
          label="MCC"
          value={formData.mcc}
          required
          error={!formData.mcc}
          onChange={handleChange}
        ></TextField>

        <TextField
          id="trxDate"
          sx={{ gridColumn: 'span 4' }}
          label="Data e ora"
          name="trxDate"
          type="datetime-local"
          required
          error={!formData.trxDate}
          value={
            formData.trxDate.toISOString
              ? `${formData.trxDate
                  .toISOString()
                  .substring(0, 10)}T${formData.trxDate.toLocaleTimeString()}`
              : formData.trxDate
          }
          onChange={(e) => handleChange(e)}
          size="small"
        />
      </Box>
    </Box>
  </Paper>
);
export default TransactionDataForm;
