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
});

// Ensure page always starts at top when loaded or refreshed
window.addEventListener('beforeunload', function() {
	window.scrollTo(0, 0);
});

// Additional safety measure for page load
window.addEventListener('load', function() {
	window.scrollTo(0, 0);
});

