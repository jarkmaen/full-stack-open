import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => (
  <div>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username <input type="text" id='username' value={username} name="Username" onChange={handleUsernameChange} />
      </div>
      <div>
        password <input type="password" id='password' value={password} name="Password" onChange={handlePasswordChange} />
      </div>
      <div>
        <button type="submit" id="login-button">login</button>
      </div>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm