class Edit extends React.Component {
	state = {
		question: this.props.entry.question,
		answer: this.props.entry.answer,
		selection: [],
		selection1: this.props.entry.selection[0],
		selection2: this.props.entry.selection[1],
		selection3: this.props.entry.selection[2],
		selection4: this.props.entry.selection[3]
	};
	showAlert = () => {
		this.setState({ alert: true });
		setTimeout(() => {
			this.setState({ alert: false });
		}, 1000);
	};
	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};
	handleSubmit = event => {
		event.preventDefault();
		let newSelection = [];
		for (let i = 1; i <= 4; i++) {
			newSelection.push(this.state['selection' + i]);
		}
		this.setState({
			selection: newSelection
		});
		setTimeout(() => {
			console.log(this.state.selection);
			console.log(this.state.question);
			console.log(this.state.answer);
		}, 50);

		setTimeout(() => {
			axios
				.put('/quiz/' + this.props.entry._id, this.state)
				.then(response => {});
		}, 100);
	};
	deleteItem = () => {
		axios.delete('/quiz/' + this.props.entry._id).then(response => {});
		this.props.setPage('game');
	};
	render() {
		const { selection, question, answer } = this.props.entry;
		return (
			<div className='d-flex row justify-content-center m-0 p-4 color-light'>
				<h2 className='ylw-text-color'>Edit this question</h2>
				<div style={{ width: '100%' }}>
					<form id='createForm' onSubmit={this.handleSubmit}>
						<div className='row'>
							<div>
								<label htmlFor='question' className='form-label ylw-text-color'>
									<strong>Question</strong>{' '}
								</label>
								<input
									required
									id='question'
									className='form-control bg-color-dark'
									type='text'
									onChange={this.handleChange}
									defaultValue={question}
								/>
							</div>
							<div>
								<label htmlFor='answer' className='form-label ylw-text-color'>
									<strong>Answer</strong>{' '}
								</label>
								<input
									required
									id='answer'
									className='form-control bg-color-dark'
									type='text'
									onChange={this.handleChange}
									defaultValue={answer}
								/>
							</div>
						</div>
						<br />
						<div>
							<label className='form-label ylw-text-color' htmlFor='selection1'>
								Option 1
							</label>
							<input
								required
								id='selection1'
								className='form-control bg-color-dark'
								type='text'
								onChange={this.handleChange}
								defaultValue={selection[0]}
							/>
							<label className='form-label ylw-text-color' htmlFor='selection2'>
								Option 2
							</label>
							<input
								required
								id='selection2'
								className='form-control bg-color-dark'
								type='text'
								onChange={this.handleChange}
								defaultValue={selection[1]}
							/>
							<label className='form-label ylw-text-color' htmlFor='selection3'>
								Option 3
							</label>
							<input
								required
								id='selection3'
								className='form-control bg-color-dark'
								type='text'
								onChange={this.handleChange}
								defaultValue={selection[2]}
							/>
							<label className='form-label ylw-text-color' htmlFor='selection4'>
								Option 4
							</label>
							<input
								required
								id='selection4'
								className='form-control bg-color-dark'
								type='text'
								onChange={this.handleChange}
								defaultValue={selection[3]}
							/>
						</div>
						<br />
						<div className='row'>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<button
									onClick={() => this.props.setPage('game')}
									className='bg-btn-color ylw-text-color px-4 m-2 py-3'>
									Back
								</button>
								<input
									disabled
									onClick={this.showAlert}
									className='bg-btn-color ylw-text-color px-4 m-2 py-3'
									type='submit'
									value='Edit'
								/>
								<button
									disabled
									onClick={this.deleteItem}
									className='bg-btn-color ylw-text-color px-4 m-2 py-3'>
									Delete
								</button>
							</div>
							{this.state.alert ? (
								<div
									className='col-sm-6 grow growOut'
									style={{ color: 'lime' }}>
									<h1>Successfully edited</h1>
								</div>
							) : null}
						</div>
					</form>
				</div>
			</div>
		);
	}
}
