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

namespace Plan {
  export interface BillingCycle {
    pricing_scheme: {
      fixed_price: Money;
      pricing_model: 'VOLUME' | 'TIERED';
      tiers: Array<{
        starting_quantity: number;
        ending_quantity: number;
        amount: number;
      }>;
    };
    frequency: {
      interval_unit: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
      interval_count: number;
    };
    tenure_type: 'REGULAR' | 'TRIAL';
    sequence: number;
    total_cycles: number;
  }

  export interface PaymentPreference {
    auto_bill_outstanding: boolean;
    setup_fee: Money;
    setup_fee_failure_action: 'CONTINUE' | 'CANCEL';
    payment_failure_threshold: number;
    quantity_supported: boolean;
  }

  export interface Plan {
    id: string;
    product_id: string;
    name: string;
    status: 'CREATED' | 'INACTIVE' | 'ACTIVE';
    desription: string;
    billing_cycles: BillingCycle[];
    payment_preferences: PaymentPreference[];
  }

  export interface ListPlansResponse {
    plans: Plan[];
    total_items: number;
    total_pages: number;
  }
}
