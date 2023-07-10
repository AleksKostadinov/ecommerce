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
        <Form onSubmit={submitHandler} inline={true.toString()}>
            <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                className="mr-sm-2 ml-sm-5"
            />

            <Button type="submit" variant="outline-success" className="p-2">
                Submit
            </Button>
        </Form>
    );
};

export default SearchBox;
