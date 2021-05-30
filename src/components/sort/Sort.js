import React from 'react';
import { Modal} from 'react-bootstrap';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
const Sort = ({ show,onClose,onChange})=>{
    const [value, setValue] = React.useState(-1);

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event.target.value ==='Bestselling' ? 0 :1)
    };
    return(
        <Modal
            show={show}
            onHide={() => onClose()}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            className="sort-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Sorting
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value={'Bestselling'} control={<Radio color="primary"/>} label="Bestselling" />
                        <FormControlLabel value={'popular'} control={<Radio color="primary"/>} label="popular" />
                    </RadioGroup>
                </FormControl>
            </Modal.Body>
        </Modal>
    )
}
export default Sort;