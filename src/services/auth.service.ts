// packages
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interfaces
import { CommonResponse, TokenData } from "@interfaces/index";

// models
import { UserModel } from "@models/user.model";

// config
import { VITE_API_BASE_URL, VITE_API_PORT } from "@config/index";

const baseUrl = `${VITE_API_BASE_URL}:${VITE_API_PORT}/api/v1/user`;

export const authApis = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    userLogin: builder.mutation<
      CommonResponse<TokenData>,
      { userData: UserModel }
    >({
      query: (userData) => ({
        url: "/login",
        body: userData,
        method: "POST",
      }),
    }),
  }),
});

export const { useUserLoginMutation } = authApis;
