import axios from 'axios'
import {all,fork,takeLatest,takeEvery ,put, delay,call} from 'redux-saga/effects'; 
import 
    {
        INDEX_PAGE_DATA01_REQUEST,
        INDEX_PAGE_DATA01_SUCCESS,
        INDEX_PAGE_DATA01_FAILURE,    

    }
 from '../reducers/indexPage'; 

 
//mainPost_1001 리스트 
//-----------------------------------------------------------------------------------
function APIIndexPageData01List(data){
    return axios.post('/indexPage/data01',{data},{withCredentials:true})
}

function* sagaIndexPageData01List(action){

    try{
      const result = yield call(APIIndexPageData01List,action.data);  
        console.log('result=>',result);
      yield  put({
            type:INDEX_PAGE_DATA01_SUCCESS, 
            data:result.data,
        });

    }catch(e){

        console.error(e); 
        //alert('error', e); 
        yield put({
            type:INDEX_PAGE_DATA01_FAILURE, 
            error: e, 
        }); 
    }
}

function* watchIndexPageData01(){
    yield takeLatest(INDEX_PAGE_DATA01_REQUEST,sagaIndexPageData01List); 
}
//-----------------------------------------------------------------------------------


export default function* indexPageSaga(){

    yield all([
        fork(watchIndexPageData01), 
     ])
}