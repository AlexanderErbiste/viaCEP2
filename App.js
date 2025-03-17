import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, View, ImageBackground } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { useState } from 'react';

export default function App() {
  const [cep, setCep] = useState("");
  const [render, setRender] = useState({});

  const BuscaCep = async () => {
    const cepRegex = /^[0-9]{8}$/;
    if (!cepRegex.test(cep)) {
      Alert.alert("CEP Inválido", "O CEP deve conter exatamentwe 8 números.");
      return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
      const response = await fetch(url);
      const dados = await response.json();

      if (dados.erro) {
        Alert.alert("CEP não encontrado", "Verifique se o CEP está correto.");
        setRender({});
      } else {
        setRender(dados);
      }
    } catch (erro) {
      console.log(erro);
      Alert.alert("Erro", "Ocorreu um erro na busca do CEP.");
    }
  };

  const NovaBusca = () => {
    setCep("");
    setRender({});
  };

  return (
    <ImageBackground 
      source={require('./assets/bussola.jpg')} 
      style={styles.background} 
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Via Cep</Text>

        <TextInput
          label="CEP:"
          mode="outlined"
          keyboardType="numeric"
          maxLength={8}
          value={cep}
          onChangeText={(value) => setCep(value.replace(/\D/g, ""))}
          onSubmitEditing={BuscaCep}
          style={styles.input}
          theme={{ colors: { primary: '#000', background: '#f0f0f0', text: "#000" } }} 
        />

        <Button 
          icon="magnify"
          onPress={BuscaCep}
          mode="contained"
          style={styles.button}
        >
          Buscar
        </Button>

        <TextInput 
          label="Endereço" 
          value={render.logradouro || ""} 
          mode="outlined" 
          disabled 
          style={styles.input} 
          theme={{ colors: { text: "#000" } }} 
        />

        <TextInput 
          label="Bairro" 
          value={render.bairro || ""} 
          mode="outlined" 
          disabled 
          style={styles.input} 
          theme={{ colors: { text: "#000" } }} 
        />

        <TextInput 
          label="Cidade" 
          value={render.localidade || ""} 
          mode="outlined" 
          disabled 
          style={styles.input} 
          theme={{ colors: { text: "#000" } }} 
        />

        <TextInput 
          label="Estado" 
          value={render.uf || ""} 
          mode="outlined" 
          disabled 
          style={styles.input} 
          theme={{ colors: { text: "#000" } }} 
        />

        <Button 
          icon="refresh"
          onPress={NovaBusca}
          mode="contained"
          style={styles.button}
        >
          Nova Busca
        </Button>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 20,
  },
  input: {
    width: '70%',  
    backgroundColor: '#f0f0f0',  
    color: '#000',  
    marginVertical: 10,  
    fontWeight: "bold",  
  },
  button: {
    marginTop: 20,  
    width: '50%', 
  },
});

