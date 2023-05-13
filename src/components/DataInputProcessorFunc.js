import React from "react";
import Clock from "./RenderingClockFunc";
import shortid from "shortid";

export default class DataProcessor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            timezone: '',
            clocksData: [],
            clocks: [],
        };
        this.timeout = null;
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // const id = shortid.generate()
        this.setState({ clocksData: [
            ...this.state.clocksData, 
            { id: shortid.generate(), name: this.state.name, timezone: this.state.timezone }
            // <Clock key={id} id={id} name={this.state.name} timezone={this.state.timezone} handleCliceClose={this.handleCliceClose}/>
        ]})
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        name === 'name' ? this.setState(((prevState) => ({...prevState, name: value}))) : this.setState(((prevState) => ({...prevState, timezone: value})))
    }

    handleCliceClose = (id) => {
        const filterClocks = this.state.clocks.filter(item => item.props.id !== id);
        const filterClocksData = this.state.clocksData.filter(item => item.id !== id);
        this.setState({ clocks: filterClocks, clocksData: filterClocksData });
    }

    clearTimeouts() {
        clearTimeout(this.timeout)
    }

    loadClock() {
        // const timeNow = new Date()

        // if (timeNow.getMilliseconds() = 0)
        setTimeout(() => {
            console.log('timeout')
            if (this.state.clocksData.length !== this.state.clocks.length) {
                console.log('timeout2')
                const renderingClocks = this.state.clocksData.filter((item, index) => {
                    if (!this.state.clocks[index]) { return item}
                return item.name === this.state.clocks[index].props.name
                })
                renderingClocks.forEach( item => this.setState({ clocks: [
                    ...this.state.clocks, 
                    <Clock key={item.id} id={item.id} name={item.name} timezone={item.timezone} handleCliceClose={this.handleCliceClose}/>
                ]}))
            }
            this.timeout = window.setTimeout(this.loadClock(), 1000)
        }, 1000)
    }
    
    componentDidMount() {
        this.loadClock()
        console.log('componentDidMount');
    }

    componentDidUpdate() {
        console.log('componentDidUpadate')
    }

    componentWillUnmount() {
        if (this.state.clocks.length === 0) {
            this.clearTimeouts()
        }
        console.log('componentWillUnmount')
    }

    render() {
        const { clocks } = this.state

        return (
            <div className="data-processor">
                <form className="form-processor" onSubmit={this.handleSubmit}>
                    <label className='label-processor'>
                        <span>Название</span>
                        <input className="input-name" name='name' required onChange={this.handleChange}></input>
                    </label>
                    <label className='label-processor'>
                        <span>Временная зона (+/-hhmm)</span>
                        <input className="input-timezone" name='timezone' pattern="^[-+][01][0-9][03]0$" required onChange={this.handleChange}></input>
                    </label>
                    <button className='form-btn'>Добавить</button>
                </form>
                <div className="clocks-place">
                    {clocks.map(item => item)}
                </div>
            </div>
        )
        
    }
}