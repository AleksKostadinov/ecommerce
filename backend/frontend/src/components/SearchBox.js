import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`);
        } else {
            navigate(navigate.path);
        }
    };

    return (
        <Form onSubmit={submitHandler}>
            <div className="d-flex">
                <Form.Control
                    type="text"
                    name="q"
                    onChange={(e) => setKeyword(e.target.value)}
                    className="mr-2"
                />

                <Button type="submit" variant="outline-success" className="p-2">
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default SearchBox;
