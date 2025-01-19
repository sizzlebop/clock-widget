document.addEventListener('DOMContentLoaded', () => {
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

    // Add event listeners for all inputs
    [primaryColorInput, secondaryColorInput, gradientTypeSelect, 
     gradientAngleInput, fontFamilySelect, fontSizeInput, timeFormatSelect, showSecondsSelect].forEach(input => {
        input.addEventListener('change', updateClockStyle);
        input.addEventListener('input', updateClockStyle);
    });

    function updateClockStyle() {
        const primaryColor = primaryColorInput.value;
        const secondaryColor = secondaryColorInput.value;
        const gradientType = gradientTypeSelect.value;
        const gradientAngle = gradientAngleInput.value;
        const fontFamily = fontFamilySelect.value;
        const fontSize = fontSizeInput.value;

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
                gradient = `conic-gradient(from ${gradientAngle}deg, ${primaryColor}, ${secondaryColor})`;
                break;
        }

        // Apply styles to clock container
        const clockContainer = clockElement.parentElement;
        clockContainer.style.background = gradient;
        clockElement.style.fontFamily = fontFamily;
        
        // Adjust font sizes proportionally
        timeElement.style.fontSize = `${fontSize * 2}px`;
        dateElement.style.fontSize = `${fontSize * 0.8}px`;

        // Store current settings in localStorage
        const settings = {
            primaryColor,
            secondaryColor,
            gradientType,
            gradientAngle,
            fontFamily,
            fontSize,
            timeFormat: timeFormatSelect.value,
            showSeconds: showSecondsSelect.value
        };
        localStorage.setItem('clockSettings', JSON.stringify(settings));
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

    // Load saved settings from localStorage
    function loadSavedSettings() {
        const savedSettings = localStorage.getItem('clockSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            primaryColorInput.value = settings.primaryColor;
            secondaryColorInput.value = settings.secondaryColor;
            gradientTypeSelect.value = settings.gradientType;
            gradientAngleInput.value = settings.gradientAngle;
            angleValue.textContent = `${settings.gradientAngle}°`;
            fontFamilySelect.value = settings.fontFamily;
            fontSizeInput.value = settings.fontSize;
            sizeValue.textContent = `${settings.fontSize}px`;
            timeFormatSelect.value = settings.timeFormat || '24';
            showSecondsSelect.value = settings.showSeconds || 'true';
            updateClockStyle();
        }
    }

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
        timeElement.style.fontSize = `${baseFontSize * 2}px`;
        dateElement.style.fontSize = `${baseFontSize * 0.8}px`;
        
        // Adjust font sizes based on container size while maintaining proportions
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const container = entry.target;
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                const minDimension = Math.min(containerWidth, containerHeight);
                
                // Calculate responsive sizes while preserving the original proportion
                const responsiveBase = minDimension * 0.1;
                const scaleFactor = baseFontSize / 20; // 20 is our default base size
                
                timeElement.style.fontSize = `${responsiveBase * 2 * scaleFactor}px`;
                dateElement.style.fontSize = `${responsiveBase * 0.8 * scaleFactor}px`;
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

    // Initialize with saved settings or defaults
    loadSavedSettings();
}); 