const apiBaseUrl = "https://cpaas.messagecentral.com";
const customerId = process.env.CUSTOMER_ID!;
const base64Pwd = process.env.BASE_64_PWD!;

import { getAuthTokenFromCache, storeAuthTokenInCache } from "./cache";

export const getAuthToken = async (): Promise<string> => {
	let authToken: string | null = await getAuthTokenFromCache();

	if (!authToken) {
		try {
			const response = await fetch(
				`${apiBaseUrl}/auth/v1/authentication/token?country=IN&customerId=${customerId}&key=${base64Pwd}&scope=NEW`,
				{ method: "GET", headers: { accept: "*/*" } }
			);

			if (!response.ok) console.error("Failed to fetch auth token");

			const { token } = await response.json();
			storeAuthTokenInCache(token);
			authToken = token;
		} catch (error) {
			console.error("Auth token fetch error:", error);
			// throw new Error("Failed to get auth token");
		}
	}

	return authToken || "";
};
