import rootReducer from '@kp/redux/slices';
import {configureStore} from '@reduxjs/toolkit';

import {usersApi} from './service/users';
import {ngnApi} from './service/ngn';
import {transactionApi} from './service/transaction';
import {us} from './service/us';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      usersApi.middleware,
      ngnApi.middleware,
      transactionApi.middleware,
      us.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;

export {store};
