import { Box, Paper } from '@mui/material';
import { TitleBox } from '@pagopa/selfcare-common-frontend';

const Home = () => (
  <Box width="100%" px={2}>
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
    <Paper sx={{ padding: '16px' }} data-testid="content">
      TODO
    </Paper>
  </Box>
);

export default Home;
