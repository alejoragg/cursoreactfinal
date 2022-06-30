import ItemCount from '../ItemCount/ItemCount'
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import { useNotification } from '../../notification/Notification'

const ItemDetail = ({ name, category, id, price, description, photos, stock }) => {
    const [quantity, setQuantity] = useState(0)
    const { addItem, getProduct } = useContext(CartContext)
    const { setNotification } = useNotification()

    const handleCallback = (quantity) =>{
        setQuantity(quantity)
        addItem({ id, name, price, quantity})
        setNotification('success', 'Se agrego el producto al carrito')
    }
    return(
        <div className="content mt-4">
            <h2 className='text-center'>Detalle de producto</h2>
            <div className="row col-10 mx-auto mt-4">
                <div className='image-thumb col-4' style={{backgroundImage:`url(${photos})`}}></div>
                <div className='col row'>
                    <div><b>Código:</b> {id}</div>
                    <div><b>Nombre:</b> {name}</div>
                    <div><b>Categoria:</b> {category}</div>
                    <div><b>Descripción:</b> {description}</div>
                    <div><b>Precio:</b> MXN {price}</div>
                    <div><b>Stock:</b> {stock}</div>
                    { stock === 0 ? <div className='sinStock'>Producto sin Stock</div> : quantity > 0 
                        ? <div><Link to="/cart" className='btn btn-outline-success'>Terminar compra</Link></div>
                        : <div><ItemCount initial={getProduct(id)?.quantity} stock={stock} parentCallback={handleCallback}/></div>
                    }
                </div>
                
            </div>
        </div>
        
    )
}

export default ItemDetail