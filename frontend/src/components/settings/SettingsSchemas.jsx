import { Settings, Globe, Bell, MessageSquare, Smartphone, Mail, CreditCard, Printer, AlignCenter, Layout, Shield, Database, Languages, DollarSign, Blocks } from 'lucide-react';

export const GeneralSettingsSchema = {
    title: "General Setting",
    description: "Manage core school details and basic configurations.",
    icon: Globe,
    schema: [
        { key: 'school_name', label: 'School Name', required: true, placeholder: 'Thomson School' },
        { key: 'school_code', label: 'School Code', required: true, placeholder: 'TS001' },
        { key: 'school_address', label: 'Address', type: 'textarea', required: true, placeholder: '123 Main St, City' },
        { key: 'school_phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+1 234 567 8900' },
        { key: 'school_email', label: 'School Email', type: 'email', required: true, placeholder: 'admin@school.com' },
        { key: 'session_start_month', label: 'Session Start Month', type: 'select', required: true, options: [
            { label: 'January', value: '1' }, { label: 'April', value: '4' }, { label: 'July', value: '7' }
        ]}
    ]
};

export const SessionSettingsSchema = {
    title: "Session Setting",
    description: "Manage academic sessions and terms.",
    icon: Settings,
    schema: [
        { key: 'current_session', label: 'Current Academic Session', type: 'select', required: true, options: [
            { label: '2025-2026', value: '2025-2026' }, { label: '2026-2027', value: '2026-2027' }
        ]}
    ]
};

export const NotificationSettingsSchema = {
    title: "Notification Setting",
    description: "Configure system-wide notifications and alerts.",
    icon: Bell,
    schema: [
        { key: 'notify_student_absence', label: 'Student Absence Alert (Email)', type: 'select', options: [{label: 'Enable', value: 'true'}, {label: 'Disable', value: 'false'}] },
        { key: 'notify_exam_results', label: 'Exam Results Published', type: 'select', options: [{label: 'Enable', value: 'true'}, {label: 'Disable', value: 'false'}] }
    ]
};

export const WhatsappSettingsSchema = {
    title: "Whatsapp Messaging",
    description: "Configure WhatsApp API integrations.",
    icon: MessageSquare,
    schema: [
        { key: 'whatsapp_api_key', label: 'API Key', type: 'password', required: true },
        { key: 'whatsapp_number', label: 'Registered WhatsApp Number', type: 'tel', required: true }
    ]
};

export const SMSSettingsSchema = {
    title: "SMS Setting",
    description: "Configure SMS Gateway settings (Twilio, MSG91, etc.).",
    icon: Smartphone,
    schema: [
        { key: 'sms_gateway', label: 'SMS Gateway Provider', type: 'select', options: [{label:'Twilio', value:'twilio'}, {label:'MSG91', value:'msg91'}] },
        { key: 'sms_api_key', label: 'API Key / SID', type: 'password', required: true },
        { key: 'sms_sender_id', label: 'Sender ID / Token', type: 'text', required: true }
    ]
};

export const PaymentMethodsSchema = {
    title: "Payment Methods",
    description: "Configure online fee collection gateways like Stripe, PhonePe, GPay, etc.",
    icon: CreditCard,
    schema: [
        { key: 'payment_gateway', label: 'Primary Payment Gateway', type: 'select', options: [{label:'Stripe', value:'stripe'}, {label:'Razorpay', value:'razorpay'}, {label:'PayPal', value:'paypal'}] },
        { key: 'payment_api_key', label: 'Primary Public Key', type: 'text' },
        { key: 'payment_secret_key', label: 'Primary Secret Key', type: 'password' },
        { key: 'enable_phonepe', label: 'Enable PhonePe', type: 'toggle', defaultValue: 'false' },
        { key: 'enable_gpay', label: 'Enable GPay', type: 'toggle', defaultValue: 'false' },
        { key: 'enable_paytm', label: 'Enable Paytm', type: 'toggle', defaultValue: 'false' },
        { key: 'enable_cred', label: 'Enable CRED Pay', type: 'toggle', defaultValue: 'false' }
    ]
};

export const PrintHeaderSchema = {
    title: "Print Header Footer",
    description: "Configure headers and footers for printed receipts and reports.",
    icon: AlignCenter,
    schema: [
        { key: 'print_header_text', label: 'Header Text', type: 'textarea', fullWidth: true },
        { key: 'print_footer_text', label: 'Footer Text', type: 'textarea', fullWidth: true }
    ]
};

export const ThermalPrintSchema = {
    title: "Thermal Print Settings",
    description: "Configure thermal printer formats for POS fees collection.",
    icon: Printer,
    schema: [
        { key: 'thermal_print_width', label: 'Paper Width (mm)', type: 'number', placeholder: '58' },
        { key: 'thermal_print_margin', label: 'Margin (mm)', type: 'number', placeholder: '2' }
    ]
};

export const FrontCMSSchema = {
    title: "Front CMS Setting",
    description: "Manage front website integration.",
    icon: Layout,
    schema: [
        { key: 'cms_enabled', label: 'Enable Front CMS', type: 'select', options: [{label: 'Yes', value: 'yes'}, {label: 'No', value: 'no'}] },
        { key: 'cms_url', label: 'Website URL', type: 'url', placeholder: 'https://myschool.com' }
    ]
};

export const BackupRestoreSchema = {
    title: "Backup & Restore",
    description: "Manage automated database backups.",
    icon: Database,
    schema: [
        { key: 'auto_backup', label: 'Automated Backup', type: 'select', options: [{label: 'Daily', value: 'daily'}, {label: 'Weekly', value: 'weekly'}, {label: 'Disabled', value: 'disabled'}] },
        { key: 'backup_email', label: 'Send Backup to Email', type: 'email' }
    ]
};

export const LanguagesSchema = {
    title: "Languages Setting",
    description: "Configure default system language.",
    icon: Languages,
    schema: [
        { key: 'default_language', label: 'Default Language', type: 'select', options: [{label: 'English', value: 'en'}, {label: 'Spanish', value: 'es'}, {label: 'French', value: 'fr'}] }
    ]
};

export const CurrencySchema = {
    title: "Currency Setting",
    description: "Configure default currency symbol and formats.",
    icon: DollarSign,
    schema: [
        { key: 'currency_symbol', label: 'Currency Symbol', required: true, placeholder: '$' },
        { key: 'currency_code', label: 'Currency Code', required: true, placeholder: 'USD' }
    ]
};

export const ModulesSchema = {
    title: "System Modules",
    description: "Enable or disable core system modules.",
    icon: Blocks,
    schema: [
        { key: 'module_alumni', label: 'Alumni Module', type: 'select', options: [{label: 'Enable', value: 'true'}, {label: 'Disable', value: 'false'}] },
        { key: 'module_transport', label: 'Transport Module', type: 'select', options: [{label: 'Enable', value: 'true'}, {label: 'Disable', value: 'false'}] }
    ]
};
