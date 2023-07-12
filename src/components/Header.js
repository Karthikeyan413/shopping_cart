import { Button, ButtonGroup, Container, Dropdown, FormControl, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { TfiShoppingCart, TfiShoppingCartFull } from "react-icons/tfi"
import { Link } from "react-router-dom"
import { Cartstate } from "../context/Context"
import { AiFillDelete } from "react-icons/ai"
import { useState } from "react"
import Cart from "./Cart"


const Header = () => {
    const { state: {cart}, dispatch }=Cartstate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <Navbar bg="dark" variant="dark" style={{ height : 80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to="/">Shopping Cart</Link>
                </Navbar.Brand>
                <Navbar.Text className="search">
                    <FormControl style={{ width:500}} placeholder="Search a product" className=",-auto"></FormControl>
                </Navbar.Text>
                <Nav>
                    <Dropdown as={ButtonGroup}>
                        <Button variant="success" onClick={handleShow}>
                            { cart.length > 0 ? (
                                <>
                                <TfiShoppingCartFull color="white" fontSize="25px" />
                                <span className="badge">{cart.length}</span>
                                </>
                            ) : (
                                <>
                                <TfiShoppingCart color="white" fontSize="25px" />
                                </>
                            )}  
                        </Button>
                        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                        <Dropdown.Menu style={{ minWidth: 370, right:0, left:"unset" }}>
                            {
                                cart.length>0 ? (
                                    <>
                                    {cart.map((prod) => (
                                        <span className="cartItem" key={prod.id}>
                                            <img src={prod.image} alt={prod.name} className="cartItemImg"/>
                                            <div className="cartItemDetail">
                                                <span>{prod.name}</span>
                                                <span>&#x20B9;{prod.price}</span>
                                            </div>
                                            <AiFillDelete fontSize="20px"
                                                style={{ cursor: 'pointer'}}
                                                onClick={() => dispatch({
                                                    type:'remove_from_cart',
                                                    payload:prod,
                                                })}
                                            >

                                            </AiFillDelete>
                                        </span>
                                    ))}
                                    </>
                                ) : (
                                <span style={{ padding: 10}}>Cart is Empty!</span>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title style={{fontSize:"30px"}}>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Cart />
                </Offcanvas.Body>
            </Offcanvas>
        </Navbar>
    )
}

export default Header