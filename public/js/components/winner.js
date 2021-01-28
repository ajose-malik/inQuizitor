const Winner = props => {
	return (
		<div className='d-flex row justify-content-center m-0 text-center p-5'>
			<img
				src='https://media1.tenor.com/images/c9c828a12a5cfb5133479d4eac74c9f6/tenor.gif?itemid=15171828'
				alt=''
				className='p-0 btn-width'
			/>
			<h1 className='winner text-danger mt-5'>CONGRATULATIONS!</h1>

			<button
				onClick={props.playAgain}
				className='bg-btn-color ylw-text-color px-4 m-2 py-3 btn-width'>
				<h1>Play Again?</h1>
			</button>
		</div>
	);
};
