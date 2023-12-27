import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../CartItem';
import { Text } from '../Text';
import { Actions, Item, ProductContainer, Image, QuantityContainer, ProductDetails, Sumary, TotalContainer } from './style';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Categories/Button';
import { IProduct } from '../../product';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { useState } from 'react';
import { api } from '../../utils/api';

interface CartProps{
  cartItens: CartItem[];
  onAdd(product: IProduct): void;
  onDecrement(product: IProduct): void;
  onConfirmOrder(): void;
  selectTable: string
}

export function Cart({cartItens, onAdd, onDecrement, onConfirmOrder, selectTable}: CartProps){
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const total = cartItens.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);

  async function handleConfirmOrder(){
    setIsLoading(true);
    const payload = {
      table: selectTable,
      products: cartItens.map(item => (
        {
          product: item.product._id,
          quantity: item.quantity
        }
      ))
    };

    await api.post('/orders', payload);
    setIsLoading(false);

    setIsModalVisible(true);

  }

  function handleOnOK(){
    setIsModalVisible(false);
    onConfirmOrder();
  }

  return(
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onOK={handleOnOK}
      />
      {cartItens.length > 0 && (
        <FlatList
          data={cartItens}
          style={{marginBottom: 20, maxHeight: 150}}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={true}
          renderItem={({item: cartItem}) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{uri: `http://192.168.3.24:3001/uploads/${cartItem.product.imagePath}`}}
                />

                <QuantityContainer>
                  <Text size={14} color='#666'>
                    {cartItem.quantity} x
                  </Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight='600'>
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color='#666' style={{marginTop: 4}}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity  style={{marginRight: 24}} onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Sumary>
        <TotalContainer>
          {cartItens.length > 0 ? (
            <>
              <Text color='#666'>Total</Text>
              <Text size={20} weight='600'>{formatCurrency(total)}</Text>
            </>
          ): (
            <Text color='#999'>
              Seu carrinho está vazio
            </Text>
          )}
        </TotalContainer>
        <Button  disabeld={cartItens.length === 0} onPress={handleConfirmOrder} loading={isLoading}>
          Confirmar pedido
        </Button>
      </Sumary>

    </>

  );

}
