import React from "react";
import { InputGroup, FormControl, Button} from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
export default function Search({ placeholder,value,onChange }) {
    return (
        <div className="search">
            <InputGroup className="mb-3"  >
                <FormControl aria-describedby="basic-addon1" placeholder={placeholder} value={value} onChange={onChange}/>
                <InputGroup.Prepend>
                    <Button variant="outline-secondary">search</Button>
                    <SearchIcon/>
                </InputGroup.Prepend>
            </InputGroup>
        </div >
    )
}