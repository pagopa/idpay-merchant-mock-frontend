import * as env from 'env-var';

const PUBLIC_URL_INNER: string | undefined = env.get('PUBLIC_URL').asString() || '/mocks/merchant';
export const ENV = {
  ENV: env.get('REACT_APP_ENV').required().asString(),
  PUBLIC_URL: PUBLIC_URL_INNER,

  URL_API: {
    PAYMENT: {
      QRCODE: env.get('REACT_APP_URL_API_PAYMENT_QR_CODE').required().asString(),
    },
  },

  API_TIMEOUT_MS: {
    PAYMENT: {
      QRCODE: env.get('REACT_APP_API_PAYMENT_QR_CODE_TIMEOUT_MS').required().asInt(),
    },
  },

  PAYMENTS: {
    QRCODE: {
      DEFAULT_INITIATIVE_ID: env
        .get('REACT_APP_QRCODE_DEFAULT_INITIATIVE_ID')
        .required()
        .asString(),
    },
  },
};
