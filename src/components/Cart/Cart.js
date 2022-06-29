import { useState, useContext } from "react"
import CartContext from "../../context/CartContext"
import { Button } from 'reactstrap'
import { Link } from "react-router-dom"
import { addDoc, collection, getDocs, query, where, documentId, writeBatch } from "firebase/firestore"
import { db } from "../../services/firebase"
import Modalview from "../Modal/ModalItemDetail"
import { useEffect } from "react"
import { useNotification } from '../../notification/Notification'
import { Spinner } from "reactstrap"

const Cart = () => {
    const {cart, removeItem, clearCart} = useContext(CartContext)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [modalStatus, setModalStatus] = useState(false)
    const [buyer, setBuyer] = useState({})
    const { setNotification } = useNotification()

    let subtotal = 0
    const suma = (precio) => { 
        subtotal += precio
    }

    const setBuyerModal = (e)=>{
        setBuyer(e)
    }

    useEffect(()=>{
        if(Object.keys(buyer).length > 0){
            createOrder()
        }
    },[buyer])

    const toggle = () => setModalStatus(!modalStatus);
    const createOrder = () => {
        setLoading(true)
        const objOrder = {
            buyer,
            item: cart,
            total: subtotal
        }

        const idCart = cart.map(prod => prod.id)
        const batch = writeBatch(db)
        const noStock = []
        const collectionRef = collection(db, 'products')

        getDocs(query(collectionRef, where(documentId(), 'in', idCart)))
            .then(response => {
                response.docs.forEach(doc => {
                    const dataDoc = doc.data()
                    const userStock = cart.find(prod => prod.id === doc.id)?.quantity

                    if(dataDoc.stock >= userStock){
                        batch.update(doc.ref, {stock: dataDoc.stock - userStock })
                    }else{
                        noStock.push({id:doc.id, ...dataDoc})
                    }
                })
            }).then(()=>{
                if(noStock.length===0){
                    const collectionRef = collection(db, 'orders')
                    return addDoc(collectionRef, objOrder)
                }else{
                    return Promise.reject({type:'sin_stock', products: noStock })
                }
            }).then(({id})=>{
                batch.commit()
                setMessage(`Id de orden es ${id}`)
                clearCart()
                setNotification('success',`Se generó la orden`)
            }).catch(error => {
                setNotification('danger',`Algunos productos no tienen stock :(`)
            }).finally(() => {
                setLoading(false)
            })
    }

    if(loading){
        return <Spinner className="mt-4 spinner" animation="border" role="status" /> 
    } 
    
    return(
        <div className="text-center mt-4">
            <h1>Carrito</h1>
            {message ? message : ''}
            <div className="col-10 mx-auto">
                {cart.map(prod=> {
                    suma(prod.price * prod.quantity)
                    return(
                        <div key={prod.id} className="row my-2 outline p-2">
                            <div className="col"><Link to={'/detail/'+prod.id}>Nombre: {prod.name}</Link></div>
                            <div className="col">Cantidad: {prod.quantity}</div>
                            <div className="col">Precio: {prod.price}</div>
                            <div className="col">Subtotal: { prod.price * prod.quantity }</div>
                            <div className="col">
                                <Button className="btn btn-danger" onClick={()=>removeItem(prod.id)}>X</Button>
                            </div>
                        </div>
                    )
                })}
                
                    {cart.length > 0 ? 
                        <div>
                            <div className="total my-4">Total: {subtotal}</div>
                            <div className="row">
                                <div className="col"><Button onClick={()=>clearCart()} className="btn btn-outline-danger" outline>Limpiar Carro</Button></div>
                                {/*<div className="col"><Button onClick={()=>createOrder()}>Generar Orden</Button></div>*/}
                                <div className="col"><Button onClick={toggle}>Generar Orden</Button></div>
                               <Modalview isOpen={modalStatus} toggle={toggle} setBuyer={setBuyerModal}/>
                            </div>
                        </div>
                            : <div className="mt-4">El carro esta vácio <br></br><Link to={'/'}>Puedes seguir comprando</Link></div>
                    }
                
            </div>
        </div>
    )
}
export default Cart