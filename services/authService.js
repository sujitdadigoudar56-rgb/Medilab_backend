const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
  async register(userData) {
    const { email } = userData;
    let user = await User.findOne({ email });
    if (user) {
      throw new Error('User already exists');
    }

    user = new User(userData);
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    return { token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid Credentials');
    }

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    return { token, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role } };
  }
}

module.exports = new AuthService();
