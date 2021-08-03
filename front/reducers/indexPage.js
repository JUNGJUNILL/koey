import immerProduce from '../util/produce';

export const  initialState = {

    data01: [], 

}

//인덱스 페이지 데이터 list
export const INDEX_PAGE_DATA01_REQUEST ='INDEX_PAGE_DATA01_REQUEST';
export const INDEX_PAGE_DATA01_SUCCESS ='INDEX_PAGE_DATA01_SUCCESS';
export const INDEX_PAGE_DATA01_FAILURE ='INDEX_PAGE_DATA01_FAILURE';


const reducer = (state = initialState, action) => immerProduce(state, (draft) => {

    switch(action.type){

//게시글 리스트 가져오기       
//----------------------------------------
        case INDEX_PAGE_DATA01_REQUEST: {
            break; 
        }

        case INDEX_PAGE_DATA01_SUCCESS: {
            draft.data01.length=0; 
            //배열 초기화
            console.log('action.data==>', action.data); 
            action.data.forEach((v)=>{
                draft.data01.push(v); 
            }); 
            break; 
        }

        case INDEX_PAGE_DATA01_FAILURE: {
            break; 
        }

        

        default : break; 
    }
});

export default reducer;