const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	// --- Inline SVG components ---
	const MailIcon = ({ size = 16 }) => (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
			<rect width="20" height="16" x="2" y="4" rx="2" />
			<path d="m22 7-10 6L2 7" />
		</svg>
	);

	const PhoneIcon = ({ size = 16 }) => (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
			<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 12.44 12.44 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.17a2 2 0 0 1 2.11-.45 12.44 12.44 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
		</svg>
	);

	const MapPinIcon = ({ size = 16 }) => (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	);

	const LinkedinIcon = ({ size = 16 }) => (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
			<path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 
			0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-11 19H5v-9h3v9zM6.5 
			8.5C5.12 8.5 4 7.38 4 6s1.12-2.5 2.5-2.5S9 4.62 9 
			6 7.88 8.5 6.5 8.5zm13.5 10.5h-3v-4.5c0-1.1-.9-2-2-2s-2 
			.9-2 2V19h-3v-9h3v1.26c.73-.91 1.83-1.26 3-1.26 
			2.21 0 4 1.79 4 4V19z"/>
		</svg>
	);

	const GlobeIcon = ({ size = 16 }) => (
		<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="10" />
			<line x1="2" y1="12" x2="22" y2="12" />
			<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
		</svg>
	);

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800">
			{/* Header */}
			<header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-4xl font-light mb-3">
					{data.personal_info?.full_name || "Your Name"}
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
					{data.personal_info?.email && (
						<div className="flex items-center gap-2">
							<MailIcon />
							<span>{data.personal_info.email}</span>
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-2">
							<PhoneIcon />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.location && (
						<div className="flex items-center gap-2">
							<MapPinIcon />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<a target="_blank" href={data.personal_info?.linkedin} className="flex items-center gap-2">
							<LinkedinIcon />
							<span className="break-all text-xs">
								{data.personal_info.linkedin.split("https://www.")[1] || data.personal_info.linkedin}
							</span>
						</a>
					)}
					{data.personal_info?.website && (
						<a target="_blank" href={data.personal_info?.website} className="flex items-center gap-2">
							<GlobeIcon />
							<span className="break-all text-xs">
								{data.personal_info.website.split("https://")[1] || data.personal_info.website}
							</span>
						</a>
					)}
				</div>
			</header>

			{/* The rest of your component stays the same */}
			<div className="p-8">
				{/* ... (no changes to Experience, Projects, Education, Skills) */}
			</div>
		</div>
	);
};

export default ModernTemplate;
