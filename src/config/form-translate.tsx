// Define mapping of English words to Persian names

const persianToEnglish: { [key: string]: string } = {
  date: "تاریخ",
  title: "عنوان",
  form_number: "شماره فرم",
  description: "توضیحات",
  accounting_document_table: "جدول اسناد حسابداری",
  appendices: "پیوست‌ها",
  rules: "قوانین",
  considerations: "ملاحظات",
  time: "زمان",
  financial_Processing: "پردازش مالی",
  audit: "حسابرسی",
  group: "گروه",
  total: "مجموع",
  moeen: "معین",
  level_4: "سطح ۴",
  level_5: "سطح ۵",
  level_6: "سطح ۶",
  debtor: "بدهکار",
  creditor: "بستانکار",
};
// Function to return the Persian name for a given text
export function getFormPersianName(text: string): string {
  return persianToEnglish[text] || text; // Return Persian name if exists, otherwise return the original text
}

// Function to return the English name for a given Persian text
function getFormEnglishName(persianText: string): string {
  const englishName = Object.keys(persianToEnglish).find(
    (key) => persianToEnglish[key] === persianText,
  );
  return englishName || persianText; // Return English name if found, otherwise return the original Persian text
}
