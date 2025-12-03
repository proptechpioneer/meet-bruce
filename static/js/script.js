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
                "Landlords have smart software to squeeze every penny from your rent.",
                "You? You've had nothing… until now.",
                "I'm Bruce – the world's first AI Tenant Advocate that fights for YOU.",
                "Starting May 2026, the new Renters' Rights Act hands you the power.",
                "I can help you use them.",
                "Lower your rent",
                "Force repairs",
                "Beat rogue landlords",
                "Save thousands – and finally get on the housing ladder.",
                "Stop paying their profits.",
                "Start building your future."
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
