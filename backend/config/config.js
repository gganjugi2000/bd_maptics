exports.getConfig = () => {
	let config;
	if (process.env.NODE_ENV === "production") {
		config = {
			jwt_secret: "8gEg+LpLUKVVddY",
		};
	} else {
		config = {
			jwt_secret: "8gEg+LpLUKVVddY",
		};
	}

	return config;
};
