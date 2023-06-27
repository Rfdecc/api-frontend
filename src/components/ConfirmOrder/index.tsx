import { useCart } from "../../hooks/useCart";

import { currencyFormat } from "../../helpers/currencyFormat"

import { Container } from "./style"

export function confirmOrder() {
    const { cart } = useCart()

    const totalAmount = cart.reduce((acc, item) => (acc += item.subtotal), 0)

    return (
        <Container>
            <button type='button'>Finalizar Pedido</button>
            <span>
                Total <strong>{currencyFormat(totalAmount)}</strong>
            </span>
        </Container>    
    )
}