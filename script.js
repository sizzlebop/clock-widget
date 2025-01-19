document.addEventListener('DOMContentLoaded', () => {
    // Check if page is embedded with #embed hash
    const isEmbedded = window.location.hash === '#embed';
    if (isEmbedded) {
        document.body.classList.add('embedded');
        // Hide customization panel when embedded
        const customizationPanel = document.querySelector('.customization-panel');
        if (customizationPanel) {
            customizationPanel.style.display = 'none';
        }
    }

    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
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
    const showRelativeEmbed = document.getElementById('show-relative-embed');
    const embedPreview = document.getElementById('embed-preview');
    const embedCode = document.getElementById('embed-code');
    const copyButton = document.getElementById('copy-embed-code');
    const clockShapeSelect = document.getElementById('clock-shape');
    const textShadowSizeInput = document.getElementById('text-shadow-size');
    const textShadowSizeValue = document.getElementById('text-shadow-size-value');
    const textShadowColorInput = document.getElementById('text-shadow-color');
    const textColorInput = document.getElementById('text-color');
    const backgroundOpacityInput = document.getElementById('background-opacity');
    const opacityValue = document.getElementById('opacity-value');
    const borderStyleSelect = document.getElementById('border-style');
    const borderColorInput = document.getElementById('border-color');

    // Initialize controls with default values
    textShadowSizeInput.value = "0";
    textShadowColorInput.value = "#000000";
    textColorInput.value = "#ffffff";
    backgroundOpacityInput.value = "100";
    borderStyleSelect.value = "none";
    borderColorInput.value = "#ff6b6b";

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

    backgroundOpacityInput.addEventListener('input', (e) => {
        console.log('Opacity changed:', e.target.value);
        opacityValue.textContent = `${e.target.value}%`;
        updateClockStyle();
    });

    borderStyleSelect.addEventListener('change', (e) => {
        console.log('Border style changed:', e.target.value);
        updateClockStyle();
    });

    borderColorInput.addEventListener('input', () => {
        console.log('Border color changed:', borderColorInput.value);
        updateClockStyle();
    });

    function updateClockStyle() {
        const primaryColor = primaryColorInput.value;
        const secondaryColor = secondaryColorInput.value;
        const gradientType = gradientTypeSelect.value;
        const gradientAngle = gradientAngleInput.value;
        const clockShape = clockShapeSelect.value;
        const textShadowSize = parseInt(textShadowSizeInput.value);
        const textShadowColor = textShadowColorInput.value;
        const textColor = textColorInput.value;
        const opacity = parseInt(backgroundOpacityInput.value) / 100;
        const borderStyle = borderStyleSelect.value;
        const borderColor = borderColorInput.value;

        console.log('Style values:', {
            textShadowSize,
            textShadowColor,
            textColor,
            opacity,
            borderStyle,
            borderColor,
            primaryColor,
            secondaryColor
        });

        // Create gradient based on type
        let gradient;
        switch (gradientType) {
            case 'linear':
                gradient = `linear-gradient(${gradientAngle}deg, ${primaryColor}, ${secondaryColor})`;
                break;
            case 'radial':
                gradient = `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`;
                break;
            case 'conic':
                gradient = `conic-gradient(from ${gradientAngle}deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`;
                break;
        }

        // Get the correct container (.style-1)
        const clockContainer = document.querySelector('.style-1');
        console.log('Clock container:', clockContainer);
        
        if (!clockContainer) {
            console.error('Clock container not found!');
            return;
        }
        
        // Apply background with opacity
        const rgbaPrimary = `rgba(${hexToRgb(primaryColor)}, ${opacity})`;
        clockContainer.style.setProperty('background', gradient, 'important');
        
        // Apply border with width proportional to container
        if (borderStyle !== 'none') {
            const borderWidth = Math.max(3, Math.floor(clockContainer.offsetWidth * 0.015));
            const borderValue = `${borderWidth}px ${borderStyle} ${borderColor}`;
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
        clockElement.style.setProperty('font-family', fontFamilySelect.value, 'important');
        timeElement.style.setProperty('font-size', `${fontSizeInput.value * 2}px`, 'important');
        dateElement.style.setProperty('font-size', `${fontSizeInput.value * 0.8}px`, 'important');
        timeElement.style.setProperty('color', textColor, 'important');
        dateElement.style.setProperty('color', textColor, 'important');
        
        // Handle shape classes
        clockContainer.classList.remove('rectangle', 'square', 'circle', 'octagon', 'star', 'heart');
        if (clockShape !== 'rectangle') {
            clockContainer.classList.add(clockShape);
        }

        // Update value displays
        textShadowSizeValue.textContent = `${textShadowSize}px`;
        opacityValue.textContent = `${backgroundOpacityInput.value}%`;

        // Store current settings in localStorage
        const settings = {
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
            opacity: backgroundOpacityInput.value,
            borderStyle,
            borderColor
        };
        localStorage.setItem('clockSettings', JSON.stringify(settings));
    }

    // Helper function to convert hex to RGB
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
            '0, 0, 0';
    }

    // Generate embed code based on current settings
    function generateEmbedCode() {
        const settings = JSON.parse(localStorage.getItem('clockSettings'));
        const params = new URLSearchParams({
            primaryColor: settings.primaryColor,
            secondaryColor: settings.secondaryColor,
            gradientType: settings.gradientType,
            gradientAngle: settings.gradientAngle,
            fontFamily: settings.fontFamily,
            fontSize: settings.fontSize,
            timeFormat: settings.timeFormat,
            showSeconds: settings.showSeconds
        });
        
        // Create embed code with responsive iframe
        const embedHTML = `<div style="position: relative; width: 100%; height: 0; padding-bottom: 50%; overflow: hidden; border-radius: 8px;">
    <iframe 
        src="${generateRelativeEmbed()}"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
        allow="autoplay"
    ></iframe>
</div>`;

        return embedHTML;
    }

    // Generate relative embed link
    function generateRelativeEmbed() {
        const settings = JSON.parse(localStorage.getItem('clockSettings'));
        const params = new URLSearchParams({
            primaryColor: settings.primaryColor,
            secondaryColor: settings.secondaryColor,
            gradientType: settings.gradientType,
            gradientAngle: settings.gradientAngle,
            fontFamily: settings.fontFamily,
            fontSize: settings.fontSize,
            timeFormat: settings.timeFormat,
            showSeconds: settings.showSeconds
        });
        
        // Get the current site's URL
        const currentUrl = new URL(window.location.href);
        // Get the base URL (protocol + hostname)
        const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}`;
        
        // Return the URL with parameters
        return `${baseUrl}/?${params.toString()}#embed`;
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
                showRelativeEmbed.textContent = 'Get Relative Link';
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

    // Show/hide relative embed link
    if (showRelativeEmbed && embedPreview && embedCode) {
        showRelativeEmbed.addEventListener('click', () => {
            console.log('Relative link button clicked'); // Debug log
            const isHidden = embedPreview.classList.contains('hidden');
            if (isHidden) {
                embedCode.dataset.type = 'relative';
                const link = generateRelativeEmbed();
                embedCode.textContent = link;
                embedPreview.classList.remove('hidden');
                showRelativeEmbed.textContent = 'Hide Relative Link';
                showEmbedButton.textContent = 'Show Embed Code';
            } else {
                embedPreview.classList.add('hidden');
                showRelativeEmbed.textContent = 'Get Relative Link';
            }
        });
    } else {
        console.error('Missing elements:', { 
            showRelativeEmbed: !!showRelativeEmbed, 
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
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = originalText;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
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
            backgroundOpacityInput.value = settings.opacity || '100';
            borderStyleSelect.value = settings.borderStyle || 'none';
            borderColorInput.value = settings.borderColor || '#ff6b6b';
            updateClockStyle();
        }
    }

    // Load saved settings on page load
    loadSavedSettings();

    // Check if we're in embed mode
    if (window.location.hash === '#embed') {
        const params = new URLSearchParams(window.location.search);
        const settings = {
            primaryColor: params.get('primaryColor'),
            secondaryColor: params.get('secondaryColor'),
            gradientType: params.get('gradientType'),
            gradientAngle: params.get('gradientAngle'),
            fontFamily: params.get('fontFamily'),
            fontSize: params.get('fontSize'),
            timeFormat: params.get('timeFormat'),
            showSeconds: params.get('showSeconds')
        };
        localStorage.setItem('clockSettings', JSON.stringify(settings));
        
        // Hide customization panel and adjust clock container for embed mode
        document.querySelector('.customization-panel').style.display = 'none';
        document.querySelector('.style-0').style.padding = '0';
        document.querySelector('.style-0').style.height = '100vh';
        document.querySelector('.style-1').style.margin = '0';
        document.querySelector('.style-1').style.height = '100%';
        document.querySelector('.footer-image').style.display = 'none';
        
        // Make clock container responsive
        const clockContainer = document.querySelector('.clock');
        clockContainer.style.height = '100%';
        clockContainer.style.display = 'flex';
        clockContainer.style.flexDirection = 'column';
        clockContainer.style.justifyContent = 'center';
        clockContainer.style.alignItems = 'center';

        // Apply initial font size from settings
        const timeElement = clockContainer.querySelector('.time');
        const dateElement = clockContainer.querySelector('.date');
        const baseFontSize = parseInt(settings.fontSize) || 20;
        
        // Calculate initial scale based on container size
        const containerWidth = clockContainer.clientWidth;
        const containerHeight = clockContainer.clientHeight;
        const minDimension = Math.min(containerWidth, containerHeight);
        const initialScale = minDimension / 400; // Base scale on a reference size of 400px
        
        // Set initial sizes with scaling
        timeElement.style.fontSize = `${baseFontSize * 2 * initialScale}px`;
        dateElement.style.fontSize = `${baseFontSize * 0.8 * initialScale}px`;
        
        // Store initial container size for relative scaling
        let initialWidth = containerWidth;
        let initialHeight = containerHeight;
        
        // Adjust font sizes based on container size while maintaining proportions
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const container = entry.target;
                const newWidth = container.clientWidth;
                const newHeight = container.clientHeight;
                
                // Calculate scale factor based on size change
                const widthScale = newWidth / initialWidth;
                const heightScale = newHeight / initialHeight;
                const scale = Math.min(widthScale, heightScale);
                
                // Apply scaled sizes
                timeElement.style.fontSize = `${baseFontSize * 2 * initialScale * scale}px`;
                dateElement.style.fontSize = `${baseFontSize * 0.8 * initialScale * scale}px`;
            }
        });
        
        resizeObserver.observe(clockContainer);
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
}); 