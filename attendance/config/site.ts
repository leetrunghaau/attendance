export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Quản lý điểm danh",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Trang chủ",
			href: "/",
		},
		{
			label: "Diểm danh",
			href: "/teacherAttendence",
		},
		{
			label: "Thiết bị",
			href: "/driver",
		},
		{
			label: "Giáo viên",
			href: "/teacher",
		},
		{
			label: "Học sinh",
			href: "/student",
		},
		{
			label: "Lớp học",
			href: "/classRoom",
		},
		{
			label: "Thời khóa biểu",
			href: "/schedule",
		}

	],
	navMenuItems: [
		{
			label: "Trang chủ",
			href: "/",
		},
		{
			label: "Diểm danh",
			href: "/teacherAttendence",
		},
		{
			label: "Thiết bị",
			href: "/driver",
		},
		{
			label: "Giáo viên",
			href: "/teacher",
		},
		{
			label: "Học sinh",
			href: "/student",
		},
		{
			label: "Lớp học",
			href: "/classRoom",
		},
		{
			label: "Thời khóa biểu",
			href: "/schedule",
		}

	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
		sponsor: "https://patreon.com/jrgarciadev"
	},
};
