import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Cartstate } from "../context/Context"
import { useEffect, useState } from "react";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: {cart},
    dispatch,
  } = Cartstate();

  const [total, setTotal ] = useState();
  useEffect(() => {
    setTotal(cart.reduce((acc,curr) => acc+Number(curr.price)*curr.qty,0));
  },[cart]);

  console.log(cart);
  return (
    <div className="cart">
      <div className="cartContainer">
        <ListGroup>
          {cart.map(prod => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2} className="mobileFlex">
                  <Image className="mobileCartImg" src={prod.image} alt={prod.name} fluid rounded/>
                  <div className="mobileFlexTitle">
                    <span>{prod.name}</span>
                    <span>&#x20B9;{prod.price}</span>
                  </div>
                  <Rating rating={prod.rating} />
                </Col>
              </Row>
              <Row>
                <Col md={2} >
                  <Form.Select aria-label="Default select example" 
                    onChange={(e) => dispatch({
                      type:'change_cart_qty',
                      payload:{
                        id:prod.id,
                        qty:e.target.value,
                      },
                    })}
                  >
                    {[...Array(prod.inStock).keys()].map((x)=>(
                      <option key={x+1}>{x+1}</option>
                    ))}
                  </Form.Select>
                  <Button
                    type="button"
                    variant="dark"
                    className="mobileButton"
                    onClick={() => dispatch({
                      type:'remove_from_cart',
                      payload:prod,
                  })}
                  >
                  <AiFillDelete fontSize="20px"/>
                  </Button>
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
          <span style={{ fontWeight:700, fontSize:15}}>Total: &#x20B9; {total}</span>
          <Button type='button' disabled={cart.length === 0}>
            Checkout
          </Button>
      </div>
    </div>
  )
}

export default Cart