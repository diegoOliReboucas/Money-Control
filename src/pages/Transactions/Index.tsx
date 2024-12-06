import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header/Index";
import { Summary } from "../../components/Summary/Index";
import { SearchForm } from "./SearchForm/Indes";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./Styled";
import { TransactionContext } from "../../Contexts/TransactionContext";
import { dateFormater, priceFormat } from "../../utils/Formater";

export function Transactions() {    
    const {transactions} = useContext(TransactionContext)

    return (
        <div>
            <Header />
            <Summary />

        <TransactionsContainer>
            <SearchForm />
            <TransactionsTable>
                <tbody>
                    {transactions.map((item) => (
                    <tr key={item.id}>
                        <td width='50%'>{item.description}</td>
                        <td>
                            <PriceHighlight variant={item.type}>
                                {item.type == 'outcome' && '- '}
                                {priceFormat.format(item.price)}
                            </PriceHighlight>
                        </td>
                        <td>{item.category}</td>
                        <td>{dateFormater.format(new Date(item.createdAt))}</td>
                    </tr>
                    ))}
                </tbody>
            </TransactionsTable>
        </TransactionsContainer>
        </div>
    )
}