import React from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

export const showErrMsg = (msg) => {
     return ( 
     <ToastContainer>
        <Toast>            
            <Toast.Body>{msg}</Toast.Body>
        </Toast>        
    </ToastContainer>
    )
}

export const showSuccessMsg = (msg) => {
    return ( 
        <ToastContainer>
           <Toast>               
               <Toast.Body>{msg}</Toast.Body>
           </Toast>        
       </ToastContainer>
       )
}