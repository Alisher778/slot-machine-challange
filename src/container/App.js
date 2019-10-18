import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import { WheelWrapper, Button } from '../styles';
import '../styles/style.css'


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			autoStart: 1000,
			autoStop: 10000,
			message: { content: 'Please, start the game!', type: '' },
			start: null,
			timer: 0,
			wheel: 1,
			wheel2: 2,
			wheel3: 3
		};

		this.startTimer = this.startTimer.bind(this);
		this.startHandler = this.startHandler.bind(this);
		this.stopHandler = this.stopHandler.bind(this);
		this.resultHandler = this.resultHandler.bind(this);
	}

	componentWillUnmount() {
		this.startTimer(true);
	}

	startTimer(cancel) {
		const { start, timer } = this.state;
		let timeId;

		if (cancel) {
			clearTimeout(timeId);
			return this.setState({ timer: 0, start: false }, () => this.resultHandler());
		}

		if (start && timer < 9 && !cancel) {
			timeId = setTimeout(() => {
				this.setState(prevState => {
					return { timer: prevState.timer + 1 };
				}, () => this.startTimer());
			}, 1000);
		} else {
			clearTimeout(timeId);
			return this.setState({ timer: 0, start: false }, () => this.resultHandler());
		}
	}

	startHandler() {
		this.setState({ start: true, timer: 0 }, () => this.startTimer());
	}

	stopHandler() {
		this.setState({ start: false, timer: 0 }, () => {
			this.startTimer(true);
			this.resultHandler();
		})
	}

	resultHandler = () => {
		const { wheel, wheel2, wheel3 } = this.state;
		if (wheel === wheel2 && wheel2 === wheel3) {
			return this.setState({ message: { content: 'Hurry! JACKPOT', type: 'super' } })
		} else if (wheel === wheel2 || wheel2 === wheel3) {
			return this.setState({ message: { content: 'Well Done! You Won $20.', type: 'good' } })
		} else if (wheel === wheel3) {
			return this.setState({ message: { content: 'Good! You Won $10.', type: 'ok' } })
		} else {
			return this.setState({ message: { content: 'Sorry! Better luck next time.', type: 'bad' } })
		}
	}

	wheelSpinHandler = debounce(() => {
		if (this.state.start && this.state.timer < 10) {
			const wheel = Math.floor(Math.random() * Math.floor(4));
			const wheel2 = Math.floor(Math.random() * Math.floor(4));
			const wheel3 = Math.floor(Math.random() * Math.floor(4));
			return this.setState({
				wheel,
				wheel2,
				wheel3
			}, () => this.wheelSpinHandler());
		} else {
			return;
		}

	}, 50)


	render() {
		const { wheel, wheel2, wheel3, start, autoStart, timer, message } = this.state;

		if (start === null) {
			setTimeout(this.startHandler, autoStart);
		} else if (start && timer < 10) {
			this.wheelSpinHandler()
		}

		return (
			<div className="App">
				<Message message={message} />
				<WheelWrapper>
					<Spinner index={wheel} stop={start} />
					<Spinner index={wheel2} stop={start} />
					<Spinner index={wheel3} stop={start} />
				</WheelWrapper>
				<div>
					<Button onClick={this.stopHandler} id="stop">Stop</Button>
					<Button color="success" onClick={this.startHandler} id="start">Start</Button>
				</div>
			</div>
		);
	}
}

export default App;
