import React from 'react'

const Refund = () => {
    let supportEmail="support@goolu.in"
    let address="House No. 142, Ground Floor, Street No. 5, Block B, Balvir Vihar, New Delhi, India, 110086"
    return (
        <div>
            <p>Refund policy</p>

            <p>We have a 14-day return policy, which means you have 14 days after receiving your item to request a return.</p>

            <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, 
                with tags, and in its original packaging. You&rsquo;ll also need the receipt or proof of purchase.</p>

            <p>To start a return, you can contact us at {supportEmail}. Please note that returns will need to be 
                sent to the following address: {address}</p>

            <p>If your return is accepted, we&rsquo;ll send you a return shipping label, as well as instructions
                 on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.</p>

            <p>You can always contact us for any return question at {supportEmail}.</p>

            <p>Damages and issues Please inspect your order upon reception and contact us immediately 
                if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>

            <p>Exceptions / non-returnable items Certain types of items cannot be returned, 
                like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items),
                 and personal care goods (such as beauty products). We also do not accept returns 
                 for hazardous materials, flammable liquids, or gases. Please get in touch if you have
                  questions or concerns about your specific item.</p>

            <p>Unfortunately, we cannot accept returns on sale items or gift cards.</p>

            <p>Exchanges The fastest way to ensure you get what you want is to return the item 
                you have, and once the return is accepted, make a separate purchase for the new item.</p>

            <p>Refunds We will notify you once we&rsquo;ve received and inspected your return, 
                and let you know if the refund was approved or not. If approved, you&rsquo;ll be 
                automatically refunded on your original payment method within 10 business days. 
                Please remember it can take some time for your bank or credit card company to process and 
                post the refund too. If more than 15 business days have passed since we&rsquo;ve approved
                 your return, please contact us at {supportEmail}.</p>

        </div>
    )
}

export default Refund