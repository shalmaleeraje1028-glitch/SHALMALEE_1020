import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as AnimatePresence, n as useTransform, r as useScroll, t as useSpring } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B0smO1W7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var vangogh_hero_default = "/assets/vangogh-hero-MeMjlJzZ.jpg";
var lajja_thumbnail_default = "/assets/lajja-thumbnail-CZUVMVey.png";
function Cursor() {
	const x = useSpring(0, {
		stiffness: 400,
		damping: 30,
		mass: .4
	});
	const y = useSpring(0, {
		stiffness: 400,
		damping: 30,
		mass: .4
	});
	const [hover, setHover] = (0, import_react.useState)(false);
	const [label, setLabel] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const move = (e) => {
			x.set(e.clientX);
			y.set(e.clientY);
		};
		const over = (e) => {
			const el = e.target.closest("[data-cursor]");
			if (el) {
				setHover(true);
				setLabel(el.dataset.cursor || null);
			} else {
				setHover(false);
				setLabel(null);
			}
		};
		window.addEventListener("mousemove", move);
		window.addEventListener("mouseover", over);
		return () => {
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mouseover", over);
		};
	}, [x, y]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		style: {
			x,
			y
		},
		className: "pointer-events-none fixed left-0 top-0 z-[100] hidden md:block",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			animate: {
				scale: hover ? 3.2 : 1,
				backgroundColor: hover ? "var(--accent)" : "var(--primary)"
			},
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 25
			},
			className: "-translate-x-1/2 -translate-y-1/2 rounded-full",
			style: {
				width: 14,
				height: 14,
				mixBlendMode: "multiply"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			initial: {
				opacity: 0,
				y: 4
			},
			animate: {
				opacity: 1,
				y: 0
			},
			exit: { opacity: 0 },
			className: "absolute left-4 top-4 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background",
			children: label
		}) })]
	});
}
function Magnetic({ children, strength = .35, className = "" }) {
	const ref = (0, import_react.useRef)(null);
	const x = useSpring(0, {
		stiffness: 200,
		damping: 15
	});
	const y = useSpring(0, {
		stiffness: 200,
		damping: 15
	});
	const onMove = (e) => {
		const el = ref.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		x.set((e.clientX - (r.left + r.width / 2)) * strength);
		y.set((e.clientY - (r.top + r.height / 2)) * strength);
	};
	const reset = () => {
		x.set(0);
		y.set(0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		onMouseMove: onMove,
		onMouseLeave: reset,
		style: {
			x,
			y
		},
		className,
		children
	});
}
function Marquee({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative overflow-hidden border-y border-foreground/15 py-4 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "marquee flex w-max gap-10 whitespace-nowrap text-sm uppercase tracking-[0.35em]",
			children: [...items, ...items].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-10",
				children: [t, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-accent",
					children: "✦"
				})]
			}, i))
		})
	});
}
function Reveal({ children, className = "", delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 30
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .8,
			ease: [
				.22,
				1,
				.36,
				1
			],
			delay
		},
		className,
		children
	});
}
function Tilt({ children, className = "" }) {
	const ref = (0, import_react.useRef)(null);
	const rx = useSpring(0, {
		stiffness: 200,
		damping: 20
	});
	const ry = useSpring(0, {
		stiffness: 200,
		damping: 20
	});
	const onMove = (e) => {
		const el = ref.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const px = (e.clientX - r.left) / r.width - .5;
		const py = (e.clientY - r.top) / r.height - .5;
		ry.set(px * 10);
		rx.set(-py * 10);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		onMouseMove: onMove,
		onMouseLeave: () => {
			rx.set(0);
			ry.set(0);
		},
		style: {
			rotateX: rx,
			rotateY: ry,
			transformPerspective: 1200,
			transformStyle: "preserve-3d"
		},
		className,
		children
	});
}
function Portfolio() {
	const { scrollYProgress } = useScroll();
	const progressX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
	const heroParallax = useTransform(scrollYProgress, [0, .5], [0, -120]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cursor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: { width: progressX },
				className: "fixed left-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-primary via-accent to-secondary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { parallax: heroParallax }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, { items: [
				"Room I · Foyer",
				"Room II · Practice",
				"Room III · Exhibits",
				"Room IV · Correspondence"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-foreground/15 bg-background/85 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(0,0,0,0.15)]" : "border-b border-transparent bg-transparent"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					"data-cursor": "entrance",
					className: "flex items-center gap-3 uppercase tracking-[0.2em] text-sm font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-2 rounded-full bg-accent" }), "The Museum of Shalmalee"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-8 text-xs uppercase tracking-[0.25em] md:flex",
					children: [
						["I. Foyer", "#about"],
						["II. Practice", "#skills"],
						["III. Exhibits", "#work"],
						["IV. Contact", "#contact"]
					].map(([l, h]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: h,
						"data-cursor": "enter",
						className: "group relative",
						children: [l, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" })]
					}, h))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://drive.google.com/file/d/1yJ5XZwyi6xcg-XSUiuuGmlvrer2apQg7/view?usp=sharing",
					target: "_blank",
					rel: "noreferrer",
					"data-cursor": "download",
					className: "rounded-full border border-foreground bg-foreground px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent",
					children: "Museum Guide ↓"
				}) })
			]
		})
	});
}
function Hero({ parallax }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative grain overflow-hidden pt-36 pb-20 md:pt-44 md:pb-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
				src: vangogh_hero_default,
				alt: "Starry night inspired backdrop",
				style: { y: parallax },
				className: "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-6 md:px-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-12 bg-foreground/40" }), " Now Open · Est. 2026 · Free Admission"]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "relative text-[13vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[9.5rem] text-cream drop-shadow-[0_6px_24px_rgba(15,23,66,0.55)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitWord, { text: "SHALMALEE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitWord, {
								text: "RAJE.",
								delay: .4
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid gap-10 md:grid-cols-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: .3,
							className: "md:col-span-7",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-lg text-balance md:text-2xl leading-snug",
								children: [
									"UI/UX Developer I curate",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "text-accent not-italic font-semibold",
										children: "interfaces like exhibits"
									}),
									": researched, arranged with intent, and framed for the person walking through them."
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
							delay: .5,
							className: "md:col-span-4 md:col-start-9 flex flex-col items-start gap-2 self-end text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
									children: "Museum Location"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl font-semibold",
									children: "Pune, Maharashtra 🇮🇳"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:shalmaleeraje1028@gmail.com",
									"data-cursor": "email",
									className: "mt-3 underline-offset-4 hover:underline",
									children: "shalmaleeraje1028@gmail.com"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#work",
							"data-cursor": "tour",
							className: "group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-primary-foreground text-sm uppercase tracking-[0.2em] transition-shadow hover:shadow-[var(--shadow-soft)]",
							children: ["Begin the tour", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-6 place-items-center rounded-full bg-primary-foreground/15 transition-transform group-hover:translate-x-1",
								children: "→"
							})]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							"data-cursor": "say hi",
							className: "rounded-full border border-foreground/30 px-7 py-4 text-sm uppercase tracking-[0.2em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background",
							children: "Guestbook"
						}) })]
					})
				]
			})
		]
	});
}
function SplitWord({ text, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-block",
		children: text.split("").map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			initial: {
				y: "110%",
				opacity: 0
			},
			animate: {
				y: 0,
				opacity: 1
			},
			transition: {
				duration: .9,
				ease: [
					.22,
					1,
					.36,
					1
				],
				delay: delay + i * .04
			},
			className: "inline-block",
			children: c === " " ? "\xA0" : c
		}, i))
	});
}
function RoomHeader({ n, title, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-14 flex items-center gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid size-14 place-items-center rounded-full border border-foreground text-sm font-bold",
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs uppercase tracking-[0.4em] text-muted-foreground",
				children: ["Room ", n]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 text-3xl font-bold uppercase tracking-tight md:text-5xl",
				children: title
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: sub
			})
		] })]
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "about",
		className: "relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomHeader, {
				n: "I",
				title: "The Foyer",
				sub: "An introduction to the curator"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 md:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					className: "md:col-span-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-2xl leading-snug md:text-4xl font-light",
						children: [
							"I'm passionate about UI/UX because it lets me",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary font-semibold",
								children: "understand people"
							}),
							" ",
							"beyond the screen — researching behavior, finding quiet pain points, and shaping digital spaces that feel",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-accent font-semibold",
								children: [" ", "simple, meaningful, and human"]
							}),
							"."
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: .2,
					className: "md:col-span-4 border-l border-foreground/15 pl-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] text-muted-foreground",
						children: "Wall Label"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed",
						children: "Shalmalee Raje (b. Pune) is a UI/UX developer working at the intersection of research, interface and code — treating every product as a small exhibition."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .2,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid grid-cols-2 gap-4 md:grid-cols-4",
					children: [
						["40+", "User interviews"],
						["05", "Live client sites"],
						["03", "Internships"],
						["∞", "Cups of chai"]
					].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-foreground/20 bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-5xl font-bold text-primary",
							children: n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground",
							children: l
						})]
					}, l))
				})
			})
		]
	});
}
function Skills() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "skills",
		className: "relative bg-foreground text-background grain",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-14 flex items-center gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-14 place-items-center rounded-full border border-background text-sm font-bold",
					children: "II"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.4em] opacity-60",
						children: "Room II"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-3xl font-bold uppercase tracking-tight md:text-5xl",
						children: "The Practice Room"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm opacity-60",
						children: "Instruments & disciplines"
					})
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-16 md:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-7 space-y-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] opacity-60",
						children: "Technical Proficiency"
					}), [
						["Python", 90],
						["Figma", 90],
						["JavaScript", 80],
						["HTML / CSS", 80]
					].map(([name, pct], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
						name,
						pct,
						delay: i * .08
					}, name))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] opacity-60",
						children: "Craft & Approach"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [
							"User Research",
							"Empathy-driven design",
							"Design Thinking",
							"Prototyping",
							"Interaction Design",
							"Visual Storytelling"
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-cursor": "•",
							className: "inline-flex cursor-pointer rounded-full border border-background/40 px-4 py-2 text-sm uppercase tracking-[0.15em] transition-colors hover:bg-background hover:text-foreground",
							children: s
						}) }, s))
					})]
				})]
			})]
		})
	});
}
function SkillBar({ name, pct, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 flex items-baseline justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-lg font-semibold uppercase tracking-[0.1em]",
			children: name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
			initial: { opacity: 0 },
			whileInView: { opacity: 1 },
			viewport: { once: true },
			transition: { delay: delay + .6 },
			className: "text-sm font-mono opacity-70",
			children: [pct, "%"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative h-2 w-full overflow-hidden rounded-full bg-background/15",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { width: 0 },
			whileInView: { width: `${pct}%` },
			viewport: { once: true },
			transition: {
				duration: 1.3,
				ease: [
					.22,
					1,
					.36,
					1
				],
				delay
			},
			className: "h-full rounded-full bg-gradient-to-r from-accent via-secondary to-accent"
		})
	})] });
}
var EXHIBITS = [
	{
		id: "synaptris",
		no: "01",
		title: "Synaptris",
		role: "UX & Marketing Intern",
		year: "Feb – May 2026",
		medium: "Product · Marketing · Research",
		desc: "Most recent internship. Contributed to UX flows, marketing assets, and user-facing pages for a B2B analytics platform.",
		href: "https://synaptris.com/",
		liveEmbed: true
	},
	{
		id: "maddie",
		no: "02",
		title: "Maddie's Magical Moments",
		role: "End-to-end Designer & Developer (Internship)",
		year: "January 2026",
		medium: "Website · Booking flow",
		desc: "A full website built for a UK-based face-painting business — warm, playful, bookable.",
		href: "https://maddiesmagicalmomentsfacepaint.co.uk/",
		liveEmbed: true
	},
	{
		id: "craft",
		no: "03",
		title: "The Craft Village",
		role: "Website Designer & Developer",
		year: "Jan – Jul 2025",
		medium: "E-commerce · Craft storytelling",
		desc: "Built the full website for The Craft Village — a marketplace celebrating Indian artisans and handmade craft.",
		href: "https://thecraftvillage.in/",
		liveEmbed: true
	},
	{
		id: "vasu",
		no: "04",
		title: "Vasu Visuals",
		role: "Contributing Web Designer / Developer",
		year: "2022 – 2023",
		medium: "Multiple client websites",
		desc: "Contributed to a range of client website design and development projects across the Vasu Visuals studio.",
		href: "https://linkedin.com/in/vasu-visuals-6192a5294"
	},
	{
		id: "digitales",
		no: "05",
		title: "Digitales — College Figma Project",
		role: "UI/UX Designer",
		year: "College",
		medium: "Figma prototype · UI system",
		desc: "A full Figma design assignment — interactive prototype exploring layout, typography and premium editorial UI.",
		href: "https://www.figma.com/proto/1CYfuXc2fFtT2doEhLSBce/FIGMA-FILE-ASSIGNMENT-_DIGITALES?node-id=16-40&page-id=0%3A1&t=uLYrHIyaW1qeK8eQ-1",
		thumb: lajja_thumbnail_default
	}
];
function Projects() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "work",
		className: "relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoomHeader, {
			n: "III",
			title: "The Exhibits",
			sub: "Selected works, hung chronologically"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-16",
			children: EXHIBITS.map((ex, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Exhibit, {
				exhibit: ex,
				flip: i % 2 === 1
			}, ex.id))
		})]
	});
}
function Exhibit({ exhibit, flip }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `grid gap-8 md:grid-cols-12 md:items-center ${flip ? "md:[&>*:first-child]:order-2" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:col-span-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tilt, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: exhibit.href,
				target: "_blank",
				rel: "noreferrer",
				"data-cursor": "visit ↗",
				className: "group block overflow-hidden rounded-sm border-[10px] border-foreground bg-card shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)] transition-shadow hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-foreground/10 bg-background/60 px-4 py-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-destructive/70" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-secondary" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-foreground/5 px-3 py-1 font-mono",
							children: new URL(exhibit.href).host
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "opacity-50",
							children: "live ↗"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[16/10] overflow-hidden bg-background",
					children: [exhibit.thumb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: exhibit.thumb,
						alt: exhibit.title,
						className: "absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]",
						loading: "lazy"
					}) : exhibit.liveEmbed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						src: exhibit.href,
						title: exhibit.title,
						loading: "lazy",
						className: "pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 scale-[0.62] origin-center transition-transform duration-700 group-hover:scale-[0.65]"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center bg-gradient-to-br from-primary to-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-6xl font-bold uppercase tracking-tight text-background",
							children: exhibit.title
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex items-end justify-between bg-gradient-to-t from-foreground/40 via-transparent to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-bold uppercase text-background",
							children: "View the exhibit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-background px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-foreground",
							children: "Open ↗"
						})]
					})]
				})]
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:col-span-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-l-4 border-accent bg-card p-6 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground",
						children: ["Exhibit № ", exhibit.no]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 text-3xl font-bold uppercase leading-tight",
						children: exhibit.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Role: "
						}), exhibit.role]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Year: "
						}), exhibit.year]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Medium: "
						}), exhibit.medium]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted-foreground",
						children: exhibit.desc
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: exhibit.href,
						target: "_blank",
						rel: "noreferrer",
						"data-cursor": "visit",
						className: "mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold hover:text-accent",
						children: ["Visit exhibit ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "↗" })]
					})
				]
			})
		})]
	}) });
}
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "relative overflow-hidden bg-primary text-primary-foreground grain",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-14 flex items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-14 place-items-center rounded-full border border-primary-foreground text-sm font-bold",
						children: "IV"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.4em] opacity-70",
						children: "Room IV"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-3xl font-bold uppercase tracking-tight md:text-5xl",
						children: "The Guestbook"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-[11vw] font-bold uppercase leading-[0.9] md:text-[8rem]",
					children: ["Let's build ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "something human."
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid gap-10 md:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						className: "md:col-span-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Magnetic, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "mailto:shalmaleeraje1028@gmail.com",
							"data-cursor": "email",
							className: "inline-flex items-center gap-4 rounded-full bg-accent px-8 py-5 text-accent-foreground transition-shadow hover:shadow-[var(--shadow-glow)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl font-semibold",
								children: "shalmaleeraje1028@gmail.com"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 place-items-center rounded-full bg-accent-foreground/10",
								children: "↗"
							})]
						}) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-5 space-y-4 self-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Phone",
								v: "+91 99756 59251"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Location",
								v: "Pune, Maharashtra"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								k: "Availability",
								v: "Open to UI/UX roles · 2026"
							})
						]
					})]
				})
			]
		})
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between border-b border-primary-foreground/15 pb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs uppercase tracking-[0.25em] opacity-60",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-lg font-semibold",
			children: v
		})]
	}) });
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-foreground/10 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm uppercase tracking-[0.25em] font-bold",
				children: "Shalmalee Raje · UI/UX Developer"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
				children: "© 2026 — The Museum closes at midnight."
			})]
		})
	});
}
//#endregion
export { Portfolio as component };
