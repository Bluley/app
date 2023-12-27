import { Modal, TouchableOpacity } from 'react-native';
import { Text } from '../Text';
import { Form, Header, Input, ModalBody, Overlay } from './styles';
import { Close } from '../Icons/Close';
import { Button } from '../Categories/Button';
import { useState } from 'react';

interface TableModalProps{
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void

}

export function TableModal({visible, onClose, onSave}: TableModalProps){
  const [PropsInput, setPropsInput] = useState('');

  function handleSave(){
    setPropsInput('');
    onSave(PropsInput);
    onClose();
  }

  return(
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <Overlay behavior="padding">
        <ModalBody>
          <Header>
            <Text weight='600'>Informe a Mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color='#666'/>
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor='#666'
              keyboardType='number-pad'
              onChangeText={setPropsInput}
            />
            <Button onPress={handleSave} disabeld={PropsInput.length === 0} >
              {PropsInput.length === 0 ? 'Informe o número da mesa' : 'Confirmar'}
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
