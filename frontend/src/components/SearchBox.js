import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';


const SearchBox = () => {
    const [keyword, setKeyword] = useState();

    let navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}`)
        } else {
            navigate(navigate(navigate.path))
        }
    }

  return (
    <Form onSubmit={submitHandler} inline='true'>
        <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            className='mr-sm-2 ml-sm-5'
        ></Form.Control>

        <Button
            type='submit'
            variant='outline-success'
            className='p-2'
        >
            Submit
        </Button>
    </Form>
  )
}

export default SearchBox
