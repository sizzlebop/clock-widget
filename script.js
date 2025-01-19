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
        
        // Create embed code with iframe
        const embedHTML = `<iframe 
    src="https://twinkle.pinkpixel.dev/?${params.toString()}#embed"
    width="500"
    height="250"
    frameborder="0"
    style="border-radius: 8px;"
></iframe>`;

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
        
        // Return just the URL for embedding in apps
        return `https://twinkle.pinkpixel.dev/?${params.toString()}#embed`;
    }

    // Show/hide embed code
    if (showEmbedButton && embedPreview && embedCode) {
        showEmbedButton.addEventListener('click', () => {
            console.log('Embed button clicked'); // Debug log
            const isHidden = embedPreview.classList.contains('hidden');
            if (isHidden) {
                embedCode.dataset.type = 'full';
                const code = generateEmbedCode();
                embedCode.textContent = code.trim();
                if (window.hljs) {
                    hljs.highlightElement(embedCode);
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
        document.querySelector('.customization-panel').style.display = 'none';
    }

    // Initialize with saved settings or defaults
    loadSavedSettings();
}); 