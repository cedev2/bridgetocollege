import { useEffect } from 'react';

const SEO = ({ title, description, keywords, image, url }) => {
    useEffect(() => {
        // --- 1. Update Document Title ---
        const fullTitle = `${title} | Bridge to College`;
        document.title = fullTitle;

        // --- 2. Update Basic Meta Description ---
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description || 'Empowering Rwandan students to achieve their higher education dreams.');

        // --- 3. Update Meta Keywords ---
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', keywords || 'Bridge to College, Education, Rwanda, Universities, Scholarships, Career Guidance');

        // --- 4. Open Graph / Social Media Meta Tags ---
        const metaTags = [
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: description },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: url || window.location.href },
            { property: 'og:image', content: image || '/logo.jpg' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: fullTitle },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: image || '/logo.jpg' }
        ];

        metaTags.forEach(tag => {
            let element = tag.property 
                ? document.querySelector(`meta[property="${tag.property}"]`)
                : document.querySelector(`meta[name="${tag.name}"]`);
            
            if (!element) {
                element = document.createElement('meta');
                if (tag.property) element.setAttribute('property', tag.property);
                if (tag.name) element.setAttribute('name', tag.name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', tag.content);
        });

    }, [title, description, keywords, image, url]);

    return null; // This component doesn't render anything UI-wise
};

export default SEO;
