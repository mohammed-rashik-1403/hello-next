import Button from "@/components/button";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
export default function Page({ data }) {
const [count,setCount] = useState(0);
const router = useRouter();

console.log("routing",router)
useEffect(() => {
console.log("HEYEYEEY")
},[count])

console.log("dhdhdhd",data)
    return (
        <div><Button/>{count}
        <button onClick={() => setCount(pre => pre + 1)}>Cliiiii</button>{data && data.map((val) => {
            return <p key={val.id}>{val.id}</p>
        }) }</div>
    )
    // Render data...
  }
   
  // This gets called on every request
  export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const data = await res.json()
    console.log(data)
   
    // Pass data to the page via props
    return { props: { data } }
  }