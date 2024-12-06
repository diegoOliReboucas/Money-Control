import { MagnifyingGlass } from "phosphor-react";
import { SeatchFormContainer } from "./Styled";
import { useForm } from "react-hook-form";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useContext } from "react";
import { TransactionContext } from "../../../Contexts/TransactionContext";

const searchFormSchema = z.object({
    query: z.string(),
})

type SearchFormInput = z.infer<typeof searchFormSchema>

export function SearchForm() {
    const {fetchTransactions, transactions} = useContext(TransactionContext)
    const { register, handleSubmit, formState: {isSubmitting}} = useForm<SearchFormInput>({
        resolver: zodResolver(searchFormSchema),
    })

    async function handleSearchTransactions(data: SearchFormInput){
       await fetchTransactions(data.query)
       console.log(data);
       console.log(transactions);
       
       
    }

    return (
        <SeatchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input 
                type="text" 
                placeholder="Busque por transações" 
                {...register('query')}
            />
            
            <button type="submit" disabled={isSubmitting}>
{/* Nessa parte do codigo, ele desabilita o botao enquanto esta em processo de submit */}
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SeatchFormContainer>
    )
}