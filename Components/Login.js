import React from 'react';
import { Button, Text, View,TextInput,StyleSheet,Image } from 'react-native';

const Login = ({navigation}) => {
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState(null);
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image source={require('../assets/logodesign1.png')} style={{height:200,width:190}}>

        </Image>
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
            />
        </View>
        <Text style={{color:"blue",margin:10,marginBottom:15}}>Forgot Password?</Text>
        <Button title="           Log In           " style={{}}
                onPress={() => navigation.replace('Homepage')}
        >
            Log In
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      width: 200,
      borderWidth: 1,
      padding: 10,
    },
  });
export default Login;