import { Button } from "@material-ui/core"
import { getBillingTextForWhatsApp, openInNewTab } from "../../utils/helper"

const WhatsAppSendMessage = (props) =>{

    const getUrl = () =>
        window.innerWidth <= 768 ? 
        `whatsapp://send?phone=7814092325&text=${getBillingTextForWhatsApp(props.data)}`:
        `https://web.whatsapp.com/send?phone=${props.customerPhoneNumber}&text=${getBillingTextForWhatsApp(props.data)}`

    return <Button size="small" variant="outlined" onClick={()=>openInNewTab(getUrl())}>Send {props.title}</Button>
    
}

export default WhatsAppSendMessage