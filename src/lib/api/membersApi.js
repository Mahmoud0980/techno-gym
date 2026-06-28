import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthHeader } from "@/lib/authStorage";

export const membersApi = createApi({
  reducerPath: "membersApi",
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
  tagTypes: ["Members"],
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => "members",
      providesTags: ["Members"],
    }),
    createPlayer: builder.mutation({
      query: (body) => ({
        url: "players",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Members"],
    }),
    updatePlayer: builder.mutation({
      query: ({ id, body }) => ({
        url: `players/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Members"],
    }),
  }),
});

export const {
  useGetMembersQuery,
  useCreatePlayerMutation,
  useUpdatePlayerMutation,
} = membersApi;
