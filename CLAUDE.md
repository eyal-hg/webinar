# HK Elite Partner — מאגר עזר ל-Claude

קובץ זה הוא ה"מצפן" של הפרויקט. כשמתחילים סשן חדש — זה הקובץ הראשון שצריך לקרוא.

---

## מה זה הפרויקט

**דף נחיתה יחיד של תוכנית "HK Elite Partner"** — תוכנית השותפות הבלעדית של HK Money עם רואי חשבון.

| נתיב | קהל | מטרה |
|---|---|---|
| `/index.html` | רואי חשבון | להצטרף לתוכנית השותפות |

ה-URL הסופי הצפוי: `partners.hak.co.il` (subdomain שיוגדר ב-Netlify).
המוצר ללקוחות עצמו (`money.hak.co.il`) חי בפרויקט נפרד.

---

## חומרי עזר חיצוניים — קריאת חובה

לפני כל עבודה בפרויקט קרא בסדר הזה:

1. `HK-Elite-Partner-Brief.md` (בשורש) — הברייף המלא של תוכנית השותפות
2. `~/Downloads/HKmoney-Design-SKILL.md` — שפת העיצוב (Rubik, פלטה, נכסים)
3. `~/Downloads/HKmoney-Copywriting-SKILL-v2.md` — שפת הקופי (3 שכבות, מילים אסורות, hooks)

**עיקרון על:** אסור להמציא קומפוננטות, פלטות, או פונטים חדשים. רק שימוש מחדש בקיים.

---

## ארכיטקטורה

```
hk-accountant/
├── index.html                    דף הנחיתה — HK Elite Partner
├── privacy.html                  מדיניות פרטיות
├── CLAUDE.md                     הקובץ הזה
├── HK-Elite-Partner-Brief.md     הברייף המקורי
├── css/
│   ├── money.css                 בסיס — header, hero, buttons, footer, mobile rules
│   ├── hk-money-ai.css           הרחבה — divider-title, faq, contact (כחול+טופס)
│   ├── partners.css              הרחבה — hero/pain/benefits/how/commission/mockup/form
│   └── style.css                 (legacy)
├── js/
│   ├── money.js                  אינטראקציה כללית (nav toggle, וכו')
│   ├── hk-money-ai-extra.js      תוספות (לא קריטיות לדף הזה)
│   └── animations.js             אנימציות גלילה
└── assets/                       תמונות, לוגואים, אייקונים
```

> הערה: זוהי תיקיית שכפול של פרויקט money.hak.co.il שעברה התאמה לדף ה-Elite Partner. קבצי `css/money.css` ו-`css/hk-money-ai.css` מכילים סטיילים שלא בשימוש בדף הזה — מותר לטהר אותם בעתיד אבל לא קריטי.

---

## שפת העיצוב — תקציר

- **פונט:** Rubik בלבד. (Karantina לא בשימוש בדף הזה — הוא שמור ל-Hero של money.hak.co.il.)
- **פלטה:**
  - Primary Dark `#0c4068` (navy) — כותרות, רקע כהה (סקשן עמלה), אמינות
  - Accent Blue `#39abe2` — קישורים, אייקונים, הדגשות משניות
  - Accent Warm `#e48375` (salmon) — מילת מפתח רגשית, CTAs חמים, תווית "כאן תופיע התמונה שלך"
  - Off-white `#fffefe` / `#eef4f9` — רקעים
- **כיוון:** RTL מלא בעברית.
- **אסור:** יותר מ-3 צבעים בקומפוזיציה אחת, גרדיאנטים מורכבים, אנימציות מסיחות.

CSS variables מוגדרים ב-`:root` בתוך `money.css`: `--navy`, `--blue`, `--salmon`, `--off`, `--text`, `--muted`, `--border`, `--font`, `--max-w`, `--hdr-h`.

---

## מבנה הדף

11 סקשנים, בסדר:

1. **Header** — לוגו (קישור ל-money.hak.co.il), ניווט עוגנים, CTA
2. **Hero** — `partners-hero` — תגית, H1 ("תכל'ס, אתה רואה חשבון. לא מנהל כספים."), subhead, CTA
3. **Pain** — `partners-pain` — 6 בועות שאלות שלקוחות שואלים את רואה החשבון
4. **Value** — `partners-value` — "עכשיו יש לך תשובה" + תיאור המוצר
5. **6 Benefits** — `partners-benefits` — Grid 3×2 של ערכים
6. **How** — `partners-how` — Timeline של 5 שלבים
7. **Commission** — `partners-commission` — סקשן Primary Dark עם 3 פלייס-הולדרים בולטים
8. ⭐ **Mockup** — `partners-mockup` — תצוגה סטטית של הדף האישי שרואה החשבון יקבל. כולל מסגרת דפדפן, תווית salmon "כאן תופיע התמונה שלך", ומיני-preview של money.hak.co.il
9. **FAQ** — `ai-faq` — 8 שאלות רלוונטיות לרואי חשבון
10. **Form** — `mn-contact partners-form` — טופס "בדוק התאמה" עם 7 שדות
11. **Footer** — `mn-footer` — לוגו, רשתות, זכויות יוצרים, קישור ל-money.hak.co.il

---

## Placeholders פתוחים

מסומנים ב-`[PLACEHOLDER: …]` במקומות הבאים — קל למצוא ב-Find:

- כרטיס "עמלה על כל הפנייה" (סקשן 6 הערכים)
- 3 שורות בסקשן `partners-commission` — סכום עמלה, מבנה תשלום, סכום שנתי
- שאלה "מתי אני מקבל את העמלה?" ב-FAQ

מחכים להחלטה של אייל ואופיר על מודל העמלה הסופי.

---

## קונבנציות

- **בעברית בלבד בקופי.** שמות מותגים נשארים באנגלית: HK Money, HK Elite Partner, AI, Bizibox.
- **מילים אסורות בקופי:** מהפכני, חדשני, פורץ דרך, אוטונומי, סוגר פינה. ראה את ה-Copywriting Skill לרשימה מלאה.
- **CTA אחד** — "בדוק התאמה לתוכנית" / "בדוק התאמה". ה-CTA מופיע בכמה מקומות בדף, אבל תמיד מוביל לאותו טופס בתחתית.
- **קישורים חיצוניים** — `https://money.hak.co.il` בלוגו, ב-nav ("המוצר ללקוחות") ובפוטר.

---

## משימות פתוחות

- [ ] להגדיר subdomain `partners.hak.co.il` ב-Netlify (כרגע יושב ב-root של ההעלאה).
- [ ] להחליף את ה-placeholders של העמלה אחרי החלטת אייל+אופיר.
- [ ] להחליף את תמונת ה-mockup הגנרית ב-silhouette/סטוק קבוע (כרגע SVG אווטאר).
- [ ] לחבר את הטופס ל-CRM (כרגע `onsubmit="return false"`).
- [ ] (בפרויקט money.hak.co.il, לא כאן) להוסיף תמיכה ב-`?ref=<partner-key>` שיציג את שם רואה החשבון בראש הדף + מצרף ref לטופס. הקוד נבנה כאן בעבר ונמחק כי שייך לפרויקט אחר.

---

## לוג עדכונים

| תאריך | מה עודכן | מי |
|--------|----------|-----|
| 2026-05-10 | יצירה ראשונית — דף Elite Partner מלא, partners.css, mockup section ⭐ | אייל + Claude |
| 2026-05-10 | קונסולידציה — דף השותפים הועבר ל-`/index.html` ראשי. נוקו קבצי page-2 (partners-ref.js, partners-data.json, partner-strip CSS, footer link) | אייל + Claude |
