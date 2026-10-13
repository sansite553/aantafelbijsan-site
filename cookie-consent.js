(function () {
  "use strict";

  const consentKey = "aanTafelBijSanCookieConsent";
  const googleMeasurementId = "G-EJPSFYHC73";
  const metaPixelId = "4645338352351617";

  let consent = readConsent();
  let analyticsLoaded = false;
  let metaLoaded = false;

  function readConsent() {
    try {
      const storedConsent = JSON.parse(localStorage.getItem(consentKey));
      const consentAge = Date.now() - new Date(storedConsent?.updatedAt || 0).getTime();
      const maximumConsentAge = 180 * 24 * 60 * 60 * 1000;
      if (
        storedConsent &&
        typeof storedConsent.analytics === "boolean" &&
        typeof storedConsent.marketing === "boolean" &&
        consentAge <= maximumConsentAge
      ) {
        return storedConsent;
      }

      localStorage.removeItem(consentKey);
    } catch (error) {
      console.warn("De opgeslagen cookievoorkeur kon niet worden gelezen.", error);
    }

    return null;
  }

  function loadScript(src, id) {
    if (document.getElementById(id)) {
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  function enableAnalytics() {
    if (analyticsLoaded) {
      return;
    }

    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", googleMeasurementId);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${googleMeasurementId}`, "google-analytics-script");
  }

  function enableMetaPixel() {
    if (metaLoaded) {
      return;
    }

    metaLoaded = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    window.fbq("consent", "grant");
    window.fbq("init", metaPixelId);
    window.fbq("track", "PageView");
  }

  function applyConsent() {
    if (consent?.analytics) {
      enableAnalytics();
    } else if (window.gtag) {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }

    if (consent?.marketing) {
      enableMetaPixel();
    } else if (window.fbq) {
      window.fbq("consent", "revoke");
    }
  }

  function saveConsent(analytics, marketing) {
    consent = {
      analytics,
      marketing,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(consentKey, JSON.stringify(consent));
    applyConsent();
    closeBanner();
  }

  function closeBanner() {
    document.getElementById("cookieConsent")?.remove();
    document.getElementById("cookieSettings")?.removeAttribute("hidden");
  }

  function showBanner() {
    document.getElementById("cookieConsent")?.remove();

    const banner = document.createElement("section");
    banner.className = "cookie-consent";
    banner.id = "cookieConsent";
    banner.setAttribute("aria-label", "Cookievoorkeuren");
    banner.innerHTML = `
      <div class="cookie-consent-copy">
        <strong>Jouw privacy</strong>
        <p>Met jouw toestemming gebruik ik Google Analytics voor bezoekersstatistieken en Meta Pixel om advertenties en afgeronde reserveringen te meten. Je kunt ook alles weigeren.</p>
        <details>
          <summary>Meer informatie</summary>
          <p>Google en Meta kunnen gegevens ontvangen over bezochte pagina's, je apparaat en gebruik van de website. Meta ontvangt alleen gegevens na toestemming voor marketingcookies. Je keuze wordt maximaal 6 maanden bewaard en is altijd te wijzigen via Cookie-instellingen.</p>
        </details>
      </div>
      <div class="cookie-consent-actions">
        <button type="button" data-cookie-choice="necessary">Weigeren</button>
        <button type="button" data-cookie-choice="analytics">Alleen statistieken</button>
        <button type="button" data-cookie-choice="all">Alles accepteren</button>
      </div>
    `;

    banner.querySelector('[data-cookie-choice="necessary"]').addEventListener("click", function () {
      saveConsent(false, false);
    });
    banner.querySelector('[data-cookie-choice="analytics"]').addEventListener("click", function () {
      saveConsent(true, false);
    });
    banner.querySelector('[data-cookie-choice="all"]').addEventListener("click", function () {
      saveConsent(true, true);
    });

    document.body.appendChild(banner);
    document.getElementById("cookieSettings")?.setAttribute("hidden", "");
  }

  function addSettingsButton() {
    const button = document.createElement("button");
    button.className = "cookie-settings";
    button.id = "cookieSettings";
    button.type = "button";
    button.textContent = "Cookie-instellingen";
    button.addEventListener("click", showBanner);
    document.body.appendChild(button);
  }

  window.trackMetaPurchase = function (details) {
    if (!consent?.marketing || typeof window.fbq !== "function") {
      return false;
    }

    window.fbq("track", "Purchase", {
      value: Number(details.value),
      currency: details.currency || "EUR",
      num_items: Number(details.quantity || 1)
    });
    return true;
  };

  document.addEventListener("DOMContentLoaded", function () {
    addSettingsButton();
    applyConsent();

    if (!consent) {
      showBanner();
    }
  });
}());
