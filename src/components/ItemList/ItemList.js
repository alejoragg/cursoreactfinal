import { Card, Col, CardText } from 'reactstrap';
import { Link } from 'react-router-dom'

const ItemList = (props) => {

  return (
    <Col md="4" xs="12" className='mt-2'>
        <Card body>
            {<div style={{backgroundImage:`url(${props.photos})`}} className='image-thumb'></div>}
            <CardText className='text-center mt-2'><b>{props.name}</b></CardText>
            <div className='text-center'>Stock: {props.stock}</div>
            <Link className='mt-2 btn btn-outline-success' color="success" to={`/detail/${props.id}`}>Ver Producto</Link>
        </Card>
    </Col>
  )
}

export default ItemList