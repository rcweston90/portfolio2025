// build.js
const fs = require('fs');
const path = require('path');

function buildPages() {
	// Create dist directory if it doesn't exist
	if (!fs.existsSync('./dist')) {
		fs.mkdirSync('./dist');
	}

	// Create dist/pages directory if it doesn't exist
	if (!fs.existsSync('./dist/pages')) {
		fs.mkdirSync('./dist/pages');
	}

	// Copy static assets
	copyDirectory('./css', './dist/css');
	copyDirectory('./js', './dist/js');
	copyDirectory('./assets', './dist/assets');

	// Build index.html
	buildPage('index.html');

	// Build pages in pages directory
	const pages = fs.readdirSync('./pages').filter(file => file.endsWith('.html'));
	pages.forEach(page => {
		buildPage(`pages/${page}`);
	});
}

function buildPage(pagePath) {
	console.log(`Building ${pagePath}...`);
	let content = fs.readFileSync(pagePath, 'utf8');

	// Replace component placeholders
	content = content.replace('<!-- Include head component -->', 
		fs.readFileSync('./components/head.html', 'utf8'));
	content = content.replace('<!-- Include sidebar component -->', 
		fs.readFileSync('./components/sidebar.html', 'utf8'));
	content = content.replace('<!-- Include footer component -->', 
		fs.readFileSync('./components/footer.html', 'utf8'));

	// Write the built file to dist
	const distPath = `./dist/${pagePath}`;
	ensureDirectoryExistence(distPath);
	fs.writeFileSync(distPath, content);
}

function copyDirectory(src, dest) {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}

	const entries = fs.readdirSync(src, { withFileTypes: true });

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			copyDirectory(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

function ensureDirectoryExistence(filePath) {
	const dirname = path.dirname(filePath);
	if (fs.existsSync(dirname)) {
		return true;
	}
	ensureDirectoryExistence(dirname);
	fs.mkdirSync(dirname);
}

// Add scripts for development
function watchMode() {
	console.log('Watching for changes...');

	// Initial build
	buildPages();

	// Watch directories for changes
	const dirsToWatch = ['.', './pages', './components', './css', './js', './assets'];

	dirsToWatch.forEach(dir => {
		fs.watch(dir, (eventType, filename) => {
			if (filename) {
				console.log(`Changes detected in ${filename}`);
				buildPages();
			}
		});
	});
}

// Check if watch flag is passed
if (process.argv.includes('--watch')) {
	watchMode();
} else {
	buildPages();
}