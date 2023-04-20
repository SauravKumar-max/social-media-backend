const pageNotFound = (req, res, next) => {
  res.status(404).json({ success: false, message: "Page Not Found" });
};

module.exports = pageNotFound;
