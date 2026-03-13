import { i as withBasePath, n as toBrowserNavigationHref, r as toSameOriginAppPath, t as resolveRelativeHref } from "./url-utils-BKwNM2eZ.js";
import { a as useParams, c as useSearchParams, f as __toESM, i as toRscUrl, l as __commonJSMin, n as getPrefetchedUrls, o as usePathname, r as storePrefetchResponse, s as useRouter, t as getLayoutSegmentContext, u as __exportAll } from "../index.js";
import { n as clsx, t as remarkGfm } from "./lib-DHaaiRGQ.js";
import { A as VFileMessage, b as asciiAlphanumeric, c as VFile, l as visit, p as remarkParse, s as unified } from "./handle-CfrKy8bm.js";
import { n as appendSearchParamsToUrl, r as urlQueryToSearchParams } from "./query-DQfk1DxJ.js";
import { createPortal } from "react-dom";
import * as React$1 from "react";
import React, { Component, Fragment, Suspense, createContext, createElement, forwardRef, lazy, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region ../../components/WuxiaIcons.tsx
var baseProps = {
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.25,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
function WuxiaIcon({ name, className = "" }) {
	switch (name) {
		case "registration": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M6.2 9.2c.3-2 1.8-3.4 3.8-3.4 2.1 0 3.6 1.6 3.6 3.6 0 2.2-1.8 3.5-3.6 3.5-1 0-2-.3-2.7-1" }),
				/* @__PURE__ */ jsx("path", { d: "M3.5 18.3c.4-2.7 2.7-4.4 6.1-4.4 3.1 0 5.2 1.4 5.7 3.8" }),
				/* @__PURE__ */ jsx("path", { d: "M15.8 8.4c.3-1.4 1.5-2.4 3-2.4 1.7 0 3 1.3 3 3 0 1.3-.8 2.4-2 2.9" }),
				/* @__PURE__ */ jsx("path", { d: "M16.2 17.4c.5-1.4 2-2.4 3.9-2.4 1.1 0 2.1.3 2.9.8" })
			]
		});
		case "schedule": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M4.5 7.5c0-1.7 1.3-3 3-3h9c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3h-9c-1.7 0-3-1.3-3-3z" }), /* @__PURE__ */ jsx("path", { d: "M7 4v4M17 4v4M5 11h14" })]
		});
		case "help": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M6 16.6c1.9-2.1 3.9-3.2 6-3.2 2.4 0 4.4 1.2 6 3.3" }),
				/* @__PURE__ */ jsx("path", { d: "M6.8 12.1c1.4-1.8 3.1-2.7 5.2-2.7 2.2 0 3.9.8 5.2 2.5" }),
				/* @__PURE__ */ jsx("path", { d: "M12 6.2c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4z" })
			]
		});
		case "news": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M7.5 3.5h8.5l4.5 4.8v11.7c0 1.1-.9 2-2 2H7.5c-1.1 0-2-.9-2-2v-14c0-1.1.9-2 2-2z" }),
				/* @__PURE__ */ jsx("path", { d: "M15.5 3.5v4.5h4.7" }),
				/* @__PURE__ */ jsx("path", { d: "M9.5 12.2h7.8M9.5 16h6.2" })
			]
		});
		case "about": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "8.5"
				}),
				/* @__PURE__ */ jsx("path", { d: "M12 11v4.6" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "8.1",
					r: "0.9",
					fill: "currentColor",
					stroke: "none"
				})
			]
		});
		case "guides": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M4.5 5.2h6.8c1.8 0 3.2 1.4 3.2 3.2v11.4H7.8c-1.8 0-3.3 1.5-3.3 3.3z" }), /* @__PURE__ */ jsx("path", { d: "M19.5 5.2h-5.6v14.6h5.6c1 0 1.9-.9 1.9-1.9V7.1c0-1-.9-1.9-1.9-1.9z" })]
		});
		case "absences": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M16.2 4.8a7.2 7.2 0 1 0 3.9 11.8 6.6 6.6 0 1 1-3.9-11.8z" }), /* @__PURE__ */ jsx("path", { d: "M12.4 8.8c.8.5 1.3 1.2 1.3 2.1 0 1.3-1 2.2-2.5 2.4" })]
		});
		case "calculator": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M6 4.8h12c1.1 0 2 .9 2 2v10.4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6.8c0-1.1.9-2 2-2z" }),
				/* @__PURE__ */ jsx("path", { d: "M4.5 9.8h15M8 12.8h8M8 16.3h8" }),
				/* @__PURE__ */ jsx("path", { d: "M8.3 7.5h.8M11.8 7.5h.8M15.3 7.5h.8" })
			]
		});
		case "profile": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "8",
					r: "3.3"
				}),
				/* @__PURE__ */ jsx("path", { d: "M4 20a8 8 0 0 1 16 0" }),
				/* @__PURE__ */ jsx("path", { d: "M17.5 4.5h2.8M18.9 3.1v2.8" })
			]
		});
		case "seal": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "8.2"
				}),
				/* @__PURE__ */ jsx("path", { d: "M12 4v2.4M12 17.6V20" }),
				/* @__PURE__ */ jsx("path", { d: "M4 12h2.4M17.6 12H20" }),
				/* @__PURE__ */ jsx("path", { d: "M7.2 7.2l1.7 1.7M15.1 15.1l1.7 1.7" }),
				/* @__PURE__ */ jsx("path", { d: "M16.8 7.2l-1.7 1.7M8.9 15.1l-1.7 1.7" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "2.2"
				})
			]
		});
		case "snowflake": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M12 2.5v19" }),
				/* @__PURE__ */ jsx("path", { d: "M5.2 6.4l13.6 11.2" }),
				/* @__PURE__ */ jsx("path", { d: "M18.8 6.4L5.2 17.6" }),
				/* @__PURE__ */ jsx("path", { d: "M12 6.2l-1.7-1.7M12 6.2l1.7-1.7" }),
				/* @__PURE__ */ jsx("path", { d: "M12 17.8l-1.7 1.7M12 17.8l1.7 1.7" }),
				/* @__PURE__ */ jsx("path", { d: "M7.3 9.4l-2.1.3M7.3 9.4l-.3-2.1" }),
				/* @__PURE__ */ jsx("path", { d: "M16.7 9.4l2.1.3M16.7 9.4l.3-2.1" }),
				/* @__PURE__ */ jsx("path", { d: "M7.3 14.6l-2.1-.3M7.3 14.6l-.3 2.1" }),
				/* @__PURE__ */ jsx("path", { d: "M16.7 14.6l2.1-.3M16.7 14.6l.3 2.1" })
			]
		});
		case "sparkle": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M12 3.4l1.5 5.2 5.1 1.5-5.1 1.5-1.5 5.2-1.5-5.2-5.1-1.5 5.1-1.5L12 3.4z" }), /* @__PURE__ */ jsx("path", { d: "M19.3 14.2l.7 2.4 2.4.7-2.4.7-.7 2.4-.7-2.4-2.4-.7 2.4-.7.7-2.4z" })]
		});
		case "dots": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "6.3",
					cy: "12",
					r: "1.1",
					fill: "currentColor",
					stroke: "none"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "1.1",
					fill: "currentColor",
					stroke: "none"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "17.7",
					cy: "12",
					r: "1.1",
					fill: "currentColor",
					stroke: "none"
				})
			]
		});
		case "skull": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M12 2.5c-4.4 0-8 3.2-8 7.4 0 3 1.8 5.6 4.4 6.7V20a1.8 1.8 0 0 0 1.8 1.8h3.6A1.8 1.8 0 0 0 15.6 20v-3.4c2.6-1.1 4.4-3.7 4.4-6.7 0-4.2-3.6-7.4-8-7.4z" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "9.4",
					cy: "11",
					r: "1.1",
					fill: "currentColor",
					stroke: "none"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "14.6",
					cy: "11",
					r: "1.1",
					fill: "currentColor",
					stroke: "none"
				}),
				/* @__PURE__ */ jsx("path", { d: "M10.2 15.4h3.6" }),
				/* @__PURE__ */ jsx("path", { d: "M10.6 19.2v-1.6M13.4 19.2v-1.6" })
			]
		});
		case "eye": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M2.6 12s3.6-6 9.4-6 9.4 6 9.4 6-3.6 6-9.4 6-9.4-6-9.4-6z" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "2.2"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "0.9",
					fill: "currentColor",
					stroke: "none"
				})
			]
		});
		case "refresh": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-2.6-6.4" }), /* @__PURE__ */ jsx("path", { d: "M21 3v6h-6" })]
		});
		case "logout": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }),
				/* @__PURE__ */ jsx("path", { d: "M10 17l5-5-5-5" }),
				/* @__PURE__ */ jsx("path", { d: "M15 12H3" })
			]
		});
		case "spinner": return /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-3.2-6.9" })
		});
		case "lockOpen": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M7 11h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" }),
				/* @__PURE__ */ jsx("path", { d: "M9 11V8.8a4 4 0 0 1 7.5-1.7" }),
				/* @__PURE__ */ jsx("path", { d: "M12 15v2" })
			]
		});
		case "shield": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M12 2.6l8 4v6c0 5.1-3.4 9.5-8 10.1-4.6-.6-8-5-8-10.1v-6l8-4z" }), /* @__PURE__ */ jsx("path", { d: "M9.2 12.3l2 2 3.8-4.2" })]
		});
		case "alertTriangle": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M12 3.2L22 21H2L12 3.2z" }),
				/* @__PURE__ */ jsx("path", { d: "M12 9v4.2" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "17.1",
					r: "0.9",
					fill: "currentColor",
					stroke: "none"
				})
			]
		});
		case "redo": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M20 7v5h-5" }), /* @__PURE__ */ jsx("path", { d: "M20 12a8 8 0 1 0-2.6 5.9" })]
		});
		case "tag": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" }), /* @__PURE__ */ jsx("circle", {
				cx: "7.6",
				cy: "7.6",
				r: "1"
			})]
		});
		case "user": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M20 21a7.2 7.2 0 0 0-16 0" }), /* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "8.5",
				r: "3.2"
			})]
		});
		case "calendar": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("rect", {
				x: "4",
				y: "5.5",
				width: "16",
				height: "15",
				rx: "2"
			}), /* @__PURE__ */ jsx("path", { d: "M8 3.5v4M16 3.5v4M4 10h16" })]
		});
		case "calendarCheck": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("rect", {
					x: "4",
					y: "5.5",
					width: "16",
					height: "15",
					rx: "2"
				}),
				/* @__PURE__ */ jsx("path", { d: "M8 3.5v4M16 3.5v4M4 10h16" }),
				/* @__PURE__ */ jsx("path", { d: "M8.5 15.2l2 2 4.2-4.6" })
			]
		});
		case "calendarX": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("rect", {
					x: "4",
					y: "5.5",
					width: "16",
					height: "15",
					rx: "2"
				}),
				/* @__PURE__ */ jsx("path", { d: "M8 3.5v4M16 3.5v4M4 10h16" }),
				/* @__PURE__ */ jsx("path", { d: "M9 14.5l6 6M15 14.5l-6 6" })
			]
		});
		case "book": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M5 4.5h10a3 3 0 0 1 3 3V20H8a3 3 0 0 0-3 3V4.5z" }), /* @__PURE__ */ jsx("path", { d: "M18 20h1.5A2.5 2.5 0 0 0 22 17.5V7A2.5 2.5 0 0 0 19.5 4.5H18" })]
		});
		case "bookOpen": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M12 6.2c-2-1.4-4-2-7-2v15c3 0 5 .6 7 2" }),
				/* @__PURE__ */ jsx("path", { d: "M12 6.2c2-1.4 4-2 7-2v15c-3 0-5 .6-7 2" }),
				/* @__PURE__ */ jsx("path", { d: "M12 6.2v15" })
			]
		});
		case "checkCircle": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}), /* @__PURE__ */ jsx("path", { d: "M8.2 12.2l2.2 2.3 5.6-6.1" })]
		});
		case "check": return /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: /* @__PURE__ */ jsx("path", { d: "M5 12.5l4 4L19 7.2" })
		});
		case "x": return /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: /* @__PURE__ */ jsx("path", { d: "M7 7l10 10M17 7L7 17" })
		});
		case "edit": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M12 20h9" }), /* @__PURE__ */ jsx("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" })]
		});
		case "thumbtack": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M8 3h8l-1 6 3 3H6l3-3-1-6z" }), /* @__PURE__ */ jsx("path", { d: "M12 12v9" })]
		});
		case "comment": return /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: /* @__PURE__ */ jsx("path", { d: "M21 14a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" })
		});
		case "plus": return /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: /* @__PURE__ */ jsx("path", { d: "M12 5v14M5 12h14" })
		});
		case "trash": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M4.5 7h15" }),
				/* @__PURE__ */ jsx("path", { d: "M10 3.8h4a1.2 1.2 0 0 1 1.2 1.2V7H8.8V5a1.2 1.2 0 0 1 1.2-1.2z" }),
				/* @__PURE__ */ jsx("path", { d: "M7 7l1 14h8l1-14" }),
				/* @__PURE__ */ jsx("path", { d: "M10 11v6M14 11v6" })
			]
		});
		case "pvp":
		case "sword": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M14 3l7 7-4.2 4.2-7-7L14 3z" }),
				/* @__PURE__ */ jsx("path", { d: "M9.8 7.2L4.2 12.8" }),
				/* @__PURE__ */ jsx("path", { d: "M5 19l3-3" }),
				/* @__PURE__ */ jsx("path", { d: "M3.6 20.4l2.2-2.2 2.2 2.2-2.2 2.2-2.2-2.2z" })
			]
		});
		case "usersSlash": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M3 3l18 18" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "10",
					cy: "9",
					r: "3"
				}),
				/* @__PURE__ */ jsx("path", { d: "M3.8 19c.6-2.9 3-4.6 6.2-4.6 1.4 0 2.6.3 3.6.9" }),
				/* @__PURE__ */ jsx("path", { d: "M16.8 8.6c.2-1.2 1.2-2 2.6-2 1.6 0 2.8 1.2 2.8 2.8 0 1.2-.7 2.2-1.7 2.6" })
			]
		});
		case "list": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M8 6h13M8 12h13M8 18h13" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "4",
					cy: "6",
					r: "1",
					fill: "currentColor",
					stroke: "none"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "4",
					cy: "12",
					r: "1",
					fill: "currentColor",
					stroke: "none"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "4",
					cy: "18",
					r: "1",
					fill: "currentColor",
					stroke: "none"
				})
			]
		});
		case "quote": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M10 10c0-1.7-1.3-3-3-3H5c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2c1.7 0 3-1.3 3-3v-2z" }), /* @__PURE__ */ jsx("path", { d: "M20 10c0-1.7-1.3-3-3-3h-2c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2c1.7 0 3-1.3 3-3v-2z" })]
		});
		case "image": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("rect", {
					x: "3",
					y: "3",
					width: "18",
					height: "18",
					rx: "2"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "8.5",
					cy: "8.5",
					r: "1.5"
				}),
				/* @__PURE__ */ jsx("path", { d: "M21 15l-5-5L5 21" })
			]
		});
		case "upload": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
				/* @__PURE__ */ jsx("polyline", { points: "17 8 12 3 7 8" }),
				/* @__PURE__ */ jsx("line", {
					x1: "12",
					y1: "3",
					x2: "12",
					y2: "15"
				})
			]
		});
		case "link": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("path", { d: "M10 13a5 5 0 0 0 7.5 4.3l3-3a5 5 0 0 0-7-7l-1.5 1.5" }), /* @__PURE__ */ jsx("path", { d: "M14 11a5 5 0 0 0-7.5-4.3l-3 3a5 5 0 0 0 7 7l1.5-1.5" })]
		});
		default: return null;
	}
}
//#endregion
//#region ../../lib/i18n/translations/ru.ts
var ru = {
	common: {
		loading: "Загрузка...",
		loadingDetails: "Призываем данные...",
		error: "Ошибка",
		retry: "Повторить",
		refresh: "Обновить",
		cancel: "Отмена",
		save: "Сохранить",
		delete: "Удалить",
		search: "Поиск...",
		all: "Все",
		noResults: "Ничего не найдено",
		total: "Всего",
		portalEyebrow: "Silent Moonfall"
	},
	nav: {
		registration: "Реестр",
		schedule: "Расписание",
		guides: "Гайды",
		news: "Новости",
		absences: "Отсутствия",
		help: "Помощь",
		about: "О нас",
		calculator: "Калькулятор DPS",
		profile: "Кабинет",
		logout: "Выход"
	},
	guides: {
		title: "Гайды гильдии",
		subtitle: "Пиши свитки. Оценивай печатью. Обсуждай — и делай гильдию сильнее.",
		create: "Написать гайд",
		search: "Поиск по названию/автору...",
		empty: "Ничего не найдено",
		emptyDescription: "Измени фильтр или напиши новый гайд.",
		loading: "Загружаем свитки знаний...",
		error: "Гайды недоступны",
		category: "Категория",
		newGuide: "Новый гайд",
		newGuideHint: "Пиши в Markdown. Предпросмотр покажет итог.",
		author: "Автор (из профиля)",
		titleField: "Название гайда",
		publish: "Опубликовать",
		saving: "Сохраняем...",
		write: "Писать",
		preview: "Предпросмотр",
		comments: "Комментарии",
		noComments: "Пока тишина. Оставь первый комментарий.",
		yourNick: "Твой профиль",
		yourComment: "Твой комментарий...",
		addComment: "Комментировать",
		sending: "Отправляем...",
		categories: {
			all: "Все",
			general: "Общее",
			pve: "PvE",
			pvp: "PvP",
			build: "Билды",
			farm: "Фарм",
			craft: "Крафт",
			training: "Тренировки"
		}
	},
	registration: {
		title: "Реестр гильдии",
		subtitle: "Состав ордена, ранги и клятвы каждого, кто носит наш знак.",
		loading: "Призываем записи ордена...",
		error: "Реестр недоступен",
		total: "Всего в ордене",
		active: "В строю",
		avgKpi: "Средний KPI",
		search: "Поиск по имени, Discord или классу...",
		allStatuses: "Все статусы",
		allRanks: "Все ранги",
		noResults: "Записей не найдено",
		noResultsHint: "Смени поиск или фильтры",
		columns: {
			number: "Знак",
			discord: "Discord",
			name: "Имя",
			rank: "Ранг",
			class: "Класс",
			guild: "Клан",
			joinDate: "Дата вступления",
			kpi: "KPI",
			status: "Статус"
		},
		ranks: {
			novice: "Новик",
			member: "Брат",
			veteran: "Ветеран",
			elite: "Элита",
			legend: "Легенда",
			gm: "ГМ"
		},
		statuses: {
			active: "Активен",
			inactive: "Неактивен",
			pending: "Ожидает",
			leave: "Отгул"
		}
	},
	schedule: {
		title: "Ритуалы сегодня",
		subtitle: "Только текущий день — без лишнего шума.",
		loading: "Открываем свитки грядущих рейдов...",
		error: "Расписание недоступно",
		sealOfDay: "Печать дня",
		noEvents: "Сегодня орден молчит. Если нужна помощь — открой запрос.",
		eventsCount: "Назначено ритуалов",
		empty: "Ничего не назначено",
		emptyDescription: "Когда появятся события — они будут здесь. А пока можно заняться билдами и подготовкой.",
		noDescription: "Без описания"
	},
	news: {
		title: "Новости",
		subtitle: "Последние новости и объявления гильдии",
		loading: "Загружаем новости...",
		error: "Не удалось загрузить новости",
		empty: "Новостей пока нет",
		emptyDescription: "Новости и объявления ещё не опубликованы",
		pinned: "Закреплено",
		comment: "Комментировать"
	},
	absences: {
		title: "Отсутствия",
		subtitle: "Заявки на отсутствие участников",
		loading: "Загружаем отсутствия...",
		error: "Не удалось загрузить отсутствия",
		empty: "Заявок нет",
		emptyFiltered: "Отсутствия не найдены",
		emptyFilteredDescription: "Нет записей под текущие фильтры",
		createRequest: "Создать заявку",
		profilePrefix: "Заявка будет оформлена от профиля:",
		currentUserFallback: "текущий пользователь",
		startDate: "Начало отсутствия",
		endDate: "Окончание отсутствия",
		reasonPlaceholder: "Причина отсутствия...",
		submitting: "Отправляем...",
		submit: "Подать заявку",
		createFailed: "Не удалось создать заявку",
		filter: "Фильтр:",
		allStatuses: "Все статусы",
		start: "Начало",
		end: "Окончание",
		reason: "Причина",
		approving: "Одобряем...",
		approve: "Одобрить",
		rejecting: "Отклоняем...",
		reject: "Отклонить",
		statuses: {
			pending: "Ожидает",
			approved: "Одобрено",
			rejected: "Отклонено"
		}
	},
	help: {
		title: "Запросы помощи",
		subtitle: "Создавай точные запросы по механикам, билдам и тактике. Офицеры увидят контекст и ответят быстрее.",
		createRequest: "Создать запрос",
		category: "Категория запроса",
		profilePrefix: "От профиля:",
		currentUserFallback: "текущий пользователь",
		gatheringStart: "Сбор: начало",
		gatheringEnd: "Сбор: конец",
		titlePlaceholder: "Коротко: что нужно?",
		detailsPlaceholder: "Подробно: билд/класс/ситуация/что уже пробовал. Чем точнее — тем быстрее ответ.",
		submitting: "Отправляем...",
		submit: "Отправить в штаб",
		createFailed: "Не удалось создать запрос",
		show: "Показать:",
		open: "Открытые",
		closed: "Закрытые",
		all: "Все",
		noRequestsTitle: "Тишина в зале ритуалов",
		noRequestsDescription: "Пока нет запросов. Открой первый — и штаб откликнется.",
		statusClosed: "Закрыт",
		statusOpen: "Открыт",
		gatheringLabel: "Сбор:",
		editTime: "Изменить время"
	},
	errors: {
		unknown: "Неизвестная ошибка",
		network: "Ошибка сети",
		unauthorized: "Требуется авторизация",
		forbidden: "Доступ запрещён",
		notFound: "Не найдено",
		server: "Ошибка сервера",
		tryAgain: "Попробовать снова",
		somethingWrong: "Что-то пошло не так"
	},
	auth: {
		memberAccess: "Доступ участника",
		portalTitle: "Портал гильдии",
		portalSubtitle: "Панель командования Justice Mobile",
		loginTab: "Вход",
		registerTab: "Регистрация",
		nickname: "Ник в гильдии",
		password: "Пароль",
		confirmPassword: "Повтори пароль",
		chooseClass: "Выбери класс",
		discordHandle: "Discord @example (необязательно)",
		loginSubmit: "Войти",
		registerSubmit: "Создать аккаунт",
		loggingIn: "Входим...",
		creatingAccount: "Создаем...",
		showPassword: "Показать пароль",
		hidePassword: "Скрыть пароль",
		showPinLogin: "Показать вход по служебному PIN",
		hidePinLogin: "Скрыть вход по служебному PIN",
		adminPinHint: "Резервный вход для офицера / главы / сис.админа",
		adminPinPlaceholder: "Officer / Head / Sysadmin PIN",
		secureAccess: "Защищенный доступ гильдии",
		activationHelp: "Нужна активация? Обратись к офицеру/главе/сис.админу",
		registrationComplete: "Регистрация завершена",
		officerApprovalNeeded: "Нужна проверка офицера",
		accountCreatedPendingApproval: "Ваша учетная запись создана. Дождитесь одобрения офицера, прежде чем вход в кабинет станет доступен.",
		gotIt: "Понятно",
		backToLogin: "К входу",
		enterNicknameAndPassword: "Укажи ник и пароль",
		enterNickname: "Укажи ник",
		chooseOrEnterClass: "Выбери или укажи класс",
		passwordTooShort: "Пароль должен быть не короче 8 символов",
		passwordsDoNotMatch: "Пароли не совпадают",
		loginFailed: "Не удалось войти",
		registerFailed: "Не удалось создать аккаунт",
		enterAdminPin: "Введи PIN офицера/главы/сис.админа",
		adminPinRejected: "PIN не принят",
		accessIntro: "Вход в личный кабинет по нику и паролю. Новые учетные записи создаются неактивными до проверки офицером, главой или сис.админом.",
		benefitAccounts: "Личные аккаунты с включением/выключением валидности",
		benefitSecurity: "Защита от brute-force и secure cookie",
		benefitPin: "Резервный вход офицера/главы/сис.админа по PIN"
	}
};
//#endregion
//#region ../../lib/i18n/translations/en.ts
var en = {
	common: {
		loading: "Loading...",
		loadingDetails: "Summoning data...",
		error: "Error",
		retry: "Retry",
		refresh: "Refresh",
		cancel: "Cancel",
		save: "Save",
		delete: "Delete",
		search: "Search...",
		all: "All",
		noResults: "No results found",
		total: "Total",
		portalEyebrow: "Silent Moonfall"
	},
	nav: {
		registration: "Registry",
		schedule: "Schedule",
		guides: "Guides",
		news: "News",
		absences: "Absences",
		help: "Help",
		about: "About",
		calculator: "DPS Calculator",
		profile: "Profile",
		logout: "Logout"
	},
	guides: {
		title: "Guild Guides",
		subtitle: "Write scrolls. Rate with seals. Discuss — and make the guild stronger.",
		create: "Write Guide",
		search: "Search by title/author...",
		empty: "Nothing found",
		emptyDescription: "Change filter or write a new guide.",
		loading: "Loading knowledge scrolls...",
		error: "Guides unavailable",
		category: "Category",
		newGuide: "New Guide",
		newGuideHint: "Write in Markdown. Preview will show the result.",
		author: "Author (from profile)",
		titleField: "Guide title",
		publish: "Publish",
		saving: "Saving...",
		write: "Write",
		preview: "Preview",
		comments: "Comments",
		noComments: "Silence for now. Leave the first comment.",
		yourNick: "Your profile",
		yourComment: "Your comment...",
		addComment: "Comment",
		sending: "Sending...",
		categories: {
			all: "All",
			general: "General",
			pve: "PvE",
			pvp: "PvP",
			build: "Builds",
			farm: "Farm",
			craft: "Craft",
			training: "Training"
		}
	},
	registration: {
		title: "Guild Registry",
		subtitle: "Order composition, ranks and oaths of everyone who bears our mark.",
		loading: "Summoning order records...",
		error: "Registry unavailable",
		total: "Total in order",
		active: "Active",
		avgKpi: "Average KPI",
		search: "Search by name, Discord or class...",
		allStatuses: "All statuses",
		allRanks: "All ranks",
		noResults: "No records found",
		noResultsHint: "Change search or filters",
		columns: {
			number: "Mark",
			discord: "Discord",
			name: "Name",
			rank: "Rank",
			class: "Class",
			guild: "Clan",
			joinDate: "Join Date",
			kpi: "KPI",
			status: "Status"
		},
		ranks: {
			novice: "Novice",
			member: "Brother",
			veteran: "Veteran",
			elite: "Elite",
			legend: "Legend",
			gm: "GM"
		},
		statuses: {
			active: "Active",
			inactive: "Inactive",
			pending: "Pending",
			leave: "Leave"
		}
	},
	schedule: {
		title: "Rituals Today",
		subtitle: "Only current day — no extra noise.",
		loading: "Opening scrolls of upcoming raids...",
		error: "Schedule unavailable",
		sealOfDay: "Seal of the Day",
		noEvents: "The order is silent today. If you need help — open a request.",
		eventsCount: "Scheduled rituals",
		empty: "Nothing scheduled",
		emptyDescription: "When events appear — they will be here. For now, you can work on builds and preparation.",
		noDescription: "No description"
	},
	news: {
		title: "News",
		subtitle: "Latest guild news and announcements",
		loading: "Loading news...",
		error: "Failed to load news",
		empty: "No news yet",
		emptyDescription: "News and announcements have not been published yet",
		pinned: "Pinned",
		comment: "Comment"
	},
	absences: {
		title: "Absences",
		subtitle: "Member absence requests",
		loading: "Loading absences...",
		error: "Failed to load absences",
		empty: "No requests",
		emptyFiltered: "No absences found",
		emptyFilteredDescription: "No records match the current filters",
		createRequest: "Create request",
		profilePrefix: "Request will be submitted from profile:",
		currentUserFallback: "current user",
		startDate: "Absence start",
		endDate: "Absence end",
		reasonPlaceholder: "Reason for absence...",
		submitting: "Sending...",
		submit: "Submit request",
		createFailed: "Failed to create request",
		filter: "Filter:",
		allStatuses: "All statuses",
		start: "Start",
		end: "End",
		reason: "Reason",
		approving: "Approving...",
		approve: "Approve",
		rejecting: "Rejecting...",
		reject: "Reject",
		statuses: {
			pending: "Pending",
			approved: "Approved",
			rejected: "Rejected"
		}
	},
	help: {
		title: "Help Requests",
		subtitle: "Create precise requests for mechanics, builds, and tactics so officers can respond faster with context.",
		createRequest: "Create request",
		category: "Request category",
		profilePrefix: "From profile:",
		currentUserFallback: "current user",
		gatheringStart: "Gathering start",
		gatheringEnd: "Gathering end",
		titlePlaceholder: "Short version: what do you need?",
		detailsPlaceholder: "Details: build/class/situation/what you already tried. The more precise you are, the faster the response.",
		submitting: "Sending...",
		submit: "Send to HQ",
		createFailed: "Failed to create request",
		show: "Show:",
		open: "Open",
		closed: "Closed",
		all: "All",
		noRequestsTitle: "Silence in the ritual hall",
		noRequestsDescription: "No requests yet. Open the first one and HQ will respond.",
		statusClosed: "Closed",
		statusOpen: "Open",
		gatheringLabel: "Gathering:",
		editTime: "Edit time"
	},
	errors: {
		unknown: "Unknown error",
		network: "Network error",
		unauthorized: "Authorization required",
		forbidden: "Access denied",
		notFound: "Not found",
		server: "Server error",
		tryAgain: "Try again",
		somethingWrong: "Something went wrong"
	},
	auth: {
		memberAccess: "Member Access",
		portalTitle: "Guild Portal",
		portalSubtitle: "Justice Mobile command dashboard",
		loginTab: "Login",
		registerTab: "Register",
		nickname: "Guild nickname",
		password: "Password",
		confirmPassword: "Repeat password",
		chooseClass: "Choose class",
		discordHandle: "Discord @example (optional)",
		loginSubmit: "Log in",
		registerSubmit: "Create account",
		loggingIn: "Signing in...",
		creatingAccount: "Creating...",
		showPassword: "Show password",
		hidePassword: "Hide password",
		showPinLogin: "Show service PIN login",
		hidePinLogin: "Hide service PIN login",
		adminPinHint: "Fallback access for officer / head / sysadmin",
		adminPinPlaceholder: "Officer / Head / Sysadmin PIN",
		secureAccess: "Secure Guild Access",
		activationHelp: "Need activation? Ask officer/head/sysadmin",
		registrationComplete: "Registration complete",
		officerApprovalNeeded: "Officer approval required",
		accountCreatedPendingApproval: "Your account has been created. Wait for officer approval before portal access becomes available.",
		gotIt: "Got it",
		backToLogin: "Back to login",
		enterNicknameAndPassword: "Enter nickname and password",
		enterNickname: "Enter nickname",
		chooseOrEnterClass: "Choose or enter a class",
		passwordTooShort: "Password must be at least 8 characters",
		passwordsDoNotMatch: "Passwords do not match",
		loginFailed: "Failed to sign in",
		registerFailed: "Failed to create account",
		enterAdminPin: "Enter officer/head/sysadmin PIN",
		adminPinRejected: "PIN rejected",
		accessIntro: "Sign in to the portal with nickname and password. New accounts stay inactive until reviewed by an officer, head, or sysadmin.",
		benefitAccounts: "Personal accounts with active/inactive validity control",
		benefitSecurity: "Brute-force protection and secure cookies",
		benefitPin: "Fallback officer/head/sysadmin PIN access"
	}
};
//#endregion
//#region ../../lib/i18n/translations/zh.ts
var zh = {
	common: {
		loading: "加载中...",
		loadingDetails: "正在唤起数据...",
		error: "错误",
		retry: "重试",
		refresh: "刷新",
		cancel: "取消",
		save: "保存",
		delete: "删除",
		search: "搜索...",
		all: "全部",
		noResults: "未找到结果",
		total: "总计",
		portalEyebrow: "寂月公会"
	},
	nav: {
		registration: "成员",
		schedule: "日程",
		guides: "攻略",
		news: "公告",
		absences: "请假",
		help: "求助",
		about: "关于",
		calculator: "DPS 计算器",
		profile: "个人页",
		logout: "退出"
	},
	guides: {
		title: "公会攻略",
		subtitle: "编写攻略，留下评价，交流思路，让公会更强。",
		create: "写攻略",
		search: "按标题/作者搜索...",
		empty: "未找到内容",
		emptyDescription: "请调整筛选或发布新攻略。",
		loading: "正在加载攻略...",
		error: "攻略暂不可用",
		category: "分类",
		newGuide: "新攻略",
		newGuideHint: "支持 Markdown，预览可查看最终效果。",
		author: "作者（来自个人页）",
		titleField: "攻略标题",
		publish: "发布",
		saving: "保存中...",
		write: "编辑",
		preview: "预览",
		comments: "评论",
		noComments: "还没有评论，来写第一条。",
		yourNick: "你的个人页",
		yourComment: "你的评论...",
		addComment: "发表评论",
		sending: "发送中...",
		categories: {
			all: "全部",
			general: "综合",
			pve: "PvE",
			pvp: "PvP",
			build: "配装",
			farm: "刷取",
			craft: "制造",
			training: "训练"
		}
	},
	registration: {
		title: "成员名册",
		subtitle: "公会成员、职位与状态一目了然。",
		loading: "正在加载名册...",
		error: "名册暂不可用",
		total: "成员总数",
		active: "活跃",
		avgKpi: "平均 KPI",
		search: "按昵称、Discord 或职业搜索...",
		allStatuses: "全部状态",
		allRanks: "全部职位",
		noResults: "未找到记录",
		noResultsHint: "请调整搜索或筛选条件",
		columns: {
			number: "编号",
			discord: "Discord",
			name: "昵称",
			rank: "职位",
			class: "职业",
			guild: "公会",
			joinDate: "加入日期",
			kpi: "KPI",
			status: "状态"
		},
		ranks: {
			novice: "新兵",
			member: "成员",
			veteran: "老兵",
			elite: "精英",
			legend: "传奇",
			gm: "会长"
		},
		statuses: {
			active: "活跃",
			inactive: "不活跃",
			pending: "待定",
			leave: "请假"
		}
	},
	schedule: {
		title: "今日安排",
		subtitle: "只看当天重点，避免信息干扰。",
		loading: "正在加载日程...",
		error: "日程暂不可用",
		sealOfDay: "今日印记",
		noEvents: "今天暂无活动。如需帮助，请创建求助。",
		eventsCount: "已安排活动",
		empty: "暂无安排",
		emptyDescription: "有新活动会显示在这里。现在可以先准备配装。",
		noDescription: "无说明"
	},
	news: {
		title: "公告",
		subtitle: "公会最新消息与通知",
		loading: "正在加载公告...",
		error: "公告加载失败",
		empty: "暂无公告",
		emptyDescription: "目前还没有发布新消息",
		pinned: "置顶",
		comment: "评论"
	},
	absences: {
		title: "请假记录",
		subtitle: "成员请假申请与状态",
		loading: "正在加载请假记录...",
		error: "请假记录加载失败",
		empty: "暂无申请",
		emptyFiltered: "未找到请假记录",
		emptyFilteredDescription: "当前筛选条件下没有记录",
		createRequest: "创建申请",
		profilePrefix: "申请将以此身份提交：",
		currentUserFallback: "当前用户",
		startDate: "请假开始",
		endDate: "请假结束",
		reasonPlaceholder: "请假原因...",
		submitting: "发送中...",
		submit: "提交申请",
		createFailed: "创建申请失败",
		filter: "筛选：",
		allStatuses: "全部状态",
		start: "开始",
		end: "结束",
		reason: "原因",
		approving: "批准中...",
		approve: "批准",
		rejecting: "拒绝中...",
		reject: "拒绝",
		statuses: {
			pending: "待处理",
			approved: "已批准",
			rejected: "已拒绝"
		}
	},
	help: {
		title: "求助请求",
		subtitle: "就机制、配装和战术发起精确求助，让官员更快带着上下文回应。",
		createRequest: "创建请求",
		category: "请求分类",
		profilePrefix: "来自身份：",
		currentUserFallback: "当前用户",
		gatheringStart: "集合开始",
		gatheringEnd: "集合结束",
		titlePlaceholder: "简短说明：你需要什么？",
		detailsPlaceholder: "详细说明：配装/职业/情况/已经尝试过什么。越具体，回复越快。",
		submitting: "发送中...",
		submit: "发送到指挥部",
		createFailed: "创建请求失败",
		show: "显示：",
		open: "开放",
		closed: "关闭",
		all: "全部",
		noRequestsTitle: "仪式大厅一片安静",
		noRequestsDescription: "暂时还没有请求。发起第一个，指挥部就会回应。",
		statusClosed: "已关闭",
		statusOpen: "开放中",
		gatheringLabel: "集合：",
		editTime: "修改时间"
	},
	errors: {
		unknown: "未知错误",
		network: "网络错误",
		unauthorized: "需要登录",
		forbidden: "无权限访问",
		notFound: "未找到",
		server: "服务器错误",
		tryAgain: "请重试",
		somethingWrong: "出现了一些问题"
	},
	auth: {
		memberAccess: "成员入口",
		portalTitle: "公会门户",
		portalSubtitle: "Justice Mobile 指挥面板",
		loginTab: "登录",
		registerTab: "注册",
		nickname: "公会昵称",
		password: "密码",
		confirmPassword: "重复密码",
		chooseClass: "选择职业",
		discordHandle: "Discord @example（可选）",
		loginSubmit: "登录",
		registerSubmit: "创建账号",
		loggingIn: "登录中...",
		creatingAccount: "创建中...",
		showPassword: "显示密码",
		hidePassword: "隐藏密码",
		showPinLogin: "显示服务 PIN 登录",
		hidePinLogin: "隐藏服务 PIN 登录",
		adminPinHint: "官员 / 会长 / 系统管理员的备用入口",
		adminPinPlaceholder: "Officer / Head / Sysadmin PIN",
		secureAccess: "公会安全访问",
		activationHelp: "需要激活？请联系官员/会长/系统管理员",
		registrationComplete: "注册完成",
		officerApprovalNeeded: "需要官员审核",
		accountCreatedPendingApproval: "你的账号已创建。请等待官员审核后再进入门户。",
		gotIt: "明白了",
		backToLogin: "返回登录",
		enterNicknameAndPassword: "请输入昵称和密码",
		enterNickname: "请输入昵称",
		chooseOrEnterClass: "请选择或填写职业",
		passwordTooShort: "密码至少需要 8 个字符",
		passwordsDoNotMatch: "两次输入的密码不一致",
		loginFailed: "登录失败",
		registerFailed: "创建账号失败",
		enterAdminPin: "请输入官员/会长/系统管理员 PIN",
		adminPinRejected: "PIN 验证失败",
		accessIntro: "使用昵称和密码登录门户。新账号会保持未激活状态，直到官员、会长或系统管理员审核通过。",
		benefitAccounts: "支持个人账号启用/停用控制",
		benefitSecurity: "具备暴力破解防护与安全 Cookie",
		benefitPin: "支持官员/会长/系统管理员 PIN 备用登录"
	}
};
//#endregion
//#region ../../lib/i18n/shared.ts
var supportedLanguages = [
	"ru",
	"en",
	"zh"
];
function isLanguage(value) {
	return typeof value === "string" && supportedLanguages.includes(value);
}
//#endregion
//#region ../../lib/i18n/context.tsx
var translations = {
	ru,
	en,
	zh
};
var I18nContext = createContext(null);
var STORAGE_KEY = "guild_portal_lang";
function getStoredLanguage() {
	if (typeof window === "undefined") return null;
	const stored = localStorage.getItem(STORAGE_KEY);
	return isLanguage(stored) ? stored : null;
}
function I18nProvider({ children, defaultLanguage: initialLanguage = "ru" }) {
	const [language, setLanguageState] = useState(() => getStoredLanguage() ?? initialLanguage);
	const setLanguage = useCallback((lang) => {
		setLanguageState(lang);
		if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, lang);
	}, []);
	useEffect(() => {
		if (typeof document !== "undefined") document.documentElement.lang = language;
	}, [language]);
	const value = {
		language,
		setLanguage,
		t: translations[language]
	};
	return /* @__PURE__ */ jsx(I18nContext.Provider, {
		value,
		children
	});
}
function useTranslation() {
	const context = useContext(I18nContext);
	if (!context) throw new Error("useTranslation must be used within I18nProvider");
	return context;
}
function useLanguage() {
	const { language, setLanguage } = useTranslation();
	return {
		language,
		setLanguage
	};
}
//#endregion
//#region ../../components/shared/ErrorBoundary.tsx
function ErrorFallback({ error, onRetry }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsx("div", {
		className: "py-12",
		children: /* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "text-center py-12",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex justify-center mb-6",
						children: /* @__PURE__ */ jsx("div", {
							className: "w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center",
							children: /* @__PURE__ */ jsx(WuxiaIcon, {
								name: "alertTriangle",
								className: "w-7 h-7 text-red-400"
							})
						})
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "text-2xl font-bold text-red-400 mb-2",
						children: t.errors.somethingWrong
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-gray-400 mb-6 max-w-md mx-auto",
						children: error?.message || t.errors.unknown
					}),
					/* @__PURE__ */ jsxs("button", {
						onClick: onRetry,
						className: "btn-primary",
						children: [/* @__PURE__ */ jsx(WuxiaIcon, {
							name: "redo",
							className: "inline-block w-5 h-5 mr-2 align-text-bottom"
						}), t.errors.tryAgain]
					})
				]
			})
		})
	});
}
var ErrorBoundary$1 = class extends Component {
	constructor(..._args) {
		super(..._args);
		this.state = {
			hasError: false,
			error: null
		};
		this.handleRetry = () => {
			this.setState({
				hasError: false,
				error: null
			});
		};
	}
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error
		};
	}
	componentDidCatch(error, errorInfo) {
		console.error("ErrorBoundary caught:", error, errorInfo);
		this.props.onError?.(error, errorInfo);
	}
	render() {
		if (this.state.hasError) return this.props.fallback || /* @__PURE__ */ jsx(ErrorFallback, {
			error: this.state.error,
			onRetry: this.handleRetry
		});
		return this.props.children;
	}
};
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set();
		this.subscribe = this.subscribe.bind(this);
	}
	subscribe(listener) {
		this.listeners.add(listener);
		this.onSubscribe();
		return () => {
			this.listeners.delete(listener);
			this.onUnsubscribe();
		};
	}
	hasListeners() {
		return this.listeners.size > 0;
	}
	onSubscribe() {}
	onUnsubscribe() {}
};
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/timeoutManager.js
var defaultTimeoutProvider = {
	setTimeout: (callback, delay) => setTimeout(callback, delay),
	clearTimeout: (timeoutId) => clearTimeout(timeoutId),
	setInterval: (callback, delay) => setInterval(callback, delay),
	clearInterval: (intervalId) => clearInterval(intervalId)
};
var TimeoutManager = class {
	#provider = defaultTimeoutProvider;
	#providerCalled = false;
	setTimeoutProvider(provider) {
		this.#provider = provider;
	}
	setTimeout(callback, delay) {
		return this.#provider.setTimeout(callback, delay);
	}
	clearTimeout(timeoutId) {
		this.#provider.clearTimeout(timeoutId);
	}
	setInterval(callback, delay) {
		return this.#provider.setInterval(callback, delay);
	}
	clearInterval(intervalId) {
		this.#provider.clearInterval(intervalId);
	}
};
var timeoutManager = new TimeoutManager();
function systemSetTimeoutZero(callback) {
	setTimeout(callback, 0);
}
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/utils.js
var isServer$1 = typeof window === "undefined" || "Deno" in globalThis;
function noop() {}
function functionalUpdate(updater, input) {
	return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
	return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
	return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
	return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
	return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
	const { type = "all", exact, fetchStatus, predicate, queryKey, stale } = filters;
	if (queryKey) {
		if (exact) {
			if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) return false;
		} else if (!partialMatchKey(query.queryKey, queryKey)) return false;
	}
	if (type !== "all") {
		const isActive = query.isActive();
		if (type === "active" && !isActive) return false;
		if (type === "inactive" && isActive) return false;
	}
	if (typeof stale === "boolean" && query.isStale() !== stale) return false;
	if (fetchStatus && fetchStatus !== query.state.fetchStatus) return false;
	if (predicate && !predicate(query)) return false;
	return true;
}
function matchMutation(filters, mutation) {
	const { exact, status, predicate, mutationKey } = filters;
	if (mutationKey) {
		if (!mutation.options.mutationKey) return false;
		if (exact) {
			if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) return false;
		} else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) return false;
	}
	if (status && mutation.state.status !== status) return false;
	if (predicate && !predicate(mutation)) return false;
	return true;
}
function hashQueryKeyByOptions(queryKey, options) {
	return (options?.queryKeyHashFn || hashKey)(queryKey);
}
function hashKey(queryKey) {
	return JSON.stringify(queryKey, (_, val) => isPlainObject$1(val) ? Object.keys(val).sort().reduce((result, key) => {
		result[key] = val[key];
		return result;
	}, {}) : val);
}
function partialMatchKey(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (a && b && typeof a === "object" && typeof b === "object") return Object.keys(b).every((key) => partialMatchKey(a[key], b[key]));
	return false;
}
var hasOwn = Object.prototype.hasOwnProperty;
function replaceEqualDeep(a, b) {
	if (a === b) return a;
	const array = isPlainArray(a) && isPlainArray(b);
	if (!array && !(isPlainObject$1(a) && isPlainObject$1(b))) return b;
	const aSize = (array ? a : Object.keys(a)).length;
	const bItems = array ? b : Object.keys(b);
	const bSize = bItems.length;
	const copy = array ? new Array(bSize) : {};
	let equalItems = 0;
	for (let i = 0; i < bSize; i++) {
		const key = array ? i : bItems[i];
		const aItem = a[key];
		const bItem = b[key];
		if (aItem === bItem) {
			copy[key] = aItem;
			if (array ? i < aSize : hasOwn.call(a, key)) equalItems++;
			continue;
		}
		if (aItem === null || bItem === null || typeof aItem !== "object" || typeof bItem !== "object") {
			copy[key] = bItem;
			continue;
		}
		const v = replaceEqualDeep(aItem, bItem);
		copy[key] = v;
		if (v === aItem) equalItems++;
	}
	return aSize === bSize && equalItems === aSize ? a : copy;
}
function shallowEqualObjects(a, b) {
	if (!b || Object.keys(a).length !== Object.keys(b).length) return false;
	for (const key in a) if (a[key] !== b[key]) return false;
	return true;
}
function isPlainArray(value) {
	return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject$1(o) {
	if (!hasObjectPrototype(o)) return false;
	const ctor = o.constructor;
	if (ctor === void 0) return true;
	const prot = ctor.prototype;
	if (!hasObjectPrototype(prot)) return false;
	if (!prot.hasOwnProperty("isPrototypeOf")) return false;
	if (Object.getPrototypeOf(o) !== Object.prototype) return false;
	return true;
}
function hasObjectPrototype(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
	return new Promise((resolve) => {
		timeoutManager.setTimeout(resolve, timeout);
	});
}
function replaceData(prevData, data, options) {
	if (typeof options.structuralSharing === "function") return options.structuralSharing(prevData, data);
	else if (options.structuralSharing !== false) return replaceEqualDeep(prevData, data);
	return data;
}
function addToEnd(items, item, max = 0) {
	const newItems = [...items, item];
	return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
	const newItems = [item, ...items];
	return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = Symbol();
function ensureQueryFn(options, fetchOptions) {
	if (!options.queryFn && fetchOptions?.initialPromise) return () => fetchOptions.initialPromise;
	if (!options.queryFn || options.queryFn === skipToken) return () => Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${options.queryHash}'`));
	return options.queryFn;
}
function shouldThrowError(throwOnError, params) {
	if (typeof throwOnError === "function") return throwOnError(...params);
	return !!throwOnError;
}
function addConsumeAwareSignal(object, getSignal, onCancelled) {
	let consumed = false;
	let signal;
	Object.defineProperty(object, "signal", {
		enumerable: true,
		get: () => {
			signal ??= getSignal();
			if (consumed) return signal;
			consumed = true;
			if (signal.aborted) onCancelled();
			else signal.addEventListener("abort", onCancelled, { once: true });
			return signal;
		}
	});
	return object;
}
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/focusManager.js
var FocusManager = class extends Subscribable {
	#focused;
	#cleanup;
	#setup;
	constructor() {
		super();
		this.#setup = (onFocus) => {
			if (!isServer$1 && window.addEventListener) {
				const listener = () => onFocus();
				window.addEventListener("visibilitychange", listener, false);
				return () => {
					window.removeEventListener("visibilitychange", listener);
				};
			}
		};
	}
	onSubscribe() {
		if (!this.#cleanup) this.setEventListener(this.#setup);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			this.#cleanup?.();
			this.#cleanup = void 0;
		}
	}
	setEventListener(setup) {
		this.#setup = setup;
		this.#cleanup?.();
		this.#cleanup = setup((focused) => {
			if (typeof focused === "boolean") this.setFocused(focused);
			else this.onFocus();
		});
	}
	setFocused(focused) {
		if (this.#focused !== focused) {
			this.#focused = focused;
			this.onFocus();
		}
	}
	onFocus() {
		const isFocused = this.isFocused();
		this.listeners.forEach((listener) => {
			listener(isFocused);
		});
	}
	isFocused() {
		if (typeof this.#focused === "boolean") return this.#focused;
		return globalThis.document?.visibilityState !== "hidden";
	}
};
var focusManager = new FocusManager();
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/thenable.js
function pendingThenable() {
	let resolve;
	let reject;
	const thenable = new Promise((_resolve, _reject) => {
		resolve = _resolve;
		reject = _reject;
	});
	thenable.status = "pending";
	thenable.catch(() => {});
	function finalize(data) {
		Object.assign(thenable, data);
		delete thenable.resolve;
		delete thenable.reject;
	}
	thenable.resolve = (value) => {
		finalize({
			status: "fulfilled",
			value
		});
		resolve(value);
	};
	thenable.reject = (reason) => {
		finalize({
			status: "rejected",
			reason
		});
		reject(reason);
	};
	return thenable;
}
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/notifyManager.js
var defaultScheduler = systemSetTimeoutZero;
function createNotifyManager() {
	let queue = [];
	let transactions = 0;
	let notifyFn = (callback) => {
		callback();
	};
	let batchNotifyFn = (callback) => {
		callback();
	};
	let scheduleFn = defaultScheduler;
	const schedule = (callback) => {
		if (transactions) queue.push(callback);
		else scheduleFn(() => {
			notifyFn(callback);
		});
	};
	const flush = () => {
		const originalQueue = queue;
		queue = [];
		if (originalQueue.length) scheduleFn(() => {
			batchNotifyFn(() => {
				originalQueue.forEach((callback) => {
					notifyFn(callback);
				});
			});
		});
	};
	return {
		batch: (callback) => {
			let result;
			transactions++;
			try {
				result = callback();
			} finally {
				transactions--;
				if (!transactions) flush();
			}
			return result;
		},
		batchCalls: (callback) => {
			return (...args) => {
				schedule(() => {
					callback(...args);
				});
			};
		},
		schedule,
		setNotifyFunction: (fn) => {
			notifyFn = fn;
		},
		setBatchNotifyFunction: (fn) => {
			batchNotifyFn = fn;
		},
		setScheduler: (fn) => {
			scheduleFn = fn;
		}
	};
}
var notifyManager = createNotifyManager();
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/onlineManager.js
var OnlineManager = class extends Subscribable {
	#online = true;
	#cleanup;
	#setup;
	constructor() {
		super();
		this.#setup = (onOnline) => {
			if (!isServer$1 && window.addEventListener) {
				const onlineListener = () => onOnline(true);
				const offlineListener = () => onOnline(false);
				window.addEventListener("online", onlineListener, false);
				window.addEventListener("offline", offlineListener, false);
				return () => {
					window.removeEventListener("online", onlineListener);
					window.removeEventListener("offline", offlineListener);
				};
			}
		};
	}
	onSubscribe() {
		if (!this.#cleanup) this.setEventListener(this.#setup);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) {
			this.#cleanup?.();
			this.#cleanup = void 0;
		}
	}
	setEventListener(setup) {
		this.#setup = setup;
		this.#cleanup?.();
		this.#cleanup = setup(this.setOnline.bind(this));
	}
	setOnline(online) {
		if (this.#online !== online) {
			this.#online = online;
			this.listeners.forEach((listener) => {
				listener(online);
			});
		}
	}
	isOnline() {
		return this.#online;
	}
};
var onlineManager = new OnlineManager();
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
	return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
	return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
	constructor(options) {
		super("CancelledError");
		this.revert = options?.revert;
		this.silent = options?.silent;
	}
};
function createRetryer(config) {
	let isRetryCancelled = false;
	let failureCount = 0;
	let continueFn;
	const thenable = pendingThenable();
	const isResolved = () => thenable.status !== "pending";
	const cancel = (cancelOptions) => {
		if (!isResolved()) {
			const error = new CancelledError(cancelOptions);
			reject(error);
			config.onCancel?.(error);
		}
	};
	const cancelRetry = () => {
		isRetryCancelled = true;
	};
	const continueRetry = () => {
		isRetryCancelled = false;
	};
	const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
	const canStart = () => canFetch(config.networkMode) && config.canRun();
	const resolve = (value) => {
		if (!isResolved()) {
			continueFn?.();
			thenable.resolve(value);
		}
	};
	const reject = (value) => {
		if (!isResolved()) {
			continueFn?.();
			thenable.reject(value);
		}
	};
	const pause = () => {
		return new Promise((continueResolve) => {
			continueFn = (value) => {
				if (isResolved() || canContinue()) continueResolve(value);
			};
			config.onPause?.();
		}).then(() => {
			continueFn = void 0;
			if (!isResolved()) config.onContinue?.();
		});
	};
	const run = () => {
		if (isResolved()) return;
		let promiseOrValue;
		const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
		try {
			promiseOrValue = initialPromise ?? config.fn();
		} catch (error) {
			promiseOrValue = Promise.reject(error);
		}
		Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
			if (isResolved()) return;
			const retry = config.retry ?? (isServer$1 ? 0 : 3);
			const retryDelay = config.retryDelay ?? defaultRetryDelay;
			const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
			const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
			if (isRetryCancelled || !shouldRetry) {
				reject(error);
				return;
			}
			failureCount++;
			config.onFail?.(failureCount, error);
			sleep(delay).then(() => {
				return canContinue() ? void 0 : pause();
			}).then(() => {
				if (isRetryCancelled) reject(error);
				else run();
			});
		});
	};
	return {
		promise: thenable,
		status: () => thenable.status,
		cancel,
		continue: () => {
			continueFn?.();
			return thenable;
		},
		cancelRetry,
		continueRetry,
		canStart,
		start: () => {
			if (canStart()) run();
			else pause().then(run);
			return thenable;
		}
	};
}
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/removable.js
var Removable = class {
	#gcTimeout;
	destroy() {
		this.clearGcTimeout();
	}
	scheduleGc() {
		this.clearGcTimeout();
		if (isValidTimeout(this.gcTime)) this.#gcTimeout = timeoutManager.setTimeout(() => {
			this.optionalRemove();
		}, this.gcTime);
	}
	updateGcTime(newGcTime) {
		this.gcTime = Math.max(this.gcTime || 0, newGcTime ?? (isServer$1 ? Infinity : 300 * 1e3));
	}
	clearGcTimeout() {
		if (this.#gcTimeout) {
			timeoutManager.clearTimeout(this.#gcTimeout);
			this.#gcTimeout = void 0;
		}
	}
};
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/query.js
var Query = class extends Removable {
	#initialState;
	#revertState;
	#cache;
	#client;
	#retryer;
	#defaultOptions;
	#abortSignalConsumed;
	constructor(config) {
		super();
		this.#abortSignalConsumed = false;
		this.#defaultOptions = config.defaultOptions;
		this.setOptions(config.options);
		this.observers = [];
		this.#client = config.client;
		this.#cache = this.#client.getQueryCache();
		this.queryKey = config.queryKey;
		this.queryHash = config.queryHash;
		this.#initialState = getDefaultState$1(this.options);
		this.state = config.state ?? this.#initialState;
		this.scheduleGc();
	}
	get meta() {
		return this.options.meta;
	}
	get promise() {
		return this.#retryer?.promise;
	}
	setOptions(options) {
		this.options = {
			...this.#defaultOptions,
			...options
		};
		this.updateGcTime(this.options.gcTime);
		if (this.state && this.state.data === void 0) {
			const defaultState = getDefaultState$1(this.options);
			if (defaultState.data !== void 0) {
				this.setState(successState(defaultState.data, defaultState.dataUpdatedAt));
				this.#initialState = defaultState;
			}
		}
	}
	optionalRemove() {
		if (!this.observers.length && this.state.fetchStatus === "idle") this.#cache.remove(this);
	}
	setData(newData, options) {
		const data = replaceData(this.state.data, newData, this.options);
		this.#dispatch({
			data,
			type: "success",
			dataUpdatedAt: options?.updatedAt,
			manual: options?.manual
		});
		return data;
	}
	setState(state, setStateOptions) {
		this.#dispatch({
			type: "setState",
			state,
			setStateOptions
		});
	}
	cancel(options) {
		const promise = this.#retryer?.promise;
		this.#retryer?.cancel(options);
		return promise ? promise.then(noop).catch(noop) : Promise.resolve();
	}
	destroy() {
		super.destroy();
		this.cancel({ silent: true });
	}
	reset() {
		this.destroy();
		this.setState(this.#initialState);
	}
	isActive() {
		return this.observers.some((observer) => resolveEnabled(observer.options.enabled, this) !== false);
	}
	isDisabled() {
		if (this.getObserversCount() > 0) return !this.isActive();
		return this.options.queryFn === skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
	}
	isStatic() {
		if (this.getObserversCount() > 0) return this.observers.some((observer) => resolveStaleTime(observer.options.staleTime, this) === "static");
		return false;
	}
	isStale() {
		if (this.getObserversCount() > 0) return this.observers.some((observer) => observer.getCurrentResult().isStale);
		return this.state.data === void 0 || this.state.isInvalidated;
	}
	isStaleByTime(staleTime = 0) {
		if (this.state.data === void 0) return true;
		if (staleTime === "static") return false;
		if (this.state.isInvalidated) return true;
		return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
	}
	onFocus() {
		this.observers.find((x) => x.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: false });
		this.#retryer?.continue();
	}
	onOnline() {
		this.observers.find((x) => x.shouldFetchOnReconnect())?.refetch({ cancelRefetch: false });
		this.#retryer?.continue();
	}
	addObserver(observer) {
		if (!this.observers.includes(observer)) {
			this.observers.push(observer);
			this.clearGcTimeout();
			this.#cache.notify({
				type: "observerAdded",
				query: this,
				observer
			});
		}
	}
	removeObserver(observer) {
		if (this.observers.includes(observer)) {
			this.observers = this.observers.filter((x) => x !== observer);
			if (!this.observers.length) {
				if (this.#retryer) if (this.#abortSignalConsumed) this.#retryer.cancel({ revert: true });
				else this.#retryer.cancelRetry();
				this.scheduleGc();
			}
			this.#cache.notify({
				type: "observerRemoved",
				query: this,
				observer
			});
		}
	}
	getObserversCount() {
		return this.observers.length;
	}
	invalidate() {
		if (!this.state.isInvalidated) this.#dispatch({ type: "invalidate" });
	}
	async fetch(options, fetchOptions) {
		if (this.state.fetchStatus !== "idle" && this.#retryer?.status() !== "rejected") {
			if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) this.cancel({ silent: true });
			else if (this.#retryer) {
				this.#retryer.continueRetry();
				return this.#retryer.promise;
			}
		}
		if (options) this.setOptions(options);
		if (!this.options.queryFn) {
			const observer = this.observers.find((x) => x.options.queryFn);
			if (observer) this.setOptions(observer.options);
		}
		const abortController = new AbortController();
		const addSignalProperty = (object) => {
			Object.defineProperty(object, "signal", {
				enumerable: true,
				get: () => {
					this.#abortSignalConsumed = true;
					return abortController.signal;
				}
			});
		};
		const fetchFn = () => {
			const queryFn = ensureQueryFn(this.options, fetchOptions);
			const createQueryFnContext = () => {
				const queryFnContext2 = {
					client: this.#client,
					queryKey: this.queryKey,
					meta: this.meta
				};
				addSignalProperty(queryFnContext2);
				return queryFnContext2;
			};
			const queryFnContext = createQueryFnContext();
			this.#abortSignalConsumed = false;
			if (this.options.persister) return this.options.persister(queryFn, queryFnContext, this);
			return queryFn(queryFnContext);
		};
		const createFetchContext = () => {
			const context2 = {
				fetchOptions,
				options: this.options,
				queryKey: this.queryKey,
				client: this.#client,
				state: this.state,
				fetchFn
			};
			addSignalProperty(context2);
			return context2;
		};
		const context = createFetchContext();
		this.options.behavior?.onFetch(context, this);
		this.#revertState = this.state;
		if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) this.#dispatch({
			type: "fetch",
			meta: context.fetchOptions?.meta
		});
		this.#retryer = createRetryer({
			initialPromise: fetchOptions?.initialPromise,
			fn: context.fetchFn,
			onCancel: (error) => {
				if (error instanceof CancelledError && error.revert) this.setState({
					...this.#revertState,
					fetchStatus: "idle"
				});
				abortController.abort();
			},
			onFail: (failureCount, error) => {
				this.#dispatch({
					type: "failed",
					failureCount,
					error
				});
			},
			onPause: () => {
				this.#dispatch({ type: "pause" });
			},
			onContinue: () => {
				this.#dispatch({ type: "continue" });
			},
			retry: context.options.retry,
			retryDelay: context.options.retryDelay,
			networkMode: context.options.networkMode,
			canRun: () => true
		});
		try {
			const data = await this.#retryer.start();
			if (data === void 0) throw new Error(`${this.queryHash} data is undefined`);
			this.setData(data);
			this.#cache.config.onSuccess?.(data, this);
			this.#cache.config.onSettled?.(data, this.state.error, this);
			return data;
		} catch (error) {
			if (error instanceof CancelledError) {
				if (error.silent) return this.#retryer.promise;
				else if (error.revert) {
					if (this.state.data === void 0) throw error;
					return this.state.data;
				}
			}
			this.#dispatch({
				type: "error",
				error
			});
			this.#cache.config.onError?.(error, this);
			this.#cache.config.onSettled?.(this.state.data, error, this);
			throw error;
		} finally {
			this.scheduleGc();
		}
	}
	#dispatch(action) {
		const reducer = (state) => {
			switch (action.type) {
				case "failed": return {
					...state,
					fetchFailureCount: action.failureCount,
					fetchFailureReason: action.error
				};
				case "pause": return {
					...state,
					fetchStatus: "paused"
				};
				case "continue": return {
					...state,
					fetchStatus: "fetching"
				};
				case "fetch": return {
					...state,
					...fetchState(state.data, this.options),
					fetchMeta: action.meta ?? null
				};
				case "success":
					const newState = {
						...state,
						...successState(action.data, action.dataUpdatedAt),
						dataUpdateCount: state.dataUpdateCount + 1,
						...!action.manual && {
							fetchStatus: "idle",
							fetchFailureCount: 0,
							fetchFailureReason: null
						}
					};
					this.#revertState = action.manual ? newState : void 0;
					return newState;
				case "error":
					const error = action.error;
					return {
						...state,
						error,
						errorUpdateCount: state.errorUpdateCount + 1,
						errorUpdatedAt: Date.now(),
						fetchFailureCount: state.fetchFailureCount + 1,
						fetchFailureReason: error,
						fetchStatus: "idle",
						status: "error",
						isInvalidated: true
					};
				case "invalidate": return {
					...state,
					isInvalidated: true
				};
				case "setState": return {
					...state,
					...action.state
				};
			}
		};
		this.state = reducer(this.state);
		notifyManager.batch(() => {
			this.observers.forEach((observer) => {
				observer.onQueryUpdate();
			});
			this.#cache.notify({
				query: this,
				type: "updated",
				action
			});
		});
	}
};
function fetchState(data, options) {
	return {
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
		...data === void 0 && {
			error: null,
			status: "pending"
		}
	};
}
function successState(data, dataUpdatedAt) {
	return {
		data,
		dataUpdatedAt: dataUpdatedAt ?? Date.now(),
		error: null,
		isInvalidated: false,
		status: "success"
	};
}
function getDefaultState$1(options) {
	const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
	const hasData = data !== void 0;
	const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
	return {
		data,
		dataUpdateCount: 0,
		dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
		error: null,
		errorUpdateCount: 0,
		errorUpdatedAt: 0,
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchMeta: null,
		isInvalidated: false,
		status: hasData ? "success" : "pending",
		fetchStatus: "idle"
	};
}
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/queryObserver.js
var QueryObserver = class extends Subscribable {
	constructor(client, options) {
		super();
		this.options = options;
		this.#client = client;
		this.#selectError = null;
		this.#currentThenable = pendingThenable();
		this.bindMethods();
		this.setOptions(options);
	}
	#client;
	#currentQuery = void 0;
	#currentQueryInitialState = void 0;
	#currentResult = void 0;
	#currentResultState;
	#currentResultOptions;
	#currentThenable;
	#selectError;
	#selectFn;
	#selectResult;
	#lastQueryWithDefinedData;
	#staleTimeoutId;
	#refetchIntervalId;
	#currentRefetchInterval;
	#trackedProps = /* @__PURE__ */ new Set();
	bindMethods() {
		this.refetch = this.refetch.bind(this);
	}
	onSubscribe() {
		if (this.listeners.size === 1) {
			this.#currentQuery.addObserver(this);
			if (shouldFetchOnMount(this.#currentQuery, this.options)) this.#executeFetch();
			else this.updateResult();
			this.#updateTimers();
		}
	}
	onUnsubscribe() {
		if (!this.hasListeners()) this.destroy();
	}
	shouldFetchOnReconnect() {
		return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnReconnect);
	}
	shouldFetchOnWindowFocus() {
		return shouldFetchOn(this.#currentQuery, this.options, this.options.refetchOnWindowFocus);
	}
	destroy() {
		this.listeners = /* @__PURE__ */ new Set();
		this.#clearStaleTimeout();
		this.#clearRefetchInterval();
		this.#currentQuery.removeObserver(this);
	}
	setOptions(options) {
		const prevOptions = this.options;
		const prevQuery = this.#currentQuery;
		this.options = this.#client.defaultQueryOptions(options);
		if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, this.#currentQuery) !== "boolean") throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
		this.#updateQuery();
		this.#currentQuery.setOptions(this.options);
		if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) this.#client.getQueryCache().notify({
			type: "observerOptionsUpdated",
			query: this.#currentQuery,
			observer: this
		});
		const mounted = this.hasListeners();
		if (mounted && shouldFetchOptionally(this.#currentQuery, prevQuery, this.options, prevOptions)) this.#executeFetch();
		this.updateResult();
		if (mounted && (this.#currentQuery !== prevQuery || resolveEnabled(this.options.enabled, this.#currentQuery) !== resolveEnabled(prevOptions.enabled, this.#currentQuery) || resolveStaleTime(this.options.staleTime, this.#currentQuery) !== resolveStaleTime(prevOptions.staleTime, this.#currentQuery))) this.#updateStaleTimeout();
		const nextRefetchInterval = this.#computeRefetchInterval();
		if (mounted && (this.#currentQuery !== prevQuery || resolveEnabled(this.options.enabled, this.#currentQuery) !== resolveEnabled(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) this.#updateRefetchInterval(nextRefetchInterval);
	}
	getOptimisticResult(options) {
		const query = this.#client.getQueryCache().build(this.#client, options);
		const result = this.createResult(query, options);
		if (shouldAssignObserverCurrentProperties(this, result)) {
			this.#currentResult = result;
			this.#currentResultOptions = this.options;
			this.#currentResultState = this.#currentQuery.state;
		}
		return result;
	}
	getCurrentResult() {
		return this.#currentResult;
	}
	trackResult(result, onPropTracked) {
		return new Proxy(result, { get: (target, key) => {
			this.trackProp(key);
			onPropTracked?.(key);
			if (key === "promise") {
				this.trackProp("data");
				if (!this.options.experimental_prefetchInRender && this.#currentThenable.status === "pending") this.#currentThenable.reject(/* @__PURE__ */ new Error("experimental_prefetchInRender feature flag is not enabled"));
			}
			return Reflect.get(target, key);
		} });
	}
	trackProp(key) {
		this.#trackedProps.add(key);
	}
	getCurrentQuery() {
		return this.#currentQuery;
	}
	refetch({ ...options } = {}) {
		return this.fetch({ ...options });
	}
	fetchOptimistic(options) {
		const defaultedOptions = this.#client.defaultQueryOptions(options);
		const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
		return query.fetch().then(() => this.createResult(query, defaultedOptions));
	}
	fetch(fetchOptions) {
		return this.#executeFetch({
			...fetchOptions,
			cancelRefetch: fetchOptions.cancelRefetch ?? true
		}).then(() => {
			this.updateResult();
			return this.#currentResult;
		});
	}
	#executeFetch(fetchOptions) {
		this.#updateQuery();
		let promise = this.#currentQuery.fetch(this.options, fetchOptions);
		if (!fetchOptions?.throwOnError) promise = promise.catch(noop);
		return promise;
	}
	#updateStaleTimeout() {
		this.#clearStaleTimeout();
		const staleTime = resolveStaleTime(this.options.staleTime, this.#currentQuery);
		if (isServer$1 || this.#currentResult.isStale || !isValidTimeout(staleTime)) return;
		const timeout = timeUntilStale(this.#currentResult.dataUpdatedAt, staleTime) + 1;
		this.#staleTimeoutId = timeoutManager.setTimeout(() => {
			if (!this.#currentResult.isStale) this.updateResult();
		}, timeout);
	}
	#computeRefetchInterval() {
		return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
	}
	#updateRefetchInterval(nextInterval) {
		this.#clearRefetchInterval();
		this.#currentRefetchInterval = nextInterval;
		if (isServer$1 || resolveEnabled(this.options.enabled, this.#currentQuery) === false || !isValidTimeout(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) return;
		this.#refetchIntervalId = timeoutManager.setInterval(() => {
			if (this.options.refetchIntervalInBackground || focusManager.isFocused()) this.#executeFetch();
		}, this.#currentRefetchInterval);
	}
	#updateTimers() {
		this.#updateStaleTimeout();
		this.#updateRefetchInterval(this.#computeRefetchInterval());
	}
	#clearStaleTimeout() {
		if (this.#staleTimeoutId) {
			timeoutManager.clearTimeout(this.#staleTimeoutId);
			this.#staleTimeoutId = void 0;
		}
	}
	#clearRefetchInterval() {
		if (this.#refetchIntervalId) {
			timeoutManager.clearInterval(this.#refetchIntervalId);
			this.#refetchIntervalId = void 0;
		}
	}
	createResult(query, options) {
		const prevQuery = this.#currentQuery;
		const prevOptions = this.options;
		const prevResult = this.#currentResult;
		const prevResultState = this.#currentResultState;
		const prevResultOptions = this.#currentResultOptions;
		const queryInitialState = query !== prevQuery ? query.state : this.#currentQueryInitialState;
		const { state } = query;
		let newState = { ...state };
		let isPlaceholderData = false;
		let data;
		if (options._optimisticResults) {
			const mounted = this.hasListeners();
			const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
			const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
			if (fetchOnMount || fetchOptionally) newState = {
				...newState,
				...fetchState(state.data, query.options)
			};
			if (options._optimisticResults === "isRestoring") newState.fetchStatus = "idle";
		}
		let { error, errorUpdatedAt, status } = newState;
		data = newState.data;
		let skipSelect = false;
		if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
			let placeholderData;
			if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
				placeholderData = prevResult.data;
				skipSelect = true;
			} else placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(this.#lastQueryWithDefinedData?.state.data, this.#lastQueryWithDefinedData) : options.placeholderData;
			if (placeholderData !== void 0) {
				status = "success";
				data = replaceData(prevResult?.data, placeholderData, options);
				isPlaceholderData = true;
			}
		}
		if (options.select && data !== void 0 && !skipSelect) if (prevResult && data === prevResultState?.data && options.select === this.#selectFn) data = this.#selectResult;
		else try {
			this.#selectFn = options.select;
			data = options.select(data);
			data = replaceData(prevResult?.data, data, options);
			this.#selectResult = data;
			this.#selectError = null;
		} catch (selectError) {
			this.#selectError = selectError;
		}
		if (this.#selectError) {
			error = this.#selectError;
			data = this.#selectResult;
			errorUpdatedAt = Date.now();
			status = "error";
		}
		const isFetching = newState.fetchStatus === "fetching";
		const isPending = status === "pending";
		const isError = status === "error";
		const isLoading = isPending && isFetching;
		const hasData = data !== void 0;
		const nextResult = {
			status,
			fetchStatus: newState.fetchStatus,
			isPending,
			isSuccess: status === "success",
			isError,
			isInitialLoading: isLoading,
			isLoading,
			data,
			dataUpdatedAt: newState.dataUpdatedAt,
			error,
			errorUpdatedAt,
			failureCount: newState.fetchFailureCount,
			failureReason: newState.fetchFailureReason,
			errorUpdateCount: newState.errorUpdateCount,
			isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
			isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
			isFetching,
			isRefetching: isFetching && !isPending,
			isLoadingError: isError && !hasData,
			isPaused: newState.fetchStatus === "paused",
			isPlaceholderData,
			isRefetchError: isError && hasData,
			isStale: isStale(query, options),
			refetch: this.refetch,
			promise: this.#currentThenable,
			isEnabled: resolveEnabled(options.enabled, query) !== false
		};
		if (this.options.experimental_prefetchInRender) {
			const finalizeThenableIfPossible = (thenable) => {
				if (nextResult.status === "error") thenable.reject(nextResult.error);
				else if (nextResult.data !== void 0) thenable.resolve(nextResult.data);
			};
			const recreateThenable = () => {
				finalizeThenableIfPossible(this.#currentThenable = nextResult.promise = pendingThenable());
			};
			const prevThenable = this.#currentThenable;
			switch (prevThenable.status) {
				case "pending":
					if (query.queryHash === prevQuery.queryHash) finalizeThenableIfPossible(prevThenable);
					break;
				case "fulfilled":
					if (nextResult.status === "error" || nextResult.data !== prevThenable.value) recreateThenable();
					break;
				case "rejected":
					if (nextResult.status !== "error" || nextResult.error !== prevThenable.reason) recreateThenable();
					break;
			}
		}
		return nextResult;
	}
	updateResult() {
		const prevResult = this.#currentResult;
		const nextResult = this.createResult(this.#currentQuery, this.options);
		this.#currentResultState = this.#currentQuery.state;
		this.#currentResultOptions = this.options;
		if (this.#currentResultState.data !== void 0) this.#lastQueryWithDefinedData = this.#currentQuery;
		if (shallowEqualObjects(nextResult, prevResult)) return;
		this.#currentResult = nextResult;
		const shouldNotifyListeners = () => {
			if (!prevResult) return true;
			const { notifyOnChangeProps } = this.options;
			const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
			if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) return true;
			const includedProps = new Set(notifyOnChangePropsValue ?? this.#trackedProps);
			if (this.options.throwOnError) includedProps.add("error");
			return Object.keys(this.#currentResult).some((key) => {
				const typedKey = key;
				return this.#currentResult[typedKey] !== prevResult[typedKey] && includedProps.has(typedKey);
			});
		};
		this.#notify({ listeners: shouldNotifyListeners() });
	}
	#updateQuery() {
		const query = this.#client.getQueryCache().build(this.#client, this.options);
		if (query === this.#currentQuery) return;
		const prevQuery = this.#currentQuery;
		this.#currentQuery = query;
		this.#currentQueryInitialState = query.state;
		if (this.hasListeners()) {
			prevQuery?.removeObserver(this);
			query.addObserver(this);
		}
	}
	onQueryUpdate() {
		this.updateResult();
		if (this.hasListeners()) this.#updateTimers();
	}
	#notify(notifyOptions) {
		notifyManager.batch(() => {
			if (notifyOptions.listeners) this.listeners.forEach((listener) => {
				listener(this.#currentResult);
			});
			this.#client.getQueryCache().notify({
				query: this.#currentQuery,
				type: "observerResultsUpdated"
			});
		});
	}
};
function shouldLoadOnMount(query, options) {
	return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
	return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
	if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
		const value = typeof field === "function" ? field(query) : field;
		return value === "always" || value !== false && isStale(query, options);
	}
	return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
	return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
	return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
	if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) return true;
	return false;
}
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function infiniteQueryBehavior(pages) {
	return { onFetch: (context, query) => {
		const options = context.options;
		const direction = context.fetchOptions?.meta?.fetchMore?.direction;
		const oldPages = context.state.data?.pages || [];
		const oldPageParams = context.state.data?.pageParams || [];
		let result = {
			pages: [],
			pageParams: []
		};
		let currentPage = 0;
		const fetchFn = async () => {
			let cancelled = false;
			const addSignalProperty = (object) => {
				addConsumeAwareSignal(object, () => context.signal, () => cancelled = true);
			};
			const queryFn = ensureQueryFn(context.options, context.fetchOptions);
			const fetchPage = async (data, param, previous) => {
				if (cancelled) return Promise.reject();
				if (param == null && data.pages.length) return Promise.resolve(data);
				const createQueryFnContext = () => {
					const queryFnContext2 = {
						client: context.client,
						queryKey: context.queryKey,
						pageParam: param,
						direction: previous ? "backward" : "forward",
						meta: context.options.meta
					};
					addSignalProperty(queryFnContext2);
					return queryFnContext2;
				};
				const page = await queryFn(createQueryFnContext());
				const { maxPages } = context.options;
				const addTo = previous ? addToStart : addToEnd;
				return {
					pages: addTo(data.pages, page, maxPages),
					pageParams: addTo(data.pageParams, param, maxPages)
				};
			};
			if (direction && oldPages.length) {
				const previous = direction === "backward";
				const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
				const oldData = {
					pages: oldPages,
					pageParams: oldPageParams
				};
				result = await fetchPage(oldData, pageParamFn(options, oldData), previous);
			} else {
				const remainingPages = pages ?? oldPages.length;
				do {
					const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
					if (currentPage > 0 && param == null) break;
					result = await fetchPage(result, param);
					currentPage++;
				} while (currentPage < remainingPages);
			}
			return result;
		};
		if (context.options.persister) context.fetchFn = () => {
			return context.options.persister?.(fetchFn, {
				client: context.client,
				queryKey: context.queryKey,
				meta: context.options.meta,
				signal: context.signal
			}, query);
		};
		else context.fetchFn = fetchFn;
	} };
}
function getNextPageParam(options, { pages, pageParams }) {
	const lastIndex = pages.length - 1;
	return pages.length > 0 ? options.getNextPageParam(pages[lastIndex], pages, pageParams[lastIndex], pageParams) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
	return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/mutation.js
var Mutation = class extends Removable {
	#client;
	#observers;
	#mutationCache;
	#retryer;
	constructor(config) {
		super();
		this.#client = config.client;
		this.mutationId = config.mutationId;
		this.#mutationCache = config.mutationCache;
		this.#observers = [];
		this.state = config.state || getDefaultState();
		this.setOptions(config.options);
		this.scheduleGc();
	}
	setOptions(options) {
		this.options = options;
		this.updateGcTime(this.options.gcTime);
	}
	get meta() {
		return this.options.meta;
	}
	addObserver(observer) {
		if (!this.#observers.includes(observer)) {
			this.#observers.push(observer);
			this.clearGcTimeout();
			this.#mutationCache.notify({
				type: "observerAdded",
				mutation: this,
				observer
			});
		}
	}
	removeObserver(observer) {
		this.#observers = this.#observers.filter((x) => x !== observer);
		this.scheduleGc();
		this.#mutationCache.notify({
			type: "observerRemoved",
			mutation: this,
			observer
		});
	}
	optionalRemove() {
		if (!this.#observers.length) if (this.state.status === "pending") this.scheduleGc();
		else this.#mutationCache.remove(this);
	}
	continue() {
		return this.#retryer?.continue() ?? this.execute(this.state.variables);
	}
	async execute(variables) {
		const onContinue = () => {
			this.#dispatch({ type: "continue" });
		};
		const mutationFnContext = {
			client: this.#client,
			meta: this.options.meta,
			mutationKey: this.options.mutationKey
		};
		this.#retryer = createRetryer({
			fn: () => {
				if (!this.options.mutationFn) return Promise.reject(/* @__PURE__ */ new Error("No mutationFn found"));
				return this.options.mutationFn(variables, mutationFnContext);
			},
			onFail: (failureCount, error) => {
				this.#dispatch({
					type: "failed",
					failureCount,
					error
				});
			},
			onPause: () => {
				this.#dispatch({ type: "pause" });
			},
			onContinue,
			retry: this.options.retry ?? 0,
			retryDelay: this.options.retryDelay,
			networkMode: this.options.networkMode,
			canRun: () => this.#mutationCache.canRun(this)
		});
		const restored = this.state.status === "pending";
		const isPaused = !this.#retryer.canStart();
		try {
			if (restored) onContinue();
			else {
				this.#dispatch({
					type: "pending",
					variables,
					isPaused
				});
				await this.#mutationCache.config.onMutate?.(variables, this, mutationFnContext);
				const context = await this.options.onMutate?.(variables, mutationFnContext);
				if (context !== this.state.context) this.#dispatch({
					type: "pending",
					context,
					variables,
					isPaused
				});
			}
			const data = await this.#retryer.start();
			await this.#mutationCache.config.onSuccess?.(data, variables, this.state.context, this, mutationFnContext);
			await this.options.onSuccess?.(data, variables, this.state.context, mutationFnContext);
			await this.#mutationCache.config.onSettled?.(data, null, this.state.variables, this.state.context, this, mutationFnContext);
			await this.options.onSettled?.(data, null, variables, this.state.context, mutationFnContext);
			this.#dispatch({
				type: "success",
				data
			});
			return data;
		} catch (error) {
			try {
				await this.#mutationCache.config.onError?.(error, variables, this.state.context, this, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onError?.(error, variables, this.state.context, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.#mutationCache.config.onSettled?.(void 0, error, this.state.variables, this.state.context, this, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onSettled?.(void 0, error, variables, this.state.context, mutationFnContext);
			} catch (e) {
				Promise.reject(e);
			}
			this.#dispatch({
				type: "error",
				error
			});
			throw error;
		} finally {
			this.#mutationCache.runNext(this);
		}
	}
	#dispatch(action) {
		const reducer = (state) => {
			switch (action.type) {
				case "failed": return {
					...state,
					failureCount: action.failureCount,
					failureReason: action.error
				};
				case "pause": return {
					...state,
					isPaused: true
				};
				case "continue": return {
					...state,
					isPaused: false
				};
				case "pending": return {
					...state,
					context: action.context,
					data: void 0,
					failureCount: 0,
					failureReason: null,
					error: null,
					isPaused: action.isPaused,
					status: "pending",
					variables: action.variables,
					submittedAt: Date.now()
				};
				case "success": return {
					...state,
					data: action.data,
					failureCount: 0,
					failureReason: null,
					error: null,
					status: "success",
					isPaused: false
				};
				case "error": return {
					...state,
					data: void 0,
					error: action.error,
					failureCount: state.failureCount + 1,
					failureReason: action.error,
					isPaused: false,
					status: "error"
				};
			}
		};
		this.state = reducer(this.state);
		notifyManager.batch(() => {
			this.#observers.forEach((observer) => {
				observer.onMutationUpdate(action);
			});
			this.#mutationCache.notify({
				mutation: this,
				type: "updated",
				action
			});
		});
	}
};
function getDefaultState() {
	return {
		context: void 0,
		data: void 0,
		error: null,
		failureCount: 0,
		failureReason: null,
		isPaused: false,
		status: "idle",
		variables: void 0,
		submittedAt: 0
	};
}
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/mutationCache.js
var MutationCache = class extends Subscribable {
	constructor(config = {}) {
		super();
		this.config = config;
		this.#mutations = /* @__PURE__ */ new Set();
		this.#scopes = /* @__PURE__ */ new Map();
		this.#mutationId = 0;
	}
	#mutations;
	#scopes;
	#mutationId;
	build(client, options, state) {
		const mutation = new Mutation({
			client,
			mutationCache: this,
			mutationId: ++this.#mutationId,
			options: client.defaultMutationOptions(options),
			state
		});
		this.add(mutation);
		return mutation;
	}
	add(mutation) {
		this.#mutations.add(mutation);
		const scope = scopeFor(mutation);
		if (typeof scope === "string") {
			const scopedMutations = this.#scopes.get(scope);
			if (scopedMutations) scopedMutations.push(mutation);
			else this.#scopes.set(scope, [mutation]);
		}
		this.notify({
			type: "added",
			mutation
		});
	}
	remove(mutation) {
		if (this.#mutations.delete(mutation)) {
			const scope = scopeFor(mutation);
			if (typeof scope === "string") {
				const scopedMutations = this.#scopes.get(scope);
				if (scopedMutations) {
					if (scopedMutations.length > 1) {
						const index = scopedMutations.indexOf(mutation);
						if (index !== -1) scopedMutations.splice(index, 1);
					} else if (scopedMutations[0] === mutation) this.#scopes.delete(scope);
				}
			}
		}
		this.notify({
			type: "removed",
			mutation
		});
	}
	canRun(mutation) {
		const scope = scopeFor(mutation);
		if (typeof scope === "string") {
			const firstPendingMutation = this.#scopes.get(scope)?.find((m) => m.state.status === "pending");
			return !firstPendingMutation || firstPendingMutation === mutation;
		} else return true;
	}
	runNext(mutation) {
		const scope = scopeFor(mutation);
		if (typeof scope === "string") return (this.#scopes.get(scope)?.find((m) => m !== mutation && m.state.isPaused))?.continue() ?? Promise.resolve();
		else return Promise.resolve();
	}
	clear() {
		notifyManager.batch(() => {
			this.#mutations.forEach((mutation) => {
				this.notify({
					type: "removed",
					mutation
				});
			});
			this.#mutations.clear();
			this.#scopes.clear();
		});
	}
	getAll() {
		return Array.from(this.#mutations);
	}
	find(filters) {
		const defaultedFilters = {
			exact: true,
			...filters
		};
		return this.getAll().find((mutation) => matchMutation(defaultedFilters, mutation));
	}
	findAll(filters = {}) {
		return this.getAll().filter((mutation) => matchMutation(filters, mutation));
	}
	notify(event) {
		notifyManager.batch(() => {
			this.listeners.forEach((listener) => {
				listener(event);
			});
		});
	}
	resumePausedMutations() {
		const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
		return notifyManager.batch(() => Promise.all(pausedMutations.map((mutation) => mutation.continue().catch(noop))));
	}
};
function scopeFor(mutation) {
	return mutation.options.scope?.id;
}
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/mutationObserver.js
var MutationObserver = class extends Subscribable {
	#client;
	#currentResult = void 0;
	#currentMutation;
	#mutateOptions;
	constructor(client, options) {
		super();
		this.#client = client;
		this.setOptions(options);
		this.bindMethods();
		this.#updateResult();
	}
	bindMethods() {
		this.mutate = this.mutate.bind(this);
		this.reset = this.reset.bind(this);
	}
	setOptions(options) {
		const prevOptions = this.options;
		this.options = this.#client.defaultMutationOptions(options);
		if (!shallowEqualObjects(this.options, prevOptions)) this.#client.getMutationCache().notify({
			type: "observerOptionsUpdated",
			mutation: this.#currentMutation,
			observer: this
		});
		if (prevOptions?.mutationKey && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) this.reset();
		else if (this.#currentMutation?.state.status === "pending") this.#currentMutation.setOptions(this.options);
	}
	onUnsubscribe() {
		if (!this.hasListeners()) this.#currentMutation?.removeObserver(this);
	}
	onMutationUpdate(action) {
		this.#updateResult();
		this.#notify(action);
	}
	getCurrentResult() {
		return this.#currentResult;
	}
	reset() {
		this.#currentMutation?.removeObserver(this);
		this.#currentMutation = void 0;
		this.#updateResult();
		this.#notify();
	}
	mutate(variables, options) {
		this.#mutateOptions = options;
		this.#currentMutation?.removeObserver(this);
		this.#currentMutation = this.#client.getMutationCache().build(this.#client, this.options);
		this.#currentMutation.addObserver(this);
		return this.#currentMutation.execute(variables);
	}
	#updateResult() {
		const state = this.#currentMutation?.state ?? getDefaultState();
		this.#currentResult = {
			...state,
			isPending: state.status === "pending",
			isSuccess: state.status === "success",
			isError: state.status === "error",
			isIdle: state.status === "idle",
			mutate: this.mutate,
			reset: this.reset
		};
	}
	#notify(action) {
		notifyManager.batch(() => {
			if (this.#mutateOptions && this.hasListeners()) {
				const variables = this.#currentResult.variables;
				const onMutateResult = this.#currentResult.context;
				const context = {
					client: this.#client,
					meta: this.options.meta,
					mutationKey: this.options.mutationKey
				};
				if (action?.type === "success") {
					try {
						this.#mutateOptions.onSuccess?.(action.data, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#mutateOptions.onSettled?.(action.data, null, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
				} else if (action?.type === "error") {
					try {
						this.#mutateOptions.onError?.(action.error, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#mutateOptions.onSettled?.(void 0, action.error, variables, onMutateResult, context);
					} catch (e) {
						Promise.reject(e);
					}
				}
			}
			this.listeners.forEach((listener) => {
				listener(this.#currentResult);
			});
		});
	}
};
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/queryCache.js
var QueryCache = class extends Subscribable {
	constructor(config = {}) {
		super();
		this.config = config;
		this.#queries = /* @__PURE__ */ new Map();
	}
	#queries;
	build(client, options, state) {
		const queryKey = options.queryKey;
		const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
		let query = this.get(queryHash);
		if (!query) {
			query = new Query({
				client,
				queryKey,
				queryHash,
				options: client.defaultQueryOptions(options),
				state,
				defaultOptions: client.getQueryDefaults(queryKey)
			});
			this.add(query);
		}
		return query;
	}
	add(query) {
		if (!this.#queries.has(query.queryHash)) {
			this.#queries.set(query.queryHash, query);
			this.notify({
				type: "added",
				query
			});
		}
	}
	remove(query) {
		const queryInMap = this.#queries.get(query.queryHash);
		if (queryInMap) {
			query.destroy();
			if (queryInMap === query) this.#queries.delete(query.queryHash);
			this.notify({
				type: "removed",
				query
			});
		}
	}
	clear() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				this.remove(query);
			});
		});
	}
	get(queryHash) {
		return this.#queries.get(queryHash);
	}
	getAll() {
		return [...this.#queries.values()];
	}
	find(filters) {
		const defaultedFilters = {
			exact: true,
			...filters
		};
		return this.getAll().find((query) => matchQuery(defaultedFilters, query));
	}
	findAll(filters = {}) {
		const queries = this.getAll();
		return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
	}
	notify(event) {
		notifyManager.batch(() => {
			this.listeners.forEach((listener) => {
				listener(event);
			});
		});
	}
	onFocus() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				query.onFocus();
			});
		});
	}
	onOnline() {
		notifyManager.batch(() => {
			this.getAll().forEach((query) => {
				query.onOnline();
			});
		});
	}
};
//#endregion
//#region ../../node_modules/@tanstack/query-core/build/modern/queryClient.js
var QueryClient = class {
	#queryCache;
	#mutationCache;
	#defaultOptions;
	#queryDefaults;
	#mutationDefaults;
	#mountCount;
	#unsubscribeFocus;
	#unsubscribeOnline;
	constructor(config = {}) {
		this.#queryCache = config.queryCache || new QueryCache();
		this.#mutationCache = config.mutationCache || new MutationCache();
		this.#defaultOptions = config.defaultOptions || {};
		this.#queryDefaults = /* @__PURE__ */ new Map();
		this.#mutationDefaults = /* @__PURE__ */ new Map();
		this.#mountCount = 0;
	}
	mount() {
		this.#mountCount++;
		if (this.#mountCount !== 1) return;
		this.#unsubscribeFocus = focusManager.subscribe(async (focused) => {
			if (focused) {
				await this.resumePausedMutations();
				this.#queryCache.onFocus();
			}
		});
		this.#unsubscribeOnline = onlineManager.subscribe(async (online) => {
			if (online) {
				await this.resumePausedMutations();
				this.#queryCache.onOnline();
			}
		});
	}
	unmount() {
		this.#mountCount--;
		if (this.#mountCount !== 0) return;
		this.#unsubscribeFocus?.();
		this.#unsubscribeFocus = void 0;
		this.#unsubscribeOnline?.();
		this.#unsubscribeOnline = void 0;
	}
	isFetching(filters) {
		return this.#queryCache.findAll({
			...filters,
			fetchStatus: "fetching"
		}).length;
	}
	isMutating(filters) {
		return this.#mutationCache.findAll({
			...filters,
			status: "pending"
		}).length;
	}
	/**
	* Imperative (non-reactive) way to retrieve data for a QueryKey.
	* Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
	*
	* Hint: Do not use this function inside a component, because it won't receive updates.
	* Use `useQuery` to create a `QueryObserver` that subscribes to changes.
	*/
	getQueryData(queryKey) {
		const options = this.defaultQueryOptions({ queryKey });
		return this.#queryCache.get(options.queryHash)?.state.data;
	}
	ensureQueryData(options) {
		const defaultedOptions = this.defaultQueryOptions(options);
		const query = this.#queryCache.build(this, defaultedOptions);
		const cachedData = query.state.data;
		if (cachedData === void 0) return this.fetchQuery(options);
		if (options.revalidateIfStale && query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))) this.prefetchQuery(defaultedOptions);
		return Promise.resolve(cachedData);
	}
	getQueriesData(filters) {
		return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
			return [queryKey, state.data];
		});
	}
	setQueryData(queryKey, updater, options) {
		const defaultedOptions = this.defaultQueryOptions({ queryKey });
		const prevData = this.#queryCache.get(defaultedOptions.queryHash)?.state.data;
		const data = functionalUpdate(updater, prevData);
		if (data === void 0) return;
		return this.#queryCache.build(this, defaultedOptions).setData(data, {
			...options,
			manual: true
		});
	}
	setQueriesData(filters, updater, options) {
		return notifyManager.batch(() => this.#queryCache.findAll(filters).map(({ queryKey }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
	}
	getQueryState(queryKey) {
		const options = this.defaultQueryOptions({ queryKey });
		return this.#queryCache.get(options.queryHash)?.state;
	}
	removeQueries(filters) {
		const queryCache = this.#queryCache;
		notifyManager.batch(() => {
			queryCache.findAll(filters).forEach((query) => {
				queryCache.remove(query);
			});
		});
	}
	resetQueries(filters, options) {
		const queryCache = this.#queryCache;
		return notifyManager.batch(() => {
			queryCache.findAll(filters).forEach((query) => {
				query.reset();
			});
			return this.refetchQueries({
				type: "active",
				...filters
			}, options);
		});
	}
	cancelQueries(filters, cancelOptions = {}) {
		const defaultedCancelOptions = {
			revert: true,
			...cancelOptions
		};
		const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions)));
		return Promise.all(promises).then(noop).catch(noop);
	}
	invalidateQueries(filters, options = {}) {
		return notifyManager.batch(() => {
			this.#queryCache.findAll(filters).forEach((query) => {
				query.invalidate();
			});
			if (filters?.refetchType === "none") return Promise.resolve();
			return this.refetchQueries({
				...filters,
				type: filters?.refetchType ?? filters?.type ?? "active"
			}, options);
		});
	}
	refetchQueries(filters, options = {}) {
		const fetchOptions = {
			...options,
			cancelRefetch: options.cancelRefetch ?? true
		};
		const promises = notifyManager.batch(() => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
			let promise = query.fetch(void 0, fetchOptions);
			if (!fetchOptions.throwOnError) promise = promise.catch(noop);
			return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
		}));
		return Promise.all(promises).then(noop);
	}
	fetchQuery(options) {
		const defaultedOptions = this.defaultQueryOptions(options);
		if (defaultedOptions.retry === void 0) defaultedOptions.retry = false;
		const query = this.#queryCache.build(this, defaultedOptions);
		return query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query)) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
	}
	prefetchQuery(options) {
		return this.fetchQuery(options).then(noop).catch(noop);
	}
	fetchInfiniteQuery(options) {
		options.behavior = infiniteQueryBehavior(options.pages);
		return this.fetchQuery(options);
	}
	prefetchInfiniteQuery(options) {
		return this.fetchInfiniteQuery(options).then(noop).catch(noop);
	}
	ensureInfiniteQueryData(options) {
		options.behavior = infiniteQueryBehavior(options.pages);
		return this.ensureQueryData(options);
	}
	resumePausedMutations() {
		if (onlineManager.isOnline()) return this.#mutationCache.resumePausedMutations();
		return Promise.resolve();
	}
	getQueryCache() {
		return this.#queryCache;
	}
	getMutationCache() {
		return this.#mutationCache;
	}
	getDefaultOptions() {
		return this.#defaultOptions;
	}
	setDefaultOptions(options) {
		this.#defaultOptions = options;
	}
	setQueryDefaults(queryKey, options) {
		this.#queryDefaults.set(hashKey(queryKey), {
			queryKey,
			defaultOptions: options
		});
	}
	getQueryDefaults(queryKey) {
		const defaults = [...this.#queryDefaults.values()];
		const result = {};
		defaults.forEach((queryDefault) => {
			if (partialMatchKey(queryKey, queryDefault.queryKey)) Object.assign(result, queryDefault.defaultOptions);
		});
		return result;
	}
	setMutationDefaults(mutationKey, options) {
		this.#mutationDefaults.set(hashKey(mutationKey), {
			mutationKey,
			defaultOptions: options
		});
	}
	getMutationDefaults(mutationKey) {
		const defaults = [...this.#mutationDefaults.values()];
		const result = {};
		defaults.forEach((queryDefault) => {
			if (partialMatchKey(mutationKey, queryDefault.mutationKey)) Object.assign(result, queryDefault.defaultOptions);
		});
		return result;
	}
	defaultQueryOptions(options) {
		if (options._defaulted) return options;
		const defaultedOptions = {
			...this.#defaultOptions.queries,
			...this.getQueryDefaults(options.queryKey),
			...options,
			_defaulted: true
		};
		if (!defaultedOptions.queryHash) defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
		if (defaultedOptions.refetchOnReconnect === void 0) defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
		if (defaultedOptions.throwOnError === void 0) defaultedOptions.throwOnError = !!defaultedOptions.suspense;
		if (!defaultedOptions.networkMode && defaultedOptions.persister) defaultedOptions.networkMode = "offlineFirst";
		if (defaultedOptions.queryFn === skipToken) defaultedOptions.enabled = false;
		return defaultedOptions;
	}
	defaultMutationOptions(options) {
		if (options?._defaulted) return options;
		return {
			...this.#defaultOptions.mutations,
			...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
			...options,
			_defaulted: true
		};
	}
	clear() {
		this.#queryCache.clear();
		this.#mutationCache.clear();
	}
};
//#endregion
//#region ../../node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
var QueryClientContext = React$1.createContext(void 0);
var useQueryClient = (queryClient) => {
	const client = React$1.useContext(QueryClientContext);
	if (queryClient) return queryClient;
	if (!client) throw new Error("No QueryClient set, use QueryClientProvider to set one");
	return client;
};
var QueryClientProvider = ({ client, children }) => {
	React$1.useEffect(() => {
		client.mount();
		return () => {
			client.unmount();
		};
	}, [client]);
	return /* @__PURE__ */ jsx(QueryClientContext.Provider, {
		value: client,
		children
	});
};
//#endregion
//#region ../../node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js
var IsRestoringContext = React$1.createContext(false);
var useIsRestoring = () => React$1.useContext(IsRestoringContext);
IsRestoringContext.Provider;
//#endregion
//#region ../../node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js
function createValue() {
	let isReset = false;
	return {
		clearReset: () => {
			isReset = false;
		},
		reset: () => {
			isReset = true;
		},
		isReset: () => {
			return isReset;
		}
	};
}
var QueryErrorResetBoundaryContext = React$1.createContext(createValue());
var useQueryErrorResetBoundary = () => React$1.useContext(QueryErrorResetBoundaryContext);
//#endregion
//#region ../../node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
	const throwOnError = query?.state.error && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
	if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
		if (!errorResetBoundary.isReset()) options.retryOnMount = false;
	}
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
	React$1.useEffect(() => {
		errorResetBoundary.clearReset();
	}, [errorResetBoundary]);
};
var getHasError = ({ result, errorResetBoundary, throwOnError, query, suspense }) => {
	return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
//#endregion
//#region ../../node_modules/@tanstack/react-query/build/modern/suspense.js
var ensureSuspenseTimers = (defaultedOptions) => {
	if (defaultedOptions.suspense) {
		const MIN_SUSPENSE_TIME_MS = 1e3;
		const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
		const originalStaleTime = defaultedOptions.staleTime;
		defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
		if (typeof defaultedOptions.gcTime === "number") defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, MIN_SUSPENSE_TIME_MS);
	}
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
	errorResetBoundary.clearReset();
});
//#endregion
//#region ../../node_modules/@tanstack/react-query/build/modern/useBaseQuery.js
function useBaseQuery(options, Observer, queryClient) {
	const isRestoring = useIsRestoring();
	const errorResetBoundary = useQueryErrorResetBoundary();
	const client = useQueryClient(queryClient);
	const defaultedOptions = client.defaultQueryOptions(options);
	client.getDefaultOptions().queries?._experimental_beforeQuery?.(defaultedOptions);
	const query = client.getQueryCache().get(defaultedOptions.queryHash);
	defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
	ensureSuspenseTimers(defaultedOptions);
	ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
	useClearResetErrorBoundary(errorResetBoundary);
	const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
	const [observer] = React$1.useState(() => new Observer(client, defaultedOptions));
	const result = observer.getOptimisticResult(defaultedOptions);
	const shouldSubscribe = !isRestoring && options.subscribed !== false;
	React$1.useSyncExternalStore(React$1.useCallback((onStoreChange) => {
		const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
		observer.updateResult();
		return unsubscribe;
	}, [observer, shouldSubscribe]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
	React$1.useEffect(() => {
		observer.setOptions(defaultedOptions);
	}, [defaultedOptions, observer]);
	if (shouldSuspend(defaultedOptions, result)) throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
	if (getHasError({
		result,
		errorResetBoundary,
		throwOnError: defaultedOptions.throwOnError,
		query,
		suspense: defaultedOptions.suspense
	})) throw result.error;
	client.getDefaultOptions().queries?._experimental_afterQuery?.(defaultedOptions, result);
	if (defaultedOptions.experimental_prefetchInRender && !isServer$1 && willFetch(result, isRestoring)) (isNewCacheEntry ? fetchOptimistic(defaultedOptions, observer, errorResetBoundary) : query?.promise)?.catch(noop).finally(() => {
		observer.updateResult();
	});
	return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
//#endregion
//#region ../../node_modules/@tanstack/react-query/build/modern/useQuery.js
function useQuery(options, queryClient) {
	return useBaseQuery(options, QueryObserver, queryClient);
}
//#endregion
//#region ../../node_modules/@tanstack/react-query/build/modern/useMutation.js
function useMutation(options, queryClient) {
	const client = useQueryClient(queryClient);
	const [observer] = React$1.useState(() => new MutationObserver(client, options));
	React$1.useEffect(() => {
		observer.setOptions(options);
	}, [observer, options]);
	const result = React$1.useSyncExternalStore(React$1.useCallback((onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)), [observer]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
	const mutate = React$1.useCallback((variables, mutateOptions) => {
		observer.mutate(variables, mutateOptions).catch(noop);
	}, [observer]);
	if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) throw result.error;
	return {
		...result,
		mutate,
		mutateAsync: result.mutate
	};
}
//#endregion
//#region ../../lib/api/generated/core/bodySerializer.gen.ts
var jsonBodySerializer = { bodySerializer: (body) => JSON.stringify(body, (_key, value) => typeof value === "bigint" ? value.toString() : value) };
Object.entries({
	$body_: "body",
	$headers_: "headers",
	$path_: "path",
	$query_: "query"
});
//#endregion
//#region ../../lib/api/generated/core/serverSentEvents.gen.ts
var createSseClient = ({ onRequest, onSseError, onSseEvent, responseTransformer, responseValidator, sseDefaultRetryDelay, sseMaxRetryAttempts, sseMaxRetryDelay, sseSleepFn, url, ...options }) => {
	let lastEventId;
	const sleep = sseSleepFn ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
	const createStream = async function* () {
		let retryDelay = sseDefaultRetryDelay ?? 3e3;
		let attempt = 0;
		const signal = options.signal ?? new AbortController().signal;
		while (true) {
			if (signal.aborted) break;
			attempt++;
			const headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
			if (lastEventId !== void 0) headers.set("Last-Event-ID", lastEventId);
			try {
				const requestInit = {
					redirect: "follow",
					...options,
					body: options.serializedBody,
					headers,
					signal
				};
				let request = new Request(url, requestInit);
				if (onRequest) request = await onRequest(url, requestInit);
				const response = await (options.fetch ?? globalThis.fetch)(request);
				if (!response.ok) throw new Error(`SSE failed: ${response.status} ${response.statusText}`);
				if (!response.body) throw new Error("No body in SSE response");
				const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
				let buffer = "";
				const abortHandler = () => {
					try {
						reader.cancel();
					} catch {}
				};
				signal.addEventListener("abort", abortHandler);
				try {
					while (true) {
						const { done, value } = await reader.read();
						if (done) break;
						buffer += value;
						buffer = buffer.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
						const chunks = buffer.split("\n\n");
						buffer = chunks.pop() ?? "";
						for (const chunk of chunks) {
							const lines = chunk.split("\n");
							const dataLines = [];
							let eventName;
							for (const line of lines) if (line.startsWith("data:")) dataLines.push(line.replace(/^data:\s*/, ""));
							else if (line.startsWith("event:")) eventName = line.replace(/^event:\s*/, "");
							else if (line.startsWith("id:")) lastEventId = line.replace(/^id:\s*/, "");
							else if (line.startsWith("retry:")) {
								const parsed = Number.parseInt(line.replace(/^retry:\s*/, ""), 10);
								if (!Number.isNaN(parsed)) retryDelay = parsed;
							}
							let data;
							let parsedJson = false;
							if (dataLines.length) {
								const rawData = dataLines.join("\n");
								try {
									data = JSON.parse(rawData);
									parsedJson = true;
								} catch {
									data = rawData;
								}
							}
							if (parsedJson) {
								if (responseValidator) await responseValidator(data);
								if (responseTransformer) data = await responseTransformer(data);
							}
							onSseEvent?.({
								data,
								event: eventName,
								id: lastEventId,
								retry: retryDelay
							});
							if (dataLines.length) yield data;
						}
					}
				} finally {
					signal.removeEventListener("abort", abortHandler);
					reader.releaseLock();
				}
				break;
			} catch (error) {
				onSseError?.(error);
				if (sseMaxRetryAttempts !== void 0 && attempt >= sseMaxRetryAttempts) break;
				await sleep(Math.min(retryDelay * 2 ** (attempt - 1), sseMaxRetryDelay ?? 3e4));
			}
		}
	};
	return { stream: createStream() };
};
//#endregion
//#region ../../lib/api/generated/core/pathSerializer.gen.ts
var separatorArrayExplode = (style) => {
	switch (style) {
		case "label": return ".";
		case "matrix": return ";";
		case "simple": return ",";
		default: return "&";
	}
};
var separatorArrayNoExplode = (style) => {
	switch (style) {
		case "form": return ",";
		case "pipeDelimited": return "|";
		case "spaceDelimited": return "%20";
		default: return ",";
	}
};
var separatorObjectExplode = (style) => {
	switch (style) {
		case "label": return ".";
		case "matrix": return ";";
		case "simple": return ",";
		default: return "&";
	}
};
var serializeArrayParam = ({ allowReserved, explode, name, style, value }) => {
	if (!explode) {
		const joinedValues = (allowReserved ? value : value.map((v) => encodeURIComponent(v))).join(separatorArrayNoExplode(style));
		switch (style) {
			case "label": return `.${joinedValues}`;
			case "matrix": return `;${name}=${joinedValues}`;
			case "simple": return joinedValues;
			default: return `${name}=${joinedValues}`;
		}
	}
	const separator = separatorArrayExplode(style);
	const joinedValues = value.map((v) => {
		if (style === "label" || style === "simple") return allowReserved ? v : encodeURIComponent(v);
		return serializePrimitiveParam({
			allowReserved,
			name,
			value: v
		});
	}).join(separator);
	return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
};
var serializePrimitiveParam = ({ allowReserved, name, value }) => {
	if (value === void 0 || value === null) return "";
	if (typeof value === "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
	return `${name}=${allowReserved ? value : encodeURIComponent(value)}`;
};
var serializeObjectParam = ({ allowReserved, explode, name, style, value, valueOnly }) => {
	if (value instanceof Date) return valueOnly ? value.toISOString() : `${name}=${value.toISOString()}`;
	if (style !== "deepObject" && !explode) {
		let values = [];
		Object.entries(value).forEach(([key, v]) => {
			values = [
				...values,
				key,
				allowReserved ? v : encodeURIComponent(v)
			];
		});
		const joinedValues = values.join(",");
		switch (style) {
			case "form": return `${name}=${joinedValues}`;
			case "label": return `.${joinedValues}`;
			case "matrix": return `;${name}=${joinedValues}`;
			default: return joinedValues;
		}
	}
	const separator = separatorObjectExplode(style);
	const joinedValues = Object.entries(value).map(([key, v]) => serializePrimitiveParam({
		allowReserved,
		name: style === "deepObject" ? `${name}[${key}]` : key,
		value: v
	})).join(separator);
	return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
};
//#endregion
//#region ../../lib/api/generated/core/utils.gen.ts
var PATH_PARAM_RE = /\{[^{}]+\}/g;
var defaultPathSerializer = ({ path, url: _url }) => {
	let url = _url;
	const matches = _url.match(PATH_PARAM_RE);
	if (matches) for (const match of matches) {
		let explode = false;
		let name = match.substring(1, match.length - 1);
		let style = "simple";
		if (name.endsWith("*")) {
			explode = true;
			name = name.substring(0, name.length - 1);
		}
		if (name.startsWith(".")) {
			name = name.substring(1);
			style = "label";
		} else if (name.startsWith(";")) {
			name = name.substring(1);
			style = "matrix";
		}
		const value = path[name];
		if (value === void 0 || value === null) continue;
		if (Array.isArray(value)) {
			url = url.replace(match, serializeArrayParam({
				explode,
				name,
				style,
				value
			}));
			continue;
		}
		if (typeof value === "object") {
			url = url.replace(match, serializeObjectParam({
				explode,
				name,
				style,
				value,
				valueOnly: true
			}));
			continue;
		}
		if (style === "matrix") {
			url = url.replace(match, `;${serializePrimitiveParam({
				name,
				value
			})}`);
			continue;
		}
		const replaceValue = encodeURIComponent(style === "label" ? `.${value}` : value);
		url = url.replace(match, replaceValue);
	}
	return url;
};
var getUrl = ({ baseUrl, path, query, querySerializer, url: _url }) => {
	const pathUrl = _url.startsWith("/") ? _url : `/${_url}`;
	let url = (baseUrl ?? "") + pathUrl;
	if (path) url = defaultPathSerializer({
		path,
		url
	});
	let search = query ? querySerializer(query) : "";
	if (search.startsWith("?")) search = search.substring(1);
	if (search) url += `?${search}`;
	return url;
};
function getValidRequestBody(options) {
	const hasBody = options.body !== void 0;
	if (hasBody && options.bodySerializer) {
		if ("serializedBody" in options) return options.serializedBody !== void 0 && options.serializedBody !== "" ? options.serializedBody : null;
		return options.body !== "" ? options.body : null;
	}
	if (hasBody) return options.body;
}
//#endregion
//#region ../../lib/api/generated/core/auth.gen.ts
var getAuthToken = async (auth, callback) => {
	const token = typeof callback === "function" ? await callback(auth) : callback;
	if (!token) return;
	if (auth.scheme === "bearer") return `Bearer ${token}`;
	if (auth.scheme === "basic") return `Basic ${btoa(token)}`;
	return token;
};
//#endregion
//#region ../../lib/api/generated/client/utils.gen.ts
var createQuerySerializer = ({ parameters = {}, ...args } = {}) => {
	const querySerializer = (queryParams) => {
		const search = [];
		if (queryParams && typeof queryParams === "object") for (const name in queryParams) {
			const value = queryParams[name];
			if (value === void 0 || value === null) continue;
			const options = parameters[name] || args;
			if (Array.isArray(value)) {
				const serializedArray = serializeArrayParam({
					allowReserved: options.allowReserved,
					explode: true,
					name,
					style: "form",
					value,
					...options.array
				});
				if (serializedArray) search.push(serializedArray);
			} else if (typeof value === "object") {
				const serializedObject = serializeObjectParam({
					allowReserved: options.allowReserved,
					explode: true,
					name,
					style: "deepObject",
					value,
					...options.object
				});
				if (serializedObject) search.push(serializedObject);
			} else {
				const serializedPrimitive = serializePrimitiveParam({
					allowReserved: options.allowReserved,
					name,
					value
				});
				if (serializedPrimitive) search.push(serializedPrimitive);
			}
		}
		return search.join("&");
	};
	return querySerializer;
};
/**
* Infers parseAs value from provided Content-Type header.
*/
var getParseAs = (contentType) => {
	if (!contentType) return "stream";
	const cleanContent = contentType.split(";")[0]?.trim();
	if (!cleanContent) return;
	if (cleanContent.startsWith("application/json") || cleanContent.endsWith("+json")) return "json";
	if (cleanContent === "multipart/form-data") return "formData";
	if ([
		"application/",
		"audio/",
		"image/",
		"video/"
	].some((type) => cleanContent.startsWith(type))) return "blob";
	if (cleanContent.startsWith("text/")) return "text";
};
var checkForExistence = (options, name) => {
	if (!name) return false;
	if (options.headers.has(name) || options.query?.[name] || options.headers.get("Cookie")?.includes(`${name}=`)) return true;
	return false;
};
var setAuthParams = async ({ security, ...options }) => {
	for (const auth of security) {
		if (checkForExistence(options, auth.name)) continue;
		const token = await getAuthToken(auth, options.auth);
		if (!token) continue;
		const name = auth.name ?? "Authorization";
		switch (auth.in) {
			case "query":
				if (!options.query) options.query = {};
				options.query[name] = token;
				break;
			case "cookie":
				options.headers.append("Cookie", `${name}=${token}`);
				break;
			default:
				options.headers.set(name, token);
				break;
		}
	}
};
var buildUrl = (options) => getUrl({
	baseUrl: options.baseUrl,
	path: options.path,
	query: options.query,
	querySerializer: typeof options.querySerializer === "function" ? options.querySerializer : createQuerySerializer(options.querySerializer),
	url: options.url
});
var mergeConfigs = (a, b) => {
	const config = {
		...a,
		...b
	};
	if (config.baseUrl?.endsWith("/")) config.baseUrl = config.baseUrl.substring(0, config.baseUrl.length - 1);
	config.headers = mergeHeaders(a.headers, b.headers);
	return config;
};
var headersEntries = (headers) => {
	const entries = [];
	headers.forEach((value, key) => {
		entries.push([key, value]);
	});
	return entries;
};
var mergeHeaders = (...headers) => {
	const mergedHeaders = new Headers();
	for (const header of headers) {
		if (!header) continue;
		const iterator = header instanceof Headers ? headersEntries(header) : Object.entries(header);
		for (const [key, value] of iterator) if (value === null) mergedHeaders.delete(key);
		else if (Array.isArray(value)) for (const v of value) mergedHeaders.append(key, v);
		else if (value !== void 0) mergedHeaders.set(key, typeof value === "object" ? JSON.stringify(value) : value);
	}
	return mergedHeaders;
};
var Interceptors = class {
	constructor() {
		this.fns = [];
	}
	clear() {
		this.fns = [];
	}
	eject(id) {
		const index = this.getInterceptorIndex(id);
		if (this.fns[index]) this.fns[index] = null;
	}
	exists(id) {
		const index = this.getInterceptorIndex(id);
		return Boolean(this.fns[index]);
	}
	getInterceptorIndex(id) {
		if (typeof id === "number") return this.fns[id] ? id : -1;
		return this.fns.indexOf(id);
	}
	update(id, fn) {
		const index = this.getInterceptorIndex(id);
		if (this.fns[index]) {
			this.fns[index] = fn;
			return id;
		}
		return false;
	}
	use(fn) {
		this.fns.push(fn);
		return this.fns.length - 1;
	}
};
var createInterceptors = () => ({
	error: new Interceptors(),
	request: new Interceptors(),
	response: new Interceptors()
});
var defaultQuerySerializer = createQuerySerializer({
	allowReserved: false,
	array: {
		explode: true,
		style: "form"
	},
	object: {
		explode: true,
		style: "deepObject"
	}
});
var defaultHeaders = { "Content-Type": "application/json" };
var createConfig = (override = {}) => ({
	...jsonBodySerializer,
	headers: defaultHeaders,
	parseAs: "auto",
	querySerializer: defaultQuerySerializer,
	...override
});
//#endregion
//#region ../../lib/api/generated/client/client.gen.ts
var createClient = (config = {}) => {
	let _config = mergeConfigs(createConfig(), config);
	const getConfig = () => ({ ..._config });
	const setConfig = (config) => {
		_config = mergeConfigs(_config, config);
		return getConfig();
	};
	const interceptors = createInterceptors();
	const beforeRequest = async (options) => {
		const opts = {
			..._config,
			...options,
			fetch: options.fetch ?? _config.fetch ?? globalThis.fetch,
			headers: mergeHeaders(_config.headers, options.headers),
			serializedBody: void 0
		};
		if (opts.security) await setAuthParams({
			...opts,
			security: opts.security
		});
		if (opts.requestValidator) await opts.requestValidator(opts);
		if (opts.body !== void 0 && opts.bodySerializer) opts.serializedBody = opts.bodySerializer(opts.body);
		if (opts.body === void 0 || opts.serializedBody === "") opts.headers.delete("Content-Type");
		return {
			opts,
			url: buildUrl(opts)
		};
	};
	const request = async (options) => {
		const { opts, url } = await beforeRequest(options);
		const requestInit = {
			redirect: "follow",
			...opts,
			body: getValidRequestBody(opts)
		};
		let request = new Request(url, requestInit);
		for (const fn of interceptors.request.fns) if (fn) request = await fn(request, opts);
		const _fetch = opts.fetch;
		let response;
		try {
			response = await _fetch(request);
		} catch (error) {
			let finalError = error;
			for (const fn of interceptors.error.fns) if (fn) finalError = await fn(error, void 0, request, opts);
			finalError = finalError || {};
			if (opts.throwOnError) throw finalError;
			return opts.responseStyle === "data" ? void 0 : {
				error: finalError,
				request,
				response: void 0
			};
		}
		for (const fn of interceptors.response.fns) if (fn) response = await fn(response, request, opts);
		const result = {
			request,
			response
		};
		if (response.ok) {
			const parseAs = (opts.parseAs === "auto" ? getParseAs(response.headers.get("Content-Type")) : opts.parseAs) ?? "json";
			if (response.status === 204 || response.headers.get("Content-Length") === "0") {
				let emptyData;
				switch (parseAs) {
					case "arrayBuffer":
					case "blob":
					case "text":
						emptyData = await response[parseAs]();
						break;
					case "formData":
						emptyData = new FormData();
						break;
					case "stream":
						emptyData = response.body;
						break;
					default:
						emptyData = {};
						break;
				}
				return opts.responseStyle === "data" ? emptyData : {
					data: emptyData,
					...result
				};
			}
			let data;
			switch (parseAs) {
				case "arrayBuffer":
				case "blob":
				case "formData":
				case "text":
					data = await response[parseAs]();
					break;
				case "json": {
					const text = await response.text();
					data = text ? JSON.parse(text) : {};
					break;
				}
				case "stream": return opts.responseStyle === "data" ? response.body : {
					data: response.body,
					...result
				};
			}
			if (parseAs === "json") {
				if (opts.responseValidator) await opts.responseValidator(data);
				if (opts.responseTransformer) data = await opts.responseTransformer(data);
			}
			return opts.responseStyle === "data" ? data : {
				data,
				...result
			};
		}
		const textError = await response.text();
		let jsonError;
		try {
			jsonError = JSON.parse(textError);
		} catch {}
		const error = jsonError ?? textError;
		let finalError = error;
		for (const fn of interceptors.error.fns) if (fn) finalError = await fn(error, response, request, opts);
		finalError = finalError || {};
		if (opts.throwOnError) throw finalError;
		return opts.responseStyle === "data" ? void 0 : {
			error: finalError,
			...result
		};
	};
	const makeMethodFn = (method) => (options) => request({
		...options,
		method
	});
	const makeSseFn = (method) => async (options) => {
		const { opts, url } = await beforeRequest(options);
		return createSseClient({
			...opts,
			body: opts.body,
			headers: opts.headers,
			method,
			onRequest: async (url, init) => {
				let request = new Request(url, init);
				for (const fn of interceptors.request.fns) if (fn) request = await fn(request, opts);
				return request;
			},
			serializedBody: getValidRequestBody(opts),
			url
		});
	};
	const _buildUrl = (options) => buildUrl({
		..._config,
		...options
	});
	return {
		buildUrl: _buildUrl,
		connect: makeMethodFn("CONNECT"),
		delete: makeMethodFn("DELETE"),
		get: makeMethodFn("GET"),
		getConfig,
		head: makeMethodFn("HEAD"),
		interceptors,
		options: makeMethodFn("OPTIONS"),
		patch: makeMethodFn("PATCH"),
		post: makeMethodFn("POST"),
		put: makeMethodFn("PUT"),
		request,
		setConfig,
		sse: {
			connect: makeSseFn("CONNECT"),
			delete: makeSseFn("DELETE"),
			get: makeSseFn("GET"),
			head: makeSseFn("HEAD"),
			options: makeSseFn("OPTIONS"),
			patch: makeSseFn("PATCH"),
			post: makeSseFn("POST"),
			put: makeSseFn("PUT"),
			trace: makeSseFn("TRACE")
		},
		trace: makeMethodFn("TRACE")
	};
};
//#endregion
//#region ../../lib/api/generated/client.gen.ts
var client = createClient(createConfig({ baseUrl: "http://localhost:3001" }));
//#endregion
//#region ../../lib/api/generated/sdk.gen.ts
/**
* Получить расписание
*
* Возвращает список событий гильдии
*/
var getApiSchedule = (options) => (options?.client ?? client).get({
	url: "/api/schedule",
	...options
});
/**
* Обновить событие расписания
*/
var patchApiSchedule = (options) => (options.client ?? client).patch({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/schedule",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Создать событие расписания
*/
var postApiSchedule = (options) => (options.client ?? client).post({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/schedule",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Получить новости
*
* Возвращает список новостей гильдии
*/
var getApiNews = (options) => (options?.client ?? client).get({
	url: "/api/news",
	...options
});
/**
* Создать новость
*/
var postApiNews = (options) => (options.client ?? client).post({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/news",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Получить регистрации через Next.js proxy
*
* Возвращает список участников через внутренний route портала
*/
var getApiDiscordProxyRegistration = (options) => (options?.client ?? client).get({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/discord-proxy/registration",
	...options
});
/**
* Обновить статистику регистрации через Next.js proxy
*/
var patchApiDiscordProxyRegistration = (options) => (options.client ?? client).patch({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/discord-proxy/registration",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Получить отсутствия через Next.js proxy
*/
var getApiDiscordProxyAbsences = (options) => (options?.client ?? client).get({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/discord-proxy/absences",
	...options
});
/**
* Обновить статус отсутствия через Next.js proxy
*/
var patchApiDiscordProxyAbsences = (options) => (options.client ?? client).patch({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/discord-proxy/absences",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Создать отсутствие через Next.js proxy
*/
var postApiDiscordProxyAbsences = (options) => (options.client ?? client).post({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/discord-proxy/absences",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Получить гайды
*
* Возвращает список гайдов
*/
var getApiGuide = (options) => (options?.client ?? client).get({
	url: "/api/guide",
	...options
});
/**
* Создать гайд
*/
var postApiGuide = (options) => (options.client ?? client).post({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/guide",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Удалить гайд
*/
var deleteApiGuideById = (options) => (options.client ?? client).delete({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/guide/{id}",
	...options
});
/**
* Получить гайд
*/
var getApiGuideById = (options) => (options.client ?? client).get({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/guide/{id}",
	...options
});
/**
* Обновить гайд
*/
var patchApiGuideById = (options) => (options.client ?? client).patch({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/guide/{id}",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Добавить комментарий к гайду
*/
var postApiGuideByIdComment = (options) => (options.client ?? client).post({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/guide/{id}/comment",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Проголосовать за гайд
*/
var postApiGuideByIdVote = (options) => (options.client ?? client).post({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/guide/{id}/vote",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Удалить запрос помощи
*/
var deleteApiHelp = (options) => (options.client ?? client).delete({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/help",
	...options
});
/**
* Получить запросы помощи
*/
var getApiHelp = (options) => (options?.client ?? client).get({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/help",
	...options
});
/**
* Обновить запрос помощи
*/
var patchApiHelp = (options) => (options.client ?? client).patch({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/help",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Создать запрос помощи
*/
var postApiHelp = (options) => (options.client ?? client).post({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/help",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Отозвать отклик на запрос помощи
*/
var deleteApiHelpResponders = (options) => (options.client ?? client).delete({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/help/responders",
	...options
});
/**
* Откликнуться на запрос помощи
*/
var postApiHelpResponders = (options) => (options.client ?? client).post({
	security: [{
		scheme: "bearer",
		type: "http"
	}],
	url: "/api/help/responders",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Получить список классов
*/
var getApiClasses = (options) => (options?.client ?? client).get({
	url: "/api/classes",
	...options
});
/**
* Войти в портал
*/
var postApiAuth = (options) => (options.client ?? client).post({
	url: "/api/auth",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Зарегистрировать аккаунт портала
*/
var postApiAuthRegister = (options) => (options.client ?? client).post({
	url: "/api/auth/register",
	...options,
	headers: {
		"Content-Type": "application/json",
		...options.headers
	}
});
/**
* Проверить текущую авторизацию
*/
var getApiVerifyAuth = (options) => (options?.client ?? client).get({
	url: "/api/verify-auth",
	...options
});
/**
* Выйти из портала
*/
var postApiLogout = (options) => (options?.client ?? client).post({
	url: "/api/logout",
	...options
});
//#endregion
//#region ../../node_modules/zod/v3/helpers/util.js
var util;
(function(util) {
	util.assertEqual = (_) => {};
	function assertIs(_arg) {}
	util.assertIs = assertIs;
	function assertNever(_x) {
		throw new Error();
	}
	util.assertNever = assertNever;
	util.arrayToEnum = (items) => {
		const obj = {};
		for (const item of items) obj[item] = item;
		return obj;
	};
	util.getValidEnumValues = (obj) => {
		const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
		const filtered = {};
		for (const k of validKeys) filtered[k] = obj[k];
		return util.objectValues(filtered);
	};
	util.objectValues = (obj) => {
		return util.objectKeys(obj).map(function(e) {
			return obj[e];
		});
	};
	util.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
		const keys = [];
		for (const key in object) if (Object.prototype.hasOwnProperty.call(object, key)) keys.push(key);
		return keys;
	};
	util.find = (arr, checker) => {
		for (const item of arr) if (checker(item)) return item;
	};
	util.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
	function joinValues(array, separator = " | ") {
		return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
	}
	util.joinValues = joinValues;
	util.jsonStringifyReplacer = (_, value) => {
		if (typeof value === "bigint") return value.toString();
		return value;
	};
})(util || (util = {}));
var objectUtil;
(function(objectUtil) {
	objectUtil.mergeShapes = (first, second) => {
		return {
			...first,
			...second
		};
	};
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
	"string",
	"nan",
	"number",
	"integer",
	"float",
	"boolean",
	"date",
	"bigint",
	"symbol",
	"function",
	"undefined",
	"null",
	"array",
	"object",
	"unknown",
	"promise",
	"void",
	"never",
	"map",
	"set"
]);
var getParsedType = (data) => {
	switch (typeof data) {
		case "undefined": return ZodParsedType.undefined;
		case "string": return ZodParsedType.string;
		case "number": return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
		case "boolean": return ZodParsedType.boolean;
		case "function": return ZodParsedType.function;
		case "bigint": return ZodParsedType.bigint;
		case "symbol": return ZodParsedType.symbol;
		case "object":
			if (Array.isArray(data)) return ZodParsedType.array;
			if (data === null) return ZodParsedType.null;
			if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") return ZodParsedType.promise;
			if (typeof Map !== "undefined" && data instanceof Map) return ZodParsedType.map;
			if (typeof Set !== "undefined" && data instanceof Set) return ZodParsedType.set;
			if (typeof Date !== "undefined" && data instanceof Date) return ZodParsedType.date;
			return ZodParsedType.object;
		default: return ZodParsedType.unknown;
	}
};
//#endregion
//#region ../../node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
	"invalid_type",
	"invalid_literal",
	"custom",
	"invalid_union",
	"invalid_union_discriminator",
	"invalid_enum_value",
	"unrecognized_keys",
	"invalid_arguments",
	"invalid_return_type",
	"invalid_date",
	"invalid_string",
	"too_small",
	"too_big",
	"invalid_intersection_types",
	"not_multiple_of",
	"not_finite"
]);
var ZodError = class ZodError extends Error {
	get errors() {
		return this.issues;
	}
	constructor(issues) {
		super();
		this.issues = [];
		this.addIssue = (sub) => {
			this.issues = [...this.issues, sub];
		};
		this.addIssues = (subs = []) => {
			this.issues = [...this.issues, ...subs];
		};
		const actualProto = new.target.prototype;
		if (Object.setPrototypeOf) Object.setPrototypeOf(this, actualProto);
		else this.__proto__ = actualProto;
		this.name = "ZodError";
		this.issues = issues;
	}
	format(_mapper) {
		const mapper = _mapper || function(issue) {
			return issue.message;
		};
		const fieldErrors = { _errors: [] };
		const processError = (error) => {
			for (const issue of error.issues) if (issue.code === "invalid_union") issue.unionErrors.map(processError);
			else if (issue.code === "invalid_return_type") processError(issue.returnTypeError);
			else if (issue.code === "invalid_arguments") processError(issue.argumentsError);
			else if (issue.path.length === 0) fieldErrors._errors.push(mapper(issue));
			else {
				let curr = fieldErrors;
				let i = 0;
				while (i < issue.path.length) {
					const el = issue.path[i];
					if (!(i === issue.path.length - 1)) curr[el] = curr[el] || { _errors: [] };
					else {
						curr[el] = curr[el] || { _errors: [] };
						curr[el]._errors.push(mapper(issue));
					}
					curr = curr[el];
					i++;
				}
			}
		};
		processError(this);
		return fieldErrors;
	}
	static assert(value) {
		if (!(value instanceof ZodError)) throw new Error(`Not a ZodError: ${value}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(mapper = (issue) => issue.message) {
		const fieldErrors = {};
		const formErrors = [];
		for (const sub of this.issues) if (sub.path.length > 0) {
			const firstEl = sub.path[0];
			fieldErrors[firstEl] = fieldErrors[firstEl] || [];
			fieldErrors[firstEl].push(mapper(sub));
		} else formErrors.push(mapper(sub));
		return {
			formErrors,
			fieldErrors
		};
	}
	get formErrors() {
		return this.flatten();
	}
};
ZodError.create = (issues) => {
	return new ZodError(issues);
};
//#endregion
//#region ../../node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
	let message;
	switch (issue.code) {
		case ZodIssueCode.invalid_type:
			if (issue.received === ZodParsedType.undefined) message = "Required";
			else message = `Expected ${issue.expected}, received ${issue.received}`;
			break;
		case ZodIssueCode.invalid_literal:
			message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
			break;
		case ZodIssueCode.unrecognized_keys:
			message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
			break;
		case ZodIssueCode.invalid_union:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_union_discriminator:
			message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
			break;
		case ZodIssueCode.invalid_enum_value:
			message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
			break;
		case ZodIssueCode.invalid_arguments:
			message = `Invalid function arguments`;
			break;
		case ZodIssueCode.invalid_return_type:
			message = `Invalid function return type`;
			break;
		case ZodIssueCode.invalid_date:
			message = `Invalid date`;
			break;
		case ZodIssueCode.invalid_string:
			if (typeof issue.validation === "object") if ("includes" in issue.validation) {
				message = `Invalid input: must include "${issue.validation.includes}"`;
				if (typeof issue.validation.position === "number") message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
			} else if ("startsWith" in issue.validation) message = `Invalid input: must start with "${issue.validation.startsWith}"`;
			else if ("endsWith" in issue.validation) message = `Invalid input: must end with "${issue.validation.endsWith}"`;
			else util.assertNever(issue.validation);
			else if (issue.validation !== "regex") message = `Invalid ${issue.validation}`;
			else message = "Invalid";
			break;
		case ZodIssueCode.too_small:
			if (issue.type === "array") message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
			else if (issue.type === "string") message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
			else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
			else if (issue.type === "bigint") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
			else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.too_big:
			if (issue.type === "array") message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
			else if (issue.type === "string") message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
			else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "bigint") message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.custom:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_intersection_types:
			message = `Intersection results could not be merged`;
			break;
		case ZodIssueCode.not_multiple_of:
			message = `Number must be a multiple of ${issue.multipleOf}`;
			break;
		case ZodIssueCode.not_finite:
			message = "Number must be finite";
			break;
		default:
			message = _ctx.defaultError;
			util.assertNever(issue);
	}
	return { message };
};
//#endregion
//#region ../../node_modules/zod/v3/errors.js
var overrideErrorMap = errorMap;
function getErrorMap() {
	return overrideErrorMap;
}
//#endregion
//#region ../../node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
	const { data, path, errorMaps, issueData } = params;
	const fullPath = [...path, ...issueData.path || []];
	const fullIssue = {
		...issueData,
		path: fullPath
	};
	if (issueData.message !== void 0) return {
		...issueData,
		path: fullPath,
		message: issueData.message
	};
	let errorMessage = "";
	const maps = errorMaps.filter((m) => !!m).slice().reverse();
	for (const map of maps) errorMessage = map(fullIssue, {
		data,
		defaultError: errorMessage
	}).message;
	return {
		...issueData,
		path: fullPath,
		message: errorMessage
	};
};
function addIssueToContext(ctx, issueData) {
	const overrideMap = getErrorMap();
	const issue = makeIssue({
		issueData,
		data: ctx.data,
		path: ctx.path,
		errorMaps: [
			ctx.common.contextualErrorMap,
			ctx.schemaErrorMap,
			overrideMap,
			overrideMap === errorMap ? void 0 : errorMap
		].filter((x) => !!x)
	});
	ctx.common.issues.push(issue);
}
var ParseStatus = class ParseStatus {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		if (this.value === "valid") this.value = "dirty";
	}
	abort() {
		if (this.value !== "aborted") this.value = "aborted";
	}
	static mergeArray(status, results) {
		const arrayValue = [];
		for (const s of results) {
			if (s.status === "aborted") return INVALID;
			if (s.status === "dirty") status.dirty();
			arrayValue.push(s.value);
		}
		return {
			status: status.value,
			value: arrayValue
		};
	}
	static async mergeObjectAsync(status, pairs) {
		const syncPairs = [];
		for (const pair of pairs) {
			const key = await pair.key;
			const value = await pair.value;
			syncPairs.push({
				key,
				value
			});
		}
		return ParseStatus.mergeObjectSync(status, syncPairs);
	}
	static mergeObjectSync(status, pairs) {
		const finalObject = {};
		for (const pair of pairs) {
			const { key, value } = pair;
			if (key.status === "aborted") return INVALID;
			if (value.status === "aborted") return INVALID;
			if (key.status === "dirty") status.dirty();
			if (value.status === "dirty") status.dirty();
			if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) finalObject[key.value] = value.value;
		}
		return {
			status: status.value,
			value: finalObject
		};
	}
};
var INVALID = Object.freeze({ status: "aborted" });
var DIRTY = (value) => ({
	status: "dirty",
	value
});
var OK = (value) => ({
	status: "valid",
	value
});
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
//#endregion
//#region ../../node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil) {
	errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
	errorUtil.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));
//#endregion
//#region ../../node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
	constructor(parent, value, path, key) {
		this._cachedPath = [];
		this.parent = parent;
		this.data = value;
		this._path = path;
		this._key = key;
	}
	get path() {
		if (!this._cachedPath.length) if (Array.isArray(this._key)) this._cachedPath.push(...this._path, ...this._key);
		else this._cachedPath.push(...this._path, this._key);
		return this._cachedPath;
	}
};
var handleResult = (ctx, result) => {
	if (isValid(result)) return {
		success: true,
		data: result.value
	};
	else {
		if (!ctx.common.issues.length) throw new Error("Validation failed but no issues detected.");
		return {
			success: false,
			get error() {
				if (this._error) return this._error;
				this._error = new ZodError(ctx.common.issues);
				return this._error;
			}
		};
	}
};
function processCreateParams(params) {
	if (!params) return {};
	const { errorMap, invalid_type_error, required_error, description } = params;
	if (errorMap && (invalid_type_error || required_error)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
	if (errorMap) return {
		errorMap,
		description
	};
	const customMap = (iss, ctx) => {
		const { message } = params;
		if (iss.code === "invalid_enum_value") return { message: message ?? ctx.defaultError };
		if (typeof ctx.data === "undefined") return { message: message ?? required_error ?? ctx.defaultError };
		if (iss.code !== "invalid_type") return { message: ctx.defaultError };
		return { message: message ?? invalid_type_error ?? ctx.defaultError };
	};
	return {
		errorMap: customMap,
		description
	};
}
var ZodType = class {
	get description() {
		return this._def.description;
	}
	_getType(input) {
		return getParsedType(input.data);
	}
	_getOrReturnCtx(input, ctx) {
		return ctx || {
			common: input.parent.common,
			data: input.data,
			parsedType: getParsedType(input.data),
			schemaErrorMap: this._def.errorMap,
			path: input.path,
			parent: input.parent
		};
	}
	_processInputParams(input) {
		return {
			status: new ParseStatus(),
			ctx: {
				common: input.parent.common,
				data: input.data,
				parsedType: getParsedType(input.data),
				schemaErrorMap: this._def.errorMap,
				path: input.path,
				parent: input.parent
			}
		};
	}
	_parseSync(input) {
		const result = this._parse(input);
		if (isAsync(result)) throw new Error("Synchronous parse encountered promise.");
		return result;
	}
	_parseAsync(input) {
		const result = this._parse(input);
		return Promise.resolve(result);
	}
	parse(data, params) {
		const result = this.safeParse(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	safeParse(data, params) {
		const ctx = {
			common: {
				issues: [],
				async: params?.async ?? false,
				contextualErrorMap: params?.errorMap
			},
			path: params?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		return handleResult(ctx, this._parseSync({
			data,
			path: ctx.path,
			parent: ctx
		}));
	}
	"~validate"(data) {
		const ctx = {
			common: {
				issues: [],
				async: !!this["~standard"].async
			},
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		if (!this["~standard"].async) try {
			const result = this._parseSync({
				data,
				path: [],
				parent: ctx
			});
			return isValid(result) ? { value: result.value } : { issues: ctx.common.issues };
		} catch (err) {
			if (err?.message?.toLowerCase()?.includes("encountered")) this["~standard"].async = true;
			ctx.common = {
				issues: [],
				async: true
			};
		}
		return this._parseAsync({
			data,
			path: [],
			parent: ctx
		}).then((result) => isValid(result) ? { value: result.value } : { issues: ctx.common.issues });
	}
	async parseAsync(data, params) {
		const result = await this.safeParseAsync(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	async safeParseAsync(data, params) {
		const ctx = {
			common: {
				issues: [],
				contextualErrorMap: params?.errorMap,
				async: true
			},
			path: params?.path || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data)
		};
		const maybeAsyncResult = this._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
		return handleResult(ctx, await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult)));
	}
	refine(check, message) {
		const getIssueProperties = (val) => {
			if (typeof message === "string" || typeof message === "undefined") return { message };
			else if (typeof message === "function") return message(val);
			else return message;
		};
		return this._refinement((val, ctx) => {
			const result = check(val);
			const setError = () => ctx.addIssue({
				code: ZodIssueCode.custom,
				...getIssueProperties(val)
			});
			if (typeof Promise !== "undefined" && result instanceof Promise) return result.then((data) => {
				if (!data) {
					setError();
					return false;
				} else return true;
			});
			if (!result) {
				setError();
				return false;
			} else return true;
		});
	}
	refinement(check, refinementData) {
		return this._refinement((val, ctx) => {
			if (!check(val)) {
				ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
				return false;
			} else return true;
		});
	}
	_refinement(refinement) {
		return new ZodEffects({
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: {
				type: "refinement",
				refinement
			}
		});
	}
	superRefine(refinement) {
		return this._refinement(refinement);
	}
	constructor(def) {
		/** Alias of safeParseAsync */
		this.spa = this.safeParseAsync;
		this._def = def;
		this.parse = this.parse.bind(this);
		this.safeParse = this.safeParse.bind(this);
		this.parseAsync = this.parseAsync.bind(this);
		this.safeParseAsync = this.safeParseAsync.bind(this);
		this.spa = this.spa.bind(this);
		this.refine = this.refine.bind(this);
		this.refinement = this.refinement.bind(this);
		this.superRefine = this.superRefine.bind(this);
		this.optional = this.optional.bind(this);
		this.nullable = this.nullable.bind(this);
		this.nullish = this.nullish.bind(this);
		this.array = this.array.bind(this);
		this.promise = this.promise.bind(this);
		this.or = this.or.bind(this);
		this.and = this.and.bind(this);
		this.transform = this.transform.bind(this);
		this.brand = this.brand.bind(this);
		this.default = this.default.bind(this);
		this.catch = this.catch.bind(this);
		this.describe = this.describe.bind(this);
		this.pipe = this.pipe.bind(this);
		this.readonly = this.readonly.bind(this);
		this.isNullable = this.isNullable.bind(this);
		this.isOptional = this.isOptional.bind(this);
		this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: (data) => this["~validate"](data)
		};
	}
	optional() {
		return ZodOptional.create(this, this._def);
	}
	nullable() {
		return ZodNullable.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return ZodArray.create(this);
	}
	promise() {
		return ZodPromise.create(this, this._def);
	}
	or(option) {
		return ZodUnion.create([this, option], this._def);
	}
	and(incoming) {
		return ZodIntersection.create(this, incoming, this._def);
	}
	transform(transform) {
		return new ZodEffects({
			...processCreateParams(this._def),
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: {
				type: "transform",
				transform
			}
		});
	}
	default(def) {
		const defaultValueFunc = typeof def === "function" ? def : () => def;
		return new ZodDefault({
			...processCreateParams(this._def),
			innerType: this,
			defaultValue: defaultValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodDefault
		});
	}
	brand() {
		return new ZodBranded({
			typeName: ZodFirstPartyTypeKind.ZodBranded,
			type: this,
			...processCreateParams(this._def)
		});
	}
	catch(def) {
		const catchValueFunc = typeof def === "function" ? def : () => def;
		return new ZodCatch({
			...processCreateParams(this._def),
			innerType: this,
			catchValue: catchValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodCatch
		});
	}
	describe(description) {
		const This = this.constructor;
		return new This({
			...this._def,
			description
		});
	}
	pipe(target) {
		return ZodPipeline.create(this, target);
	}
	readonly() {
		return ZodReadonly.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
	let secondsRegexSource = `[0-5]\\d`;
	if (args.precision) secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
	else if (args.precision == null) secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
	const secondsQuantifier = args.precision ? "+" : "?";
	return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
	return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
	let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
	const opts = [];
	opts.push(args.local ? `Z?` : `Z`);
	if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
	regex = `${regex}(${opts.join("|")})`;
	return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
	if ((version === "v4" || !version) && ipv4Regex.test(ip)) return true;
	if ((version === "v6" || !version) && ipv6Regex.test(ip)) return true;
	return false;
}
function isValidJWT(jwt, alg) {
	if (!jwtRegex.test(jwt)) return false;
	try {
		const [header] = jwt.split(".");
		if (!header) return false;
		const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
		const decoded = JSON.parse(atob(base64));
		if (typeof decoded !== "object" || decoded === null) return false;
		if ("typ" in decoded && decoded?.typ !== "JWT") return false;
		if (!decoded.alg) return false;
		if (alg && decoded.alg !== alg) return false;
		return true;
	} catch {
		return false;
	}
}
function isValidCidr(ip, version) {
	if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) return true;
	if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) return true;
	return false;
}
var ZodString = class ZodString extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = String(input.data);
		if (this._getType(input) !== ZodParsedType.string) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.string,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = void 0;
		for (const check of this._def.checks) if (check.kind === "min") {
			if (input.data.length < check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "string",
					inclusive: true,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (input.data.length > check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "string",
					inclusive: true,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "length") {
			const tooBig = input.data.length > check.value;
			const tooSmall = input.data.length < check.value;
			if (tooBig || tooSmall) {
				ctx = this._getOrReturnCtx(input, ctx);
				if (tooBig) addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "string",
					inclusive: true,
					exact: true,
					message: check.message
				});
				else if (tooSmall) addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "string",
					inclusive: true,
					exact: true,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "email") {
			if (!emailRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "email",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "emoji") {
			if (!emojiRegex) emojiRegex = new RegExp(_emojiRegex, "u");
			if (!emojiRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "emoji",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "uuid") {
			if (!uuidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "uuid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "nanoid") {
			if (!nanoidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "nanoid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cuid") {
			if (!cuidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cuid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cuid2") {
			if (!cuid2Regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cuid2",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "ulid") {
			if (!ulidRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "ulid",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "url") try {
			new URL(input.data);
		} catch {
			ctx = this._getOrReturnCtx(input, ctx);
			addIssueToContext(ctx, {
				validation: "url",
				code: ZodIssueCode.invalid_string,
				message: check.message
			});
			status.dirty();
		}
		else if (check.kind === "regex") {
			check.regex.lastIndex = 0;
			if (!check.regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "regex",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "trim") input.data = input.data.trim();
		else if (check.kind === "includes") {
			if (!input.data.includes(check.value, check.position)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: {
						includes: check.value,
						position: check.position
					},
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "toLowerCase") input.data = input.data.toLowerCase();
		else if (check.kind === "toUpperCase") input.data = input.data.toUpperCase();
		else if (check.kind === "startsWith") {
			if (!input.data.startsWith(check.value)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: { startsWith: check.value },
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "endsWith") {
			if (!input.data.endsWith(check.value)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: { endsWith: check.value },
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "datetime") {
			if (!datetimeRegex(check).test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "datetime",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "date") {
			if (!dateRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "date",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "time") {
			if (!timeRegex(check).test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_string,
					validation: "time",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "duration") {
			if (!durationRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "duration",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "ip") {
			if (!isValidIP(input.data, check.version)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "ip",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "jwt") {
			if (!isValidJWT(input.data, check.alg)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "jwt",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "cidr") {
			if (!isValidCidr(input.data, check.version)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "cidr",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "base64") {
			if (!base64Regex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "base64",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "base64url") {
			if (!base64urlRegex.test(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					validation: "base64url",
					code: ZodIssueCode.invalid_string,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	_regex(regex, validation, message) {
		return this.refinement((data) => regex.test(data), {
			validation,
			code: ZodIssueCode.invalid_string,
			...errorUtil.errToObj(message)
		});
	}
	_addCheck(check) {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	email(message) {
		return this._addCheck({
			kind: "email",
			...errorUtil.errToObj(message)
		});
	}
	url(message) {
		return this._addCheck({
			kind: "url",
			...errorUtil.errToObj(message)
		});
	}
	emoji(message) {
		return this._addCheck({
			kind: "emoji",
			...errorUtil.errToObj(message)
		});
	}
	uuid(message) {
		return this._addCheck({
			kind: "uuid",
			...errorUtil.errToObj(message)
		});
	}
	nanoid(message) {
		return this._addCheck({
			kind: "nanoid",
			...errorUtil.errToObj(message)
		});
	}
	cuid(message) {
		return this._addCheck({
			kind: "cuid",
			...errorUtil.errToObj(message)
		});
	}
	cuid2(message) {
		return this._addCheck({
			kind: "cuid2",
			...errorUtil.errToObj(message)
		});
	}
	ulid(message) {
		return this._addCheck({
			kind: "ulid",
			...errorUtil.errToObj(message)
		});
	}
	base64(message) {
		return this._addCheck({
			kind: "base64",
			...errorUtil.errToObj(message)
		});
	}
	base64url(message) {
		return this._addCheck({
			kind: "base64url",
			...errorUtil.errToObj(message)
		});
	}
	jwt(options) {
		return this._addCheck({
			kind: "jwt",
			...errorUtil.errToObj(options)
		});
	}
	ip(options) {
		return this._addCheck({
			kind: "ip",
			...errorUtil.errToObj(options)
		});
	}
	cidr(options) {
		return this._addCheck({
			kind: "cidr",
			...errorUtil.errToObj(options)
		});
	}
	datetime(options) {
		if (typeof options === "string") return this._addCheck({
			kind: "datetime",
			precision: null,
			offset: false,
			local: false,
			message: options
		});
		return this._addCheck({
			kind: "datetime",
			precision: typeof options?.precision === "undefined" ? null : options?.precision,
			offset: options?.offset ?? false,
			local: options?.local ?? false,
			...errorUtil.errToObj(options?.message)
		});
	}
	date(message) {
		return this._addCheck({
			kind: "date",
			message
		});
	}
	time(options) {
		if (typeof options === "string") return this._addCheck({
			kind: "time",
			precision: null,
			message: options
		});
		return this._addCheck({
			kind: "time",
			precision: typeof options?.precision === "undefined" ? null : options?.precision,
			...errorUtil.errToObj(options?.message)
		});
	}
	duration(message) {
		return this._addCheck({
			kind: "duration",
			...errorUtil.errToObj(message)
		});
	}
	regex(regex, message) {
		return this._addCheck({
			kind: "regex",
			regex,
			...errorUtil.errToObj(message)
		});
	}
	includes(value, options) {
		return this._addCheck({
			kind: "includes",
			value,
			position: options?.position,
			...errorUtil.errToObj(options?.message)
		});
	}
	startsWith(value, message) {
		return this._addCheck({
			kind: "startsWith",
			value,
			...errorUtil.errToObj(message)
		});
	}
	endsWith(value, message) {
		return this._addCheck({
			kind: "endsWith",
			value,
			...errorUtil.errToObj(message)
		});
	}
	min(minLength, message) {
		return this._addCheck({
			kind: "min",
			value: minLength,
			...errorUtil.errToObj(message)
		});
	}
	max(maxLength, message) {
		return this._addCheck({
			kind: "max",
			value: maxLength,
			...errorUtil.errToObj(message)
		});
	}
	length(len, message) {
		return this._addCheck({
			kind: "length",
			value: len,
			...errorUtil.errToObj(message)
		});
	}
	/**
	* Equivalent to `.min(1)`
	*/
	nonempty(message) {
		return this.min(1, errorUtil.errToObj(message));
	}
	trim() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }]
		});
	}
	toLowerCase() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }]
		});
	}
	toUpperCase() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }]
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((ch) => ch.kind === "datetime");
	}
	get isDate() {
		return !!this._def.checks.find((ch) => ch.kind === "date");
	}
	get isTime() {
		return !!this._def.checks.find((ch) => ch.kind === "time");
	}
	get isDuration() {
		return !!this._def.checks.find((ch) => ch.kind === "duration");
	}
	get isEmail() {
		return !!this._def.checks.find((ch) => ch.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((ch) => ch.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((ch) => ch.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((ch) => ch.kind === "uuid");
	}
	get isNANOID() {
		return !!this._def.checks.find((ch) => ch.kind === "nanoid");
	}
	get isCUID() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((ch) => ch.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((ch) => ch.kind === "ip");
	}
	get isCIDR() {
		return !!this._def.checks.find((ch) => ch.kind === "cidr");
	}
	get isBase64() {
		return !!this._def.checks.find((ch) => ch.kind === "base64");
	}
	get isBase64url() {
		return !!this._def.checks.find((ch) => ch.kind === "base64url");
	}
	get minLength() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxLength() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
};
ZodString.create = (params) => {
	return new ZodString({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodString,
		coerce: params?.coerce ?? false,
		...processCreateParams(params)
	});
};
function floatSafeRemainder(val, step) {
	const valDecCount = (val.toString().split(".")[1] || "").length;
	const stepDecCount = (step.toString().split(".")[1] || "").length;
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	return Number.parseInt(val.toFixed(decCount).replace(".", "")) % Number.parseInt(step.toFixed(decCount).replace(".", "")) / 10 ** decCount;
}
var ZodNumber = class ZodNumber extends ZodType {
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
		this.step = this.multipleOf;
	}
	_parse(input) {
		if (this._def.coerce) input.data = Number(input.data);
		if (this._getType(input) !== ZodParsedType.number) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.number,
				received: ctx.parsedType
			});
			return INVALID;
		}
		let ctx = void 0;
		const status = new ParseStatus();
		for (const check of this._def.checks) if (check.kind === "int") {
			if (!util.isInteger(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: "integer",
					received: "float",
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "min") {
			if (check.inclusive ? input.data < check.value : input.data <= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: check.value,
					type: "number",
					inclusive: check.inclusive,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (check.inclusive ? input.data > check.value : input.data >= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: check.value,
					type: "number",
					inclusive: check.inclusive,
					exact: false,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "multipleOf") {
			if (floatSafeRemainder(input.data, check.value) !== 0) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_multiple_of,
					multipleOf: check.value,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "finite") {
			if (!Number.isFinite(input.data)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_finite,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	gte(value, message) {
		return this.setLimit("min", value, true, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, true, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodNumber({
			...this._def,
			checks: [...this._def.checks, {
				kind,
				value,
				inclusive,
				message: errorUtil.toString(message)
			}]
		});
	}
	_addCheck(check) {
		return new ZodNumber({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	int(message) {
		return this._addCheck({
			kind: "int",
			message: errorUtil.toString(message)
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message)
		});
	}
	finite(message) {
		return this._addCheck({
			kind: "finite",
			message: errorUtil.toString(message)
		});
	}
	safe(message) {
		return this._addCheck({
			kind: "min",
			inclusive: true,
			value: Number.MIN_SAFE_INTEGER,
			message: errorUtil.toString(message)
		})._addCheck({
			kind: "max",
			inclusive: true,
			value: Number.MAX_SAFE_INTEGER,
			message: errorUtil.toString(message)
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
	get isInt() {
		return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
	}
	get isFinite() {
		let max = null;
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") return true;
		else if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		} else if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return Number.isFinite(min) && Number.isFinite(max);
	}
};
ZodNumber.create = (params) => {
	return new ZodNumber({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodNumber,
		coerce: params?.coerce || false,
		...processCreateParams(params)
	});
};
var ZodBigInt = class ZodBigInt extends ZodType {
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
	}
	_parse(input) {
		if (this._def.coerce) try {
			input.data = BigInt(input.data);
		} catch {
			return this._getInvalidInput(input);
		}
		if (this._getType(input) !== ZodParsedType.bigint) return this._getInvalidInput(input);
		let ctx = void 0;
		const status = new ParseStatus();
		for (const check of this._def.checks) if (check.kind === "min") {
			if (check.inclusive ? input.data < check.value : input.data <= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					type: "bigint",
					minimum: check.value,
					inclusive: check.inclusive,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (check.inclusive ? input.data > check.value : input.data >= check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					type: "bigint",
					maximum: check.value,
					inclusive: check.inclusive,
					message: check.message
				});
				status.dirty();
			}
		} else if (check.kind === "multipleOf") {
			if (input.data % check.value !== BigInt(0)) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.not_multiple_of,
					multipleOf: check.value,
					message: check.message
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: input.data
		};
	}
	_getInvalidInput(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.bigint,
			received: ctx.parsedType
		});
		return INVALID;
	}
	gte(value, message) {
		return this.setLimit("min", value, true, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, true, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodBigInt({
			...this._def,
			checks: [...this._def.checks, {
				kind,
				value,
				inclusive,
				message: errorUtil.toString(message)
			}]
		});
	}
	_addCheck(check) {
		return new ZodBigInt({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message)
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message)
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message)
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max;
	}
};
ZodBigInt.create = (params) => {
	return new ZodBigInt({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodBigInt,
		coerce: params?.coerce ?? false,
		...processCreateParams(params)
	});
};
var ZodBoolean = class extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = Boolean(input.data);
		if (this._getType(input) !== ZodParsedType.boolean) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.boolean,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodBoolean.create = (params) => {
	return new ZodBoolean({
		typeName: ZodFirstPartyTypeKind.ZodBoolean,
		coerce: params?.coerce || false,
		...processCreateParams(params)
	});
};
var ZodDate = class ZodDate extends ZodType {
	_parse(input) {
		if (this._def.coerce) input.data = new Date(input.data);
		if (this._getType(input) !== ZodParsedType.date) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.date,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (Number.isNaN(input.data.getTime())) {
			addIssueToContext(this._getOrReturnCtx(input), { code: ZodIssueCode.invalid_date });
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = void 0;
		for (const check of this._def.checks) if (check.kind === "min") {
			if (input.data.getTime() < check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					message: check.message,
					inclusive: true,
					exact: false,
					minimum: check.value,
					type: "date"
				});
				status.dirty();
			}
		} else if (check.kind === "max") {
			if (input.data.getTime() > check.value) {
				ctx = this._getOrReturnCtx(input, ctx);
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					message: check.message,
					inclusive: true,
					exact: false,
					maximum: check.value,
					type: "date"
				});
				status.dirty();
			}
		} else util.assertNever(check);
		return {
			status: status.value,
			value: new Date(input.data.getTime())
		};
	}
	_addCheck(check) {
		return new ZodDate({
			...this._def,
			checks: [...this._def.checks, check]
		});
	}
	min(minDate, message) {
		return this._addCheck({
			kind: "min",
			value: minDate.getTime(),
			message: errorUtil.toString(message)
		});
	}
	max(maxDate, message) {
		return this._addCheck({
			kind: "max",
			value: maxDate.getTime(),
			message: errorUtil.toString(message)
		});
	}
	get minDate() {
		let min = null;
		for (const ch of this._def.checks) if (ch.kind === "min") {
			if (min === null || ch.value > min) min = ch.value;
		}
		return min != null ? new Date(min) : null;
	}
	get maxDate() {
		let max = null;
		for (const ch of this._def.checks) if (ch.kind === "max") {
			if (max === null || ch.value < max) max = ch.value;
		}
		return max != null ? new Date(max) : null;
	}
};
ZodDate.create = (params) => {
	return new ZodDate({
		checks: [],
		coerce: params?.coerce || false,
		typeName: ZodFirstPartyTypeKind.ZodDate,
		...processCreateParams(params)
	});
};
var ZodSymbol = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.symbol) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.symbol,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodSymbol.create = (params) => {
	return new ZodSymbol({
		typeName: ZodFirstPartyTypeKind.ZodSymbol,
		...processCreateParams(params)
	});
};
var ZodUndefined = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.undefined,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodUndefined.create = (params) => {
	return new ZodUndefined({
		typeName: ZodFirstPartyTypeKind.ZodUndefined,
		...processCreateParams(params)
	});
};
var ZodNull = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.null) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.null,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodNull.create = (params) => {
	return new ZodNull({
		typeName: ZodFirstPartyTypeKind.ZodNull,
		...processCreateParams(params)
	});
};
var ZodAny = class extends ZodType {
	constructor() {
		super(...arguments);
		this._any = true;
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodAny.create = (params) => {
	return new ZodAny({
		typeName: ZodFirstPartyTypeKind.ZodAny,
		...processCreateParams(params)
	});
};
var ZodUnknown = class extends ZodType {
	constructor() {
		super(...arguments);
		this._unknown = true;
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodUnknown.create = (params) => {
	return new ZodUnknown({
		typeName: ZodFirstPartyTypeKind.ZodUnknown,
		...processCreateParams(params)
	});
};
var ZodNever = class extends ZodType {
	_parse(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.never,
			received: ctx.parsedType
		});
		return INVALID;
	}
};
ZodNever.create = (params) => {
	return new ZodNever({
		typeName: ZodFirstPartyTypeKind.ZodNever,
		...processCreateParams(params)
	});
};
var ZodVoid = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.void,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK(input.data);
	}
};
ZodVoid.create = (params) => {
	return new ZodVoid({
		typeName: ZodFirstPartyTypeKind.ZodVoid,
		...processCreateParams(params)
	});
};
var ZodArray = class ZodArray extends ZodType {
	_parse(input) {
		const { ctx, status } = this._processInputParams(input);
		const def = this._def;
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (def.exactLength !== null) {
			const tooBig = ctx.data.length > def.exactLength.value;
			const tooSmall = ctx.data.length < def.exactLength.value;
			if (tooBig || tooSmall) {
				addIssueToContext(ctx, {
					code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
					minimum: tooSmall ? def.exactLength.value : void 0,
					maximum: tooBig ? def.exactLength.value : void 0,
					type: "array",
					inclusive: true,
					exact: true,
					message: def.exactLength.message
				});
				status.dirty();
			}
		}
		if (def.minLength !== null) {
			if (ctx.data.length < def.minLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def.minLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def.minLength.message
				});
				status.dirty();
			}
		}
		if (def.maxLength !== null) {
			if (ctx.data.length > def.maxLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def.maxLength.message
				});
				status.dirty();
			}
		}
		if (ctx.common.async) return Promise.all([...ctx.data].map((item, i) => {
			return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
		})).then((result) => {
			return ParseStatus.mergeArray(status, result);
		});
		const result = [...ctx.data].map((item, i) => {
			return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
		});
		return ParseStatus.mergeArray(status, result);
	}
	get element() {
		return this._def.type;
	}
	min(minLength, message) {
		return new ZodArray({
			...this._def,
			minLength: {
				value: minLength,
				message: errorUtil.toString(message)
			}
		});
	}
	max(maxLength, message) {
		return new ZodArray({
			...this._def,
			maxLength: {
				value: maxLength,
				message: errorUtil.toString(message)
			}
		});
	}
	length(len, message) {
		return new ZodArray({
			...this._def,
			exactLength: {
				value: len,
				message: errorUtil.toString(message)
			}
		});
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodArray.create = (schema, params) => {
	return new ZodArray({
		type: schema,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: ZodFirstPartyTypeKind.ZodArray,
		...processCreateParams(params)
	});
};
function deepPartialify(schema) {
	if (schema instanceof ZodObject) {
		const newShape = {};
		for (const key in schema.shape) {
			const fieldSchema = schema.shape[key];
			newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
		}
		return new ZodObject({
			...schema._def,
			shape: () => newShape
		});
	} else if (schema instanceof ZodArray) return new ZodArray({
		...schema._def,
		type: deepPartialify(schema.element)
	});
	else if (schema instanceof ZodOptional) return ZodOptional.create(deepPartialify(schema.unwrap()));
	else if (schema instanceof ZodNullable) return ZodNullable.create(deepPartialify(schema.unwrap()));
	else if (schema instanceof ZodTuple) return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
	else return schema;
}
var ZodObject = class ZodObject extends ZodType {
	constructor() {
		super(...arguments);
		this._cached = null;
		/**
		* @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
		* If you want to pass through unknown properties, use `.passthrough()` instead.
		*/
		this.nonstrict = this.passthrough;
		/**
		* @deprecated Use `.extend` instead
		*  */
		this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		const shape = this._def.shape();
		this._cached = {
			shape,
			keys: util.objectKeys(shape)
		};
		return this._cached;
	}
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.object) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const { status, ctx } = this._processInputParams(input);
		const { shape, keys: shapeKeys } = this._getCached();
		const extraKeys = [];
		if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
			for (const key in ctx.data) if (!shapeKeys.includes(key)) extraKeys.push(key);
		}
		const pairs = [];
		for (const key of shapeKeys) {
			const keyValidator = shape[key];
			const value = ctx.data[key];
			pairs.push({
				key: {
					status: "valid",
					value: key
				},
				value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
				alwaysSet: key in ctx.data
			});
		}
		if (this._def.catchall instanceof ZodNever) {
			const unknownKeys = this._def.unknownKeys;
			if (unknownKeys === "passthrough") for (const key of extraKeys) pairs.push({
				key: {
					status: "valid",
					value: key
				},
				value: {
					status: "valid",
					value: ctx.data[key]
				}
			});
			else if (unknownKeys === "strict") {
				if (extraKeys.length > 0) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.unrecognized_keys,
						keys: extraKeys
					});
					status.dirty();
				}
			} else if (unknownKeys === "strip") {} else throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
		} else {
			const catchall = this._def.catchall;
			for (const key of extraKeys) {
				const value = ctx.data[key];
				pairs.push({
					key: {
						status: "valid",
						value: key
					},
					value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
					alwaysSet: key in ctx.data
				});
			}
		}
		if (ctx.common.async) return Promise.resolve().then(async () => {
			const syncPairs = [];
			for (const pair of pairs) {
				const key = await pair.key;
				const value = await pair.value;
				syncPairs.push({
					key,
					value,
					alwaysSet: pair.alwaysSet
				});
			}
			return syncPairs;
		}).then((syncPairs) => {
			return ParseStatus.mergeObjectSync(status, syncPairs);
		});
		else return ParseStatus.mergeObjectSync(status, pairs);
	}
	get shape() {
		return this._def.shape();
	}
	strict(message) {
		errorUtil.errToObj;
		return new ZodObject({
			...this._def,
			unknownKeys: "strict",
			...message !== void 0 ? { errorMap: (issue, ctx) => {
				const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
				if (issue.code === "unrecognized_keys") return { message: errorUtil.errToObj(message).message ?? defaultError };
				return { message: defaultError };
			} } : {}
		});
	}
	strip() {
		return new ZodObject({
			...this._def,
			unknownKeys: "strip"
		});
	}
	passthrough() {
		return new ZodObject({
			...this._def,
			unknownKeys: "passthrough"
		});
	}
	extend(augmentation) {
		return new ZodObject({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...augmentation
			})
		});
	}
	/**
	* Prior to zod@1.0.12 there was a bug in the
	* inferred type of merged objects. Please
	* upgrade if you are experiencing issues.
	*/
	merge(merging) {
		return new ZodObject({
			unknownKeys: merging._def.unknownKeys,
			catchall: merging._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...merging._def.shape()
			}),
			typeName: ZodFirstPartyTypeKind.ZodObject
		});
	}
	setKey(key, schema) {
		return this.augment({ [key]: schema });
	}
	catchall(index) {
		return new ZodObject({
			...this._def,
			catchall: index
		});
	}
	pick(mask) {
		const shape = {};
		for (const key of util.objectKeys(mask)) if (mask[key] && this.shape[key]) shape[key] = this.shape[key];
		return new ZodObject({
			...this._def,
			shape: () => shape
		});
	}
	omit(mask) {
		const shape = {};
		for (const key of util.objectKeys(this.shape)) if (!mask[key]) shape[key] = this.shape[key];
		return new ZodObject({
			...this._def,
			shape: () => shape
		});
	}
	/**
	* @deprecated
	*/
	deepPartial() {
		return deepPartialify(this);
	}
	partial(mask) {
		const newShape = {};
		for (const key of util.objectKeys(this.shape)) {
			const fieldSchema = this.shape[key];
			if (mask && !mask[key]) newShape[key] = fieldSchema;
			else newShape[key] = fieldSchema.optional();
		}
		return new ZodObject({
			...this._def,
			shape: () => newShape
		});
	}
	required(mask) {
		const newShape = {};
		for (const key of util.objectKeys(this.shape)) if (mask && !mask[key]) newShape[key] = this.shape[key];
		else {
			let newField = this.shape[key];
			while (newField instanceof ZodOptional) newField = newField._def.innerType;
			newShape[key] = newField;
		}
		return new ZodObject({
			...this._def,
			shape: () => newShape
		});
	}
	keyof() {
		return createZodEnum(util.objectKeys(this.shape));
	}
};
ZodObject.create = (shape, params) => {
	return new ZodObject({
		shape: () => shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
ZodObject.strictCreate = (shape, params) => {
	return new ZodObject({
		shape: () => shape,
		unknownKeys: "strict",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
ZodObject.lazycreate = (shape, params) => {
	return new ZodObject({
		shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params)
	});
};
var ZodUnion = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const options = this._def.options;
		function handleResults(results) {
			for (const result of results) if (result.result.status === "valid") return result.result;
			for (const result of results) if (result.result.status === "dirty") {
				ctx.common.issues.push(...result.ctx.common.issues);
				return result.result;
			}
			const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors
			});
			return INVALID;
		}
		if (ctx.common.async) return Promise.all(options.map(async (option) => {
			const childCtx = {
				...ctx,
				common: {
					...ctx.common,
					issues: []
				},
				parent: null
			};
			return {
				result: await option._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: childCtx
				}),
				ctx: childCtx
			};
		})).then(handleResults);
		else {
			let dirty = void 0;
			const issues = [];
			for (const option of options) {
				const childCtx = {
					...ctx,
					common: {
						...ctx.common,
						issues: []
					},
					parent: null
				};
				const result = option._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: childCtx
				});
				if (result.status === "valid") return result;
				else if (result.status === "dirty" && !dirty) dirty = {
					result,
					ctx: childCtx
				};
				if (childCtx.common.issues.length) issues.push(childCtx.common.issues);
			}
			if (dirty) {
				ctx.common.issues.push(...dirty.ctx.common.issues);
				return dirty.result;
			}
			const unionErrors = issues.map((issues) => new ZodError(issues));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors
			});
			return INVALID;
		}
	}
	get options() {
		return this._def.options;
	}
};
ZodUnion.create = (types, params) => {
	return new ZodUnion({
		options: types,
		typeName: ZodFirstPartyTypeKind.ZodUnion,
		...processCreateParams(params)
	});
};
var getDiscriminator = (type) => {
	if (type instanceof ZodLazy) return getDiscriminator(type.schema);
	else if (type instanceof ZodEffects) return getDiscriminator(type.innerType());
	else if (type instanceof ZodLiteral) return [type.value];
	else if (type instanceof ZodEnum) return type.options;
	else if (type instanceof ZodNativeEnum) return util.objectValues(type.enum);
	else if (type instanceof ZodDefault) return getDiscriminator(type._def.innerType);
	else if (type instanceof ZodUndefined) return [void 0];
	else if (type instanceof ZodNull) return [null];
	else if (type instanceof ZodOptional) return [void 0, ...getDiscriminator(type.unwrap())];
	else if (type instanceof ZodNullable) return [null, ...getDiscriminator(type.unwrap())];
	else if (type instanceof ZodBranded) return getDiscriminator(type.unwrap());
	else if (type instanceof ZodReadonly) return getDiscriminator(type.unwrap());
	else if (type instanceof ZodCatch) return getDiscriminator(type._def.innerType);
	else return [];
};
var ZodDiscriminatedUnion = class ZodDiscriminatedUnion extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const discriminator = this.discriminator;
		const discriminatorValue = ctx.data[discriminator];
		const option = this.optionsMap.get(discriminatorValue);
		if (!option) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union_discriminator,
				options: Array.from(this.optionsMap.keys()),
				path: [discriminator]
			});
			return INVALID;
		}
		if (ctx.common.async) return option._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
		else return option._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	/**
	* The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
	* However, it only allows a union of objects, all of which need to share a discriminator property. This property must
	* have a different value for each object in the union.
	* @param discriminator the name of the discriminator property
	* @param types an array of object schemas
	* @param params
	*/
	static create(discriminator, options, params) {
		const optionsMap = /* @__PURE__ */ new Map();
		for (const type of options) {
			const discriminatorValues = getDiscriminator(type.shape[discriminator]);
			if (!discriminatorValues.length) throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
			for (const value of discriminatorValues) {
				if (optionsMap.has(value)) throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
				optionsMap.set(value, type);
			}
		}
		return new ZodDiscriminatedUnion({
			typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
			discriminator,
			options,
			optionsMap,
			...processCreateParams(params)
		});
	}
};
function mergeValues(a, b) {
	const aType = getParsedType(a);
	const bType = getParsedType(b);
	if (a === b) return {
		valid: true,
		data: a
	};
	else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
		const bKeys = util.objectKeys(b);
		const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = {
			...a,
			...b
		};
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return { valid: false };
			newObj[key] = sharedValue.data;
		}
		return {
			valid: true,
			data: newObj
		};
	} else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
		if (a.length !== b.length) return { valid: false };
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return { valid: false };
			newArray.push(sharedValue.data);
		}
		return {
			valid: true,
			data: newArray
		};
	} else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) return {
		valid: true,
		data: a
	};
	else return { valid: false };
}
var ZodIntersection = class extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const handleParsed = (parsedLeft, parsedRight) => {
			if (isAborted(parsedLeft) || isAborted(parsedRight)) return INVALID;
			const merged = mergeValues(parsedLeft.value, parsedRight.value);
			if (!merged.valid) {
				addIssueToContext(ctx, { code: ZodIssueCode.invalid_intersection_types });
				return INVALID;
			}
			if (isDirty(parsedLeft) || isDirty(parsedRight)) status.dirty();
			return {
				status: status.value,
				value: merged.data
			};
		};
		if (ctx.common.async) return Promise.all([this._def.left._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}), this._def.right._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		})]).then(([left, right]) => handleParsed(left, right));
		else return handleParsed(this._def.left._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}), this._def.right._parseSync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}));
	}
};
ZodIntersection.create = (left, right, params) => {
	return new ZodIntersection({
		left,
		right,
		typeName: ZodFirstPartyTypeKind.ZodIntersection,
		...processCreateParams(params)
	});
};
var ZodTuple = class ZodTuple extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType
			});
			return INVALID;
		}
		if (ctx.data.length < this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_small,
				minimum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array"
			});
			return INVALID;
		}
		if (!this._def.rest && ctx.data.length > this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_big,
				maximum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array"
			});
			status.dirty();
		}
		const items = [...ctx.data].map((item, itemIndex) => {
			const schema = this._def.items[itemIndex] || this._def.rest;
			if (!schema) return null;
			return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
		}).filter((x) => !!x);
		if (ctx.common.async) return Promise.all(items).then((results) => {
			return ParseStatus.mergeArray(status, results);
		});
		else return ParseStatus.mergeArray(status, items);
	}
	get items() {
		return this._def.items;
	}
	rest(rest) {
		return new ZodTuple({
			...this._def,
			rest
		});
	}
};
ZodTuple.create = (schemas, params) => {
	if (!Array.isArray(schemas)) throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new ZodTuple({
		items: schemas,
		typeName: ZodFirstPartyTypeKind.ZodTuple,
		rest: null,
		...processCreateParams(params)
	});
};
var ZodRecord = class ZodRecord extends ZodType {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const pairs = [];
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		for (const key in ctx.data) pairs.push({
			key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
			value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
			alwaysSet: key in ctx.data
		});
		if (ctx.common.async) return ParseStatus.mergeObjectAsync(status, pairs);
		else return ParseStatus.mergeObjectSync(status, pairs);
	}
	get element() {
		return this._def.valueType;
	}
	static create(first, second, third) {
		if (second instanceof ZodType) return new ZodRecord({
			keyType: first,
			valueType: second,
			typeName: ZodFirstPartyTypeKind.ZodRecord,
			...processCreateParams(third)
		});
		return new ZodRecord({
			keyType: ZodString.create(),
			valueType: first,
			typeName: ZodFirstPartyTypeKind.ZodRecord,
			...processCreateParams(second)
		});
	}
};
var ZodMap = class extends ZodType {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.map) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.map,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		const pairs = [...ctx.data.entries()].map(([key, value], index) => {
			return {
				key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
				value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
			};
		});
		if (ctx.common.async) {
			const finalMap = /* @__PURE__ */ new Map();
			return Promise.resolve().then(async () => {
				for (const pair of pairs) {
					const key = await pair.key;
					const value = await pair.value;
					if (key.status === "aborted" || value.status === "aborted") return INVALID;
					if (key.status === "dirty" || value.status === "dirty") status.dirty();
					finalMap.set(key.value, value.value);
				}
				return {
					status: status.value,
					value: finalMap
				};
			});
		} else {
			const finalMap = /* @__PURE__ */ new Map();
			for (const pair of pairs) {
				const key = pair.key;
				const value = pair.value;
				if (key.status === "aborted" || value.status === "aborted") return INVALID;
				if (key.status === "dirty" || value.status === "dirty") status.dirty();
				finalMap.set(key.value, value.value);
			}
			return {
				status: status.value,
				value: finalMap
			};
		}
	}
};
ZodMap.create = (keyType, valueType, params) => {
	return new ZodMap({
		valueType,
		keyType,
		typeName: ZodFirstPartyTypeKind.ZodMap,
		...processCreateParams(params)
	});
};
var ZodSet = class ZodSet extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.set) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.set,
				received: ctx.parsedType
			});
			return INVALID;
		}
		const def = this._def;
		if (def.minSize !== null) {
			if (ctx.data.size < def.minSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def.minSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def.minSize.message
				});
				status.dirty();
			}
		}
		if (def.maxSize !== null) {
			if (ctx.data.size > def.maxSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def.maxSize.message
				});
				status.dirty();
			}
		}
		const valueType = this._def.valueType;
		function finalizeSet(elements) {
			const parsedSet = /* @__PURE__ */ new Set();
			for (const element of elements) {
				if (element.status === "aborted") return INVALID;
				if (element.status === "dirty") status.dirty();
				parsedSet.add(element.value);
			}
			return {
				status: status.value,
				value: parsedSet
			};
		}
		const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
		if (ctx.common.async) return Promise.all(elements).then((elements) => finalizeSet(elements));
		else return finalizeSet(elements);
	}
	min(minSize, message) {
		return new ZodSet({
			...this._def,
			minSize: {
				value: minSize,
				message: errorUtil.toString(message)
			}
		});
	}
	max(maxSize, message) {
		return new ZodSet({
			...this._def,
			maxSize: {
				value: maxSize,
				message: errorUtil.toString(message)
			}
		});
	}
	size(size, message) {
		return this.min(size, message).max(size, message);
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodSet.create = (valueType, params) => {
	return new ZodSet({
		valueType,
		minSize: null,
		maxSize: null,
		typeName: ZodFirstPartyTypeKind.ZodSet,
		...processCreateParams(params)
	});
};
var ZodFunction = class ZodFunction extends ZodType {
	constructor() {
		super(...arguments);
		this.validate = this.implement;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.function) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.function,
				received: ctx.parsedType
			});
			return INVALID;
		}
		function makeArgsIssue(args, error) {
			return makeIssue({
				data: args,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					getErrorMap(),
					errorMap
				].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_arguments,
					argumentsError: error
				}
			});
		}
		function makeReturnsIssue(returns, error) {
			return makeIssue({
				data: returns,
				path: ctx.path,
				errorMaps: [
					ctx.common.contextualErrorMap,
					ctx.schemaErrorMap,
					getErrorMap(),
					errorMap
				].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_return_type,
					returnTypeError: error
				}
			});
		}
		const params = { errorMap: ctx.common.contextualErrorMap };
		const fn = ctx.data;
		if (this._def.returns instanceof ZodPromise) {
			const me = this;
			return OK(async function(...args) {
				const error = new ZodError([]);
				const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
					error.addIssue(makeArgsIssue(args, e));
					throw error;
				});
				const result = await Reflect.apply(fn, this, parsedArgs);
				return await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
					error.addIssue(makeReturnsIssue(result, e));
					throw error;
				});
			});
		} else {
			const me = this;
			return OK(function(...args) {
				const parsedArgs = me._def.args.safeParse(args, params);
				if (!parsedArgs.success) throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
				const result = Reflect.apply(fn, this, parsedArgs.data);
				const parsedReturns = me._def.returns.safeParse(result, params);
				if (!parsedReturns.success) throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
				return parsedReturns.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...items) {
		return new ZodFunction({
			...this._def,
			args: ZodTuple.create(items).rest(ZodUnknown.create())
		});
	}
	returns(returnType) {
		return new ZodFunction({
			...this._def,
			returns: returnType
		});
	}
	implement(func) {
		return this.parse(func);
	}
	strictImplement(func) {
		return this.parse(func);
	}
	static create(args, returns, params) {
		return new ZodFunction({
			args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
			returns: returns || ZodUnknown.create(),
			typeName: ZodFirstPartyTypeKind.ZodFunction,
			...processCreateParams(params)
		});
	}
};
var ZodLazy = class extends ZodType {
	get schema() {
		return this._def.getter();
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		return this._def.getter()._parse({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		});
	}
};
ZodLazy.create = (getter, params) => {
	return new ZodLazy({
		getter,
		typeName: ZodFirstPartyTypeKind.ZodLazy,
		...processCreateParams(params)
	});
};
var ZodLiteral = class extends ZodType {
	_parse(input) {
		if (input.data !== this._def.value) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_literal,
				expected: this._def.value
			});
			return INVALID;
		}
		return {
			status: "valid",
			value: input.data
		};
	}
	get value() {
		return this._def.value;
	}
};
ZodLiteral.create = (value, params) => {
	return new ZodLiteral({
		value,
		typeName: ZodFirstPartyTypeKind.ZodLiteral,
		...processCreateParams(params)
	});
};
function createZodEnum(values, params) {
	return new ZodEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodEnum,
		...processCreateParams(params)
	});
}
var ZodEnum = class ZodEnum extends ZodType {
	_parse(input) {
		if (typeof input.data !== "string") {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type
			});
			return INVALID;
		}
		if (!this._cache) this._cache = new Set(this._def.values);
		if (!this._cache.has(input.data)) {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	get Values() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	get Enum() {
		const enumValues = {};
		for (const val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	extract(values, newDef = this._def) {
		return ZodEnum.create(values, {
			...this._def,
			...newDef
		});
	}
	exclude(values, newDef = this._def) {
		return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
			...this._def,
			...newDef
		});
	}
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
	_parse(input) {
		const nativeEnumValues = util.getValidEnumValues(this._def.values);
		const ctx = this._getOrReturnCtx(input);
		if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type
			});
			return INVALID;
		}
		if (!this._cache) this._cache = new Set(util.getValidEnumValues(this._def.values));
		if (!this._cache.has(input.data)) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get enum() {
		return this._def.values;
	}
};
ZodNativeEnum.create = (values, params) => {
	return new ZodNativeEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
		...processCreateParams(params)
	});
};
var ZodPromise = class extends ZodType {
	unwrap() {
		return this._def.type;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.promise,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return OK((ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data)).then((data) => {
			return this._def.type.parseAsync(data, {
				path: ctx.path,
				errorMap: ctx.common.contextualErrorMap
			});
		}));
	}
};
ZodPromise.create = (schema, params) => {
	return new ZodPromise({
		type: schema,
		typeName: ZodFirstPartyTypeKind.ZodPromise,
		...processCreateParams(params)
	});
};
var ZodEffects = class extends ZodType {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const effect = this._def.effect || null;
		const checkCtx = {
			addIssue: (arg) => {
				addIssueToContext(ctx, arg);
				if (arg.fatal) status.abort();
				else status.dirty();
			},
			get path() {
				return ctx.path;
			}
		};
		checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
		if (effect.type === "preprocess") {
			const processed = effect.transform(ctx.data, checkCtx);
			if (ctx.common.async) return Promise.resolve(processed).then(async (processed) => {
				if (status.value === "aborted") return INVALID;
				const result = await this._def.schema._parseAsync({
					data: processed,
					path: ctx.path,
					parent: ctx
				});
				if (result.status === "aborted") return INVALID;
				if (result.status === "dirty") return DIRTY(result.value);
				if (status.value === "dirty") return DIRTY(result.value);
				return result;
			});
			else {
				if (status.value === "aborted") return INVALID;
				const result = this._def.schema._parseSync({
					data: processed,
					path: ctx.path,
					parent: ctx
				});
				if (result.status === "aborted") return INVALID;
				if (result.status === "dirty") return DIRTY(result.value);
				if (status.value === "dirty") return DIRTY(result.value);
				return result;
			}
		}
		if (effect.type === "refinement") {
			const executeRefinement = (acc) => {
				const result = effect.refinement(acc, checkCtx);
				if (ctx.common.async) return Promise.resolve(result);
				if (result instanceof Promise) throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
				return acc;
			};
			if (ctx.common.async === false) {
				const inner = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				if (inner.status === "aborted") return INVALID;
				if (inner.status === "dirty") status.dirty();
				executeRefinement(inner.value);
				return {
					status: status.value,
					value: inner.value
				};
			} else return this._def.schema._parseAsync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			}).then((inner) => {
				if (inner.status === "aborted") return INVALID;
				if (inner.status === "dirty") status.dirty();
				return executeRefinement(inner.value).then(() => {
					return {
						status: status.value,
						value: inner.value
					};
				});
			});
		}
		if (effect.type === "transform") if (ctx.common.async === false) {
			const base = this._def.schema._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			});
			if (!isValid(base)) return INVALID;
			const result = effect.transform(base.value, checkCtx);
			if (result instanceof Promise) throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
			return {
				status: status.value,
				value: result
			};
		} else return this._def.schema._parseAsync({
			data: ctx.data,
			path: ctx.path,
			parent: ctx
		}).then((base) => {
			if (!isValid(base)) return INVALID;
			return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
				status: status.value,
				value: result
			}));
		});
		util.assertNever(effect);
	}
};
ZodEffects.create = (schema, effect, params) => {
	return new ZodEffects({
		schema,
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		effect,
		...processCreateParams(params)
	});
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
	return new ZodEffects({
		schema,
		effect: {
			type: "preprocess",
			transform: preprocess
		},
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		...processCreateParams(params)
	});
};
var ZodOptional = class extends ZodType {
	_parse(input) {
		if (this._getType(input) === ZodParsedType.undefined) return OK(void 0);
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodOptional.create = (type, params) => {
	return new ZodOptional({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodOptional,
		...processCreateParams(params)
	});
};
var ZodNullable = class extends ZodType {
	_parse(input) {
		if (this._getType(input) === ZodParsedType.null) return OK(null);
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodNullable.create = (type, params) => {
	return new ZodNullable({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodNullable,
		...processCreateParams(params)
	});
};
var ZodDefault = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		let data = ctx.data;
		if (ctx.parsedType === ZodParsedType.undefined) data = this._def.defaultValue();
		return this._def.innerType._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
};
ZodDefault.create = (type, params) => {
	return new ZodDefault({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodDefault,
		defaultValue: typeof params.default === "function" ? params.default : () => params.default,
		...processCreateParams(params)
	});
};
var ZodCatch = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const newCtx = {
			...ctx,
			common: {
				...ctx.common,
				issues: []
			}
		};
		const result = this._def.innerType._parse({
			data: newCtx.data,
			path: newCtx.path,
			parent: { ...newCtx }
		});
		if (isAsync(result)) return result.then((result) => {
			return {
				status: "valid",
				value: result.status === "valid" ? result.value : this._def.catchValue({
					get error() {
						return new ZodError(newCtx.common.issues);
					},
					input: newCtx.data
				})
			};
		});
		else return {
			status: "valid",
			value: result.status === "valid" ? result.value : this._def.catchValue({
				get error() {
					return new ZodError(newCtx.common.issues);
				},
				input: newCtx.data
			})
		};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
ZodCatch.create = (type, params) => {
	return new ZodCatch({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodCatch,
		catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
		...processCreateParams(params)
	});
};
var ZodNaN = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.nan) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.nan,
				received: ctx.parsedType
			});
			return INVALID;
		}
		return {
			status: "valid",
			value: input.data
		};
	}
};
ZodNaN.create = (params) => {
	return new ZodNaN({
		typeName: ZodFirstPartyTypeKind.ZodNaN,
		...processCreateParams(params)
	});
};
var ZodBranded = class extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const data = ctx.data;
		return this._def.type._parse({
			data,
			path: ctx.path,
			parent: ctx
		});
	}
	unwrap() {
		return this._def.type;
	}
};
var ZodPipeline = class ZodPipeline extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.common.async) {
			const handleAsync = async () => {
				const inResult = await this._def.in._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx
				});
				if (inResult.status === "aborted") return INVALID;
				if (inResult.status === "dirty") {
					status.dirty();
					return DIRTY(inResult.value);
				} else return this._def.out._parseAsync({
					data: inResult.value,
					path: ctx.path,
					parent: ctx
				});
			};
			return handleAsync();
		} else {
			const inResult = this._def.in._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx
			});
			if (inResult.status === "aborted") return INVALID;
			if (inResult.status === "dirty") {
				status.dirty();
				return {
					status: "dirty",
					value: inResult.value
				};
			} else return this._def.out._parseSync({
				data: inResult.value,
				path: ctx.path,
				parent: ctx
			});
		}
	}
	static create(a, b) {
		return new ZodPipeline({
			in: a,
			out: b,
			typeName: ZodFirstPartyTypeKind.ZodPipeline
		});
	}
};
var ZodReadonly = class extends ZodType {
	_parse(input) {
		const result = this._def.innerType._parse(input);
		const freeze = (data) => {
			if (isValid(data)) data.value = Object.freeze(data.value);
			return data;
		};
		return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodReadonly.create = (type, params) => {
	return new ZodReadonly({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodReadonly,
		...processCreateParams(params)
	});
};
ZodObject.lazycreate;
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind) {
	ZodFirstPartyTypeKind["ZodString"] = "ZodString";
	ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
	ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
	ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
	ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
	ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
	ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
	ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
	ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
	ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
	ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
	ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
	ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
	ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
	ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
	ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
	ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
	ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
	ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
	ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
	ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
	ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
	ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
	ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
	ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
	ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
	ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
	ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
	ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
	ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
	ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
	ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
	ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
	ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
	ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
	ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var stringType = ZodString.create;
var numberType = ZodNumber.create;
ZodNaN.create;
ZodBigInt.create;
var booleanType = ZodBoolean.create;
ZodDate.create;
ZodSymbol.create;
ZodUndefined.create;
ZodNull.create;
ZodAny.create;
ZodUnknown.create;
ZodNever.create;
ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
ZodObject.strictCreate;
var unionType = ZodUnion.create;
ZodDiscriminatedUnion.create;
ZodIntersection.create;
ZodTuple.create;
ZodRecord.create;
ZodMap.create;
ZodSet.create;
ZodFunction.create;
ZodLazy.create;
ZodLiteral.create;
var enumType = ZodEnum.create;
ZodNativeEnum.create;
ZodPromise.create;
ZodEffects.create;
ZodOptional.create;
ZodNullable.create;
ZodEffects.createWithPreprocess;
ZodPipeline.create;
//#endregion
//#region ../../lib/schemas/guide.ts
var guideCategories = [
	"general",
	"pve",
	"pvp",
	"build",
	"farm",
	"craft",
	"training"
];
var guideSummarySchema = objectType({
	id: stringType(),
	slug: stringType(),
	ownerAccountId: stringType().nullable().optional(),
	title: stringType(),
	category: stringType(),
	author: stringType(),
	createdAt: stringType(),
	updatedAt: stringType(),
	votes: numberType(),
	commentsCount: numberType(),
	linkTargets: arrayType(stringType())
});
var guideCommentSchema = objectType({
	id: stringType(),
	author: stringType(),
	comment: stringType(),
	createdAt: stringType()
});
var guideEntitySchema = objectType({
	id: stringType(),
	slug: stringType(),
	ownerAccountId: stringType().nullable().optional(),
	title: stringType(),
	content: stringType(),
	category: stringType(),
	author: stringType(),
	createdAt: stringType(),
	updatedAt: stringType()
});
var guideDetailSchema = objectType({
	guide: guideEntitySchema,
	votes: numberType(),
	voted: booleanType(),
	comments: arrayType(guideCommentSchema)
});
var createGuideSchema = objectType({
	title: stringType().min(1, "Название обязательно").max(200, "Максимум 200 символов"),
	content: stringType().min(10, "Минимум 10 символов").max(5e5, "Слишком длинный текст"),
	category: enumType(guideCategories),
	author: stringType().max(100, "Максимум 100 символов").optional()
});
var createCommentSchema = objectType({
	author: stringType().max(100, "Максимум 100 символов").optional(),
	comment: stringType().min(1, "Комментарий обязателен").max(3e3, "Максимум 3000 символов")
});
var voteResponseSchema = objectType({
	votes: numberType(),
	voted: booleanType()
});
process.env.NEXT_PUBLIC_DISCORD_BOT_API_URL || process.env.DISCORD_BOT_API_URL;
var sameOriginOpenApiClient = createClient({
	baseUrl: "",
	credentials: "include",
	headers: { "Content-Type": "application/json" }
});
//#endregion
//#region ../../lib/api/guides.ts
var guidesApi = {
	list: async () => {
		const response = await getApiGuide({ client: sameOriginOpenApiClient });
		return arrayType(guideSummarySchema).parse(response.data || []);
	},
	get: async (id, voterKey) => {
		const response = await getApiGuideById({
			client: sameOriginOpenApiClient,
			path: { id },
			query: voterKey ? { voterKey } : {}
		});
		return guideDetailSchema.parse(response.data || {});
	},
	create: async (data) => {
		const response = await postApiGuide({
			client: sameOriginOpenApiClient,
			body: data
		});
		return guideSummarySchema.parse(response.data || {});
	},
	update: async (id, data) => {
		const response = await patchApiGuideById({
			client: sameOriginOpenApiClient,
			path: { id },
			body: data
		});
		return guideEntitySchema.parse(response.data || {});
	},
	vote: async (id, voterKey) => {
		const response = await postApiGuideByIdVote({
			client: sameOriginOpenApiClient,
			path: { id },
			body: { voterKey }
		});
		return voteResponseSchema.parse(response.data || {});
	},
	addComment: async (id, data) => {
		const response = await postApiGuideByIdComment({
			client: sameOriginOpenApiClient,
			path: { id },
			body: data
		});
		return guideCommentSchema.parse(response.data || {});
	},
	remove: async (id) => {
		const response = await deleteApiGuideById({
			client: sameOriginOpenApiClient,
			path: { id }
		});
		return objectType({ success: booleanType() }).parse(response.data || {});
	}
};
//#endregion
//#region ../../lib/guides/hooks.ts
var guideKeys = {
	all: ["guides"],
	lists: () => [...guideKeys.all, "list"],
	details: () => [...guideKeys.all, "detail"],
	detail: (id) => [...guideKeys.details(), id]
};
function updateGuideLists(queryClient, updater) {
	queryClient.getQueriesData({ queryKey: guideKeys.lists() }).forEach(([key, value]) => {
		queryClient.setQueryData(key, updater(value ?? []));
	});
}
function useGuides() {
	return useQuery({
		queryKey: guideKeys.lists(),
		queryFn: guidesApi.list,
		staleTime: 600 * 1e3
	});
}
function useGuide(id, voterKey) {
	return useQuery({
		queryKey: guideKeys.detail(id || ""),
		queryFn: () => guidesApi.get(id, voterKey),
		enabled: !!id,
		staleTime: 300 * 1e3
	});
}
function useCreateGuide() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => guidesApi.create(data),
		onMutate: async (data) => {
			await queryClient.cancelQueries({ queryKey: guideKeys.lists() });
			const previousLists = queryClient.getQueriesData({ queryKey: guideKeys.lists() });
			const optimisticId = `temp-guide-${Date.now()}`;
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const optimisticGuide = {
				id: optimisticId,
				slug: optimisticId,
				ownerAccountId: null,
				title: data.title.trim(),
				category: data.category,
				author: data.author?.trim() || "You",
				createdAt: now,
				updatedAt: now,
				votes: 0,
				commentsCount: 0,
				linkTargets: []
			};
			updateGuideLists(queryClient, (items) => [optimisticGuide, ...items]);
			return {
				previousLists,
				optimisticId
			};
		},
		onError: (_error, _data, context) => {
			context?.previousLists?.forEach(([key, value]) => {
				queryClient.setQueryData(key, value);
			});
		},
		onSuccess: (createdGuide, _data, context) => {
			updateGuideLists(queryClient, (items) => items.map((item) => item.id === context?.optimisticId ? createdGuide : item));
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
		}
	});
}
function useUpdateGuide() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => guidesApi.update(id, data),
		onMutate: async (variables) => {
			await queryClient.cancelQueries({ queryKey: guideKeys.detail(variables.id) });
			await queryClient.cancelQueries({ queryKey: guideKeys.lists() });
			const previousDetail = queryClient.getQueryData(guideKeys.detail(variables.id));
			const previousLists = queryClient.getQueriesData({ queryKey: guideKeys.lists() });
			const now = (/* @__PURE__ */ new Date()).toISOString();
			queryClient.setQueryData(guideKeys.detail(variables.id), (current) => current ? {
				...current,
				guide: {
					...current.guide,
					...variables.data,
					updatedAt: now
				}
			} : current);
			updateGuideLists(queryClient, (items) => items.map((item) => item.id === variables.id ? {
				...item,
				title: variables.data.title,
				category: variables.data.category,
				updatedAt: now
			} : item));
			return {
				previousDetail,
				previousLists,
				id: variables.id
			};
		},
		onError: (_error, variables, context) => {
			if (context?.previousDetail) queryClient.setQueryData(guideKeys.detail(variables.id), context.previousDetail);
			context?.previousLists?.forEach(([key, value]) => {
				queryClient.setQueryData(key, value);
			});
		},
		onSuccess: (updatedGuide, variables) => {
			queryClient.setQueryData(guideKeys.detail(variables.id), (current) => current ? {
				...current,
				guide: updatedGuide
			} : current);
			updateGuideLists(queryClient, (items) => items.map((item) => item.id === variables.id ? {
				...item,
				title: updatedGuide.title,
				category: updatedGuide.category,
				updatedAt: updatedGuide.updatedAt
			} : item));
		},
		onSettled: (_data, _error, variables) => {
			queryClient.invalidateQueries({ queryKey: guideKeys.detail(variables.id) });
			queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
		}
	});
}
function useVoteGuide() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, voterKey }) => guidesApi.vote(id, voterKey),
		onMutate: async ({ id }) => {
			await queryClient.cancelQueries({ queryKey: guideKeys.detail(id) });
			await queryClient.cancelQueries({ queryKey: guideKeys.lists() });
			const previousDetail = queryClient.getQueryData(guideKeys.detail(id));
			const previousLists = queryClient.getQueriesData({ queryKey: guideKeys.lists() });
			const nextVotes = previousDetail ? previousDetail.votes + (previousDetail.voted ? -1 : 1) : null;
			const nextVoted = previousDetail ? !previousDetail.voted : true;
			if (previousDetail && nextVotes !== null) queryClient.setQueryData(guideKeys.detail(id), {
				...previousDetail,
				votes: nextVotes,
				voted: nextVoted
			});
			if (nextVotes !== null) updateGuideLists(queryClient, (items) => items.map((item) => item.id === id ? {
				...item,
				votes: nextVotes
			} : item));
			return {
				previousDetail,
				previousLists
			};
		},
		onError: (_error, _vars, context) => {
			if (context?.previousDetail) queryClient.setQueryData(guideKeys.detail(context.previousDetail.guide.id), context.previousDetail);
			context?.previousLists?.forEach(([key, value]) => {
				queryClient.setQueryData(key, value);
			});
		},
		onSuccess: (voteResponse, variables) => {
			queryClient.setQueryData(guideKeys.detail(variables.id), (current) => current ? {
				...current,
				votes: voteResponse.votes,
				voted: voteResponse.voted
			} : current);
			updateGuideLists(queryClient, (items) => items.map((item) => item.id === variables.id ? {
				...item,
				votes: voteResponse.votes
			} : item));
		},
		onSettled: (_data, _error, variables) => {
			queryClient.invalidateQueries({ queryKey: guideKeys.detail(variables.id) });
			queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
		}
	});
}
function useAddComment() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }) => guidesApi.addComment(id, data),
		onMutate: async ({ id, data }) => {
			await queryClient.cancelQueries({ queryKey: guideKeys.detail(id) });
			await queryClient.cancelQueries({ queryKey: guideKeys.lists() });
			const previousDetail = queryClient.getQueryData(guideKeys.detail(id));
			const previousLists = queryClient.getQueriesData({ queryKey: guideKeys.lists() });
			const optimisticId = `temp-comment-${Date.now()}`;
			const optimisticComment = {
				id: optimisticId,
				author: data.author?.trim() || "You",
				comment: data.comment,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			queryClient.setQueryData(guideKeys.detail(id), (current) => current ? {
				...current,
				comments: [...current.comments, optimisticComment]
			} : current);
			updateGuideLists(queryClient, (items) => items.map((item) => item.id === id ? {
				...item,
				commentsCount: item.commentsCount + 1
			} : item));
			return {
				previousDetail,
				previousLists,
				optimisticId
			};
		},
		onError: (_error, vars, context) => {
			if (context?.previousDetail) queryClient.setQueryData(guideKeys.detail(vars.id), context.previousDetail);
			context?.previousLists?.forEach(([key, value]) => {
				queryClient.setQueryData(key, value);
			});
		},
		onSuccess: (comment, vars, context) => {
			queryClient.setQueryData(guideKeys.detail(vars.id), (current) => current ? {
				...current,
				comments: current.comments.map((item) => item.id === context?.optimisticId ? comment : item)
			} : current);
		},
		onSettled: (_data, _error, vars) => {
			queryClient.invalidateQueries({ queryKey: guideKeys.detail(vars.id) });
			queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
		}
	});
}
function useDeleteGuide() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => guidesApi.remove(id),
		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey: guideKeys.detail(id) });
			await queryClient.cancelQueries({ queryKey: guideKeys.lists() });
			const previousDetail = queryClient.getQueryData(guideKeys.detail(id));
			const previousLists = queryClient.getQueriesData({ queryKey: guideKeys.lists() });
			updateGuideLists(queryClient, (items) => items.filter((item) => item.id !== id));
			queryClient.removeQueries({
				queryKey: guideKeys.detail(id),
				exact: true
			});
			return {
				previousDetail,
				previousLists,
				id
			};
		},
		onError: (_error, _id, context) => {
			if (context?.previousDetail) queryClient.setQueryData(guideKeys.detail(context.id), context.previousDetail);
			context?.previousLists?.forEach(([key, value]) => {
				queryClient.setQueryData(key, value);
			});
		},
		onSettled: (_data, _error, id) => {
			queryClient.invalidateQueries({ queryKey: guideKeys.lists() });
			queryClient.invalidateQueries({ queryKey: guideKeys.detail(id) });
		}
	});
}
function usePrefetchGuides() {
	const queryClient = useQueryClient();
	return useCallback(() => {
		queryClient.prefetchQuery({
			queryKey: guideKeys.lists(),
			queryFn: guidesApi.list,
			staleTime: 600 * 1e3
		});
	}, [queryClient]);
}
//#endregion
//#region ../../lib/guides/obsidian.ts
var CATEGORY_SET = new Set(guideCategories);
var IMAGE_EXTENSIONS = new Set([
	"png",
	"jpg",
	"jpeg",
	"gif",
	"webp",
	"avif",
	"svg",
	"bmp"
]);
var ATTACHMENT_EXTENSIONS = new Set([
	...IMAGE_EXTENSIONS,
	"mp4",
	"webm",
	"pdf"
]);
var CALLOUT_LABELS = {
	note: "Note",
	abstract: "Overview",
	summary: "Summary",
	info: "Info",
	todo: "Todo",
	tip: "Tip",
	hint: "Hint",
	important: "Important",
	success: "Success",
	check: "Check",
	done: "Done",
	question: "Question",
	help: "Help",
	faq: "FAQ",
	warning: "Warning",
	caution: "Caution",
	attention: "Attention",
	failure: "Failure",
	fail: "Failure",
	missing: "Missing",
	danger: "Danger",
	error: "Error",
	bug: "Bug",
	example: "Example",
	quote: "Quote"
};
function normalizeLineBreaks(value) {
	return value.replace(/\r\n/g, "\n");
}
function stripQuotes(value) {
	return value.replace(/^['"]|['"]$/g, "").trim();
}
function baseName(value) {
	const normalized = value.replace(/\\/g, "/");
	const parts = normalized.split("/").filter(Boolean);
	return parts[parts.length - 1] || normalized;
}
function fileExtension(value) {
	const match = baseName(value).match(/\.([a-z0-9]+)$/i);
	return match ? match[1].toLowerCase() : "";
}
function isAttachmentPath(value) {
	return ATTACHMENT_EXTENSIONS.has(fileExtension(value));
}
function isImagePath(value) {
	return IMAGE_EXTENSIONS.has(fileExtension(value));
}
function sanitizeWikiTarget(value) {
	return value.split("#")[0].trim();
}
function parseWikiReference(value) {
	const [targetPart, labelPart] = value.split("|");
	return {
		target: sanitizeWikiTarget(targetPart || ""),
		label: (labelPart || "").trim()
	};
}
function normalizeFileLookupKey(value) {
	return baseName(value).toLowerCase();
}
function buildFileLookup(files) {
	const lookup = /* @__PURE__ */ new Map();
	for (const file of files) {
		lookup.set(normalizeFileLookupKey(file.name), file);
		const relativePath = file.webkitRelativePath;
		if (relativePath) lookup.set(normalizeFileLookupKey(relativePath), file);
	}
	return lookup;
}
function valueToList(value) {
	if (!value) return [];
	return Array.isArray(value) ? value : [value];
}
function resolveGuideCategory(rawCategory, tags = []) {
	const candidates = [rawCategory, ...tags].map((value) => (value || "").trim().toLowerCase()).filter(Boolean);
	for (const candidate of candidates) {
		if (CATEGORY_SET.has(candidate)) return candidate;
		if (candidate.includes("raid") || candidate.includes("boss") || candidate.includes("dungeon")) return "pve";
		if (candidate.includes("arena") || candidate.includes("duel")) return "pvp";
		if (candidate.includes("build")) return "build";
		if (candidate.includes("farm")) return "farm";
		if (candidate.includes("craft")) return "craft";
		if (candidate.includes("train")) return "training";
	}
	return "general";
}
function parseFrontmatterValue(value) {
	const trimmed = value.trim();
	if (trimmed.startsWith("[") && trimmed.endsWith("]")) return trimmed.slice(1, -1).split(",").map((item) => stripQuotes(item)).filter(Boolean);
	return stripQuotes(trimmed);
}
function parseGuideFrontmatter(markdown) {
	const normalized = normalizeLineBreaks(markdown);
	if (!normalized.startsWith("---\n")) return {
		data: {},
		content: normalized
	};
	const endIndex = normalized.indexOf("\n---\n", 4);
	if (endIndex === -1) return {
		data: {},
		content: normalized
	};
	const frontmatterBlock = normalized.slice(4, endIndex);
	const content = normalized.slice(endIndex + 5);
	const data = {};
	let currentListKey = null;
	for (const rawLine of frontmatterBlock.split("\n")) {
		const line = rawLine.trimEnd();
		if (!line.trim()) continue;
		const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
		if (keyMatch) {
			const [, rawKey, rawValue] = keyMatch;
			const key = rawKey.toLowerCase();
			const value = rawValue.trim();
			if (!value) {
				data[key] = [];
				currentListKey = key;
				continue;
			}
			data[key] = parseFrontmatterValue(value);
			currentListKey = null;
			continue;
		}
		const listMatch = line.match(/^\s*-\s+(.*)$/);
		if (listMatch && currentListKey) {
			const existing = valueToList(data[currentListKey]);
			existing.push(stripQuotes(listMatch[1]));
			data[currentListKey] = existing.filter(Boolean);
		}
	}
	return {
		data,
		content
	};
}
function normalizeGuideTitle(value) {
	return stripQuotes(value).replace(/\.(md|markdown)$/i, "").toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9\u0400-\u04ff-]+/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function extractTitleFromMarkdown(content, fallbackFileName) {
	const { data, content: stripped } = parseGuideFrontmatter(content);
	const frontmatterTitle = data.title;
	if (typeof frontmatterTitle === "string" && frontmatterTitle.trim()) return frontmatterTitle.trim().slice(0, 140);
	const heading = stripped.split("\n").map((line) => line.trim()).find((line) => line.startsWith("# "));
	if (heading) return heading.replace(/^#\s+/, "").trim().slice(0, 140);
	return baseName(fallbackFileName).replace(/\.(md|markdown)$/i, "").trim().slice(0, 140) || "Imported guide";
}
async function readFileAsDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(reader.error || /* @__PURE__ */ new Error("Failed to read file"));
		reader.onload = () => resolve(String(reader.result || ""));
		reader.readAsDataURL(file);
	});
}
async function resolveAssetLinks(markdown, files) {
	if (files.length === 0) return markdown;
	const lookup = buildFileLookup(files);
	let nextMarkdown = markdown;
	const obsidianEmbeds = [...nextMarkdown.matchAll(/!\[\[([^\]]+)\]\]/g)];
	for (const match of obsidianEmbeds) {
		const original = match[0];
		const { target, label } = parseWikiReference(match[1] || "");
		const file = lookup.get(normalizeFileLookupKey(target));
		const safeLabel = label || baseName(target).replace(/\.[a-z0-9]+$/i, "") || "Attachment";
		if (!file) {
			const fallback = isImagePath(target) ? `![${safeLabel}](${target})` : `[${safeLabel}](${target})`;
			nextMarkdown = nextMarkdown.replace(original, fallback);
			continue;
		}
		const dataUrl = await readFileAsDataUrl(file);
		const replacement = isImagePath(file.name) ? `![${safeLabel}](${dataUrl})` : `[${safeLabel}](${dataUrl})`;
		nextMarkdown = nextMarkdown.replace(original, replacement);
	}
	const markdownLinks = [...nextMarkdown.matchAll(/(!?)\[([^\]]*)\]\(([^)]+)\)/g)];
	for (const match of markdownLinks) {
		const [original, bang, label, target] = match;
		const trimmedTarget = target.trim();
		if (!trimmedTarget || /^(https?:|mailto:|tel:|data:|guide:\/\/|#)/i.test(trimmedTarget)) continue;
		const file = lookup.get(normalizeFileLookupKey(trimmedTarget));
		if (!file || isMarkdownFile(file)) continue;
		const dataUrl = await readFileAsDataUrl(file);
		const safeLabel = label || baseName(file.name).replace(/\.[a-z0-9]+$/i, "") || "Attachment";
		const replacement = bang === "!" ? `![${safeLabel}](${dataUrl})` : `[${safeLabel}](${dataUrl})`;
		nextMarkdown = nextMarkdown.replace(original, replacement);
	}
	return nextMarkdown;
}
function normalizeObsidianCallouts(markdown) {
	return normalizeLineBreaks(markdown).split("\n").map((line) => {
		const match = line.match(/^>\s*\[!([^\]]+)\]([+-])?\s*(.*)$/i);
		if (!match) return line;
		const type = match[1].trim().toLowerCase();
		const title = match[3].trim();
		return `> **${CALLOUT_LABELS[type] || type.charAt(0).toUpperCase() + type.slice(1)}${title ? ` - ${title}` : ""}**`;
	}).join("\n");
}
function normalizeObsidianLinks(markdown) {
	return markdown.replace(/!\[\[([^\]]+)\]\]/g, (_match, rawReference) => {
		const { target, label } = parseWikiReference(String(rawReference || ""));
		if (!target) return String(rawReference || "");
		const safeLabel = label || baseName(target).replace(/\.[a-z0-9]+$/i, "") || "Attachment";
		return isImagePath(target) ? `![${safeLabel}](${target})` : `[${safeLabel}](${target})`;
	}).replace(/(?<!!)\[\[([^\]]+)\]\]/g, (_match, rawReference) => {
		const { target, label } = parseWikiReference(String(rawReference || ""));
		if (!target) return String(rawReference || "");
		if (isAttachmentPath(target)) return `[${label || baseName(target)}](${target})`;
		const guideSlug = normalizeGuideTitle(target);
		return `[${label || baseName(target).replace(/\.(md|markdown)$/i, "") || target}](guide://${encodeURIComponent(guideSlug)})`;
	});
}
function prepareMarkdownForRender(markdown) {
	const { content } = parseGuideFrontmatter(markdown || "");
	return normalizeObsidianLinks(normalizeObsidianCallouts(content)).trim();
}
async function buildGuideDraftFromMarkdownFile(file, files) {
	const raw = await file.text();
	const { data, content } = parseGuideFrontmatter(raw);
	const resolvedContent = (await resolveAssetLinks(content.trim(), files)).slice(0, 5e5);
	const tags = valueToList(data.tags).map((value) => value.trim().toLowerCase());
	const categoryValue = typeof data.category === "string" ? data.category : valueToList(data.category)[0];
	const authorValue = typeof data.author === "string" ? data.author : valueToList(data.author)[0];
	return {
		title: extractTitleFromMarkdown(raw, file.name),
		content: resolvedContent,
		category: resolveGuideCategory(categoryValue, tags),
		author: authorValue?.trim() || void 0
	};
}
function isMarkdownFile(file) {
	return /\.(md|markdown)$/i.test(file.name) || file.type === "text/markdown";
}
//#endregion
//#region ../../node_modules/tailwind-merge/dist/bundle-mjs.mjs
var CLASS_PART_SEPARATOR = "-";
var createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		const classParts = className.split(CLASS_PART_SEPARATOR);
		if (classParts[0] === "" && classParts.length !== 1) classParts.shift();
		return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		const conflicts = conflictingClassGroups[classGroupId] || [];
		if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
		return conflicts;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
var getGroupRecursive = (classParts, classPartObject) => {
	if (classParts.length === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[0];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
	if (classGroupFromNextClassPart) return classGroupFromNextClassPart;
	if (classPartObject.validators.length === 0) return;
	const classRest = classParts.join(CLASS_PART_SEPARATOR);
	return classPartObject.validators.find(({ validator }) => validator(classRest))?.classGroupId;
};
var arbitraryPropertyRegex = /^\[(.+)\]$/;
var getGroupIdForArbitraryProperty = (className) => {
	if (arbitraryPropertyRegex.test(className)) {
		const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
		const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
		if (property) return "arbitrary.." + property;
	}
};
/**
* Exported for testing only
*/
var createClassMap = (config) => {
	const { theme, prefix } = config;
	const classMap = {
		nextPart: /* @__PURE__ */ new Map(),
		validators: []
	};
	getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix).forEach(([classGroupId, classGroup]) => {
		processClassesRecursively(classGroup, classMap, classGroupId, theme);
	});
	return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	classGroup.forEach((classDefinition) => {
		if (typeof classDefinition === "string") {
			const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
			classPartObjectToEdit.classGroupId = classGroupId;
			return;
		}
		if (typeof classDefinition === "function") {
			if (isThemeGetter(classDefinition)) {
				processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
				return;
			}
			classPartObject.validators.push({
				validator: classDefinition,
				classGroupId
			});
			return;
		}
		Object.entries(classDefinition).forEach(([key, classGroup]) => {
			processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
		});
	});
};
var getPart = (classPartObject, path) => {
	let currentClassPartObject = classPartObject;
	path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
		if (!currentClassPartObject.nextPart.has(pathPart)) currentClassPartObject.nextPart.set(pathPart, {
			nextPart: /* @__PURE__ */ new Map(),
			validators: []
		});
		currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
	});
	return currentClassPartObject;
};
var isThemeGetter = (func) => func.isThemeGetter;
var getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
	if (!prefix) return classGroupEntries;
	return classGroupEntries.map(([classGroupId, classGroup]) => {
		return [classGroupId, classGroup.map((classDefinition) => {
			if (typeof classDefinition === "string") return prefix + classDefinition;
			if (typeof classDefinition === "object") return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
			return classDefinition;
		})];
	});
};
var createLruCache = (maxCacheSize) => {
	if (maxCacheSize < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let cacheSize = 0;
	let cache = /* @__PURE__ */ new Map();
	let previousCache = /* @__PURE__ */ new Map();
	const update = (key, value) => {
		cache.set(key, value);
		cacheSize++;
		if (cacheSize > maxCacheSize) {
			cacheSize = 0;
			previousCache = cache;
			cache = /* @__PURE__ */ new Map();
		}
	};
	return {
		get(key) {
			let value = cache.get(key);
			if (value !== void 0) return value;
			if ((value = previousCache.get(key)) !== void 0) {
				update(key, value);
				return value;
			}
		},
		set(key, value) {
			if (cache.has(key)) cache.set(key, value);
			else update(key, value);
		}
	};
};
var IMPORTANT_MODIFIER = "!";
var createParseClassName = (config) => {
	const { separator, experimentalParseClassName } = config;
	const isSeparatorSingleCharacter = separator.length === 1;
	const firstSeparatorCharacter = separator[0];
	const separatorLength = separator.length;
	const parseClassName = (className) => {
		const modifiers = [];
		let bracketDepth = 0;
		let modifierStart = 0;
		let postfixModifierPosition;
		for (let index = 0; index < className.length; index++) {
			let currentCharacter = className[index];
			if (bracketDepth === 0) {
				if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
					modifiers.push(className.slice(modifierStart, index));
					modifierStart = index + separatorLength;
					continue;
				}
				if (currentCharacter === "/") {
					postfixModifierPosition = index;
					continue;
				}
			}
			if (currentCharacter === "[") bracketDepth++;
			else if (currentCharacter === "]") bracketDepth--;
		}
		const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
		const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
		return {
			modifiers,
			hasImportantModifier,
			baseClassName: hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier,
			maybePostfixModifierPosition: postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0
		};
	};
	if (experimentalParseClassName) return (className) => experimentalParseClassName({
		className,
		parseClassName
	});
	return parseClassName;
};
/**
* Sorts modifiers according to following schema:
* - Predefined modifiers are sorted alphabetically
* - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
*/
var sortModifiers = (modifiers) => {
	if (modifiers.length <= 1) return modifiers;
	const sortedModifiers = [];
	let unsortedModifiers = [];
	modifiers.forEach((modifier) => {
		if (modifier[0] === "[") {
			sortedModifiers.push(...unsortedModifiers.sort(), modifier);
			unsortedModifiers = [];
		} else unsortedModifiers.push(modifier);
	});
	sortedModifiers.push(...unsortedModifiers.sort());
	return sortedModifiers;
};
var createConfigUtils = (config) => ({
	cache: createLruCache(config.cacheSize),
	parseClassName: createParseClassName(config),
	...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
	const { parseClassName, getClassGroupId, getConflictingClassGroupIds } = configUtils;
	/**
	* Set of classGroupIds in following format:
	* `{importantModifier}{variantModifiers}{classGroupId}`
	* @example 'float'
	* @example 'hover:focus:bg-color'
	* @example 'md:!pr'
	*/
	const classGroupsInConflict = [];
	const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
	let result = "";
	for (let index = classNames.length - 1; index >= 0; index -= 1) {
		const originalClassName = classNames[index];
		const { modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
		let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			hasPostfixModifier = false;
		}
		const variantModifier = sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const classId = modifierId + classGroupId;
		if (classGroupsInConflict.includes(classId)) continue;
		classGroupsInConflict.push(classId);
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		for (let i = 0; i < conflictGroups.length; ++i) {
			const group = conflictGroups[i];
			classGroupsInConflict.push(modifierId + group);
		}
		result = originalClassName + (result.length > 0 ? " " + result : result);
	}
	return result;
};
/**
* The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
*
* Specifically:
* - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
* - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
*
* Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
*/
function twJoin() {
	let index = 0;
	let argument;
	let resolvedValue;
	let string = "";
	while (index < arguments.length) if (argument = arguments[index++]) {
		if (resolvedValue = toValue(argument)) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
}
var toValue = (mix) => {
	if (typeof mix === "string") return mix;
	let resolvedValue;
	let string = "";
	for (let k = 0; k < mix.length; k++) if (mix[k]) {
		if (resolvedValue = toValue(mix[k])) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
	let configUtils;
	let cacheGet;
	let cacheSet;
	let functionToCall = initTailwindMerge;
	function initTailwindMerge(classList) {
		configUtils = createConfigUtils(createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst()));
		cacheGet = configUtils.cache.get;
		cacheSet = configUtils.cache.set;
		functionToCall = tailwindMerge;
		return tailwindMerge(classList);
	}
	function tailwindMerge(classList) {
		const cachedResult = cacheGet(classList);
		if (cachedResult) return cachedResult;
		const result = mergeClassList(classList, configUtils);
		cacheSet(classList, result);
		return result;
	}
	return function callTailwindMerge() {
		return functionToCall(twJoin.apply(null, arguments));
	};
}
var fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || [];
	themeGetter.isThemeGetter = true;
	return themeGetter;
};
var arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
var fractionRegex = /^\d+\/\d+$/;
var stringLengths = /* @__PURE__ */ new Set([
	"px",
	"full",
	"screen"
]);
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isLength = (value) => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, "length", isLengthOnly);
var isNumber = (value) => Boolean(value) && !Number.isNaN(Number(value));
var isArbitraryNumber = (value) => getIsArbitraryValue(value, "number", isNumber);
var isInteger = (value) => Boolean(value) && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var sizeLabels = /* @__PURE__ */ new Set([
	"length",
	"size",
	"percentage"
]);
var isArbitrarySize = (value) => getIsArbitraryValue(value, sizeLabels, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, "position", isNever);
var imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
var isArbitraryImage = (value) => getIsArbitraryValue(value, imageLabels, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, "", isShadow);
var isAny = () => true;
var getIsArbitraryValue = (value, label, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return typeof label === "string" ? result[1] === label : label.has(result[1]);
		return testValue(result[2]);
	}
	return false;
};
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var getDefaultConfig = () => {
	const colors = fromTheme("colors");
	const spacing = fromTheme("spacing");
	const blur = fromTheme("blur");
	const brightness = fromTheme("brightness");
	const borderColor = fromTheme("borderColor");
	const borderRadius = fromTheme("borderRadius");
	const borderSpacing = fromTheme("borderSpacing");
	const borderWidth = fromTheme("borderWidth");
	const contrast = fromTheme("contrast");
	const grayscale = fromTheme("grayscale");
	const hueRotate = fromTheme("hueRotate");
	const invert = fromTheme("invert");
	const gap = fromTheme("gap");
	const gradientColorStops = fromTheme("gradientColorStops");
	const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
	const inset = fromTheme("inset");
	const margin = fromTheme("margin");
	const opacity = fromTheme("opacity");
	const padding = fromTheme("padding");
	const saturate = fromTheme("saturate");
	const scale = fromTheme("scale");
	const sepia = fromTheme("sepia");
	const skew = fromTheme("skew");
	const space = fromTheme("space");
	const translate = fromTheme("translate");
	const getOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const getOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const getSpacingWithAutoAndArbitrary = () => [
		"auto",
		isArbitraryValue,
		spacing
	];
	const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
	const getLengthWithEmptyAndArbitrary = () => [
		"",
		isLength,
		isArbitraryLength
	];
	const getNumberWithAutoAndArbitrary = () => [
		"auto",
		isNumber,
		isArbitraryValue
	];
	const getPositions = () => [
		"bottom",
		"center",
		"left",
		"left-bottom",
		"left-top",
		"right",
		"right-bottom",
		"right-top",
		"top"
	];
	const getLineStyles = () => [
		"solid",
		"dashed",
		"dotted",
		"double",
		"none"
	];
	const getBlendModes = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const getAlign = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch"
	];
	const getZeroAndEmpty = () => [
		"",
		"0",
		isArbitraryValue
	];
	const getBreaks = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
	return {
		cacheSize: 500,
		separator: ":",
		theme: {
			colors: [isAny],
			spacing: [isLength, isArbitraryLength],
			blur: [
				"none",
				"",
				isTshirtSize,
				isArbitraryValue
			],
			brightness: getNumberAndArbitrary(),
			borderColor: [colors],
			borderRadius: [
				"none",
				"",
				"full",
				isTshirtSize,
				isArbitraryValue
			],
			borderSpacing: getSpacingWithArbitrary(),
			borderWidth: getLengthWithEmptyAndArbitrary(),
			contrast: getNumberAndArbitrary(),
			grayscale: getZeroAndEmpty(),
			hueRotate: getNumberAndArbitrary(),
			invert: getZeroAndEmpty(),
			gap: getSpacingWithArbitrary(),
			gradientColorStops: [colors],
			gradientColorStopPositions: [isPercent, isArbitraryLength],
			inset: getSpacingWithAutoAndArbitrary(),
			margin: getSpacingWithAutoAndArbitrary(),
			opacity: getNumberAndArbitrary(),
			padding: getSpacingWithArbitrary(),
			saturate: getNumberAndArbitrary(),
			scale: getNumberAndArbitrary(),
			sepia: getZeroAndEmpty(),
			skew: getNumberAndArbitrary(),
			space: getSpacingWithArbitrary(),
			translate: getSpacingWithArbitrary()
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				"video",
				isArbitraryValue
			] }],
			container: ["container"],
			columns: [{ columns: [isTshirtSize] }],
			"break-after": [{ "break-after": getBreaks() }],
			"break-before": [{ "break-before": getBreaks() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: [...getPositions(), isArbitraryValue] }],
			overflow: [{ overflow: getOverflow() }],
			"overflow-x": [{ "overflow-x": getOverflow() }],
			"overflow-y": [{ "overflow-y": getOverflow() }],
			overscroll: [{ overscroll: getOverscroll() }],
			"overscroll-x": [{ "overscroll-x": getOverscroll() }],
			"overscroll-y": [{ "overscroll-y": getOverscroll() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: [inset] }],
			"inset-x": [{ "inset-x": [inset] }],
			"inset-y": [{ "inset-y": [inset] }],
			start: [{ start: [inset] }],
			end: [{ end: [inset] }],
			top: [{ top: [inset] }],
			right: [{ right: [inset] }],
			bottom: [{ bottom: [inset] }],
			left: [{ left: [inset] }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				"auto",
				isInteger,
				isArbitraryValue
			] }],
			basis: [{ basis: getSpacingWithAutoAndArbitrary() }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"wrap",
				"wrap-reverse",
				"nowrap"
			] }],
			flex: [{ flex: [
				"1",
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			grow: [{ grow: getZeroAndEmpty() }],
			shrink: [{ shrink: getZeroAndEmpty() }],
			order: [{ order: [
				"first",
				"last",
				"none",
				isInteger,
				isArbitraryValue
			] }],
			"grid-cols": [{ "grid-cols": [isAny] }],
			"col-start-end": [{ col: [
				"auto",
				{ span: [
					"full",
					isInteger,
					isArbitraryValue
				] },
				isArbitraryValue
			] }],
			"col-start": [{ "col-start": getNumberWithAutoAndArbitrary() }],
			"col-end": [{ "col-end": getNumberWithAutoAndArbitrary() }],
			"grid-rows": [{ "grid-rows": [isAny] }],
			"row-start-end": [{ row: [
				"auto",
				{ span: [isInteger, isArbitraryValue] },
				isArbitraryValue
			] }],
			"row-start": [{ "row-start": getNumberWithAutoAndArbitrary() }],
			"row-end": [{ "row-end": getNumberWithAutoAndArbitrary() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": [
				"auto",
				"min",
				"max",
				"fr",
				isArbitraryValue
			] }],
			"auto-rows": [{ "auto-rows": [
				"auto",
				"min",
				"max",
				"fr",
				isArbitraryValue
			] }],
			gap: [{ gap: [gap] }],
			"gap-x": [{ "gap-x": [gap] }],
			"gap-y": [{ "gap-y": [gap] }],
			"justify-content": [{ justify: ["normal", ...getAlign()] }],
			"justify-items": [{ "justify-items": [
				"start",
				"end",
				"center",
				"stretch"
			] }],
			"justify-self": [{ "justify-self": [
				"auto",
				"start",
				"end",
				"center",
				"stretch"
			] }],
			"align-content": [{ content: [
				"normal",
				...getAlign(),
				"baseline"
			] }],
			"align-items": [{ items: [
				"start",
				"end",
				"center",
				"baseline",
				"stretch"
			] }],
			"align-self": [{ self: [
				"auto",
				"start",
				"end",
				"center",
				"stretch",
				"baseline"
			] }],
			"place-content": [{ "place-content": [...getAlign(), "baseline"] }],
			"place-items": [{ "place-items": [
				"start",
				"end",
				"center",
				"baseline",
				"stretch"
			] }],
			"place-self": [{ "place-self": [
				"auto",
				"start",
				"end",
				"center",
				"stretch"
			] }],
			p: [{ p: [padding] }],
			px: [{ px: [padding] }],
			py: [{ py: [padding] }],
			ps: [{ ps: [padding] }],
			pe: [{ pe: [padding] }],
			pt: [{ pt: [padding] }],
			pr: [{ pr: [padding] }],
			pb: [{ pb: [padding] }],
			pl: [{ pl: [padding] }],
			m: [{ m: [margin] }],
			mx: [{ mx: [margin] }],
			my: [{ my: [margin] }],
			ms: [{ ms: [margin] }],
			me: [{ me: [margin] }],
			mt: [{ mt: [margin] }],
			mr: [{ mr: [margin] }],
			mb: [{ mb: [margin] }],
			ml: [{ ml: [margin] }],
			"space-x": [{ "space-x": [space] }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": [space] }],
			"space-y-reverse": ["space-y-reverse"],
			w: [{ w: [
				"auto",
				"min",
				"max",
				"fit",
				"svw",
				"lvw",
				"dvw",
				isArbitraryValue,
				spacing
			] }],
			"min-w": [{ "min-w": [
				isArbitraryValue,
				spacing,
				"min",
				"max",
				"fit"
			] }],
			"max-w": [{ "max-w": [
				isArbitraryValue,
				spacing,
				"none",
				"full",
				"min",
				"max",
				"fit",
				"prose",
				{ screen: [isTshirtSize] },
				isTshirtSize
			] }],
			h: [{ h: [
				isArbitraryValue,
				spacing,
				"auto",
				"min",
				"max",
				"fit",
				"svh",
				"lvh",
				"dvh"
			] }],
			"min-h": [{ "min-h": [
				isArbitraryValue,
				spacing,
				"min",
				"max",
				"fit",
				"svh",
				"lvh",
				"dvh"
			] }],
			"max-h": [{ "max-h": [
				isArbitraryValue,
				spacing,
				"min",
				"max",
				"fit",
				"svh",
				"lvh",
				"dvh"
			] }],
			size: [{ size: [
				isArbitraryValue,
				spacing,
				"auto",
				"min",
				"max",
				"fit"
			] }],
			"font-size": [{ text: [
				"base",
				isTshirtSize,
				isArbitraryLength
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black",
				isArbitraryNumber
			] }],
			"font-family": [{ font: [isAny] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest",
				isArbitraryValue
			] }],
			"line-clamp": [{ "line-clamp": [
				"none",
				isNumber,
				isArbitraryNumber
			] }],
			leading: [{ leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose",
				isLength,
				isArbitraryValue
			] }],
			"list-image": [{ "list-image": ["none", isArbitraryValue] }],
			"list-style-type": [{ list: [
				"none",
				"disc",
				"decimal",
				isArbitraryValue
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"placeholder-color": [{ placeholder: [colors] }],
			"placeholder-opacity": [{ "placeholder-opacity": [opacity] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"text-color": [{ text: [colors] }],
			"text-opacity": [{ "text-opacity": [opacity] }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...getLineStyles(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				"auto",
				"from-font",
				isLength,
				isArbitraryLength
			] }],
			"underline-offset": [{ "underline-offset": [
				"auto",
				isLength,
				isArbitraryValue
			] }],
			"text-decoration-color": [{ decoration: [colors] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: getSpacingWithArbitrary() }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryValue
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: ["none", isArbitraryValue] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-opacity": [{ "bg-opacity": [opacity] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: [...getPositions(), isArbitraryPosition] }],
			"bg-repeat": [{ bg: ["no-repeat", { repeat: [
				"",
				"x",
				"y",
				"round",
				"space"
			] }] }],
			"bg-size": [{ bg: [
				"auto",
				"cover",
				"contain",
				isArbitrarySize
			] }],
			"bg-image": [{ bg: [
				"none",
				{ "gradient-to": [
					"t",
					"tr",
					"r",
					"br",
					"b",
					"bl",
					"l",
					"tl"
				] },
				isArbitraryImage
			] }],
			"bg-color": [{ bg: [colors] }],
			"gradient-from-pos": [{ from: [gradientColorStopPositions] }],
			"gradient-via-pos": [{ via: [gradientColorStopPositions] }],
			"gradient-to-pos": [{ to: [gradientColorStopPositions] }],
			"gradient-from": [{ from: [gradientColorStops] }],
			"gradient-via": [{ via: [gradientColorStops] }],
			"gradient-to": [{ to: [gradientColorStops] }],
			rounded: [{ rounded: [borderRadius] }],
			"rounded-s": [{ "rounded-s": [borderRadius] }],
			"rounded-e": [{ "rounded-e": [borderRadius] }],
			"rounded-t": [{ "rounded-t": [borderRadius] }],
			"rounded-r": [{ "rounded-r": [borderRadius] }],
			"rounded-b": [{ "rounded-b": [borderRadius] }],
			"rounded-l": [{ "rounded-l": [borderRadius] }],
			"rounded-ss": [{ "rounded-ss": [borderRadius] }],
			"rounded-se": [{ "rounded-se": [borderRadius] }],
			"rounded-ee": [{ "rounded-ee": [borderRadius] }],
			"rounded-es": [{ "rounded-es": [borderRadius] }],
			"rounded-tl": [{ "rounded-tl": [borderRadius] }],
			"rounded-tr": [{ "rounded-tr": [borderRadius] }],
			"rounded-br": [{ "rounded-br": [borderRadius] }],
			"rounded-bl": [{ "rounded-bl": [borderRadius] }],
			"border-w": [{ border: [borderWidth] }],
			"border-w-x": [{ "border-x": [borderWidth] }],
			"border-w-y": [{ "border-y": [borderWidth] }],
			"border-w-s": [{ "border-s": [borderWidth] }],
			"border-w-e": [{ "border-e": [borderWidth] }],
			"border-w-t": [{ "border-t": [borderWidth] }],
			"border-w-r": [{ "border-r": [borderWidth] }],
			"border-w-b": [{ "border-b": [borderWidth] }],
			"border-w-l": [{ "border-l": [borderWidth] }],
			"border-opacity": [{ "border-opacity": [opacity] }],
			"border-style": [{ border: [...getLineStyles(), "hidden"] }],
			"divide-x": [{ "divide-x": [borderWidth] }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": [borderWidth] }],
			"divide-y-reverse": ["divide-y-reverse"],
			"divide-opacity": [{ "divide-opacity": [opacity] }],
			"divide-style": [{ divide: getLineStyles() }],
			"border-color": [{ border: [borderColor] }],
			"border-color-x": [{ "border-x": [borderColor] }],
			"border-color-y": [{ "border-y": [borderColor] }],
			"border-color-s": [{ "border-s": [borderColor] }],
			"border-color-e": [{ "border-e": [borderColor] }],
			"border-color-t": [{ "border-t": [borderColor] }],
			"border-color-r": [{ "border-r": [borderColor] }],
			"border-color-b": [{ "border-b": [borderColor] }],
			"border-color-l": [{ "border-l": [borderColor] }],
			"divide-color": [{ divide: [borderColor] }],
			"outline-style": [{ outline: ["", ...getLineStyles()] }],
			"outline-offset": [{ "outline-offset": [isLength, isArbitraryValue] }],
			"outline-w": [{ outline: [isLength, isArbitraryLength] }],
			"outline-color": [{ outline: [colors] }],
			"ring-w": [{ ring: getLengthWithEmptyAndArbitrary() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: [colors] }],
			"ring-opacity": [{ "ring-opacity": [opacity] }],
			"ring-offset-w": [{ "ring-offset": [isLength, isArbitraryLength] }],
			"ring-offset-color": [{ "ring-offset": [colors] }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				isTshirtSize,
				isArbitraryShadow
			] }],
			"shadow-color": [{ shadow: [isAny] }],
			opacity: [{ opacity: [opacity] }],
			"mix-blend": [{ "mix-blend": [
				...getBlendModes(),
				"plus-lighter",
				"plus-darker"
			] }],
			"bg-blend": [{ "bg-blend": getBlendModes() }],
			filter: [{ filter: ["", "none"] }],
			blur: [{ blur: [blur] }],
			brightness: [{ brightness: [brightness] }],
			contrast: [{ contrast: [contrast] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				isTshirtSize,
				isArbitraryValue
			] }],
			grayscale: [{ grayscale: [grayscale] }],
			"hue-rotate": [{ "hue-rotate": [hueRotate] }],
			invert: [{ invert: [invert] }],
			saturate: [{ saturate: [saturate] }],
			sepia: [{ sepia: [sepia] }],
			"backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
			"backdrop-blur": [{ "backdrop-blur": [blur] }],
			"backdrop-brightness": [{ "backdrop-brightness": [brightness] }],
			"backdrop-contrast": [{ "backdrop-contrast": [contrast] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [grayscale] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [hueRotate] }],
			"backdrop-invert": [{ "backdrop-invert": [invert] }],
			"backdrop-opacity": [{ "backdrop-opacity": [opacity] }],
			"backdrop-saturate": [{ "backdrop-saturate": [saturate] }],
			"backdrop-sepia": [{ "backdrop-sepia": [sepia] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": [borderSpacing] }],
			"border-spacing-x": [{ "border-spacing-x": [borderSpacing] }],
			"border-spacing-y": [{ "border-spacing-y": [borderSpacing] }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"none",
				"all",
				"",
				"colors",
				"opacity",
				"shadow",
				"transform",
				isArbitraryValue
			] }],
			duration: [{ duration: getNumberAndArbitrary() }],
			ease: [{ ease: [
				"linear",
				"in",
				"out",
				"in-out",
				isArbitraryValue
			] }],
			delay: [{ delay: getNumberAndArbitrary() }],
			animate: [{ animate: [
				"none",
				"spin",
				"ping",
				"pulse",
				"bounce",
				isArbitraryValue
			] }],
			transform: [{ transform: [
				"",
				"gpu",
				"none"
			] }],
			scale: [{ scale: [scale] }],
			"scale-x": [{ "scale-x": [scale] }],
			"scale-y": [{ "scale-y": [scale] }],
			rotate: [{ rotate: [isInteger, isArbitraryValue] }],
			"translate-x": [{ "translate-x": [translate] }],
			"translate-y": [{ "translate-y": [translate] }],
			"skew-x": [{ "skew-x": [skew] }],
			"skew-y": [{ "skew-y": [skew] }],
			"transform-origin": [{ origin: [
				"center",
				"top",
				"top-right",
				"right",
				"bottom-right",
				"bottom",
				"bottom-left",
				"left",
				"top-left",
				isArbitraryValue
			] }],
			accent: [{ accent: ["auto", colors] }],
			appearance: [{ appearance: ["none", "auto"] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryValue
			] }],
			"caret-color": [{ caret: [colors] }],
			"pointer-events": [{ "pointer-events": ["none", "auto"] }],
			resize: [{ resize: [
				"none",
				"y",
				"x",
				""
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scroll-m": [{ "scroll-m": getSpacingWithArbitrary() }],
			"scroll-mx": [{ "scroll-mx": getSpacingWithArbitrary() }],
			"scroll-my": [{ "scroll-my": getSpacingWithArbitrary() }],
			"scroll-ms": [{ "scroll-ms": getSpacingWithArbitrary() }],
			"scroll-me": [{ "scroll-me": getSpacingWithArbitrary() }],
			"scroll-mt": [{ "scroll-mt": getSpacingWithArbitrary() }],
			"scroll-mr": [{ "scroll-mr": getSpacingWithArbitrary() }],
			"scroll-mb": [{ "scroll-mb": getSpacingWithArbitrary() }],
			"scroll-ml": [{ "scroll-ml": getSpacingWithArbitrary() }],
			"scroll-p": [{ "scroll-p": getSpacingWithArbitrary() }],
			"scroll-px": [{ "scroll-px": getSpacingWithArbitrary() }],
			"scroll-py": [{ "scroll-py": getSpacingWithArbitrary() }],
			"scroll-ps": [{ "scroll-ps": getSpacingWithArbitrary() }],
			"scroll-pe": [{ "scroll-pe": getSpacingWithArbitrary() }],
			"scroll-pt": [{ "scroll-pt": getSpacingWithArbitrary() }],
			"scroll-pr": [{ "scroll-pr": getSpacingWithArbitrary() }],
			"scroll-pb": [{ "scroll-pb": getSpacingWithArbitrary() }],
			"scroll-pl": [{ "scroll-pl": getSpacingWithArbitrary() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryValue
			] }],
			fill: [{ fill: [colors, "none"] }],
			"stroke-w": [{ stroke: [
				isLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			stroke: [{ stroke: [colors, "none"] }],
			sr: ["sr-only", "not-sr-only"],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-s",
				"border-w-e",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-s",
				"border-color-e",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] }
	};
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
//#endregion
//#region ../../lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatDate(dateStr) {
	if (!dateStr) return "N/A";
	try {
		return new Date(dateStr).toLocaleDateString("ru-RU", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric"
		});
	} catch {
		return dateStr;
	}
}
//#endregion
//#region ../../components/sections/guides/GuideCard.tsx
function GuideCard({ guide, onClick }) {
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		className: "card section-card ds-section-panel p-4 sm:p-5 text-left hover:transform hover:-translate-y-1 transition-all duration-300",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-center justify-between gap-3 mb-3",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "ds-kicker",
					children: [/* @__PURE__ */ jsx(WuxiaIcon, {
						name: "tag",
						className: "inline-block w-4 h-4 mr-2 align-text-bottom"
					}), guide.category]
				}), /* @__PURE__ */ jsx("span", {
					className: "text-xs text-gray-400",
					children: formatDate(guide.updatedAt)
				})]
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "text-lg font-bold font-orbitron mb-3 text-[#e6eff5] leading-snug min-h-[3.1rem] sm:min-h-[3.5rem] tracking-[0.01em]",
				children: guide.title
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between gap-3 pt-3 border-t border-gray-700/50 text-sm text-gray-400",
				children: [/* @__PURE__ */ jsxs("span", {
					className: "inline-flex items-center gap-2 rounded-full bg-[#0f1720]/70 px-3 py-1 text-xs text-[#c5d9e5]",
					children: [/* @__PURE__ */ jsx(WuxiaIcon, {
						name: "user",
						className: "w-4 h-4"
					}), guide.author]
				}), /* @__PURE__ */ jsxs("span", {
					className: "inline-flex items-center gap-3 text-xs",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-[#0f1720]/70 px-2.5 py-1",
						children: [/* @__PURE__ */ jsx(WuxiaIcon, {
							name: "seal",
							className: "w-4 h-4 text-[#8fb9cc]"
						}), guide.votes]
					}), /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-[#0f1720]/70 px-2.5 py-1",
						children: [/* @__PURE__ */ jsx(WuxiaIcon, {
							name: "comment",
							className: "w-4 h-4"
						}), guide.commentsCount]
					})]
				})]
			})
		]
	});
}
//#endregion
//#region ../../components/shared/LoadingState.tsx
function LoadingState({ title, subtitle, icon = "spinner", skeletonCount, layout = "cards", cardCount = 3 }) {
	const { t } = useTranslation();
	const resolvedTitle = title ?? t.common.loading;
	const resolvedSubtitle = subtitle ?? t.common.loadingDetails;
	const count = skeletonCount ?? cardCount;
	const renderIcon = () => {
		if (typeof icon === "string") return /* @__PURE__ */ jsx(WuxiaIcon, {
			name: icon,
			className: "inline-block w-6 h-6 mr-3 text-red-400 align-text-bottom animate-spin"
		});
		return icon;
	};
	return /* @__PURE__ */ jsx("section", {
		className: "py-10 sm:py-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "loading-shell mb-8 sm:mb-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "loading-shell-header",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "loading-shell-kicker",
							children: "Silent Moonfall"
						}),
						/* @__PURE__ */ jsxs("h2", {
							className: "loading-shell-title",
							children: [/* @__PURE__ */ jsx("span", {
								className: "loading-shell-icon",
								children: renderIcon()
							}), /* @__PURE__ */ jsx("span", { children: resolvedTitle })]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "loading-shell-subtitle",
							children: resolvedSubtitle
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "loading-shell-chips",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ jsx("span", { className: "loading-chip" }),
						/* @__PURE__ */ jsx("span", { className: "loading-chip loading-chip-wide" }),
						/* @__PURE__ */ jsx("span", { className: "loading-chip" })
					]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: `loading-grid ${layout === "list" ? "loading-grid-list" : "loading-grid-cards"}`,
				children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxs("div", {
					className: "loading-card card p-5 sm:p-6",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "loading-card-top",
							children: [/* @__PURE__ */ jsx("span", { className: "loading-pill" }), /* @__PURE__ */ jsx("span", { className: "loading-line loading-line-short" })]
						}),
						/* @__PURE__ */ jsx("div", { className: "loading-line loading-line-title" }),
						/* @__PURE__ */ jsx("div", { className: "loading-line loading-line-body" }),
						/* @__PURE__ */ jsx("div", { className: "loading-line loading-line-body loading-line-body-short" }),
						/* @__PURE__ */ jsx("div", { className: "loading-block" }),
						/* @__PURE__ */ jsxs("div", {
							className: "loading-card-footer",
							children: [/* @__PURE__ */ jsx("span", { className: "loading-pill loading-pill-wide" }), /* @__PURE__ */ jsx("span", { className: "loading-pill" })]
						})
					]
				}, i))
			})]
		})
	});
}
//#endregion
//#region ../../components/shared/EmptyState.tsx
function EmptyState({ icon = "inbox", title, description, action, variant = "default" }) {
	const renderIcon = () => {
		if (typeof icon === "string") return /* @__PURE__ */ jsx(WuxiaIcon, {
			name: icon,
			className: "w-10 h-10 text-gray-500"
		});
		return icon;
	};
	const renderAction = () => {
		if (!action) return null;
		if (typeof action === "object" && action !== null && "label" in action && "onClick" in action) {
			const btn = action;
			return /* @__PURE__ */ jsx("button", {
				onClick: btn.onClick,
				className: "btn-primary",
				children: btn.label
			});
		}
		return action;
	};
	const badgeTone = variant === "error" ? "ui-badge ui-badge-danger" : "ui-badge ui-badge-muted";
	return /* @__PURE__ */ jsxs("div", {
		className: "card section-card px-6 py-10 sm:px-8 sm:py-12 text-center",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex justify-center mb-6",
				children: /* @__PURE__ */ jsx("div", {
					className: `w-20 h-20 rounded-full flex items-center justify-center ${variant === "error" ? "bg-red-900/30" : "bg-gray-800/50"}`,
					children: renderIcon()
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mb-3 flex justify-center",
				children: /* @__PURE__ */ jsx("span", {
					className: badgeTone,
					children: variant === "error" ? "Need attention" : "No data yet"
				})
			}),
			/* @__PURE__ */ jsx("h3", {
				className: `text-xl font-bold mb-2 ${variant === "error" ? "text-red-300" : "text-[#d9e9f2]"}`,
				children: title
			}),
			description && /* @__PURE__ */ jsx("p", {
				className: "text-[#9fb5c3] max-w-md mx-auto mb-6 leading-7",
				children: description
			}),
			renderAction()
		]
	});
}
//#endregion
//#region ../../components/shared/SectionHero.tsx
function SectionHero({ icon, title, subtitle, eyebrow, chips, actions }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ jsxs("div", {
		className: "portal-hero mb-8",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "portal-hero-main",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "portal-hero-eyebrow",
					children: eyebrow ?? t.common.portalEyebrow
				}),
				/* @__PURE__ */ jsxs("h2", {
					className: "portal-hero-title",
					children: [icon ? /* @__PURE__ */ jsx("span", {
						className: "portal-hero-icon",
						children: icon
					}) : null, /* @__PURE__ */ jsx("span", { children: title })]
				}),
				subtitle ? /* @__PURE__ */ jsx("p", {
					className: "portal-hero-subtitle",
					children: subtitle
				}) : null,
				chips && chips.length > 0 ? /* @__PURE__ */ jsx("div", {
					className: "portal-hero-chips",
					children: chips.map((chip) => /* @__PURE__ */ jsx("span", {
						className: "portal-hero-chip",
						children: chip
					}, chip))
				}) : null
			]
		}), actions ? /* @__PURE__ */ jsx("div", {
			className: "portal-hero-actions",
			children: actions
		}) : null]
	});
}
//#endregion
//#region ../../components/sections/guides/GuidesList.tsx
function GuidesList({ onGuideClick, onCreateClick }) {
	const { t } = useTranslation();
	const { data: guides = [], isLoading, error, refetch } = useGuides();
	const createGuide = useCreateGuide();
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedAuthor, setSelectedAuthor] = useState("all");
	const [search, setSearch] = useState("");
	const [notice, setNotice] = useState(null);
	const [isImporting, setIsImporting] = useState(false);
	const [isDragOver, setIsDragOver] = useState(false);
	const markdownInputRef = useRef(null);
	const markdownFolderInputRef = useRef(null);
	const processMarkdownFiles = async (files) => {
		if (files.length === 0) return;
		setIsImporting(true);
		setNotice(null);
		let imported = 0;
		let skipped = 0;
		let failed = 0;
		const markdownFiles = files.filter((file) => isMarkdownFile(file));
		if (markdownFiles.length === 0) {
			setIsImporting(false);
			setNotice("Markdown files not found. Pick .md notes or an exported Obsidian folder.");
			return;
		}
		skipped = Math.max(0, files.length - markdownFiles.length);
		for (const file of markdownFiles) try {
			const draft = await buildGuideDraftFromMarkdownFile(file, files);
			if (!draft.content) {
				skipped += 1;
				continue;
			}
			await createGuide.mutateAsync({
				title: draft.title,
				content: draft.content,
				category: draft.category,
				author: draft.author
			});
			imported += 1;
		} catch (err) {
			failed += 1;
			console.error("Failed to import markdown guide:", file.name, err);
		}
		await refetch();
		const parts = [];
		if (imported > 0) parts.push(`Импортировано: ${imported}`);
		if (skipped > 0) parts.push(`Пропущено: ${skipped}`);
		if (failed > 0) parts.push(`С ошибкой: ${failed}`);
		if (parts.length > 0) setNotice(parts.join(" · "));
		setIsImporting(false);
	};
	const handleMarkdownInput = async (event) => {
		await processMarkdownFiles(Array.from(event.target.files || []));
		if (markdownInputRef.current) markdownInputRef.current.value = "";
		if (markdownFolderInputRef.current) markdownFolderInputRef.current.value = "";
	};
	const handleDrop = async (event) => {
		event.preventDefault();
		setIsDragOver(false);
		await processMarkdownFiles(Array.from(event.dataTransfer.files || []));
	};
	const categories = useMemo(() => Array.from(new Set(guides.map((g) => g.category))), [guides]);
	const categoryStats = useMemo(() => categories.map((category) => ({
		category,
		count: guides.filter((guide) => guide.category === category).length
	})), [categories, guides]);
	const authorStats = useMemo(() => {
		const counts = /* @__PURE__ */ new Map();
		for (const guide of guides) counts.set(guide.author, (counts.get(guide.author) || 0) + 1);
		return [...counts.entries()].map(([author, count]) => ({
			author,
			count
		})).sort((left, right) => right.count - left.count || left.author.localeCompare(right.author, "ru")).slice(0, 8);
	}, [guides]);
	const filteredGuides = useMemo(() => {
		const normalizedSearch = search.trim().toLowerCase();
		return guides.filter((guide) => {
			const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory;
			const matchesAuthor = selectedAuthor === "all" || guide.author === selectedAuthor;
			const matchesSearch = !normalizedSearch || guide.title.toLowerCase().includes(normalizedSearch) || guide.author.toLowerCase().includes(normalizedSearch);
			return matchesCategory && matchesAuthor && matchesSearch;
		});
	}, [
		guides,
		search,
		selectedAuthor,
		selectedCategory
	]);
	if (isLoading) return /* @__PURE__ */ jsx(LoadingState, {
		title: t.guides.title,
		subtitle: t.guides.loading,
		icon: /* @__PURE__ */ jsx(WuxiaIcon, {
			name: "guides",
			className: "w-6 h-6 text-red-400"
		}),
		skeletonCount: 3,
		layout: "cards"
	});
	if (error) return /* @__PURE__ */ jsx(EmptyState, {
		icon: /* @__PURE__ */ jsx(WuxiaIcon, {
			name: "alertTriangle",
			className: "w-7 h-7 text-red-400"
		}),
		title: t.guides.error,
		description: error instanceof Error ? error.message : t.errors.server,
		action: /* @__PURE__ */ jsxs("button", {
			onClick: () => refetch(),
			className: "btn-primary",
			children: [/* @__PURE__ */ jsx(WuxiaIcon, {
				name: "redo",
				className: "inline-block w-5 h-5 mr-2 align-text-bottom"
			}), t.errors.tryAgain]
		}),
		variant: "error"
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "section-stack-lg",
		children: [
			/* @__PURE__ */ jsx(SectionHero, {
				icon: /* @__PURE__ */ jsx(WuxiaIcon, {
					name: "guides",
					className: "w-5 h-5"
				}),
				title: t.guides.title,
				subtitle: t.guides.subtitle,
				chips: [
					"Obsidian Import",
					"Milkdown Writing",
					"Comments"
				],
				actions: /* @__PURE__ */ jsxs(Fragment$1, { children: [
					/* @__PURE__ */ jsx("input", {
						value: search,
						onChange: (e) => setSearch(e.target.value),
						placeholder: t.guides.search,
						className: "input-field w-full min-w-0 sm:min-w-[220px]"
					}),
					/* @__PURE__ */ jsx("input", {
						ref: markdownInputRef,
						type: "file",
						accept: ".md,.markdown,text/markdown,text/plain,image/*,.webp,.avif,.gif,.svg,.pdf",
						multiple: true,
						onChange: handleMarkdownInput,
						className: "hidden"
					}),
					/* @__PURE__ */ jsx("input", {
						ref: markdownFolderInputRef,
						type: "file",
						onChange: handleMarkdownInput,
						className: "hidden",
						webkitdirectory: "true",
						directory: "true"
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "btn-secondary w-full sm:w-auto",
						onClick: () => markdownInputRef.current?.click(),
						disabled: isImporting,
						children: [/* @__PURE__ */ jsx(WuxiaIcon, {
							name: "upload",
							className: "inline-block w-4 h-4 mr-2 align-text-bottom"
						}), isImporting ? "Импорт..." : "Импорт .md"]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "btn-secondary w-full sm:w-auto",
						onClick: () => markdownFolderInputRef.current?.click(),
						disabled: isImporting,
						children: [/* @__PURE__ */ jsx(WuxiaIcon, {
							name: "guides",
							className: "inline-block w-4 h-4 mr-2 align-text-bottom"
						}), "Папка vault"]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "dc-icon-btn h-[46px] w-[46px] rounded-xl shrink-0",
						onClick: () => refetch(),
						title: "Обновить",
						children: /* @__PURE__ */ jsx(WuxiaIcon, {
							name: "refresh",
							className: "w-5 h-5"
						})
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "btn-primary w-full sm:w-auto px-5 py-3",
						onClick: onCreateClick,
						children: [/* @__PURE__ */ jsx(WuxiaIcon, {
							name: "edit",
							className: "inline-block w-5 h-5 mr-2 align-text-bottom"
						}), t.guides.create]
					})
				] })
			}),
			/* @__PURE__ */ jsx("div", {
				className: "portal-dropzone",
				"data-over": isDragOver ? "true" : "false",
				onDragOver: (event) => {
					event.preventDefault();
					setIsDragOver(true);
				},
				onDragLeave: () => setIsDragOver(false),
				onDrop: handleDrop,
				children: /* @__PURE__ */ jsxs("div", {
					className: "text-sm text-[#bdd5e4]",
					children: [/* @__PURE__ */ jsx(WuxiaIcon, {
						name: "upload",
						className: "inline-block w-4 h-4 mr-2 align-text-bottom"
					}), "Перетащи `.md` вместе с вложениями или выбери целую папку из Obsidian."]
				})
			}),
			notice && /* @__PURE__ */ jsxs("div", {
				className: "ds-notice",
				children: [/* @__PURE__ */ jsx(WuxiaIcon, {
					name: "checkCircle",
					className: "w-4 h-4 mr-2 inline-block align-text-bottom"
				}), notice]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "section-stack-md",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ jsxs("button", {
							type: "button",
							className: `ds-filter-chip ${selectedCategory === "all" ? "is-active" : ""}`,
							onClick: () => setSelectedCategory("all"),
							children: ["Все категории · ", guides.length]
						}), categoryStats.map(({ category, count }) => /* @__PURE__ */ jsxs("button", {
							type: "button",
							className: `ds-filter-chip ${selectedCategory === category ? "is-active" : ""}`,
							onClick: () => setSelectedCategory(category),
							children: [
								category,
								" · ",
								count
							]
						}, category))]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap gap-2 items-center",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							className: `ds-filter-chip ${selectedAuthor === "all" ? "is-active" : ""}`,
							onClick: () => setSelectedAuthor("all"),
							children: "Все авторы"
						}), authorStats.map(({ author, count }) => /* @__PURE__ */ jsxs("button", {
							type: "button",
							className: `ds-filter-chip ${selectedAuthor === author ? "is-active" : ""}`,
							onClick: () => setSelectedAuthor(author),
							children: [
								author,
								" · ",
								count
							]
						}, author))]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "text-sm text-[#b8ccd8] text-center sm:text-left",
						children: [
							"Показано: ",
							/* @__PURE__ */ jsx("span", {
								className: "text-gray-300 font-medium",
								children: filteredGuides.length
							}),
							" из ",
							/* @__PURE__ */ jsx("span", {
								className: "text-gray-300 font-medium",
								children: guides.length
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5",
				children: filteredGuides.length === 0 ? /* @__PURE__ */ jsx("div", {
					className: "col-span-full",
					children: /* @__PURE__ */ jsx(EmptyState, {
						icon: /* @__PURE__ */ jsx(WuxiaIcon, {
							name: "guides",
							className: "w-10 h-10 text-gray-500"
						}),
						title: "Ничего не найдено",
						description: "Измени фильтр или напиши новый гайд."
					})
				}) : filteredGuides.map((guide) => /* @__PURE__ */ jsx(GuideCard, {
					guide,
					onClick: () => onGuideClick(guide.id)
				}, guide.id))
			})
		]
	});
}
//#endregion
//#region ../../node_modules/comma-separated-tokens/index.js
/**
* Serialize an array of strings or numbers to comma-separated tokens.
*
* @param {Array<string|number>} values
*   List of tokens.
* @param {Options} [options]
*   Configuration for `stringify` (optional).
* @returns {string}
*   Comma-separated tokens.
*/
function stringify$1(values, options) {
	const settings = options || {};
	return (values[values.length - 1] === "" ? [...values, ""] : values).join((settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")).trim();
}
//#endregion
//#region ../../node_modules/estree-util-is-identifier-name/lib/index.js
var nameRe = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
var nameReJsx = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u;
/** @type {Options} */
var emptyOptions$1 = {};
/**
* Checks if the given value is a valid identifier name.
*
* @param {string} name
*   Identifier to check.
* @param {Options | null | undefined} [options]
*   Configuration (optional).
* @returns {boolean}
*   Whether `name` can be an identifier.
*/
function name$2(name, options) {
	return ((options || emptyOptions$1).jsx ? nameReJsx : nameRe).test(name);
}
//#endregion
//#region ../../node_modules/hast-util-whitespace/lib/index.js
/**
* @typedef {import('hast').Nodes} Nodes
*/
var re = /[ \t\n\f\r]/g;
/**
* Check if the given value is *inter-element whitespace*.
*
* @param {Nodes | string} thing
*   Thing to check (`Node` or `string`).
* @returns {boolean}
*   Whether the `value` is inter-element whitespace (`boolean`): consisting of
*   zero or more of space, tab (`\t`), line feed (`\n`), carriage return
*   (`\r`), or form feed (`\f`); if a node is passed it must be a `Text` node,
*   whose `value` field is checked.
*/
function whitespace(thing) {
	return typeof thing === "object" ? thing.type === "text" ? empty(thing.value) : false : empty(thing);
}
/**
* @param {string} value
* @returns {boolean}
*/
function empty(value) {
	return value.replace(re, "") === "";
}
//#endregion
//#region ../../node_modules/property-information/lib/util/schema.js
/**
* @import {Schema as SchemaType, Space} from 'property-information'
*/
/** @type {SchemaType} */
var Schema = class {
	/**
	* @param {SchemaType['property']} property
	*   Property.
	* @param {SchemaType['normal']} normal
	*   Normal.
	* @param {Space | undefined} [space]
	*   Space.
	* @returns
	*   Schema.
	*/
	constructor(property, normal, space) {
		this.normal = normal;
		this.property = property;
		if (space) this.space = space;
	}
};
Schema.prototype.normal = {};
Schema.prototype.property = {};
Schema.prototype.space = void 0;
//#endregion
//#region ../../node_modules/property-information/lib/util/merge.js
/**
* @import {Info, Space} from 'property-information'
*/
/**
* @param {ReadonlyArray<Schema>} definitions
*   Definitions.
* @param {Space | undefined} [space]
*   Space.
* @returns {Schema}
*   Schema.
*/
function merge(definitions, space) {
	/** @type {Record<string, Info>} */
	const property = {};
	/** @type {Record<string, string>} */
	const normal = {};
	for (const definition of definitions) {
		Object.assign(property, definition.property);
		Object.assign(normal, definition.normal);
	}
	return new Schema(property, normal, space);
}
//#endregion
//#region ../../node_modules/property-information/lib/normalize.js
/**
* Get the cleaned case insensitive form of an attribute or property.
*
* @param {string} value
*   An attribute-like or property-like name.
* @returns {string}
*   Value that can be used to look up the properly cased property on a
*   `Schema`.
*/
function normalize(value) {
	return value.toLowerCase();
}
//#endregion
//#region ../../node_modules/property-information/lib/util/info.js
/**
* @import {Info as InfoType} from 'property-information'
*/
/** @type {InfoType} */
var Info = class {
	/**
	* @param {string} property
	*   Property.
	* @param {string} attribute
	*   Attribute.
	* @returns
	*   Info.
	*/
	constructor(property, attribute) {
		this.attribute = attribute;
		this.property = property;
	}
};
Info.prototype.attribute = "";
Info.prototype.booleanish = false;
Info.prototype.boolean = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.commaSeparated = false;
Info.prototype.defined = false;
Info.prototype.mustUseProperty = false;
Info.prototype.number = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.property = "";
Info.prototype.spaceSeparated = false;
Info.prototype.space = void 0;
//#endregion
//#region ../../node_modules/property-information/lib/util/types.js
var types_exports = /* @__PURE__ */ __exportAll({
	boolean: () => boolean,
	booleanish: () => booleanish,
	commaOrSpaceSeparated: () => commaOrSpaceSeparated,
	commaSeparated: () => commaSeparated,
	number: () => number,
	overloadedBoolean: () => overloadedBoolean,
	spaceSeparated: () => spaceSeparated
});
var powers = 0;
var boolean = increment();
var booleanish = increment();
var overloadedBoolean = increment();
var number = increment();
var spaceSeparated = increment();
var commaSeparated = increment();
var commaOrSpaceSeparated = increment();
function increment() {
	return 2 ** ++powers;
}
//#endregion
//#region ../../node_modules/property-information/lib/util/defined-info.js
/**
* @import {Space} from 'property-information'
*/
var checks = Object.keys(types_exports);
var DefinedInfo = class extends Info {
	/**
	* @constructor
	* @param {string} property
	*   Property.
	* @param {string} attribute
	*   Attribute.
	* @param {number | null | undefined} [mask]
	*   Mask.
	* @param {Space | undefined} [space]
	*   Space.
	* @returns
	*   Info.
	*/
	constructor(property, attribute, mask, space) {
		let index = -1;
		super(property, attribute);
		mark(this, "space", space);
		if (typeof mask === "number") while (++index < checks.length) {
			const check = checks[index];
			mark(this, checks[index], (mask & types_exports[check]) === types_exports[check]);
		}
	}
};
DefinedInfo.prototype.defined = true;
/**
* @template {keyof DefinedInfo} Key
*   Key type.
* @param {DefinedInfo} values
*   Info.
* @param {Key} key
*   Key.
* @param {DefinedInfo[Key]} value
*   Value.
* @returns {undefined}
*   Nothing.
*/
function mark(values, key, value) {
	if (value) values[key] = value;
}
//#endregion
//#region ../../node_modules/property-information/lib/util/create.js
/**
* @import {Info, Space} from 'property-information'
*/
/**
* @typedef Definition
*   Definition of a schema.
* @property {Record<string, string> | undefined} [attributes]
*   Normalzed names to special attribute case.
* @property {ReadonlyArray<string> | undefined} [mustUseProperty]
*   Normalized names that must be set as properties.
* @property {Record<string, number | null>} properties
*   Property names to their types.
* @property {Space | undefined} [space]
*   Space.
* @property {Transform} transform
*   Transform a property name.
*/
/**
* @callback Transform
*   Transform.
* @param {Record<string, string>} attributes
*   Attributes.
* @param {string} property
*   Property.
* @returns {string}
*   Attribute.
*/
/**
* @param {Definition} definition
*   Definition.
* @returns {Schema}
*   Schema.
*/
function create(definition) {
	/** @type {Record<string, Info>} */
	const properties = {};
	/** @type {Record<string, string>} */
	const normals = {};
	for (const [property, value] of Object.entries(definition.properties)) {
		const info = new DefinedInfo(property, definition.transform(definition.attributes || {}, property), value, definition.space);
		if (definition.mustUseProperty && definition.mustUseProperty.includes(property)) info.mustUseProperty = true;
		properties[property] = info;
		normals[normalize(property)] = property;
		normals[normalize(info.attribute)] = property;
	}
	return new Schema(properties, normals, definition.space);
}
//#endregion
//#region ../../node_modules/property-information/lib/aria.js
var aria = create({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: booleanish,
		ariaAutoComplete: null,
		ariaBusy: booleanish,
		ariaChecked: booleanish,
		ariaColCount: number,
		ariaColIndex: number,
		ariaColSpan: number,
		ariaControls: spaceSeparated,
		ariaCurrent: null,
		ariaDescribedBy: spaceSeparated,
		ariaDetails: null,
		ariaDisabled: booleanish,
		ariaDropEffect: spaceSeparated,
		ariaErrorMessage: null,
		ariaExpanded: booleanish,
		ariaFlowTo: spaceSeparated,
		ariaGrabbed: booleanish,
		ariaHasPopup: null,
		ariaHidden: booleanish,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: spaceSeparated,
		ariaLevel: number,
		ariaLive: null,
		ariaModal: booleanish,
		ariaMultiLine: booleanish,
		ariaMultiSelectable: booleanish,
		ariaOrientation: null,
		ariaOwns: spaceSeparated,
		ariaPlaceholder: null,
		ariaPosInSet: number,
		ariaPressed: booleanish,
		ariaReadOnly: booleanish,
		ariaRelevant: null,
		ariaRequired: booleanish,
		ariaRoleDescription: spaceSeparated,
		ariaRowCount: number,
		ariaRowIndex: number,
		ariaRowSpan: number,
		ariaSelected: booleanish,
		ariaSetSize: number,
		ariaSort: null,
		ariaValueMax: number,
		ariaValueMin: number,
		ariaValueNow: number,
		ariaValueText: null,
		role: null
	},
	transform(_, property) {
		return property === "role" ? property : "aria-" + property.slice(4).toLowerCase();
	}
});
//#endregion
//#region ../../node_modules/property-information/lib/util/case-sensitive-transform.js
/**
* @param {Record<string, string>} attributes
*   Attributes.
* @param {string} attribute
*   Attribute.
* @returns {string}
*   Transformed attribute.
*/
function caseSensitiveTransform(attributes, attribute) {
	return attribute in attributes ? attributes[attribute] : attribute;
}
//#endregion
//#region ../../node_modules/property-information/lib/util/case-insensitive-transform.js
/**
* @param {Record<string, string>} attributes
*   Attributes.
* @param {string} property
*   Property.
* @returns {string}
*   Transformed property.
*/
function caseInsensitiveTransform(attributes, property) {
	return caseSensitiveTransform(attributes, property.toLowerCase());
}
//#endregion
//#region ../../node_modules/property-information/lib/html.js
var html$2 = create({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: commaSeparated,
		acceptCharset: spaceSeparated,
		accessKey: spaceSeparated,
		action: null,
		allow: null,
		allowFullScreen: boolean,
		allowPaymentRequest: boolean,
		allowUserMedia: boolean,
		alt: null,
		as: null,
		async: boolean,
		autoCapitalize: null,
		autoComplete: spaceSeparated,
		autoFocus: boolean,
		autoPlay: boolean,
		blocking: spaceSeparated,
		capture: null,
		charSet: null,
		checked: boolean,
		cite: null,
		className: spaceSeparated,
		cols: number,
		colSpan: null,
		content: null,
		contentEditable: booleanish,
		controls: boolean,
		controlsList: spaceSeparated,
		coords: number | commaSeparated,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: boolean,
		defer: boolean,
		dir: null,
		dirName: null,
		disabled: boolean,
		download: overloadedBoolean,
		draggable: booleanish,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: boolean,
		formTarget: null,
		headers: spaceSeparated,
		height: number,
		hidden: overloadedBoolean,
		high: number,
		href: null,
		hrefLang: null,
		htmlFor: spaceSeparated,
		httpEquiv: spaceSeparated,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: boolean,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: boolean,
		itemId: null,
		itemProp: spaceSeparated,
		itemRef: spaceSeparated,
		itemScope: boolean,
		itemType: spaceSeparated,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: boolean,
		low: number,
		manifest: null,
		max: null,
		maxLength: number,
		media: null,
		method: null,
		min: null,
		minLength: number,
		multiple: boolean,
		muted: boolean,
		name: null,
		nonce: null,
		noModule: boolean,
		noValidate: boolean,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: boolean,
		optimum: number,
		pattern: null,
		ping: spaceSeparated,
		placeholder: null,
		playsInline: boolean,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: boolean,
		referrerPolicy: null,
		rel: spaceSeparated,
		required: boolean,
		reversed: boolean,
		rows: number,
		rowSpan: number,
		sandbox: spaceSeparated,
		scope: null,
		scoped: boolean,
		seamless: boolean,
		selected: boolean,
		shadowRootClonable: boolean,
		shadowRootDelegatesFocus: boolean,
		shadowRootMode: null,
		shape: null,
		size: number,
		sizes: null,
		slot: null,
		span: number,
		spellCheck: booleanish,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: number,
		step: null,
		style: null,
		tabIndex: number,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: boolean,
		useMap: null,
		value: booleanish,
		width: number,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: spaceSeparated,
		axis: null,
		background: null,
		bgColor: null,
		border: number,
		borderColor: null,
		bottomMargin: number,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: boolean,
		declare: boolean,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: number,
		leftMargin: number,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: number,
		marginWidth: number,
		noResize: boolean,
		noHref: boolean,
		noShade: boolean,
		noWrap: boolean,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: number,
		rules: null,
		scheme: null,
		scrolling: booleanish,
		standby: null,
		summary: null,
		text: null,
		topMargin: number,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: number,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		disablePictureInPicture: boolean,
		disableRemotePlayback: boolean,
		prefix: null,
		property: null,
		results: number,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: caseInsensitiveTransform
});
//#endregion
//#region ../../node_modules/property-information/lib/svg.js
var svg$1 = create({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: commaOrSpaceSeparated,
		accentHeight: number,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: number,
		amplitude: number,
		arabicForm: null,
		ascent: number,
		attributeName: null,
		attributeType: null,
		azimuth: number,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: number,
		by: null,
		calcMode: null,
		capHeight: number,
		className: spaceSeparated,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: number,
		diffuseConstant: number,
		direction: null,
		display: null,
		dur: null,
		divisor: number,
		dominantBaseline: null,
		download: boolean,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: number,
		enableBackground: null,
		end: null,
		event: null,
		exponent: number,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: number,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: commaSeparated,
		g2: commaSeparated,
		glyphName: commaSeparated,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: number,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: number,
		horizOriginX: number,
		horizOriginY: number,
		id: null,
		ideographic: number,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: number,
		k: number,
		k1: number,
		k2: number,
		k3: number,
		k4: number,
		kernelMatrix: commaOrSpaceSeparated,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: number,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: number,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: number,
		overlineThickness: number,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: number,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: spaceSeparated,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: number,
		pointsAtY: number,
		pointsAtZ: number,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: commaOrSpaceSeparated,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: commaOrSpaceSeparated,
		rev: commaOrSpaceSeparated,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: commaOrSpaceSeparated,
		requiredFeatures: commaOrSpaceSeparated,
		requiredFonts: commaOrSpaceSeparated,
		requiredFormats: commaOrSpaceSeparated,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: number,
		specularExponent: number,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: number,
		strikethroughThickness: number,
		string: null,
		stroke: null,
		strokeDashArray: commaOrSpaceSeparated,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: number,
		strokeOpacity: number,
		strokeWidth: null,
		style: null,
		surfaceScale: number,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: commaOrSpaceSeparated,
		tabIndex: number,
		tableValues: null,
		target: null,
		targetX: number,
		targetY: number,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: commaOrSpaceSeparated,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: number,
		underlineThickness: number,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: number,
		values: null,
		vAlphabetic: number,
		vMathematical: number,
		vectorEffect: null,
		vHanging: number,
		vIdeographic: number,
		version: null,
		vertAdvY: number,
		vertOriginX: number,
		vertOriginY: number,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: number,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: caseSensitiveTransform
});
//#endregion
//#region ../../node_modules/property-information/lib/xlink.js
var xlink = create({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(_, property) {
		return "xlink:" + property.slice(5).toLowerCase();
	}
});
//#endregion
//#region ../../node_modules/property-information/lib/xmlns.js
var xmlns = create({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: caseInsensitiveTransform
});
//#endregion
//#region ../../node_modules/property-information/lib/xml.js
var xml = create({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(_, property) {
		return "xml:" + property.slice(3).toLowerCase();
	}
});
//#endregion
//#region ../../node_modules/property-information/lib/hast-to-react.js
/**
* Special cases for React (`Record<string, string>`).
*
* `hast` is close to `React` but differs in a couple of cases.
* To get a React property from a hast property,
* check if it is in `hastToReact`.
* If it is, use the corresponding value;
* otherwise, use the hast property.
*
* @type {Record<string, string>}
*/
var hastToReact = {
	classId: "classID",
	dataType: "datatype",
	itemId: "itemID",
	strokeDashArray: "strokeDasharray",
	strokeDashOffset: "strokeDashoffset",
	strokeLineCap: "strokeLinecap",
	strokeLineJoin: "strokeLinejoin",
	strokeMiterLimit: "strokeMiterlimit",
	typeOf: "typeof",
	xLinkActuate: "xlinkActuate",
	xLinkArcRole: "xlinkArcrole",
	xLinkHref: "xlinkHref",
	xLinkRole: "xlinkRole",
	xLinkShow: "xlinkShow",
	xLinkTitle: "xlinkTitle",
	xLinkType: "xlinkType",
	xmlnsXLink: "xmlnsXlink"
};
//#endregion
//#region ../../node_modules/property-information/lib/find.js
/**
* @import {Schema} from 'property-information'
*/
var cap$1 = /[A-Z]/g;
var dash = /-[a-z]/g;
var valid = /^data[-\w.:]+$/i;
/**
* Look up info on a property.
*
* In most cases the given `schema` contains info on the property.
* All standard,
* most legacy,
* and some non-standard properties are supported.
* For these cases,
* the returned `Info` has hints about the value of the property.
*
* `name` can also be a valid data attribute or property,
* in which case an `Info` object with the correctly cased `attribute` and
* `property` is returned.
*
* `name` can be an unknown attribute,
* in which case an `Info` object with `attribute` and `property` set to the
* given name is returned.
* It is not recommended to provide unsupported legacy or recently specced
* properties.
*
*
* @param {Schema} schema
*   Schema;
*   either the `html` or `svg` export.
* @param {string} value
*   An attribute-like or property-like name;
*   it will be passed through `normalize` to hopefully find the correct info.
* @returns {Info}
*   Info.
*/
function find(schema, value) {
	const normal = normalize(value);
	let property = value;
	let Type = Info;
	if (normal in schema.normal) return schema.property[schema.normal[normal]];
	if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
		if (value.charAt(4) === "-") {
			const rest = value.slice(5).replace(dash, camelcase);
			property = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
		} else {
			const rest = value.slice(4);
			if (!dash.test(rest)) {
				let dashes = rest.replace(cap$1, kebab);
				if (dashes.charAt(0) !== "-") dashes = "-" + dashes;
				value = "data" + dashes;
			}
		}
		Type = DefinedInfo;
	}
	return new Type(property, value);
}
/**
* @param {string} $0
*   Value.
* @returns {string}
*   Kebab.
*/
function kebab($0) {
	return "-" + $0.toLowerCase();
}
/**
* @param {string} $0
*   Value.
* @returns {string}
*   Camel.
*/
function camelcase($0) {
	return $0.charAt(1).toUpperCase();
}
//#endregion
//#region ../../node_modules/property-information/index.js
var html$1 = merge([
	aria,
	html$2,
	xlink,
	xmlns,
	xml
], "html");
var svg = merge([
	aria,
	svg$1,
	xlink,
	xmlns,
	xml
], "svg");
//#endregion
//#region ../../node_modules/space-separated-tokens/index.js
/**
* Serialize an array of strings as space separated-tokens.
*
* @param {Array<string|number>} values
*   List of tokens.
* @returns {string}
*   Space-separated tokens.
*/
function stringify(values) {
	return values.join(" ").trim();
}
//#endregion
//#region ../../node_modules/inline-style-parser/cjs/index.js
var require_cjs$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
	var NEWLINE_REGEX = /\n/g;
	var WHITESPACE_REGEX = /^\s*/;
	var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
	var COLON_REGEX = /^:\s*/;
	var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
	var SEMICOLON_REGEX = /^[;\s]*/;
	var TRIM_REGEX = /^\s+|\s+$/g;
	var NEWLINE = "\n";
	var FORWARD_SLASH = "/";
	var ASTERISK = "*";
	var EMPTY_STRING = "";
	var TYPE_COMMENT = "comment";
	var TYPE_DECLARATION = "declaration";
	/**
	* @param {String} style
	* @param {Object} [options]
	* @return {Object[]}
	* @throws {TypeError}
	* @throws {Error}
	*/
	function index(style, options) {
		if (typeof style !== "string") throw new TypeError("First argument must be a string");
		if (!style) return [];
		options = options || {};
		/**
		* Positional.
		*/
		var lineno = 1;
		var column = 1;
		/**
		* Update lineno and column based on `str`.
		*
		* @param {String} str
		*/
		function updatePosition(str) {
			var lines = str.match(NEWLINE_REGEX);
			if (lines) lineno += lines.length;
			var i = str.lastIndexOf(NEWLINE);
			column = ~i ? str.length - i : column + str.length;
		}
		/**
		* Mark position and patch `node.position`.
		*
		* @return {Function}
		*/
		function position() {
			var start = {
				line: lineno,
				column
			};
			return function(node) {
				node.position = new Position(start);
				whitespace();
				return node;
			};
		}
		/**
		* Store position information for a node.
		*
		* @constructor
		* @property {Object} start
		* @property {Object} end
		* @property {undefined|String} source
		*/
		function Position(start) {
			this.start = start;
			this.end = {
				line: lineno,
				column
			};
			this.source = options.source;
		}
		/**
		* Non-enumerable source string.
		*/
		Position.prototype.content = style;
		/**
		* Error `msg`.
		*
		* @param {String} msg
		* @throws {Error}
		*/
		function error(msg) {
			var err = /* @__PURE__ */ new Error(options.source + ":" + lineno + ":" + column + ": " + msg);
			err.reason = msg;
			err.filename = options.source;
			err.line = lineno;
			err.column = column;
			err.source = style;
			if (options.silent);
			else throw err;
		}
		/**
		* Match `re` and return captures.
		*
		* @param {RegExp} re
		* @return {undefined|Array}
		*/
		function match(re) {
			var m = re.exec(style);
			if (!m) return;
			var str = m[0];
			updatePosition(str);
			style = style.slice(str.length);
			return m;
		}
		/**
		* Parse whitespace.
		*/
		function whitespace() {
			match(WHITESPACE_REGEX);
		}
		/**
		* Parse comments.
		*
		* @param {Object[]} [rules]
		* @return {Object[]}
		*/
		function comments(rules) {
			var c;
			rules = rules || [];
			while (c = comment()) if (c !== false) rules.push(c);
			return rules;
		}
		/**
		* Parse comment.
		*
		* @return {Object}
		* @throws {Error}
		*/
		function comment() {
			var pos = position();
			if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
			var i = 2;
			while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) ++i;
			i += 2;
			if (EMPTY_STRING === style.charAt(i - 1)) return error("End of comment missing");
			var str = style.slice(2, i - 2);
			column += 2;
			updatePosition(str);
			style = style.slice(i);
			column += 2;
			return pos({
				type: TYPE_COMMENT,
				comment: str
			});
		}
		/**
		* Parse declaration.
		*
		* @return {Object}
		* @throws {Error}
		*/
		function declaration() {
			var pos = position();
			var prop = match(PROPERTY_REGEX);
			if (!prop) return;
			comment();
			if (!match(COLON_REGEX)) return error("property missing ':'");
			var val = match(VALUE_REGEX);
			var ret = pos({
				type: TYPE_DECLARATION,
				property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
				value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
			});
			match(SEMICOLON_REGEX);
			return ret;
		}
		/**
		* Parse declarations.
		*
		* @return {Object[]}
		*/
		function declarations() {
			var decls = [];
			comments(decls);
			var decl;
			while (decl = declaration()) if (decl !== false) {
				decls.push(decl);
				comments(decls);
			}
			return decls;
		}
		whitespace();
		return declarations();
	}
	/**
	* Trim `str`.
	*
	* @param {String} str
	* @return {String}
	*/
	function trim(str) {
		return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
	}
	module.exports = index;
}));
//#endregion
//#region ../../node_modules/style-to-object/cjs/index.js
var require_cjs$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StyleToObject;
	var inline_style_parser_1 = __importDefault(require_cjs$2());
	/**
	* Parses inline style to object.
	*
	* @param style - Inline style.
	* @param iterator - Iterator.
	* @returns - Style object or null.
	*
	* @example Parsing inline style to object:
	*
	* ```js
	* import parse from 'style-to-object';
	* parse('line-height: 42;'); // { 'line-height': '42' }
	* ```
	*/
	function StyleToObject(style, iterator) {
		let styleObject = null;
		if (!style || typeof style !== "string") return styleObject;
		const declarations = (0, inline_style_parser_1.default)(style);
		const hasIterator = typeof iterator === "function";
		declarations.forEach((declaration) => {
			if (declaration.type !== "declaration") return;
			const { property, value } = declaration;
			if (hasIterator) iterator(property, value, declaration);
			else if (value) {
				styleObject = styleObject || {};
				styleObject[property] = value;
			}
		});
		return styleObject;
	}
}));
//#endregion
//#region ../../node_modules/style-to-js/cjs/utilities.js
var require_utilities = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.camelCase = void 0;
	var CUSTOM_PROPERTY_REGEX = /^--[a-zA-Z0-9_-]+$/;
	var HYPHEN_REGEX = /-([a-z])/g;
	var NO_HYPHEN_REGEX = /^[^-]+$/;
	var VENDOR_PREFIX_REGEX = /^-(webkit|moz|ms|o|khtml)-/;
	var MS_VENDOR_PREFIX_REGEX = /^-(ms)-/;
	/**
	* Checks whether to skip camelCase.
	*/
	var skipCamelCase = function(property) {
		return !property || NO_HYPHEN_REGEX.test(property) || CUSTOM_PROPERTY_REGEX.test(property);
	};
	/**
	* Replacer that capitalizes first character.
	*/
	var capitalize = function(match, character) {
		return character.toUpperCase();
	};
	/**
	* Replacer that removes beginning hyphen of vendor prefix property.
	*/
	var trimHyphen = function(match, prefix) {
		return "".concat(prefix, "-");
	};
	/**
	* CamelCases a CSS property.
	*/
	var camelCase = function(property, options) {
		if (options === void 0) options = {};
		if (skipCamelCase(property)) return property;
		property = property.toLowerCase();
		if (options.reactCompat) property = property.replace(MS_VENDOR_PREFIX_REGEX, trimHyphen);
		else property = property.replace(VENDOR_PREFIX_REGEX, trimHyphen);
		return property.replace(HYPHEN_REGEX, capitalize);
	};
	exports.camelCase = camelCase;
}));
//#endregion
//#region ../../node_modules/style-to-js/cjs/index.js
var require_cjs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var style_to_object_1 = (exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	})(require_cjs$1());
	var utilities_1 = require_utilities();
	/**
	* Parses CSS inline style to JavaScript object (camelCased).
	*/
	function StyleToJS(style, options) {
		var output = {};
		if (!style || typeof style !== "string") return output;
		(0, style_to_object_1.default)(style, function(property, value) {
			if (property && value) output[(0, utilities_1.camelCase)(property, options)] = value;
		});
		return output;
	}
	StyleToJS.default = StyleToJS;
	module.exports = StyleToJS;
}));
//#endregion
//#region ../../node_modules/unist-util-position/lib/index.js
/**
* @typedef {import('unist').Node} Node
* @typedef {import('unist').Point} Point
* @typedef {import('unist').Position} Position
*/
/**
* @typedef NodeLike
* @property {string} type
* @property {PositionLike | null | undefined} [position]
*
* @typedef PositionLike
* @property {PointLike | null | undefined} [start]
* @property {PointLike | null | undefined} [end]
*
* @typedef PointLike
* @property {number | null | undefined} [line]
* @property {number | null | undefined} [column]
* @property {number | null | undefined} [offset]
*/
/**
* Get the ending point of `node`.
*
* @param node
*   Node.
* @returns
*   Point.
*/
var pointEnd = point("end");
/**
* Get the starting point of `node`.
*
* @param node
*   Node.
* @returns
*   Point.
*/
var pointStart = point("start");
/**
* Get the positional info of `node`.
*
* @param {'end' | 'start'} type
*   Side.
* @returns
*   Getter.
*/
function point(type) {
	return point;
	/**
	* Get the point info of `node` at a bound side.
	*
	* @param {Node | NodeLike | null | undefined} [node]
	* @returns {Point | undefined}
	*/
	function point(node) {
		const point = node && node.position && node.position[type] || {};
		if (typeof point.line === "number" && point.line > 0 && typeof point.column === "number" && point.column > 0) return {
			line: point.line,
			column: point.column,
			offset: typeof point.offset === "number" && point.offset > -1 ? point.offset : void 0
		};
	}
}
/**
* Get the positional info of `node`.
*
* @param {Node | NodeLike | null | undefined} [node]
*   Node.
* @returns {Position | undefined}
*   Position.
*/
function position(node) {
	const start = pointStart(node);
	const end = pointEnd(node);
	if (start && end) return {
		start,
		end
	};
}
//#endregion
//#region ../../node_modules/hast-util-to-jsx-runtime/lib/index.js
/**
* @import {Identifier, Literal, MemberExpression} from 'estree'
* @import {Jsx, JsxDev, Options, Props} from 'hast-util-to-jsx-runtime'
* @import {Element, Nodes, Parents, Root, Text} from 'hast'
* @import {MdxFlowExpressionHast, MdxTextExpressionHast} from 'mdast-util-mdx-expression'
* @import {MdxJsxFlowElementHast, MdxJsxTextElementHast} from 'mdast-util-mdx-jsx'
* @import {MdxjsEsmHast} from 'mdast-util-mdxjs-esm'
* @import {Position} from 'unist'
* @import {Child, Create, Field, JsxElement, State, Style} from './types.js'
*/
var import_cjs = /* @__PURE__ */ __toESM(require_cjs(), 1);
var own$1 = {}.hasOwnProperty;
/** @type {Map<string, number>} */
var emptyMap = /* @__PURE__ */ new Map();
var cap = /[A-Z]/g;
var tableElements = new Set([
	"table",
	"tbody",
	"thead",
	"tfoot",
	"tr"
]);
var tableCellElement = new Set(["td", "th"]);
var docs = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
/**
* Transform a hast tree to preact, react, solid, svelte, vue, etc.,
* with an automatic JSX runtime.
*
* @param {Nodes} tree
*   Tree to transform.
* @param {Options} options
*   Configuration (required).
* @returns {JsxElement}
*   JSX element.
*/
function toJsxRuntime(tree, options) {
	if (!options || options.Fragment === void 0) throw new TypeError("Expected `Fragment` in options");
	const filePath = options.filePath || void 0;
	/** @type {Create} */
	let create;
	if (options.development) {
		if (typeof options.jsxDEV !== "function") throw new TypeError("Expected `jsxDEV` in options when `development: true`");
		create = developmentCreate(filePath, options.jsxDEV);
	} else {
		if (typeof options.jsx !== "function") throw new TypeError("Expected `jsx` in production options");
		if (typeof options.jsxs !== "function") throw new TypeError("Expected `jsxs` in production options");
		create = productionCreate(filePath, options.jsx, options.jsxs);
	}
	/** @type {State} */
	const state = {
		Fragment: options.Fragment,
		ancestors: [],
		components: options.components || {},
		create,
		elementAttributeNameCase: options.elementAttributeNameCase || "react",
		evaluater: options.createEvaluater ? options.createEvaluater() : void 0,
		filePath,
		ignoreInvalidStyle: options.ignoreInvalidStyle || false,
		passKeys: options.passKeys !== false,
		passNode: options.passNode || false,
		schema: options.space === "svg" ? svg : html$1,
		stylePropertyNameCase: options.stylePropertyNameCase || "dom",
		tableCellAlignToStyle: options.tableCellAlignToStyle !== false
	};
	const result = one(state, tree, void 0);
	if (result && typeof result !== "string") return result;
	return state.create(tree, state.Fragment, { children: result || void 0 }, void 0);
}
/**
* Transform a node.
*
* @param {State} state
*   Info passed around.
* @param {Nodes} node
*   Current node.
* @param {string | undefined} key
*   Key.
* @returns {Child | undefined}
*   Child, optional.
*/
function one(state, node, key) {
	if (node.type === "element") return element(state, node, key);
	if (node.type === "mdxFlowExpression" || node.type === "mdxTextExpression") return mdxExpression(state, node);
	if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") return mdxJsxElement(state, node, key);
	if (node.type === "mdxjsEsm") return mdxEsm(state, node);
	if (node.type === "root") return root$1(state, node, key);
	if (node.type === "text") return text$1(state, node);
}
/**
* Handle element.
*
* @param {State} state
*   Info passed around.
* @param {Element} node
*   Current node.
* @param {string | undefined} key
*   Key.
* @returns {Child | undefined}
*   Child, optional.
*/
function element(state, node, key) {
	const parentSchema = state.schema;
	let schema = parentSchema;
	if (node.tagName.toLowerCase() === "svg" && parentSchema.space === "html") {
		schema = svg;
		state.schema = schema;
	}
	state.ancestors.push(node);
	const type = findComponentFromName(state, node.tagName, false);
	const props = createElementProps(state, node);
	let children = createChildren(state, node);
	if (tableElements.has(node.tagName)) children = children.filter(function(child) {
		return typeof child === "string" ? !whitespace(child) : true;
	});
	addNode(state, props, type, node);
	addChildren(props, children);
	state.ancestors.pop();
	state.schema = parentSchema;
	return state.create(node, type, props, key);
}
/**
* Handle MDX expression.
*
* @param {State} state
*   Info passed around.
* @param {MdxFlowExpressionHast | MdxTextExpressionHast} node
*   Current node.
* @returns {Child | undefined}
*   Child, optional.
*/
function mdxExpression(state, node) {
	if (node.data && node.data.estree && state.evaluater) {
		const expression = node.data.estree.body[0];
		expression.type;
		return state.evaluater.evaluateExpression(expression.expression);
	}
	crashEstree(state, node.position);
}
/**
* Handle MDX ESM.
*
* @param {State} state
*   Info passed around.
* @param {MdxjsEsmHast} node
*   Current node.
* @returns {Child | undefined}
*   Child, optional.
*/
function mdxEsm(state, node) {
	if (node.data && node.data.estree && state.evaluater) return state.evaluater.evaluateProgram(node.data.estree);
	crashEstree(state, node.position);
}
/**
* Handle MDX JSX.
*
* @param {State} state
*   Info passed around.
* @param {MdxJsxFlowElementHast | MdxJsxTextElementHast} node
*   Current node.
* @param {string | undefined} key
*   Key.
* @returns {Child | undefined}
*   Child, optional.
*/
function mdxJsxElement(state, node, key) {
	const parentSchema = state.schema;
	let schema = parentSchema;
	if (node.name === "svg" && parentSchema.space === "html") {
		schema = svg;
		state.schema = schema;
	}
	state.ancestors.push(node);
	const type = node.name === null ? state.Fragment : findComponentFromName(state, node.name, true);
	const props = createJsxElementProps(state, node);
	const children = createChildren(state, node);
	addNode(state, props, type, node);
	addChildren(props, children);
	state.ancestors.pop();
	state.schema = parentSchema;
	return state.create(node, type, props, key);
}
/**
* Handle root.
*
* @param {State} state
*   Info passed around.
* @param {Root} node
*   Current node.
* @param {string | undefined} key
*   Key.
* @returns {Child | undefined}
*   Child, optional.
*/
function root$1(state, node, key) {
	/** @type {Props} */
	const props = {};
	addChildren(props, createChildren(state, node));
	return state.create(node, state.Fragment, props, key);
}
/**
* Handle text.
*
* @param {State} _
*   Info passed around.
* @param {Text} node
*   Current node.
* @returns {Child | undefined}
*   Child, optional.
*/
function text$1(_, node) {
	return node.value;
}
/**
* Add `node` to props.
*
* @param {State} state
*   Info passed around.
* @param {Props} props
*   Props.
* @param {unknown} type
*   Type.
* @param {Element | MdxJsxFlowElementHast | MdxJsxTextElementHast} node
*   Node.
* @returns {undefined}
*   Nothing.
*/
function addNode(state, props, type, node) {
	if (typeof type !== "string" && type !== state.Fragment && state.passNode) props.node = node;
}
/**
* Add children to props.
*
* @param {Props} props
*   Props.
* @param {Array<Child>} children
*   Children.
* @returns {undefined}
*   Nothing.
*/
function addChildren(props, children) {
	if (children.length > 0) {
		const value = children.length > 1 ? children : children[0];
		if (value) props.children = value;
	}
}
/**
* @param {string | undefined} _
*   Path to file.
* @param {Jsx} jsx
*   Dynamic.
* @param {Jsx} jsxs
*   Static.
* @returns {Create}
*   Create a production element.
*/
function productionCreate(_, jsx, jsxs) {
	return create;
	/** @type {Create} */
	function create(_, type, props, key) {
		const fn = Array.isArray(props.children) ? jsxs : jsx;
		return key ? fn(type, props, key) : fn(type, props);
	}
}
/**
* @param {string | undefined} filePath
*   Path to file.
* @param {JsxDev} jsxDEV
*   Development.
* @returns {Create}
*   Create a development element.
*/
function developmentCreate(filePath, jsxDEV) {
	return create;
	/** @type {Create} */
	function create(node, type, props, key) {
		const isStaticChildren = Array.isArray(props.children);
		const point = pointStart(node);
		return jsxDEV(type, props, key, isStaticChildren, {
			columnNumber: point ? point.column - 1 : void 0,
			fileName: filePath,
			lineNumber: point ? point.line : void 0
		}, void 0);
	}
}
/**
* Create props from an element.
*
* @param {State} state
*   Info passed around.
* @param {Element} node
*   Current element.
* @returns {Props}
*   Props.
*/
function createElementProps(state, node) {
	/** @type {Props} */
	const props = {};
	/** @type {string | undefined} */
	let alignValue;
	/** @type {string} */
	let prop;
	for (prop in node.properties) if (prop !== "children" && own$1.call(node.properties, prop)) {
		const result = createProperty(state, prop, node.properties[prop]);
		if (result) {
			const [key, value] = result;
			if (state.tableCellAlignToStyle && key === "align" && typeof value === "string" && tableCellElement.has(node.tagName)) alignValue = value;
			else props[key] = value;
		}
	}
	if (alignValue) {
		const style = props.style || (props.style = {});
		style[state.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = alignValue;
	}
	return props;
}
/**
* Create props from a JSX element.
*
* @param {State} state
*   Info passed around.
* @param {MdxJsxFlowElementHast | MdxJsxTextElementHast} node
*   Current JSX element.
* @returns {Props}
*   Props.
*/
function createJsxElementProps(state, node) {
	/** @type {Props} */
	const props = {};
	for (const attribute of node.attributes) if (attribute.type === "mdxJsxExpressionAttribute") if (attribute.data && attribute.data.estree && state.evaluater) {
		const expression = attribute.data.estree.body[0];
		expression.type;
		const objectExpression = expression.expression;
		objectExpression.type;
		const property = objectExpression.properties[0];
		property.type;
		Object.assign(props, state.evaluater.evaluateExpression(property.argument));
	} else crashEstree(state, node.position);
	else {
		const name = attribute.name;
		/** @type {unknown} */
		let value;
		if (attribute.value && typeof attribute.value === "object") if (attribute.value.data && attribute.value.data.estree && state.evaluater) {
			const expression = attribute.value.data.estree.body[0];
			expression.type;
			value = state.evaluater.evaluateExpression(expression.expression);
		} else crashEstree(state, node.position);
		else value = attribute.value === null ? true : attribute.value;
		props[name] = value;
	}
	return props;
}
/**
* Create children.
*
* @param {State} state
*   Info passed around.
* @param {Parents} node
*   Current element.
* @returns {Array<Child>}
*   Children.
*/
function createChildren(state, node) {
	/** @type {Array<Child>} */
	const children = [];
	let index = -1;
	/** @type {Map<string, number>} */
	/* c8 ignore next */
	const countsByName = state.passKeys ? /* @__PURE__ */ new Map() : emptyMap;
	while (++index < node.children.length) {
		const child = node.children[index];
		/** @type {string | undefined} */
		let key;
		if (state.passKeys) {
			const name = child.type === "element" ? child.tagName : child.type === "mdxJsxFlowElement" || child.type === "mdxJsxTextElement" ? child.name : void 0;
			if (name) {
				const count = countsByName.get(name) || 0;
				key = name + "-" + count;
				countsByName.set(name, count + 1);
			}
		}
		const result = one(state, child, key);
		if (result !== void 0) children.push(result);
	}
	return children;
}
/**
* Handle a property.
*
* @param {State} state
*   Info passed around.
* @param {string} prop
*   Key.
* @param {Array<number | string> | boolean | number | string | null | undefined} value
*   hast property value.
* @returns {Field | undefined}
*   Field for runtime, optional.
*/
function createProperty(state, prop, value) {
	const info = find(state.schema, prop);
	if (value === null || value === void 0 || typeof value === "number" && Number.isNaN(value)) return;
	if (Array.isArray(value)) value = info.commaSeparated ? stringify$1(value) : stringify(value);
	if (info.property === "style") {
		let styleObject = typeof value === "object" ? value : parseStyle(state, String(value));
		if (state.stylePropertyNameCase === "css") styleObject = transformStylesToCssCasing(styleObject);
		return ["style", styleObject];
	}
	return [state.elementAttributeNameCase === "react" && info.space ? hastToReact[info.property] || info.property : info.attribute, value];
}
/**
* Parse a CSS declaration to an object.
*
* @param {State} state
*   Info passed around.
* @param {string} value
*   CSS declarations.
* @returns {Style}
*   Properties.
* @throws
*   Throws `VFileMessage` when CSS cannot be parsed.
*/
function parseStyle(state, value) {
	try {
		return (0, import_cjs.default)(value, { reactCompat: true });
	} catch (error) {
		if (state.ignoreInvalidStyle) return {};
		const cause = error;
		const message = new VFileMessage("Cannot parse `style` attribute", {
			ancestors: state.ancestors,
			cause,
			ruleId: "style",
			source: "hast-util-to-jsx-runtime"
		});
		message.file = state.filePath || void 0;
		message.url = docs + "#cannot-parse-style-attribute";
		throw message;
	}
}
/**
* Create a JSX name from a string.
*
* @param {State} state
*   To do.
* @param {string} name
*   Name.
* @param {boolean} allowExpression
*   Allow member expressions and identifiers.
* @returns {unknown}
*   To do.
*/
function findComponentFromName(state, name, allowExpression) {
	/** @type {Identifier | Literal | MemberExpression} */
	let result;
	if (!allowExpression) result = {
		type: "Literal",
		value: name
	};
	else if (name.includes(".")) {
		const identifiers = name.split(".");
		let index = -1;
		/** @type {Identifier | Literal | MemberExpression | undefined} */
		let node;
		while (++index < identifiers.length) {
			/** @type {Identifier | Literal} */
			const prop = name$2(identifiers[index]) ? {
				type: "Identifier",
				name: identifiers[index]
			} : {
				type: "Literal",
				value: identifiers[index]
			};
			node = node ? {
				type: "MemberExpression",
				object: node,
				property: prop,
				computed: Boolean(index && prop.type === "Literal"),
				optional: false
			} : prop;
		}
		result = node;
	} else result = name$2(name) && !/^[a-z]/.test(name) ? {
		type: "Identifier",
		name
	} : {
		type: "Literal",
		value: name
	};
	if (result.type === "Literal") {
		const name = result.value;
		return own$1.call(state.components, name) ? state.components[name] : name;
	}
	if (state.evaluater) return state.evaluater.evaluateExpression(result);
	crashEstree(state);
}
/**
* @param {State} state
* @param {Position | undefined} [place]
* @returns {never}
*/
function crashEstree(state, place) {
	const message = new VFileMessage("Cannot handle MDX estrees without `createEvaluater`", {
		ancestors: state.ancestors,
		place,
		ruleId: "mdx-estree",
		source: "hast-util-to-jsx-runtime"
	});
	message.file = state.filePath || void 0;
	message.url = docs + "#cannot-handle-mdx-estrees-without-createevaluater";
	throw message;
}
/**
* Transform a DOM casing style object to a CSS casing style object.
*
* @param {Style} domCasing
* @returns {Style}
*/
function transformStylesToCssCasing(domCasing) {
	/** @type {Style} */
	const cssCasing = {};
	/** @type {string} */
	let from;
	for (from in domCasing) if (own$1.call(domCasing, from)) cssCasing[transformStyleToCssCasing(from)] = domCasing[from];
	return cssCasing;
}
/**
* Transform a DOM casing style field to a CSS casing style field.
*
* @param {string} from
* @returns {string}
*/
function transformStyleToCssCasing(from) {
	let to = from.replace(cap, toDash);
	if (to.slice(0, 3) === "ms-") to = "-" + to;
	return to;
}
/**
* Make `$0` dash cased.
*
* @param {string} $0
*   Capitalized ASCII leter.
* @returns {string}
*   Dash and lower letter.
*/
function toDash($0) {
	return "-" + $0.toLowerCase();
}
//#endregion
//#region ../../node_modules/html-url-attributes/lib/index.js
/**
* HTML URL properties.
*
* Each key is a property name and each value is a list of tag names it applies
* to or `null` if it applies to all elements.
*
* @type {Record<string, Array<string> | null>}
*/
var urlAttributes = {
	action: ["form"],
	cite: [
		"blockquote",
		"del",
		"ins",
		"q"
	],
	data: ["object"],
	formAction: ["button", "input"],
	href: [
		"a",
		"area",
		"base",
		"link"
	],
	icon: ["menuitem"],
	itemId: null,
	manifest: ["html"],
	ping: ["a", "area"],
	poster: ["video"],
	src: [
		"audio",
		"embed",
		"iframe",
		"img",
		"input",
		"script",
		"source",
		"track",
		"video"
	]
};
//#endregion
//#region ../../node_modules/micromark-util-sanitize-uri/index.js
/**
* Normalize a URL.
*
* Encode unsafe characters with percent-encoding, skipping already encoded
* sequences.
*
* @param {string} value
*   URI to normalize.
* @returns {string}
*   Normalized URI.
*/
function normalizeUri(value) {
	/** @type {Array<string>} */
	const result = [];
	let index = -1;
	let start = 0;
	let skip = 0;
	while (++index < value.length) {
		const code = value.charCodeAt(index);
		/** @type {string} */
		let replace = "";
		if (code === 37 && asciiAlphanumeric(value.charCodeAt(index + 1)) && asciiAlphanumeric(value.charCodeAt(index + 2))) skip = 2;
		else if (code < 128) {
			if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code))) replace = String.fromCharCode(code);
		} else if (code > 55295 && code < 57344) {
			const next = value.charCodeAt(index + 1);
			if (code < 56320 && next > 56319 && next < 57344) {
				replace = String.fromCharCode(code, next);
				skip = 1;
			} else replace = "�";
		} else replace = String.fromCharCode(code);
		if (replace) {
			result.push(value.slice(start, index), encodeURIComponent(replace));
			start = index + skip + 1;
			replace = "";
		}
		if (skip) {
			index += skip;
			skip = 0;
		}
	}
	return result.join("") + value.slice(start);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
/**
* @import {Element} from 'hast'
* @import {Blockquote} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `blockquote` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Blockquote} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function blockquote(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: state.wrap(state.all(node), true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/break.js
/**
* @import {Element, Text} from 'hast'
* @import {Break} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `break` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Break} node
*   mdast node.
* @returns {Array<Element | Text>}
*   hast element content.
*/
function hardBreak(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	state.patch(node, result);
	return [state.applyData(node, result), {
		type: "text",
		value: "\n"
	}];
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/code.js
/**
* @import {Element, Properties} from 'hast'
* @import {Code} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `code` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Code} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function code(state, node) {
	const value = node.value ? node.value + "\n" : "";
	/** @type {Properties} */
	const properties = {};
	const language = node.lang ? node.lang.split(/\s+/) : [];
	if (language.length > 0) properties.className = ["language-" + language[0]];
	/** @type {Element} */
	let result = {
		type: "element",
		tagName: "code",
		properties,
		children: [{
			type: "text",
			value
		}]
	};
	if (node.meta) result.data = { meta: node.meta };
	state.patch(node, result);
	result = state.applyData(node, result);
	result = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [result]
	};
	state.patch(node, result);
	return result;
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/delete.js
/**
* @import {Element} from 'hast'
* @import {Delete} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `delete` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Delete} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function strikethrough(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "del",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
/**
* @import {Element} from 'hast'
* @import {Emphasis} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `emphasis` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Emphasis} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function emphasis(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "em",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
/**
* @import {Element} from 'hast'
* @import {FootnoteReference} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `footnoteReference` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {FootnoteReference} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function footnoteReference(state, node) {
	const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
	const id = String(node.identifier).toUpperCase();
	const safeId = normalizeUri(id.toLowerCase());
	const index = state.footnoteOrder.indexOf(id);
	/** @type {number} */
	let counter;
	let reuseCounter = state.footnoteCounts.get(id);
	if (reuseCounter === void 0) {
		reuseCounter = 0;
		state.footnoteOrder.push(id);
		counter = state.footnoteOrder.length;
	} else counter = index + 1;
	reuseCounter += 1;
	state.footnoteCounts.set(id, reuseCounter);
	/** @type {Element} */
	const link = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + clobberPrefix + "fn-" + safeId,
			id: clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
			dataFootnoteRef: true,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(counter)
		}]
	};
	state.patch(node, link);
	/** @type {Element} */
	const sup = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [link]
	};
	state.patch(node, sup);
	return state.applyData(node, sup);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/heading.js
/**
* @import {Element} from 'hast'
* @import {Heading} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `heading` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Heading} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function heading(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "h" + node.depth,
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/html.js
/**
* @import {Element} from 'hast'
* @import {Html} from 'mdast'
* @import {State} from '../state.js'
* @import {Raw} from '../../index.js'
*/
/**
* Turn an mdast `html` node into hast (`raw` node in dangerous mode, otherwise
* nothing).
*
* @param {State} state
*   Info passed around.
* @param {Html} node
*   mdast node.
* @returns {Element | Raw | undefined}
*   hast node.
*/
function html(state, node) {
	if (state.options.allowDangerousHtml) {
		/** @type {Raw} */
		const result = {
			type: "raw",
			value: node.value
		};
		state.patch(node, result);
		return state.applyData(node, result);
	}
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/revert.js
/**
* @import {ElementContent} from 'hast'
* @import {Reference, Nodes} from 'mdast'
* @import {State} from './state.js'
*/
/**
* Return the content of a reference without definition as plain text.
*
* @param {State} state
*   Info passed around.
* @param {Extract<Nodes, Reference>} node
*   Reference node (image, link).
* @returns {Array<ElementContent>}
*   hast content.
*/
function revert(state, node) {
	const subtype = node.referenceType;
	let suffix = "]";
	if (subtype === "collapsed") suffix += "[]";
	else if (subtype === "full") suffix += "[" + (node.label || node.identifier) + "]";
	if (node.type === "imageReference") return [{
		type: "text",
		value: "![" + node.alt + suffix
	}];
	const contents = state.all(node);
	const head = contents[0];
	if (head && head.type === "text") head.value = "[" + head.value;
	else contents.unshift({
		type: "text",
		value: "["
	});
	const tail = contents[contents.length - 1];
	if (tail && tail.type === "text") tail.value += suffix;
	else contents.push({
		type: "text",
		value: suffix
	});
	return contents;
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
/**
* @import {ElementContent, Element, Properties} from 'hast'
* @import {ImageReference} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `imageReference` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {ImageReference} node
*   mdast node.
* @returns {Array<ElementContent> | ElementContent}
*   hast node.
*/
function imageReference(state, node) {
	const id = String(node.identifier).toUpperCase();
	const definition = state.definitionById.get(id);
	if (!definition) return revert(state, node);
	/** @type {Properties} */
	const properties = {
		src: normalizeUri(definition.url || ""),
		alt: node.alt
	};
	if (definition.title !== null && definition.title !== void 0) properties.title = definition.title;
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "img",
		properties,
		children: []
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/image.js
/**
* @import {Element, Properties} from 'hast'
* @import {Image} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `image` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Image} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function image(state, node) {
	/** @type {Properties} */
	const properties = { src: normalizeUri(node.url) };
	if (node.alt !== null && node.alt !== void 0) properties.alt = node.alt;
	if (node.title !== null && node.title !== void 0) properties.title = node.title;
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "img",
		properties,
		children: []
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
/**
* @import {Element, Text} from 'hast'
* @import {InlineCode} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `inlineCode` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {InlineCode} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function inlineCode(state, node) {
	/** @type {Text} */
	const text = {
		type: "text",
		value: node.value.replace(/\r?\n|\r/g, " ")
	};
	state.patch(node, text);
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [text]
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
/**
* @import {ElementContent, Element, Properties} from 'hast'
* @import {LinkReference} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `linkReference` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {LinkReference} node
*   mdast node.
* @returns {Array<ElementContent> | ElementContent}
*   hast node.
*/
function linkReference(state, node) {
	const id = String(node.identifier).toUpperCase();
	const definition = state.definitionById.get(id);
	if (!definition) return revert(state, node);
	/** @type {Properties} */
	const properties = { href: normalizeUri(definition.url || "") };
	if (definition.title !== null && definition.title !== void 0) properties.title = definition.title;
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "a",
		properties,
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/link.js
/**
* @import {Element, Properties} from 'hast'
* @import {Link} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `link` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Link} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function link(state, node) {
	/** @type {Properties} */
	const properties = { href: normalizeUri(node.url) };
	if (node.title !== null && node.title !== void 0) properties.title = node.title;
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "a",
		properties,
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/list-item.js
/**
* @import {ElementContent, Element, Properties} from 'hast'
* @import {ListItem, Parents} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `listItem` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {ListItem} node
*   mdast node.
* @param {Parents | undefined} parent
*   Parent of `node`.
* @returns {Element}
*   hast node.
*/
function listItem(state, node, parent) {
	const results = state.all(node);
	const loose = parent ? listLoose(parent) : listItemLoose(node);
	/** @type {Properties} */
	const properties = {};
	/** @type {Array<ElementContent>} */
	const children = [];
	if (typeof node.checked === "boolean") {
		const head = results[0];
		/** @type {Element} */
		let paragraph;
		if (head && head.type === "element" && head.tagName === "p") paragraph = head;
		else {
			paragraph = {
				type: "element",
				tagName: "p",
				properties: {},
				children: []
			};
			results.unshift(paragraph);
		}
		if (paragraph.children.length > 0) paragraph.children.unshift({
			type: "text",
			value: " "
		});
		paragraph.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: node.checked,
				disabled: true
			},
			children: []
		});
		properties.className = ["task-list-item"];
	}
	let index = -1;
	while (++index < results.length) {
		const child = results[index];
		if (loose || index !== 0 || child.type !== "element" || child.tagName !== "p") children.push({
			type: "text",
			value: "\n"
		});
		if (child.type === "element" && child.tagName === "p" && !loose) children.push(...child.children);
		else children.push(child);
	}
	const tail = results[results.length - 1];
	if (tail && (loose || tail.type !== "element" || tail.tagName !== "p")) children.push({
		type: "text",
		value: "\n"
	});
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "li",
		properties,
		children
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
/**
* @param {Parents} node
* @return {Boolean}
*/
function listLoose(node) {
	let loose = false;
	if (node.type === "list") {
		loose = node.spread || false;
		const children = node.children;
		let index = -1;
		while (!loose && ++index < children.length) loose = listItemLoose(children[index]);
	}
	return loose;
}
/**
* @param {ListItem} node
* @return {Boolean}
*/
function listItemLoose(node) {
	const spread = node.spread;
	return spread === null || spread === void 0 ? node.children.length > 1 : spread;
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/list.js
/**
* @import {Element, Properties} from 'hast'
* @import {List} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `list` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {List} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function list(state, node) {
	/** @type {Properties} */
	const properties = {};
	const results = state.all(node);
	let index = -1;
	if (typeof node.start === "number" && node.start !== 1) properties.start = node.start;
	while (++index < results.length) {
		const child = results[index];
		if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
			properties.className = ["contains-task-list"];
			break;
		}
	}
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: node.ordered ? "ol" : "ul",
		properties,
		children: state.wrap(results, true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
/**
* @import {Element} from 'hast'
* @import {Paragraph} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `paragraph` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Paragraph} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function paragraph(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "p",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/root.js
/**
* @import {Parents as HastParents, Root as HastRoot} from 'hast'
* @import {Root as MdastRoot} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `root` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {MdastRoot} node
*   mdast node.
* @returns {HastParents}
*   hast node.
*/
function root(state, node) {
	/** @type {HastRoot} */
	const result = {
		type: "root",
		children: state.wrap(state.all(node))
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/strong.js
/**
* @import {Element} from 'hast'
* @import {Strong} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `strong` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Strong} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function strong(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/table.js
/**
* @import {Table} from 'mdast'
* @import {Element} from 'hast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `table` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {Table} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function table(state, node) {
	const rows = state.all(node);
	const firstRow = rows.shift();
	/** @type {Array<Element>} */
	const tableContent = [];
	if (firstRow) {
		/** @type {Element} */
		const head = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: state.wrap([firstRow], true)
		};
		state.patch(node.children[0], head);
		tableContent.push(head);
	}
	if (rows.length > 0) {
		/** @type {Element} */
		const body = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: state.wrap(rows, true)
		};
		const start = pointStart(node.children[1]);
		const end = pointEnd(node.children[node.children.length - 1]);
		if (start && end) body.position = {
			start,
			end
		};
		tableContent.push(body);
	}
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "table",
		properties: {},
		children: state.wrap(tableContent, true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/table-row.js
/**
* @import {Element, ElementContent, Properties} from 'hast'
* @import {Parents, TableRow} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `tableRow` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {TableRow} node
*   mdast node.
* @param {Parents | undefined} parent
*   Parent of `node`.
* @returns {Element}
*   hast node.
*/
function tableRow(state, node, parent) {
	const siblings = parent ? parent.children : void 0;
	const tagName = (siblings ? siblings.indexOf(node) : 1) === 0 ? "th" : "td";
	const align = parent && parent.type === "table" ? parent.align : void 0;
	const length = align ? align.length : node.children.length;
	let cellIndex = -1;
	/** @type {Array<ElementContent>} */
	const cells = [];
	while (++cellIndex < length) {
		const cell = node.children[cellIndex];
		/** @type {Properties} */
		const properties = {};
		const alignValue = align ? align[cellIndex] : void 0;
		if (alignValue) properties.align = alignValue;
		/** @type {Element} */
		let result = {
			type: "element",
			tagName,
			properties,
			children: []
		};
		if (cell) {
			result.children = state.all(cell);
			state.patch(cell, result);
			result = state.applyData(cell, result);
		}
		cells.push(result);
	}
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: state.wrap(cells, true)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
/**
* @import {Element} from 'hast'
* @import {TableCell} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `tableCell` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {TableCell} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function tableCell(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "td",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/trim-lines/index.js
var tab = 9;
var space = 32;
/**
* Remove initial and final spaces and tabs at the line breaks in `value`.
* Does not trim initial and final spaces and tabs of the value itself.
*
* @param {string} value
*   Value to trim.
* @returns {string}
*   Trimmed value.
*/
function trimLines(value) {
	const source = String(value);
	const search = /\r?\n|\r/g;
	let match = search.exec(source);
	let last = 0;
	/** @type {Array<string>} */
	const lines = [];
	while (match) {
		lines.push(trimLine(source.slice(last, match.index), last > 0, true), match[0]);
		last = match.index + match[0].length;
		match = search.exec(source);
	}
	lines.push(trimLine(source.slice(last), last > 0, false));
	return lines.join("");
}
/**
* @param {string} value
*   Line to trim.
* @param {boolean} start
*   Whether to trim the start of the line.
* @param {boolean} end
*   Whether to trim the end of the line.
* @returns {string}
*   Trimmed line.
*/
function trimLine(value, start, end) {
	let startIndex = 0;
	let endIndex = value.length;
	if (start) {
		let code = value.codePointAt(startIndex);
		while (code === tab || code === space) {
			startIndex++;
			code = value.codePointAt(startIndex);
		}
	}
	if (end) {
		let code = value.codePointAt(endIndex - 1);
		while (code === tab || code === space) {
			endIndex--;
			code = value.codePointAt(endIndex - 1);
		}
	}
	return endIndex > startIndex ? value.slice(startIndex, endIndex) : "";
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/text.js
/**
* @import {Element as HastElement, Text as HastText} from 'hast'
* @import {Text as MdastText} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `text` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {MdastText} node
*   mdast node.
* @returns {HastElement | HastText}
*   hast node.
*/
function text(state, node) {
	/** @type {HastText} */
	const result = {
		type: "text",
		value: trimLines(String(node.value))
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
/**
* @import {Element} from 'hast'
* @import {ThematicBreak} from 'mdast'
* @import {State} from '../state.js'
*/
/**
* Turn an mdast `thematicBreak` node into hast.
*
* @param {State} state
*   Info passed around.
* @param {ThematicBreak} node
*   mdast node.
* @returns {Element}
*   hast node.
*/
function thematicBreak(state, node) {
	/** @type {Element} */
	const result = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/handlers/index.js
/**
* @import {Handlers} from '../state.js'
*/
/**
* Default handlers for nodes.
*
* @satisfies {Handlers}
*/
var handlers = {
	blockquote,
	break: hardBreak,
	code,
	delete: strikethrough,
	emphasis,
	footnoteReference,
	heading,
	html,
	imageReference,
	image,
	inlineCode,
	linkReference,
	link,
	listItem,
	list,
	paragraph,
	root,
	strong,
	table,
	tableCell,
	tableRow,
	text,
	thematicBreak,
	toml: ignore,
	yaml: ignore,
	definition: ignore,
	footnoteDefinition: ignore
};
function ignore() {}
//#endregion
//#region ../../node_modules/@ungap/structured-clone/esm/deserialize.js
var env = typeof self === "object" ? self : globalThis;
var deserializer = ($, _) => {
	const as = (out, index) => {
		$.set(index, out);
		return out;
	};
	const unpair = (index) => {
		if ($.has(index)) return $.get(index);
		const [type, value] = _[index];
		switch (type) {
			case 0:
			case -1: return as(value, index);
			case 1: {
				const arr = as([], index);
				for (const index of value) arr.push(unpair(index));
				return arr;
			}
			case 2: {
				const object = as({}, index);
				for (const [key, index] of value) object[unpair(key)] = unpair(index);
				return object;
			}
			case 3: return as(new Date(value), index);
			case 4: {
				const { source, flags } = value;
				return as(new RegExp(source, flags), index);
			}
			case 5: {
				const map = as(/* @__PURE__ */ new Map(), index);
				for (const [key, index] of value) map.set(unpair(key), unpair(index));
				return map;
			}
			case 6: {
				const set = as(/* @__PURE__ */ new Set(), index);
				for (const index of value) set.add(unpair(index));
				return set;
			}
			case 7: {
				const { name, message } = value;
				return as(new env[name](message), index);
			}
			case 8: return as(BigInt(value), index);
			case "BigInt": return as(Object(BigInt(value)), index);
			case "ArrayBuffer": return as(new Uint8Array(value).buffer, value);
			case "DataView": {
				const { buffer } = new Uint8Array(value);
				return as(new DataView(buffer), value);
			}
		}
		return as(new env[type](value), index);
	};
	return unpair;
};
/**
* @typedef {Array<string,any>} Record a type representation
*/
/**
* Returns a deserialized value from a serialized array of Records.
* @param {Record[]} serialized a previously serialized value.
* @returns {any}
*/
var deserialize = (serialized) => deserializer(/* @__PURE__ */ new Map(), serialized)(0);
//#endregion
//#region ../../node_modules/@ungap/structured-clone/esm/serialize.js
var EMPTY = "";
var { toString } = {};
var { keys } = Object;
var typeOf = (value) => {
	const type = typeof value;
	if (type !== "object" || !value) return [0, type];
	const asString = toString.call(value).slice(8, -1);
	switch (asString) {
		case "Array": return [1, EMPTY];
		case "Object": return [2, EMPTY];
		case "Date": return [3, EMPTY];
		case "RegExp": return [4, EMPTY];
		case "Map": return [5, EMPTY];
		case "Set": return [6, EMPTY];
		case "DataView": return [1, asString];
	}
	if (asString.includes("Array")) return [1, asString];
	if (asString.includes("Error")) return [7, asString];
	return [2, asString];
};
var shouldSkip = ([TYPE, type]) => TYPE === 0 && (type === "function" || type === "symbol");
var serializer = (strict, json, $, _) => {
	const as = (out, value) => {
		const index = _.push(out) - 1;
		$.set(value, index);
		return index;
	};
	const pair = (value) => {
		if ($.has(value)) return $.get(value);
		let [TYPE, type] = typeOf(value);
		switch (TYPE) {
			case 0: {
				let entry = value;
				switch (type) {
					case "bigint":
						TYPE = 8;
						entry = value.toString();
						break;
					case "function":
					case "symbol":
						if (strict) throw new TypeError("unable to serialize " + type);
						entry = null;
						break;
					case "undefined": return as([-1], value);
				}
				return as([TYPE, entry], value);
			}
			case 1: {
				if (type) {
					let spread = value;
					if (type === "DataView") spread = new Uint8Array(value.buffer);
					else if (type === "ArrayBuffer") spread = new Uint8Array(value);
					return as([type, [...spread]], value);
				}
				const arr = [];
				const index = as([TYPE, arr], value);
				for (const entry of value) arr.push(pair(entry));
				return index;
			}
			case 2: {
				if (type) switch (type) {
					case "BigInt": return as([type, value.toString()], value);
					case "Boolean":
					case "Number":
					case "String": return as([type, value.valueOf()], value);
				}
				if (json && "toJSON" in value) return pair(value.toJSON());
				const entries = [];
				const index = as([TYPE, entries], value);
				for (const key of keys(value)) if (strict || !shouldSkip(typeOf(value[key]))) entries.push([pair(key), pair(value[key])]);
				return index;
			}
			case 3: return as([TYPE, value.toISOString()], value);
			case 4: {
				const { source, flags } = value;
				return as([TYPE, {
					source,
					flags
				}], value);
			}
			case 5: {
				const entries = [];
				const index = as([TYPE, entries], value);
				for (const [key, entry] of value) if (strict || !(shouldSkip(typeOf(key)) || shouldSkip(typeOf(entry)))) entries.push([pair(key), pair(entry)]);
				return index;
			}
			case 6: {
				const entries = [];
				const index = as([TYPE, entries], value);
				for (const entry of value) if (strict || !shouldSkip(typeOf(entry))) entries.push(pair(entry));
				return index;
			}
		}
		const { message } = value;
		return as([TYPE, {
			name: type,
			message
		}], value);
	};
	return pair;
};
/**
* @typedef {Array<string,any>} Record a type representation
*/
/**
* Returns an array of serialized Records.
* @param {any} value a serializable value.
* @param {{json?: boolean, lossy?: boolean}?} options an object with a `lossy` or `json` property that,
*  if `true`, will not throw errors on incompatible types, and behave more
*  like JSON stringify would behave. Symbol and Function will be discarded.
* @returns {Record[]}
*/
var serialize = (value, { json, lossy } = {}) => {
	const _ = [];
	return serializer(!(json || lossy), !!json, /* @__PURE__ */ new Map(), _)(value), _;
};
//#endregion
//#region ../../node_modules/@ungap/structured-clone/esm/index.js
/**
* @typedef {Array<string,any>} Record a type representation
*/
/**
* Returns an array of serialized Records.
* @param {any} any a serializable value.
* @param {{transfer?: any[], json?: boolean, lossy?: boolean}?} options an object with
* a transfer option (ignored when polyfilled) and/or non standard fields that
* fallback to the polyfill if present.
* @returns {Record[]}
*/
var esm_default = typeof structuredClone === "function" ? (any, options) => options && ("json" in options || "lossy" in options) ? deserialize(serialize(any, options)) : structuredClone(any) : (any, options) => deserialize(serialize(any, options));
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/footer.js
/**
* @import {ElementContent, Element} from 'hast'
* @import {State} from './state.js'
*/
/**
* @callback FootnoteBackContentTemplate
*   Generate content for the backreference dynamically.
*
*   For the following markdown:
*
*   ```markdown
*   Alpha[^micromark], bravo[^micromark], and charlie[^remark].
*
*   [^remark]: things about remark
*   [^micromark]: things about micromark
*   ```
*
*   This function will be called with:
*
*   *  `0` and `0` for the backreference from `things about micromark` to
*      `alpha`, as it is the first used definition, and the first call to it
*   *  `0` and `1` for the backreference from `things about micromark` to
*      `bravo`, as it is the first used definition, and the second call to it
*   *  `1` and `0` for the backreference from `things about remark` to
*      `charlie`, as it is the second used definition
* @param {number} referenceIndex
*   Index of the definition in the order that they are first referenced,
*   0-indexed.
* @param {number} rereferenceIndex
*   Index of calls to the same definition, 0-indexed.
* @returns {Array<ElementContent> | ElementContent | string}
*   Content for the backreference when linking back from definitions to their
*   reference.
*
* @callback FootnoteBackLabelTemplate
*   Generate a back label dynamically.
*
*   For the following markdown:
*
*   ```markdown
*   Alpha[^micromark], bravo[^micromark], and charlie[^remark].
*
*   [^remark]: things about remark
*   [^micromark]: things about micromark
*   ```
*
*   This function will be called with:
*
*   *  `0` and `0` for the backreference from `things about micromark` to
*      `alpha`, as it is the first used definition, and the first call to it
*   *  `0` and `1` for the backreference from `things about micromark` to
*      `bravo`, as it is the first used definition, and the second call to it
*   *  `1` and `0` for the backreference from `things about remark` to
*      `charlie`, as it is the second used definition
* @param {number} referenceIndex
*   Index of the definition in the order that they are first referenced,
*   0-indexed.
* @param {number} rereferenceIndex
*   Index of calls to the same definition, 0-indexed.
* @returns {string}
*   Back label to use when linking back from definitions to their reference.
*/
/**
* Generate the default content that GitHub uses on backreferences.
*
* @param {number} _
*   Index of the definition in the order that they are first referenced,
*   0-indexed.
* @param {number} rereferenceIndex
*   Index of calls to the same definition, 0-indexed.
* @returns {Array<ElementContent>}
*   Content.
*/
function defaultFootnoteBackContent(_, rereferenceIndex) {
	/** @type {Array<ElementContent>} */
	const result = [{
		type: "text",
		value: "↩"
	}];
	if (rereferenceIndex > 1) result.push({
		type: "element",
		tagName: "sup",
		properties: {},
		children: [{
			type: "text",
			value: String(rereferenceIndex)
		}]
	});
	return result;
}
/**
* Generate the default label that GitHub uses on backreferences.
*
* @param {number} referenceIndex
*   Index of the definition in the order that they are first referenced,
*   0-indexed.
* @param {number} rereferenceIndex
*   Index of calls to the same definition, 0-indexed.
* @returns {string}
*   Label.
*/
function defaultFootnoteBackLabel(referenceIndex, rereferenceIndex) {
	return "Back to reference " + (referenceIndex + 1) + (rereferenceIndex > 1 ? "-" + rereferenceIndex : "");
}
/**
* Generate a hast footer for called footnote definitions.
*
* @param {State} state
*   Info passed around.
* @returns {Element | undefined}
*   `section` element or `undefined`.
*/
function footer(state) {
	const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
	const footnoteBackContent = state.options.footnoteBackContent || defaultFootnoteBackContent;
	const footnoteBackLabel = state.options.footnoteBackLabel || defaultFootnoteBackLabel;
	const footnoteLabel = state.options.footnoteLabel || "Footnotes";
	const footnoteLabelTagName = state.options.footnoteLabelTagName || "h2";
	const footnoteLabelProperties = state.options.footnoteLabelProperties || { className: ["sr-only"] };
	/** @type {Array<ElementContent>} */
	const listItems = [];
	let referenceIndex = -1;
	while (++referenceIndex < state.footnoteOrder.length) {
		const definition = state.footnoteById.get(state.footnoteOrder[referenceIndex]);
		if (!definition) continue;
		const content = state.all(definition);
		const id = String(definition.identifier).toUpperCase();
		const safeId = normalizeUri(id.toLowerCase());
		let rereferenceIndex = 0;
		/** @type {Array<ElementContent>} */
		const backReferences = [];
		const counts = state.footnoteCounts.get(id);
		while (counts !== void 0 && ++rereferenceIndex <= counts) {
			if (backReferences.length > 0) backReferences.push({
				type: "text",
				value: " "
			});
			let children = typeof footnoteBackContent === "string" ? footnoteBackContent : footnoteBackContent(referenceIndex, rereferenceIndex);
			if (typeof children === "string") children = {
				type: "text",
				value: children
			};
			backReferences.push({
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + clobberPrefix + "fnref-" + safeId + (rereferenceIndex > 1 ? "-" + rereferenceIndex : ""),
					dataFootnoteBackref: "",
					ariaLabel: typeof footnoteBackLabel === "string" ? footnoteBackLabel : footnoteBackLabel(referenceIndex, rereferenceIndex),
					className: ["data-footnote-backref"]
				},
				children: Array.isArray(children) ? children : [children]
			});
		}
		const tail = content[content.length - 1];
		if (tail && tail.type === "element" && tail.tagName === "p") {
			const tailTail = tail.children[tail.children.length - 1];
			if (tailTail && tailTail.type === "text") tailTail.value += " ";
			else tail.children.push({
				type: "text",
				value: " "
			});
			tail.children.push(...backReferences);
		} else content.push(...backReferences);
		/** @type {Element} */
		const listItem = {
			type: "element",
			tagName: "li",
			properties: { id: clobberPrefix + "fn-" + safeId },
			children: state.wrap(content, true)
		};
		state.patch(definition, listItem);
		listItems.push(listItem);
	}
	if (listItems.length === 0) return;
	return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: true,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: footnoteLabelTagName,
				properties: {
					...esm_default(footnoteLabelProperties),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: footnoteLabel
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: state.wrap(listItems, true)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/state.js
/**
* @import {
*   ElementContent as HastElementContent,
*   Element as HastElement,
*   Nodes as HastNodes,
*   Properties as HastProperties,
*   RootContent as HastRootContent,
*   Text as HastText
* } from 'hast'
* @import {
*   Definition as MdastDefinition,
*   FootnoteDefinition as MdastFootnoteDefinition,
*   Nodes as MdastNodes,
*   Parents as MdastParents
* } from 'mdast'
* @import {VFile} from 'vfile'
* @import {
*   FootnoteBackContentTemplate,
*   FootnoteBackLabelTemplate
* } from './footer.js'
*/
/**
* @callback Handler
*   Handle a node.
* @param {State} state
*   Info passed around.
* @param {any} node
*   mdast node to handle.
* @param {MdastParents | undefined} parent
*   Parent of `node`.
* @returns {Array<HastElementContent> | HastElementContent | undefined}
*   hast node.
*
* @typedef {Partial<Record<MdastNodes['type'], Handler>>} Handlers
*   Handle nodes.
*
* @typedef Options
*   Configuration (optional).
* @property {boolean | null | undefined} [allowDangerousHtml=false]
*   Whether to persist raw HTML in markdown in the hast tree (default:
*   `false`).
* @property {string | null | undefined} [clobberPrefix='user-content-']
*   Prefix to use before the `id` property on footnotes to prevent them from
*   *clobbering* (default: `'user-content-'`).
*
*   Pass `''` for trusted markdown and when you are careful with
*   polyfilling.
*   You could pass a different prefix.
*
*   DOM clobbering is this:
*
*   ```html
*   <p id="x"></p>
*   <script>alert(x) // `x` now refers to the `p#x` DOM element<\/script>
*   ```
*
*   The above example shows that elements are made available by browsers, by
*   their ID, on the `window` object.
*   This is a security risk because you might be expecting some other variable
*   at that place.
*   It can also break polyfills.
*   Using a prefix solves these problems.
* @property {VFile | null | undefined} [file]
*   Corresponding virtual file representing the input document (optional).
* @property {FootnoteBackContentTemplate | string | null | undefined} [footnoteBackContent]
*   Content of the backreference back to references (default: `defaultFootnoteBackContent`).
*
*   The default value is:
*
*   ```js
*   function defaultFootnoteBackContent(_, rereferenceIndex) {
*     const result = [{type: 'text', value: '↩'}]
*
*     if (rereferenceIndex > 1) {
*       result.push({
*         type: 'element',
*         tagName: 'sup',
*         properties: {},
*         children: [{type: 'text', value: String(rereferenceIndex)}]
*       })
*     }
*
*     return result
*   }
*   ```
*
*   This content is used in the `a` element of each backreference (the `↩`
*   links).
* @property {FootnoteBackLabelTemplate | string | null | undefined} [footnoteBackLabel]
*   Label to describe the backreference back to references (default:
*   `defaultFootnoteBackLabel`).
*
*   The default value is:
*
*   ```js
*   function defaultFootnoteBackLabel(referenceIndex, rereferenceIndex) {
*    return (
*      'Back to reference ' +
*      (referenceIndex + 1) +
*      (rereferenceIndex > 1 ? '-' + rereferenceIndex : '')
*    )
*   }
*   ```
*
*   Change it when the markdown is not in English.
*
*   This label is used in the `ariaLabel` property on each backreference
*   (the `↩` links).
*   It affects users of assistive technology.
* @property {string | null | undefined} [footnoteLabel='Footnotes']
*   Textual label to use for the footnotes section (default: `'Footnotes'`).
*
*   Change it when the markdown is not in English.
*
*   This label is typically hidden visually (assuming a `sr-only` CSS class
*   is defined that does that) and so affects screen readers only.
*   If you do have such a class, but want to show this section to everyone,
*   pass different properties with the `footnoteLabelProperties` option.
* @property {HastProperties | null | undefined} [footnoteLabelProperties={className: ['sr-only']}]
*   Properties to use on the footnote label (default: `{className:
*   ['sr-only']}`).
*
*   Change it to show the label and add other properties.
*
*   This label is typically hidden visually (assuming an `sr-only` CSS class
*   is defined that does that) and so affects screen readers only.
*   If you do have such a class, but want to show this section to everyone,
*   pass an empty string.
*   You can also add different properties.
*
*   > **Note**: `id: 'footnote-label'` is always added, because footnote
*   > calls use it with `aria-describedby` to provide an accessible label.
* @property {string | null | undefined} [footnoteLabelTagName='h2']
*   HTML tag name to use for the footnote label element (default: `'h2'`).
*
*   Change it to match your document structure.
*
*   This label is typically hidden visually (assuming a `sr-only` CSS class
*   is defined that does that) and so affects screen readers only.
*   If you do have such a class, but want to show this section to everyone,
*   pass different properties with the `footnoteLabelProperties` option.
* @property {Handlers | null | undefined} [handlers]
*   Extra handlers for nodes (optional).
* @property {Array<MdastNodes['type']> | null | undefined} [passThrough]
*   List of custom mdast node types to pass through (keep) in hast (note that
*   the node itself is passed, but eventual children are transformed)
*   (optional).
* @property {Handler | null | undefined} [unknownHandler]
*   Handler for all unknown nodes (optional).
*
* @typedef State
*   Info passed around.
* @property {(node: MdastNodes) => Array<HastElementContent>} all
*   Transform the children of an mdast parent to hast.
* @property {<Type extends HastNodes>(from: MdastNodes, to: Type) => HastElement | Type} applyData
*   Honor the `data` of `from`, and generate an element instead of `node`.
* @property {Map<string, MdastDefinition>} definitionById
*   Definitions by their identifier.
* @property {Map<string, MdastFootnoteDefinition>} footnoteById
*   Footnote definitions by their identifier.
* @property {Map<string, number>} footnoteCounts
*   Counts for how often the same footnote was called.
* @property {Array<string>} footnoteOrder
*   Identifiers of order when footnote calls first appear in tree order.
* @property {Handlers} handlers
*   Applied handlers.
* @property {(node: MdastNodes, parent: MdastParents | undefined) => Array<HastElementContent> | HastElementContent | undefined} one
*   Transform an mdast node to hast.
* @property {Options} options
*   Configuration.
* @property {(from: MdastNodes, node: HastNodes) => undefined} patch
*   Copy a node’s positional info.
* @property {<Type extends HastRootContent>(nodes: Array<Type>, loose?: boolean | undefined) => Array<HastText | Type>} wrap
*   Wrap `nodes` with line endings between each node, adds initial/final line endings when `loose`.
*/
var own = {}.hasOwnProperty;
/** @type {Options} */
var emptyOptions = {};
/**
* Create `state` from an mdast tree.
*
* @param {MdastNodes} tree
*   mdast node to transform.
* @param {Options | null | undefined} [options]
*   Configuration (optional).
* @returns {State}
*   `state` function.
*/
function createState(tree, options) {
	const settings = options || emptyOptions;
	/** @type {Map<string, MdastDefinition>} */
	const definitionById = /* @__PURE__ */ new Map();
	/** @type {Map<string, MdastFootnoteDefinition>} */
	const footnoteById = /* @__PURE__ */ new Map();
	/** @type {State} */
	const state = {
		all,
		applyData,
		definitionById,
		footnoteById,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...handlers,
			...settings.handlers
		},
		one,
		options: settings,
		patch,
		wrap
	};
	visit(tree, function(node) {
		if (node.type === "definition" || node.type === "footnoteDefinition") {
			const map = node.type === "definition" ? definitionById : footnoteById;
			const id = String(node.identifier).toUpperCase();
			if (!map.has(id)) map.set(id, node);
		}
	});
	return state;
	/**
	* Transform an mdast node into a hast node.
	*
	* @param {MdastNodes} node
	*   mdast node.
	* @param {MdastParents | undefined} [parent]
	*   Parent of `node`.
	* @returns {Array<HastElementContent> | HastElementContent | undefined}
	*   Resulting hast node.
	*/
	function one(node, parent) {
		const type = node.type;
		const handle = state.handlers[type];
		if (own.call(state.handlers, type) && handle) return handle(state, node, parent);
		if (state.options.passThrough && state.options.passThrough.includes(type)) {
			if ("children" in node) {
				const { children, ...shallow } = node;
				const result = esm_default(shallow);
				result.children = state.all(node);
				return result;
			}
			return esm_default(node);
		}
		return (state.options.unknownHandler || defaultUnknownHandler)(state, node, parent);
	}
	/**
	* Transform the children of an mdast node into hast nodes.
	*
	* @param {MdastNodes} parent
	*   mdast node to compile
	* @returns {Array<HastElementContent>}
	*   Resulting hast nodes.
	*/
	function all(parent) {
		/** @type {Array<HastElementContent>} */
		const values = [];
		if ("children" in parent) {
			const nodes = parent.children;
			let index = -1;
			while (++index < nodes.length) {
				const result = state.one(nodes[index], parent);
				if (result) {
					if (index && nodes[index - 1].type === "break") {
						if (!Array.isArray(result) && result.type === "text") result.value = trimMarkdownSpaceStart(result.value);
						if (!Array.isArray(result) && result.type === "element") {
							const head = result.children[0];
							if (head && head.type === "text") head.value = trimMarkdownSpaceStart(head.value);
						}
					}
					if (Array.isArray(result)) values.push(...result);
					else values.push(result);
				}
			}
		}
		return values;
	}
}
/**
* Copy a node’s positional info.
*
* @param {MdastNodes} from
*   mdast node to copy from.
* @param {HastNodes} to
*   hast node to copy into.
* @returns {undefined}
*   Nothing.
*/
function patch(from, to) {
	if (from.position) to.position = position(from);
}
/**
* Honor the `data` of `from` and maybe generate an element instead of `to`.
*
* @template {HastNodes} Type
*   Node type.
* @param {MdastNodes} from
*   mdast node to use data from.
* @param {Type} to
*   hast node to change.
* @returns {HastElement | Type}
*   Nothing.
*/
function applyData(from, to) {
	/** @type {HastElement | Type} */
	let result = to;
	if (from && from.data) {
		const hName = from.data.hName;
		const hChildren = from.data.hChildren;
		const hProperties = from.data.hProperties;
		if (typeof hName === "string") if (result.type === "element") result.tagName = hName;
		else result = {
			type: "element",
			tagName: hName,
			properties: {},
			children: "children" in result ? result.children : [result]
		};
		if (result.type === "element" && hProperties) Object.assign(result.properties, esm_default(hProperties));
		if ("children" in result && result.children && hChildren !== null && hChildren !== void 0) result.children = hChildren;
	}
	return result;
}
/**
* Transform an unknown node.
*
* @param {State} state
*   Info passed around.
* @param {MdastNodes} node
*   Unknown mdast node.
* @returns {HastElement | HastText}
*   Resulting hast node.
*/
function defaultUnknownHandler(state, node) {
	const data = node.data || {};
	/** @type {HastElement | HastText} */
	const result = "value" in node && !(own.call(data, "hProperties") || own.call(data, "hChildren")) ? {
		type: "text",
		value: node.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: state.all(node)
	};
	state.patch(node, result);
	return state.applyData(node, result);
}
/**
* Wrap `nodes` with line endings between each node.
*
* @template {HastRootContent} Type
*   Node type.
* @param {Array<Type>} nodes
*   List of nodes to wrap.
* @param {boolean | undefined} [loose=false]
*   Whether to add line endings at start and end (default: `false`).
* @returns {Array<HastText | Type>}
*   Wrapped nodes.
*/
function wrap(nodes, loose) {
	/** @type {Array<HastText | Type>} */
	const result = [];
	let index = -1;
	if (loose) result.push({
		type: "text",
		value: "\n"
	});
	while (++index < nodes.length) {
		if (index) result.push({
			type: "text",
			value: "\n"
		});
		result.push(nodes[index]);
	}
	if (loose && nodes.length > 0) result.push({
		type: "text",
		value: "\n"
	});
	return result;
}
/**
* Trim spaces and tabs at the start of `value`.
*
* @param {string} value
*   Value to trim.
* @returns {string}
*   Result.
*/
function trimMarkdownSpaceStart(value) {
	let index = 0;
	let code = value.charCodeAt(index);
	while (code === 9 || code === 32) {
		index++;
		code = value.charCodeAt(index);
	}
	return value.slice(index);
}
//#endregion
//#region ../../node_modules/mdast-util-to-hast/lib/index.js
/**
* @import {Nodes as HastNodes} from 'hast'
* @import {Nodes as MdastNodes} from 'mdast'
* @import {Options} from './state.js'
*/
/**
* Transform mdast to hast.
*
* ##### Notes
*
* ###### HTML
*
* Raw HTML is available in mdast as `html` nodes and can be embedded in hast
* as semistandard `raw` nodes.
* Most utilities ignore `raw` nodes but two notable ones don’t:
*
* *   `hast-util-to-html` also has an option `allowDangerousHtml` which will
*     output the raw HTML.
*     This is typically discouraged as noted by the option name but is useful
*     if you completely trust authors
* *   `hast-util-raw` can handle the raw embedded HTML strings by parsing them
*     into standard hast nodes (`element`, `text`, etc).
*     This is a heavy task as it needs a full HTML parser, but it is the only
*     way to support untrusted content
*
* ###### Footnotes
*
* Many options supported here relate to footnotes.
* Footnotes are not specified by CommonMark, which we follow by default.
* They are supported by GitHub, so footnotes can be enabled in markdown with
* `mdast-util-gfm`.
*
* The options `footnoteBackLabel` and `footnoteLabel` define natural language
* that explains footnotes, which is hidden for sighted users but shown to
* assistive technology.
* When your page is not in English, you must define translated values.
*
* Back references use ARIA attributes, but the section label itself uses a
* heading that is hidden with an `sr-only` class.
* To show it to sighted users, define different attributes in
* `footnoteLabelProperties`.
*
* ###### Clobbering
*
* Footnotes introduces a problem, as it links footnote calls to footnote
* definitions on the page through `id` attributes generated from user content,
* which results in DOM clobbering.
*
* DOM clobbering is this:
*
* ```html
* <p id=x></p>
* <script>alert(x) // `x` now refers to the DOM `p#x` element<\/script>
* ```
*
* Elements by their ID are made available by browsers on the `window` object,
* which is a security risk.
* Using a prefix solves this problem.
*
* More information on how to handle clobbering and the prefix is explained in
* Example: headings (DOM clobbering) in `rehype-sanitize`.
*
* ###### Unknown nodes
*
* Unknown nodes are nodes with a type that isn’t in `handlers` or `passThrough`.
* The default behavior for unknown nodes is:
*
* *   when the node has a `value` (and doesn’t have `data.hName`,
*     `data.hProperties`, or `data.hChildren`, see later), create a hast `text`
*     node
* *   otherwise, create a `<div>` element (which could be changed with
*     `data.hName`), with its children mapped from mdast to hast as well
*
* This behavior can be changed by passing an `unknownHandler`.
*
* @param {MdastNodes} tree
*   mdast tree.
* @param {Options | null | undefined} [options]
*   Configuration (optional).
* @returns {HastNodes}
*   hast tree.
*/
function toHast(tree, options) {
	const state = createState(tree, options);
	const node = state.one(tree, void 0);
	const foot = footer(state);
	/** @type {HastNodes} */
	const result = Array.isArray(node) ? {
		type: "root",
		children: node
	} : node || {
		type: "root",
		children: []
	};
	if (foot) {
		"children" in result;
		result.children.push({
			type: "text",
			value: "\n"
		}, foot);
	}
	return result;
}
//#endregion
//#region ../../node_modules/remark-rehype/lib/index.js
/**
* @import {Root as HastRoot} from 'hast'
* @import {Root as MdastRoot} from 'mdast'
* @import {Options as ToHastOptions} from 'mdast-util-to-hast'
* @import {Processor} from 'unified'
* @import {VFile} from 'vfile'
*/
/**
* @typedef {Omit<ToHastOptions, 'file'>} Options
*
* @callback TransformBridge
*   Bridge-mode.
*
*   Runs the destination with the new hast tree.
*   Discards result.
* @param {MdastRoot} tree
*   Tree.
* @param {VFile} file
*   File.
* @returns {Promise<undefined>}
*   Nothing.
*
* @callback TransformMutate
*  Mutate-mode.
*
*  Further transformers run on the hast tree.
* @param {MdastRoot} tree
*   Tree.
* @param {VFile} file
*   File.
* @returns {HastRoot}
*   Tree (hast).
*/
/**
* Turn markdown into HTML.
*
* ##### Notes
*
* ###### Signature
*
* * if a processor is given,
*   runs the (rehype) plugins used on it with a hast tree,
*   then discards the result (*bridge mode*)
* * otherwise,
*   returns a hast tree,
*   the plugins used after `remarkRehype` are rehype plugins (*mutate mode*)
*
* > 👉 **Note**:
* > It’s highly unlikely that you want to pass a `processor`.
*
* ###### HTML
*
* Raw HTML is available in mdast as `html` nodes and can be embedded in hast
* as semistandard `raw` nodes.
* Most plugins ignore `raw` nodes but two notable ones don’t:
*
* * `rehype-stringify` also has an option `allowDangerousHtml` which will
*   output the raw HTML.
*   This is typically discouraged as noted by the option name but is useful if
*   you completely trust authors
* * `rehype-raw` can handle the raw embedded HTML strings by parsing them
*   into standard hast nodes (`element`, `text`, etc);
*   this is a heavy task as it needs a full HTML parser,
*   but it is the only way to support untrusted content
*
* ###### Footnotes
*
* Many options supported here relate to footnotes.
* Footnotes are not specified by CommonMark,
* which we follow by default.
* They are supported by GitHub,
* so footnotes can be enabled in markdown with `remark-gfm`.
*
* The options `footnoteBackLabel` and `footnoteLabel` define natural language
* that explains footnotes,
* which is hidden for sighted users but shown to assistive technology.
* When your page is not in English,
* you must define translated values.
*
* Back references use ARIA attributes,
* but the section label itself uses a heading that is hidden with an
* `sr-only` class.
* To show it to sighted users,
* define different attributes in `footnoteLabelProperties`.
*
* ###### Clobbering
*
* Footnotes introduces a problem,
* as it links footnote calls to footnote definitions on the page through `id`
* attributes generated from user content,
* which results in DOM clobbering.
*
* DOM clobbering is this:
*
* ```html
* <p id=x></p>
* <script>alert(x) // `x` now refers to the DOM `p#x` element<\/script>
* ```
*
* Elements by their ID are made available by browsers on the `window` object,
* which is a security risk.
* Using a prefix solves this problem.
*
* More information on how to handle clobbering and the prefix is explained in
* *Example: headings (DOM clobbering)* in `rehype-sanitize`.
*
* ###### Unknown nodes
*
* Unknown nodes are nodes with a type that isn’t in `handlers` or `passThrough`.
* The default behavior for unknown nodes is:
*
* * when the node has a `value`
*   (and doesn’t have `data.hName`, `data.hProperties`, or `data.hChildren`,
*   see later),
*   create a hast `text` node
* * otherwise,
*   create a `<div>` element (which could be changed with `data.hName`),
*   with its children mapped from mdast to hast as well
*
* This behavior can be changed by passing an `unknownHandler`.
*
* @overload
* @param {Processor} processor
* @param {Readonly<Options> | null | undefined} [options]
* @returns {TransformBridge}
*
* @overload
* @param {Readonly<Options> | null | undefined} [options]
* @returns {TransformMutate}
*
* @overload
* @param {Readonly<Options> | Processor | null | undefined} [destination]
* @param {Readonly<Options> | null | undefined} [options]
* @returns {TransformBridge | TransformMutate}
*
* @param {Readonly<Options> | Processor | null | undefined} [destination]
*   Processor or configuration (optional).
* @param {Readonly<Options> | null | undefined} [options]
*   When a processor was given,
*   configuration (optional).
* @returns {TransformBridge | TransformMutate}
*   Transform.
*/
function remarkRehype(destination, options) {
	if (destination && "run" in destination)
 /**
	* @type {TransformBridge}
	*/
	return async function(tree, file) {
		const hastTree = toHast(tree, {
			file,
			...options
		});
		await destination.run(hastTree, file);
	};
	/**
	* @type {TransformMutate}
	*/
	return function(tree, file) {
		return toHast(tree, {
			file,
			...destination || options
		});
	};
}
//#endregion
//#region ../../node_modules/react-markdown/lib/index.js
/**
* @import {Element, Nodes, Parents, Root} from 'hast'
* @import {Root as MdastRoot} from 'mdast'
* @import {ComponentType, JSX, ReactElement, ReactNode} from 'react'
* @import {Options as RemarkRehypeOptions} from 'remark-rehype'
* @import {BuildVisitor} from 'unist-util-visit'
* @import {PluggableList, Processor} from 'unified'
*/
/**
* @callback AllowElement
*   Filter elements.
* @param {Readonly<Element>} element
*   Element to check.
* @param {number} index
*   Index of `element` in `parent`.
* @param {Readonly<Parents> | undefined} parent
*   Parent of `element`.
* @returns {boolean | null | undefined}
*   Whether to allow `element` (default: `false`).
*/
/**
* @typedef ExtraProps
*   Extra fields we pass.
* @property {Element | undefined} [node]
*   passed when `passNode` is on.
*/
/**
* @typedef {{
*   [Key in keyof JSX.IntrinsicElements]?: ComponentType<JSX.IntrinsicElements[Key] & ExtraProps> | keyof JSX.IntrinsicElements
* }} Components
*   Map tag names to components.
*/
/**
* @typedef Deprecation
*   Deprecation.
* @property {string} from
*   Old field.
* @property {string} id
*   ID in readme.
* @property {keyof Options} [to]
*   New field.
*/
/**
* @typedef Options
*   Configuration.
* @property {AllowElement | null | undefined} [allowElement]
*   Filter elements (optional);
*   `allowedElements` / `disallowedElements` is used first.
* @property {ReadonlyArray<string> | null | undefined} [allowedElements]
*   Tag names to allow (default: all tag names);
*   cannot combine w/ `disallowedElements`.
* @property {string | null | undefined} [children]
*   Markdown.
* @property {Components | null | undefined} [components]
*   Map tag names to components.
* @property {ReadonlyArray<string> | null | undefined} [disallowedElements]
*   Tag names to disallow (default: `[]`);
*   cannot combine w/ `allowedElements`.
* @property {PluggableList | null | undefined} [rehypePlugins]
*   List of rehype plugins to use.
* @property {PluggableList | null | undefined} [remarkPlugins]
*   List of remark plugins to use.
* @property {Readonly<RemarkRehypeOptions> | null | undefined} [remarkRehypeOptions]
*   Options to pass through to `remark-rehype`.
* @property {boolean | null | undefined} [skipHtml=false]
*   Ignore HTML in markdown completely (default: `false`).
* @property {boolean | null | undefined} [unwrapDisallowed=false]
*   Extract (unwrap) what’s in disallowed elements (default: `false`);
*   normally when say `strong` is not allowed, it and it’s children are dropped,
*   with `unwrapDisallowed` the element itself is replaced by its children.
* @property {UrlTransform | null | undefined} [urlTransform]
*   Change URLs (default: `defaultUrlTransform`)
*/
/**
* @typedef HooksOptionsOnly
*   Configuration specifically for {@linkcode MarkdownHooks}.
* @property {ReactNode | null | undefined} [fallback]
*   Content to render while the processor processing the markdown (optional).
*/
/**
* @typedef {Options & HooksOptionsOnly} HooksOptions
*   Configuration for {@linkcode MarkdownHooks};
*   extends the regular {@linkcode Options} with a `fallback` prop.
*/
/**
* @callback UrlTransform
*   Transform all URLs.
* @param {string} url
*   URL.
* @param {string} key
*   Property name (example: `'href'`).
* @param {Readonly<Element>} node
*   Node.
* @returns {string | null | undefined}
*   Transformed URL (optional).
*/
/** @type {PluggableList} */
var emptyPlugins = [];
/** @type {Readonly<RemarkRehypeOptions>} */
var emptyRemarkRehypeOptions = { allowDangerousHtml: true };
var safeProtocol = /^(https?|ircs?|mailto|xmpp)$/i;
/** @type {ReadonlyArray<Readonly<Deprecation>>} */
var deprecations = [
	{
		from: "astPlugins",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowDangerousHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowNode",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowElement"
	},
	{
		from: "allowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowedElements"
	},
	{
		from: "className",
		id: "remove-classname"
	},
	{
		from: "disallowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "disallowedElements"
	},
	{
		from: "escapeHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "includeElementIndex",
		id: "#remove-includeelementindex"
	},
	{
		from: "includeNodeIndex",
		id: "change-includenodeindex-to-includeelementindex"
	},
	{
		from: "linkTarget",
		id: "remove-linktarget"
	},
	{
		from: "plugins",
		id: "change-plugins-to-remarkplugins",
		to: "remarkPlugins"
	},
	{
		from: "rawSourcePos",
		id: "#remove-rawsourcepos"
	},
	{
		from: "renderers",
		id: "change-renderers-to-components",
		to: "components"
	},
	{
		from: "source",
		id: "change-source-to-children",
		to: "children"
	},
	{
		from: "sourcePos",
		id: "#remove-sourcepos"
	},
	{
		from: "transformImageUri",
		id: "#add-urltransform",
		to: "urlTransform"
	},
	{
		from: "transformLinkUri",
		id: "#add-urltransform",
		to: "urlTransform"
	}
];
/**
* Component to render markdown.
*
* This is a synchronous component.
* When using async plugins,
* see {@linkcode MarkdownAsync} or {@linkcode MarkdownHooks}.
*
* @param {Readonly<Options>} options
*   Props.
* @returns {ReactElement}
*   React element.
*/
function Markdown(options) {
	const processor = createProcessor(options);
	const file = createFile(options);
	return post(processor.runSync(processor.parse(file), file), options);
}
/**
* Set up the `unified` processor.
*
* @param {Readonly<Options>} options
*   Props.
* @returns {Processor<MdastRoot, MdastRoot, Root, undefined, undefined>}
*   Result.
*/
function createProcessor(options) {
	const rehypePlugins = options.rehypePlugins || emptyPlugins;
	const remarkPlugins = options.remarkPlugins || emptyPlugins;
	const remarkRehypeOptions = options.remarkRehypeOptions ? {
		...options.remarkRehypeOptions,
		...emptyRemarkRehypeOptions
	} : emptyRemarkRehypeOptions;
	return unified().use(remarkParse).use(remarkPlugins).use(remarkRehype, remarkRehypeOptions).use(rehypePlugins);
}
/**
* Set up the virtual file.
*
* @param {Readonly<Options>} options
*   Props.
* @returns {VFile}
*   Result.
*/
function createFile(options) {
	const children = options.children || "";
	const file = new VFile();
	if (typeof children === "string") file.value = children;
	else "" + children;
	return file;
}
/**
* Process the result from unified some more.
*
* @param {Nodes} tree
*   Tree.
* @param {Readonly<Options>} options
*   Props.
* @returns {ReactElement}
*   React element.
*/
function post(tree, options) {
	const allowedElements = options.allowedElements;
	const allowElement = options.allowElement;
	const components = options.components;
	const disallowedElements = options.disallowedElements;
	const skipHtml = options.skipHtml;
	const unwrapDisallowed = options.unwrapDisallowed;
	const urlTransform = options.urlTransform || defaultUrlTransform;
	for (const deprecation of deprecations) if (Object.hasOwn(options, deprecation.from)) "" + deprecation.from + (deprecation.to ? "use `" + deprecation.to + "` instead" : "remove it") + deprecation.id;
	if (allowedElements && disallowedElements);
	visit(tree, transform);
	return toJsxRuntime(tree, {
		Fragment: Fragment$1,
		components,
		ignoreInvalidStyle: true,
		jsx,
		jsxs,
		passKeys: true,
		passNode: true
	});
	/** @type {BuildVisitor<Root>} */
	function transform(node, index, parent) {
		if (node.type === "raw" && parent && typeof index === "number") {
			if (skipHtml) parent.children.splice(index, 1);
			else parent.children[index] = {
				type: "text",
				value: node.value
			};
			return index;
		}
		if (node.type === "element") {
			/** @type {string} */
			let key;
			for (key in urlAttributes) if (Object.hasOwn(urlAttributes, key) && Object.hasOwn(node.properties, key)) {
				const value = node.properties[key];
				const test = urlAttributes[key];
				if (test === null || test.includes(node.tagName)) node.properties[key] = urlTransform(String(value || ""), key, node);
			}
		}
		if (node.type === "element") {
			let remove = allowedElements ? !allowedElements.includes(node.tagName) : disallowedElements ? disallowedElements.includes(node.tagName) : false;
			if (!remove && allowElement && typeof index === "number") remove = !allowElement(node, index, parent);
			if (remove && parent && typeof index === "number") {
				if (unwrapDisallowed && node.children) parent.children.splice(index, 1, ...node.children);
				else parent.children.splice(index, 1);
				return index;
			}
		}
	}
}
/**
* Make a URL safe.
*
* @satisfies {UrlTransform}
* @param {string} value
*   URL.
* @returns {string}
*   Safe URL.
*/
function defaultUrlTransform(value) {
	const colon = value.indexOf(":");
	const questionMark = value.indexOf("?");
	const numberSign = value.indexOf("#");
	const slash = value.indexOf("/");
	if (colon === -1 || slash !== -1 && colon > slash || questionMark !== -1 && colon > questionMark || numberSign !== -1 && colon > numberSign || safeProtocol.test(value.slice(0, colon))) return value;
	return "";
}
//#endregion
//#region ../../components/guides/MarkdownRenderer.tsx
function joinClasses$3(...values) {
	return values.filter(Boolean).join(" ");
}
function collectText(node) {
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(collectText).join("");
	if (node && typeof node === "object" && "props" in node) return collectText(node.props?.children);
	return "";
}
function normalizeHref(href) {
	const trimmed = href.trim();
	if (/^(javascript:|vbscript:)/i.test(trimmed)) return "#";
	return trimmed;
}
function stripMarkdownTokens(value) {
	return value.replace(/`([^`]+)`/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/~~([^~]+)~~/g, "$1").replace(/!?\[([^\]]*)\]\(([^)]+)\)/g, "$1").replace(/\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_match, target, label) => String(label || target || "")).trim();
}
function extractMarkdownHeadings(content) {
	const lines = prepareMarkdownForRender(content || "").split("\n");
	const headings = [];
	const seen = /* @__PURE__ */ new Map();
	for (const [index, line] of lines.entries()) {
		const match = line.match(/^(#{1,6})\s+(.*)$/);
		if (!match) continue;
		const level = match[1].length;
		const text = stripMarkdownTokens(match[2]);
		if (!text) continue;
		const baseId = normalizeGuideTitle(text) || `section-${headings.length + 1}`;
		const currentCount = seen.get(baseId) || 0;
		seen.set(baseId, currentCount + 1);
		headings.push({
			id: currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`,
			level,
			text,
			line: index + 1
		});
	}
	return headings;
}
function resolveGuideId(href, guidesIndex) {
	if (!href || !guidesIndex || !href.startsWith("guide://")) return null;
	const slug = normalizeGuideTitle(decodeURIComponent(href.slice(8)));
	return guidesIndex.find((guide) => (guide.slug ? normalizeGuideTitle(guide.slug) : normalizeGuideTitle(guide.title)) === slug)?.id || null;
}
function MarkdownRenderer({ content, className, guidesIndex, onGuideLinkClick, onHeadingLinkClick }) {
	const markdown = prepareMarkdownForRender(content || "");
	const headings = extractMarkdownHeadings(content);
	const renderHeading = (fallbackLevel, children, lineNumber) => {
		const heading = lineNumber == null ? void 0 : headings.find((candidate) => candidate.line === lineNumber);
		const headingText = heading?.text || collectText(children).trim();
		const headingId = heading?.id || normalizeGuideTitle(headingText) || `section-${lineNumber ?? fallbackLevel}`;
		return /* @__PURE__ */ jsxs(`h${fallbackLevel}`, {
			id: headingId,
			className: `dc-md-h${Math.min(fallbackLevel, 3)}`,
			"data-guide-anchor": headingId,
			children: [/* @__PURE__ */ jsx("span", { children }), (onHeadingLinkClick || headingId) && /* @__PURE__ */ jsx("button", {
				type: "button",
				className: "dc-md-anchor",
				onClick: () => {
					if (onHeadingLinkClick) {
						onHeadingLinkClick(headingId);
						return;
					}
					document.getElementById(headingId)?.scrollIntoView({
						behavior: "smooth",
						block: "start"
					});
				},
				"aria-label": `Go to section ${headingText}`,
				children: "#"
			})]
		});
	};
	return /* @__PURE__ */ jsx("div", {
		className: joinClasses$3("dc-md", className),
		children: /* @__PURE__ */ jsx(Markdown, {
			remarkPlugins: [remarkGfm],
			skipHtml: true,
			urlTransform: (url) => normalizeHref(String(url || "")),
			components: {
				h1: ({ children, node }) => renderHeading(1, children, node?.position?.start.line),
				h2: ({ children, node }) => renderHeading(2, children, node?.position?.start.line),
				h3: ({ children, node }) => renderHeading(3, children, node?.position?.start.line),
				h4: ({ children, node }) => renderHeading(4, children, node?.position?.start.line),
				h5: ({ children, node }) => renderHeading(5, children, node?.position?.start.line),
				h6: ({ children, node }) => renderHeading(6, children, node?.position?.start.line),
				p: ({ children }) => /* @__PURE__ */ jsx("p", {
					className: "dc-md-p",
					children
				}),
				ul: ({ children, className: listClassName }) => /* @__PURE__ */ jsx("ul", {
					className: joinClasses$3("dc-md-ul", listClassName),
					children
				}),
				ol: ({ children, className: listClassName }) => /* @__PURE__ */ jsx("ol", {
					className: joinClasses$3("dc-md-ol", listClassName),
					children
				}),
				li: ({ children, className: itemClassName }) => /* @__PURE__ */ jsx("li", {
					className: joinClasses$3("dc-md-li", itemClassName),
					children
				}),
				blockquote: ({ children }) => {
					const calloutMatch = collectText(children).trim().match(/^([A-Za-z]+)\s*-\s*(.+)$/);
					const calloutType = calloutMatch ? calloutMatch[1].toLowerCase() : "";
					return /* @__PURE__ */ jsx("blockquote", {
						className: joinClasses$3("dc-md-blockquote", calloutMatch && "dc-md-callout"),
						"data-callout": calloutType || void 0,
						children
					});
				},
				code: (props) => {
					const { className: codeClassName, children } = props;
					const rawContent = collectText(children);
					if (!String(codeClassName || "").includes("language-") && !rawContent.includes("\n")) return /* @__PURE__ */ jsx("code", {
						className: "dc-md-code",
						children
					});
					return /* @__PURE__ */ jsx("code", {
						className: joinClasses$3("dc-md-code-block", codeClassName),
						children
					});
				},
				pre: ({ children }) => /* @__PURE__ */ jsx("pre", {
					className: "dc-md-pre",
					children
				}),
				a: ({ href, children }) => {
					const guideId = resolveGuideId(href, guidesIndex);
					if (guideId && onGuideLinkClick) return /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "dc-md-guide-link",
						onClick: () => onGuideLinkClick(guideId),
						children
					});
					if (href?.startsWith("guide://")) return /* @__PURE__ */ jsx("span", {
						className: "dc-md-guide-link dc-md-guide-link-static",
						children
					});
					return /* @__PURE__ */ jsx("a", {
						className: "dc-md-link",
						href,
						target: "_blank",
						rel: "noreferrer noopener",
						children
					});
				},
				img: ({ src, alt }) => /* @__PURE__ */ jsx("span", {
					className: "dc-md-image-wrap",
					children: /* @__PURE__ */ jsx("img", {
						className: "dc-md-image",
						src: src || "",
						alt: alt || "",
						loading: "lazy"
					})
				}),
				hr: () => /* @__PURE__ */ jsx("hr", { className: "dc-md-hr" }),
				table: ({ children }) => /* @__PURE__ */ jsx("div", {
					className: "dc-md-table-wrap",
					children: /* @__PURE__ */ jsx("table", {
						className: "dc-md-table",
						children
					})
				}),
				thead: ({ children }) => /* @__PURE__ */ jsx("thead", {
					className: "dc-md-thead",
					children
				}),
				tbody: ({ children }) => /* @__PURE__ */ jsx("tbody", {
					className: "dc-md-tbody",
					children
				}),
				tr: ({ children }) => /* @__PURE__ */ jsx("tr", {
					className: "dc-md-tr",
					children
				}),
				th: ({ children }) => /* @__PURE__ */ jsx("th", {
					className: "dc-md-th",
					children
				}),
				td: ({ children }) => /* @__PURE__ */ jsx("td", {
					className: "dc-md-td",
					children
				}),
				input: ({ checked, disabled }) => /* @__PURE__ */ jsx("input", {
					className: "dc-md-checkbox",
					type: "checkbox",
					checked,
					disabled: disabled ?? true,
					readOnly: true
				})
			},
			children: markdown
		})
	});
}
//#endregion
//#region ../../lib/api/errors.ts
var ApiError = class extends Error {
	constructor(message, status, code) {
		super(message);
		this.status = status;
		this.code = code;
		this.name = "ApiError";
	}
};
function handleApiError(error) {
	if (error instanceof ApiError) switch (error.status) {
		case 401: return "Требуется авторизация";
		case 403: return "Доступ запрещён";
		case 404: return "Не найдено";
		case 500: return "Ошибка сервера";
		default: return error.message;
	}
	if (error instanceof ZodError) return "Некорректные данные от сервера";
	if (error instanceof Error) return error.message;
	return "Неизвестная ошибка";
}
//#endregion
//#region ../../node_modules/react-hook-form/dist/index.esm.mjs
var isCheckBoxInput = (element) => element.type === "checkbox";
var isDateObject = (value) => value instanceof Date;
var isNullOrUndefined = (value) => value == null;
var isObjectType = (value) => typeof value === "object";
var isObject = (value) => !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value);
var getEventValue = (event) => isObject(event) && event.target ? isCheckBoxInput(event.target) ? event.target.checked : event.target.value : event;
var getNodeParentName = (name) => name.substring(0, name.search(/\.\d+(\.|$)/)) || name;
var isNameInFieldArray = (names, name) => names.has(getNodeParentName(name));
var isPlainObject = (tempObject) => {
	const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
	return isObject(prototypeCopy) && prototypeCopy.hasOwnProperty("isPrototypeOf");
};
var isWeb = typeof window !== "undefined" && typeof window.HTMLElement !== "undefined" && typeof document !== "undefined";
function cloneObject(data) {
	if (data instanceof Date) return new Date(data);
	const isFileListInstance = typeof FileList !== "undefined" && data instanceof FileList;
	if (isWeb && (data instanceof Blob || isFileListInstance)) return data;
	const isArray = Array.isArray(data);
	if (!isArray && !(isObject(data) && isPlainObject(data))) return data;
	const copy = isArray ? [] : Object.create(Object.getPrototypeOf(data));
	for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) copy[key] = cloneObject(data[key]);
	return copy;
}
var isKey = (value) => /^\w*$/.test(value);
var isUndefined = (val) => val === void 0;
var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
var stringToPath = (input) => compact(input.replace(/["|']|\]/g, "").split(/\.|\[/));
var get = (object, path, defaultValue) => {
	if (!path || !isObject(object)) return defaultValue;
	const result = (isKey(path) ? [path] : stringToPath(path)).reduce((result, key) => isNullOrUndefined(result) ? result : result[key], object);
	return isUndefined(result) || result === object ? isUndefined(object[path]) ? defaultValue : object[path] : result;
};
var isBoolean = (value) => typeof value === "boolean";
var isFunction = (value) => typeof value === "function";
var set = (object, path, value) => {
	let index = -1;
	const tempPath = isKey(path) ? [path] : stringToPath(path);
	const length = tempPath.length;
	const lastIndex = length - 1;
	while (++index < length) {
		const key = tempPath[index];
		let newValue = value;
		if (index !== lastIndex) {
			const objValue = object[key];
			newValue = isObject(objValue) || Array.isArray(objValue) ? objValue : !isNaN(+tempPath[index + 1]) ? [] : {};
		}
		if (key === "__proto__" || key === "constructor" || key === "prototype") return;
		object[key] = newValue;
		object = object[key];
	}
};
var EVENTS = {
	BLUR: "blur",
	FOCUS_OUT: "focusout",
	CHANGE: "change"
};
var VALIDATION_MODE = {
	onBlur: "onBlur",
	onChange: "onChange",
	onSubmit: "onSubmit",
	onTouched: "onTouched",
	all: "all"
};
var INPUT_VALIDATION_RULES = {
	max: "max",
	min: "min",
	maxLength: "maxLength",
	minLength: "minLength",
	pattern: "pattern",
	required: "required",
	validate: "validate"
};
var HookFormContext = React.createContext(null);
HookFormContext.displayName = "HookFormContext";
var getProxyFormState = (formState, control, localProxyFormState, isRoot = true) => {
	const result = { defaultValues: control._defaultValues };
	for (const key in formState) Object.defineProperty(result, key, { get: () => {
		const _key = key;
		if (control._proxyFormState[_key] !== VALIDATION_MODE.all) control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
		localProxyFormState && (localProxyFormState[_key] = true);
		return formState[_key];
	} });
	return result;
};
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
var isString = (value) => typeof value === "string";
var generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) => {
	if (isString(names)) {
		isGlobal && _names.watch.add(names);
		return get(formValues, names, defaultValue);
	}
	if (Array.isArray(names)) return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)));
	isGlobal && (_names.watchAll = true);
	return formValues;
};
var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);
function deepEqual(object1, object2, _internal_visited = /* @__PURE__ */ new WeakSet()) {
	if (isPrimitive(object1) || isPrimitive(object2)) return Object.is(object1, object2);
	if (isDateObject(object1) && isDateObject(object2)) return Object.is(object1.getTime(), object2.getTime());
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);
	if (keys1.length !== keys2.length) return false;
	if (_internal_visited.has(object1) || _internal_visited.has(object2)) return true;
	_internal_visited.add(object1);
	_internal_visited.add(object2);
	for (const key of keys1) {
		const val1 = object1[key];
		if (!keys2.includes(key)) return false;
		if (key !== "ref") {
			const val2 = object2[key];
			if (isDateObject(val1) && isDateObject(val2) || isObject(val1) && isObject(val2) || Array.isArray(val1) && Array.isArray(val2) ? !deepEqual(val1, val2, _internal_visited) : !Object.is(val1, val2)) return false;
		}
	}
	return true;
}
var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria ? {
	...errors[name],
	types: {
		...errors[name] && errors[name].types ? errors[name].types : {},
		[type]: message || true
	}
} : {};
var convertToArrayPayload = (value) => Array.isArray(value) ? value : [value];
var createSubject = () => {
	let _observers = [];
	const next = (value) => {
		for (const observer of _observers) observer.next && observer.next(value);
	};
	const subscribe = (observer) => {
		_observers.push(observer);
		return { unsubscribe: () => {
			_observers = _observers.filter((o) => o !== observer);
		} };
	};
	const unsubscribe = () => {
		_observers = [];
	};
	return {
		get observers() {
			return _observers;
		},
		next,
		subscribe,
		unsubscribe
	};
};
function extractFormValues(fieldsState, formValues) {
	const values = {};
	for (const key in fieldsState) if (fieldsState.hasOwnProperty(key)) {
		const fieldState = fieldsState[key];
		const fieldValue = formValues[key];
		if (fieldState && isObject(fieldState) && fieldValue) {
			const nestedFieldsState = extractFormValues(fieldState, fieldValue);
			if (isObject(nestedFieldsState)) values[key] = nestedFieldsState;
		} else if (fieldsState[key]) values[key] = fieldValue;
	}
	return values;
}
var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;
var isFileInput = (element) => element.type === "file";
var isHTMLElement = (value) => {
	if (!isWeb) return false;
	const owner = value ? value.ownerDocument : 0;
	return value instanceof (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement);
};
var isMultipleSelect = (element) => element.type === `select-multiple`;
var isRadioInput = (element) => element.type === "radio";
var isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);
var live = (ref) => isHTMLElement(ref) && ref.isConnected;
function baseGet(object, updatePath) {
	const length = updatePath.slice(0, -1).length;
	let index = 0;
	while (index < length) object = isUndefined(object) ? index++ : object[updatePath[index++]];
	return object;
}
function isEmptyArray(obj) {
	for (const key in obj) if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) return false;
	return true;
}
function unset(object, path) {
	const paths = Array.isArray(path) ? path : isKey(path) ? [path] : stringToPath(path);
	const childObject = paths.length === 1 ? object : baseGet(object, paths);
	const index = paths.length - 1;
	const key = paths[index];
	if (childObject) delete childObject[key];
	if (index !== 0 && (isObject(childObject) && isEmptyObject(childObject) || Array.isArray(childObject) && isEmptyArray(childObject))) unset(object, paths.slice(0, -1));
	return object;
}
var objectHasFunction = (data) => {
	for (const key in data) if (isFunction(data[key])) return true;
	return false;
};
function isTraversable(value) {
	return Array.isArray(value) || isObject(value) && !objectHasFunction(value);
}
function markFieldsDirty(data, fields = {}) {
	for (const key in data) {
		const value = data[key];
		if (isTraversable(value)) {
			fields[key] = Array.isArray(value) ? [] : {};
			markFieldsDirty(value, fields[key]);
		} else if (!isUndefined(value)) fields[key] = true;
	}
	return fields;
}
function getDirtyFields(data, formValues, dirtyFieldsFromValues) {
	if (!dirtyFieldsFromValues) dirtyFieldsFromValues = markFieldsDirty(formValues);
	for (const key in data) {
		const value = data[key];
		if (isTraversable(value)) if (isUndefined(formValues) || isPrimitive(dirtyFieldsFromValues[key])) dirtyFieldsFromValues[key] = markFieldsDirty(value, Array.isArray(value) ? [] : {});
		else getDirtyFields(value, isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key]);
		else {
			const formValue = formValues[key];
			dirtyFieldsFromValues[key] = !deepEqual(value, formValue);
		}
	}
	return dirtyFieldsFromValues;
}
var defaultResult = {
	value: false,
	isValid: false
};
var validResult = {
	value: true,
	isValid: true
};
var getCheckboxValue = (options) => {
	if (Array.isArray(options)) {
		if (options.length > 1) {
			const values = options.filter((option) => option && option.checked && !option.disabled).map((option) => option.value);
			return {
				value: values,
				isValid: !!values.length
			};
		}
		return options[0].checked && !options[0].disabled ? options[0].attributes && !isUndefined(options[0].attributes.value) ? isUndefined(options[0].value) || options[0].value === "" ? validResult : {
			value: options[0].value,
			isValid: true
		} : validResult : defaultResult;
	}
	return defaultResult;
};
var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => isUndefined(value) ? value : valueAsNumber ? value === "" ? NaN : value ? +value : value : valueAsDate && isString(value) ? new Date(value) : setValueAs ? setValueAs(value) : value;
var defaultReturn = {
	isValid: false,
	value: null
};
var getRadioValue = (options) => Array.isArray(options) ? options.reduce((previous, option) => option && option.checked && !option.disabled ? {
	isValid: true,
	value: option.value
} : previous, defaultReturn) : defaultReturn;
function getFieldValue(_f) {
	const ref = _f.ref;
	if (isFileInput(ref)) return ref.files;
	if (isRadioInput(ref)) return getRadioValue(_f.refs).value;
	if (isMultipleSelect(ref)) return [...ref.selectedOptions].map(({ value }) => value);
	if (isCheckBoxInput(ref)) return getCheckboxValue(_f.refs).value;
	return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
}
var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
	const fields = {};
	for (const name of fieldsNames) {
		const field = get(_fields, name);
		field && set(fields, name, field._f);
	}
	return {
		criteriaMode,
		names: [...fieldsNames],
		fields,
		shouldUseNativeValidation
	};
};
var isRegex = (value) => value instanceof RegExp;
var getRuleValue = (rule) => isUndefined(rule) ? rule : isRegex(rule) ? rule.source : isObject(rule) ? isRegex(rule.value) ? rule.value.source : rule.value : rule;
var getValidationModes = (mode) => ({
	isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
	isOnBlur: mode === VALIDATION_MODE.onBlur,
	isOnChange: mode === VALIDATION_MODE.onChange,
	isOnAll: mode === VALIDATION_MODE.all,
	isOnTouch: mode === VALIDATION_MODE.onTouched
});
var ASYNC_FUNCTION = "AsyncFunction";
var hasPromiseValidation = (fieldReference) => !!fieldReference && !!fieldReference.validate && !!(isFunction(fieldReference.validate) && fieldReference.validate.constructor.name === ASYNC_FUNCTION || isObject(fieldReference.validate) && Object.values(fieldReference.validate).find((validateFunction) => validateFunction.constructor.name === ASYNC_FUNCTION));
var hasValidation = (options) => options.mount && (options.required || options.min || options.max || options.maxLength || options.minLength || options.pattern || options.validate);
var isWatched = (name, _names, isBlurEvent) => !isBlurEvent && (_names.watchAll || _names.watch.has(name) || [..._names.watch].some((watchName) => name.startsWith(watchName) && /^\.\w+/.test(name.slice(watchName.length))));
var iterateFieldsByAction = (fields, action, fieldsNames, abortEarly) => {
	for (const key of fieldsNames || Object.keys(fields)) {
		const field = get(fields, key);
		if (field) {
			const { _f, ...currentField } = field;
			if (_f) {
				if (_f.refs && _f.refs[0] && action(_f.refs[0], key) && !abortEarly) return true;
				else if (_f.ref && action(_f.ref, _f.name) && !abortEarly) return true;
				else if (iterateFieldsByAction(currentField, action)) break;
			} else if (isObject(currentField)) {
				if (iterateFieldsByAction(currentField, action)) break;
			}
		}
	}
};
function schemaErrorLookup(errors, _fields, name) {
	const error = get(errors, name);
	if (error || isKey(name)) return {
		error,
		name
	};
	const names = name.split(".");
	while (names.length) {
		const fieldName = names.join(".");
		const field = get(_fields, fieldName);
		const foundError = get(errors, fieldName);
		if (field && !Array.isArray(field) && name !== fieldName) return { name };
		if (foundError && foundError.type) return {
			name: fieldName,
			error: foundError
		};
		if (foundError && foundError.root && foundError.root.type) return {
			name: `${fieldName}.root`,
			error: foundError.root
		};
		names.pop();
	}
	return { name };
}
var shouldRenderFormState = (formStateData, _proxyFormState, updateFormState, isRoot) => {
	updateFormState(formStateData);
	const { name, ...formState } = formStateData;
	return isEmptyObject(formState) || Object.keys(formState).length >= Object.keys(_proxyFormState).length || Object.keys(formState).find((key) => _proxyFormState[key] === (!isRoot || VALIDATION_MODE.all));
};
var shouldSubscribeByName = (name, signalName, exact) => !name || !signalName || name === signalName || convertToArrayPayload(name).some((currentName) => currentName && (exact ? currentName === signalName : currentName.startsWith(signalName) || signalName.startsWith(currentName)));
var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
	if (mode.isOnAll) return false;
	else if (!isSubmitted && mode.isOnTouch) return !(isTouched || isBlurEvent);
	else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) return !isBlurEvent;
	else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) return isBlurEvent;
	return true;
};
var unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name);
var updateFieldArrayRootError = (errors, error, name) => {
	const fieldArrayErrors = convertToArrayPayload(get(errors, name));
	set(fieldArrayErrors, "root", error[name]);
	set(errors, name, fieldArrayErrors);
	return errors;
};
function getValidateError(result, ref, type = "validate") {
	if (isString(result) || Array.isArray(result) && result.every(isString) || isBoolean(result) && !result) return {
		type,
		message: isString(result) ? result : "",
		ref
	};
}
var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData) ? validationData : {
	value: validationData,
	message: ""
};
var validateField = async (field, disabledFieldNames, formValues, validateAllFieldCriteria, shouldUseNativeValidation, isFieldArray) => {
	const { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, valueAsNumber, mount } = field._f;
	const inputValue = get(formValues, name);
	if (!mount || disabledFieldNames.has(name)) return {};
	const inputRef = refs ? refs[0] : ref;
	const setCustomValidity = (message) => {
		if (shouldUseNativeValidation && inputRef.reportValidity) {
			inputRef.setCustomValidity(isBoolean(message) ? "" : message || "");
			inputRef.reportValidity();
		}
	};
	const error = {};
	const isRadio = isRadioInput(ref);
	const isCheckBox = isCheckBoxInput(ref);
	const isRadioOrCheckbox = isRadio || isCheckBox;
	const isEmpty = (valueAsNumber || isFileInput(ref)) && isUndefined(ref.value) && isUndefined(inputValue) || isHTMLElement(ref) && ref.value === "" || inputValue === "" || Array.isArray(inputValue) && !inputValue.length;
	const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
	const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
		const message = exceedMax ? maxLengthMessage : minLengthMessage;
		error[name] = {
			type: exceedMax ? maxType : minType,
			message,
			ref,
			...appendErrorsCurry(exceedMax ? maxType : minType, message)
		};
	};
	if (isFieldArray ? !Array.isArray(inputValue) || !inputValue.length : required && (!isRadioOrCheckbox && (isEmpty || isNullOrUndefined(inputValue)) || isBoolean(inputValue) && !inputValue || isCheckBox && !getCheckboxValue(refs).isValid || isRadio && !getRadioValue(refs).isValid)) {
		const { value, message } = isString(required) ? {
			value: !!required,
			message: required
		} : getValueAndMessage(required);
		if (value) {
			error[name] = {
				type: INPUT_VALIDATION_RULES.required,
				message,
				ref: inputRef,
				...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message)
			};
			if (!validateAllFieldCriteria) {
				setCustomValidity(message);
				return error;
			}
		}
	}
	if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
		let exceedMax;
		let exceedMin;
		const maxOutput = getValueAndMessage(max);
		const minOutput = getValueAndMessage(min);
		if (!isNullOrUndefined(inputValue) && !isNaN(inputValue)) {
			const valueNumber = ref.valueAsNumber || (inputValue ? +inputValue : inputValue);
			if (!isNullOrUndefined(maxOutput.value)) exceedMax = valueNumber > maxOutput.value;
			if (!isNullOrUndefined(minOutput.value)) exceedMin = valueNumber < minOutput.value;
		} else {
			const valueDate = ref.valueAsDate || new Date(inputValue);
			const convertTimeToDate = (time) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + time);
			const isTime = ref.type == "time";
			const isWeek = ref.type == "week";
			if (isString(maxOutput.value) && inputValue) exceedMax = isTime ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value) : isWeek ? inputValue > maxOutput.value : valueDate > new Date(maxOutput.value);
			if (isString(minOutput.value) && inputValue) exceedMin = isTime ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value) : isWeek ? inputValue < minOutput.value : valueDate < new Date(minOutput.value);
		}
		if (exceedMax || exceedMin) {
			getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
			if (!validateAllFieldCriteria) {
				setCustomValidity(error[name].message);
				return error;
			}
		}
	}
	if ((maxLength || minLength) && !isEmpty && (isString(inputValue) || isFieldArray && Array.isArray(inputValue))) {
		const maxLengthOutput = getValueAndMessage(maxLength);
		const minLengthOutput = getValueAndMessage(minLength);
		const exceedMax = !isNullOrUndefined(maxLengthOutput.value) && inputValue.length > +maxLengthOutput.value;
		const exceedMin = !isNullOrUndefined(minLengthOutput.value) && inputValue.length < +minLengthOutput.value;
		if (exceedMax || exceedMin) {
			getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
			if (!validateAllFieldCriteria) {
				setCustomValidity(error[name].message);
				return error;
			}
		}
	}
	if (pattern && !isEmpty && isString(inputValue)) {
		const { value: patternValue, message } = getValueAndMessage(pattern);
		if (isRegex(patternValue) && !inputValue.match(patternValue)) {
			error[name] = {
				type: INPUT_VALIDATION_RULES.pattern,
				message,
				ref,
				...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message)
			};
			if (!validateAllFieldCriteria) {
				setCustomValidity(message);
				return error;
			}
		}
	}
	if (validate) {
		if (isFunction(validate)) {
			const validateError = getValidateError(await validate(inputValue, formValues), inputRef);
			if (validateError) {
				error[name] = {
					...validateError,
					...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message)
				};
				if (!validateAllFieldCriteria) {
					setCustomValidity(validateError.message);
					return error;
				}
			}
		} else if (isObject(validate)) {
			let validationResult = {};
			for (const key in validate) {
				if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) break;
				const validateError = getValidateError(await validate[key](inputValue, formValues), inputRef, key);
				if (validateError) {
					validationResult = {
						...validateError,
						...appendErrorsCurry(key, validateError.message)
					};
					setCustomValidity(validateError.message);
					if (validateAllFieldCriteria) error[name] = validationResult;
				}
			}
			if (!isEmptyObject(validationResult)) {
				error[name] = {
					ref: inputRef,
					...validationResult
				};
				if (!validateAllFieldCriteria) return error;
			}
		}
	}
	setCustomValidity(true);
	return error;
};
var defaultOptions = {
	mode: VALIDATION_MODE.onSubmit,
	reValidateMode: VALIDATION_MODE.onChange,
	shouldFocusError: true
};
function createFormControl(props = {}) {
	let _options = {
		...defaultOptions,
		...props
	};
	let _formState = {
		submitCount: 0,
		isDirty: false,
		isReady: false,
		isLoading: isFunction(_options.defaultValues),
		isValidating: false,
		isSubmitted: false,
		isSubmitting: false,
		isSubmitSuccessful: false,
		isValid: false,
		touchedFields: {},
		dirtyFields: {},
		validatingFields: {},
		errors: _options.errors || {},
		disabled: _options.disabled || false
	};
	let _fields = {};
	let _defaultValues = isObject(_options.defaultValues) || isObject(_options.values) ? cloneObject(_options.defaultValues || _options.values) || {} : {};
	let _formValues = _options.shouldUnregister ? {} : cloneObject(_defaultValues);
	let _state = {
		action: false,
		mount: false,
		watch: false,
		keepIsValid: false
	};
	let _names = {
		mount: /* @__PURE__ */ new Set(),
		disabled: /* @__PURE__ */ new Set(),
		unMount: /* @__PURE__ */ new Set(),
		array: /* @__PURE__ */ new Set(),
		watch: /* @__PURE__ */ new Set()
	};
	let delayErrorCallback;
	let timer = 0;
	const defaultProxyFormState = {
		isDirty: false,
		dirtyFields: false,
		validatingFields: false,
		touchedFields: false,
		isValidating: false,
		isValid: false,
		errors: false
	};
	const _proxyFormState = { ...defaultProxyFormState };
	let _proxySubscribeFormState = { ..._proxyFormState };
	const _subjects = {
		array: createSubject(),
		state: createSubject()
	};
	const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
	const debounce = (callback) => (wait) => {
		clearTimeout(timer);
		timer = setTimeout(callback, wait);
	};
	const _setValid = async (shouldUpdateValid) => {
		if (_state.keepIsValid) return;
		if (!_options.disabled && (_proxyFormState.isValid || _proxySubscribeFormState.isValid || shouldUpdateValid)) {
			let isValid;
			if (_options.resolver) {
				isValid = isEmptyObject((await _runSchema()).errors);
				_updateIsValidating();
			} else isValid = await executeBuiltInValidation(_fields, true);
			if (isValid !== _formState.isValid) _subjects.state.next({ isValid });
		}
	};
	const _updateIsValidating = (names, isValidating) => {
		if (!_options.disabled && (_proxyFormState.isValidating || _proxyFormState.validatingFields || _proxySubscribeFormState.isValidating || _proxySubscribeFormState.validatingFields)) {
			(names || Array.from(_names.mount)).forEach((name) => {
				if (name) isValidating ? set(_formState.validatingFields, name, isValidating) : unset(_formState.validatingFields, name);
			});
			_subjects.state.next({
				validatingFields: _formState.validatingFields,
				isValidating: !isEmptyObject(_formState.validatingFields)
			});
		}
	};
	const _setFieldArray = (name, values = [], method, args, shouldSetValues = true, shouldUpdateFieldsAndState = true) => {
		if (args && method && !_options.disabled) {
			_state.action = true;
			if (shouldUpdateFieldsAndState && Array.isArray(get(_fields, name))) {
				const fieldValues = method(get(_fields, name), args.argA, args.argB);
				shouldSetValues && set(_fields, name, fieldValues);
			}
			if (shouldUpdateFieldsAndState && Array.isArray(get(_formState.errors, name))) {
				const errors = method(get(_formState.errors, name), args.argA, args.argB);
				shouldSetValues && set(_formState.errors, name, errors);
				unsetEmptyArray(_formState.errors, name);
			}
			if ((_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && shouldUpdateFieldsAndState && Array.isArray(get(_formState.touchedFields, name))) {
				const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
				shouldSetValues && set(_formState.touchedFields, name, touchedFields);
			}
			if (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
			_subjects.state.next({
				name,
				isDirty: _getDirty(name, values),
				dirtyFields: _formState.dirtyFields,
				errors: _formState.errors,
				isValid: _formState.isValid
			});
		} else set(_formValues, name, values);
	};
	const updateErrors = (name, error) => {
		set(_formState.errors, name, error);
		_subjects.state.next({ errors: _formState.errors });
	};
	const _setErrors = (errors) => {
		_formState.errors = errors;
		_subjects.state.next({
			errors: _formState.errors,
			isValid: false
		});
	};
	const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
		const field = get(_fields, name);
		if (field) {
			const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
			isUndefined(defaultValue) || ref && ref.defaultChecked || shouldSkipSetValueAs ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f)) : setFieldValue(name, defaultValue);
			_state.mount && !_state.action && _setValid();
		}
	};
	const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
		let shouldUpdateField = false;
		let isPreviousDirty = false;
		const output = { name };
		if (!_options.disabled) {
			if (!isBlurEvent || shouldDirty) {
				if (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty) {
					isPreviousDirty = _formState.isDirty;
					_formState.isDirty = output.isDirty = _getDirty();
					shouldUpdateField = isPreviousDirty !== output.isDirty;
				}
				const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
				isPreviousDirty = !!get(_formState.dirtyFields, name);
				isCurrentFieldPristine ? unset(_formState.dirtyFields, name) : set(_formState.dirtyFields, name, true);
				output.dirtyFields = _formState.dirtyFields;
				shouldUpdateField = shouldUpdateField || (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) && isPreviousDirty !== !isCurrentFieldPristine;
			}
			if (isBlurEvent) {
				const isPreviousFieldTouched = get(_formState.touchedFields, name);
				if (!isPreviousFieldTouched) {
					set(_formState.touchedFields, name, isBlurEvent);
					output.touchedFields = _formState.touchedFields;
					shouldUpdateField = shouldUpdateField || (_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && isPreviousFieldTouched !== isBlurEvent;
				}
			}
			shouldUpdateField && shouldRender && _subjects.state.next(output);
		}
		return shouldUpdateField ? output : {};
	};
	const shouldRenderByError = (name, isValid, error, fieldState) => {
		const previousFieldError = get(_formState.errors, name);
		const shouldUpdateValid = (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isBoolean(isValid) && _formState.isValid !== isValid;
		if (_options.delayError && error) {
			delayErrorCallback = debounce(() => updateErrors(name, error));
			delayErrorCallback(_options.delayError);
		} else {
			clearTimeout(timer);
			delayErrorCallback = null;
			error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
		}
		if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) || !isEmptyObject(fieldState) || shouldUpdateValid) {
			const updatedFormState = {
				...fieldState,
				...shouldUpdateValid && isBoolean(isValid) ? { isValid } : {},
				errors: _formState.errors,
				name
			};
			_formState = {
				..._formState,
				...updatedFormState
			};
			_subjects.state.next(updatedFormState);
		}
	};
	const _runSchema = async (name) => {
		_updateIsValidating(name, true);
		return await _options.resolver(_formValues, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation));
	};
	const executeSchemaAndUpdateState = async (names) => {
		const { errors } = await _runSchema(names);
		_updateIsValidating(names);
		if (names) for (const name of names) {
			const error = get(errors, name);
			error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
		}
		else _formState.errors = errors;
		return errors;
	};
	const executeBuiltInValidation = async (fields, shouldOnlyCheckValid, context = { valid: true }) => {
		for (const name in fields) {
			const field = fields[name];
			if (field) {
				const { _f, ...fieldValue } = field;
				if (_f) {
					const isFieldArrayRoot = _names.array.has(_f.name);
					const isPromiseFunction = field._f && hasPromiseValidation(field._f);
					if (isPromiseFunction && _proxyFormState.validatingFields) _updateIsValidating([_f.name], true);
					const fieldError = await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation && !shouldOnlyCheckValid, isFieldArrayRoot);
					if (isPromiseFunction && _proxyFormState.validatingFields) _updateIsValidating([_f.name]);
					if (fieldError[_f.name]) {
						context.valid = false;
						if (shouldOnlyCheckValid || props.shouldUseNativeValidation) break;
					}
					!shouldOnlyCheckValid && (get(fieldError, _f.name) ? isFieldArrayRoot ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name) : set(_formState.errors, _f.name, fieldError[_f.name]) : unset(_formState.errors, _f.name));
				}
				!isEmptyObject(fieldValue) && await executeBuiltInValidation(fieldValue, shouldOnlyCheckValid, context);
			}
		}
		return context.valid;
	};
	const _removeUnmounted = () => {
		for (const name of _names.unMount) {
			const field = get(_fields, name);
			field && (field._f.refs ? field._f.refs.every((ref) => !live(ref)) : !live(field._f.ref)) && unregister(name);
		}
		_names.unMount = /* @__PURE__ */ new Set();
	};
	const _getDirty = (name, data) => !_options.disabled && (name && data && set(_formValues, name, data), !deepEqual(getValues(), _defaultValues));
	const _getWatch = (names, defaultValue, isGlobal) => generateWatchOutput(names, _names, { ..._state.mount ? _formValues : isUndefined(defaultValue) ? _defaultValues : isString(names) ? { [names]: defaultValue } : defaultValue }, isGlobal, defaultValue);
	const _getFieldArray = (name) => compact(get(_state.mount ? _formValues : _defaultValues, name, _options.shouldUnregister ? get(_defaultValues, name, []) : []));
	const setFieldValue = (name, value, options = {}) => {
		const field = get(_fields, name);
		let fieldValue = value;
		if (field) {
			const fieldReference = field._f;
			if (fieldReference) {
				!fieldReference.disabled && set(_formValues, name, getFieldValueAs(value, fieldReference));
				fieldValue = isHTMLElement(fieldReference.ref) && isNullOrUndefined(value) ? "" : value;
				if (isMultipleSelect(fieldReference.ref)) [...fieldReference.ref.options].forEach((optionRef) => optionRef.selected = fieldValue.includes(optionRef.value));
				else if (fieldReference.refs) if (isCheckBoxInput(fieldReference.ref)) fieldReference.refs.forEach((checkboxRef) => {
					if (!checkboxRef.defaultChecked || !checkboxRef.disabled) if (Array.isArray(fieldValue)) checkboxRef.checked = !!fieldValue.find((data) => data === checkboxRef.value);
					else checkboxRef.checked = fieldValue === checkboxRef.value || !!fieldValue;
				});
				else fieldReference.refs.forEach((radioRef) => radioRef.checked = radioRef.value === fieldValue);
				else if (isFileInput(fieldReference.ref)) fieldReference.ref.value = "";
				else {
					fieldReference.ref.value = fieldValue;
					if (!fieldReference.ref.type) _subjects.state.next({
						name,
						values: cloneObject(_formValues)
					});
				}
			}
		}
		(options.shouldDirty || options.shouldTouch) && updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, true);
		options.shouldValidate && trigger(name);
	};
	const setValues = (name, value, options) => {
		for (const fieldKey in value) {
			if (!value.hasOwnProperty(fieldKey)) return;
			const fieldValue = value[fieldKey];
			const fieldName = name + "." + fieldKey;
			const field = get(_fields, fieldName);
			(_names.array.has(name) || isObject(fieldValue) || field && !field._f) && !isDateObject(fieldValue) ? setValues(fieldName, fieldValue, options) : setFieldValue(fieldName, fieldValue, options);
		}
	};
	const setValue = (name, value, options = {}) => {
		const field = get(_fields, name);
		const isFieldArray = _names.array.has(name);
		const cloneValue = cloneObject(value);
		set(_formValues, name, cloneValue);
		if (isFieldArray) {
			_subjects.array.next({
				name,
				values: cloneObject(_formValues)
			});
			if ((_proxyFormState.isDirty || _proxyFormState.dirtyFields || _proxySubscribeFormState.isDirty || _proxySubscribeFormState.dirtyFields) && options.shouldDirty) _subjects.state.next({
				name,
				dirtyFields: getDirtyFields(_defaultValues, _formValues),
				isDirty: _getDirty(name, cloneValue)
			});
		} else field && !field._f && !isNullOrUndefined(cloneValue) ? setValues(name, cloneValue, options) : setFieldValue(name, cloneValue, options);
		if (isWatched(name, _names)) _subjects.state.next({
			..._formState,
			name,
			values: cloneObject(_formValues)
		});
		else _subjects.state.next({
			name: _state.mount ? name : void 0,
			values: cloneObject(_formValues)
		});
	};
	const onChange = async (event) => {
		_state.mount = true;
		const target = event.target;
		let name = target.name;
		let isFieldValueUpdated = true;
		const field = get(_fields, name);
		const _updateIsFieldValueUpdated = (fieldValue) => {
			isFieldValueUpdated = Number.isNaN(fieldValue) || isDateObject(fieldValue) && isNaN(fieldValue.getTime()) || deepEqual(fieldValue, get(_formValues, name, fieldValue));
		};
		const validationModeBeforeSubmit = getValidationModes(_options.mode);
		const validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
		if (field) {
			let error;
			let isValid;
			const fieldValue = target.type ? getFieldValue(field._f) : getEventValue(event);
			const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
			const shouldSkipValidation = !hasValidation(field._f) && !_options.resolver && !get(_formState.errors, name) && !field._f.deps || skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, validationModeAfterSubmit, validationModeBeforeSubmit);
			const watched = isWatched(name, _names, isBlurEvent);
			set(_formValues, name, fieldValue);
			if (isBlurEvent) {
				if (!target || !target.readOnly) {
					field._f.onBlur && field._f.onBlur(event);
					delayErrorCallback && delayErrorCallback(0);
				}
			} else if (field._f.onChange) field._f.onChange(event);
			const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent);
			const shouldRender = !isEmptyObject(fieldState) || watched;
			!isBlurEvent && _subjects.state.next({
				name,
				type: event.type,
				values: cloneObject(_formValues)
			});
			if (shouldSkipValidation) {
				if (_proxyFormState.isValid || _proxySubscribeFormState.isValid) {
					if (_options.mode === "onBlur") {
						if (isBlurEvent) _setValid();
					} else if (!isBlurEvent) _setValid();
				}
				return shouldRender && _subjects.state.next({
					name,
					...watched ? {} : fieldState
				});
			}
			!isBlurEvent && watched && _subjects.state.next({ ..._formState });
			if (_options.resolver) {
				const { errors } = await _runSchema([name]);
				_updateIsValidating([name]);
				_updateIsFieldValueUpdated(fieldValue);
				if (isFieldValueUpdated) {
					const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
					const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
					error = errorLookupResult.error;
					name = errorLookupResult.name;
					isValid = isEmptyObject(errors);
				}
			} else {
				_updateIsValidating([name], true);
				error = (await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
				_updateIsValidating([name]);
				_updateIsFieldValueUpdated(fieldValue);
				if (isFieldValueUpdated) {
					if (error) isValid = false;
					else if (_proxyFormState.isValid || _proxySubscribeFormState.isValid) isValid = await executeBuiltInValidation(_fields, true);
				}
			}
			if (isFieldValueUpdated) {
				field._f.deps && (!Array.isArray(field._f.deps) || field._f.deps.length > 0) && trigger(field._f.deps);
				shouldRenderByError(name, isValid, error, fieldState);
			}
		}
	};
	const _focusInput = (ref, key) => {
		if (get(_formState.errors, key) && ref.focus) {
			ref.focus();
			return 1;
		}
	};
	const trigger = async (name, options = {}) => {
		let isValid;
		let validationResult;
		const fieldNames = convertToArrayPayload(name);
		if (_options.resolver) {
			const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
			isValid = isEmptyObject(errors);
			validationResult = name ? !fieldNames.some((name) => get(errors, name)) : isValid;
		} else if (name) {
			validationResult = (await Promise.all(fieldNames.map(async (fieldName) => {
				const field = get(_fields, fieldName);
				return await executeBuiltInValidation(field && field._f ? { [fieldName]: field } : field);
			}))).every(Boolean);
			!(!validationResult && !_formState.isValid) && _setValid();
		} else validationResult = isValid = await executeBuiltInValidation(_fields);
		_subjects.state.next({
			...!isString(name) || (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isValid !== _formState.isValid ? {} : { name },
			..._options.resolver || !name ? { isValid } : {},
			errors: _formState.errors
		});
		options.shouldFocus && !validationResult && iterateFieldsByAction(_fields, _focusInput, name ? fieldNames : _names.mount);
		return validationResult;
	};
	const getValues = (fieldNames, config) => {
		let values = { ..._state.mount ? _formValues : _defaultValues };
		if (config) values = extractFormValues(config.dirtyFields ? _formState.dirtyFields : _formState.touchedFields, values);
		return isUndefined(fieldNames) ? values : isString(fieldNames) ? get(values, fieldNames) : fieldNames.map((name) => get(values, name));
	};
	const getFieldState = (name, formState) => ({
		invalid: !!get((formState || _formState).errors, name),
		isDirty: !!get((formState || _formState).dirtyFields, name),
		error: get((formState || _formState).errors, name),
		isValidating: !!get(_formState.validatingFields, name),
		isTouched: !!get((formState || _formState).touchedFields, name)
	});
	const clearErrors = (name) => {
		name && convertToArrayPayload(name).forEach((inputName) => unset(_formState.errors, inputName));
		_subjects.state.next({ errors: name ? _formState.errors : {} });
	};
	const setError = (name, error, options) => {
		const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
		const { ref: currentRef, message, type, ...restOfErrorTree } = get(_formState.errors, name) || {};
		set(_formState.errors, name, {
			...restOfErrorTree,
			...error,
			ref
		});
		_subjects.state.next({
			name,
			errors: _formState.errors,
			isValid: false
		});
		options && options.shouldFocus && ref && ref.focus && ref.focus();
	};
	const watch = (name, defaultValue) => isFunction(name) ? _subjects.state.subscribe({ next: (payload) => "values" in payload && name(_getWatch(void 0, defaultValue), payload) }) : _getWatch(name, defaultValue, true);
	const _subscribe = (props) => _subjects.state.subscribe({ next: (formState) => {
		if (shouldSubscribeByName(props.name, formState.name, props.exact) && shouldRenderFormState(formState, props.formState || _proxyFormState, _setFormState, props.reRenderRoot)) props.callback({
			values: { ..._formValues },
			..._formState,
			...formState,
			defaultValues: _defaultValues
		});
	} }).unsubscribe;
	const subscribe = (props) => {
		_state.mount = true;
		_proxySubscribeFormState = {
			..._proxySubscribeFormState,
			...props.formState
		};
		return _subscribe({
			...props,
			formState: {
				...defaultProxyFormState,
				...props.formState
			}
		});
	};
	const unregister = (name, options = {}) => {
		for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
			_names.mount.delete(fieldName);
			_names.array.delete(fieldName);
			if (!options.keepValue) {
				unset(_fields, fieldName);
				unset(_formValues, fieldName);
			}
			!options.keepError && unset(_formState.errors, fieldName);
			!options.keepDirty && unset(_formState.dirtyFields, fieldName);
			!options.keepTouched && unset(_formState.touchedFields, fieldName);
			!options.keepIsValidating && unset(_formState.validatingFields, fieldName);
			!_options.shouldUnregister && !options.keepDefaultValue && unset(_defaultValues, fieldName);
		}
		_subjects.state.next({ values: cloneObject(_formValues) });
		_subjects.state.next({
			..._formState,
			...!options.keepDirty ? {} : { isDirty: _getDirty() }
		});
		!options.keepIsValid && _setValid();
	};
	const _setDisabledField = ({ disabled, name }) => {
		if (isBoolean(disabled) && _state.mount || !!disabled || _names.disabled.has(name)) disabled ? _names.disabled.add(name) : _names.disabled.delete(name);
	};
	const register = (name, options = {}) => {
		let field = get(_fields, name);
		const disabledIsDefined = isBoolean(options.disabled) || isBoolean(_options.disabled);
		set(_fields, name, {
			...field || {},
			_f: {
				...field && field._f ? field._f : { ref: { name } },
				name,
				mount: true,
				...options
			}
		});
		_names.mount.add(name);
		if (field) _setDisabledField({
			disabled: isBoolean(options.disabled) ? options.disabled : _options.disabled,
			name
		});
		else updateValidAndValue(name, true, options.value);
		return {
			...disabledIsDefined ? { disabled: options.disabled || _options.disabled } : {},
			..._options.progressive ? {
				required: !!options.required,
				min: getRuleValue(options.min),
				max: getRuleValue(options.max),
				minLength: getRuleValue(options.minLength),
				maxLength: getRuleValue(options.maxLength),
				pattern: getRuleValue(options.pattern)
			} : {},
			name,
			onChange,
			onBlur: onChange,
			ref: (ref) => {
				if (ref) {
					register(name, options);
					field = get(_fields, name);
					const fieldRef = isUndefined(ref.value) ? ref.querySelectorAll ? ref.querySelectorAll("input,select,textarea")[0] || ref : ref : ref;
					const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
					const refs = field._f.refs || [];
					if (radioOrCheckbox ? refs.find((option) => option === fieldRef) : fieldRef === field._f.ref) return;
					set(_fields, name, { _f: {
						...field._f,
						...radioOrCheckbox ? {
							refs: [
								...refs.filter(live),
								fieldRef,
								...Array.isArray(get(_defaultValues, name)) ? [{}] : []
							],
							ref: {
								type: fieldRef.type,
								name
							}
						} : { ref: fieldRef }
					} });
					updateValidAndValue(name, false, void 0, fieldRef);
				} else {
					field = get(_fields, name, {});
					if (field._f) field._f.mount = false;
					(_options.shouldUnregister || options.shouldUnregister) && !(isNameInFieldArray(_names.array, name) && _state.action) && _names.unMount.add(name);
				}
			}
		};
	};
	const _focusError = () => _options.shouldFocusError && iterateFieldsByAction(_fields, _focusInput, _names.mount);
	const _disableForm = (disabled) => {
		if (isBoolean(disabled)) {
			_subjects.state.next({ disabled });
			iterateFieldsByAction(_fields, (ref, name) => {
				const currentField = get(_fields, name);
				if (currentField) {
					ref.disabled = currentField._f.disabled || disabled;
					if (Array.isArray(currentField._f.refs)) currentField._f.refs.forEach((inputRef) => {
						inputRef.disabled = currentField._f.disabled || disabled;
					});
				}
			}, 0, false);
		}
	};
	const handleSubmit = (onValid, onInvalid) => async (e) => {
		let onValidError = void 0;
		if (e) {
			e.preventDefault && e.preventDefault();
			e.persist && e.persist();
		}
		let fieldValues = cloneObject(_formValues);
		_subjects.state.next({ isSubmitting: true });
		if (_options.resolver) {
			const { errors, values } = await _runSchema();
			_updateIsValidating();
			_formState.errors = errors;
			fieldValues = cloneObject(values);
		} else await executeBuiltInValidation(_fields);
		if (_names.disabled.size) for (const name of _names.disabled) unset(fieldValues, name);
		unset(_formState.errors, "root");
		if (isEmptyObject(_formState.errors)) {
			_subjects.state.next({ errors: {} });
			try {
				await onValid(fieldValues, e);
			} catch (error) {
				onValidError = error;
			}
		} else {
			if (onInvalid) await onInvalid({ ..._formState.errors }, e);
			_focusError();
			setTimeout(_focusError);
		}
		_subjects.state.next({
			isSubmitted: true,
			isSubmitting: false,
			isSubmitSuccessful: isEmptyObject(_formState.errors) && !onValidError,
			submitCount: _formState.submitCount + 1,
			errors: _formState.errors
		});
		if (onValidError) throw onValidError;
	};
	const resetField = (name, options = {}) => {
		if (get(_fields, name)) {
			if (isUndefined(options.defaultValue)) setValue(name, cloneObject(get(_defaultValues, name)));
			else {
				setValue(name, options.defaultValue);
				set(_defaultValues, name, cloneObject(options.defaultValue));
			}
			if (!options.keepTouched) unset(_formState.touchedFields, name);
			if (!options.keepDirty) {
				unset(_formState.dirtyFields, name);
				_formState.isDirty = options.defaultValue ? _getDirty(name, cloneObject(get(_defaultValues, name))) : _getDirty();
			}
			if (!options.keepError) {
				unset(_formState.errors, name);
				_proxyFormState.isValid && _setValid();
			}
			_subjects.state.next({ ..._formState });
		}
	};
	const _reset = (formValues, keepStateOptions = {}) => {
		const updatedValues = formValues ? cloneObject(formValues) : _defaultValues;
		const cloneUpdatedValues = cloneObject(updatedValues);
		const isEmptyResetValues = isEmptyObject(formValues);
		const values = isEmptyResetValues ? _defaultValues : cloneUpdatedValues;
		if (!keepStateOptions.keepDefaultValues) _defaultValues = updatedValues;
		if (!keepStateOptions.keepValues) {
			if (keepStateOptions.keepDirtyValues) {
				const fieldsToCheck = new Set([..._names.mount, ...Object.keys(getDirtyFields(_defaultValues, _formValues))]);
				for (const fieldName of Array.from(fieldsToCheck)) {
					const isDirty = get(_formState.dirtyFields, fieldName);
					const existingValue = get(_formValues, fieldName);
					const newValue = get(values, fieldName);
					if (isDirty && !isUndefined(existingValue)) set(values, fieldName, existingValue);
					else if (!isDirty && !isUndefined(newValue)) setValue(fieldName, newValue);
				}
			} else {
				if (isWeb && isUndefined(formValues)) for (const name of _names.mount) {
					const field = get(_fields, name);
					if (field && field._f) {
						const fieldReference = Array.isArray(field._f.refs) ? field._f.refs[0] : field._f.ref;
						if (isHTMLElement(fieldReference)) {
							const form = fieldReference.closest("form");
							if (form) {
								form.reset();
								break;
							}
						}
					}
				}
				if (keepStateOptions.keepFieldsRef) for (const fieldName of _names.mount) setValue(fieldName, get(values, fieldName));
				else _fields = {};
			}
			_formValues = _options.shouldUnregister ? keepStateOptions.keepDefaultValues ? cloneObject(_defaultValues) : {} : cloneObject(values);
			_subjects.array.next({ values: { ...values } });
			_subjects.state.next({ values: { ...values } });
		}
		_names = {
			mount: keepStateOptions.keepDirtyValues ? _names.mount : /* @__PURE__ */ new Set(),
			unMount: /* @__PURE__ */ new Set(),
			array: /* @__PURE__ */ new Set(),
			disabled: /* @__PURE__ */ new Set(),
			watch: /* @__PURE__ */ new Set(),
			watchAll: false,
			focus: ""
		};
		_state.mount = !_proxyFormState.isValid || !!keepStateOptions.keepIsValid || !!keepStateOptions.keepDirtyValues || !_options.shouldUnregister && !isEmptyObject(values);
		_state.watch = !!_options.shouldUnregister;
		_state.keepIsValid = !!keepStateOptions.keepIsValid;
		_state.action = false;
		if (!keepStateOptions.keepErrors) _formState.errors = {};
		_subjects.state.next({
			submitCount: keepStateOptions.keepSubmitCount ? _formState.submitCount : 0,
			isDirty: isEmptyResetValues ? false : keepStateOptions.keepDirty ? _formState.isDirty : !!(keepStateOptions.keepDefaultValues && !deepEqual(formValues, _defaultValues)),
			isSubmitted: keepStateOptions.keepIsSubmitted ? _formState.isSubmitted : false,
			dirtyFields: isEmptyResetValues ? {} : keepStateOptions.keepDirtyValues ? keepStateOptions.keepDefaultValues && _formValues ? getDirtyFields(_defaultValues, _formValues) : _formState.dirtyFields : keepStateOptions.keepDefaultValues && formValues ? getDirtyFields(_defaultValues, formValues) : keepStateOptions.keepDirty ? _formState.dirtyFields : {},
			touchedFields: keepStateOptions.keepTouched ? _formState.touchedFields : {},
			errors: keepStateOptions.keepErrors ? _formState.errors : {},
			isSubmitSuccessful: keepStateOptions.keepIsSubmitSuccessful ? _formState.isSubmitSuccessful : false,
			isSubmitting: false,
			defaultValues: _defaultValues
		});
	};
	const reset = (formValues, keepStateOptions) => _reset(isFunction(formValues) ? formValues(_formValues) : formValues, {
		..._options.resetOptions,
		...keepStateOptions
	});
	const setFocus = (name, options = {}) => {
		const field = get(_fields, name);
		const fieldReference = field && field._f;
		if (fieldReference) {
			const fieldRef = fieldReference.refs ? fieldReference.refs[0] : fieldReference.ref;
			if (fieldRef.focus) setTimeout(() => {
				fieldRef.focus();
				options.shouldSelect && isFunction(fieldRef.select) && fieldRef.select();
			});
		}
	};
	const _setFormState = (updatedFormState) => {
		_formState = {
			..._formState,
			...updatedFormState
		};
	};
	const _resetDefaultValues = () => isFunction(_options.defaultValues) && _options.defaultValues().then((values) => {
		reset(values, _options.resetOptions);
		_subjects.state.next({ isLoading: false });
	});
	const methods = {
		control: {
			register,
			unregister,
			getFieldState,
			handleSubmit,
			setError,
			_subscribe,
			_runSchema,
			_updateIsValidating,
			_focusError,
			_getWatch,
			_getDirty,
			_setValid,
			_setFieldArray,
			_setDisabledField,
			_setErrors,
			_getFieldArray,
			_reset,
			_resetDefaultValues,
			_removeUnmounted,
			_disableForm,
			_subjects,
			_proxyFormState,
			get _fields() {
				return _fields;
			},
			get _formValues() {
				return _formValues;
			},
			get _state() {
				return _state;
			},
			set _state(value) {
				_state = value;
			},
			get _defaultValues() {
				return _defaultValues;
			},
			get _names() {
				return _names;
			},
			set _names(value) {
				_names = value;
			},
			get _formState() {
				return _formState;
			},
			get _options() {
				return _options;
			},
			set _options(value) {
				_options = {
					..._options,
					...value
				};
			}
		},
		subscribe,
		trigger,
		register,
		handleSubmit,
		watch,
		setValue,
		getValues,
		reset,
		resetField,
		clearErrors,
		unregister,
		setError,
		setFocus,
		getFieldState
	};
	return {
		...methods,
		formControl: methods
	};
}
/**
* Custom hook to manage the entire form.
*
* @remarks
* [API](https://react-hook-form.com/docs/useform) • [Demo](https://codesandbox.io/s/react-hook-form-get-started-ts-5ksmm) • [Video](https://www.youtube.com/watch?v=RkXv4AXXC_4)
*
* @param props - form configuration and validation parameters.
*
* @returns methods - individual functions to manage the form state. {@link UseFormReturn}
*
* @example
* ```tsx
* function App() {
*   const { register, handleSubmit, watch, formState: { errors } } = useForm();
*   const onSubmit = data => console.log(data);
*
*   console.log(watch("example"));
*
*   return (
*     <form onSubmit={handleSubmit(onSubmit)}>
*       <input defaultValue="test" {...register("example")} />
*       <input {...register("exampleRequired", { required: true })} />
*       {errors.exampleRequired && <span>This field is required</span>}
*       <button>Submit</button>
*     </form>
*   );
* }
* ```
*/
function useForm(props = {}) {
	const _formControl = React.useRef(void 0);
	const _values = React.useRef(void 0);
	const [formState, updateFormState] = React.useState({
		isDirty: false,
		isValidating: false,
		isLoading: isFunction(props.defaultValues),
		isSubmitted: false,
		isSubmitting: false,
		isSubmitSuccessful: false,
		isValid: false,
		submitCount: 0,
		dirtyFields: {},
		touchedFields: {},
		validatingFields: {},
		errors: props.errors || {},
		disabled: props.disabled || false,
		isReady: false,
		defaultValues: isFunction(props.defaultValues) ? void 0 : props.defaultValues
	});
	if (!_formControl.current) if (props.formControl) {
		_formControl.current = {
			...props.formControl,
			formState
		};
		if (props.defaultValues && !isFunction(props.defaultValues)) props.formControl.reset(props.defaultValues, props.resetOptions);
	} else {
		const { formControl, ...rest } = createFormControl(props);
		_formControl.current = {
			...rest,
			formState
		};
	}
	const control = _formControl.current.control;
	control._options = props;
	useIsomorphicLayoutEffect(() => {
		const sub = control._subscribe({
			formState: control._proxyFormState,
			callback: () => updateFormState({ ...control._formState }),
			reRenderRoot: true
		});
		updateFormState((data) => ({
			...data,
			isReady: true
		}));
		control._formState.isReady = true;
		return sub;
	}, [control]);
	React.useEffect(() => control._disableForm(props.disabled), [control, props.disabled]);
	React.useEffect(() => {
		if (props.mode) control._options.mode = props.mode;
		if (props.reValidateMode) control._options.reValidateMode = props.reValidateMode;
	}, [
		control,
		props.mode,
		props.reValidateMode
	]);
	React.useEffect(() => {
		if (props.errors) {
			control._setErrors(props.errors);
			control._focusError();
		}
	}, [control, props.errors]);
	React.useEffect(() => {
		props.shouldUnregister && control._subjects.state.next({ values: control._getWatch() });
	}, [control, props.shouldUnregister]);
	React.useEffect(() => {
		if (control._proxyFormState.isDirty) {
			const isDirty = control._getDirty();
			if (isDirty !== formState.isDirty) control._subjects.state.next({ isDirty });
		}
	}, [control, formState.isDirty]);
	React.useEffect(() => {
		var _a;
		if (props.values && !deepEqual(props.values, _values.current)) {
			control._reset(props.values, {
				keepFieldsRef: true,
				...control._options.resetOptions
			});
			if (!((_a = control._options.resetOptions) === null || _a === void 0 ? void 0 : _a.keepIsValid)) control._setValid();
			_values.current = props.values;
			updateFormState((state) => ({ ...state }));
		} else control._resetDefaultValues();
	}, [control, props.values]);
	React.useEffect(() => {
		if (!control._state.mount) {
			control._setValid();
			control._state.mount = true;
		}
		if (control._state.watch) {
			control._state.watch = false;
			control._subjects.state.next({ ...control._formState });
		}
		control._removeUnmounted();
	});
	_formControl.current.formState = getProxyFormState(formState, control);
	return _formControl.current;
}
//#endregion
//#region ../../node_modules/@hookform/resolvers/dist/resolvers.mjs
var r = (t, r, o) => {
	if (t && "reportValidity" in t) {
		const s = get(o, r);
		t.setCustomValidity(s && s.message || ""), t.reportValidity();
	}
}, o = (e, t) => {
	for (const o in t.fields) {
		const s = t.fields[o];
		s && s.ref && "reportValidity" in s.ref ? r(s.ref, o, e) : s && s.refs && s.refs.forEach((t) => r(t, o, e));
	}
}, s$1 = (r, s) => {
	s.shouldUseNativeValidation && o(r, s);
	const n = {};
	for (const o in r) {
		const f = get(s.fields, o), c = Object.assign(r[o] || {}, { ref: f && f.ref });
		if (i$1(s.names || Object.keys(r), o)) {
			const r = Object.assign({}, get(n, o));
			set(r, "root", c), set(n, o, r);
		} else set(n, o, c);
	}
	return n;
}, i$1 = (e, t) => {
	const r = n(t);
	return e.some((e) => n(e).match(`^${r}\\.\\d+`));
};
function n(e) {
	return e.replace(/\]|\[/g, "");
}
Object.freeze({ status: "aborted" });
function $constructor(name, initializer, params) {
	function init(inst, def) {
		var _a;
		Object.defineProperty(inst, "_zod", {
			value: inst._zod ?? {},
			enumerable: false
		});
		(_a = inst._zod).traits ?? (_a.traits = /* @__PURE__ */ new Set());
		inst._zod.traits.add(name);
		initializer(inst, def);
		for (const k in _.prototype) if (!(k in inst)) Object.defineProperty(inst, k, { value: _.prototype[k].bind(inst) });
		inst._zod.constr = _;
		inst._zod.def = def;
	}
	const Parent = params?.Parent ?? Object;
	class Definition extends Parent {}
	Object.defineProperty(Definition, "name", { value: name });
	function _(def) {
		var _a;
		const inst = params?.Parent ? new Definition() : this;
		init(inst, def);
		(_a = inst._zod).deferred ?? (_a.deferred = []);
		for (const fn of inst._zod.deferred) fn();
		return inst;
	}
	Object.defineProperty(_, "init", { value: init });
	Object.defineProperty(_, Symbol.hasInstance, { value: (inst) => {
		if (params?.Parent && inst instanceof params.Parent) return true;
		return inst?._zod?.traits?.has(name);
	} });
	Object.defineProperty(_, "name", { value: name });
	return _;
}
var $ZodAsyncError = class extends Error {
	constructor() {
		super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
	}
};
var globalConfig = {};
function config(newConfig) {
	if (newConfig) Object.assign(globalConfig, newConfig);
	return globalConfig;
}
//#endregion
//#region ../../node_modules/zod/v4/core/util.js
function jsonStringifyReplacer(_, value) {
	if (typeof value === "bigint") return value.toString();
	return value;
}
function cached(getter) {
	return { get value() {
		{
			const value = getter();
			Object.defineProperty(this, "value", { value });
			return value;
		}
		throw new Error("cached value already set");
	} };
}
var captureStackTrace = Error.captureStackTrace ? Error.captureStackTrace : (..._args) => {};
cached(() => {
	if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) return false;
	try {
		new Function("");
		return true;
	} catch (_) {
		return false;
	}
});
Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, -Number.MAX_VALUE, Number.MAX_VALUE;
function unwrapMessage(message) {
	return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
	const full = {
		...iss,
		path: iss.path ?? []
	};
	if (!iss.message) full.message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config.customError?.(iss)) ?? unwrapMessage(config.localeError?.(iss)) ?? "Invalid input";
	delete full.inst;
	delete full.continue;
	if (!ctx?.reportInput) delete full.input;
	return full;
}
//#endregion
//#region ../../node_modules/zod/v4/core/errors.js
var initializer = (inst, def) => {
	inst.name = "$ZodError";
	Object.defineProperty(inst, "_zod", {
		value: inst._zod,
		enumerable: false
	});
	Object.defineProperty(inst, "issues", {
		value: def,
		enumerable: false
	});
	Object.defineProperty(inst, "message", {
		get() {
			return JSON.stringify(def, jsonStringifyReplacer, 2);
		},
		enumerable: true
	});
	Object.defineProperty(inst, "toString", {
		value: () => inst.message,
		enumerable: false
	});
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
//#endregion
//#region ../../node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
	const result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) throw new $ZodAsyncError();
	if (result.issues.length) {
		const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, _params?.callee);
		throw e;
	}
	return result.value;
};
var parse = /* @__PURE__ */ _parse($ZodRealError);
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
	const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
	let result = schema._zod.run({
		value,
		issues: []
	}, ctx);
	if (result instanceof Promise) result = await result;
	if (result.issues.length) {
		const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
		captureStackTrace(e, params?.callee);
		throw e;
	}
	return result.value;
};
var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
//#endregion
//#region ../../node_modules/@hookform/resolvers/zod/dist/zod.mjs
function t(r, e) {
	try {
		var o = r();
	} catch (r) {
		return e(r);
	}
	return o && o.then ? o.then(void 0, e) : o;
}
function s(r, e) {
	for (var n = {}; r.length;) {
		var t = r[0], s = t.code, i = t.message, a = t.path.join(".");
		if (!n[a]) if ("unionErrors" in t) {
			var u = t.unionErrors[0].errors[0];
			n[a] = {
				message: u.message,
				type: u.code
			};
		} else n[a] = {
			message: i,
			type: s
		};
		if ("unionErrors" in t && t.unionErrors.forEach(function(e) {
			return e.errors.forEach(function(e) {
				return r.push(e);
			});
		}), e) {
			var c = n[a].types, f = c && c[t.code];
			n[a] = appendErrors(a, e, n, s, f ? [].concat(f, t.message) : t.message);
		}
		r.shift();
	}
	return n;
}
function i(r, e) {
	for (var n = {}; r.length;) {
		var t = r[0], s = t.code, i = t.message, a = t.path.join(".");
		if (!n[a]) if ("invalid_union" === t.code && t.errors.length > 0) {
			var u = t.errors[0][0];
			n[a] = {
				message: u.message,
				type: u.code
			};
		} else n[a] = {
			message: i,
			type: s
		};
		if ("invalid_union" === t.code && t.errors.forEach(function(e) {
			return e.forEach(function(e) {
				return r.push(e);
			});
		}), e) {
			var c = n[a].types, f = c && c[t.code];
			n[a] = appendErrors(a, e, n, s, f ? [].concat(f, t.message) : t.message);
		}
		r.shift();
	}
	return n;
}
function a(o$1, a, u) {
	if (void 0 === u && (u = {}), function(r) {
		return "_def" in r && "object" == typeof r._def && "typeName" in r._def;
	}(o$1)) return function(n, i, c) {
		try {
			return Promise.resolve(t(function() {
				return Promise.resolve(o$1["sync" === u.mode ? "parse" : "parseAsync"](n, a)).then(function(e) {
					return c.shouldUseNativeValidation && o({}, c), {
						errors: {},
						values: u.raw ? Object.assign({}, n) : e
					};
				});
			}, function(r) {
				if (function(r) {
					return Array.isArray(null == r ? void 0 : r.issues);
				}(r)) return {
					values: {},
					errors: s$1(s(r.errors, !c.shouldUseNativeValidation && "all" === c.criteriaMode), c)
				};
				throw r;
			}));
		} catch (r) {
			return Promise.reject(r);
		}
	};
	if (function(r) {
		return "_zod" in r && "object" == typeof r._zod;
	}(o$1)) return function(s, c, f) {
		try {
			return Promise.resolve(t(function() {
				return Promise.resolve(("sync" === u.mode ? parse : parseAsync)(o$1, s, a)).then(function(e) {
					return f.shouldUseNativeValidation && o({}, f), {
						errors: {},
						values: u.raw ? Object.assign({}, s) : e
					};
				});
			}, function(r) {
				if (function(r) {
					return r instanceof $ZodError;
				}(r)) return {
					values: {},
					errors: s$1(i(r.issues, !f.shouldUseNativeValidation && "all" === f.criteriaMode), f)
				};
				throw r;
			}));
		} catch (r) {
			return Promise.reject(r);
		}
	};
	throw new Error("Invalid input: not a Zod schema");
}
//#endregion
//#region ../../components/forms/CommentForm.tsx
function CommentForm({ onSubmit, isSubmitting = false }) {
	const { t } = useTranslation();
	const formRef = useRef(null);
	const { register, handleSubmit, formState: { errors }, reset } = useForm({
		resolver: a(createCommentSchema),
		defaultValues: { comment: "" }
	});
	const handleFormSubmit = async (data) => {
		await onSubmit(data);
		reset({ comment: "" });
	};
	return /* @__PURE__ */ jsxs("form", {
		ref: formRef,
		onSubmit: handleSubmit(handleFormSubmit),
		className: "card section-card p-5 sm:p-6",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-sm text-gray-400 flex items-center",
					children: t.guides.yourNick
				}), /* @__PURE__ */ jsx("button", {
					type: "submit",
					disabled: isSubmitting,
					className: "btn-primary py-3",
					children: isSubmitting ? /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center justify-center",
						children: [/* @__PURE__ */ jsx(WuxiaIcon, {
							name: "spinner",
							className: "spinner-icon w-4 h-4 mr-3"
						}), t.guides.sending]
					}) : /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center justify-center",
						children: [/* @__PURE__ */ jsx(WuxiaIcon, {
							name: "plus",
							className: "w-4 h-4 mr-3"
						}), t.guides.addComment]
					})
				})]
			}),
			/* @__PURE__ */ jsx("textarea", {
				...register("comment"),
				placeholder: t.guides.yourComment,
				className: "input-field min-h-[120px] mt-4 w-full",
				maxLength: 3e3,
				enterKeyHint: "send",
				onKeyDown: (event) => {
					if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
						event.preventDefault();
						formRef.current?.requestSubmit();
					}
				}
			}),
			errors.comment && /* @__PURE__ */ jsx("span", {
				className: "text-red-400 text-sm mt-1 block",
				children: errors.comment.message
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-3 text-xs text-[#8ea6b8]",
				children: "`Ctrl+Enter` / `Cmd+Enter` — отправить быстрее."
			})
		]
	});
}
//#endregion
//#region ../../components/sections/guides/GuideComments.tsx
function GuideComments({ guideId, comments, canModerate = false, userRole }) {
	const addComment = useAddComment();
	const handleSubmit = async (data) => {
		await addComment.mutateAsync({
			id: guideId,
			data
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "mt-8 section-stack-md",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("h4", {
					className: "text-lg font-bold text-[#e6eff5] inline-flex items-center gap-2",
					children: [/* @__PURE__ */ jsx(WuxiaIcon, {
						name: "comment",
						className: "w-5 h-5 text-[#8fb9cc]"
					}), "Комментарии"]
				}), /* @__PURE__ */ jsx("span", {
					className: "ui-badge ui-badge-muted",
					children: comments.length
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "space-y-4",
				children: comments.length === 0 ? /* @__PURE__ */ jsx("div", {
					className: "card section-card p-5 text-sm text-[#9fb5c3]",
					children: "Пока тишина. Оставь первый комментарий."
				}) : comments.map((c) => /* @__PURE__ */ jsxs("div", {
					className: "card section-card p-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between text-sm text-gray-400 mb-2",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(WuxiaIcon, {
								name: "user",
								className: "w-4 h-4"
							}), c.author]
						}), /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(WuxiaIcon, {
								name: "calendar",
								className: "w-4 h-4"
							}), formatDate(c.createdAt)]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "text-gray-300 whitespace-pre-wrap leading-relaxed",
						children: c.comment
					})]
				}, c.id))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ jsx(CommentForm, {
					onSubmit: handleSubmit,
					isSubmitting: addComment.isPending
				}), canModerate && userRole && /* @__PURE__ */ jsxs("div", {
					className: "mt-4 text-xs text-gray-500",
					children: [
						"Роль: ",
						/* @__PURE__ */ jsx("span", {
							className: "text-gray-300",
							children: userRole
						}),
						" (можно будет добавить модерацию/редактирование)."
					]
				})]
			})
		]
	});
}
//#endregion
//#region ../../components/guides/MilkdownMarkdownEditor.tsx
function joinClasses$2(...values) {
	return values.filter(Boolean).join(" ");
}
var MilkdownMarkdownEditor = forwardRef(function MilkdownMarkdownEditor({ value, onChange, placeholder = "Start writing...", readOnly = false, className }, ref) {
	const hostRef = useRef(null);
	const runtimeRef = useRef(null);
	const latestMarkdownRef = useRef(value);
	const syncingRef = useRef(false);
	const onChangeRef = useRef(onChange);
	const [isReady, setIsReady] = useState(false);
	useImperativeHandle(ref, () => ({
		insertMarkdown(markdown, inline = false) {
			const runtime = runtimeRef.current;
			if (!runtime) return;
			runtime.crepe.editor.action(runtime.insert(markdown, inline));
		},
		setMarkdown(markdown) {
			const runtime = runtimeRef.current;
			latestMarkdownRef.current = markdown;
			if (!runtime) return;
			syncingRef.current = true;
			runtime.crepe.editor.action(runtime.replaceAll(markdown));
			syncingRef.current = false;
		},
		getMarkdown() {
			const runtime = runtimeRef.current;
			return runtime ? runtime.crepe.getMarkdown() : latestMarkdownRef.current;
		}
	}), []);
	useEffect(() => {
		latestMarkdownRef.current = value;
	}, [value]);
	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);
	useEffect(() => {
		if (!hostRef.current) return;
		const host = hostRef.current;
		let cancelled = false;
		const setup = async () => {
			const [{ Crepe }, { replaceAll, insert }] = await Promise.all([import("./esm-CXJjdxiu.js"), import("./utils-Bjk_eAVW.js")]);
			if (cancelled) return;
			const crepe = new Crepe({
				root: host,
				defaultValue: value,
				featureConfigs: { [Crepe.Feature.Placeholder]: {
					text: placeholder,
					mode: "doc"
				} }
			});
			runtimeRef.current = {
				crepe,
				replaceAll,
				insert
			};
			crepe.on((listener) => {
				listener.markdownUpdated((_ctx, markdown) => {
					latestMarkdownRef.current = markdown;
					if (!syncingRef.current) onChangeRef.current(markdown);
				});
			});
			await crepe.create();
			if (cancelled) {
				await crepe.destroy();
				return;
			}
			crepe.setReadonly(readOnly);
			setIsReady(true);
		};
		setup().catch((error) => {
			console.error("Failed to initialize Milkdown editor:", error);
		});
		return () => {
			cancelled = true;
			setIsReady(false);
			const runtime = runtimeRef.current;
			runtimeRef.current = null;
			if (runtime) runtime.crepe.destroy().catch((error) => {
				console.error("Failed to destroy Milkdown editor:", error);
			});
			host.innerHTML = "";
		};
	}, [
		placeholder,
		readOnly,
		value
	]);
	useEffect(() => {
		const runtime = runtimeRef.current;
		if (!runtime) return;
		runtime.crepe.setReadonly(readOnly);
	}, [readOnly]);
	useEffect(() => {
		const runtime = runtimeRef.current;
		if (!runtime) return;
		if (value === latestMarkdownRef.current) return;
		syncingRef.current = true;
		runtime.crepe.editor.action(runtime.replaceAll(value));
		latestMarkdownRef.current = value;
		syncingRef.current = false;
	}, [value]);
	return /* @__PURE__ */ jsxs("div", {
		className: joinClasses$2("guide-milkdown-shell", className, !isReady && "guide-milkdown-shell-loading"),
		children: [!isReady && /* @__PURE__ */ jsx("div", {
			className: "guide-milkdown-loading",
			children: "Loading editor..."
		}), /* @__PURE__ */ jsx("div", {
			ref: hostRef,
			className: "guide-milkdown-host"
		})]
	});
});
//#endregion
//#region ../../components/forms/GuideForm.tsx
var DEFAULT_VALUES = {
	title: "",
	content: "",
	category: "general",
	author: ""
};
var GUIDE_TEMPLATES = [
	{
		label: "PvE Build",
		snippet: [
			"\n## Role in the squad",
			"- Main job:",
			"- When this build shines:",
			"- Weak spots:",
			"",
			"## Core setup",
			"| Slot | Choice | Why |",
			"| --- | --- | --- |",
			"| Weapon |  |  |",
			"| Gear set |  |  |",
			"| Trait |  |  |",
			"",
			"## Rotation",
			"1. Prep buffs.",
			"2. Open with control or armor break.",
			"3. Spend burst window.",
			"4. Reset and repeat.",
			"",
			"## Raid notes",
			"- Phase 1:",
			"- Phase 2:",
			"- Emergency buttons:"
		].join("\n")
	},
	{
		label: "PvP Matchup",
		snippet: [
			"\n## Matchup plan",
			"> [!tip] Win condition",
			"> Force the enemy to spend mobility first, then commit burst.",
			"",
			"## Opener",
			"- Safe poke:",
			"- Main bait:",
			"- Burst confirm:",
			"",
			"## What to respect",
			"- Enemy iframe:",
			"- Dangerous CC chain:",
			"- When to disengage:"
		].join("\n")
	},
	{
		label: "Raid Mechanics",
		snippet: [
			"\n## Boss timeline",
			"| Time | Mechanic | Team response |",
			"| --- | --- | --- |",
			"| 00:30 |  |  |",
			"| 01:10 |  |  |",
			"| 02:00 |  |  |",
			"",
			"## Assignments",
			"- Tank:",
			"- Support:",
			"- DPS 1:",
			"- DPS 2:",
			"",
			"> [!warning] Wipe trigger",
			"> If this mechanic is missed, immediately reset positions and save defensives."
		].join("\n")
	},
	{
		label: "Farm Route",
		snippet: [
			"\n## Route snapshot",
			"- Region:",
			"- Best time:",
			"- Required consumables:",
			"",
			"## Loop",
			"1. Start at waypoint A.",
			"2. Sweep elites clockwise.",
			"3. Skip low-value packs.",
			"4. Reset at vendor or camp.",
			"",
			"## Profit checklist",
			"- [ ] Inventory cleanup",
			"- [ ] Buff food active",
			"- [ ] Daily cap tracked"
		].join("\n")
	}
];
function joinClasses$1(...values) {
	return values.filter(Boolean).join(" ");
}
function GuideForm({ onSubmit, onCancel, isSubmitting = false, initialValues, disableAuthor = false, submitLabel, resetAfterSubmit = true, focusMode = false }) {
	const { t } = useTranslation();
	const [editorMode, setEditorMode] = useState("split");
	const [notice, setNotice] = useState(null);
	const editorRef = useRef(null);
	const imageInputRef = useRef(null);
	const markdownInputRef = useRef(null);
	const mergedDefaults = useMemo(() => {
		return {
			...DEFAULT_VALUES,
			...initialValues || {},
			title: initialValues?.title ?? DEFAULT_VALUES.title,
			content: initialValues?.content ?? DEFAULT_VALUES.content,
			category: initialValues?.category ?? DEFAULT_VALUES.category,
			author: initialValues?.author ?? DEFAULT_VALUES.author
		};
	}, [initialValues]);
	const hasInitialValues = Boolean(initialValues);
	const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
		resolver: a(createGuideSchema),
		defaultValues: mergedDefaults
	});
	const content = watch("content") || "";
	useEffect(() => {
		register("content");
	}, [register]);
	useEffect(() => {
		if (!hasInitialValues) return;
		reset(mergedDefaults);
		editorRef.current?.setMarkdown(mergedDefaults.content || "");
		setNotice(null);
	}, [
		hasInitialValues,
		mergedDefaults,
		reset
	]);
	const handleEditorChange = (markdown) => {
		setValue("content", markdown, {
			shouldDirty: true,
			shouldValidate: Boolean(errors.content)
		});
	};
	const handleFormSubmit = async (data) => {
		await onSubmit({
			...data,
			title: data.title.trim(),
			author: data.author?.trim() || void 0,
			content: data.content.trim()
		});
		if (resetAfterSubmit) {
			reset(DEFAULT_VALUES);
			editorRef.current?.setMarkdown("");
			setNotice(null);
		}
	};
	const insertMarkdown = (snippet, inline = false) => {
		editorRef.current?.insertMarkdown(snippet, inline);
	};
	const handleImageUpload = () => {
		imageInputRef.current?.click();
	};
	const handleImageFileChange = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			setNotice("Choose an image file for inline embeds.");
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			setNotice("Image is too large. Keep it under 5 MB.");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			const dataUrl = String(reader.result || "");
			insertMarkdown(`\n![${file.name.replace(/\.[a-z0-9]+$/i, "") || "Image"}](${dataUrl})\n`);
			setNotice(`Embedded image: ${file.name}`);
		};
		reader.readAsDataURL(file);
		if (imageInputRef.current) imageInputRef.current.value = "";
	};
	const handleImageUrlInsert = () => {
		const url = window.prompt("Image URL");
		if (!url) return;
		insertMarkdown(`\n![Reference image](${url.trim()})\n`);
	};
	const handleMarkdownImport = async (event) => {
		const files = Array.from(event.target.files || []);
		if (files.length === 0) return;
		const markdownFile = files.find((file) => isMarkdownFile(file));
		if (!markdownFile) {
			setNotice("No markdown file found in the selected package.");
			return;
		}
		try {
			const draft = await buildGuideDraftFromMarkdownFile(markdownFile, files);
			setValue("title", draft.title, { shouldDirty: true });
			setValue("category", draft.category, { shouldDirty: true });
			setValue("author", draft.author || "", { shouldDirty: true });
			setValue("content", draft.content, {
				shouldDirty: true,
				shouldValidate: true
			});
			editorRef.current?.setMarkdown(draft.content);
			const assetCount = Math.max(0, files.length - 1);
			setNotice(assetCount > 0 ? `Imported ${markdownFile.name} with ${assetCount} attachment${assetCount === 1 ? "" : "s"}.` : `Imported ${markdownFile.name}.`);
		} catch (error) {
			setNotice(error instanceof Error ? error.message : "Failed to import markdown draft.");
		} finally {
			if (markdownInputRef.current) markdownInputRef.current.value = "";
		}
	};
	const resolvedEditorMode = focusMode ? "write" : editorMode;
	const showEditor = resolvedEditorMode !== "preview";
	const showPreview = resolvedEditorMode !== "write";
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: handleSubmit(handleFormSubmit),
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsx("input", {
				type: "hidden",
				...register("content")
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_280px]",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("input", {
					...register("title"),
					placeholder: t.guides.titleField,
					className: "input-field w-full text-lg"
				}), errors.title && /* @__PURE__ */ jsx("span", {
					className: "text-red-400 text-sm mt-1 block",
					children: errors.title.message
				})] }), /* @__PURE__ */ jsx("input", {
					...register("author"),
					placeholder: t.guides.author,
					className: joinClasses$1("input-field w-full", disableAuthor && "opacity-60 cursor-not-allowed"),
					disabled: disableAuthor
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("select", {
					...register("category"),
					className: "select-field w-full",
					children: guideCategories.map((category) => /* @__PURE__ */ jsx("option", {
						value: category,
						children: category
					}, category))
				}), errors.category && /* @__PURE__ */ jsx("span", {
					className: "text-red-400 text-sm mt-1 block",
					children: errors.category.message
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between",
					children: [!focusMode && /* @__PURE__ */ jsx("div", {
						className: "inline-flex rounded-2xl p-1 bg-[#0b141d]/70 border border-[#223140]/70 w-fit",
						children: [
							["write", "Editor"],
							["split", "Split"],
							["preview", "Reader"]
						].map(([mode, label]) => /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setEditorMode(mode),
							className: joinClasses$1("px-3 py-2 text-sm rounded-2xl transition-colors", editorMode === mode ? "bg-[#183244]/80 text-[#e6eff5]" : "text-gray-400 hover:text-[#bcd6e5]"),
							children: label
						}, mode))
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ jsx("input", {
								ref: markdownInputRef,
								type: "file",
								accept: ".md,.markdown,text/markdown,text/plain,image/*,.webp,.avif,.gif,.svg,.pdf",
								multiple: true,
								onChange: handleMarkdownImport,
								className: "hidden"
							}),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								className: "btn-secondary px-4 py-2.5",
								onClick: () => markdownInputRef.current?.click(),
								children: [/* @__PURE__ */ jsx(WuxiaIcon, {
									name: "upload",
									className: "inline-block w-4 h-4 mr-2 align-text-bottom"
								}), "Import Obsidian .md"]
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "dc-icon-btn p-2.5 rounded-xl",
								onClick: handleImageUrlInsert,
								title: "Image URL",
								children: /* @__PURE__ */ jsx(WuxiaIcon, {
									name: "image",
									className: "w-4 h-4"
								})
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "dc-icon-btn dc-icon-btn-accent p-2.5 rounded-xl",
								onClick: handleImageUpload,
								title: "Upload image",
								children: /* @__PURE__ */ jsx(WuxiaIcon, {
									name: "upload",
									className: "w-4 h-4"
								})
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `rounded-3xl border border-[#223140]/70 bg-[#091019]/70 p-4 md:p-5 space-y-4 ${focusMode ? "guide-form-focus-wrap" : ""}`,
				children: [!focusMode && /* @__PURE__ */ jsx("div", {
					className: "toolbar-surface",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							GUIDE_TEMPLATES.map((template) => /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "ui-chip ui-badge-accent",
								onClick: () => insertMarkdown(template.snippet),
								children: template.label
							}, template.label)),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "ui-chip",
								onClick: () => insertMarkdown("\n> [!tip] Key takeaway\n> \n"),
								children: "Callout"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "ui-chip",
								onClick: () => insertMarkdown("\n| Item | Value | Notes |\n| --- | --- | --- |\n|  |  |  |\n"),
								children: "Table"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "ui-chip",
								onClick: () => insertMarkdown("\n- [ ] Step one\n- [ ] Step two\n- [ ] Step three\n"),
								children: "Checklist"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "ui-chip",
								onClick: () => insertMarkdown("[[Related Guide]]", true),
								children: "Wikilink"
							})
						]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: joinClasses$1("grid gap-5", resolvedEditorMode === "split" && "xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]", focusMode && "guide-form-focus-grid"),
					children: [showEditor && /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between gap-3 px-1",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: "text-sm font-medium text-[#e6eff5]",
									children: "Milkdown editor"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-xs text-[#8ea6b8]",
									children: focusMode ? "Fullscreen drafting with all markdown shortcuts active." : "Live writing for complex raid, PvP, and farming guides."
								})] }), /* @__PURE__ */ jsx("div", {
									className: "text-[11px] uppercase tracking-[0.2em] text-[#6f8799]",
									children: "Markdown first"
								})]
							}),
							/* @__PURE__ */ jsx(MilkdownMarkdownEditor, {
								ref: editorRef,
								value: content,
								onChange: handleEditorChange,
								placeholder: `${t.guides.newGuideHint} [[wikilinks]]`,
								className: focusMode ? "guide-milkdown-shell-focus" : void 0
							}),
							errors.content && /* @__PURE__ */ jsx("span", {
								className: "text-red-400 text-sm block",
								children: errors.content.message
							})
						]
					}), showPreview && /* @__PURE__ */ jsxs("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between gap-3 px-1",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium text-[#e6eff5]",
								children: "Reading view"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-xs text-[#8ea6b8]",
								children: "Matches the guide reader players will actually see."
							})] }), /* @__PURE__ */ jsx("div", {
								className: "text-[11px] uppercase tracking-[0.2em] text-[#6f8799]",
								children: "Obsidian-friendly"
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "card min-h-[420px] p-6 overflow-auto",
							children: content.trim() ? /* @__PURE__ */ jsx(MarkdownRenderer, { content }) : /* @__PURE__ */ jsx("div", {
								className: "rounded-2xl border border-dashed border-[#2c4154] bg-[#0b141d]/65 px-5 py-10 text-sm text-[#89a2b5]",
								children: "Start writing or import a markdown note from Obsidian to preview the final guide layout."
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("input", {
				ref: imageInputRef,
				type: "file",
				accept: "image/*",
				onChange: handleImageFileChange,
				className: "hidden"
			}),
			notice && /* @__PURE__ */ jsxs("div", {
				className: "text-sm text-[#bcd6e5] p-4 bg-[#16202b]/65 rounded-2xl border border-[#2f6e8d]/40",
				children: [/* @__PURE__ */ jsx(WuxiaIcon, {
					name: "checkCircle",
					className: "w-4 h-4 mr-2 inline-block align-text-bottom"
				}), notice]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-2 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end",
				children: [/* @__PURE__ */ jsx("button", {
					type: "button",
					className: "btn-secondary px-5 py-3",
					onClick: onCancel,
					disabled: isSubmitting,
					children: t.common.cancel
				}), /* @__PURE__ */ jsx("button", {
					type: "submit",
					className: "btn-primary px-5 py-3",
					disabled: isSubmitting,
					children: isSubmitting ? /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center justify-center",
						children: [/* @__PURE__ */ jsx(WuxiaIcon, {
							name: "spinner",
							className: "spinner-icon w-4 h-4 mr-3"
						}), t.guides.saving]
					}) : /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center justify-center",
						children: [/* @__PURE__ */ jsx(WuxiaIcon, {
							name: "seal",
							className: "w-4 h-4 mr-3"
						}), submitLabel || t.guides.publish]
					})
				})]
			})
		]
	});
}
//#endregion
//#region ../../components/sections/guides/GuideEditor.tsx
function GuideEditor({ onClose, onSuccess, mode = "create", guideId, initialValues }) {
	const createGuide = useCreateGuide();
	const updateGuide = useUpdateGuide();
	const isEdit = mode === "edit";
	const [isFocusMode, setIsFocusMode] = useState(false);
	useEffect(() => {
		document.documentElement.style.setProperty("--tilt-x", "0deg");
		document.documentElement.style.setProperty("--tilt-y", "0deg");
	}, []);
	useEffect(() => {
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, []);
	const handleSubmit = async (data) => {
		if (isEdit) {
			if (!guideId) throw new Error("Missing guide id");
			await updateGuide.mutateAsync({
				id: guideId,
				data: {
					title: data.title,
					content: data.content,
					category: data.category
				}
			});
			onClose();
			onSuccess?.(String(guideId));
			return;
		}
		const result = await createGuide.mutateAsync(data);
		onClose();
		if (onSuccess && result?.id) onSuccess(String(result.id));
	};
	const isSubmitting = isEdit ? updateGuide.isPending : createGuide.isPending;
	const submitError = isEdit ? updateGuide.error : createGuide.error;
	return /* @__PURE__ */ jsx("div", {
		className: "modal-backdrop",
		style: {
			zIndex: 100001,
			perspective: "none",
			transform: "none"
		},
		children: /* @__PURE__ */ jsxs("div", {
			className: `modal-shell w-full relative overflow-auto ${isFocusMode ? "guide-editor-focus-card p-4 md:p-6" : "max-w-7xl p-6 md:p-8 max-h-[92vh]"}`,
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "modal-header",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "modal-title",
						children: isEdit ? "Редактировать гайд" : "Новый гайд"
					}), /* @__PURE__ */ jsx("p", {
						className: "modal-subtitle",
						children: isEdit ? "Обнови текст, категория сохранится. Автор остаётся как в публикации." : "Пиши как в Obsidian: Milkdown editor, живой reader и импорт .md с вложениями."
					})] }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 self-start md:self-auto",
						children: [/* @__PURE__ */ jsxs("button", {
							type: "button",
							className: "btn-secondary px-4 py-2.5",
							onClick: () => setIsFocusMode((value) => !value),
							children: [/* @__PURE__ */ jsx(WuxiaIcon, {
								name: "eye",
								className: "inline-block w-4 h-4 mr-2 align-text-bottom"
							}), isFocusMode ? "Обычный режим" : "Фокус-режим"]
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							className: "dc-icon-btn h-[46px] w-[46px] rounded-xl shrink-0",
							onClick: onClose,
							children: /* @__PURE__ */ jsx(WuxiaIcon, {
								name: "x",
								className: "w-5 h-5"
							})
						})]
					})]
				}),
				/* @__PURE__ */ jsx(GuideForm, {
					onSubmit: handleSubmit,
					onCancel: onClose,
					isSubmitting,
					initialValues: isEdit ? initialValues : void 0,
					disableAuthor: isEdit,
					submitLabel: isEdit ? "Сохранить" : void 0,
					resetAfterSubmit: !isEdit,
					focusMode: isFocusMode
				}),
				submitError && /* @__PURE__ */ jsxs("div", {
					className: "text-red-400 text-sm mt-4 p-4 bg-red-900/20 rounded-xl border border-red-900/40",
					children: [/* @__PURE__ */ jsx(WuxiaIcon, {
						name: "alertTriangle",
						className: "w-4 h-4 mr-2 inline-block align-text-bottom"
					}), submitError instanceof Error ? submitError.message : isEdit ? "Не удалось обновить гайд" : "Не удалось создать гайд"]
				})
			]
		})
	});
}
//#endregion
//#region ../../components/sections/guides/GuideModal.tsx
function getVoterKey() {
	if (typeof window === "undefined") return "server";
	const existing = localStorage.getItem("dc_guide_voter");
	if (existing) return existing;
	const generated = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `v_${Math.random().toString(16).slice(2)}_${Date.now()}`;
	localStorage.setItem("dc_guide_voter", generated);
	return generated;
}
function GuideModal({ guideId, onClose, onGuideSelect, canModerate = false, userRole, userId }) {
	const [voterKey] = useState(getVoterKey);
	const [editOpen, setEditOpen] = useState(false);
	const [actionNotice, setActionNotice] = useState(null);
	const contentRef = useRef(null);
	const closeButtonRef = useRef(null);
	const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
	const { data: guideDetail, isLoading, error } = useGuide(guideId, voterKey);
	const { data: guides = [] } = useGuides();
	const voteGuide = useVoteGuide();
	const deleteGuide = useDeleteGuide();
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [onClose]);
	const handleVote = () => {
		voteGuide.mutate({
			id: guideId,
			voterKey
		});
	};
	const canEdit = useMemo(() => {
		if (canModerate) return true;
		const owner = guideDetail?.guide.ownerAccountId;
		if (!owner || !userId) return false;
		const ownerNum = Number(owner);
		const userNum = Number(userId);
		if (!Number.isFinite(ownerNum) || !Number.isFinite(userNum)) return false;
		return ownerNum === userNum;
	}, [
		canModerate,
		guideDetail?.guide.ownerAccountId,
		userId
	]);
	const outline = useMemo(() => extractMarkdownHeadings(guideDetail?.guide.content || ""), [guideDetail?.guide.content]);
	const backlinks = useMemo(() => {
		const currentSlug = guideDetail?.guide.slug;
		if (!currentSlug) return [];
		return guides.filter((guide) => {
			if (guide.id === guideId) return false;
			return (guide.linkTargets || []).includes(currentSlug);
		});
	}, [
		guideDetail?.guide.slug,
		guideId,
		guides
	]);
	const handleClose = useCallback(() => {
		onClose();
	}, [onClose]);
	const handleDelete = useCallback(async () => {
		try {
			await deleteGuide.mutateAsync(guideId);
			onClose();
		} catch (deleteError) {
			setActionNotice(handleApiError(deleteError));
		}
	}, [
		deleteGuide,
		guideId,
		onClose
	]);
	const stableGuideUrl = useMemo(() => {
		if (typeof window === "undefined") return `/`;
		const url = new URL(window.location.origin);
		url.pathname = "/guides";
		url.searchParams.set("guide", String(guideId));
		if (guideDetail?.guide.slug) url.searchParams.set("slug", guideDetail.guide.slug);
		return url.toString();
	}, [guideDetail, guideId]);
	const copyText = useCallback(async (text) => {
		if (typeof window === "undefined") return;
		if (navigator.clipboard && window.isSecureContext) {
			await navigator.clipboard.writeText(text);
			return;
		}
		const textarea = document.createElement("textarea");
		textarea.value = text;
		textarea.style.position = "fixed";
		textarea.style.left = "-9999px";
		textarea.style.top = "0";
		document.body.appendChild(textarea);
		textarea.focus();
		textarea.select();
		document.execCommand("copy");
		document.body.removeChild(textarea);
	}, []);
	useEffect(() => {
		const timer = window.setTimeout(() => {
			closeButtonRef.current?.focus();
		}, 40);
		return () => window.clearTimeout(timer);
	}, []);
	const handleShare = useCallback(async () => {
		if (!guideDetail) return;
		const url = stableGuideUrl;
		try {
			if (typeof navigator !== "undefined" && "share" in navigator && typeof navigator.share === "function") {
				await navigator.share({
					title: guideDetail.guide.title,
					text: `${guideDetail.guide.title} • ${guideDetail.guide.category}`,
					url
				});
				setActionNotice("Поделились");
				return;
			}
		} catch {}
		try {
			await copyText(url);
			setActionNotice("Ссылка скопирована");
		} catch {
			window.prompt("Скопируй ссылку", url);
		}
	}, [
		copyText,
		guideDetail,
		stableGuideUrl
	]);
	const handleDownload = useCallback(() => {
		if (!guideDetail || typeof window === "undefined") return;
		const g = guideDetail.guide;
		const markdown = `${[
			"---",
			`title: "${String(g.title).replace(/"/g, "\\\"")}"`,
			`category: "${String(g.category).replace(/"/g, "\\\"")}"`,
			`author: "${String(g.author).replace(/"/g, "\\\"")}"`,
			`id: "${String(g.id).replace(/"/g, "\\\"")}"`,
			`updatedAt: "${String(g.updatedAt).replace(/"/g, "\\\"")}"`,
			"source: \"Silent Moonfall Portal\"",
			"---",
			""
		].join("\n")}${g.content || ""}`;
		const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const filename = `${String(g.title || "guide").toLowerCase().replace(/[^a-z0-9\-\s_]/gi, "").trim().replace(/\s+/g, "-").slice(0, 60) || "guide"}-${g.id}.md`;
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(() => URL.revokeObjectURL(url), 1e3);
	}, [guideDetail]);
	const handleTranslate = useCallback(() => {
		if (!guideDetail || typeof window === "undefined") return;
		const storedLang = localStorage.getItem("guild_portal_lang");
		const targetLang = storedLang === "en" || storedLang === "zh" || storedLang === "ru" ? storedLang : "ru";
		const googleTarget = targetLang === "zh" ? "zh-CN" : targetLang;
		const text = guideDetail.guide.content?.trim();
		if (!text) {
			setActionNotice("Нет текста для перевода");
			return;
		}
		const translateUrl = `https://translate.google.com/?sl=auto&tl=${encodeURIComponent(googleTarget)}&text=${encodeURIComponent(text)}&op=translate`;
		window.open(translateUrl, "_blank", "noopener,noreferrer");
		setActionNotice("Открыли перевод");
	}, [guideDetail]);
	const handleScrollToHeading = useCallback((headingId) => {
		const target = contentRef.current?.querySelector(`[data-guide-anchor="${headingId}"]`);
		if (!target) return;
		target.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}, []);
	if (!mounted) return null;
	return createPortal(/* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 bg-[#080c10] flex flex-col",
		style: { zIndex: 99999 },
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "guide-modal-title",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex-shrink-0 bg-[#0a0e12] border-b border-[#1a2a38] px-4 py-3",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-3xl mx-auto flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ jsx("h3", {
							id: "guide-modal-title",
							className: "text-base font-medium text-white truncate",
							children: guideDetail?.guide.title || "Загрузка..."
						}), /* @__PURE__ */ jsx("div", {
							className: "text-xs text-gray-500 mt-0.5",
							children: guideDetail && `${guideDetail.guide.author} • ${guideDetail.guide.category}`
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 flex-wrap justify-end",
						children: [
							actionNotice && /* @__PURE__ */ jsx("span", {
								className: "ui-badge ui-badge-muted hidden sm:inline-flex",
								children: actionNotice
							}),
							guideDetail && /* @__PURE__ */ jsxs("button", {
								type: "button",
								className: `ui-chip ${guideDetail.voted ? "is-active" : ""}`,
								onClick: handleVote,
								disabled: voteGuide.isPending,
								children: ["♥ ", guideDetail.votes]
							}),
							guideDetail && /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "ui-chip",
								onClick: handleDownload,
								children: "Скачать"
							}),
							guideDetail && /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "ui-chip",
								onClick: handleShare,
								children: "Поделиться"
							}),
							guideDetail && /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "ui-chip",
								onClick: handleTranslate,
								children: "Перевести"
							}),
							guideDetail && canEdit && /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "ui-chip",
								onClick: () => {
									setActionNotice(null);
									setEditOpen(true);
								},
								children: "Редактировать"
							}),
							canModerate && /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "ui-chip ui-badge-danger",
								onClick: handleDelete,
								disabled: deleteGuide.isPending,
								children: "Удалить"
							}),
							/* @__PURE__ */ jsx("button", {
								ref: closeButtonRef,
								type: "button",
								className: "dc-icon-btn h-[42px] w-[42px] rounded-xl shrink-0 text-gray-300",
								onClick: handleClose,
								children: /* @__PURE__ */ jsx(WuxiaIcon, {
									name: "x",
									className: "w-5 h-5"
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				ref: contentRef,
				className: "flex-1 overflow-y-auto",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-6xl mx-auto px-4 py-6",
					children: [
						isLoading && /* @__PURE__ */ jsxs("div", {
							className: "loading-inline",
							"aria-live": "polite",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "loading-inline-card",
								children: [/* @__PURE__ */ jsx("div", { className: "loading-line loading-line-title" }), /* @__PURE__ */ jsxs("div", {
									className: "mt-4 space-y-3",
									children: [
										/* @__PURE__ */ jsx("div", { className: "loading-line loading-line-body" }),
										/* @__PURE__ */ jsx("div", { className: "loading-line loading-line-body loading-line-body-short" }),
										/* @__PURE__ */ jsx("div", { className: "loading-block" })
									]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "loading-inline-card",
								children: [/* @__PURE__ */ jsx("div", { className: "loading-line loading-line-short" }), /* @__PURE__ */ jsxs("div", {
									className: "mt-4 space-y-3",
									children: [
										/* @__PURE__ */ jsx("div", { className: "loading-line loading-line-body" }),
										/* @__PURE__ */ jsx("div", { className: "loading-line loading-line-body" }),
										/* @__PURE__ */ jsx("div", { className: "loading-line loading-line-body loading-line-body-short" })
									]
								})]
							})]
						}),
						error && /* @__PURE__ */ jsx("div", {
							className: "text-red-400",
							children: error instanceof Error ? error.message : "Ошибка загрузки"
						}),
						guideDetail && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
							className: "grid gap-8 xl:grid-cols-[260px_minmax(0,1fr)]",
							children: [outline.length > 0 && /* @__PURE__ */ jsxs("aside", {
								className: "xl:sticky xl:top-6 xl:self-start rounded-3xl border border-[#1f3344] bg-[#0b141d]/82 p-4 shadow-[0_18px_34px_rgba(4,8,12,0.35)]",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-sm font-medium text-[#dceaf4] mb-3",
									children: [/* @__PURE__ */ jsx(WuxiaIcon, {
										name: "list",
										className: "w-4 h-4 text-[#8fb9cc]"
									}), "Навигация"]
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-1.5 max-h-[70vh] overflow-auto pr-1",
									children: outline.map((heading) => /* @__PURE__ */ jsxs("button", {
										type: "button",
										className: "guide-outline-link",
										"data-level": heading.level,
										onClick: () => handleScrollToHeading(heading.id),
										title: heading.text,
										children: [/* @__PURE__ */ jsx("span", { className: "guide-outline-link-dot" }), /* @__PURE__ */ jsx("span", { children: heading.text })]
									}, heading.id))
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "section-stack-md",
								children: [/* @__PURE__ */ jsx(MarkdownRenderer, {
									content: guideDetail.guide.content,
									guidesIndex: guides,
									onGuideLinkClick: onGuideSelect,
									onHeadingLinkClick: handleScrollToHeading
								}), backlinks.length > 0 && /* @__PURE__ */ jsxs("div", {
									className: "rounded-3xl border border-[#1f3344] bg-[#0b141d]/82 p-5 shadow-[0_18px_34px_rgba(4,8,12,0.35)]",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 text-sm font-medium text-[#dceaf4] mb-4",
										children: [/* @__PURE__ */ jsx(WuxiaIcon, {
											name: "link",
											className: "w-4 h-4 text-[#8fb9cc]"
										}), "Упоминается в гайдах"]
									}), /* @__PURE__ */ jsx("div", {
										className: "grid gap-3 md:grid-cols-2",
										children: backlinks.map((guide) => /* @__PURE__ */ jsxs("button", {
											type: "button",
											className: "guide-backlink-card",
											onClick: () => onGuideSelect?.(guide.id),
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "guide-backlink-category",
													children: guide.category
												}),
												/* @__PURE__ */ jsx("span", {
													className: "guide-backlink-title",
													children: guide.title
												}),
												/* @__PURE__ */ jsxs("span", {
													className: "guide-backlink-meta",
													children: ["by ", guide.author]
												})
											]
										}, guide.id))
									})]
								})]
							})]
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-8 pt-6 border-t border-[#1a2a38]",
							children: /* @__PURE__ */ jsx(GuideComments, {
								guideId,
								comments: guideDetail.comments,
								canModerate,
								userRole
							})
						})] })
					]
				})
			}),
			editOpen && guideDetail && /* @__PURE__ */ jsx(GuideEditor, {
				mode: "edit",
				guideId,
				initialValues: {
					title: guideDetail.guide.title,
					content: guideDetail.guide.content,
					category: guideDetail.guide.category,
					author: guideDetail.guide.author
				},
				onClose: () => setEditOpen(false),
				onSuccess: () => {
					setEditOpen(false);
					setActionNotice("Сохранено");
				}
			})
		]
	}), document.body);
}
//#endregion
//#region ../../lib/ui/headerContext.tsx
var HeaderContext = createContext(void 0);
function HeaderProvider({ children }) {
	const [isHeaderHidden, setIsHeaderHidden] = useState(false);
	const hideHeader = () => setIsHeaderHidden(true);
	const showHeader = () => setIsHeaderHidden(false);
	return /* @__PURE__ */ jsx(HeaderContext.Provider, {
		value: {
			isHeaderHidden,
			hideHeader,
			showHeader
		},
		children
	});
}
function useHeader() {
	const context = useContext(HeaderContext);
	if (context === void 0) throw new Error("useHeader must be used within a HeaderProvider");
	return context;
}
//#endregion
//#region ../../lib/authz.ts
var roleOrder = [
	"guest",
	"member",
	"officer",
	"head",
	"sysadmin"
];
function hasRoleAtLeast(role, minimum) {
	if (!role) return false;
	return roleOrder.indexOf(role) >= roleOrder.indexOf(minimum);
}
function canModerateContent(role) {
	return hasRoleAtLeast(role, "head");
}
//#endregion
//#region ../../components/sections/guides/index.tsx
function GuidesSectionContent({ user }) {
	const [createOpen, setCreateOpen] = useState(false);
	const { hideHeader, showHeader } = useHeader();
	const { data: guides = [] } = useGuides();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const canModerate = canModerateContent(user.role);
	const replaceGuideParam = useCallback((guideId) => {
		const params = new URLSearchParams(searchParams?.toString());
		if (guideId) {
			const selectedGuide = guides.find((guide) => guide.id === guideId);
			params.set("guide", guideId);
			if (selectedGuide) params.set("slug", selectedGuide.slug || normalizeGuideTitle(selectedGuide.title));
		} else {
			params.delete("guide");
			params.delete("slug");
		}
		const next = params.toString();
		router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
	}, [
		guides,
		pathname,
		router,
		searchParams
	]);
	const openGuideId = useMemo(() => {
		const guideFromUrl = searchParams?.get("guide");
		if (guideFromUrl) return guideFromUrl;
		const slugFromUrl = searchParams?.get("slug");
		if (!slugFromUrl || guides.length === 0) return null;
		return guides.find((guide) => (guide.slug || normalizeGuideTitle(guide.title)) === normalizeGuideTitle(slugFromUrl))?.id || null;
	}, [guides, searchParams]);
	const openGuide = (guideId) => {
		replaceGuideParam(guideId);
	};
	const handleGuideClick = (guideId) => {
		openGuide(guideId);
	};
	const handleCloseGuide = () => {
		replaceGuideParam(null);
	};
	const handleCreateClick = () => {
		setCreateOpen(true);
	};
	const handleCloseCreate = () => {
		setCreateOpen(false);
	};
	const handleCreateSuccess = (guideId) => {
		openGuide(guideId);
	};
	useEffect(() => {
		const slugFromUrl = searchParams?.get("slug");
		if (!searchParams?.get("guide") && slugFromUrl && openGuideId) replaceGuideParam(openGuideId);
	}, [
		openGuideId,
		replaceGuideParam,
		searchParams
	]);
	useEffect(() => {
		if (Boolean(openGuideId) || createOpen) hideHeader();
		else showHeader();
		return () => {
			showHeader();
		};
	}, [
		createOpen,
		hideHeader,
		openGuideId,
		showHeader
	]);
	return /* @__PURE__ */ jsxs("section", {
		className: "section-shell py-10 sm:py-12",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ jsx("div", {
					className: "section-stack-lg",
					children: /* @__PURE__ */ jsx(GuidesList, {
						onGuideClick: handleGuideClick,
						onCreateClick: handleCreateClick
					})
				})
			}),
			openGuideId && /* @__PURE__ */ jsx(GuideModal, {
				guideId: openGuideId,
				onClose: handleCloseGuide,
				onGuideSelect: openGuide,
				canModerate,
				userRole: user.role,
				userId: user.id
			}),
			createOpen && /* @__PURE__ */ jsx(GuideEditor, {
				onClose: handleCloseCreate,
				onSuccess: handleCreateSuccess
			})
		]
	});
}
function GuidesSection({ user }) {
	return /* @__PURE__ */ jsx(ErrorBoundary$1, { children: /* @__PURE__ */ jsx(GuidesSectionContent, { user }) });
}
//#endregion
//#region ../../lib/auth/context.tsx
var AuthContext = createContext(void 0);
function AuthProvider({ user, children }) {
	return /* @__PURE__ */ jsx(AuthContext.Provider, {
		value: { user },
		children
	});
}
function useAuth() {
	const context = useContext(AuthContext);
	if (context === void 0) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
function useUser() {
	const { user } = useAuth();
	if (!user) return {
		id: "",
		nickname: "",
		role: "guest",
		isActive: false
	};
	return user;
}
//#endregion
//#region app/(portal)/guides/page.tsx
function GuidesPage() {
	return /* @__PURE__ */ jsx(GuidesSection, { user: useUser() });
}
//#endregion
//#region ../../lib/schemas/help.ts
var helpResponderSchema = objectType({
	userId: stringType(),
	nickname: stringType(),
	className: stringType(),
	respondedAt: stringType()
});
var helpRequestSchema = objectType({
	id: stringType(),
	title: stringType(),
	details: stringType(),
	category: stringType(),
	author: stringType(),
	authorUserId: stringType().nullable(),
	status: enumType(["open", "closed"]),
	createdAt: stringType(),
	gatheringStart: stringType(),
	gatheringEnd: stringType(),
	responders: arrayType(helpResponderSchema)
});
objectType({
	title: stringType().min(1, "Заголовок обязателен").max(140),
	details: stringType().min(10, "Минимум 10 символов").max(5e3),
	category: stringType(),
	author: stringType().max(60).optional(),
	gatheringStart: stringType().min(1, "Укажи время сбора: начало"),
	gatheringEnd: stringType().min(1, "Укажи время сбора: конец")
});
var helpRequestIdSchema = unionType([stringType(), numberType()]);
objectType({
	id: helpRequestIdSchema,
	status: enumType(["open", "closed"])
});
objectType({
	id: helpRequestIdSchema,
	gatheringStart: stringType().min(1),
	gatheringEnd: stringType().min(1)
});
objectType({
	id: helpRequestIdSchema,
	status: enumType(["open", "closed"]).optional(),
	gatheringStart: stringType().trim().min(1).optional(),
	gatheringEnd: stringType().trim().min(1).optional()
}).superRefine((value, ctx) => {
	const hasStatus = Boolean(value.status);
	const hasStart = Boolean(value.gatheringStart);
	const hasEnd = Boolean(value.gatheringEnd);
	if (!hasStatus && !(hasStart && hasEnd)) ctx.addIssue({
		code: ZodIssueCode.custom,
		message: "Nothing to update"
	});
	if ((hasStart || hasEnd) && !(hasStart && hasEnd)) ctx.addIssue({
		code: ZodIssueCode.custom,
		message: "Both gatheringStart and gatheringEnd are required"
	});
});
objectType({ id: helpRequestIdSchema });
//#endregion
//#region ../../lib/api/help.ts
var helpApi = {
	list: async (status = "open") => {
		const response = await getApiHelp({
			client: sameOriginOpenApiClient,
			query: { status }
		});
		return arrayType(helpRequestSchema).parse(response.data || []);
	},
	create: async (data) => {
		const response = await postApiHelp({
			client: sameOriginOpenApiClient,
			body: data
		});
		return helpRequestSchema.parse(response.data || {});
	},
	updateStatus: async (data) => {
		const response = await patchApiHelp({
			client: sameOriginOpenApiClient,
			body: {
				...data,
				id: String(data.id)
			}
		});
		return helpRequestSchema.parse(response.data || {});
	},
	updateTimeRange: async (data) => {
		const response = await patchApiHelp({
			client: sameOriginOpenApiClient,
			body: {
				...data,
				id: String(data.id)
			}
		});
		return helpRequestSchema.parse(response.data || {});
	},
	rsvp: async (data) => {
		const response = await postApiHelpResponders({
			client: sameOriginOpenApiClient,
			body: {
				...data,
				id: String(data.id)
			}
		});
		return helpRequestSchema.parse(response.data || {});
	},
	withdrawRsvp: async (id) => {
		const response = await deleteApiHelpResponders({
			client: sameOriginOpenApiClient,
			query: { id }
		});
		return helpRequestSchema.parse(response.data || {});
	},
	remove: async (id) => {
		const response = await deleteApiHelp({
			client: sameOriginOpenApiClient,
			query: { id }
		});
		return objectType({ success: booleanType() }).parse(response.data || {});
	}
};
//#endregion
//#region ../../lib/help/hooks.ts
var helpKeys = {
	all: ["help"],
	lists: () => [...helpKeys.all, "list"],
	list: (status) => [...helpKeys.lists(), { status }]
};
function getHelpStatusFromKey(queryKey) {
	const statusPart = queryKey[2];
	if (typeof statusPart === "object" && statusPart && "status" in statusPart) {
		const status = statusPart.status;
		if (status === "open" || status === "closed" || status === "all") return status;
	}
	return "all";
}
function updateHelpLists(queryClient, updater) {
	queryClient.getQueriesData({ queryKey: helpKeys.lists() }).forEach(([key, value]) => {
		queryClient.setQueryData(key, updater(value ?? [], getHelpStatusFromKey(key)));
	});
}
function upsertHelpRequest(items, nextItem) {
	if (items.findIndex((item) => item.id === nextItem.id) === -1) return [nextItem, ...items];
	return items.map((item) => item.id === nextItem.id ? nextItem : item);
}
function useHelp(status = "open") {
	return useQuery({
		queryKey: helpKeys.list(status),
		queryFn: () => helpApi.list(status)
	});
}
function useCreateHelpRequest() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => helpApi.create(data),
		onMutate: async (data) => {
			await queryClient.cancelQueries({ queryKey: helpKeys.lists() });
			const previousLists = queryClient.getQueriesData({ queryKey: helpKeys.lists() });
			const optimisticId = `temp-help-${Date.now()}`;
			const optimisticRequest = {
				id: optimisticId,
				title: data.title.trim(),
				details: data.details.trim(),
				category: data.category,
				author: data.author?.trim() || "You",
				authorUserId: null,
				status: "open",
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				gatheringStart: data.gatheringStart,
				gatheringEnd: data.gatheringEnd,
				responders: []
			};
			updateHelpLists(queryClient, (items, status) => status === "closed" ? items : [optimisticRequest, ...items]);
			return {
				previousLists,
				optimisticId
			};
		},
		onError: (_error, _data, context) => {
			context?.previousLists?.forEach(([key, value]) => {
				queryClient.setQueryData(key, value);
			});
		},
		onSuccess: (createdRequest, _data, context) => {
			updateHelpLists(queryClient, (items, status) => {
				if (status === "closed") return items.filter((item) => item.id !== context?.optimisticId);
				return upsertHelpRequest(items.filter((item) => item.id !== context?.optimisticId), createdRequest);
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
		}
	});
}
function useUpdateHelpStatus() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => helpApi.updateStatus(data),
		onMutate: async (data) => {
			await queryClient.cancelQueries({ queryKey: helpKeys.lists() });
			const previousLists = queryClient.getQueriesData({ queryKey: helpKeys.lists() });
			updateHelpLists(queryClient, (items, status) => {
				const currentItem = items.find((item) => item.id === data.id);
				if (!currentItem) return items;
				const nextItem = {
					...currentItem,
					status: data.status
				};
				const withoutItem = items.filter((item) => item.id !== data.id);
				if (status === "all" || status === data.status) return [nextItem, ...withoutItem];
				return withoutItem;
			});
			return { previousLists };
		},
		onError: (_error, _data, context) => {
			context?.previousLists?.forEach(([key, value]) => {
				queryClient.setQueryData(key, value);
			});
		},
		onSuccess: (updatedRequest) => {
			updateHelpLists(queryClient, (items, status) => {
				const withoutItem = items.filter((item) => item.id !== updatedRequest.id);
				if (status === "all" || status === updatedRequest.status) return [updatedRequest, ...withoutItem];
				return withoutItem;
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
		}
	});
}
function useUpdateHelpTimeRange() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => helpApi.updateTimeRange(data),
		onMutate: async (data) => {
			await queryClient.cancelQueries({ queryKey: helpKeys.lists() });
			const previousLists = queryClient.getQueriesData({ queryKey: helpKeys.lists() });
			updateHelpLists(queryClient, (items) => items.map((item) => item.id === data.id ? {
				...item,
				gatheringStart: data.gatheringStart,
				gatheringEnd: data.gatheringEnd
			} : item));
			return { previousLists };
		},
		onError: (_error, _data, context) => {
			context?.previousLists?.forEach(([key, value]) => {
				queryClient.setQueryData(key, value);
			});
		},
		onSuccess: (updatedRequest) => {
			updateHelpLists(queryClient, (items) => items.map((item) => item.id === updatedRequest.id ? updatedRequest : item));
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
		}
	});
}
function useHelpRsvp() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data) => helpApi.rsvp(data),
		onSuccess: (updatedRequest) => {
			updateHelpLists(queryClient, (items) => items.map((item) => item.id === updatedRequest.id ? updatedRequest : item));
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
		}
	});
}
function useHelpWithdrawRsvp() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => helpApi.withdrawRsvp(id),
		onSuccess: (updatedRequest) => {
			updateHelpLists(queryClient, (items) => items.map((item) => item.id === updatedRequest.id ? updatedRequest : item));
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
		}
	});
}
function useDeleteHelpRequest() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id) => helpApi.remove(id),
		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey: helpKeys.lists() });
			const previousLists = queryClient.getQueriesData({ queryKey: helpKeys.lists() });
			updateHelpLists(queryClient, (items) => items.filter((item) => item.id !== id));
			return { previousLists };
		},
		onError: (_error, _id, context) => {
			context?.previousLists?.forEach(([key, value]) => {
				queryClient.setQueryData(key, value);
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: helpKeys.lists() });
		}
	});
}
//#endregion
//#region ../../lib/classes.ts
var fallbackKnownClasses = [
	"Ironclad",
	"Bloodstorm",
	"Numina",
	"Celestune",
	"Dragon Roar",
	"Sylph",
	"Nightwalker"
];
var classVisuals = {
	Ironclad: {
		accentClassName: "text-[#f5c979]",
		surfaceClassName: "from-[#2b1f0e] via-[#4e3614] to-[#8a5c24]",
		ringClassName: "ring-[#ffd79a]/35"
	},
	Bloodstorm: {
		accentClassName: "text-[#ff7f78]",
		surfaceClassName: "from-[#2a1215] via-[#3a171b] to-[#5f1f28]",
		ringClassName: "ring-[#ff918b]/35"
	},
	Numina: {
		accentClassName: "text-[#b68cff]",
		surfaceClassName: "from-[#1d1332] via-[#312054] to-[#56308e]",
		ringClassName: "ring-[#c4a4ff]/35"
	},
	Celestune: {
		accentClassName: "text-[#4b79ff]",
		surfaceClassName: "from-[#0d1c4a] via-[#10296b] to-[#1b49b4]",
		ringClassName: "ring-[#6f96ff]/35"
	},
	"Dragon Roar": {
		accentClassName: "text-[#77ffd6]",
		surfaceClassName: "from-[#08211e] via-[#0d3934] to-[#126255]",
		ringClassName: "ring-[#98ffe0]/35"
	},
	Sylph: {
		accentClassName: "text-[#ffb8bc]",
		surfaceClassName: "from-[#231520] via-[#402134] to-[#6f3154]",
		ringClassName: "ring-[#ffc9cc]/35"
	},
	Nightwalker: {
		accentClassName: "text-[#d6fbff]",
		surfaceClassName: "from-[#0a2528] via-[#103d42] to-[#1d6b73]",
		ringClassName: "ring-[#d1fcff]/35"
	}
};
new Set(fallbackKnownClasses.map((value) => value.toLowerCase()));
function normalizeClassValue(value) {
	const normalized = String(value || "").trim();
	return normalized ? normalized : null;
}
function getKnownClassName(value) {
	const normalized = normalizeClassValue(value);
	if (!normalized) return null;
	const lowerCased = normalized.toLowerCase();
	for (const className of fallbackKnownClasses) if (className.toLowerCase() === lowerCased) return className;
	return null;
}
function getClassVisual(value) {
	const className = getKnownClassName(value);
	return className ? classVisuals[className] : null;
}
//#endregion
//#region ../../components/ClassIcon.tsx
function joinClasses(...values) {
	return values.filter(Boolean).join(" ");
}
function ClassGlyph({ className }) {
	switch (className) {
		case "Ironclad": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 64 64",
			className: "h-full w-full",
			fill: "none",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("path", {
					d: "M18 17C23 13 29 11 32 11C35 11 41 13 46 17C43 24 38 28 32 31C26 28 21 24 18 17Z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M15 24C21 28 24 35 24 47C17 44 12 37 11 29L15 24Z",
					fill: "currentColor",
					opacity: "0.82"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M49 24C43 28 40 35 40 47C47 44 52 37 53 29L49 24Z",
					fill: "currentColor",
					opacity: "0.82"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M24 47C24 37 28 33 32 31C36 33 40 37 40 47C37 51 35 53 32 54C29 53 27 51 24 47Z",
					fill: "currentColor",
					opacity: "0.44"
				})
			]
		});
		case "Bloodstorm": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 64 64",
			className: "h-full w-full",
			fill: "none",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("path", {
					d: "M29 9L36 9L40 16L34 21L36 47L32 56L28 47L30 21L24 16L29 9Z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M32 20L32 55",
					stroke: "currentColor",
					strokeWidth: "4.5",
					strokeLinecap: "round",
					opacity: "0.4"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M16 43C22 50 30 53 40 53C46 53 50 51 54 47",
					stroke: "currentColor",
					strokeWidth: "4",
					strokeLinecap: "round",
					opacity: "0.34"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M15 30C18 24 23 19 29 16",
					stroke: "currentColor",
					strokeWidth: "4",
					strokeLinecap: "round",
					opacity: "0.24"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M24 28L32 23L40 28",
					stroke: "currentColor",
					strokeWidth: "4",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					opacity: "0.78"
				})
			]
		});
		case "Numina": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 64 64",
			className: "h-full w-full",
			fill: "none",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("path", {
					d: "M30 8C30 6 31 5 32 5C33 5 34 6 34 8V14H30V8Z",
					fill: "currentColor",
					opacity: "0.9"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M32 14V19",
					stroke: "currentColor",
					strokeWidth: "3.5",
					strokeLinecap: "round",
					opacity: "0.9"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M25 21C26 18 29 16 32 16C35 16 38 18 39 21",
					stroke: "currentColor",
					strokeWidth: "3.5",
					strokeLinecap: "round",
					opacity: "0.82"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M24 24C24 21 27 19 32 19C37 19 40 21 40 24V29C40 37 37 43 32 48C27 43 24 37 24 29V24Z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M20 25C20 23 21 21 24 21",
					stroke: "currentColor",
					strokeWidth: "3.5",
					strokeLinecap: "round",
					opacity: "0.55"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M44 25C44 23 43 21 40 21",
					stroke: "currentColor",
					strokeWidth: "3.5",
					strokeLinecap: "round",
					opacity: "0.55"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M20 33C20 44 26 50 32 55",
					stroke: "currentColor",
					strokeWidth: "3.5",
					strokeLinecap: "round",
					opacity: "0.45"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M44 33C44 44 38 50 32 55",
					stroke: "currentColor",
					strokeWidth: "3.5",
					strokeLinecap: "round",
					opacity: "0.45"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M27 55H37",
					stroke: "currentColor",
					strokeWidth: "4",
					strokeLinecap: "round",
					opacity: "0.85"
				})
			]
		});
		case "Celestune": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 64 64",
			className: "h-full w-full",
			fill: "none",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("path", {
					d: "M21 51C22 37 25 23 36 13C36 24 40 31 50 39C43 47 34 51 21 51Z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M13 46C18 36 23 26 26 14C32 21 31 31 24 41C21 45 17 47 13 46Z",
					fill: "currentColor",
					opacity: "0.78"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M31 52C38 45 45 38 53 33C51 45 43 52 31 52Z",
					fill: "currentColor",
					opacity: "0.45"
				})
			]
		});
		case "Dragon Roar": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 64 64",
			className: "h-full w-full",
			fill: "none",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "32",
					cy: "12",
					r: "6",
					stroke: "currentColor",
					strokeWidth: "3.5",
					opacity: "0.9"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M32 18V50",
					stroke: "currentColor",
					strokeWidth: "4",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M20 26L32 20L44 26",
					stroke: "currentColor",
					strokeWidth: "3.5",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M18 52C22 43 27 39 32 39C37 39 42 43 46 52",
					stroke: "currentColor",
					strokeWidth: "3.5",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M24 10L18 7",
					stroke: "currentColor",
					strokeWidth: "3",
					strokeLinecap: "round",
					opacity: "0.6"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M40 10L46 7",
					stroke: "currentColor",
					strokeWidth: "3",
					strokeLinecap: "round",
					opacity: "0.6"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M17 17L13 17",
					stroke: "currentColor",
					strokeWidth: "3",
					strokeLinecap: "round",
					opacity: "0.6"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M51 17L47 17",
					stroke: "currentColor",
					strokeWidth: "3",
					strokeLinecap: "round",
					opacity: "0.6"
				})
			]
		});
		case "Sylph": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 64 64",
			className: "h-full w-full",
			fill: "none",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "31",
					cy: "33",
					r: "22",
					stroke: "currentColor",
					strokeWidth: "3.5",
					opacity: "0.34"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M46 18C40 17 34 20 30 25C26 30 25 37 26 45C20 41 16 35 16 28C16 19 24 13 34 13C39 13 43 14 46 18Z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "18",
					cy: "25",
					r: "3",
					fill: "currentColor",
					opacity: "0.75"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "47",
					cy: "45",
					r: "3",
					fill: "currentColor",
					opacity: "0.75"
				})
			]
		});
		case "Nightwalker": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 64 64",
			className: "h-full w-full",
			fill: "none",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("path", {
					d: "M29 9L36 9L40 16L34 21L36 47L32 56L28 47L30 21L24 16L29 9Z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M32 20L32 55",
					stroke: "currentColor",
					strokeWidth: "4.5",
					strokeLinecap: "round",
					opacity: "0.4"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M16 43C22 50 30 53 40 53C46 53 50 51 54 47",
					stroke: "currentColor",
					strokeWidth: "4",
					strokeLinecap: "round",
					opacity: "0.34"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M15 30C18 24 23 19 29 16",
					stroke: "currentColor",
					strokeWidth: "4",
					strokeLinecap: "round",
					opacity: "0.24"
				}),
				/* @__PURE__ */ jsx("path", {
					d: "M24 28L32 23L40 28",
					stroke: "currentColor",
					strokeWidth: "4",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					opacity: "0.78"
				})
			]
		});
		default: return null;
	}
}
function ClassIcon({ className, sizeClassName = "h-10 w-10", wrapperClassName, iconClassName }) {
	const resolvedClassName = getKnownClassName(className);
	const visual = getClassVisual(className);
	if (!resolvedClassName || !visual) return null;
	return /* @__PURE__ */ jsx("span", {
		className: joinClasses("inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-[0_14px_28px_rgba(0,0,0,0.26)] ring-1", sizeClassName, visual.surfaceClassName, visual.ringClassName, wrapperClassName),
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("span", {
			className: joinClasses("block", visual.accentClassName, iconClassName || "h-[72%] w-[72%]"),
			children: /* @__PURE__ */ jsx(ClassGlyph, { className: resolvedClassName })
		})
	});
}
function ClassBadge({ className, emptyLabel = "—", textClassName = "text-[#e6eff5]", badgeClassName, iconSizeClassName = "h-9 w-9" }) {
	const resolvedClassName = getKnownClassName(className);
	if (!resolvedClassName) return /* @__PURE__ */ jsx("span", {
		className: textClassName,
		children: className || emptyLabel
	});
	return /* @__PURE__ */ jsxs("span", {
		className: joinClasses("inline-flex items-center gap-3 min-w-0", badgeClassName),
		children: [/* @__PURE__ */ jsx(ClassIcon, {
			className: resolvedClassName,
			sizeClassName: iconSizeClassName
		}), /* @__PURE__ */ jsx("span", {
			className: joinClasses("truncate", textClassName),
			children: resolvedClassName
		})]
	});
}
//#endregion
//#region ../../components/sections/help/index.tsx
function HelpSectionContent({ user }) {
	const { t } = useTranslation();
	const [status, setStatus] = useState("open");
	const { data: requests = [], isLoading, error, refetch } = useHelp(status);
	const createRequest = useCreateHelpRequest();
	const updateStatus = useUpdateHelpStatus();
	const updateTimeRange = useUpdateHelpTimeRange();
	const rsvp = useHelpRsvp();
	const withdrawRsvp = useHelpWithdrawRsvp();
	const deleteHelpRequest = useDeleteHelpRequest();
	const [title, setTitle] = useState("");
	const [details, setDetails] = useState("");
	const [category, setCategory] = useState("outer_city_heroic");
	const [gatheringStartLocal, setGatheringStartLocal] = useState(() => {
		const now = /* @__PURE__ */ new Date();
		now.setMinutes(now.getMinutes() + 15);
		now.setSeconds(0, 0);
		const d = new Date(now);
		d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
		return d.toISOString().slice(0, 16);
	});
	const [gatheringEndLocal, setGatheringEndLocal] = useState(() => {
		const later = /* @__PURE__ */ new Date();
		later.setMinutes(later.getMinutes() + 75);
		later.setSeconds(0, 0);
		const d = new Date(later);
		d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
		return d.toISOString().slice(0, 16);
	});
	const [editingTimeId, setEditingTimeId] = useState(null);
	const [editStartLocal, setEditStartLocal] = useState("");
	const [editEndLocal, setEditEndLocal] = useState("");
	const canModerate = hasRoleAtLeast(user.role, "officer");
	const canDelete = canModerateContent(user.role);
	const categories = useMemo(() => [
		{
			value: "outer_city_heroic",
			label: "Outer City Heroic"
		},
		{
			value: "inner_city_heroic",
			label: "Inner City Heroic"
		},
		{
			value: "battle_royal",
			label: "Battle Royal"
		},
		{
			value: "12vs12",
			label: "12vs12"
		},
		{
			value: "3vs3",
			label: "3vs3"
		},
		{
			value: "secret_realm",
			label: "Secret Realm"
		}
	], []);
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!title.trim() || !details.trim()) return;
		const startDate = new Date(gatheringStartLocal);
		const endDate = new Date(gatheringEndLocal);
		if (!Number.isFinite(startDate.getTime()) || !Number.isFinite(endDate.getTime())) return;
		if (endDate.getTime() <= startDate.getTime()) return;
		const startIso = startDate.toISOString();
		const endIso = endDate.toISOString();
		await createRequest.mutateAsync({
			title,
			details,
			category,
			gatheringStart: startIso,
			gatheringEnd: endIso
		});
		setTitle("");
		setDetails("");
		setCategory("outer_city_heroic");
	};
	const formatDateTimeRange = (start, end) => {
		try {
			const s = new Date(start);
			const e = new Date(end);
			if (!Number.isFinite(s.getTime()) || !Number.isFinite(e.getTime())) return `${start} - ${end}`;
			const sameDay = s.toDateString() === e.toDateString();
			const day = s.toLocaleDateString("ru-RU", {
				day: "2-digit",
				month: "2-digit"
			});
			const st = s.toLocaleTimeString("ru-RU", {
				hour: "2-digit",
				minute: "2-digit"
			});
			const et = e.toLocaleTimeString("ru-RU", {
				hour: "2-digit",
				minute: "2-digit"
			});
			if (sameDay) return `${day} ${st}–${et}`;
			return `${day} ${st} → ${e.toLocaleDateString("ru-RU", {
				day: "2-digit",
				month: "2-digit"
			})} ${et}`;
		} catch {
			return `${start} - ${end}`;
		}
	};
	const isoToLocalInput = (iso) => {
		const d = new Date(iso);
		if (!Number.isFinite(d.getTime())) return "";
		d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
		return d.toISOString().slice(0, 16);
	};
	const startEditTime = (requestId, startIso, endIso) => {
		setEditingTimeId(requestId);
		setEditStartLocal(isoToLocalInput(startIso));
		setEditEndLocal(isoToLocalInput(endIso));
	};
	const saveEditTime = async (requestId) => {
		const startDate = new Date(editStartLocal);
		const endDate = new Date(editEndLocal);
		if (!Number.isFinite(startDate.getTime()) || !Number.isFinite(endDate.getTime())) return;
		if (endDate.getTime() <= startDate.getTime()) return;
		const startIso = startDate.toISOString();
		const endIso = endDate.toISOString();
		await updateTimeRange.mutateAsync({
			id: requestId,
			gatheringStart: startIso,
			gatheringEnd: endIso
		});
		setEditingTimeId(null);
	};
	const toggleStatus = async (requestId, currentStatus) => {
		const nextStatus = currentStatus === "closed" ? "open" : "closed";
		await updateStatus.mutateAsync({
			id: requestId,
			status: nextStatus
		});
	};
	const deleteRequest = async (requestId) => {
		try {
			await deleteHelpRequest.mutateAsync(requestId);
		} catch (error) {
			alert(handleApiError(error));
		}
	};
	return /* @__PURE__ */ jsx("section", {
		className: "section-shell py-10 sm:py-12",
		children: /* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "section-stack-lg",
				children: [/* @__PURE__ */ jsx(SectionHero, {
					icon: /* @__PURE__ */ jsx(WuxiaIcon, {
						name: "help",
						className: "w-5 h-5"
					}),
					title: t.help.title,
					subtitle: t.help.subtitle,
					chips: [
						"Support Board",
						"Open / Closed",
						"Officer Review"
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 items-start",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-2 card section-card ds-section-panel p-5 sm:p-6 lg:p-8",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center mb-6",
							children: [/* @__PURE__ */ jsx("div", {
								className: "w-12 h-12 bg-gradient-to-r from-[#2f6e8d]/30 to-[#8fb9cc]/30 rounded-full flex items-center justify-center mr-4",
								children: /* @__PURE__ */ jsx(WuxiaIcon, {
									name: "plus",
									className: "w-7 h-7 text-[#8fb9cc]"
								})
							}), /* @__PURE__ */ jsx("h3", {
								className: "text-2xl font-bold font-orbitron text-[#e6eff5]",
								children: t.help.createRequest
							})]
						}), /* @__PURE__ */ jsxs("form", {
							onSubmit: handleSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "input-field flex items-center text-sm text-gray-400",
										children: [
											t.help.profilePrefix,
											" ",
											/* @__PURE__ */ jsx("span", {
												className: "text-[#d2e5ef] ml-2",
												children: user.nickname || t.help.currentUserFallback
											})
										]
									}), /* @__PURE__ */ jsx("select", {
										value: category,
										onChange: (e) => setCategory(e.target.value),
										className: "select-field w-full",
										"aria-label": t.help.category,
										children: categories.map((c) => /* @__PURE__ */ jsx("option", {
											value: c.value,
											children: c.label
										}, c.value))
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "text-xs text-gray-400 mb-1 px-1",
										children: t.help.gatheringStart
									}), /* @__PURE__ */ jsx("input", {
										type: "datetime-local",
										value: gatheringStartLocal,
										onChange: (e) => setGatheringStartLocal(e.target.value),
										className: "input-field w-full",
										"aria-label": t.help.gatheringStart,
										required: true
									})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
										className: "text-xs text-gray-400 mb-1 px-1",
										children: t.help.gatheringEnd
									}), /* @__PURE__ */ jsx("input", {
										type: "datetime-local",
										value: gatheringEndLocal,
										onChange: (e) => setGatheringEndLocal(e.target.value),
										className: "input-field w-full",
										"aria-label": t.help.gatheringEnd,
										required: true
									})] })]
								}),
								/* @__PURE__ */ jsx("input", {
									value: title,
									onChange: (e) => setTitle(e.target.value),
									placeholder: t.help.titlePlaceholder,
									className: "input-field w-full",
									"aria-label": t.help.titlePlaceholder,
									maxLength: 140,
									required: true
								}),
								/* @__PURE__ */ jsx("textarea", {
									value: details,
									onChange: (e) => setDetails(e.target.value),
									placeholder: t.help.detailsPlaceholder,
									className: "input-field min-h-[140px] w-full",
									"aria-label": t.help.detailsPlaceholder,
									maxLength: 5e3,
									required: true
								}),
								/* @__PURE__ */ jsx("button", {
									type: "submit",
									className: "btn-primary w-full py-3",
									disabled: createRequest.isPending,
									children: createRequest.isPending ? /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center justify-center",
										children: [/* @__PURE__ */ jsx(WuxiaIcon, {
											name: "spinner",
											className: "spinner-icon w-4 h-4 mr-3"
										}), t.help.submitting]
									}) : /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center justify-center",
										children: [/* @__PURE__ */ jsx(WuxiaIcon, {
											name: "seal",
											className: "w-4 h-4 mr-3"
										}), t.help.submit]
									})
								}),
								createRequest.error && /* @__PURE__ */ jsxs("div", {
									className: "ds-notice mt-2",
									children: [/* @__PURE__ */ jsx(WuxiaIcon, {
										name: "alertTriangle",
										className: "w-4 h-4 mr-2 inline-block align-text-bottom"
									}), createRequest.error instanceof Error ? createRequest.error.message : t.help.createFailed]
								})
							]
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-3 section-stack-md",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "ds-toolbar flex-col sm:flex-row items-start sm:items-center justify-between gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-sm text-gray-400",
									children: t.help.show
								}), /* @__PURE__ */ jsx("div", {
									className: "inline-flex rounded-2xl p-1 bg-[#0b141d]/70 border border-[#223140]/70",
									children: [
										"open",
										"closed",
										"all"
									].map((value) => /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => setStatus(value),
										className: `ui-chip ${status === value ? "is-active" : ""}`,
										children: value === "open" ? t.help.open : value === "closed" ? t.help.closed : t.help.all
									}, value))
								})]
							}), /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "dc-icon-btn h-[46px] w-[46px] rounded-xl shrink-0",
								onClick: () => refetch(),
								title: t.common.refresh,
								children: /* @__PURE__ */ jsx(WuxiaIcon, {
									name: "refresh",
									className: "w-5 h-5"
								})
							})]
						}), isLoading ? /* @__PURE__ */ jsx(LoadingState, {
							title: t.help.title,
							subtitle: "Собираем активные запросы и отклики...",
							icon: /* @__PURE__ */ jsx(WuxiaIcon, {
								name: "help",
								className: "w-6 h-6 text-[#8fb9cc]"
							}),
							skeletonCount: 3,
							layout: "list"
						}) : requests.length === 0 ? /* @__PURE__ */ jsxs("div", {
							className: "card section-card ds-section-panel p-8 sm:p-10 text-center",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "flex justify-center mb-5",
									children: /* @__PURE__ */ jsx("div", {
										className: "w-16 h-16 rounded-full ds-section-panel-soft grid place-items-center",
										children: /* @__PURE__ */ jsx(WuxiaIcon, {
											name: "seal",
											className: "w-8 h-8 text-[#8fb9cc]"
										})
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-xl font-semibold text-[#e6eff5]",
									children: t.help.noRequestsTitle
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-gray-400 mt-2",
									children: t.help.noRequestsDescription
								})
							]
						}) : /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-4 sm:gap-5",
							children: requests.map((req) => {
								const isResponder = Boolean(user.id) && req.responders.some((r) => r.userId === user.id);
								const canEditTime = canModerate || req.authorUserId && user.id && req.authorUserId === user.id || !req.authorUserId && user.nickname && req.author && req.author.toLowerCase() === user.nickname.toLowerCase();
								return /* @__PURE__ */ jsx("div", {
									className: "card section-card ds-section-panel p-5 sm:p-6",
									children: /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "min-w-0",
											children: [
												/* @__PURE__ */ jsxs("div", {
													className: "flex flex-wrap items-center gap-2 mb-3",
													children: [/* @__PURE__ */ jsxs("span", {
														className: "ds-kicker text-sm font-medium",
														children: [/* @__PURE__ */ jsx(WuxiaIcon, {
															name: "tag",
															className: "inline-block w-4 h-4 mr-2 align-text-bottom"
														}), req.category]
													}), /* @__PURE__ */ jsx("span", {
														className: `ds-kicker text-sm font-medium ${req.status === "closed" ? "bg-[#0f1720]/70 text-gray-400 border border-[#223140]/70" : "bg-[#183244]/70 text-[#e6eff5] border border-[#2f6e8d]/50"}`,
														children: req.status === "closed" ? t.help.statusClosed : t.help.statusOpen
													})]
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3",
													children: [/* @__PURE__ */ jsxs("div", {
														className: "inline-flex items-center gap-2 text-sm text-gray-300",
														children: [/* @__PURE__ */ jsx(WuxiaIcon, {
															name: "calendar",
															className: "w-4 h-4 text-[#8fb9cc]"
														}), /* @__PURE__ */ jsxs("span", {
															className: "text-[#d2e5ef]",
															children: [
																t.help.gatheringLabel,
																" ",
																formatDateTimeRange(req.gatheringStart, req.gatheringEnd)
															]
														})]
													}), canEditTime && editingTimeId !== req.id && /* @__PURE__ */ jsx("button", {
														type: "button",
														className: "text-sm font-medium text-[#8fb9cc] hover:text-[#bcd6e5] transition-colors text-left",
														onClick: () => startEditTime(req.id, req.gatheringStart, req.gatheringEnd),
														children: t.help.editTime
													})]
												}),
												editingTimeId === req.id && /* @__PURE__ */ jsxs("div", {
													className: "mb-4 rounded-2xl ds-section-panel-soft p-4",
													children: [/* @__PURE__ */ jsxs("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
														children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
															className: "text-xs text-gray-400 mb-1 px-1",
															children: "Сбор: начало"
														}), /* @__PURE__ */ jsx("input", {
															type: "datetime-local",
															value: editStartLocal,
															onChange: (e) => setEditStartLocal(e.target.value),
															className: "input-field w-full",
															"aria-label": t.help.gatheringStart,
															required: true
														})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
															className: "text-xs text-gray-400 mb-1 px-1",
															children: "Сбор: конец"
														}), /* @__PURE__ */ jsx("input", {
															type: "datetime-local",
															value: editEndLocal,
															onChange: (e) => setEditEndLocal(e.target.value),
															className: "input-field w-full",
															"aria-label": t.help.gatheringEnd,
															required: true
														})] })]
													}), /* @__PURE__ */ jsxs("div", {
														className: "flex flex-wrap gap-3 mt-3",
														children: [/* @__PURE__ */ jsx("button", {
															type: "button",
															className: "btn-primary px-4 py-2 w-full sm:w-auto",
															onClick: () => saveEditTime(req.id),
															disabled: updateTimeRange.isPending,
															children: "Сохранить"
														}), /* @__PURE__ */ jsx("button", {
															type: "button",
															className: "dc-icon-btn px-4 py-2 rounded-xl w-full sm:w-auto",
															onClick: () => setEditingTimeId(null),
															children: "Отмена"
														})]
													})]
												}),
												/* @__PURE__ */ jsxs("div", {
													className: "mb-4",
													children: [/* @__PURE__ */ jsxs("div", {
														className: "text-xs text-gray-400 mb-2",
														children: [
															"Откликнулись (",
															req.responders.length,
															")"
														]
													}), req.responders.length === 0 ? /* @__PURE__ */ jsx("div", {
														className: "text-xs text-gray-500",
														children: "Пока никто не откликнулся"
													}) : /* @__PURE__ */ jsx("div", {
														className: "flex flex-wrap gap-2",
														children: req.responders.map((r) => /* @__PURE__ */ jsxs("span", {
															className: "ds-kicker gap-2 text-xs",
															title: r.respondedAt,
															children: [/* @__PURE__ */ jsx("span", { children: r.nickname }), r.className ? /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
																className: "text-[#6f8799]",
																children: "·"
															}), /* @__PURE__ */ jsx(ClassBadge, {
																className: r.className,
																textClassName: "text-[#d2e5ef] text-xs",
																iconSizeClassName: "h-6 w-6"
															})] }) : null]
														}, `${req.id}:${r.userId}`))
													})]
												}),
												/* @__PURE__ */ jsx("h3", {
													className: "text-xl font-bold font-orbitron text-[#e6eff5] mb-2 break-words",
													children: req.title
												}),
												/* @__PURE__ */ jsx("p", {
													className: "text-gray-300 whitespace-pre-wrap leading-relaxed",
													children: req.details
												}),
												req.status === "open" && /* @__PURE__ */ jsx("div", {
													className: "mt-4 flex flex-wrap gap-3",
													children: isResponder ? /* @__PURE__ */ jsx("button", {
														type: "button",
														className: "dc-icon-btn px-4 py-2 rounded-xl text-sm",
														onClick: () => withdrawRsvp.mutateAsync(req.id),
														disabled: withdrawRsvp.isPending,
														children: "Убрать себя"
													}) : /* @__PURE__ */ jsx("button", {
														type: "button",
														className: "btn-primary px-4 py-2 text-sm w-full sm:w-auto",
														onClick: () => rsvp.mutateAsync({ id: req.id }),
														disabled: rsvp.isPending,
														children: "Откликнуться"
													})
												})
											]
										}), /* @__PURE__ */ jsxs("div", {
											className: "sm:text-right text-sm text-gray-400 flex flex-col gap-3",
											children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
												className: "inline-flex items-center gap-2",
												children: [/* @__PURE__ */ jsx(WuxiaIcon, {
													name: "user",
													className: "w-4 h-4"
												}), /* @__PURE__ */ jsx("span", { children: req.author })]
											}), /* @__PURE__ */ jsxs("div", {
												className: "inline-flex items-center gap-2 mt-1",
												children: [/* @__PURE__ */ jsx(WuxiaIcon, {
													name: "calendar",
													className: "w-4 h-4"
												}), /* @__PURE__ */ jsx("span", { children: formatDate(req.createdAt) })]
											})] }), (canModerate || canDelete) && /* @__PURE__ */ jsxs("div", {
												className: "flex flex-wrap items-center gap-3 sm:justify-end",
												children: [canModerate && /* @__PURE__ */ jsxs("button", {
													type: "button",
													className: "text-sm font-medium text-[#8fb9cc] hover:text-[#bcd6e5] transition-colors",
													onClick: () => toggleStatus(req.id, req.status),
													disabled: updateStatus.isPending,
													children: [/* @__PURE__ */ jsx(WuxiaIcon, {
														name: req.status === "closed" ? "redo" : "checkCircle",
														className: "inline-block w-4 h-4 mr-2 align-text-bottom"
													}), req.status === "closed" ? "Открыть снова" : "Закрыть"]
												}), canDelete && /* @__PURE__ */ jsxs("button", {
													type: "button",
													className: "text-sm font-medium text-red-400 hover:text-red-300 transition-colors",
													onClick: () => deleteRequest(req.id),
													disabled: deleteHelpRequest.isPending,
													children: [/* @__PURE__ */ jsx(WuxiaIcon, {
														name: "trash",
														className: "inline-block w-4 h-4 mr-2 align-text-bottom"
													}), "Удалить"]
												})]
											})]
										})]
									})
								}, req.id);
							})
						})]
					})]
				})]
			})
		})
	});
}
function HelpSection(props) {
	return /* @__PURE__ */ jsx(ErrorBoundary$1, { children: /* @__PURE__ */ jsx(HelpSectionContent, { ...props }) });
}
//#endregion
//#region app/(portal)/help/page.tsx
function HelpPage() {
	return /* @__PURE__ */ jsx(HelpSection, { user: useUser() });
}
//#endregion
//#region ../../lib/schemas/news.ts
var discordDeliveryStatusSchema = enumType([
	"pending",
	"sent",
	"failed"
]);
var createNewsSchema = objectType({
	title: stringType().trim().min(3).max(160),
	content: stringType().trim().min(3).max(12e3),
	author: stringType().trim().max(120).optional(),
	pinned: booleanType().optional(),
	messageUrl: stringType().trim().url().optional()
});
var newsSchema = objectType({
	id: stringType(),
	title: stringType(),
	content: stringType(),
	author: stringType(),
	date: stringType(),
	pinned: booleanType().optional(),
	messageUrl: stringType().optional(),
	discordDeliveryStatus: discordDeliveryStatusSchema.optional(),
	discordDeliveryError: stringType().optional(),
	publishedToDiscordAt: stringType().optional()
});
var newsArraySchema = arrayType(newsSchema);
//#endregion
//#region ../../lib/api/news.ts
var newsApi = {
	list: async () => {
		const response = await getApiNews({ client: sameOriginOpenApiClient });
		return newsArraySchema.parse(response.data || []);
	},
	create: async (payload) => {
		const response = await postApiNews({
			client: sameOriginOpenApiClient,
			body: createNewsSchema.parse(payload)
		});
		return newsSchema.parse(response.data || {});
	}
};
//#endregion
//#region ../../lib/news/hooks.ts
var newsKeys = {
	all: ["news"],
	lists: () => [...newsKeys.all, "list"],
	detail: (id) => [
		...newsKeys.all,
		"detail",
		id
	]
};
function useNews() {
	return useQuery({
		queryKey: newsKeys.lists(),
		queryFn: newsApi.list,
		staleTime: 600 * 1e3
	});
}
function usePrefetchNews() {
	const queryClient = useQueryClient();
	return useCallback(() => {
		queryClient.prefetchQuery({
			queryKey: newsKeys.lists(),
			queryFn: newsApi.list,
			staleTime: 600 * 1e3
		});
	}, [queryClient]);
}
function useCreateNews() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (payload) => newsApi.create(payload),
		onMutate: async (payload) => {
			await queryClient.cancelQueries({ queryKey: newsKeys.lists() });
			const previousNews = queryClient.getQueryData(newsKeys.lists()) ?? [];
			const optimisticId = `temp-news-${Date.now()}`;
			const optimisticNews = {
				id: optimisticId,
				title: payload.title.trim(),
				content: payload.content.trim(),
				author: payload.author?.trim() || "You",
				date: (/* @__PURE__ */ new Date()).toISOString(),
				pinned: payload.pinned ?? false,
				discordDeliveryStatus: "pending"
			};
			queryClient.setQueryData(newsKeys.lists(), (old = []) => [optimisticNews, ...old]);
			return {
				previousNews,
				optimisticId
			};
		},
		onError: (_error, _payload, context) => {
			if (context?.previousNews) queryClient.setQueryData(newsKeys.lists(), context.previousNews);
		},
		onSuccess: (createdNews, _payload, context) => {
			queryClient.setQueryData(newsKeys.lists(), (old = []) => old.map((item) => item.id === context?.optimisticId ? createdNews : item));
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: newsKeys.lists() });
		}
	});
}
//#endregion
//#region ../../components/sections/news/index.tsx
var ROLE_MENTION_RE = /<@&\d+>/g;
var USER_MENTION_RE = /<@!?\d+>/g;
var CHANNEL_MENTION_RE = /<#\d+>/g;
var URL_RE = /https?:\/\/[^\s<>"'\])]+/gi;
var TRAILING_URL_PUNCTUATION_RE = /[.,;!?]+$/;
function decodeUriComponentSafe(value) {
	let decoded = value;
	for (let i = 0; i < 3; i += 1) try {
		const next = decodeURIComponent(decoded);
		if (next === decoded) break;
		decoded = next;
	} catch {
		break;
	}
	return decoded;
}
function toReadableLabel(value) {
	const normalized = decodeUriComponentSafe(value).replace(/[\-_]+/g, " ").replace(/\s+/g, " ").trim();
	if (!normalized) return "";
	return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}
function formatKnownNewsUrl(value) {
	try {
		const cleanedValue = value.replace(/[),.;!?]+$/, "");
		const url = new URL(cleanedValue);
		const guidePath = url.pathname.replace(/\/+$/, "");
		if (!guidePath.startsWith("/guides")) return decodeUriComponentSafe(value);
		const slug = url.searchParams.get("slug");
		if (!slug) {
			const pathSlug = guidePath.split("/").filter(Boolean)[1];
			return pathSlug ? toReadableLabel(pathSlug) : "Guides";
		}
		return toReadableLabel(slug);
	} catch {
		return /^https?:\/\//i.test(value) ? decodeUriComponentSafe(value) : null;
	}
}
function splitUrlFromTrailingPunctuation(value) {
	const trailingPunctuation = value.match(TRAILING_URL_PUNCTUATION_RE)?.[0] ?? "";
	if (!trailingPunctuation) return {
		href: value,
		trailingPunctuation: ""
	};
	return {
		href: value.slice(0, -trailingPunctuation.length),
		trailingPunctuation
	};
}
function normalizeNewsLine(value) {
	const trimmed = value.trim();
	if (!trimmed) return "";
	return trimmed;
}
function normalizeDiscordText(value) {
	return value.replace(ROLE_MENTION_RE, "@role").replace(USER_MENTION_RE, "@member").replace(CHANNEL_MENTION_RE, "#channel").replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n").split("\n").map((line) => normalizeNewsLine(line)).join("\n").trim();
}
function isTechnicalTitle(value) {
	const normalized = value.trim().toLowerCase();
	return !normalized || normalized === "untitled" || normalized === "@role" || normalized === "@member" || /^<[@#].*>$/.test(value.trim()) || /^https?:\/\//.test(normalized);
}
function resolveDisplayTitle(rawTitle, normalizedContent) {
	const normalizedTitle = normalizeDiscordText(rawTitle).replace(/^#+\s*/, "").trim();
	if (!isTechnicalTitle(normalizedTitle) && normalizedTitle.length >= 4) return normalizedTitle;
	return normalizedContent.split("\n").map((line) => line.replace(/^#+\s*/, "").trim()).filter(Boolean).find((line) => !isTechnicalTitle(line) && line.length >= 4) || "Guild Announcement";
}
function buildPreview(normalizedContent, displayTitle) {
	const lines = normalizedContent.split("\n").map((line) => line.trim()).filter(Boolean);
	const body = (lines[0] === displayTitle ? lines.slice(1) : lines).join("\n").trim();
	if (!body) return "Подробности обновления опубликованы в Discord-канале гильдии.";
	return body;
}
function buildFeaturedPreview(normalizedContent, displayTitle) {
	return buildPreview(normalizedContent, displayTitle);
}
function trimPreviewAtSafeBoundary(value, limit) {
	if (value.length <= limit) return value;
	const trimmedValue = value.slice(0, limit).trimEnd();
	const urlMatches = Array.from(trimmedValue.matchAll(URL_RE));
	const lastMatch = urlMatches[urlMatches.length - 1];
	if (!lastMatch) return trimmedValue;
	const matchIndex = lastMatch.index ?? 0;
	const matchEnd = matchIndex + lastMatch[0].length;
	const nextCharacter = value.charAt(matchEnd);
	if (matchEnd === trimmedValue.length && nextCharacter && /[^\s),.;!?]/.test(nextCharacter)) return trimmedValue.slice(0, matchIndex).trimEnd();
	return trimmedValue;
}
function renderNewsLineWithLinks(value, keyPrefix) {
	const urlMatches = Array.from(value.matchAll(URL_RE));
	if (urlMatches.length === 0) return value;
	const nodes = [];
	let lastIndex = 0;
	urlMatches.forEach((match, index) => {
		const matchIndex = match.index ?? 0;
		const rawUrl = match[0];
		const { href, trailingPunctuation } = splitUrlFromTrailingPunctuation(rawUrl);
		if (matchIndex > lastIndex) nodes.push(value.slice(lastIndex, matchIndex));
		if (href) nodes.push(/* @__PURE__ */ jsx("a", {
			href,
			target: "_blank",
			rel: "noopener noreferrer",
			className: "news-inline-link",
			children: formatKnownNewsUrl(href) ?? decodeUriComponentSafe(href)
		}, `${keyPrefix}-link-${index}`));
		if (trailingPunctuation) nodes.push(trailingPunctuation);
		lastIndex = matchIndex + rawUrl.length;
	});
	if (lastIndex < value.length) nodes.push(value.slice(lastIndex));
	return nodes;
}
function renderNewsTextWithLinks(value, keyPrefix) {
	return value.split("\n").map((line, index, lines) => /* @__PURE__ */ jsxs(Fragment, { children: [renderNewsLineWithLinks(line, `${keyPrefix}-${index}`), index < lines.length - 1 ? /* @__PURE__ */ jsx("br", {}) : null] }, `${keyPrefix}-line-${index}`));
}
function splitFeaturedNews(items) {
	if (items.length === 0) return {
		featured: null,
		list: []
	};
	const featured = items.find((item) => item.pinned) ?? items[0];
	return {
		featured,
		list: items.filter((item) => item.id !== featured.id)
	};
}
function DeliveryBadge({ status }) {
	if (!status) return null;
	const tone = status === "sent" ? "bg-emerald-500/12 text-emerald-200 border-emerald-400/30" : status === "failed" ? "bg-rose-500/12 text-rose-200 border-rose-400/30" : "bg-amber-500/12 text-amber-100 border-amber-400/30";
	const label = status === "sent" ? "Sent to Discord" : status === "failed" ? "Discord failed" : "Publishing";
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${tone}`,
		children: label
	});
}
function NewsSectionContent({ user }) {
	const { t } = useTranslation();
	const { data: news = [], isLoading, error, refetch } = useNews();
	const createNewsMutation = useCreateNews();
	const { featured, list } = splitFeaturedNews(news);
	const [expandedNewsIds, setExpandedNewsIds] = useState([]);
	const [isFeaturedExpanded, setIsFeaturedExpanded] = useState(false);
	const [draftTitle, setDraftTitle] = useState("");
	const [draftContent, setDraftContent] = useState("");
	const [draftPinned, setDraftPinned] = useState(false);
	const [composerNotice, setComposerNotice] = useState(null);
	const canPublish = hasRoleAtLeast(user.role, "officer");
	const composerPreview = useMemo(() => {
		const normalizedContent = normalizeDiscordText(draftContent);
		if (!normalizedContent) return null;
		const displayTitle = resolveDisplayTitle(draftTitle, normalizedContent);
		return {
			title: displayTitle,
			body: buildPreview(normalizedContent, displayTitle)
		};
	}, [draftContent, draftTitle]);
	const toggleExpandedNews = (id) => {
		setExpandedNewsIds((current) => current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]);
	};
	const submitNews = async () => {
		const title = draftTitle.trim();
		const content = draftContent.trim();
		if (title.length < 3 || content.length < 3) {
			setComposerNotice("Заполни заголовок и текст новости.");
			return;
		}
		try {
			setComposerNotice(null);
			await createNewsMutation.mutateAsync({
				title,
				content,
				pinned: draftPinned,
				author: user.nickname || void 0
			});
			setDraftTitle("");
			setDraftContent("");
			setDraftPinned(false);
			setComposerNotice("Новость опубликована и отправлена в Discord.");
		} catch (submitError) {
			setComposerNotice(handleApiError(submitError));
		}
	};
	if (isLoading) return /* @__PURE__ */ jsx(LoadingState, {
		title: t.news.title,
		subtitle: t.news.loading,
		icon: /* @__PURE__ */ jsx(WuxiaIcon, {
			name: "news",
			className: "w-6 h-6 text-red-400"
		}),
		skeletonCount: 6,
		layout: "cards"
	});
	if (error) return /* @__PURE__ */ jsx(EmptyState, {
		icon: /* @__PURE__ */ jsx(WuxiaIcon, {
			name: "alertTriangle",
			className: "w-7 h-7 text-red-400"
		}),
		title: t.news.error,
		description: error instanceof Error ? error.message : t.news.error,
		action: /* @__PURE__ */ jsxs("button", {
			onClick: () => refetch(),
			className: "btn-primary",
			children: [/* @__PURE__ */ jsx(WuxiaIcon, {
				name: "redo",
				className: "inline-block w-5 h-5 mr-2 align-text-bottom"
			}), t.errors.tryAgain]
		}),
		variant: "error"
	});
	return /* @__PURE__ */ jsx("section", {
		className: "section-shell py-10 sm:py-12",
		children: /* @__PURE__ */ jsx("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "section-stack-lg",
				children: [
					/* @__PURE__ */ jsx(SectionHero, {
						icon: /* @__PURE__ */ jsx(WuxiaIcon, {
							name: "news",
							className: "w-5 h-5"
						}),
						title: t.news.title,
						subtitle: t.news.subtitle,
						chips: [
							"Announcements",
							"Raid Plans",
							"Updates"
						]
					}),
					canPublish ? /* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 sm:gap-6 xl:grid-cols-[1.15fr_0.85fr]",
						children: [/* @__PURE__ */ jsxs("article", {
							className: "card section-card ds-section-panel p-5 sm:p-6 md:p-7",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-5 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "text-xs sm:text-sm uppercase tracking-[0.18em] text-[#9ec5d8]",
									children: "News console"
								}), /* @__PURE__ */ jsx("h3", {
									className: "mt-2 text-2xl font-bold font-orbitron text-cyan-100",
									children: "Публикация в портал и Discord"
								})] }), /* @__PURE__ */ jsx(DeliveryBadge, { status: createNewsMutation.isPending ? "pending" : void 0 })]
							}), /* @__PURE__ */ jsxs("div", {
								className: "grid gap-4",
								children: [
									/* @__PURE__ */ jsxs("label", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm text-gray-400",
											children: "Заголовок"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: draftTitle,
											onChange: (event) => setDraftTitle(event.target.value),
											className: "input-field w-full",
											placeholder: "Например: Подготовка к GVG"
										})]
									}),
									/* @__PURE__ */ jsxs("label", {
										className: "space-y-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm text-gray-400",
											children: "Текст новости"
										}), /* @__PURE__ */ jsx("textarea", {
											value: draftContent,
											onChange: (event) => setDraftContent(event.target.value),
											className: "input-field min-h-[220px] w-full resize-y",
											placeholder: "Пиши как в гайдах: заголовки, ссылки, списки. Бот адаптирует сообщение для Discord."
										})]
									}),
									/* @__PURE__ */ jsxs("label", {
										className: "inline-flex items-center gap-3 rounded-2xl ds-section-panel-soft px-4 py-3 text-sm text-cyan-50",
										children: [/* @__PURE__ */ jsx("input", {
											type: "checkbox",
											checked: draftPinned,
											onChange: (event) => setDraftPinned(event.target.checked),
											className: "h-4 w-4 accent-cyan-300"
										}), "Закрепить как featured-новость"]
									}),
									composerNotice ? /* @__PURE__ */ jsx("div", {
										className: "ds-notice border-cyan-400/20 bg-[#11202a]/75 text-[#d9edf7]",
										children: composerNotice
									}) : null,
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-wrap items-center gap-3",
										children: [/* @__PURE__ */ jsx("button", {
											type: "button",
											className: "btn-primary px-5 py-3",
											onClick: submitNews,
											disabled: createNewsMutation.isPending,
											children: createNewsMutation.isPending ? "Публикуем..." : "Опубликовать новость"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-sm text-[#c7dbe7]",
											children: "Публикация создает запись на сайте и сразу отправляет сообщение через бота."
										})]
									})
								]
							})]
						}), /* @__PURE__ */ jsxs("article", {
							className: "card section-card ds-section-panel p-5 sm:p-6 md:p-7",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "text-xs sm:text-sm uppercase tracking-[0.18em] text-[#9ec5d8]",
									children: "Discord preview"
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-2 text-xl font-bold font-orbitron text-cyan-100",
									children: "Как это будет выглядеть"
								}),
								composerPreview ? /* @__PURE__ */ jsxs("div", {
									className: "ds-section-panel mt-5 rounded-[28px] border-cyan-400/15 bg-[#0b131b]/88 p-5 shadow-[0_24px_60px_rgba(2,8,14,0.45)]",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "mb-3 flex items-center gap-2 text-xs text-cyan-100/70",
										children: [/* @__PURE__ */ jsx(DeliveryBadge, { status: "sent" }), draftPinned ? /* @__PURE__ */ jsx("span", {
											className: "rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 text-amber-200",
											children: "Pinned"
										}) : null]
									}), /* @__PURE__ */ jsxs("div", {
										className: "rounded-3xl ds-section-panel-soft border-cyan-400/12 bg-[#111b24] p-5",
										children: [
											/* @__PURE__ */ jsx("h4", {
												className: "text-xl font-bold text-cyan-100",
												children: composerPreview.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-gray-200/90",
												children: renderNewsTextWithLinks(composerPreview.body, "composer-preview")
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "mt-4 text-xs uppercase tracking-[0.22em] text-gray-500",
												children: ["Автор: ", user.nickname || "Guild Staff"]
											})
										]
									})]
								}) : /* @__PURE__ */ jsx("div", {
									className: "ds-section-panel mt-5 rounded-[28px] border-dashed border-cyan-400/20 bg-[#0b131b]/78 p-6 text-sm text-gray-400",
									children: "Заполни новость слева, и здесь появится Discord-safe превью."
								})
							]
						})]
					}) : null,
					/* @__PURE__ */ jsx("div", {
						className: "section-stack-lg",
						children: news.length === 0 ? /* @__PURE__ */ jsx(EmptyState, {
							icon: /* @__PURE__ */ jsx(WuxiaIcon, {
								name: "news",
								className: "w-10 h-10 text-gray-500"
							}),
							title: t.news.empty,
							description: t.news.emptyDescription,
							action: /* @__PURE__ */ jsxs("button", {
								onClick: () => refetch(),
								className: "btn-secondary",
								children: [/* @__PURE__ */ jsx(WuxiaIcon, {
									name: "redo",
									className: "inline-block w-5 h-5 mr-2 align-text-bottom"
								}), t.common.refresh]
							})
						}) : /* @__PURE__ */ jsxs(Fragment$1, { children: [featured ? (() => {
							const normalizedContent = normalizeDiscordText(featured.content);
							const displayTitle = resolveDisplayTitle(featured.title, normalizedContent);
							const preview = buildFeaturedPreview(normalizedContent, displayTitle);
							const canExpandFeatured = preview.length > 760;
							const featuredPreview = canExpandFeatured && !isFeaturedExpanded ? `${trimPreviewAtSafeBoundary(preview, 757)}...` : preview;
							return /* @__PURE__ */ jsxs("article", {
								className: "card news-hero section-card ds-section-panel p-5 sm:p-6 md:p-8",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2 text-xs sm:text-sm mb-4",
										children: [
											featured.pinned ? /* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-300 border border-yellow-400/30",
												children: [/* @__PURE__ */ jsx(WuxiaIcon, {
													name: "thumbtack",
													className: "w-3.5 h-3.5"
												}), "Featured"]
											}) : null,
											/* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20",
												children: [/* @__PURE__ */ jsx(WuxiaIcon, {
													name: "news",
													className: "w-3.5 h-3.5"
												}), "Guild Update"]
											}),
											/* @__PURE__ */ jsx(DeliveryBadge, { status: featured.discordDeliveryStatus })
										]
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "text-[1.45rem] sm:text-3xl font-bold font-orbitron mb-2 text-cyan-100 tracking-[0.01em]",
										children: displayTitle
									}),
									/* @__PURE__ */ jsx("p", {
										className: "news-meta mb-4",
										children: formatDate(featured.date)
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-gray-200/95 mb-6 text-base sm:text-lg leading-relaxed break-words",
										children: renderNewsTextWithLinks(featuredPreview, `featured-${featured.id}`)
									}),
									canExpandFeatured ? /* @__PURE__ */ jsx("button", {
										type: "button",
										className: "news-expand-button mb-6",
										onClick: () => setIsFeaturedExpanded((current) => !current),
										children: isFeaturedExpanded ? "Show less" : "Read full news"
									}) : null,
									/* @__PURE__ */ jsxs("div", {
										className: "news-card-footer mt-auto pt-5 border-t border-cyan-400/15",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 text-gray-300 text-sm sm:text-base",
											children: [/* @__PURE__ */ jsx(WuxiaIcon, {
												name: "user",
												className: "w-4 h-4 text-gray-400"
											}), /* @__PURE__ */ jsx("span", { children: featured.author || "Guild Staff" })]
										}), featured.messageUrl ? /* @__PURE__ */ jsxs("a", {
											href: featured.messageUrl,
											target: "_blank",
											rel: "noopener noreferrer",
											className: "news-discord-link",
											children: [/* @__PURE__ */ jsx(WuxiaIcon, {
												name: "link",
												className: "w-4 h-4"
											}), "Open in Discord"]
										}) : null]
									})
								]
							});
						})() : null, list.length > 0 ? /* @__PURE__ */ jsx("div", {
							className: "grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 items-stretch",
							children: list.map((item) => {
								const normalizedContent = normalizeDiscordText(item.content);
								const displayTitle = resolveDisplayTitle(item.title, normalizedContent);
								const preview = buildPreview(normalizedContent, displayTitle);
								const isExpanded = expandedNewsIds.includes(item.id);
								const canExpand = preview.length > 320;
								return /* @__PURE__ */ jsxs("article", {
									className: "card news-card section-card ds-section-panel p-5 sm:p-6 md:p-7",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2 text-xs sm:text-sm mb-3",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20",
												children: [/* @__PURE__ */ jsx(WuxiaIcon, {
													name: "news",
													className: "w-3.5 h-3.5"
												}), "Guild Update"]
											}), /* @__PURE__ */ jsx(DeliveryBadge, { status: item.discordDeliveryStatus })]
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "text-lg sm:text-xl font-bold font-orbitron mb-2 text-cyan-200 tracking-[0.01em]",
											children: displayTitle
										}),
										/* @__PURE__ */ jsx("p", {
											className: "news-meta mb-4",
											children: formatDate(item.date)
										}),
										/* @__PURE__ */ jsx("p", {
											className: `news-card-preview text-gray-200/95 mb-4 text-sm sm:text-base leading-relaxed break-words${isExpanded ? " is-expanded" : ""}`,
											children: renderNewsTextWithLinks(preview, `news-${item.id}`)
										}),
										canExpand ? /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "news-expand-button mb-6",
											onClick: () => toggleExpandedNews(item.id),
											children: isExpanded ? "Show less" : "Read full news"
										}) : null,
										/* @__PURE__ */ jsxs("div", {
											className: "news-card-footer mt-auto pt-4 border-t border-cyan-400/15",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "flex items-center gap-2 text-gray-300 text-sm",
												children: [/* @__PURE__ */ jsx(WuxiaIcon, {
													name: "user",
													className: "w-4 h-4 text-gray-400"
												}), /* @__PURE__ */ jsx("span", { children: item.author || "Guild Staff" })]
											}), item.messageUrl ? /* @__PURE__ */ jsxs("a", {
												href: item.messageUrl,
												target: "_blank",
												rel: "noopener noreferrer",
												className: "news-discord-link",
												children: [/* @__PURE__ */ jsx(WuxiaIcon, {
													name: "link",
													className: "w-4 h-4"
												}), "Open in Discord"]
											}) : null]
										})
									]
								}, item.id);
							})
						}) : null] })
					})
				]
			})
		})
	});
}
function NewsSection(props) {
	return /* @__PURE__ */ jsx(ErrorBoundary$1, { children: /* @__PURE__ */ jsx(NewsSectionContent, { ...props }) });
}
//#endregion
//#region app/(portal)/news/page.tsx
function NewsPage() {
	return /* @__PURE__ */ jsx(NewsSection, { user: useUser() });
}
//#endregion
//#region node_modules/vinext/dist/shims/error-boundary.js
/**
* Generic ErrorBoundary used to wrap route segments with error.tsx.
* This must be a client component since error boundaries use
* componentDidCatch / getDerivedStateFromError.
*/
var ErrorBoundary = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}
	static getDerivedStateFromError(error) {
		if (error && typeof error === "object" && "digest" in error) {
			const digest = String(error.digest);
			if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;") || digest.startsWith("NEXT_REDIRECT;")) throw error;
		}
		return { error };
	}
	reset = () => {
		this.setState({ error: null });
	};
	render() {
		if (this.state.error) {
			const FallbackComponent = this.props.fallback;
			return jsx(FallbackComponent, {
				error: this.state.error,
				reset: this.reset
			});
		}
		return this.props.children;
	}
};
/**
* Inner class component that catches notFound() errors and renders the
* not-found.tsx fallback. Resets when the pathname changes (client navigation)
* so a previous notFound() doesn't permanently stick.
*
* The ErrorBoundary above re-throws notFound errors so they propagate up to this
* boundary. This must be placed above the ErrorBoundary in the component tree.
*/
var NotFoundBoundaryInner = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notFound: false,
			previousPathname: props.pathname
		};
	}
	static getDerivedStateFromProps(props, state) {
		if (props.pathname !== state.previousPathname && state.notFound) return {
			notFound: false,
			previousPathname: props.pathname
		};
		return {
			notFound: state.notFound,
			previousPathname: props.pathname
		};
	}
	static getDerivedStateFromError(error) {
		if (error && typeof error === "object" && "digest" in error) {
			const digest = String(error.digest);
			if (digest === "NEXT_NOT_FOUND" || digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;404")) return { notFound: true };
		}
		throw error;
	}
	render() {
		if (this.state.notFound) return this.props.fallback;
		return this.props.children;
	}
};
/**
* Wrapper that reads the current pathname and passes it to the inner class
* component. This enables automatic reset on client-side navigation.
*/
function NotFoundBoundary({ fallback, children }) {
	return jsx(NotFoundBoundaryInner, {
		pathname: usePathname(),
		fallback,
		children
	});
}
//#endregion
//#region node_modules/vinext/dist/shims/layout-segment-context.js
/**
* Layout segment context provider.
*
* This is a "use client" module because it needs React's createContext
* and useContext, which are NOT available in the react-server condition.
* The RSC entry renders this as a client component boundary.
*
* The context is shared with navigation.ts via getLayoutSegmentContext()
* to avoid creating separate contexts in different modules.
*/
/**
* Wraps children with the layout segment context.
* Each layout in the App Router tree wraps its children with this provider,
* passing the remaining route tree segments below that layout level.
* Segments include route groups and resolved dynamic param values.
*/
function LayoutSegmentProvider({ childSegments, children }) {
	const ctx = getLayoutSegmentContext();
	if (!ctx) return children;
	return createElement(ctx.Provider, { value: childSegments }, children);
}
//#endregion
//#region ../../components/InputPerformanceMode.tsx
var INTERACTIVE_SELECTOR = [
	"input:not([type=\"hidden\"])",
	"textarea",
	"select",
	"[contenteditable=\"true\"]",
	".ProseMirror"
].join(", ");
function isInteractiveTarget(target) {
	return target instanceof HTMLElement && target.closest(INTERACTIVE_SELECTOR) !== null;
}
function InputPerformanceMode() {
	useEffect(() => {
		if (typeof document === "undefined") return;
		const body = document.body;
		const enable = () => {
			body.dataset.inputActive = "true";
		};
		const disableIfIdle = () => {
			const activeElement = document.activeElement;
			if (!(activeElement instanceof HTMLElement) || activeElement.closest(INTERACTIVE_SELECTOR) === null) delete body.dataset.inputActive;
		};
		const handleFocusIn = (event) => {
			if (isInteractiveTarget(event.target)) enable();
		};
		const handleFocusOut = () => {
			window.requestAnimationFrame(disableIfIdle);
		};
		disableIfIdle();
		document.addEventListener("focusin", handleFocusIn);
		document.addEventListener("focusout", handleFocusOut);
		return () => {
			document.removeEventListener("focusin", handleFocusIn);
			document.removeEventListener("focusout", handleFocusOut);
			delete body.dataset.inputActive;
		};
	}, []);
	return null;
}
//#endregion
//#region ../../node_modules/@vercel/analytics/dist/next/index.mjs
var name$1 = "@vercel/analytics";
var version$1 = "1.6.1";
var initQueue$1 = () => {
	if (window.va) return;
	window.va = function a(...params) {
		(window.vaq = window.vaq || []).push(params);
	};
};
function isBrowser$1() {
	return typeof window !== "undefined";
}
function detectEnvironment$1() {
	try {
		const env = "production";
		if (env === "development" || env === "test") return "development";
	} catch (e) {}
	return "production";
}
function setMode(mode = "auto") {
	if (mode === "auto") {
		window.vam = detectEnvironment$1();
		return;
	}
	window.vam = mode;
}
function getMode() {
	return (isBrowser$1() ? window.vam : detectEnvironment$1()) || "production";
}
function isDevelopment$1() {
	return getMode() === "development";
}
function computeRoute$1(pathname, pathParams) {
	if (!pathname || !pathParams) return pathname;
	let result = pathname;
	try {
		const entries = Object.entries(pathParams);
		for (const [key, value] of entries) if (!Array.isArray(value)) {
			const matcher = turnValueToRegExp$1(value);
			if (matcher.test(result)) result = result.replace(matcher, `/[${key}]`);
		}
		for (const [key, value] of entries) if (Array.isArray(value)) {
			const matcher = turnValueToRegExp$1(value.join("/"));
			if (matcher.test(result)) result = result.replace(matcher, `/[...${key}]`);
		}
		return result;
	} catch (e) {
		return pathname;
	}
}
function turnValueToRegExp$1(value) {
	return new RegExp(`/${escapeRegExp$1(value)}(?=[/?#]|$)`);
}
function escapeRegExp$1(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function getScriptSrc$1(props) {
	if (props.scriptSrc) return props.scriptSrc;
	if (isDevelopment$1()) return "https://va.vercel-scripts.com/v1/script.debug.js";
	if (props.basePath) return `${props.basePath}/insights/script.js`;
	return "/_vercel/insights/script.js";
}
function inject(props = { debug: true }) {
	var _a;
	if (!isBrowser$1()) return;
	setMode(props.mode);
	initQueue$1();
	if (props.beforeSend) (_a = window.va) == null || _a.call(window, "beforeSend", props.beforeSend);
	const src = getScriptSrc$1(props);
	if (document.head.querySelector(`script[src*="${src}"]`)) return;
	const script = document.createElement("script");
	script.src = src;
	script.defer = true;
	script.dataset.sdkn = name$1 + (props.framework ? `/${props.framework}` : "");
	script.dataset.sdkv = version$1;
	if (props.disableAutoTrack) script.dataset.disableAutoTrack = "1";
	if (props.endpoint) script.dataset.endpoint = props.endpoint;
	else if (props.basePath) script.dataset.endpoint = `${props.basePath}/insights`;
	if (props.dsn) script.dataset.dsn = props.dsn;
	script.onerror = () => {
		const errorMessage = isDevelopment$1() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
		console.log(`[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`);
	};
	if (isDevelopment$1() && props.debug === false) script.dataset.debug = "false";
	document.head.appendChild(script);
}
function pageview({ route, path }) {
	var _a;
	(_a = window.va) == null || _a.call(window, "pageview", {
		route,
		path
	});
}
function getBasePath$1() {
	if (typeof process === "undefined" || typeof process.env === "undefined") return;
	return process.env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH;
}
function Analytics(props) {
	useEffect(() => {
		var _a;
		if (props.beforeSend) (_a = window.va) == null || _a.call(window, "beforeSend", props.beforeSend);
	}, [props.beforeSend]);
	useEffect(() => {
		inject({
			framework: props.framework || "react",
			basePath: props.basePath ?? getBasePath$1(),
			...props.route !== void 0 && { disableAutoTrack: true },
			...props
		});
	}, []);
	useEffect(() => {
		if (props.route && props.path) pageview({
			route: props.route,
			path: props.path
		});
	}, [props.route, props.path]);
	return null;
}
var useRoute$1 = () => {
	const params = useParams();
	const searchParams = useSearchParams();
	const path = usePathname();
	if (!params) return {
		route: null,
		path
	};
	return {
		route: computeRoute$1(path, Object.keys(params).length ? params : Object.fromEntries(searchParams.entries())),
		path
	};
};
function getBasePath2$1() {
	if (typeof process === "undefined" || typeof process.env === "undefined") return;
	return process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH;
}
function AnalyticsComponent(props) {
	const { route, path } = useRoute$1();
	return /* @__PURE__ */ React.createElement(Analytics, {
		path,
		route,
		...props,
		basePath: getBasePath2$1(),
		framework: "next"
	});
}
function Analytics2(props) {
	return /* @__PURE__ */ React.createElement(Suspense, { fallback: null }, /* @__PURE__ */ React.createElement(AnalyticsComponent, { ...props }));
}
//#endregion
//#region ../../node_modules/@vercel/speed-insights/dist/next/index.mjs
var initQueue = () => {
	if (window.si) return;
	window.si = function a(...params) {
		window.siq = window.siq || [];
		window.siq.push(params);
	};
};
var name = "@vercel/speed-insights";
var version = "2.0.0";
function isBrowser() {
	return typeof window !== "undefined";
}
function detectEnvironment() {
	try {
		const env = "production";
		if (env === "development" || env === "test") return "development";
	} catch {}
	return "production";
}
function isDevelopment() {
	return detectEnvironment() === "development";
}
function computeRoute(pathname, pathParams) {
	if (!pathname || !pathParams) return pathname;
	let result = pathname;
	try {
		const entries = Object.entries(pathParams);
		for (const [key, value] of entries) if (!Array.isArray(value)) {
			const matcher = turnValueToRegExp(value);
			if (matcher.test(result)) result = result.replace(matcher, `/[${key}]`);
		}
		for (const [key, value] of entries) if (Array.isArray(value)) {
			const matcher = turnValueToRegExp(value.join("/"));
			if (matcher.test(result)) result = result.replace(matcher, `/[...${key}]`);
		}
		return result;
	} catch {
		return pathname;
	}
}
function turnValueToRegExp(value) {
	return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}
function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function getScriptSrc(props) {
	if (props.scriptSrc) return makeAbsolute(props.scriptSrc);
	if (isDevelopment()) return "https://va.vercel-scripts.com/v1/speed-insights/script.debug.js";
	if (props.dsn) return "https://va.vercel-scripts.com/v1/speed-insights/script.js";
	if (props.basePath) return makeAbsolute(`${props.basePath}/speed-insights/script.js`);
	return "/_vercel/speed-insights/script.js";
}
function loadProps(explicitProps, confString) {
	var _a;
	let props = explicitProps;
	if (confString) try {
		props = {
			...(_a = JSON.parse(confString)) == null ? void 0 : _a.speedInsights,
			...explicitProps
		};
	} catch {}
	const dataset = {
		sdkn: name + (props.framework ? `/${props.framework}` : ""),
		sdkv: version
	};
	if (props.sampleRate) dataset.sampleRate = props.sampleRate.toString();
	if (props.route) dataset.route = props.route;
	if (isDevelopment() && props.debug === false) dataset.debug = "false";
	if (props.dsn) dataset.dsn = props.dsn;
	if (props.endpoint) dataset.endpoint = makeAbsolute(props.endpoint);
	else if (props.basePath) dataset.endpoint = makeAbsolute(`${props.basePath}/speed-insights/vitals`);
	return {
		src: getScriptSrc(props),
		beforeSend: props.beforeSend,
		dataset
	};
}
function makeAbsolute(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/") ? url : `/${url}`;
}
function injectSpeedInsights(props = {}, confString) {
	var _a;
	if (!isBrowser() || props.route === null) return null;
	initQueue();
	const { beforeSend, src, dataset } = loadProps(props, confString);
	if (document.head.querySelector(`script[src*="${src}"]`)) return null;
	if (beforeSend) (_a = window.si) == null || _a.call(window, "beforeSend", beforeSend);
	const script = document.createElement("script");
	script.src = src;
	script.defer = true;
	for (const [key, value] of Object.entries(dataset)) script.dataset[key] = value;
	script.onerror = () => {
		console.log(`[Vercel Speed Insights] Failed to load script from ${src}. Please check if any content blockers are enabled and try again.`);
	};
	document.head.appendChild(script);
	return { setRoute: (route) => {
		script.dataset.route = route ?? void 0;
	} };
}
function getBasePath() {
	if (typeof process === "undefined" || typeof process.env === "undefined") return;
	return process.env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH;
}
function getConfigString() {
	if (typeof process === "undefined" || typeof process.env === "undefined") return;
	return process.env.REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG;
}
function SpeedInsights(props) {
	useEffect(() => {
		var _a;
		if (props.beforeSend) (_a = window.si) == null || _a.call(window, "beforeSend", props.beforeSend);
	}, [props.beforeSend]);
	const setScriptRoute = useRef(null);
	useEffect(() => {
		if (!setScriptRoute.current) {
			const script = injectSpeedInsights({
				framework: props.framework ?? "react",
				basePath: props.basePath ?? getBasePath(),
				...props
			}, props.configString ?? getConfigString());
			if (script) setScriptRoute.current = script.setRoute;
		}
	}, [props]);
	useEffect(() => {
		if (setScriptRoute.current && props.route) setScriptRoute.current(props.route);
	}, [props.route]);
	return null;
}
var useRoute = () => {
	const params = useParams();
	const searchParams = useSearchParams() || new URLSearchParams();
	const path = usePathname();
	if (!params) return null;
	return computeRoute(path, Object.keys(params).length ? params : Object.fromEntries(searchParams.entries()));
};
function getBasePath2() {
	if (typeof process === "undefined" || typeof process.env === "undefined") return;
	return process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH;
}
function getConfigString2() {
	if (typeof process === "undefined" || typeof process.env === "undefined") return;
	return process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG;
}
function SpeedInsightsComponent(props) {
	const route = useRoute();
	return /* @__PURE__ */ React.createElement(SpeedInsights, {
		route,
		...props,
		framework: "next",
		basePath: getBasePath2(),
		configString: getConfigString2()
	});
}
function SpeedInsights2(props) {
	return /* @__PURE__ */ React.createElement(Suspense, { fallback: null }, /* @__PURE__ */ React.createElement(SpeedInsightsComponent, { ...props }));
}
//#endregion
//#region ../../components/platform/AppTelemetry.tsx
function AppTelemetry({ enabled }) {
	if (!enabled) return null;
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Analytics2, {}), /* @__PURE__ */ jsx(SpeedInsights2, {})] });
}
//#endregion
//#region ../../components/effects/BackgroundEffects.tsx
var authSceneCards = [
	{
		className: "auth-scene-card auth-scene-card-left",
		frameClassName: "auth-scene-frame auth-scene-frame-sigil",
		symbolClassName: "auth-scene-symbol auth-scene-symbol-sigil"
	},
	{
		className: "auth-scene-card auth-scene-card-right",
		frameClassName: "auth-scene-frame auth-scene-frame-gate",
		symbolClassName: "auth-scene-symbol auth-scene-symbol-gate"
	},
	{
		className: "auth-scene-card auth-scene-card-bottom",
		frameClassName: "auth-scene-frame auth-scene-frame-scroll",
		symbolClassName: "auth-scene-symbol auth-scene-symbol-scroll"
	}
];
var authMeteors = [
	{
		top: "12%",
		left: "14%",
		width: 220,
		delay: "-1.5s",
		duration: "10s"
	},
	{
		top: "24%",
		left: "52%",
		width: 180,
		delay: "-5s",
		duration: "12s"
	},
	{
		top: "42%",
		left: "8%",
		width: 160,
		delay: "-8s",
		duration: "9s"
	},
	{
		top: "56%",
		left: "62%",
		width: 210,
		delay: "-3s",
		duration: "11s"
	},
	{
		top: "68%",
		left: "26%",
		width: 140,
		delay: "-6.5s",
		duration: "8.5s"
	}
];
function BackgroundEffects({ variant = "default" }) {
	const moonClassName = `absolute top-[-140px] right-[12%] h-[300px] w-[300px] moonfall-crescent${variant === "auth" ? " moonfall-parallax-slow" : ""}`;
	return /* @__PURE__ */ jsxs("div", {
		className: "pointer-events-none fixed inset-0 z-0 overflow-hidden",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 wuxia-backdrop" }),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 wuxia-aurora" }),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 wuxia-cursor-glow" }),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 wuxia-constellation" }),
			variant === "auth" ? /* @__PURE__ */ jsx("div", { className: "absolute inset-0 moonfall-starfield" }) : null,
			variant === "auth" ? /* @__PURE__ */ jsx("div", { className: "absolute inset-0 moonfall-fog-layer moonfall-fog-layer-far" }) : null,
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 wuxia-noise" }),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 wuxia-smoke" }),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 wuxia-scroll-grid opacity-30" }),
			variant === "auth" ? /* @__PURE__ */ jsx("div", {
				className: "auth-scene-gallery",
				children: authSceneCards.map((scene) => /* @__PURE__ */ jsxs("div", {
					className: scene.className,
					children: [/* @__PURE__ */ jsx("div", { className: scene.frameClassName }), /* @__PURE__ */ jsx("div", { className: scene.symbolClassName })]
				}, scene.className))
			}) : null,
			variant === "auth" ? /* @__PURE__ */ jsx("div", { className: "absolute inset-0 moonfall-fog-layer moonfall-fog-layer-near" }) : null,
			/* @__PURE__ */ jsx("div", { className: "absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full wuxia-glow" }),
			variant === "auth" ? /* @__PURE__ */ jsx("div", { className: "absolute top-[7%] right-[8%] h-[360px] w-[360px] rounded-full moonfall-orbit moonfall-parallax-slow" }) : null,
			/* @__PURE__ */ jsx("div", { className: moonClassName }),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 moonfall-fall" }),
			variant === "auth" ? authMeteors.map((meteor, index) => {
				return /* @__PURE__ */ jsx("div", {
					className: "absolute moonfall-meteor",
					style: {
						top: meteor.top,
						left: meteor.left,
						width: `${meteor.width}px`,
						animationDelay: meteor.delay,
						animationDuration: meteor.duration
					}
				}, `${meteor.top}-${meteor.left}-${index}`);
			}) : null,
			/* @__PURE__ */ jsx("div", { className: `absolute bottom-[-120px] right-[-80px] h-[420px] w-[420px] rounded-full wuxia-moon${variant === "auth" ? " moonfall-parallax-mid" : ""}` }),
			/* @__PURE__ */ jsx("div", { className: `absolute top-[18%] left-[-120px] h-[360px] w-[360px] rounded-full wuxia-ink${variant === "auth" ? " moonfall-parallax-light" : ""}` }),
			variant === "auth" ? /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-12%] left-[8%] h-[320px] w-[520px] moonfall-horizon" }) : null
		]
	});
}
//#endregion
//#region node_modules/vinext/dist/shims/url-safety.js
/**
* Shared URL safety utilities for Link, Form, and navigation shims.
*
* Centralizes dangerous URI scheme detection so all components and
* navigation functions use the same validation logic.
*/
/**
* Detect dangerous URI schemes that should never be navigated to.
* Strips leading whitespace and zero-width characters before testing,
* since browsers ignore these when interpreting the scheme.
*/
var DANGEROUS_SCHEME_RE = /^[\s\u200B\uFEFF]*(javascript|data|vbscript)\s*:/i;
function isDangerousScheme(url) {
	return DANGEROUS_SCHEME_RE.test(url);
}
//#endregion
//#region node_modules/vinext/dist/shims/link.js
/**
* next/link shim
*
* Renders an <a> tag with client-side navigation support.
* On click, prevents full page reload and triggers client-side
* page swap via the router's navigation system.
*/
var LinkStatusContext = createContext({ pending: false });
/** basePath from next.config.js, injected by the plugin at build time */
var __basePath = "";
function resolveHref(href) {
	if (typeof href === "string") return href;
	let url = href.pathname ?? "/";
	if (href.query) {
		const params = urlQueryToSearchParams(href.query);
		url = appendSearchParamsToUrl(url, params);
	}
	return url;
}
/**
* Check if a href is only a hash change (same pathname, different/added hash).
* Handles relative hashes like "#foo" and "?query#foo".
*/
function isHashOnlyChange(href) {
	if (href.startsWith("#")) return true;
	try {
		const current = new URL(window.location.href);
		const next = new URL(href, window.location.href);
		return current.pathname === next.pathname && current.search === next.search && next.hash !== "";
	} catch {
		return false;
	}
}
/**
* Scroll to a hash target element, or to the top if no hash.
*/
function scrollToHash(hash) {
	if (!hash || hash === "#") {
		window.scrollTo(0, 0);
		return;
	}
	const id = hash.slice(1);
	const element = document.getElementById(id);
	if (element) element.scrollIntoView({ behavior: "auto" });
}
/**
* Prefetch a URL for faster navigation.
*
* For App Router (RSC): fetches the .rsc payload in the background and
* stores it in an in-memory cache for instant use during navigation.
* For Pages Router: injects a <link rel="prefetch"> for the page module.
*
* Uses `requestIdleCallback` (or `setTimeout` fallback) to avoid blocking
* the main thread during initial page load.
*/
function prefetchUrl(href) {
	if (typeof window === "undefined") return;
	let prefetchHref = href;
	if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")) {
		const localPath = toSameOriginAppPath(href, __basePath);
		if (localPath == null) return;
		prefetchHref = localPath;
	}
	const fullHref = toBrowserNavigationHref(prefetchHref, window.location.href, __basePath);
	const rscUrl = toRscUrl(fullHref);
	const prefetched = getPrefetchedUrls();
	if (prefetched.has(rscUrl)) return;
	prefetched.add(rscUrl);
	(window.requestIdleCallback ?? ((fn) => setTimeout(fn, 100)))(() => {
		if (typeof window.__VINEXT_RSC_NAVIGATE__ === "function") fetch(rscUrl, {
			headers: { Accept: "text/x-component" },
			credentials: "include",
			priority: "low",
			purpose: "prefetch"
		}).then((response) => {
			if (response.ok) storePrefetchResponse(rscUrl, response);
			else prefetched.delete(rscUrl);
		}).catch(() => {
			prefetched.delete(rscUrl);
		});
		else if (window.__NEXT_DATA__?.__vinext?.pageModuleUrl) {
			const link = document.createElement("link");
			link.rel = "prefetch";
			link.href = fullHref;
			link.as = "document";
			document.head.appendChild(link);
		}
	});
}
/**
* Shared IntersectionObserver for viewport-based prefetching.
* All Link elements use the same observer to minimize resource usage.
*/
var sharedObserver = null;
var observerCallbacks = /* @__PURE__ */ new WeakMap();
function getSharedObserver() {
	if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return null;
	if (sharedObserver) return sharedObserver;
	sharedObserver = new IntersectionObserver((entries) => {
		for (const entry of entries) if (entry.isIntersecting) {
			const callback = observerCallbacks.get(entry.target);
			if (callback) {
				callback();
				sharedObserver?.unobserve(entry.target);
				observerCallbacks.delete(entry.target);
			}
		}
	}, { rootMargin: "250px" });
	return sharedObserver;
}
function getDefaultLocale() {
	if (typeof window !== "undefined") return window.__VINEXT_DEFAULT_LOCALE__;
	return globalThis.__VINEXT_DEFAULT_LOCALE__;
}
/**
* Apply locale prefix to a URL path based on the locale prop.
* - locale="fr" → prepend /fr (unless it already has a locale prefix)
* - locale={false} → use the href as-is (no locale prefix, link to default)
* - locale=undefined → use current locale (href as-is in most cases)
*/
function applyLocaleToHref(href, locale) {
	if (locale === false) return href;
	if (locale === void 0) return href;
	if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")) return href;
	if (locale === getDefaultLocale()) return href;
	if (href.startsWith(`/${locale}/`) || href === `/${locale}`) return href;
	return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}
var Link = forwardRef(function Link({ href, as, replace = false, prefetch: prefetchProp, scroll = true, children, onClick, onNavigate, ...rest }, forwardedRef) {
	const { locale, ...restWithoutLocale } = rest;
	const resolvedHref = as ?? resolveHref(href);
	const isDangerous = typeof resolvedHref === "string" && isDangerousScheme(resolvedHref);
	const localizedHref = applyLocaleToHref(isDangerous ? "/" : resolvedHref, locale);
	const fullHref = withBasePath(localizedHref, __basePath);
	const [pending, setPending] = useState(false);
	const mountedRef = useRef(true);
	useEffect(() => {
		mountedRef.current = true;
		return () => {
			mountedRef.current = false;
		};
	}, []);
	const internalRef = useRef(null);
	const shouldPrefetch = prefetchProp !== false && !isDangerous;
	const setRefs = useCallback((node) => {
		internalRef.current = node;
		if (typeof forwardedRef === "function") forwardedRef(node);
		else if (forwardedRef) forwardedRef.current = node;
	}, [forwardedRef]);
	useEffect(() => {
		if (!shouldPrefetch || typeof window === "undefined") return;
		const node = internalRef.current;
		if (!node) return;
		let hrefToPrefetch = localizedHref;
		if (localizedHref.startsWith("http://") || localizedHref.startsWith("https://") || localizedHref.startsWith("//")) {
			const localPath = toSameOriginAppPath(localizedHref, __basePath);
			if (localPath == null) return;
			hrefToPrefetch = localPath;
		}
		const observer = getSharedObserver();
		if (!observer) return;
		observerCallbacks.set(node, () => prefetchUrl(hrefToPrefetch));
		observer.observe(node);
		return () => {
			observer.unobserve(node);
			observerCallbacks.delete(node);
		};
	}, [shouldPrefetch, localizedHref]);
	const handleClick = async (e) => {
		if (onClick) onClick(e);
		if (e.defaultPrevented) return;
		if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		if (e.currentTarget.target && e.currentTarget.target !== "_self") return;
		let navigateHref = localizedHref;
		if (resolvedHref.startsWith("http://") || resolvedHref.startsWith("https://") || resolvedHref.startsWith("//")) {
			const localPath = toSameOriginAppPath(resolvedHref, __basePath);
			if (localPath == null) return;
			navigateHref = localPath;
		}
		e.preventDefault();
		const absoluteHref = resolveRelativeHref(navigateHref, window.location.href, __basePath);
		const absoluteFullHref = toBrowserNavigationHref(navigateHref, window.location.href, __basePath);
		if (onNavigate) try {
			const navUrl = new URL(absoluteFullHref, window.location.origin);
			let prevented = false;
			const navEvent = {
				url: navUrl,
				preventDefault() {
					prevented = true;
				},
				get defaultPrevented() {
					return prevented;
				}
			};
			onNavigate(navEvent);
			if (navEvent.defaultPrevented) return;
		} catch {}
		if (!replace) {
			const state = window.history.state ?? {};
			window.history.replaceState({
				...state,
				__vinext_scrollX: window.scrollX,
				__vinext_scrollY: window.scrollY
			}, "");
		}
		if (typeof window !== "undefined" && isHashOnlyChange(absoluteFullHref)) {
			const hash = absoluteFullHref.includes("#") ? absoluteFullHref.slice(absoluteFullHref.indexOf("#")) : "";
			if (replace) window.history.replaceState(null, "", absoluteFullHref);
			else window.history.pushState(null, "", absoluteFullHref);
			if (scroll) scrollToHash(hash);
			return;
		}
		const hashIdx = absoluteFullHref.indexOf("#");
		const hash = hashIdx !== -1 ? absoluteFullHref.slice(hashIdx) : "";
		if (typeof window.__VINEXT_RSC_NAVIGATE__ === "function") {
			if (replace) window.history.replaceState(null, "", absoluteFullHref);
			else window.history.pushState(null, "", absoluteFullHref);
			setPending(true);
			try {
				await window.__VINEXT_RSC_NAVIGATE__(absoluteFullHref);
			} finally {
				if (mountedRef.current) setPending(false);
			}
		} else try {
			const Router = (await import("./router-BTidd04k.js")).default;
			if (replace) await Router.replace(absoluteHref, void 0, { scroll });
			else await Router.push(absoluteHref, void 0, { scroll });
		} catch {
			if (replace) window.history.replaceState({}, "", absoluteFullHref);
			else window.history.pushState({}, "", absoluteFullHref);
			window.dispatchEvent(new PopStateEvent("popstate"));
		}
		if (scroll) if (hash) scrollToHash(hash);
		else window.scrollTo(0, 0);
	};
	const { passHref: _p, ...anchorProps } = restWithoutLocale;
	const linkStatusValue = React.useMemo(() => ({ pending }), [pending]);
	if (isDangerous) return jsx("a", {
		...anchorProps,
		children
	});
	return jsx(LinkStatusContext.Provider, {
		value: linkStatusValue,
		children: jsx("a", {
			ref: setRefs,
			href: fullHref,
			onClick: handleClick,
			...anchorProps,
			children
		})
	});
});
//#endregion
//#region ../../lib/i18n.ts
var sectionLabels = {
	ru: {
		registration: "Участники",
		schedule: "Расписание",
		calendar: "Календарь",
		analytics: "Аналитика",
		workflow: "Автоматизация",
		integrations: "Интеграции",
		pvp: "PvP",
		news: "Новости",
		guides: "Гайды",
		absences: "Отсутствия",
		help: "Помощь",
		about: "Дашборд",
		calculator: "Калькулятор DPS",
		profile: "Кабинет"
	},
	en: {
		registration: "Members",
		schedule: "Schedule",
		calendar: "Calendar",
		analytics: "Analytics",
		workflow: "Automation",
		integrations: "Integrations",
		pvp: "PvP",
		news: "News",
		guides: "Guides",
		absences: "Absences",
		help: "Help",
		about: "Dashboard",
		calculator: "DPS Calculator",
		profile: "Profile"
	},
	zh: {
		registration: "成员",
		schedule: "日程",
		calendar: "日历",
		analytics: "分析",
		workflow: "自动化",
		integrations: "集成",
		pvp: "PvP",
		news: "公告",
		guides: "攻略",
		absences: "请假",
		help: "求助",
		about: "总览",
		calculator: "DPS 计算器",
		profile: "个人页"
	}
};
var headerCopy = {
	ru: {
		brandSubtitle: "Гильдия · Justice Mobile",
		activeSection: "Раздел",
		refresh: "Обновить данные",
		logout: "Выйти",
		languageSwitcher: "Язык интерфейса"
	},
	en: {
		brandSubtitle: "Guild · Justice Mobile",
		activeSection: "Section",
		refresh: "Refresh data",
		logout: "Logout",
		languageSwitcher: "Interface language"
	},
	zh: {
		brandSubtitle: "公会 · Justice Mobile",
		activeSection: "当前",
		refresh: "刷新数据",
		logout: "退出",
		languageSwitcher: "界面语言"
	}
};
var portalCopy = {
	ru: {
		oath: "Дисциплина · Командная игра · Победа",
		heroTag: "Silent Moonfall | Гильдия",
		heroTitle: "Silent Moonfall — гильдия в Justice Mobile",
		heroSubtitle: "Собираем сильных игроков для рейдов, PvP и прогресса. Четкая коммуникация, уважение и стабильный онлайн.",
		heroCtaPrimary: "Расписание",
		heroCtaSecondary: "Гайды",
		heroManifestoTitle: "О сообществе",
		heroManifestoBody: "Silent Moonfall — гильдия игроков, которые приходят за результатом и остаются за атмосферой. Мы помогаем расти новичкам, усиливаем опытных и играем как единая команда.",
		ritualOneTitle: "Вступление",
		ritualOneBody: "Быстрый вход и знакомство с составом.",
		ritualTwoTitle: "Правила",
		ritualTwoBody: "Уважение, активность и ответственность.",
		ritualThreeTitle: "Сообщество",
		ritualThreeBody: "Стабильная команда с сильной репутацией.",
		pillarOne: "Активное участие",
		pillarTwo: "Развитие навыков",
		pillarThree: "Совместный контент",
		pillarFour: "Командные достижения"
	},
	en: {
		oath: "Discipline · Teamplay · Victory",
		heroTag: "Silent Moonfall | Guild",
		heroTitle: "Silent Moonfall — guild in Justice Mobile",
		heroSubtitle: "We bring focused players together for raids, PvP and steady progress. Clear communication, respect and consistent activity.",
		heroCtaPrimary: "Schedule",
		heroCtaSecondary: "Guides",
		heroManifestoTitle: "About the guild",
		heroManifestoBody: "Silent Moonfall is a guild built for results without losing the human side. We help new players grow, sharpen veterans, and clear hard content together as one team.",
		ritualOneTitle: "Joining",
		ritualOneBody: "Quick entry and team onboarding.",
		ritualTwoTitle: "Guidelines",
		ritualTwoBody: "Respect, activity, accountability.",
		ritualThreeTitle: "Community",
		ritualThreeBody: "Reliable roster with strong server reputation.",
		pillarOne: "Active participation",
		pillarTwo: "Skill development",
		pillarThree: "Group content",
		pillarFour: "Team achievements"
	},
	zh: {
		oath: "纪律 · 协作 · 胜利",
		heroTag: "Silent Moonfall | 公会",
		heroTitle: "Silent Moonfall — Justice Mobile 公会",
		heroSubtitle: "我们集结专注的玩家进行团本、PvP 与稳定成长。清晰沟通、相互尊重、长期活跃。",
		heroCtaPrimary: "日程",
		heroCtaSecondary: "攻略",
		heroManifestoTitle: "关于公会",
		heroManifestoBody: "Silent Moonfall 追求成绩，也重视团队氛围。我们帮助新成员成长，打磨核心成员，作为一个整体挑战高难内容。",
		ritualOneTitle: "加入",
		ritualOneBody: "快速入会并完成团队熟悉。",
		ritualTwoTitle: "规则",
		ritualTwoBody: "尊重、活跃、责任感。",
		ritualThreeTitle: "团队",
		ritualThreeBody: "稳定阵容，良好服务器口碑。",
		pillarOne: "积极参与",
		pillarTwo: "能力提升",
		pillarThree: "团队内容",
		pillarFour: "共同成就"
	}
};
//#endregion
//#region ../../lib/nav.ts
var navItems = [
	{
		section: "about",
		href: "/",
		icon: "eye"
	},
	{
		section: "news",
		href: "/news",
		icon: "news"
	},
	{
		section: "registration",
		href: "/members",
		icon: "registration"
	},
	{
		section: "schedule",
		href: "/schedule",
		icon: "schedule"
	},
	{
		section: "calendar",
		href: "/calendar",
		icon: "calendar"
	},
	{
		section: "analytics",
		href: "/analytics",
		icon: "analytics"
	},
	{
		section: "workflow",
		href: "/workflow",
		icon: "workflow"
	},
	{
		section: "integrations",
		href: "/integrations",
		icon: "integrations"
	},
	{
		section: "pvp",
		href: "/pvp",
		icon: "sword"
	},
	{
		section: "guides",
		href: "/guides",
		icon: "guides"
	},
	{
		section: "help",
		href: "/help",
		icon: "help"
	},
	{
		section: "absences",
		href: "/absences",
		icon: "absences"
	},
	{
		section: "calculator",
		href: "/calculator",
		icon: "calculator"
	},
	{
		section: "profile",
		href: "/profile",
		icon: "profile"
	}
];
//#endregion
//#region ../../components/shell/Header.tsx
function Header({ currentSection, onLogout, language, onLanguageChange, onNavPrefetch }) {
	const [headerCompact, setHeaderCompact] = useState(false);
	const handleRefresh = () => {
		window.location.reload();
	};
	useEffect(() => {
		if (typeof window === "undefined") return;
		const threshold = 72;
		let frame = 0;
		const update = () => {
			setHeaderCompact(window.scrollY > threshold);
			frame = 0;
		};
		const handleScroll = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (frame) window.cancelAnimationFrame(frame);
		};
	}, []);
	const labels = useMemo(() => headerCopy[language], [language]);
	const orderLabels = useMemo(() => {
		return sectionLabels[language];
	}, [language]);
	const sectionLabel = orderLabels[currentSection];
	return /* @__PURE__ */ jsx("header", {
		className: `dc-header sticky top-0 z-40 ${headerCompact ? "dc-header--compact" : ""}`,
		children: /* @__PURE__ */ jsxs("div", {
			className: `dc-header-panel max-w-7xl mx-auto px-4 sm:px-6 ${headerCompact ? "py-2.5" : "py-3 sm:py-3.5"}`,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "dc-header-top flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4",
				children: [/* @__PURE__ */ jsxs(Link, {
					href: "/",
					className: "dc-brand-block flex min-w-0 items-start gap-3 sm:items-center sm:gap-4 text-left group",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative shrink-0",
						children: [/* @__PURE__ */ jsx("div", {
							className: "seal-ring",
							children: /* @__PURE__ */ jsx("div", {
								className: "seal-core",
								children: /* @__PURE__ */ jsx(WuxiaIcon, {
									name: "skull",
									className: "w-5 h-5 text-white"
								})
							})
						}), /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 hidden sm:block w-4 h-4 bg-[#5fd1d4] rounded-full border-2 border-[#0a1118]" })]
					}), /* @__PURE__ */ jsxs("div", {
						className: "min-w-0 text-left",
						children: [
							/* @__PURE__ */ jsx("h1", {
								className: "text-[1.9rem] sm:text-2xl font-bold font-orbitron dc-text drop-shadow leading-none",
								children: "Silent Moonfall"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs sm:text-sm dc-muted font-roboto leading-snug sm:whitespace-nowrap",
								children: labels.brandSubtitle
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "dc-header-oath hidden sm:flex flex-wrap items-center gap-2 mt-2",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "wuxia-tag wuxia-tag-compact",
									children: [/* @__PURE__ */ jsx(WuxiaIcon, {
										name: "eye",
										className: "w-4 h-4"
									}), /* @__PURE__ */ jsx("span", {
										className: "wuxia-tag-text",
										children: portalCopy[language].oath
									})]
								}), /* @__PURE__ */ jsxs("span", {
									className: "wuxia-tag wuxia-tag-compact",
									children: [/* @__PURE__ */ jsx(WuxiaIcon, {
										name: "seal",
										className: "w-4 h-4"
									}), /* @__PURE__ */ jsxs("span", {
										className: "wuxia-tag-text",
										children: [
											labels.activeSection,
											": ",
											sectionLabel
										]
									})]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "sm:hidden mt-2",
								children: /* @__PURE__ */ jsxs("span", {
									className: "wuxia-tag wuxia-tag-compact",
									children: [/* @__PURE__ */ jsx(WuxiaIcon, {
										name: "seal",
										className: "w-4 h-4"
									}), /* @__PURE__ */ jsx("span", {
										className: "wuxia-tag-text",
										children: sectionLabel
									})]
								})
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "dc-toolbar flex w-full sm:w-auto flex-wrap items-center justify-between sm:justify-end gap-2",
					children: [
						/* @__PURE__ */ jsxs("select", {
							id: "langSwitch",
							value: language,
							onChange: (e) => onLanguageChange(e.target.value),
							"aria-label": labels.languageSwitcher,
							className: "dc-select min-w-[102px] flex-1 sm:flex-none rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4a90b0]/40 transition-all font-medium",
							children: [
								/* @__PURE__ */ jsx("option", {
									value: "ru",
									children: "RU"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "en",
									children: "EN"
								}),
								/* @__PURE__ */ jsx("option", {
									value: "zh",
									children: "简体中文"
								})
							]
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: handleRefresh,
							className: "dc-icon-btn p-2.5 rounded-xl",
							title: labels.refresh,
							"aria-label": labels.refresh,
							children: /* @__PURE__ */ jsx(WuxiaIcon, {
								name: "refresh",
								className: "w-5 h-5"
							})
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: onLogout,
							className: "dc-icon-btn dc-icon-btn-accent p-2.5 rounded-xl",
							title: labels.logout,
							"aria-label": labels.logout,
							children: /* @__PURE__ */ jsx(WuxiaIcon, {
								name: "logout",
								className: "w-5 h-5"
							})
						})
					]
				})]
			}), /* @__PURE__ */ jsx("nav", {
				className: "hidden md:block mt-3",
				children: /* @__PURE__ */ jsx("div", {
					className: "dc-nav-shell",
					children: /* @__PURE__ */ jsx("div", {
						className: `dc-order dc-nav-scroll ${headerCompact ? "dc-order--compact" : "dc-order--full"}`,
						children: navItems.map((item) => /* @__PURE__ */ jsxs(Link, {
							href: item.href,
							onMouseEnter: () => onNavPrefetch?.(item.section),
							onFocus: () => onNavPrefetch?.(item.section),
							onTouchStart: () => onNavPrefetch?.(item.section),
							className: `dc-order-step ${currentSection === item.section ? "is-active" : ""}`,
							"aria-label": orderLabels[item.section],
							"aria-current": currentSection === item.section ? "page" : void 0,
							title: orderLabels[item.section],
							children: [/* @__PURE__ */ jsx("span", {
								className: "dc-order-dot dc-accent",
								children: /* @__PURE__ */ jsx(WuxiaIcon, {
									name: item.icon,
									className: "w-4 h-4"
								})
							}), /* @__PURE__ */ jsx("span", {
								className: "dc-order-label",
								children: orderLabels[item.section]
							})]
						}, item.section))
					})
				})
			})]
		})
	});
}
//#endregion
//#region ../../components/shell/MobileNav.tsx
function MobileNav({ currentSection, language, onNavPrefetch }) {
	const [isMoreOpen, setIsMoreOpen] = useState(false);
	const primaryItems = useMemo(() => navItems.filter((item) => [
		"about",
		"news",
		"registration",
		"schedule"
	].includes(item.section)), []);
	const secondaryItems = useMemo(() => navItems.filter((item) => !primaryItems.some((primaryItem) => primaryItem.section === item.section)), [primaryItems]);
	const isMoreActive = secondaryItems.some((item) => item.section === currentSection);
	const moreLabel = language === "ru" ? "Еще" : language === "zh" ? "更多" : "More";
	return /* @__PURE__ */ jsxs("div", {
		className: "md:hidden fixed inset-x-0 bottom-0 z-40 px-[max(12px,env(safe-area-inset-left))] pb-[max(10px,env(safe-area-inset-bottom))] pr-[max(12px,env(safe-area-inset-right))]",
		children: [isMoreOpen ? /* @__PURE__ */ jsx("div", {
			className: "mobile-nav-sheet mobile-nav-frame mb-3",
			children: /* @__PURE__ */ jsx("div", {
				className: "mobile-nav-sheet-grid",
				children: secondaryItems.map((item) => /* @__PURE__ */ jsxs(Link, {
					href: item.href,
					onClick: () => setIsMoreOpen(false),
					onTouchStart: () => onNavPrefetch?.(item.section),
					onMouseEnter: () => onNavPrefetch?.(item.section),
					onFocus: () => onNavPrefetch?.(item.section),
					className: `mobile-nav-sheet-link ${currentSection === item.section ? "is-active" : ""}`,
					"aria-label": sectionLabels[language][item.section],
					"aria-current": currentSection === item.section ? "page" : void 0,
					title: sectionLabels[language][item.section],
					children: [/* @__PURE__ */ jsx("span", {
						className: "mobile-nav-sheet-icon dc-accent",
						children: /* @__PURE__ */ jsx(WuxiaIcon, {
							name: item.icon,
							className: "h-5 w-5"
						})
					}), /* @__PURE__ */ jsx("span", {
						className: "min-w-0",
						children: sectionLabels[language][item.section]
					})]
				}, item.section))
			})
		}) : null, /* @__PURE__ */ jsx("div", {
			className: "wuxia-dock mobile-nav-dock bg-gradient-to-t from-[#0a1118]/96 to-[#111d27]/88 backdrop-blur-xl border border-[#223544]/60 shadow-2xl shadow-black/45",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between gap-1.5 no-scrollbar",
				children: [primaryItems.map((item) => /* @__PURE__ */ jsxs(Link, {
					href: item.href,
					onClick: () => setIsMoreOpen(false),
					onTouchStart: () => onNavPrefetch?.(item.section),
					onMouseEnter: () => onNavPrefetch?.(item.section),
					onFocus: () => onNavPrefetch?.(item.section),
					className: `nav-chip mobile-nav-link flex flex-1 flex-col items-center justify-center rounded-2xl transition-all duration-300 ${currentSection === item.section ? "is-active" : ""}`,
					"aria-label": sectionLabels[language][item.section],
					"aria-current": currentSection === item.section ? "page" : void 0,
					title: sectionLabels[language][item.section],
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 dc-accent",
						children: /* @__PURE__ */ jsx(WuxiaIcon, {
							name: item.icon,
							className: "w-5 h-5"
						})
					}), /* @__PURE__ */ jsx("span", {
						className: "text-[10px] font-semibold leading-none tracking-[0.01em] whitespace-nowrap sm:text-[11px]",
						children: sectionLabels[language][item.section]
					})]
				}, item.section)), /* @__PURE__ */ jsxs("button", {
					type: "button",
					className: `nav-chip mobile-nav-link mobile-nav-more flex flex-1 flex-col items-center justify-center rounded-2xl transition-all duration-300 ${isMoreOpen || isMoreActive ? "is-active" : ""}`,
					onClick: () => setIsMoreOpen((value) => !value),
					"aria-expanded": isMoreOpen,
					"aria-label": moreLabel,
					title: moreLabel,
					children: [/* @__PURE__ */ jsx("span", {
						className: "mb-1 dc-accent",
						children: /* @__PURE__ */ jsx(WuxiaIcon, {
							name: "dots",
							className: "w-5 h-5"
						})
					}), /* @__PURE__ */ jsx("span", {
						className: "text-[10px] font-semibold leading-none tracking-[0.01em] whitespace-nowrap sm:text-[11px]",
						children: moreLabel
					})]
				})]
			})
		})]
	});
}
//#endregion
//#region ../../lib/schemas/absence.ts
var absenceStatuses = [
	"pending",
	"approved",
	"rejected"
];
var absenceSchema = objectType({
	id: stringType(),
	member: stringType(),
	startDate: stringType(),
	endDate: stringType(),
	reason: stringType(),
	status: enumType(absenceStatuses)
});
var absencesArraySchema = arrayType(absenceSchema);
objectType({
	member: stringType().max(120).optional(),
	startDate: stringType().min(1, "Дата начала обязательна"),
	endDate: stringType().min(1, "Дата окончания обязательна"),
	reason: stringType().min(1, "Причина обязательна").max(500, "Максимум 500 символов")
});
objectType({
	id: stringType().min(1),
	status: enumType(absenceStatuses)
});
//#endregion
//#region ../../lib/api/absences.ts
var absencesApi = {
	list: async () => {
		const response = await getApiDiscordProxyAbsences({ client: sameOriginOpenApiClient });
		return absencesArraySchema.parse(response.data || []);
	},
	create: async (data) => {
		const response = await postApiDiscordProxyAbsences({
			client: sameOriginOpenApiClient,
			body: data
		});
		return absenceSchema.parse(response.data || {});
	},
	updateStatus: async (data) => {
		const response = await patchApiDiscordProxyAbsences({
			client: sameOriginOpenApiClient,
			body: data
		});
		return absenceSchema.parse(response.data || {});
	}
};
//#endregion
//#region ../../lib/absences/hooks.ts
var absenceKeys = {
	all: ["absences"],
	lists: () => [...absenceKeys.all, "list"]
};
function usePrefetchAbsences() {
	const queryClient = useQueryClient();
	return useCallback(() => {
		queryClient.prefetchQuery({
			queryKey: absenceKeys.lists(),
			queryFn: absencesApi.list,
			staleTime: 300 * 1e3
		});
	}, [queryClient]);
}
var prefixOptionSchema = enumType([
	"Чертила",
	"VIP",
	"Boobs",
	"Moonborn",
	"Raid Lead",
	"PvP Ace",
	"Abyss Walker"
]);
var registrationsArraySchema = arrayType(objectType({
	discord: stringType(),
	discordHandle: stringType().nullable().optional(),
	avatarUrl: stringType().nullable().optional(),
	prefix: stringType().nullable().optional(),
	nickname: stringType(),
	rank: enumType([
		"guest",
		"member",
		"officer",
		"head",
		"sysadmin"
	]),
	class: stringType(),
	guild: stringType(),
	joinDate: stringType(),
	kpi: numberType(),
	elo: numberType().default(0),
	mmr20: numberType().default(0),
	bounty: numberType().default(0),
	marks: numberType().default(0),
	outerHeroic: numberType().default(0),
	innerHeroic: numberType().default(0),
	crimsonSands: numberType().default(0),
	abyss: numberType().default(0),
	gvg: numberType().default(0),
	secretRealm: numberType().default(0),
	duelWins: numberType().default(0),
	duelLosses: numberType().default(0),
	status: enumType([
		"active",
		"inactive",
		"pending",
		"leave"
	])
}));
//#endregion
//#region ../../lib/registration/column-labels.ts
var registrationColumnLabelValueSchema = stringType().trim().min(1).max(80);
var registrationColumnLabelsSchema = objectType({
	index: registrationColumnLabelValueSchema,
	discord: registrationColumnLabelValueSchema,
	nickname: registrationColumnLabelValueSchema,
	rank: registrationColumnLabelValueSchema,
	class: registrationColumnLabelValueSchema,
	guild: registrationColumnLabelValueSchema,
	elo: registrationColumnLabelValueSchema,
	mmr20: registrationColumnLabelValueSchema,
	bounty: registrationColumnLabelValueSchema,
	outerHeroic: registrationColumnLabelValueSchema,
	innerHeroic: registrationColumnLabelValueSchema,
	crimsonSands: registrationColumnLabelValueSchema,
	abyss: registrationColumnLabelValueSchema,
	gvg: registrationColumnLabelValueSchema,
	secretRealm: registrationColumnLabelValueSchema,
	marks: registrationColumnLabelValueSchema,
	kpi: registrationColumnLabelValueSchema,
	status: registrationColumnLabelValueSchema,
	actions: registrationColumnLabelValueSchema
});
registrationColumnLabelsSchema.partial();
//#endregion
//#region ../../lib/api/registrations.ts
var updateRegistrationStatsPayloadSchema = objectType({
	nickname: stringType().trim().min(1),
	className: stringType().trim().min(1).max(100).optional(),
	guild: stringType().trim().max(120).optional(),
	discordHandle: stringType().trim().max(120).optional(),
	prefix: prefixOptionSchema.nullable().optional(),
	elo: numberType().optional(),
	mmr20: numberType().optional(),
	bounty: numberType().optional(),
	outerHeroic: numberType().optional(),
	innerHeroic: numberType().optional(),
	crimsonSands: numberType().optional(),
	abyss: numberType().optional(),
	gvg: numberType().optional(),
	secretRealm: numberType().optional()
});
var updateRegistrationStatsResponseSchema = objectType({
	success: booleanType(),
	portalOnly: booleanType()
});
async function readApiError(response, fallbackMessage) {
	const payload = await response.json().catch(() => null);
	throw new Error(payload?.error || fallbackMessage);
}
var registrationsApi = {
	list: async () => {
		const response = await getApiDiscordProxyRegistration({ client: sameOriginOpenApiClient });
		return registrationsArraySchema.parse(response.data || []).map((item) => ({
			...item,
			elo: (item.elo ?? 0) > 0 ? item.elo ?? 0 : 1e3,
			mmr20: item.mmr20 || 0,
			bounty: item.bounty || 0,
			marks: item.marks || 0,
			outerHeroic: item.outerHeroic || 0,
			innerHeroic: item.innerHeroic || 0,
			crimsonSands: item.crimsonSands || 0,
			abyss: item.abyss || 0,
			gvg: item.gvg || 0,
			secretRealm: item.secretRealm || 0,
			duelWins: item.duelWins || 0,
			duelLosses: item.duelLosses || 0
		}));
	},
	updateStats: async (payload) => {
		const response = await patchApiDiscordProxyRegistration({
			client: sameOriginOpenApiClient,
			body: updateRegistrationStatsPayloadSchema.parse(payload)
		});
		return updateRegistrationStatsResponseSchema.parse(response.data || {});
	},
	getColumnLabels: async () => {
		const response = await fetch("/api/registration/column-labels", {
			method: "GET",
			credentials: "same-origin"
		});
		if (!response.ok) await readApiError(response, "Failed to load registration column labels");
		const data = await response.json();
		return registrationColumnLabelsSchema.parse(data);
	},
	updateColumnLabels: async (payload) => {
		const response = await fetch("/api/registration/column-labels", {
			method: "PATCH",
			credentials: "same-origin",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});
		if (!response.ok) await readApiError(response, "Failed to update registration column labels");
		const data = await response.json();
		return registrationColumnLabelsSchema.parse(data);
	}
};
//#endregion
//#region ../../lib/registration/hooks.ts
var registrationKeys = {
	all: ["registrations"],
	lists: () => [...registrationKeys.all, "list"],
	detail: (nickname) => [
		...registrationKeys.all,
		"detail",
		nickname
	],
	columnLabels: () => [...registrationKeys.all, "column-labels"]
};
function usePrefetchRegistrations() {
	const queryClient = useQueryClient();
	return useCallback(() => {
		queryClient.prefetchQuery({
			queryKey: registrationKeys.lists(),
			queryFn: registrationsApi.list,
			staleTime: 300 * 1e3
		});
	}, [queryClient]);
}
//#endregion
//#region ../../lib/schemas/schedule.ts
var scheduleSchema = objectType({
	id: stringType().optional(),
	date: stringType().default(""),
	registration: stringType().default(""),
	type: stringType().default(""),
	description: stringType().default(""),
	group: stringType().default(""),
	dayType: stringType().optional(),
	time: stringType().optional(),
	titleRu: stringType().optional(),
	titleEn: stringType().optional(),
	titleZh: stringType().optional(),
	orderIndex: numberType().optional(),
	active: booleanType().optional()
});
var schedulesArraySchema = arrayType(scheduleSchema);
var createScheduleSchema = objectType({
	dayType: stringType().trim().min(1).max(60),
	time: stringType().trim().max(60),
	titleRu: stringType().trim().min(1).max(160),
	titleEn: stringType().trim().min(1).max(255),
	titleZh: stringType().trim().max(160).optional(),
	orderIndex: numberType().int().min(0).max(999).default(0),
	active: booleanType().default(true)
});
var updateScheduleSchema = objectType({
	id: stringType().min(1),
	dayType: stringType().trim().min(1).max(60),
	time: stringType().trim().max(60),
	titleRu: stringType().trim().min(1).max(160),
	titleEn: stringType().trim().min(1).max(255),
	titleZh: stringType().trim().max(160).optional(),
	orderIndex: numberType().int().min(0).max(999).default(0),
	active: booleanType().default(true)
});
//#endregion
//#region ../../lib/api/schedule.ts
var scheduleApi = {
	list: async (language = "ru") => {
		const response = await getApiSchedule({
			client: sameOriginOpenApiClient,
			query: { language: language === "en" || language === "zh" ? language : "ru" }
		});
		return schedulesArraySchema.parse(response.data || []).map((item) => ({
			date: item.date || "",
			registration: item.registration || "",
			type: item.type || "",
			description: item.description || "",
			group: item.group || "",
			id: item.id,
			dayType: item.dayType,
			time: item.time,
			titleRu: item.titleRu,
			titleEn: item.titleEn,
			titleZh: item.titleZh,
			orderIndex: item.orderIndex,
			active: item.active
		}));
	},
	update: async (payload) => {
		const response = await patchApiSchedule({
			client: sameOriginOpenApiClient,
			body: updateScheduleSchema.parse(payload)
		});
		const item = scheduleSchema.parse(response.data || {});
		return {
			date: item.date || "",
			registration: item.registration || "",
			type: item.type || "",
			description: item.description || "",
			group: item.group || "",
			id: item.id,
			dayType: item.dayType,
			time: item.time,
			titleRu: item.titleRu,
			titleEn: item.titleEn,
			titleZh: item.titleZh,
			orderIndex: item.orderIndex,
			active: item.active
		};
	},
	create: async (payload) => {
		const response = await postApiSchedule({
			client: sameOriginOpenApiClient,
			body: createScheduleSchema.parse(payload)
		});
		const item = scheduleSchema.parse(response.data || {});
		return {
			date: item.date || "",
			registration: item.registration || "",
			type: item.type || "",
			description: item.description || "",
			group: item.group || "",
			id: item.id,
			dayType: item.dayType,
			time: item.time,
			titleRu: item.titleRu,
			titleEn: item.titleEn,
			titleZh: item.titleZh,
			orderIndex: item.orderIndex,
			active: item.active
		};
	}
};
//#endregion
//#region ../../lib/schedule/hooks.ts
var scheduleKeys = {
	all: ["schedule"],
	lists: () => [...scheduleKeys.all, "list"],
	list: (language) => [...scheduleKeys.lists(), { language }]
};
function usePrefetchSchedule() {
	const queryClient = useQueryClient();
	return useCallback((language = "ru") => {
		queryClient.prefetchQuery({
			queryKey: scheduleKeys.list(language),
			queryFn: () => scheduleApi.list(language),
			staleTime: 120 * 1e3
		});
	}, [queryClient]);
}
//#endregion
//#region ../../components/shell/MainLayout.tsx
var pathToSection = {
	"/": "about",
	"/members": "registration",
	"/schedule": "schedule",
	"/calendar": "calendar",
	"/analytics": "analytics",
	"/workflow": "workflow",
	"/integrations": "integrations",
	"/integrations/discord": "integrations",
	"/integrations/google-sheets": "integrations",
	"/integrations/wow": "integrations",
	"/pvp": "pvp",
	"/news": "news",
	"/guides": "guides",
	"/help": "help",
	"/absences": "absences",
	"/calculator": "calculator",
	"/profile": "profile"
};
function MainLayoutContent({ user, onLogout, children }) {
	const pathname = usePathname();
	const { language, setLanguage } = useLanguage();
	const { isHeaderHidden } = useHeader();
	const prefetchNews = usePrefetchNews();
	const prefetchRegistrations = usePrefetchRegistrations();
	const prefetchSchedule = usePrefetchSchedule();
	const prefetchGuides = usePrefetchGuides();
	const prefetchAbsences = usePrefetchAbsences();
	const currentSection = useMemo(() => pathToSection[pathname] || "about", [pathname]);
	const handleLanguageChange = setLanguage;
	const handleNavPrefetch = useCallback((section) => {
		switch (section) {
			case "news":
				prefetchNews();
				break;
			case "registration":
				prefetchRegistrations();
				break;
			case "schedule":
				prefetchSchedule(language);
				break;
			case "guides":
				prefetchGuides();
				break;
			case "absences":
				prefetchAbsences();
				break;
			default: break;
		}
	}, [
		language,
		prefetchAbsences,
		prefetchGuides,
		prefetchNews,
		prefetchRegistrations,
		prefetchSchedule
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative z-30 overflow-x-clip",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: `transition-transform duration-300 ${isHeaderHidden ? "-translate-y-full" : ""}`,
				children: /* @__PURE__ */ jsx(Header, {
					currentSection,
					onLogout,
					language,
					onLanguageChange: handleLanguageChange,
					onNavPrefetch: handleNavPrefetch
				})
			}),
			/* @__PURE__ */ jsx("main", {
				id: "portal-main",
				className: `min-h-screen pb-[calc(96px+env(safe-area-inset-bottom))] md:pb-0 ${isHeaderHidden ? "-mt-[var(--header-height,80px)]" : ""}`,
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1280px] overflow-x-clip px-3 sm:px-5 lg:px-8 pt-4 sm:pt-6",
					children: /* @__PURE__ */ jsx("div", {
						className: `wuxia-section wuxia-section-${currentSection} rounded-2xl overflow-hidden`,
						children
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: `transition-transform duration-300 ${isHeaderHidden ? "translate-y-full" : ""}`,
				children: /* @__PURE__ */ jsx(MobileNav, {
					currentSection,
					language,
					onNavPrefetch: handleNavPrefetch
				})
			})
		]
	});
}
function MainLayout(props) {
	return /* @__PURE__ */ jsx(HeaderProvider, { children: /* @__PURE__ */ jsx(MainLayoutContent, { ...props }) });
}
//#endregion
//#region ../../lib/schemas/auth.ts
var userRoleSchema = enumType([
	"guest",
	"member",
	"officer",
	"head",
	"sysadmin"
]);
var authMethodSchema = enumType(["account", "pin"]);
var authUserSchema = objectType({
	id: stringType().optional(),
	nickname: stringType().optional(),
	role: userRoleSchema,
	isActive: booleanType().optional(),
	authMethod: authMethodSchema.optional(),
	discordId: stringType().nullable().optional(),
	discordHandle: stringType().nullable().optional(),
	className: stringType().nullable().optional(),
	prefix: stringType().nullable().optional(),
	exp: numberType().optional()
});
var authResponseSchema = objectType({
	success: booleanType(),
	user: authUserSchema
});
var registerAuthUserSchema = authUserSchema.extend({ createdAt: stringType().optional() });
var registerResponseSchema = objectType({
	success: booleanType(),
	pendingApproval: booleanType().optional(),
	message: stringType().optional(),
	user: registerAuthUserSchema
});
var verifyAuthResponseSchema = objectType({
	valid: booleanType(),
	user: authUserSchema
});
var logoutResponseSchema = objectType({ success: booleanType() });
//#endregion
//#region ../../lib/api/auth.ts
var loginPayloadSchema = objectType({
	nickname: stringType().trim().min(1).optional(),
	password: stringType().min(1)
});
var registerPayloadSchema = objectType({
	nickname: stringType().trim().min(1),
	className: stringType().trim().min(1),
	discordHandle: stringType().trim().max(120).optional(),
	password: stringType().min(8)
});
var authApi = {
	login: async (payload) => {
		const response = await postApiAuth({
			client: sameOriginOpenApiClient,
			body: loginPayloadSchema.parse(payload)
		});
		return authResponseSchema.parse(response.data || {});
	},
	register: async (payload) => {
		const response = await postApiAuthRegister({
			client: sameOriginOpenApiClient,
			body: registerPayloadSchema.parse(payload)
		});
		return registerResponseSchema.parse(response.data || {});
	},
	verify: async () => {
		const response = await getApiVerifyAuth({ client: sameOriginOpenApiClient });
		return verifyAuthResponseSchema.parse(response.data || {});
	},
	logout: async () => {
		const response = await postApiLogout({ client: sameOriginOpenApiClient });
		logoutResponseSchema.parse(response.data || {});
	}
};
arrayType(objectType({
	id: stringType(),
	nickname: stringType(),
	role: userRoleSchema,
	isActive: booleanType(),
	discordHandle: stringType().nullable().optional(),
	prefix: stringType().nullable().optional(),
	createdAt: stringType(),
	lastLoginAt: stringType().nullable()
}));
objectType({
	id: stringType(),
	isActive: booleanType(),
	role: userRoleSchema.optional(),
	prefix: stringType().trim().max(40).nullable().optional()
});
//#endregion
//#region ../../lib/api/classes.ts
var classesSchema = arrayType(stringType());
var classesApi = { list: async () => {
	const response = await getApiClasses({ client: sameOriginOpenApiClient });
	return classesSchema.parse(response.data || []);
} };
//#endregion
//#region ../../lib/auth/hooks.ts
var knownClassesKeys = {
	all: ["known-classes"],
	lists: () => [...knownClassesKeys.all, "list"]
};
function useKnownClasses({ enabled = true } = {}) {
	return useQuery({
		queryKey: knownClassesKeys.lists(),
		queryFn: classesApi.list,
		staleTime: 300 * 1e3,
		enabled
	});
}
//#endregion
//#region ../../components/shell/PinScreen.tsx
function PinScreen({ onAuthSuccess }) {
	const { t } = useTranslation();
	const [mode, setMode] = useState("login");
	const { data: knownClasses = [] } = useKnownClasses({ enabled: mode === "register" });
	const [nickname, setNickname] = useState("");
	const [className, setClassName] = useState("");
	const [discordHandle, setDiscordHandle] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [adminPin, setAdminPin] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showAdminPin, setShowAdminPin] = useState(false);
	const [error, setError] = useState("");
	const [notice, setNotice] = useState("");
	const [approvalModalMessage, setApprovalModalMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const resetMessages = () => {
		setError("");
		setNotice("");
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		resetMessages();
		if (!nickname.trim() || !password.trim()) {
			setError(t.auth.enterNicknameAndPassword);
			return;
		}
		setLoading(true);
		try {
			onAuthSuccess((await authApi.login({
				nickname: nickname.trim(),
				password
			})).user);
		} catch (err) {
			setError(err instanceof Error ? err.message : t.auth.loginFailed);
		} finally {
			setLoading(false);
		}
	};
	const handleRegister = async (e) => {
		e.preventDefault();
		resetMessages();
		if (!nickname.trim()) {
			setError(t.auth.enterNickname);
			return;
		}
		if (!className.trim()) {
			setError(t.auth.chooseOrEnterClass);
			return;
		}
		if (password.length < 8) {
			setError(t.auth.passwordTooShort);
			return;
		}
		if (password !== confirmPassword) {
			setError(t.auth.passwordsDoNotMatch);
			return;
		}
		setLoading(true);
		try {
			const payload = await authApi.register({
				nickname: nickname.trim(),
				className: className.trim(),
				discordHandle: discordHandle.trim(),
				password
			});
			setNotice("");
			setApprovalModalMessage(payload.message || t.auth.accountCreatedPendingApproval);
			setMode("login");
			setClassName("");
			setDiscordHandle("");
			setPassword("");
			setConfirmPassword("");
		} catch (err) {
			setError(err instanceof Error ? err.message : t.auth.registerFailed);
		} finally {
			setLoading(false);
		}
	};
	const handleAdminPinLogin = async () => {
		resetMessages();
		if (!adminPin.trim()) {
			setError(t.auth.enterAdminPin);
			return;
		}
		setLoading(true);
		try {
			onAuthSuccess((await authApi.login({ password: adminPin.trim() })).user);
		} catch (err) {
			setError(err instanceof Error ? err.message : t.auth.adminPinRejected);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "fixed inset-0 z-20 overflow-y-auto bg-[linear-gradient(180deg,rgba(5,10,15,0.32),rgba(5,10,15,0.72))] px-3 pt-[max(12px,env(safe-area-inset-top))] pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-[1px] sm:px-4 sm:py-6 lg:px-6 lg:py-10",
		children: /* @__PURE__ */ jsx("div", {
			className: "flex min-h-full items-start justify-center lg:items-center",
			children: /* @__PURE__ */ jsxs("div", {
				className: "card auth-shell grid w-full max-w-[74rem] grid-cols-1 overflow-hidden rounded-[32px] border-[rgba(143,185,204,0.34)] bg-[rgba(6,10,15,0.28)] p-0 shadow-[0_32px_80px_rgba(2,6,10,0.68)] backdrop-blur-xl lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "auth-shell__aside relative mx-auto w-full max-w-[34rem] border-b border-[rgba(143,185,204,0.14)] bg-[linear-gradient(160deg,rgba(11,20,28,0.62),rgba(7,12,18,0.82))] p-6 lg:mx-0 lg:max-w-none lg:border-b-0 lg:border-r lg:p-10 xl:p-12",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-[rgba(143,185,204,0.28)] bg-[rgba(9,18,26,0.62)] px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-[rgba(191,220,234,0.88)] sm:text-xs sm:tracking-[0.32em]",
								children: t.common.portalEyebrow
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-6 flex justify-start",
								children: /* @__PURE__ */ jsx("div", {
									className: "flex h-16 w-16 items-center justify-center rounded-[22px] border border-[rgba(190,223,237,0.18)] bg-[linear-gradient(145deg,rgba(66,136,170,0.92),rgba(151,206,231,0.78))] shadow-[0_18px_32px_rgba(5,12,18,0.45)] sm:h-[4.5rem] sm:w-[4.5rem]",
									children: /* @__PURE__ */ jsx(WuxiaIcon, {
										name: "shield",
										className: "h-8 w-8 text-white sm:h-9 sm:w-9"
									})
								})
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mb-3 mt-5 max-w-[12ch] font-orbitron text-[2.15rem] font-bold leading-[0.96] text-[#eef7fd] sm:text-[2.8rem]",
								children: t.auth.memberAccess
							}),
							/* @__PURE__ */ jsx("p", {
								className: "max-w-[34rem] text-sm leading-7 text-[rgba(191,209,220,0.92)] sm:text-base",
								children: t.auth.accessIntro
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-6 grid gap-3 text-xs text-[rgba(205,225,236,0.95)] sm:text-sm",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-start gap-3 rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-3 leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
										children: [/* @__PURE__ */ jsx(WuxiaIcon, {
											name: "checkCircle",
											className: "mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]"
										}), t.auth.benefitAccounts]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-start gap-3 rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-3 leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
										children: [/* @__PURE__ */ jsx(WuxiaIcon, {
											name: "checkCircle",
											className: "mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]"
										}), t.auth.benefitSecurity]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "inline-flex items-start gap-3 rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-3 leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
										children: [/* @__PURE__ */ jsx(WuxiaIcon, {
											name: "checkCircle",
											className: "mt-1 h-4 w-4 shrink-0 text-[#8fb9cc]"
										}), t.auth.benefitPin]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "auth-shell__form mx-auto w-full max-w-[38rem] p-6 lg:mx-0 lg:max-w-none lg:p-10 xl:p-12",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "mb-6 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-end sm:justify-between",
								children: /* @__PURE__ */ jsxs("div", { children: [
									/* @__PURE__ */ jsx("div", {
										className: "mb-2 inline-flex items-center gap-2 rounded-full border border-[rgba(143,185,204,0.22)] bg-[rgba(8,16,24,0.46)] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[rgba(170,205,223,0.88)]",
										children: "Silent Moonfall"
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "font-orbitron text-[1.95rem] font-bold leading-tight text-[#eef7fd] sm:text-[2.35rem]",
										children: t.auth.portalTitle
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-2 max-w-[34rem] text-sm leading-6 text-[rgba(183,201,214,0.92)] sm:text-base",
										children: t.auth.portalSubtitle
									})
								] })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mb-5 grid w-full grid-cols-2 rounded-[20px] border border-[rgba(143,185,204,0.16)] bg-[rgba(7,13,19,0.56)] p-1.5 sm:mb-6 sm:inline-flex sm:w-auto",
								children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => {
										setMode("login");
										resetMessages();
									},
									className: `ui-chip min-h-[48px] rounded-2xl px-5 ${mode === "login" ? "is-active" : ""}`,
									children: t.auth.loginTab
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => {
										setMode("register");
										resetMessages();
									},
									className: `ui-chip min-h-[48px] rounded-2xl px-5 ${mode === "register" ? "is-active" : ""}`,
									children: t.auth.registerTab
								})]
							}),
							/* @__PURE__ */ jsxs("form", {
								onSubmit: mode === "login" ? handleLogin : handleRegister,
								className: "space-y-3.5 sm:space-y-4",
								children: [
									/* @__PURE__ */ jsx("input", {
										value: nickname,
										onChange: (e) => setNickname(e.target.value),
										className: "input-field w-full",
										placeholder: t.auth.nickname,
										autoFocus: true,
										disabled: loading,
										autoComplete: "username",
										enterKeyHint: "next"
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ jsx("input", {
											type: showPassword ? "text" : "password",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											className: "input-field w-full",
											placeholder: t.auth.password,
											disabled: loading,
											autoComplete: mode === "login" ? "current-password" : "new-password",
											enterKeyHint: mode === "login" ? "go" : "next"
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "dc-icon-btn h-[52px] min-w-[52px] shrink-0 rounded-2xl px-3",
											onClick: () => setShowPassword((v) => !v),
											title: showPassword ? t.auth.hidePassword : t.auth.showPassword,
											"aria-label": showPassword ? t.auth.hidePassword : t.auth.showPassword,
											"aria-pressed": showPassword,
											children: /* @__PURE__ */ jsx(WuxiaIcon, {
												name: showPassword ? "x" : "eye",
												className: "w-5 h-5"
											})
										})]
									}),
									mode === "register" && /* @__PURE__ */ jsxs(Fragment$1, { children: [
										/* @__PURE__ */ jsxs("select", {
											value: className,
											onChange: (e) => setClassName(e.target.value),
											className: "select-field w-full",
											disabled: loading,
											children: [/* @__PURE__ */ jsx("option", {
												value: "",
												children: t.auth.chooseClass
											}), knownClasses.map((knownClass) => /* @__PURE__ */ jsx("option", {
												value: knownClass,
												children: knownClass
											}, knownClass))]
										}),
										className ? /* @__PURE__ */ jsx("div", {
											className: "rounded-2xl border border-[rgba(143,185,204,0.22)] bg-[rgba(12,24,34,0.58)] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
											children: /* @__PURE__ */ jsx(ClassBadge, {
												className,
												badgeClassName: "w-full",
												textClassName: "text-[#e6eff5] font-medium"
											})
										}) : null,
										/* @__PURE__ */ jsx("input", {
											value: discordHandle,
											onChange: (e) => setDiscordHandle(e.target.value),
											className: "input-field w-full",
											placeholder: t.auth.discordHandle,
											disabled: loading,
											autoComplete: "off",
											enterKeyHint: "next"
										}),
										/* @__PURE__ */ jsx("input", {
											type: showPassword ? "text" : "password",
											value: confirmPassword,
											onChange: (e) => setConfirmPassword(e.target.value),
											className: "input-field w-full",
											placeholder: t.auth.confirmPassword,
											disabled: loading,
											autoComplete: "new-password",
											enterKeyHint: "done"
										})
									] }),
									/* @__PURE__ */ jsx("button", {
										type: "submit",
										disabled: loading,
										className: "btn-primary w-full py-4 text-base font-bold shadow-[0_20px_34px_rgba(7,16,24,0.42)] sm:text-lg",
										children: loading ? /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center justify-center",
											children: [/* @__PURE__ */ jsx(WuxiaIcon, {
												name: "spinner",
												className: "spinner-icon w-4 h-4 mr-3"
											}), mode === "login" ? t.auth.loggingIn : t.auth.creatingAccount]
										}) : /* @__PURE__ */ jsxs("span", {
											className: "inline-flex items-center justify-center",
											children: [/* @__PURE__ */ jsx(WuxiaIcon, {
												name: mode === "login" ? "lockOpen" : "plus",
												className: "w-4 h-4 mr-3"
											}), mode === "login" ? t.auth.loginSubmit : t.auth.registerSubmit]
										})
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ jsxs("button", {
									type: "button",
									className: "inline-flex items-center gap-2 rounded-full border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.42)] px-4 py-2 text-sm text-[#9fcfe4] transition-colors hover:border-[rgba(191,220,234,0.36)] hover:text-[#d2ebf7]",
									onClick: () => setShowAdminPin((v) => !v),
									children: [/* @__PURE__ */ jsx(WuxiaIcon, {
										name: "shield",
										className: "h-4 w-4"
									}), showAdminPin ? t.auth.hidePinLogin : t.auth.showPinLogin]
								}), showAdminPin && /* @__PURE__ */ jsxs("div", {
									className: "mt-3 rounded-[22px] border border-[rgba(143,185,204,0.2)] bg-[linear-gradient(145deg,rgba(12,23,32,0.72),rgba(8,14,20,0.78))] p-4 shadow-[0_16px_30px_rgba(4,8,12,0.28)]",
									children: [/* @__PURE__ */ jsx("div", {
										className: "mb-2 text-sm text-[#c9dfeb]",
										children: t.auth.adminPinHint
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-2 sm:flex-row",
										children: [/* @__PURE__ */ jsx("input", {
											type: "password",
											className: "input-field min-w-0 flex-1",
											value: adminPin,
											onChange: (e) => setAdminPin(e.target.value),
											placeholder: t.auth.adminPinPlaceholder,
											disabled: loading,
											autoComplete: "one-time-code",
											enterKeyHint: "go"
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											className: "btn-secondary w-full px-4 sm:w-auto",
											onClick: handleAdminPinLogin,
											disabled: loading,
											children: t.auth.loginSubmit
										})]
									})]
								})]
							}),
							error && /* @__PURE__ */ jsxs("div", {
								className: "mt-4 rounded-[22px] border border-[rgba(143,185,204,0.26)] bg-[rgba(14,24,34,0.74)] p-4 text-sm text-[#d4e9f4] shadow-[0_16px_30px_rgba(4,8,12,0.24)]",
								children: [/* @__PURE__ */ jsx(WuxiaIcon, {
									name: "alertTriangle",
									className: "w-4 h-4 mr-2 inline-block align-text-bottom"
								}), error]
							}),
							notice && /* @__PURE__ */ jsxs("div", {
								className: "mt-4 rounded-[22px] border border-[rgba(143,185,204,0.28)] bg-[rgba(11,29,40,0.7)] p-4 text-sm text-[#d4e9f4] shadow-[0_16px_30px_rgba(4,8,12,0.24)]",
								children: [/* @__PURE__ */ jsx(WuxiaIcon, {
									name: "checkCircle",
									className: "w-4 h-4 mr-2 inline-block align-text-bottom"
								}), notice]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-6 grid gap-3 border-t border-[rgba(143,185,204,0.12)] pt-5 text-sm sm:mt-8 sm:grid-cols-2 sm:pt-6",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.34)] px-4 py-3 text-[rgba(212,230,240,0.92)]",
									children: [/* @__PURE__ */ jsx(WuxiaIcon, {
										name: "shield",
										className: "mr-2 inline-block h-4 w-4 align-text-bottom text-[#8fb9cc]"
									}), t.auth.secureAccess]
								}), /* @__PURE__ */ jsx("div", {
									className: "rounded-2xl border border-[rgba(143,185,204,0.16)] bg-[rgba(8,16,24,0.34)] px-4 py-3 text-[rgba(183,201,214,0.88)]",
									children: t.auth.activationHelp
								})]
							})
						]
					}),
					approvalModalMessage && /* @__PURE__ */ jsx("div", {
						className: "absolute inset-0 z-10 flex items-center justify-center bg-[#071018]/82 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-8",
						children: /* @__PURE__ */ jsxs("div", {
							className: "w-full max-w-md rounded-[30px] border border-[#3d7c9d]/40 bg-gradient-to-br from-[#122433] via-[#0d1924] to-[#0a1219] p-5 shadow-2xl shadow-[#041018]/60 sm:p-6",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ jsx("div", {
										className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#5e9fbe]/35 bg-[#153245]/80 text-[#9fd3ea]",
										children: /* @__PURE__ */ jsx(WuxiaIcon, {
											name: "checkCircle",
											className: "h-7 w-7"
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "text-xs uppercase tracking-[0.28em] text-[#7db2ca]",
												children: t.auth.registrationComplete
											}),
											/* @__PURE__ */ jsx("h4", {
												className: "mt-2 text-2xl font-bold font-orbitron text-[#edf7fd]",
												children: t.auth.officerApprovalNeeded
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-3 text-sm leading-6 text-[#c2d8e5]",
												children: t.auth.accountCreatedPendingApproval
											})
										]
									})]
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-5 rounded-2xl border border-[#2b5368]/45 bg-[#10202c]/70 px-4 py-3 text-sm leading-6 text-[#d7e8f1]",
									children: approvalModalMessage
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-5 flex flex-col gap-3 sm:flex-row",
									children: [/* @__PURE__ */ jsx("button", {
										type: "button",
										className: "btn-primary flex-1 px-4 py-3 text-sm font-semibold",
										onClick: () => setApprovalModalMessage(""),
										children: t.auth.gotIt
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										className: "btn-secondary flex-1 px-4 py-3 text-sm font-semibold",
										onClick: () => {
											setMode("login");
											setApprovalModalMessage("");
										},
										children: t.auth.backToLogin
									})]
								})
							]
						})
					})
				]
			})
		})
	});
}
//#endregion
//#region node_modules/vinext/dist/shims/dynamic.js
/**
* next/dynamic shim
*
* SSR-safe dynamic imports. On the server, uses React.lazy + Suspense so that
* renderToReadableStream suspends until the dynamically-imported component is
* available. On the client, also uses React.lazy for code splitting.
*
* Supports:
* - dynamic(() => import('./Component'))
* - dynamic(() => import('./Component'), { loading: () => <Spinner /> })
* - dynamic(() => import('./Component'), { ssr: false })
*/
/**
* Lightweight error boundary that renders the loading component with the error
* when a dynamic() loader rejects. Without this, loader failures would propagate
* uncaught through React's rendering — this preserves the Next.js behavior where
* the `loading` component can display errors.
*
* Lazily created because React.Component is not available in the RSC environment
* (server components use a slimmed-down React that doesn't include class components).
*/
var DynamicErrorBoundary;
function getDynamicErrorBoundary() {
	if (DynamicErrorBoundary) return DynamicErrorBoundary;
	if (!React.Component) return null;
	DynamicErrorBoundary = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = { error: null };
		}
		static getDerivedStateFromError(error) {
			return { error: error instanceof Error ? error : new Error(String(error)) };
		}
		render() {
			if (this.state.error) return React.createElement(this.props.fallback, {
				isLoading: false,
				pastDelay: true,
				error: this.state.error
			});
			return this.props.children;
		}
	};
	return DynamicErrorBoundary;
}
var isServer = typeof window === "undefined";
function dynamic(loader, options) {
	const { loading: LoadingComponent, ssr = true } = options ?? {};
	if (!ssr) {
		if (isServer) {
			const SSRFalse = (_props) => {
				return LoadingComponent ? React.createElement(LoadingComponent, {
					isLoading: true,
					pastDelay: true,
					error: null
				}) : null;
			};
			SSRFalse.displayName = "DynamicSSRFalse";
			return SSRFalse;
		}
		const LazyComponent = lazy(async () => {
			const mod = await loader();
			if ("default" in mod) return mod;
			return { default: mod };
		});
		const ClientSSRFalse = (props) => {
			const [mounted, setMounted] = useState(false);
			useEffect(() => setMounted(true), []);
			if (!mounted) return LoadingComponent ? React.createElement(LoadingComponent, {
				isLoading: true,
				pastDelay: true,
				error: null
			}) : null;
			const fallback = LoadingComponent ? React.createElement(LoadingComponent, {
				isLoading: true,
				pastDelay: true,
				error: null
			}) : null;
			return React.createElement(Suspense, { fallback }, React.createElement(LazyComponent, props));
		};
		ClientSSRFalse.displayName = "DynamicClientSSRFalse";
		return ClientSSRFalse;
	}
	if (isServer) {
		const LazyServer = lazy(async () => {
			const mod = await loader();
			if ("default" in mod) return mod;
			return { default: mod };
		});
		const ServerDynamic = (props) => {
			const fallback = LoadingComponent ? React.createElement(LoadingComponent, {
				isLoading: true,
				pastDelay: true,
				error: null
			}) : null;
			const lazyElement = React.createElement(LazyServer, props);
			const ErrorBoundary = LoadingComponent ? getDynamicErrorBoundary() : null;
			const content = ErrorBoundary ? React.createElement(ErrorBoundary, { fallback: LoadingComponent }, lazyElement) : lazyElement;
			return React.createElement(Suspense, { fallback }, content);
		};
		ServerDynamic.displayName = "DynamicServer";
		return ServerDynamic;
	}
	const LazyComponent = lazy(async () => {
		const mod = await loader();
		if ("default" in mod) return mod;
		return { default: mod };
	});
	const ClientDynamic = (props) => {
		const fallback = LoadingComponent ? React.createElement(LoadingComponent, {
			isLoading: true,
			pastDelay: true,
			error: null
		}) : null;
		return React.createElement(Suspense, { fallback }, React.createElement(LazyComponent, props));
	};
	ClientDynamic.displayName = "DynamicClient";
	return ClientDynamic;
}
//#endregion
//#region ../../components/effects/PointerEffectsMount.tsx
var PointerEffectsClient = dynamic(() => import("./PointerEffectsClient-CI-09cDo.js"), { ssr: false });
function PointerEffectsMount() {
	return /* @__PURE__ */ jsx(PointerEffectsClient, {});
}
//#endregion
//#region ../../components/effects/PortalVisualEffects.tsx
function PortalVisualEffects() {
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(BackgroundEffects, {}), /* @__PURE__ */ jsx(PointerEffectsMount, {})] });
}
//#endregion
//#region ../../lib/notifications/context.tsx
var defaultSettings = {
	enabled: true,
	helpRequests: true,
	absenceApprovals: true,
	pvpMatches: true,
	eventReminders: true,
	officerAlerts: true,
	soundEnabled: false,
	desktopEnabled: false
};
var SETTINGS_KEY = "guild_notification_settings";
function getStoredSettings() {
	if (typeof window === "undefined") return defaultSettings;
	try {
		const stored = localStorage.getItem(SETTINGS_KEY);
		if (stored) {
			const parsed = JSON.parse(stored);
			return {
				...defaultSettings,
				...parsed
			};
		}
	} catch {}
	return defaultSettings;
}
var NotificationsContext = createContext(null);
function NotificationsProvider({ children }) {
	const [toasts, setToasts] = useState([]);
	const [settings, setSettings] = useState(getStoredSettings);
	const addToast = useCallback((toast) => {
		const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
		const newToast = {
			id,
			...toast
		};
		setToasts((prev) => [...prev, newToast]);
		if (toast.type === "error" || toast.type === "warning") console.warn(`[${toast.type.toUpperCase()}] ${toast.title}: ${toast.message || ""}`);
		return id;
	}, []);
	const dismissToast = useCallback((id) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);
	const clearAllToasts = useCallback(() => {
		setToasts([]);
	}, []);
	const updateSettings = useCallback((newSettings) => {
		setSettings((prev) => {
			const updated = {
				...prev,
				...newSettings
			};
			if (typeof window !== "undefined") localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
			return updated;
		});
	}, []);
	const requestPermission = useCallback(async () => {
		if (!("Notification" in window)) return "denied";
		if (Notification.permission === "granted") return "granted";
		try {
			const permission = await Notification.requestPermission();
			if (permission === "granted") updateSettings({ desktopEnabled: true });
			return permission;
		} catch {
			return "denied";
		}
	}, [updateSettings]);
	const value = useMemo(() => ({
		toasts,
		addToast,
		dismissToast,
		clearAllToasts,
		settings,
		updateSettings,
		requestPermission
	}), [
		toasts,
		addToast,
		dismissToast,
		clearAllToasts,
		settings,
		updateSettings,
		requestPermission
	]);
	return /* @__PURE__ */ jsx(NotificationsContext.Provider, {
		value,
		children
	});
}
function useNotifications() {
	const context = useContext(NotificationsContext);
	if (!context) throw new Error("useNotifications must be used within a NotificationsProvider");
	return context;
}
//#endregion
//#region ../../components/notifications/Toast.tsx
var toastIcons = {
	info: "eye",
	success: "checkCircle",
	warning: "alertTriangle",
	error: "alertTriangle"
};
var toastStyles = {
	info: "toast--info",
	success: "toast--success",
	warning: "toast--warning",
	error: "toast--error"
};
function Toast({ id, type, title, message, duration = 5e3, action, onDismiss }) {
	const [isExiting, setIsExiting] = useState(false);
	useEffect(() => {
		if (duration > 0) {
			const timer = setTimeout(() => {
				setIsExiting(true);
				setTimeout(() => onDismiss(id), 300);
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [
		duration,
		id,
		onDismiss
	]);
	const handleDismiss = () => {
		setIsExiting(true);
		setTimeout(() => onDismiss(id), 300);
	};
	const icon = toastIcons[type];
	return /* @__PURE__ */ jsxs("div", {
		className: cn("toast", toastStyles[type], isExiting && "toast--exiting"),
		role: "alert",
		"aria-live": "assertive",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "toast__icon",
				children: /* @__PURE__ */ jsx(WuxiaIcon, {
					name: icon,
					className: "h-5 w-5"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "toast__content",
				children: [/* @__PURE__ */ jsx("div", {
					className: "toast__title",
					children: title
				}), message && /* @__PURE__ */ jsx("div", {
					className: "toast__message",
					children: message
				})]
			}),
			action && /* @__PURE__ */ jsx("button", {
				className: "toast__action",
				onClick: action.onClick,
				type: "button",
				children: action.label
			}),
			/* @__PURE__ */ jsx("button", {
				className: "toast__dismiss",
				onClick: handleDismiss,
				type: "button",
				"aria-label": "Dismiss notification",
				children: /* @__PURE__ */ jsx(WuxiaIcon, {
					name: "x",
					className: "h-4 w-4"
				})
			})
		]
	});
}
//#endregion
//#region ../../components/notifications/ToastContainer.tsx
function ToastContainer() {
	const { toasts, dismissToast } = useNotifications();
	if (toasts.length === 0) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "toast-container",
		"aria-live": "polite",
		"aria-atomic": "true",
		children: toasts.map((toast) => /* @__PURE__ */ jsx(Toast, {
			...toast,
			onDismiss: dismissToast
		}, toast.id))
	});
}
//#endregion
//#region ../../components/shell/PortalShell.tsx
function PortalShell({ initialUser, children }) {
	const [user, setUser] = useState(initialUser);
	const handleAuthSuccess = (userData) => {
		setUser(userData);
	};
	const handleLogout = async () => {
		try {
			await authApi.logout();
		} catch (error) {
			console.error("Logout failed:", error);
		} finally {
			setUser(null);
		}
	};
	if (!user) return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(BackgroundEffects, { variant: "auth" }), /* @__PURE__ */ jsx(PinScreen, { onAuthSuccess: handleAuthSuccess })] });
	return /* @__PURE__ */ jsx(AuthProvider, {
		user,
		children: /* @__PURE__ */ jsxs(NotificationsProvider, { children: [
			/* @__PURE__ */ jsx(PortalVisualEffects, {}),
			/* @__PURE__ */ jsx(ToastContainer, {}),
			/* @__PURE__ */ jsx(MainLayout, {
				user,
				onLogout: handleLogout,
				children
			})
		] })
	});
}
//#endregion
//#region ../../lib/providers/QueryProvider.tsx
function makeQueryClient() {
	return new QueryClient({ defaultOptions: {
		queries: {
			staleTime: 300 * 1e3,
			gcTime: 1800 * 1e3,
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1e3 * 2 ** attemptIndex, 3e4),
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			refetchOnMount: false
		},
		mutations: { retry: 1 }
	} });
}
var browserQueryClient = void 0;
function getQueryClient() {
	if (typeof window === "undefined") return makeQueryClient();
	if (!browserQueryClient) browserQueryClient = makeQueryClient();
	return browserQueryClient;
}
function QueryProvider({ children }) {
	const [queryClient] = useState(getQueryClient);
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children
	});
}
//#endregion
//#region \0virtual:vite-rsc/client-references/group/facade:\0virtual:vinext-rsc-entry
var export_7346d135c2b4 = { default: GuidesPage };
var export_5f1cc293b170 = { default: HelpPage };
var export_cd3e30d9f56e = { default: NewsPage };
var export_f29e6e234fea = {
	ErrorBoundary,
	NotFoundBoundary
};
var export_0deffcb8ffd7 = { LayoutSegmentProvider };
var export_e486da50e5de = { default: InputPerformanceMode };
var export_fc1ddee70fd0 = { default: AppTelemetry };
var export_746b6ae3be71 = { default: PortalShell };
var export_38d010f48001 = { I18nProvider };
var export_c74bc67b8f11 = { QueryProvider };
//#endregion
export { export_0deffcb8ffd7, export_38d010f48001, export_5f1cc293b170, export_7346d135c2b4, export_746b6ae3be71, export_c74bc67b8f11, export_cd3e30d9f56e, export_e486da50e5de, export_f29e6e234fea, export_fc1ddee70fd0 };
