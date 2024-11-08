const getUserProfile = (req, res) => {
    res.json({ message: 'Perfil de usuario', user: req.user });
};

module.exports = { getUserProfile };
