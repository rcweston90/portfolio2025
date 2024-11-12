// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

	// Update the active state based on current page
	const currentPath = window.location.pathname;
	const navLinks = document.querySelectorAll('.nav-link');

	// Handle active states
	navLinks.forEach(link => {
		const href = link.getAttribute('href');
		if (currentPath.endsWith(href)) {
			link.classList.add('active');
			link.style.backgroundColor = '#fafafa';
		}
	});

	// Add hover state handling
	navLinks.forEach(link => {
		// Mouse enter event
		link.addEventListener('mouseenter', () => {
			link.style.backgroundColor = '#fafafa';
			link.style.transform = 'translateX(8px)';
		});

		// Mouse leave event
		link.addEventListener('mouseleave', () => {
			if (!link.classList.contains('active')) {
				link.style.backgroundColor = 'transparent';
				link.style.transform = 'translateX(0)';
			}
		});
	});

	// Handle social icons hover effects
	const socialIcons = document.querySelectorAll('.social-icon');
	socialIcons.forEach(icon => {
		icon.addEventListener('mouseenter', () => {
			icon.style.transform = 'scale(1.2)';
		});

		icon.addEventListener('mouseleave', () => {
			icon.style.transform = 'scale(1)';
		});
	});

	// Optional: Add smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
});