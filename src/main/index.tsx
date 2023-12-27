import { Categories } from '../components/Categories';
import { Button } from '../components/Categories/Button';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Text } from '../components/Text';
import { TableModal } from '../components/TableModal';
import { Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer} from './styles';
import { useState } from 'react';
import { Cart } from '../components/Cart';
import { CartItem } from '../CartItem';
import { IProduct } from '../product';
import { ActivityIndicator } from 'react-native';
import { products as mockProducts } from '../mocks/products';
import { Empty } from '../components/Icons/Empty';

export function Main(){
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItens, setCartItens] = useState<CartItem[]>([]);
  const [isLoding] = useState(false);
  const [products] = useState<IProduct[]>(mockProducts);

  function hadleOnSave(table: string){
    setSelectedTable(table);
  }

  function handleResetOrder(){
    setSelectedTable('');
    setCartItens;
  }

  function handleAddToCart(product: IProduct){
    if(!selectedTable){
      setModalVisible(true);
    }

    setCartItens(oldItens => {
      const itemIndex = oldItens.findIndex(item => item.product._id === product._id);

      if(itemIndex < 0){
        return oldItens.concat({
          product,
          quantity: 1,
        });
      }

      const newCartItens = [...oldItens];
      const item = newCartItens[itemIndex];

      newCartItens[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };
      return newCartItens;
    });
  }

  function handleRemoveFromCart(product: IProduct){
    setCartItens(oldItens => {
      const itemIndex = oldItens.findIndex(item => item.product._id === product._id);

      const item = oldItens[itemIndex];

      const newCartItens = [...oldItens];

      if(item.quantity === 1){
        newCartItens.splice(itemIndex, 1);


        return newCartItens;
      }


      newCartItens[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };
      return newCartItens;

    });
  }

  return(
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />
        {isLoding && (
          <CenteredContainer>
            <ActivityIndicator size='large' color='#D73035'/>
          </CenteredContainer>

        )}

        {!isLoding && (
          <>
            <CategoriesContainer>
              <Categories/>
            </CategoriesContainer>

            {products.length > 0 ? (
              <MenuContainer>

                <Menu onAddToCart={handleAddToCart} products={products}/>

              </MenuContainer>
            ): (
              <CenteredContainer>
                <Empty/>
                <Text color='#666'>Nenhum produto foi encontrado!</Text>
              </CenteredContainer>

            )}
          </>


        )}
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setModalVisible(true)} disabeld={isLoding}>
           Novo pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItens={cartItens}
              onAdd={handleAddToCart}
              onDecrement={handleRemoveFromCart}
              onConfirmOrder={handleResetOrder}
            />

          )}
        </FooterContainer>
      </Footer>


      <TableModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={hadleOnSave}

      />

    </>
  );
}

