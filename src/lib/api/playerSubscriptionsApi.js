import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthHeader } from "@/lib/authStorage";

export const playerSubscriptionsApi = createApi({
  reducerPath: "playerSubscriptionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/backend",
    prepareHeaders: (headers) => {
      const authHeader = getAuthHeader();

      if (authHeader) {
        headers.set("Authorization", authHeader);
      }

      return headers;
    },
  }),
  tagTypes: ["PlayerSubscriptions"],
  endpoints: (builder) => ({
    getPlayerSubscriptions: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            searchParams.set(key, String(value));
          }
        });

        const queryString = searchParams.toString();
        return `player-subscriptions${queryString ? `?${queryString}` : ""}`;
      },
      providesTags: ["PlayerSubscriptions"],
    }),
    getPlayerSubscription: builder.query({
      query: (id) => `player-subscriptions/${id}`,
      providesTags: (result, error, id) => [{ type: "PlayerSubscriptions", id }],
    }),
  }),
});

export const {
  useGetPlayerSubscriptionQuery,
  useGetPlayerSubscriptionsQuery,
} = playerSubscriptionsApi;
