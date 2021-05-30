import React, { useState } from "react";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import RangeSlider from '../rangeSlider/RangeSlider';

const marks = [
    {
        value: 0,
        label: '0$',
    },
    {
        value: 200,
        label: '200$',
    },
];

function valuetext(value) {
    return `${value}$`;
}

export default function Filters(props) {
    const [number, setNumber] = useState(props.isResponsive? 6:4);
    const [expandGenre, setExpandGenre] = useState(true);
    const [expandCat, setExpandCat] = useState(true);
    const [catCheck, setCatCheck] = useState(props.filters.category)
    const [genreCheck, setGenreCheck] = useState(props.filters.genre)
    const [price, setPrice] = useState(props.filters.price);

    const handleChangeCategory = (value, e) => {
        let checked = e.target.checked;
        setCatCheck(checked ? value : '');
        if (!props.isResponsive) {
            props.onFilter(checked ? value : '', genreCheck, price);
        }
       
    }

    const handleChangeGenre = (value, e) => {
        let checked = e.target.checked;
        setGenreCheck(checked ? value : '');
        if (!props.isResponsive){
            props.onFilter(catCheck, checked ? value : '', price);
        }
     
    }

    const onClickMore = () => {
        if (number === 4) {
            setNumber(6)
        }
        else {
            setNumber(4)
        }
    }
    return (
        <div className="filters">
            {
                !props.isResponsive && (<div className="filters__title">Filtering Box</div>)
            }
            <Accordion expanded={expandGenre} onChange={() => setExpandGenre(!expandGenre)} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className="filters__sub-title"> Book Genres</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="filters__genres">
                        {['Action & Advanture', 'Comic Book', 'Fantasy', 'Historical Fiction', 'Advanture', 'Action',].slice(0, number).map((item, index) => (
                            <div key={index} className="mb-3">
                                <FormControlLabel control={<Checkbox color="primary" name="checkedC" checked={genreCheck === item} onChange={(e) => handleChangeGenre(item, e)} />} label={item} />
                            </div>
                        ))}
                    </div>
                </AccordionDetails>
                {
                    !props.isResponsive&&(
                        <div
                            role=""
                            onClick={onClickMore}
                            className="filters__show-more">
                            {
                                number === 4 ? <ExpandMoreIcon /> : <ExpandLessIcon />
                            }
                            show more
                        </div>
                    )
                }
             
            </Accordion>
            <div className="filters__divider"></div>
            <Accordion expanded={expandCat} onChange={() => setExpandCat(!expandCat)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <div className="filters__sub-title">Category</div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="filters__categories">
                        {['eBook', 'Audio Book'].map((item, index) => (
                            <div key={index} className="mb-3">
                                <FormControlLabel control={<Checkbox color="primary" name="checkedC" checked={catCheck === item} onChange={(e) => handleChangeCategory(item, e)} />} label={item} />
                            </div>
                        ))}

                    </div>
                </AccordionDetails>
                
            </Accordion>
            <div className="filters__divider"></div>
            <div>
                <div className="filters__sub-title">Price</div>
                <br />
                <RangeSlider
                    track="inverted"
                    aria-labelledby="track-inverted-range-slider"
                    getAriaValueText={valuetext}
                    value={price}
                    min={0}
                    max={200}
                    valueLabelDisplay={(price[0] === 0 || price[1] === 200) ? 'off' : "on"}
                    marks={marks}
                    onChange={(event, newValue) => {
                        setPrice(newValue)
                        if (!props.isResponsive) {
                            props.onFilter(catCheck, genreCheck, newValue);
                        }
                       
                    }}
                />
            </div>
            {
                props.isResponsive && (<div className="filters__filter-btn" onClick={() => props.onFilterResponsive(catCheck, genreCheck, price)}><button >Filtering</button></div>)
            }
        </div>
    )
}