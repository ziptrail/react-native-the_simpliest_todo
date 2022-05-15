import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Goal from './components/Goal';

export default function App() {
  const [goal, setGoal] = useState();
  const [goalItems, setGoalItems] = useState([]);

  const handleAddGoal = () => {
    Keyboard.dismiss();
    setGoalItems([...goalItems, goal])
    setGoal("");
  }

  const completeGoal = (index) => {
    let itemsCopy = [...goalItems];
    itemsCopy.splice(index, 1);
    setGoalItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
      <View style={styles.goalsWrapper}>
        <Text style={styles.sectionTitle}>Today's goals</Text>
        <View style={styles.items}>

          {/* Это неудаляемые заметки */}
          <Goal text={'First goal: Created BBQ Restaurant on React and Redux'}/>
          <Goal text={'Second goal: Created Clothing Store on React, Redux and Firebase'}/>
          <Goal text={'Third goal: Created this simple Todo :D'}/>
          {
            goalItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeGoal(index)}>  
                  <Goal text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeGoalWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a goal'} value={goal} onChangeText={text => setGoal(text)} />
        <TouchableOpacity onPress={() => handleAddGoal()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  goalsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeGoalWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});