import jsPDFInvoiceTemplate ,{OutputType} from "jspdf-invoice-template";
import { IonButton } from "@ionic/react";
import { useSelector } from "react-redux";
import moment from 'moment'
import { UserOrders } from "../Actions";
import TPGLOGO from '../static/favicon.png';
export default function CreateINvoice(){
    const userOrder=useSelector((state)=>state.OrderReducer.selectedorder)
    const User=useSelector((state)=>state.UserReducer.User)
    const productsdata=userOrder?.productsdata;
    const props={
        outputType: OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Invoice 2021",
        orientationLandscape: false,
        logo: {
            src: TPGLOGO,
            width: 50.33, //aspect ratio = width/height
            height: 45.66,
            margin: {
                top: -11, //negative or positive num, from the current position
                left: -9//negative or positive num, from the current position
            }
        },
        business: {
            name: "ThePetalGlow",
            address: "Opp. Vipul Plaza,Faridabad,Haryana,121004",
            phone: "(+1) 7278771267",
            email: "services@thepetalglow.com",
            email_1:"thepetalglow@gmail.com",
            website: "www.thepetalglow.com",
        },
        contact: {
            label: "Invoice issued for:",
            name: User?.username,
            address: `${userOrder?.shippingAddress?.hno},${userOrder?.shippingAddress?.society},${userOrder?.shippingAddress?.pincode}`,
            phone: User?.mobile,
            email: User?.email,
        },
        invoice: {
            label: "Invoice #: ",
            num:userOrder?.receipt,
            invDate: `Payment Date: ${(userOrder?.createdAt)?moment(userOrder?.updatedAt).format("LLL"):userOrder?.createdAt} `,
            invGenDate: `Invoice Date:${(userOrder?.createdAt)?moment(userOrder?.createdAt).format("LLL"):userOrder?.createdAt}`,
            headerBorder: false,
            tableBodyBorder: false,
            header: ["#", "PRODUCT","HSN", "PRICE", "QTY.", "CGST(%)", "SGST(%)","TAX AMT","TOTAL"],
            table: Array.from(productsdata, (item, index)=>([
                index + 1,
                (item.name)+
               (item?.addons[0]?.whitepebbles?.isAdded?`+${item?.addons[0]?.whitepebbles?.quantity}addonwhite`:'')+
               (item?.addons[1]?.blackpebbles?.isAdded?`+${item?.addons[1]?.blackpebbles?.quantity}addonblack`:'')+
               (item?.addons[2]?.BlackWhitepebbles?.isAdded?`+${item?.addons[2]?.BlackWhitepebbles?.quantity}addonBlack&White`:'')+
               (item?.addons[3]?.colouredpebbles?.isAdded?`+${item?.addons[3]?.colouredpebbles?.quantity}addonColoured`:''),
                '0602',
                 item?.price,
                 item?.quantity,
                 0,
                 0,
                 0,
                 (item?.price)*(item?.quantity)
            ])),
            invTotalLabel: "Total:",
            invTotal:`${userOrder?.total}` ,
            invCurrency: "INR",
            row1: {
                col1: 'TAX:',
                col2: '0',
                col3: 'INR',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            row2: {
                col1: 'SubTotal:',
                col2: `${userOrder?.total}`,
                col3: 'INR',
                style: {
                    fontSize: 10 //optional, default 12
                }
            },
            invDescLabel: "Invoice Note",
            invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
        },
        footer: {
            text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    }

     const savePdf1=()=>{
        const outputTypes = jsPDFInvoiceTemplate(props);
        console.log("pdf"+outputTypes)
     }
    return (
        <div>
             <IonButton color="medium" style={{width:'100%'}} onClick={()=>savePdf1()}>
                        Download Invoice
                        </IonButton>
      </div>
    )
}