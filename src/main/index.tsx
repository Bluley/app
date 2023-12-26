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
export function Main(){
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');


  function hadleOnSave(table: string){
    Alert.alert('Mesa salva com sucesso!');
    setSelectedTable(table);
  }

  return(
    <>
      <Container>
        <Header/>
        <CategoriesContainer>
          <Categories/>
        </CategoriesContainer>
        <MenuContainer>
          <Menu/>
        </MenuContainer>
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setModalVisible(true)} >
           Novo pedido
            </Button>
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

