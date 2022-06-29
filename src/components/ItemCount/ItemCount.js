import React, { useState } from 'react'
import { Button } from 'reactstrap';

const ItemCount = ({stock=0, initial=1, parentCallback}) => {
const [count, setCount] = useState(initial);

const increment = () => {
    if(stock !== count){
        setCount(count + 1)
    }
}
const decrement = () => {
    if (count !== 1) {
        setCount(count - 1)
    }
}

return (
    <div className='my-2 row'>
        <div className='d-flex justify-content-center col'>
            <Button onClick={decrement} children={'-'}/>
            <div className='mx-2'>{count}</div>
            <Button onClick={increment} children={'+'}/>
        </div>
        <div className='col'>
            <Button className='mt-2 btn btn-outline-success' onClick={()=>parentCallback(count)} outline>Agregar al Carro</Button>
        </div>
    </div>
  )
}
export default ItemCount