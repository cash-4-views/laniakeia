module.exports = {
	database: {
		dbacc : process.env.AZURE_STORAGE_ACCOUNT  				 	|| require("./testcredentials.json").database.azure_storage_account,
		dbkey : process.env.AZURE_STORAGE_ACCESS_KEY 			 	|| require("./testcredentials.json").database.azure_storage_access_key,
		dburl : process.env.AZURE_STORAGE_CONNECTION_STRING || require("./testcredentials.json").database.azure_storage_connection_string,
		atable: "testAccounts",
		rtable: "testReports"
	},
};
