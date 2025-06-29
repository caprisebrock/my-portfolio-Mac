// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Add fade-in animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections and project cards
document.querySelectorAll('section, .project-card').forEach(el => {
    observer.observe(el);
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment the lines below if you want a typing effect on the hero title
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 50);
// }

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in-up {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// AI Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle chat window
    chatButton.addEventListener('click', () => {
        chatWindow.classList.remove('hidden');
        chatButton.classList.add('hidden');
        chatInput.focus();
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        chatButton.classList.remove('hidden');
    });

    // Send message function
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Simulate AI response (you can replace this with actual AI integration)
        setTimeout(() => {
            const aiResponse = generateAIResponse(message);
            addMessage(aiResponse, 'ai');
        }, 1000);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex items-start space-x-2';
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="flex-1"></div>
                <div class="bg-chat-accent text-white rounded-lg p-3 max-w-xs">
                    <p class="text-sm">${text}</p>
                </div>
                <div class="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    <i class="fas fa-user"></i>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="bg-chat-accent text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="bg-chat-border text-chat-text rounded-lg p-3 max-w-xs">
                    <p class="text-sm">${text}</p>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Generate AI response (simplified - replace with actual AI integration)
    function generateAIResponse(userMessage) {
        const responses = {
            'hello': 'Hello! How can I help you with your web development needs today?',
            'hi': 'Hi there! I\'m here to help you with any questions about web development or this portfolio.',
            'help': 'I can help you with questions about web development, this portfolio, or connecting with Caprise for freelance work.',
            'contact': 'You can contact Caprise at brockcaprise@gmail.com or book a call through the "Book a Call" section.',
            'services': 'Caprise offers freelance web development services including HTML, CSS, and responsive website creation.',
            'portfolio': 'This portfolio showcases Caprise\'s work as a beginner developer learning HTML, CSS, GitHub, and AI tools.',
            'pricing': 'For pricing information, please contact Caprise directly at brockcaprise@gmail.com or book a consultation call.',
            'experience': 'Caprise is a beginner developer currently learning HTML, CSS, GitHub, and AI tools for freelance work.',
            'skills': 'Current skills include HTML5, CSS3, responsive design, Git & GitHub, and various AI development tools.',
            'projects': 'Check out the Projects section to see examples of Caprise\'s work and web development projects.'
        };

        const lowerMessage = userMessage.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return 'Thanks for your message! I\'m here to help with any questions about web development or this portfolio. You can also contact Caprise directly at brockcaprise@gmail.com for specific inquiries.';
    }

    // Event listeners for sending messages
    sendMessage.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // Close chat when clicking outside (optional)
    document.addEventListener('click', (e) => {
        if (!chatButton.contains(e.target) && !chatWindow.contains(e.target)) {
            // Uncomment the next line if you want to close chat when clicking outside
            // chatWindow.classList.add('hidden'); chatButton.classList.remove('hidden');
        }
    });
}); 