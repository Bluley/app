import { Modal } from 'react-native';
import { Container, OkButton } from './style';
import { Text } from '../Text';
import { CheckCircle } from '../Icons/CheckCircle';
interface IOrderConfirmedModal{
  visible: boolean;
  onOK(): void;
}

export function OrderConfirmedModal({visible, onOK}: IOrderConfirmedModal){

  return(
    <Modal visible={visible} animationType="fade">
      <Container>
        <CheckCircle/>

        <Text size={20} weight='600' color='#fff' style={{marginTop: 12}}>Pedido confirmado</Text>
        <Text color='#fff' opacity={0.9} style={{marginTop: 4}}>O seu pedido já entrou na fila de produção!</Text>
        <OkButton onPress={onOK}>
          <Text size={16} weight='600' color='#d73035'>OK</Text>
        </OkButton>
      </Container>

    </Modal>
  );
}

