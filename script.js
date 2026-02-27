const PHONE_DISPLAY = "01023781330";
const PHONE_INTL = "+201023781330";
const WA_LINK = "https://wa.me/201023781330";

const services = [
  { ar: "نظافة الواجهات", en: "Facade Cleaning", icon: "🏢", desc: "تنظيف الزجاج والواجهات بأمان ونتيجة لامعة." },
  { ar: "النظافة الداخلية (شقق/فلل)", en: "Interior Cleaning", icon: "🏠", desc: "تنظيف شامل للمنازل مع اهتمام بالتفاصيل." },
  { ar: "تنظيف بعد التشطيب", en: "Post-Construction", icon: "🧱", desc: "إزالة الأتربة وبقايا التشطيب وتجهيز المكان للسكن." },
  { ar: "إزالة الأستيكر", en: "Sticker Removal", icon: "🧽", desc: "إزالة اللاصق والملصقات بدون خدوش أو آثار." },
  { ar: "تنظيف الأثاث والمفروشات", en: "Upholstery Cleaning", icon: "🛋️", desc: "إزالة البقع والروائح وتعقيم للمفروشات." },
  { ar: "تنظيف خزانات المياه", en: "Water Tank Cleaning", icon: "💧", desc: "تنظيف وتعقيم لضمان مياه أنظف وصحة أفضل." },
  { ar: "جلي وتلميع الرخام", en: "Marble Polishing", icon: "✨", desc: "استعادة لمعان الرخام ورفع كفاءة المظهر." },
  { ar: "التعقيم والمكافحة", en: "Sanitization & Pest", icon: "🦠", desc: "تعقيم فعّال ومكافحة آمنة حسب الحالة." },
  { ar: "تنظيف الشركات", en: "Office Cleaning", icon: "🏢", desc: "خدمات دورية للمكاتب والشركات بعقود مرنة." },
  { ar: "تنظيف المدارس", en: "School Cleaning", icon: "🎒", desc: "نظافة آمنة لبيئة تعليم صحية." },
  { ar: "تنظيف السجاد", en: "Carpet Cleaning", icon: "🧼", desc: "تنظيف عميق وإزالة البقع بنتائج واضحة." },
  { ar: "تنظيف هود المطاعم", en: "Hood Cleaning", icon: "🍽️", desc: "إزالة الدهون وتحسين الأمان وكفاءة الشفط." },
];

function buildServiceCard(s) {
  const callLink = `tel:${PHONE_INTL}`;
  const waText = encodeURIComponent(`مرحبًا Middle East Cleaning، عايز استفسر عن خدمة: ${s.ar} (${s.en}).`);
  const waLink = `${WA_LINK}?text=${waText}`;

  return `
    <div class="serviceCard">
      <div class="serviceCard__top">
        <div>
          <div class="serviceCard__title">${s.ar}</div>
          <div class="serviceCard__sub">${s.en}</div>
        </div>
        <div class="serviceCard__icon">${s.icon}</div>
      </div>
      <p class="serviceCard__desc">${s.desc}</p>
      <div class="serviceCard__actions">
        <a class="btn btn--ghost" href="${waLink}" target="_blank" rel="noreferrer">احجز واتساب</a>
        <a class="btn" href="${callLink}">اتصل الآن</a>
      </div>
    </div>
  `;
}

function initServices() {
  const grid = document.getElementById("servicesGrid");
  if (grid) grid.innerHTML = services.map(buildServiceCard).join("");

  const select = document.getElementById("serviceSelect");
  if (select) {
    select.innerHTML =
      `<option value="" disabled selected>اختر الخدمة</option>` +
      services.map(s => `<option value="${s.ar}">${s.ar} — ${s.en}</option>`).join("");
  }
}

function initMobileNav() {
  const burger = document.getElementById("burger");
  const mobileNav = document.getElementById("mobileNav");
  if (!burger || !mobileNav) return;

  const setOpen = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    mobileNav.setAttribute("aria-hidden", String(!open));

    // استخدم class is-open (متوافق مع CSS النهائي)
    mobileNav.classList.toggle("is-open", open);

    // امنع سكرول الصفحة وقت فتح المينو (موبايل)
    document.body.style.overflow = open ? "hidden" : "";
  };

  // الحالة الابتدائية
  setOpen(false);

  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  // اقفل المينو عند الضغط على أي لينك
  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setOpen(false));
  });

  // اقفلها لو المستخدم كبس Escape (ديسكتوب/موبايل بكيبورد)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

function initFormToWhatsApp() {
  const form = document.getElementById("leadForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const name = (fd.get("name") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    const service = (fd.get("service") || "").toString().trim();
    const notes = (fd.get("notes") || "").toString().trim();

    // تحقق بسيط (بدون تعقيد)
    if (!name || !phone || !service) {
      alert("من فضلك اكتب الاسم ورقم الموبايل واختر الخدمة.");
      return;
    }

    const msg =
`مرحبًا Middle East Cleaning 👋
الاسم: ${name}
رقمي: ${phone}
الخدمة: ${service}
ملاحظات: ${notes || "—"}
أريد عرض سعر / معاينة.`;

    const link = `${WA_LINK}?text=${encodeURIComponent(msg)}`;
    window.open(link, "_blank", "noopener,noreferrer");
  });
}

function initYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

initServices();
initMobileNav();
initFormToWhatsApp();
initYear();
