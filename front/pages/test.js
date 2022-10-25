import wrapper from '../store/configureStore';
import axios from 'axios';


const test = ({hello01,hello02,hello03,hello04,hello05,hello06,hello07,hello08,hello09,hello10,data}) =>{
    return (
        <div>
           <img src='../jsMetaImage.gif'></img>
           <div className='imgTextSEO'>{hello01}</div>
           <div className='imgTextSEO'>{hello02}</div>
           <div className='imgTextSEO'>{hello03}</div>
           <div className='imgTextSEO'>{hello04}</div>
           <div className='imgTextSEO'>{hello05}</div>
           <div className='imgTextSEO'>{hello06}</div>
           <div className='imgTextSEO'>{hello07}</div>
           <div className='imgTextSEO'>{hello08}</div>
           <div className='imgTextSEO'>{hello09}</div>
           <div className='imgTextSEO'>{hello10}</div>

         {/*데이터 리스트*/}
         <div className='divTable'>
         {data && data.map((v,i)=>(
            <div className='divTableRow'>
                <div className='divTableCell'>
                <p>{v.userId}</p>
                </div>
                <div className='divTableCell'>
                <p>{v.id}</p>
                </div>
                <div className='divTableCell'>
                <p>{v.userId}</p>
                </div>
                <div className='divTableCell'>
                <p>{v.title}</p>
                </div>
                <div className='divTableCell'>
                <p>{v.completed}</p>
                </div>
         </div>
       
         ))}
         </div>
  
        </div>
    )

}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {


    const apiResult =await axios.get('https://jsonplaceholder.typicode.com/todos');
    const data = apiResult.data; 

    const hello01='pzqmlaonejf';
    const hello02='조충범';
    const hello03='조충범 인스타';
    const hello04='이과장'; 
    const hello05='유 튜버 이과장';
    const hello06='유튜브 이과장';
    const hello07='pqzivmf';
    const hello08='apmqnvtyfbss';
    const hello09='퀖첡쏧';
    const hello10='깻홀락람';


    return{
        props: {hello01,hello02,hello03,hello04,hello05,hello06,hello07,hello08,hello09,hello10,data}, // will be passed to the page component as props
    }

});

export default test;