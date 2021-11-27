import Faq from "react-faq-component";
const data = {
    title: "Shipping and Refund Policiy",
    rows: [
        {
            title: "Same Day delivery Policy?",
            content: <p>As per our same day delivery policy your order should be confirmed before 4pm in order to get eligible for same day delivery otherwise it would count in next day delivery and thepetalglow is not responsible  in case if we are not able to fulfill your same day delivery due to some kind of issue,accident or pandemic.
            </p>
        },
        {
            title: "When will I receive my order?",
            content: <p>As per our same day delivery policy Your order will be dispatch within 1 to 2 working days ('for HomeTown,FARIDABAD only') after your transaction has been confirmed. You'll also get an order tracking number so you can keep track of your package.</p>,
        },
        {
            title: "Order Cancellation?",
            content: `Once an order has been confirmed, it cannot be cancelled, refunded or exchanged.`,
        },
        {
            title: "Who can Order?",
            content: `Currently we are offering services in Faridabad only,we are trying our best to reach you`,
        },
        {
            title: "Can I change Delivery Date?",
            content: `Yes,You can Change your order delivery date in customer care section`,
        },
        {
            title: "Refund?",
            content:
                "You will receive a refund into the source account within 5-7 days after cancelling your order if you paid by credit card, debit card, net banking, or payTM.",
        },
        {
            title: "Return / Exchange?",
            content: `After delivery, ThePetalGlow does not offer a product return or exchange policy. `,
        },
    ],
};
const styles = {
    // bgColor: 'white',
    titleTextColor: "#343439",
    rowTitleColor: "blue",
    // rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};
export default function ShippingPolicy(){
    return (
        <div style={{margin:"1rem"}}>
              <Faq
                data={data}
                styles={styles}
                config={config}
            />
        </div>
    )
}