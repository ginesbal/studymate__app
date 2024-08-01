import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface CustomAlertModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

const CustomAlertModal: React.FC<CustomAlertModalProps> = ({
  visible,
  onClose,
  message,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  okButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  okButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default CustomAlertModal;
