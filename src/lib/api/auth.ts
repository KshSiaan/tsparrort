import { howl } from "../utils"

// >>>>>>>>>>>>>> AUTH >>>>>>>>>>>>>>>>>>

export const loginApi = async (body: { email: string, password: string }) => {
  return howl("/login", { method: "POST", body })
}

export const registerApi = async (body: {     full_name: string;
    email: string;
    phone_number: string | undefined;
    password: string;
    password_confirmation: string; }) => {
  return howl("/register", { method: "POST", body })
}

export const verifyOtpApi = async (body: { otp: string }) => {
  return howl("/verify-otp", { method: "POST", body })
}

export const forgotPasswordApi = async (body: { email: string }) => {
  return howl("/forgot-password", { method: "POST", body})
}
export const resetPasswordApi = async (body: { password: string; password_confirmation: string }, token: string) => {
  return howl("/change-password", { method: "POST", body, token })
}

export const changePasswordApi = async (body: { newPassword: string; confirmNewPassword: string; oldPassword: string }, token: string) => {
  return howl("/change-password", { method: "POST", body, token })
}

export const getProfileApi = async (token: string) => {
  return howl("/get-profile", { method: "GET", token })
}