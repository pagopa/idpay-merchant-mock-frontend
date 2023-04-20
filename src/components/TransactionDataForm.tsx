import { Box, Paper, TextField, Typography } from '@mui/material';
import { TransactionCreationRequest } from '../api/generated/payment-qr-code/TransactionCreationRequest';
interface MerchantProps {
  formData: TransactionCreationRequest;
  handleChange: (e: any) => void;
}
const TransactionDataForm = ({ formData, handleChange }: MerchantProps) => (
    <Paper sx={{ padding: '16px', my: 2 }} data-testid="content">
      <Box component="form" autoComplete="off">
        <Typography variant="h6" sx={{ gridColumn: 'span 12', mb: 2 }}>
          {'Dati Transazione'}
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2, pb: 4 }}>
          <TextField
            id="idTrxIssuer"
            name="idTrxIssuer"
            placeholder="Id transazione"
            sx={{ gridColumn: 'span 4' }}
            label="Id transazione"
            value={formData.idTrxIssuer}
            onChange={(e) => {
              handleChange(e);
            }}
          ></TextField>

          <TextField
            name="amountCents"
            placeholder="Importo (cents)"
            sx={{ gridColumn: 'span 4' }}
            label="Importo (cents)"
            type="number"
            value={formData.amountCents}
            onChange={(e) => handleChange(e)}
          ></TextField>

          <TextField
            name="mcc"
            placeholder="MCC"
            sx={{ gridColumn: 'span 4' }}
            label="MCC"
            value={formData.mcc}
            onChange={(e) => handleChange(e)}
          ></TextField>

          <TextField
            id="trxDate"
            sx={{ gridColumn: 'span 4' }}
            label="Data e ora"
            name="trxDate"
            type="datetime-local"
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
