import immerProduce from '../util/produce';

export const  initialState = {

    data01: [], 
    data02: [],
    data03: [], 
    data04: [],
    data05: [], 
    data06: [],

}

//1001 테이블
export const INDEX_PAGE_DATA_1001_REQUEST ='INDEX_PAGE_DATA_1001_REQUEST';
export const INDEX_PAGE_DATA_1001_SUCCESS ='INDEX_PAGE_DATA_1001_SUCCESS';
export const INDEX_PAGE_DATA_1001_FAILURE ='INDEX_PAGE_DATA_1001_FAILURE';

//1002 테이블
export const INDEX_PAGE_DATA_1002_REQUEST ='INDEX_PAGE_DATA_1002_REQUEST';
export const INDEX_PAGE_DATA_1002_SUCCESS ='INDEX_PAGE_DATA_1002_SUCCESS';
export const INDEX_PAGE_DATA_1002_FAILURE ='INDEX_PAGE_DATA_1002_FAILURE';

//1003 테이블
export const INDEX_PAGE_DATA_1003_REQUEST ='INDEX_PAGE_DATA_1003_REQUEST';
export const INDEX_PAGE_DATA_1003_SUCCESS ='INDEX_PAGE_DATA_1003_SUCCESS';
export const INDEX_PAGE_DATA_1003_FAILURE ='INDEX_PAGE_DATA_1003_FAILURE';

//1004 테이블
export const INDEX_PAGE_DATA_1004_REQUEST ='INDEX_PAGE_DATA_1004_REQUEST';
export const INDEX_PAGE_DATA_1004_SUCCESS ='INDEX_PAGE_DATA_1004_SUCCESS';
export const INDEX_PAGE_DATA_1004_FAILURE ='INDEX_PAGE_DATA_1004_FAILURE';

//1005 테이블
export const INDEX_PAGE_DATA_1005_REQUEST ='INDEX_PAGE_DATA_1005_REQUEST';
export const INDEX_PAGE_DATA_1005_SUCCESS ='INDEX_PAGE_DATA_1005_SUCCESS';
export const INDEX_PAGE_DATA_1005_FAILURE ='INDEX_PAGE_DATA_1005_FAILURE';

//1006 테이블
export const INDEX_PAGE_DATA_1006_REQUEST ='INDEX_PAGE_DATA_1006_REQUEST';
export const INDEX_PAGE_DATA_1006_SUCCESS ='INDEX_PAGE_DATA_1006_SUCCESS';
export const INDEX_PAGE_DATA_1006_FAILURE ='INDEX_PAGE_DATA_1006_FAILURE';


const reducer = (state = initialState, action) => immerProduce(state, (draft) => {

    switch(action.type){

//1001 테이블 데이터 리스트       
//----------------------------------------
        case INDEX_PAGE_DATA_1001_REQUEST: {
            break; 
        }

        case INDEX_PAGE_DATA_1001_SUCCESS: {
            draft.data01.length=0; 
            //배열 초기화
            action.data.forEach((v)=>{
                draft.data01.push(v); 
            }); 
            break; 
        }

        case INDEX_PAGE_DATA_1001_FAILURE: {
            break; 
        }
//----------------------------------------


//1002 테이블 데이터 리스트       
//----------------------------------------
        case INDEX_PAGE_DATA_1002_REQUEST: {
            break; 
        }

        case INDEX_PAGE_DATA_1002_SUCCESS: {
            draft.data02.length=0; 
            //배열 초기화
            action.data.forEach((v)=>{
                draft.data02.push(v); 
            }); 
            break; 
        }

        case INDEX_PAGE_DATA_1002_FAILURE: {
            break; 
        }
//----------------------------------------


//1003 테이블 데이터 리스트       
//----------------------------------------
        case INDEX_PAGE_DATA_1003_REQUEST: {
            break; 
        }

        case INDEX_PAGE_DATA_1003_SUCCESS: {
            draft.data03.length=0; 
            //배열 초기화
            action.data.forEach((v)=>{
                draft.data03.push(v); 
            }); 
            break; 
        }

        case INDEX_PAGE_DATA_1003_FAILURE: {
            break; 
        }
//----------------------------------------


//1004 테이블 데이터 리스트       
//----------------------------------------
        case INDEX_PAGE_DATA_1004_REQUEST: {
            break; 
        }

        case INDEX_PAGE_DATA_1004_SUCCESS: {
            draft.data04.length=0; 
            //배열 초기화
            action.data.forEach((v)=>{
                draft.data04.push(v); 
            }); 
            break; 
        }

        case INDEX_PAGE_DATA_1004_FAILURE: {
            break; 
        }
//----------------------------------------


//1005 테이블 데이터 리스트       
//----------------------------------------
        case INDEX_PAGE_DATA_1005_REQUEST: {
            break; 
        }

        case INDEX_PAGE_DATA_1005_SUCCESS: {
            draft.data05.length=0; 
            //배열 초기화
            action.data.forEach((v)=>{
                draft.data05.push(v); 
            }); 
            break; 
        }

        case INDEX_PAGE_DATA_1005_FAILURE: {
            break; 
        }
//----------------------------------------

//1006 테이블 데이터 리스트       
//----------------------------------------
        case INDEX_PAGE_DATA_1006_REQUEST: {
            break; 
        }

        case INDEX_PAGE_DATA_1006_SUCCESS: {
            draft.data06.length=0; 
            //배열 초기화
            action.data.forEach((v)=>{
                draft.data06.push(v); 
            }); 
            break; 
        }

        case INDEX_PAGE_DATA_1006_FAILURE: {
            break; 
        }
//----------------------------------------

        

        default : break; 
    }
});

export default reducer;