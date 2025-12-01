// app/api/createCheckoutSession/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { cartItems, customerName, customerEmail, customerPhone, customerAddress } = body;
    console.log("Cart items:", JSON.stringify(cartItems, null, 2));

    console.log("Request body:", body);

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum: number, item: { product: { price: number }; quantity: number }) =>
        sum + item.product.price * item.quantity,
      0
    );
    console.log("Total amount:", totalAmount);

    const SSL_COMMERZ_SANDBOX = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

    const store_id = process.env.SSLC_STORE_ID;
    const store_passwd = process.env.SSLC_STORE_PASSWORD;

    if (!store_id || !store_passwd) {
      console.error("SSLCommerz store credentials not configured in .env file");
      return NextResponse.json({ error: "SSLCommerz store credentials not configured" }, { status: 500 });
    }

    const payload = {
      store_id,
      store_passwd,
      total_amount: totalAmount,
      currency: "BDT",
      tran_id: `TRANS_${Date.now()}`,
      success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/success`,
      fail_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/`,
      cus_name: customerName,
      cus_email: customerEmail,
      cus_add1: customerAddress.address,
      cus_city: customerAddress.city,
      cus_state: customerAddress.state,
      cus_postcode: customerAddress.zip,
      cus_country: customerAddress.country,
      cus_phone: customerPhone,
      shipping_method: "NO",
      product_name: "Cart Items",
      product_category: "Ecommerce",
      product_profile: "general",
    };

    const res = await fetch(SSL_COMMERZ_SANDBOX, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload).toString(),
    });

    const data = await res.json();
    console.log("SSLCommerz response:", data);
    console.log("GatewayPageURL:", data.GatewayPageURL);

    if (!data.GatewayPageURL) {
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl: data.GatewayPageURL });
  } catch (error: any) {
    console.error("SSLCommerz error:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
