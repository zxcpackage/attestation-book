import React from 'react';
import Discipline from './discipline/Discipline';

class AppTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }

    handleClick() {
        this.setState((prevState) => ({count: prevState.count + 1}));
        this.setState((prevState) => ({count: prevState.count + 1}));
        this.setState((prevState) => ({count: prevState.count + 1}));
    }

    render() {
        return (
            <div>
                <h1>Тест модификаций React</h1>
                
                <button onClick={this.handleClick}>+</button>
                <div>Счётчик {this.state.count}</div>
                
                <Discipline key="1" id="1" style={{color: "red"}} content="Дисциплина 1">
                    <b>Описание дисциплины 1</b>
                </Discipline>
                
                <Discipline key="2" id="2" content="Дисциплина 2">
                    <i>Описание дисциплины 2</i>
                </Discipline>
                
                <Discipline key="3" id="3" content="Дисциплина 3" />
            </div>
        )
    }
}

export default AppTest;