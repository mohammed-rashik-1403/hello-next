import {useRouter} from 'next/router';


const NewsId = () => {
const router = useRouter();
console.log(router.query.newsid)
    return <h1>News ID</h1>
}

export default NewsId;