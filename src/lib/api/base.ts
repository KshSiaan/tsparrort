//>>>>>>>>>>>>>> FEEDBACK <<<<<<<<<<<<<<<<<<

import { howl, idk } from "../utils";

export const createFeedbackApi = async ({
  body,
  token,
}: {
  body: { name: string; email: string; feedback: string };
  token: string;
}) => {
  return howl("/user/send-feedback", { method: "POST", body, token });
};

export const getFeedbacks = async ({ token }: { token: string }) => {
  return howl("/admin/get-feedbacks", { method: "GET", token });
};

export const checkoutApi = async ({
  token,
  body,
}: {
  token: string;
  body: {
    full_name: string;
    address: string;
    city: string;
    zip_code: string;
    country: string;
    // orders: { product_id?: string | number; unitQty?: string | number; pack_id?: number|string; }[];
    orders:idk
  };
}) => {
  return howl("/create-checkout", { method: "POST", token, body });
};

export const checkCheckoutStatusApi = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  return howl(`/payment-success?checkoutSessionId=${id}`, {
    method: "POST",
    token,
  });
};

export const getMyOrdersApi = async ({ token }: { token: string }) => {
  return howl("/user/get-my-orders", { method: "GET", token });
};

export const viewProductbyId = async ({ id}: {id:string }) => {
  return howl(`/view-product/${id}`, { method: "GET"});
};


