import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SumamaryContainer, SummaryCard } from "./Styled";
import { priceFormat } from "../../utils/Formater";
import { useSummary } from "../../hooks/useSummary";

export function Summary() {
    const summary = useSummary();

    return (
        <SumamaryContainer>
            <SummaryCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e"/>
                </header>

                <strong>{priceFormat.format(summary.income)}</strong>
            </SummaryCard>

            <SummaryCard>
                <header>
                    <span>Saidas</span>
                    <ArrowCircleDown size={32} color="#f75a68"/>
                </header>

                <strong>{priceFormat.format(summary.outcome)}</strong>
            </SummaryCard>

            <SummaryCard variant='green'>
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff"/>
                </header>

                <strong>{priceFormat.format(summary.total)}</strong>
            </SummaryCard>
        </SumamaryContainer>
    )
}