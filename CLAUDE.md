# HK Elite Partner — מאגר עזר ל-Claude

קובץ זה הוא ה"מצפן" של הפרויקט. כשמתחילים סשן חדש — זה הקובץ הראשון שצריך לקרוא.

---

## מה זה הפרויקט

תוכנית **HK Elite Partner** — שותפות בלעדית עם רואי חשבון. הפרויקט מכיל **שני דפים**:

| נתיב | מה זה | קהל |
|---|---|---|
| `/index.html` | דף הנחיתה של תוכנית השותפות | רואי חשבון |
| `/partner-landing.html` | שכפול של hak.co.il + ראש מותאם דרך `?ref=<key>` | בעלי עסקים שהופנו ע"י רואה חשבון |

הקשר ביניהם: בדף ה-Elite Partner יש סקשן `partners-demo-cta` (id=`mockup`) עם כפתור שפותח את `/partner-landing.html?ref=demo` בטאב חדש — כך רואה החשבון רואה דוגמה חיה לדף שיקבל.

URL סופי צפוי: `partners.hak.co.il` ל-Elite Partner ו-`money.hak.co.il/partner-landing.html` (או דומה) לדף ההפניה.

---

## חומרי עזר חיצוניים — קריאת חובה

לפני כל עבודה בפרויקט קרא בסדר הזה:

1. `HK-Elite-Partner-Brief.md` (בשורש) — הברייף המלא
2. `~/Downloads/HKmoney-Design-SKILL.md` — שפת העיצוב (Rubik, פלטה, נכסים)
3. `~/Downloads/HKmoney-Copywriting-SKILL-v2.md` — שפת הקופי

**עיקרון על:** אסור להמציא קומפוננטות, פלטות, או פונטים חדשים. רק שימוש מחדש בקיים.

---

## ארכיטקטורה

```
hk-accountant/
├── index.html                    דף Elite Partner (קהל: רואי חשבון)
├── partner-landing.html          שכפול hak.co.il + ראש מותאם ?ref=
├── partners-data.json            מאגר רואי חשבון (key → name/title/photo/quote)
├── privacy.html                  מדיניות פרטיות
├── CLAUDE.md
├── HK-Elite-Partner-Brief.md
├── hkmoney/                      גיבוי של hak.co.il המקורי (לשכפול עתידי)
├── assets/
│   ├── partner-placeholder.svg   silhouette גנרי + תווית "כאן תופיע התמונה שלך"
│   └── …                         לוגואים, תמונות, אייקונים
├── css/
│   ├── money.css                 בסיס — header, hero, buttons, footer, mobile
│   ├── hk-money-ai.css           הרחבה — divider-title, faq, contact (כחול+טופס)
│   ├── partners.css              הרחבות לדף Elite Partner (hero/pain/benefits/how/commission/demo-cta/form)
│   └── style.css                 (legacy — לא בשימוש)
└── js/
    ├── money.js                  אינטראקציה כללית (nav toggle)
    ├── hk-money-ai-extra.js      תוספות (קרוסלה וכו')
    └── animations.js             אנימציות גלילה
```

---

## איך עובד `?ref=<key>` ב-partner-landing.html

הסקריפט inline ב-`<script>` בסוף הדף:

1. קורא `?ref=<key>` מה-URL ומנרמל ל-lowercase
2. אם אין ref → לא עושה כלום, הדף זהה ל-hak.co.il רגיל
3. אם יש ref:
   - שם את הערך ב-`<input type="hidden" name="ref" id="partner-ref-field">` (גם אם ה-fetch ייכשל)
   - מבצע `fetch('partners-data.json')`
   - אם המפתח קיים → מאכלס את `<aside class="partner-strip">` (תמונה / שם / תפקיד / ציטוט) ומסיר `hidden`
   - מוסיף ל-`<body>` קלאס `has-partner-strip` (משבית את `padding-top` של ה-hero כדי למנוע double-padding)
   - מוסיף `<p class="partner-form-note">הופנית על ידי <strong>X</strong></p>` מעל כפתור השליחה
4. כשל בכל שלב = שקט מוחלט (הדף ממשיך לעבוד גנרית)

הוספת רואה חשבון חדש: ערוך `partners-data.json` והוסף ערך לפי תבנית `_template`.

---

## שפת העיצוב — תקציר

- **פונט:** Rubik. (Karantina בלבד ב-Hero של partner-landing.html, לא בדף Elite Partner.)
- **פלטה:**
  - Primary Dark `#0c4068` (navy) — כותרות, רקע כהה
  - Accent Blue `#39abe2` — קישורים, אייקונים
  - Accent Warm `#e48375` (salmon) — מילת מפתח רגשית, CTAs, תווית placeholder
  - Off-white `#fffefe` / `#eef4f9` — רקעים
- **כיוון:** RTL מלא בעברית.
- **אסור:** יותר מ-3 צבעים בקומפוזיציה אחת, גרדיאנטים מורכבים, אנימציות מסיחות.

CSS variables ב-`:root` בתוך `money.css`: `--navy`, `--blue`, `--salmon`, `--off`, `--text`, `--muted`, `--border`, `--font`, `--hdr-h`.

---

## מבנה דף Elite Partner (`/index.html`)

11 סקשנים:

1. **Header** — לוגו (קישור ל-money.hak.co.il), ניווט עוגנים, CTA "בדוק התאמה"
2. **Hero** — תגית, H1 ("תכל'ס, אתה רואה חשבון. לא מנהל כספים."), subhead, CTA
3. **Pain** — 6 בועות שאלות שלקוחות שואלים את רואה החשבון
4. **Value** — "עכשיו יש לך תשובה" + תיאור המוצר
5. **6 Benefits** — Grid 3×2
6. **How** — Timeline של 5 שלבים
7. **Commission** — סקשן Primary Dark + 3 placeholders בולטים
8. **Demo CTA** (id=`mockup`) — "רוצה לראות איך הדף שלך יראה?" → כפתור פותח `partner-landing.html?ref=demo` בטאב חדש
9. **FAQ** — 8 שאלות
10. **Form** — 7 שדות + checkbox Bizibox
11. **Footer**

---

## Placeholders פתוחים

ב-`/index.html` (5):
- כרטיס "עמלה על כל הפנייה" (סקשן 6 הערכים)
- 3 שורות בסקשן `partners-commission` — סכום, מבנה תשלום, סכום שנתי
- שאלה "מתי אני מקבל את העמלה?" ב-FAQ

מחכים להחלטה של אייל ואופיר על מודל העמלה הסופי.

---

## קונבנציות

- **בעברית בלבד בקופי.** שמות מותגים נשארים באנגלית: HK Money, HK Elite Partner, AI, Bizibox.
- **מילים אסורות:** מהפכני, חדשני, פורץ דרך, אוטונומי, סוגר פינה. ראה את ה-Copywriting Skill.
- **CTA אחד** — "בדוק התאמה לתוכנית" ב-Elite Partner. הופיע בכמה מקומות אבל תמיד מוביל לטופס בתחתית.
- **קישורים חיצוניים** — `https://money.hak.co.il` בלוגו, ב-nav ובפוטר.
- **ב-partner-landing.html** — אסור לשנות את הקופי המקורי של hak.co.il. שינויים מותרים: ראש מותאם, hidden ref בטופס בלבד.

---

## משימות פתוחות

- [ ] להגדיר subdomain `partners.hak.co.il` ב-Netlify
- [ ] להחליף את ה-placeholders של העמלה אחרי החלטת אייל+אופיר
- [ ] לחבר את הטפסים ל-CRM (כרגע `onsubmit="return false"` בשני הדפים)
- [ ] לסנכרן את `partner-landing.html` כשהמקור (`hkmoney/index.html`) מתעדכן ב-money.hak.co.il
- [ ] להחליף את ה-photo בלשונית `demo` ב-JSON בתמונה אמיתית כשרואה חשבון אמיתי יוגדר

---

## לוג עדכונים

| תאריך | מה עודכן | מי |
|--------|----------|-----|
| 2026-05-10 | יצירה ראשונית — דף Elite Partner מלא, partners.css, mockup section | אייל + Claude |
| 2026-05-10 | קונסולידציה ל-`/index.html` ראשי, ניקוי קבצי page-2 | אייל + Claude |
| 2026-05-10 | ארכיטקטורה חדשה: `/partner-landing.html` (שכפול hak.co.il עם ראש ?ref=), `partners-data.json` חזר, `partner-placeholder.svg` חדש, סקשן mockup ב-Elite Partner הוחלף ב-Demo CTA המקשר לדף החי | אייל + Claude |
