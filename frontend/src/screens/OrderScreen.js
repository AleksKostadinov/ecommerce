import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import { PayPalButton } from 'react-paypal-button-v2';

const OrderScreen = () => {
    const params = useParams();
    const orderId = params.id;
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    if (!loading && !error) {
        order.itemsPrice = order.orderItems
            .reduce((acc, item) => acc + item.price * item.qty, 0)
            .toFixed(2);
    }

    const addPayPalScript = () => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${window.env.PAYPAL_CLIENT_ID}`;

        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!order || successPay || order._id !== Number(orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.is_paid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, order, orderId, successPay]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <div>
            <h1>Order: {orderId}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                {" "}
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                {" "}
                                <strong>Email: </strong>{" "}
                                <a href={`mailto:${order.user.email}`}>
                                    {order.user.email}
                                </a>
                            </p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address},{" "}
                                {order.shippingAddress.city}
                                {"  "}
                                {order.shippingAddress.postalCode},{"  "}
                                {order.shippingAddress.country}
                            </p>
                            {order.is_delivered ? (
                                <Message variant="success">
                                    Delivered on {order.delivered_at}
                                </Message>
                            ) : (
                                <Message variant="warning">
                                    Not Delivered
                                </Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.is_paid ? (
                                <Message variant="success">
                                    Paid on {order.paid_at}
                                </Message>
                            ) : (
                                <Message variant="warning">Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message variant="info">Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>

                                                <Col className="d-flex align-items-center">
                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X ${item.price} =
                                                    $
                                                    {(
                                                        item.qty * item.price
                                                    ).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shipping_price}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.tax_price}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.total_price}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.is_paid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.total_price}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderScreen;
