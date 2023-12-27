import { useState } from 'react';
import { FlatList } from 'react-native';
import { Text } from '../Text';
import { Category, Icon } from './style';
import { CategoryProps } from '../../Category';


interface CategoriesProps{
  categories: CategoryProps[];
  onSelectCategory: (categoryId: string) => Promise<void>;

}


export function Categories({categories, onSelectCategory}: CategoriesProps) {
  const [selectCategory, setSelectCategory] = useState('');
  function handleSelectCategory(categoryId: string){
    const category = selectCategory === categoryId ? '' : categoryId;
    onSelectCategory(category);
    setSelectCategory(category);
  }

  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}

      data={categories}
      contentContainerStyle={{paddingRight: 24}}
      keyExtractor={category => (category._id)}
      renderItem={({item: category}) => {
        const isSelect = selectCategory === category._id;
        return(
          <Category onPress={() => handleSelectCategory(category._id)}>
            <Icon>
              <Text opacity={isSelect ? 1 : 0.5}>
                {category.icon}
              </Text>
            </Icon>

            <Text size={14} weight='700' opacity={isSelect ? 1 : 0.5}>{category.name}</Text>
          </Category>
        );
      }}
    />
  );}
