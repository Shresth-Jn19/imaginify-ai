'use server';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { handleError } from '../utils';
import connectToDatabase from '../database/mongoose';
import Transaction from '../database/models/transaction.model';
import { updateCredits } from './users.actions';

// process payment
export async function checkoutCredits(transaction: CheckoutTransactionParams) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const amount = Number(transaction.amount) * 100;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'INR',
                    unit_amount: amount,
                    product_data: {
                        name: transaction.plan,
                    },
                },
                quantity: 1,
            }
        ],
        metadata: {
            plan: transaction.plan,
            credits: transaction.credits,
            buyerId: transaction.buyerId,
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    })

    redirect(session.url!);
}


// create transaction record in the database
export async function createTransactions(transaction: CreateTransactionParams) {
    try{
        await connectToDatabase();

        const newTransaction = await Transaction.create({
            ...transaction, buyer: transaction.buyerId
        })

        await updateCredits(transaction.buyerId, transaction.credits);

        return JSON.parse(JSON.stringify(newTransaction));
    }
    catch(error) {
        handleError(error);
    }
}