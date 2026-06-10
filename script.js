/**
 * Project: Student Placement Predictor
 * Logic: Basic State Management & Interactive Functionality
 * Pattern: Vanilla JS, Event-Driven
 */

document.addEventListener('DOMContentLoaded', () => {
    const predictionForm = document.getElementById('predictionForm');
    const resultSection = document.getElementById('resultSection');
    const predictBtn = document.getElementById('predictBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // UI Elements for result
    const resultValue = document.getElementById('resultValue');
    const resultCircle = document.getElementById('resultCircle');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');

    /**
     * Mock Prediction Logic
     * In a real scenario, this would be an API call to a Machine Learning Model.
     */
    function calculateProbability(data) {
        const { cgpa, iq, internships } = data;
        
        // Simple weighted formula for demonstration
        // Max CGPA: 10, Max IQ: 200, Max Internships: 10
        let score = (cgpa / 10) * 50; // CGPA contributes 50%
        score += (iq / 200) * 30;     // IQ contributes 30%
        score += (internships / 5) * 20; // Internships contributes 20%
        
        // Add a bit of realistic variation
        score += (Math.random() * 5 - 2.5);
        
        // Clamp between 0 and 100
        return Math.min(Math.max(Math.round(score), 0), 100);
    }

    function updateResultUI(probability) {
        // Animate the circle
        // stroke-dasharray: [progress], 100
        resultCircle.style.strokeDasharray = `${probability}, 100`;
        
        // Update text with counting effect
        let current = 0;
        const interval = setInterval(() => {
            if (current >= probability) {
                clearInterval(interval);
            } else {
                current++;
                resultValue.textContent = `${current}%`;
            }
        }, 20);

        // Update messages based on probability
        if (probability > 85) {
            resultTitle.textContent = "Excellent Prospects!";
            resultMessage.textContent = "Your profile is a top-tier match for most multinational corporations. Keep refining your soft skills.";
            resultCircle.style.stroke = "#A5856F"; // Mocha for high success
        } else if (probability > 60) {
            resultTitle.textContent = "Strong Candidate";
            resultMessage.textContent = "You have a solid foundation. Consider one more technical certification to boost your chances further.";
            resultCircle.style.stroke = "#A0D4E0"; // Blue for good success
        } else {
            resultTitle.textContent = "Building Potential";
            resultMessage.textContent = "Focus on increasing your technical portfolio and internship exposure to improve your marketability.";
            resultCircle.style.stroke = "#ccc";
        }
    }

    predictionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Gather Data
        const formData = {
            name: document.getElementById('fullName').value,
            cgpa: parseFloat(document.getElementById('cgpa').value),
            iq: parseInt(document.getElementById('iqScore').value),
            internships: parseInt(document.getElementById('internships').value),
            major: document.getElementById('major').value
        };

        // 2. Interactive Feedback (Loading state)
        predictBtn.disabled = true;
        predictBtn.textContent = "Processing Profile...";
        
        // 3. Mock Latency for "Premium" feel
        setTimeout(() => {
            const probability = calculateProbability(formData);
            
            // 4. Reveal Results
            resultSection.classList.remove('hidden');
            resultSection.scrollIntoView({ behavior: 'smooth' });
            
            updateResultUI(probability);
            
            predictBtn.disabled = false;
            predictBtn.textContent = "Analyze Placement Potential";
        }, 1500);
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navUl = document.querySelector('.main-nav ul');
    
    // Theme Toggle Logic
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme, false);
    }

    // Mobile Menu Toggle
    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                navUl.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }

    resetBtn.addEventListener('click', () => {
        predictionForm.reset();
        resultSection.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Reset circle
        resultCircle.style.strokeDasharray = `0, 100`;
        resultValue.textContent = "0%";
    });
});
