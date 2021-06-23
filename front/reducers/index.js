import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux'; // 여러 리듀서들을 하나로 합쳐준다.

import testReducer from './testReducer' 

import mainPosts_1001 from './mainPosts_1001' 
import auth from './auth';

// const rootReducer = combineReducers({
//     count, // 여기에 다른 리듀서들을 더 적으면 된다!
//     emp,
//     auth, 
//     mainPosts_1001,
// });

// (이전상태, 액션) => 다음상태
const rootReducer = (state, action) => {


    switch (action.type) {

      //SSR 시 store에 저장된 state 초기화 됨
      case HYDRATE:
        console.log('HYDRATE==>', action);
        return  action.payload;
        
      default: {
        const combinedReducer = combineReducers({    
            testReducer,
            mainPosts_1001,
            auth
        });
        return combinedReducer(state, action);
      }
    }
  };






  // const rootReducer = (state, action) => {

  //       const combinedReducer = combineReducers({    
  //           testReducer,
  //           mainPosts_1001,
  //           emp,
  //           auth
  //         });
      
  //       return combinedReducer(state, action);
   
  // };
  
  export default rootReducer;