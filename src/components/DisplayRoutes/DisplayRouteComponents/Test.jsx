import { useEffect, useState } from "react"

export default function Test() {
    const [num, setNum] = useState(0)
    const [test, setTest] = useState(false)

    // useEffect(() => {
    //     setTest(() => false)
    // },[test])

    function handlePlus() {
        setNum(num+1)
    }

    function handleMinus() {
        if(test) {
            minus(() => minus())
        }
        setNum(num-1)
    }

    function minus() {
        setNum(num-1)
    }

    function handleTest() {
        setTest(!test)
    }

    return (
        <>
        <button onClick={() => handlePlus()}>plus1</button>
        <button onClick={() => handleMinus()}>minus1</button>
        <button onClick={() => handleTest()}>{`${test}`}</button>
        <p>Num: {num}</p>
        </>
    )
}