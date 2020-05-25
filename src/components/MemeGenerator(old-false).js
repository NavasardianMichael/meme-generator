import React, {Component} from 'react';

class MemeGenerator extends Component {
	constructor() {
		super();
		this.state = {
			textDecoration: {
				italic: false,
				bold: true
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		const imageUrlGroup = [];
		fetch("https://picsum.photos/v2/list?page=2&limit=20")
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
			this.handleClick();
		})

	}

	handleChange(event) {
		var {name, value, type, checked, style} = event.target;
		if(type === 'checkbox') {
			this.setState({ textDecoration: {name: checked} });
			const topTextElem = document.querySelectorAll('#memeGeneratorApp #content .output-section .meme p');
			console.log(topTextElem)
			if(name === 'italic') {
				const fontStyle = checked ? name : 'normal';
				topTextElem.forEach(item => item.style.fontStyle = fontStyle);
			} else if(name === 'bold') {
				const fontStyle = checked ? name : 'normal';
				topTextElem.forEach(item => item.style.fontWeight = fontStyle);
			} else if(name === 'underline') {
				const underlinedText = checked ? name : 'none';
				topTextElem.forEach(item => item.style.textDecoration = underlinedText);
			}
		} else {
			this.setState({[name]: value})
		}
	}

	handleClick() {
		let randomIndex = Math.round(Math.random()*20);
		this.setState({imageUrl: this.state.imageUrlGroup[randomIndex]})
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
								<input type="text" name="topText" className="topTextInput" value={this.state.topText} placeholder="Top text"  onChange={this.handleChange}/>
							</label>
						</div>
						<br/>
						<label>
							<span>Bottom text</span>
							<br />
							<input type="text" name="bottomText" className="bottomTextInput" value={this.state.bottomText} placeholder="Bottom text"  onChange={this.handleChange}/>
						</label>
					</div>
					<div><b>Top text font styles:</b></div>
					<label>
						<span>Italic</span>
						<input type="checkbox" name="italic"  checked={this.state.textDecoration.italic} onChange={this.handleChange}/> 
					</label>
					<br/>
					<label>
						<span>Bold</span>
						<input type="checkbox" name="bold"  checked={this.state.textDecoration.bold} onChange={this.handleChange}/> 
					</label>
					<br/>
					<label>
						<span>Underline</span>
						<input type="checkbox" name="underline"  checked={this.state.textDecoration.underline} onChange={this.handleChange}/> 
					</label>
					<br/>										
					<button onClick={this.handleClick}>Generate a random image</button>
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