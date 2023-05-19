import React from "react";
import Clock from "./RenderingClockFunc";
import Preloader from "./PreloaderFunc";
import shortid from "shortid";

export default class DataProcessor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            timezone: '',
            clocksData: [],
            clocks: [],
            firstTimeStamp: '',
            preloader: false,
        };
        this.timeout = null;
    }

    handleSubmit = (e) => {
        e.preventDefault()
   
        if (this.state.preloader) {return null}
        this.setState({
            clocksData: [
                ...this.state.clocksData,
                { id: shortid.generate(), name: this.state.name, timezone: this.state.timezone }
            ]
        })
        this.setState({ preloader: true })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        name === 'name' ? this.setState(((prevState) => ({ ...prevState, name: value }))) : this.setState(((prevState) => ({ ...prevState, timezone: value })))
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
        if (this.state.clocksData.length !== this.state.clocks.length) {
            const renderingClocks = this.state.clocksData.filter((item, index) => {
                if (!this.state.clocks[index]) { return item }
                return item.name !== this.state.clocks[index].props.name
            })                                                                                  // создание массива часов которые необходимо отрисовать
            if (!this.state.clocks[0]) {
                renderingClocks.forEach(item => this.setState({
                    clocks: [
                        ...this.state.clocks,
                        <Clock key={item.id} id={item.id} name={item.name} timezone={item.timezone} handleCliceClose={this.handleCliceClose} />
                    ]
                }))                                                                             // отрисовка первых часов приложения
                this.setState({ firstTimeStamp: new Date().getMilliseconds() })                 // установка временной метки (милисекунд) начала движения секундной стрелки (шаблон для последующих часов)
                this.setState({ preloader: false })
            } else {
                if (new Date().getMilliseconds() - this.state.firstTimeStamp < 10 && new Date().getMilliseconds() - this.state.firstTimeStamp > 0) {
                    renderingClocks.forEach(item => this.setState({
                        clocks: [
                            ...this.state.clocks,
                            <Clock key={item.id} id={item.id} name={item.name} timezone={item.timezone} handleCliceClose={this.handleCliceClose} />
                        ]
                    }))                                                                         // если погрешность между отрисовкой новых часов и временной меткой начала движения секундной стрелки первых часов меньше 10, то часы отрисуються
                    this.setState({ preloader: false })
                } else {
                    setTimeout(() => {
                        console.log('timeout')
                        this.loadClock()
                    }, 10)                                                                      // если нет, то функция будет вызываться до тех пор, пока не будет соблюдено условие выше
                }
            }
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate() {
        this.loadClock()
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
                        <input className="input-timezone" name='timezone' pattern="^[-+][012][0-9][03][0]|[+-][012][0-9]4{1}5{1}|[012][0-9][03][0]|[012][0-9]4{1}5{1}$" required onChange={this.handleChange}></input>
                    </label>
                    <button className='form-btn'>Добавить</button>
                </form>
                <div className="clocks-place">
                    {clocks.map(item => item)}
                    {this.state.preloader ? <Preloader /> : null}
                </div>
            </div>
        )

    }
}