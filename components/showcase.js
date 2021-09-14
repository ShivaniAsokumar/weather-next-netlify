import React, { Component } from 'react';
import Clear from '../images/Clear.jpg';
import Thunderstorm from '../images/Thunderstorm.jpg';
import Atmosphere from '../images/Atmosphere.jpg';
import Clouds from '../images/Clouds.jpg';
import Rain from '../images/Rain.jpg';
import Snow from '../images/Snow.jpg';
import Drizzle from '../images/Drizzle.jpg';
class Showcase extends Component {
	getStyle = (main) => {
		let style = {
			backgroundImage: '',
			color: 'white'
		};

		const atmos_weather = [ 'Mist', 'Smoke', 'Haze', 'Dust', 'Fog', 'Sand', 'Ash', 'Tornado', 'Squall' ];
		if (main === 'Clouds') {
			style.backgroundImage = `url(${Clouds})`;
		} else if (main === 'Clear') {
			style.backgroundImage = `url(${Clear})`;
		} else if (main === 'Drizzle') {
			style.backgroundImage = `url(${Drizzle})`;
		} else if (atmos_weather.includes(`${main}`)) {
			style.backgroundImage = `url(${Atmosphere})`;
			style.color = '#333';
		} else if (main === 'Rain') {
			style.backgroundImage = `url(${Rain})`;
		} else if (main === 'Snow') {
			style.backgroundImage = `url(${Snow})`;
			style.color = '#333';
		} else if (main === 'Thunderstorm') {
			style.backgroundImage = `url(${Thunderstorm})`;
		}
		return style;
	};

	capitalCase = (sentence) => {
		let result = '';
		if (sentence.includes(' ')) {
			sentence = sentence.split(' ');
			for (let word of sentence) {
				word = word.replace(word.charAt(0), word.charAt(0).toUpperCase());
				result = result + word + ' ';
			}
			return result;
		}

		sentence = sentence.replace(sentence.charAt(0), sentence.charAt(0).toUpperCase());
		return sentence;
	};

	render() {
		const day = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
		let date = new Date();
		let hours = date.getHours();
		let AmOrPm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12 || 12;
		let minutes = date.getMinutes();

		if (minutes in [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]) {
			minutes = '0' + minutes;
		}

		const {
			city,
			temp,
			description,
			lowTemp,
			highTemp,
			sunrise,
			sunset,
			feelsLike,
			humidity,
			visibility,
			windSpeed,
			main
		} = this.props;
		return (
			<div className="showcase-container">
				<div className="day" style={this.getStyle(main)}>
					<p className="sub-heading">{temp ? day[date.getDay()] : ''}</p>
				</div>
				<div className="city" style={this.getStyle(main)}>
					<p>{this.capitalCase(city)}</p>
				</div>
				<div className="time" style={this.getStyle(main)}>
					<p className="sub-heading">{temp ? `${hours}:${minutes} ${AmOrPm}` : ''}</p>
				</div>
				<div className="temp-container" style={this.getStyle(main)}>
					<p>
						<span className="temp-container-span">
							{temp ? (
								<span>
									{temp} <span id="temp-unit">&#8457;</span>
								</span>
							) : (
								''
							)}
						</span>
						<br />
						{description ? <span className="sub-heading">{this.capitalCase(description)}</span> : ''}
					</p>
				</div>
				<div className="high-low-temp" style={this.getStyle(main)}>
					<p>
						{highTemp ? <span className="sub-heading">High | Low </span> : ''} <br />
						<span className="high-temp-span">{highTemp ? `${highTemp} | ` : ''} </span>
						<span className="low-temp-span"> {lowTemp ? `${lowTemp} ` : ''}</span>
					</p>
				</div>
				<div className="sunrise-sunset" style={this.getStyle(main)}>
					<p>
						{sunrise ? (
							<span className="sub-heading">
								<i className="fas fa-sun" /> {sunrise}
							</span>
						) : (
							''
						)}
						<br />
						{sunset ? (
							<span className="sub-heading">
								<i className="fas fa-cloud-sun" /> {sunset}{' '}
							</span>
						) : (
							''
						)}
					</p>
				</div>
				<div className="feels-like" style={this.getStyle(main)}>
					{feelsLike ? (
						<p>
							<span className="sub-heading">Feels Like</span> <br /> {feelsLike} &#8457;
						</p>
					) : (
						''
					)}
				</div>
				<div className="humidity" style={this.getStyle(main)}>
					{humidity ? (
						<p>
							<span className="sub-heading">Humidity</span> <br /> {humidity}%
						</p>
					) : (
						''
					)}
				</div>
				<div className="visibility" style={this.getStyle(main)}>
					{visibility ? (
						<p>
							<span className="sub-heading">Visibility</span> <br /> {visibility} ft
						</p>
					) : (
						''
					)}
				</div>
				<div className="wind-speed" style={this.getStyle(main)}>
					{windSpeed ? (
						<p>
							<span className="sub-heading">Wing Speed</span> <br /> {windSpeed} mph
						</p>
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}

export default Showcase;
