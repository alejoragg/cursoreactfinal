import { useState, useEffect } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import { Spinner } from 'reactstrap'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebase'
const ItemDetailContainer = ()=>{
    const [product, setProduct] = useState()
    const { productId } = useParams()
    const [spinner, setSpinner] = useState(true)

    useEffect(() => {
        getDoc(doc(db, 'products', productId)).then(response => {
            const product = { id: response.id, ...response.data() }
            setProduct(product)
        }).catch(error =>{
            console.log(error)
        }).finally(()=>{
            setSpinner(false)
         })
    }, [productId])
    if(spinner) {
        return <Spinner className="mt-4 spinner" animation="border" role="status" /> 
    }
    return(
        <div>
            <ItemDetail {...product}/>
        </div>
    )
}

export default ItemDetailContainer