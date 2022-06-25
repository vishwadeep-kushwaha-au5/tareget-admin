import React, { useEffect,useState } from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    checkmark: {
        width: '300px',
        margin: '0 auto',
        paddingTop: '40px',
      },
      path: {
        strokeDasharray: 300,
        strokeDashoffset: 0,
        '-webkit-animation-name': '$load, $spin',
        '-webkit-animation-duration': '3s, 3s',
        '-webkit-animation-timing-function': 'linear',
        '-webkit-animation-iteration-count': 'infinite',
        animationName: '$load, $spin',
        animationDuration: '3s, 3s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        '-webkit-transform-origin': '50% 50%',
        '-moz-transform-origin': '50px 50px',
      },
      pathComplete: {
          '-webkit-animation-play-state': 'paused',
          animationPlayState: 'paused',
      },
      check :{
          strokeDasharray: 110,
          strokeDashoffset: -110,
          strokeWidth: 0,
      },
      checkComplete: {   
          '-webkit-animation': '$check 1s ease-in forwards',
          animation: '$check 1s ease-in forwards',
          strokeWidth: 15,
          strokeDashoffset: 0,
      },
      fill: {
        strokeDasharray: 285,
        strokeDashoffset: -257,
        '-webkit-animation': '$spin-fill 3s cubic-bezier(0.700, 0.435, 0.120, 0.600) infinite forwards',
        animation: '$spin-fill 3s cubic-bezier(0.700, 0.465, 0.120, 0.600) infinite forwards',
        '-webkit-transform-origin': '50% 50%',
        '-moz-transform-origin': '50px 50px',
      },
      fillComplete: {
          '-webkit-animation': '$fill 1s ease-out forwards',
          animation: '$fill 1s ease-out forwards',
      },
      '@-webkit-keyframes load': {
       "0%": {
         strokeDashoffset: 300,
         '-webkit-animation-timing-function': 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
       },
       "50%": {
           strokeDashoffset: 0,
           '-webkit-animation-timing-function': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
       },
       "100%": {
         strokeDashoffset: -300,
       },
      },
      '@keyframes load': {
       "0%": {
         strokeDashoffset: 285,
         'animation-timing-function': 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
       },
       "50%": {
           strokeDashoffset: 0,
           'animation-timing-function': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
       },
       "100%": {
         strokeDashoffset: -285,
       },
      },
      '@-webkit-keyframes check': {
       "0%": {
         strokeDashoffset: -110,
      },
       "100%": {
         strokeDashoffset: 0,
       },
      },
      '@keyframes check': {
       "0%": {
         strokeDashoffset: -110,
      },
       "100%": {
         strokeDashoffset: 0,
       },
      },
      '@-webkit-keyframes spin': {
        "0%": {
          '-webkit-transform': 'rotate(0deg)',
        },
        "100%": {
          '-webkit-transform': 'rotate(360deg)',
        },
      },
      '@keyframes spin': {
        "0%": {
          transform: 'rotate(0deg)',
        },
        "100%": {
          transform: 'rotate(360deg)',
        },
      },
      '@-webkit-keyframes spin-fill': {
        "0%": {
          '-webkit-transform': 'rotate(0deg)',
        },
        "100%": {
          '-webkit-transform': 'rotate(720deg)',
        },
      },
      '@keyframes spin-fill': {
        "0%": {
          transform: 'rotate(0deg)',
        },
        "100%": {
          transform: 'rotate(720deg)',
        },
      }, 
      '@-webkit-keyframes fill': {
        "0%": {
          strokeDashoffset: 285,
        },
        "100%": {
          strokeDashoffset: 0,
        },
      },
      '@keyframes fill': {
        "0%": {
          strokeDashoffset: 285,
        },
        "100%": {
          strokeDashoffset: 0,
        },
      },
      success :{
          stroke: '#009900',
          transition: 'stroke .6s',
      },
}))

const CheckSpinner = ({success}) => {
    const classes = useStyles()
    const [path, setPath] = useState(`${classes.path}`)
    const [fill, setFill] = useState(`${classes.fill}`)
    const [check, setCheck] = useState(`${classes.check}`)

    useEffect(() => {
        let spinnerTimer, successSpinnerTimer;
        if (success === 'Done') {
            spinnerTimer = setTimeout(function () {
                setCheck(`${classes.check} ${classes.checkComplete}`);
                setFill(`${classes.fill} ${classes.fillComplete}`);
            }, 500); 
            successSpinnerTimer = setTimeout(function () {
                setPath(`${classes.path} ${classes.pathComplete}`)
                setCheck(`${classes.check} ${classes.checkComplete} ${classes.success}`);
                setFill(`${classes.fill} ${classes.fillComplete} ${classes.success}`);
            }, 600);
        } else if(success === "Submitting") {
            setPath(`${classes.path}`)
            setCheck(`${classes.check}`);
            setFill(`${classes.fill}`);
        }else{

        }
        return () => { clearTimeout(spinnerTimer); clearTimeout(successSpinnerTimer) }
    },[success])

    return (
        <div className={classes.checkmark}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" x="0px" y="0px"
                viewBox="0, 0, 100, 100" id="checkmark">
                <g transform="">
                    <circle className={path} fill="none" stroke="#7DB0D5" strokeWidth="4" strokeMiterlimit="10" cx="50" cy="50" r="44"/>
                    <circle className={fill} fill="none" stroke="#7DB0D5" strokeWidth="4" strokeMiterlimit="10" cx="50" cy="50" r="44"/>
                    <polyline className={check} fill="none" stroke="#7DB0D5" strokeWidth="8" strokeLinecap="round" strokeMiterlimit="10" 
                        points="70,35 45,65 30,52  "/>
                </g>
            </svg>
        </div>
    )
}

export default CheckSpinner