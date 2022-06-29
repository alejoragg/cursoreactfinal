import { useContext } from "react";
import { BsFillCartFill } from "react-icons/bs";
import  CartContext from "../../context/CartContext";
const CartWidget = () => {
    const {getQuantity} = useContext(CartContext)
    const quantity = getQuantity()
    return(
        <div>
            <BsFillCartFill title="Shop"/>{quantity}
        </div>
    )
}

export default CartWidget 