import { FlatList, Modal } from 'react-native';
import { IProduct } from '../../product';
import { CloseButton,
  Footer,
  FooterContainer,
  Header,
  Image,Ingredient,
  IngredientesContainer,
  ModalBody,
  Price} from './style';
import { Text } from '../Text';
import { Close } from '../Icons/Close';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Categories/Button';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: IProduct | null;
  onAddToCart: (product: IProduct) => void;
}

export function ProductModal({visible, onClose, product, onAddToCart}: ProductModalProps){
  if(!product) return null;

  function handleAddToCart(product: IProduct){
    onAddToCart(product!);
    onClose();
  }

  return(
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.3.24:3001/uploads/${product.imagePath}`
        }}
      >
        <CloseButton onPress={onClose}>
          <Close/>
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight='600'>{product.name}</Text>
          <Text  color='#666' style={{marginTop: 8}}>{product.description}</Text>
        </Header>

        {!!product.ingredients.length && (
          <IngredientesContainer>
            <Text weight='600' color='#666'>Ingredientes</Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={ingredients => ingredients._id}
              style={{marginTop: 16}}
              renderItem={({item: ingredient}) => (
                <Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color='#666' style={{marginLeft: 20}}>{ingredient.name}</Text>
                </Ingredient>
              )}
            />
          </IngredientesContainer>

        )}
      </ModalBody>
      <Footer>
        <FooterContainer>
          <Price>
            <Text color='#666'>Preço</Text>
            <Text size={20} weight='600'>{formatCurrency(product.price)}</Text>
          </Price>
          <Button onPress={() => handleAddToCart(product)}>
                  Adicionar ao pedido
          </Button>
        </FooterContainer>

      </Footer>
    </Modal>
  );
}
