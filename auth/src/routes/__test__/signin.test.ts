import request from 'supertest';
import { app } from '../../app';

it('fails when email that not exist is supplied', async () => {
	await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(400);
});

it('fails when incorrect password is supplied', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);
	await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: 'password1',
		})
		.expect(400);
});

it('response with cookie when given valid credentials', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);

	const response = await request(app);
	await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201);

	expect(response.get('Set-Cookie')).toBeDefined();
});
