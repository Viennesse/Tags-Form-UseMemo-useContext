import React, { useCallback, useState } from 'react'
import List from './List'

const UseCallbackFirstExample = () => {

    const [number, setNumber] = useState(0)
    const [dark, setDark] = useState(false)

    const getItems = useCallback(() => {
        return [number, number +1, number + 2];
    }, [number])

    const theme = {
        backgroundColor: dark ? "#333" : "#FFF",
        color: dark ? "#FFF" : "#333"
    }

  return (
    <div style={theme}>
        <input type='number'
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
        />
        <button onClick={()=> setDark(prevDark => !prevDark)}>
            Toggle theme
        </button>
        <List getItems={getItems} />
        
    </div>
  )
}

export default UseCallbackFirstExample

/* Our getItems function without useCallback Hook returns an array, which is reference type. Every time the component renders 
this function will return a new array, that looks the same, as an array from previous rendering, but remember - arrays are 
reference types, like functions : ["cat"] === ["cat"] --> false,
let ff =()=> return ()=> 'Marlena';  let res1= ff(); let res2 = ff(); res1===res2 -> false
If that what the function returns, was an primitive type, like string or number, React will notice, that the result of
return value is the same after every render and would stop executing this function after second render and thereby prevent from 
endless loop.In our case function return an array (reference type) and that is why React doesn't recognize, that the result is the same.
If we would have getItems() function without using UseCallback Hook our app will crash, because after first render we are in 
endless loop.
Endless Loop:  we updated the state inside useEffect, after updating the state component rerenders and when component
re-renders it creates a new getItems function and when getItems changes it calls useEffect. Use Effects
updates the state again and the loop repeats.
*/  