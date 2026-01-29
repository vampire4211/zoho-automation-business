export const countryCodes = [
    { code: '+1', country: 'US', name: 'United States', flag: '🇺🇸' },
    { code: '+1', country: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: '+44', country: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+91', country: 'IN', name: 'India', flag: '🇮🇳' },
    { code: '+86', country: 'CN', name: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: '+49', country: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'FR', name: 'France', flag: '🇫🇷' },
    { code: '+39', country: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: '+61', country: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: '+55', country: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: '+7', country: 'RU', name: 'Russia', flag: '🇷🇺' },
    { code: '+82', country: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: '+34', country: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: '+52', country: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: '+971', country: 'AE', name: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+65', country: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: '+60', country: 'MY', name: 'Malaysia', flag: '🇲🇾' },
    { code: '+27', country: 'ZA', name: 'South Africa', flag: '🇿🇦' },
];

export function findCountryByCode(code: string) {
    return countryCodes.find(c => code.startsWith(c.code));
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
    // Remove spaces and check if it's a valid international format
    const cleaned = phone.replace(/\s/g, '');
    // Should start with + and have 8-15 digits
    const phoneRegex = /^\+\d{8,15}$/;
    return phoneRegex.test(cleaned);
}
