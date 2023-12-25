import { Text } from "../Text";
import { Container} from "./styled";

export function Header(){
  return(
    <Container>
      <Text size={14} opacity={0.9}>Bem vindo(a) ao</Text>
      <Text size={24} weight="400">My
        <Text size={24} weight="700">Cardapy</Text>
      </Text>
    </Container>
  );
}
