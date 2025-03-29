import userSlice from '@kp/redux/slices/userSlice';
import {combineReducers} from '@reduxjs/toolkit';
import {usersApi} from '../service/users';
import {ngnApi} from '../service/ngn';
import {transactionApi} from '../service/transaction';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store';
import {us} from '../service/us';

const rootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  [ngnApi.reducerPath]: ngnApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [us.reducerPath]: us.reducer,
  user: userSlice,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
