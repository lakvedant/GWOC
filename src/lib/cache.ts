import { unstable_cache } from "next/cache";

const key = "authToken";
const expirationSeconds = 7 * 24 * 60 * 60;

export const getAuthTokenFromCache = unstable_cache(
	async () => null, // Default fallback function
	[key],
	{ revalidate: expirationSeconds }
);

export const storeAuthTokenInCache = (token: string) => {
	unstable_cache(async () => token, [key], { revalidate: expirationSeconds });
};
