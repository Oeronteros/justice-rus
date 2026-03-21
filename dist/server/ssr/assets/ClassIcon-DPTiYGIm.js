import { jsx, jsxs } from "react/jsx-runtime";
//#region components/WuxiaIcons.tsx
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
		case "sun": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "4"
			}), /* @__PURE__ */ jsx("path", { d: "M12 2.8v2.4M12 18.8v2.4M4.8 4.8l1.7 1.7M17.5 17.5l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.8 19.2l1.7-1.7M17.5 6.5l1.7-1.7" })]
		});
		case "moon": return /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: /* @__PURE__ */ jsx("path", { d: "M16.9 4.6a7.8 7.8 0 1 0 2.5 12.8 7 7 0 1 1-2.5-12.8z" })
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
		case "questionCircle": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "12",
					r: "9"
				}),
				/* @__PURE__ */ jsx("path", { d: "M9.7 9.3a2.5 2.5 0 1 1 4.5 1.5c-.8.8-1.7 1.3-1.7 2.6" }),
				/* @__PURE__ */ jsx("circle", {
					cx: "12",
					cy: "16.9",
					r: "0.9",
					fill: "currentColor",
					stroke: "none"
				})
			]
		});
		case "check": return /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: /* @__PURE__ */ jsx("path", { d: "M5 12.5l4 4L19 7.2" })
		});
		case "clock": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}), /* @__PURE__ */ jsx("path", { d: "M12 7.5v5l3.2 1.9" })]
		});
		case "x": return /* @__PURE__ */ jsx("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: /* @__PURE__ */ jsx("path", { d: "M7 7l10 10M17 7L7 17" })
		});
		case "xCircle": return /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 24 24",
			className,
			...baseProps,
			children: [/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}), /* @__PURE__ */ jsx("path", { d: "M9 9l6 6M15 9l-6 6" })]
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
//#region node_modules/@stylexjs/stylex/lib/es/stylex.mjs
var styleq = {};
var hasRequiredStyleq;
function requireStyleq() {
	if (hasRequiredStyleq) return styleq;
	hasRequiredStyleq = 1;
	Object.defineProperty(styleq, "__esModule", { value: true });
	styleq.styleq = void 0;
	var cache = /* @__PURE__ */ new WeakMap();
	var compiledKey = "$$css";
	function createStyleq(options) {
		var disableCache;
		var disableMix;
		var transform;
		if (options != null) {
			disableCache = options.disableCache === true;
			disableMix = options.disableMix === true;
			transform = options.transform;
		}
		return function styleq() {
			var definedProperties = [];
			var className = "";
			var inlineStyle = null;
			var debugString = "";
			var nextCache = disableCache ? null : cache;
			var styles = new Array(arguments.length);
			for (var i = 0; i < arguments.length; i++) styles[i] = arguments[i];
			while (styles.length > 0) {
				var possibleStyle = styles.pop();
				if (possibleStyle == null || possibleStyle === false) continue;
				if (Array.isArray(possibleStyle)) {
					for (var _i = 0; _i < possibleStyle.length; _i++) styles.push(possibleStyle[_i]);
					continue;
				}
				var style = transform != null ? transform(possibleStyle) : possibleStyle;
				if (style.$$css != null) {
					var classNameChunk = "";
					if (nextCache != null && nextCache.has(style)) {
						var cacheEntry = nextCache.get(style);
						if (cacheEntry != null) {
							classNameChunk = cacheEntry[0];
							debugString = cacheEntry[2];
							definedProperties.push.apply(definedProperties, cacheEntry[1]);
							nextCache = cacheEntry[3];
						}
					} else {
						var definedPropertiesChunk = [];
						for (var prop in style) {
							var value = style[prop];
							if (prop === compiledKey) {
								var compiledKeyValue = style[prop];
								if (compiledKeyValue !== true) debugString = debugString ? compiledKeyValue + "; " + debugString : compiledKeyValue;
								continue;
							}
							if (typeof value === "string" || value === null) {
								if (!definedProperties.includes(prop)) {
									definedProperties.push(prop);
									if (nextCache != null) definedPropertiesChunk.push(prop);
									if (typeof value === "string") classNameChunk += classNameChunk ? " " + value : value;
								}
							} else console.error("styleq: ".concat(prop, " typeof ").concat(String(value), " is not \"string\" or \"null\"."));
						}
						if (nextCache != null) {
							var weakMap = /* @__PURE__ */ new WeakMap();
							nextCache.set(style, [
								classNameChunk,
								definedPropertiesChunk,
								debugString,
								weakMap
							]);
							nextCache = weakMap;
						}
					}
					if (classNameChunk) className = className ? classNameChunk + " " + className : classNameChunk;
				} else if (disableMix) {
					if (inlineStyle == null) inlineStyle = {};
					inlineStyle = Object.assign({}, style, inlineStyle);
				} else {
					var subStyle = null;
					for (var _prop in style) {
						var _value = style[_prop];
						if (_value !== void 0) {
							if (!definedProperties.includes(_prop)) {
								if (_value != null) {
									if (inlineStyle == null) inlineStyle = {};
									if (subStyle == null) subStyle = {};
									subStyle[_prop] = _value;
								}
								definedProperties.push(_prop);
								nextCache = null;
							}
						}
					}
					if (subStyle != null) inlineStyle = Object.assign(subStyle, inlineStyle);
				}
			}
			return [
				className,
				inlineStyle,
				debugString
			];
		};
	}
	var styleq$1 = styleq.styleq = createStyleq();
	styleq$1.factory = createStyleq;
	return styleq;
}
var styleqExports = /* @__PURE__ */ requireStyleq();
var errorForFn = (name) => /* @__PURE__ */ new Error(`Unexpected 'stylex.${name}' call at runtime. Styles must be compiled by '@stylexjs/babel-plugin'.`);
var errorForType = (key) => errorForFn(`types.${key}`);
var create = function stylexCreate(_styles) {
	throw errorForFn("create");
};
var createTheme = (_baseTokens, _overrides) => {
	throw errorForFn("createTheme");
};
var defineConsts = function stylexDefineConsts(_styles) {
	throw errorForFn("defineConsts");
};
var defineVars = function stylexDefineVars(_styles) {
	throw errorForFn("defineVars");
};
var defineMarker = () => {
	throw errorForFn("defineMarker");
};
var firstThatWorks = (..._styles) => {
	throw errorForFn("firstThatWorks");
};
var keyframes = (_keyframes) => {
	throw errorForFn("keyframes");
};
var positionTry = (_positionTry) => {
	throw errorForFn("positionTry");
};
function props(...styles) {
	const [className, style, dataStyleSrc] = styleqExports.styleq(styles);
	const result = {};
	if (className != null && className !== "") result.className = className;
	if (style != null && Object.keys(style).length > 0) result.style = style;
	if (dataStyleSrc != null && dataStyleSrc !== "") result["data-style-src"] = dataStyleSrc;
	return result;
}
var viewTransitionClass = (_viewTransitionClass) => {
	throw errorForFn("viewTransitionClass");
};
var defaultMarker = () => {
	throw errorForFn("defaultMarker");
};
var when = {
	ancestor: (_p) => {
		throw errorForFn("when.ancestor");
	},
	descendant: (_p) => {
		throw errorForFn("when.descendant");
	},
	siblingBefore: (_p) => {
		throw errorForFn("when.siblingBefore");
	},
	siblingAfter: (_p) => {
		throw errorForFn("when.siblingAfter");
	},
	anySibling: (_p) => {
		throw errorForFn("when.anySibling");
	}
};
var env = Object.freeze({});
var types = {
	angle: (_v) => {
		throw errorForType("angle");
	},
	color: (_v) => {
		throw errorForType("color");
	},
	url: (_v) => {
		throw errorForType("url");
	},
	image: (_v) => {
		throw errorForType("image");
	},
	integer: (_v) => {
		throw errorForType("integer");
	},
	lengthPercentage: (_v) => {
		throw errorForType("lengthPercentage");
	},
	length: (_v) => {
		throw errorForType("length");
	},
	percentage: (_v) => {
		throw errorForType("percentage");
	},
	number: (_v) => {
		throw errorForType("number");
	},
	resolution: (_v) => {
		throw errorForType("resolution");
	},
	time: (_v) => {
		throw errorForType("time");
	},
	transformFunction: (_v) => {
		throw errorForType("transformFunction");
	},
	transformList: (_v) => {
		throw errorForType("transformList");
	}
};
function _legacyMerge(...styles) {
	const [className] = styleqExports.styleq(styles);
	return className;
}
_legacyMerge.create = create;
_legacyMerge.createTheme = createTheme;
_legacyMerge.defineConsts = defineConsts;
_legacyMerge.defineMarker = defineMarker;
_legacyMerge.defineVars = defineVars;
_legacyMerge.defaultMarker = defaultMarker;
_legacyMerge.firstThatWorks = firstThatWorks;
_legacyMerge.keyframes = keyframes;
_legacyMerge.positionTry = positionTry;
_legacyMerge.props = props;
_legacyMerge.types = types;
_legacyMerge.when = when;
_legacyMerge.viewTransitionClass = viewTransitionClass;
_legacyMerge.env = env;
//#endregion
//#region lib/stylex/tokens.stylex.ts
var colors = {
	bgApp: "var(--x1oh3e0g)",
	bgShell: "var(--xb19bgj)",
	bgPanel: "var(--xhofm3t)",
	bgPanelAlt: "var(--xf0wftu)",
	bgElevated: "var(--xgifr3k)",
	bgField: "var(--xpas0jw)",
	bgOverlay: "var(--xvu5p0j)",
	bgHover: "var(--x16ecia8)",
	bgActive: "var(--xqtfrxh)",
	chromeStart: "var(--x3jh5pm)",
	chromeMid: "var(--x1a4dgt8)",
	chromeEnd: "var(--x133pha9)",
	chromeGlowPrimary: "var(--x1eggevy)",
	chromeGlowSecondary: "var(--xwtfihk)",
	surfaceGlowPrimary: "var(--x1j2hc67)",
	surfaceGlowSecondary: "var(--x1hva7l4)",
	controlSurface: "var(--xqutmr6)",
	controlSurfaceHover: "var(--xtlhl2j)",
	controlSurfaceActive: "var(--xlhyub1)",
	fieldSurface: "var(--x1kay58w)",
	fieldSurfaceHover: "var(--x1urazne)",
	fieldSurfaceActive: "var(--x180maaz)",
	overlayScrim: "var(--x1a8gvpg)",
	overlaySurface: "var(--x3zrzss)",
	overlayPanelStart: "var(--x3s3230)",
	overlayPanelEnd: "var(--xziaqxl)",
	panelSurfaceStart: "var(--x15bcavr)",
	panelSurfaceEnd: "var(--xfdvkji)",
	cardSurfaceStart: "var(--x2jncge)",
	cardSurfaceEnd: "var(--xy7vxyt)",
	elevatedSurfaceStart: "var(--xup2z07)",
	elevatedSurfaceEnd: "var(--xef7fmm)",
	subduedSurfaceStart: "var(--x1c894op)",
	subduedSurfaceEnd: "var(--x1h2luhd)",
	textPrimary: "var(--xmbgtzu)",
	textSecondary: "var(--x2v3nj0)",
	textMuted: "var(--xjcvmyq)",
	textDisabled: "var(--x5n3qin)",
	textOnAccent: "var(--xhsjs3z)",
	accent: "var(--xwuxa9e)",
	accentStrong: "var(--x9op7f1)",
	accentSoft: "var(--xrear34)",
	accentMuted: "var(--xvdta21)",
	accentGlow: "var(--x1hmscei)",
	accentEdge: "var(--x1mr6otr)",
	accentEdgeStrong: "var(--xxevyf8)",
	buttonPrimaryStart: "var(--x4ccxob)",
	buttonPrimaryEnd: "var(--x19bmfch)",
	buttonPrimaryHoverStart: "var(--x1xbjv3v)",
	buttonPrimaryHoverEnd: "var(--x1mc48au)",
	buttonSecondaryStart: "var(--xng3ldl)",
	buttonSecondaryEnd: "var(--xdap0jq)",
	buttonDangerStart: "var(--x9hz9tb)",
	buttonDangerEnd: "var(--x26uq2p)",
	buttonGhostHover: "var(--x15af15h)",
	buttonGhostActive: "var(--xxheyf0)",
	ember: "var(--x1v81rib)",
	emberStrong: "var(--xyjvkuc)",
	jade: "var(--xzkgg8y)",
	ice: "var(--xepgl2c)",
	borderSubtle: "var(--x1jqn2jx)",
	borderDefault: "var(--x4fsgaz)",
	borderStrong: "var(--x78hkl2)",
	chromeBorder: "var(--x1th9sly)",
	chromeBorderStrong: "var(--x1tjsjop)",
	panelBorder: "var(--xtdujsd)",
	panelBorderStrong: "var(--x937din)",
	success: "var(--x49dk4j)",
	successText: "var(--xa8tk92)",
	successSurface: "var(--x1axsmxi)",
	successBorder: "var(--xqhrhum)",
	warning: "var(--x1pq4vpx)",
	warningText: "var(--x1b8x5i5)",
	warningSurface: "var(--xof2m1u)",
	warningBorder: "var(--x1qb8r96)",
	danger: "var(--xknh6kt)",
	dangerText: "var(--x1uhi1kb)",
	dangerSurface: "var(--x1pwq9i4)",
	dangerSurfaceStrong: "var(--xfkalby)",
	dangerBorder: "var(--x1kf0j3i)",
	info: "var(--xuj2x7z)",
	infoText: "var(--x18uigh3)",
	infoSurface: "var(--x1loei70)",
	infoBorder: "var(--x1o9fhbh)",
	focusRing: "var(--x12bfolm)",
	focusGlow: "var(--x1itegbq)",
	fieldFocusBorder: "var(--xaqb04x)",
	shadowStrong: "var(--x1xwbwfd)",
	shadowSoft: "var(--x1c8b9vm)",
	shadowCard: "var(--xddj9fu)",
	shadowLifted: "var(--xnql6y0)",
	shadowInset: "var(--x1n9i2gr)",
	ink: "var(--xdrd0hq)",
	inkSoft: "var(--xx4z35)",
	paper: "var(--xhe4kwy)",
	paperStrong: "var(--xdj9d1t)",
	paperBright: "var(--x34uyi7)",
	paperMuted: "var(--x12urx1j)",
	paperSubtle: "var(--xzhbpxh)",
	overlay: "var(--x1r6dd0k)",
	panelTop: "var(--xl9viuc)",
	panelBottom: "var(--xh2mrlj)",
	panelSolid: "var(--xya7fv8)",
	surfaceBase: "var(--x504vru)",
	surfaceRaised: "var(--x1i702qu)",
	surfaceSoft: "var(--x1hzvfj8)",
	surfaceField: "var(--x1f24nu)",
	lineSoft: "var(--x1iua7nl)",
	lineMuted: "var(--x1jlivhp)",
	lineStrong: "var(--x1mycdb6)",
	__varGroupHash__: "x1ala70i"
};
//#endregion
//#region lib/stylex/primitives.stylex.ts
`${colors.chromeGlowPrimary}${colors.chromeGlowSecondary}${colors.chromeStart}${colors.chromeMid}${colors.chromeEnd}`;
var appShellStyles = {
	chromeSurface: {
		kMwMTN: "xg6t7ro",
		kMv6JI: "xe35c1h",
		kGuDYH: "x1u4lkj1",
		kLWn49: "x7exzxm",
		k1ekBW: "x1o3v6uv",
		kIyJzY: "xnc157v",
		$$css: true
	},
	page: {
		kAzted: "xg6iff7",
		kMwMTN: "xg6t7ro",
		kMv6JI: "xe35c1h",
		kGuDYH: "x1u4lkj1",
		kLWn49: "x7exzxm",
		k1ekBW: "x1o3v6uv",
		kIyJzY: "xnc157v",
		$$css: true
	},
	container: {
		kzqmXN: "xh8yej3",
		ks0D6T: "xas3c0e",
		kUOVxO: "xvueqy4",
		kg3NbH: "x127hkhq",
		$$css: true
	},
	contentShell: {
		kVAEAm: "x1n2onr6",
		kHBbk8: "xc8icb0",
		$$css: true
	}
};
var surfaceStyles = {
	panel: {
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		kVAM5u: "xzlrbu7",
		kaIpWk: "x1pvkpds",
		kGVxlE: "x11hz50l",
		kMwMTN: "xg6t7ro",
		kmVPX3: "xrymykd",
		$$css: true
	},
	chrome: {
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		kVAM5u: "x19bv98f",
		kaIpWk: "x1x46wsa",
		kGVxlE: "x11hz50l",
		kMwMTN: "xg6t7ro",
		$$css: true
	},
	card: {
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		kVAM5u: "xzlrbu7",
		kaIpWk: "x1x46wsa",
		kGVxlE: "x11hz50l",
		kMwMTN: "xg6t7ro",
		kmVPX3: "xhmmgbe",
		$$css: true
	},
	elevated: {
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		kVAM5u: "x1prf65z",
		kaIpWk: "x1x46wsa",
		kGVxlE: "xhtjg5o",
		kMwMTN: "xg6t7ro",
		kmVPX3: "xhmmgbe",
		$$css: true
	},
	subdued: {
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		kVAM5u: "x1prf65z",
		kaIpWk: "x1pvkpds",
		kGVxlE: "xt3i6p4",
		kMwMTN: "xg6t7ro",
		$$css: true
	},
	interactive: {
		k1ekBW: "xmz27jc",
		kIyJzY: "x9rrsba",
		kAMwcw: "x1er6os5",
		kGzVvX: "xil4wd1",
		kaVNsj: "xpwh26v",
		kwmNyF: "x14ow2ja",
		kYcSvW: "xhdw3u9",
		knuKkz: "xgym4j6",
		$$css: true
	}
};
var buttonStyles = {
	base: {
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kkrTdU: "x1ypdohk",
		kaIpWk: "x152jcrl",
		kg3NbH: "x1hru7a8",
		kGuDYH: "x158676r",
		kLWn49: "xvwof78",
		k63SB2: "x1s688f",
		kMv6JI: "xe35c1h",
		kybGjl: "x1hl2dhg",
		k1ekBW: "xw787ha",
		kIyJzY: "x1aoxko8",
		kAMwcw: "x1er6os5",
		k3Woio: "x9ma724",
		kiEn40: "x7s97pk",
		$$css: true
	},
	primary: {
		kAzted: "x2zuwow",
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		kVAM5u: "x1ghx4zh",
		kMwMTN: "x1pfgsew",
		kGVxlE: "xlwdbou",
		kwmNyF: "x14ow2ja",
		$$css: true
	},
	secondary: {
		kAzted: "xhvitp6",
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		kVAM5u: "x1prf65z",
		kMwMTN: "xg6t7ro",
		kGzVvX: "xil4wd1",
		kaVNsj: "x1u49b0l",
		kwmNyF: "x14ow2ja",
		$$css: true
	},
	ghost: {
		kAzted: "x2cz0fl",
		kWkggS: "xjbqb8w",
		kMzoRj: "xc342km",
		kMwMTN: "x1mpe8zw",
		kDPRdz: "x10xur04",
		kGzVvX: "x1sj9ewr",
		kSReZ0: "xj2gd7x",
		$$css: true
	},
	danger: {
		kAzted: "xhvitp6",
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		kVAM5u: "x7p36p1",
		kMwMTN: "x1mrgh1s",
		kwmNyF: "x14ow2ja",
		kwh8RV: "xcrjral",
		$$css: true
	},
	touch: {
		kAzted: "x118f4k9",
		$$css: true
	}
};
var formStyles = {
	label: {
		kMwMTN: "x1mpe8zw",
		kGuDYH: "x158676r",
		kLWn49: "xvwof78",
		k63SB2: "x1s688f",
		$$css: true
	},
	hint: {
		kMwMTN: "x1gk89ie",
		kGuDYH: "xro2179",
		kLWn49: "xgkfwrp",
		$$css: true
	},
	error: {
		kMwMTN: "x1mrgh1s",
		kGuDYH: "xro2179",
		kLWn49: "xgkfwrp",
		$$css: true
	},
	field: {
		kzqmXN: "xh8yej3",
		kAzted: "x1s4da35",
		kaIpWk: "x152jcrl",
		kmVPX3: "x1mzhbv",
		kWkggS: "xg93po3",
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		kVAM5u: "x1prf65z",
		kMwMTN: "xg6t7ro",
		kGVxlE: "xt3i6p4",
		k1ekBW: "x1tv3a4w",
		kIyJzY: "x1aoxko8",
		kAMwcw: "x1er6os5",
		kGzVvX: "x1c8hd7m",
		kaVNsj: "x1slwmf4",
		k5T3Qt: "x1uvtmcs",
		k4mVRr: "x695mxt",
		kWEjV4: "x1x6xesk",
		kL3a3j: "xdnc4bc",
		k8Qsv1: "xby6rxx",
		kH8XJS: "x7xwk5j",
		$$css: true
	},
	input: {
		kysU6D: "xjyslct",
		$$css: true
	},
	select: {
		kysU6D: "xjyslct",
		$$css: true
	},
	textarea: {
		kAzted: "xvlk7ar",
		kHenm0: "x288g5",
		$$css: true
	}
};
var overlayStyles = {
	backdrop: {
		kVAEAm: "xixxii4",
		kpwlN0: "x10a8y8t",
		kY2c9j: "x1lbixdm",
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kmVPX3: "x1nlk86w",
		kWkggS: "xjqd9qf",
		k6WDB: "x1ydx4q1",
		$$css: true
	},
	panel: {
		kVAEAm: "x1n2onr6",
		kzqmXN: "x1a3l4hc",
		kskxy: "xyit1fy",
		kVQacm: "xysyzu8",
		kaIpWk: "xvr18jl",
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		kVAM5u: "x19bv98f",
		kGVxlE: "xads43v",
		$$css: true
	},
	panelNarrow: {
		ks0D6T: "x169ykt4",
		$$css: true
	},
	panelFullBleed: {
		kzqmXN: "xh8yej3",
		ks0D6T: "x193iq5w",
		kskxy: "xmz0i5r",
		kaIpWk: "x2u8bby",
		$$css: true
	}
};
var themePrimitives = {
	pageChrome: [appShellStyles.page, appShellStyles.contentShell],
	pageChromeSurface: [appShellStyles.chromeSurface],
	pageContainer: [appShellStyles.container],
	chromePanel: [surfaceStyles.chrome],
	card: [surfaceStyles.card, surfaceStyles.interactive],
	cardStatic: [surfaceStyles.card],
	panel: [surfaceStyles.panel],
	panelInteractive: [surfaceStyles.panel, surfaceStyles.interactive],
	elevatedPanel: [surfaceStyles.elevated, surfaceStyles.interactive],
	subduedPanel: [surfaceStyles.subdued],
	primaryButton: [buttonStyles.base, buttonStyles.primary],
	secondaryButton: [buttonStyles.base, buttonStyles.secondary],
	touchButton: [
		buttonStyles.base,
		buttonStyles.secondary,
		buttonStyles.touch
	],
	ghostButton: [buttonStyles.base, buttonStyles.ghost],
	dangerButton: [buttonStyles.base, buttonStyles.danger],
	fieldLabel: [formStyles.label],
	fieldHint: [formStyles.hint],
	fieldError: [formStyles.error],
	input: [formStyles.field, formStyles.input],
	select: [formStyles.field, formStyles.select],
	textarea: [formStyles.field, formStyles.textarea],
	overlayBackdrop: [overlayStyles.backdrop],
	overlayPanel: [overlayStyles.panel],
	overlayPanelNarrow: [overlayStyles.panel, overlayStyles.panelNarrow],
	overlayPanelFullBleed: [overlayStyles.panel, overlayStyles.panelFullBleed]
};
var themePrimitiveProbeStyles = {
	pageChrome: themePrimitives.pageChrome,
	card: themePrimitives.cardStatic,
	panel: themePrimitives.panel,
	button: themePrimitives.secondaryButton,
	input: themePrimitives.input,
	overlayPanelNarrow: themePrimitives.overlayPanelNarrow
};
themePrimitiveProbeStyles.pageChrome, themePrimitiveProbeStyles.card, themePrimitiveProbeStyles.panel, themePrimitiveProbeStyles.button, themePrimitiveProbeStyles.input, themePrimitiveProbeStyles.overlayPanelNarrow;
//#endregion
//#region components/shared/Ui.stylex.ts
var uiStyles = {
	sectionShell: {
		k4rD7h: "x1n0hhgg",
		k8WAf4: "x3lfh5r xxw9sue x1vycybu",
		$$css: true
	},
	sectionContainer: {
		kzqmXN: "xh8yej3",
		ks0D6T: "xas3c0e",
		kUOVxO: "xvueqy4",
		kg3NbH: "x1hru7a8 xu0ly6v x1mxvxdk",
		$$css: true
	},
	stackLg: {
		k1xSpc: "xrvj5dj",
		kOIVth: "xk4f2ks",
		$$css: true
	},
	stackMd: {
		k1xSpc: "xrvj5dj",
		kOIVth: "xe4h35",
		$$css: true
	},
	inlineCenter: {
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		$$css: true
	},
	card: {
		kVAEAm: "x1n2onr6",
		kaIpWk: "x1pvkpds",
		k1ekBW: "x8lpeie",
		kIyJzY: "x1aoxko8",
		kGVxlE: "x11hz50l",
		kaVNsj: "x1u49b0l",
		kwh8RV: "x1ht632g",
		kwmNyF: "x14ow2ja",
		kYcSvW: "x99rvnf",
		knuKkz: "xnpasjc",
		$$css: true
	},
	sectionCard: {
		kaIpWk: "x12i7owg",
		$$css: true
	},
	softPanel: {
		kaIpWk: "x1x46wsa",
		kGVxlE: "xt3i6p4",
		$$css: true
	},
	buttonBase: {
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kybGjl: "x1hl2dhg",
		kaIpWk: "x152jcrl",
		kmVPX3: "x1sqsqas",
		kAzted: "x118f4k9",
		k63SB2: "x1s688f",
		kMv6JI: "xe35c1h",
		kGuDYH: "x158676r",
		kLWn49: "xvwof78",
		kMwMTN: "xg6t7ro",
		k1ekBW: "x113gla",
		kIyJzY: "x1aoxko8",
		kOGhaW: "x1ve3uh7",
		kiEn40: "x7s97pk",
		kYPGJ8: "x1ar62m4",
		kWCcOm: "xsjp0iz",
		kEVmhK: "x1gl3shj",
		$$css: true
	},
	buttonPrimary: {
		kGVxlE: "x1fq1rhw",
		kwh8RV: "xceb3xl",
		kM0NtE: "x12qo5y2",
		k3Woio: "x1nnaz8c",
		ktElKB: "x1fcf3m",
		$$css: true
	},
	buttonSecondary: {
		kGVxlE: "xt3i6p4",
		kGzVvX: "xil4wd1",
		kaVNsj: "x1u49b0l",
		kwh8RV: "xzhkdzh",
		kSReZ0: "x4okgvf",
		k3Woio: "x9ma724",
		$$css: true
	},
	buttonXs: {
		kAzted: "xhvitp6",
		kmVPX3: "xnmdqwn",
		kGuDYH: "x158676r",
		$$css: true
	},
	badge: {
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kOIVth: "xl2holp",
		kAzted: "x1aphxna",
		kmVPX3: "x1fy1g0",
		kaIpWk: "xke6jgc",
		kWkggS: "x1ubnd6z",
		kMwMTN: "xg6t7ro",
		kGuDYH: "xro2179",
		k63SB2: "x1s688f",
		kLWn49: "xo5v014",
		kb6lSQ: "x1vyo3qp",
		$$css: true
	},
	badgeMuted: {
		kMwMTN: "x1gk89ie",
		kWkggS: "x1i73h43",
		$$css: true
	},
	badgeSuccess: {
		kVAM5u: "xav6mmb",
		kWkggS: "xbrbpgi",
		kMwMTN: "x1j21qdi",
		$$css: true
	},
	badgeDanger: {
		kVAM5u: "x7p36p1",
		kWkggS: "xnnbwzb",
		kMwMTN: "x1mrgh1s",
		$$css: true
	},
	badgeWarning: {
		kVAM5u: "xgb961d",
		kWkggS: "x1qj3i74",
		kMwMTN: "xtva9l",
		$$css: true
	},
	inlineTags: {
		k1xSpc: "x78zum5",
		kwnvtZ: "x1a02dak",
		kOIVth: "xl2holp",
		$$css: true
	},
	chip: {
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kOIVth: "xl2holp",
		kAzted: "xhvitp6",
		kmVPX3: "xrm37h6",
		kaIpWk: "xke6jgc",
		kWkggS: "x1ubnd6z",
		kMwMTN: "xg6t7ro",
		kGuDYH: "x158676r",
		k63SB2: "x1s688f",
		kkrTdU: "x1ypdohk",
		k1ekBW: "x16bze2b",
		kIyJzY: "x1aoxko8",
		kaVNsj: "x1u49b0l",
		kGzVvX: "xe7ai7t",
		kwmNyF: "x14ow2ja",
		$$css: true
	},
	chipActive: {
		kVAM5u: "x1ew36kh",
		kMwMTN: "x1rpx1l6",
		kGVxlE: "x11hz50l",
		$$css: true
	},
	iconXs: {
		kzqmXN: "x6jxa94",
		kZKoxP: "x1v9usgg",
		$$css: true
	},
	iconSm: {
		kzqmXN: "x1kky2od",
		kZKoxP: "xlup9mm",
		$$css: true
	},
	iconMd: {
		kzqmXN: "xw4jnvo",
		kZKoxP: "x1qx5ct2",
		$$css: true
	},
	iconLg: {
		kzqmXN: "xvy4d1p",
		kZKoxP: "xxk0z11",
		$$css: true
	},
	iconXl: {
		kzqmXN: "xgd8bvy",
		kZKoxP: "x1fgtraw",
		$$css: true
	},
	icon2xl: {
		kzqmXN: "x100vrsf",
		kZKoxP: "x1vqgdyp",
		$$css: true
	},
	iconMuted: {
		kMwMTN: "x1gk89ie",
		$$css: true
	},
	iconAccent: {
		kMwMTN: "x1txi120",
		$$css: true
	},
	iconDanger: {
		kMwMTN: "x1hjys93",
		$$css: true
	},
	iconSuccess: {
		kMwMTN: "x144at4w",
		$$css: true
	},
	inlineIcon: {
		k1xSpc: "x1rg5ohu",
		km5ZXQ: "x1kzewxu",
		kXLuUW: "x1uuroth",
		$$css: true
	},
	statusDot: {
		k1xSpc: "x1rg5ohu",
		kzqmXN: "x1xc55vz",
		kZKoxP: "xdk7pt",
		kaIpWk: "xke6jgc",
		kWkggS: "xtwfq29",
		km5ZXQ: "x1kzewxu",
		kSiTet: "x1us6l5c",
		$$css: true
	},
	iconSpin: {
		kKVMdj: "xw9k7rp",
		k44tkh: "x1q3qbx4",
		kyAemX: "x1esw782",
		ko0y90: "xa4qsjk",
		$$css: true
	},
	notice: {
		kaIpWk: "x1pvkpds",
		kWkggS: "x1t5wmf8",
		kMwMTN: "xg6t7ro",
		kGuDYH: "x1u4lkj1",
		kLWn49: "x7exzxm",
		kmVPX3: "x1mzhbv",
		$$css: true
	},
	noticeSuccess: {
		kVAM5u: "xav6mmb",
		kWkggS: "xbrbpgi",
		kMwMTN: "x1j21qdi",
		$$css: true
	},
	noticeError: {
		kVAM5u: "x7p36p1",
		kWkggS: "xpimdba",
		kMwMTN: "x1mrgh1s",
		$$css: true
	},
	input: {
		kzqmXN: "xh8yej3",
		kAzted: "x1s4da35",
		kaIpWk: "x152jcrl",
		kmVPX3: "x1mzhbv",
		k1ekBW: "x1tv3a4w",
		kIyJzY: "x1aoxko8",
		kWkggS: "xz6w6sx",
		kMwMTN: "xg6t7ro",
		kGVxlE: "xt3i6p4",
		k5T3Qt: "x1uvtmcs",
		k4mVRr: "x695mxt",
		kWEjV4: "x1x6xesk",
		kL3a3j: "xypwisx",
		$$css: true
	},
	select: {
		kzqmXN: "xh8yej3",
		kAzted: "x1s4da35",
		kaIpWk: "x152jcrl",
		kmVPX3: "x1mzhbv",
		k1ekBW: "x1tv3a4w",
		kIyJzY: "x1aoxko8",
		kWkggS: "xz6w6sx",
		kMwMTN: "xg6t7ro",
		kGVxlE: "xt3i6p4",
		k5T3Qt: "x1uvtmcs",
		k4mVRr: "x695mxt",
		kWEjV4: "x1x6xesk",
		kL3a3j: "xypwisx",
		$$css: true
	},
	tableFrame: {
		kXHlph: "xw2csxc",
		kaIpWk: "x1x46wsa",
		$$css: true
	},
	textCenter: {
		k9WMMc: "x2b8uid",
		$$css: true
	},
	table: {
		k7Eaqz: "xgqtt45",
		kWkggS: "xjbqb8w",
		kLvRdT: "x1vathgz",
		kheTzg: "x1gukg7c",
		$$css: true
	},
	tableHeadCell: {
		kmVPX3: "x152i3k9",
		k9WMMc: "xdpxx8g",
		kGuDYH: "xro2179",
		k63SB2: "x1s688f",
		kP9fke: "xtvhhri",
		kb6lSQ: "x9pfba7",
		kVAEAm: "x7wzq59",
		k87sOh: "x13vifvy",
		kY2c9j: "x1vjfegm",
		kWkggS: "xx686nw",
		k6WDB: "x1dmgsgi",
		kMwMTN: "x1txi120",
		$$css: true
	},
	tableCell: {
		kmVPX3: "x152i3k9",
		khDVqt: "xuxw1ft",
		kGuDYH: "x1u4lkj1",
		kMwMTN: "xg6t7ro",
		$$css: true
	},
	tableRowEven: {
		kWkggS: "xz6w6sx",
		$$css: true
	},
	tableRowHover: {
		kGzVvX: "xil4wd1",
		$$css: true
	},
	modalBackdrop: {
		kVAEAm: "xixxii4",
		kpwlN0: "x10a8y8t",
		kY2c9j: "x1lbixdm",
		k1xSpc: "x78zum5",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kmVPX3: "x1nlk86w",
		kWkggS: "xjqd9qf",
		k6WDB: "x1ydx4q1",
		$$css: true
	},
	modalShell: {
		kVAEAm: "x1n2onr6",
		kzqmXN: "x1a3l4hc",
		kskxy: "xyit1fy",
		kVQacm: "xysyzu8",
		kaIpWk: "xvr18jl",
		kGVxlE: "xads43v",
		$$css: true
	},
	modalShellNarrow: {
		ks0D6T: "x169ykt4",
		$$css: true
	},
	modalShellFull: {
		kzqmXN: "xh8yej3",
		ks0D6T: "x193iq5w",
		kskxy: "xmz0i5r",
		kaIpWk: "x2u8bby",
		$$css: true
	},
	modalHeader: {
		k1xSpc: "x78zum5",
		kGNEyG: "x1cy8zhl",
		kjj79g: "x1qughib",
		kOIVth: "xe4h35",
		k1K539: "x1y6ykgk",
		$$css: true
	},
	modalTitle: {
		kGuDYH: "x13yuaex",
		k63SB2: "x1xlr1w8",
		kMwMTN: "xg6t7ro",
		kb6lSQ: "x1yf5rgg",
		$$css: true
	},
	modalSubtitle: {
		keoZOQ: "xe11usy",
		kMwMTN: "x1mpe8zw",
		kGuDYH: "x1u4lkj1",
		kLWn49: "x7exzxm",
		ks0D6T: "x1qp14f0",
		$$css: true
	},
	iconButton: {
		k1xSpc: "x3nfvp2",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		k7Eaqz: "x15j5qu1",
		kZKoxP: "xe2hd4t",
		kaIpWk: "x152jcrl",
		kWkggS: "xz6w6sx",
		k6WDB: "xvn2z4z",
		k1ekBW: "xmz27jc",
		kIyJzY: "x9rrsba",
		kMwMTN: "x1heor9g",
		kybGjl: "x1hl2dhg",
		kkrTdU: "x1ypdohk",
		kGzVvX: "xil4wd1",
		kaVNsj: "x1u49b0l",
		kwmNyF: "x14ow2ja",
		kwh8RV: "xjqf3cu",
		$$css: true
	}
};
//#endregion
//#region lib/classes.ts
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
		accentColor: "#f5c979",
		gradientStart: "#2b1f0e",
		gradientMid: "#4e3614",
		gradientEnd: "#8a5c24",
		ringColor: "rgba(255, 215, 154, 0.35)"
	},
	Bloodstorm: {
		accentColor: "#ff7f78",
		gradientStart: "#2a1215",
		gradientMid: "#3a171b",
		gradientEnd: "#5f1f28",
		ringColor: "rgba(255, 145, 139, 0.35)"
	},
	Numina: {
		accentColor: "#b68cff",
		gradientStart: "#1d1332",
		gradientMid: "#312054",
		gradientEnd: "#56308e",
		ringColor: "rgba(196, 164, 255, 0.35)"
	},
	Celestune: {
		accentColor: "#4b79ff",
		gradientStart: "#0d1c4a",
		gradientMid: "#10296b",
		gradientEnd: "#1b49b4",
		ringColor: "rgba(111, 150, 255, 0.35)"
	},
	"Dragon Roar": {
		accentColor: "#77ffd6",
		gradientStart: "#08211e",
		gradientMid: "#0d3934",
		gradientEnd: "#126255",
		ringColor: "rgba(152, 255, 224, 0.35)"
	},
	Sylph: {
		accentColor: "#ffb8bc",
		gradientStart: "#231520",
		gradientMid: "#402134",
		gradientEnd: "#6f3154",
		ringColor: "rgba(255, 201, 204, 0.35)"
	},
	Nightwalker: {
		accentColor: "#d6fbff",
		gradientStart: "#0a2528",
		gradientMid: "#103d42",
		gradientEnd: "#1d6b73",
		ringColor: "rgba(209, 252, 255, 0.35)"
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
//#region components/ClassIcon.stylex.ts
var classIconStyles = {
	wrapper: {
		k1xSpc: "x3nfvp2",
		kmuXW: "x2lah0s",
		kGNEyG: "x6s0dn4",
		kjj79g: "xl56j7k",
		kaIpWk: "x1x46wsa",
		kGVxlE: "x1u2tfwz",
		kMzoRj: "xmkeg23",
		ksu8eU: "x1y0btm7",
		$$css: true
	},
	icon: {
		k1xSpc: "x1lliihq",
		kzqmXN: "xh00ny3",
		kZKoxP: "x17cqvad",
		$$css: true
	},
	sizeMd: {
		kzqmXN: "x14qfxbe",
		kZKoxP: "xc9qbxq",
		$$css: true
	},
	sizeLg: {
		kzqmXN: "x100vrsf",
		kZKoxP: "x1vqgdyp",
		$$css: true
	},
	sizeXl: {
		kzqmXN: "x187nhsf",
		kZKoxP: "xn3w4p2",
		$$css: true
	},
	badge: {
		k1xSpc: "x3nfvp2",
		k7Eaqz: "xeuugli",
		kGNEyG: "x6s0dn4",
		kOIVth: "xj0vsr2",
		$$css: true
	},
	badgeFull: {
		kzqmXN: "xh8yej3",
		$$css: true
	},
	badgeTight: {
		kOIVth: "xl2holp",
		$$css: true
	},
	label: {
		k7Eaqz: "xeuugli",
		kVQacm: "xb3r6kr",
		kg5iWk: "xlyipyv",
		khDVqt: "xuxw1ft",
		kMwMTN: "x1lg201j",
		$$css: true
	},
	labelMuted: {
		kMwMTN: "xtfw3eu",
		$$css: true
	},
	labelSuccess: {
		kMwMTN: "x1bdc4et",
		$$css: true
	},
	labelXs: {
		kGuDYH: "xro2179",
		kLWn49: "xgkfwrp",
		$$css: true
	},
	labelBase: {
		kGuDYH: "x1u4lkj1",
		kLWn49: "x7exzxm",
		$$css: true
	},
	labelMedium: {
		k63SB2: "x1s688f",
		$$css: true
	},
	marginTopSm: {
		keoZOQ: "xe11usy",
		$$css: true
	}
};
//#endregion
//#region components/ClassIcon.tsx
function resolveIconSize(sizeClassName) {
	if (sizeClassName?.includes("h-11") || sizeClassName?.includes("w-11")) return classIconStyles.sizeXl;
	if (sizeClassName?.includes("h-10") || sizeClassName?.includes("w-10")) return classIconStyles.sizeXl;
	if (sizeClassName?.includes("h-9") || sizeClassName?.includes("w-9")) return classIconStyles.sizeLg;
	if (sizeClassName?.includes("h-8") || sizeClassName?.includes("w-8")) return classIconStyles.sizeLg;
	if (sizeClassName?.includes("h-7") || sizeClassName?.includes("w-7")) return classIconStyles.sizeMd;
	if (sizeClassName?.includes("h-6") || sizeClassName?.includes("w-6")) return classIconStyles.sizeMd;
	return classIconStyles.sizeLg;
}
function resolveBadgeTone(textClassName) {
	if (textClassName?.includes("text-green-300")) return classIconStyles.labelSuccess;
	if (textClassName?.includes("text-[#d2e5ef]")) return classIconStyles.labelMuted;
	return classIconStyles.label;
}
function resolveBadgeTextSize(textClassName) {
	if (textClassName?.includes("text-xs") || textClassName?.includes("text-[11px]")) return classIconStyles.labelXs;
	return classIconStyles.labelBase;
}
function resolveBadgeWeight(textClassName) {
	return textClassName?.includes("font-medium") ? classIconStyles.labelMedium : null;
}
function resolveBadgeWidth(badgeClassName) {
	return badgeClassName?.includes("w-full") ? classIconStyles.badgeFull : null;
}
function resolveBadgeGap(badgeClassName) {
	return badgeClassName?.includes("w-8") ? classIconStyles.badgeTight : null;
}
function resolveMarginTop(wrapperClassName) {
	return wrapperClassName?.includes("mt-2") ? classIconStyles.marginTopSm : null;
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
		...props(resolveIconSize(sizeClassName), classIconStyles.wrapper, resolveMarginTop(wrapperClassName)),
		style: {
			backgroundImage: `linear-gradient(135deg, ${visual.gradientStart}, ${visual.gradientMid}, ${visual.gradientEnd})`,
			borderColor: visual.ringColor
		},
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("span", {
			...props(classIconStyles.icon),
			style: { color: visual.accentColor },
			className: iconClassName,
			children: /* @__PURE__ */ jsx(ClassGlyph, { className: resolvedClassName })
		})
	});
}
function ClassBadge({ className, emptyLabel = "—", textClassName = "text-[#e6eff5]", badgeClassName, iconSizeClassName = "h-9 w-9" }) {
	const resolvedClassName = getKnownClassName(className);
	if (!resolvedClassName) return /* @__PURE__ */ jsx("span", {
		...props(resolveBadgeTone(textClassName), resolveBadgeTextSize(textClassName), resolveBadgeWeight(textClassName)),
		children: className || emptyLabel
	});
	return /* @__PURE__ */ jsxs("span", {
		...props(classIconStyles.badge, resolveBadgeWidth(badgeClassName), resolveBadgeGap(badgeClassName)),
		children: [/* @__PURE__ */ jsx(ClassIcon, {
			className: resolvedClassName,
			sizeClassName: iconSizeClassName
		}), /* @__PURE__ */ jsx("span", {
			...props(resolveBadgeTone(textClassName), resolveBadgeTextSize(textClassName), resolveBadgeWeight(textClassName)),
			children: resolvedClassName
		})]
	});
}
//#endregion
export { WuxiaIcon as a, props as i, uiStyles as n, appShellStyles as r, ClassBadge as t };
