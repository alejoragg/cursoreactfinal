import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form } from 'reactstrap'

const Modalview = ({isOpen, toggle, setBuyer}) => {
    
    const sendData = (e)=>{
      e.preventDefault()
      setBuyer({
        name: e.target.name.value,
        email: e.target.email.value,
        telephone: e.target.telephone.value,
        address: e.target.address.value,
        comment: e.target.comment.value,
      })
    }

    return (
        <Modal centered isOpen={isOpen} toggle={toggle}>
          <Form onSubmit={sendData}>
            <ModalHeader>
              Completa los datos para terminar la compra
            </ModalHeader>
            <ModalBody>
              <div>
                <Input type="text" placeholder='Nombre*' required name='name' className='my-2'/>
                <Input type="email" placeholder='Email*' required name='email' className='my-2'/>
                <Input type='number' placeholder='Teléfono*' required name='telephone' className='my-2'/>
                <Input type='text' placeholder='Dirección*' required name='address' className='my-2'/>
                <Input type="textarea" placeholder='Comentario' name='comment' bsSize="lg" className='my-2'/>
              </div>
            </ModalBody>
            <ModalFooter>
            <Button type='submit'>
                Finalizar Orden
            </Button>
            </ModalFooter>
          </Form>
        </Modal>
    )
}
export default Modalview