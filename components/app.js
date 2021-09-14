import React, { Component } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Showcase from './showcase';
class App extends Component {
	state = {
		city: '',
		temp: 0,
		description: '',
		lowTemp: 0,
		highTemp: 0,
		sunrise: 0,
		sunset: 0,
		feelsLike: 0,
		humidity: 0,
		visibility: 0,
		windSpeed: 0,
		inputVal: ''
	};

	// * Gets Sunrise and Sunset Times
	getTime = (unix) => {
		let date = new Date(unix * 1000);
		let hours = date.getHours();
		let AmOrPm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12 || 12;
		let minutes = date.getMinutes();

		// TODO: Refactor this code to make it more effcient
		if (minutes in [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]) {
			minutes = '0' + minutes;
		}
		return hours + ':' + minutes + ' ' + AmOrPm;
	};

	onSearch = async (e) => {
		e.preventDefault();

		const apiKey = '5e4a28e87e467ba3224391dff8c180fd';
		const units = 'imperial';

		const value = this.state.inputVal;
		await this.setState({ city: value });

		await axios
			.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${apiKey}&units=${units}`)
			.then((res) => {
				// * Collecting the information for main div that has temperature, description, date, and time
				const { data } = res;
				const temp = data.main.temp;
				const description = data.weather[0].description;

				// * High and Low Temperatue
				const lowTemp = data.main.temp_min;
				const highTemp = data.main.temp_max;

				// * Sunrise and Sunset
				const sunrise = this.getTime(data.sys.sunrise);
				const sunset = this.getTime(data.sys.sunset);

				// * Feels Like
				const feelsLike = data.main.feels_like;

				// * Humidity
				const humidity = data.main.humidity;

				// * Visibility
				const visibility = data.visibility * 3.28084;

				// * Wind Speed
				const windSpeed = data.wind.speed;

				// * Main
				const main = data.weather[0].main;

				// * Updating temperature and description in state
				this.setState({ temp });
				this.setState({ description });
				this.setState({ lowTemp });
				this.setState({ highTemp });
				this.setState({ sunrise });
				this.setState({ sunset });
				this.setState({ feelsLike });
				this.setState({ humidity });
				this.setState({ visibility });
				this.setState({ windSpeed });
				this.setState({ main });

				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div>
				<form className="flex-container" onSubmit={this.onSearch}>
					<InputGroup className="mb-3 flex-item" id="input">
						<InputGroup.Prepend>
							<InputGroup.Text id="inputGroup-sizing-default">City</InputGroup.Text>
						</InputGroup.Prepend>
						{/* This is the Text Field */}
						<FormControl
							id="form-control"
							aria-label="Default"
							aria-describedby="inputGroup-sizing-default"
							placeholder="Enter City Name"
							onChange={(e) => this.setState({ inputVal: e.target.value })}
						/>
					</InputGroup>

					<Button className="flex-item" id="submit-button" type="submit">
						Search
					</Button>
				</form>

				<Showcase
					city={this.state.city}
					temp={this.state.temp}
					description={this.state.description}
					lowTemp={this.state.lowTemp}
					highTemp={this.state.highTemp}
					sunrise={this.state.sunrise}
					sunset={this.state.sunset}
					feelsLike={this.state.feelsLike}
					humidity={this.state.humidity}
					visibility={this.state.visibility}
					windSpeed={this.state.windSpeed}
					main={this.state.main}
				/>
			</div>
		);
	}
}

export default App;
