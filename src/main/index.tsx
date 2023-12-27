import { Alert } from 'react-native';
import { Categories } from '../components/Categories';
import { Button } from '../components/Categories/Button';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Container,
  CategoriesContainer,
  MenuContainer,
  Footer,
  FooterContainer} from './styles';
import { useState } from 'react';
import { Cart } from '../components/Cart';
import { CartItem } from '../CartItem';
import { products } from '../mocks/products';
export function Main(){
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItens, setCartItens] = useState<CartItem[]>([]);


  function hadleOnSave(table: string){
    Alert.alert('Mesa salva com sucesso!');
    setSelectedTable(table);
  }

  function handleCancelOrder(){
    setSelectedTable('');
  }

  return(
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />
        <CategoriesContainer>
          <Categories/>
        </CategoriesContainer>
        <MenuContainer>
          <Menu/>
        </MenuContainer>
      </Container>
      <Footer>
        {/* <FooterContainer> */}
        {!selectedTable && (
          <Button onPress={() => setModalVisible(true)}>
           Novo pedido
          </Button>
        )}

        {selectedTable && (
          <Cart cartItens={cartItens}/>

        )}
        {/* </FooterContainer> */}
      </Footer>


      <TableModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={hadleOnSave}
      />

    </>
  );
}

