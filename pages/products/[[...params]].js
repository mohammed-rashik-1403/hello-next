// import { Router } from "next/router";
import Router from 'next/router';

function ProductsDetails(){
// const router = useRouter();
// console.log(router.query)
    return (
        <><h4>ProductsDetails Youu</h4>
        <button onClick={() => Router.push({pathname: '/news',query: {data: {id: 'name'}} }) }>NAvigate To news page</button>
        </>
    )
}

export default ProductsDetails;