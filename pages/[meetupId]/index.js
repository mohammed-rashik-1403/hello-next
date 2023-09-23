import {useRouter} from 'next/router';


const MeetUp = () => {
const router = useRouter();
console.log(router.query.meetupId)
    return <h1>MeetUp ID</h1>
}

export default MeetUp;