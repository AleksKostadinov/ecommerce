import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { Message } from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const CartScreen = () => {
    const navigate = useNavigate();
    const params = useParams()
    const productId = params.id;

    const location = useLocation();
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log(cartItems);

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])



    return <div>Cart</div>;
};

export default CartScreen;
