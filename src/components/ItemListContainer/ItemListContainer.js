import ItemList from '../ItemList/ItemList';
import { Row, Spinner } from 'reactstrap';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';

const ItemListContainer = ({greeting, handlePage}) => {
    const [products, setProducts] = useState([])
    const [spinner, setSpinner] = useState(true)
    const { categoryId } = useParams()

    useEffect(() => {
        setSpinner(true)
        const collectionRef = categoryId
            //Query, 2 argumentos, a que base y luego el filtro
            ? query(collection(db, 'products'), where('category', '==', categoryId))// le puedo poner como 3er argumento un limit(xx)
            : collection(db, 'products')

        getDocs(collectionRef).then(response => {
            const products = response.docs.map(docs => {
                return { id: docs.id, ...docs.data() }
                
            })
            setProducts(products)
        }).catch(error => {
            console.log(error)
        }).finally(()=>{
            setSpinner(false)
        })
    }, [categoryId])

    if(spinner) {
        return <Spinner className="mt-4 spinner" animation="border" role="status" /> 
    }

    return(
        <div className="container mt-4">
            <h1>{greeting}</h1>
            <Row>
                {products.map(product => <ItemList key={product.id} {...product} initial={1} handlePage={handlePage}/>)}
            </Row>
        </div>
    )
}

export default ItemListContainer 