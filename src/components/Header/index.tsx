import { TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Container, Content, OderHeader, Table} from './styled';

interface HeaderProps{
  selectedTable: string;
  onCancelOrder: () => void;
}

export function Header({selectedTable, onCancelOrder}: HeaderProps){
  return(
    <Container>
      {!selectedTable && (
        <>
          <Text size={14} opacity={0.9}>Bem vindo(a) ao</Text>
          <Text size={24} weight="400">
            My
            <Text size={24} weight="700">Cardapy</Text>
          </Text>
        </>
      )}


      {selectedTable && (
        <Content>
          <OderHeader>
            <Text size={24} weight='600'>Pedido</Text>
            <TouchableOpacity onPress={onCancelOrder} >
              <Text size={14} weight='600' color='#D73035'>Cancelar</Text>
            </TouchableOpacity>
          </OderHeader>

          <Table>
            <Text color='#666'>Mesa  {selectedTable}</Text>
          </Table>
        </Content>
      )}

    </Container>
  );
}
