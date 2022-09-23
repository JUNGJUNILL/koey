import wrapper from '../store/configureStore';


const test = ({hello}) =>{
    return (
        <div>
            {hello}
        </div>
    )

}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

    const hello='pzqmlaonejf'; 


    return{
        props: {hello}, // will be passed to the page component as props
    }

});

export default test;