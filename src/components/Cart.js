import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { Cartstate } from "../context/Context"
import { useEffect, useState } from "react";

const Cart = () => {
  const {
    state: {cart},
    // dispatch,
  } = Cartstate();

  const [total, setTotal ] = useState();
  useEffect(() => {
    setTotal(cart.reduce((acc,curr) => acc+Number(curr.price)*curr.qty,0));
  },[cart]);

  console.log(cart);
  return (
    <div className="cart">
      <div className="productContainer">
        <ListGroup>
          {cart.map(prod => (
            <ListGroup.Item>
              <Row>
                <Col md={2}> 
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>
                  <span>&#x20B9;{prod.price}</span>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="side_cont summary">
          <span className="title">
            Subtotal {cart.length} items
          </span>
          <span style={{ fontWeight:700, fontSize:20}}>Total: &#x20B9; {total}</span>
          <Button type='button' disabled={cart.length === 0}>
            Checkout
          </Button>
      </div>
    </div>
  )
}

export default Cart