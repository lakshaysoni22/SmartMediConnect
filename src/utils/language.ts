// Language utility for SmartMediConnect
const LANGUAGE_KEY = 'mediconnectAppLanguage'; // Updated key for consistency

type Language = 'english' | 'hindi';
type LanguageListener = (language: Language) => void;

class LanguageManager {
  private listeners: Set<LanguageListener> = new Set();

  get(): Language {
    if (typeof window === 'undefined') return 'english';
    const stored = localStorage.getItem(LANGUAGE_KEY);
    return (stored === 'hindi' ? 'hindi' : 'english') as Language;
  }

  set(language: Language): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LANGUAGE_KEY, language);
    this.notifyListeners(language);
  }

  toggle(): void {
    const current = this.get();
    this.set(current === 'english' ? 'hindi' : 'english');
  }

  subscribe(listener: LanguageListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(language: Language): void {
    this.listeners.forEach(listener => listener(language));
  }
}

export const LanguageUtils = new LanguageManager();

// Translation helper
export const translations = {
  // Navigation
  navigation: {
    dashboard: {
      english: 'Dashboard',
      hindi: 'डैशबोर्ड'
    },
    findDoctor: {
      english: 'Find a Doctor',
      hindi: 'डॉक्टर खोजें'
    },
    appointments: {
      english: 'Appointments',
      hindi: 'अपॉइंटमेंट'
    },
    healthBot: {
      english: 'Health Bot',
      hindi: 'हेल्थ बॉट'
    },
    messages: {
      english: 'Messages',
      hindi: 'संदेश'
    },
    testResults: {
      english: 'Test Results',
      hindi: 'टेस्ट रिपोर्ट'
    },
    prescriptions: {
      english: 'Prescriptions',
      hindi: 'प्रिस्क्रिप्शन'
    },
    settings: {
      english: 'Settings',
      hindi: 'सेटिंग्स'
    },
    emergency: {
      english: 'Emergency Support',
      hindi: 'आपातकालीन सहायता'
    }
  },
  
  // Settings
  settings: {
    title: {
      english: 'Settings',
      hindi: 'सेटिंग्स'
    },
    subtitle: {
      english: 'Manage your profile information and app preferences',
      hindi: 'अपनी प्रोफ़ाइल जानकारी और ऐप प्राथमिकताएं प्रबंधित करें'
    },
    language: {
      english: 'Language',
      hindi: 'भाषा'
    },
    languageDesc: {
      english: 'Choose your preferred language',
      hindi: 'अपनी पसंदीदा भाषा चुनें'
    },
    darkMode: {
      english: 'Dark Mode',
      hindi: 'डार्क मोड'
    },
    darkModeDesc: {
      english: 'Switch to dark appearance',
      hindi: 'डार्क स्वरूप में बदलें'
    }
  },
  
  // Common
  common: {
    logout: {
      english: 'Logout',
      hindi: 'लॉगआउट'
    },
    save: {
      english: 'Save',
      hindi: 'सहेजें'
    },
    cancel: {
      english: 'Cancel',
      hindi: 'रद्द करें'
    }
  }
};

// Helper function to get translated text
export function t(path: string, language: Language = LanguageUtils.get()): string {
  const keys = path.split('.');
  let value: any = translations;
  
  for (const key of keys) {
    value = value?.[key];
    if (!value) return path;
  }
  
  return value[language] || value.english || path;
}