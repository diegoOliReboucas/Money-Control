import { createContext, ReactNode, useEffect, useState } from "react";
import { API } from "../Axios";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string
}

interface CreateTransactionInput {
    description: string;
    price: number;
    category: string;
    type: 'income' | 'outcome'
}

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransactions: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionContext = createContext({} as TransactionContextType)

interface TransactionProviderProps {
    children: ReactNode
}

export function TransactionsProvider({children}: TransactionProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])
    
    async function fetchTransactions(query?: string) {
        const response = await API.get('transactions', {
            params: {
                _sort: 'createdAt',
                _order: 'desc',
                q: query
            }
        })
        setTransactions(response.data)
    }

    async function createTransactions(data: CreateTransactionInput) {
        const {description, price, category, type} = data

        const response = await API.post('transactions', {
            description,
            price, 
            category, 
            type,
            createdAt: new Date()
        })

        setTransactions(state => [ response.data, ...state])
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionContext.Provider value={{transactions, fetchTransactions, createTransactions}}>
            {children}
        </TransactionContext.Provider>
    )
}