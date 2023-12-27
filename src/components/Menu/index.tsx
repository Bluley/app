import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { Text } from '../Text';
import {
  Product,
  ProductDetails,
  ProductImage,
  Separator,
  AddToCartButton } from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { useState } from 'react';
import { IProduct } from '../../product';
interface MenuProps{
  onAddToCart: (product: IProduct) => void;
}
export function Menu({onAddToCart}: MenuProps) {
  const [isModalVisivle, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | IProduct>(null);

  function handleOpenModal(product: IProduct) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return(
    <>
      <ProductModal
        onAddToCart={onAddToCart}
        visible={isModalVisivle}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}

      />
      <FlatList
        data={products}
        style={{marginTop: 32}}
        contentContainerStyle={{paddingHorizontal: 24}}
        ItemSeparatorComponent={Separator}
        keyExtractor={product => product._id}
        renderItem={({item: product}) => (
          <Product onPress={() => handleOpenModal(product)}>
            <ProductImage source={{
              uri: `http://192.168.3.24:3001/uploads/${product.imagePath}`
            }}/>
            <ProductDetails>
              <Text weight='600'>{product.name}</Text>
              <Text size={14} color='#666'>{product.description}</Text>
              <Text>{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle/>
            </AddToCartButton>
          </Product>

        )}
      />
    </>
  );

}
