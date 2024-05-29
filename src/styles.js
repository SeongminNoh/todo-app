import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  app: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFBF1',
    padding: 20,
  },
  titleImg: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 170,
    height: 150,
  },
  appTitle: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  appContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 40,
  },
  calendarContainer: {
    flex: 1,
    padding: 10,
  },
  dateText: {
    fontSize: 18,
  },
  todoContainer: {
    flex: 2,
    textAlign: 'left',
    padding: 10,
    backgroundColor: '#FFFEF8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  todoTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  todoInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addTodoTitle: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#0b79f7',
    borderRadius: 5,
  },
  plusImg: {
    width: 40,
    height: 40,
  },
  todoList: {
    listStyleType: 'none',
    padding: 0,
  },
  todoItem: {
    padding: 10,
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  todoText: {
    flex: 1,
    marginRight: 10,
  },
  completeButton: {
    padding: 5,
    borderRadius: 5,
  },
  cloudImg: {
    width: 40,
    height: 30,
  },
  deleteButton: {
    padding: 5,
    borderRadius: 5,
  },
  deleteImg: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
  todoInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  todoTitleText: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
});

export default styles;
