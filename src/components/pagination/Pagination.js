import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const PaginationComponent = (props) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        props.onChange(value)
    };
    return (
        <div className={classes.root}>
            {
                props.total > 0 && <Pagination count={props.total}  page={page} onChange={handleChange} />
            }
        </div>
    );
}
export default PaginationComponent;