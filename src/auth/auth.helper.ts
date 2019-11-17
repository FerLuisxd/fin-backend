import * as jwt from 'jsonwebtoken';

export class AuthHelper {

/*******************************************************
 * Return a Jwt Token
 *******************************************************/
    genToken(user) {
		console.log("user",user)
		let tok = jwt.sign(
		{
			id: user.id,
			name: user.username,
			email: user.email,
			role: user.role,
			exp: Math.round(new Date().getTime() / 1000) + 604800 // 1 week
		}
		,'mysecret')
		const token = {
		  token: tok
		}

		jwt.verify(tok, 'mysecret', function(err, payload) {
			if (!err) {
			  //confirm identity and check user permissions
			  console.log("payload",payload)
			} else {
			  console.log("Err token")
			}
		  });

      return token;
  }
}