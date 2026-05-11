# HK Elite Partner — מאגר עזר ל-Claude

קובץ זה הוא ה"מצפן" של הפרויקט. כשמתחילים סשן חדש — זה הקובץ הראשון שצריך לקרוא.

---

## מה זה הפרויקט

תוכנית **HK Elite Partner** — שותפות בלעדית עם רואי חשבון, סביב **וובינר חי** ללקוחותיהם. הפרויקט מכיל **שני דפים**:

| נתיב | מה זה | קהל |
|---|---|---|
| `/index.html` | דף הנחיתה של התוכנית — "וובינר ללקוחות שלך, שאתה לא צריך לארגן" | רואי חשבון |
| `/partner-landing.html` | דף **הזמנה לוובינר** עם ראש מותאם דרך `?ref=<key>` | בעלי עסקים שהוזמנו ע"י רואה החשבון שלהם |

הקשר ביניהם: בדף ה-Elite Partner יש סקשן `partners-demo-cta` (id=`mockup`) עם כפתור שפותח את `/partner-landing.html?ref=demo` בטאב חדש — כך רואה החשבון רואה דוגמה חיה להזמנה שתישלח ללקוחותיו.

**הצעת הערך:** אנחנו (אייל ואופיר) מנחים וובינר חי של 60 דקות בזום ללקוחות של רואה החשבון. הוא מארח, אנחנו מנחים, הלקוחות מקבלים שעה של ערך + הצעה ל-2 שבועות ניסיון. רואה החשבון מקבל עמלה על כל לקוח שמצטרף.

URL סופי צפוי: `partners.hak.co.il` ל-Elite Partner ו-`money.hak.co.il/partner-landing.html` (או דומה) לדף הוובינר.

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
├── partner-landing.html          דף הזמנה לוובינר + ראש מותאם ?ref=
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
│   ├── partners.css              הרחבות לדף Elite Partner (hero/pain/offer/benefits/how/commission/demo-cta/form)
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
2. אם אין ref → הדף נשאר הזמנה גנרית לוובינר (ללא ראש אישי)
3. אם יש ref:
   - שם את הערך ב-`<input type="hidden" name="ref" id="partner-ref-field">` (גם אם ה-fetch ייכשל)
   - מבצע `fetch('partners-data.json')`
   - אם המפתח קיים → מסיר `hidden` מ-3 סקשנים אישיים: `partner-hero` (ראש מלא), `partner-bridge` ("למה X שלח אותך"), `partner-midquote` (ציטוט אישי 2)
   - מאכלס את `#webinar-partner-name` (תת-כותרת ה-Webinar Card: "ללקוחות של [שם]")
   - מוסיף `<p class="partner-form-note">הופנית על ידי <strong>X</strong></p>` מעל כפתור השליחה
4. כשל בכל שלב = שקט מוחלט (הדף נשאר הזמנה גנרית לוובינר)

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
2. **Hero** — תגית, H1 ("וובינר מהוקצע ללקוחות שלך — שאתה לא צריך לארגן."), subhead, CTA
3. **Pain** — 6 בועות שאלות שלקוחות שואלים את רואה החשבון
4. **Offer** (`partners-offer`, id=`offer`) — "מה אתה מקבל כ-Elite Partner" — Grid 3×2 של 6 כרטיסים: וובינר חי, ערך ללקוחות, אתה הגיבור, 2 שבועות מתנה, עמלה, אפס עבודת הפקה
5. **6 Benefits** — Grid 3×2 (מותאם לקונטקסט וובינר)
6. **How** — Timeline של 5 שלבים (וובינר: התקבלות → תאריך → הזמנת לקוחות → הוובינר רץ → עמלה)
7. **Commission** — סקשן Primary Dark + 3 placeholders בולטים
8. **Demo CTA** (id=`mockup`) — "ככה הלקוחות שלך יקבלו את ההזמנה" → כפתור פותח `partner-landing.html?ref=demo` בטאב חדש
9. **FAQ** — 12 שאלות (4 חדשות בקונטקסט וובינר + 8 קיימות)
10. **Form** — 7 שדות + checkbox Bizibox
11. **Footer**

---

## מבנה דף הזמנה לוובינר (`/partner-landing.html`)

ההזמנה עצמה היא ה-Partner Hero — תמונה ענקית של רואה החשבון + פרטי הוובינר משולבים פנימה. נראה כמו כרטיס הזמנה אישי (כמו הזמנה לאירוע).

1. **Header** — לוגו, ניווט קצר, CTA "שריין מקום"
2. **Partner Hero** (hidden, ?ref-only) — **כרטיס ההזמנה המלא**. Split מלא: תמונת רואה החשבון מימין (40%); משמאל: "מזמין אותך לוובינר" + שם + תפקיד + ציטוט + **בלוק הוובינר משולב פנימה** (eyebrow "פרטי הוובינר", כותרת AI לעסקים, meta strip עם תאריך/שעה/זום) + CTA גדול "שריין מקום בזום" + הערה "חינם · מקומות מוגבלים"
3. **Webinar Card** (id=`webinar`) — fallback כשאין `?ref=`. כשיש `?ref=` המחלקה `body.has-partner` מסתירה אותו (display:none) כי ההזמנה כבר ב-Hero
4. **Webinar Benefits** (id=`benefits`) — "60 דקות שישנו..." + 4 בולטים
5. **Hosts** (id=`hosts`) — שני כרטיסים זה לצד זה: אייל חזות + אופיר קריספין
6. **Partner Bridge** (hidden, ?ref-only) — "למה X שלח אותך לכאן?" — נרטיב טכנולוגיה
7. **Partner Mid-quote** (hidden, ?ref-only) — ציטוט אישי שני של רואה החשבון
8. **FAQ** (id=`faq`) — 5 שאלות וובינריות
9. **Form** (id=`contact`) — הרשמה לוובינר: שם/עסק/טלפון/מייל + ref hidden
10. **Footer**

**עיקרון העל:** כשמגיעים עם `?ref=`, חוויית ההזמנה היא ה-Hero בלבד — בלי לגלול. הסקשנים שאחר כך הם תמיכה (פרטים נוספים, אמינות, התחייבות).

---

## Placeholders פתוחים

ב-`/index.html` (5):
- כרטיס "עמלה על כל לקוח שמצטרף בוובינר" (סקשן 6 הערכים)
- כרטיס "עמלה על כל לקוח שמצטרף" (סקשן Offer)
- 3 שורות בסקשן `partners-commission` — סכום, מבנה תשלום, סכום שנתי

ב-`/partner-landing.html`:
- תאריך ושעה ב-Webinar Card — `[יוגדר בתיאום]` (מחכים להחלטת אייל ואופיר על תאריך וובינר ראשון)

מחכים להחלטה של אייל ואופיר על מודל העמלה הסופי ועל תאריך הוובינר הראשון.

---

## קונבנציות

- **בעברית בלבד בקופי.** שמות מותגים נשארים באנגלית: HK Money, HK Elite Partner, AI, Bizibox.
- **מילים אסורות:** מהפכני, חדשני, פורץ דרך, אוטונומי, סוגר פינה. ראה את ה-Copywriting Skill.
- **CTA אחד** ב-Elite Partner: "בדוק התאמה לתוכנית" — תמיד מוביל לטופס בתחתית.
- **CTA אחד** ב-partner-landing: "שריין מקום" / "שריין מקום בזום" — תמיד מוביל לטופס הרשמה לוובינר.
- **קישורים חיצוניים** — `https://money.hak.co.il` בלוגו, ב-nav ובפוטר של Elite Partner.

---

## משימות פתוחות

- [ ] להגדיר subdomain `partners.hak.co.il` ב-Netlify
- [ ] להחליף את ה-placeholders של העמלה אחרי החלטת אייל+אופיר
- [ ] להגדיר תאריך ושעה ראשונים לוובינר ולהחליף את `[יוגדר בתיאום]` בכרטיס הוובינר
- [ ] לחבר את הטפסים ל-CRM (כרגע `onsubmit="return false"` בשני הדפים)
- [ ] להחליף את ה-photo בלשונית `demo` ב-JSON בתמונה אמיתית כשרואה חשבון אמיתי יוגדר

---

## לוג עדכונים

| תאריך | מה עודכן | מי |
|--------|----------|-----|
| 2026-05-10 | יצירה ראשונית — דף Elite Partner מלא, partners.css, mockup section | אייל + Claude |
| 2026-05-10 | קונסולידציה ל-`/index.html` ראשי, ניקוי קבצי page-2 | אייל + Claude |
| 2026-05-10 | ארכיטקטורה חדשה: `/partner-landing.html` (שכפול hak.co.il עם ראש ?ref=), `partners-data.json` חזר, `partner-placeholder.svg` חדש, סקשן mockup ב-Elite Partner הוחלף ב-Demo CTA המקשר לדף החי | אייל + Claude |
| 2026-05-11 | מסר חדש לכל הפרויקט — וובינר חי במקום הפניות. דף Elite Partner: Hero/Offer/How/Demo CTA/FAQ עודכנו לקונטקסט וובינר. דף partner-landing נכתב מחדש כהזמנה לוובינר (Webinar Card, מה תקבלו, מנחים, FAQ וובינרי, טופס הרשמה). הוסרו כל סקשני hak.co.il המקוריים מ-partner-landing | אייל + Claude |
| 2026-05-11 | partner-landing: פרטי הוובינר (תאריך/שעה/זום + CTA) הועברו לתוך ה-Partner Hero. הראש הופך לכרטיס הזמנה מלא במסך אחד. כרטיס הוובינר הנפרד מוסתר אוטומטית כשיש `?ref=` (`body.has-partner`) | אייל + Claude |
