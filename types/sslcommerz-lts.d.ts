declare module "sslcommerz-lts" {
  interface PaymentData {
    total_amount: number;
    currency: string;
    tran_id: string;
    success_url: string;
    fail_url: string;
    cancel_url: string;
    ipn_url?: string;
    product_name: string;
    product_category?: string;
    product_profile?: string;
    cus_name: string;
    cus_email: string;
    cus_add1?: string;
    cus_city?: string;
    cus_country?: string;
    shipping_method?: string;
    multi_card_name?: string;
  }

  class SSLCommerzPayment {
    constructor(storeId: string, storePassword: string, isLive: boolean);
    init(data: PaymentData): Promise<{ GatewayPageURL?: string }>;
  }

  export = SSLCommerzPayment;
}
