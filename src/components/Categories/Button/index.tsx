import { ActivityIndicator } from 'react-native';
import { Text } from '../../Text';
import { Container } from './style';

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabeld?: boolean;
  loading?: boolean;
}

export function Button({children, onPress, disabeld, loading}: ButtonProps){
  return (
    <Container onPress={onPress} disabled={disabeld || loading}>
      {!loading && (
        <Text weight='600' color="#fff">{children}</Text>
      )}

      {loading && (
        <ActivityIndicator color='#fff' size='small'/>

      )}
    </Container>
  );
}
