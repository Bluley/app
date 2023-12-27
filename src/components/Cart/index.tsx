import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../CartItem';
import { Text } from '../Text';
import { Actions, Item, ProductContainer, Image, QuantityContainer, ProductDetails, Sumary, TotalContainer } from './style';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Categories/Button';

interface CartProps{
  cartItens: CartItem[];
}

export function Cart({cartItens}: CartProps){
  return(
    <>
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
                <TouchableOpacity  style={{marginRight: 24}}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity>
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
              <Text size={20} weight='600'>{formatCurrency(120)}</Text>
            </>
          ): (
            <Text color='#999'>
              Seu carrinho está vazio
            </Text>
          )}
        </TotalContainer>
        <Button onPress={() => alert('confirmar pedido')} disabeld={cartItens.length === 0}>
          Confirmar pedido
        </Button>
      </Sumary>

    </>

  );

}
