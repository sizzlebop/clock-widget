document.addEventListener('DOMContentLoaded', () => {
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

    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
    const backgroundTypeSelect = document.getElementById('background-type');
    const backgroundColorInput = document.getElementById('background-color');
    const gradientSection = document.getElementById('gradient-section');
    const gradientTypeSelect = document.getElementById('gradient-type');
    const gradientAngleInput = document.getElementById('gradient-angle');
    const angleValue = document.getElementById('angle-value');
    const fontFamilySelect = document.getElementById('font-family');
    const fontSizeInput = document.getElementById('font-size');
    const sizeValue = document.getElementById('size-value');
    const timeFormatSelect = document.getElementById('time-format');
    const showSecondsSelect = document.getElementById('show-seconds');
    const clockElement = document.getElementById('clock');
    const timeElement = clockElement.querySelector('.time');
    const dateElement = clockElement.querySelector('.date');
    const showEmbedButton = document.getElementById('show-embed-code');
    const embedPreview = document.getElementById('embed-preview');
    const embedCode = document.getElementById('embed-code');
    const copyButton = document.getElementById('copy-embed-code');
    const copyFeedback = document.getElementById('copy-feedback');
    const clockShapeSelect = document.getElementById('clock-shape');
    const textShadowSizeInput = document.getElementById('text-shadow-size');
    const textShadowSizeValue = document.getElementById('text-shadow-size-value');
    const textShadowColorInput = document.getElementById('text-shadow-color');
    const textColorInput = document.getElementById('text-color');
    const borderStyleSelect = document.getElementById('border-style');
    const borderSizeInput = document.getElementById('border-size');
    const borderSizeValue = document.getElementById('border-size-value');
    const borderColorInput = document.getElementById('border-color');
    const textEffectSelect = document.getElementById('text-effect');
    const neonColorInput = document.getElementById('neon-color');
    const neonColorControl = document.getElementById('neon-color-control');

    const generateEmbedLinkButton = document.getElementById('generate-embed-link');
    const embedLinkPreview = document.getElementById('embed-link-preview');
    const embedLinkInput = document.getElementById('embed-link');
    const copyEmbedLinkButton = document.getElementById('copy-embed-link');
    const linkCopyFeedback = document.getElementById('link-copy-feedback');

    // Initialize controls with default values
    backgroundTypeSelect.value = "single";
    backgroundColorInput.value = "#fad029";
    primaryColorInput.value = "#fad029";
    secondaryColorInput.value = "#ff6b6b";
    gradientTypeSelect.value = "linear";
    gradientAngleInput.value = "45";
    gradientSection.style.display = 'none';
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
    const clockContainer = document.querySelector('.style-1');
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

    // Add clock shape change handler
    clockShapeSelect.addEventListener('change', (e) => {
        console.log('Clock shape changed:', e.target.value);
        updateClockStyle();
    });

    // Add background type change handler
    backgroundTypeSelect.addEventListener('change', (e) => {
        const isGradient = e.target.value === 'gradient';
        const gradientSection = document.getElementById('gradient-section');
        gradientSection.style.display = isGradient ? 'block' : 'none';
        
        if (isGradient) {
            clockContainer.style.removeProperty('background-color');
            updateClockStyle();
        } else {
            clockContainer.style.removeProperty('background');
            clockContainer.style.removeProperty('background-image');
            updateClockStyle();
        }
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
        const backgroundType = backgroundTypeSelect.value;
        const backgroundColor = backgroundColorInput.value;
        const primaryColor = primaryColorInput.value;
        const secondaryColor = secondaryColorInput.value;
        const gradientType = gradientTypeSelect.value;
        const gradientAngle = gradientAngleInput.value;
        const clockShape = clockShapeSelect.value;
        const textShadowSize = parseInt(textShadowSizeInput.value);
        const textShadowColor = textShadowColorInput.value;
        const textColor = textColorInput.value;
        const borderStyle = borderStyleSelect.value;
        const borderSize = parseInt(borderSizeInput.value);
        const borderColor = borderColorInput.value;
        const textEffect = textEffectSelect.value;
        const neonColor = neonColorInput.value;

        if (!clockContainer) {
            console.error('Clock container not found!');
            return;
        }

        // Force clear any existing background styles
        clockContainer.style.removeProperty('background');
        clockContainer.style.removeProperty('background-image');
        clockContainer.style.removeProperty('background-color');
        
        // Apply background based on type
        if (backgroundType === 'single') {
            clockContainer.style.setProperty('background', backgroundColor, 'important');
            clockContainer.style.setProperty('background-color', backgroundColor, 'important');
            console.log('Applied single color:', backgroundColor);
        } else if (backgroundType === 'gradient') {
            // Create and apply gradient
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
            console.log('Applied gradient:', gradient);
        }
        
        // Apply border with custom size
        if (borderStyle !== 'none') {
            const borderValue = `${borderSize}px ${borderStyle} ${borderColor}`;
            clockContainer.style.setProperty('border', borderValue, 'important');
            console.log('Applied border:', borderValue);
        } else {
            clockContainer.style.setProperty('border', 'none', 'important');
        }

        // Apply text shadow to both time and date elements
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
        
        // Apply text color and font styles
        const selectedFont = fontFamilySelect.value;
        clockElement.style.setProperty('font-family', selectedFont, 'important');
        timeElement.style.setProperty('font-family', selectedFont, 'important');
        dateElement.style.setProperty('font-family', selectedFont, 'important');

        // Calculate max font size based on clock shape
        let maxFontSize = 48; // default max size
        if (clockShape === 'circle' || clockShape === 'square' || clockShape === 'octagon') {
            maxFontSize = 32; // smaller max size for compact shapes
        }
        
        // Constrain font size input
        const constrainedFontSize = Math.min(fontSizeInput.value, maxFontSize);
        fontSizeInput.value = constrainedFontSize;
        
        // Apply constrained font sizes
        timeElement.style.setProperty('font-size', `${constrainedFontSize * 2}px`, 'important');
        dateElement.style.setProperty('font-size', `${constrainedFontSize * 0.8}px`, 'important');
        
        // Apply text color
        timeElement.style.setProperty('color', textColor, 'important');
        dateElement.style.setProperty('color', textColor, 'important');
        
        // Handle shape classes
        clockContainer.classList.remove('rectangle', 'square', 'circle', 'octagon');
        clockContainer.classList.add(clockShape);

        // Update value displays
        textShadowSizeValue.textContent = `${textShadowSize}px`;
        borderSizeValue.textContent = `${borderSize}px`;

        // Apply text effects
        if (textEffect === 'neon') {
            const neonGlow = `0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 20px ${neonColor}, 0 0 30px ${neonColor}`;
            clockElement.style.setProperty('--neon-glow', neonGlow);
            // Remove any regular text shadow when neon effect is active
            timeElement.style.removeProperty('text-shadow');
            dateElement.style.removeProperty('text-shadow');
        } else if (textEffect === 'sparkle') {
            // Sparkle effect is handled by CSS
            timeElement.style.setProperty('color', 'white', 'important');
            dateElement.style.setProperty('color', 'white', 'important');
            timeElement.style.removeProperty('text-shadow');
            dateElement.style.removeProperty('text-shadow');
        } else if (textEffect === 'rainbow') {
            timeElement.style.setProperty('-webkit-background-clip', 'text');
            dateElement.style.setProperty('-webkit-background-clip', 'text');
            timeElement.style.setProperty('-webkit-text-fill-color', 'transparent');
            dateElement.style.setProperty('-webkit-text-fill-color', 'transparent');
        } else if (textEffect === 'none') {
            // Reset all effect-related styles
            clockElement.style.removeProperty('--neon-glow');
            timeElement.style.setProperty('color', textColor, 'important');
            dateElement.style.setProperty('color', textColor, 'important');
            
            // Reapply regular text shadow if it was set
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
            }
        }

        // Store current settings in localStorage
        const settings = {
            backgroundType,
            backgroundColor,
            primaryColor,
            secondaryColor,
            gradientType,
            gradientAngle,
            fontFamily: fontFamilySelect.value,
            fontSize: fontSizeInput.value,
            textColor,
            timeFormat: timeFormatSelect.value,
            showSeconds: showSecondsSelect.value,
            clockShape,
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
        console.log('Embed button elements found:', {
            showEmbedButton: showEmbedButton,
            embedPreview: embedPreview,
            embedCode: embedCode
        });
        showEmbedButton.addEventListener('click', () => {
            console.log('Embed button clicked'); // Debug log
            const isHidden = embedPreview.classList.contains('hidden');
            console.log('Preview is hidden:', isHidden);
            if (isHidden) {
                embedCode.dataset.type = 'full';
                const code = generateEmbedCode();
                console.log('Generated embed code:', code);
                embedCode.textContent = code.trim();
                if (window.hljs) {
                    console.log('Highlight.js is available');
                    hljs.highlightElement(embedCode);
                } else {
                    console.log('Highlight.js is not available');
                }
                embedPreview.classList.remove('hidden');
                showEmbedButton.textContent = 'Hide Embed Code';
            } else {
                embedPreview.classList.add('hidden');
                showEmbedButton.textContent = 'Show Embed Code';
            }
        });
    } else {
        console.error('Missing elements:', { 
            showEmbedButton: !!showEmbedButton, 
            embedPreview: !!embedPreview, 
            embedCode: !!embedCode 
        });
    }

    // Copy embed code
    if (copyButton && embedCode) {
        copyButton.addEventListener('click', async () => {
            console.log('Copy button clicked'); // Debug log
            try {
                await navigator.clipboard.writeText(embedCode.textContent);
                copyFeedback.classList.remove('hidden');
                setTimeout(() => {
                    copyFeedback.classList.add('hidden');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy embed code:', err);
            }
        });
    } else {
        console.error('Missing elements:', { 
            copyButton: !!copyButton, 
            embedCode: !!embedCode 
        });
    }

    // Load saved settings
    function loadSavedSettings() {
        const savedSettings = localStorage.getItem('clockSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            backgroundTypeSelect.value = settings.backgroundType || 'single';
            backgroundColorInput.value = settings.backgroundColor || '#fad029';
            gradientSection.style.display = settings.backgroundType === 'gradient' ? 'block' : 'none';
            primaryColorInput.value = settings.primaryColor || '#fad029';
            secondaryColorInput.value = settings.secondaryColor || '#ff6b6b';
            gradientTypeSelect.value = settings.gradientType || 'linear';
            gradientAngleInput.value = settings.gradientAngle || '45';
            angleValue.textContent = `${settings.gradientAngle || '45'}°`;
            fontFamilySelect.value = settings.fontFamily || 'IBM Plex Sans';
            fontSizeInput.value = settings.fontSize || '20';
            sizeValue.textContent = `${settings.fontSize || '20'}px`;
            textColorInput.value = settings.textColor || '#ffffff';
            timeFormatSelect.value = settings.timeFormat || '24';
            showSecondsSelect.value = settings.showSeconds || 'true';
            clockShapeSelect.value = settings.clockShape || 'rectangle';
            textShadowSizeInput.value = settings.textShadowSize || '0';
            textShadowColorInput.value = settings.textShadowColor || '#000000';
            borderStyleSelect.value = settings.borderStyle || 'none';
            borderSizeInput.value = settings.borderSize || '3';
            borderSizeValue.textContent = `${settings.borderSize || '3'}px`;
            borderColorInput.value = settings.borderColor || '#ff6b6b';
            textEffectSelect.value = settings.textEffect || 'none';
            neonColorInput.value = settings.neonColor || '#00ff00';
            neonColorControl.style.display = settings.textEffect === 'neon' ? 'flex' : 'none';
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
        const settings = {
            shape: clockShapeSelect.value,
            bgType: backgroundTypeSelect.value,
            bgColor: backgroundColorInput.value.substring(1),
            primaryColor: primaryColorInput.value.substring(1),
            secondaryColor: secondaryColorInput.value.substring(1),
            gradientType: gradientTypeSelect.value,
            gradientAngle: gradientAngleInput.value,
            fontFamily: encodeURIComponent(fontFamilySelect.value),
            fontSize: fontSizeInput.value,
            textColor: textColorInput.value.substring(1),
            textShadowSize: textShadowSizeInput.value,
            textShadowColor: textShadowColorInput.value.substring(1),
            timeFormat: timeFormatSelect.value,
            showSeconds: showSecondsSelect.value,
            borderStyle: borderStyleSelect.value,
            borderSize: borderSizeInput.value,
            borderColor: borderColorInput.value.substring(1),
            textEffect: textEffectSelect.value,
            neonColor: neonColorInput.value.substring(1)
        };

        return Object.entries(settings)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
    }

    // Generate embed link handler
    generateEmbedLinkButton.addEventListener('click', () => {
        if (embedLinkPreview.classList.contains('hidden')) {
            const settings = getAllSettings();
            const currentUrl = new URL(window.location.href);
            const baseUrl = currentUrl.origin + currentUrl.pathname;
            const embedUrl = `${baseUrl}?${settings}#embed`;
            
            embedLinkInput.value = embedUrl;
            embedLinkPreview.classList.remove('hidden');
            embedPreview.classList.add('hidden');
        } else {
            embedLinkPreview.classList.add('hidden');
        }
    });

    // Copy embed link handler
    copyEmbedLinkButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(embedLinkInput.value);
            linkCopyFeedback.classList.remove('hidden');
            setTimeout(() => {
                linkCopyFeedback.classList.add('hidden');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy embed link:', err);
        }
    });

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