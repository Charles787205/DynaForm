app.locals.getInclude = function (path) {
	return `<%- include('${path}') %>`;
};
