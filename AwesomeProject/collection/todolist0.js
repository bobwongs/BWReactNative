import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  ListView,
  TouchableOpacity,
  StyleSheet,
  AppRegistry,
} from 'react-native'

export default class AwesomeProject extends Component {
  constructor() {
    super()
    // ds和todoList两变量没必要放到state,因为这两个变量不会用于渲染页面，因此没必要放进去
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.todoList = []
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
      inputText: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput onChangeText={(text) => { this.setState({ inputText: text }) }} multiline={true} placeholder='请输入事项' style={styles.input} />
          <Button title='添加' onPress={this._addRow.bind(this)}></Button>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
        />
      </View>
    )
  }
  // 单条数据视图
  _renderRow(rowData, sectionId, index) {
    return (
      <TouchableOpacity style={styles.row}>
        <Text style={[styles.rowText, { textDecorationLine: rowData.isFinish ? 'line-through' : 'none' }]}>{rowData.text}</Text>
        <Button onPress={this.deleteRow.bind(this,index)} title='删除'></Button>
      </TouchableOpacity>
    )
  }
  // 重新渲染列表
  _renderList() {
    this.setState({
      dataSource: this.ds.cloneWithRows(this.todoList)
    })
  }
  // 添加当条数据
  _addRow() {
    console.log('hi' + this.state.inputText)
    console.log('hello')
    this.todoList.push({ text: this.state.inputText })
    this._renderList()
  }
  deleteRow(index) {
    // 删除数组内元素
    console.log('hello')
    this.todoList.splice(index, 1)
    this._renderList()
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    justifyContent: 'center',
    paddingLeft: 10,
    fontSize: 14
  },
  row: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingLeft: 10,
    flexDirection: 'row'
  },
  rowText: {
    fontSize: 15,
    flex: 1
  }
})