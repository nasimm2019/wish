
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
const RangeSlider = withStyles({
    root: {
        color: '#3880ff',
        height: 2,
        padding: '15px 0',
      
    },
    thumb: {
        height: 19,
        width: 19,
        backgroundColor: '#3371F2',
        marginTop: -9,
        marginLeft: -14,
        fontSize: 12,
        fontWeight: 500
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 1px)',
        top: 30,
        '& *': {
            background: 'transparent',
            color: '#000',
            fontSize:12,
            fontWeight:500
        },
    },
    track: {
        height: 2,
    },
    rail: {
        height: 2,
        opacity: 0.5,
        backgroundColor: '#181818',
    },
    mark: {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        marginTop: -3,
    
    },
    markActive: {
        opacity: 1,
        backgroundColor: '#181818',
    },
})(Slider);
export default RangeSlider