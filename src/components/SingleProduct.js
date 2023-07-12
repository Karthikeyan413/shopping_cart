import { Button, Card } from "react-bootstrap"
import { Cartstate } from "../context/Context"
import Rating from "./Rating";

const SingleProduct = (props) => {

  const { state:{ cart }, dispatch,} = Cartstate();  
  
  return (
    <div className="product">
        <Card>
            <Card.Img variant="top" src={ props.prod.image} alt={props.prod.name} />
            <Card.Body>
            <Card.Title>{ props.prod.name }</Card.Title>
            <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
            </Card.Text>
            <Card.Subtitle style={{ paddingBottom: 10 }}>
                <span>Price: &#x20B9; {props.prod.price}</span>
                {props.prod.fastDelivery ? (<div>Fast Delivery</div>) : (<div></div>)}
                <Rating rating={props.prod.rating}/>
            </Card.Subtitle>
            {
                cart.some(p=>p.id === props.prod.id) ? (
                    <Button onClick={ ()=> {dispatch({type:'remove_from_cart',payload:props.prod})}} variant="danger">
                        Remove from cart
                    </Button>
                ) : ( 
                    <Button onClick={ ()=> {dispatch({type:'add_to_cart',payload:props.prod})}} variant="dark" disabled={!props.prod.inStock}>
                        {!props.prod.inStock ? "Out of Stock" : "Add to cart"}
                    </Button>
                )
            }
            </Card.Body>
        </Card>
    </div>
  )
}

export default SingleProduct