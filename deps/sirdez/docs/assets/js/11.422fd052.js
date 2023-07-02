(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{302:function(t,s,a){"use strict";a.r(s);var e=a(13),n=Object(e.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"array"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#array"}},[t._v("#")]),t._v(" Array")]),t._v(" "),s("p",[t._v("Arrays allow you to store elements of a specific type. For example vertices, transactions, users... "),s("code",[t._v("sd.array")]),t._v(" will require a "),s("code",[t._v("sd.Serdes")]),t._v(" which will be used to encode the items, and a "),s("code",[t._v("headSd")]),t._v(" which is a "),s("code",[t._v("sd.Serdes<number>")]),t._v(" to encode the number of items in the array.")]),t._v(" "),s("h2",{attrs:{id:"headers"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#headers"}},[t._v("#")]),t._v(" Headers")]),t._v(" "),s("p",[t._v("Headers determine the size of the array.")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("sd.uint8")]),t._v(" for arrays of length [0, 255].")]),t._v(" "),s("li",[s("code",[t._v("sd.uint16")]),t._v(" for arrays of length [0, 65 535].")]),t._v(" "),s("li",[s("code",[t._v("sd.uint32")]),t._v(" for arrays of length [0, 4 294 967 295]")])]),t._v(" "),s("h2",{attrs:{id:"usage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usage"}},[t._v("#")]),t._v(" Usage")]),t._v(" "),s("p",[t._v("Creating a "),s("code",[t._v("sd.Serdes")]),t._v(" for points. It can store up to 65 535 items points as defined by "),s("code",[t._v("headSd")]),t._v(" of "),s("code",[t._v("sd.uint16")]),t._v(".")]),t._v(" "),s("div",{staticClass:"language-ts extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ts"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" toBytes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fromBytes "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" sd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  sd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("array")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("struct")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" x"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" sd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("float"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" sd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("float "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" sd"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("uint16"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"specifications"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#specifications"}},[t._v("#")]),t._v(" Specifications")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("[number of items (headSd)][...items (sd)]\n")])])]),s("p",[t._v("The number of items ("),s("code",[t._v("array.length")]),t._v(") will be encoded at the start of the payload using the provided "),s("code",[t._v("headSd")]),t._v(". Then the actual items serialized with "),s("code",[t._v("sd")]),t._v(" will follow.")])])}),[],!1,null,null,null);s.default=n.exports}}]);