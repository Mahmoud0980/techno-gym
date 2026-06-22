import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/lib/api/authApi";
import { playerSubscriptionsApi } from "@/lib/api/playerSubscriptionsApi";
import { subscriptionPlansApi } from "@/lib/api/subscriptionPlansApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [playerSubscriptionsApi.reducerPath]: playerSubscriptionsApi.reducer,
    [subscriptionPlansApi.reducerPath]: subscriptionPlansApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      playerSubscriptionsApi.middleware,
      subscriptionPlansApi.middleware,
    ),
});
