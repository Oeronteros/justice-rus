globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as serve, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import "./_libs/hookable.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = {
	["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")),
	["rsc"]: lazyService(() => import("./_ssr/rsc.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/apl-QJCYYBkj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f4-YfSNrNmtQv4ybl7/BNFIfnEvTxo\"",
		"mtime": "2026-03-22T12:49:46.178Z",
		"size": 2292,
		"path": "../public/assets/apl-QJCYYBkj.js"
	},
	"/assets/asciiarmor-DNy0UPqh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"318-Fb9hbcU/qa1HLd1YVp9yU3K3rEE\"",
		"mtime": "2026-03-22T12:49:46.179Z",
		"size": 792,
		"path": "../public/assets/asciiarmor-DNy0UPqh.js"
	},
	"/emblem.svg": {
		"type": "image/svg+xml",
		"etag": "\"625-0C5JYvCKPfyy+T6wYQTweMTvcrY\"",
		"mtime": "2026-03-16T17:28:51.413Z",
		"size": 1573,
		"path": "../public/emblem.svg"
	},
	"/assets/asn1-CNPXj-s7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f74-YMnyC8ej6o3jkOlvyUH1tF+YjOI\"",
		"mtime": "2026-03-22T12:49:46.181Z",
		"size": 3956,
		"path": "../public/assets/asn1-CNPXj-s7.js"
	},
	"/assets/asterisk-BwMdLpT2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fef-4qnQTDDPDs0YLazhYYis5xjR8mY\"",
		"mtime": "2026-03-22T12:49:46.183Z",
		"size": 4079,
		"path": "../public/assets/asterisk-BwMdLpT2.js"
	},
	"/assets/analytics-De-B_QUy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"45ff-IT/3ub/DZDD5WH1Fs4rxCrp4MRo\"",
		"mtime": "2026-03-22T12:49:46.176Z",
		"size": 17919,
		"path": "../public/assets/analytics-De-B_QUy.js"
	},
	"/icon.svg": {
		"type": "image/svg+xml",
		"etag": "\"625-0C5JYvCKPfyy+T6wYQTweMTvcrY\"",
		"mtime": "2026-03-16T17:28:51.414Z",
		"size": 1573,
		"path": "../public/icon.svg"
	},
	"/assets/cmake-Y3shE7av.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30c-3zpQ8oKKCojejiyCfEn6tVLNk84\"",
		"mtime": "2026-03-22T12:49:46.189Z",
		"size": 780,
		"path": "../public/assets/cmake-Y3shE7av.js"
	},
	"/assets/cobol-f-3TLk62.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184f-BWEePgvGkq22ry2iXN3hw7o7mKs\"",
		"mtime": "2026-03-22T12:49:46.189Z",
		"size": 6223,
		"path": "../public/assets/cobol-f-3TLk62.js"
	},
	"/assets/coffeescript-C0XA9-xa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f12-BzyldvHoAPwpZTSw6Lyxh5KF6Y4\"",
		"mtime": "2026-03-22T12:49:46.192Z",
		"size": 3858,
		"path": "../public/assets/coffeescript-C0XA9-xa.js"
	},
	"/assets/clojure-BEDKZv_5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24be-xcg/LX8krd/Cneh8oQqpKfKfI50\"",
		"mtime": "2026-03-22T12:49:46.186Z",
		"size": 9406,
		"path": "../public/assets/clojure-BEDKZv_5.js"
	},
	"/assets/ClassIcon-C7e4sfMZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9516-laGqsE/A3Mv0GWx1WGn1o4+bUS8\"",
		"mtime": "2026-03-22T12:49:46.174Z",
		"size": 38166,
		"path": "../public/assets/ClassIcon-C7e4sfMZ.js"
	},
	"/assets/clike-D5X7HJpo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5630-lAaqeGOIxqkmIDr2sHPb/E6qvoU\"",
		"mtime": "2026-03-22T12:49:46.185Z",
		"size": 22064,
		"path": "../public/assets/clike-D5X7HJpo.js"
	},
	"/assets/commonlisp-BOB6sIEu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"910-8H/XClsjKwaym0/HMNz0qEukU90\"",
		"mtime": "2026-03-22T12:49:46.193Z",
		"size": 2320,
		"path": "../public/assets/commonlisp-BOB6sIEu.js"
	},
	"/assets/brainfuck-C2gHT8aA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"257-5Hbjpp8XdZ4kzCdzUTrrrszDqXk\"",
		"mtime": "2026-03-22T12:49:46.184Z",
		"size": 599,
		"path": "../public/assets/brainfuck-C2gHT8aA.js"
	},
	"/assets/crystal-ByNgE_My.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"139c-5iHTPdaTSTxZSxi6LQfsHxrbf2w\"",
		"mtime": "2026-03-22T12:49:46.193Z",
		"size": 5020,
		"path": "../public/assets/crystal-ByNgE_My.js"
	},
	"/assets/css-eaI-ENiR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6084-7Q7gbrke+Dmk8ixQbaU4ZzIIAEo\"",
		"mtime": "2026-03-22T12:49:46.194Z",
		"size": 24708,
		"path": "../public/assets/css-eaI-ENiR.js"
	},
	"/assets/cypher-CQ-dGGSi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c71-tijDiuc1xCS+KeNsI3KjJA1rbJM\"",
		"mtime": "2026-03-22T12:49:46.195Z",
		"size": 3185,
		"path": "../public/assets/cypher-CQ-dGGSi.js"
	},
	"/assets/diff-z9q33Lo6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e-ZFLPXzmCX33D+eVR6xyTq8E7VwU\"",
		"mtime": "2026-03-22T12:49:46.198Z",
		"size": 302,
		"path": "../public/assets/diff-z9q33Lo6.js"
	},
	"/assets/d-D9pnu4Cr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e5c-PSNZzQzSzo0PgsIUEfsPwgLzmbs\"",
		"mtime": "2026-03-22T12:49:46.196Z",
		"size": 3676,
		"path": "../public/assets/d-D9pnu4Cr.js"
	},
	"/assets/dist-B3DF0wuH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab3f-taYXKlzwnOWqxlvwJMy+qKDdgcs\"",
		"mtime": "2026-03-22T12:49:46.201Z",
		"size": 43839,
		"path": "../public/assets/dist-B3DF0wuH.js"
	},
	"/assets/dist-1LZV5wdZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17e22-f9pXL6177x2tXVL48B5ymLa82V0\"",
		"mtime": "2026-03-22T12:49:46.198Z",
		"size": 97826,
		"path": "../public/assets/dist-1LZV5wdZ.js"
	},
	"/assets/dist-52m9NbDQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"188df-m7WOnm2uPvwaVYDclONQQNGUKf0\"",
		"mtime": "2026-03-22T12:49:46.200Z",
		"size": 100575,
		"path": "../public/assets/dist-52m9NbDQ.js"
	},
	"/assets/dist-BMKtGWCG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3827-9i1EFJTlucnJYWk6FLewGPHAD1o\"",
		"mtime": "2026-03-22T12:49:46.202Z",
		"size": 14375,
		"path": "../public/assets/dist-BMKtGWCG.js"
	},
	"/assets/dist-BbjN1NIZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7e9-zPZ9DGY8VhjlI87O8tOgCzzRkRs\"",
		"mtime": "2026-03-22T12:49:46.206Z",
		"size": 2025,
		"path": "../public/assets/dist-BbjN1NIZ.js"
	},
	"/assets/dist-BNB5V-3O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f8c-dla1LefqPbtmV7/6tGhsAoEHg6M\"",
		"mtime": "2026-03-22T12:49:46.203Z",
		"size": 24460,
		"path": "../public/assets/dist-BNB5V-3O.js"
	},
	"/assets/dist-BYaacD0C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59d0-7JG8whTLUkvZHd7yQ5+N19J3CWs\"",
		"mtime": "2026-03-22T12:49:46.205Z",
		"size": 22992,
		"path": "../public/assets/dist-BYaacD0C.js"
	},
	"/assets/dist-CERxUVhL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f8c-z6y8pUXhisbkJ2x3uoOogCOhYvw\"",
		"mtime": "2026-03-22T12:49:46.208Z",
		"size": 16268,
		"path": "../public/assets/dist-CERxUVhL.js"
	},
	"/assets/dist-CFMb4n8p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"858c-opYcshL6qn3o6HheIpEwBMhnOeI\"",
		"mtime": "2026-03-22T12:49:46.209Z",
		"size": 34188,
		"path": "../public/assets/dist-CFMb4n8p.js"
	},
	"/assets/dist-Ccpi_8fL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6e8d-L+C1DGzoZ+zEcqCnPKSrN4TjWg8\"",
		"mtime": "2026-03-22T12:49:46.211Z",
		"size": 28301,
		"path": "../public/assets/dist-Ccpi_8fL.js"
	},
	"/assets/dist-CbkKvCs8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d3c-geoENXm6pQ2gpQ7Cq7zO6sQV3QM\"",
		"mtime": "2026-03-22T12:49:46.211Z",
		"size": 11580,
		"path": "../public/assets/dist-CbkKvCs8.js"
	},
	"/assets/dist-Bq2mx8Uv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3d-bch+H+ExB77i6D0Mki4sgXc4DWY\"",
		"mtime": "2026-03-22T12:49:46.207Z",
		"size": 3389,
		"path": "../public/assets/dist-Bq2mx8Uv.js"
	},
	"/assets/dist-CeA94rNF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae54-Cx+bFPGNJqqdI66LxH6oK08iCfE\"",
		"mtime": "2026-03-22T12:49:46.213Z",
		"size": 44628,
		"path": "../public/assets/dist-CeA94rNF.js"
	},
	"/assets/dist-BNQbxL4j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b540-WbVdZnMfXpfXhRp39alL6CqfHCQ\"",
		"mtime": "2026-03-22T12:49:46.204Z",
		"size": 308544,
		"path": "../public/assets/dist-BNQbxL4j.js"
	},
	"/assets/dist-CXT8HSsT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"88b3-NYrE/ZuJy3QEptw9u7iEXK5ML/U\"",
		"mtime": "2026-03-22T12:49:46.210Z",
		"size": 34995,
		"path": "../public/assets/dist-CXT8HSsT.js"
	},
	"/assets/dist-CNqvM2NZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f27-5Z0HFkI+nyYrB7EOBfdihChrR4o\"",
		"mtime": "2026-03-22T12:49:46.209Z",
		"size": 40743,
		"path": "../public/assets/dist-CNqvM2NZ.js"
	},
	"/assets/dist-DFG5cH-V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1388-YNDGTghSStS70+cHSH3hvGFbW+k\"",
		"mtime": "2026-03-22T12:49:46.214Z",
		"size": 5e3,
		"path": "../public/assets/dist-DFG5cH-V.js"
	},
	"/assets/dist-DUTSR-mN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a53-FXR55pegh7VHt08TsThHw93tN74\"",
		"mtime": "2026-03-22T12:49:46.214Z",
		"size": 2643,
		"path": "../public/assets/dist-DUTSR-mN.js"
	},
	"/assets/dist-DtiSv8Dp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66d0-Hym//CO+TQ7xLpt0dOf11dyaWe8\"",
		"mtime": "2026-03-22T12:49:46.218Z",
		"size": 26320,
		"path": "../public/assets/dist-DtiSv8Dp.js"
	},
	"/assets/dist-DUtbDBxA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114ae-mab/+SRCyux6Yy7OwJCTcXnnkQg\"",
		"mtime": "2026-03-22T12:49:46.215Z",
		"size": 70830,
		"path": "../public/assets/dist-DUtbDBxA.js"
	},
	"/assets/dist-DVqEyJFT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"523a-zOWLC7ELjBJ9FFJp/3QJnr7yrV4\"",
		"mtime": "2026-03-22T12:49:46.216Z",
		"size": 21050,
		"path": "../public/assets/dist-DVqEyJFT.js"
	},
	"/assets/dist-Nv6QMI3Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14a96-kQSkFRQ4MiV0rn3v5bXXqNJa5MQ\"",
		"mtime": "2026-03-22T12:49:46.220Z",
		"size": 84630,
		"path": "../public/assets/dist-Nv6QMI3Q.js"
	},
	"/assets/dist-tMx0gSlP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7825-MEhwFjeXTH8T3LpJqEcKlv3il80\"",
		"mtime": "2026-03-22T12:49:46.221Z",
		"size": 30757,
		"path": "../public/assets/dist-tMx0gSlP.js"
	},
	"/assets/dist-DvJvDTfI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"513c-GU8sRAbzBsgKELWkZRe8yoH+/aI\"",
		"mtime": "2026-03-22T12:49:46.219Z",
		"size": 20796,
		"path": "../public/assets/dist-DvJvDTfI.js"
	},
	"/assets/dockerfile-C0qQqxf9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"772-/j7MhF7U29LFSAKkU+V9hugK27c\"",
		"mtime": "2026-03-22T12:49:46.222Z",
		"size": 1906,
		"path": "../public/assets/dockerfile-C0qQqxf9.js"
	},
	"/assets/dylan-Bk__XCKW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc9-dT4DxfP0o2BvDeBybIExjwv0BQ0\"",
		"mtime": "2026-03-22T12:49:46.225Z",
		"size": 4041,
		"path": "../public/assets/dylan-Bk__XCKW.js"
	},
	"/assets/dtd-BDizf_te.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82c-bqj64Ua8LYsWTfapnqEXwIVFv7Y\"",
		"mtime": "2026-03-22T12:49:46.223Z",
		"size": 2092,
		"path": "../public/assets/dtd-BDizf_te.js"
	},
	"/assets/ebnf-SzN4Kxtp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7bb-6crp4OmZQ6PI5Q1fxLxWD8craVM\"",
		"mtime": "2026-03-22T12:49:46.225Z",
		"size": 1979,
		"path": "../public/assets/ebnf-SzN4Kxtp.js"
	},
	"/assets/eiffel-Bhoaqbb6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69c-JKqdt9j019oAgNJRBq3tmzhQheo\"",
		"mtime": "2026-03-22T12:49:46.226Z",
		"size": 1692,
		"path": "../public/assets/eiffel-Bhoaqbb6.js"
	},
	"/assets/ecl-5ulxiKbt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13e7-KDOtvTPU2hspdE5vtRsgZuah8X8\"",
		"mtime": "2026-03-22T12:49:46.226Z",
		"size": 5095,
		"path": "../public/assets/ecl-5ulxiKbt.js"
	},
	"/assets/elm-C3je846J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"74a-5zxnR4MBnrd+UZxX2sj4fO6dHyY\"",
		"mtime": "2026-03-22T12:49:46.227Z",
		"size": 1866,
		"path": "../public/assets/elm-C3je846J.js"
	},
	"/assets/erlang-Cgk9SIAz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ea6-JCH5VSlXAsz4DSiSXdWli/XhSew\"",
		"mtime": "2026-03-22T12:49:46.229Z",
		"size": 7846,
		"path": "../public/assets/erlang-Cgk9SIAz.js"
	},
	"/assets/fcl-dvkZwp9p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f0-MrEmaGLrQ35N/wRVJJaQiFuMxLo\"",
		"mtime": "2026-03-22T12:49:46.236Z",
		"size": 2032,
		"path": "../public/assets/fcl-dvkZwp9p.js"
	},
	"/assets/factor-2uy-lXe_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"685-vv7zFe6g5FfeEGngfM2DMSWqMlY\"",
		"mtime": "2026-03-22T12:49:46.234Z",
		"size": 1669,
		"path": "../public/assets/factor-2uy-lXe_.js"
	},
	"/assets/forth-DmfSa3jN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9ed-Fsp8Tdi1e0IfA3JiPS3N2WtUrbM\"",
		"mtime": "2026-03-22T12:49:46.236Z",
		"size": 2541,
		"path": "../public/assets/forth-DmfSa3jN.js"
	},
	"/assets/fortran-BsZAiNnN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f16-eaOw7lD9ABlO0QtSLpkHuHGVsV8\"",
		"mtime": "2026-03-22T12:49:46.237Z",
		"size": 3862,
		"path": "../public/assets/fortran-BsZAiNnN.js"
	},
	"/assets/gas-DBpKE9ut.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11c6-PQLseOxUMqZ2ECjuxL4J9q3WBUg\"",
		"mtime": "2026-03-22T12:49:46.238Z",
		"size": 4550,
		"path": "../public/assets/gas-DBpKE9ut.js"
	},
	"/assets/gherkin-CceEbBs7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27ac-ewottv2o5bqpQK0eTWCAzyPj8js\"",
		"mtime": "2026-03-22T12:49:46.239Z",
		"size": 10156,
		"path": "../public/assets/gherkin-CceEbBs7.js"
	},
	"/assets/groovy-CxJnDvES.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100a-DKQcoC0/GLcVnt7Ya0N0ngtbrpU\"",
		"mtime": "2026-03-22T12:49:46.239Z",
		"size": 4106,
		"path": "../public/assets/groovy-CxJnDvES.js"
	},
	"/assets/haskell-CUSb34Xy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103f-TuAoWBFJUWXOsRE2JhrdNv8O3Yc\"",
		"mtime": "2026-03-22T12:49:46.240Z",
		"size": 4159,
		"path": "../public/assets/haskell-CUSb34Xy.js"
	},
	"/assets/haxe-6EHO_h-N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb9-5xdhrovusU5Xtc6HWDW/fgJfQD0\"",
		"mtime": "2026-03-22T12:49:46.241Z",
		"size": 7865,
		"path": "../public/assets/haxe-6EHO_h-N.js"
	},
	"/assets/http-C3qcBpvG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34d-czzmW8XWrIcmHMBxlFACpW+J6w0\"",
		"mtime": "2026-03-22T12:49:46.241Z",
		"size": 845,
		"path": "../public/assets/http-C3qcBpvG.js"
	},
	"/assets/handle-CneEzIY0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"141b6-j3u6mLxdh1EgPL810OlF2KIjYaU\"",
		"mtime": "2026-03-22T12:49:46.240Z",
		"size": 82358,
		"path": "../public/assets/handle-CneEzIY0.js"
	},
	"/assets/idl-C95wIO2I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2662-Y/SpOnm75MSZlRXHGLiY6cPZMXU\"",
		"mtime": "2026-03-22T12:49:46.242Z",
		"size": 9826,
		"path": "../public/assets/idl-C95wIO2I.js"
	},
	"/assets/framework-CryMCdAX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e56d-ldUu3X/6W6B5AVxu/SSeB/l7Vw4\"",
		"mtime": "2026-03-22T12:49:46.238Z",
		"size": 189805,
		"path": "../public/assets/framework-CryMCdAX.js"
	},
	"/assets/julia-BsEGf_Y5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148f-Mix2yD33/ATXjV0Ucqj3iWB8+iU\"",
		"mtime": "2026-03-22T12:49:46.243Z",
		"size": 5263,
		"path": "../public/assets/julia-BsEGf_Y5.js"
	},
	"/assets/javascript-G8HF3ZBr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"427f-A/9q+1pcT7Jv5/auklRHx+49OR4\"",
		"mtime": "2026-03-22T12:49:46.242Z",
		"size": 17023,
		"path": "../public/assets/javascript-G8HF3ZBr.js"
	},
	"/assets/index-CXSKDKtg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9605-gqIZ1TbuJVMzFKYFWaTzgwslWFE\"",
		"mtime": "2026-03-22T12:49:46.172Z",
		"size": 38405,
		"path": "../public/assets/index-CXSKDKtg.js"
	},
	"/assets/KaTeX_AMS-Regular-BQhdFMY1.woff2": {
		"type": "font/woff2",
		"etag": "\"6dac-NElHQ3Nv2nVxl9FvzGpuGnkxfIY\"",
		"mtime": "2026-03-22T12:49:46.310Z",
		"size": 28076,
		"path": "../public/assets/KaTeX_AMS-Regular-BQhdFMY1.woff2"
	},
	"/assets/index-C9lDKAm1.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1034c-m/Qn4rcz6L4tad8s4RfR8D9cHlc\"",
		"mtime": "2026-03-22T12:49:46.396Z",
		"size": 66380,
		"path": "../public/assets/index-C9lDKAm1.css"
	},
	"/assets/KaTeX_AMS-Regular-DMm9YOAa.woff": {
		"type": "font/woff",
		"etag": "\"82ec-ma2i3jIA55UUPWOSMsNESwgBgjU\"",
		"mtime": "2026-03-22T12:49:46.311Z",
		"size": 33516,
		"path": "../public/assets/KaTeX_AMS-Regular-DMm9YOAa.woff"
	},
	"/assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf": {
		"type": "font/ttf",
		"etag": "\"3050-j6tziha6j7fnACoHXwNqRVpFxug\"",
		"mtime": "2026-03-22T12:49:46.313Z",
		"size": 12368,
		"path": "../public/assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf"
	},
	"/assets/KaTeX_AMS-Regular-DRggAlZN.ttf": {
		"type": "font/ttf",
		"etag": "\"f890-Hf0O5uMPihwjmZ2dll24cAtany4\"",
		"mtime": "2026-03-22T12:49:46.312Z",
		"size": 63632,
		"path": "../public/assets/KaTeX_AMS-Regular-DRggAlZN.ttf"
	},
	"/assets/esm-BGRuRGop.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6bde-8U+r+F2gaTMjbB3Gv9sHZtkhVOQ\"",
		"mtime": "2026-03-22T12:49:46.231Z",
		"size": 682974,
		"path": "../public/assets/esm-BGRuRGop.js"
	},
	"/assets/facade__virtual_vinext-rsc-entry-D64EXIOt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb866-MkHQzuC4atI3/fe++LP6dTKUlQs\"",
		"mtime": "2026-03-22T12:49:46.233Z",
		"size": 964710,
		"path": "../public/assets/facade__virtual_vinext-rsc-entry-D64EXIOt.js"
	},
	"/assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff": {
		"type": "font/woff",
		"etag": "\"1de8-Gm85vXDJt0cTB431991hCPm604s\"",
		"mtime": "2026-03-22T12:49:46.314Z",
		"size": 7656,
		"path": "../public/assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff"
	},
	"/assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff": {
		"type": "font/woff",
		"etag": "\"1e24-3SOsD7CsRpsGJEhep41wD2NhQgM\"",
		"mtime": "2026-03-22T12:49:46.313Z",
		"size": 7716,
		"path": "../public/assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff"
	},
	"/assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2": {
		"type": "font/woff2",
		"etag": "\"1afc-n4B34LOKKQzZt7E2sKwpyDdegaY\"",
		"mtime": "2026-03-22T12:49:46.316Z",
		"size": 6908,
		"path": "../public/assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2"
	},
	"/assets/KaTeX_Fraktur-Bold-BsDP51OF.woff": {
		"type": "font/woff",
		"etag": "\"33f0-W7r9UB8mIhlCavfyDBEDu0tzJZI\"",
		"mtime": "2026-03-22T12:49:46.318Z",
		"size": 13296,
		"path": "../public/assets/KaTeX_Fraktur-Bold-BsDP51OF.woff"
	},
	"/assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2": {
		"type": "font/woff2",
		"etag": "\"2c34-pXZMbieE0CggwLkECJ8/rHmL5Po\"",
		"mtime": "2026-03-22T12:49:46.336Z",
		"size": 11316,
		"path": "../public/assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2"
	},
	"/assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf": {
		"type": "font/ttf",
		"etag": "\"4c80-TgjdADgxJOfNlpcMyw++NcnvqqM\"",
		"mtime": "2026-03-22T12:49:46.317Z",
		"size": 19584,
		"path": "../public/assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf"
	},
	"/assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2": {
		"type": "font/woff2",
		"etag": "\"1b00-W/pJysRs0derE1E4jTfBGvWbphU\"",
		"mtime": "2026-03-22T12:49:46.314Z",
		"size": 6912,
		"path": "../public/assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2"
	},
	"/assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff": {
		"type": "font/woff",
		"etag": "\"3398-b3VjdjYPCBW0SGL1f3let8HNTbI\"",
		"mtime": "2026-03-22T12:49:46.338Z",
		"size": 13208,
		"path": "../public/assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff"
	},
	"/assets/KaTeX_Fraktur-Regular-CB_wures.ttf": {
		"type": "font/ttf",
		"etag": "\"4c74-F9tAiC3V8UBiXyjdlMQwReGJPpg\"",
		"mtime": "2026-03-22T12:49:46.319Z",
		"size": 19572,
		"path": "../public/assets/KaTeX_Fraktur-Regular-CB_wures.ttf"
	},
	"/assets/KaTeX_Main-Bold-Cx986IdX.woff2": {
		"type": "font/woff2",
		"etag": "\"62ec-MQUKGxsSP7LFnK0fdLff+Q3rj84\"",
		"mtime": "2026-03-22T12:49:46.339Z",
		"size": 25324,
		"path": "../public/assets/KaTeX_Main-Bold-Cx986IdX.woff2"
	},
	"/assets/KaTeX_Main-Bold-Jm3AIy58.woff": {
		"type": "font/woff",
		"etag": "\"74d8-9po2JQ6ubooCFzqZCapihCi6IGA\"",
		"mtime": "2026-03-22T12:49:46.339Z",
		"size": 29912,
		"path": "../public/assets/KaTeX_Main-Bold-Jm3AIy58.woff"
	},
	"/assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf": {
		"type": "font/ttf",
		"etag": "\"3038-JvJqE+an0KabSPYqzTGoGWvOf24\"",
		"mtime": "2026-03-22T12:49:46.316Z",
		"size": 12344,
		"path": "../public/assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf"
	},
	"/assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2": {
		"type": "font/woff2",
		"etag": "\"418c-pKSQW4sSb5/9VT0hpyoMJOlIA0U\"",
		"mtime": "2026-03-22T12:49:46.341Z",
		"size": 16780,
		"path": "../public/assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2"
	},
	"/assets/KaTeX_Main-Bold-waoOVXN0.ttf": {
		"type": "font/ttf",
		"etag": "\"c888-QTqz3D/DpXUidbriyuZ+tY8rMvA\"",
		"mtime": "2026-03-22T12:49:46.340Z",
		"size": 51336,
		"path": "../public/assets/KaTeX_Main-Bold-waoOVXN0.ttf"
	},
	"/assets/KaTeX_Main-BoldItalic-SpSLRI95.woff": {
		"type": "font/woff",
		"etag": "\"4bd4-A4u9yIh6lzCtlBR/xXxv9N+0hBE\"",
		"mtime": "2026-03-22T12:49:46.343Z",
		"size": 19412,
		"path": "../public/assets/KaTeX_Main-BoldItalic-SpSLRI95.woff"
	},
	"/assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf": {
		"type": "font/ttf",
		"etag": "\"80c8-umRk5EL9UK73Z4kkug8tlYHruwc\"",
		"mtime": "2026-03-22T12:49:46.342Z",
		"size": 32968,
		"path": "../public/assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf"
	},
	"/assets/KaTeX_Main-Italic-3WenGoN9.ttf": {
		"type": "font/ttf",
		"etag": "\"832c-HVZoorlK59vu/dfNaNmP6dWCXgc\"",
		"mtime": "2026-03-22T12:49:46.344Z",
		"size": 33580,
		"path": "../public/assets/KaTeX_Main-Italic-3WenGoN9.ttf"
	},
	"/assets/KaTeX_Main-Italic-BMLOBm91.woff": {
		"type": "font/woff",
		"etag": "\"4cdc-fIWJITvHAD4sIzS1HKQVKFiYer0\"",
		"mtime": "2026-03-22T12:49:46.344Z",
		"size": 19676,
		"path": "../public/assets/KaTeX_Main-Italic-BMLOBm91.woff"
	},
	"/assets/KaTeX_Main-Italic-NWA7e6Wa.woff2": {
		"type": "font/woff2",
		"etag": "\"425c-ybK1/9LyeqXGtvm6QaeytOZhAtM\"",
		"mtime": "2026-03-22T12:49:46.345Z",
		"size": 16988,
		"path": "../public/assets/KaTeX_Main-Italic-NWA7e6Wa.woff2"
	},
	"/assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2": {
		"type": "font/woff2",
		"etag": "\"2c54-+Y+JJy7KEa5BdnLFmg+qaoiAWok\"",
		"mtime": "2026-03-22T12:49:46.319Z",
		"size": 11348,
		"path": "../public/assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2"
	},
	"/assets/KaTeX_Main-Regular-Dr94JaBh.woff": {
		"type": "font/woff",
		"etag": "\"7834-/crlS6HUY17oWlRizByX5SHP1RU\"",
		"mtime": "2026-03-22T12:49:46.347Z",
		"size": 30772,
		"path": "../public/assets/KaTeX_Main-Regular-Dr94JaBh.woff"
	},
	"/assets/KaTeX_Main-Regular-B22Nviop.woff2": {
		"type": "font/woff2",
		"etag": "\"66a0-yIQIbCXOyFWBYLICb5Bu99o1cKw\"",
		"mtime": "2026-03-22T12:49:46.346Z",
		"size": 26272,
		"path": "../public/assets/KaTeX_Main-Regular-B22Nviop.woff2"
	},
	"/assets/KaTeX_Main-Regular-ypZvNtVU.ttf": {
		"type": "font/ttf",
		"etag": "\"d14c-h0TbbvjDCePchfG76YBSCti3v9Q\"",
		"mtime": "2026-03-22T12:49:46.348Z",
		"size": 53580,
		"path": "../public/assets/KaTeX_Main-Regular-ypZvNtVU.ttf"
	},
	"/assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf": {
		"type": "font/ttf",
		"etag": "\"79dc-6AzEwjLSB192KlLUa+tP+9N6Xxo\"",
		"mtime": "2026-03-22T12:49:46.349Z",
		"size": 31196,
		"path": "../public/assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf"
	},
	"/assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2": {
		"type": "font/woff2",
		"etag": "\"4010-j8udLeZaxxoMT92YYXPbcwWS7Yo\"",
		"mtime": "2026-03-22T12:49:46.350Z",
		"size": 16400,
		"path": "../public/assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2"
	},
	"/assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff": {
		"type": "font/woff",
		"etag": "\"48ec-1U5kgNbUBGxqVhmqODuqWXH7igw\"",
		"mtime": "2026-03-22T12:49:46.350Z",
		"size": 18668,
		"path": "../public/assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff"
	},
	"/assets/KaTeX_Math-Italic-DA0__PXp.woff": {
		"type": "font/woff",
		"etag": "\"493c-HBtIc54ctL4T3djAvCed3oUb26A\"",
		"mtime": "2026-03-22T12:49:46.351Z",
		"size": 18748,
		"path": "../public/assets/KaTeX_Math-Italic-DA0__PXp.woff"
	},
	"/assets/KaTeX_Math-Italic-t53AETM-.woff2": {
		"type": "font/woff2",
		"etag": "\"4038-20iD0M/5XstcA0EOMoOnN8Ue1gQ\"",
		"mtime": "2026-03-22T12:49:46.353Z",
		"size": 16440,
		"path": "../public/assets/KaTeX_Math-Italic-t53AETM-.woff2"
	},
	"/assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff": {
		"type": "font/woff",
		"etag": "\"3848-or7dyKPU0IAo1wd3btvU0k8uwPw\"",
		"mtime": "2026-03-22T12:49:46.356Z",
		"size": 14408,
		"path": "../public/assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff"
	},
	"/assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2": {
		"type": "font/woff2",
		"etag": "\"2fb8-iG5heXpSXUqvzgqvV0FP366huHM\"",
		"mtime": "2026-03-22T12:49:46.355Z",
		"size": 12216,
		"path": "../public/assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2"
	},
	"/assets/KaTeX_SansSerif-Italic-DN2j7dab.woff": {
		"type": "font/woff",
		"etag": "\"3720-dWSjZrdv2DcEHCS+70xVgKWt1A4\"",
		"mtime": "2026-03-22T12:49:46.358Z",
		"size": 14112,
		"path": "../public/assets/KaTeX_SansSerif-Italic-DN2j7dab.woff"
	},
	"/assets/KaTeX_Math-Italic-flOr_0UB.ttf": {
		"type": "font/ttf",
		"etag": "\"7a4c-npoQ2Ppa2Iyez6SQKt3U2SWAsrw\"",
		"mtime": "2026-03-22T12:49:46.353Z",
		"size": 31308,
		"path": "../public/assets/KaTeX_Math-Italic-flOr_0UB.ttf"
	},
	"/assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf": {
		"type": "font/ttf",
		"etag": "\"5fb8-ILRfU0a2htUsRFdFOT0XB7uI7B0\"",
		"mtime": "2026-03-22T12:49:46.354Z",
		"size": 24504,
		"path": "../public/assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf"
	},
	"/assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2": {
		"type": "font/woff2",
		"etag": "\"2efc-PV+jyzCfjYO03L3SdyXycPYPPus\"",
		"mtime": "2026-03-22T12:49:46.357Z",
		"size": 12028,
		"path": "../public/assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2"
	},
	"/assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2": {
		"type": "font/woff2",
		"etag": "\"2868-5F1fT0p/L/PcqfzMLxSOeB4j8pI\"",
		"mtime": "2026-03-22T12:49:46.375Z",
		"size": 10344,
		"path": "../public/assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2"
	},
	"/assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf": {
		"type": "font/ttf",
		"etag": "\"4bec-So4XoMtYqCKN1EF/vRuJnkHasEU\"",
		"mtime": "2026-03-22T12:49:46.373Z",
		"size": 19436,
		"path": "../public/assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf"
	},
	"/assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff": {
		"type": "font/woff",
		"etag": "\"301c-gEYQ9MsuLq2WlLjaLshOzo0Jw40\"",
		"mtime": "2026-03-22T12:49:46.374Z",
		"size": 12316,
		"path": "../public/assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff"
	},
	"/assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf": {
		"type": "font/ttf",
		"etag": "\"575c-mR+9wDFouxSkRHz6PlFfCabs/tw\"",
		"mtime": "2026-03-22T12:49:46.359Z",
		"size": 22364,
		"path": "../public/assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf"
	},
	"/assets/KaTeX_Script-Regular-D3wIWfF6.woff2": {
		"type": "font/woff2",
		"etag": "\"25ac-Y7gJWfH8Voma4hugy7zTmmywg5A\"",
		"mtime": "2026-03-22T12:49:46.378Z",
		"size": 9644,
		"path": "../public/assets/KaTeX_Script-Regular-D3wIWfF6.woff2"
	},
	"/assets/KaTeX_Script-Regular-D5yQViql.woff": {
		"type": "font/woff",
		"etag": "\"295c-agXNyk8fcIXmB9w4vt71V1P4b9g\"",
		"mtime": "2026-03-22T12:49:46.378Z",
		"size": 10588,
		"path": "../public/assets/KaTeX_Script-Regular-D5yQViql.woff"
	},
	"/assets/KaTeX_Script-Regular-C5JkGWo-.ttf": {
		"type": "font/ttf",
		"etag": "\"4108-xvZ12oGtKcvySyz3cPeVtNosZI4\"",
		"mtime": "2026-03-22T12:49:46.376Z",
		"size": 16648,
		"path": "../public/assets/KaTeX_Script-Regular-C5JkGWo-.ttf"
	},
	"/assets/KaTeX_Size1-Regular-C195tn64.woff": {
		"type": "font/woff",
		"etag": "\"1960-rv5mdKVlM2J8c5zXiWOY8USH4Bw\"",
		"mtime": "2026-03-22T12:49:46.379Z",
		"size": 6496,
		"path": "../public/assets/KaTeX_Size1-Regular-C195tn64.woff"
	},
	"/assets/KaTeX_Size1-Regular-mCD8mA8B.woff2": {
		"type": "font/woff2",
		"etag": "\"155c-V/pZmXShvAs31fDlzIYCMC8CtXM\"",
		"mtime": "2026-03-22T12:49:46.380Z",
		"size": 5468,
		"path": "../public/assets/KaTeX_Size1-Regular-mCD8mA8B.woff2"
	},
	"/assets/KaTeX_Size2-Regular-B7gKUWhC.ttf": {
		"type": "font/ttf",
		"etag": "\"2cf4-+vc/8+eVGE5UMWZv+v64qg4og00\"",
		"mtime": "2026-03-22T12:49:46.380Z",
		"size": 11508,
		"path": "../public/assets/KaTeX_Size2-Regular-B7gKUWhC.ttf"
	},
	"/assets/KaTeX_Size1-Regular-Dbsnue_I.ttf": {
		"type": "font/ttf",
		"etag": "\"2fc4-MoC6y8sSRZcf4BAXtHTHbDN8EMk\"",
		"mtime": "2026-03-22T12:49:46.379Z",
		"size": 12228,
		"path": "../public/assets/KaTeX_Size1-Regular-Dbsnue_I.ttf"
	},
	"/assets/KaTeX_Size2-Regular-Dy4dx90m.woff2": {
		"type": "font/woff2",
		"etag": "\"1458-7hhxNjSjvoyZcnaAhVKrGVpZj0M\"",
		"mtime": "2026-03-22T12:49:46.382Z",
		"size": 5208,
		"path": "../public/assets/KaTeX_Size2-Regular-Dy4dx90m.woff2"
	},
	"/assets/KaTeX_Size3-Regular-CTq5MqoE.woff": {
		"type": "font/woff",
		"etag": "\"1144-HaGQWm0dm8q5KwWd9ytSjepwi8s\"",
		"mtime": "2026-03-22T12:49:46.384Z",
		"size": 4420,
		"path": "../public/assets/KaTeX_Size3-Regular-CTq5MqoE.woff"
	},
	"/assets/KaTeX_Size2-Regular-oD1tc_U0.woff": {
		"type": "font/woff",
		"etag": "\"182c-RmmP8YGb0ngm/V0txLpOH2PKzfQ\"",
		"mtime": "2026-03-22T12:49:46.383Z",
		"size": 6188,
		"path": "../public/assets/KaTeX_Size2-Regular-oD1tc_U0.woff"
	},
	"/assets/KaTeX_Size3-Regular-DgpXs0kz.ttf": {
		"type": "font/ttf",
		"etag": "\"1da4-MCphsuzfgtOeZ4D0K9B+5M5nuNU\"",
		"mtime": "2026-03-22T12:49:46.386Z",
		"size": 7588,
		"path": "../public/assets/KaTeX_Size3-Regular-DgpXs0kz.ttf"
	},
	"/assets/KaTeX_Size4-Regular-BF-4gkZK.woff": {
		"type": "font/woff",
		"etag": "\"175c-j93bg1E+wiYjHr7gUHnsRfwBNXg\"",
		"mtime": "2026-03-22T12:49:46.389Z",
		"size": 5980,
		"path": "../public/assets/KaTeX_Size4-Regular-BF-4gkZK.woff"
	},
	"/assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2": {
		"type": "font/woff2",
		"etag": "\"1340-m+0X+5LyZQUB4imGLEDGQH4cVSg\"",
		"mtime": "2026-03-22T12:49:46.392Z",
		"size": 4928,
		"path": "../public/assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2"
	},
	"/assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2": {
		"type": "font/woff2",
		"etag": "\"3500-egiIP//GlYxxzAGnWguZzKPktHU\"",
		"mtime": "2026-03-22T12:49:46.393Z",
		"size": 13568,
		"path": "../public/assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2"
	},
	"/assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff": {
		"type": "font/woff",
		"etag": "\"3e9c-9ecp+k/0ZvwH4MerGXmtcMRfpdU\"",
		"mtime": "2026-03-22T12:49:46.392Z",
		"size": 16028,
		"path": "../public/assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff"
	},
	"/assets/lib-D8u-mT0G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68b4-3zHhhk0JMqz+2/ZqFEQT4Lc1TzA\"",
		"mtime": "2026-03-22T12:49:46.243Z",
		"size": 26804,
		"path": "../public/assets/lib-D8u-mT0G.js"
	},
	"/assets/KaTeX_Size4-Regular-DWFBv043.ttf": {
		"type": "font/ttf",
		"etag": "\"287c-PY2d1YoDt6RtSX9XYeYNi4RKUZk\"",
		"mtime": "2026-03-22T12:49:46.391Z",
		"size": 10364,
		"path": "../public/assets/KaTeX_Size4-Regular-DWFBv043.ttf"
	},
	"/assets/lua-BGQNVeup.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c31-i7Jv5US8VvcyTJ6soRVSZTuuSAw\"",
		"mtime": "2026-03-22T12:49:46.244Z",
		"size": 3121,
		"path": "../public/assets/lua-BGQNVeup.js"
	},
	"/assets/livescript-DqYGWgnk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff1-i5CJAXW9NRjwlM5iYwPFta1iH3M\"",
		"mtime": "2026-03-22T12:49:46.244Z",
		"size": 4081,
		"path": "../public/assets/livescript-DqYGWgnk.js"
	},
	"/assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf": {
		"type": "font/ttf",
		"etag": "\"6ba4-YpuZ+vGNl1KfIaGxAYCT5gvNBY8\"",
		"mtime": "2026-03-22T12:49:46.395Z",
		"size": 27556,
		"path": "../public/assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf"
	},
	"/assets/mathematica-CbRqq8Bp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76b-vnkQ4HlmmWSRirNZGZc/mDjyvvk\"",
		"mtime": "2026-03-22T12:49:46.245Z",
		"size": 1899,
		"path": "../public/assets/mathematica-CbRqq8Bp.js"
	},
	"/assets/mirc-o4qHyZd-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"171d-egM3BL3tL0647Z0CIEjPYO7sQzs\"",
		"mtime": "2026-03-22T12:49:46.246Z",
		"size": 5917,
		"path": "../public/assets/mirc-o4qHyZd-.js"
	},
	"/assets/mbox-DaE3O5kI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56a-fDQEjDxNsxanChYz7hmnpRXFwQg\"",
		"mtime": "2026-03-22T12:49:46.245Z",
		"size": 1386,
		"path": "../public/assets/mbox-DaE3O5kI.js"
	},
	"/assets/modelica-DmZe9DG9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aeb-E+9N4dGjmgtq21x9pFAMeO0jJc4\"",
		"mtime": "2026-03-22T12:49:46.248Z",
		"size": 2795,
		"path": "../public/assets/modelica-DmZe9DG9.js"
	},
	"/assets/mllike-Derr-2D9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12d7-8lt03GMkPTxg+3U/MikN9cRyijA\"",
		"mtime": "2026-03-22T12:49:46.247Z",
		"size": 4823,
		"path": "../public/assets/mllike-Derr-2D9.js"
	},
	"/assets/mumps-Ia8_D-Fr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"72c-vs+zcsQtYLWHnC3ybJChPz51XP8\"",
		"mtime": "2026-03-22T12:49:46.249Z",
		"size": 1836,
		"path": "../public/assets/mumps-Ia8_D-Fr.js"
	},
	"/assets/mscgen-BYxj_Z42.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dab-RyiN4h7XuDbI4RHMMz3GjDhwObY\"",
		"mtime": "2026-03-22T12:49:46.249Z",
		"size": 3499,
		"path": "../public/assets/mscgen-BYxj_Z42.js"
	},
	"/assets/nginx-CDiKKhnP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cf1-fBknfvIhX/2eQLyYAYRhg0AfoOU\"",
		"mtime": "2026-03-22T12:49:46.250Z",
		"size": 7409,
		"path": "../public/assets/nginx-CDiKKhnP.js"
	},
	"/assets/nsis-BPW9qCPi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a94-EJS8Q0HW/MUfb6caPE9HIJq5Gg0\"",
		"mtime": "2026-03-22T12:49:46.251Z",
		"size": 6804,
		"path": "../public/assets/nsis-BPW9qCPi.js"
	},
	"/assets/ntriples-CjbXXNDZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81d-9Q2NwXg5/tBaonhrGMLlHTvuKuA\"",
		"mtime": "2026-03-22T12:49:46.252Z",
		"size": 2077,
		"path": "../public/assets/ntriples-CjbXXNDZ.js"
	},
	"/assets/octave-BTBFDCZ_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"835-Bn03O7qjkBzDAKRF3v+ev/nDOV8\"",
		"mtime": "2026-03-22T12:49:46.252Z",
		"size": 2101,
		"path": "../public/assets/octave-BTBFDCZ_.js"
	},
	"/assets/oz-DPkdzy1Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b41-/Etdp5gqOOGXWTjcYv0YTX58YqQ\"",
		"mtime": "2026-03-22T12:49:46.254Z",
		"size": 2881,
		"path": "../public/assets/oz-DPkdzy1Y.js"
	},
	"/assets/pascal-DH8Fk7P2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d0-2ZiN4lutNq/Q2RvALIQHR2VyhZY\"",
		"mtime": "2026-03-22T12:49:46.255Z",
		"size": 2256,
		"path": "../public/assets/pascal-DH8Fk7P2.js"
	},
	"/assets/pig-DmDvTJx9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d1-lCBV+6uXlvTxljeHxobc/JmOUyA\"",
		"mtime": "2026-03-22T12:49:46.256Z",
		"size": 2513,
		"path": "../public/assets/pig-DmDvTJx9.js"
	},
	"/assets/perl-DEV2k1_P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2616-xiosTu6YnxpkE+G9xdoQdjlQXiw\"",
		"mtime": "2026-03-22T12:49:46.256Z",
		"size": 9750,
		"path": "../public/assets/perl-DEV2k1_P.js"
	},
	"/assets/powershell-93WuShDl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e13-r/x8o+ywhh83VCUaPAdFOyIGGLY\"",
		"mtime": "2026-03-22T12:49:46.258Z",
		"size": 7699,
		"path": "../public/assets/powershell-93WuShDl.js"
	},
	"/assets/PointerEffectsClient-B7R8fOFy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51b-tf1AkMAA+qiZNFA5OMHhpmmfqZE\"",
		"mtime": "2026-03-22T12:49:46.175Z",
		"size": 1307,
		"path": "../public/assets/PointerEffectsClient-B7R8fOFy.js"
	},
	"/assets/properties-Cyn3259X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"298-kyDxERFqoz5CxmueQXE5q/jv3o0\"",
		"mtime": "2026-03-22T12:49:46.259Z",
		"size": 664,
		"path": "../public/assets/properties-Cyn3259X.js"
	},
	"/assets/pug-CU6hCQPH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a0e-YDi8F8TFwJ+tpaG5QCCLWzYNfyw\"",
		"mtime": "2026-03-22T12:49:46.261Z",
		"size": 6670,
		"path": "../public/assets/pug-CU6hCQPH.js"
	},
	"/assets/protobuf-DGIYxKbG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"322-QzwZ8BYjUYu3byeTzWrdrB58WQA\"",
		"mtime": "2026-03-22T12:49:46.260Z",
		"size": 802,
		"path": "../public/assets/protobuf-DGIYxKbG.js"
	},
	"/assets/puppet-BhGIerN-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9ec-S0cbFbFfqkSRXMuc9kJOYb7lwDs\"",
		"mtime": "2026-03-22T12:49:46.261Z",
		"size": 2540,
		"path": "../public/assets/puppet-BhGIerN-.js"
	},
	"/assets/r-Dau5qFns.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc3-6bG2vwD6QwY1GhZUut1b0w2VY3U\"",
		"mtime": "2026-03-22T12:49:46.265Z",
		"size": 3011,
		"path": "../public/assets/r-Dau5qFns.js"
	},
	"/assets/python-DdTI0WL_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"188f-JRCtOI462NUThccQ2zBrYQwSVRA\"",
		"mtime": "2026-03-22T12:49:46.261Z",
		"size": 6287,
		"path": "../public/assets/python-DdTI0WL_.js"
	},
	"/assets/q-Db0yoaha.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6e-jYIAdoCmtnWjdSa+Pl0lQc62gcE\"",
		"mtime": "2026-03-22T12:49:46.263Z",
		"size": 3694,
		"path": "../public/assets/q-Db0yoaha.js"
	},
	"/assets/query-CNnt4dAf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ea-6iPErMSoocme3nq9vd+2cVge41M\"",
		"mtime": "2026-03-22T12:49:46.264Z",
		"size": 746,
		"path": "../public/assets/query-CNnt4dAf.js"
	},
	"/assets/rolldown-runtime-COnpUsM8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"331-hvTNPhOL1rYbwl8LYv1lABIgRZw\"",
		"mtime": "2026-03-22T12:49:46.266Z",
		"size": 817,
		"path": "../public/assets/rolldown-runtime-COnpUsM8.js"
	},
	"/assets/rpm-B4-HrVt2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"63d-vIfCokcA/k5BjBr6RX2edjDzy7E\"",
		"mtime": "2026-03-22T12:49:46.268Z",
		"size": 1597,
		"path": "../public/assets/rpm-B4-HrVt2.js"
	},
	"/assets/router-BYjuKRTt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c8-BAtV0YQu9g+kahtvU4orH0Xr1ys\"",
		"mtime": "2026-03-22T12:49:46.268Z",
		"size": 8904,
		"path": "../public/assets/router-BYjuKRTt.js"
	},
	"/assets/ruby-BuourD_P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f0-LaflYcWISTO2XAf6rXjKUEOMlLE\"",
		"mtime": "2026-03-22T12:49:46.269Z",
		"size": 5104,
		"path": "../public/assets/ruby-BuourD_P.js"
	},
	"/assets/sas-35RL82ur.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2473-8OnyqXz/XfNSic1YHdDF95zFBa0\"",
		"mtime": "2026-03-22T12:49:46.270Z",
		"size": 9331,
		"path": "../public/assets/sas-35RL82ur.js"
	},
	"/assets/scheme-Bsuk64Fz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18db-5WIt7OOKoGBE3fnnJUJYk1PyKME\"",
		"mtime": "2026-03-22T12:49:46.275Z",
		"size": 6363,
		"path": "../public/assets/scheme-Bsuk64Fz.js"
	},
	"/assets/shell-DgQdTP5W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"991-TkGdPqaAJLJeTGkX+G6SZ6DM91o\"",
		"mtime": "2026-03-22T12:49:46.276Z",
		"size": 2449,
		"path": "../public/assets/shell-DgQdTP5W.js"
	},
	"/assets/sieve-BMWJfpaz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64f-9IJ9pbP7EMtP7ONOAVmtSYEIsAg\"",
		"mtime": "2026-03-22T12:49:46.277Z",
		"size": 1615,
		"path": "../public/assets/sieve-BMWJfpaz.js"
	},
	"/assets/simple-mode-_FSHdiXs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f7-bfgW9mP/afWhUK3Oio3rGEgfZyE\"",
		"mtime": "2026-03-22T12:49:46.278Z",
		"size": 2295,
		"path": "../public/assets/simple-mode-_FSHdiXs.js"
	},
	"/assets/smalltalk-GH21axvb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7cc-hoKlYtuGUt0SCrv5e2WnE8UC3lg\"",
		"mtime": "2026-03-22T12:49:46.279Z",
		"size": 1996,
		"path": "../public/assets/smalltalk-GH21axvb.js"
	},
	"/assets/solr-DUwMXfs4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35f-sOZgJCm5hq7QNGC+h8SZZDyHSSE\"",
		"mtime": "2026-03-22T12:49:46.279Z",
		"size": 863,
		"path": "../public/assets/solr-DUwMXfs4.js"
	},
	"/assets/spreadsheet-Prm5Z6HJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"46f-8Bf9IaXBxHu2qHls+KncJaAvfmI\"",
		"mtime": "2026-03-22T12:49:46.280Z",
		"size": 1135,
		"path": "../public/assets/spreadsheet-Prm5Z6HJ.js"
	},
	"/assets/sparql-Cv9uq-Cd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d06-ogEOJgFJJJ4Wg5DdiNO0kY/DCMM\"",
		"mtime": "2026-03-22T12:49:46.279Z",
		"size": 3334,
		"path": "../public/assets/sparql-Cv9uq-Cd.js"
	},
	"/assets/sql-CZ3ZVvQo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ffd-BRxDtQ/NzFVT3v/z8aBsMMsBYw0\"",
		"mtime": "2026-03-22T12:49:46.281Z",
		"size": 36861,
		"path": "../public/assets/sql-CZ3ZVvQo.js"
	},
	"/assets/stex-Dv4WJrlM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c31-gvz//fYY4f0eUecYHmoKX2ZV98c\"",
		"mtime": "2026-03-22T12:49:46.281Z",
		"size": 3121,
		"path": "../public/assets/stex-Dv4WJrlM.js"
	},
	"/assets/stylus-ifXA5vxO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5be6-3DZemIWY77jIm+Ik4tpVHCvskhY\"",
		"mtime": "2026-03-22T12:49:46.282Z",
		"size": 23526,
		"path": "../public/assets/stylus-ifXA5vxO.js"
	},
	"/assets/swift-Bo75h6FN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"eb5-Ot74Balft9ldTSyHOBkxVmqCQis\"",
		"mtime": "2026-03-22T12:49:46.282Z",
		"size": 3765,
		"path": "../public/assets/swift-Bo75h6FN.js"
	},
	"/assets/textile-Z9hb6r6L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a74-BJ/Mm+0jCYlpW8x3U+y+YL3bcl4\"",
		"mtime": "2026-03-22T12:49:46.285Z",
		"size": 6772,
		"path": "../public/assets/textile-Z9hb6r6L.js"
	},
	"/assets/tiddlywiki-6mZ6JaIW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac8-7Lfkg1i2AOmxb1OI0j+WX5oBdMc\"",
		"mtime": "2026-03-22T12:49:46.286Z",
		"size": 2760,
		"path": "../public/assets/tiddlywiki-6mZ6JaIW.js"
	},
	"/assets/tcl-CM4bPTvj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"931-scW6rehCSCvzSPx0fxpR9hTnDOI\"",
		"mtime": "2026-03-22T12:49:46.284Z",
		"size": 2353,
		"path": "../public/assets/tcl-CM4bPTvj.js"
	},
	"/assets/tiki-9F4MqYo8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca3-xaiQakobjxS0CL25T6fPwxibKoE\"",
		"mtime": "2026-03-22T12:49:46.288Z",
		"size": 3235,
		"path": "../public/assets/tiki-9F4MqYo8.js"
	},
	"/assets/troff-BEdpIzMA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bd-WHXATSGnWvGpEdk4tAAR4BUAkzA\"",
		"mtime": "2026-03-22T12:49:46.296Z",
		"size": 957,
		"path": "../public/assets/troff-BEdpIzMA.js"
	},
	"/assets/ttcn-cfg-Bug9jy1d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fee-9INg0640zTawau+xYIzxTH5ySdg\"",
		"mtime": "2026-03-22T12:49:46.300Z",
		"size": 4078,
		"path": "../public/assets/ttcn-cfg-Bug9jy1d.js"
	},
	"/assets/turtle-Dnv7UztW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7a8-nf6rD52l8O1V4liP9nFeDOKn5Oc\"",
		"mtime": "2026-03-22T12:49:46.301Z",
		"size": 1960,
		"path": "../public/assets/turtle-Dnv7UztW.js"
	},
	"/assets/toml-DSsVaflu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a6-2CLNqbELgBf0CmHOyCwXgReuMfU\"",
		"mtime": "2026-03-22T12:49:46.289Z",
		"size": 1190,
		"path": "../public/assets/toml-DSsVaflu.js"
	},
	"/assets/ttcn-CGkyvYLh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12d8-IQLMD+ATQjRqarev+dz7vn/5Ubk\"",
		"mtime": "2026-03-22T12:49:46.298Z",
		"size": 4824,
		"path": "../public/assets/ttcn-CGkyvYLh.js"
	},
	"/assets/url-utils-B3e9KfEU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41b-F4Fq0mZ3iABBu03MZF9PjaY/5zI\"",
		"mtime": "2026-03-22T12:49:46.302Z",
		"size": 1051,
		"path": "../public/assets/url-utils-B3e9KfEU.js"
	},
	"/assets/vb-D96UZi5f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e42-sHLpsgvhrpOVcbHRtFRs6SasKpc\"",
		"mtime": "2026-03-22T12:49:46.303Z",
		"size": 3650,
		"path": "../public/assets/vb-D96UZi5f.js"
	},
	"/assets/velocity-BcRvsZma.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8f-8HURnOv7zz83gaSAuUJqlyXvY/c\"",
		"mtime": "2026-03-22T12:49:46.306Z",
		"size": 2703,
		"path": "../public/assets/velocity-BcRvsZma.js"
	},
	"/assets/verilog-BtgQFwHq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20f6-cF5OI64l2Q6HrNf8U1ArqCItETA\"",
		"mtime": "2026-03-22T12:49:46.306Z",
		"size": 8438,
		"path": "../public/assets/verilog-BtgQFwHq.js"
	},
	"/assets/vhdl-CJyq4bX6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf3-KPOEAFjHAM8OrBAZU5sKB+wH2Rk\"",
		"mtime": "2026-03-22T12:49:46.307Z",
		"size": 3315,
		"path": "../public/assets/vhdl-CJyq4bX6.js"
	},
	"/assets/vbscript-BJCmGjA9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1537-rqmSTINWjT4PUEXgVBM1pjKEPD4\"",
		"mtime": "2026-03-22T12:49:46.305Z",
		"size": 5431,
		"path": "../public/assets/vbscript-BJCmGjA9.js"
	},
	"/assets/w3c-keyname-CHcJEDvG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cf-OL/vGEfpqAMQu3nbWWBZ4ZnBTbQ\"",
		"mtime": "2026-03-22T12:49:46.307Z",
		"size": 1487,
		"path": "../public/assets/w3c-keyname-CHcJEDvG.js"
	},
	"/assets/webidl-DAAfyT1F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"991-uwLN3DNUIo9uZgvQ2JzIbCwBXlg\"",
		"mtime": "2026-03-22T12:49:46.308Z",
		"size": 2449,
		"path": "../public/assets/webidl-DAAfyT1F.js"
	},
	"/assets/xquery-FN4IK3Q3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1851-MiBieuc2g80GKF0fzen4dxZRqQo\"",
		"mtime": "2026-03-22T12:49:46.309Z",
		"size": 6225,
		"path": "../public/assets/xquery-FN4IK3Q3.js"
	},
	"/assets/yacas-CZZXvpEG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85d-txPc4QiSQNaLTfIJxGc34lAWgY4\"",
		"mtime": "2026-03-22T12:49:46.309Z",
		"size": 2141,
		"path": "../public/assets/yacas-CZZXvpEG.js"
	},
	"/assets/utils-o--DGywW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b088-7V4FqFKI9LydzUrCGe8MOy56B14\"",
		"mtime": "2026-03-22T12:49:46.303Z",
		"size": 241800,
		"path": "../public/assets/utils-o--DGywW.js"
	},
	"/assets/z80-CRBLCvG8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6db-3Umah2+GlO8a2HhdYmw1lWGIXrw\"",
		"mtime": "2026-03-22T12:49:46.310Z",
		"size": 1755,
		"path": "../public/assets/z80-CRBLCvG8.js"
	},
	"/videos/background.mp4": {
		"type": "video/mp4",
		"etag": "\"1d1cbe-YY+4QAXD8LVhBRehzCp5LLiXha8\"",
		"mtime": "2026-03-16T17:28:51.430Z",
		"size": 1907902,
		"path": "../public/videos/background.mp4"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_Ofayoe = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_Ofayoe
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function createNitroApp() {
	const hooks = void 0;
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		{
			const routeRules = getRouteRules(method, pathname);
			event.context.routeRules = routeRules?.routeRules;
			if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		}
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	for (const rule of Object.values(routeRules)) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
