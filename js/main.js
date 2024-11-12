// js/main.js
import CONFIG from './config.js';

// Handle page load
document.addEventListener('DOMContentLoaded', () => {
	initializeNavigation();
	handleSocialIcons();
	updateActiveState();
});

function initializeNavigation() {
	const navLinks = document.querySelectorAll('.nav-link');
	navLinks.forEach(link => {
		handleNavHoverEffects(link);
	});
}

function handleSocialIcons() {
	const socialIcons = document.querySelectorAll('.social-icon');
	socialIcons.forEach(icon => {
		handleIconHoverEffects(icon);
	});
}

function updateActiveState() {
	const currentPath = window.location.pathname;
	const navLinks = document.querySelectorAll('.nav-link');
	navLinks.forEach(link => {
		if (currentPath.endsWith(link.getAttribute('href'))) {
			link.classList.add('active');
		}
	});
}