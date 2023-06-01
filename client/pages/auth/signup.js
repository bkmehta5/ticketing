import { useState } from 'react';
import axios from 'axios';

function signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(email, password);

		try {
			const response = await axios.post('/api/users/signup', {
				email,
				password,
			});

			console.log(response.data);
		} catch (err) {
			console.log(err.response.data.errors);
			setErrors(err.response.data.errors);
		}
	};
	return (
		<form onSubmit={onSubmit}>
			<h1>Signup</h1>
			<div className="form-group">
				<label htmlFor="">Email</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="form-control"
				></input>
			</div>
			<div className="form-group">
				<label htmlFor="">Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="form-control"
				></input>
			</div>
			{errors.length > 0 && (
				<div className="alert alert-danger">
					<h4>Ooops.....</h4>
					<ul className="my-0"></ul>
					{errors?.map((err) => (
						<li key={err.message}>{err.message}</li>
					))}
				</div>
			)}

			<button className="btn btn-primary">Sign Up</button>
		</form>
	);
}

export default signup;
