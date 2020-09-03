import React from 'react';
import './Button.scss';

function Button(props){
    return (
        <button 
            onClick={() => props.nominationHandler(props.movie)}
            className={"button " + props.class}
            disabled={!props.enabled}
        >
            {props.class}
        </button>
    )
}

export default Button;