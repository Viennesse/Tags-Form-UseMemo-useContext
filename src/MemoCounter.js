import { useMemo, useState } from "react";


function MemoCounter () {

    const [counterOne, setCounterOne] = useState(0)
    const [counterTwo, setCounterTwo] = useState(0)

    const incrementOne = () => {
        setCounterOne(counterOne + 1);
    }

    const incrementTwo = () => {
        setCounterTwo(counterTwo + 1);
    }

    const isEven = useMemo(() => {
        let i = 0;
        while(i< 2000000000) i++;
        
        return counterOne % 2 === 0;
    }, [counterOne])
 
    return(
        <div>
            <div>
                <button onClick={incrementOne}>Count One: {counterOne}</button>
                <span>{isEven? "Even" : "Odd"}</span>
            </div>
            <div>
                <button onClick={incrementTwo}>Count Two: {counterTwo}</button>
            </div>
        </div>
    )

}

export default MemoCounter


/* 
USE MEMO – Performance optimization

The while loop doesnt really affect the return value but it does slow down the rate at which we 
compute where the counter is odd or even.
When we click on incrementCountOne button, we can see, that here is a second or two delay before the UI updates.
And this is because in the UI we are rendering whether the number is odd or even and that logic is
from isEven function which as it turns out is really slow. When the number changes React needs to check
if the new number is odd or even.
I now click on incrementTwo button and still there is a delay with UI updates. Why is counter2 slow as well? 
Becaouse every time the state updates the component re-renders and when the component re-renders –
isEven function is called again. The function is slow and hence, even when we update counter2, the UI update is slow.
What we need to tell React not to recalculate certain values when unnecessery especially the once which
take a long time to compute.
In our example we need to tell React not to calculate whether counterOne is odd or even when we are changing
CounterTwo values. This is where the use Memo hook comes into picture.
Use Memo will only recompute the cached value when one of the dependencies has changed 
(avoiding expensiv calculations on every render). 
Use Memo:
- first argument – we pass in the function whose return value needs to be cached
- second argument : dependency array – our function depends on the value of counterOne. 
That is – whenever  counterOne changes, we are telling React to recompute the value and not use the cached value

Use Memo returns a cached value which we are going to assign to the variable isEven.

After we used UseMemo Hook, when we click on CounterOne button, the delay is still present, because
we need to recalculate is odd or even when the value changes.
When we click on counter2 , the updates are way faster – this is because React is now using 
the cached value of isEven function to display whether the count is odd or even.



USE CALLBACK vs USE MEMO
- use Callback caches the provided function instance itself whereas use Memo invokes
provided function and caches its result.

*/