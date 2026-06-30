// Complete Aereve Website JavaScript with ALL Content
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aereve Website JavaScript Loaded Successfully');
    
    // Initialize the website
    initializeWebsite();
    initializeDownloads();
    
    // Load home page by default
    loadPage('home');
});

// Download functionality
function initializeDownloads() {
    // Document download mappings
    const downloadMappings = {
        'hkma-report': 'documents/hkma-genai-sandbox-report.pdf',
        'compliance-guide': 'documents/multicultural-compliance-guide.pdf',
        'web3-whitepaper': 'documents/web3-compliance-whitepaper.pdf',
        'company-brochure': 'documents/aereve-company-brochure.pdf'
    };
    
    // Add click listeners to download buttons
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Handle download buttons
        if (target.matches('[data-download]') || target.closest('[data-download]')) {
            e.preventDefault();
            const button = target.matches('[data-download]') ? target : target.closest('[data-download]');
            const downloadKey = button.getAttribute('data-download');
            
            if (downloadMappings[downloadKey]) {
                downloadFile(downloadMappings[downloadKey], getDownloadFilename(downloadKey));
            }
        }
        
        // Handle generic download buttons by text content
        if (target.textContent.includes('Download PDF') || 
            target.textContent.includes('Download Brochure') ||
            target.textContent.includes('Download Alert') ||
            target.textContent.includes('Download')) {
            e.preventDefault();
            
            // Determine which document to download based on context
            const pageContext = window.location.pathname;
            if (pageContext.includes('resources') || target.closest('.resource-item')) {
                // Try to determine document from context
                const resourceItem = target.closest('.resource-item') || target.closest('.card');
                if (resourceItem) {
                    const title = resourceItem.querySelector('h3')?.textContent || '';
                    if (title.includes('HKMA')) {
                        downloadFile(downloadMappings['hkma-report'], 'HKMA_GenAI_Sandbox_Report.pdf');
                    } else if (title.includes('Multicultural')) {
                        downloadFile(downloadMappings['compliance-guide'], 'Multicultural_Compliance_Guide.pdf');
                    } else if (title.includes('Web3')) {
                        downloadFile(downloadMappings['web3-whitepaper'], 'Web3_Compliance_Whitepaper.pdf');
                    } else {
                        downloadFile(downloadMappings['company-brochure'], 'Aereve_Company_Brochure.pdf');
                    }
                }
            } else {
                // Default to company brochure
                downloadFile(downloadMappings['company-brochure'], 'Aereve_Company_Brochure.pdf');
            }
        }
        
        // Handle demo request buttons
        if (target.textContent.includes('Request Demo') || 
            target.textContent.includes('Schedule Demo') ||
            target.textContent.includes('Schedule a Demo')) {
            e.preventDefault();
            showDemoModal();
        }
        
        // Handle contact sales buttons
        if (target.textContent.includes('Contact Sales')) {
            e.preventDefault();
            window.location.href = 'contact.html';
        }
    });
}

function downloadFile(filePath, filename) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filename;
    link.style.display = 'none';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download notification
    showNotification('Download started: ' + filename, 'success');
}

function getDownloadFilename(downloadKey) {
    const filenames = {
        'hkma-report': 'HKMA_GenAI_Sandbox_Report.pdf',
        'compliance-guide': 'Multicultural_Compliance_Guide.pdf',
        'web3-whitepaper': 'Web3_Compliance_Whitepaper.pdf',
        'company-brochure': 'Aereve_Company_Brochure.pdf'
    };
    return filenames[downloadKey] || 'Aereve_Document.pdf';
}

function showDemoModal() {
    // Create demo request modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Request a Demo</h3>
            <p class="text-gray-600 mb-6">Thank you for your interest! Please contact us to schedule a personalized demo.</p>
            <div class="space-y-4">
                <div>
                    <strong>Email:</strong> office@aereve.com
                </div>
                <div>
                    <strong>Phone:</strong> +65 9651 0600
                </div>
            </div>
            <div class="flex gap-4 mt-6">
                <button onclick="window.location.href='contact.html'" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Contact Form
                </button>
                <button onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function initializeWebsite() {
    // Add click listeners to navigation links
    const navLinks = document.querySelectorAll('[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
            
            // Update active navigation
            navLinks.forEach(l => l.classList.remove('text-blue-600', 'border-blue-600'));
            this.classList.add('text-blue-600', 'border-blue-600');
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections for animations
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function loadPage(page) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) {
        console.error('Main content element not found');
        return;
    }
    
    let content = '';
    
    switch(page) {
        case 'home':
            content = getHomeContent();
            break;
        case 'products':
            content = getProductsContent();
            break;
        case 'web3-compliance':
            content = getWeb3ComplianceContent();
            break;
        case 'patented-technology':
            content = getPatentedTechnologyContent();
            break;
        case 'why-aereve':
            content = getWhyAereveContent();
            break;
        case 'company':
            content = getCompanyContent();
            break;
        case 'resources':
            content = getResourcesContent();
            break;
        case 'contact':
            content = getContactContent();
            break;
        default:
            content = getHomeContent();
    }
    
    mainContent.innerHTML = content;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Re-initialize any dynamic elements
    initializeDynamicElements();
}

function getHomeContent() {
    return `
        <!-- Hero Section -->
        <section class="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
            <div class="absolute inset-0 bg-black opacity-50"></div>
            <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                        Radically Human Compliance for a <span class="text-blue-300">Multicultural World</span>
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto animate-fade-in">
                        Aereve's AI-powered RegTech platform reduces false positives by 90% while ensuring 100% regulatory compliance across global markets.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                        <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            Request Demo
                        </button>
                        <button class="border border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Trust Indicators -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Financial Institutions</h2>
                    <p class="text-lg text-gray-600">HKMA Approved • 50+ Organizations • Multiple Awards</p>
                </div>
                
                <!-- Client Logos -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
                    <div class="flex justify-center">
                        <img src="assets/citibank-logo.png" alt="Citibank" class="h-12 opacity-70 hover:opacity-100 transition-opacity">
                    </div>
                    <div class="flex justify-center">
                        <img src="assets/za-bank-logo.png" alt="ZA Bank" class="h-12 opacity-70 hover:opacity-100 transition-opacity">
                    </div>
                    <div class="flex justify-center">
                        <img src="assets/hkma-logo.png" alt="HKMA" class="h-12 opacity-70 hover:opacity-100 transition-opacity">
                    </div>
                    <div class="flex justify-center">
                        <img src="assets/thomson-reuters-logo.png" alt="Thomson Reuters" class="h-12 opacity-70 hover:opacity-100 transition-opacity">
                    </div>
                </div>
            </div>
        </section>

        <!-- Key Metrics -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Proven Results</h2>
                    <p class="text-lg text-gray-600">Our AI-powered platform delivers measurable improvements</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center p-6 bg-blue-50 rounded-lg">
                        <div class="text-4xl font-bold text-blue-600 mb-2">90%</div>
                        <div class="text-lg font-semibold text-gray-900 mb-2">False Positive Reduction</div>
                        <div class="text-gray-600">Dramatically reduce manual review workload</div>
                    </div>
                    <div class="text-center p-6 bg-green-50 rounded-lg">
                        <div class="text-4xl font-bold text-green-600 mb-2">100%</div>
                        <div class="text-lg font-semibold text-gray-900 mb-2">Regulatory Compliance</div>
                        <div class="text-gray-600">Meet all local and international requirements</div>
                    </div>
                    <div class="text-center p-6 bg-purple-50 rounded-lg">
                        <div class="text-4xl font-bold text-purple-600 mb-2">50+</div>
                        <div class="text-lg font-semibold text-gray-900 mb-2">Organizations</div>
                        <div class="text-gray-600">Trusted by leading financial institutions</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- East Meets West Philosophy -->
        <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">"East Meets West" Approach</h2>
                    <p class="text-xl max-w-3xl mx-auto">
                        Bridging Eastern and Western regulatory frameworks with AI-powered cultural intelligence
                    </p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 class="text-2xl font-bold mb-6">Cultural Intelligence in Compliance</h3>
                        <ul class="space-y-4">
                            <li class="flex items-start">
                                <div class="w-6 h-6 bg-blue-300 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                                <div>
                                    <strong>Multicultural Name Screening:</strong> Advanced fuzzy logic for Asian names and transliterations
                                </div>
                            </li>
                            <li class="flex items-start">
                                <div class="w-6 h-6 bg-blue-300 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                                <div>
                                    <strong>Cross-Border Compliance:</strong> Navigate complex regulatory landscapes across jurisdictions
                                </div>
                            </li>
                            <li class="flex items-start">
                                <div class="w-6 h-6 bg-blue-300 rounded-full flex-shrink-0 mt-1 mr-3"></div>
                                <div>
                                    <strong>Local Expertise:</strong> Deep understanding of APAC regulatory requirements
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="text-center">
                        <img src="assets/east-meets-west.png" alt="East Meets West" class="mx-auto rounded-lg shadow-lg">
                    </div>
                </div>
            </div>
        </section>

        <!-- Awards and Recognition -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
                    <p class="text-lg text-gray-600">Industry recognition for innovation and excellence</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🏆</span>
                        </div>
                        <h3 class="text-lg font-semibold mb-2">FinCrimeTech50 Global Top 50 2025</h3>
                        <p class="text-gray-600">Recognized among the world's most innovative financial crime technology companies</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🤝</span>
                        </div>
                        <h3 class="text-lg font-semibold mb-2">Banking Industry Collaboration Award</h3>
                        <p class="text-gray-600">Joint recognition with Citibank for innovative compliance solutions</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">⭐</span>
                        </div>
                        <h3 class="text-lg font-semibold mb-2">Rising Star Award</h3>
                        <p class="text-gray-600">Regulation Asia recognition for sanctions name screening innovation</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Client Testimonials -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                    <p class="text-lg text-gray-600">Trusted by leading financial institutions worldwide</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-gray-50 p-8 rounded-lg">
                        <div class="flex items-center mb-4">
                            <img src="assets/citibank-logo.png" alt="Citibank" class="h-8 mr-4">
                            <div>
                                <div class="font-semibold">Citibank Hong Kong</div>
                                <div class="text-sm text-gray-600">Global Financial Institution</div>
                            </div>
                        </div>
                        <p class="text-gray-700 italic">
                            "Aereve's AI-powered platform has revolutionized our compliance operations, reducing false positives by 90% while maintaining 100% regulatory compliance."
                        </p>
                    </div>
                    <div class="bg-gray-50 p-8 rounded-lg">
                        <div class="flex items-center mb-4">
                            <img src="assets/za-bank-logo.png" alt="ZA Bank" class="h-8 mr-4">
                            <div>
                                <div class="font-semibold">ZA Bank</div>
                                <div class="text-sm text-gray-600">Virtual Banking</div>
                            </div>
                        </div>
                        <p class="text-gray-700 italic">
                            "The cultural intelligence in Aereve's name screening solution is unmatched, especially for Asian markets and multicultural compliance."
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl font-bold mb-4">Ready to Transform Your Compliance Operations?</h2>
                <p class="text-xl mb-8 max-w-3xl mx-auto">
                    Join 50+ organizations that trust Aereve for AI-powered regulatory compliance
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Request Demo
                    </button>
                    <button class="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Contact Sales
                    </button>
                </div>
            </div>
        </section>
    `;
}

function getProductsContent() {
    return `
        <!-- Products Hero -->
        <section class="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        Revolutionary <span class="text-blue-300">KYC/AML Compliance Platform</span>
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                        AI-powered solutions that reduce false positives by 90% while ensuring 100% regulatory compliance
                    </p>
                </div>
            </div>
        </section>

        <!-- Strategic Partnership -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Strategic Partnership</h2>
                    <p class="text-lg text-gray-600">Cloud & On-Premise GenAI RegTech Campaign</p>
                </div>
                
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 class="text-2xl font-bold text-gray-900 mb-4">Powered by Aereve and HPE</h3>
                            <p class="text-lg text-gray-700 mb-6">
                                Our strategic partnership with HPE brings enterprise-grade infrastructure to AI-powered regulatory technology.
                            </p>
                            <ul class="space-y-3">
                                <li class="flex items-center">
                                    <span class="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">✓</span>
                                    Cloud and On-Premise deployment flexibility
                                </li>
                                <li class="flex items-center">
                                    <span class="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">✓</span>
                                    Enterprise-grade HPE compute resources
                                </li>
                                <li class="flex items-center">
                                    <span class="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3">✓</span>
                                    Joint go-to-market strategy
                                </li>
                            </ul>
                        </div>
                        <div class="text-center">
                            <img src="assets/hpe-collaboration.jpg" alt="HPE Collaboration" class="rounded-lg shadow-lg mx-auto">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- E2KYC Platform -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">E2KYC Platform</h2>
                    <p class="text-lg text-gray-600">End-to-End Know Your Customer Solution</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Comprehensive Customer Due Diligence</h3>
                        <div class="space-y-6">
                            <div class="flex items-start">
                                <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-4 mt-1">1</div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-2">Identity Verification</h4>
                                    <p class="text-gray-600">Advanced document verification with AI-powered fraud detection</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-4 mt-1">2</div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-2">Risk Assessment</h4>
                                    <p class="text-gray-600">Dynamic risk scoring based on multiple data sources</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-4 mt-1">3</div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-2">Ongoing Monitoring</h4>
                                    <p class="text-gray-600">Continuous customer monitoring and profile updates</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <img src="assets/e2kyc-platform.png" alt="E2KYC Platform" class="rounded-lg shadow-lg mx-auto">
                    </div>
                </div>
            </div>
        </section>

        <!-- E2AML Platform -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">E2AML Platform</h2>
                    <p class="text-lg text-gray-600">End-to-End Anti-Money Laundering Solution</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="text-center">
                        <img src="assets/e2aml-platform.png" alt="E2AML Platform" class="rounded-lg shadow-lg mx-auto">
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Advanced Transaction Monitoring</h3>
                        <div class="space-y-6">
                            <div class="flex items-start">
                                <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-4 mt-1">1</div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-2">Real-time Screening</h4>
                                    <p class="text-gray-600">Instant transaction analysis with AI-powered pattern recognition</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-4 mt-1">2</div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-2">Suspicious Activity Detection</h4>
                                    <p class="text-gray-600">Machine learning algorithms identify unusual transaction patterns</p>
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-4 mt-1">3</div>
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-2">Regulatory Reporting</h4>
                                    <p class="text-gray-600">Automated SAR/STR generation and regulatory submission</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 7-Step AML/KYC Process -->
        <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">The 7-Step AML/KYC Process</h2>
                    <p class="text-xl">Comprehensive compliance workflow powered by AI</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                        <div class="w-12 h-12 bg-blue-300 text-blue-900 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                        <h3 class="text-lg font-semibold mb-2">Customer Identification</h3>
                        <p class="text-blue-100">Verify customer identity using multiple data sources and AI-powered document analysis</p>
                    </div>
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                        <div class="w-12 h-12 bg-blue-300 text-blue-900 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                        <h3 class="text-lg font-semibold mb-2">Risk Assessment</h3>
                        <p class="text-blue-100">Dynamic risk scoring based on customer profile, geography, and transaction patterns</p>
                    </div>
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                        <div class="w-12 h-12 bg-blue-300 text-blue-900 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                        <h3 class="text-lg font-semibold mb-2">Enhanced Due Diligence</h3>
                        <p class="text-blue-100">Additional verification for high-risk customers using advanced screening techniques</p>
                    </div>
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                        <div class="w-12 h-12 bg-blue-300 text-blue-900 rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
                        <h3 class="text-lg font-semibold mb-2">Web Search (Google, Baidu)</h3>
                        <p class="text-blue-100">Multi-language web search across global and regional search engines for comprehensive screening</p>
                    </div>
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                        <div class="w-12 h-12 bg-blue-300 text-blue-900 rounded-full flex items-center justify-center text-xl font-bold mb-4">5</div>
                        <h3 class="text-lg font-semibold mb-2">Transaction Monitoring</h3>
                        <p class="text-blue-100">Real-time analysis of transaction patterns and suspicious activity detection</p>
                    </div>
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                        <div class="w-12 h-12 bg-blue-300 text-blue-900 rounded-full flex items-center justify-center text-xl font-bold mb-4">6</div>
                        <h3 class="text-lg font-semibold mb-2">Ongoing Monitoring</h3>
                        <p class="text-blue-100">Continuous customer profile updates and risk reassessment</p>
                    </div>
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 md:col-span-2 lg:col-span-1">
                        <div class="w-12 h-12 bg-blue-300 text-blue-900 rounded-full flex items-center justify-center text-xl font-bold mb-4">7</div>
                        <h3 class="text-lg font-semibold mb-2">Regulatory Reporting</h3>
                        <p class="text-blue-100">Automated generation and submission of regulatory reports and compliance documentation</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Flexible Business Models -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Flexible Business Models</h2>
                    <p class="text-lg text-gray-600">Choose the deployment model that fits your organization</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="text-2xl">☁️</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Cloud SaaS</h3>
                        <p class="text-gray-600 mb-6">Fully managed cloud solution with automatic updates and scaling</p>
                        <ul class="text-left space-y-2 mb-6">
                            <li class="flex items-center">
                                <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                <span class="text-sm">Rapid deployment</span>
                            </li>
                            <li class="flex items-center">
                                <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                <span class="text-sm">Automatic updates</span>
                            </li>
                            <li class="flex items-center">
                                <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                <span class="text-sm">Pay-as-you-scale</span>
                            </li>
                        </ul>
                        <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Learn More
                        </button>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-lg p-8 text-center border-2 border-blue-500">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="text-2xl">🏢</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">On-Premise</h3>
                        <p class="text-gray-600 mb-6">Complete control with on-premise deployment for maximum security</p>
                        <ul class="text-left space-y-2 mb-6">
                            <li class="flex items-center">
                                <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                <span class="text-sm">Full data control</span>
                            </li>
                            <li class="flex items-center">
                                <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                <span class="text-sm">Custom integration</span>
                            </li>
                            <li class="flex items-center">
                                <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                <span class="text-sm">Enhanced security</span>
                            </li>
                        </ul>
                        <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Popular Choice
                        </button>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="text-2xl">🔗</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Hybrid</h3>
                        <p class="text-gray-600 mb-6">Best of both worlds with hybrid cloud-on-premise architecture</p>
                        <ul class="text-left space-y-2 mb-6">
                            <li class="flex items-center">
                                <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                <span class="text-sm">Flexible deployment</span>
                            </li>
                            <li class="flex items-center">
                                <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                <span class="text-sm">Optimized costs</span>
                            </li>
                            <li class="flex items-center">
                                <span class="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                                <span class="text-sm">Scalable architecture</span>
                            </li>
                        </ul>
                        <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl font-bold mb-4">Ready to Transform Your Compliance Operations?</h2>
                <p class="text-xl mb-8 max-w-3xl mx-auto">
                    Experience the power of AI-driven KYC/AML compliance with our comprehensive platform
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Request Demo
                    </button>
                    <button class="border border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Contact Sales
                    </button>
                </div>
            </div>
        </section>
    `;
}

function getWeb3ComplianceContent() {
    return `
        <!-- Web3 Compliance Hero -->
        <section class="bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 text-white py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        Web3 <span class="text-purple-300">Compliance Solutions</span>
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                        Bridging on-chain and off-chain analytics for comprehensive Web3 regulatory compliance
                    </p>
                </div>
            </div>
        </section>

        <!-- The Fundamental Challenge -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">The Fundamental Challenge in Web3 Compliance</h2>
                    <p class="text-lg text-gray-600">Understanding the complexity of decentralized finance compliance</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Traditional vs. Web3 Compliance</h3>
                        <div class="space-y-6">
                            <div class="bg-red-50 border-l-4 border-red-500 p-4">
                                <h4 class="font-semibold text-red-800 mb-2">Traditional Challenges</h4>
                                <ul class="text-red-700 space-y-1">
                                    <li>• Centralized data sources</li>
                                    <li>• Clear regulatory frameworks</li>
                                    <li>• Established compliance procedures</li>
                                </ul>
                            </div>
                            <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                                <h4 class="font-semibold text-yellow-800 mb-2">Web3 Complexities</h4>
                                <ul class="text-yellow-700 space-y-1">
                                    <li>• Decentralized and pseudonymous transactions</li>
                                    <li>• Evolving regulatory landscape</li>
                                    <li>• Cross-chain transaction complexity</li>
                                    <li>• Limited traditional compliance tools</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <img src="assets/web3-challenge.png" alt="Web3 Compliance Challenge" class="rounded-lg shadow-lg mx-auto">
                    </div>
                </div>
            </div>
        </section>

        <!-- Aereve's Bridging Solution -->
        <section class="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">Aereve's Bridging Solution</h2>
                    <p class="text-xl">Connecting on-chain analytics with traditional compliance frameworks</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="text-3xl">🔗</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4">On-Chain Analytics</h3>
                        <p class="text-purple-100">
                            Advanced blockchain analysis tools that track and analyze cryptocurrency transactions across multiple networks
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="text-3xl">🌉</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Bridging Technology</h3>
                        <p class="text-purple-100">
                            Proprietary algorithms that connect blockchain data with traditional financial compliance systems
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="text-3xl">📊</span>
                        </div>
                        <h3 class="text-xl font-bold mb-4">Off-Chain Integration</h3>
                        <p class="text-purple-100">
                            Seamless integration with existing KYC/AML systems and regulatory reporting frameworks
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Off-Chain Integration Components -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Off-Chain Integration Components</h2>
                    <p class="text-lg text-gray-600">Comprehensive integration with traditional financial systems</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="bg-white rounded-lg shadow-md p-6 text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🏦</span>
                        </div>
                        <h3 class="text-lg font-semibold mb-3">Banking Systems</h3>
                        <p class="text-gray-600 text-sm">Direct integration with core banking platforms and payment processors</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6 text-center">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">📋</span>
                        </div>
                        <h3 class="text-lg font-semibold mb-3">Compliance Platforms</h3>
                        <p class="text-gray-600 text-sm">Seamless connection with existing AML/KYC compliance systems</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6 text-center">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">📊</span>
                        </div>
                        <h3 class="text-lg font-semibold mb-3">Reporting Tools</h3>
                        <p class="text-gray-600 text-sm">Automated regulatory reporting and audit trail generation</p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6 text-center">
                        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🔍</span>
                        </div>
                        <h3 class="text-lg font-semibold mb-3">Risk Management</h3>
                        <p class="text-gray-600 text-sm">Advanced risk scoring and monitoring for Web3 transactions</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- The Critical Gap Aereve Fills -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">The Critical Gap Aereve Fills</h2>
                    <p class="text-lg text-gray-600">Solving the disconnect between Web3 innovation and regulatory compliance</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="bg-red-100 rounded-lg p-8 mb-6">
                            <h3 class="text-xl font-bold text-red-800 mb-4">Before Aereve</h3>
                            <ul class="text-red-700 space-y-2 text-left">
                                <li>• Siloed on-chain and off-chain data</li>
                                <li>• Manual compliance processes</li>
                                <li>• Limited regulatory visibility</li>
                                <li>• High compliance costs</li>
                                <li>• Regulatory uncertainty</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <div class="bg-blue-100 rounded-lg p-8 mb-6">
                            <h3 class="text-xl font-bold text-blue-800 mb-4">Aereve Bridge</h3>
                            <div class="text-blue-700">
                                <div class="text-4xl mb-4">🌉</div>
                                <p class="font-semibold">AI-Powered Integration</p>
                                <p class="text-sm mt-2">Seamlessly connecting Web3 and traditional finance</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <div class="bg-green-100 rounded-lg p-8 mb-6">
                            <h3 class="text-xl font-bold text-green-800 mb-4">After Aereve</h3>
                            <ul class="text-green-700 space-y-2 text-left">
                                <li>• Unified compliance view</li>
                                <li>• Automated risk assessment</li>
                                <li>• Real-time monitoring</li>
                                <li>• Reduced compliance costs</li>
                                <li>• Regulatory confidence</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Real-World Applications -->
        <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">Real-World Applications</h2>
                    <p class="text-xl">How leading institutions use Aereve for Web3 compliance</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
                        <h3 class="text-xl font-bold mb-4">🏦 Digital Asset Exchanges</h3>
                        <p class="text-blue-100 mb-4">
                            Cryptocurrency exchanges use Aereve to monitor customer transactions across multiple blockchains while maintaining traditional AML compliance.
                        </p>
                        <ul class="text-blue-100 space-y-2">
                            <li>• Cross-chain transaction monitoring</li>
                            <li>• Automated SAR generation</li>
                            <li>• Real-time risk scoring</li>
                        </ul>
                    </div>
                    
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
                        <h3 class="text-xl font-bold mb-4">🏛️ Traditional Banks</h3>
                        <p class="text-blue-100 mb-4">
                            Banks offering crypto services leverage Aereve to extend their existing compliance frameworks to digital assets.
                        </p>
                        <ul class="text-blue-100 space-y-2">
                            <li>• Integration with core banking systems</li>
                            <li>• Unified customer risk profiles</li>
                            <li>• Regulatory reporting automation</li>
                        </ul>
                    </div>
                    
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
                        <h3 class="text-xl font-bold mb-4">💳 Payment Processors</h3>
                        <p class="text-blue-100 mb-4">
                            Payment companies use Aereve to monitor crypto-to-fiat transactions and ensure compliance across jurisdictions.
                        </p>
                        <ul class="text-blue-100 space-y-2">
                            <li>• Fiat-crypto transaction analysis</li>
                            <li>• Multi-jurisdiction compliance</li>
                            <li>• Enhanced due diligence automation</li>
                        </ul>
                    </div>
                    
                    <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
                        <h3 class="text-xl font-bold mb-4">🏢 DeFi Protocols</h3>
                        <p class="text-blue-100 mb-4">
                            Decentralized finance protocols implement Aereve to add compliance layers while maintaining decentralization.
                        </p>
                        <ul class="text-blue-100 space-y-2">
                            <li>• Smart contract compliance monitoring</li>
                            <li>• Decentralized identity verification</li>
                            <li>• Automated compliance reporting</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Ready to Bridge the Gap -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Ready to Bridge the Gap in Web3 Compliance?</h2>
                    <p class="text-lg text-gray-600">Join the future of regulatory technology with Aereve's comprehensive Web3 compliance solution</p>
                </div>
                
                <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white text-center">
                    <h3 class="text-2xl font-bold mb-4">Get Started with Web3 Compliance</h3>
                    <p class="text-xl mb-8 max-w-3xl mx-auto">
                        Experience the power of unified on-chain and off-chain compliance monitoring
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                            Schedule Demo
                        </button>
                        <button class="border border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                            Download Whitepaper
                        </button>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function getPatentedTechnologyContent() {
    return `
        <!-- Patented Technology Hero -->
        <section class="bg-gradient-to-br from-green-900 via-blue-800 to-teal-900 text-white py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <div class="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        Patented Technology
                    </div>
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        Revolutionary <span class="text-green-300">Fuzzy Logic Solution</span>
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                        Breakthrough AI technology for multicultural name screening and compliance
                    </p>
                </div>
            </div>
        </section>

        <!-- HKMA GenAI Sandbox Workshop -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">HKMA GenAI Sandbox Workshop</h2>
                    <p class="text-lg text-gray-600">Leading innovation in generative AI for financial services</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Pioneering GenAI in RegTech</h3>
                        <p class="text-lg text-gray-700 mb-6">
                            Aereve is proud to be selected for the Hong Kong Monetary Authority's Generative AI Sandbox Workshop, 
                            working alongside major financial institutions to explore the future of AI in compliance.
                        </p>
                        
                        <div class="space-y-4">
                            <div class="flex items-start">
                                <div class="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-1">✓</div>
                                <div>
                                    <strong>Collaborative Innovation:</strong> Working with HSBC, Standard Chartered, Citi, and other leading banks
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-1">✓</div>
                                <div>
                                    <strong>Regulatory Guidance:</strong> Direct collaboration with HKMA on GenAI applications
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-1">✓</div>
                                <div>
                                    <strong>Future-Ready Solutions:</strong> Developing next-generation compliance technology
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <img src="assets/hkma-genai-sandbox.png" alt="HKMA GenAI Sandbox" class="rounded-lg shadow-lg mx-auto">
                    </div>
                </div>
            </div>
        </section>

        <!-- Technology Partners -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Technology Partners</h2>
                    <p class="text-lg text-gray-600">Powered by industry-leading cloud and AI platforms</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-white rounded-lg shadow-md p-8 text-center">
                        <img src="assets/microsoft-azure-logo.png" alt="Microsoft Azure" class="h-16 mx-auto mb-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Microsoft Azure</h3>
                        <p class="text-gray-600">
                            Leveraging Azure's AI and machine learning capabilities for advanced name screening and pattern recognition.
                        </p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-8 text-center">
                        <img src="assets/aws-logo.png" alt="Amazon Web Services" class="h-16 mx-auto mb-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Amazon Web Services</h3>
                        <p class="text-gray-600">
                            Utilizing AWS's scalable infrastructure and AI services for real-time compliance monitoring and analysis.
                        </p>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-8 text-center">
                        <img src="assets/google-cloud-logo.png" alt="Google Cloud Platform" class="h-16 mx-auto mb-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Google Cloud Platform</h3>
                        <p class="text-gray-600">
                            Integrating Google Cloud's natural language processing and translation services for multicultural compliance.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Fuzzy Logic Solution -->
        <section class="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">Revolutionary Fuzzy Logic Technology</h2>
                    <p class="text-xl">Solving the complexity of multicultural name screening</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 class="text-2xl font-bold mb-6">Advanced Pattern Recognition</h3>
                        <p class="text-lg text-green-100 mb-6">
                            Our patented fuzzy logic algorithm addresses the unique challenges of Asian name variations, 
                            transliterations, and cultural naming conventions that traditional systems miss.
                        </p>
                        
                        <div class="space-y-4">
                            <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                                <h4 class="font-semibold mb-2">🧠 Intelligent Matching</h4>
                                <p class="text-green-100 text-sm">
                                    Advanced algorithms that understand cultural naming patterns and variations
                                </p>
                            </div>
                            <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                                <h4 class="font-semibold mb-2">🌏 Multicultural Support</h4>
                                <p class="text-green-100 text-sm">
                                    Specialized handling of Asian languages, transliterations, and naming conventions
                                </p>
                            </div>
                            <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                                <h4 class="font-semibold mb-2">⚡ Real-time Processing</h4>
                                <p class="text-green-100 text-sm">
                                    Lightning-fast screening without compromising accuracy or cultural sensitivity
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <img src="assets/fuzzy-logic-diagram.png" alt="Fuzzy Logic Technology" class="rounded-lg shadow-lg mx-auto">
                    </div>
                </div>
            </div>
        </section>

        <!-- Industry Pain Points -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Industry Pain Points We Solve</h2>
                    <p class="text-lg text-gray-600">Addressing critical challenges in multicultural compliance</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-6">
                        <h3 class="text-xl font-bold text-gray-900">Traditional System Limitations</h3>
                        
                        <div class="bg-red-50 border-l-4 border-red-500 p-6">
                            <h4 class="font-semibold text-red-800 mb-3">❌ High False Positives</h4>
                            <p class="text-red-700">
                                Traditional systems generate 95%+ false positives for Asian names, overwhelming compliance teams with manual reviews.
                            </p>
                        </div>
                        
                        <div class="bg-red-50 border-l-4 border-red-500 p-6">
                            <h4 class="font-semibold text-red-800 mb-3">❌ Cultural Insensitivity</h4>
                            <p class="text-red-700">
                                Existing solutions fail to understand cultural naming conventions, transliterations, and regional variations.
                            </p>
                        </div>
                        
                        <div class="bg-red-50 border-l-4 border-red-500 p-6">
                            <h4 class="font-semibold text-red-800 mb-3">❌ Manual Intensive</h4>
                            <p class="text-red-700">
                                Compliance teams spend 80% of their time on manual reviews instead of strategic risk management.
                            </p>
                        </div>
                    </div>
                    
                    <div class="space-y-6">
                        <h3 class="text-xl font-bold text-gray-900">Aereve's Solutions</h3>
                        
                        <div class="bg-green-50 border-l-4 border-green-500 p-6">
                            <h4 class="font-semibold text-green-800 mb-3">✅ 90% False Positive Reduction</h4>
                            <p class="text-green-700">
                                Our fuzzy logic technology dramatically reduces false positives while maintaining 100% regulatory compliance.
                            </p>
                        </div>
                        
                        <div class="bg-green-50 border-l-4 border-green-500 p-6">
                            <h4 class="font-semibold text-green-800 mb-3">✅ Cultural Intelligence</h4>
                            <p class="text-green-700">
                                Deep understanding of Asian naming patterns, transliterations, and cultural variations built into our AI.
                            </p>
                        </div>
                        
                        <div class="bg-green-50 border-l-4 border-green-500 p-6">
                            <h4 class="font-semibold text-green-800 mb-3">✅ Automated Processing</h4>
                            <p class="text-green-700">
                                Intelligent automation allows compliance teams to focus on high-value strategic activities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Global Recognition -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Global Recognition</h2>
                    <p class="text-lg text-gray-600">International acknowledgment of our innovative technology</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div class="bg-white rounded-lg shadow-md p-6 text-center">
                        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🏆</span>
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">FinCrimeTech50</h3>
                        <p class="text-gray-600 text-sm">Global Top 50 Financial Crime Technology Companies 2025</p>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6 text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🤝</span>
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">Banking Collaboration</h3>
                        <p class="text-gray-600 text-sm">Industry Collaboration Award with Citibank Hong Kong</p>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6 text-center">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">⭐</span>
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">Rising Star</h3>
                        <p class="text-gray-600 text-sm">Regulation Asia Rising Star for Sanctions Screening</p>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6 text-center">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🏛️</span>
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">HKMA Recognition</h3>
                        <p class="text-gray-600 text-sm">Selected for GenAI Sandbox Workshop Program</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="py-16 bg-gradient-to-r from-green-600 to-teal-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl font-bold mb-4">Experience Our Patented Technology</h2>
                <p class="text-xl mb-8 max-w-3xl mx-auto">
                    See how our revolutionary fuzzy logic solution can transform your compliance operations
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button class="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Request Technology Demo
                    </button>
                    <button class="border border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Download Technical Whitepaper
                    </button>
                </div>
            </div>
        </section>
    `;
}

function getWhyAereveContent() {
    return `
        <!-- Why Aereve Hero -->
        <section class="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        Why Choose <span class="text-pink-300">Aereve</span>?
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                        Unmatched expertise in multicultural compliance with proven results across global markets
                    </p>
                </div>
            </div>
        </section>

        <!-- Client Success Stories -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
                    <p class="text-lg text-gray-600">Real results from leading financial institutions</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Citibank Success Story -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
                        <div class="flex items-center mb-6">
                            <img src="assets/citibank-logo.png" alt="Citibank" class="h-12 mr-4">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">Citibank Hong Kong</h3>
                                <p class="text-gray-600">Global Investment Bank</p>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-3 gap-4 mb-6">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-blue-600">90%</div>
                                <div class="text-sm text-gray-600">False Positive Reduction</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-green-600">75%</div>
                                <div class="text-sm text-gray-600">Time Savings</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-purple-600">100%</div>
                                <div class="text-sm text-gray-600">Compliance Rate</div>
                            </div>
                        </div>
                        
                        <blockquote class="text-gray-700 italic mb-4">
                            "Aereve's AI-powered platform has revolutionized our compliance operations. The cultural intelligence 
                            in their name screening solution is unmatched, especially for our diverse Asian client base."
                        </blockquote>
                        
                        <div class="text-sm text-gray-600">
                            <strong>Challenge:</strong> High false positive rates in Asian name screening<br>
                            <strong>Solution:</strong> Aereve's fuzzy logic technology<br>
                            <strong>Result:</strong> Banking Industry Collaboration Award 2024
                        </div>
                    </div>
                    
                    <!-- ZA Bank Success Story -->
                    <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-8">
                        <div class="flex items-center mb-6">
                            <img src="assets/za-bank-logo.png" alt="ZA Bank" class="h-12 mr-4">
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">ZA Bank</h3>
                                <p class="text-gray-600">Virtual Banking Pioneer</p>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-3 gap-4 mb-6">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-blue-600">85%</div>
                                <div class="text-sm text-gray-600">Processing Speed Increase</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-green-600">60%</div>
                                <div class="text-sm text-gray-600">Cost Reduction</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-purple-600">24/7</div>
                                <div class="text-sm text-gray-600">Automated Monitoring</div>
                            </div>
                        </div>
                        
                        <blockquote class="text-gray-700 italic mb-4">
                            "As a digital-first bank, we needed a compliance solution that could scale with our rapid growth. 
                            Aereve's platform provides the automation and accuracy we require for our virtual banking operations."
                        </blockquote>
                        
                        <div class="text-sm text-gray-600">
                            <strong>Challenge:</strong> Scaling compliance for digital banking<br>
                            <strong>Solution:</strong> Automated KYC/AML platform<br>
                            <strong>Result:</strong> Seamless regulatory compliance at scale
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- HKMA Recognition & Collaboration -->
        <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">HKMA Recognition & Collaboration</h2>
                    <p class="text-xl">Leading innovation in regulatory technology with Hong Kong's central bank</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 class="text-2xl font-bold mb-6">GenAI Sandbox Workshop</h3>
                        <p class="text-lg text-blue-100 mb-6">
                            Selected by the Hong Kong Monetary Authority to participate in the prestigious GenAI Sandbox Workshop, 
                            collaborating with major financial institutions to explore the future of AI in financial services.
                        </p>
                        
                        <div class="space-y-4">
                            <div class="flex items-start">
                                <div class="w-6 h-6 bg-blue-300 rounded-full flex items-center justify-center text-sm mr-3 mt-1 text-blue-900">✓</div>
                                <div>
                                    <strong>Regulatory Leadership:</strong> Working directly with HKMA on AI governance frameworks
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-6 h-6 bg-blue-300 rounded-full flex items-center justify-center text-sm mr-3 mt-1 text-blue-900">✓</div>
                                <div>
                                    <strong>Industry Collaboration:</strong> Partnering with HSBC, Standard Chartered, Citi, and other leading banks
                                </div>
                            </div>
                            <div class="flex items-start">
                                <div class="w-6 h-6 bg-blue-300 rounded-full flex items-center justify-center text-sm mr-3 mt-1 text-blue-900">✓</div>
                                <div>
                                    <strong>Innovation Focus:</strong> Developing next-generation GenAI applications for compliance
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <img src="assets/hkma-collaboration.png" alt="HKMA Collaboration" class="rounded-lg shadow-lg mx-auto">
                    </div>
                </div>
            </div>
        </section>

        <!-- "East Meets West" Philosophy -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">"East Meets West" Philosophy</h2>
                    <p class="text-lg text-gray-600">Bridging cultural and regulatory differences with AI-powered intelligence</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="text-3xl">🏮</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Eastern Expertise</h3>
                        <ul class="text-gray-600 space-y-2">
                            <li>• Deep understanding of Asian naming conventions</li>
                            <li>• Cultural sensitivity in compliance processes</li>
                            <li>• Regional regulatory expertise (APAC)</li>
                            <li>• Multilingual support and transliteration</li>
                        </ul>
                    </div>
                    
                    <div class="text-center">
                        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="text-3xl">🌉</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Bridging Technology</h3>
                        <ul class="text-gray-600 space-y-2">
                            <li>• AI-powered cultural intelligence</li>
                            <li>• Cross-cultural pattern recognition</li>
                            <li>• Unified compliance frameworks</li>
                            <li>• Seamless integration capabilities</li>
                        </ul>
                    </div>
                    
                    <div class="text-center">
                        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span class="text-3xl">🏛️</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Western Standards</h3>
                        <ul class="text-gray-600 space-y-2">
                            <li>• International regulatory compliance</li>
                            <li>• Global best practices implementation</li>
                            <li>• Enterprise-grade security and reliability</li>
                            <li>• Standardized reporting and documentation</li>
                        </ul>
                    </div>
                </div>
                
                <div class="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
                    <h3 class="text-2xl font-bold mb-4">The Result: Unmatched Multicultural Compliance</h3>
                    <p class="text-lg text-blue-100 max-w-3xl mx-auto">
                        Our unique "East Meets West" approach delivers compliance solutions that understand both 
                        cultural nuances and regulatory requirements, providing unparalleled accuracy and efficiency 
                        in global financial markets.
                    </p>
                </div>
            </div>
        </section>

        <!-- Unmatched Competitive Advantages -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Unmatched Competitive Advantages</h2>
                    <p class="text-lg text-gray-600">Why leading institutions choose Aereve over traditional solutions</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-6">
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-6">
                            <h3 class="text-lg font-bold text-blue-800 mb-3">🧠 Patented AI Technology</h3>
                            <p class="text-blue-700">
                                Our proprietary fuzzy logic algorithms are specifically designed for multicultural name screening, 
                                delivering 90% false positive reduction while maintaining 100% compliance.
                            </p>
                        </div>
                        
                        <div class="bg-green-50 border-l-4 border-green-500 p-6">
                            <h3 class="text-lg font-bold text-green-800 mb-3">🌏 Cultural Intelligence</h3>
                            <p class="text-green-700">
                                Deep understanding of Asian naming conventions, transliterations, and cultural variations 
                                that traditional Western-centric systems completely miss.
                            </p>
                        </div>
                        
                        <div class="bg-purple-50 border-l-4 border-purple-500 p-6">
                            <h3 class="text-lg font-bold text-purple-800 mb-3">🏆 Proven Track Record</h3>
                            <p class="text-purple-700">
                                Award-winning solutions trusted by major financial institutions, with recognition from 
                                FinCrimeTech50, Regulation Asia, and Thomson Reuters.
                            </p>
                        </div>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6">
                            <h3 class="text-lg font-bold text-yellow-800 mb-3">⚡ Real-time Processing</h3>
                            <p class="text-yellow-700">
                                Lightning-fast screening and monitoring capabilities that scale with your business growth, 
                                from startup to enterprise-level transaction volumes.
                            </p>
                        </div>
                        
                        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-6">
                            <h3 class="text-lg font-bold text-indigo-800 mb-3">🔗 Seamless Integration</h3>
                            <p class="text-indigo-700">
                                Easy integration with existing systems through APIs, with support for both cloud and 
                                on-premise deployments to meet your security and compliance requirements.
                            </p>
                        </div>
                        
                        <div class="bg-red-50 border-l-4 border-red-500 p-6">
                            <h3 class="text-lg font-bold text-red-800 mb-3">🛡️ Regulatory Expertise</h3>
                            <p class="text-red-700">
                                Direct collaboration with regulators like HKMA ensures our solutions meet current and 
                                future compliance requirements across multiple jurisdictions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Comparison Table -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Aereve vs. Traditional Solutions</h2>
                    <p class="text-lg text-gray-600">See the difference our technology makes</p>
                </div>
                
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <table class="w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                                <th class="px-6 py-4 text-center text-sm font-semibold text-green-600">Aereve</th>
                                <th class="px-6 py-4 text-center text-sm font-semibold text-gray-600">Traditional Solutions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr>
                                <td class="px-6 py-4 text-sm text-gray-900">False Positive Rate</td>
                                <td class="px-6 py-4 text-center text-sm text-green-600 font-semibold">5-10%</td>
                                <td class="px-6 py-4 text-center text-sm text-red-600 font-semibold">95%+</td>
                            </tr>
                            <tr class="bg-gray-50">
                                <td class="px-6 py-4 text-sm text-gray-900">Asian Name Accuracy</td>
                                <td class="px-6 py-4 text-center text-sm text-green-600 font-semibold">95%+</td>
                                <td class="px-6 py-4 text-center text-sm text-red-600 font-semibold">30-50%</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 text-sm text-gray-900">Cultural Intelligence</td>
                                <td class="px-6 py-4 text-center text-sm text-green-600 font-semibold">✓ Built-in</td>
                                <td class="px-6 py-4 text-center text-sm text-red-600 font-semibold">✗ Limited</td>
                            </tr>
                            <tr class="bg-gray-50">
                                <td class="px-6 py-4 text-sm text-gray-900">Implementation Time</td>
                                <td class="px-6 py-4 text-center text-sm text-green-600 font-semibold">2-4 weeks</td>
                                <td class="px-6 py-4 text-center text-sm text-red-600 font-semibold">6-12 months</td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 text-sm text-gray-900">Real-time Processing</td>
                                <td class="px-6 py-4 text-center text-sm text-green-600 font-semibold">✓ Yes</td>
                                <td class="px-6 py-4 text-center text-sm text-red-600 font-semibold">✗ Batch only</td>
                            </tr>
                            <tr class="bg-gray-50">
                                <td class="px-6 py-4 text-sm text-gray-900">Regulatory Updates</td>
                                <td class="px-6 py-4 text-center text-sm text-green-600 font-semibold">✓ Automatic</td>
                                <td class="px-6 py-4 text-center text-sm text-red-600 font-semibold">✗ Manual</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl font-bold mb-4">Ready to Experience the Aereve Advantage?</h2>
                <p class="text-xl mb-8 max-w-3xl mx-auto">
                    Join leading financial institutions that have transformed their compliance operations with our AI-powered solutions
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button class="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Schedule Consultation
                    </button>
                    <button class="border border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Download Case Studies
                    </button>
                </div>
            </div>
        </section>
    `;
}

function getCompanyContent() {
    return `
        <!-- Company Hero -->
        <section class="bg-gradient-to-br from-gray-900 via-blue-800 to-indigo-900 text-white py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        About <span class="text-blue-300">Aereve</span>
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                        Pioneering AI-powered regulatory technology for a multicultural world
                    </p>
                </div>
            </div>
        </section>

        <!-- Mission & Vision -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p class="text-lg text-gray-700 mb-6">
                            To revolutionize regulatory compliance through AI-powered solutions that understand and bridge 
                            cultural differences, making financial services more inclusive and accessible for everyone.
                        </p>
                        <p class="text-gray-600">
                            We believe that effective compliance should not be hindered by cultural barriers or linguistic 
                            differences. Our technology ensures that financial institutions can serve diverse communities 
                            while maintaining the highest standards of regulatory compliance.
                        </p>
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                        <p class="text-lg text-gray-700 mb-6">
                            To become the global leader in multicultural compliance technology, enabling financial institutions 
                            worldwide to serve diverse populations with confidence and efficiency.
                        </p>
                        <p class="text-gray-600">
                            We envision a world where regulatory compliance enhances rather than hinders financial inclusion, 
                            where cultural intelligence is built into every compliance process, and where technology serves 
                            as a bridge between different communities and regulatory frameworks.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Company Values -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                    <p class="text-lg text-gray-600">The principles that guide everything we do</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🌍</span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Cultural Intelligence</h3>
                        <p class="text-gray-600 text-sm">
                            We embrace diversity and build cultural understanding into every solution we create.
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🚀</span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Innovation</h3>
                        <p class="text-gray-600 text-sm">
                            We continuously push the boundaries of what's possible in regulatory technology.
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🤝</span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Partnership</h3>
                        <p class="text-gray-600 text-sm">
                            We work closely with clients and regulators to build solutions that serve everyone.
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🎯</span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Excellence</h3>
                        <p class="text-gray-600 text-sm">
                            We strive for the highest quality in everything we deliver to our clients.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Company Timeline -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
                    <p class="text-lg text-gray-600">Key milestones in Aereve's growth and innovation</p>
                </div>
                
                <div class="relative">
                    <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
                    
                    <div class="space-y-12">
                        <div class="flex items-center">
                            <div class="flex-1 text-right pr-8">
                                <h3 class="text-lg font-semibold text-gray-900">Company Founded</h3>
                                <p class="text-gray-600">Aereve established with a vision to revolutionize multicultural compliance</p>
                            </div>
                            <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                                2020
                            </div>
                            <div class="flex-1 pl-8"></div>
                        </div>
                        
                        <div class="flex items-center">
                            <div class="flex-1 pr-8"></div>
                            <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                                2021
                            </div>
                            <div class="flex-1 text-left pl-8">
                                <h3 class="text-lg font-semibold text-gray-900">First Client Success</h3>
                                <p class="text-gray-600">Successful deployment with major financial institution, proving our technology</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center">
                            <div class="flex-1 text-right pr-8">
                                <h3 class="text-lg font-semibold text-gray-900">Patent Granted</h3>
                                <p class="text-gray-600">Received patent for our revolutionary fuzzy logic technology</p>
                            </div>
                            <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                                2022
                            </div>
                            <div class="flex-1 pl-8"></div>
                        </div>
                        
                        <div class="flex items-center">
                            <div class="flex-1 pr-8"></div>
                            <div class="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                                2023
                            </div>
                            <div class="flex-1 text-left pl-8">
                                <h3 class="text-lg font-semibold text-gray-900">Industry Recognition</h3>
                                <p class="text-gray-600">Multiple awards including Thomson Reuters RegTech Innovation Award</p>
                            </div>
                        </div>
                        
                        <div class="flex items-center">
                            <div class="flex-1 text-right pr-8">
                                <h3 class="text-lg font-semibold text-gray-900">HKMA Collaboration</h3>
                                <p class="text-gray-600">Selected for HKMA GenAI Sandbox Workshop with major banks</p>
                            </div>
                            <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                                2024
                            </div>
                            <div class="flex-1 pl-8"></div>
                        </div>
                        
                        <div class="flex items-center">
                            <div class="flex-1 pr-8"></div>
                            <div class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                                2025
                            </div>
                            <div class="flex-1 text-left pl-8">
                                <h3 class="text-lg font-semibold text-gray-900">Global Expansion</h3>
                                <p class="text-gray-600">FinCrimeTech50 recognition and expansion into new markets</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Team Highlights -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
                    <p class="text-lg text-gray-600">Experienced leaders driving innovation in regulatory technology</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div class="bg-white rounded-lg shadow-md p-8 text-center">
                        <img src="assets/andre-leung.png" alt="Andre Leung" class="w-24 h-24 rounded-full mx-auto mb-4">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Andre Leung (梁偉健)</h3>
                        <p class="text-blue-600 font-semibold mb-3">Co-Founder & CEO</p>
                        <p class="text-gray-600 text-sm">
                            Visionary leader with extensive experience in financial services and regulatory technology. 
                            Drives Aereve's strategic direction and client relationships.
                        </p>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-8 text-center">
                        <img src="assets/terry-ng.png" alt="Terry Ng" class="w-24 h-24 rounded-full mx-auto mb-4">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Terry Ng</h3>
                        <p class="text-blue-600 font-semibold mb-3">Co-Founder & CTO</p>
                        <p class="text-gray-600 text-sm">
                            Technology innovator and AI expert leading the development of Aereve's patented 
                            fuzzy logic algorithms and platform architecture.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Company Culture -->
        <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">Our Culture</h2>
                    <p class="text-xl">Building a diverse, innovative, and inclusive workplace</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🌟</span>
                        </div>
                        <h3 class="text-lg font-bold mb-3">Small Team, Big Impact</h3>
                        <p class="text-blue-100">
                            Every team member makes a significant contribution to our mission and has the opportunity 
                            to shape the future of regulatory technology.
                        </p>
                    </div>
                    
                    <div class="text-center">
                        <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🌍</span>
                        </div>
                        <h3 class="text-lg font-bold mb-3">Global Reach</h3>
                        <p class="text-blue-100">
                            With offices in Hong Kong and Singapore, we serve clients across Asia-Pacific and beyond, 
                            bringing diverse perspectives to every project.
                        </p>
                    </div>
                    
                    <div class="text-center">
                        <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-2xl">🏆</span>
                        </div>
                        <h3 class="text-lg font-bold mb-3">Award-Winning Culture</h3>
                        <p class="text-blue-100">
                            Our commitment to excellence and innovation has been recognized by industry leaders 
                            and regulatory authorities worldwide.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">Join Our Mission</h2>
                <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    Be part of the team that's revolutionizing regulatory compliance for a multicultural world
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button class="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                        View Career Opportunities
                    </button>
                    <button class="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                        Partner With Us
                    </button>
                </div>
            </div>
        </section>
    `;
}

function getResourcesContent() {
    return `
        <!-- Resources Hero -->
        <section class="bg-gradient-to-br from-teal-900 via-blue-800 to-cyan-900 text-white py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">
                        Resources & <span class="text-cyan-300">Insights</span>
                    </h1>
                    <p class="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
                        Stay informed with the latest in regulatory technology and compliance best practices
                    </p>
                </div>
            </div>
        </section>

        <!-- Featured Reports -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Featured Reports</h2>
                    <p class="text-lg text-gray-600">In-depth analysis and insights from industry experts</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                                <span class="text-white text-xl">📊</span>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">FinCrimeTech50 Report 2025</h3>
                                <p class="text-blue-600 font-semibold">Global Top 50 Recognition</p>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-6">
                            Comprehensive analysis of the world's most innovative financial crime technology companies, 
                            featuring Aereve's breakthrough AI-powered compliance solutions.
                        </p>
                        <div class="flex gap-3">
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Download Report
                            </button>
                            <button class="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                                View Summary
                            </button>
                        </div>
                    </div>
                    
                    <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-8">
                        <div class="flex items-center mb-4">
                            <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                                <span class="text-white text-xl">📋</span>
                            </div>
                            <div>
                                <h3 class="text-xl font-bold text-gray-900">Compliance Alert 2025</h3>
                                <p class="text-green-600 font-semibold">Regulatory Update</p>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-6">
                            Latest regulatory changes and compliance requirements across major financial markets, 
                            with practical guidance for implementation.
                        </p>
                        <div class="flex gap-3">
                            <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                Download Alert
                            </button>
                            <button class="border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Case Studies -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Case Studies</h2>
                    <p class="text-lg text-gray-600">Real-world implementations and success stories</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <img src="assets/citibank-case-study.png" alt="Citibank Case Study" class="w-full h-48 object-cover rounded-lg mb-4">
                        <h3 class="text-lg font-bold text-gray-900 mb-3">Citibank Hong Kong: 90% False Positive Reduction</h3>
                        <p class="text-gray-600 mb-4">
                            How Aereve's AI-powered platform transformed compliance operations at one of the world's largest banks.
                        </p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-blue-600 font-semibold">Banking Industry Collaboration Award</span>
                            <button class="text-blue-600 hover:text-blue-800 font-semibold">Read More →</button>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <img src="assets/za-bank-case-study.png" alt="ZA Bank Case Study" class="w-full h-48 object-cover rounded-lg mb-4">
                        <h3 class="text-lg font-bold text-gray-900 mb-3">ZA Bank: Digital Banking Compliance at Scale</h3>
                        <p class="text-gray-600 mb-4">
                            Enabling rapid growth while maintaining regulatory compliance in Hong Kong's virtual banking sector.
                        </p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-green-600 font-semibold">Virtual Banking Innovation</span>
                            <button class="text-blue-600 hover:text-blue-800 font-semibold">Read More →</button>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <img src="assets/hkma-case-study.png" alt="HKMA Case Study" class="w-full h-48 object-cover rounded-lg mb-4">
                        <h3 class="text-lg font-bold text-gray-900 mb-3">HKMA GenAI Sandbox: Future of Compliance</h3>
                        <p class="text-gray-600 mb-4">
                            Collaborating with Hong Kong's central bank to explore generative AI applications in financial services.
                        </p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-purple-600 font-semibold">Regulatory Innovation</span>
                            <button class="text-blue-600 hover:text-blue-800 font-semibold">Read More →</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Whitepapers & Guides -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Whitepapers & Guides</h2>
                    <p class="text-lg text-gray-600">Technical insights and implementation guidance</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-blue-600 text-xl">🧠</span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">AI in Regulatory Compliance</h3>
                        <p class="text-gray-600 text-sm mb-4">
                            Comprehensive guide to implementing artificial intelligence in compliance operations.
                        </p>
                        <button class="text-blue-600 hover:text-blue-800 font-semibold text-sm">Download PDF →</button>
                    </div>
                    
                    <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-green-600 text-xl">🌏</span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Multicultural Name Screening</h3>
                        <p class="text-gray-600 text-sm mb-4">
                            Best practices for handling Asian names and cultural variations in compliance systems.
                        </p>
                        <button class="text-blue-600 hover:text-blue-800 font-semibold text-sm">Download PDF →</button>
                    </div>
                    
                    <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-purple-600 text-xl">🔗</span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Web3 Compliance Framework</h3>
                        <p class="text-gray-600 text-sm mb-4">
                            Bridging on-chain and off-chain analytics for comprehensive cryptocurrency compliance.
                        </p>
                        <button class="text-blue-600 hover:text-blue-800 font-semibold text-sm">Download PDF →</button>
                    </div>
                    
                    <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-yellow-600 text-xl">⚡</span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Real-time Transaction Monitoring</h3>
                        <p class="text-gray-600 text-sm mb-4">
                            Technical guide to implementing real-time AML monitoring and suspicious activity detection.
                        </p>
                        <button class="text-blue-600 hover:text-blue-800 font-semibold text-sm">Download PDF →</button>
                    </div>
                    
                    <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-red-600 text-xl">🛡️</span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Regulatory Risk Management</h3>
                        <p class="text-gray-600 text-sm mb-4">
                            Strategic approaches to managing regulatory risk in dynamic compliance environments.
                        </p>
                        <button class="text-blue-600 hover:text-blue-800 font-semibold text-sm">Download PDF →</button>
                    </div>
                    
                    <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                            <span class="text-indigo-600 text-xl">📊</span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">Compliance Analytics & Reporting</h3>
                        <p class="text-gray-600 text-sm mb-4">
                            Advanced analytics techniques for compliance monitoring and regulatory reporting.
                        </p>
                        <button class="text-blue-600 hover:text-blue-800 font-semibold text-sm">Download PDF →</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Regulatory Updates -->
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">Regulatory Updates</h2>
                    <p class="text-lg text-gray-600">Stay current with the latest regulatory developments</p>
                </div>
                
                <div class="space-y-6">
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <div class="flex items-center mb-2">
                                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mr-3">HKMA</span>
                                    <span class="text-gray-500 text-sm">January 15, 2025</span>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                                    New Guidelines for AI in Financial Services
                                </h3>
                                <p class="text-gray-600">
                                    Hong Kong Monetary Authority releases updated guidelines for the use of artificial intelligence 
                                    in banking and financial services, including compliance applications.
                                </p>
                            </div>
                            <button class="ml-4 text-blue-600 hover:text-blue-800 font-semibold">Read More →</button>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <div class="flex items-center mb-2">
                                    <span class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded mr-3">MAS</span>
                                    <span class="text-gray-500 text-sm">January 10, 2025</span>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                                    Singapore Updates Digital Asset Regulations
                                </h3>
                                <p class="text-gray-600">
                                    Monetary Authority of Singapore announces enhanced regulatory framework for digital assets 
                                    and cryptocurrency service providers.
                                </p>
                            </div>
                            <button class="ml-4 text-blue-600 hover:text-blue-800 font-semibold">Read More →</button>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <div class="flex items-center mb-2">
                                    <span class="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded mr-3">FATF</span>
                                    <span class="text-gray-500 text-sm">January 5, 2025</span>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                                    Updated AML/CFT Standards for Virtual Assets
                                </h3>
                                <p class="text-gray-600">
                                    Financial Action Task Force publishes revised standards for anti-money laundering and 
                                    counter-terrorist financing in virtual asset activities.
                                </p>
                            </div>
                            <button class="ml-4 text-blue-600 hover:text-blue-800 font-semibold">Read More →</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Media Coverage & External Recognition -->
        <section class="py-16 bg-white">
            <div class="max-w-7
