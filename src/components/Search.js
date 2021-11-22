import React, { useState } from 'react'
import { TextField, Button, LinearProgress} from '@material-ui/core';
import  Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

//API URL
import shrtcode from '../api/shrtcode';

//import Copy to clipboard package 
import { CopyToClipboard } from "react-copy-to-clipboard";
//copy icon from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

//To test link
const HTTP_URL_VALIDATOR_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const Search = () => {
    const[link, setLink] = useState('');
    const[short, setShort] = useState('');
    const[isLoading, setIsLoading] = useState(false);
    const[severity, setSeverity] = useState('');
    const[alertTitle, setAlertTitle] = useState('');
    
    //copy to clipboard 
    const[textCopied, setTextCopied] = useState('');
    const[copied, setCopied] = useState(false);
    const[copyIcon, setCopyIcon] = useState('none');
   

    const validateURL =(string)=>{
        return string.match(HTTP_URL_VALIDATOR_REGEX);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Check whether the link is correct or not
        if(validateURL(link)){
        getLink();
        setLink('');
        setIsLoading(!isLoading);
        setSeverity('success');
        setAlertTitle('Short URL:')
        setCopyIcon('inline');
    }
        else{
            var err="Please Input a valid URL";
            setShort(err);
            setSeverity('error');
            setAlertTitle('Error');
            setCopyIcon('none');
        }
    };

    const getLink = async () =>{
        await shrtcode
        .get(`shorten?url=${link}`)
        .then((response)=>{
            var res= response.data.result.short_link;
            setShort(res);
            setTextCopied(res);
            setIsLoading(false);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return (
        <>

        {/* The search box */ }
        <div style={{width: '350px'}}>
        <form onSubmit={(e)=> handleSubmit(e)} style={{ display:'flex', flexDirection:'column' }}>
            <TextField 
            style={{ marginBottom : '20px'}}
            label="Input Your Link"
            variant="outlined"
            value={link}
            onChange={(e)=>setLink(e.target.value)}
            />
            {!isLoading && (
            <Button onClick={(e)=> handleSubmit(e)} variant="contained" color="primary">
                Submit
            </Button>
            
            )}
            {isLoading && <LinearProgress/>}
        </form>
   
        
        {/*Result box*/}
         <Alert severity={severity}><AlertTitle style={{fontSize:'1.1rem'}}>{alertTitle}</AlertTitle> <span style={{fontSize:'1rem'}}>{short}</span> 
         <CopyToClipboard text={JSON.stringify(textCopied)} onCopy={()=> setCopied(true)}>
        <FontAwesomeIcon className="copyIcon" style={{display:`${copyIcon}`,marginLeft: '120px'}} icon={faCopy} size="lg"  />
        </CopyToClipboard>
         </Alert>
        </div>
         
          </>
    );
};

export default Search;