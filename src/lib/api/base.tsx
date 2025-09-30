//>>>>>>>>>>>>>> FEEDBACK <<<<<<<<<<<<<<<<<<

import { howl } from "../utils";

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
