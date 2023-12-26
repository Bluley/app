import { Text } from '../../Text';
import { Container } from './style';

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabeld?: boolean;
}

export function Button({children, onPress, disabeld}: ButtonProps){
  return (
    <Container onPress={onPress} disabled={disabeld}>
      <Text weight='600' color="#fff">{children}</Text>
    </Container>
  );
}
