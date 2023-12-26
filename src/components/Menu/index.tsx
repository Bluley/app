import { FlatList, TouchableOpacity } from 'react-native';
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
export function Menu() {
  return(
    <FlatList
      data={products}
      style={{marginTop: 32}}
      contentContainerStyle={{paddingHorizontal: 24}}
      ItemSeparatorComponent={Separator}
      keyExtractor={product => product._id}
      renderItem={({item: product}) => (
        <Product>
          <ProductImage source={{
            uri: `http://192.168.3.24:3001/uploads/${product.imagePath}`
          }}/>
          <ProductDetails>
            <Text weight='600'>{product.name}</Text>
            <Text size={14} color='#666'>{product.description}</Text>
            <Text>{formatCurrency(product.price)}</Text>
          </ProductDetails>

          <AddToCartButton>
            <PlusCircle/>
          </AddToCartButton>
        </Product>

      )}
    />
  );

}
