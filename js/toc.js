document.addEventListener('DOMContentLoaded', () => {
    // Get all headings in the article
    const article = document.querySelector('.main-container');
    const headings = article.querySelectorAll('h1, h2, h3');
    const tocList = document.getElementById('toc-list');

    // Create TOC items
    headings.forEach((heading, index) => {
        const link = document.createElement('a');
        link.textContent = heading.textContent;
        link.href = `#heading-${index}`;
        
        // Add ID to the heading
        heading.id = `heading-${index}`;
        
        const listItem = document.createElement('li');
        listItem.appendChild(link);
        
        // Add indentation for subheadings
        if (heading.tagName === 'H3') {
            listItem.style.paddingLeft = '2rem';
        }
        
        tocList.appendChild(listItem);
    });

    // Highlight current section
    const observerOptions = {
        rootMargin: '-100px 0px -66%',
        threshold: 0
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const tocItem = document.querySelector(`.toc-nav a[href="#${id}"]`);
            
            if (entry.isIntersecting) {
                // Remove all active classes first
                document.querySelectorAll('.toc-nav a').forEach(link => {
                    link.classList.remove('active');
                });
                // Add active class to current section
                tocItem?.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all headings
    headings.forEach(heading => observer.observe(heading));

    // Smooth scroll to section when clicking TOC links
    document.querySelectorAll('.toc-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
