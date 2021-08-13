import axios from 'axios'
import {all,fork,takeLatest,takeEvery ,put, delay,call} from 'redux-saga/effects'; 
import 
    {
        INDEX_PAGE_DATA_1001_REQUEST,
        INDEX_PAGE_DATA_1001_SUCCESS,
        INDEX_PAGE_DATA_1001_FAILURE,    

        INDEX_PAGE_DATA_1002_REQUEST,
        INDEX_PAGE_DATA_1002_SUCCESS,
        INDEX_PAGE_DATA_1002_FAILURE, 

        INDEX_PAGE_DATA_1003_REQUEST,
        INDEX_PAGE_DATA_1003_SUCCESS,
        INDEX_PAGE_DATA_1003_FAILURE, 

        INDEX_PAGE_DATA_1004_REQUEST,
        INDEX_PAGE_DATA_1004_SUCCESS,
        INDEX_PAGE_DATA_1004_FAILURE,
        
        INDEX_PAGE_DATA_1005_REQUEST,
        INDEX_PAGE_DATA_1005_SUCCESS,
        INDEX_PAGE_DATA_1005_FAILURE, 

        INDEX_PAGE_DATA_1006_REQUEST,
        INDEX_PAGE_DATA_1006_SUCCESS,
        INDEX_PAGE_DATA_1006_FAILURE, 

    }
 from '../reducers/indexPage'; 

 
//mainPost_1001 리스트 
//-----------------------------------------------------------------------------------
function APIIndexPageData1001List(data){
    return axios.post('/indexPage/data1001',{data},{withCredentials:true})
}

function* sagaIndexPageData1001List(action){

    try{
      const result = yield call(APIIndexPageData1001List,action.data); 

      yield  put({
            type:INDEX_PAGE_DATA_1001_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        //alert('error', e); 
        yield put({
            type:INDEX_PAGE_DATA_1001_FAILURE, 
            error: e, 
        }); 
    }
}

function* watchIndexPageData1001(){
    yield takeLatest(INDEX_PAGE_DATA_1001_REQUEST,sagaIndexPageData1001List); 
}
//-----------------------------------------------------------------------------------


//mainPost_1002 리스트 
//-----------------------------------------------------------------------------------
function APIIndexPageData1002List(data){
    return axios.post('/indexPage/data1002',{data},{withCredentials:true})
}

function* sagaIndexPageData1002List(action){

    try{
      const result = yield call(APIIndexPageData1002List,action.data); 

      yield  put({
            type:INDEX_PAGE_DATA_1002_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        //alert('error', e); 
        yield put({
            type:INDEX_PAGE_DATA_1002_FAILURE, 
            error: e, 
        }); 
    }
}

function* watchIndexPageData1002(){
    yield takeLatest(INDEX_PAGE_DATA_1002_REQUEST,sagaIndexPageData1002List); 
}
//-----------------------------------------------------------------------------------


//mainPost_1003 리스트 
//-----------------------------------------------------------------------------------
function APIIndexPageData1003List(data){
    return axios.post('/indexPage/data1003',{data},{withCredentials:true})
}

function* sagaIndexPageData1003List(action){

    try{
      const result = yield call(APIIndexPageData1003List,action.data); 

      yield  put({
            type:INDEX_PAGE_DATA_1003_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        //alert('error', e); 
        yield put({
            type:INDEX_PAGE_DATA_1003_FAILURE, 
            error: e, 
        }); 
    }
}

function* watchIndexPageData1003(){
    yield takeLatest(INDEX_PAGE_DATA_1003_REQUEST,sagaIndexPageData1003List); 
}
//-----------------------------------------------------------------------------------


//mainPost_1004 리스트 
//-----------------------------------------------------------------------------------
function APIIndexPageData1004List(data){
    return axios.post('/indexPage/data1004',{data},{withCredentials:true})
}

function* sagaIndexPageData1004List(action){

    try{
      const result = yield call(APIIndexPageData1004List,action.data); 

      yield  put({
            type:INDEX_PAGE_DATA_1004_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        //alert('error', e); 
        yield put({
            type:INDEX_PAGE_DATA_1004_FAILURE, 
            error: e, 
        }); 
    }
}

function* watchIndexPageData1004(){
    yield takeLatest(INDEX_PAGE_DATA_1004_REQUEST,sagaIndexPageData1004List); 
}
//-----------------------------------------------------------------------------------

//mainPost_1005 리스트 
//-----------------------------------------------------------------------------------
function APIIndexPageData1005List(data){
    return axios.post('/indexPage/data1005',{data},{withCredentials:true})
}

function* sagaIndexPageData1005List(action){

    try{
      const result = yield call(APIIndexPageData1005List,action.data); 

      yield  put({
            type:INDEX_PAGE_DATA_1005_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        //alert('error', e); 
        yield put({
            type:INDEX_PAGE_DATA_1005_FAILURE, 
            error: e, 
        }); 
    }
}

function* watchIndexPageData1005(){
    yield takeLatest(INDEX_PAGE_DATA_1005_REQUEST,sagaIndexPageData1005List); 
}
//-----------------------------------------------------------------------------------


//mainPost_1006 리스트 
//-----------------------------------------------------------------------------------
function APIIndexPageData1006List(data){
    return axios.post('/indexPage/data1006',{data},{withCredentials:true})
}

function* sagaIndexPageData1006List(action){

    try{
      const result = yield call(APIIndexPageData1006List,action.data); 

      yield  put({
            type:INDEX_PAGE_DATA_1006_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        //alert('error', e); 
        yield put({
            type:INDEX_PAGE_DATA_1006_FAILURE, 
            error: e, 
        }); 
    }
}

function* watchIndexPageData1006(){
    yield takeLatest(INDEX_PAGE_DATA_1006_REQUEST,sagaIndexPageData1006List); 
}
//-----------------------------------------------------------------------------------








export default function* indexPageSaga(){

    yield all([
        fork(watchIndexPageData1001), 
        fork(watchIndexPageData1002), 
        fork(watchIndexPageData1003), 
        fork(watchIndexPageData1004), 
        fork(watchIndexPageData1005), 
        fork(watchIndexPageData1006), 
     ])
}