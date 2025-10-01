export const Currencies = [
    {value: "USD", label: "$ Dollar", locale: "en-US"},
    {value: "EUR", label: "€ Euro", locale: "de-DE"},
    {value: "GBP", label: "£ Pound", locale: "en-GB"},
    {value: "JPY", label: "¥ Yen", locale: "ja-JP"},
    {value: "IDR", label: "Rp Indonesian Rupiah", locale: "id-ID"},
    {value: "CNY", label: "¥ Chinese Yuan", locale: "zh-CN"},
    {value: "RUB", label: "₽ Russian Ruble", locale: "ru-RU"},
    {value: "KRW", label: "₩ South Korean Won", locale: "ko-KR"},
    {value: "THB", label: "฿ Thai Baht", locale: "th-TH"},
    {value: "MYR", label: "RM Malaysian Ringgit", locale: "ms-MY"},
    {value: "PHP", label: "₱ Philippine Peso", locale: "fil-PH"},
    {value: "VND", label: "₫ Vietnamese Dong", locale: "vi-VN"},
];

export type Currency = (typeof Currencies)[0];