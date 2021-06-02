
import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import { backUrl } from '../config/config';

import testSaga from './testSaga';

import mainPosts_1001Saga from './mainPosts_1001Saga';
import authSaga from './authSaga'; 



axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;


export default function* rootSaga() {
    yield all([ fork(testSaga), 
                fork(mainPosts_1001Saga), 
                fork(authSaga), 
    ]);
  }
