class Game extends React.Component {
	constructor() {
		super();
		this.timer = 0;
	}
	state = {
		quizBox: [],
		quiz: {
			displayAnswer: 'none',
			selection: []
		},
		page: 'game',
		addPoint: 0,
		gameStart: false,
		seconds: 20,
		actions: 0
	};
	randomSelect = () => {
		const { selection } = this.state.quiz;
		for (let i = selection.length - 1; i >= 0; i--) {
			let randomIndex = Math.floor(Math.random() * selection.length);
			let temp = selection[i];
			selection[i] = selection[randomIndex];
			selection[randomIndex] = temp;
		}
		this.setState({
			selection: selection
		});
	};
	setPage = goto => {
		clearInterval(this.timer);
		this.setState({
			page: goto
		});
		if (goto === 'game') {
			this.setState({
				quizBox: [],
				quiz: {
					displayAnswer: 'none',
					selection: []
				},
				page: 'game',
				addPoint: 0,
				gameStart: false,
				seconds: 20,
				actions: 0
			});
		}
		this.props.playAgain();
	};
	addPointAnimation = point => {
		this.setState({
			addPoint: point
		});
		setTimeout(() => {
			this.setState({
				addPoint: 0
			});
		}, 1000);
	};

	startTimer = () => {
		if (this.state.seconds > 0) {
			this.timer = setInterval(this.countDown, 1000);
		}
	};

	countDown = () => {
		let seconds = this.state.seconds - 1;
		this.setState({
			seconds: seconds
		});

		if (seconds < 0) {
			clearInterval(this.timer);
			this.props.gameOver();
		}
	};

	findQuestion = () => {
		if (this.state.actions === 0) {
			this.startTimer();
			$('.seconds').toggleClass('timer');
		}
		this.setState({
			gameStart: true,
			actions: this.state.actions + 1
		});

		axios.get('/quiz').then(res => {
			const randQuiz = Math.floor(Math.random() * res.data.length);
			const { quizBox } = this.state;
			if (quizBox.length) {
				if (quizBox.indexOf(res.data[randQuiz]._id) === -1) {
					this.setState({
						quiz: res.data[randQuiz]
					});
					quizBox.push(res.data[randQuiz]._id);
					this.randomSelect();
				} else {
					this.findQuestion(event);
				}
			} else {
				this.setState({
					quiz: res.data[randQuiz]
				});
				quizBox.push(res.data[randQuiz]._id);
			}
		});
		this.hideAnswer();
	};

	handleCheckAnswer = event => {
		const { answer } = this.state.quiz;
		if (answer === event.target.innerText) {
			this.props.incrementPoints();
			this.addPointAnimation(1);
			this.setState({
				seconds: this.state.seconds + 5
			});
			this.findQuestion();
		} else {
			if (this.props.points > 0) {
				this.props.decrementPoints();
				this.addPointAnimation(-1);
				this.findQuestion();
			} else {
				this.addPointAnimation(-1);
				this.findQuestion();
			}
			this.setState({
				seconds: this.state.seconds - 2
			});
		}
	};

	displayAnswer = () => {
		if (this.state.quiz.answer) {
			this.setState({
				displayAnswer: 'block'
			});

			setTimeout(() => {
				this.props.gameOver();
			}, 2000);
		}
	};

	hideAnswer = () => {
		this.setState({
			displayAnswer: 'none'
		});
	};

	render = () => {
		const { page, addPoint, gameStart, quiz, seconds } = this.state;
		if (page === 'game') {
			return (
				<div className='justify-content-center d-flex row p-4'>
					{gameStart ? (
						<h1 className='ylw-text-color text-center mb-3'>
							<strong>You can do it!</strong>{' '}
						</h1>
					) : (
						<h1 className='ylw-text-color text-center mb-3'>
							<strong>Welcome to the inQUIZitor</strong>{' '}
						</h1>
					)}
					{gameStart ? null : (
						<div className='text-center py-1 text-muted btn-width p-0'>
							<h4 className='mb-3'>__________Rules__________</h4>
							<p className='text-muted border rounded-3 border-0 p-2 bg-color-dark mb-2'>
								<strong className='text-success fs-5'>+1</strong> point,{' '}
								<strong className='text-success fs-5'>+5</strong> seconds, for
								correct answer
							</p>
							<p className='text-muted border rounded-3 border-0 p-2 bg-color-dark mb-2'>
								<strong className='text-danger fs-5'>-1 </strong> point,{' '}
								<strong className='text-danger fs-5'>-2 </strong> seconds, for
								wrong answer
							</p>
							<p className='text-muted border rounded-3 border-0 p-2 bg-color-dark mb-1'>
								Reach <strong className='text-success fs-5'>10</strong> points
								before timer runs out!
							</p>
						</div>
					)}
					<div className='text-center color-light'>
						<span className='text-danger fs-1'>{seconds} </span>{' '}
						<h2 className='d-inline'> seconds left!</h2>
						{addPoint > 0 ? AddPoint('green', '+5 seconds', 2) : null}
						{addPoint < 0 ? AddPoint('red', '-2 seconds', 2) : null}
					</div>
					<div className='text-center p-0 m-0'>
						<span className='color-light currentPoints fs-1'>
							<span>Points: </span>
							{this.props.points}
						</span>
						{addPoint > 0 ? AddPoint('green', '+1') : null}
						{addPoint < 0 ? AddPoint('red', '-1') : null}
					</div>
					<p className='text-center ylw-text-color'>
						{this.state.quiz.question ? (
							<h3 className='line-height my-2'>{this.state.quiz.question}</h3>
						) : (
							<h3 className='line-height my-2'>
								Are you ready to be inQUIZitive?
							</h3>
						)}
					</p>
					<div className='text-center'>
						{this.state.quiz.selection.map((el, id) => (
							<div>
								<button
									className='bg-btn-color ylw-text-color m-2 p-2 px-5 fs-5'
									key={id}
									onClick={this.handleCheckAnswer}>
									{el}
								</button>
							</div>
						))}
					</div>
					{gameStart ? null : (
						<button
							onClick={this.findQuestion}
							className='bg-btn-color ylw-text-color btn-width mb-4 p-2'>
							<h2>Get inQUIZitive</h2>
						</button>
					)}
					{gameStart ? null : (
						// <div className='mt-3 d-flex justify-content-center'>
						// 	<button
						// 		disabled
						// 		onClick={() => this.setPage('edit')}
						// 		className='bg-btn-color ylw-text-color px-4 m-2 py-0'>
						// 		Edit
						// 	</button>
						// </div>
						<div className='d-flex justify-content-center p-0 mb-3'>
							<button
								onClick={() => this.setPage('create')}
								className='bg-btn-color ylw-text-color p-2 btn-width'>
								<h4>Create</h4>
							</button>
						</div>
					)}
				</div>
			);
		} else if (page === 'create') {
			return <Create setPage={this.setPage} />;
		} else if (page === 'edit') {
			return <Edit entry={quiz} setPage={this.setPage} />;
		}
	};
}

function AddPoint(color, point, version) {
	if (version === 2) {
		return (
			<h2 style={{ color: color }} className='points'>
				{point}
			</h2>
		);
	}
	return (
		<h1 style={{ color: color }} className='points'>
			{point}
		</h1>
	);
}
