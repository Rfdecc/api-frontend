import { FaTrashAlt } from 'react-icons/fa'
import { useCart } from '../../../../hooks/useCart'

import { confirmOrder } from '../../../../components/ConfirmOrder'

import { currencyFormat } from '../../../../helpers/currencyFormat'

import minusImg from '../../../../assets/circle-minus.svg'
import plusImg from '../../../../assets/circle-plus.svg'

import { Container } from './style'

import styles from './styles.module.css'

import { saveOrder } from '../../../../services/api'
import { useUser } from '../../../../hooks/useUser'

export function TableDesktop() {
  const { cart, removeSnackFromCart, snackCartIncrement, snackCartDecrement } = useCart()

  const { getAuthUser } = useUser()

  const authUser = getAuthUser()

  const confirmarPedido = () => {
    //console.log(cart)
    const order = {
      username: getAuthUser().username,
      order: cart,
    }

    saveOrder(order)
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Lanche</th>
            <th>Qtd</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={`${item.snack}-${item.id}`}>
              <td>
                <img src={item.image} alt={item.name} />
              </td>
              <td>
                <h4>{item.name}</h4>
                <span>{currencyFormat(item.price)}</span>
              </td>
              <td>
                <div>
                  <button type='button' onClick={() => snackCartDecrement(item)}>
                    <img src={minusImg} alt='Remover quantidade' />
                  </button>
                  <span>{`${item.quantity}`.padStart(2, '0')}</span>
                  <button type='button' onClick={() => snackCartIncrement(item)}>
                    <img src={plusImg} alt='Adicionar quantidade' />
                  </button>
                </div>
              </td>
              <td>
                <h5>{currencyFormat(item.subtotal)}</h5>
              </td>
              <td>
                <button type='button' onClick={() => removeSnackFromCart(item)}>
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ margin: 'auto', textAlign: 'center' }}>
        {authUser.username !== '' && (
          <button className={styles.confirmarPedido} onClick={confirmarPedido}>
            Confirmar Pedido
          </button>
        )}
        {authUser.username === '' && (
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <br />
            <br />
            <p>Para confirmar seu pedido vc precisa estar logado no sistema.</p>
          </div>
        )}
      </div>
    </Container>
  )
}
