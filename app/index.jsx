import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";

export default function Index() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [destinationPhoneNumber, setDestinationPhoneNumber] = useState("");
  const [points, setPoints] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [additionalInput, setAdditionalInput] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Update modal content when `destinationPhoneNumber` or `points` are updated
    if (currentStep === 4) {
      setModalContent(
        `Hati2 penipuan. Anda akan Transfer Pulsa ${points} ke nomor ${destinationPhoneNumber} ? (Biaya 1850 & 1Poin undian TP iPhone14)\n1.Ya\n9.Back\n0.Home`
      );
    }
  }, [destinationPhoneNumber, points, currentStep]);

  const handlePress = () => {
    console.log("Dialing:", phoneNumber);
    if (phoneNumber === "*858#") {
      setModalVisible(true);
      setCurrentStep(1);
      setModalContent(
        "Mau iPad Gen10 dr Shani Indira? Hub di *500*784#\n1. Transfer pulsa\n2. Minta pulsa\n3. Auto TP\n4. Delete Auto TP\n5. List Auto TP\n6. Cek Kupon Undian TP"
      );
    }
  };

  const handleAdditionalInputSubmit = () => {
    if (currentStep === 1) {
      if (additionalInput === "1") {
        setCurrentStep(2);
        setModalContent(
          "Silahkan masukkan nomor tujuan Transfer Pulsa: (contoh: 08xxxx atau 628xxxx)"
        );
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
      setDestinationPhoneNumber(additionalInput);
      setModalContent(
        "Silahkan masukkan jumlah pulsa yang akan ditransfer : (min 5000, max 1 jt & tanpa . (titik) atau , (koma))"
      );
    } else if (currentStep === 3) {
      setCurrentStep(4);
      setPoints(additionalInput);
      // The modal content will be updated in the useEffect hook when `points` and `destinationPhoneNumber` are set
    } else if (currentStep === 4) {
      if (additionalInput === "1") {
        setCurrentStep(5);
        setModalContent(
          "Terima kasih permintaan Anda sedang diproses. Nonton Film & Series Original Maxstream di Bioskop MAXstream Hanya 1110/hr slm 360hr. Mau? CS: 188\n1.Ya\n2.Tidak"
        );
      }
    } else {
      setModalVisible(false);
      setCurrentStep(0);
      setPhoneNumber("");
    }

    setAdditionalInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="Enter phone number"
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <FontAwesomeIcon icon={faPhone} size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setCurrentStep(0); // Reset step on modal close
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <TextInput
              style={styles.additionalInput}
              placeholder="Input here"
              onChangeText={setAdditionalInput}
              value={additionalInput}
              onSubmitEditing={handleAdditionalInputSubmit}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    gap: 10,
    alignItems: "center",
    width: 200,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#048500FF",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "flex-start",
  },
  modalText: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 10,
  },
  additionalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
