import { ENV } from './utils/env';

export const BASE_ROUTE = ENV.PUBLIC_URL;

const ROUTES = {
  HOME: `${BASE_ROUTE}`,
  PAYMENT_QR_CODE: `${BASE_ROUTE}/payment/qr-code`,
};

export default ROUTES;
