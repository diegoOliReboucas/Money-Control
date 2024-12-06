import { HeaderContainer, HeaderContent, NewTransactionButton } from "./Styled";
import LogoImg from '../../assets/Logo.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionModal } from "../NewTransactionModal/Index";

export function Header() {
    return (
        <HeaderContainer>
            <HeaderContent>
                <img src={LogoImg} alt="" />
                
                <Dialog.Root>
                    <Dialog.Trigger asChild>
{/* //Esse Dialog trigger precisa ficar em volta do botao. Na verdade ele ja é um botao, por isso usamos a propriedade asChild nele, para que ele aproveite o botao que ja existe */}
                        <NewTransactionButton>Nova Transação</NewTransactionButton>
                    </Dialog.Trigger>

                    <NewTransactionModal />
                </Dialog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}