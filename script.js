document.addEventListener('DOMContentLoaded',function(){
	// Force scroll to top on page load
	window.scrollTo(0, 0);
	
	const toggle=document.querySelector('.nav-toggle');
	const nav=document.querySelector('.nav');
	const header=document.querySelector('.site-header');
	const yearEl=document.getElementById('year');
	if(yearEl){yearEl.textContent=new Date().getFullYear();}
	if(toggle&&nav){
		toggle.addEventListener('click',function(){
			const isOpen=nav.classList.toggle('open');
			toggle.setAttribute('aria-expanded',String(isOpen));
		});
	}
	window.addEventListener('scroll',function(){
		if(window.scrollY>10){header.classList.add('header-solid');}
		else{header.classList.remove('header-solid');}
	});

	// Scroll spy: destaca link ativo do menu
	const links=[...document.querySelectorAll('.nav a[href^="#"]')];
	const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
	const setActive=(id)=>{
		links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`));
	};
	const observer=new IntersectionObserver((entries)=>{
		entries.forEach(entry=>{
			if(entry.isIntersecting){setActive(entry.target.id);} 
		});
	},{threshold:.6});
	sections.forEach(sec=>observer.observe(sec));

	// Enhanced Animation System with Intersection Observer
	const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale-in, .animate-fade-in, .animate-stagger');
	
	const animationObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Add a small delay before starting animation for more elegance
				setTimeout(() => {
					entry.target.classList.add('animate-in');
				}, 100);
				
				// For staggered animations, trigger children animations with longer delays
				if (entry.target.classList.contains('animate-stagger')) {
					const children = entry.target.children;
					Array.from(children).forEach((child, index) => {
						setTimeout(() => {
							child.style.opacity = '1';
							child.style.transform = 'translateY(0)';
						}, 200 + (index * 150)); // 200ms base delay + 150ms between each child
					});
				}
			}
		});
	}, {
		threshold: 0.15,
		rootMargin: '0px 0px -50px 0px'
	});

	// Observe all animation elements
	animateElements.forEach(el => {
		animationObserver.observe(el);
	});

	// Subtle scroll effects - removed parallax for better performance

	// Smooth reveal animation for content sections
	const contentSections = document.querySelectorAll('.content');
	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('flash-arrive');
				setTimeout(() => {
					entry.target.classList.remove('flash-arrive');
				}, 900);
			}
		});
	}, {
		threshold: 0.3
	});

	contentSections.forEach(section => {
		sectionObserver.observe(section);
	});
});

// Ensure page always starts at top when loaded or refreshed
window.addEventListener('beforeunload', function() {
	window.scrollTo(0, 0);
});

// Additional safety measure for page load
window.addEventListener('load', function() {
	window.scrollTo(0, 0);
});

