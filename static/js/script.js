// Typewriter Animation for Pre-Marketing Landing Page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - starting typewriter...');

    const messagesContainer = document.getElementById('messages');
    const ctaButton = document.getElementById('ctaButton');

    // Hide button initially
    if (ctaButton) {
        ctaButton.style.display = 'none';
    }

    if (messagesContainer) {
        // Start typewriter immediately
        setTimeout(() => {
            console.log('Starting typewriter...');            // Pre-marketing message lines
            const lines = [
                "Hey! Did you know most landlords use smart software to manage their properties?",
                "These tools help them cut costs and push rents up to maximise profits.",
                "But what about you, the renter?",
                "Until now, there hasn't been anything for tenants",
                "Hi, I'm Bruce, the world's first AI-powered Tenant Advocate.",
                "I'm here to help you navigate your landlord relationship.",
                "Starting May 1, 2026, the Renters' Rights Act will shake up the English rental market.",
                "You'll gain new powers to challenge unfair practices!",
                "My mission is to help you tackle rogue landlords.",
                "I can help you:",
                "✅ Secure a fairer rent.",
                "✅ Coordinate repairs and escalate issues.",
                "✅ Monitor rent increases to ensure the best deal.",
                "✅ Understand your rights.",
                "Want to be first in line when Bruce launches?",
                "Register your interest below! 🚀"
            ];
            
            // Timing settings
            const typingSpeed = 50;        // Speed of typing each character
            const linePauseTime = 1200;    // Pause between lines
            
            let currentLineIndex = 0;
            
            function createMessageBox(lineIndex) {
                const messageBox = document.createElement('div');
                messageBox.className = 'message';
                
                const innerDiv = document.createElement('div');
                innerDiv.id = `message-line-${lineIndex}`;
                innerDiv.textContent = '';
                
                messageBox.appendChild(innerDiv);
                messagesContainer.appendChild(messageBox);

                // Scroll to show the new message
                setTimeout(() => {
                    const containerHeight = messagesContainer.clientHeight;
                    const scrollTarget = messagesContainer.scrollHeight - containerHeight + 100;
                    messagesContainer.scrollTo({
                        top: Math.max(0, scrollTarget),
                        behavior: 'smooth'
                    });
                }, 50);

                return innerDiv;
            }            function typeNextLine(lineIndex) {
                if (lineIndex >= lines.length) {
                    // All lines done - show CTA button
                    setTimeout(() => {
                        if (ctaButton) {
                            ctaButton.style.display = 'block';
                            ctaButton.classList.add('show');
                        }

                        messagesContainer.scrollTo({
                            top: messagesContainer.scrollHeight,
                            behavior: 'smooth'
                        });

                        console.log('All lines complete - CTA shown');
                    }, 500);
                    return;
                }
                
                const currentLine = lines[lineIndex];
                const lineElement = createMessageBox(lineIndex);
                
                let charIndex = 0;
                
                // Type the current line character by character
                function typeChar() {
                    if (charIndex < currentLine.length) {
                        lineElement.textContent += currentLine.charAt(charIndex);
                        charIndex++;
                        setTimeout(typeChar, typingSpeed);
                    } else {
                        // Line fully typed - move to next
                        console.log(`Line ${lineIndex + 1} complete: "${currentLine}"`);
                        setTimeout(() => {
                            typeNextLine(lineIndex + 1);
                        }, linePauseTime);
                    }
                }
                
                typeChar();
            }
            
            // Start with the first line
            typeNextLine(0);
        }, 1000);
        
    } else {
        console.error('Could not find chat container!');
    }
});
