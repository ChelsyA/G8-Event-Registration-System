import React from 'react';
import classes from './Backdrop.module.css';

export const Backdrop = props => {
    return (
        <div>
            <div className={classes.backdrop}>
                <div className={classes.backZIndex}>{props.children}</div>
            </div>
        </div>
    );
}