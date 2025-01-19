// Initialize DOM elements
const backgroundTypeSelect = document.getElementById('background-type');
const backgroundColorInput = document.getElementById('background-color');
const primaryColorInput = document.getElementById('primary-color');
const secondaryColorInput = document.getElementById('secondary-color');
const gradientTypeSelect = document.getElementById('gradient-type');
const gradientAngleInput = document.getElementById('gradient-angle');
const textShadowSizeInput = document.getElementById('text-shadow-size');
const textShadowColorInput = document.getElementById('text-shadow-color');
const textColorInput = document.getElementById('text-color');
const borderStyleSelect = document.getElementById('border-style');
const borderSizeInput = document.getElementById('border-size');
const borderColorInput = document.getElementById('border-color');
const textEffectSelect = document.getElementById('text-effect');
const neonColorInput = document.getElementById('neon-color');
const fontFamilySelect = document.getElementById('font-family');
const fontSizeInput = document.getElementById('font-size');
const timeFormatSelect = document.getElementById('time-format');
const showSecondsSelect = document.getElementById('show-seconds');
const clockShapeSelect = document.getElementById('clock-shape');
const clockContainer = document.querySelector('.style-1');
const clockElement = document.getElementById('clock');
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const gradientSection = document.getElementById('gradient-section');
const angleValue = document.getElementById('angle-value');
const sizeValue = document.getElementById('size-value');
const neonColorControl = document.getElementById('neon-color-control');
const borderSizeValue = document.getElementById('border-size-value');
const textShadowSizeValue = document.getElementById('text-shadow-size-value');

// Initialize embed-related elements
const showEmbedButton = document.getElementById('show-embed-code');
const embedPreview = document.getElementById('embed-preview');
const embedCode = document.getElementById('embed-code');
const copyButton = document.getElementById('copy-embed-code');
const copyFeedback = document.getElementById('copy-feedback');
const generateEmbedLinkButton = document.getElementById('generate-embed-link');
const embedLinkPreview = document.getElementById('embed-link-preview');
const embedLinkInput = document.getElementById('embed-link');
const copyEmbedLinkButton = document.getElementById('copy-embed-link');
const linkCopyFeedback = document.getElementById('link-copy-feedback');

// Debug log for embed-related elements
console.log('Embed-related elements initialization:', {
    showEmbedButton: !!showEmbedButton,
    embedPreview: !!embedPreview,
    embedCode: !!embedCode,
    copyButton: !!copyButton,
    copyFeedback: !!copyFeedback,
    generateEmbedLinkButton: !!generateEmbedLinkButton,
    embedLinkPreview: !!embedLinkPreview,
    embedLinkInput: !!embedLinkInput,
    copyEmbedLinkButton: !!copyEmbedLinkButton,
    linkCopyFeedback: !!linkCopyFeedback
});

document.addEventListener('DOMContentLoaded', () => {
    // Debug log for embed-related elements after DOM is loaded
    console.log('Embed-related elements after DOM load:', {
        showEmbedButton: !!showEmbedButton,
        embedPreview: !!embedPreview,
        embedCode: !!embedCode,
        copyButton: !!copyButton,
        copyFeedback: !!copyFeedback,
        generateEmbedLinkButton: !!generateEmbedLinkButton,
        embedLinkPreview: !!embedLinkPreview,
        embedLinkInput: !!embedLinkInput,
        copyEmbedLinkButton: !!copyEmbedLinkButton,
        linkCopyFeedback: !!linkCopyFeedback
    });

    // Check if page is embedded with #embed hash
    const isEmbedded = window.location.hash === '#embed';
    if (isEmbedded) {
        document.body.classList.add('embedded');
        // Only hide customization panel if we're in an iframe
        const customizationPanel = document.querySelector('.customization-panel');
        if (customizationPanel && window.self !== window.top) {
            customizationPanel.style.display = 'none';
        }
    }

    // Initialize controls with default values
    backgroundTypeSelect.value = "single";
    backgroundColorInput.value = "#fad029";
    primaryColorInput.value = "#fad029";
    secondaryColorInput.value = "#ff6b6b";
    gradientTypeSelect.value = "linear";
    gradientAngleInput.value = "45";
    // Show gradient section if gradient is selected
    gradientSection.style.display = backgroundTypeSelect.value === 'gradient' ? 'block' : 'none';
    textShadowSizeInput.value = "0";
    textShadowColorInput.value = "#000000";
    textColorInput.value = "#ffffff";
    borderStyleSelect.value = "none";
    borderSizeInput.value = "3";
    borderColorInput.value = "#ff6b6b";
    textEffectSelect.value = "none";
    neonColorInput.value = "#00ff00";
    neonColorControl.style.display = 'none';

    // Get the clock container once and store it
    if (!clockContainer) {
        console.error('Clock container not found during initialization!');
        return;
    }

    // Update clock display
    function updateClock() {
        const now = new Date();
        
        // Update time based on format
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        let timeString;

        if (timeFormatSelect.value === '12') {
            const period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            timeString = `${hours}:${minutes}${showSecondsSelect.value === 'true' ? ':' + seconds : ''} ${period}`;
        } else {
            hours = String(hours).padStart(2, '0');
            timeString = `${hours}:${minutes}${showSecondsSelect.value === 'true' ? ':' + seconds : ''}`;
        }
        
        timeElement.textContent = timeString;
        
        // Update date
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = now.toLocaleDateString(undefined, options);
    }

    // Update clock every second
    updateClock();
    setInterval(updateClock, 1000);

    // Update angle value display
    gradientAngleInput.addEventListener('input', () => {
        angleValue.textContent = `${gradientAngleInput.value}°`;
        updateClockStyle();
    });

    // Update font size value display
    fontSizeInput.addEventListener('input', () => {
        sizeValue.textContent = `${fontSizeInput.value}px`;
        updateClockStyle();
    });

    // Add individual event listeners for the controls
    textShadowSizeInput.addEventListener('input', (e) => {
        console.log('Text shadow size changed:', e.target.value);
        textShadowSizeValue.textContent = `${e.target.value}px`;
        updateClockStyle();
    });

    textShadowColorInput.addEventListener('input', (e) => {
        console.log('Text shadow color changed:', e.target.value);
        updateClockStyle();
    });

    textColorInput.addEventListener('input', (e) => {
        console.log('Text color changed:', e.target.value);
        updateClockStyle();
    });

    borderStyleSelect.addEventListener('change', (e) => {
        console.log('Border style changed:', e.target.value);
        updateClockStyle();
    });

    borderSizeInput.addEventListener('input', (e) => {
        console.log('Border size changed:', e.target.value);
        borderSizeValue.textContent = `${e.target.value}px`;
        updateClockStyle();
    });

    borderColorInput.addEventListener('input', () => {
        console.log('Border color changed:', borderColorInput.value);
        updateClockStyle();
    });

    // Add background type change handler
    backgroundTypeSelect.addEventListener('change', (e) => {
        console.log('Background type changed:', e.target.value);
        const isGradient = e.target.value === 'gradient';
        gradientSection.style.display = isGradient ? 'block' : 'none';
        
        if (isGradient) {
            clockContainer.style.removeProperty('background-color');
        } else {
            clockContainer.style.removeProperty('background');
            clockContainer.style.removeProperty('background-image');
            clockContainer.style.backgroundColor = backgroundColorInput.value;
        }
        updateClockStyle();
        
        // Save the current settings
        saveSettings();
    });

    backgroundColorInput.addEventListener('input', () => {
        console.log('Background color changed:', backgroundColorInput.value);
        updateClockStyle();
    });

    // Add gradient control event listeners
    primaryColorInput.addEventListener('input', () => {
        console.log('Primary color changed:', primaryColorInput.value);
        updateClockStyle();
    });

    secondaryColorInput.addEventListener('input', () => {
        console.log('Secondary color changed:', secondaryColorInput.value);
        updateClockStyle();
    });

    gradientTypeSelect.addEventListener('change', () => {
        console.log('Gradient type changed:', gradientTypeSelect.value);
        updateClockStyle();
    });

    // Add font family change handler
    fontFamilySelect.addEventListener('change', () => {
        console.log('Font family changed:', fontFamilySelect.value);
        updateClockStyle();
    });

    // Add text effect change handler
    textEffectSelect.addEventListener('change', (e) => {
        const effect = e.target.value;
        // Remove any existing effect
        clockElement.removeAttribute('data-effect');
        // Clear any existing text shadows and colors
        timeElement.style.removeProperty('text-shadow');
        dateElement.style.removeProperty('text-shadow');
        timeElement.style.removeProperty('color');
        dateElement.style.removeProperty('color');
        timeElement.style.removeProperty('-webkit-text-fill-color');
        dateElement.style.removeProperty('-webkit-background-clip');
        
        // Remove any existing sparkle particles
        cleanupSparkleEffect();
        
        if (effect !== 'none') {
            clockElement.setAttribute('data-effect', effect);
            
            // Show/hide neon color control
            neonColorControl.style.display = effect === 'neon' ? 'flex' : 'none';
            
            if (effect === 'neon') {
                const neonGlow = `0 0 5px ${neonColorInput.value}, 0 0 10px ${neonColorInput.value}, 0 0 20px ${neonColorInput.value}, 0 0 30px ${neonColorInput.value}`;
                timeElement.style.textShadow = neonGlow;
                timeElement.style.color = neonColorInput.value;
                // Keep date normal
                dateElement.style.color = textColorInput.value;
                dateElement.style.textShadow = 'none';
            } else if (effect === 'sparkle') {
                // Create sparkle particles
                createSparkleParticles();
            } else if (effect === 'rainbow') {
                timeElement.style.setProperty('-webkit-background-clip', 'text');
                dateElement.style.setProperty('-webkit-background-clip', 'text');
                timeElement.style.setProperty('-webkit-text-fill-color', 'transparent');
                dateElement.style.setProperty('-webkit-text-fill-color', 'transparent');
            }
        }
        updateClockStyle();
    });

    // Clean up sparkle interval when changing effects
    function cleanupSparkleEffect() {
        if (window.sparkleInterval) {
            clearInterval(window.sparkleInterval);
            window.sparkleInterval = null;
        }
        const particles = clockElement.querySelectorAll('.sparkle-particle');
        particles.forEach(particle => particle.remove());
    }

    neonColorInput.addEventListener('input', () => {
        if (textEffectSelect.value === 'neon') {
            const neonGlow = `0 0 5px ${neonColorInput.value}, 0 0 10px ${neonColorInput.value}, 0 0 20px ${neonColorInput.value}, 0 0 30px ${neonColorInput.value}`;
            timeElement.style.textShadow = neonGlow;
            timeElement.style.color = neonColorInput.value;
            // Keep date normal
            dateElement.style.color = textColorInput.value;
            dateElement.style.textShadow = 'none';
        }
        updateClockStyle();
    });

    function updateClockStyle() {
        // Check if required elements exist
        if (!clockContainer || !clockElement || !timeElement || !dateElement) {
            console.error('Required clock elements not found!');
            return;
        }

        // Get values with fallbacks
        const backgroundType = backgroundTypeSelect?.value || 'single';
        const backgroundColor = backgroundColorInput?.value || '#fad029';
        const primaryColor = primaryColorInput?.value || '#fad029';
        const secondaryColor = secondaryColorInput?.value || '#ff6b6b';
        const gradientType = gradientTypeSelect?.value || 'linear';
        const gradientAngle = gradientAngleInput?.value || '45';
        const textShadowSize = parseInt(textShadowSizeInput?.value || '0');
        const textShadowColor = textShadowColorInput?.value || '#000000';
        const textColor = textColorInput?.value || '#ffffff';
        const borderStyle = borderStyleSelect?.value || 'none';
        const borderSize = parseInt(borderSizeInput?.value || '3');
        const borderColor = borderColorInput?.value || '#ff6b6b';
        const textEffect = textEffectSelect?.value || 'none';
        const neonColor = neonColorInput?.value || '#00ff00';
        const selectedFont = fontFamilySelect?.value || 'IBM Plex Sans';
        const fontSize = parseInt(fontSizeInput?.value || '20');

        if (!clockContainer) {
            console.error('Clock container not found!');
            return;
        }

        // Always apply base text color first
        timeElement.style.setProperty('color', textColor, 'important');
        dateElement.style.setProperty('color', textColor, 'important');
        clockElement.style.setProperty('color', textColor, 'important');

        // Clear any existing effect styles
        timeElement.style.removeProperty('-webkit-text-fill-color');
        dateElement.style.removeProperty('-webkit-text-fill-color');
        timeElement.style.removeProperty('-webkit-background-clip');
        dateElement.style.removeProperty('-webkit-background-clip');
        timeElement.style.removeProperty('background');
        dateElement.style.removeProperty('background');

        // Apply background based on type
        if (backgroundType === 'single') {
            clockContainer.style.setProperty('background', backgroundColor, 'important');
            clockContainer.style.setProperty('background-color', backgroundColor, 'important');
        } else if (backgroundType === 'gradient') {
            let gradient;
            switch (gradientType) {
                case 'linear':
                    gradient = `linear-gradient(${gradientAngle}deg, ${primaryColor}, ${secondaryColor})`;
                    break;
                case 'radial':
                    gradient = `radial-gradient(circle at center, ${primaryColor}, ${secondaryColor})`;
                    break;
                case 'conic':
                    gradient = `conic-gradient(from ${gradientAngle}deg at center, ${primaryColor}, ${secondaryColor}, ${primaryColor})`;
                    break;
                default:
                    gradient = `linear-gradient(${gradientAngle}deg, ${primaryColor}, ${secondaryColor})`;
            }
            clockContainer.style.setProperty('background', gradient, 'important');
            clockContainer.style.setProperty('background-image', gradient, 'important');
        }

        // Apply text shadow
        if (textShadowSize > 0) {
            const textShadowOpacity = Math.min(0.9, textShadowSize / 10);
            const blurRadius = Math.max(2, textShadowSize);
            const shadowColor = textShadowColor.replace('#', '');
            const r = parseInt(shadowColor.substr(0, 2), 16);
            const g = parseInt(shadowColor.substr(2, 2), 16);
            const b = parseInt(shadowColor.substr(4, 2), 16);
            const textShadowStyle = `0 ${textShadowSize/4}px ${blurRadius}px rgba(${r}, ${g}, ${b}, ${textShadowOpacity})`;
            timeElement.style.setProperty('text-shadow', textShadowStyle, 'important');
            dateElement.style.setProperty('text-shadow', textShadowStyle, 'important');
        } else {
            timeElement.style.setProperty('text-shadow', 'none', 'important');
            dateElement.style.setProperty('text-shadow', 'none', 'important');
        }

        // Apply font styles
        clockElement.style.setProperty('font-family', selectedFont, 'important');
        timeElement.style.setProperty('font-family', selectedFont, 'important');
        dateElement.style.setProperty('font-family', selectedFont, 'important');

        // Apply font sizes
        const maxFontSize = 48;
        const constrainedFontSize = Math.min(fontSize, maxFontSize);
        fontSizeInput.value = constrainedFontSize;
        timeElement.style.setProperty('font-size', `${constrainedFontSize * 2}px`, 'important');
        dateElement.style.setProperty('font-size', `${constrainedFontSize * 0.8}px`, 'important');

        // Apply border
        if (borderStyle !== 'none') {
            const borderValue = `${borderSize}px ${borderStyle} ${borderColor}`;
            clockContainer.style.setProperty('border', borderValue, 'important');
        } else {
            clockContainer.style.setProperty('border', 'none', 'important');
        }

        // Apply text effects last
        if (textEffect !== 'none') {
            if (textEffect === 'neon') {
                const neonGlow = `0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 20px ${neonColor}, 0 0 30px ${neonColor}`;
                timeElement.style.setProperty('text-shadow', neonGlow, 'important');
                timeElement.style.setProperty('color', neonColor, 'important');
            } else if (textEffect === 'rainbow') {
                const rainbowGradient = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';
                timeElement.style.setProperty('background', rainbowGradient, 'important');
                dateElement.style.setProperty('background', rainbowGradient, 'important');
                timeElement.style.setProperty('-webkit-background-clip', 'text', 'important');
                dateElement.style.setProperty('-webkit-background-clip', 'text', 'important');
                timeElement.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
                dateElement.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
            }
            // For sparkle effect, keep the text color as is
        }

        // Store settings
        const settings = {
            backgroundType,
            backgroundColor,
            primaryColor,
            secondaryColor,
            gradientType,
            gradientAngle,
            fontFamily: selectedFont,
            fontSize: constrainedFontSize,
            textColor,
            timeFormat: timeFormatSelect.value,
            showSeconds: showSecondsSelect.value,
            clockShape: clockShapeSelect.value,
            textShadowSize,
            textShadowColor,
            borderStyle,
            borderSize,
            borderColor,
            textEffect,
            neonColor
        };
        localStorage.setItem('clockSettings', JSON.stringify(settings));
    }

    // Function to save current settings to localStorage
    function saveSettings() {
        const settings = getAllSettings();
        localStorage.setItem('clockSettings', JSON.stringify(settings));
    }

    // Generate embed code based on current settings
    function generateEmbedCode() {
        const settings = JSON.parse(localStorage.getItem('clockSettings'));
        const params = new URLSearchParams({
            backgroundType: settings.backgroundType,
            backgroundColor: settings.backgroundColor,
            primaryColor: settings.primaryColor,
            secondaryColor: settings.secondaryColor,
            gradientType: settings.gradientType,
            gradientAngle: settings.gradientAngle,
            fontFamily: settings.fontFamily,
            fontSize: settings.fontSize,
            textColor: settings.textColor,
            timeFormat: settings.timeFormat,
            showSeconds: settings.showSeconds,
            clockShape: settings.clockShape,
            textShadowSize: settings.textShadowSize,
            textShadowColor: settings.textShadowColor,
            borderStyle: settings.borderStyle,
            borderSize: settings.borderSize,
            borderColor: settings.borderColor,
            textEffect: settings.textEffect,
            neonColor: settings.neonColor
        });
        
        // Get the current site's URL
        const currentUrl = new URL(window.location.href);
        // Get the base URL without any parameters or hash
        const baseUrl = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname.split('?')[0].split('#')[0]}`;
        // Construct the embed URL
        const embedUrl = `${baseUrl}?${params.toString()}#embed`;
        
        // Create embed code with responsive iframe
        const embedHTML = `<div style="position: relative; width: 100%; height: 0; padding-bottom: 50%; overflow: hidden; border-radius: 8px;">
    <iframe 
        src="${embedUrl}"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
        allow="autoplay"
    ></iframe>
</div>`;

        return embedHTML;
    }

    // Show/hide embed code
    if (showEmbedButton && embedPreview && embedCode) {
        showEmbedButton.addEventListener('click', () => {
            const isHidden = embedPreview.classList.contains('hidden');
            
            if (isHidden) {
                // First show the preview container
                embedPreview.classList.remove('hidden');
                if (embedLinkPreview) {
                    embedLinkPreview.classList.add('hidden');
                }
                
                // Generate the code
                const code = generateEmbedCode();
                
                // Update the code element
                embedCode.dataset.type = 'full';
                embedCode.textContent = code.trim();
                if (window.hljs) {
                    hljs.highlightElement(embedCode);
                }
                
                showEmbedButton.textContent = 'Hide Embed Code';
            } else {
                embedPreview.classList.add('hidden');
                showEmbedButton.textContent = 'Show Embed Code';
            }
        });
    }

    // Copy embed code
    if (copyButton && embedCode && copyFeedback) {
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(embedCode.textContent);
                copyFeedback.classList.remove('hidden');
                setTimeout(() => {
                    copyFeedback.classList.add('hidden');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy embed code:', err);
                // Fallback for browsers that don't support clipboard API
                const textArea = document.createElement('textarea');
                textArea.value = embedCode.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                copyFeedback.classList.remove('hidden');
                setTimeout(() => {
                    copyFeedback.classList.add('hidden');
                }, 2000);
            }
        });
    }

    // Load saved settings
    function loadSavedSettings() {
        const savedSettings = localStorage.getItem('clockSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            if (backgroundTypeSelect) backgroundTypeSelect.value = settings.backgroundType || 'single';
            if (backgroundColorInput) backgroundColorInput.value = settings.backgroundColor || '#fad029';
            if (gradientSection) gradientSection.style.display = settings.backgroundType === 'gradient' ? 'block' : 'none';
            if (primaryColorInput) primaryColorInput.value = settings.primaryColor || '#fad029';
            if (secondaryColorInput) secondaryColorInput.value = settings.secondaryColor || '#ff6b6b';
            if (gradientTypeSelect) gradientTypeSelect.value = settings.gradientType || 'linear';
            if (gradientAngleInput) gradientAngleInput.value = settings.gradientAngle || '45';
            if (angleValue) angleValue.textContent = `${settings.gradientAngle || '45'}°`;
            if (fontFamilySelect) fontFamilySelect.value = settings.fontFamily || 'IBM Plex Sans';
            if (fontSizeInput) fontSizeInput.value = settings.fontSize || '20';
            if (sizeValue) sizeValue.textContent = `${settings.fontSize || '20'}px`;
            if (textColorInput) textColorInput.value = settings.textColor || '#ffffff';
            if (timeFormatSelect) timeFormatSelect.value = settings.timeFormat || '24';
            if (showSecondsSelect) showSecondsSelect.value = settings.showSeconds || 'true';
            if (clockShapeSelect) clockShapeSelect.value = settings.clockShape || 'rectangle';
            if (textShadowSizeInput) textShadowSizeInput.value = settings.textShadowSize || '0';
            if (textShadowColorInput) textShadowColorInput.value = settings.textShadowColor || '#000000';
            if (borderStyleSelect) borderStyleSelect.value = settings.borderStyle || 'none';
            if (borderSizeInput) borderSizeInput.value = settings.borderSize || '3';
            if (borderSizeValue) borderSizeValue.textContent = `${settings.borderSize || '3'}px`;
            if (borderColorInput) borderColorInput.value = settings.borderColor || '#ff6b6b';
            if (textEffectSelect) textEffectSelect.value = settings.textEffect || 'none';
            if (neonColorInput) neonColorInput.value = settings.neonColor || '#00ff00';
            if (neonColorControl) neonColorControl.style.display = settings.textEffect === 'neon' ? 'flex' : 'none';
            updateClockStyle();
        }
    }

    // Load saved settings on page load
    loadSavedSettings();

    // Check if we're in embed mode
    if (window.location.hash === '#embed' || new URLSearchParams(window.location.search).get('embed') === 'true') {
        const params = new URLSearchParams(window.location.search);
        const settings = {
            backgroundType: params.get('backgroundType') || 'single',
            backgroundColor: params.get('backgroundColor') || '#fad029',
            primaryColor: params.get('primaryColor') || '#fad029',
            secondaryColor: params.get('secondaryColor') || '#ff6b6b',
            gradientType: params.get('gradientType') || 'linear',
            gradientAngle: params.get('gradientAngle') || '45',
            fontFamily: params.get('fontFamily') || 'IBM Plex Sans',
            fontSize: params.get('fontSize') || '20',
            textColor: params.get('textColor') || '#ffffff',
            timeFormat: params.get('timeFormat') || '24',
            showSeconds: params.get('showSeconds') || 'true',
            clockShape: params.get('clockShape') || 'rectangle',
            textShadowSize: params.get('textShadowSize') || '0',
            textShadowColor: params.get('textShadowColor') || '#000000',
            borderStyle: params.get('borderStyle') || 'none',
            borderSize: params.get('borderSize') || '3',
            borderColor: params.get('borderColor') || '#ff6b6b',
            textEffect: params.get('textEffect') || 'none',
            neonColor: params.get('neonColor') || '#00ff00'
        };
        localStorage.setItem('clockSettings', JSON.stringify(settings));
        
        // Apply settings to form controls
        backgroundTypeSelect.value = settings.backgroundType;
        backgroundColorInput.value = settings.backgroundColor;
        primaryColorInput.value = settings.primaryColor;
        secondaryColorInput.value = settings.secondaryColor;
        gradientTypeSelect.value = settings.gradientType;
        gradientAngleInput.value = settings.gradientAngle;
        fontFamilySelect.value = settings.fontFamily;
        fontSizeInput.value = settings.fontSize;
        textColorInput.value = settings.textColor;
        timeFormatSelect.value = settings.timeFormat;
        showSecondsSelect.value = settings.showSeconds;
        clockShapeSelect.value = settings.clockShape;
        textShadowSizeInput.value = settings.textShadowSize;
        textShadowColorInput.value = settings.textShadowColor;
        borderStyleSelect.value = settings.borderStyle;
        borderSizeInput.value = settings.borderSize;
        borderColorInput.value = settings.borderColor;
        textEffectSelect.value = settings.textEffect;
        neonColorInput.value = settings.neonColor;
        
        // Update display values
        angleValue.textContent = `${settings.gradientAngle}°`;
        sizeValue.textContent = `${settings.fontSize}px`;
        textShadowSizeValue.textContent = `${settings.textShadowSize}px`;
        borderSizeValue.textContent = `${settings.borderSize}px`;
        
        // Show/hide gradient section based on background type
        gradientSection.style.display = settings.backgroundType === 'gradient' ? 'block' : 'none';
        
        // Show/hide neon color control based on text effect
        neonColorControl.style.display = settings.textEffect === 'neon' ? 'flex' : 'none';
        
        // Apply all styles
        updateClockStyle();
        
        // Hide customization panel and adjust clock container for embed mode
        const customizationPanel = document.querySelector('.customization-panel');
        if (customizationPanel) {
            customizationPanel.style.display = 'none';
        }

        // Adjust main container styles
        const style0 = document.querySelector('.style-0');
        if (style0) {
            style0.style.cssText = `
                padding: 0 !important;
                margin: 0 !important;
                height: 100vh !important;
                width: 100% !important;
                overflow: hidden !important;
                background: transparent !important;
            `;
        }

        // Adjust clock container styles
        const style1 = document.querySelector('.style-1');
        if (style1) {
            style1.style.cssText = `
                margin: 0 !important;
                padding: 0 !important;
                height: 100% !important;
                width: 100% !important;
                overflow: hidden !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                border-radius: 0 !important;
            `;
        }

        // Hide footer image
        const footerImage = document.querySelector('.footer-image');
        if (footerImage) {
            footerImage.style.display = 'none';
        }
        
        // Make clock container responsive with better centering
        const clockContainer = document.querySelector('.clock');
        if (clockContainer) {
            clockContainer.style.cssText = `
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                gap: 5px !important;
                padding: 20px !important;
                margin: 0 !important;
                overflow: hidden !important;
                background: transparent !important;
            `;

            // Apply responsive font sizes
            const timeElement = clockContainer.querySelector('.time');
            const dateElement = clockContainer.querySelector('.date');
            if (timeElement && dateElement) {
                const baseFontSize = parseInt(settings.fontSize) || 20;
                const containerWidth = clockContainer.clientWidth;
                const containerHeight = clockContainer.clientHeight;
                const minDimension = Math.min(containerWidth, containerHeight);
                const initialScale = minDimension / 400;

                timeElement.style.cssText = `
                    font-size: ${baseFontSize * 2 * initialScale}px !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    line-height: 1 !important;
                    color: ${settings.textColor} !important;
                `;
                dateElement.style.cssText = `
                    font-size: ${baseFontSize * 0.6 * initialScale}px !important;
                    text-align: center !important;
                    width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    line-height: 1 !important;
                    color: ${settings.textColor} !important;
                `;
            }
        }

        // Create sparkle effect if needed
        if (settings.textEffect === 'sparkle') {
            createSparkleParticles();
        }

        // Add resize handler for responsive sizing
        window.addEventListener('resize', () => {
            if (clockContainer) {
                const timeElement = clockContainer.querySelector('.time');
                const dateElement = clockContainer.querySelector('.date');
                if (timeElement && dateElement) {
                    const baseFontSize = parseInt(settings.fontSize) || 20;
                    const containerWidth = clockContainer.clientWidth;
                    const containerHeight = clockContainer.clientHeight;
                    const minDimension = Math.min(containerWidth, containerHeight);
                    const scale = minDimension / 400;

                    timeElement.style.fontSize = `${baseFontSize * 2 * scale}px`;
                    dateElement.style.fontSize = `${baseFontSize * 0.6 * scale}px`;
                }
            }
        });
    }

    // Initialize default settings if they don't exist
    if (!localStorage.getItem('clockSettings')) {
        const defaultSettings = {
            primaryColor: primaryColorInput.value,
            secondaryColor: secondaryColorInput.value,
            gradientType: gradientTypeSelect.value,
            gradientAngle: gradientAngleInput.value,
            fontFamily: fontFamilySelect.value,
            fontSize: fontSizeInput.value,
            timeFormat: timeFormatSelect.value,
            showSeconds: showSecondsSelect.value
        };
        localStorage.setItem('clockSettings', JSON.stringify(defaultSettings));
    }

    // Function to create sparkle particles
    function createSparkleParticles() {
        // Clear any existing interval
        if (window.sparkleInterval) {
            clearInterval(window.sparkleInterval);
        }

        // Create new particles periodically
        window.sparkleInterval = setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'sparkle-particle';
            
            // Get the clock container dimensions
            const clockRect = clockContainer.getBoundingClientRect();
            
            // Position sparkle within the clock container bounds
            const padding = 10; // Smaller padding to keep particles more contained
            const x = padding + Math.random() * (clockRect.width - padding * 2);
            const y = padding + Math.random() * (clockRect.height - padding * 2);
            
            // Random colors with more variety and brightness
            const colors = [
                '#FFE169', // Bright Gold
                '#FF69B4', // Hot Pink
                '#7DF9FF', // Electric Blue
                '#FF4D4D', // Bright Red
                '#39FF14', // Neon Green
                '#FF1493', // Deep Pink
                '#00FFFF', // Cyan
                '#FF8C00', // Dark Orange
                '#E066FF', // Medium Orchid
                '#F0FFFF'  // Azure
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Random size variation (tiny)
            const size = 4 + Math.random() * 4; // 4px to 8px
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.color = color;
            particle.style.fontSize = `${size}px`;
            particle.style.textShadow = `0 0 3px ${color}, 0 0 6px ${color}`;
            
            clockContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 2000); // Match the longer animation duration
        }, 200); // Create particles even less frequently
    }

    // Function to get all current settings as URL parameters
    function getAllSettings() {
        return {
            backgroundType: backgroundTypeSelect?.value || 'single',
            backgroundColor: backgroundColorInput?.value || '#fad029',
            primaryColor: primaryColorInput?.value || '#fad029',
            secondaryColor: secondaryColorInput?.value || '#ff6b6b',
            gradientType: gradientTypeSelect?.value || 'linear',
            gradientAngle: gradientAngleInput?.value || '45',
            fontFamily: fontFamilySelect?.value || 'IBM Plex Sans',
            fontSize: fontSizeInput?.value || '20',
            textColor: textColorInput?.value || '#ffffff',
            textShadowSize: textShadowSizeInput?.value || '0',
            textShadowColor: textShadowColorInput?.value || '#000000',
            timeFormat: timeFormatSelect?.value || '24',
            showSeconds: showSecondsSelect?.value || 'true',
            borderStyle: borderStyleSelect?.value || 'none',
            borderSize: borderSizeInput?.value || '3',
            borderColor: borderColorInput?.value || '#ff6b6b',
            textEffect: textEffectSelect?.value || 'none',
            neonColor: neonColorInput?.value || '#00ff00',
            clockShape: clockShapeSelect?.value || 'rectangle'
        };
    }

    // Add event listener for generate embed link button
    if (generateEmbedLinkButton && embedLinkPreview && embedLinkInput && embedPreview && showEmbedButton) {
        console.log('Adding click listener to generate embed link button');
        generateEmbedLinkButton.addEventListener('click', () => {
            console.log('Generate embed link button clicked');
            
            // Toggle embed link preview visibility
            const isHidden = embedLinkPreview.classList.contains('hidden');
            console.log('Preview is hidden:', isHidden);
            
            if (!isHidden) {
                embedLinkPreview.classList.add('hidden');
                generateEmbedLinkButton.textContent = 'Generate Embed Link';
                return;
            }

            // Hide embed code preview if it's visible
            embedPreview.classList.add('hidden');
            showEmbedButton.textContent = 'Show Embed Code';
            
            // Get current settings and create a URL with them
            const settings = getAllSettings();
            const currentUrl = new URL(window.location.href);
            
            // Add all settings to URL parameters with correct parameter names
            const searchParams = new URLSearchParams();
            searchParams.append('shape', settings.clockShape || 'rectangle');
            searchParams.append('bgType', settings.backgroundType);
            searchParams.append('bgColor', settings.backgroundColor.replace('#', ''));
            searchParams.append('primaryColor', settings.primaryColor.replace('#', ''));
            searchParams.append('secondaryColor', settings.secondaryColor.replace('#', ''));
            searchParams.append('gradientType', settings.gradientType);
            searchParams.append('gradientAngle', settings.gradientAngle);
            searchParams.append('fontFamily', encodeURIComponent(settings.fontFamily));
            searchParams.append('fontSize', settings.fontSize);
            searchParams.append('textColor', settings.textColor.replace('#', ''));
            searchParams.append('textShadowSize', settings.textShadowSize);
            searchParams.append('textShadowColor', settings.textShadowColor.replace('#', ''));
            searchParams.append('timeFormat', settings.timeFormat);
            searchParams.append('showSeconds', settings.showSeconds);
            searchParams.append('borderStyle', settings.borderStyle);
            searchParams.append('borderSize', settings.borderSize);
            searchParams.append('borderColor', settings.borderColor.replace('#', ''));
            searchParams.append('textEffect', settings.textEffect);
            searchParams.append('neonColor', settings.neonColor.replace('#', ''));
            searchParams.append('embed', 'true');
            
            // Get the base URL without any parameters or hash
            const baseUrl = `${currentUrl.protocol}//${currentUrl.host}${currentUrl.pathname.split('?')[0].split('#')[0]}`;
            // Construct the embed URL
            const embedUrl = `${baseUrl}?${searchParams.toString()}#embed`;
            
            console.log('Generated URL:', embedUrl);
            
            // Show the embed link preview and set the link
            embedLinkPreview.classList.remove('hidden');
            embedLinkInput.value = embedUrl;
            generateEmbedLinkButton.textContent = 'Hide Embed Link';
        });
    } else {
        console.error('Missing elements:', {
            generateEmbedLinkButton: !!generateEmbedLinkButton,
            embedLinkPreview: !!embedLinkPreview,
            embedLinkInput: !!embedLinkInput,
            embedPreview: !!embedPreview,
            showEmbedButton: !!showEmbedButton
        });
    }

    // Add event listener for copy embed link button
    if (copyEmbedLinkButton && embedLinkInput && linkCopyFeedback) {
        copyEmbedLinkButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(embedLinkInput.value);
                linkCopyFeedback.classList.remove('hidden');
                setTimeout(() => {
                    linkCopyFeedback.classList.add('hidden');
                }, 2000);
            } catch (err) {
                // Fallback for browsers that don't support clipboard API
                embedLinkInput.select();
                document.execCommand('copy');
                linkCopyFeedback.classList.remove('hidden');
                setTimeout(() => {
                    linkCopyFeedback.classList.add('hidden');
                }, 2000);
            }
        });
    }

    // Load settings from URL parameters if they exist
    function loadSettingsFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.has('shape')) clockShapeSelect.value = urlParams.get('shape');
        if (urlParams.has('bgType')) backgroundTypeSelect.value = urlParams.get('bgType');
        if (urlParams.has('bgColor')) backgroundColorInput.value = '#' + urlParams.get('bgColor');
        if (urlParams.has('primaryColor')) primaryColorInput.value = '#' + urlParams.get('primaryColor');
        if (urlParams.has('secondaryColor')) secondaryColorInput.value = '#' + urlParams.get('secondaryColor');
        if (urlParams.has('gradientType')) gradientTypeSelect.value = urlParams.get('gradientType');
        if (urlParams.has('gradientAngle')) gradientAngleInput.value = urlParams.get('gradientAngle');
        if (urlParams.has('fontFamily')) fontFamilySelect.value = decodeURIComponent(urlParams.get('fontFamily'));
        if (urlParams.has('fontSize')) fontSizeInput.value = urlParams.get('fontSize');
        if (urlParams.has('textColor')) textColorInput.value = '#' + urlParams.get('textColor');
        if (urlParams.has('textShadowSize')) textShadowSizeInput.value = urlParams.get('textShadowSize');
        if (urlParams.has('textShadowColor')) textShadowColorInput.value = '#' + urlParams.get('textShadowColor');
        if (urlParams.has('timeFormat')) timeFormatSelect.value = urlParams.get('timeFormat');
        if (urlParams.has('showSeconds')) showSecondsSelect.value = urlParams.get('showSeconds');
        if (urlParams.has('borderStyle')) borderStyleSelect.value = urlParams.get('borderStyle');
        if (urlParams.has('borderSize')) borderSizeInput.value = urlParams.get('borderSize');
        if (urlParams.has('borderColor')) borderColorInput.value = '#' + urlParams.get('borderColor');
        if (urlParams.has('textEffect')) textEffectSelect.value = urlParams.get('textEffect');
        if (urlParams.has('neonColor')) neonColorInput.value = '#' + urlParams.get('neonColor');

        // Update all displays
        updateClockStyle();
        
        // Trigger change event on background type to show/hide gradient section
        backgroundTypeSelect.dispatchEvent(new Event('change'));
        
        // Update text effect
        textEffectSelect.dispatchEvent(new Event('change'));
    }

    // Load settings from URL if they exist
    loadSettingsFromUrl();
}); 