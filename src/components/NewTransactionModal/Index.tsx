import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './Styled'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { TransactionContext } from '../../Contexts/TransactionContext'

const newTransactionFormaSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type newTransactionFormInputs = z.infer<typeof newTransactionFormaSchema>

export function NewTransactionModal() {
    const {createTransactions} = useContext(TransactionContext)
    const { register, handleSubmit, control, reset } = useForm<newTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormaSchema),
        defaultValues: {
            type: 'income'
        }
    })

async function handleCreateNewTransaction (data: newTransactionFormInputs){
    const {description, price, category, type} = data

    await createTransactions({
        description,
        price,
        category,
        type
    })

    reset();
}

    return (
        <Dialog.Portal>
{/* Portal é uma funcionalidade do proprio react que faz com que os elementos dentro dele fiquem sobrepostos a outros elementos. Por exemplo, esse modal nao faria sentido ficar apenas no Header, por que ele precisa ficar no meio da tela */}
            <Overlay />
{/*Dialog.Overlay É usado para fazer o fundo preto que fica atras do modal, com uma opacidade menor */}
        
            <Content>
{/*Dialog.Content é o conteudo em si do modal */}
            <Dialog.Title>Nova Transação</Dialog.Title>
{/* Caso o modal tenha um titulo, é interessante colocar ele dentro do DialogTitle, é usado para anunciar para o leitor de tela que tipo de modal é esse */}

                <CloseButton><X size={24}/></CloseButton>
{/*Dialog.Close Basicamente é o botao para fechar o modal */}   

            <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                <input type="text" placeholder='Descrição' required {...register('description')}/>
                <input type="number" placeholder='Preço' required {...register('price', {valueAsNumber: true})}/>
                <input type="text" placeholder='Categoria' required {...register('category')}/>

{/* usamos o componente Controller, sempre que quisermos controlar algum formulario que nao é nativo do HTML, como por exemplo esses campos do radix-ui */}
                <Controller 
                    control={control}
                    name='type'
                    render={({field}) => {
                        return (
                        <TransactionType onValueChange={field.onChange} value={field.value}>
                            <TransactionTypeButton value='income' variant='income'>
                                <ArrowCircleUp size={24}/>
                                Entrada
                            </TransactionTypeButton>
        
                            <TransactionTypeButton value='outcome' variant='outcome'>
                                <ArrowCircleDown size={24}/>
                                Saida
                            </TransactionTypeButton>
                        </TransactionType>
                        )
                    }}
                />

                <button type='submit'>Cadastrar</button>
            </form>
        

            </Content>
        </Dialog.Portal>
    )
}