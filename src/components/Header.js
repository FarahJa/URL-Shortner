    import React from 'react'
    import url from './url.png';
    import AppBar from '@material-ui/core/AppBar';
    import {Box, Typography} from '@material-ui/core';
    
    const Header = () => {
        return (
        <div>
            <Box>
                <AppBar  style={{height: '60px' , display:'flex', flexDirection:'row' }}>   
                    <img style={{width: '45px', height: '45px',marginTop: '6px', marginLeft: '6px'}} src={url} alt="icon"/>
                    <Typography variant="h5" color="light" style={{marginLeft: '8px', marginTop: '15px'}}>Shorten URL</Typography>
                </AppBar>
            </Box>
        </div>
        )
    }
    
    export default Header
    
        