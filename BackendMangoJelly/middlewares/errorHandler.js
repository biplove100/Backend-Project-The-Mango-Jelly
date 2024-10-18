const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the error for debugging

    // Set the response status based on the error type
    const statusCode = err.statusCode || 500;

    // Create a meaningful error response
    const response = {
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Internal Server Error',
        // Optionally, you can send more details in development mode
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };

    res.status(statusCode).json(response);
};

module.exports = errorHandler;
