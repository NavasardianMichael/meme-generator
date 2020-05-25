import React, {Component} from 'react';

class MemeGenerator extends Component {
	constructor() {
		super();
		this.state = {
			topText: '',
			bottomText: '',
			isLoading: false,
			imageUrl: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		const imageUrlGroup = [];
		fetch("https://picsum.photos/v2/list?page=3&limit=20")
		.then(response => {
			return response.json();
		})
		.then(data => {
				data.map(item => {
				imageUrlGroup.push(item.download_url);
			})
		})
		.then(() => {
			this.setState({imageUrlGroup});
		})

	}

	handleChange(event) {
		var {name, value} = event.target;
		this.setState({[name]: value})
	}

	handleClick() {
		this.setState({isLoading: true});
		let randomIndex = Math.round(Math.random()*19);
		this.setState({imageUrl: this.state.imageUrlGroup[randomIndex]});
		this.setState({isLoading: false});
	}	

	render() {
		return (
			<div id="content">
				<div className="edit-section">
					<div className="inputs">
						<div>
							<label>
								<span>Top text</span>
								<br />
								<input type="text" disabled={this.state.imageUrl === ''} name="topText" className="topTextInput" value={this.state.topText} placeholder="Top text"  onChange={this.handleChange}/>
							</label>
						</div>
						<br/>
						<label>
							<span>Bottom text</span>
							<br />
							<input type="text" disabled={this.state.imageUrl === ''} name="bottomText" className="bottomTextInput" value={this.state.bottomText} placeholder="Bottom text"  onChange={this.handleChange}/>
						</label>
					</div>										
					<button onClick={this.handleClick} disabled={this.state.isLoading} >Generate a random image</button>
				</div>
				<div className="output-section">
					<div className="meme">
						<p className="topText">{this.state.topText}</p>
						<img src={this.state.imageUrl} />
						<p className="bottomText">{this.state.bottomText}</p>
					</div>
				</div>
			</div>
		)		
	}
}

export default MemeGenerator