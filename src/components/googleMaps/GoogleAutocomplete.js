import React, { useEffect } from 'react'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import { TextField, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import theme from '../../utils/theme'

const useStyles = makeStyles((theme) => ({
    suggestionsList: {
        padding: "5px",
        position: "absolute",
        backgroundColor: "white",
        width: "67%",
        margin: "0",
        borderRadius: "10px",
        zIndex: "2"
    },
    error: {
        '& .MuiInputBase-root': {
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            backgroundColor: '#F8F8FA',
            border: `1px solid rgb(244, 67, 54)`,
            fontSize: '12px',
            fontWeight: 600
        },
        '& .MuiInputBase-root:focus-within': {
            border: `1px solid rgb(244, 67, 54)`,
        },
        '& .MuiInputBase-root::-webkit-scrollbar': {
            display: 'none',
        },
        '& .MuiAutocomplete-endAdornment': {
            display: 'none'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            display: 'none'
        }
    },
    inputParent: {
        '& .MuiInputBase-root': {
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            backgroundColor: '#F8F8FA',
            border: `1px solid rgba(8,109,178,0.1)`,
            fontSize: '12px',
            fontWeight: 600
        },
        '& .MuiInputBase-root:focus-within': {
            border: `1px solid ${theme.palette.primary.main}`,
        },
        '& .MuiInputBase-root::-webkit-scrollbar': {
            display: 'none',
        },
        '& .MuiAutocomplete-endAdornment': {
            display: 'none'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            display: 'none'
        }
    },


    inputParent2: {
        '& .MuiInputBase-root': {
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            backgroundColor: 'white',
            border: `1px solid rgba(8,109,178,0.1)`,
            fontSize: '12px',
            fontWeight: 600
        },
        '& .MuiInputBase-root:focus-within': {
            border: 'none',
        },
        '& .MuiInputBase-root::-webkit-scrollbar': {
            display: 'none',
        },
        '& .MuiAutocomplete-endAdornment': {
            display: 'none'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            display: 'none'
        }
    }
}))

export default function Search({ handleInputChange, address, validation, name, style2 = false, ...props }) {
    const classes = useStyles()
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };


    const handleInputx = (e, value, type) => {
        clearSuggestions()
        if (value // 👈 null and undefined check
        && Object.keys(value).length === 0
        && Object.getPrototypeOf(value) === Object.prototype) {
            handleInputChange({target: {value: value, name: name}})
        } else {
            let marker = value;
            getGeocode({ address: marker && marker.placeName }).then(async results => {
                const { lat, lng } = await getLatLng(results[0])
                marker= { id: Date.now(), lat: lat, lng: lng, ...marker, }
                handleInputChange({target: { value: marker, name: name}})
            }).catch(e => console.log("Empty markers array passed"))
        }
    }


    return (
        <div style={{ width: '100%' }}>
            <Autocomplete
                selectOnFocus
                clearOnBlur
                freeSolo
                limitTags={1}
                size="small"
                options={data.map((place) => ({ placeName: place.description, placeId: place.place_id, ...place }))}
                getOptionLabel={(option) => option.placeName || ''}
                value={address}
                onChange={handleInputx}
                renderInput={(params) => {
                    return <TextField
                        {...params}
                        error={props.error}
                        variant="outlined"
                        placeholder={"Where?"}
                        fullWidth={true}
                        value={value}
                        onChange={handleInput}
                        helperText={props.helperText}
                        disabled={!ready}
                        className={(validation && !address.length)?classes.error:(style2 ? classes.inputParent2 : classes.inputParent)}
                    />
                }
                }
            />
        </div>
    );
};