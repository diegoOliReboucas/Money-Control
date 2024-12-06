import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./Styles/themes/default"
import { GlobalStyle } from "./Styles/Global"
import { Transactions } from "./pages/Transactions/Index"
import { TransactionsProvider } from "./Contexts/TransactionContext"

function App() {
  return (
   <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />
    <TransactionsProvider>
      <Transactions />
    </TransactionsProvider>
   </ThemeProvider>
  )
}

export default App
