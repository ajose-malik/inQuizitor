const Loser = props => {
	return (
		<div className='d-flex row justify-content-center m-0 text-center p-5'>
			<img
				src='https://media.giphy.com/media/3ohhwH6yMO7ED5xc7S/giphy.gif'
				alt='lose image'
				className='p-0 btn-width'
			/>
			<h1 className='loser text-danger mt-5'>GO TAKE A WALK!</h1>

			<button
				onClick={props.playAgain}
				className='bg-btn-color ylw-text-color px-4 m-2 py-3 btn-width'>
				<h1>Try Again?</h1>
			</button>
		</div>
	);
};
