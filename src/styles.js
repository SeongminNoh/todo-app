import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleImg: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 170,
    height: 150,
  },
  appTitle: {
    fontSize: 32,
    color: '#333',
    marginBottom: 20,
  },
  appContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#FFFBF1',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  calendarContainer: {
    marginBottom: 20,
  },
  todoContainer: {
    backgroundColor: '#FFFEF8',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  todoTitle: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  todoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addTodoTitle: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  addButton: {
    marginLeft: 10,
  },
  plusImg: {
    width: 40,
    height: 40,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  todoInput: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  completeButton: {
    marginRight: 10,
  },
  cloudImg: {
    width: 40,
    height: 30,
  },
  todoText: {
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {},
  deleteImg: {
    width: 20,
    height: 20,
  },
});

export default styles;
