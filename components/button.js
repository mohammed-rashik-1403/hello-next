
import { useState } from "react"
const Button = () => {
const [count,setCount] = useState(0);
console.log(count)
    return (
        <button onClick={() => setCount((pre) => pre + 1)}>Click Me</button>
    )
}
export default Button;