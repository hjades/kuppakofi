declare module '@paypal/react-paypal-js';

interface Money {
  currency_code: string;
  value: string;
}

namespace Balance {
  export interface Detail {
    currency: string;
    primary?: boolean;
    total_balance: Money;
    avalaible_balance?: Money;
    withheld_balance?: Money;
  }

  export interface ListAllResponse extends Body {
    json(): Promise<{
      balances: Detail[];
    }>;
  }
}
