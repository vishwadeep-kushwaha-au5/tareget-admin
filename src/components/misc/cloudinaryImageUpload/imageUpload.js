import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/styles';
import {Helmet} from 'react-helmet'
import { render } from '@testing-library/react';

const styles = (theme)=>({
    errorButton:{
        color: 'red',
        borderColor: 'red'
    }
})

class UploadImage extends Component{
    // function which opens up the widget

    generateSignature = async (callback, params_to_sign) => {
        try {
           // getSignature is calling an API, passing the params_to_sign           
           // in the request body 
           // and returns the signature
            const signature = await .post('/api/image/generateCloudinarySignature', params_to_sign);
            callback(signature.data.result);
        } catch (err) {
            console.log(err);
        }
    };

    widget = window.cloudinary.createUploadWidget({
        cloudName: "aryalico",
        uploadPreset: "ml_default",
        apiKey: '341291847791626',
        folder: 'sample',
        uploadSignature: this.generateSignature
    },
    (error, result) => {
        if (result.event === 'success') {
            this.props.onChange({target:{
                name: this.props.name,
                value: result.info.url
            }});
        }
    }) 

    showWidget = () => {
        this.widget.open();
    };
    // function handleScriptInject({ scriptTags }) {
    //     console.log("hoohoh", scriptTags)
    //     if (scriptTags) {
    //         const scriptTag = scriptTags[0];
    //         scriptTag.onload = handleOnLoad;
    //     }
    // }

    // function handleOnLoad(){
    //     console.log("hello",widget )
    //     setWidget(window.cloudinary && )
    // }
    render(){
        const {classes} = this.props;
        return<>
            {/* <Helmet
                script={[{ src: 'https://upload-widget.cloudinary.com/global/all.js' }]}
                // Helmet doesn't support `onload` in script objects so we have to hack in our own
                onChangeClientState={(newState, addedTags) => handleScriptInject(addedTags)}
            /> */}
            {/* <Helmet>
                <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script> 
            </Helmet> */}

            {this.widget?<Button
                variant="outlined"
                component="label"
                onClick={this.showWidget}
                className={this.props.error && classes.errorButton}
                >Upload {this.props.label} </Button>:'Loading'}
            {/* preview image change */}
            {this.props.value && <img src={this.props.value} width="500" height="600"/>}
        </>
    }
}

export default withStyles(styles, { withTheme: true })(UploadImage);
